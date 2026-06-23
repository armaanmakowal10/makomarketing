import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"

type Project = {
  title: string
  url: string
  description: string
  image: string
}

const projects: Project[] = [
  {
    title: "Watches by Timepiece",
    url: "https://www.watchesbytimepiece.com/",
    description: "Pre-owned luxury watch specialists",
    image: "/watches-port.png",
  },
  {
    title: "Shauna Moroney Art",
    url: "https://www.shaunamoroneyart.com/",
    description: "Live wedding painting & murals",
    image: "/art-port.png",
  },
  {
    title: "KC Music Co",
    url: "http://kcmusicnetwork.com/",
    description: "Music branding & web design",
    image: "/music-port.png",
  },
  {
    title: "Apache Interactive",
    url: "https://apache-interactive.com/",
    description: "Mobile apps & business software",
    image: "/apache-port.png",
  },
  {
    title: "Power Design Electrical",
    url: "https://www.powerdesignelectricalltd.com/",
    description: "Licensed electrical contractors",
    image: "/powerdesign-port.png",
  },
  {
    title: "Prestige Paving Solutions",
    url: "https://www.prestigepavingsolutions.ca/",
    description: "Asphalt paving & sealcoating",
    image: "/prestige-port.png",
  },
]

export function WorkSection() {
  return (
    <section
      id="work"
      className="relative border-t border-line bg-transparent py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan">
            04 / Selected Work
          </p>
          <h2 className="text-display mt-4 max-w-3xl text-[clamp(2rem,5vw,3.6rem)] text-near-white">
            Websites & Campaigns{" "}
            <span className="text-cyan-gradient">We&rsquo;ve Built</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <a
              key={project.url}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl border border-line bg-surface-1 transition-colors hover:border-line-strong"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.title} website built by Mako Marketing`}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <span className="absolute left-5 top-5 text-display text-sm text-cyan">
                  0{i + 1}
                </span>
              </div>
              <div className="flex items-end justify-between gap-4 p-6">
                <div>
                  <h3 className="text-display text-xl text-near-white md:text-2xl">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {project.description}
                  </p>
                </div>
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line-strong text-cyan transition-colors group-hover:bg-cyan group-hover:text-black">
                  <ArrowUpRight className="size-5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
