"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Plus } from "lucide-react"

export type Faq = { q: string; a: string }

/**
 * Compact, animated FAQ accordion. Collapsed by default to keep the section
 * dense; each item expands with a smooth height + fade and a rotating plus icon.
 */
export function AboutFaq({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="mt-10 flex flex-col gap-3">
      {faqs.map((f, i) => {
        const isOpen = open === i
        return (
          <div
            key={f.q}
            className={`overflow-hidden rounded-2xl border bg-surface-1/40 transition-colors ${
              isOpen ? "border-cyan/40" : "border-line hover:border-line-strong"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-display text-lg text-near-white md:text-xl">
                {f.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
                  isOpen
                    ? "border-cyan bg-cyan/10 text-cyan"
                    : "border-line-strong text-near-white/70"
                }`}
              >
                <Plus className="size-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                    {f.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
