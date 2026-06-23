"use client"

import { Fragment } from "react"
import { motion, useReducedMotion, type Variants } from "framer-motion"

const EASE = [0.16, 1, 0.3, 1] as const

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
}

const word: Variants = {
  hidden: { opacity: 0, y: "0.4em", filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
}

/**
 * Word-by-word heading reveal (blur-to-focus). Wrap it in your own h1/h2 for
 * semantics. Pass `accent` with the exact word tokens to render in cyan.
 */
export function SplitHeading({
  text,
  accent = [],
  className,
}: {
  text: string
  accent?: string[]
  className?: string
}) {
  const reduce = useReducedMotion()
  const words = text.split(" ")
  const accentSet = new Set(accent)
  const accentClass = (w: string) =>
    accentSet.has(w) ? "text-cyan-gradient" : undefined

  if (reduce) {
    return (
      <span className={className}>
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className={accentClass(w)}>{w}</span>
            {i < words.length - 1 ? " " : ""}
          </Fragment>
        ))}
      </span>
    )
  }

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <motion.span
            variants={word}
            className={accentClass(w)}
            style={{ display: "inline-block", willChange: "transform, filter" }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </motion.span>
  )
}
