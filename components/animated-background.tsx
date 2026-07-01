"use client"

import { useEffect, useMemo, useRef, useState, type RefObject } from "react"
import { usePathname } from "next/navigation"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { scrollState } from "@/lib/scroll-state"

const COUNT = 3800

// Routes that render no global background at all (they supply their own).
const HIDDEN_BG_ROUTES = new Set(["/free-audit"])

// Routes that get a calm, frozen background instead of the live WebGL starfield.
const STATIC_BG_ROUTES = new Set(["/privacy-policy", "/terms"])

// Routes that keep the live WebGL starfield but run it slower / calmer.
const SLOW_BG_ROUTES = new Set(["/services"])
const SLOW_FACTOR = 0.35

// Subtle layered glow used behind the static pages — soft cyan from the top,
// a faint lift at the bottom, over pure black.
const SUBTLE_BG =
  "radial-gradient(75% 55% at 50% 12%, rgba(20,228,254,0.09), transparent 70%)," +
  "radial-gradient(100% 80% at 50% 112%, rgba(20,228,254,0.05), transparent 65%)," +
  "#000"

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

type Pointer = RefObject<{ x: number; y: number }>

/** A soft round point of light (a star in the sky), used as the point sprite. */
function makeStarTexture() {
  const size = 64
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")!
  const r = size / 2
  const grad = ctx.createRadialGradient(r, r, 0, r, r, r)
  grad.addColorStop(0, "rgba(255,255,255,1)")
  grad.addColorStop(0.18, "rgba(255,255,255,0.85)")
  grad.addColorStop(0.45, "rgba(255,255,255,0.25)")
  grad.addColorStop(1, "rgba(255,255,255,0)")
  ctx.fillStyle = grad
  ctx.beginPath()
  ctx.arc(r, r, r, 0, Math.PI * 2)
  ctx.fill()

  const tex = new THREE.CanvasTexture(canvas)
  tex.needsUpdate = true
  return tex
}

function ParticleCurrent({
  pointer,
  speed = 1,
}: {
  pointer: Pointer
  speed?: number
}) {
  const ref = useRef<THREE.Points>(null!)
  const starTexture = useMemo(() => makeStarTexture(), [])

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16
      arr[i * 3 + 1] = (Math.random() - 0.5) * 16
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [])

  useFrame((_, delta) => {
    const p = ref.current
    if (!p) return
    const vel = scrollState.velocity || 0
    // `speed` scales the ambient drift (and how strongly scroll velocity tugs the
    // field) so a route can run the same starfield at a calmer pace.
    p.rotation.y += (delta * 0.02 + vel * 0.00012) * speed
    p.rotation.z += delta * 0.004 * speed
    const stretch = THREE.MathUtils.clamp(1 + Math.abs(vel) * 0.0007 * speed, 1, 1.5)
    p.scale.y = THREE.MathUtils.lerp(p.scale.y || 1, stretch, 0.08)
    p.position.x = THREE.MathUtils.lerp(
      p.position.x,
      pointer.current.x * 0.7,
      0.04 * speed
    )
    p.position.y = THREE.MathUtils.lerp(
      p.position.y,
      -pointer.current.y * 0.7 - scrollState.progress * 1.4,
      0.04 * speed
    )
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#14e4fe"
        map={starTexture}
        size={0.06}
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function Scene({ speed = 1 }: { speed?: number }) {
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current.x = e.clientX / window.innerWidth - 0.5
      pointer.current.y = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  return <ParticleCurrent pointer={pointer} speed={speed} />
}

export function AnimatedBackground() {
  const pathname = usePathname()
  const hidden = HIDDEN_BG_ROUTES.has(pathname)
  const forceStatic = STATIC_BG_ROUTES.has(pathname)
  const speed = SLOW_BG_ROUTES.has(pathname) ? SLOW_FACTOR : 1
  const [mode, setMode] = useState<"static" | "webgl">("static")

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const mobile = window.matchMedia("(max-width: 768px)").matches
    setMode(reduce || mobile ? "static" : "webgl")
  }, [])

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
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(20,228,254,0.10), transparent 70%), #000",
        }}
      />
    )
  }

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <Scene speed={speed} />
      </Canvas>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 50%, transparent 35%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  )
}
