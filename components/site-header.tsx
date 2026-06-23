"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, Phone, X } from "lucide-react"
import { Magnetic } from "@/components/magnetic"

const PHONE_DISPLAY = "905-260-5457"
const PHONE_TEL = "tel:9052605457"

const menuLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#industries", label: "Industries" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#results", label: "Results" },
  { href: "#contact", label: "Contact" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  // Frost the bar once the hero has scrolled past.
  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 0.85
      setScrolled(window.scrollY > threshold)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      {/* Frosted bar — transparent over the hero, blurs in on scroll */}
      <div
        aria-hidden
        className={`fixed inset-x-0 top-0 z-40 h-[68px] border-b transition-all duration-500 md:h-20 ${
          scrolled
            ? "border-line bg-black/70 backdrop-blur-xl"
            : "border-transparent bg-transparent backdrop-blur-0"
        }`}
      />

      {/* Frozen logo — top left */}
      <Link
        href="#home"
        aria-label="Mako Marketing home"
        className="fixed left-5 top-5 z-50 flex items-center md:left-8 md:top-6"
      >
        <Image
          src="/Mako-Marketing-logo-design.png"
          alt="Mako Marketing"
          width={150}
          height={60}
          priority
          className="h-10 w-auto object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] md:h-12"
        />
      </Link>

      {/* Frozen action cluster — top right */}
      <div className="fixed right-5 top-5 z-50 flex items-center gap-2.5 md:right-8 md:top-6 md:gap-3">
        <a
          href={PHONE_TEL}
          aria-label={`Call ${PHONE_DISPLAY}`}
          className="group flex items-center gap-2 rounded-full text-sm font-medium text-near-white transition-colors hover:text-cyan"
        >
          <span className="flex size-9 items-center justify-center rounded-full border border-line-strong bg-black/40 text-cyan backdrop-blur-sm transition-colors group-hover:bg-cyan/10">
            <Phone className="size-4" />
          </span>
          <span className="hidden lg:inline">{PHONE_DISPLAY}</span>
        </a>

        <Magnetic strength={0.3}>
          <Link
            href="#contact"
            className="btn-cyan hidden h-10 px-4 text-sm min-[380px]:inline-flex sm:px-5"
          >
            Get Started
          </Link>
        </Magnetic>

        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="flex size-10 items-center justify-center rounded-full border border-line-strong bg-black/40 text-near-white backdrop-blur-sm transition-colors hover:border-cyan hover:text-cyan"
        >
          <Menu className="size-5" />
        </button>
      </div>

      {/* Full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-black/95 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between px-5 py-5 md:px-8 md:py-6">
              <Image
                src="/Mako-Marketing-logo-design.png"
                alt="Mako Marketing"
                width={150}
                height={60}
                className="h-10 w-auto object-contain md:h-12"
              />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex size-10 items-center justify-center rounded-full border border-line-strong text-near-white transition-colors hover:border-cyan hover:text-cyan"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-1 px-6 md:px-12">
              {menuLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-display group flex items-center gap-4 py-2 text-[clamp(2rem,7vw,4.5rem)] leading-tight text-near-white transition-colors hover:text-cyan"
                  >
                    <span className="text-display text-sm text-cyan/60">
                      0{i + 1}
                    </span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex flex-col gap-4 border-t border-line px-6 py-6 sm:flex-row sm:items-center sm:justify-between md:px-12">
              <a
                href={PHONE_TEL}
                className="flex items-center gap-2 text-lg font-medium text-near-white transition-colors hover:text-cyan"
              >
                <Phone className="size-4 text-cyan" /> {PHONE_DISPLAY}
              </a>
              <Link
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-cyan h-12 px-7 text-base"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
