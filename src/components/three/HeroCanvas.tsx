import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { ParticleField } from './ParticleField'

/** One-shot check: does this browser actually give us a WebGL context? */
function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl')),
    )
  } catch {
    return false
  }
}

/** Eases the camera toward the pointer for a shallow parallax. */
function CameraRig() {
  const { camera } = useThree()
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05)
    camera.position.x = THREE.MathUtils.damp(camera.position.x, target.current.x * 0.9, 2, dt)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, -target.current.y * 0.6, 2, dt)
    camera.lookAt(0, 0, 0)
  })

  return null
}

type Props = {
  /** Rendering stops when this is false — keeps the GPU idle off-screen. */
  active: boolean
}

export function HeroCanvas({ active }: Props) {
  const [supported] = useState(detectWebGL)
  const [tabVisible, setTabVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768,
  )

  useEffect(() => {
    const onVisibility = () => setTabVisible(!document.hidden)
    const onResize = () => setIsMobile(window.innerWidth < 768)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  if (!supported) return null

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.75]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 8], fov: 55, near: 0.1, far: 100 }}
      frameloop={active && tabVisible ? 'always' : 'never'}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <CameraRig />
        <ParticleField count={isMobile ? 7000 : 18000} />
      </Suspense>
    </Canvas>
  )
}

export { detectWebGL }
