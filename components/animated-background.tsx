"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"

// The starfield pulls in Three.js + React Three Fiber (~150KB). Load it only when
// we actually render the live background — never on mobile, reduced-motion, or
// the static/hidden routes — so it stays out of the initial bundle everywhere.
const WebGLBackground = dynamic(
  () => import("@/components/animated-background-webgl"),
  { ssr: false }
)

// Routes that render no global background at all (they supply their own).
const HIDDEN_BG_ROUTES = new Set(["/free-audit"])

// Routes that get a calm, frozen background instead of the live WebGL starfield.
const STATIC_BG_ROUTES = new Set(["/privacy-policy", "/terms"])

// Routes that keep the live WebGL starfield but run it slower / calmer.
const SLOW_BG_ROUTES = new Set(["/services"])
const SLOW_FACTOR = 0.35

// Static pages sit on pure black — no ambient glow.
const SUBTLE_BG = "#000"

// Deterministic PRNG so the frozen starfield is identical on server and client
// (no Math.random → no hydration mismatch).
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const STATIC_STARS = (() => {
  const rnd = seeded(20240607)
  return Array.from({ length: 70 }, () => ({
    left: rnd() * 100,
    top: rnd() * 100,
    size: 1 + rnd() * 1.4,
    opacity: 0.05 + rnd() * 0.16,
  }))
})()

export function AnimatedBackground() {
  const pathname = usePathname()
  const hidden = HIDDEN_BG_ROUTES.has(pathname)
  const forceStatic = STATIC_BG_ROUTES.has(pathname)
  const speed = SLOW_BG_ROUTES.has(pathname) ? SLOW_FACTOR : 1
  const [mode, setMode] = useState<"static" | "webgl">("static")
  const [lite, setLite] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const mobile = window.matchMedia("(max-width: 768px)").matches
    setLite(mobile)
    if (reduce) {
      setMode("static")
      return
    }
    // Mobile keeps the live starfield on the homepage only — and in a lighter
    // form for smoothness. Every other route falls back to the calm static
    // background so phones aren't running WebGL where it isn't needed.
    if (mobile) {
      setMode(pathname === "/" ? "webgl" : "static")
      return
    }
    setMode("webgl")
  }, [pathname])

  // Routes that supply their own background render nothing here.
  if (hidden) return null

  // Our Process: a calm, frozen background — no WebGL canvas at all.
  if (forceStatic) {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ background: SUBTLE_BG }}
      >
        {STATIC_STARS.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              opacity: s.opacity,
              backgroundColor: "#bdf3ff",
            }}
          />
        ))}
      </div>
    )
  }

  if (mode === "static") {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ background: "#000" }}
      />
    )
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      // Pure black base shows instantly and underneath, so there's never a
      // flash while the WebGL chunk streams in.
      style={{ background: "#000" }}
    >
      <WebGLBackground speed={speed} lite={lite} />
    </div>
  )
}
