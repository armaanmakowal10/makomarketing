"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

/* ------------------------------------------------------------------ *
 * Star Wars "lightspeed jump" — points in fake 3D space projected from
 * a vanishing point. Each frame z shrinks and we draw a line from the
 * star's previous projected position to its current one: a dot at rest,
 * a radial streak at speed. One GSAP timeline tweens { speed, flash };
 * a single rAF loop reads those numbers and does all drawing.
 * ------------------------------------------------------------------ */

// ---- Tunables ----
const STAR_COUNT_DESKTOP = 1200
const STAR_COUNT_MOBILE = 400
const FOCAL_LENGTH = 320
const Z_NEAR = 1
const Z_FAR = 1400
const DRIFT_SPEED = 30 // z-units/sec — calm starfield drifts behind the held logo
const PEAK_SPEED = 2600 // z-units/sec — full radial streaks
const DRIFT_MS = 480 // gentle lead-in so the warp grows out of the logo
const JUMP_MS = 1350 // cinematic but snappy acceleration
const FLASH_MS = 520
const CANVAS_FADE_MS = 480 // starfield materialises behind the logo (no pop)
const LOGO_SCALE_TO = 1.15
const STREAK_JITTER = 0.35
const TRAIL_ALPHA = 0.32 // per-frame (60fps) black fade — higher = shorter trails

const CYAN = "20,228,254"
const HOT = "235,253,255"

export function LightspeedWarp({
  logoRef,
  started,
  onComplete,
}: {
  logoRef: React.RefObject<HTMLDivElement | null>
  started: boolean
  onComplete: () => void
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const flashRef = useRef<HTMLDivElement | null>(null)
  const startWarpRef = useRef<(() => void) | null>(null)

  // ---- Mount (during the logo hold): build the star pool, start the calm
  // drift, and dawn the canvas in gently. All the heavy setup — canvas context,
  // typed-array pools, first paint — happens HERE, ahead of the splice. By the
  // time the warp triggers, the field is already present and drifting, so the
  // transition is a pure acceleration: nothing mounts, nothing fades in, no
  // layer appears. That is what makes the logo→hyperspace handoff seamless. ----
  useEffect(() => {
    const canvas = canvasRef.current
    const flash = flashRef.current
    if (!canvas || !flash) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const isMobile = window.matchMedia("(max-width: 640px)").matches
    const STAR_COUNT = isMobile ? STAR_COUNT_MOBILE : STAR_COUNT_DESKTOP

    let W = 0
    let H = 0
    let cx = 0
    let cy = 0
    let spread = 0

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = window.innerWidth
      H = window.innerHeight
      cx = W / 2
      cy = H / 2
      spread = Math.max(W, H) * 1.1
      canvas!.width = Math.round(W * dpr)
      canvas!.height = Math.round(H * dpr)
      canvas!.style.width = W + "px"
      canvas!.style.height = H + "px"
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    // Fixed pool — typed arrays, no per-frame allocation.
    const xs = new Float32Array(STAR_COUNT)
    const ys = new Float32Array(STAR_COUNT)
    const zs = new Float32Array(STAR_COUNT)
    const pxArr = new Float32Array(STAR_COUNT)
    const pyArr = new Float32Array(STAR_COUNT)
    const jit = new Float32Array(STAR_COUNT) // per-star length/brightness jitter

    function reproject(i: number) {
      pxArr[i] = cx + (xs[i] / zs[i]) * FOCAL_LENGTH
      pyArr[i] = cy + (ys[i] / zs[i]) * FOCAL_LENGTH
    }
    function spawn(i: number, freshZ: boolean) {
      xs[i] = (Math.random() - 0.5) * 2 * spread
      ys[i] = (Math.random() - 0.5) * 2 * spread
      zs[i] = freshZ ? Z_NEAR + Math.random() * (Z_FAR - Z_NEAR) : Z_FAR
      jit[i] = 1 - STREAK_JITTER + Math.random() * STREAK_JITTER * 2
      reproject(i) // reset prev to new projection — no streak across screen on respawn
    }
    for (let i = 0; i < STAR_COUNT; i++) spawn(i, true)

    const state = { speed: DRIFT_SPEED, flash: 0 }

    function render(dt: number) {
      // Low-alpha clear instead of a hard wipe — leaves fading trails so the
      // streaks blur smoothly frame-to-frame (kills the strobing/choppiness).
      // Framerate-normalised so trail length is steady regardless of fps.
      const fade = 1 - Math.pow(1 - TRAIL_ALPHA, dt * 60)
      ctx!.fillStyle = `rgba(0,0,0,${fade})`
      ctx!.fillRect(0, 0, W, H)
      ctx!.lineCap = "round"

      const speed = state.speed
      for (let i = 0; i < STAR_COUNT; i++) {
        zs[i] -= speed * dt * jit[i]
        if (zs[i] <= Z_NEAR) {
          spawn(i, false)
          continue
        }
        const sx = cx + (xs[i] / zs[i]) * FOCAL_LENGTH
        const sy = cy + (ys[i] / zs[i]) * FOCAL_LENGTH
        const depth = 1 - zs[i] / Z_FAR // 0 far → 1 near
        const w = 0.4 + depth * depth * 3.4
        const a = Math.min(1, 0.14 + depth * 1.1)

        ctx!.strokeStyle = `rgba(${CYAN},${a})`
        ctx!.lineWidth = w
        ctx!.beginPath()
        ctx!.moveTo(pxArr[i], pyArr[i])
        ctx!.lineTo(sx, sy)
        ctx!.stroke()

        // hot white core over the cyan once the streak is close/fast
        if (depth > 0.5) {
          ctx!.strokeStyle = `rgba(${HOT},${Math.min(1, (depth - 0.5) * 1.8)})`
          ctx!.lineWidth = w * 0.42
          ctx!.beginPath()
          ctx!.moveTo(pxArr[i], pyArr[i])
          ctx!.lineTo(sx, sy)
          ctx!.stroke()
        }

        pxArr[i] = sx
        pyArr[i] = sy
      }

      flash!.style.opacity = String(state.flash)
    }

    let raf = 0
    let last = performance.now()
    function frame(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      render(dt)
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    // Debounced resize — reproject prev positions so streaks don't smear.
    let resizeT = 0
    function onResize() {
      window.clearTimeout(resizeT)
      resizeT = window.setTimeout(() => {
        resize()
        for (let i = 0; i < STAR_COUNT; i++) reproject(i)
      }, 120)
    }
    window.addEventListener("resize", onResize)

    // Dawn the calm starfield in gently while the logo still holds — this is a
    // slow ambient fade during the hold, decoupled from (and finished before)
    // the acceleration, so the splice never has a layer appearing on it.
    gsap.set(canvas, { opacity: 0 })
    const dawn = gsap.to(canvas, {
      opacity: 1,
      duration: CANVAS_FADE_MS / 1000,
      ease: "power2.out",
    })

    // ---- Acceleration timeline — built lazily and played only at the splice
    // (when `started` flips). The field is already drifting & visible, so this
    // just speeds it up; no canvas fade-in here. ----
    let accelTl: gsap.core.Timeline | null = null
    startWarpRef.current = () => {
      if (accelTl) return
      const logo = logoRef.current
      const ACCEL_S = (DRIFT_MS + JUMP_MS) / 1000
      accelTl = gsap.timeline({ onComplete })

      // ONE continuous curve from the current drift speed to peak (power3.in):
      // stays slow early then builds into the jump, with no ease seam to hitch on.
      accelTl.to(state, { speed: PEAK_SPEED, duration: ACCEL_S, ease: "power3.in" }, 0)

      // Logo flies through. Scale eases in from rest (power2.in starts at zero
      // velocity → no jump out of the static hold) across the whole acceleration;
      // opacity holds through the early drift then dissolves smoothly (sine.in).
      if (logo) {
        accelTl.to(logo, { scale: LOGO_SCALE_TO, duration: ACCEL_S, ease: "power2.in" }, 0)
        accelTl.to(logo, { opacity: 0, duration: ACCEL_S * 0.6, ease: "sine.in" }, ACCEL_S * 0.4)
      }

      // Flash — a smooth bell rounding off at the peak as speed maxes out; the
      // white-out then dissipates via the overlay's crossfade exit (IntroOverlay).
      accelTl.to(state, { flash: 1, duration: FLASH_MS / 1000, ease: "power2.out" }, ACCEL_S - 0.12)
      accelTl.to({}, { duration: 0.12 }) // brief hold at white before handoff
    }

    return () => {
      cancelAnimationFrame(raf)
      dawn.kill()
      accelTl?.kill()
      startWarpRef.current = null
      window.removeEventListener("resize", onResize)
      window.clearTimeout(resizeT)
      // Free GPU/CPU — drop the backing store.
      canvas.width = 0
      canvas.height = 0
    }
  }, [logoRef, onComplete])

  // Splice: the field is already drifting & visible — just accelerate it.
  useEffect(() => {
    if (started) startWarpRef.current?.()
  }, [started])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block"
        style={{ zIndex: 0 }}
      />
      <div
        ref={flashRef}
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 20,
          opacity: 0,
          background:
            "radial-gradient(circle at center, rgba(235,253,255,1) 0%, rgba(154,243,255,1) 38%, rgba(20,228,254,1) 100%)",
        }}
      />
    </>
  )
}
