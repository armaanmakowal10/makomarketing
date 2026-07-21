"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { RotatingWord } from "@/components/rotating-word"
import { Magnetic } from "@/components/magnetic"

const EASE = [0.16, 1, 0.3, 1] as const

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-16 text-center"
    >
      <div className="relative z-10 mx-auto mt-[9vh] flex w-full max-w-4xl flex-col items-center gap-10">
        <h1
          className="text-display text-[clamp(2.75rem,7.6vw,6.75rem)] text-near-white"
          style={{ lineHeight: 1.06 }}
        >
          {/* Full headline for screen readers */}
          <span className="sr-only">
            More Leads. More Profit. More Freedom.
          </span>
          {/* Visual headline — decorative; the final word cycles. The line
              re-centers smoothly via the word's animated width. */}
          <span aria-hidden="true" className="inline-block whitespace-nowrap">
            More{" "}
            <RotatingWord words={["Leads.", "Profit.", "Freedom."]} interval={2800} />
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
          className="flex justify-center"
        >
          <Magnetic strength={0.35}>
            <Link
              href="/free-audit"
              className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full border border-cyan/70 px-10 font-display text-base font-semibold uppercase tracking-[0.12em] text-cyan shadow-[0_0_24px_-10px_rgba(20,228,254,0.6)] transition-[color,box-shadow] duration-300 hover:text-black hover:shadow-[0_0_36px_-6px_rgba(20,228,254,0.85)]"
            >
              {/* cyan fill sweeps in from the left on hover */}
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-cyan-bright to-cyan transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
              <span className="relative">Request a Free Audit Now</span>
            </Link>
          </Magnetic>
        </motion.div>
      </div>

      {/* Divider — a glowing hairline that separates the hero from the next
          section: gradient line, soft bloom, and a bright centre point. */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.6 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1.1, delay: 1.1, ease: EASE }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center"
      >
        <div className="relative h-[3px] w-[97vw]">
          {/* the line itself */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-cyan/80 to-transparent" />
          {/* soft bloom above the line */}
          <span className="absolute inset-x-[12%] -top-[3px] h-[8px] rounded-full bg-cyan/25 blur-[10px]" />
        </div>
      </motion.div>
    </section>
  )
}
