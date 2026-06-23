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
          {industries.map((ind) => {
            const Icon = ind.icon
            return (
              <StaggerItem key={ind.label}>
                <div className="group flex h-full flex-col items-start gap-5 rounded-2xl border border-line bg-surface-1/40 p-6 transition-colors hover:border-line-strong md:p-7">
                  <span className="flex size-12 items-center justify-center rounded-xl border border-line-strong bg-cyan/5 text-cyan transition-colors group-hover:bg-cyan group-hover:text-black">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="text-display text-lg text-near-white md:text-xl">
                    {ind.label}
                  </h3>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
