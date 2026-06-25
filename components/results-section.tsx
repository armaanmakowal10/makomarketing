"use client"

import Image from "next/image"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal"
import { ArrowUpRight } from "lucide-react"

// Real service-business websites we've designed and developed.
const projects: { title: string; url: string; description: string; image: string }[] = [
  { title: "Power Design Electrical", url: "https://www.powerdesignelectricalltd.com/", description: "Lead-gen site for licensed electrical contractors", image: "/powerdesign-port.png" },
  { title: "Prestige Paving Solutions", url: "https://www.prestigepavingsolutions.ca/", description: "Local site for asphalt paving & sealcoating", image: "/prestige-port.png" },
  { title: "Watches by Timepiece", url: "https://www.watchesbytimepiece.com/", description: "E-commerce site for a pre-owned luxury watch dealer", image: "/watches-port.png" },
  { title: "Apache Interactive", url: "https://apache-interactive.com/", description: "Website for a mobile app & software studio", image: "/apache-port.png" },
]

export function ResultsSection() {
  return (
    <section
      id="results"
      className="relative overflow-hidden bg-transparent py-24 md:py-32"
    >
      {/* Cyan divider line marking the boundary between the hero and this section */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-cyan/20 via-cyan to-cyan/20 shadow-[0_0_22px_3px_rgba(20,228,254,0.6)]" />

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

        {/* Websites we've built — horizontal scroll carousel to save vertical space */}
        <StaggerGroup className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
          {projects.map((project, i) => (
            <StaggerItem key={project.url} className="w-[300px] shrink-0 snap-start sm:w-[340px]">
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
      </div>
    </section>
  )
}
