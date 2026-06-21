"use client"

import Link from "next/link"
import { Fragment, useRef } from "react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import { ArrowUpRight, Phone } from "lucide-react"
import { Magnetic } from "@/components/magnetic"
import { FluidBackdrop } from "@/components/fluid-backdrop"

const EASE = [0.16, 1, 0.3, 1] as const

const headlineTop = ["We", "Develop", "The", "Platform"]
const headlineBottom = ["That", "Represents", "You"]

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-32 md:pt-36"
    >
      {/* Backdrop: bright fluid + grid (global particle field shows through too) */}
      <div className="pointer-events-none absolute inset-0">
        <FluidBackdrop className="absolute inset-0" />
        <div className="bg-grid bg-grid-fade absolute inset-0 opacity-60" />
      </div>

      {/* Centered hero copy */}
      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-5 text-center md:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-cyan/5 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-cyan"
        >
          <span className="size-1.5 animate-pulse-glow rounded-full bg-cyan" />
          Digital Marketing Agency
        </motion.div>

        <h1 className="text-display mt-7 text-balance text-[clamp(3rem,9vw,8rem)] leading-[0.9] text-near-white">
          <span className="block overflow-hidden">
            {headlineTop.map((w, i) => (
              <Fragment key={w}>
                <Word i={i} reduce={!!reduce}>
                  {w === "Platform" ? (
                    <span className="text-cyan-gradient text-glow">{w}</span>
                  ) : (
                    w
                  )}
                </Word>{" "}
              </Fragment>
            ))}
          </span>
          <span className="block overflow-hidden">
            {headlineBottom.map((w, i) => (
              <Fragment key={w}>
                <Word i={i + headlineTop.length} reduce={!!reduce}>
                  {w}
                </Word>{" "}
              </Fragment>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
          className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          End-to-end digital solutions and strategic advertising for
          service-based businesses seeking to expand operational capacity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Magnetic strength={0.35}>
            <Link href="#contact" className="btn-cyan h-14 px-8 text-base">
              Get Started <ArrowUpRight className="size-5" />
            </Link>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a href="tel:9052605457" className="btn-ghost h-14 px-8 text-base">
              <Phone className="size-4" /> 905-260-5457
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

    </section>
  )
}

function Word({
  children,
  i,
  reduce,
}: {
  children: React.ReactNode
  i: number
  reduce: boolean
}) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        className="inline-block"
        initial={reduce ? { opacity: 0 } : { y: "110%" }}
        animate={reduce ? { opacity: 1 } : { y: 0 }}
        transition={{
          duration: 0.9,
          delay: 0.15 + i * 0.08,
          ease: EASE,
        }}
      >
        {children}
      </motion.span>
    </span>
  )
}
