"use client"

import { useId, useMemo, useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { MoveHorizontal, ArrowUpRight } from "lucide-react"
import { Magnetic } from "@/components/magnetic"
import { Reveal } from "@/components/reveal"
import { UrgencyPill } from "@/components/urgency-pill"

// ── Projection model ─────────────────────────────────────────────────────────
// Illustrative, not a guarantee. ROAS ramps 18x → 26x as spend scales (returns
// compound); cost-per-lead falls $28 → $12 with efficiency.
const TIERS = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000]
const SMIN = TIERS[0]
const SMAX = TIERS[TIERS.length - 1]

const t = (s: number) => (s - SMIN) / (SMAX - SMIN)
const roasAt = (s: number) => 18 + t(s) * 8
const revAt = (s: number) => s * roasAt(s)
const leadsAt = (s: number) => s / (28 - t(s) * 16)

const REV_MAX = 300000 // chart ceiling → clean $0 / $100k / $200k / $300k grid
const Y_TICKS = [0, 100000, 200000, 300000]
// ─────────────────────────────────────────────────────────────────────────────

function fmtMoney(v: number) {
  const n = Math.round(v)
  if (n >= 1000) return `$${Math.round(n / 1000)}k`
  return `$${n}`
}
function fmtSpend(v: number) {
  return v >= 1000 ? `$${v / 1000}k` : `$${v}`
}
const fmtFull = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`

// Bars rise when the chart scrolls into view (trigger on the full-height wrapper).
const barsWrap: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}
const barItem: Variants = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export function SuccessChart() {
  const reduce = useReducedMotion()
  const sliderId = useId()
  const [idx, setIdx] = useState(4) // default $5k

  const spend = TIERS[idx]
  const { revenue, leads, roas } = useMemo(
    () => ({ revenue: revAt(spend), leads: leadsAt(spend), roas: roasAt(spend) }),
    [spend]
  )

  return (
    <div className="mt-24 md:mt-32">
      <div className="rounded-2xl border border-line bg-surface-1/30 p-4 sm:p-6 md:p-8">
        {/* ── Live results ── */}
        <p className="text-display mb-5 text-center text-2xl font-bold uppercase tracking-wide text-near-white/65 sm:text-3xl">
          Your Projected Results at {fmtSpend(spend)}/mo in Ad Spend
        </p>
        <div className="mb-8 grid grid-cols-3 gap-3 sm:gap-4">
          <Stat label="Revenue / mo" value={fmtMoney(revenue)} accent big />
          <Stat label="New leads / mo" value={`${Math.round(leads)}`} />
          <Stat label="Return on spend" value={`${roas.toFixed(1)}x`} accent />
        </div>

        {/* ── Bar chart ── */}
        <div className="relative h-60 pl-7 sm:h-72">
          {/* y-axis title (rotated) */}
          <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan/55 [writing-mode:vertical-rl] rotate-180">
            Revenue / mo
          </span>
          {/* gridlines */}
          <div className="pointer-events-none absolute inset-y-0 left-7 right-0">
            {Y_TICKS.map((tick) => (
              <div
                key={tick}
                className="absolute inset-x-0 border-t border-white/[0.07]"
                style={{ bottom: `${(tick / REV_MAX) * 100}%` }}
              />
            ))}
          </div>

          {/* bars */}
          <motion.div
            className="relative flex h-full items-end gap-1.5 sm:gap-2.5"
            variants={barsWrap}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {TIERS.map((tier, i) => {
              const h = (revAt(tier) / REV_MAX) * 100
              const on = i === idx
              return (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setIdx(i)}
                  aria-label={`${fmtSpend(tier)} per month → ${fmtMoney(
                    revAt(tier)
                  )} revenue`}
                  className="group relative flex h-full flex-1 cursor-pointer items-end"
                >
                  {on && (
                    <motion.span
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md border border-cyan/50 bg-black/80 px-2 py-0.5 text-[11px] font-semibold text-cyan shadow-[0_0_14px_-2px_rgba(20,228,254,0.7)] backdrop-blur-sm sm:text-xs"
                      style={{ bottom: `calc(${h}% + 8px)` }}
                    >
                      {fmtMoney(revAt(tier))}
                    </motion.span>
                  )}
                  <motion.span
                    variants={reduce ? undefined : barItem}
                    style={{ height: `${h}%`, transformOrigin: "bottom" }}
                    className={`w-full rounded-t-md transition-all duration-200 ${
                      on
                        ? "bg-gradient-to-t from-cyan-deep via-cyan to-cyan-bright shadow-[0_0_22px_-2px_rgba(20,228,254,0.65)]"
                        : "bg-cyan/15 group-hover:bg-cyan/30"
                    }`}
                  />
                </button>
              )
            })}
          </motion.div>
        </div>

        {/* x-axis labels */}
        <div className="mt-3 flex gap-1.5 pl-7 sm:gap-2.5">
          {TIERS.map((tier, i) => (
            <span
              key={tier}
              className={`flex-1 text-center text-[11px] tabular-nums transition-colors sm:text-xs ${
                i === idx ? "font-bold text-cyan" : "font-medium text-near-white/55"
              } ${i % 2 === 1 ? "hidden sm:block" : ""}`}
            >
              {fmtSpend(tier)}
            </span>
          ))}
        </div>
        {/* x-axis title */}
        <p className="mt-2 pl-7 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-near-white/45">
          Monthly ad spend
        </p>

        {/* ── Interactive control ── */}
        <div className="mt-7 rounded-2xl border border-cyan/40 bg-cyan/[0.06] p-5 shadow-[0_0_36px_-12px_rgba(20,228,254,0.6)] sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-cyan">
              <motion.span
                animate={{ x: [-3, 3, -3] }}
                transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
              >
                <MoveHorizontal className="size-4" />
              </motion.span>
              Drag to set your budget
            </span>
            <span className="text-display text-2xl font-bold text-cyan sm:text-3xl">
              {fmtFull(spend)}
              <span className="ml-1 text-sm font-normal text-near-white/50">
                /mo
              </span>
            </span>
          </div>
          <input
            id={sliderId}
            type="range"
            min={0}
            max={TIERS.length - 1}
            step={1}
            value={idx}
            onChange={(e) => setIdx(Number(e.target.value))}
            aria-label="Monthly ad spend"
            className="mt-4 h-2.5 w-full cursor-grab appearance-none rounded-full bg-white/10 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-[0_0_0_5px_rgba(20,228,254,0.3),0_0_18px_4px_rgba(20,228,254,0.75)] [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_0_5px_rgba(20,228,254,0.3),0_0_18px_4px_rgba(20,228,254,0.75)]"
            style={{
              background: `linear-gradient(to right, #14E4FE ${
                (idx / (TIERS.length - 1)) * 100
              }%, rgba(255,255,255,0.1) ${(idx / (TIERS.length - 1)) * 100}%)`,
            }}
          />
          <div className="mt-3 flex justify-between text-[10px] text-near-white/45 sm:text-xs">
            <span>{fmtSpend(SMIN)}/mo</span>
            <span>{fmtSpend(SMAX)}/mo</span>
          </div>
        </div>

        <p className="mt-5 text-center text-[11px] leading-relaxed text-near-white/40 sm:text-xs">
          Illustrative projection based on our average client performance. Your
          results will vary — book a free audit for real numbers.
        </p>
      </div>

      {/* Closing CTA — convert the projection into a booking right where the
          number is fresh in mind. */}
      <Reveal className="mt-8 flex flex-col items-center gap-5 text-center">
        <UrgencyPill />
        <Magnetic strength={0.35}>
          <div className="relative">
            {/* Breathing halo behind the button to draw the eye. */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute -inset-1.5 rounded-full bg-cyan/40 blur-lg"
              animate={{ opacity: [0.4, 0.85, 0.4], scale: [0.97, 1.05, 0.97] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            />
            <Link
              href="/free-audit"
              className="btn-cyan group relative h-14 px-10 text-base font-semibold uppercase tracking-[0.12em] shadow-[0_0_30px_-4px_rgba(20,228,254,0.8)] transition-transform duration-200 hover:scale-[1.04] sm:text-lg"
            >
              Claim My Free Audit
              <ArrowUpRight className="size-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Magnetic>
      </Reveal>
    </div>
  )
}

function Stat({
  label,
  value,
  accent,
  big,
}: {
  label: string
  value: string
  accent?: boolean
  big?: boolean
}) {
  return (
    <div className="rounded-xl border border-line bg-surface-1/40 px-3 py-4 text-center sm:px-4">
      <div
        className={`text-display leading-none ${
          accent ? "text-cyan-gradient" : "text-near-white"
        } ${big ? "text-2xl sm:text-4xl" : "text-2xl sm:text-3xl"}`}
      >
        {value}
      </div>
      <div className="mt-2 text-[10px] uppercase tracking-wider text-muted-foreground sm:text-xs">
        {label}
      </div>
    </div>
  )
}
