"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, Phone, X } from "lucide-react"

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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      {/* Frozen header bar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-black/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-5 py-2.5 md:px-8">
          <Link
            href="#home"
            aria-label="Mako Marketing home"
            className="flex items-center"
          >
            <Image
              src="/Mako-Marketing-logo-design.png"
              alt="Mako Marketing"
              width={300}
              height={120}
              priority
              className="h-14 w-auto object-contain md:h-20"
            />
          </Link>

          <div className="flex items-center gap-2.5 md:gap-3">
            <a
              href={PHONE_TEL}
              aria-label={`Call ${PHONE_DISPLAY}`}
              className="group flex items-center gap-2 rounded-full text-sm font-medium text-near-white transition-colors hover:text-cyan"
            >
              <span className="flex size-9 items-center justify-center rounded-full border border-line-strong bg-black/40 text-cyan transition-colors group-hover:bg-cyan/10">
                <Phone className="size-4" />
              </span>
              <span className="hidden lg:inline">{PHONE_DISPLAY}</span>
            </a>

            <Link
              href="#contact"
              className="btn-cyan hidden h-10 px-4 text-sm min-[380px]:inline-flex sm:px-5"
            >
              Get Started
            </Link>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex size-10 items-center justify-center rounded-full border border-line-strong bg-black/40 text-near-white transition-colors hover:border-cyan hover:text-cyan"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu */}
      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-black/95 backdrop-blur-xl">
          <div className="flex items-center justify-between px-5 py-5 md:px-8 md:py-6">
            <Image
              src="/Mako-Marketing-logo-design.png"
              alt="Mako Marketing"
              width={300}
              height={120}
              className="h-16 w-auto object-contain md:h-20"
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
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-display group flex items-center gap-4 py-2 text-[clamp(2rem,7vw,4.5rem)] leading-tight text-near-white transition-colors hover:text-cyan"
              >
                <span className="text-display text-sm text-cyan/60">
                  0{i + 1}
                </span>
                {link.label}
              </Link>
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
        </div>
      )}
    </>
  )
}
