"use client"

import { motion, useInView, useReducedMotion, type Variants } from "framer-motion"
import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type UIEventHandler,
} from "react"

const DURATION = 0.55
const Y = 30
const SCALE = 0.95
// easeOutBack — gives the content a subtle "pop" as it appears
const POP: [number, number, number, number] = [0.34, 1.56, 0.64, 1]

// Was the element already inside the viewport at mount? whileInView/useInView can
// miss this case (content that's on-screen before the observer attaches), leaving
// it stuck invisible — this synchronous check guarantees it reveals.
function inViewportNow(el: HTMLElement | null) {
  if (!el) return false
  const r = el.getBoundingClientRect()
  return r.top < window.innerHeight && r.bottom > 0
}

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  amount?: number
  as?: "div" | "section" | "li" | "span"
}

/** Fade + slide-up as the element scrolls into view (once). Reveals reliably even
 *  when the element is already on-screen at load. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = Y,
  amount = 0.25,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount })
  const [mountShown, setMountShown] = useState(false)
  useEffect(() => {
    if (inViewportNow(ref.current)) setMountShown(true)
  }, [])
  const shown = inView || mountShown

  const hidden = reduce ? { opacity: 0 } : { opacity: 0, y, scale: SCALE }
  const visible = reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }
  const MotionTag = motion[as] as typeof motion.div

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={hidden}
      animate={shown ? visible : hidden}
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
>(function StaggerGroup({ children, className, amount = 0.25, onScroll }, forwardedRef) {
  const innerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(innerRef, { once: true, amount })
  const [mountShown, setMountShown] = useState(false)
  useEffect(() => {
    if (inViewportNow(innerRef.current)) setMountShown(true)
  }, [])
  const shown = inView || mountShown

  // Merge the internal ref (for in-view detection) with any forwarded ref.
  const setRefs = (node: HTMLDivElement | null) => {
    innerRef.current = node
    if (typeof forwardedRef === "function") forwardedRef(node)
    else if (forwardedRef) forwardedRef.current = node
  }

  return (
    <motion.div
      ref={setRefs}
      onScroll={onScroll}
      className={className}
      variants={container}
      initial="hidden"
      animate={shown ? "show" : "hidden"}
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
