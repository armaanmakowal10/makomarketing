"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"

const TEXT =
  "We build digital platforms that turn attention into revenue. Engineered to rank, designed to convert, and built to scale your business around the clock."

// Words that should glow cyan when lit.
const ACCENT = new Set(["revenue.", "rank,", "convert,", "scale"])

const words = TEXT.split(" ")

export function ManifestoSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  })

  return (
    <section
      ref={ref}
      className="relative bg-transparent py-[16vh] md:py-[22vh]"
    >
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <p className="mb-10 text-xs uppercase tracking-[0.3em] text-cyan">
          / The Mako Difference
        </p>
        <p className="text-display flex flex-wrap text-[clamp(1.8rem,5.2vw,4rem)] leading-[1.15]">
          {words.map((word, i) => {
            const start = i / words.length
            const end = start + 1 / words.length
            return (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[start, end]}
                accent={ACCENT.has(word)}
              >
                {word}
              </Word>
            )
          })}
        </p>
      </div>
    </section>
  )
}

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
  accent: boolean
}) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const color = useTransform(
    progress,
    range,
    accent ? ["#1f2a2e", "#14e4fe"] : ["#3a474c", "#f5f5f5"]
  )

  return (
    <span className="mr-[0.28em] mt-[0.1em]">
      <motion.span
        style={{ opacity, color }}
        className={accent ? "text-glow" : undefined}
      >
        {children}
      </motion.span>
    </span>
  )
}
