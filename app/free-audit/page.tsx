import type { Metadata } from "next"
import { FreeAuditSection } from "@/components/free-audit-section"
import { FreeAuditBackground } from "@/components/free-audit-bg"

export const metadata: Metadata = {
  title: "Get a Free Audit",
  description:
    "Book a free marketing audit with Mako Marketing — a no-pressure review of your website, Google Ads, Meta Ads, and SEO, plus a custom plan to turn more traffic into paying customers.",
}

export default function FreeAuditPage() {
  return (
    <main className="pt-12 md:pt-16">
      <FreeAuditBackground />
      <FreeAuditSection />
    </main>
  )
}
