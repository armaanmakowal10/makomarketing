import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { ManifestoSection } from "@/components/manifesto-section"
import { ServicesSection } from "@/components/services-section"
import { IndustriesSection } from "@/components/industries-section"
import { ResultsSection } from "@/components/results-section"
import { MarqueeDivider } from "@/components/marquee-divider"
import { WorkSection } from "@/components/work-section"
import { ProcessSection } from "@/components/process-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ManifestoSection />
        <ServicesSection />
        <IndustriesSection />
        <ResultsSection />
        <MarqueeDivider />
        <WorkSection />
        <ProcessSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
