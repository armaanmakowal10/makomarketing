"use client"

import Link from "next/link"
import {
  Target,
  Megaphone,
  MonitorSmartphone,
  Search,
  ShieldCheck,
  Database,
  Repeat,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"

type Item = { label: string; line: string; tag: string; icon: LucideIcon }

const items: Item[] = [
  { label: "Google Ads", line: "Hijack high-intent searches and turn them into booked jobs — fast.", tag: "High intent", icon: Target },
  { label: "Meta Ads", line: "Stop the scroll and flood your calendar with new appointments.", tag: "Demand gen", icon: Megaphone },
  { label: "Google SEO", line: "Own page one and stack free, compounding traffic month after month.", tag: "Compounding", icon: Search },
  { label: "Google LSAs", line: "Land at the very top of local search with the Google Guaranteed badge.", tag: "Local leads", icon: ShieldCheck },
  { label: "Web Design", line: "Lightning-fast sites engineered to turn clicks into paying customers.", tag: "Conversion", icon: MonitorSmartphone },
  { label: "CRM Development", line: "Custom pipelines that capture every lead and close more deals on autopilot.", tag: "Automation", icon: Database },
  { label: "Client LTV Development", line: "Turn one-time buyers into repeat revenue and maximize lifetime value.", tag: "Retention", icon: Repeat },
]

export function ServicesBrief() {
  return (
    <section
      id="services"
      className="relative overflow-hidden border-t-[3px] border-white/80 bg-transparent py-24 md:py-32"
    >
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Our Services"
          sub="From Google Ads and Meta advertising to SEO, Google Local Service Ads, web design, CRM development, and customer lifetime value — one team across paid, organic, web, and retention, all working together to grow your revenue instead of competing for the same budget."
        >
          Everything you need to dominate{" "}
          <span className="text-cyan-gradient">your market</span>
        </SectionHeading>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <StaggerItem key={item.label}>
                <Link
                  href="/services"
                  className="group relative flex h-full items-start gap-4 overflow-hidden rounded-2xl border border-line bg-surface-1/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/50 hover:bg-surface-1/70 hover:shadow-[0_0_40px_-12px_rgba(20,228,254,0.5)]"
                >
                  {/* top accent line lights up on hover */}
                  <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-cyan/0 via-cyan to-cyan/0 transition-transform duration-500 group-hover:scale-x-100" />
                  {/* faint oversized watermark icon */}
                  <Icon className="pointer-events-none absolute -bottom-4 -right-4 size-24 text-cyan/[0.05] transition-colors duration-300 group-hover:text-cyan/[0.09]" />
                  <span className="relative flex size-11 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-cyan/5 text-cyan transition-colors group-hover:bg-cyan group-hover:text-black">
                    <Icon className="size-5" />
                  </span>
                  <span className="relative min-w-0">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-display text-lg text-near-white">
                        {item.label}
                      </span>
                      <span className="rounded-full border border-line-strong bg-cyan/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-cyan">
                        {item.tag}
                      </span>
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                      {item.line}
                    </span>
                  </span>
                </Link>
              </StaggerItem>
            )
          })}
        </StaggerGroup>

        <Reveal className="mt-10 text-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-medium text-near-white transition-colors hover:text-cyan"
          >
            View all services
            <span className="flex size-8 items-center justify-center rounded-full border border-line-strong text-cyan transition-colors group-hover:bg-cyan group-hover:text-black">
              <ArrowUpRight className="size-4" />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
