"use client"

import Link from "next/link"
import { Target, Gauge, Workflow, LineChart, ArrowUpRight, type LucideIcon } from "lucide-react"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { AnimatedCounter } from "@/components/animated-counter"
import { SuccessChart } from "@/components/sections/SuccessChart"

type Reason = { icon: LucideIcon; title: string; body: string }

const reasons: Reason[] = [
  {
    icon: Workflow,
    title: "A meticulous, proven process",
    body: "Thorough market research, conversion-tested creative, precise tracking, and ongoing weekly optimization. Our process is fully documented and engineered to deliver results few agencies can match.",
  },
  {
    icon: Target,
    title: "Revenue, not vanity metrics",
    body: "We don't focus on impressions or likes. Every campaign is built around a single metric: the revenue it generates for your business.",
  },
  {
    icon: Gauge,
    title: "Built to convert, not merely to impress",
    body: "Fast, search-optimized websites and carefully managed ad accounts. We prioritize Core Web Vitals, tracking, and conversion paths so no qualified lead is lost.",
  },
  {
    icon: LineChart,
    title: "Results that compound",
    body: "We prioritize the fastest wins first, then reinvest in what proves effective — so your pipeline grows larger and more efficient each month.",
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
        <SectionHeading
          align="left"
          sub="As a results-driven digital marketing agency for service businesses, we work with a select group of clients rather than spreading ourselves thin. We specialize in Google Ads, Meta Ads, SEO, and high-converting web design for contractors, home services, and local businesses — concentrating on the metrics that drive revenue and supporting it with a process few agencies can match."
        >
          Why{" "}
          <span className="text-cyan-gradient">Mako Marketing?</span>
        </SectionHeading>

        {/* ROAS proof banner */}
        <Reveal className="mt-12">
          <div className="flex flex-col items-center gap-5 rounded-2xl border border-cyan/30 bg-cyan/[0.04] px-8 py-9 text-center sm:flex-row sm:gap-8 sm:text-left">
            <span className="text-display text-[clamp(3rem,9vw,5.5rem)] leading-none text-cyan-gradient">
              <AnimatedCounter value="18-26x" />
            </span>
            <span className="max-w-md text-base leading-relaxed text-near-white/80 md:text-lg">
              Average return on ad spend across our client campaigns. We
              don&rsquo;t simply manage your budget — we engineer every dollar
              to deliver a measurable return.
            </span>
          </div>
        </Reveal>

        <SuccessChart />

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {reasons.map((r, i) => {
            const Icon = r.icon
            return (
              <StaggerItem key={r.title}>
                <div className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl border border-line bg-surface-1/40 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong md:p-8">
                  <span className="text-display pointer-events-none absolute -right-2 -top-4 select-none text-[6rem] leading-none text-cyan/[0.06] transition-colors duration-300 group-hover:text-cyan/[0.12]">
                    0{i + 1}
                  </span>
                  <span className="flex size-12 items-center justify-center rounded-xl border border-line-strong bg-cyan/5 text-cyan transition-colors group-hover:bg-cyan group-hover:text-black">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="text-display text-xl text-near-white md:text-2xl">
                    {r.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {r.body}
                  </p>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>

        <Reveal className="mt-10">
          <Link
            href="/process"
            className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-near-white transition-colors hover:text-cyan"
          >
            See our full process
            <span className="flex size-8 items-center justify-center rounded-full border border-line-strong text-cyan transition-colors group-hover:bg-cyan group-hover:text-black">
              <ArrowUpRight className="size-4" />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
