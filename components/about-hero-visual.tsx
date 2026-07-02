"use client"

import { motion, useReducedMotion } from "framer-motion"
import {
  MonitorSmartphone,
  Target,
  Megaphone,
  MapPin,
  Search,
  type LucideIcon,
} from "lucide-react"

type Badge = {
  icon: LucideIcon
  label: string
  className: string
  delay: number
}

// Positioned around a central glowing core. Percentages keep them responsive
// within the square container.
const badges: Badge[] = [
  { icon: Target, label: "Google Ads", className: "left-[2%] top-[10%]", delay: 0 },
  { icon: Megaphone, label: "Meta Ads", className: "right-[0%] top-[2%]", delay: 0.5 },
  { icon: Search, label: "SEO", className: "right-[4%] top-[52%]", delay: 1 },
  { icon: MonitorSmartphone, label: "Web Design", className: "left-[0%] top-[58%]", delay: 1.5 },
  { icon: MapPin, label: "Local Ads", className: "left-[30%] bottom-[2%]", delay: 2 },
]

/**
 * Decorative hero graphic for the About page — a glowing brand core ringed by a
 * slowly rotating dashed orbit, with the service badges gently floating around
 * it. Purely ornamental (aria-hidden); hidden on small screens.
 */
export function AboutHeroVisual() {
  const reduce = useReducedMotion()

  return (
    <div
      aria-hidden
      className="relative mx-auto aspect-square w-full max-w-[440px]"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(20,228,254,0.18),transparent_65%)] blur-2xl" />

      {/* Rotating dashed orbit ring */}
      <motion.div
        className="absolute inset-[14%] rounded-full border border-dashed border-cyan/25"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      {/* Second counter-rotating ring */}
      <motion.div
        className="absolute inset-[26%] rounded-full border border-cyan/15"
        animate={reduce ? undefined : { rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Central core */}
      <motion.div
        className="absolute left-1/2 top-1/2 flex size-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan/40 bg-gradient-to-br from-cyan/20 to-black shadow-[0_0_50px_-8px_rgba(20,228,254,0.7)]"
        animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-display text-2xl text-cyan-gradient">Mako</span>
      </motion.div>

      {/* Floating service badges */}
      {badges.map((b) => {
        const Icon = b.icon
        return (
          <motion.div
            key={b.label}
            className={`absolute ${b.className} flex items-center gap-2 rounded-full border border-line-strong bg-surface-1/80 px-3.5 py-2 shadow-[0_0_30px_-12px_rgba(20,228,254,0.6)] backdrop-blur-sm`}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + b.delay * 0.15, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <motion.span
              className="flex items-center gap-2"
              animate={reduce ? undefined : { y: [0, -7, 0] }}
              transition={{ duration: 3 + b.delay, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
            >
              <span className="flex size-6 items-center justify-center rounded-md bg-cyan/10 text-cyan">
                <Icon className="size-3.5" />
              </span>
              <span className="text-xs font-medium text-near-white/90">
                {b.label}
              </span>
            </motion.span>
          </motion.div>
        )
      })}
    </div>
  )
}
