/**
 * Resolves a file in `public/` against Vite's base URL.
 *
 * The build uses a relative base so the same bundle works at the domain root,
 * on a GitHub Pages subpath (/Portfolio/) or behind a custom domain. Hardcoded
 * absolute paths like `/images/x.png` would break on the subpath — this does not.
 */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
