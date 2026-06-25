"use client"

import { motion, useSpring } from "framer-motion"
import { scrollProgressMV } from "@/lib/scroll-state"

export function ScrollProgress() {
  const scaleX = useSpring(scrollProgressMV, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[120] h-[2px] origin-left bg-cyan shadow-[0_0_12px_rgba(20,228,254,0.9)]"
    />
  )
}
