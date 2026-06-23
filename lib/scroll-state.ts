import type Lenis from "lenis"

/**
 * Shared, mutable scroll state updated by SmoothScroll (Lenis) and read by the
 * animated background each frame — avoids React re-renders on every scroll tick.
 */
export const scrollState = {
  y: 0,
  velocity: 0,
  progress: 0,
}

/** Holds the live Lenis instance so anything (e.g. "Back to top") can drive it. */
export const lenisRef: { current: Lenis | null } = { current: null }
