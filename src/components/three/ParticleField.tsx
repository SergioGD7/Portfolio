import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* ------------------------------------------------------------------ */
/*  Shape generators — every particle gets a slot in all three         */
/* ------------------------------------------------------------------ */

/** Evenly distributed points on a sphere (Fibonacci lattice). */
function sphereTarget(i: number, count: number, radius: number, out: THREE.Vector3) {
  const golden = Math.PI * (3 - Math.sqrt(5))
  const y = 1 - (i / Math.max(1, count - 1)) * 2
  const r = Math.sqrt(Math.max(0, 1 - y * y))
  const theta = golden * i
  out.set(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius)
}

/** A (2,3) torus knot, thickened into a tube by a random offset. */
function knotTarget(i: number, count: number, out: THREE.Vector3) {
  const p = 2
  const q = 3
  const u = (i / count) * Math.PI * 2 * p
  const k = (q / p) * u
  const ring = 2 + Math.cos(k)
  out.set(ring * Math.cos(u) * 0.9, ring * Math.sin(u) * 0.9, Math.sin(k) * 1.5)

  // scatter into the tube volume so it reads as a solid, not a wire
  const a = Math.random() * Math.PI * 2
  const b = Math.acos(2 * Math.random() - 1)
  const rr = 0.42 * Math.cbrt(Math.random())
  out.x += rr * Math.sin(b) * Math.cos(a)
  out.y += rr * Math.sin(b) * Math.sin(a)
  out.z += rr * Math.cos(b)
}

/** A rippling lattice — the "test matrix" state. */
function gridTarget(i: number, count: number, out: THREE.Vector3) {
  const side = Math.ceil(Math.sqrt(count))
  const col = i % side
  const row = Math.floor(i / side)
  const x = (col / (side - 1) - 0.5) * 9.5
  const y = (row / (side - 1) - 0.5) * 5.2
  out.set(x, y, Math.sin(x * 1.1) * Math.cos(y * 1.4) * 0.7)
}

/* ------------------------------------------------------------------ */
/*  Shaders                                                            */
/* ------------------------------------------------------------------ */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;          // 0 → sphere, 1 → knot, 2 → grid
  uniform vec3  uMouse;          // cursor projected onto the z = 0 plane
  uniform float uMouseStrength;
  uniform float uScan;           // world Y of the sweeping scan band
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uIntro;          // 0 → scattered, 1 → assembled

  attribute vec3  aTarget0;
  attribute vec3  aTarget1;
  attribute vec3  aTarget2;
  attribute float aSeed;

  varying float vGlow;
  varying float vScan;
  varying float vSeed;

  // Cheap organic wobble so the shapes never look frozen.
  vec3 drift(vec3 p, float seed, float t) {
    float a = t * 0.28 + seed * 6.2831853;
    return vec3(
      sin(a * 1.3 + p.y * 1.7),
      cos(a * 1.1 + p.z * 1.3),
      sin(a * 0.9 + p.x * 1.5)
    ) * 0.07;
  }

  void main() {
    vec3 pos = uMorph < 1.0
      ? mix(aTarget0, aTarget1, smoothstep(0.0, 1.0, uMorph))
      : mix(aTarget1, aTarget2, smoothstep(0.0, 1.0, uMorph - 1.0));

    pos += drift(pos, aSeed, uTime);

    // Intro: everything falls inward from a loose cloud.
    pos = mix(pos * (2.4 + aSeed * 2.0), pos, uIntro);

    // Cursor pushes particles away.
    vec3 toMouse = pos - uMouse;
    float dist = length(toMouse);
    float influence = smoothstep(2.0, 0.0, dist) * uMouseStrength;
    pos += normalize(toMouse + 1e-4) * influence * 0.9;

    // Scan band sweeping vertically — the QA pass over the surface.
    float band = 1.0 - smoothstep(0.0, 0.55, abs(pos.y - uScan));
    vScan = band;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    // Kept deliberately small: the field should read as fine dust, not bokeh.
    float size = uSize * (0.45 + aSeed * 0.9) * (1.0 + band * 1.8 + influence * 1.3);
    gl_PointSize = clamp(size * uPixelRatio * (9.0 / max(0.001, -mv.z)), 0.6, 9.0);

    vGlow = influence;
    vSeed = aSeed;
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3  uColorA;
  uniform vec3  uColorB;
  uniform vec3  uColorScan;
  uniform float uOpacity;

  varying float vGlow;
  varying float vScan;
  varying float vSeed;

  void main() {
    // Round, soft-edged sprite without a texture fetch.
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    // Tight falloff — a hard-ish core with a thin halo, rather than a soft blob.
    float alpha = smoothstep(0.5, 0.25, d);

    vec3 color = mix(uColorA, uColorB, vSeed);
    color = mix(color, uColorScan, clamp(vScan * 0.95 + vGlow * 0.7, 0.0, 1.0));

    gl_FragColor = vec4(color, alpha * uOpacity * (0.3 + vSeed * 0.7));

    #include <colorspace_fragment>
  }
`

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

type Props = {
  count?: number
  /** When true the field holds a single calm shape and ignores the cursor. */
  calm?: boolean
}

export function ParticleField({ count = 18000, calm = false }: Props) {
  const pointsRef = useRef<THREE.Points>(null)
  const { camera, size } = useThree()

  const mouseWorld = useRef(new THREE.Vector3(0, 0, 0))
  const mouseStrength = useRef(0)
  const morph = useRef(0)
  const morphTarget = useRef(0)
  const elapsedSinceMorph = useRef(0)
  const intro = useRef(0)

  /* Geometry: three position sets + a per-particle seed, built once. */
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const t0 = new Float32Array(count * 3)
    const t1 = new Float32Array(count * 3)
    const t2 = new Float32Array(count * 3)
    const seeds = new Float32Array(count)
    const v = new THREE.Vector3()

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      sphereTarget(i, count, 2.5, v)
      t0[i3] = v.x
      t0[i3 + 1] = v.y
      t0[i3 + 2] = v.z

      knotTarget(i, count, v)
      t1[i3] = v.x
      t1[i3 + 1] = v.y
      t1[i3 + 2] = v.z

      gridTarget(i, count, v)
      t2[i3] = v.x
      t2[i3 + 1] = v.y
      t2[i3 + 2] = v.z

      seeds[i] = Math.random()
    }

    // `position` is required by three even though the vertex shader ignores it.
    geo.setAttribute('position', new THREE.BufferAttribute(t0.slice(), 3))
    geo.setAttribute('aTarget0', new THREE.BufferAttribute(t0, 3))
    geo.setAttribute('aTarget1', new THREE.BufferAttribute(t1, 3))
    geo.setAttribute('aTarget2', new THREE.BufferAttribute(t2, 3))
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 8)

    return geo
  }, [count])

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMorph: { value: 0 },
        uMouse: { value: new THREE.Vector3(999, 999, 999) },
        uMouseStrength: { value: 0 },
        uScan: { value: -4 },
        uSize: { value: 7 },
        uPixelRatio: { value: 1 },
        uIntro: { value: 0 },
        uOpacity: { value: 0.9 },
        uColorA: { value: new THREE.Color('#19a2e6') },
        uColorB: { value: new THREE.Color('#7b5cff') },
        uColorScan: { value: new THREE.Color('#b9f2ff') },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  }, [])

  useEffect(() => {
    return () => {
      geometry.dispose()
      material.dispose()
    }
  }, [geometry, material])

  /* Keep point size sensible across DPR and viewport width. */
  useEffect(() => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
    material.uniforms.uPixelRatio.value = dpr
    material.uniforms.uSize.value = size.width < 768 ? 1.9 : 2.3
  }, [material, size.width])

  /* Cursor → world position on the z = 0 plane. */
  useEffect(() => {
    if (calm) return
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    const raycaster = new THREE.Raycaster()
    const ndc = new THREE.Vector2()
    const hit = new THREE.Vector3()

    const onMove = (e: PointerEvent) => {
      ndc.x = (e.clientX / window.innerWidth) * 2 - 1
      ndc.y = -(e.clientY / window.innerHeight) * 2 + 1
      raycaster.setFromCamera(ndc, camera)
      if (raycaster.ray.intersectPlane(plane, hit)) {
        mouseWorld.current.copy(hit)
        mouseStrength.current = 1
      }
    }
    const onLeave = () => {
      mouseStrength.current = 0
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [camera, calm])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const u = material.uniforms

    u.uTime.value = state.clock.elapsedTime
    intro.current = THREE.MathUtils.damp(intro.current, 1, 1.4, dt)
    u.uIntro.value = intro.current

    if (calm) {
      u.uMorph.value = 0
      u.uMouseStrength.value = 0
      u.uScan.value = 99
    } else {
      // Cycle sphere → knot → grid → back, easing between states.
      elapsedSinceMorph.current += dt
      if (elapsedSinceMorph.current > 6) {
        elapsedSinceMorph.current = 0
        morphTarget.current = (morphTarget.current + 1) % 3
      }
      morph.current = THREE.MathUtils.damp(morph.current, morphTarget.current, 1.6, dt)
      u.uMorph.value = morph.current

      u.uMouse.value.lerp(mouseWorld.current, 1 - Math.pow(0.001, dt))
      u.uMouseStrength.value = THREE.MathUtils.damp(
        u.uMouseStrength.value,
        mouseStrength.current,
        4,
        dt,
      )

      // Scan sweeps bottom to top, then repeats after a pause.
      const period = 5
      const t = (state.clock.elapsedTime % period) / period
      u.uScan.value = -3.6 + t * 7.2
    }

    if (pointsRef.current) {
      pointsRef.current.rotation.y += dt * (calm ? 0.03 : 0.07)
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.12
    }
  })

  return <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />
}
