"use client"

import { useEffect, useRef, useState, type ComponentType } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import {
  Target,
  Megaphone,
  Search,
  ShieldCheck,
  MonitorSmartphone,
  Database,
  Repeat,
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  Phone,
  MousePointer2,
  Check,
  ArrowUpRight,
  TrendingUp,
  Zap,
  Bell,
  Mail,
  Gift,
  type LucideIcon,
} from "lucide-react"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal"
import { UrgencyPill } from "@/components/urgency-pill"

const EASE = [0.16, 1, 0.3, 1] as const

// ─────────────────────────────────────────────────────────────────────────────
// Shared helpers
// ─────────────────────────────────────────────────────────────────────────────

function VisualFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line bg-surface-1/40 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,rgba(20,228,254,0.08),transparent_60%)]" />
      {children}
    </div>
  )
}

/** Looping typewriter used in the Google Ads search bar. */
function TypingText({ text }: { text: string }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => (c >= text.length + 8 ? 0 : c + 1)) // hold a beat at the end
    }, 120)
    return () => clearInterval(id)
  }, [text.length])
  return (
    <span className="truncate text-xs text-near-white/80">
      {text.slice(0, Math.min(count, text.length))}
      <span className="ml-px animate-pulse text-cyan">▌</span>
    </span>
  )
}

/** Counts up to `to` whenever it scrolls into view (re-runs on re-entry). */
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

// ─────────────────────────────────────────────────────────────────────────────
// 01 · Google Ads — typed query → sponsored result → cursor click → booked calls
// ─────────────────────────────────────────────────────────────────────────────
function GoogleAdsVisual() {
  const bars = [40, 58, 72, 88, 100]
  return (
    <VisualFrame>
      {/* Search bar */}
      <div className="absolute inset-x-5 top-5 flex items-center gap-2 rounded-full border border-line-strong bg-black/50 px-3 py-2">
        <Search className="size-4 shrink-0 text-cyan" />
        <TypingText text="emergency plumber near me" />
      </div>

      {/* Sponsored result that pulses to draw the eye */}
      <motion.div
        className="absolute inset-x-5 top-[24%] rounded-lg border border-cyan/40 bg-cyan/[0.06] p-2.5"
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(20,228,254,0)",
            "0 0 18px -2px rgba(20,228,254,0.5)",
            "0 0 0 0 rgba(20,228,254,0)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="flex items-center gap-2">
          <span className="rounded bg-cyan px-1 py-0.5 text-[8px] font-bold text-black">
            Ad
          </span>
          <span className="h-1.5 w-24 rounded bg-near-white/35" />
        </div>
        <span className="mt-1.5 block h-1.5 w-2/3 rounded bg-near-white/15" />
        <div className="mt-1.5 flex items-center gap-1.5">
          <span className="text-[8px] leading-none text-amber-300">★★★★★</span>
          <span className="text-[7px] text-near-white/50">Top of page · 4.9</span>
        </div>
      </motion.div>

      {/* Cursor gliding up to click the ad */}
      <motion.div
        className="absolute text-white drop-shadow-[0_0_6px_rgba(0,0,0,0.6)]"
        animate={{ left: ["72%", "40%", "40%"], top: ["82%", "36%", "36%"] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", times: [0, 0.55, 1] }}
      >
        <MousePointer2 className="size-5 fill-white" />
        <motion.span
          className="absolute -left-1 -top-1 size-6 rounded-full border border-cyan"
          animate={{ scale: [0, 1.6], opacity: [0.8, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", times: [0.55, 0.75] }}
        />
      </motion.div>

      {/* Booked calls climbing + live revenue */}
      <div className="absolute inset-x-5 bottom-5">
        <div className="mb-2 flex items-end justify-between">
          <div>
            <span className="block text-[9px] uppercase tracking-wider text-near-white/50">
              Calls booked
            </span>
            <span className="text-display text-sm font-bold text-cyan">
              <CountUp to={128} suffix="+" />
            </span>
          </div>
          <div className="text-right">
            <span className="block text-[9px] uppercase tracking-wider text-near-white/50">
              Revenue
            </span>
            <span className="text-display text-sm font-bold text-cyan">
              <CountUp to={18} prefix="$" suffix="k" />
            </span>
          </div>
        </div>
        <div className="flex h-10 items-end gap-2">
          {bars.map((h, i) => (
            <motion.span
              key={i}
              className="flex-1 rounded-t-md bg-gradient-to-t from-cyan-deep via-cyan to-cyan-bright shadow-[0_0_14px_rgba(20,228,254,0.4)]"
              style={{ height: `${h}%`, transformOrigin: "bottom" }}
              initial={{ scaleY: 0, opacity: 0.4 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: i * 0.09, ease: EASE }}
            />
          ))}
        </div>
      </div>
    </VisualFrame>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 02 · Meta Ads — scrolling feed, like-count ticking, floating reactions
// ─────────────────────────────────────────────────────────────────────────────
function MetaAdsVisual() {
  return (
    <VisualFrame>
      {/* Phone with an infinite feed */}
      <div className="absolute left-1/2 top-1/2 h-[80%] w-[46%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.4rem] border border-line-strong bg-black/60">
        <motion.div
          className="flex flex-col gap-2.5 p-2.5"
          animate={{ y: ["0%", "-50%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-line bg-surface-1/60 p-2">
              <div className="mb-1.5 flex items-center gap-1.5">
                <span className="size-3 rounded-full bg-cyan/40" />
                <span className="h-1.5 w-10 rounded bg-near-white/20" />
                <span className="ml-auto rounded bg-cyan/20 px-1 text-[7px] font-bold text-cyan">
                  Ad
                </span>
              </div>
              <div className="h-9 rounded bg-cyan/10" />
              <div className="mt-1.5 flex items-center gap-2 text-cyan/70">
                <Heart className="size-2.5 fill-cyan/40" />
                <MessageCircle className="size-2.5" />
                <Share2 className="size-2.5" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Engagement counters */}
      <div className="absolute left-5 top-5 flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5 rounded-full border border-line-strong bg-black/70 px-2.5 py-1 text-[10px] font-semibold text-cyan">
          <Heart className="size-3 fill-cyan" />
          <CountUp to={2400} />
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-line-strong bg-black/70 px-2.5 py-1 text-[10px] font-semibold text-near-white/80">
          <MessageCircle className="size-3 text-cyan" />
          <CountUp to={318} />
        </div>
      </div>

      {/* Reach + CTR stats */}
      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
        <div>
          <span className="block text-[9px] uppercase tracking-wider text-near-white/50">
            Reach
          </span>
          <span className="text-display text-sm font-bold text-cyan">
            <CountUp to={84} suffix="k" />
          </span>
        </div>
        <div className="text-right">
          <span className="block text-[9px] uppercase tracking-wider text-near-white/50">
            Click rate
          </span>
          <span className="text-display text-sm font-bold text-cyan">
            <CountUp to={8} prefix="4." suffix="%" duration={1.2} />
          </span>
        </div>
      </div>

      {/* Heart pop */}
      <motion.div
        className="absolute right-6 top-9 text-cyan drop-shadow-[0_0_10px_rgba(20,228,254,0.7)]"
        animate={{ scale: [0, 1.15, 1, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 0.6, times: [0, 0.25, 0.8, 1] }}
      >
        <Heart className="size-7 fill-cyan" />
      </motion.div>

      {/* Floating reactions drifting up */}
      {[Heart, MessageCircle, Share2].map((Ic, i) => (
        <motion.div
          key={i}
          className="absolute bottom-[12%] text-cyan"
          style={{ left: `${22 + i * 28}%` }}
          animate={{ y: [0, -96], opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.7, ease: "easeOut" }}
        >
          <Ic className="size-4 fill-cyan/30" />
        </motion.div>
      ))}
    </VisualFrame>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 03 · Google SEO — your result climbing the rankings to #1
// ─────────────────────────────────────────────────────────────────────────────
type Row = { id: number; you?: boolean }
const SEO_START: Row[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4, you: true }]

function SeoVisual() {
  const [rows, setRows] = useState<Row[]>(SEO_START)
  useEffect(() => {
    const id = setInterval(() => {
      setRows((prev) => {
        const i = prev.findIndex((r) => r.you)
        if (i <= 0) {
          // Reached #1 → drop the "you" row back to the bottom and climb again.
          const others = prev.filter((r) => !r.you)
          const you = prev.find((r) => r.you)!
          return [...others, you]
        }
        const next = [...prev]
        ;[next[i - 1], next[i]] = [next[i], next[i - 1]]
        return next
      })
    }, 1300)
    return () => clearInterval(id)
  }, [])

  const rank = rows.findIndex((r) => r.you)

  return (
    <VisualFrame>
      {/* Live search driving the rankings */}
      <div className="absolute inset-x-5 top-4 flex items-center gap-2 rounded-full border border-line-strong bg-black/50 px-3 py-1.5">
        <Search className="size-3.5 shrink-0 text-cyan" />
        <TypingText text="best plumber near me" />
      </div>

      {/* Search results with your site climbing to #1 */}
      <div className="absolute inset-x-5 top-[18%] flex flex-col gap-1.5">
        {rows.map((r, idx) => (
          <motion.div
            layout
            key={r.id}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className={`flex items-center gap-2.5 rounded-lg border p-2 ${
              r.you
                ? "border-cyan/50 bg-cyan/10 shadow-[0_0_18px_-6px_rgba(20,228,254,0.7)]"
                : "border-line bg-surface-1/50"
            }`}
          >
            <span
              className={`w-3 text-[11px] font-bold ${
                r.you ? "text-cyan" : "text-near-white/40"
              }`}
            >
              {idx + 1}
            </span>
            <span
              className={`size-4 shrink-0 rounded-full ${
                r.you
                  ? "bg-cyan/80 shadow-[0_0_8px_rgba(20,228,254,0.8)]"
                  : "bg-near-white/15"
              }`}
            />
            <div className="min-w-0 flex-1">
              <span
                className={`block h-1.5 rounded ${
                  r.you ? "w-20 bg-cyan/70" : "w-14 bg-near-white/25"
                }`}
              />
              <span
                className={`mt-1 block h-1 rounded ${
                  r.you ? "w-28 bg-cyan/30" : "w-20 bg-near-white/10"
                }`}
              />
            </div>
            {r.you && (
              <span className="flex shrink-0 items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-cyan">
                {idx === 0 ? (
                  "#1 · You"
                ) : (
                  <>
                    <TrendingUp className="size-3" />
                    Your site
                  </>
                )}
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Burst when the climb lands */}
      <AnimatePresence>
        {rank === 0 && (
          <motion.div
            initial={{ scale: 0, rotate: -12, opacity: 0 }}
            animate={{ scale: 1, rotate: 6, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 14 }}
            className="absolute right-7 top-[14%] rounded-full bg-cyan px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-black shadow-[0_0_24px_rgba(20,228,254,0.8)]"
          >
            #1 Ranked
          </motion.div>
        )}
      </AnimatePresence>

      {/* Organic traffic + keyword wins + area sparkline */}
      <div className="absolute inset-x-5 bottom-4 flex items-end justify-between gap-3">
        <div>
          <span className="block text-[9px] uppercase tracking-wider text-near-white/50">
            Organic traffic
          </span>
          <span className="text-display flex items-center gap-1 text-sm font-bold text-cyan">
            <TrendingUp className="size-3.5" />
            <CountUp to={12} suffix="k / mo" />
          </span>
        </div>
        <div>
          <span className="block text-[9px] uppercase tracking-wider text-near-white/50">
            Keywords in top 3
          </span>
          <span className="text-display text-sm font-bold text-cyan">
            <CountUp to={26} suffix="+" />
          </span>
        </div>
        <svg viewBox="0 0 80 32" className="h-9 w-24 shrink-0">
          <defs>
            <linearGradient id="seo-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#14e4fe" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#14e4fe" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M2,30 L14,26 L26,27 L38,19 L50,14 L62,8 L78,3 L78,32 L2,32 Z"
            fill="url(#seo-area)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          />
          <motion.path
            d="M2,30 L14,26 L26,27 L38,19 L50,14 L62,8 L78,3"
            fill="none"
            stroke="#14e4fe"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 4px rgba(20,228,254,0.6))" }}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
          <motion.circle
            cx="78"
            cy="3"
            fill="#5cf0ff"
            animate={{ opacity: [1, 0.4, 1], r: [2.5, 3.2, 2.5] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            style={{ filter: "drop-shadow(0 0 5px rgba(20,228,254,0.9))" }}
          />
        </svg>
      </div>
    </VisualFrame>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 04 · Google LSAs — pin + sonar, Guaranteed badge, incoming lead toast
// ─────────────────────────────────────────────────────────────────────────────
const LSA_LEADS = [
  { name: "Sarah M.", job: "Water heater replacement" },
  { name: "Mike T.", job: "Emergency drain repair" },
  { name: "Priya K.", job: "Furnace tune up" },
]

function LsaVisual() {
  const [lead, setLead] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setLead((l) => (l + 1) % LSA_LEADS.length), 3200)
    return () => clearInterval(id)
  }, [])

  return (
    <VisualFrame>
      {/* Street map backdrop */}
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full text-cyan opacity-[0.13]"
      >
        {[55, 120, 185, 250].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke="currentColor" strokeWidth="1.5" />
        ))}
        {[60, 150, 240, 330].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="300" stroke="currentColor" strokeWidth="1.5" />
        ))}
        <line x1="0" y1="290" x2="400" y2="30" stroke="currentColor" strokeWidth="3" />
        <rect x="300" y="195" width="60" height="44" rx="6" fill="currentColor" opacity="0.5" />
        <rect x="36" y="60" width="48" height="36" rx="6" fill="currentColor" opacity="0.35" />
      </svg>

      {/* Rotating dashed service radius */}
      <motion.div
        className="absolute left-1/2 top-[46%] size-44 rounded-full border border-dashed border-cyan/25"
        style={{ x: "-50%", y: "-50%" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />

      {/* Rival pins, stuck below you */}
      {[
        { l: "22%", t: "64%" },
        { l: "76%", t: "28%" },
      ].map((p, i) => (
        <motion.div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2 text-near-white/30"
          style={{ left: p.l, top: p.t }}
          animate={{ opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 1.2 }}
        >
          <MapPin className="size-5" />
          <span className="absolute left-1/2 top-full mt-0.5 -translate-x-1/2 text-[7px] uppercase tracking-wider">
            Rival
          </span>
        </motion.div>
      ))}

      {/* Your pin + sonar */}
      <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/40"
            animate={{ scale: [0.35, 1.7], opacity: [0.55, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.85, ease: "easeOut" }}
          />
        ))}
        <motion.div
          initial={{ y: -28 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 12 }}
        >
          <MapPin
            className="size-11 text-cyan drop-shadow-[0_0_10px_rgba(20,228,254,0.7)]"
            fill="currentColor"
          />
          <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 rounded-full bg-cyan px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wide text-black">
            You
          </span>
        </motion.div>
      </div>

      {/* Cycling incoming calls */}
      <div className="absolute left-5 top-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={lead}
            initial={{ x: -24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -24, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="flex items-center gap-2 rounded-lg border border-line-strong bg-black/75 px-2.5 py-1.5"
          >
            <motion.span
              className="flex size-6 items-center justify-center rounded-full bg-cyan/15 text-cyan"
              animate={{ rotate: [0, -14, 12, -10, 8, 0] }}
              transition={{ duration: 0.7, repeat: Infinity, repeatDelay: 1.1 }}
            >
              <Phone className="size-3" />
            </motion.span>
            <div>
              <span className="block text-[10px] font-semibold text-near-white">
                {LSA_LEADS[lead].name} · calling now
              </span>
              <span className="block text-[8px] text-near-white/55">
                {LSA_LEADS[lead].job}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Review rating */}
      <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full border border-line-strong bg-black/70 px-2.5 py-1">
        <span className="text-[9px] leading-none text-amber-300">★★★★★</span>
        <span className="text-[10px] font-bold text-near-white">5.0</span>
        <span className="text-[8px] text-near-white/50">· 212 reviews</span>
      </div>

      {/* Leads this week */}
      <div className="absolute bottom-5 left-5">
        <span className="block text-[9px] uppercase tracking-wider text-near-white/50">
          Leads this week
        </span>
        <span className="text-display text-sm font-bold text-cyan">
          <CountUp to={37} />
        </span>
      </div>

      {/* Cost per lead */}
      <div className="absolute bottom-5 right-5 text-right">
        <span className="block text-[9px] uppercase tracking-wider text-near-white/50">
          Avg cost / lead
        </span>
        <span className="text-display text-sm font-bold text-cyan">
          <CountUp to={23} prefix="$" />
        </span>
      </div>

      {/* Google Guaranteed badge with shine sweep */}
      <motion.div
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-1.5 overflow-hidden rounded-full border border-emerald-400/40 bg-black/60 px-3 py-1 text-[11px] font-semibold text-emerald-300"
        initial={{ y: 8 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-8 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
          animate={{ left: ["-30%", "130%"] }}
          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
        />
        <ShieldCheck className="size-3.5" /> Google Guaranteed
      </motion.div>
    </VisualFrame>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 05 · Web Design — a cluttered "before" site rebuilt into a clean promo "after"
// ─────────────────────────────────────────────────────────────────────────────
/** Lighthouse-style ring that flips between a failing and a perfect score. */
function ScoreGauge({
  label,
  from,
  to,
  after,
}: {
  label: string
  from: number
  to: number
  after: boolean
}) {
  const R = 15
  const C = 2 * Math.PI * R
  const v = after ? to : from
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative size-11">
        <svg viewBox="0 0 40 40" className="size-full -rotate-90">
          <circle
            cx="20"
            cy="20"
            r={R}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="3.5"
          />
          <motion.circle
            cx="20"
            cy="20"
            r={R}
            fill="none"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={C}
            animate={{
              strokeDashoffset: C * (1 - v / 100),
              stroke: after ? "#14e4fe" : "#fb7185",
            }}
            transition={{ duration: 0.9, ease: EASE }}
            style={{
              filter: after ? "drop-shadow(0 0 4px rgba(20,228,254,0.7))" : "none",
            }}
          />
        </svg>
        <span
          className={`absolute inset-0 flex items-center justify-center text-[10px] font-bold transition-colors duration-500 ${
            after ? "text-cyan" : "text-rose-300"
          }`}
        >
          {v}
        </span>
      </div>
      <span className="text-[8px] uppercase tracking-wider text-near-white/50">
        {label}
      </span>
    </div>
  )
}

function WebVisual() {
  const [after, setAfter] = useState(false)
  useEffect(() => {
    const id = setInterval(() => setAfter((a) => !a), 3800)
    return () => clearInterval(id)
  }, [])

  return (
    <VisualFrame>
      <div className="absolute bottom-[27%] left-5 right-[31%] top-5 overflow-hidden rounded-xl border border-line-strong bg-black/50">
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 border-b border-line bg-surface-1/70 px-3 py-2">
          <span className="size-2 rounded-full bg-near-white/20" />
          <span className="size-2 rounded-full bg-near-white/20" />
          <span className="size-2 rounded-full bg-near-white/20" />
          <span className="ml-2 h-2.5 flex-1 rounded-full bg-near-white/10" />
        </div>

        {/* Viewport: the ugly BEFORE, with the beautiful AFTER wiping over it. */}
        <div className="relative h-[calc(100%-2rem)]">
          {/* BEFORE — clashing colours, a wall of tiny text, spammy banner. */}
          <div className="absolute inset-0 overflow-hidden bg-[#181a0e] p-2">
            <div className="mb-1 rounded-sm bg-[#8a2222] px-1 py-0.5 text-center text-[7px] font-black leading-tight text-yellow-300">
              ★★★ MEGA SALE!!! CLICK HERE NOW!!! ★★★
            </div>
            <div className="flex gap-1">
              <div className="flex-1 space-y-[3px]">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span
                    key={i}
                    className="block h-[3px] bg-[#6f7440]"
                    style={{ width: `${72 + ((i * 37) % 26)}%` }}
                  />
                ))}
              </div>
              <div className="w-10 shrink-0 space-y-[3px]">
                <span className="block h-6 bg-[#7a4b16]" />
                <span className="block h-[3px] bg-[#6f7440]" />
                <span className="block h-[3px] w-2/3 bg-[#6f7440]" />
                <span className="block h-4 bg-[#3a5a2a]" />
              </div>
            </div>
            <div className="mt-1 space-y-[3px]">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="block h-[3px] bg-[#6f7440]"
                  style={{ width: `${90 - ((i * 53) % 38)}%` }}
                />
              ))}
            </div>
            <div className="mt-1 inline-block bg-[#1d63c9] px-1 py-0.5 text-[6px] font-bold text-white underline">
              buy-now-limited-offer-click-here.html
            </div>
          </div>

          {/* AFTER — clean promotional hero. Revealed by a left-to-right wipe. */}
          <motion.div
            className="absolute inset-0"
            animate={{ clipPath: after ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <div className="flex h-full flex-col bg-gradient-to-b from-surface-1/90 to-black p-3">
              <div className="flex items-center justify-between">
                <span className="h-2 w-9 rounded bg-cyan/70" />
                <div className="flex gap-1.5">
                  <span className="h-1.5 w-5 rounded bg-near-white/25" />
                  <span className="h-1.5 w-5 rounded bg-near-white/25" />
                  <span className="h-1.5 w-5 rounded bg-near-white/25" />
                </div>
              </div>
              <div className="mt-auto">
                <p className="text-display text-[11px] font-bold leading-tight text-near-white">
                  Book Your Free
                  <br />
                  <span className="text-cyan-gradient">Estimate Today</span>
                </p>
                <p className="mt-1.5 text-[7px] leading-relaxed text-near-white/50">
                  Trusted local pros. Same week service, guaranteed.
                </p>
                <span className="mt-2 inline-block rounded-full bg-cyan px-2.5 py-1 text-[8px] font-bold text-black">
                  Get My Free Quote
                </span>
              </div>
            </div>
          </motion.div>

          {/* Scan line riding the wipe edge. */}
          <motion.div
            className="absolute inset-y-0 w-0.5 bg-cyan shadow-[0_0_14px_2px_rgba(20,228,254,0.9)]"
            animate={{ left: after ? "100%" : "0%" }}
            transition={{ duration: 1.1, ease: EASE }}
          />
        </div>
      </div>

      {/* Phone mirroring the rebuild — mobile first, always in sync */}
      <div className="absolute bottom-[30%] right-5 top-[9%] w-[22%] overflow-hidden rounded-[1.1rem] border border-line-strong bg-black/60">
        <div className="mx-auto mt-1 h-1 w-8 rounded-full bg-near-white/20" />
        <div className="relative mt-1 h-[calc(100%-0.9rem)]">
          {/* Cramped desktop site squeezed onto mobile */}
          <motion.div
            className="absolute inset-0 space-y-1 bg-[#181a0e] p-1.5"
            animate={{ opacity: after ? 0 : 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-2 rounded-sm bg-[#8a2222]" />
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="block h-[3px] bg-[#6f7440]"
                style={{ width: `${85 - ((i * 31) % 40)}%` }}
              />
            ))}
            <div className="h-4 bg-[#7a4b16]" />
          </motion.div>
          {/* Clean mobile hero */}
          <motion.div
            className="absolute inset-0 flex flex-col bg-gradient-to-b from-surface-1/90 to-black p-1.5"
            animate={{ opacity: after ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="h-1.5 w-5 rounded bg-cyan/70" />
            <div className="mt-auto">
              <span className="block h-1.5 w-3/4 rounded bg-near-white/80" />
              <span className="mt-1 block h-1.5 w-1/2 rounded bg-cyan/70" />
              <span className="mt-1 block h-1 w-full rounded bg-near-white/15" />
              <span className="mt-1.5 inline-block rounded-full bg-cyan px-1.5 py-0.5 text-[6px] font-bold text-black">
                Get Quote
              </span>
            </div>
          </motion.div>
          {/* Leads start landing the moment it goes live */}
          <AnimatePresence>
            {after && (
              <motion.span
                key="lead"
                initial={{ opacity: 0, y: 6, scale: 0.7 }}
                animate={{ opacity: 1, y: -6, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1.4, type: "spring", stiffness: 300, damping: 16 }}
                className="absolute bottom-6 right-1 rounded-full border border-cyan/60 bg-black/85 px-1 py-0.5 text-[6px] font-bold text-cyan"
              >
                +1 lead
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Lighthouse scores + live state */}
      <div className="absolute inset-x-5 bottom-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ScoreGauge label="Speed" from={34} to={100} after={after} />
          <ScoreGauge label="SEO" from={52} to={100} after={after} />
          <ScoreGauge label="Mobile" from={41} to={100} after={after} />
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <div
            className={`rounded-full border px-2.5 py-1 text-[10px] font-bold transition-colors duration-500 ${
              after
                ? "border-cyan/60 bg-black/70 text-cyan"
                : "border-rose-400/50 bg-black/70 text-rose-300"
            }`}
          >
            {after ? "After · Mako build" : "Before"}
          </div>
          <div className="text-right">
            <span className="block text-[9px] uppercase tracking-wider text-near-white/50">
              Load time
            </span>
            <span
              className={`text-display text-sm font-bold transition-colors duration-500 ${
                after ? "text-cyan" : "text-rose-300"
              }`}
            >
              {after ? "0.8s" : "6.4s"}
            </span>
          </div>
        </div>
      </div>
    </VisualFrame>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 06 · CRM Development — a lead travelling the pipeline + deals-won counter
// ─────────────────────────────────────────────────────────────────────────────
const CRM_STAGES = ["New lead", "Nurturing", "Won"]
const CRM_TOASTS = [
  { icon: Zap, text: "Instant reply sent · 8 seconds" },
  { icon: Mail, text: "Follow up email #2 sent automatically" },
  { icon: Bell, text: "Job booked · Tuesday 2:00 pm" },
]

function CrmVisual() {
  const [stage, setStage] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStage((s) => (s + 1) % CRM_STAGES.length), 2000)
    return () => clearInterval(id)
  }, [])
  const Toast = CRM_TOASTS[stage].icon

  return (
    <VisualFrame>
      {/* Header */}
      <span className="absolute left-5 top-4 text-[9px] uppercase tracking-wider text-near-white/50">
        Sales pipeline
      </span>
      <div className="absolute right-5 top-3.5 flex items-center gap-1.5 rounded-full border border-line-strong bg-black/60 px-2 py-0.5 text-[9px] font-semibold text-cyan">
        <Zap className="size-2.5" /> Avg response 8s
      </div>

      {/* Kanban columns */}
      <div className="absolute inset-x-5 top-[13%] grid h-[46%] grid-cols-3 gap-2">
        {CRM_STAGES.map((s, i) => (
          <div
            key={s}
            className={`rounded-xl border p-1.5 transition-colors duration-500 ${
              i === stage
                ? "border-cyan/40 bg-cyan/[0.05]"
                : "border-line bg-surface-1/40"
            }`}
          >
            <span className="block px-1 text-[8px] font-semibold uppercase tracking-wider text-near-white/55">
              {s}
            </span>
            <div className="mt-1.5 space-y-1.5">
              <div className="rounded-md border border-line bg-black/40 p-1">
                <span className="block h-1 w-8 rounded bg-near-white/20" />
                <span className="mt-1 block h-1 w-5 rounded bg-near-white/10" />
              </div>
              {i !== 1 && (
                <div className="rounded-md border border-line bg-black/40 p-1">
                  <span className="block h-1 w-6 rounded bg-near-white/20" />
                  <span className="mt-1 block h-1 w-9 rounded bg-near-white/10" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Hot deal card travelling across the board */}
      <motion.div
        className="absolute top-[33%] w-[24%] rounded-md border border-cyan/60 bg-black/90 p-1.5 shadow-[0_0_18px_-4px_rgba(20,228,254,0.8)]"
        initial={false}
        animate={{ left: ["5.5%", "38%", "70.5%"][stage] }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-bold text-near-white">Dana W.</span>
          {stage === 2 ? (
            <Check className="size-2.5 text-cyan" />
          ) : (
            <span className="size-1.5 animate-pulse rounded-full bg-cyan" />
          )}
        </div>
        <span className="mt-0.5 block text-[8px] font-semibold text-cyan">
          $3,400 job
        </span>
      </motion.div>

      {/* Automation firing at every stage */}
      <div className="absolute inset-x-5 top-[64%]">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="mx-auto flex w-fit items-center gap-1.5 rounded-full border border-line-strong bg-black/70 px-2.5 py-1 text-[9px] text-near-white/85"
          >
            <Toast className="size-3 text-cyan" />
            {CRM_TOASTS[stage].text}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom stats */}
      <div className="absolute inset-x-5 bottom-4 flex items-end justify-between">
        <div>
          <span className="text-display block text-sm font-bold leading-none text-cyan">
            0
          </span>
          <span className="text-[9px] uppercase tracking-wider text-near-white/50">
            Leads slipping through
          </span>
        </div>
        <div className="flex gap-2">
          <div className="rounded-lg border border-line bg-surface-1/50 px-2.5 py-1.5 text-right">
            <span className="text-display block text-sm font-bold leading-none text-near-white">
              <CountUp to={32} suffix="%" />
            </span>
            <span className="text-[9px] uppercase tracking-wider text-near-white/50">
              Close rate
            </span>
          </div>
          <div className="rounded-lg border border-cyan/40 bg-cyan/[0.06] px-2.5 py-1.5 text-right">
            <span className="text-display block text-sm font-bold leading-none text-cyan">
              <CountUp to={47} />
            </span>
            <span className="text-[9px] uppercase tracking-wider text-near-white/55">
              Deals won
            </span>
          </div>
        </div>
      </div>
    </VisualFrame>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 07 · Client LTV — one customer's journey replayed: every retention play we
// fire (reminder, VIP offer, referral reward) triggers another purchase, and
// the running client value multiplies from $180 to $4,200.
// ─────────────────────────────────────────────────────────────────────────────
const LTV_JOURNEY = [
  {
    label: "First job",
    amount: "$180",
    total: "$180",
    mult: "1x",
    h: 16,
    action: { icon: Zap, text: "New customer closed" },
  },
  {
    label: "Rebook",
    amount: "+$340",
    total: "$520",
    mult: "2.9x",
    h: 34,
    action: { icon: Mail, text: "Service reminder sent automatically" },
  },
  {
    label: "Upsell",
    amount: "+$880",
    total: "$1,400",
    mult: "7.8x",
    h: 52,
    action: { icon: MessageCircle, text: "VIP upgrade offer by text" },
  },
  {
    label: "Referral",
    amount: "+$2,800",
    total: "$4,200",
    mult: "23x",
    h: 72,
    action: { icon: Gift, text: "Referral reward unlocked" },
  },
]
const LTV_BAR_X = ["15.5%", "38.5%", "61.5%", "84.5%"]

function LtvVisual() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % LTV_JOURNEY.length), 2400)
    return () => clearInterval(id)
  }, [])
  const ActionIcon = LTV_JOURNEY[step].action.icon

  return (
    <VisualFrame>
      {/* The one customer whose value we keep multiplying */}
      <div className="absolute left-5 top-5 flex items-center gap-2 rounded-lg border border-line-strong bg-black/70 px-2.5 py-1.5">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-cyan/20 text-[10px] font-bold text-cyan">
          AR
        </span>
        <div>
          <span className="block text-[10px] font-semibold text-near-white">
            Alex R.
          </span>
          <span className="block text-[8px] text-near-white/55">
            One customer, kept for life
          </span>
        </div>
      </div>

      {/* Running client value */}
      <div className="absolute right-5 top-5 text-right">
        <span className="block text-[9px] uppercase tracking-wider text-near-white/50">
          Client value so far
        </span>
        <motion.span
          key={`total-${step}`}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="text-display block text-xl font-bold leading-tight text-cyan"
        >
          {LTV_JOURNEY[step].total}
        </motion.span>
        <motion.span
          key={`mult-${step}`}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
            step === LTV_JOURNEY.length - 1
              ? "border-cyan bg-cyan text-black shadow-[0_0_18px_rgba(20,228,254,0.7)]"
              : "border-cyan/40 bg-cyan/10 text-cyan"
          }`}
        >
          {LTV_JOURNEY[step].mult} first sale
        </motion.span>
      </div>

      {/* The retention play that triggered this purchase */}
      <div className="absolute inset-x-5 top-[38%] flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`action-${step}`}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            transition={{ duration: 0.35, ease: EASE }}
            className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-semibold ${
              step === 0
                ? "border-line-strong bg-black/80 text-near-white/80"
                : "border-cyan/40 bg-black/80 text-cyan shadow-[0_0_16px_-4px_rgba(20,228,254,0.7)]"
            }`}
          >
            <ActionIcon className="size-3" />
            {LTV_JOURNEY[step].action.text}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Money flying from the play down into the client's bar */}
      {step > 0 && (
        <motion.span
          key={`dot-${step}`}
          className="absolute z-10 flex size-4 items-center justify-center rounded-full bg-cyan text-[8px] font-black text-black shadow-[0_0_12px_rgba(20,228,254,0.9)]"
          initial={{ left: "50%", top: "45%", opacity: 0, scale: 0.5 }}
          animate={{
            left: LTV_BAR_X[step],
            top: "60%",
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.6],
          }}
          transition={{ duration: 1.1, ease: EASE, times: [0, 0.2, 0.85, 1] }}
        >
          $
        </motion.span>
      )}

      {/* Value stacking, purchase by purchase */}
      <div className="absolute inset-x-6 bottom-4">
        <div className="relative flex items-end gap-4" style={{ height: 116 }}>
          {/* Where it ends without retention */}
          <div
            className="absolute inset-x-0 border-t border-dashed border-near-white/25"
            style={{ bottom: 38 }}
          >
            <span className="absolute right-0 top-[-14px] text-[8px] uppercase tracking-wider text-near-white/40">
              Most stop after the first sale
            </span>
          </div>
          {LTV_JOURNEY.map((b, i) => (
            <div
              key={b.label}
              className="flex h-full flex-1 flex-col items-center justify-end gap-1"
            >
              <motion.span
                className="text-[9px] font-bold text-cyan"
                animate={{ opacity: step >= i ? 1 : 0, y: step >= i ? 0 : 6 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                {b.amount}
              </motion.span>
              <motion.span
                className="w-5 rounded-t-md bg-gradient-to-t from-cyan-deep via-cyan to-cyan-bright"
                animate={{
                  height: step >= i ? b.h : 4,
                  opacity: step >= i ? 1 : 0.3,
                  boxShadow:
                    step >= i
                      ? "0 0 16px rgba(20,228,254,0.45)"
                      : "0 0 0 rgba(20,228,254,0)",
                }}
                transition={{ duration: 0.6, ease: EASE }}
              />
              <span
                className={`text-[8px] uppercase tracking-wider transition-colors duration-500 ${
                  step >= i ? "text-near-white/70" : "text-near-white/35"
                }`}
              >
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </VisualFrame>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Service data — full list, aggressive dash-free copy.
// ─────────────────────────────────────────────────────────────────────────────

type Service = {
  id: string
  label: string
  tag: string
  headline: string
  description: string
  features: string[]
  icon: LucideIcon
  logo?: string
  Visual: ComponentType
}

const services: Service[] = [
  {
    id: "google-ads",
    label: "Google Ads",
    tag: "High intent",
    headline: "Show up the second they search and own the click",
    description:
      "Your future customers are typing in ready to buy right now. We plant you at the very top of Google with laser targeted Search and Performance Max campaigns that hijack that intent and turn it into booked jobs. No vanity clicks, no wasted spend, just tracked revenue landing in your pipeline.",
    features: [
      "Search & Performance Max",
      "Aggressive keyword targeting",
      "Conversion tracking baked in",
      "Landing pages built to close",
    ],
    icon: Target,
    logo: "/logos/google-ads.png",
    Visual: GoogleAdsVisual,
  },
  {
    id: "meta-ads",
    label: "Meta Ads",
    tag: "Demand gen",
    headline: "Stop the scroll and pack out your calendar",
    description:
      "We hijack attention on Facebook and Instagram with creative people physically cannot scroll past. Cold strangers become warm leads, warm leads become booked appointments, and your calendar stays full while you sleep. We test relentlessly so the winners scale and the losers die fast.",
    features: [
      "Scroll stopping creative",
      "Razor sharp audience targeting",
      "Retargeting funnels that convert",
      "Always on split testing",
    ],
    icon: Megaphone,
    logo: "/logos/meta.png",
    Visual: MetaAdsVisual,
  },
  {
    id: "google-seo",
    label: "Google SEO",
    tag: "Compounding",
    headline: "Climb to page one and own it for good",
    description:
      "Ads stop the moment you stop paying. SEO compounds forever. We engineer your rankings to the top of Google and lock them there, pulling in free high intent traffic that grows bigger every single month. This is the asset that keeps paying you long after your competitors give up.",
    features: [
      "Technical SEO foundations",
      "Content engineered to rank",
      "On page optimization",
      "Authority and backlink building",
    ],
    icon: Search,
    logo: "/logos/google.png",
    Visual: SeoVisual,
  },
  {
    id: "google-lsas",
    label: "Google LSAs",
    tag: "Local leads",
    headline: "Sit above everyone and get called first",
    description:
      "When someone needs you now, you appear at the absolute top with the green Google Guaranteed badge that instantly screams trust. You only pay for real leads, not clicks, and we manage every single one so your phone never stops ringing with ready to book customers in your area.",
    features: [
      "Google Guaranteed setup",
      "Hands off lead management",
      "Review generation engine",
      "Local SEO synergy",
    ],
    icon: ShieldCheck,
    logo: "/logos/google-lsa.png",
    Visual: LsaVisual,
  },
  {
    id: "web-design",
    label: "Web Design",
    tag: "Conversion",
    headline: "A website built to sell, not just to sit there",
    description:
      "A pretty site that does not convert is a liability bleeding you leads. We build lightning fast, conversion first websites engineered around one job: turning visitors into paying customers. Stunning to look at, ruthless at closing, and fast enough to keep Google and your buyers happy.",
    features: [
      "Conversion first design",
      "Perfect Core Web Vitals",
      "Mobile first build",
      "CMS and integrations",
    ],
    icon: MonitorSmartphone,
    Visual: WebVisual,
  },
  {
    id: "crm-development",
    label: "CRM Development",
    tag: "Automation",
    headline: "Capture every lead and close more on autopilot",
    description:
      "Most businesses quietly bleed money from leads that slip through the cracks. We build custom pipelines and automations that catch every enquiry, follow up in seconds, and drag more deals over the line without you lifting a finger. Nothing gets forgotten, nothing gets lost, everything gets closed.",
    features: [
      "Custom sales pipelines",
      "Instant lead capture",
      "Automated follow up",
      "Live reporting dashboards",
    ],
    icon: Database,
    Visual: CrmVisual,
  },
  {
    id: "client-ltv",
    label: "Client LTV Development",
    tag: "Retention",
    headline: "Turn one sale into a customer for life",
    description:
      "The real money is never in the first sale, it is in the second, third, and tenth. We build retention systems that pull buyers back again and again, stacking repeat revenue and multiplying the lifetime value of every client you fought so hard to win in the first place.",
    features: [
      "Email and SMS retention",
      "Loyalty and upsell flows",
      "Win back campaigns",
      "Lifetime value tracking",
    ],
    icon: Repeat,
    Visual: LtvVisual,
  },
]

function ServiceMark({ service }: { service: Service }) {
  const [failed, setFailed] = useState(false)
  const Icon = service.icon
  if (service.logo && !failed) {
    return (
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={service.logo}
          alt={`${service.label} logo`}
          onError={() => setFailed(true)}
          className="size-8 object-contain"
        />
      </span>
    )
  }
  return (
    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-cyan/5 text-cyan">
      <Icon className="size-6" />
    </span>
  )
}

function ServiceRow({ service, flip }: { service: Service; flip: boolean }) {
  const Visual = service.Visual
  return (
    <section
      id={service.id}
      className="relative scroll-mt-28 border-t border-line py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <Reveal className={flip ? "lg:order-2" : ""}>
          <div className="flex items-center gap-4">
            <ServiceMark service={service} />
            <div className="min-w-0">
              <span className="text-display block text-2xl leading-tight md:text-3xl">
                <span className="text-cyan-gradient drop-shadow-[0_0_18px_rgba(20,228,254,0.35)]">
                  {service.label}
                </span>
              </span>
              <span className="mt-1.5 block h-0.5 w-14 rounded-full bg-gradient-to-r from-cyan via-cyan/50 to-transparent" />
            </div>
          </div>
          <span className="mt-5 inline-flex w-fit rounded-full border border-line-strong bg-cyan/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan">
            {service.tag}
          </span>
          <h2 className="text-display mt-3 text-2xl leading-snug text-near-white md:text-3xl">
            {service.headline}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {service.description}
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {service.features.map((f) => (
              <li
                key={f}
                className="flex items-center gap-2.5 text-sm text-near-white/85"
              >
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-cyan/15 text-cyan">
                  <Check className="size-3" />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="/free-audit"
            className="group mt-8 inline-flex w-fit items-center gap-2 text-sm font-medium text-near-white transition-colors hover:text-cyan"
          >
            Get a free proposal
            <span className="flex size-8 items-center justify-center rounded-full border border-line-strong text-cyan transition-colors group-hover:bg-cyan group-hover:text-black">
              <ArrowUpRight className="size-4" />
            </span>
          </Link>
        </Reveal>

        {/* Animated visual */}
        <Reveal delay={0.1} className={flip ? "lg:order-1" : ""}>
          <Visual />
        </Reveal>
      </div>
    </section>
  )
}

export function ServicesSection() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-5 pb-12 pt-32 md:px-8 md:pb-16 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h1 className="text-display max-w-4xl text-[clamp(2.5rem,7vw,5rem)] leading-[1.04] text-near-white">
              Our <span className="text-cyan-gradient">Services</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              One team across paid, organic, web, and retention. Every channel is
              engineered to work together and grow your revenue, never to compete
              for the same budget.
            </p>
          </Reveal>

          {/* Jump-to chips */}
          <StaggerGroup className="mt-9 flex flex-wrap gap-2.5">
            {services.map((s) => (
              <StaggerItem key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="inline-flex rounded-full border border-line bg-surface-1/40 px-4 py-2 text-sm text-near-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/50 hover:text-cyan"
                >
                  {s.label}
                </a>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── Service list ─────────────────────────────────────────────────── */}
      {services.map((service, i) => (
        <ServiceRow key={service.id} service={service} flip={i % 2 === 1} />
      ))}

      {/* ── Closing CTA ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-line px-5 py-24 text-center md:px-8 md:py-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[60vh] w-[90vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(20,228,254,0.14),transparent_70%)] blur-[120px]" />
        <Reveal className="relative mx-auto max-w-2xl">
          {/* Urgency pill */}
          <UrgencyPill className="mb-7" />

          <h2 className="text-display text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.02] text-near-white">
            Let's build your{" "}
            <span className="text-cyan-gradient">growth plan.</span>
          </h2>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="relative mt-10 inline-block"
          >
            {/* Pulsing halo */}
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full bg-cyan/40 blur-xl"
              animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.92, 1.08, 0.92] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            />
            <Link
              href="/free-audit"
              className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full border border-cyan/70 bg-black/40 px-10 font-display text-sm font-semibold uppercase tracking-[0.14em] text-cyan backdrop-blur-sm transition-colors duration-300 hover:text-black md:h-16 md:px-12 md:text-base"
            >
              {/* cyan fill sweeps in from the left on hover */}
              <span className="absolute inset-0 origin-left scale-x-0 bg-cyan transition-transform duration-300 ease-out group-hover:scale-x-100" />
              <span className="relative">Get My Free Audit</span>
            </Link>
          </motion.div>

          {/* Trust chips */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-near-white/60 md:text-sm">
            {["Free 20 min call", "No contracts", "No obligations"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Check className="size-4 text-cyan" />
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  )
}
