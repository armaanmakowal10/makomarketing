"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { useReducedMotion } from "framer-motion"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    // Anchor links scroll smoothly through Lenis
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[href^="#"]')
      if (!target) return
      const id = target.getAttribute("href")
      if (!id || id === "#") return
      const el = document.querySelector(id)
      if (el) {
        e.preventDefault()
        lenis.scrollTo(el as HTMLElement, { offset: -80 })
      }
    }
    document.addEventListener("click", onClick)

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener("click", onClick)
      lenis.destroy()
    }
  }, [reduce])

  return <>{children}</>
}
