"use client"

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
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan">
            Who we serve
          </p>
          <h2 className="text-display mt-4 max-w-4xl text-[clamp(2rem,5vw,3.6rem)] text-near-white">
            Built for service-based{" "}
            <span className="text-cyan-gradient">businesses</span>
          </h2>
        </Reveal>

        <StaggerGroup className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {industries.map((ind) => {
            const Icon = ind.icon
            return (
              <StaggerItem key={ind.label}>
                <div className="group flex items-center gap-4 rounded-xl border border-line bg-surface-1/40 p-5 transition-colors hover:border-line-strong">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-cyan/5 text-cyan transition-colors group-hover:bg-cyan group-hover:text-black">
                    <Icon className="size-5" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-medium text-near-white md:text-base">
                      {ind.label}
                    </span>
                    <span className="mt-1 h-px w-full origin-left scale-x-0 bg-cyan transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
