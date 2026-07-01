"use client"

import { useEffect, useRef, useState, type ComponentType } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
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
  type LucideIcon,
} from "lucide-react"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal"

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
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.5 }}
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
const SEO_START: Row[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4, you: true }, { id: 5 }]

function SeoVisual() {
  const [rows, setRows] = useState<Row[]>(SEO_START)
  useEffect(() => {
    const id = setInterval(() => {
      setRows((prev) => {
        const i = prev.findIndex((r) => r.you)
        if (i <= 0) {
          // Reached #1 → reset the "you" row back down to rank 4 and start over.
          const others = prev.filter((r) => !r.you)
          const you = prev.find((r) => r.you)!
          const copy = [...others]
          copy.splice(3, 0, you)
          return copy
        }
        const next = [...prev]
        ;[next[i - 1], next[i]] = [next[i], next[i - 1]]
        return next
      })
    }, 1300)
    return () => clearInterval(id)
  }, [])

  return (
    <VisualFrame>
      {/* Search results with your site climbing to #1 */}
      <div className="absolute inset-x-5 top-4 flex flex-col gap-1.5">
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
              <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider text-cyan">
                {idx === 0 ? "#1 · You" : "Your site"}
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Organic traffic climbing + mini sparkline */}
      <div className="absolute inset-x-5 bottom-4 flex items-end justify-between">
        <div>
          <span className="block text-[9px] uppercase tracking-wider text-near-white/50">
            Organic traffic
          </span>
          <span className="text-display text-sm font-bold text-cyan">
            <CountUp to={12} suffix="k / mo" />
          </span>
        </div>
        <svg viewBox="0 0 80 32" className="h-8 w-24">
          <motion.path
            d="M2,30 L14,26 L26,27 L38,19 L50,14 L62,8 L78,3"
            fill="none"
            stroke="#14e4fe"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 4px rgba(20,228,254,0.6))" }}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </VisualFrame>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 04 · Google LSAs — pin + sonar, Guaranteed badge, incoming lead toast
// ─────────────────────────────────────────────────────────────────────────────
function LsaVisual() {
  return (
    <VisualFrame>
      <div className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/40"
            animate={{ scale: [0.35, 1.7], opacity: [0.55, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.85, ease: "easeOut" }}
          />
        ))}
        <motion.div
          initial={{ y: -28, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ type: "spring", stiffness: 220, damping: 12 }}
        >
          <MapPin
            className="size-11 text-cyan drop-shadow-[0_0_10px_rgba(20,228,254,0.7)]"
            fill="currentColor"
          />
        </motion.div>
      </div>

      {/* Incoming lead toast sliding in and out */}
      <motion.div
        className="absolute left-5 top-5 flex items-center gap-2 rounded-lg border border-line-strong bg-black/75 px-2.5 py-1.5"
        animate={{ x: [-140, 0, 0, -140], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, times: [0, 0.14, 0.82, 1] }}
      >
        <span className="flex size-5 items-center justify-center rounded-full bg-cyan/15 text-cyan">
          <Phone className="size-3" />
        </span>
        <span className="text-[10px] text-near-white/85">
          New lead · calling now
        </span>
      </motion.div>

      {/* Review rating */}
      <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full border border-line-strong bg-black/70 px-2.5 py-1">
        <span className="text-[9px] leading-none text-amber-300">★★★★★</span>
        <span className="text-[10px] font-bold text-near-white">5.0</span>
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

      {/* Google Guaranteed badge */}
      <motion.div
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-emerald-400/40 bg-black/60 px-3 py-1 text-[11px] font-semibold text-emerald-300"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ delay: 0.4 }}
      >
        <ShieldCheck className="size-3.5" /> Google Guaranteed
      </motion.div>
    </VisualFrame>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 05 · Web Design — a cluttered "before" site rebuilt into a clean promo "after"
// ─────────────────────────────────────────────────────────────────────────────
function WebVisual() {
  const [after, setAfter] = useState(false)
  useEffect(() => {
    const id = setInterval(() => setAfter((a) => !a), 3800)
    return () => clearInterval(id)
  }, [])

  return (
    <VisualFrame>
      <div className="absolute inset-5 overflow-hidden rounded-xl border border-line-strong bg-black/50">
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

      {/* Before / After state badge */}
      <div
        className={`absolute right-6 top-6 rounded-full border px-2.5 py-1 text-[10px] font-bold transition-colors duration-500 ${
          after
            ? "border-cyan/60 bg-black/70 text-cyan"
            : "border-rose-400/50 bg-black/70 text-rose-300"
        }`}
      >
        {after ? "After" : "Before"}
      </div>

      {/* Perf jumps to 100 only once it's rebuilt. */}
      <motion.div
        className="absolute bottom-6 left-6 flex items-center gap-1.5 rounded-full border border-cyan/50 bg-black/70 px-2.5 py-1 text-[10px] font-bold text-cyan"
        animate={{ opacity: after ? 1 : 0.25, scale: after ? 1 : 0.94 }}
        transition={{ duration: 0.5 }}
      >
        {after ? 100 : 34} · Performance
      </motion.div>
    </VisualFrame>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 06 · CRM Development — a lead travelling the pipeline + deals-won counter
// ─────────────────────────────────────────────────────────────────────────────
function CrmVisual() {
  const stages = ["Lead", "Contacted", "Qualified", "Won"]
  return (
    <VisualFrame>
      <div className="absolute inset-x-7 top-[38%] -translate-y-1/2">
        <div className="relative flex items-center justify-between">
          <div className="absolute left-0 right-0 top-2 h-0.5 bg-line-strong" />
          <motion.div
            className="absolute top-2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_14px_rgba(20,228,254,0.95)]"
            animate={{ left: ["0%", "100%"] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          />
          {stages.map((s, i) => (
            <div key={s} className="relative z-10 flex flex-col items-center gap-2.5">
              <motion.span
                className="size-4 rounded-full border-2 border-cyan bg-black"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(20,228,254,0)",
                    "0 0 12px 2px rgba(20,228,254,0.6)",
                    "0 0 0 0 rgba(20,228,254,0)",
                  ],
                }}
                transition={{ duration: 3.4, repeat: Infinity, delay: i * 0.85 }}
              />
              <span className="text-[10px] uppercase tracking-wider text-near-white/70">
                {s}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Lead cards + deals-won counter */}
      <div className="absolute inset-x-6 bottom-6 flex items-end justify-between">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-9 w-12 rounded-md border border-line bg-surface-1/60 p-1"
              animate={{ y: [0, -4, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
            >
              <span className="block h-1 w-6 rounded bg-cyan/50" />
              <span className="mt-1 block h-1 w-8 rounded bg-near-white/15" />
            </motion.div>
          ))}
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
// 07 · Client LTV — repeat-cycle ring, rising repeat purchases, LTV counting up
// ─────────────────────────────────────────────────────────────────────────────
function LtvVisual() {
  const bars = [
    { l: "1st", h: 30 },
    { l: "2nd", h: 52 },
    { l: "3rd", h: 74 },
    { l: "4th", h: 100 },
  ]
  const R = 52
  const C = 2 * Math.PI * R
  return (
    <VisualFrame>
      {/* Retention stat chips */}
      <div className="absolute left-5 top-5 rounded-lg border border-line-strong bg-black/60 px-2.5 py-1.5">
        <span className="block text-[9px] uppercase tracking-wider text-near-white/50">
          Repeat rate
        </span>
        <span className="text-display text-sm font-bold text-cyan">
          <CountUp to={68} suffix="%" />
        </span>
      </div>
      <div className="absolute right-5 top-5 rounded-lg border border-line-strong bg-black/60 px-2.5 py-1.5 text-right">
        <span className="block text-[9px] uppercase tracking-wider text-near-white/50">
          Orders / client
        </span>
        <span className="text-display text-sm font-bold text-cyan">
          <CountUp to={4} suffix=".2x" />
        </span>
      </div>

      {/* Value ring + orbiting repeat purchases */}
      <div className="absolute left-1/2 top-[38%] size-40 -translate-x-1/2 -translate-y-1/2">
        {/* Filling value arc */}
        <svg viewBox="0 0 120 120" className="absolute inset-0 size-full -rotate-90">
          <circle
            cx="60"
            cy="60"
            r={R}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="3"
          />
          <motion.circle
            cx="60"
            cy="60"
            r={R}
            fill="none"
            stroke="#14e4fe"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={C}
            animate={{ strokeDashoffset: [C, C * 0.12] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: EASE }}
            style={{ filter: "drop-shadow(0 0 5px rgba(20,228,254,0.6))" }}
          />
        </svg>
        {/* Dashed guide */}
        <div className="absolute inset-[9px] rounded-full border border-dashed border-cyan/15" />
        {/* Orbiting repeat-purchase coins */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 flex size-5 items-center justify-center rounded-full border border-cyan/50 bg-black text-[9px] font-bold text-cyan shadow-[0_0_10px_-2px_rgba(20,228,254,0.8)]"
              style={{
                transform: `translate(-50%,-50%) rotate(${i * 90}deg) translateY(-69px) rotate(-${i * 90}deg)`,
              }}
            >
              $
            </span>
          ))}
        </motion.div>
        {/* Center readout */}
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <Repeat className="size-5 text-cyan" />
          <span className="text-display mt-1 text-lg font-bold leading-none text-cyan">
            <CountUp to={4200} prefix="$" />
          </span>
          <span className="mt-0.5 text-[8px] uppercase tracking-wider text-near-white/55">
            Lifetime value
          </span>
        </div>
      </div>

      {/* Purchase timeline — every repeat order stacks more value */}
      <div className="absolute inset-x-6 bottom-5">
        <div className="flex items-end gap-3" style={{ height: 50 }}>
          {bars.map((b, i) => (
            <div key={b.l} className="flex flex-1 items-end justify-center">
              <motion.span
                className="w-4 rounded-t-md bg-gradient-to-t from-cyan-deep via-cyan to-cyan-bright"
                style={{ height: `${b.h}%`, transformOrigin: "bottom" }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: EASE }}
              />
            </div>
          ))}
        </div>
        <div className="mt-1.5 flex gap-3">
          {bars.map((b) => (
            <span
              key={b.l}
              className="flex-1 text-center text-[8px] uppercase tracking-wider text-near-white/50"
            >
              {b.l}
            </span>
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
  n: string
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
    n: "01",
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
    n: "02",
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
    n: "03",
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
    n: "04",
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
    n: "05",
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
    n: "06",
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
    n: "07",
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
            <span className="text-display text-sm text-cyan/60">{service.n}</span>
            <span className="h-px w-10 bg-line-strong" />
            <ServiceMark service={service} />
            <span className="text-display text-lg leading-none text-near-white md:text-xl">
              {service.label}
            </span>
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
      <section className="relative border-t border-line px-5 py-24 text-center md:px-8 md:py-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[50vh] w-[80vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(20,228,254,0.12),transparent_70%)] blur-[120px]" />
        <Reveal className="relative mx-auto max-w-2xl">
          <h2 className="text-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.06] text-near-white">
            Not sure which channel you need?{" "}
            <span className="text-cyan-gradient">We'll map it for you.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Book a free audit and we'll show you the exact mix of channels that
            gets you the most booked customers for your budget.
          </p>
          <motion.div whileHover={{ y: -2 }} className="mt-9 inline-block">
            <Link
              href="/free-audit"
              className="btn-cyan h-12 px-9 text-sm uppercase tracking-[0.12em]"
            >
              Claim My Free Audit
              <ArrowUpRight className="size-5" />
            </Link>
          </motion.div>
        </Reveal>
      </section>
    </>
  )
}
