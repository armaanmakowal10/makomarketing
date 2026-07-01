import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

/**
 * Shared shell for the legal pages (Privacy Policy, Terms). Deliberately static
 * and text-first — no scroll animations — for a calm, readable document. The
 * page's background is frozen via STATIC_BG_ROUTES in animated-background.tsx.
 */
export function LegalLayout({
  title,
  intro,
  updated,
  children,
}: {
  title: string
  intro: string
  updated: string
  children: ReactNode
}) {
  return (
    <main className="relative">
      <div className="mx-auto max-w-3xl px-5 pb-24 pt-32 md:px-8 md:pb-32 md:pt-40">
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
        <p className="mt-4 text-sm text-near-white/40">Last updated: {updated}</p>

        <div className="mt-12 h-px w-full bg-line" />

        <div className="mt-12 space-y-12">{children}</div>
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
    <section className="scroll-mt-28">
      <h2 className="text-display text-xl leading-snug text-near-white md:text-2xl">
        <span className="mr-2.5 text-cyan/60">{String(n).padStart(2, "0")}</span>
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-near-white/70 md:text-[15px] [&_a]:text-cyan [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-semibold [&_strong]:text-near-white">
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
