"use client"

import Link from "next/link"
import {
  ArrowUpRight,
  Award,
  Users,
  MapPin,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"

const highlights: { icon: LucideIcon; text: string }[] = [
  { icon: Award, text: "8+ years in business" },
  { icon: Users, text: "100+ clients served" },
  { icon: MapPin, text: "Serving all of Canada" },
  { icon: ShieldCheck, text: "No long-term lock-ins" },
]

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t-[3px] border-white/80 bg-transparent py-24 md:py-32"
    >
      <div className="pointer-events-none absolute -right-24 top-1/3 h-[50vh] w-[55vh] rounded-full bg-[radial-gradient(circle,rgba(20,228,254,0.10),transparent_70%)] blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="About us"
          sub="Mako Marketing is a digital marketing agency helping service-based businesses across Ontario and Canada win more customers online — through Google Ads, Meta Ads, SEO, Local Service Ads, and conversion-focused web design."
        >
          We exist to make your{" "}
          <span className="text-cyan-gradient">phone ring</span>
        </SectionHeading>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <div className="flex flex-col gap-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                Too many great businesses lose customers to competitors with
                worse service but better marketing. Mako closes that gap — giving
                owners a digital presence that wins the click, earns the trust,
                and books the job.
              </p>
              <p>
                We pair conversion-first web development with disciplined paid
                media and SEO, managed by people who watch the numbers daily. No
                long lock-ins, no smoke and mirrors — just a focused team obsessed
                with the results that move your business forward.
              </p>
              <Link
                href="/about-us"
                className="group mt-2 inline-flex w-fit items-center gap-2 text-sm font-medium text-near-white transition-colors hover:text-cyan"
              >
                More about us
                <span className="flex size-8 items-center justify-center rounded-full border border-line-strong text-cyan transition-colors group-hover:bg-cyan group-hover:text-black">
                  <ArrowUpRight className="size-4" />
                </span>
              </Link>
            </div>
          </Reveal>

          {/* Credentials panel — distinct 2x2 stat tiles */}
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((h) => {
                const Icon = h.icon
                return (
                  <div
                    key={h.text}
                    className="group flex flex-col gap-4 rounded-2xl border border-line bg-gradient-to-br from-surface-1/70 to-surface-1/20 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40"
                  >
                    <span className="flex size-11 items-center justify-center rounded-xl border border-line-strong bg-cyan/5 text-cyan transition-colors group-hover:bg-cyan group-hover:text-black">
                      <Icon className="size-5" />
                    </span>
                    <span className="text-display text-base leading-snug text-near-white">
                      {h.text}
                    </span>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
