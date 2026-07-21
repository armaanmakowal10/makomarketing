"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useInView } from "framer-motion"
import {
  ArrowUpRight,
  MapPin,
  Target,
  Megaphone,
  TrendingUp,
  type LucideIcon,
} from "lucide-react"

// ── Live client ad dashboards ────────────────────────────────────────────────
// Real screenshots from accounts we manage. Conversion rate drives the return on
// ad spend, and both count up when the card scrolls into view.
export type Dashboard = {
  key: string
  platform: string
  Icon: LucideIcon
  trade: string
  location: string
  story?: string
  conv: number // conversion rate %
  roas: number // return on ad spend (x) — scales with the conversion rate
  avgJob: number // average job price ($)
  stats: string[]
  img: string
  aspect: string
}

export const metaDashboard: Dashboard = {
  key: "meta",
  platform: "Meta Ads",
  Icon: Megaphone,
  trade: "Asphalt & Sealcoating",
  location: "Durham, ON",
  conv: 43,
  roas: 40,
  avgJob: 350,
  stats: ["146 leads", "CA$3.86 / lead", "24.7K reach"],
  img: "/meta-result-1.png",
  aspect: "1206 / 1882",
}

export const paintingDashboard: Dashboard = {
  key: "meta-painting",
  platform: "Meta Ads",
  Icon: Megaphone,
  trade: "Painting",
  location: "Toronto, ON",
  conv: 23,
  roas: 33,
  avgJob: 2500,
  stats: ["27 leads", "CA$10.17 / lead", "11.2K impressions"],
  img: "/painting-result-1.jpg",
  aspect: "1170 / 1605",
}

export const googleAdsDashboards: Dashboard[] = [
  {
    key: "gads1",
    platform: "Google Ads",
    Icon: Target,
    trade: "Plumbing",
    location: "Etobicoke, ON",
    story: "Rebuilt the account from scratch — every click now traces to booked work.",
    conv: 34,
    roas: 31,
    avgJob: 1000,
    stats: ["34 clicks", "$6.15 CPC", "$209 spend"],
    img: "/gads-result-1.png",
    aspect: "512 / 113",
  },
  {
    key: "gads2",
    platform: "Google Ads",
    Icon: Target,
    trade: "Electrical",
    location: "Toronto, ON",
    story: "Scaled spend hard while holding the cost per lead low.",
    conv: 38,
    roas: 35,
    avgJob: 800,
    stats: ["60 clicks", "1.44K impressions", "$414 spend"],
    img: "/gads-result-2.png",
    aspect: "512 / 165",
  },
]

// Real service-business websites we've designed and developed.
export type Project = { title: string; url: string; description: string; image: string }

export const projects: Project[] = [
  { title: "NanoGuard Solutions", url: "https://nanoguard-solutions.vercel.app/", description: "High-converting site for a GTA roof protection company", image: "/nanoguard-port.png" },
  { title: "Langstaff & Sloan", url: "https://langstaffandsloan-nine.vercel.app/", description: "Booking-focused site for a Toronto electrical contractor", image: "/langstaff-port.png" },
  { title: "Power Design Electrical", url: "https://www.powerdesignelectricalltd.com/", description: "Lead-gen site for licensed electrical contractors", image: "/powerdesign-port.png" },
  { title: "Prestige Paving Solutions", url: "https://www.prestigepavingsolutions.ca/", description: "Local site for asphalt paving & sealcoating", image: "/prestige-port.png" },
  { title: "Watches by Timepiece", url: "https://www.watchesbytimepiece.com/", description: "E-commerce site for a pre-owned luxury watch dealer", image: "/watches-port.png" },
  { title: "Apache Interactive", url: "https://apache-interactive.com/", description: "Website for a mobile app & software studio", image: "/apache-port.png" },
]

// ── Count-up that runs once when it scrolls into view ─────────────────────────
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.6,
}: {
  to: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000))
      setVal(to * (1 - Math.pow(1 - t, 3))) // easeOutCubic
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration])

  return (
    <span ref={ref}>
      {prefix}
      {decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString()}
      {suffix}
    </span>
  )
}

// Headline metrics: conversion rate, the return on ad spend it drives, and the
// average price of a booked job.
export function Metrics({
  conv,
  roas,
  avgJob,
  big,
}: {
  conv: number
  roas: number
  avgJob?: number
  big?: boolean
}) {
  const size = big ? "text-5xl md:text-6xl" : "text-4xl md:text-5xl"
  return (
    <div className="flex flex-wrap items-stretch gap-x-5 gap-y-4">
      <div>
        <span className={`text-display block leading-none text-cyan-gradient ${size}`}>
          <CountUp to={conv} suffix="%" />
        </span>
        <span className="mt-2 block text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
          Conversion rate
        </span>
      </div>
      <span className="w-px shrink-0 bg-line" />
      <div>
        <span className={`text-display flex items-start leading-none text-near-white ${size}`}>
          <CountUp to={roas} suffix="x" />
          <TrendingUp className="ml-1 mt-1 size-4 text-cyan" />
        </span>
        <span className="mt-2 block text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
          Return on ad spend
        </span>
      </div>
      {avgJob != null && (
        <>
          <span className="w-px shrink-0 bg-line" />
          <div>
            <span className={`text-display block leading-none text-near-white ${size}`}>
              <CountUp to={avgJob} prefix="$" />
            </span>
            <span className="mt-2 block text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Avg. job price
            </span>
          </div>
        </>
      )}
    </div>
  )
}

function Eyebrow({ trade, location }: { trade: string; location: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
      <span className="rounded-full border border-cyan/25 bg-cyan/[0.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan">
        {trade}
      </span>
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-near-white/60">
        <MapPin className="size-3.5 text-cyan" />
        {location}
      </span>
    </div>
  )
}

function StatRow({ stats }: { stats: string[] }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] font-medium text-near-white/60">
      {stats.map((s) => (
        <span key={s} className="flex items-center gap-1.5">
          <span className="size-1 rounded-full bg-cyan" />
          {s}
        </span>
      ))}
    </div>
  )
}

export function LiveTag() {
  return (
    <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan">
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan/70" />
        <span className="relative inline-flex size-1.5 rounded-full bg-cyan" />
      </span>
      Live
    </span>
  )
}

// ── Featured split card — phone screenshot beside the headline metrics ────────
export function FeatureDashboard({ d }: { d: Dashboard }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface-1/50 backdrop-blur-sm transition-all duration-500 hover:border-cyan/40 hover:shadow-[0_0_80px_-24px_rgba(20,228,254,0.6)] md:flex-row">
      <span className="pointer-events-none absolute inset-x-0 top-0 z-30 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-cyan to-transparent transition-transform duration-700 group-hover:scale-x-100" />
      {/* Phone screenshot — framed and shown in full, never cropped */}
      <div className="relative flex w-full shrink-0 flex-col items-center justify-center gap-4 overflow-hidden bg-[#0b1220] p-6 md:w-[38%] md:p-8 lg:w-[34%]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_50%,rgba(20,228,254,0.10),transparent_70%)]" />
        <span className="relative z-20 inline-flex items-center gap-2 rounded-full border border-line-strong bg-black/70 px-3 py-1.5 text-[11px] font-medium text-near-white/80 backdrop-blur-sm">
          <d.Icon className="size-3.5 text-cyan" />
          {d.platform}
        </span>
        <div
          className="relative z-10 w-56 overflow-hidden rounded-2xl border border-line-strong shadow-[0_0_45px_-10px_rgba(20,228,254,0.45)] transition-transform duration-700 ease-out group-hover:scale-[1.02] sm:w-64 md:w-full md:max-w-[280px]"
          style={{ aspectRatio: d.aspect }}
        >
          <Image
            src={d.img}
            alt={`${d.platform} dashboard — real client campaign results`}
            fill
            sizes="(max-width: 768px) 256px, 280px"
            className="object-contain"
          />
        </div>
        <span className="pointer-events-none absolute inset-0 z-20 -translate-x-full bg-gradient-to-r from-transparent via-cyan/10 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-full" />
      </div>

      {/* Metrics + brief story */}
      <div className="flex flex-1 flex-col justify-center gap-5 p-6 md:p-9">
        <Eyebrow trade={d.trade} location={d.location} />
        <Metrics conv={d.conv} roas={d.roas} avgJob={d.avgJob} big />
        {d.story && (
          <p className="max-w-md text-sm leading-relaxed text-near-white/80 md:text-base">
            {d.story}
          </p>
        )}
        <StatRow stats={d.stats} />
      </div>
    </article>
  )
}

// ── Wide dashboard card — framed screenshot over the metrics + one-liner ──────
export function WideDashboard({ d }: { d: Dashboard }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface-1/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-cyan/50 hover:shadow-[0_0_60px_-18px_rgba(20,228,254,0.55)]">
      {/* Window chrome makes the screenshot read as a real, framed dashboard */}
      <div className="flex items-center gap-2 border-b border-line/70 px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="size-2 rounded-full bg-near-white/15" />
          <span className="size-2 rounded-full bg-near-white/15" />
          <span className="size-2 rounded-full bg-near-white/15" />
        </span>
        <span className="ml-1.5 flex items-center gap-1.5 text-[11px] font-medium text-near-white/70">
          <d.Icon className="size-3.5 text-cyan" />
          {d.platform}
        </span>
        <span className="ml-auto">
          <LiveTag />
        </span>
      </div>

      <div className="relative w-full overflow-hidden bg-white" style={{ aspectRatio: d.aspect }}>
        <Image
          src={d.img}
          alt={`${d.platform} dashboard — real client campaign results`}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover"
        />
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan/15 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-full" />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <Eyebrow trade={d.trade} location={d.location} />
        <Metrics conv={d.conv} roas={d.roas} avgJob={d.avgJob} />
        {d.story && (
          <p className="text-sm leading-relaxed text-near-white/75">{d.story}</p>
        )}
        <div className="mt-auto">
          <StatRow stats={d.stats} />
        </div>
      </div>
    </article>
  )
}

// ── Website portfolio card ────────────────────────────────────────────────────
// Fixed-width by default (horizontal carousel); `fluid` fills its grid cell.
export function ProjectCard({
  project,
  index,
  fluid,
}: {
  project: Project
  index: number
  fluid?: boolean
}) {
  const width = fluid ? "w-full" : "w-[300px] snap-start sm:w-[360px]"
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block h-full shrink-0 overflow-hidden rounded-2xl border border-line bg-surface-1 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/50 hover:shadow-[0_0_55px_-16px_rgba(20,228,254,0.6)] ${width}`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} — website designed and developed by Mako Marketing`}
          fill
          sizes={fluid ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" : "360px"}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <span className="text-display absolute left-4 top-4 text-sm text-cyan drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          0{index + 1}
        </span>
        <span className="absolute bottom-3 right-3 flex translate-y-2 items-center gap-1.5 rounded-full border border-cyan/50 bg-black/70 px-3 py-1.5 text-xs font-medium text-cyan opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Visit site
          <ArrowUpRight className="size-3.5" />
        </span>
      </div>
      <div className="flex items-end justify-between gap-4 p-5">
        <div>
          <h4 className="text-display text-lg text-near-white md:text-xl">
            {project.title}
          </h4>
          <p className="mt-1 text-sm text-muted-foreground">
            {project.description}
          </p>
        </div>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line-strong text-cyan transition-colors group-hover:bg-cyan group-hover:text-black">
          <ArrowUpRight className="size-4.5" />
        </span>
      </div>
    </a>
  )
}
