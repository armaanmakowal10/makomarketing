"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal"
import { CountUp, ProjectCard, projects } from "@/components/success-cards"

// Home-page teaser: the websites carousel plus a route into the full
// /our-success page, where the live campaign dashboards live.
export function ResultsSection() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 16)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 16)
  }, [])

  useEffect(() => {
    updateEdges()
    window.addEventListener("resize", updateEdges)
    return () => window.removeEventListener("resize", updateEdges)
  }, [updateEdges])

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    const card = el.firstElementChild as HTMLElement | null
    const amount = card ? card.offsetWidth + 20 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * amount, behavior: "smooth" })
  }

  return (
    <section
      id="results"
      className="relative overflow-hidden bg-transparent pb-28 pt-36 md:pb-36 md:pt-48"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,rgba(20,228,254,0.16),transparent_70%)] blur-[120px]" />
      <div className="pointer-events-none absolute -left-20 bottom-1/3 h-[45vh] w-[45vh] rounded-full bg-[radial-gradient(circle,rgba(20,228,254,0.10),transparent_70%)] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        {/* Heading — centered */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-display text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.05] text-near-white">
            Our <span className="text-cyan-gradient">Success</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Some of the websites we&rsquo;ve designed and built for our clients.
          </p>
        </Reveal>

        {/* ── Websites we've built (carousel, side arrows) ────────────────── */}
        <div className="relative mt-12">
          {/* Desktop arrows — floating over the left/right edges, centered */}
          <button
            type="button"
            aria-label="Previous projects"
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
            className="absolute -left-2 top-1/2 z-20 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-surface-1/80 text-cyan shadow-[0_0_30px_-8px_rgba(20,228,254,0.45)] backdrop-blur-sm transition-all hover:bg-cyan hover:text-black disabled:pointer-events-none disabled:opacity-30 sm:flex md:-left-4"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next projects"
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
            className="absolute -right-2 top-1/2 z-20 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-surface-1/80 text-cyan shadow-[0_0_30px_-8px_rgba(20,228,254,0.45)] backdrop-blur-sm transition-all hover:bg-cyan hover:text-black disabled:pointer-events-none disabled:opacity-30 sm:flex md:-right-4"
          >
            <ChevronRight className="size-5" />
          </button>

          <StaggerGroup
            ref={scrollerRef}
            onScroll={updateEdges}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {projects.map((project, i) => (
              <StaggerItem key={project.url} className="shrink-0">
                <ProjectCard project={project} index={i} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        {/* ── Route into the full success page — tease the campaigns ──────── */}
        <Reveal className="mt-16">
          <div className="relative flex flex-col items-center gap-9 text-center">
            <h3 className="text-display mx-auto max-w-2xl text-2xl leading-tight text-near-white md:text-[2.1rem]">
              Check out our{" "}
              <span className="text-cyan-gradient">live client ad dashboards.</span>
            </h3>

            {/* Average campaign results — same tiles as the success page */}
            <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                {
                  value: <CountUp to={250} suffix="+" />,
                  label: "Avg. leads per campaign",
                },
                {
                  value: <CountUp to={2.9} prefix="CA$" decimals={2} duration={1.8} />,
                  label: "Avg. cost per lead",
                },
                {
                  value: <CountUp to={47} suffix="%" />,
                  label: "Avg. conversion rate",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="group relative overflow-hidden rounded-2xl border border-line bg-black/40 p-5 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-[0_0_45px_-14px_rgba(20,228,254,0.55)]"
                >
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-cyan to-transparent transition-transform duration-700 group-hover:scale-x-100" />
                  <span className="text-display block text-3xl leading-none text-cyan-gradient">
                    {s.value}
                  </span>
                  <span className="mt-2.5 block text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <motion.div whileHover={{ y: -2 }} className="inline-block">
              <Link
                href="/our-success"
                className="btn-cyan h-13 px-10 text-sm uppercase tracking-[0.12em] md:h-14 md:text-base"
              >
                See Every Result
                <ArrowRight className="size-5" />
              </Link>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
