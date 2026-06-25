"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Menu, Phone, X } from "lucide-react"

const PHONE_TEL = "tel:9052605457"

const menuLinks = [
  { href: "/services", label: "Services" },
  { href: "/process", label: "Our Process" },
  { href: "/blog", label: "Blog" },
  { href: "/about-us", label: "About Us" },
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
      {/* Top-right cluster: home (logo mark) · call · hamburger — anchored to
          the hero so the header scrolls out of view. */}
      <div className="absolute right-5 top-5 z-50 flex items-center gap-3.5 md:right-8 md:top-6">
        <Link
          href="/"
          aria-label="Mako Marketing home"
          className="flex size-14 items-center justify-center overflow-hidden rounded-full border border-line-strong bg-black/40 backdrop-blur-sm transition-colors hover:border-cyan"
        >
          <Image
            src="/Mako-Marketing-logo-design.png"
            alt="Mako Marketing"
            width={432}
            height={173}
            priority
            className="w-10 object-contain"
          />
        </Link>

        <a
          href={PHONE_TEL}
          aria-label="Call Mako Marketing"
          className="flex size-14 items-center justify-center rounded-full border border-line-strong bg-black/40 text-near-white backdrop-blur-sm transition-colors hover:border-cyan hover:text-cyan"
        >
          <Phone className="size-6" />
        </a>

        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="flex size-14 items-center justify-center rounded-full border border-line-strong bg-black/40 text-near-white backdrop-blur-sm transition-colors hover:border-cyan hover:text-cyan"
        >
          <Menu className="size-6" />
        </button>
      </div>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden
        className={`fixed inset-0 z-[55] bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Slide-in drawer */}
      <aside
        aria-hidden={!open}
        className={`fixed inset-y-0 right-0 z-[60] flex h-full w-full max-w-sm flex-col border-l border-line-strong bg-surface-1 transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 md:px-8">
          <span className="text-xs uppercase tracking-[0.3em] text-cyan">
            Menu
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex size-10 items-center justify-center rounded-full border border-line-strong text-near-white transition-colors hover:border-cyan hover:text-cyan"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col px-6 pb-10 md:px-8">
          {menuLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="group flex items-center justify-between border-b border-line py-5"
            >
              <span className="text-display text-2xl text-near-white transition-colors group-hover:text-cyan">
                {link.label}
              </span>
              <ArrowUpRight className="size-5 -translate-x-1 text-cyan opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}
