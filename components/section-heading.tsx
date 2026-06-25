"use client"

import type { ReactNode } from "react"
import { Reveal } from "@/components/reveal"

/**
 * Section heading with a flanking-line eyebrow. Shared across sections so their
 * titles read as a consistent system. Defaults to centered; pass align="left"
 * for the left-aligned homepage layout.
 */
export function SectionHeading({
  eyebrow,
  children,
  sub,
  className,
  align = "center",
}: {
  eyebrow?: string
  children: ReactNode
  sub?: ReactNode
  className?: string
  align?: "center" | "left"
}) {
  const left = align === "left"
  return (
    <Reveal
      className={`max-w-3xl ${left ? "text-left" : "mx-auto text-center"} ${
        className ?? ""
      }`}
    >
      {eyebrow ? (
        <p
          className={`flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-cyan ${
            left ? "justify-start" : "justify-center"
          }`}
        >
          {!left && (
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan/60" />
          )}
          {eyebrow}
          <span
            className={`h-px w-8 ${
              left
                ? "bg-gradient-to-r from-cyan/60 to-transparent"
                : "bg-gradient-to-l from-transparent to-cyan/60"
            }`}
          />
        </p>
      ) : null}
      <h2 className="text-display mt-4 text-[clamp(2rem,5vw,3.6rem)] leading-[1.08] text-near-white">
        {children}
      </h2>
      {sub ? (
        <p
          className={`mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg ${
            left ? "" : "mx-auto"
          }`}
        >
          {sub}
        </p>
      ) : null}
    </Reveal>
  )
}
