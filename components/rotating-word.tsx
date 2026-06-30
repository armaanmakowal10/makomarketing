"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

// Smooth easing shared across the reel + width glide.
const EASE = [0.22, 1, 0.36, 1] as const
const DUR = 0.7

// useLayoutEffect on the client, useEffect on the server (avoids SSR warning).
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

/**
 * Vertical "text reel" — cycles through `words`, sliding the current word up and
 * out while the next slides in from below.
 *
 * The container's width is measured for the active word and animated, so the
 * surrounding (centered) line glides smoothly to re-center for whichever word is
 * showing — no snapping, no fixed slot. The cycling word keeps the
 * `text-cyan-glow` styling shared with the static headline accent.
 */
export function RotatingWord({
  words,
  interval = 3200,
}: {
  words: string[]
  interval?: number
}) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [started, setStarted] = useState(false)
  const sizerRef = useRef<HTMLSpanElement>(null)
  const [width, setWidth] = useState<number | undefined>(undefined)

  // Don't cycle while the intro overlay is still covering the hero — otherwise the
  // reel advances behind it and the hero reveals mid-sequence (e.g. on "Profit"
  // instead of the first word). Wait for the intro's "done" event. If the intro is
  // skipped (already seen this session, or reduced motion), start immediately.
  useEffect(() => {
    const introSeen =
      typeof sessionStorage !== "undefined" &&
      sessionStorage.getItem("mako-intro-seen") === "1"
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (introSeen || reduceMotion) {
      setStarted(true)
      return
    }
    const onDone = () => setStarted(true)
    window.addEventListener("mako-intro-done", onDone)
    return () => window.removeEventListener("mako-intro-done", onDone)
  }, [])

  useEffect(() => {
    if (reduce || words.length <= 1 || !started) return
    const id = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      interval
    )
    return () => clearInterval(id)
  }, [reduce, words.length, interval, started])

  // Measure the active word's natural width so the box can animate to it.
  useIsoLayoutEffect(() => {
    if (sizerRef.current) setWidth(sizerRef.current.offsetWidth)
  }, [index, words])

  // Re-measure on resize (font size is fluid via clamp()).
  useEffect(() => {
    const onResize = () => {
      if (sizerRef.current) setWidth(sizerRef.current.offsetWidth)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  // Reduced motion: render the final word statically, no animation.
  if (reduce) {
    return <span className="text-cyan-glow">{words[words.length - 1]}</span>
  }

  return (
    <span className="relative inline-block whitespace-nowrap align-baseline">
      {/* Hidden sizer — measures the active word's natural width (absolute so it
          never constrains to the animated box width) */}
      <span
        ref={sizerRef}
        aria-hidden="true"
        className="invisible absolute left-0 top-0 whitespace-nowrap"
      >
        {words[index]}
      </span>

      {/* Width-animated grid: words live in one shared cell, in normal flow, so
          they share the exact baseline of the surrounding "More". The grid width
          eases between word widths so the centered line glides to re-center. */}
      <motion.span
        aria-hidden="true"
        className="grid items-baseline justify-items-center whitespace-nowrap"
        style={{ width }}
        animate={{ width }}
        transition={{ width: { duration: DUR, ease: EASE } }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={index}
            className="text-cyan-glow whitespace-nowrap [grid-area:1/1]"
            style={{ willChange: "transform" }}
            initial={{ y: "70%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-70%", opacity: 0 }}
            transition={{ duration: DUR, ease: EASE }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </span>
  )
}
