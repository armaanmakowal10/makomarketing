"use client"

import { useEffect, useState, type RefObject } from "react"
import {
  motion,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion"
import { scrollYMV, scrollVelMV } from "@/lib/scroll-state"

// ── Tunables ────────────────────────────────────────────────────────────────
const STAR_OPACITY = 1
const SPRING = { stiffness: 80, damping: 20, mass: 0.4 } // tracks scroll closely
const TOP_VH = 0.18 // head's viewport Y where it enters (just under the hero)
const BOTTOM_VH = 0.82 // head's viewport Y near the page end
// S-pattern: horizontal position follows a sine wave as the star descends.
const DRIFT_CENTER = 0.5 // center of the swing (fraction of viewport width)
const DRIFT_AMP = 0.42 // swing reaches close to both screen edges (side to side)
const DRIFT_BENDS = 2 // sine periods across the run (≈ one full "S")
const DRIFT_POINTS = 32 // smoothness of the curve & tangent rotation
const FADE_OUT_VH = 0.6 // distance (in viewport heights) over which it fades out at the end
// ────────────────────────────────────────────────────────────────────────────

type Ranges = {
  yIn: [number, number]
  yOut: [number, number]
  xIn: number[]
  xOut: number[]
  rotOut: number[]
  opIn: number[]
  opOut: number[]
}
const INIT: Ranges = {
  yIn: [0, 1],
  yOut: [0, 0],
  xIn: [0, 1],
  xOut: [0, 0],
  rotOut: [0, 0],
  opIn: [0, 1],
  opOut: [0, 0],
}

/**
 * One shooting star scoped to the below-hero region. The bright head descends
 * top → bottom while swinging side to side along an S-curve, and its trail
 * aligns to the direction of travel (tangent of the path) so it reads like a
 * real meteor arcing across the sky. It fades out as the page end approaches.
 * Driven by Lenis scroll (scrollYMV); the whole path is measured so it spans
 * the region accurately at any breakpoint.
 */
export function RegionShootingStar({
  containerRef,
}: {
  containerRef: RefObject<HTMLDivElement | null>
}) {
  const reduce = useReducedMotion()
  const [r, setR] = useState<Ranges>(INIT)

  useEffect(() => {
    if (reduce) return
    const measure = () => {
      const el = containerRef.current
      if (!el) return
      const vh = window.innerHeight
      const vw = window.innerWidth
      const top = el.getBoundingClientRect().top + window.scrollY
      const height = el.offsetHeight
      const startScroll = top // hero just scrolled out of view
      const endScroll = Math.max(startScroll + 1, top + height - vh) // page end
      const span = endScroll - startScroll

      const xIn: number[] = []
      const xOut: number[] = []
      const rotOut: number[] = []
      const dydp = (BOTTOM_VH - TOP_VH) * vh // vertical travel per progress (constant)
      for (let i = 0; i < DRIFT_POINTS; i++) {
        const p = i / (DRIFT_POINTS - 1)
        xIn.push(startScroll + span * p)
        xOut.push(vw * (DRIFT_CENTER + DRIFT_AMP * Math.sin(p * Math.PI * DRIFT_BENDS)))
        // tangent of the path → trail trails behind the head (points up-and-back)
        const dxdp = vw * DRIFT_AMP * Math.PI * DRIFT_BENDS * Math.cos(p * Math.PI * DRIFT_BENDS)
        rotOut.push((-Math.atan2(dxdp, dydp) * 180) / Math.PI)
      }

      const fadeStart = Math.max(startScroll + 1, endScroll - vh * FADE_OUT_VH)
      setR({
        yIn: [startScroll, endScroll],
        yOut: [vh * TOP_VH, vh * BOTTOM_VH],
        xIn,
        xOut,
        rotOut,
        // fade in just under the hero, hold, then fade out at the page end
        opIn: [startScroll - vh * 0.15, startScroll, fadeStart, endScroll],
        opOut: [0, STAR_OPACITY, STAR_OPACITY, 0],
      })
    }

    measure()
    const settle = setTimeout(measure, 600) // after fonts/images settle
    const onLoad = () => measure()
    window.addEventListener("load", onLoad)
    let t: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(t)
      t = setTimeout(measure, 150) // debounced
    }
    window.addEventListener("resize", onResize)
    return () => {
      clearTimeout(settle)
      clearTimeout(t)
      window.removeEventListener("load", onLoad)
      window.removeEventListener("resize", onResize)
    }
  }, [containerRef, reduce])

  // Head position: descends top → bottom and swings side to side across the run.
  const y = useSpring(useTransform(scrollYMV, r.yIn, r.yOut, { clamp: true }), SPRING)
  const x = useSpring(useTransform(scrollYMV, r.xIn, r.xOut, { clamp: true }), SPRING)
  // Trail rotation tracks the tangent so the tail always follows the path.
  const rotate = useSpring(
    useTransform(scrollYMV, r.xIn, r.rotOut, { clamp: true }),
    { stiffness: 60, damping: 22, mass: 0.5 }
  )
  // Fades in under the hero, then fades away at the end of the page.
  const opacity = useTransform(scrollYMV, r.opIn, r.opOut, { clamp: true })

  // Velocity reaction: the trail stretches while scrolling fast.
  const speed = useSpring(
    useTransform(scrollVelMV, (v) => Math.min(1, Math.abs(v) / 35)),
    { stiffness: 120, damping: 25 }
  )
  const trailScale = useTransform(speed, [0, 1], [1, 1.7])

  if (reduce) return null

  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Origin (0,0) of this div is the head; rotate pivots around it so the
          trail swings behind while the head stays on the path. */}
      <motion.div
        style={{ x, y, rotate, transformOrigin: "0px 0px" }}
        className="absolute left-0 top-0"
      >
        {/* tapered trail rising up-and-back from the head (lengthens with speed) */}
        <motion.div
          style={{
            position: "absolute",
            left: "-2px",
            bottom: "0px",
            width: "4px",
            height: "300px",
            transformOrigin: "bottom center",
            scaleY: trailScale,
            borderRadius: "9999px",
            background:
              "linear-gradient(to top, rgba(174,246,255,1) 0%, rgba(92,240,255,0.85) 18%, rgba(20,228,254,0.45) 55%, rgba(20,228,254,0) 100%)",
            filter: "blur(0.7px)",
          }}
        />
        {/* bright head */}
        <div
          style={{
            position: "absolute",
            left: "-9px",
            top: "-9px",
            width: "18px",
            height: "18px",
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, #ffffff 0%, #aef6ff 35%, #14e4fe 100%)",
            boxShadow:
              "0 0 22px 7px rgba(20,228,254,0.9), 0 0 56px 20px rgba(20,228,254,0.4)",
          }}
        />
      </motion.div>
    </motion.div>
  )
}
