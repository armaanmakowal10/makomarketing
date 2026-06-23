"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, ArrowUp } from "lucide-react"
import { StaggerGroup, StaggerItem } from "@/components/reveal"
import { FooterWordmark } from "@/components/footer-wordmark"

const PHONE_DISPLAY = "905-260-5457"
const PHONE_TEL = "tel:9052605457"
const EMAIL = "makomarketing0@gmail.com"

const cols = [
  {
    heading: "Services",
    links: [
      { label: "Google Ads", href: "#services" },
      { label: "Meta Ads", href: "#services" },
      { label: "Web Development", href: "#services" },
      { label: "Google SEO", href: "#services" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Work", href: "#work" },
      { label: "Process", href: "#process" },
      { label: "Results", href: "#results" },
      { label: "Contact", href: "#contact" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-transparent">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <StaggerGroup className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {/* Brand */}
          <StaggerItem className="col-span-2">
            <Link href="#home" aria-label="Mako Marketing home">
              <Image
                src="/Mako-Marketing-logo-design.png"
                alt="Mako Marketing"
                width={180}
                height={72}
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Turning traffic into paying customers for service-based businesses.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={PHONE_TEL}
                className="group flex items-center gap-2 text-near-white transition-colors hover:text-cyan"
              >
                <Phone className="size-4 text-cyan" />
                <span className="text-display text-lg">{PHONE_DISPLAY}</span>
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-near-white"
              >
                <Mail className="size-4 text-cyan" />
                {EMAIL}
              </a>
            </div>
          </StaggerItem>

          {cols.map((col) => (
            <StaggerItem key={col.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
                {col.heading}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-near-white/70 transition-colors hover:text-cyan"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-line pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Mako Marketing. All rights reserved.
          </p>
          <a
            href="#home"
            className="group flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-cyan"
          >
            Back to top
            <span className="flex size-8 items-center justify-center rounded-full border border-line-strong text-cyan transition-transform group-hover:-translate-y-0.5">
              <ArrowUp className="size-3.5" />
            </span>
          </a>
        </div>
      </div>

      {/* Oversized watermark wordmark (parallax) */}
      <FooterWordmark />
    </footer>
  )
}
