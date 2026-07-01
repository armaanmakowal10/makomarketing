import type { Metadata } from "next"
import { ProcessSection } from "@/components/process-section"

const SITE_URL = "https://www.makomarketing.ca"

export const metadata: Metadata = {
  title: "Our Process | How We Grow Service Businesses",
  description:
    "See exactly how Mako Marketing grows service-based businesses: a proven four-step process that audits what is working, tests to find the winners, doubles down on them, and scales your revenue month over month.",
  keywords: [
    "marketing process",
    "digital marketing process",
    "growth process",
    "marketing agency process",
    "how digital marketing works",
    "data driven marketing",
    "marketing audit",
    "scaling ad campaigns",
    "Google Ads process",
    "service business marketing",
  ],
  alternates: {
    canonical: `${SITE_URL}/process`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/process`,
    title: "Our Process | How Mako Marketing Grows Service Businesses",
    description:
      "A proven four-step growth process: audit what works, test to find the winners, double down, and scale your revenue month over month.",
  },
}

// HowTo structured data — helps search engines understand (and richly display)
// the four-step process, improving SEO for process and how-it-works queries.
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "The Mako Marketing Growth Process",
  description:
    "How Mako Marketing turns a service business's marketing into a predictable, money-making machine in four steps.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Diagnose exactly where you are",
      text: "We audit your website, ads, SEO, customers, and competitors to find precisely what is working and what is quietly bleeding you money.",
      url: `${SITE_URL}/process#process`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Build the right plan and test relentlessly",
      text: "We pinpoint the channels that will move the needle fastest, then test angles, audiences, and offers so real data decides what wins.",
      url: `${SITE_URL}/process#process`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Double down on what wins",
      text: "We cut the dead weight and shift every dollar toward the proven, highest-return channels so results become predictable and repeatable.",
      url: `${SITE_URL}/process#process`,
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Scale hard and make you money",
      text: "With a profitable engine running, we scale aggressively while protecting your return and keep optimizing so revenue compounds month over month.",
      url: `${SITE_URL}/process#process`,
    },
  ],
}

export default function ProcessPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <ProcessSection />
    </main>
  )
}
