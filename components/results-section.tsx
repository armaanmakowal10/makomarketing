"use client"

import Image from "next/image"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { AnimatedCounter } from "@/components/animated-counter"
import {
  TrendingDown,
  Target,
  Search,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react"

// Real service-business websites we've designed and developed.
const projects: { title: string; url: string; description: string; image: string }[] = [
  { title: "Watches by Timepiece", url: "https://www.watchesbytimepiece.com/", description: "E-commerce site for a pre-owned luxury watch dealer", image: "/watches-port.png" },
  { title: "Shauna Moroney Art", url: "https://www.shaunamoroneyart.com/", description: "Portfolio & booking site for a live wedding painter", image: "/art-port.png" },
  { title: "KC Music Co", url: "http://kcmusicnetwork.com/", description: "Branding & web design for a music network", image: "/music-port.png" },
  { title: "Apache Interactive", url: "https://apache-interactive.com/", description: "Website for a mobile app & software studio", image: "/apache-port.png" },
  { title: "Power Design Electrical", url: "https://www.powerdesignelectricalltd.com/", description: "Lead-gen site for licensed electrical contractors", image: "/powerdesign-port.png" },
  { title: "Prestige Paving Solutions", url: "https://www.prestigepavingsolutions.ca/", description: "Local site for asphalt paving & sealcoating", image: "/prestige-port.png" },
]

// Real client results from live ad & SEO campaigns.
const cases: {
  metric: string
  label: string
  detail: string
  icon: LucideIcon
}[] = [
  {
    metric: "18-26x",
    label: "Return on ad spend",
    detail: "Home-services client · Google Ads + Local Service Ads",
    icon: Target,
  },
  {
    metric: "+187%",
    label: "More organic traffic",
    detail: "Contractor client · 6-month Google SEO program",
    icon: Search,
  },
  {
    metric: "62%",
    label: "Lower cost per lead",
    detail: "Local service client · Meta Ads creative overhaul",
    icon: TrendingDown,
  },
]

export function ResultsSection() {
  return (
    <section
      id="results"
      className="relative overflow-hidden border-t-[3px] border-white/80 bg-transparent py-24 md:py-32"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,rgba(20,228,254,0.16),transparent_70%)] blur-[120px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-[45vh] w-[45vh] rounded-full bg-[radial-gradient(circle,rgba(20,228,254,0.10),transparent_70%)] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow="The Mako Effect">
          Marketing That{" "}
          <span className="text-cyan-gradient">Pays For Itself</span>
        </SectionHeading>

        {/* Client ad campaign results */}
        <Reveal className="mt-16 text-center">
          <h3 className="text-display text-2xl text-near-white md:text-3xl">
            Client ad campaign results
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Real performance from Google Ads, Meta Ads, Local Service Ads, and
            SEO campaigns we manage for service-business clients.
          </p>
        </Reveal>

        <StaggerGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {cases.map((c) => {
            const Icon = c.icon
            return (
              <StaggerItem key={c.label}>
                <div className="group relative flex h-full flex-col items-center gap-3 overflow-hidden rounded-2xl border border-line bg-surface-1/60 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-line-strong">
                  <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-cyan/0 via-cyan to-cyan/0 transition-transform duration-500 group-hover:scale-x-100" />
                  <span className="flex size-12 items-center justify-center rounded-xl border border-line-strong bg-cyan/5 text-cyan transition-colors group-hover:bg-cyan group-hover:text-black">
                    <Icon className="size-6" />
                  </span>
                  <span className="text-display text-[clamp(2.4rem,6vw,3.4rem)] leading-none text-cyan-gradient">
                    <AnimatedCounter value={c.metric} />
                  </span>
                  <p className="text-sm font-medium text-near-white">{c.label}</p>
                  <p className="text-xs text-near-white/45">{c.detail}</p>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
        <p className="mt-4 text-center text-xs text-near-white/30">
          Representative results from recent client campaigns.
        </p>

        {/* Websites we've built */}
        <SectionHeading
          eyebrow="Websites we've built"
          className="mt-24"
          sub="Fast, conversion-focused sites built to rank on Google and turn visitors into customers."
        >
          Real, revenue-ready sites{" "}
          <span className="text-cyan-gradient">for real businesses</span>
        </SectionHeading>

        <StaggerGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <StaggerItem key={project.url}>
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
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
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
      </div>
    </section>
  )
}
