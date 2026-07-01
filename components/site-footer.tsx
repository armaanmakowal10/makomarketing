"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, ArrowUp } from "lucide-react"
import { StaggerGroup, StaggerItem } from "@/components/reveal"
import { lenisRef } from "@/lib/scroll-state"

const PHONE_DISPLAY = "905-260-5457"
const PHONE_TEL = "tel:9052605457"
const EMAIL = "makomarketing0@gmail.com"

const cols = [
  {
    heading: "Services",
    links: [
      { label: "Google Ads", href: "/services" },
      { label: "Meta Ads", href: "/services" },
      { label: "Web Design", href: "/services" },
      { label: "Google SEO", href: "/services" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Blog", href: "/blog" },
      { label: "Results", href: "/#results" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
]

function backToTop() {
  if (lenisRef.current) lenisRef.current.scrollTo(0)
  else window.scrollTo({ top: 0, behavior: "smooth" })
}

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-line bg-transparent">
      {/* Lit top edge + soft ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[80vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(20,228,254,0.08),transparent_70%)] blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <StaggerGroup className="grid gap-12 md:grid-cols-12">
          {/* Brand + contact */}
          <StaggerItem className="md:col-span-5">
            <Link href="/" aria-label="Mako Marketing home" className="inline-block">
              <Image
                src="/Mako-Marketing-logo-design.png"
                alt="Mako Marketing"
                width={200}
                height={80}
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Turning traffic into paying customers for service-based businesses
              across Canada.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={PHONE_TEL}
                className="group flex items-center gap-3 rounded-xl border border-line bg-surface-1/40 px-4 py-2.5 transition-colors hover:border-cyan/40"
              >
                <span className="flex size-9 items-center justify-center rounded-lg border border-line-strong bg-cyan/5 text-cyan transition-colors group-hover:bg-cyan group-hover:text-black">
                  <Phone className="size-4" />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-widest text-muted-foreground">
                    Call us
                  </span>
                  <span className="text-display text-sm text-near-white">
                    {PHONE_DISPLAY}
                  </span>
                </span>
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="group flex items-center gap-3 rounded-xl border border-line bg-surface-1/40 px-4 py-2.5 transition-colors hover:border-cyan/40"
              >
                <span className="flex size-9 items-center justify-center rounded-lg border border-line-strong bg-cyan/5 text-cyan transition-colors group-hover:bg-cyan group-hover:text-black">
                  <Mail className="size-4" />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-widest text-muted-foreground">
                    Email us
                  </span>
                  <span className="text-sm text-near-white">{EMAIL}</span>
                </span>
              </a>
            </div>
          </StaggerItem>

          {/* Link columns */}
          <StaggerItem className="md:col-span-7">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {cols.map((col) => (
                <div key={col.heading}>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
                    {col.heading}
                  </h3>
                  <ul className="mt-5 flex flex-col gap-3">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="group inline-flex items-center gap-1.5 text-sm text-near-white/70 transition-colors hover:text-cyan"
                        >
                          <span className="h-px w-0 bg-cyan transition-all duration-300 group-hover:w-3" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </StaggerItem>
        </StaggerGroup>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-line pt-8 text-center md:flex-row md:text-left">
          <p className="text-xs text-muted-foreground">
            &copy; {year} Mako Marketing. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <Link href="/privacy-policy" className="transition-colors hover:text-cyan">
              Privacy Policy
            </Link>
            <span className="text-line-strong">·</span>
            <Link href="/terms" className="transition-colors hover:text-cyan">
              Terms &amp; Conditions
            </Link>
          </div>

          <button
            onClick={backToTop}
            className="group flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-cyan"
          >
            Back to top
            <span className="flex size-8 items-center justify-center rounded-full border border-line-strong text-cyan transition-transform group-hover:-translate-y-0.5">
              <ArrowUp className="size-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
