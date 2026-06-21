"use client"

import { Quote } from "lucide-react"
import { Reveal } from "@/components/reveal"

const testimonials = [
  {
    quote:
      "Mako Marketing transformed our online presence. We went from invisible to fully booked in under two months.",
    name: "Walker",
    role: "Business Consultant",
  },
  {
    quote:
      "Their SEO strategy doubled our organic traffic. The team truly understands what drives results.",
    name: "Maya Torres",
    role: "Digital Strategist",
  },
  {
    quote:
      "Our new site looks incredible and loads fast. Sign-ups increased by 60% in the first month.",
    name: "Samuel Reed",
    role: "Fitness Studio Owner",
  },
  {
    quote:
      "Professional, responsive, and incredibly talented. My listings page finally converts visitors into leads.",
    name: "Aria Kim",
    role: "Real Estate Advisor",
  },
  {
    quote:
      "Working with Mako was seamless from start to finish. They delivered beyond our expectations.",
    name: "Jason Patel",
    role: "Marketing Director",
  },
  {
    quote:
      "The website they built for my practice is beautiful and brings in new clients every week.",
    name: "Chloe Ramirez",
    role: "Wellness Coach",
  },
]

const rowA = testimonials.slice(0, 3)
const rowB = testimonials.slice(3)

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-transparent py-24 md:py-32">
      <div className="mx-auto mb-14 max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan">
            06 / Social Proof
          </p>
          <h2 className="text-display mt-4 max-w-3xl text-[clamp(2rem,5vw,3.6rem)] text-near-white">
            What Our Clients{" "}
            <span className="text-cyan-gradient">Say</span>
          </h2>
        </Reveal>
      </div>

      {/* edge fade */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent md:w-40" />

        <div className="group flex flex-col gap-5">
          <div className="marquee flex w-max gap-5 group-hover:[animation-play-state:paused]">
            {[...rowA, ...rowA, ...rowA].map((t, i) => (
              <Card key={`a-${i}`} {...t} />
            ))}
          </div>
          <div className="marquee-slow flex w-max gap-5 [animation-direction:reverse] group-hover:[animation-play-state:paused]">
            {[...rowB, ...rowB, ...rowB].map((t, i) => (
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
    <figure className="flex w-[88vw] shrink-0 flex-col justify-between rounded-2xl border border-line bg-surface-1/60 p-7 transition-colors hover:border-line-strong sm:w-[420px]">
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
