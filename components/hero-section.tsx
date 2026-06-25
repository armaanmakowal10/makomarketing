"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Phone, Star } from "lucide-react"
import { SplitHeading } from "@/components/split-heading"
import { Magnetic } from "@/components/magnetic"

const EASE = [0.16, 1, 0.3, 1] as const

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pt-28 text-center md:px-8"
    >
      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <h1 className="text-display text-balance text-[clamp(2.75rem,7vw,6rem)] leading-[1.05] text-near-white">
          <SplitHeading
            text={"More Leads\nMore Sales\nMore Profit"}
            accent={["Leads", "Sales", "Profit"]}
          />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
          className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Magnetic strength={0.35}>
            <Link href="/free-audit" className="btn-cyan h-12 px-7 text-base">
              Get a Free Audit <ArrowUpRight className="size-5" />
            </Link>
          </Magnetic>
          <a href="tel:9052605457" className="btn-ghost h-12 px-7 text-base">
            <Phone className="size-4" /> Call 905-260-5457
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
          className="mt-9 flex items-center justify-center gap-3 text-sm text-near-white/70"
        >
          <span className="flex gap-0.5 text-cyan" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-cyan" />
            ))}
          </span>
          Rated 5.0 by local service businesses
        </motion.div>
      </div>
    </section>
  )
}
