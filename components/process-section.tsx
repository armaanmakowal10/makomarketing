"use client"

import { useRef } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { Reveal } from "@/components/reveal"

const steps = [
  {
    n: "01",
    title: "Discover",
    body: "We dig into your business, audience, and goals to understand exactly what growth looks like for you — and where the biggest opportunities are.",
  },
  {
    n: "02",
    title: "Strategy",
    body: "We build a data-driven plan across web, paid ads, and SEO. Clear targets, clear channels, clear messaging — no guesswork.",
  },
  {
    n: "03",
    title: "Build & Launch",
    body: "We develop your high-performance platform and launch campaigns engineered to convert traffic into booked, paying customers.",
  },
  {
    n: "04",
    title: "Optimize & Scale",
    body: "We track every metric, refine what's working, and scale your best-performing channels so results compound month over month.",
  },
]

export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 65%"],
  })
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <section
      id="process"
      className="relative overflow-hidden border-t border-line bg-transparent py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {/* Sticky heading */}
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan">
              05 / How We Work
            </p>
            <h2 className="text-display mt-4 text-[clamp(2rem,5vw,3.6rem)] text-near-white">
              A Process Built To{" "}
              <span className="text-cyan-gradient">Compound</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Four deliberate stages that take you from invisible to
              fully-booked — with full transparency at every step.
            </p>
          </Reveal>
        </div>

        {/* Timeline */}
        <div ref={ref} className="relative pl-10 md:pl-14">
          {/* track */}
          <div className="absolute left-[7px] top-2 h-full w-px bg-line md:left-[15px]" />
          {/* progress fill */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-[7px] top-2 h-full w-px origin-top bg-cyan shadow-[0_0_12px_rgba(20,228,254,0.8)] md:left-[15px]"
          />

          <div className="flex flex-col gap-14 md:gap-20">
            {steps.map((step) => (
              <Reveal key={step.n} y={32}>
                <div className="relative">
                  <span className="absolute -left-10 top-1 flex size-4 items-center justify-center rounded-full border border-cyan bg-black md:-left-14">
                    <span className="size-1.5 rounded-full bg-cyan shadow-[0_0_10px_rgba(20,228,254,0.9)]" />
                  </span>
                  <div className="text-display text-sm text-cyan">{step.n}</div>
                  <h3 className="text-display mt-2 text-2xl text-near-white md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
