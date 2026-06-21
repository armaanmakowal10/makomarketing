"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  LineChart,
  MapPin,
  Megaphone,
  MonitorSmartphone,
  Search,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react"
import { Reveal } from "@/components/reveal"

type Service = {
  title: string
  description: string
  icon: LucideIcon
  features: string[]
}

const services: Service[] = [
  {
    title: "Google Ads",
    description:
      "Targeted search campaigns that put your business in front of the right customers at the exact moment they're ready to buy.",
    icon: Search,
    features: ["Search & Performance Max", "Keyword strategy", "Conversion tracking"],
  },
  {
    title: "Meta Ads",
    description:
      "Scroll-stopping Facebook and Instagram campaigns engineered to turn cold audiences into booked appointments.",
    icon: Megaphone,
    features: ["Creative production", "Audience targeting", "Retargeting funnels"],
  },
  {
    title: "Local Service Ads",
    description:
      "Appear at the very top of local search and capture high-intent, ready-to-book leads in your service area.",
    icon: MapPin,
    features: ["Google Guaranteed", "Lead management", "Local SEO synergy"],
  },
  {
    title: "Web Development",
    description:
      "Fast, search-optimized websites that load instantly and convert online interest into paying customers.",
    icon: MonitorSmartphone,
    features: ["Conversion-first design", "Core Web Vitals", "CMS & integrations"],
  },
  {
    title: "Google SEO",
    description:
      "Data-driven organic strategies that grow your rankings and drive consistent traffic month after month.",
    icon: LineChart,
    features: ["Technical SEO", "Content strategy", "Authority building"],
  },
]

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  return (
    <section
      id="services"
      className="relative border-t border-line bg-transparent"
    >
      <div className="mx-auto max-w-7xl px-5 pt-24 md:px-8 md:pt-32">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan">
            01 / What We Do
          </p>
          <h2 className="text-display mt-4 max-w-4xl text-[clamp(2rem,5vw,3.6rem)] text-near-white">
            Everything Your Business Needs To{" "}
            <span className="text-cyan-gradient">Grow Online</span>
          </h2>
        </Reveal>
      </div>

      {/* Stacking cards */}
      <div ref={containerRef} className="relative mx-auto max-w-6xl px-5 md:px-8">
        {services.map((service, i) => {
          const targetScale = 1 - (services.length - 1 - i) * 0.04
          const range: [number, number] = [i * (1 / services.length), 1]
          return (
            <StackCard
              key={service.title}
              service={service}
              index={i}
              total={services.length}
              progress={scrollYProgress}
              range={range}
              targetScale={targetScale}
            />
          )
        })}
      </div>
    </section>
  )
}

function StackCard({
  service,
  index,
  total,
  progress,
  range,
  targetScale,
}: {
  service: Service
  index: number
  total: number
  progress: ReturnType<typeof useScroll>["scrollYProgress"]
  range: [number, number]
  targetScale: number
}) {
  const scale = useTransform(progress, range, [1, targetScale])
  const Icon = service.icon

  return (
    <div
      className="sticky flex justify-center"
      style={{ top: `${110 + index * 28}px`, marginBottom: "8vh" }}
    >
      <motion.div
        style={{ scale }}
        className="relative grid w-full origin-top grid-cols-1 gap-8 overflow-hidden rounded-3xl border border-line-strong bg-surface-1 p-8 md:grid-cols-[1.1fr_0.9fr] md:p-12"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(20,228,254,0.18),transparent_70%)] blur-2xl" />

        {/* Left */}
        <div className="relative flex flex-col">
          <div className="flex items-center gap-4">
            <span className="text-display text-sm text-cyan">
              0{index + 1} / 0{total}
            </span>
            <span className="h-px flex-1 bg-line" />
          </div>
          <h3 className="text-display mt-6 text-[clamp(2rem,4vw,3.4rem)] text-near-white">
            {service.title}
          </h3>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            {service.description}
          </p>
          <Link
            href="#contact"
            className="group mt-auto inline-flex w-fit items-center gap-2 pt-8 text-sm font-medium text-near-white transition-colors hover:text-cyan"
          >
            Start a project
            <span className="flex size-9 items-center justify-center rounded-full border border-line-strong text-cyan transition-all group-hover:bg-cyan group-hover:text-black">
              <ArrowUpRight className="size-4" />
            </span>
          </Link>
        </div>

        {/* Right */}
        <div className="relative flex flex-col justify-between gap-8 rounded-2xl border border-line bg-black/30 p-8">
          <span className="flex size-16 items-center justify-center rounded-2xl border border-line-strong bg-cyan/5 text-cyan shadow-[0_0_30px_rgba(20,228,254,0.25)]">
            <Icon className="size-8" />
          </span>
          <ul className="flex flex-col gap-3">
            {service.features.map((f) => (
              <li
                key={f}
                className="flex items-center gap-3 text-sm text-near-white/80"
              >
                <span className="size-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgba(20,228,254,0.8)]" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  )
}
