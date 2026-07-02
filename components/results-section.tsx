"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"

// Real service-business websites we've designed and developed.
const projects: { title: string; url: string; description: string; image: string }[] = [
  { title: "Power Design Electrical", url: "https://www.powerdesignelectricalltd.com/", description: "Lead-gen site for licensed electrical contractors", image: "/powerdesign-port.png" },
  { title: "Prestige Paving Solutions", url: "https://www.prestigepavingsolutions.ca/", description: "Local site for asphalt paving & sealcoating", image: "/prestige-port.png" },
  { title: "Watches by Timepiece", url: "https://www.watchesbytimepiece.com/", description: "E-commerce site for a pre-owned luxury watch dealer", image: "/watches-port.png" },
  { title: "Apache Interactive", url: "https://apache-interactive.com/", description: "Website for a mobile app & software studio", image: "/apache-port.png" },
]

export function ResultsSection() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    // Small tolerance absorbs scroll-snap's sub-pixel resting offset.
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
      className="relative overflow-hidden bg-transparent py-24 md:py-32"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,rgba(20,228,254,0.16),transparent_70%)] blur-[120px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-[45vh] w-[45vh] rounded-full bg-[radial-gradient(circle,rgba(20,228,254,0.10),transparent_70%)] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-3xl text-left">
          <h2 className="text-display text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.05] text-near-white">
            Our <span className="text-cyan-gradient">Success</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Measurable outcomes from client ad campaigns and the websites
            we&rsquo;ve built — the revenue, traffic, and conversions service
            businesses achieve when they partner with us.
          </p>
        </Reveal>

        {/* Websites we've built — horizontal carousel driven by side arrows */}
        <div className="relative mt-10">
          <StaggerGroup
            ref={scrollerRef}
            onScroll={updateEdges}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
          {projects.map((project, i) => (
            <StaggerItem
              key={project.url}
              className="w-[300px] shrink-0 snap-start sm:w-[340px]"
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block h-full overflow-hidden rounded-2xl border border-line bg-surface-1 transition-colors hover:border-line-strong"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} — website designed and developed by Mako Marketing`}
                    fill
                    sizes="340px"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <span className="absolute left-4 top-4 text-display text-sm text-cyan">
                    0{i + 1}
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4 p-5">
                  <div>
                    <h4 className="text-display text-lg text-near-white md:text-xl">
                      {project.title}
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line-strong text-cyan transition-colors group-hover:bg-cyan group-hover:text-black">
                    <ArrowUpRight className="size-4.5" />
                  </span>
                </div>
              </a>
            </StaggerItem>
          ))}
          </StaggerGroup>

          {/* Prev / next arrows flanking the portfolio block */}
          <button
            type="button"
            aria-label="Previous projects"
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
            className="absolute left-0 top-[34%] z-20 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-surface-1/80 text-cyan backdrop-blur-sm transition-all hover:bg-cyan hover:text-black disabled:pointer-events-none disabled:opacity-0"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next projects"
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
            className="absolute right-0 top-[34%] z-20 flex size-11 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-surface-1/80 text-cyan backdrop-blur-sm transition-all hover:bg-cyan hover:text-black disabled:pointer-events-none disabled:opacity-0"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
