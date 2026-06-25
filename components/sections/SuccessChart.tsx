"use client"

import { useEffect, useRef, useState } from "react"
import {
  motion,
  motionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { scrollYMV } from "@/lib/scroll-state"

// ── Placeholder data ─────────────────────────────────────────────────────────
// Aspirational illustration, not real client data. Swap these values for real
// numbers later. Keep both series trending up with revenue outpacing spend.
const CAMPAIGN_DATA = [
  { spend: 500, leads: 30, revenue: 18000 },
  { spend: 1000, leads: 72, revenue: 42000 },
  { spend: 1500, leads: 128, revenue: 78000 },
  { spend: 2000, leads: 200, revenue: 124000 },
  { spend: 2500, leads: 290, revenue: 190000 },
  { spend: 3000, leads: 400, revenue: 280000 },
]
// ─────────────────────────────────────────────────────────────────────────────

// Axis ceilings (a little headroom above the final values).
const LEADS_MAX = 480
const REV_MAX = 300000

// SVG geometry (the container is locked to this aspect ratio so HTML overlays
// map directly onto the plotted coordinates).
const W = 760
const H = 440
const PL = 50 // plot left
const PR = 704 // plot right
const PT = 30 // plot top
const PB = 400 // plot bottom
const plotW = PR - PL
const plotH = PB - PT
const N = CAMPAIGN_DATA.length
const GRID = [0, 1 / 3, 2 / 3, 1]

const xAt = (i: number) => PL + (i / (N - 1)) * plotW
const yLeads = (v: number) => PB - (v / LEADS_MAX) * plotH
const yRev = (v: number) => PB - (v / REV_MAX) * plotH

const leadsPts = CAMPAIGN_DATA.map((d, i) => ({ x: xAt(i), y: yLeads(d.leads) }))
const revPts = CAMPAIGN_DATA.map((d, i) => ({ x: xAt(i), y: yRev(d.revenue) }))

const FINAL = CAMPAIGN_DATA[N - 1]
const REV_NODE = { x: xAt(N - 1), y: yRev(FINAL.revenue) }
const LEADS_NODE = { x: xAt(N - 1), y: yLeads(FINAL.leads) }

/** Smooth a polyline into cubic beziers (Catmull-Rom), keeping the trend clean. */
function smoothLine(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return ""
  let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`
  }
  return d
}

const leadsPath = smoothLine(leadsPts)
const revPath = smoothLine(revPts)
const revArea = `${revPath} L ${REV_NODE.x.toFixed(2)} ${PB} L ${revPts[0].x.toFixed(2)} ${PB} Z`

// ── Formatters ───────────────────────────────────────────────────────────────
function fmtMoney(v: number) {
  const n = Math.round(v)
  if (n >= 1_000_000) {
    const m = n / 1_000_000
    return `$${m.toFixed(m < 10 ? 1 : 0).replace(/\.0$/, "")}M`
  }
  if (n >= 1000) return `$${Math.round(n / 1000)}k`
  return `$${n}`
}
function fmtSpend(v: number) {
  if (v >= 1000) {
    const k = v / 1000
    return `$${Number.isInteger(k) ? k : k.toFixed(1)}k`
  }
  return `$${v}`
}
function fmtLeads(v: number) {
  return `${Math.round(v)}`
}

const pctX = (x: number) => `${(x / W) * 100}%`
const pctY = (y: number) => `${(y / H) * 100}%`

// Static "1" used to pin every animation to its final frame for reduced motion.
const ONE = motionValue(1)

/** Counts a MotionValue up by writing text directly (no re-render per frame). */
function CountUp({
  value,
  format,
  className,
}: {
  value: MotionValue<number>
  format: (n: number) => string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  useMotionValueEvent(value, "change", (v) => {
    if (ref.current) ref.current.textContent = format(v)
  })
  return (
    <span ref={ref} className={className}>
      {format(value.get())}
    </span>
  )
}

export function SuccessChart() {
  const reduce = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  // Scroll window (px) over which the chart draws in, measured from layout.
  const [range, setRange] = useState<[number, number]>([0, 1])

  useEffect(() => {
    if (reduce) return
    const measure = () => {
      const el = wrapRef.current
      if (!el) return
      const vh = window.innerHeight
      const top = el.getBoundingClientRect().top + window.scrollY
      const enter = top - vh * 0.85 // starts as the chart rises into view
      const complete = top - vh * 0.15 // finished by the time it nears the top
      setRange([enter, Math.max(enter + 1, complete)])
    }
    measure()
    const settle = setTimeout(measure, 400)
    window.addEventListener("resize", measure)
    window.addEventListener("load", measure)
    return () => {
      clearTimeout(settle)
      window.removeEventListener("resize", measure)
      window.removeEventListener("load", measure)
    }
  }, [reduce])

  // Drive everything off the shared Lenis-fed MotionValue (no new useScroll).
  const measured = useTransform(scrollYMV, range, [0, 1], { clamp: true })
  const smooth = useSpring(measured, { stiffness: 120, damping: 30, mass: 0.3 })
  const p = reduce ? ONE : smooth

  // Staggered timeline: leads draw, then revenue, then fill, node, callout.
  const leadsDraw = useTransform(p, [0, 0.42], [0, 1], { clamp: true })
  const revDraw = useTransform(p, [0.16, 0.62], [0, 1], { clamp: true })
  const fillOpacity = useTransform(p, [0.58, 0.78], [0, 1], { clamp: true })
  const nodeScale = useTransform(p, [0.66, 0.86], [0, 1], { clamp: true })
  const calloutOpacity = useTransform(p, [0.85, 1], [0, 1], { clamp: true })
  const calloutY = useTransform(p, [0.85, 1], [10, 0], { clamp: true })
  const leadsVal = useTransform(p, [0, 0.42], [0, FINAL.leads], { clamp: true })
  const revVal = useTransform(p, [0.16, 0.62], [0, FINAL.revenue], { clamp: true })

  const ariaLabel = `As monthly ad spend rises from ${fmtSpend(
    CAMPAIGN_DATA[0].spend
  )} to ${fmtSpend(FINAL.spend)}, leads grow from ${CAMPAIGN_DATA[0].leads} to ${
    FINAL.leads
  } and revenue grows from ${fmtMoney(
    CAMPAIGN_DATA[0].revenue
  )} to ${fmtMoney(FINAL.revenue)}, with revenue accelerating.`

  return (
    <div ref={wrapRef} className="mt-16 md:mt-20">
      <div className="max-w-2xl">
        <h3 className="text-display text-[clamp(1.6rem,3.6vw,2.5rem)] leading-tight text-near-white">
          Spend less time guessing.{" "}
          <span className="text-cyan-gradient">Watch it scale.</span>
        </h3>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
          Every dollar into your campaigns compounds into more leads, more
          sales, more profit.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-surface-1/30 p-4 sm:p-6 md:p-8">
        {/* Legend */}
        <div className="mb-4 flex items-center gap-5 text-xs sm:text-sm">
          <span className="flex items-center gap-2 text-near-white/65">
            <span className="h-0.5 w-5 rounded-full bg-[#8197a9]" />
            Leads
          </span>
          <span className="flex items-center gap-2 text-near-white/90">
            <span className="h-0.5 w-5 rounded-full bg-cyan" />
            Revenue
          </span>
        </div>

        {/* Plot — fixed aspect so SVG units map 1:1 onto HTML overlays */}
        <div
          role="img"
          aria-label={ariaLabel}
          className="relative w-full"
          style={{ aspectRatio: `${W} / ${H}` }}
        >
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            <defs>
              <linearGradient id="mako-rev-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14E4FE" stopOpacity="0.34" />
                <stop offset="100%" stopColor="#14E4FE" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="mako-growth-zone" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14E4FE" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#14E4FE" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="mako-node-core">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="45%" stopColor="#aef6ff" />
                <stop offset="100%" stopColor="#14E4FE" />
              </radialGradient>
            </defs>

            {/* faint growth zone the curves climb into */}
            <rect
              x={PL}
              y={PT}
              width={plotW}
              height={plotH * 0.55}
              fill="url(#mako-growth-zone)"
            />

            {/* hairline gridlines */}
            {GRID.map((f) => {
              const y = PB - f * plotH
              return (
                <line
                  key={f}
                  x1={PL}
                  y1={y}
                  x2={PR}
                  y2={y}
                  stroke="#ffffff"
                  strokeOpacity={0.07}
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                />
              )
            })}

            {/* revenue area fill (fades in after the line completes) */}
            <motion.path
              d={revArea}
              fill="url(#mako-rev-fill)"
              style={{ opacity: fillOpacity }}
            />

            {/* leads line (dim, secondary) */}
            <motion.path
              d={leadsPath}
              fill="none"
              stroke="#8197a9"
              strokeWidth={2.4}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: leadsDraw }}
            />

            {/* revenue line (cyan hero, glowing) */}
            <motion.path
              d={revPath}
              fill="none"
              stroke="#14E4FE"
              strokeWidth={3.4}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{
                pathLength: revDraw,
                filter: "drop-shadow(0 0 5px rgba(20,228,254,0.55))",
              }}
            />

            {/* glowing end node on the revenue line */}
            <motion.g
              style={{
                scale: nodeScale,
                opacity: nodeScale,
                transformBox: "fill-box",
                transformOrigin: "center",
              }}
            >
              <circle
                cx={REV_NODE.x}
                cy={REV_NODE.y}
                r={15}
                fill="#14E4FE"
                opacity={0.2}
                style={{ filter: "blur(4px)" }}
              />
              <circle
                cx={REV_NODE.x}
                cy={REV_NODE.y}
                r={9}
                fill="none"
                stroke="#14E4FE"
                strokeOpacity={0.55}
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
              <circle
                cx={REV_NODE.x}
                cy={REV_NODE.y}
                r={5.5}
                fill="url(#mako-node-core)"
                style={{ filter: "drop-shadow(0 0 6px rgba(20,228,254,0.9))" }}
              />
            </motion.g>
          </svg>

          {/* ── HTML overlays (kept legible at every size) ── */}

          {/* left axis: leads */}
          {GRID.map((f) => (
            <span
              key={`l-${f}`}
              className="pointer-events-none absolute -translate-y-1/2 text-[10px] text-[#8197a9] sm:text-xs"
              style={{ left: 0, top: pctY(PB - f * plotH) }}
            >
              {fmtLeads(f * LEADS_MAX)}
            </span>
          ))}

          {/* right axis: revenue */}
          {GRID.map((f) => (
            <span
              key={`r-${f}`}
              className="pointer-events-none absolute right-0 -translate-y-1/2 text-right text-[10px] text-cyan/80 sm:text-xs"
              style={{ top: pctY(PB - f * plotH) }}
            >
              {fmtMoney(f * REV_MAX)}
            </span>
          ))}

          {/* x axis: spend (every other tier hidden on mobile) */}
          {CAMPAIGN_DATA.map((d, i) => (
            <span
              key={d.spend}
              className={`pointer-events-none absolute -translate-x-1/2 text-[10px] text-near-white/55 sm:text-xs ${
                i % 2 === 1 ? "hidden sm:block" : ""
              }`}
              style={{ left: pctX(xAt(i)), top: pctY(PB + 14) }}
            >
              {fmtSpend(d.spend)}
            </span>
          ))}

          {/* revenue end value */}
          <div
            className="pointer-events-none absolute -translate-x-full -translate-y-1/2"
            style={{ left: pctX(REV_NODE.x - 6), top: pctY(REV_NODE.y) }}
          >
            <span className="rounded-md bg-black/60 px-1.5 py-0.5 backdrop-blur-sm">
              <CountUp
                value={revVal}
                format={fmtMoney}
                className="text-display text-sm font-semibold text-cyan sm:text-base"
              />
            </span>
          </div>

          {/* leads end value */}
          <div
            className="pointer-events-none absolute -translate-x-full -translate-y-1/2"
            style={{ left: pctX(LEADS_NODE.x - 6), top: pctY(LEADS_NODE.y) }}
          >
            <span className="rounded-md bg-black/60 px-1.5 py-0.5 backdrop-blur-sm">
              <CountUp
                value={leadsVal}
                format={fmtLeads}
                className="text-display text-sm font-semibold text-[#a7bccd] sm:text-base"
              />
              <span className="ml-1 text-[10px] text-near-white/40">leads</span>
            </span>
          </div>

          {/* callout near the top-right of the revenue line */}
          <motion.div
            style={{ opacity: calloutOpacity, y: calloutY }}
            className="pointer-events-none absolute right-0 top-0 flex items-center gap-2 rounded-full border border-cyan/40 bg-black/70 px-3 py-1.5 backdrop-blur-sm"
          >
            <span className="size-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgba(20,228,254,0.9)]" />
            <span className="whitespace-nowrap text-[11px] font-medium text-near-white sm:text-xs">
              Returns that compound
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
