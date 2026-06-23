import type { Metadata } from "next"
import { ServicesSection } from "@/components/services-section"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Google Ads, Meta Ads, Local Service Ads, web development, and SEO for service-based businesses ready to grow.",
}

export default function ServicesPage() {
  return (
    <main>
      <ServicesSection />
    </main>
  )
}
