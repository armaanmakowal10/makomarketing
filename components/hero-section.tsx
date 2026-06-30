"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { RotatingWord } from "@/components/rotating-word"
import { Magnetic } from "@/components/magnetic"

const EASE = [0.16, 1, 0.3, 1] as const

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-16 text-center"
    >
      <div className="relative z-10 mx-auto mt-[9vh] flex w-full max-w-3xl flex-col items-center gap-8">
        <h1
          className="text-display text-[clamp(2.75rem,6.75vw,5.75rem)] text-near-white"
          style={{ lineHeight: 1.08 }}
        >
          {/* Full headline for screen readers */}
          <span className="sr-only">
            More Leads. More Profit. More Freedom.
          </span>
          {/* Visual headline — decorative; the final word cycles. The line
              re-centers smoothly via the word's animated width. */}
          <span aria-hidden="true" className="inline-block whitespace-nowrap">
            More{" "}
            <RotatingWord words={["Leads.", "Profit.", "Freedom."]} />
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
              className="btn-cyan h-12 px-8 text-sm uppercase tracking-[0.12em]"
            >
              Request a Free Audit Now <ArrowUpRight className="size-5" />
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}
