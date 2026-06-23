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
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-5 pt-28 md:px-8"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <h1 className="text-display max-w-4xl text-balance text-[clamp(2.25rem,6vw,5rem)] leading-[1.05] text-near-white">
          <SplitHeading
            text="We Turn Your Traffic Into Booked, Paying Customers"
            accent={["Booked,", "Paying", "Customers"]}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          High-performance websites plus Google Ads, Meta Ads, and SEO —
          engineered to bring service businesses a steady flow of qualified
          leads.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
          className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <Magnetic strength={0.35}>
            <Link href="/#contact" className="btn-cyan h-12 px-7 text-base">
              Get a Free Proposal <ArrowUpRight className="size-5" />
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
          className="mt-9 flex items-center gap-3 text-sm text-near-white/70"
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
