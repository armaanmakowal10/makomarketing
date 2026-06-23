"use client"

import { useRef } from "react"
import Link from "next/link"
import {
  LineChart,
  MapPin,
  Megaphone,
  MonitorSmartphone,
  Search,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal"

type Service = {
  label: string
  headline: string
  description: string
  icon: LucideIcon
  features: string[]
}

const services: Service[] = [
  {
    label: "Google Ads",
    headline: "Get in front of customers the moment they're ready to buy",
    description:
      "Targeted search campaigns that capture high-intent demand and turn it into booked work.",
    icon: Search,
    features: ["Search & Performance Max", "Keyword strategy", "Conversion tracking"],
  },
  {
    label: "Meta Ads",
    headline: "Turn scrolls into booked appointments",
    description:
      "Scroll-stopping Facebook and Instagram creative that warms cold audiences into leads.",
    icon: Megaphone,
    features: ["Creative production", "Audience targeting", "Retargeting funnels"],
  },
  {
    label: "Local Service Ads",
    headline: "Own the top of local search and get called first",
    description:
      "Appear above everyone else and capture ready-to-book leads in your service area.",
    icon: MapPin,
    features: ["Google Guaranteed", "Lead management", "Local SEO synergy"],
  },
  {
    label: "Web Development",
    headline: "A fast site that turns visitors into customers",
    description:
      "Conversion-first, search-optimized websites that load instantly and book the job.",
    icon: MonitorSmartphone,
    features: ["Conversion-first design", "Core Web Vitals", "CMS & integrations"],
  },
  {
    label: "Google SEO",
    headline: "Climb the rankings and win traffic that compounds",
    description:
      "Data-driven organic strategies that grow your visibility month after month.",
    icon: LineChart,
    features: ["Technical SEO", "Content strategy", "Authority building"],
  },
]

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative border-t border-line bg-transparent py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan">
            What we do
          </p>
          <h2 className="text-display mt-4 max-w-4xl text-[clamp(2rem,5vw,3.6rem)] text-near-white">
            Everything you need to get found and{" "}
            <span className="text-cyan-gradient">get booked</span>
          </h2>
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.label} className="h-full">
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}

function ServiceCard({ service }: { service: Service }) {
  const ref = useRef<HTMLDivElement>(null)
  const Icon = service.icon

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--mx", `${e.clientX - r.left}px`)
    el.style.setProperty("--my", `${e.clientY - r.top}px`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface-1/50 p-7 transition-colors duration-500 hover:border-cyan/50 md:p-8"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(360px circle at var(--mx) var(--my), rgba(20,228,254,0.12), transparent 60%)",
        }}
      />
      <span className="relative flex size-12 items-center justify-center rounded-xl border border-line-strong bg-cyan/5 text-cyan transition-colors group-hover:bg-cyan group-hover:text-black">
        <Icon className="size-6" />
      </span>
      <p className="relative mt-6 text-xs uppercase tracking-[0.2em] text-cyan/80">
        {service.label}
      </p>
      <h3 className="text-display relative mt-2 text-xl leading-snug text-near-white md:text-2xl">
        {service.headline}
      </h3>
      <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>
      <ul className="relative mt-5 flex flex-col gap-2.5">
        {service.features.map((f) => (
          <li
            key={f}
            className="flex items-center gap-3 text-sm text-near-white/80"
          >
            <span className="size-1.5 rounded-full bg-cyan" />
            {f}
          </li>
        ))}
      </ul>
      <Link
        href="/#contact"
        className="group/cta relative mt-auto inline-flex w-fit items-center gap-2 pt-7 text-sm font-medium text-near-white transition-colors hover:text-cyan"
      >
        Get a free proposal
        <span className="flex size-8 items-center justify-center rounded-full border border-line-strong text-cyan transition-colors group-hover/cta:bg-cyan group-hover/cta:text-black">
          <ArrowUpRight className="size-4" />
        </span>
      </Link>
    </div>
  )
}
