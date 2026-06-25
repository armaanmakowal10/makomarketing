"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { lenisRef } from "@/lib/scroll-state"
import { LOGO_PIECES } from "./logo-pieces"
import { LightspeedWarp } from "./lightspeed-warp"

const EASE_SOFT = [0.16, 1, 0.3, 1] as const // expo-out — smooth & graceful

// The letters finish revealing ~1.95s. We mount the warp at PREWARM_MS (just
// after) so the calm starfield dawns in behind the still-held logo, then trigger
// the acceleration at WARP_SPLICE_MS. By the splice the field is already present
// and drifting, so the logo→hyperspace handoff is a pure acceleration — seamless.
const PREWARM_MS = 2050
const WARP_SPLICE_MS = 2700

type Phase = "logo" | "prewarm" | "warp"

export function IntroOverlay() {
  const [show, setShow] = useState(true)
  const [phase, setPhase] = useState<Phase>("logo")
  const lockedRef = useRef(false)
  const logoWarpRef = useRef<HTMLDivElement | null>(null)

  // Same handoff the old swipe used: mark seen + unmount. The second effect
  // below releases the scroll lock and resumes Lenis when `show` flips false.
  const finishIntro = useCallback(() => {
    sessionStorage.setItem("mako-intro-seen", "1")
    setShow(false)
  }, [])

  useEffect(() => {
    // Always open on the hero on load/reload — stop the browser from restoring
    // the previous scroll position and snap to the top before anything paints.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }
    if (!window.location.hash) {
      window.scrollTo(0, 0)
      lenisRef.current?.scrollTo(0, { immediate: true })
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const seen =
      typeof sessionStorage !== "undefined" &&
      sessionStorage.getItem("mako-intro-seen") === "1"

    if (reduce || seen) {
      setShow(false)
      return
    }

    document.documentElement.style.overflow = "hidden"
    document.body.style.overflow = "hidden"
    lenisRef.current?.stop()
    lockedRef.current = true

    // letters clarify in + hold → starfield dawns in (prewarm) → lightspeed jump
    const t1 = setTimeout(() => setPhase("prewarm"), PREWARM_MS)
    const t2 = setTimeout(() => setPhase("warp"), WARP_SPLICE_MS)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  useEffect(() => {
    if (!show && lockedRef.current) {
      document.documentElement.style.overflow = ""
      document.body.style.overflow = ""
      lenisRef.current?.start()
      lockedRef.current = false
    }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[200] overflow-hidden"
          style={{ background: "#000000" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Starfield warp sits behind the logo (canvas z0, flash z20). Mounted
              at prewarm so it dawns in ahead of the splice; `started` flips at the
              splice to begin the acceleration. */}
          {phase !== "logo" && (
            <LightspeedWarp
              logoRef={logoWarpRef}
              started={phase === "warp"}
              onComplete={finishIntro}
            />
          )}

          {/* Soft breathing glow — cross-dissolves into the starfield as the warp
              begins (slow fade overlapping the canvas fade-in), so the tonal shift
              from ambient glow to dark starfield is seamless, not an abrupt swap. */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[92vmin] w-[92vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              zIndex: 1,
              background:
                "radial-gradient(circle, rgba(20,228,254,0.15) 0%, rgba(20,228,254,0.04) 46%, transparent 70%)",
            }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: phase === "logo" ? 1 : 0, scale: phase === "logo" ? 1 : 1.15 }}
            transition={{ duration: phase === "logo" ? 1.4 : 0.9, ease: EASE_SOFT }}
          />

          {/* ---------- Logo — each letter clarifies (blur -> sharp) ----------
              The reveal lives on the inner motion.div; the outer ref'd wrapper
              is left at rest so GSAP can fly it through the warp (scale + fade)
              without fighting Framer. */}
          <div className="absolute inset-0 flex items-center justify-center px-6" style={{ zIndex: 10 }}>
            <div
              ref={logoWarpRef}
              className="relative drop-shadow-[0_0_55px_rgba(20,228,254,0.4)]"
              style={{ width: "min(90vmin, 94vw)", aspectRatio: "2168 / 703" }}
            >
              {LOGO_PIECES.map((p, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: `${p.x * 100}%`,
                    top: `${p.y * 100}%`,
                    width: `${p.w * 100}%`,
                    height: `${p.h * 100}%`,
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    style={{ width: "100%", height: "100%" }}
                    initial={{ opacity: 0, filter: "blur(14px)", scale: 1.35 }}
                    animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                    transition={{ duration: 0.85, delay: 0.12 + i * 0.075, ease: EASE_SOFT }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: `${(-p.x / p.w) * 100}%`,
                        top: `${(-p.y / p.h) * 100}%`,
                        width: `${(1 / p.w) * 100}%`,
                        height: `${(1 / p.h) * 100}%`,
                        backgroundImage: "url(/mako-logo-equal.png)",
                        backgroundSize: "100% 100%",
                        backgroundRepeat: "no-repeat",
                      }}
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
