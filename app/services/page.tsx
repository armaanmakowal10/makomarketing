import type { Metadata } from "next"
import { ServicesSection } from "@/components/services-section"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Google Ads, Meta Ads, Google SEO, Google LSAs, web design, CRM development, and client LTV development for service-based businesses ready to grow.",
}

export default function ServicesPage() {
  return (
    <main>
      <ServicesSection />
    </main>
  )
}
