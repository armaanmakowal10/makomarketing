"use client"

import type { ReactNode } from "react"
import { Reveal } from "@/components/reveal"

/**
 * Centered section heading with a flanking-line eyebrow. Shared across all
 * homepage sections so their titles read as a consistent, centered system.
 */
export function SectionHeading({
  eyebrow,
  children,
  sub,
  className,
}: {
  eyebrow: string
  children: ReactNode
  sub?: ReactNode
  className?: string
}) {
  return (
    <Reveal className={`mx-auto max-w-3xl text-center ${className ?? ""}`}>
      <p className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.25em] text-cyan">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan/60" />
        {eyebrow}
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-cyan/60" />
      </p>
      <h2 className="text-display mt-4 text-[clamp(2rem,5vw,3.6rem)] leading-[1.08] text-near-white">
        {children}
      </h2>
      {sub ? (
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {sub}
        </p>
      ) : null}
    </Reveal>
  )
}
