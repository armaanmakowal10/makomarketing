"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Our Process" },
  { href: "/blog", label: "Blog" },
  { href: "/about-us", label: "About Us" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    // Absolute (not fixed) so the header is frozen at the top of the page and
    // scrolls out of view with the hero — it never follows the scroll.
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="relative mx-auto flex max-w-7xl items-center px-5 py-5 md:px-8 md:py-6">
        {/* Logo — top-left on the home page only, vertically centred on the
            nav row so the two line up. */}
        {isHome && (
          <Image
            src="/Mako-Marketing-logo-design.png"
            alt="Mako Marketing"
            width={520}
            height={208}
            priority
            className="absolute -left-3 top-1/2 h-16 w-auto -translate-y-1/2 object-contain md:-left-5 md:h-20"
          />
        )}

        {/* Page titles — centred across the page and spread out */}
        <nav className="flex w-full flex-wrap items-center justify-center gap-x-14 gap-y-2 md:gap-x-24">
          {menuLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-cyan"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
