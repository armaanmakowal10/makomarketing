"use client"

import { ArrowUpRight, Check, Mail, Phone } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { Magnetic } from "@/components/magnetic"
import { SplitHeading } from "@/components/split-heading"
import { InquiryForm } from "@/components/inquiry-form"

const PHONE_DISPLAY = "905-260-5457"
const PHONE_TEL = "tel:9052605457"
const EMAIL = "makomarketing0@gmail.com"

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-transparent py-24 md:py-32"
    >
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[50vh] w-[80vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(20,228,254,0.18),transparent_70%)] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-16">
          {/* Left: pitch + contact methods */}
          <div>
            <Reveal className="text-left">
          <p className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-cyan">
            Let&rsquo;s Talk
            <span className="h-px w-8 bg-gradient-to-r from-cyan/60 to-transparent" />
          </p>

          <h2 className="text-display mt-4 text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.05] text-near-white">
            <SplitHeading
              text={"Let's Grow Your\nBusiness."}
              accent={["Business."]}
            />
          </h2>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            A free audit, a custom growth plan, and real results — no contracts,
            no fluff.
          </p>

          {/* Scannable benefit chips */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            {["Free audit", "1-day reply", "No contracts"].map((c) => (
              <span
                key={c}
                className="flex items-center gap-1.5 rounded-full border border-cyan/30 bg-cyan/[0.06] px-3.5 py-1.5 text-sm text-near-white/85"
              >
                <Check className="size-3.5 text-cyan" />
                {c}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Magnetic strength={0.3}>
              <a href="/free-audit" className="btn-cyan h-14 px-9 text-base">
                Request your free audit <ArrowUpRight className="size-5" />
              </a>
            </Magnetic>
            <a
              href={PHONE_TEL}
              className="group inline-flex items-center gap-2 text-sm font-medium text-near-white transition-colors hover:text-cyan"
            >
              <Phone className="size-4 text-cyan" />
              or call {PHONE_DISPLAY}
            </a>
          </div>
            </Reveal>

            <Reveal className="mt-10">
              <div className="flex flex-col gap-4">
            <Magnetic strength={0.2}>
              <a
                href={PHONE_TEL}
                className="group flex items-center gap-4 rounded-2xl border border-line bg-surface-1/60 p-5 transition-colors hover:border-line-strong"
              >
                <span className="flex size-12 items-center justify-center rounded-xl border border-line-strong bg-cyan/5 text-cyan transition-all group-hover:bg-cyan group-hover:text-black">
                  <Phone className="size-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-muted-foreground">
                    Call us
                  </span>
                  <span className="text-display text-xl text-near-white">
                    {PHONE_DISPLAY}
                  </span>
                </span>
              </a>
            </Magnetic>
            <a
              href={`mailto:${EMAIL}`}
              className="group flex items-center gap-4 rounded-2xl border border-line bg-surface-1/60 p-5 transition-colors hover:border-line-strong"
            >
              <span className="flex size-12 items-center justify-center rounded-xl border border-line-strong bg-cyan/5 text-cyan transition-all group-hover:bg-cyan group-hover:text-black">
                <Mail className="size-5" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-widest text-muted-foreground">
                  Email us
                </span>
                <span className="text-lg text-near-white">{EMAIL}</span>
              </span>
            </a>
          </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={0.1} className="h-full">
            <div className="flex h-full flex-col rounded-3xl border border-line bg-surface-1/70 p-6 backdrop-blur-sm md:p-9">
              <InquiryForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

