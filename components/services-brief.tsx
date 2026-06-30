"use client"

import { useState } from "react"
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
import { StaggerGroup, StaggerItem } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"

// `logo` points at an official brand asset in /public/logos. When the file
// exists it replaces the fallback icon; otherwise the icon shows. Drop the
// real Google / Meta logos there (from their brand resource centers) to enable.
type Item = {
  label: string
  line: string
  tag: string
  icon: LucideIcon
  logo?: string
}

const items: Item[] = [
  { label: "Google Ads", line: "Capture high-intent searches and convert them into booked appointments.", tag: "High intent", icon: Target, logo: "/logos/google-ads.png" },
  { label: "Meta Ads", line: "Reach new customers on Facebook and Instagram and keep your calendar full.", tag: "Demand gen", icon: Megaphone, logo: "/logos/meta.png" },
  { label: "Google SEO", line: "Earn lasting page-one rankings and compounding organic traffic month over month.", tag: "Compounding", icon: Search, logo: "/logos/google.png" },
  { label: "Google LSAs", line: "Appear at the top of local search with the Google Guaranteed badge.", tag: "Local leads", icon: ShieldCheck, logo: "/logos/google-lsa.png" },
  { label: "Web Design", line: "Fast, conversion-focused websites engineered to turn visitors into customers.", tag: "Conversion", icon: MonitorSmartphone },
  { label: "CRM Development", line: "Custom pipelines that capture every lead and help you close more deals.", tag: "Automation", icon: Database },
  { label: "Client LTV Development", line: "Convert one-time buyers into repeat clients and maximize lifetime value.", tag: "Retention", icon: Repeat },
]

/**
 * Renders the service's brand logo when its file is present, falling back to
 * the Lucide icon until then — the icon stays put unless the logo loads, so a
 * missing file never shows a broken image.
 */
function ServiceMark({
  logo,
  Icon,
  label,
}: {
  logo?: string
  Icon: LucideIcon
  label: string
}) {
  const [failed, setFailed] = useState(false)
  if (logo && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logo}
        alt={`${label} logo`}
        onError={() => setFailed(true)}
        className="size-9 object-contain"
      />
    )
  }
  return <Icon className="size-5.5" />
}

export function ServicesBrief() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-transparent py-24 md:py-32"
    >
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          align="left"
          sub="One team across paid, organic, web, and retention — every channel working together to grow your revenue, not compete for the same budget."
        >
          Our <span className="text-cyan-gradient">Services</span>
        </SectionHeading>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <StaggerItem key={item.label}>
                <Link
                  href="/services"
                  className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-line bg-surface-1/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/50 hover:bg-surface-1/70 hover:shadow-[0_0_40px_-12px_rgba(20,228,254,0.5)]"
                >
                  {/* top accent line lights up on hover */}
                  <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-cyan/0 via-cyan to-cyan/0 transition-transform duration-500 group-hover:scale-x-100" />
                  {/* faint oversized watermark icon */}
                  <Icon className="pointer-events-none absolute -bottom-5 -right-5 size-28 text-cyan/[0.04] transition-colors duration-300 group-hover:text-cyan/[0.08]" />
                  <span
                    className={`relative flex size-12 items-center justify-center overflow-hidden rounded-xl border transition-colors ${
                      item.logo
                        ? "border-white/15 bg-white"
                        : "border-line-strong bg-cyan/5 text-cyan group-hover:bg-cyan group-hover:text-black"
                    }`}
                  >
                    <ServiceMark logo={item.logo} Icon={Icon} label={item.label} />
                  </span>
                  <span className="relative flex min-w-0 flex-col gap-2">
                    <span className="text-display text-lg leading-tight text-near-white">
                      {item.label}
                    </span>
                    <span className="w-fit rounded-full border border-line-strong bg-cyan/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-cyan">
                      {item.tag}
                    </span>
                    <span className="block text-sm leading-relaxed text-muted-foreground">
                      {item.line}
                    </span>
                  </span>
                </Link>
              </StaggerItem>
            )
          })}

          {/* CTA card completes the 4×2 grid */}
          <StaggerItem>
            <Link
              href="/services"
              className="group relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-2xl border border-cyan/40 bg-cyan/[0.06] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan/[0.1] hover:shadow-[0_0_50px_-12px_rgba(20,228,254,0.7)]"
            >
              <span className="text-display text-xl leading-tight text-near-white">
                See Everything We Do
              </span>
              <span className="flex items-center gap-2 text-sm font-medium text-cyan">
                View all services
                <span className="flex size-9 items-center justify-center rounded-full border border-cyan/60 text-cyan transition-colors group-hover:bg-cyan group-hover:text-black">
                  <ArrowUpRight className="size-4" />
                </span>
              </span>
            </Link>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  )
}
