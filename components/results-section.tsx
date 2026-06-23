"use client"

import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal"
import { AnimatedCounter } from "@/components/animated-counter"
import { TrendingUp } from "lucide-react"

const stats = [
  { value: "100+", label: "Satisfied clients" },
  { value: "24/7", label: "Always-on visibility" },
  { value: "150%", label: "Avg. lead increase" },
  { value: "8+", label: "Years of experience" },
]

// Placeholder case results — swap in real client numbers.
const cases = [
  {
    metric: "4.2x",
    label: "Return on ad spend",
    detail: "Home services client, Google Ads + LSA",
  },
  {
    metric: "+187%",
    label: "Organic traffic",
    detail: "6-month SEO program",
  },
  {
    metric: "62%",
    label: "Lower cost per lead",
    detail: "Meta Ads creative overhaul",
  },
]

export function ResultsSection() {
  return (
    <section
      id="results"
      className="relative overflow-hidden border-t border-line bg-transparent py-24 md:py-32"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,rgba(20,228,254,0.16),transparent_70%)] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan">
              Results
            </p>
            <h2 className="text-display mt-4 text-[clamp(2rem,5vw,3.6rem)] text-near-white">
              Marketing That{" "}
              <span className="text-cyan-gradient">Pays For Itself</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              We help service-based businesses establish credibility, attract
              organic traffic, and convert visitors into paying customers. Our
              approach combines performance-driven web development with strategic
              advertising to build a digital presence that works around the clock
              — giving you 24/7 visibility and a competitive edge in your market.
            </p>
          </Reveal>

          {/* Case study placeholders */}
          <StaggerGroup className="flex flex-col gap-4">
            {cases.map((c) => (
              <StaggerItem key={c.label}>
                <div className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface-1/60 p-6 transition-colors hover:border-line-strong">
                  <div>
                    <p className="text-sm text-muted-foreground">{c.label}</p>
                    <p className="mt-1 text-sm text-near-white/50">{c.detail}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="size-5 text-cyan" />
                    <span className="text-display text-3xl text-cyan-gradient md:text-4xl">
                      <AnimatedCounter value={c.metric} />
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
            <p className="px-1 text-xs text-near-white/30">
              Sample results shown — real client numbers coming soon.
            </p>
          </StaggerGroup>
        </div>

        {/* Stat counters */}
        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-black/50 px-6 py-10 text-center backdrop-blur-sm md:px-8 md:py-14"
            >
              <div className="text-display text-[clamp(2.4rem,5vw,3.8rem)] text-white-gradient">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
