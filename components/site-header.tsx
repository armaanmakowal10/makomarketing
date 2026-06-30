"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const menuLinks = [
  { href: "/services", label: "Services" },
  { href: "/process", label: "Our Process" },
  { href: "/blog", label: "Blog" },
  { href: "/about-us", label: "About Us" },
]

function BrandMark({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-hidden="true"
      className={`relative block overflow-hidden ${className ?? ""}`}
      style={{ aspectRatio: `${0.18635 * 2168} / ${0.19915 * 703}` }}
    >
      <span
        className="absolute block"
        style={{
          left: `${(-0.40637 / 0.18635) * 100}%`,
          top: `${(-0.02703 / 0.19915) * 100}%`,
          width: `${(1 / 0.18635) * 100}%`,
          height: `${(1 / 0.19915) * 100}%`,
          backgroundImage: "url(/mako-logo-equal.png)",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      />
    </span>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    // Absolute (not fixed) so the header is frozen at the top of the page and
    // scrolls out of view with the hero — it never follows the scroll.
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="relative mx-auto flex max-w-7xl items-center px-5 py-5 md:px-8 md:py-8">
        {/* Brand mark (mountain icon only), linking home. Fully visible and
            inset on mobile; pulled to the page edge from md up. */}
        <Link
          href="/"
          aria-label="Mako Marketing — home"
          onClick={() => setOpen(false)}
          className="absolute left-4 top-1/2 -translate-y-1/2 md:-left-7"
        >
          <BrandMark className="h-8 sm:h-9" />
        </Link>

        {/* Desktop nav — centred across the page and spread out. */}
        <nav className="hidden w-full flex-wrap items-center justify-center gap-x-10 lg:gap-x-20 xl:gap-x-44 md:flex">
          {menuLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-cyan md:text-base"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu toggle — pinned right. */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="ml-auto inline-flex size-10 items-center justify-center rounded-full border border-line-strong text-near-white transition-colors hover:text-cyan md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile dropdown panel. */}
      {open && (
        <nav className="mx-4 mt-1 flex flex-col overflow-hidden rounded-2xl border border-line bg-black/90 backdrop-blur-md md:hidden">
          {menuLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-line/60 px-5 py-4 text-center font-display text-sm font-semibold uppercase tracking-[0.14em] text-near-white transition-colors last:border-b-0 hover:text-cyan"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
