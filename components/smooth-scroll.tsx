"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { scrollState, lenisRef } from "@/lib/scroll-state"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return

    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })
    lenisRef.current = lenis

    // Single RAF loop: drive Lenis from GSAP's ticker so scroll-linked motion
    // stays in sync (no 1–2 frame lag).
    lenis.on("scroll", (e: Lenis) => {
      ScrollTrigger.update()
      scrollState.y = e.scroll
      scrollState.velocity = e.velocity
      scrollState.progress = e.progress
    })
    const update = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    // Anchor links scroll smoothly through Lenis.
    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement)?.closest('a[href*="#"]')
      if (!target) return
      const href = target.getAttribute("href") || ""
      const hash = href.includes("#") ? href.slice(href.indexOf("#")) : ""
      // Only intercept same-page anchors (href "#x" or "/#x" while on home).
      const path = href.split("#")[0]
      const samePage = path === "" || path === "/" && window.location.pathname === "/"
      if (!hash || hash === "#" || !samePage) return
      const el = document.querySelector(hash)
      if (el) {
        event.preventDefault()
        lenis.scrollTo(el as HTMLElement, { offset: -90 })
      }
    }
    document.addEventListener("click", onClick)

    return () => {
      document.removeEventListener("click", onClick)
      gsap.ticker.remove(update)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}
