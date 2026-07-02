import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft, ShieldCheck, ScrollText } from "lucide-react"

const TABS = [
  { key: "privacy", label: "Privacy Policy", href: "/privacy-policy", icon: ShieldCheck },
  { key: "terms", label: "Terms & Conditions", href: "/terms", icon: ScrollText },
] as const

/**
 * Shared shell for the legal pages (Privacy Policy, Terms). Text-first and calm
 * for readability, with a segmented switcher so both documents are reachable from
 * either page. The page's background is frozen via the static-route list in
 * animated-background.tsx.
 */
export function LegalLayout({
  title,
  intro,
  updated,
  active,
  children,
}: {
  title: string
  intro: string
  updated: string
  active: "privacy" | "terms"
  children: ReactNode
}) {
  return (
    <main className="relative">
      {/* Soft ambient glow behind the header for depth */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(20,228,254,0.08),transparent_70%)]" />

      <div className="relative mx-auto max-w-3xl px-5 pb-24 pt-32 md:px-8 md:pb-32 md:pt-40">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-cyan"
        >
          <ArrowLeft className="size-3.5" />
          Back home
        </Link>

        <p className="mt-10 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-cyan">
          <span className="h-px w-8 bg-gradient-to-r from-cyan to-transparent" />
          Legal
        </p>
        <h1 className="text-display mt-4 text-[clamp(2.2rem,5.5vw,3.6rem)] leading-[1.05] text-near-white">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {intro}
        </p>
        <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface-1/50 px-3.5 py-1.5 text-xs text-near-white/50">
          <span className="size-1.5 rounded-full bg-cyan" />
          Last updated: {updated}
        </p>

        {/* Segmented switcher — both documents reachable from either page. */}
        <nav
          aria-label="Legal documents"
          className="mt-10 inline-flex w-full flex-col gap-1.5 rounded-2xl border border-line bg-surface-1/40 p-1.5 sm:w-auto sm:flex-row"
        >
          {TABS.map((tab) => {
            const isActive = tab.key === active
            return (
              <Link
                key={tab.key}
                href={tab.href}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-cyan/15 text-cyan shadow-[inset_0_0_0_1px_rgba(20,228,254,0.4)]"
                    : "text-near-white/60 hover:bg-white/[0.04] hover:text-near-white"
                }`}
              >
                <tab.icon className="size-4" />
                {tab.label}
              </Link>
            )
          })}
        </nav>

        <div className="mt-10 h-px w-full bg-gradient-to-r from-cyan/40 via-line to-transparent" />

        <div className="mt-12 space-y-10">{children}</div>

        {/* Footer cross-link to the companion document */}
        <div className="mt-16 rounded-2xl border border-line bg-surface-1/40 p-6 md:p-8">
          <p className="text-sm text-near-white/60">
            Looking for our{" "}
            {active === "privacy" ? (
              <Link
                href="/terms"
                className="text-cyan underline underline-offset-2 hover:text-cyan-bright"
              >
                Terms &amp; Conditions
              </Link>
            ) : (
              <Link
                href="/privacy-policy"
                className="text-cyan underline underline-offset-2 hover:text-cyan-bright"
              >
                Privacy Policy
              </Link>
            )}
            ? Questions about either? Reach us at{" "}
            <a
              href="mailto:makomarketing0@gmail.com"
              className="text-cyan underline underline-offset-2 hover:text-cyan-bright"
            >
              makomarketing0@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  )
}

/** A numbered section within a legal document. */
export function LegalSection({
  n,
  title,
  children,
}: {
  n: number
  title: string
  children: ReactNode
}) {
  return (
    <section className="group scroll-mt-28 rounded-2xl border border-transparent px-1 py-1 transition-colors">
      <h2 className="text-display flex items-start gap-3 text-xl leading-snug text-near-white md:text-2xl">
        <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-cyan/5 text-sm font-semibold text-cyan md:size-9">
          {String(n).padStart(2, "0")}
        </span>
        <span className="pt-1">{title}</span>
      </h2>
      <div className="mt-4 space-y-4 pl-11 text-sm leading-relaxed text-near-white/70 md:pl-12 md:text-[15px] [&_a]:text-cyan [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-semibold [&_strong]:text-near-white">
        {children}
      </div>
    </section>
  )
}

/** Bulleted list with cyan markers, shared across legal sections. */
export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
