"use client"

import {
  Check,
  Star,
  Clock,
  ShieldCheck,
  CalendarCheck,
  Search,
  Rocket,
  Send,
} from "lucide-react"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal"
import { SplitHeading } from "@/components/split-heading"
import { CalendlyEmbed } from "@/components/calendly-embed"
import { InquiryForm } from "@/components/inquiry-form"

const auditBullets = [
  "See where your ad spend is being wasted",
  "Get a clear plan to double qualified leads",
  "Know if we're a fit. If not, you keep the plan anyway",
]

const stats = [
  { icon: Star, value: "5.0", label: "Google rating" },
  { icon: Clock, value: "30 min", label: "Quick call" },
  { icon: ShieldCheck, value: "$0", label: "No obligation" },
]

const steps = [
  {
    icon: CalendarCheck,
    n: "01",
    title: "Book your slot",
    desc: "Pick a time below — it takes about 30 seconds.",
  },
  {
    icon: Search,
    n: "02",
    title: "We audit everything",
    desc: "Website, Google Ads, Meta Ads & SEO, end to end.",
  },
  {
    icon: Rocket,
    n: "03",
    title: "Get your growth plan",
    desc: "A clear roadmap to more booked, paying customers.",
  },
]

export function FreeAuditSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[55vh] w-[90vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(20,228,254,0.18),transparent_70%)] blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[40vh] w-[40vh] rounded-full bg-[radial-gradient(circle,rgba(20,228,254,0.10),transparent_70%)] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        {/* ── Heading ───────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-cyan">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan/60" />
              Free Audit
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-cyan/60" />
            </p>
          </Reveal>

          <h1 className="text-display mt-5 text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.05] text-near-white">
            <SplitHeading
              text={"Get Your Free\nMarketing Audit"}
              accent={["Marketing", "Audit"]}
            />
          </h1>

          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Book a free, no-pressure call and we&rsquo;ll show you exactly how
              to turn more of your traffic into booked, paying customers.
            </p>
          </Reveal>

          {/* Trust stats */}
          <StaggerGroup className="mx-auto mt-9 flex max-w-xl flex-wrap items-center justify-center gap-3">
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <div className="flex items-center gap-2.5 rounded-full border border-line bg-surface-1/60 px-4 py-2 backdrop-blur-sm">
                  <s.icon className="size-4 text-cyan" />
                  <span className="text-sm">
                    <span className="font-semibold text-near-white">
                      {s.value}
                    </span>{" "}
                    <span className="text-muted-foreground">{s.label}</span>
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        {/* ── How it works ──────────────────────────────────────── */}
        <StaggerGroup className="mt-16 grid gap-4 sm:grid-cols-3">
          {steps.map((step) => (
            <StaggerItem key={step.n}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-surface-1/50 p-6 backdrop-blur-sm transition-colors hover:border-line-strong">
                <span className="pointer-events-none absolute -right-2 -top-3 text-6xl font-bold leading-none text-cyan/10 transition-colors group-hover:text-cyan/20">
                  {step.n}
                </span>
                <span className="relative flex size-11 items-center justify-center rounded-xl border border-line-strong bg-cyan/5 text-cyan">
                  <step.icon className="size-5" />
                </span>
                <h3 className="text-display relative mt-5 text-lg text-near-white">
                  {step.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* ── Pitch intro ───────────────────────────────────────── */}
        <div className="mx-auto mt-14 max-w-3xl text-center">
          <Reveal>
            {/* Scarcity badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-cyan/[0.06] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan shadow-[0_0_22px_-10px_rgba(20,228,254,0.8)]">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan/70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-cyan" />
              </span>
              Only 2 New Clients Per Month
            </span>

            <h2 className="text-display mt-6 text-3xl leading-[1.1] text-near-white md:text-4xl">
              Book Your Free Growth Audit
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              15 minutes. No pitch deck. No fluff. We look at your ads, your site,
              and your lead flow, then tell you exactly what&rsquo;s leaking money.
            </p>
          </Reveal>

          {/* Value props as compact chips */}
          <StaggerGroup className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            {auditBullets.map((b) => (
              <StaggerItem key={b}>
                <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface-1/50 px-3.5 py-1.5 text-[13px] text-near-white/85">
                  <Check className="size-3.5 shrink-0 text-cyan" />
                  {b}
                </span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        {/* ── Booking + inquiry form, side by side and equal height ─ */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:items-stretch">
          {/* Calendly booking */}
          <Reveal className="h-full">
            <div className="relative h-full">
              {/* Glow halo behind the booking panel */}
              <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-[radial-gradient(circle_at_50%_0%,rgba(20,228,254,0.18),transparent_70%)] blur-2xl" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-line-strong bg-surface-1/70 shadow-[0_0_60px_-15px_rgba(20,228,254,0.3)] backdrop-blur-sm">
                {/* Panel header */}
                <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <CalendarCheck className="size-5 text-cyan" />
                    <span className="text-display text-sm text-near-white md:text-base">
                      Pick a time that works
                    </span>
                  </div>
                  <span className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan/70" />
                      <span className="relative inline-flex size-2 rounded-full bg-cyan" />
                    </span>
                    Slots open this week
                  </span>
                </div>
                <div className="flex-1 p-2">
                  <CalendlyEmbed />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Inquiry form */}
          <Reveal delay={0.1} className="h-full">
            <div className="relative h-full">
              {/* Glow halo to match the booking panel */}
              <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-[radial-gradient(circle_at_50%_0%,rgba(20,228,254,0.12),transparent_70%)] blur-2xl" />
              <div className="relative flex h-full flex-col rounded-2xl border border-line-strong bg-surface-1/70 shadow-[0_0_60px_-15px_rgba(20,228,254,0.3)] backdrop-blur-sm">
                {/* Panel header — mirrors the booking panel */}
                <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <Send className="size-5 text-cyan" />
                    <span className="text-display text-sm text-near-white md:text-base">
                      Prefer we reach out?
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    1-day reply
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <InquiryForm />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
