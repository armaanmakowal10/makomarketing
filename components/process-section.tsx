"use client"

import { useEffect, useRef, useState, type ComponentType } from "react"
import Link from "next/link"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { Check, X, TrendingUp, ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"

const EASE = [0.16, 1, 0.3, 1] as const

// ─────────────────────────────────────────────────────────────────────────────
// In-view count-up used inside the step visuals.
// ─────────────────────────────────────────────────────────────────────────────
function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1.6,
}: {
  to: number
  prefix?: string
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [val, setVal] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const start = performance.now()
          const step = (now: number) => {
            const t = Math.min(1, (now - start) / (duration * 1000))
            setVal(Math.round(to * (1 - Math.pow(1 - t, 3))))
            if (t < 1) raf = requestAnimationFrame(step)
          }
          raf = requestAnimationFrame(step)
        } else {
          setVal(0)
        }
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [to, duration])
  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString()}
      {suffix}
    </span>
  )
}

function ProcessFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-line bg-black/40 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,rgba(20,228,254,0.1),transparent_60%)]" />
      {children}
    </div>
  )
}

// ── 01 · Audit — a live scanner revealing what works vs what leaks ────────────
const AUDIT_ROWS = [
  { label: "Website speed", ok: false },
  { label: "Ad targeting", ok: true },
  { label: "Conversion tracking", ok: false },
  { label: "SEO foundation", ok: false },
  { label: "Offer & funnel", ok: true },
]
function AuditVisual() {
  const total = AUDIT_ROWS.length
  const [scan, setScan] = useState(0)
  useEffect(() => {
    const id = setInterval(
      () => setScan((s) => (s >= total + 3 ? 0 : s + 1)),
      600
    )
    return () => clearInterval(id)
  }, [total])
  const discovered = Math.min(scan, total)
  const leaks = AUDIT_ROWS.slice(0, discovered).filter((r) => !r.ok).length
  const done = scan >= total

  return (
    <ProcessFrame>
      <div className="absolute inset-x-4 top-3 flex items-center justify-between">
        <span className="text-[9px] uppercase tracking-[0.18em] text-near-white/45">
          Growth audit
        </span>
        <motion.span
          className="rounded-full border px-2 py-0.5 text-[9px] font-bold"
          animate={{
            borderColor: done ? "rgba(20,228,254,0.5)" : "rgba(255,255,255,0.15)",
            color: done ? "#14e4fe" : "rgba(245,245,245,0.5)",
          }}
        >
          {done ? "Complete" : "Scanning…"}
        </motion.span>
      </div>

      <div className="absolute inset-x-4 bottom-10 top-10 flex flex-col justify-center gap-1.5">
        {AUDIT_ROWS.map((r, i) => {
          const shown = i < discovered
          const active = i === scan && scan < total
          return (
            <motion.div
              key={r.label}
              className="flex items-center gap-2.5 rounded-lg border px-3 py-1.5"
              animate={{
                borderColor: active
                  ? "rgba(20,228,254,0.6)"
                  : "rgba(255,255,255,0.08)",
                backgroundColor: active
                  ? "rgba(20,228,254,0.08)"
                  : "rgba(255,255,255,0.02)",
              }}
              transition={{ duration: 0.25 }}
            >
              <span
                className={`flex size-4 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                  shown
                    ? r.ok
                      ? "bg-cyan/15 text-cyan"
                      : "bg-rose-500/15 text-rose-400"
                    : "bg-white/5 text-transparent"
                }`}
              >
                {shown ? (
                  r.ok ? (
                    <Check className="size-3" />
                  ) : (
                    <X className="size-3" />
                  )
                ) : null}
              </span>
              <span className="truncate text-[10px] text-near-white/70">
                {r.label}
              </span>
              <span
                className={`ml-auto shrink-0 text-[9px] font-semibold uppercase tracking-wider transition-opacity duration-300 ${
                  shown ? "opacity-100" : "opacity-0"
                } ${r.ok ? "text-cyan" : "text-rose-400"}`}
              >
                {r.ok ? "Working" : "Leaking"}
              </span>
            </motion.div>
          )
        })}
      </div>

      <div className="absolute inset-x-4 bottom-3 flex items-center justify-between text-[9px]">
        <span className="uppercase tracking-[0.18em] text-near-white/45">
          Money leaks found
        </span>
        <motion.span
          key={leaks}
          initial={{ scale: 1.4, opacity: 0.4 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-display text-sm font-bold text-rose-400"
        >
          {leaks}
        </motion.span>
      </div>
    </ProcessFrame>
  )
}

// ── 02 · Test — variants race, the data crowns a winner ──────────────────────
const TEST_VARIANTS = [
  { k: "A", conv: "3.1%", h: 46, win: false },
  { k: "B", conv: "6.4%", h: 100, win: true },
  { k: "C", conv: "4.2%", h: 66, win: false },
]
function TestVisual() {
  const [decided, setDecided] = useState(false)
  useEffect(() => {
    const id = setInterval(() => setDecided((d) => !d), 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <ProcessFrame>
      <span className="absolute left-4 top-3 text-[9px] uppercase tracking-[0.18em] text-near-white/45">
        Split test · conversion rate
      </span>
      <div className="absolute inset-x-6 bottom-4 top-10 flex items-stretch justify-center gap-6">
        {TEST_VARIANTS.map((v) => (
          <div key={v.k} className="flex flex-1 flex-col items-center">
            {/* Reserved slot so the badge never overlaps the bar or labels */}
            <div className="flex h-5 items-end">
              {v.win && (
                <motion.span
                  className="rounded-full bg-cyan px-2 py-0.5 text-[9px] font-bold text-black"
                  animate={{
                    opacity: decided ? 1 : 0,
                    y: decided ? 0 : 6,
                    scale: decided ? 1 : 0.7,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 15 }}
                >
                  Winner
                </motion.span>
              )}
            </div>

            <div className="flex w-full flex-1 items-end justify-center">
              <motion.div
                className={`w-11 rounded-t-lg ${
                  v.win
                    ? "bg-gradient-to-t from-cyan-deep via-cyan to-cyan-bright"
                    : "bg-near-white/15"
                }`}
                style={{ transformOrigin: "bottom" }}
                animate={{
                  height: `${decided ? v.h : 36}%`,
                  opacity: decided && !v.win ? 0.45 : 1,
                  boxShadow:
                    decided && v.win
                      ? "0 0 22px rgba(20,228,254,0.6)"
                      : "0 0 0 rgba(0,0,0,0)",
                }}
                transition={{ duration: 0.7, ease: EASE }}
              />
            </div>

            <span
              className={`mt-2.5 text-xs font-bold transition-colors ${
                decided && v.win ? "text-cyan" : "text-near-white/50"
              }`}
            >
              Variant {v.k}
            </span>
            <motion.span
              className="mt-1 text-[10px] font-semibold tabular-nums"
              animate={{
                color: decided && v.win ? "#14e4fe" : "rgba(245,245,245,0.5)",
              }}
            >
              {decided ? v.conv : "··"}
            </motion.span>
          </div>
        ))}
      </div>
    </ProcessFrame>
  )
}

// ── 03 · Double down — cut the losers, pour the budget into the winner ───────
const DD_LOSERS = [
  { x: "13%", base: 44 },
  { x: "28%", base: 34 },
  { x: "72%", base: 38 },
  { x: "87%", base: 30 },
]
function DoubleDownVisual() {
  const [boost, setBoost] = useState(false)
  useEffect(() => {
    const id = setInterval(() => setBoost((b) => !b), 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <ProcessFrame>
      <span className="absolute left-4 top-3 text-[9px] uppercase tracking-[0.18em] text-near-white/45">
        Budget → top performer
      </span>

      {/* Bars: four losers get cut, the centre winner surges */}
      <div className="absolute inset-x-6 bottom-9 top-9 flex items-end justify-between gap-3">
        {[0, 1, 2, 3, 4].map((i) => {
          if (i === 2) {
            // Winner
            return (
              <div key={i} className="relative flex h-full flex-1 items-end justify-center">
                {/* 2x ROI badge pops on boost */}
                <motion.span
                  className="absolute left-1/2 z-20 -translate-x-1/2 rounded-full bg-cyan px-2 py-0.5 text-[10px] font-bold text-black"
                  style={{ bottom: "calc(100% + 6px)" }}
                  animate={{
                    opacity: boost ? 1 : 0,
                    y: boost ? 0 : 8,
                    scale: boost ? 1 : 0.6,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 15 }}
                >
                  2x ROI
                </motion.span>

                <motion.div
                  className="relative w-8 overflow-hidden rounded-t-md bg-gradient-to-t from-cyan-deep via-cyan to-cyan-bright"
                  style={{ transformOrigin: "bottom" }}
                  animate={{
                    height: boost ? "100%" : "60%",
                    boxShadow: boost
                      ? "0 0 34px rgba(20,228,254,0.8)"
                      : "0 0 12px rgba(20,228,254,0.4)",
                  }}
                  transition={{ duration: 0.8, ease: EASE }}
                >
                  {/* rising "fuel" shimmer inside the bar */}
                  <motion.span
                    aria-hidden
                    className="absolute inset-x-0 h-1/2 bg-gradient-to-t from-transparent via-white/55 to-transparent"
                    animate={{ top: ["110%", "-60%"] }}
                    transition={{ duration: 1.3, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>

                {/* flame cap flickering on top of the winner */}
                <motion.span
                  aria-hidden
                  className="absolute size-7 rounded-full bg-cyan-bright blur-md"
                  animate={{
                    bottom: boost ? "100%" : "60%",
                    opacity: boost ? [0.65, 1, 0.65] : [0.3, 0.5, 0.3],
                    scale: [1, 1.35, 0.95, 1.2, 1],
                    x: ["-50%", "-42%", "-58%", "-50%"],
                  }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                  style={{ left: "50%" }}
                />
              </div>
            )
          }
          // Loser
          const loser = DD_LOSERS[i < 2 ? i : i - 1]
          return (
            <div key={i} className="relative flex h-full flex-1 items-end justify-center">
              {/* "cut" X appears on boost */}
              <motion.span
                className="absolute left-1/2 top-1 z-10 -translate-x-1/2 text-rose-400"
                animate={{ opacity: boost ? 1 : 0, scale: boost ? 1 : 0.4, rotate: boost ? 0 : -45 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <X className="size-3.5" />
              </motion.span>
              <motion.div
                className="w-full max-w-[20px] rounded-t-md bg-near-white/15"
                style={{ transformOrigin: "bottom" }}
                animate={{
                  height: boost ? "8%" : `${loser.base}%`,
                  opacity: boost ? 0.2 : 0.55,
                }}
                transition={{ duration: 0.8, ease: EASE }}
              />
            </div>
          )
        })}
      </div>

      {/* Budget streaming from the cut bars into the winner */}
      {DD_LOSERS.map((l, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute size-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgba(20,228,254,0.95)]"
          animate={{
            left: [l.x, "50%"],
            bottom: ["30%", "74%"],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.3],
          }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.3, ease: "easeIn" }}
        />
      ))}

      <motion.div
        className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 text-[10px] font-bold text-cyan"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <TrendingUp className="size-3" /> Double down
      </motion.div>
    </ProcessFrame>
  )
}

// ── 04 · Scale — revenue compounds, a pulse races up the growth curve ────────
const SCALE_PATH = "M8,104 C46,98 74,78 104,60 S158,22 192,10"
function ScaleVisual() {
  return (
    <ProcessFrame>
      <svg viewBox="0 0 200 120" className="absolute inset-0 h-full w-full p-3">
        <defs>
          <linearGradient id="scaleGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#14e4fe" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#14e4fe" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[35, 62, 89].map((y) => (
          <line
            key={y}
            x1="8"
            x2="192"
            y1={y}
            y2={y}
            stroke="rgba(255,255,255,0.05)"
          />
        ))}
        <motion.path
          d={`${SCALE_PATH} L192,112 L8,112 Z`}
          fill="url(#scaleGrad)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        <motion.path
          d={SCALE_PATH}
          fill="none"
          stroke="#14e4fe"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 6px rgba(20,228,254,0.6))" }}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
        <circle r="3.4" fill="#ffffff" style={{ filter: "drop-shadow(0 0 5px rgba(20,228,254,1))" }}>
          <animateMotion dur="3s" repeatCount="indefinite" path={SCALE_PATH} />
        </circle>
      </svg>

      {/* Revenue readout sits in the empty top-left corner */}
      <div className="absolute left-4 top-3">
        <span className="block text-[9px] uppercase tracking-[0.18em] text-near-white/50">
          Monthly revenue
        </span>
        <span className="text-display text-lg font-bold text-cyan">
          <CountUp to={214} prefix="$" suffix="k" />
        </span>
      </div>

      {/* Scaling badge sits in the empty bottom-right corner */}
      <motion.div
        className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full border border-cyan/50 bg-black/70 px-2 py-0.5 text-[10px] font-bold text-cyan"
        animate={{
          boxShadow: [
            "0 0 0 rgba(20,228,254,0)",
            "0 0 16px rgba(20,228,254,0.5)",
            "0 0 0 rgba(20,228,254,0)",
          ],
        }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <TrendingUp className="size-3" /> Scaling
      </motion.div>
    </ProcessFrame>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Steps
// ─────────────────────────────────────────────────────────────────────────────
type Step = {
  n: string
  tag: string
  title: string
  body: string
  metric: string
  points: string[]
  Visual: ComponentType
}

const steps: Step[] = [
  {
    n: "01",
    tag: "Discover & audit",
    title: "We find exactly where you are bleeding money",
    body: "Before we spend a single dollar, we tear your marketing apart and study every angle. Your website, your ads, your tracking, your funnel, your competitors, all of it. We uncover exactly what is quietly draining your budget and exactly where the untapped growth is hiding. By the end you get a brutally honest, no fluff picture of your business and a ranked hit list of the moves that will make you the most money, fastest.",
    metric: "Day one clarity",
    points: [
      "A full teardown of your website, ads, and SEO",
      "Deep dive on your customers and competitors",
      "Every money leak and quick win exposed",
      "Opportunities ranked by profit potential",
    ],
    Visual: AuditVisual,
  },
  {
    n: "02",
    tag: "Strategy & testing",
    title: "We build the plan and test until it is undeniable",
    body: "Guesswork is for amateurs. We pinpoint the exact channels that will make you money fastest, then we attack them with relentless testing. Different offers, different audiences, different creative, all measured down to the dollar. Opinions do not get a vote here. We let cold, hard data crown the winners so your budget only ever backs what is proven to convert.",
    metric: "Proven, never guessed",
    points: [
      "A custom channel strategy built around profit",
      "Creative and campaigns engineered to convert",
      "Aggressive testing of offers, audiences, and angles",
      "Tracking on everything, down to the dollar",
    ],
    Visual: TestVisual,
  },
  {
    n: "03",
    tag: "Scale the winners",
    title: "We double down and pour fuel on the fire",
    body: "The moment the data names a winner, we move fast and without mercy. We cut everything that is not pulling its weight and shift every available dollar into the plays that print the highest return. Your results stop being a gamble and start becoming a system. Predictable, repeatable, and engineered to be scaled the second you are ready to hit the gas.",
    metric: "Zero wasted budget",
    points: [
      "Cut the dead weight instantly",
      "Redirect budget to your highest return plays",
      "Sharpen the winning campaigns even further",
      "Turn random results into a repeatable system",
    ],
    Visual: DoubleDownVisual,
  },
  {
    n: "04",
    tag: "Growth & profit",
    title: "We scale hard and make you serious money",
    body: "Now we press the accelerator. With a proven, profitable engine humming, we scale volume aggressively while guarding your return on every single dollar. Then we do it again, and again, testing and refining so your revenue compounds month after month. We do not coast and we do not settle. We treat your growth like our own money is on the line, because the only result we accept is more.",
    metric: "18 to 26x average ROAS",
    points: [
      "Aggressive scaling that protects your return",
      "Relentless optimization and fresh testing",
      "Revenue that compounds month over month",
      "A team obsessed with getting you more",
    ],
    Visual: ScaleVisual,
  },
]

function ProcessStep({ step }: { step: Step }) {
  const Visual = step.Visual
  return (
    <Reveal y={40}>
      <div className="relative">
        {/* Timeline node */}
        <span className="absolute -left-[34px] top-7 flex size-5 items-center justify-center rounded-full border border-cyan/70 bg-black md:-left-[47px]">
          <motion.span
            className="size-1.5 rounded-full bg-cyan"
            animate={{
              boxShadow: [
                "0 0 6px rgba(20,228,254,0.6)",
                "0 0 16px rgba(20,228,254,1)",
                "0 0 6px rgba(20,228,254,0.6)",
              ],
            }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>

        <div className="group overflow-hidden rounded-2xl border border-line bg-surface-1/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan/40 hover:shadow-[0_0_50px_-20px_rgba(20,228,254,0.5)] md:p-8">
          <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-display text-sm text-cyan">{step.n}</span>
                <span className="inline-flex w-fit rounded-full border border-line-strong bg-cyan/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan">
                  {step.tag}
                </span>
              </div>
              <h2 className="text-display mt-3 text-2xl leading-snug text-near-white md:text-[1.7rem]">
                {step.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                {step.body}
              </p>
              <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {step.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2.5 text-sm text-near-white/85"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-cyan/15 text-cyan">
                      <Check className="size-3" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/[0.06] px-3.5 py-1.5 text-xs font-semibold text-cyan">
                <TrendingUp className="size-3.5" />
                {step.metric}
              </div>
            </div>

            <Visual />
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 55%", "end 65%"],
  })
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })
  // Position of the glowing comet head along the track.
  const headTop = useTransform(scaleY, (v) => `${v * 100}%`)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-5 pb-12 pt-32 md:px-8 md:pb-20 md:pt-40">
        <div className="pointer-events-none absolute left-1/2 top-16 h-[40vh] w-[80vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(20,228,254,0.12),transparent_70%)] blur-[120px]" />
        <div className="relative mx-auto max-w-5xl">
          <Reveal>
            <h1 className="text-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[1.02] text-near-white">
              How We <span className="text-cyan-gradient">Succeed</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Four ruthless steps that turn guesswork into predictable,
              compounding growth.
            </p>
          </Reveal>

          {/* quick step index */}
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap gap-2.5">
              {steps.map((s) => (
                <span
                  key={s.n}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-1/40 px-3.5 py-1.5 text-xs text-near-white/70"
                >
                  <span className="text-cyan">{s.n}</span>
                  {s.tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────────────── */}
      <section id="process" className="relative px-5 pb-24 md:px-8 md:pb-32">
        <div ref={ref} className="relative mx-auto max-w-5xl pl-9 md:pl-14">
          {/* Track + animated progress + glowing comet head */}
          <div className="absolute left-[8px] top-7 bottom-7 w-px md:left-[16px]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-line to-transparent" />
            <motion.div
              style={{ scaleY }}
              className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-cyan-bright via-cyan to-cyan/50 shadow-[0_0_14px_rgba(20,228,254,0.7)]"
            />
            <motion.div
              style={{ top: headTop }}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <span className="absolute left-1/2 top-1/2 size-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/40 blur-md" />
              <span className="relative block size-2.5 rounded-full bg-cyan shadow-[0_0_16px_5px_rgba(20,228,254,0.9)]" />
            </motion.div>
          </div>

          <div className="flex flex-col gap-20 md:gap-28">
            {steps.map((step) => (
              <ProcessStep key={step.n} step={step} />
            ))}
          </div>
        </div>

        {/* Closing CTA */}
        <Reveal className="mx-auto mt-24 max-w-2xl text-center">
          <h2 className="text-display text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.08] text-near-white">
            Your competitors are hoping you never read this.{" "}
            <span className="text-cyan-gradient">Let&rsquo;s go.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Book a free audit and we will show you exactly where step one begins
            for your business.
          </p>
          <motion.div whileHover={{ y: -2 }} className="mt-8 inline-block">
            <Link
              href="/free-audit"
              className="btn-cyan h-12 px-9 text-sm uppercase tracking-[0.12em]"
            >
              Get My Free Audit
              <ArrowUpRight className="size-5" />
            </Link>
          </motion.div>
        </Reveal>
      </section>
    </>
  )
}
