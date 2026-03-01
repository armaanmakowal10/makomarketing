"use client"

import { useRef } from "react"
import Link from "next/link"
import { useInView } from "@/hooks/use-in-view"

export function CTABanner() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref)

  return (
    <section id="contact" className="bg-background">
      <div
        ref={ref}
        className={`mx-auto max-w-7xl transition-all duration-700 ${
          isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Grid background lines */}
        <div className="relative border-t border-border">
          {/* Vertical grid lines */}
          <div className="pointer-events-none absolute inset-0">
            <div className="mx-auto flex h-full max-w-7xl">
              <div className="w-1/3 border-r border-border" />
              <div className="w-1/3 border-r border-border" />
              <div className="w-1/3" />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 px-10 py-24 text-center md:px-12 md:py-32">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl md:leading-[1.1]">
              <span className="text-foreground">Ready to start your project?</span>{" "}
              <span className="text-muted-foreground">
                Let us build the digital platform your business deserves.
              </span>
            </h2>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
              <Link
                href="mailto:makomarketing0@gmail.com"
                className="inline-flex h-12 items-center rounded-full bg-foreground px-8 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Get Started
              </Link>
              <Link
                href="#portfolio"
                className="inline-flex h-12 items-center rounded-full border border-border px-8 text-sm font-medium text-foreground transition-colors hover:bg-[#0a0a0a]"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
