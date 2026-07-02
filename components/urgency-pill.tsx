"use client"

import { motion } from "framer-motion"

/**
 * Animated "spots remaining" urgency pill. Sits above a CTA to add scarcity.
 * Breathing glow + shimmer sweep + pinging dot, matching the site's cyan brand.
 */
export function UrgencyPill({
  className = "",
  text = "Only 2 spots remaining — lock yours in",
}: {
  className?: string
  text?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-cyan/40 bg-cyan/[0.08] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan ${className}`}
    >
      {/* Breathing glow */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full"
        animate={{ boxShadow: [
          "0 0 0 0 rgba(20,228,254,0)",
          "0 0 20px -2px rgba(20,228,254,0.55)",
          "0 0 0 0 rgba(20,228,254,0)",
        ] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Shimmer sweep */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-10 -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent"
        animate={{ left: ["-20%", "120%"] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
      />
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan opacity-70" />
        <span className="relative inline-flex size-2 rounded-full bg-cyan" />
      </span>
      <span className="relative">{text}</span>
    </motion.div>
  )
}
