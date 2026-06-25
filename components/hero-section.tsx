"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Star } from "lucide-react"
import { SplitHeading } from "@/components/split-heading"
import { Magnetic } from "@/components/magnetic"

const EASE = [0.16, 1, 0.3, 1] as const

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-start overflow-hidden px-5 pt-5 md:px-8 md:pt-6"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <h1
          className="text-display text-[clamp(2.75rem,7.5vw,7rem)] text-near-white"
          style={{ lineHeight: 1.15 }}
        >
          <SplitHeading
            text={"More Leads\nMore Sales\nMore Profit\nMore Freedom."}
            accent={["Freedom."]}
          />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
          className="mt-4 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6"
        >
          <Magnetic strength={0.35}>
            <Link href="/free-audit" className="btn-cyan h-12 px-7 text-base">
              Request a Free Audit <ArrowUpRight className="size-5" />
            </Link>
          </Magnetic>

          {/* Trust factor — Google rating */}
          <div className="flex items-center gap-2.5">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-cyan text-cyan" />
              ))}
            </div>
            <span className="text-sm text-near-white/85">
              <span className="font-semibold text-near-white">5.0</span> rating on
              Google
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
