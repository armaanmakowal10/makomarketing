"use client"

import { Quote } from "lucide-react"
import { Reveal } from "@/components/reveal"

// ──────────────────────────────────────────────────────────────────────────
// TODO: Replace each placeholder below with a REAL client review.
// One-line edit per review — fill in quote / name / role. Do not invent these.
// ──────────────────────────────────────────────────────────────────────────
const testimonials = [
  { quote: "[ Paste real client review #1 here ]", name: "[ Client name ]", role: "[ Company / role ]" },
  { quote: "[ Paste real client review #2 here ]", name: "[ Client name ]", role: "[ Company / role ]" },
  { quote: "[ Paste real client review #3 here ]", name: "[ Client name ]", role: "[ Company / role ]" },
  { quote: "[ Paste real client review #4 here ]", name: "[ Client name ]", role: "[ Company / role ]" },
  { quote: "[ Paste real client review #5 here ]", name: "[ Client name ]", role: "[ Company / role ]" },
  { quote: "[ Paste real client review #6 here ]", name: "[ Client name ]", role: "[ Company / role ]" },
]

const rowA = testimonials.slice(0, 3)
const rowB = testimonials.slice(3)

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-transparent py-24 md:py-32">
      <div className="mx-auto mb-14 max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan">
            Social proof
          </p>
          <h2 className="text-display mt-4 max-w-3xl text-[clamp(2rem,5vw,3.6rem)] text-near-white">
            What our clients <span className="text-cyan-gradient">say</span>
          </h2>
        </Reveal>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent md:w-40" />

        <div className="group flex flex-col gap-5">
          <div className="marquee flex w-max gap-5 pr-5 group-hover:[animation-play-state:paused]">
            {[...rowA, ...rowA].map((t, i) => (
              <Card key={`a-${i}`} {...t} />
            ))}
          </div>
          <div className="marquee-slow flex w-max gap-5 pr-5 [animation-direction:reverse] group-hover:[animation-play-state:paused]">
            {[...rowB, ...rowB].map((t, i) => (
              <Card key={`b-${i}`} {...t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Card({
  quote,
  name,
  role,
}: {
  quote: string
  name: string
  role: string
}) {
  return (
    <figure className="flex w-[88vw] shrink-0 flex-col justify-between rounded-2xl border border-line bg-surface-1/60 p-7 transition-shadow hover:shadow-[0_0_30px_rgba(20,228,254,0.18)] sm:w-[420px]">
      <Quote className="size-7 text-cyan" />
      <blockquote className="mt-5 text-base leading-relaxed text-near-white/90">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6">
        <div className="text-sm font-semibold text-near-white">{name}</div>
        <div className="text-sm text-muted-foreground">{role}</div>
      </figcaption>
    </figure>
  )
}
