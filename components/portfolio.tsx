"use client"

import Image from "next/image"
import { useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
import { ExternalLink } from "lucide-react"

const projects = [
  {
    title: "Watches by Timepiece",
    url: "https://www.watchesbytimepiece.com/",
    description: "Pre-owned luxury watch specialists",
    image: "/watches-port.png",
    size: "large",
  },
  {
    title: "Shauna Moroney Art",
    url: "https://www.shaunamoroneyart.com/",
    description: "Live wedding painting & murals",
    image: "/art-port.png",
    size: "medium",
  },
  {
    title: "KC Music Co",
    url: "http://kcmusicnetwork.com/",
    description: "Music branding & web design",
    image: "/music-port.png",
    size: "medium",
  },
  {
    title: "Apache Interactive",
    url: "https://apache-interactive.com/",
    description: "Mobile apps & business software",
    image: "/apache-port.png",
    size: "wide",
  },
]

export function Portfolio() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref)

  return (
    <section id="portfolio" className="relative overflow-hidden bg-background">
      {/* Blue gradient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[5%] top-[15%] h-[50%] w-[35%] rounded-full opacity-25 blur-[120px]"
          style={{
            background:
              "radial-gradient(ellipse at center, #0066ff 0%, #0033aa 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute right-[10%] top-[10%] h-[45%] w-[30%] rounded-full opacity-20 blur-[100px]"
          style={{
            background:
              "radial-gradient(ellipse at center, #38bdf8 0%, #0ea5e9 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[10%] left-[30%] h-[40%] w-[40%] rounded-full opacity-20 blur-[110px]"
          style={{
            background:
              "radial-gradient(ellipse at center, #1d4ed8 0%, #1e3a8a 40%, transparent 70%)",
          }}
        />
      </div>

      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-7xl px-6 py-16 transition-all duration-700 md:px-8 md:py-24 ${
          isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Section heading */}
        <div className="mb-12 md:mb-16">
          <h2 className="title-gradient text-3xl font-bold tracking-tight md:text-4xl">
            Websites & campaigns we’ve built
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            A selection of our recent work across e‑commerce, portfolios, and
            brand experiences.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:gap-4">
          {/* Large: Watches by Timepiece */}
          <a
            href={projects[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden border border-border bg-card transition-colors hover:border-border/80 hover:bg-card/90 sm:col-span-2 lg:row-span-2"
          >
            <div className="relative aspect-[4/3] w-full sm:aspect-auto sm:h-full min-h-[240px]">
              <Image
                src={projects[0].image}
                alt={projects[0].title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-semibold text-white md:text-2xl">
                  {projects[0].title}
                </h3>
                <p className="mt-1 text-sm text-white/80">
                  {projects[0].description}
                </p>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-white">
                  View site
                  <ExternalLink className="size-3.5" />
                </span>
              </div>
            </div>
          </a>

          {/* Medium: Shauna Moroney Art */}
          <a
            href={projects[1].url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden border border-border bg-card transition-colors hover:border-border/80 hover:bg-card/90"
          >
            <div className="relative aspect-[4/3] w-full min-h-[200px]">
              <Image
                src={projects[1].image}
                alt={projects[1].title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-lg font-semibold text-white">
                  {projects[1].title}
                </h3>
                <p className="mt-1 text-sm text-white/80">
                  {projects[1].description}
                </p>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-white">
                  View site
                  <ExternalLink className="size-3.5" />
                </span>
              </div>
            </div>
          </a>

          {/* Medium: KC Music Co */}
          <a
            href={projects[2].url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden border border-border bg-card transition-colors hover:border-border/80 hover:bg-card/90"
          >
            <div className="relative aspect-[4/3] w-full min-h-[200px]">
              <Image
                src={projects[2].image}
                alt={projects[2].title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-lg font-semibold text-white">
                  {projects[2].title}
                </h3>
                <p className="mt-1 text-sm text-white/80">
                  {projects[2].description}
                </p>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-white">
                  View site
                  <ExternalLink className="size-3.5" />
                </span>
              </div>
            </div>
          </a>

          {/* Wide: Apache Interactive */}
          <a
            href={projects[3].url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden border border-border bg-card transition-colors hover:border-border/80 hover:bg-card/90 sm:col-span-2"
          >
            <div className="relative aspect-[21/9] w-full min-h-[180px]">
              <Image
                src={projects[3].image}
                alt={projects[3].title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-semibold text-white md:text-2xl">
                  {projects[3].title}
                </h3>
                <p className="mt-1 text-sm text-white/80">
                  {projects[3].description}
                </p>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-white">
                  View site
                  <ExternalLink className="size-3.5" />
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
