"use client"

import { motion } from "framer-motion"
import { TrendingUp, Check } from "lucide-react"
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

// Reinforces the results-over-design message in the right-hand card.
const OBSESS_POINTS = [
  "Results over aesthetics — every site is engineered to convert, not just to impress.",
  "Every dollar is tracked straight to the revenue it brings back.",
  "We take on a select few clients and obsess over them like you're our only one.",
]

export function WhySpecialSection() {
  return (
    <section
      id="why"
      className="relative overflow-hidden bg-gradient-to-b from-cyan/[0.025] to-transparent py-24 md:py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-24 h-[55vh] w-[80vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(20,228,254,0.10),transparent_70%)] blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
          <SectionHeading
            align="left"
            sub={
              <>
                Most agencies hand you a pretty website and disappear. We
                engineer{" "}
                <span className="font-medium text-near-white">
                  Google Ads, Meta Ads, SEO, and conversion-built sites
                </span>{" "}
                around one thing —{" "}
                <span className="font-medium text-near-white">
                  the revenue they actually generate
                </span>
                . We take on a select few businesses and treat their numbers
                like our own.
              </>
            }
          >
            Why{" "}
            <span className="text-cyan-gradient">Mako Marketing?</span>
          </SectionHeading>

          {/* Right-hand "results-first" card — fills the space and hammers home
              that we chase revenue, not awards. */}
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-cyan/25 bg-gradient-to-br from-cyan/[0.07] to-surface-1/30 p-8 backdrop-blur-sm">
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-cyan/15 blur-[70px]"
                animate={{ opacity: [0.45, 0.85, 0.45], scale: [1, 1.15, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative">
                <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.28em] text-cyan/75">
                  <TrendingUp className="size-4" /> What we obsess over
                </span>
                <p className="text-display mt-4 text-2xl leading-snug text-near-white md:text-3xl">
                  Revenue First.{" "}
                  <span className="text-cyan-gradient">Always.</span>
                </p>
                <StaggerGroup className="mt-7 flex flex-col gap-4">
                  {OBSESS_POINTS.map((p) => (
                    <StaggerItem key={p}>
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-cyan/15 text-cyan">
                          <Check className="size-3.5" />
                        </span>
                        <span className="text-sm leading-relaxed text-near-white/85">
                          {p}
                        </span>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </div>
            </div>
          </Reveal>
        </div>

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
