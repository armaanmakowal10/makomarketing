"use client"

import { motion, useReducedMotion } from "framer-motion"

/**
 * Subtle, calm background used only on the booking / free-audit page. Two very
 * low-opacity cyan blobs drift slowly (30s+) over pure black, with a faint
 * static base glow. Readability of the copy is the priority, so the effective
 * opacity stays in the ~3-6% range and there is no fast or high-contrast motion.
 * Honors prefers-reduced-motion by holding the blobs still.
 */
export function FreeAuditBackground() {
  const reduce = useReducedMotion()
  const blob = "absolute rounded-full blur-[130px]"

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black"
    >
      {/* faint static base glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(20,228,254,0.04),transparent_65%)]" />

      <motion.div
        className={`${blob} left-[8%] top-[12%] h-[48vh] w-[48vh] bg-cyan/[0.06]`}
        animate={
          reduce
            ? undefined
            : { x: [0, 60, 0], y: [0, 40, 0], opacity: [0.55, 1, 0.55] }
        }
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`${blob} bottom-[10%] right-[6%] h-[42vh] w-[42vh] bg-cyan/[0.05]`}
        animate={
          reduce
            ? undefined
            : { x: [0, -50, 0], y: [0, -32, 0], opacity: [0.55, 0.95, 0.55] }
        }
        transition={{ duration: 44, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}
