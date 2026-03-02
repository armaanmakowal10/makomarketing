"use client"

import { useRef } from "react"
import { useInView } from "@/hooks/use-in-view"

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

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref)

  return (
    <section className="bg-background">
      <div
        ref={ref}
        className={`mx-auto max-w-7xl transition-all duration-700 ${
          isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Section heading */}
        <div className="border-t border-border px-10 py-16 text-center md:px-12 md:py-20">
          <h2 className="title-gradient text-3xl font-bold tracking-tight md:text-4xl">
            What our clients say.
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`border-t border-border px-10 py-14 md:px-12 md:py-16 ${
                i % 3 !== 2 ? "md:border-r" : ""
              }`}
            >
              <p className="text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6">
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
