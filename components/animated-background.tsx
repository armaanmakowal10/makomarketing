"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { scrollState } from "@/lib/scroll-state"

const COUNT = 3800

function ParticleCurrent() {
  const ref = useRef<THREE.Points>(null!)
  const pointer = useRef({ x: 0, y: 0 })

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16
      arr[i * 3 + 1] = (Math.random() - 0.5) * 16
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current.x = e.clientX / window.innerWidth - 0.5
      pointer.current.y = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  useFrame((_, delta) => {
    const p = ref.current
    if (!p) return
    const vel = scrollState.velocity || 0
    // slow base drift; scroll velocity speeds up the current
    p.rotation.y += delta * 0.02 + vel * 0.00012
    p.rotation.z += delta * 0.004
    // velocity stretches the flow along its axis
    const stretch = THREE.MathUtils.clamp(1 + Math.abs(vel) * 0.0007, 1, 1.5)
    p.scale.y = THREE.MathUtils.lerp(p.scale.y || 1, stretch, 0.08)
    // pointer parallax + slow drift with scroll position
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
        size={0.028}
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
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
        <ParticleCurrent />
      </Canvas>
      {/* vignette so the field never competes with text */}
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
