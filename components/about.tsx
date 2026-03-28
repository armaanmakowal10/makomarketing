"use client"

import { useRef } from "react"
import { useInView } from "@/hooks/use-in-view"

const stats = [
  { value: "100+", label: "Satisfied Clients" },
  { value: "24/7", label: "Visibility" },
  { value: "150%", label: "Avg Lead Increase" },
  { value: "8+", label: "Years Experience" },
]

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref)

  return (
    <section id="about" className="bg-background">
      <div
        ref={ref}
        className={`mx-auto max-w-7xl transition-all duration-700 ${
          isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Stats row */}
        <div className="grid grid-cols-2 border-t border-border md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`border-b border-border px-8 py-10 md:px-10 md:py-12 ${
                i < 3 ? "md:border-r" : ""
              } ${i % 2 === 0 ? "border-r md:border-r" : ""} ${
                i < 2 ? "" : "md:border-r"
              }`}
              style={{
                borderRightWidth:
                  i === 1 ? undefined : i === 3 ? "0px" : undefined,
              }}
            >
              <div className="title-gradient text-3xl font-bold tracking-tight md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="grid grid-cols-1 border-b border-border md:grid-cols-2">
          <div className="border-b border-border px-10 py-14 md:border-b-0 md:border-r md:px-12 md:py-16">
            <h2 className="title-gradient text-3xl font-bold tracking-tight md:text-4xl md:leading-[1.15]">
              Empowering businesses with scalable digital foundations.
            </h2>
          </div>
          <div className="px-10 py-14 md:px-12 md:py-16">
            <p className="text-sm leading-relaxed text-muted-foreground">
              We help service-based businesses establish credibility, attract
              organic traffic, and convert visitors into paying customers. Our
              approach combines performance-driven web development with
              strategic SEO to build a digital presence that works around the
              clock — giving you 24/7 visibility and a competitive edge in your
              market.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
