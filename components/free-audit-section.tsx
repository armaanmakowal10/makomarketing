"use client"

import { Check, Phone, Mail } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { CalendlyEmbed } from "@/components/calendly-embed"

const PHONE_DISPLAY = "905-260-5457"
const PHONE_TEL = "tel:9052605457"
const EMAIL = "makomarketing0@gmail.com"

const perks = [
  "A no-cost teardown of your website, Google Ads, Meta Ads, and SEO",
  "Exactly where you're leaking leads — and how to plug it fast",
  "A clear, custom plan to turn more traffic into booked customers",
  "Zero pressure, zero obligation",
]

export function FreeAuditSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[50vh] w-[85vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(20,228,254,0.16),transparent_70%)] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Free Audit"
          sub="Book a free, no-pressure call and we'll show you exactly how to turn more of your traffic into booked, paying customers."
        >
          Get Your Free{" "}
          <span className="text-cyan-gradient">Marketing Audit</span>
        </SectionHeading>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-14">
          {/* What you get + contact */}
          <Reveal>
            <h3 className="text-display text-xl text-near-white md:text-2xl">
              Here&rsquo;s what you&rsquo;ll get
            </h3>
            <ul className="mt-6 flex flex-col gap-4">
              {perks.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-3 text-sm leading-relaxed text-near-white/85 md:text-base"
                >
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-cyan/15 text-cyan">
                    <Check className="size-3.5" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3">
              <a
                href={PHONE_TEL}
                className="group flex items-center gap-4 rounded-2xl border border-line bg-surface-1/60 p-4 transition-colors hover:border-line-strong"
              >
                <span className="flex size-11 items-center justify-center rounded-xl border border-line-strong bg-cyan/5 text-cyan transition-all group-hover:bg-cyan group-hover:text-black">
                  <Phone className="size-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-muted-foreground">
                    Prefer to call?
                  </span>
                  <span className="text-display text-lg text-near-white">
                    {PHONE_DISPLAY}
                  </span>
                </span>
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="group flex items-center gap-4 rounded-2xl border border-line bg-surface-1/60 p-4 transition-colors hover:border-line-strong"
              >
                <span className="flex size-11 items-center justify-center rounded-xl border border-line-strong bg-cyan/5 text-cyan transition-all group-hover:bg-cyan group-hover:text-black">
                  <Mail className="size-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-muted-foreground">
                    Or email us
                  </span>
                  <span className="text-near-white">{EMAIL}</span>
                </span>
              </a>
            </div>
          </Reveal>

          {/* Calendly booking */}
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-line bg-surface-1/60 p-2 backdrop-blur-sm">
              <CalendlyEmbed />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
