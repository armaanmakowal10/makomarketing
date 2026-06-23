"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"

/**
 * Oversized "MAKO MARKETING" watermark that parallaxes up gently as the
 * footer scrolls into view. Purely decorative.
 */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 60, reduce ? 0 : -20])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none select-none overflow-hidden px-5 pb-6 md:px-8"
    >
      <motion.div
        style={{ y }}
        className="text-display whitespace-nowrap text-center text-[18vw] leading-none text-near-white/[0.04]"
      >
        MAKO MARKETING
      </motion.div>
    </div>
  )
}
