import type { Metadata } from "next"
import { SuccessPage } from "@/components/success-page"

const SITE_URL = "https://www.makomarketing.ca"

export const metadata: Metadata = {
  title: "Our Success | Real Client Results & Websites",
  description:
    "Real numbers from live client ad accounts — Meta and Google Ads campaigns booking leads for as little as CA$3.86 each — plus the high-converting websites Mako Marketing has designed and built.",
  keywords: [
    "marketing case studies",
    "client results",
    "Google Ads results",
    "Meta Ads results",
    "web design portfolio",
    "lead generation results",
    "marketing agency portfolio",
    "service business marketing results",
  ],
  alternates: {
    canonical: `${SITE_URL}/our-success`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/our-success`,
    title: "Our Success | Real Client Results & Websites",
    description:
      "Live campaign dashboards and the websites we've built — real numbers from real client accounts.",
  },
}

export default function OurSuccessPage() {
  return (
    <main>
      <SuccessPage />
    </main>
  )
}
