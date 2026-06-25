import type { Metadata } from "next"
import { ProcessSection } from "@/components/process-section"

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "How Mako Marketing works: a four-stage process — Discover, Strategy, Build & Launch, Optimize & Scale — built to compound results.",
}

export default function ProcessPage() {
  return (
    <main className="pt-12 md:pt-16">
      <ProcessSection />
    </main>
  )
}
