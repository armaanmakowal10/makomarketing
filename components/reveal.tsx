"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"
import { forwardRef, type ReactNode, type UIEventHandler } from "react"

const DURATION = 0.55
const Y = 30
const SCALE = 0.95
// easeOutBack — gives the content a subtle "pop" as it appears
const POP: [number, number, number, number] = [0.34, 1.56, 0.64, 1]

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  amount?: number
  as?: "div" | "section" | "li" | "span"
}

/** Fade + slide-up as the element scrolls into view (once, at ~20% visible). */
export function Reveal({
  children,
  className,
  delay = 0,
  y = Y,
  amount = 0.25,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] as typeof motion.div

  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, scale: SCALE }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount }}
      transition={{ duration: DURATION, ease: reduce ? "easeOut" : POP, delay }}
    >
      {children}
    </MotionTag>
  )
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: Y, scale: SCALE },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: DURATION, ease: POP },
  },
}

const itemReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATION } },
}

/** Staggered reveal for grids/lists — children cascade in as they enter view. */
export const StaggerGroup = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode
    className?: string
    amount?: number
    onScroll?: UIEventHandler<HTMLDivElement>
  }
>(function StaggerGroup({ children, className, amount = 0.25, onScroll }, ref) {
  return (
    <motion.div
      ref={ref}
      onScroll={onScroll}
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount }}
    >
      {children}
    </motion.div>
  )
})

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div className={className} variants={reduce ? itemReduced : item}>
      {children}
    </motion.div>
  )
}

// Alias to match the spec's naming.
export { StaggerGroup as RevealStagger }
