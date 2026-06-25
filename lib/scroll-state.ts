import type Lenis from "lenis"
import { motionValue } from "framer-motion"

/**
 * Shared, mutable scroll state updated by SmoothScroll (Lenis) and read by the
 * animated background each frame — avoids React re-renders on every scroll tick.
 */
export const scrollState = {
  y: 0,
  velocity: 0,
  progress: 0,
}

/**
 * Scroll-linked MotionValues fed from Lenis's own scroll event (Lenis suppresses
 * native scroll events, so framer's useScroll() reads 0 here — bind to these).
 *   scrollProgressMV — page progress 0–1
 *   scrollYMV        — absolute scroll position in px (drives measured mapping)
 *   scrollVelMV      — scroll velocity (drives subtle velocity reactions)
 */
export const scrollProgressMV = motionValue(0)
export const scrollYMV = motionValue(0)
export const scrollVelMV = motionValue(0)

/** Holds the live Lenis instance so anything (e.g. "Back to top") can drive it. */
export const lenisRef: { current: Lenis | null } = { current: null }
