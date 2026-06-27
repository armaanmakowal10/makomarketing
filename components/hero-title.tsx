"use client"

import { Fragment } from "react"
import { motion, useReducedMotion, type Variants } from "framer-motion"

const EASE = [0.16, 1, 0.3, 1] as const

// Stagger the words top-to-bottom, left-to-right as they fly in.
const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
}

// Dramatic per-word entrance: each word drops in from above, un-blurs,
// scales up and rotates flat from a tilted 3D plane.
const word: Variants = {
  hidden: { opacity: 0, y: 46, rotateX: -70, scale: 0.8, filter: "blur(14px)" },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.95, ease: EASE },
  },
}

/**
 * Hero title with an over-the-top reveal: words tumble in from a 3D tilt, then
 * never settle — each one keeps floating on a staggered loop so the whole line
 * breathes like a wave. Accent words glow. Falls back to static when the user
 * prefers reduced motion.
 */
export function HeroTitle({
  text,
  accent = [],
}: {
  text: string
  accent?: string[]
}) {
  const reduce = useReducedMotion()
  const lines = text.split("\n")
  const accentSet = new Set(accent)
  let idx = -1

  if (reduce) {
    return (
      <span>
        {lines.map((line, li) => (
          <span key={li} className="block">
            {line.split(" ").map((w, i, arr) => (
              <Fragment key={i}>
                <span className={accentSet.has(w) ? "text-cyan-glow" : undefined}>
                  {w}
                </span>
                {i < arr.length - 1 ? " " : ""}
              </Fragment>
            ))}
          </span>
        ))}
      </span>
    )
  }

  return (
    <motion.span
      variants={group}
      initial="hidden"
      animate="show"
      style={{ display: "block", perspective: 900 }}
    >
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(" ").map((w, i, arr) => {
            const isAccent = accentSet.has(w)
            idx += 1
            const floatDelay = idx * 0.22
            return (
              <Fragment key={i}>
                {/* Outer span: the entrance (drop + tilt + un-blur) */}
                <motion.span
                  variants={word}
                  style={{
                    display: "inline-block",
                    transformStyle: "preserve-3d",
                    willChange: "transform, filter",
                  }}
                >
                  {/* Inner span: the never-ending float (separate element so the
                      looping transform doesn't fight the entrance transform) */}
                  <motion.span
                    className={isAccent ? "text-cyan-glow" : undefined}
                    style={{ display: "inline-block" }}
                    animate={{ y: [0, -9, 0] }}
                    transition={{
                      duration: 3.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: floatDelay,
                    }}
                  >
                    {w}
                  </motion.span>
                </motion.span>
                {i < arr.length - 1 ? " " : ""}
              </Fragment>
            )
          })}
        </span>
      ))}
    </motion.span>
  )
}
