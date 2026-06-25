"use client"

import { useEffect, useState, type RefObject } from "react"
import {
  motion,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion"
import { scrollYMV, scrollVelMV } from "@/lib/scroll-state"

// ── Tunables ────────────────────────────────────────────────────────────────
const STAR_OPACITY = 0.72 // slightly dimmed so it reads as distant, not a spotlight
const SPRING = { stiffness: 80, damping: 20, mass: 0.4 } // tracks scroll closely
const START_VW = 0.94 // fallback launch X (top-right, near the hamburger)
const START_VH = 0.11 // fallback launch Y (just under the header buttons)
const BOTTOM_VH = 0.82 // head's viewport Y as it nears the CTA
// S-pattern: the head launches from the hamburger (top-right) and its X swings
// symmetrically around screen-center as it descends, reaching both edges.
const DRIFT_BENDS = 2 // half-swings across the run (one full "S": right→left→right)
const DRIFT_POINTS = 32 // smoothness of the curve & tangent rotation
// Dispersal: when the CTA section (#contact) scrolls into view the star bursts
// apart instead of just travelling on. Anchored to the section so it always
// triggers right as the CTA appears.
const DISPERSE_ENTER_VH = 0.92 // contact top at this viewport Y → burst begins
const DISPERSE_DONE_VH = 0.28 // contact top at this viewport Y → fully dispersed
// Burst shards that scatter from the head. Deterministic angles/radii so the
// explosion looks intentional and identical every run.
const BURST = Array.from({ length: 20 }, (_, i) => {
  const angle = (i / 20) * Math.PI * 2 + (i % 4) * 0.35
  const radius = 64 + ((i * 41) % 96)
  return {
    dx: Math.cos(angle) * radius,
    dy: Math.sin(angle) * radius,
    size: 1.5 + ((i * 13) % 5) * 0.5,
    appear: ((i * 7) % 10) / 40, // 0–0.225 stagger so shards pop out unevenly
  }
})
// ────────────────────────────────────────────────────────────────────────────

type Ranges = {
  yIn: [number, number]
  yOut: [number, number]
  xIn: number[]
  xOut: number[]
  rotOut: number[]
  opIn: number[]
  opOut: number[]
  dispIn: [number, number]
}
const INIT: Ranges = {
  yIn: [0, 1],
  yOut: [0, 0],
  xIn: [0, 1],
  xOut: [0, 0],
  rotOut: [0, 0],
  opIn: [0, 1],
  opOut: [0, 0],
  dispIn: [0, 1],
}

/**
 * One shooting star that launches from the hamburger menu (top-right) and
 * descends in an S-curve, swinging side to side across the page, its trail
 * aligned to the direction of travel. It bursts apart when the CTA section
 * scrolls into view. Driven by Lenis scroll (scrollYMV); the path is measured
 * live so it stays accurate at any breakpoint.
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

      // Launch point: just under the header buttons (top-right), measured live
      // from the real hamburger; fall back to the corner if it isn't mounted.
      let startX = vw * START_VW
      let startY = vh * START_VH
      const ham = document.querySelector('[aria-label="Open menu"]')
      if (ham) {
        const hr = ham.getBoundingClientRect()
        startX = hr.left + hr.width / 2
        // bottom of the button + a small gap → starts just beneath the buttons
        startY = hr.top + window.scrollY + hr.height + 16
      }

      // Travel from the very top of the page until the CTA (#contact) appears.
      const startScroll = 0
      const cta = document.getElementById("contact")
      let dispStart: number
      let dispEnd: number
      if (cta) {
        const ctaTop = cta.getBoundingClientRect().top + window.scrollY
        dispStart = Math.max(1, ctaTop - vh * DISPERSE_ENTER_VH)
        dispEnd = Math.max(dispStart + 1, ctaTop - vh * DISPERSE_DONE_VH)
      } else {
        const top = el.getBoundingClientRect().top + window.scrollY
        dispStart = Math.max(1, top + el.offsetHeight - vh)
        dispEnd = dispStart + vh
      }
      const travelEnd = dispStart // reaches its lowest point as the CTA enters
      const span = travelEnd - startScroll

      const bottomY = vh * BOTTOM_VH
      const amp = startX - vw / 2 // X swings symmetrically around centre
      const dydp = bottomY - startY // vertical travel per progress (constant)

      const xIn: number[] = []
      const xOut: number[] = []
      const rotOut: number[] = []
      for (let i = 0; i < DRIFT_POINTS; i++) {
        const p = i / (DRIFT_POINTS - 1)
        xIn.push(startScroll + span * p)
        xOut.push(vw / 2 + amp * Math.cos(p * Math.PI * DRIFT_BENDS))
        // tangent of the path → trail trails behind the head (points up-and-back)
        const dxdp = -amp * Math.PI * DRIFT_BENDS * Math.sin(p * Math.PI * DRIFT_BENDS)
        rotOut.push((-Math.atan2(dxdp, dydp) * 180) / Math.PI)
      }

      setR({
        yIn: [startScroll, travelEnd],
        yOut: [startY, bottomY],
        xIn,
        xOut,
        rotOut,
        // full strength the whole run; the dispersal handles the disappearance
        opIn: [0, 1],
        opOut: [STAR_OPACITY, STAR_OPACITY],
        dispIn: [dispStart, dispEnd],
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

  // Dispersal progress 0→1 as the CTA section enters; spring-smoothed so the
  // burst eases rather than snaps. Drives the shards out and the star apart.
  const disperse = useSpring(
    useTransform(scrollYMV, r.dispIn, [0, 1], { clamp: true }),
    { stiffness: 90, damping: 20, mass: 0.5 }
  )
  // The intact star (trail, head, flare, sparkles) dissolves as it bursts.
  const gather = useTransform(disperse, [0, 0.5], [1, 0], { clamp: true })

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
        {/* soft outer comet haze — wide, blurred aura around the streak */}
        <motion.div
          style={{
            position: "absolute",
            left: "-5px",
            bottom: "0px",
            width: "10px",
            height: "340px",
            transformOrigin: "bottom center",
            scaleY: trailScale,
            opacity: gather,
            borderRadius: "9999px",
            background:
              "linear-gradient(to top, rgba(174,246,255,0.65) 0%, rgba(92,240,255,0.38) 22%, rgba(20,228,254,0.14) 58%, rgba(20,228,254,0) 100%)",
            filter: "blur(3.5px)",
          }}
        />
        {/* bright thin core streak running down the middle of the haze */}
        <motion.div
          style={{
            position: "absolute",
            left: "-1px",
            bottom: "0px",
            width: "2px",
            height: "275px",
            transformOrigin: "bottom center",
            scaleY: trailScale,
            opacity: gather,
            borderRadius: "9999px",
            background:
              "linear-gradient(to top, rgba(255,255,255,0.92) 0%, rgba(174,246,255,0.78) 24%, rgba(92,240,255,0.28) 62%, rgba(20,228,254,0) 100%)",
            filter: "blur(0.5px)",
          }}
        />
        {/* sparkle particles shed along the trail (closer = brighter/larger) */}
        {[
          { d: 32, s: 3, o: 0.85 },
          { d: 66, s: 2.5, o: 0.6 },
          { d: 110, s: 2, o: 0.4 },
          { d: 168, s: 1.5, o: 0.24 },
        ].map((p, i) => (
          <motion.div
            key={i}
            style={{
              opacity: gather,
              position: "absolute",
              left: `${-p.s / 2}px`,
              bottom: `${p.d}px`,
              width: `${p.s}px`,
              height: `${p.s}px`,
              borderRadius: "9999px",
              background: `rgba(216,250,255,${p.o})`,
              boxShadow: `0 0 6px 1px rgba(20,228,254,${p.o * 0.7})`,
            }}
          />
        ))}
        {/* head: glowing core orb */}
        <motion.div
          style={{
            opacity: gather,
            position: "absolute",
            left: "-8px",
            top: "-8px",
            width: "16px",
            height: "16px",
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, #ffffff 0%, #aef6ff 38%, #14e4fe 100%)",
            boxShadow:
              "0 0 14px 4px rgba(20,228,254,0.55), 0 0 36px 12px rgba(20,228,254,0.24)",
          }}
        />
        {/* 4-point star flare — thin crossed glints through the head */}
        <motion.div
          style={{
            opacity: gather,
            position: "absolute",
            left: "-27px",
            top: "-0.75px",
            width: "54px",
            height: "1.5px",
            borderRadius: "9999px",
            background:
              "linear-gradient(to right, rgba(174,246,255,0) 0%, rgba(216,250,255,0.8) 50%, rgba(174,246,255,0) 100%)",
            filter: "blur(0.4px)",
          }}
        />
        <motion.div
          style={{
            opacity: gather,
            position: "absolute",
            left: "-0.75px",
            top: "-27px",
            width: "1.5px",
            height: "54px",
            borderRadius: "9999px",
            background:
              "linear-gradient(to bottom, rgba(174,246,255,0) 0%, rgba(216,250,255,0.8) 50%, rgba(174,246,255,0) 100%)",
            filter: "blur(0.4px)",
          }}
        />
        {/* dispersal: shards burst outward from the head as the CTA appears */}
        {BURST.map((b, i) => (
          <BurstShard key={i} disperse={disperse} b={b} />
        ))}
      </motion.div>
    </motion.div>
  )
}

/** One shard of the dispersal burst: flies out from the head and fades. */
function BurstShard({
  disperse,
  b,
}: {
  disperse: MotionValue<number>
  b: (typeof BURST)[number]
}) {
  const x = useTransform(disperse, [0, 1], [0, b.dx])
  const y = useTransform(disperse, [0, 1], [0, b.dy])
  const scale = useTransform(disperse, [0, 1], [1, 0.2])
  // pop in as it leaves the head, then fade to nothing
  const opacity = useTransform(
    disperse,
    [b.appear, b.appear + 0.12, 0.85, 1],
    [0, 0.95, 0.5, 0]
  )
  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        opacity,
        position: "absolute",
        left: `${-b.size / 2}px`,
        top: `${-b.size / 2}px`,
        width: `${b.size}px`,
        height: `${b.size}px`,
        borderRadius: "9999px",
        background: "rgba(216,250,255,1)",
        boxShadow: "0 0 6px 1px rgba(20,228,254,0.7)",
      }}
    />
  )
}
