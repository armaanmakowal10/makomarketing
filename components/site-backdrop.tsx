"use client"

import { useEffect, useRef } from "react"

type P = { x: number; y: number; vx: number; vy: number; r: number }

/**
 * Global living backdrop that spans the whole site.
 * A drifting cyan particle constellation that reacts to the cursor and to
 * scroll (parallax + energy), plus soft plasma blobs for depth.
 * Fixed behind all content; sections are transparent so it shows throughout.
 */
export function SiteBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    // On phones, run a lighter constellation: fewer particles, no link pass,
    // no per-particle shadow blur — keeps the effect alive without draining battery.
    const mobile = window.matchMedia("(max-width: 768px)").matches

    let w = 0
    let h = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let particles: P[] = []
    const mouse = { x: -9999, y: -9999 }
    let scrollY = window.scrollY
    let scrollVel = 0
    let parallax = 0

    const LINK_DIST = 130

    const build = () => {
      const count = Math.min(
        mobile ? 36 : 110,
        Math.floor((w * h) / (mobile ? 24000 : 16000))
      )
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.6,
      }))
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + "px"
      canvas.style.height = h + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }
    resize()

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onScroll = () => {
      const y = window.scrollY
      scrollVel = y - scrollY
      scrollY = y
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      // scroll-driven energy: the field surges and streaks as you scroll,
      // then settles back to a calm constellation when you stop.
      parallax += (scrollVel - parallax) * 0.18
      scrollVel *= 0.82
      const energy = Math.min(Math.abs(parallax), 55)
      const dir = parallax >= 0 ? 1 : -1
      const linkScale = Math.max(0, 1 - energy / 24)

      // soft plasma blobs (depth)
      const t = performance.now() * 0.00006
      ctx.globalCompositeOperation = "lighter"
      for (let i = 0; i < 3; i++) {
        const bx = (0.3 + 0.2 * i + 0.15 * Math.sin(t + i)) * w
        const by =
          (0.4 + 0.18 * Math.cos(t * 1.3 + i * 2)) * h - parallax * (i + 1) * 2
        const rad = Math.min(w, h) * (0.35 - i * 0.05)
        const g = ctx.createRadialGradient(bx, by, 0, bx, by, rad)
        g.addColorStop(0, "rgba(20,228,254,0.10)")
        g.addColorStop(1, "rgba(20,228,254,0)")
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(bx, by, rad, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalCompositeOperation = "source-over"

      // particles
      for (const p of particles) {
        if (!reduce) {
          p.x += p.vx
          p.y += p.vy - parallax * 0.6

          // mouse interaction (gentle attraction)
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const d2 = dx * dx + dy * dy
          if (d2 < 26000) {
            const f = (1 - d2 / 26000) * 0.04
            p.vx += dx * 0.00009 * f * 1000
            p.vy += dy * 0.00009 * f * 1000
          }
          // damping + speed cap
          p.vx *= 0.99
          p.vy *= 0.99
          const sp = Math.hypot(p.vx, p.vy)
          if (sp > 0.9) {
            p.vx = (p.vx / sp) * 0.9
            p.vy = (p.vy / sp) * 0.9
          }

          // wrap
          if (p.x < -20) p.x = w + 20
          if (p.x > w + 20) p.x = -20
          if (p.y < -20) p.y = h + 20
          if (p.y > h + 20) p.y = -20
        }
      }

      // links (skipped on mobile — this is the O(n²) hot path)
      if (!mobile) {
        for (let i = 0; i < particles.length; i++) {
          const a = particles[i]
          for (let j = i + 1; j < particles.length; j++) {
            const b = particles[j]
            const dx = a.x - b.x
            const dy = a.y - b.y
            const dist = Math.hypot(dx, dy)
            if (dist < LINK_DIST) {
              const alpha = (1 - dist / LINK_DIST) * 0.16 * linkScale
              ctx.strokeStyle = `rgba(20,228,254,${alpha})`
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(b.x, b.y)
              ctx.stroke()
            }
          }
        }
      }

      // particles: streak into light-trails while scrolling, dots when idle
      const streak = energy * 3
      ctx.shadowColor = "rgba(20,228,254,0.8)"
      ctx.shadowBlur = mobile ? 0 : 6
      ctx.lineCap = "round"
      for (const p of particles) {
        if (streak > 2) {
          const ty = p.y + dir * streak
          const g = ctx.createLinearGradient(p.x, p.y, p.x, ty)
          g.addColorStop(0, "rgba(20,228,254,0.9)")
          g.addColorStop(1, "rgba(20,228,254,0)")
          ctx.strokeStyle = g
          ctx.lineWidth = p.r * 2
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p.x, ty)
          ctx.stroke()
        }
        ctx.fillStyle = "rgba(20,228,254,0.7)"
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.shadowBlur = 0
    }

    let frame = 0
    const loop = () => {
      draw()
      frame = requestAnimationFrame(loop)
    }

    if (reduce) {
      draw()
    } else {
      frame = requestAnimationFrame(loop)
      window.addEventListener("mousemove", onMove, { passive: true })
      window.addEventListener("scroll", onScroll, { passive: true })
    }
    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      style={{ opacity: 0.55 }}
    />
  )
}
