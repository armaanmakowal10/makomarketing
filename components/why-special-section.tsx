"use client"

import { motion } from "framer-motion"
import { TrendingUp, Target, LineChart, Heart } from "lucide-react"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { AnimatedCounter } from "@/components/animated-counter"
import { SuccessChart } from "@/components/sections/SuccessChart"

// Ascending bars that grow up when scrolled into view — a "returns climbing"
// visual that reinforces the ROAS stat next to it. The whileInView trigger lives
// on the full-height container (the bars start at scaleY:0, so they'd have zero
// area and never trip an IntersectionObserver on their own).
const BAR_HEIGHTS = [28, 40, 52, 68, 84, 100]
const barsContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}
const barItem = {
  hidden: { scaleY: 0, opacity: 0.3 },
  show: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
}
function GrowthBars() {
  return (
    <motion.div
      aria-hidden
      className="mx-auto flex h-28 items-end gap-2 sm:mx-0"
      variants={barsContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.4 }}
    >
      {BAR_HEIGHTS.map((h, i) => (
        <motion.span
          key={i}
          variants={barItem}
          style={{ height: `${h}%`, transformOrigin: "bottom" }}
          className="w-3.5 rounded-t-md bg-gradient-to-t from-cyan-deep via-cyan to-cyan-bright shadow-[0_0_12px_rgba(20,228,254,0.35)]"
        />
      ))}
    </motion.div>
  )
}

// The three principles, each with a short title so the cards scan at a glance.
const OBSESS_POINTS = [
  {
    icon: Target,
    title: "Results Over Aesthetics",
    desc: "Every site is engineered to convert, not just to impress.",
  },
  {
    icon: LineChart,
    title: "Every Dollar Tracked",
    desc: "We trace every dollar straight to the revenue it brings back.",
  },
  {
    icon: Heart,
    title: "A Select Few Clients",
    desc: "We obsess over a handful of clients like you're our only one.",
  },
]

export function WhySpecialSection() {
  return (
    <section
      id="why"
      className="relative overflow-hidden bg-gradient-to-b from-cyan/[0.025] to-transparent py-24 md:py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-24 h-[55vh] w-[80vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(20,228,254,0.10),transparent_70%)] blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        {/* Intro — centred so the section opens with one clear focal point. */}
        <SectionHeading
          sub={
            <>
              Most agencies hand you a pretty website and vanish. We don&rsquo;t.
              We engineer{" "}
              <span className="font-medium text-near-white">
                Google Ads, Meta Ads, SEO, and high converting websites
              </span>{" "}
              built to do one thing:{" "}
              <span className="font-medium text-near-white">
                generate revenue you can actually count
              </span>
              . We take on a select few businesses and attack their growth like
              our own money is on the line.
            </>
          }
        >
          Why <span className="text-cyan-gradient">Mako Marketing?</span>
        </SectionHeading>

        {/* The three principles, broken out into equal cards so each one is
            easy to scan instead of buried in a list. */}
        <StaggerGroup className="mt-16 grid gap-5 sm:grid-cols-3 sm:gap-6">
          {OBSESS_POINTS.map((point) => (
            <StaggerItem key={point.title}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-cyan/15 bg-gradient-to-b from-cyan/[0.06] to-surface-1/20 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-[0_18px_40px_-22px_rgba(20,228,254,0.55)]">
                {/* Thin accent line that lights up on hover. */}
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="flex size-12 items-center justify-center rounded-2xl border border-cyan/25 bg-cyan/10 text-cyan transition-colors duration-300 group-hover:bg-cyan group-hover:text-black">
                  <point.icon className="size-5" />
                </span>
                <h4 className="text-display mt-5 text-lg text-near-white">
                  {point.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                  {point.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* ROAS proof banner */}
        <Reveal className="mt-12">
          <div className="group relative overflow-hidden rounded-3xl border border-cyan/30 bg-gradient-to-br from-cyan/[0.08] via-surface-1/50 to-surface-1/20 p-8 md:p-10">
            {/* drifting ambient glow */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-cyan/20 blur-[90px]"
              animate={{ opacity: [0.45, 0.9, 0.45], scale: [1, 1.18, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative grid items-center gap-8 md:grid-cols-[auto_1fr_auto] md:gap-10">
              {/* Headline stat */}
              <div className="text-center sm:text-left">
                <span className="text-display block text-[clamp(3rem,9vw,5.5rem)] leading-none text-cyan-gradient">
                  <AnimatedCounter value="18-26x" />
                </span>
                <span className="mt-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.28em] text-cyan/75">
                  <TrendingUp className="size-4" />
                  Return on ad spend
                </span>
              </div>

              {/* Copy */}
              <p className="max-w-md text-base leading-relaxed text-near-white/80 md:text-lg">
                Average return on ad spend across our client campaigns. We
                don&rsquo;t simply manage your budget — we engineer every dollar
                to deliver a measurable return.
              </p>

              {/* Animated growth bars */}
              <GrowthBars />
            </div>
          </div>
        </Reveal>

        <SuccessChart />
      </div>
    </section>
  )
}
