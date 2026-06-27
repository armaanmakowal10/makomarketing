"use client"

import { Fragment } from "react"
import { motion, useReducedMotion, type Variants } from "framer-motion"

const EASE = [0.16, 1, 0.3, 1] as const

// staggerChildren cascades to direct children. Used on both the outer wrapper
// (staggers the lines) and each line (staggers its words) so multi-line headings
// reveal smoothly top-to-bottom, left-to-right.
const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
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
 * semantics. Pass `accent` with the exact word tokens to render in cyan. Use
 * "\n" in `text` to force stacked lines (each line on its own row).
 */
export function SplitHeading({
  text,
  accent = [],
  accentClassName = "text-cyan-gradient",
  className,
}: {
  text: string
  accent?: string[]
  accentClassName?: string
  className?: string
}) {
  const reduce = useReducedMotion()
  const lines = text.split("\n")
  const multiline = lines.length > 1
  const accentSet = new Set(accent)
  const accentClass = (w: string) =>
    accentSet.has(w) ? accentClassName : undefined
  const lineStyle = { display: multiline ? "block" : "inline" } as const

  if (reduce) {
    return (
      <span className={className}>
        {lines.map((line, li) => (
          <span key={li} style={lineStyle}>
            {line.split(" ").map((w, i, arr) => (
              <Fragment key={i}>
                <span className={accentClass(w)}>{w}</span>
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
      className={className}
      variants={group}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {lines.map((line, li) => {
        const words = line.split(" ")
        return (
          <motion.span key={li} variants={group} style={lineStyle}>
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
      })}
    </motion.span>
  )
}
