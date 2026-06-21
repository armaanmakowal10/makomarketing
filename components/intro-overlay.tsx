"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

const MOUNTAIN =
  "M8 80 L40 38 L54 52 L74 20 L94 50 L110 36 L130 62 L152 32 L174 58 L192 80"

const EASE = [0.16, 1, 0.3, 1] as const
const PANELS = 6

export function IntroOverlay() {
  const [mounted, setMounted] = useState(false)
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading")
  const [pct, setPct] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    setMounted(true)
    try {
      if (sessionStorage.getItem("mako-intro-seen") === "1") {
        setPhase("done")
        return
      }
    } catch {
      setPhase("done")
      return
    }

    document.body.style.overflow = "hidden"

    const loadMs = reduce ? 600 : 2600
    const start = performance.now()
    let raf = 0

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / loadMs)
      const eased = 1 - Math.pow(1 - p, 3)
      setPct(Math.round(eased * 100))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => startReveal(), reduce ? 100 : 350)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const startReveal = () => {
    setPhase("reveal")
    const revealMs = reduce ? 500 : 1100
    setTimeout(() => {
      try {
        sessionStorage.setItem("mako-intro-seen", "1")
      } catch {}
      document.body.style.overflow = ""
      setPhase("done")
    }, revealMs)
  }

  const skip = () => {
    if (phase !== "loading") return
    setPct(100)
    startReveal()
  }

  if (!mounted || phase === "done") return null

  const revealing = phase === "reveal"

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden" aria-hidden>
      {/* Curtain panels (slide up on reveal) */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: PANELS }).map((_, i) => (
          <motion.div
            key={i}
            className="h-full flex-1 bg-black"
            initial={{ y: 0 }}
            animate={{ y: revealing ? "-101%" : 0 }}
            transition={{
              duration: reduce ? 0.5 : 0.9,
              ease: EASE,
              delay: revealing ? i * 0.06 : 0,
            }}
          />
        ))}
      </div>

      {/* Content layer */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-6"
        animate={{
          opacity: revealing ? 0 : 1,
          scale: revealing ? 1.04 : 1,
          filter: revealing ? "blur(6px)" : "blur(0px)",
        }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {/* radial glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(20,228,254,0.18) 0%, transparent 62%)",
          }}
        />

        {/* particles */}
        {!reduce &&
          Array.from({ length: 14 }).map((_, i) => {
            const left = (i * 61) % 100
            return (
              <motion.span
                key={i}
                className="absolute bottom-0 rounded-full bg-cyan"
                style={{
                  left: `${left}%`,
                  width: 2,
                  height: 2,
                  boxShadow: "0 0 8px rgba(20,228,254,0.9)",
                }}
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -600, opacity: [0, 1, 0] }}
                transition={{
                  duration: 3.5,
                  delay: (i % 5) * 0.3,
                  ease: "easeOut",
                  repeat: Infinity,
                }}
              />
            )
          })}

        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.p
            className="mb-5 text-xs uppercase tracking-[0.4em] text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Welcome to
          </motion.p>

          <svg
            viewBox="0 0 200 90"
            className="h-20 w-[min(60vw,260px)] drop-glow md:h-24"
            fill="none"
          >
            <motion.path
              d={MOUNTAIN}
              stroke="#14e4fe"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: reduce ? 0.4 : 2, ease: EASE }}
            />
          </svg>

          <motion.h1
            className="text-display mt-5 text-3xl text-near-white sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: reduce ? 0.2 : 0.6, ease: EASE }}
          >
            <span className="text-near-white">MAKO </span>
            <span className="text-cyan-gradient text-glow">MARKETING</span>
          </motion.h1>
        </div>

        {/* Counter + progress */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-8 md:px-10 md:pb-10">
          <div className="mx-auto flex max-w-5xl items-end justify-between">
            <span className="text-display text-5xl text-near-white/90 md:text-7xl">
              {String(pct).padStart(2, "0")}
              <span className="text-cyan">%</span>
            </span>
            <button
              onClick={skip}
              className="pointer-events-auto pb-2 text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-cyan"
            >
              Skip →
            </button>
          </div>
          <div className="mx-auto mt-4 h-px max-w-5xl overflow-hidden bg-line">
            <motion.div
              className="h-full bg-cyan shadow-[0_0_10px_rgba(20,228,254,0.9)]"
              animate={{ width: `${pct}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
