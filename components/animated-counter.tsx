"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"

/**
 * Counts a numeric prefix up when scrolled into view.
 * Values like "150%", "100+", "8+" animate the number and keep the suffix.
 * Non-numeric values like "24/7" render as-is.
 */
export function AnimatedCounter({
  value,
  className,
  duration = 1600,
}: {
  value: string
  className?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState<string>(value)

  // Optional non-digit prefix ("+"), number, then suffix ("x", "%", "+", "/7").
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/)
  const prefix = match ? match[1] : ""
  const target = match ? parseFloat(match[2]) : null
  const suffix = match ? match[3] : ""
  const decimals = match && match[2].includes(".") ? 1 : 0

  useEffect(() => {
    if (target === null) {
      setDisplay(value)
      return
    }
    if (!inView) {
      setDisplay(`${prefix}0${suffix}`)
      return
    }
    if (reduce) {
      setDisplay(value)
      return
    }

    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      const current = (target * eased).toFixed(decimals)
      setDisplay(`${prefix}${current}${suffix}`)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, prefix, suffix, value, duration, decimals, reduce])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
