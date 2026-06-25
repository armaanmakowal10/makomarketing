"use client"

import { useEffect, useMemo, useRef, useState, type RefObject } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { scrollState } from "@/lib/scroll-state"

const COUNT = 3800

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

function ParticleCurrent({ pointer }: { pointer: Pointer }) {
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
    p.rotation.y += delta * 0.02 + vel * 0.00012
    p.rotation.z += delta * 0.004
    const stretch = THREE.MathUtils.clamp(1 + Math.abs(vel) * 0.0007, 1, 1.5)
    p.scale.y = THREE.MathUtils.lerp(p.scale.y || 1, stretch, 0.08)
    p.position.x = THREE.MathUtils.lerp(p.position.x, pointer.current.x * 0.7, 0.04)
    p.position.y = THREE.MathUtils.lerp(
      p.position.y,
      -pointer.current.y * 0.7 - scrollState.progress * 1.4,
      0.04
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

function Scene() {
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current.x = e.clientX / window.innerWidth - 0.5
      pointer.current.y = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  return <ParticleCurrent pointer={pointer} />
}

export function AnimatedBackground() {
  const [mode, setMode] = useState<"static" | "webgl">("static")

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const mobile = window.matchMedia("(max-width: 768px)").matches
    setMode(reduce || mobile ? "static" : "webgl")
  }, [])

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
        <Scene />
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
