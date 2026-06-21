"use client"

import { useRef } from "react"
import {
  Wrench,
  HeartPulse,
  Home,
  Scale,
  Car,
  Scissors,
  Dumbbell,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal"

type Industry = { label: string; icon: LucideIcon }

const industries: Industry[] = [
  { label: "Home Services", icon: Home },
  { label: "Trades & Contractors", icon: Wrench },
  { label: "Health & Wellness", icon: HeartPulse },
  { label: "Real Estate", icon: Scale },
  { label: "Automotive", icon: Car },
  { label: "Beauty & Salons", icon: Scissors },
  { label: "Fitness & Studios", icon: Dumbbell },
  { label: "Restaurants & Local", icon: UtensilsCrossed },
]

export function IndustriesSection() {
  return (
    <section
      id="industries"
      className="relative overflow-hidden border-t border-line bg-transparent py-24 md:py-32"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan">
            02 / Who We Serve
          </p>
          <h2 className="text-display mt-4 max-w-4xl text-[clamp(2rem,5vw,3.6rem)] text-near-white">
            Built For Service-Based{" "}
            <span className="text-cyan-gradient">Businesses</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            We specialize in the industries where speed, trust, and local
            visibility win the customer — and we know exactly how to make your
            phone ring.
          </p>
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {industries.map((ind) => (
            <StaggerItem key={ind.label}>
              <IndustryCard industry={ind} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}

function IndustryCard({ industry }: { industry: Industry }) {
  const ref = useRef<HTMLDivElement>(null)
  const Icon = industry.icon

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
      className="group relative flex h-full flex-col items-start gap-5 overflow-hidden rounded-2xl border border-line bg-surface-1/40 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-line-strong md:p-7"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(300px circle at var(--mx) var(--my), rgba(20,228,254,0.12), transparent 65%)",
        }}
      />
      <span className="relative flex size-12 items-center justify-center rounded-xl border border-line-strong bg-cyan/5 text-cyan transition-all duration-500 group-hover:bg-cyan group-hover:text-black group-hover:shadow-[0_0_24px_rgba(20,228,254,0.5)]">
        <Icon className="size-6" />
      </span>
      <h3 className="relative text-display text-lg text-near-white md:text-xl">
        {industry.label}
      </h3>
    </div>
  )
}
