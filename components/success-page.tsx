"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { lenisRef } from "@/lib/scroll-state"
import { ArrowUpRight } from "lucide-react"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal"
import { UrgencyPill } from "@/components/urgency-pill"
import {
  CountUp,
  FeatureDashboard,
  WideDashboard,
  ProjectCard,
  metaDashboard,
  paintingDashboard,
  googleAdsDashboards,
  projects,
} from "@/components/success-cards"

// Headline numbers — averages across all the campaigns we've run.
const heroStats: { value: React.ReactNode; label: string }[] = [
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
]

export function SuccessPage() {
  // Land at the top of the page on navigation. Runs once on mount; Back/Forward
  // restoration in SmoothScroll re-asserts its own position afterwards, so this
  // never fights the back-restore behaviour.
  useEffect(() => {
    if (window.location.hash) return
    window.scrollTo(0, 0)
    lenisRef.current?.scrollTo(0, { immediate: true, force: true })
  }, [])

  return (
    <section className="relative overflow-hidden bg-transparent px-5 pb-24 pt-32 md:px-8 md:pb-32 md:pt-40">
      {/* Ambient glows to match the rest of the site */}
      <div className="pointer-events-none absolute right-0 top-0 h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,rgba(20,228,254,0.16),transparent_70%)] blur-[120px]" />
      <div className="pointer-events-none absolute -left-20 top-1/3 h-[45vh] w-[45vh] rounded-full bg-[radial-gradient(circle,rgba(20,228,254,0.10),transparent_70%)] blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[50vh] w-[50vh] rounded-full bg-[radial-gradient(circle,rgba(20,228,254,0.09),transparent_70%)] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <h1 className="text-display text-[clamp(2.6rem,7vw,4.8rem)] leading-[1.05] text-near-white">
            Our <span className="text-cyan-gradient">Success</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Here are some of the campaigns we&rsquo;ve run — and some of the
            websites we&rsquo;ve built.
          </p>
        </Reveal>

        {/* ── Headline stat band ───────────────────────────────────────────── */}
        <StaggerGroup className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          {heroStats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-surface-1/50 p-6 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-[0_0_45px_-14px_rgba(20,228,254,0.55)]">
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-cyan to-transparent transition-transform duration-700 group-hover:scale-x-100" />
                <span className="text-display block text-3xl leading-none text-cyan-gradient md:text-4xl">
                  {s.value}
                </span>
                <span className="mt-3 block text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {s.label}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <Reveal className="mt-5 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-near-white/45">
            Average results across all campaigns we&rsquo;ve run
          </p>
        </Reveal>

        {/* ── Live campaign dashboards ─────────────────────────────────────── */}
        <div className="mt-16 md:mt-20">
          <Reveal>
            <FeatureDashboard d={metaDashboard} />
          </Reveal>

          <Reveal className="mt-5">
            <FeatureDashboard d={paintingDashboard} />
          </Reveal>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            {googleAdsDashboards.map((d, i) => (
              <Reveal key={d.key} delay={i * 0.1}>
                <WideDashboard d={d} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── Websites we've built ─────────────────────────────────────────── */}
        <div className="mt-24 md:mt-32">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-display text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.08] text-near-white">
              Built to <span className="text-cyan-gradient">convert</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              Fast, modern sites designed around one job: turning visitors into
              booked work. Click any card to see it live.
            </p>
          </Reveal>

          <StaggerGroup className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <StaggerItem key={project.url}>
                <ProjectCard project={project} index={i} fluid />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        {/* ── Closing CTA ──────────────────────────────────────────────────── */}
        <Reveal className="mx-auto mt-24 max-w-2xl text-center md:mt-32">
          <h2 className="text-display text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.08] text-near-white">
            Your business could be the{" "}
            <span className="text-cyan-gradient">next result</span> on this page.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Get a free audit and we&rsquo;ll show you exactly what a campaign
            like these would look like for your business.
          </p>
          <div className="mt-8">
            <UrgencyPill />
          </div>
          <motion.div whileHover={{ y: -2 }} className="mt-5 inline-block">
            <Link
              href="/free-audit"
              className="btn-cyan h-12 px-9 text-sm uppercase tracking-[0.12em]"
            >
              Get My Free Audit
              <ArrowUpRight className="size-5" />
            </Link>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
