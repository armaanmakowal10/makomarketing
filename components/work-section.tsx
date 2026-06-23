"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
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
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const [horizontal, setHorizontal] = useState(false)

  useEffect(() => {
    const compute = () => {
      const desktop = window.matchMedia("(min-width: 1024px)").matches
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (!desktop || reduce || !trackRef.current) {
        setHorizontal(false)
        setDistance(0)
        return
      }
      setHorizontal(true)
      setDistance(trackRef.current.scrollWidth - window.innerWidth)
    }
    compute()
    window.addEventListener("resize", compute)
    return () => window.removeEventListener("resize", compute)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])

  return (
    <section
      id="work"
      ref={sectionRef}
      style={horizontal ? { height: `${distance + window.innerHeight}px` } : undefined}
      className="relative border-t border-line bg-transparent"
    >
      <div
        className={
          horizontal
            ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden"
            : "py-24 md:py-32"
        }
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
        </div>

        {horizontal ? (
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="mt-12 flex w-max gap-6 px-[max(1.25rem,calc((100vw-80rem)/2+2rem))]"
          >
            {projects.map((p, i) => (
              <ProjectCard key={p.url} project={p} index={i} horizontal />
            ))}
          </motion.div>
        ) : (
          <div
            ref={trackRef}
            className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:px-8 lg:grid lg:grid-cols-3 lg:overflow-visible"
          >
            {projects.map((p, i) => (
              <ProjectCard key={p.url} project={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  horizontal = false,
}: {
  project: Project
  index: number
  horizontal?: boolean
}) {
  const reduce = useReducedMotion()
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-surface-1 transition-all duration-500 hover:border-line-strong ${
        horizontal
          ? "w-[44vw] xl:w-[40vw]"
          : "w-[82vw] sm:w-[60vw] lg:w-auto"
      }`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {/* Image wipes in via clip-path on scroll */}
        <motion.div
          className="absolute inset-0"
          initial={{
            clipPath: reduce ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
          }}
          whileInView={{ clipPath: "inset(0 0 0 0)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
            delay: (index % 3) * 0.08,
          }}
        >
          <Image
            src={project.image}
            alt={`${project.title} website built by Mako Marketing`}
            fill
            sizes="(max-width: 1024px) 80vw, 42vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        </motion.div>
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(20,228,254,0.22),transparent_60%)]" />
        </div>
        <span className="absolute left-5 top-5 text-display text-sm text-cyan">
          0{index + 1}
        </span>
        {/* Slide-up label on hover */}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-3 justify-start p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan/50 bg-black/50 px-3 py-1 text-xs font-medium text-cyan backdrop-blur-sm">
            {project.description}
          </span>
        </div>
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
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line-strong text-cyan transition-all duration-300 group-hover:bg-cyan group-hover:text-black">
          <ArrowUpRight className="size-5" />
        </span>
      </div>
    </a>
  )
}
