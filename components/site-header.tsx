"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { X, Phone } from "lucide-react"

const EASE = [0.16, 1, 0.3, 1] as const

const PHONE_DISPLAY = "905-260-5457"
const PHONE_TEL = "tel:9052605457"

const menuLinks = [
  { href: "/", label: "Home" },
  { href: "/our-success", label: "Our Success" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Our Process" },
  { href: "/blog", label: "Blog" },
  { href: "/about-us", label: "About Us" },
  { href: "/privacy-policy", label: "Privacy & Terms" },
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

// Three bars morphing to convey the menu button.
function HamburgerIcon() {
  const bar =
    "absolute left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-current"
  return (
    <span className="relative block h-4 w-6">
      <span className={bar} style={{ top: 0 }} />
      <span className={bar} style={{ top: 7 }} />
      <span className={bar} style={{ top: 14 }} />
    </span>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    // Absolute (not fixed) so the header is frozen at the top of the page and
    // scrolls out of view with the hero — it never follows the scroll.
    <header className="absolute inset-x-0 top-0 z-50">
      {/* Full-width row so the logo hugs the left edge and the hamburger hugs
          the right edge of the page. */}
      <div className="flex w-full items-center px-6 py-5 md:px-10 md:py-8">
        {/* Brand mark (mountain icon only), linking home. */}
        <Link
          href="/"
          aria-label="Mako Marketing — home"
          onClick={() => setOpen(false)}
          className="relative z-50 shrink-0"
        >
          <BrandMark className="h-8 sm:h-9" />
        </Link>

        {/* Hamburger — glassy, glowing pill hugging the right edge. */}
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          whileTap={{ scale: 0.94 }}
          animate={{ opacity: open ? 0 : 1 }}
          style={{ pointerEvents: open ? "none" : "auto" }}
          className="group relative z-50 ml-auto inline-flex size-14 items-center justify-center rounded-full border border-cyan/40 bg-gradient-to-br from-white/[0.08] to-cyan/[0.05] text-near-white shadow-[0_0_26px_-8px_rgba(20,228,254,0.6)] backdrop-blur-md transition-colors duration-300 hover:border-cyan/70 hover:text-cyan"
        >
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full bg-cyan/25 blur-lg"
            animate={{ opacity: [0.25, 0.5, 0.25], scale: [0.9, 1.05, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="relative">
            <HamburgerIcon />
          </span>
        </motion.button>
      </div>

      {/* Slide-in drawer menu. */}
      <AnimatePresence>
        {open && (
          <>
            {/* Dim backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            <motion.nav
              className="fixed inset-y-0 right-0 z-50 flex w-[86%] max-w-sm flex-col overflow-y-auto border-l border-line bg-gradient-to-b from-[#0a0e12] to-black shadow-[0_0_80px_rgba(0,0,0,0.7)]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4, ease: EASE }}
            >
              {/* ambient top glow */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(20,228,254,0.12),transparent_70%)]" />

              {/* MENU label + close */}
              <div className="relative flex items-center justify-between border-b border-line px-6 py-6">
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex size-9 items-center justify-center rounded-full border border-line-strong text-near-white transition-colors hover:border-cyan/60 hover:text-cyan"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Links */}
              <div className="relative flex flex-col">
                {menuLinks.map((link, i) => {
                  const active = pathname === link.href
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.35, ease: EASE }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`relative flex items-center border-b border-line/50 px-6 py-4 font-display text-lg transition-colors ${
                          active
                            ? "bg-cyan/[0.07] text-near-white"
                            : "text-near-white/70 hover:bg-white/[0.03] hover:text-cyan"
                        }`}
                      >
                        {active && (
                          <span className="absolute left-0 top-0 h-full w-0.5 bg-cyan shadow-[0_0_10px_rgba(20,228,254,0.9)]" />
                        )}
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              {/* Phone at the bottom */}
              <a
                href={PHONE_TEL}
                className="relative mt-auto flex items-center gap-3 border-t border-line px-6 py-6 text-near-white transition-colors hover:text-cyan"
              >
                <Phone className="size-4 text-cyan" />
                <span className="text-display text-base">{PHONE_DISPLAY}</span>
              </a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
