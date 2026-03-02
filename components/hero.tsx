"use client"

import Image from "next/image"
import Link from "next/link"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

const testimonials = [
  {
    quote:
      "Mako Marketing transformed our online presence. We went from invisible to fully booked in under two months.",
    name: "Walker",
    role: "Business Consultant",
  },
  {
    quote:
      "Their SEO strategy doubled our organic traffic. The team truly understands what drives results.",
    name: "Maya Torres",
    role: "Digital Strategist",
  },
  {
    quote:
      "Our new site looks incredible and loads fast. Sign-ups increased by 60% in the first month.",
    name: "Samuel Reed",
    role: "Fitness Studio Owner",
  },
  {
    quote:
      "Professional, responsive, and incredibly talented. My listings page finally converts visitors into leads.",
    name: "Aria Kim",
    role: "Real Estate Advisor",
  },
  {
    quote:
      "Working with Mako was seamless from start to finish. They delivered beyond our expectations.",
    name: "Jason Patel",
    role: "Marketing Director",
  },
  {
    quote:
      "The website they built for my practice is beautiful and brings in new clients every week.",
    name: "Chloe Ramirez",
    role: "Wellness Coach",
  },
]

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col overflow-hidden bg-background"
    >
      {/* Grid pattern background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Top fade so grid fades out at the very top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />

      {/* Content - two column: text left, image right */}
      <div className="relative z-10 flex flex-1 items-center justify-center">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 md:flex-row md:items-center md:gap-16">
        {/* Left: text and buttons */}
        <div className="flex flex-1 flex-col text-center md:max-w-xl md:text-left">
          <h1
            className="text-balance tracking-tighter text-foreground"
            style={{ fontSize: "clamp(1.75rem, 4.5vw, 3rem)", lineHeight: 1.05 }}
          >
            <TextGenerateEffect
              words="We Develop The Platform"
              className="block text-foreground"
              duration={0.5}
              staggerDelay={0.15}
            />
            <TextGenerateEffect
              words="That Represents You."
              className="mt-1 block text-foreground"
              duration={0.5}
              staggerDelay={0.15}
            />
          </h1>

          <p
            className="animate-fade-in-up stagger-1 mt-8 text-pretty leading-relaxed text-muted-foreground opacity-0"
            style={{ fontSize: "clamp(0.8rem, 1.25vw, 1.1rem)" }}
          >
            Custom web platforms for service-based businesses
            <br className="hidden sm:block" />
            ready to expand operational capacity.
          </p>

          <div className="animate-fade-in-up stagger-2 mt-12 flex flex-col items-center gap-4 opacity-0 sm:flex-row sm:gap-5 md:justify-start">
            <Link
              href="#contact"
              className="inline-flex h-14 items-center gap-3 rounded-full bg-foreground px-8 text-sm md:text-base font-medium text-background transition-opacity hover:opacity-90"
            >
              Get in Touch
            </Link>
            <Link
              href="#portfolio"
              className="inline-flex h-14 items-center rounded-full border border-border bg-background px-8 text-sm md:text-base font-medium text-foreground transition-colors hover:bg-secondary"
            >
              View Portfolio
            </Link>
          </div>
        </div>

        {/* Right: hero image */}
        <div className="animate-fade-in-up stagger-3 relative flex-1 opacity-0">
          <Image
            src="/hero-image.png"
            alt="Hero"
            width={600}
            height={500}
            className="w-full max-w-lg object-contain"
            priority
          />
        </div>
        </div>
      </div>

      {/* Testimonials marquee - one strip, testimonials scroll through */}
      <div className="relative z-10 w-full overflow-hidden border-t border-border/50 bg-muted/30 py-10">
        <div className="marquee flex items-center gap-16 px-8">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="flex w-[360px] shrink-0 flex-col gap-1"
            >
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>
              <span className="text-sm font-medium text-foreground">
                — {t.name}, {t.role}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Blue gradient glow at bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%]">
        {/* Deep blue glow - left */}
        <div
          className="absolute bottom-0 left-[10%] h-[80%] w-[40%] rounded-full opacity-60 blur-[80px]"
          style={{
            background:
              "radial-gradient(ellipse at center, #0066ff 0%, #0033aa 40%, transparent 70%)",
          }}
        />
        {/* Light blue glow - center */}
        <div
          className="absolute bottom-[10%] left-[35%] h-[60%] w-[30%] rounded-full opacity-50 blur-[60px]"
          style={{
            background:
              "radial-gradient(ellipse at center, #38bdf8 0%, #0ea5e9 40%, transparent 70%)",
          }}
        />
        {/* Navy blue glow - right */}
        <div
          className="absolute bottom-0 right-[5%] h-[80%] w-[45%] rounded-full opacity-60 blur-[80px]"
          style={{
            background:
              "radial-gradient(ellipse at center, #1d4ed8 0%, #1e3a8a 40%, transparent 70%)",
          }}
        />
        {/* Cyan accent - center-right */}
        <div
          className="absolute bottom-[5%] left-[45%] h-[40%] w-[25%] rounded-full opacity-40 blur-[50px]"
          style={{
            background:
              "radial-gradient(ellipse at center, #22d3ee 0%, #06b6d4 40%, transparent 70%)",
          }}
        />
      </div>

      {/* Bottom fade to clean edge */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
