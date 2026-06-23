"use client"

import { useEffect, useRef, useState } from "react"

type Blob = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  hue: number
}

/**
 * Lusion-inspired fluid plasma backdrop.
 * Soft cyan metaball-ish blobs drift and gently react to the cursor.
 * Rendered on a low-res canvas + CSS blur for a performant "fluid" look.
 *
 * Perf guardrails:
 *  - Disabled on mobile and under reduced-motion (static gradient fallback,
 *    no rAF loop) per the brief.
 *  - The rAF loop pauses when the hero scrolls out of view (IntersectionObserver).
 */
export function FluidBackdrop({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Start in the SSR-safe "static" mode; promote to "canvas" on capable devices.
  const [mode, setMode] = useState<"static" | "canvas">("static")

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const mobile = window.matchMedia("(max-width: 768px)").matches
    setMode(reduce || mobile ? "static" : "canvas")
  }, [])

  useEffect(() => {
    if (mode !== "canvas") return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const SCALE = 0.32 // render small, scale up with CSS blur
    let w = 0
    let h = 0
    const mouse = { x: 0.5, y: 0.4, active: false }

    const blobs: Blob[] = [
      { x: 0.3, y: 0.4, vx: 0.00008, vy: 0.00006, r: 0.5, hue: 188 },
      { x: 0.7, y: 0.55, vx: -0.00006, vy: 0.00009, r: 0.42, hue: 192 },
      { x: 0.55, y: 0.25, vx: 0.0001, vy: -0.00007, r: 0.36, hue: 184 },
      { x: 0.45, y: 0.7, vx: -0.00009, vy: -0.00005, r: 0.45, hue: 190 },
    ]

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = Math.max(1, Math.floor(rect.width * SCALE))
      h = Math.max(1, Math.floor(rect.height * SCALE))
      canvas.width = w
      canvas.height = h
    }
    resize()

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = (e.clientX - rect.left) / rect.width
      mouse.y = (e.clientY - rect.top) / rect.height
      mouse.active = true
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = "lighter"
      for (let i = 0; i < blobs.length; i++) {
        const b = blobs[i]
        b.x += b.vx
        b.y += b.vy
        if (b.x < 0.05 || b.x > 0.95) b.vx *= -1
        if (b.y < 0.05 || b.y > 0.95) b.vy *= -1
        // gentle pull toward cursor
        if (mouse.active) {
          b.x += (mouse.x - b.x) * 0.0006
          b.y += (mouse.y - b.y) * 0.0006
        }
        const cx = b.x * w
        const cy = b.y * h
        const rad = b.r * Math.min(w, h)
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad)
        g.addColorStop(0, `hsla(${b.hue}, 100%, 60%, 0.55)`)
        g.addColorStop(0.4, `hsla(${b.hue}, 100%, 55%, 0.22)`)
        g.addColorStop(1, "hsla(190, 100%, 50%, 0)")
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(cx, cy, rad, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalCompositeOperation = "source-over"
    }

    let frame = 0
    let running = false
    const loop = () => {
      draw()
      frame = requestAnimationFrame(loop)
    }
    const start = () => {
      if (running) return
      running = true
      frame = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(frame)
    }

    // Pause the loop while the hero is off-screen.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    )
    io.observe(canvas)

    window.addEventListener("mousemove", onMove)
    window.addEventListener("resize", resize)

    return () => {
      stop()
      io.disconnect()
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("resize", resize)
    }
  }, [mode])

  if (mode === "static") {
    // Static fallback — no animation, no rAF. Matches the canvas palette.
    return (
      <div
        aria-hidden
        className={`pointer-events-none h-full w-full opacity-70 ${className}`}
        style={{
          background:
            "radial-gradient(60% 50% at 40% 42%, rgba(20,228,254,0.22), transparent 70%), radial-gradient(45% 40% at 70% 60%, rgba(20,228,254,0.16), transparent 72%)",
          filter: "blur(40px) saturate(1.2)",
        }}
      />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none h-full w-full opacity-70 ${className}`}
      style={{ filter: "blur(60px) saturate(1.3)" }}
    />
  )
}
