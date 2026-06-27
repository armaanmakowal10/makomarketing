"use client"

import { useEffect, useRef, type RefObject } from "react"
import { useReducedMotion } from "framer-motion"
import { scrollYMV } from "@/lib/scroll-state"

/**
 * A realistic meteor rendered on a canvas. The tail is built from the head's
 * recent positions (a position history), so it flows and bends like a snake as
 * the head wanders and descends — no rigid rotating streak. Additive blending
 * gives it a glowing, fiery-but-cyan look. Driven by Lenis scroll (scrollYMV):
 * fades in as you scroll, descends the page, fades out near the CTA.
 */
export function RegionShootingStar({
  containerRef,
}: {
  containerRef: RefObject<HTMLDivElement | null>
}) {
  const reduce = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (reduce) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let W = 0
    let H = 0
    const resize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    // ── Measured travel range (descent) ──────────────────────────────────────
    let startScroll = 0
    let travelEnd = 1
    let dispStart = Infinity
    let dispEnd = Infinity
    let startX = 0
    let startY = 0
    let bottomY = 0
    let amp = 0
    let fadeIn = 1

    const measure = () => {
      const vh = window.innerHeight
      const vw = window.innerWidth
      startX = vw * 0.9 // launch near the top-right
      startY = vh * 0.12
      bottomY = vh * 0.82
      amp = startX - vw / 2
      fadeIn = vh * 0.12
      startScroll = 0

      const cta = document.getElementById("contact")
      if (cta) {
        const top = cta.getBoundingClientRect().top + window.scrollY
        travelEnd = Math.max(1, top - vh * 0.9)
        dispStart = travelEnd
        dispEnd = Math.max(dispStart + 1, top - vh * 0.25)
      } else {
        const el = containerRef.current
        const top = el ? el.getBoundingClientRect().top + window.scrollY : vh
        const h = el?.offsetHeight ?? vh
        travelEnd = Math.max(1, top + h - vh)
        dispStart = travelEnd
        dispEnd = dispStart + vh
      }
    }
    measure()
    const settle = setTimeout(measure, 600)
    const onResize = () => {
      resize()
      measure()
    }
    window.addEventListener("resize", onResize)

    // ── Animation ────────────────────────────────────────────────────────────
    const history: { x: number; y: number }[] = []
    const MAX = 95 // tail length (number of trailing samples) — a bit longer
    const start = performance.now()
    let raf = 0

    // White → cyan along the tail (head is white-hot, tail cools to cyan).
    const tint = (f: number) => {
      const r = Math.round(20 + (255 - 20) * f)
      const g = Math.round(228 + (255 - 228) * f)
      const b = Math.round(254 + (255 - 254) * f)
      return `${r},${g},${b}`
    }

    const loop = (now: number) => {
      const t = (now - start) / 1000
      const sy = scrollYMV.get()
      const p = Math.min(
        1,
        Math.max(0, (sy - startScroll) / (travelEnd - startScroll || 1))
      )

      // Base path: a gentle arc descending the page (loose, not a rigid S).
      const baseX = W / 2 + amp * Math.cos(p * Math.PI * 0.85)
      const baseY = startY + (bottomY - startY) * p

      // Boneless wander — layered sines so the head never travels in a straight
      // line; the history tail traces this, giving the snake-like flow.
      const dx =
        Math.sin(t * 0.6) * 50 + Math.sin(t * 1.7 + 1) * 20 + Math.cos(t * 0.27) * 34
      const dy =
        Math.cos(t * 0.5) * 38 + Math.sin(t * 1.3 + 2) * 16 + Math.sin(t * 0.2) * 22

      history.unshift({ x: baseX + dx, y: baseY + dy })
      if (history.length > MAX) history.pop()

      // Opacity: fade in over the first scroll, then fade OUT as the CTA section
      // rises into view. Measured live each frame from the real #contact element
      // so it always lines up with the CTA regardless of layout shifts.
      let op = Math.min(1, sy / fadeIn)
      const cta = document.getElementById("contact")
      if (cta) {
        const ctaTop = cta.getBoundingClientRect().top // relative to viewport
        const fadeStart = H * 1.4 // CTA still well below the fold → start fading
        const fadeEnd = H * 0.95 // CTA at the bottom edge → fully gone *before* it shows
        if (ctaTop <= fadeStart) {
          op *= Math.max(0, Math.min(1, (ctaTop - fadeEnd) / (fadeStart - fadeEnd)))
        }
      }
      op = Math.max(0, Math.min(1, op)) * 0.35 // dimmer overall

      ctx.clearRect(0, 0, W, H)
      if (op <= 0.002 || history.length < 3) {
        raf = requestAnimationFrame(loop)
        return
      }

      ctx.globalCompositeOperation = "lighter" // additive → glowing meteor
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      const n = history.length
      for (let i = 0; i < n - 1; i++) {
        const a = history[i]
        const b = history[i + 1]
        const f = 1 - i / (n - 1) // 1 at head, 0 at tail
        const width = 0.3 + f * f * 3.8 // taper: thinner overall
        const alpha = f * f * op

        // soft outer glow
        ctx.strokeStyle = `rgba(20,228,254,${alpha * 0.4})`
        ctx.lineWidth = width * 2.6
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()

        // bright core (white-hot near head, cyan down the tail)
        ctx.strokeStyle = `rgba(${tint(f)},${alpha})`
        ctx.lineWidth = width
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }

      // Head: radial glow + white-hot core.
      const head = history[0]
      const flick = 0.85 + Math.sin(t * 9) * 0.15 // subtle flicker
      const g = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 18)
      g.addColorStop(0, `rgba(255,255,255,${op * flick})`)
      g.addColorStop(0.28, `rgba(174,246,255,${op * 0.8})`)
      g.addColorStop(1, "rgba(20,228,254,0)")
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(head.x, head.y, 18, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = `rgba(255,255,255,${op})`
      ctx.beginPath()
      ctx.arc(head.x, head.y, 1.8, 0, Math.PI * 2)
      ctx.fill()

      ctx.globalCompositeOperation = "source-over"
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(settle)
      window.removeEventListener("resize", onResize)
    }
  }, [containerRef, reduce])

  if (reduce) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
    />
  )
}
