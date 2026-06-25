"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Menu, X } from "lucide-react"

const menuLinks = [
  { href: "/services", label: "Services" },
  { href: "/process", label: "Our Process" },
  { href: "/blog", label: "Blog" },
  { href: "/about-us", label: "About Us" },
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

  // Logo only shows at the very top; hides once scrolled (either direction).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      {/* Logo — top left, hides on scroll */}
      <Link
        href="/"
        aria-label="Mako Marketing home"
        className={`fixed left-1/2 top-4 z-50 flex -translate-x-1/2 flex-col items-center transition-all duration-300 md:top-6 ${
          scrolled
            ? "pointer-events-none -translate-y-4 opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <Image
          src="/Mako-Marketing-logo-design.png"
          alt="Mako Marketing"
          width={432}
          height={173}
          priority
          className="mx-auto h-32 w-auto object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] md:h-44"
        />
      </Link>

      {/* Hamburger — top right, always available */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="fixed right-5 top-5 z-50 flex size-12 items-center justify-center rounded-full border border-line-strong bg-black/40 text-near-white backdrop-blur-sm transition-colors hover:border-cyan hover:text-cyan md:right-8 md:top-6"
      >
        <Menu className="size-5" />
      </button>

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
