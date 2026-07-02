"use client"

import { useEffect, useMemo, useRef, type RefObject } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { scrollState } from "@/lib/scroll-state"

// Particle counts: the full desktop field, and a lighter one for mobile so the
// homepage starfield stays smooth on phones.
const COUNT_FULL = 3800
const COUNT_LITE = 1400

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
  count = COUNT_FULL,
}: {
  pointer: Pointer
  speed?: number
  count?: number
}) {
  const ref = useRef<THREE.Points>(null!)
  const starTexture = useMemo(() => makeStarTexture(), [])

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16
      arr[i * 3 + 1] = (Math.random() - 0.5) * 16
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [count])

  // Free the GPU texture on unmount (route change to a static-bg page).
  useEffect(() => () => starTexture.dispose(), [starTexture])

  useFrame((_, delta) => {
    const p = ref.current
    if (!p) return
    // Skip simulation while the tab is backgrounded — no point spending frames.
    if (typeof document !== "undefined" && document.hidden) return
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

function Scene({ speed = 1, count = COUNT_FULL }: { speed?: number; count?: number }) {
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current.x = e.clientX / window.innerWidth - 0.5
      pointer.current.y = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  return <ParticleCurrent pointer={pointer} speed={speed} count={count} />
}

/** The live WebGL starfield. Loaded on demand via next/dynamic (ssr: false).
 *  `lite` (mobile) runs fewer particles at a capped pixel ratio for smoothness. */
export default function WebGLBackground({
  speed = 1,
  lite = false,
}: {
  speed?: number
  lite?: boolean
}) {
  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={lite ? 1 : [1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <Scene speed={speed} count={lite ? COUNT_LITE : COUNT_FULL} />
      </Canvas>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 50%, transparent 35%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </>
  )
}
