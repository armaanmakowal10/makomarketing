import { HeroSection } from "@/components/hero-section"
import { ProofBar } from "@/components/proof-bar"
import { ServicesSection } from "@/components/services-section"
import { ResultsSection } from "@/components/results-section"
import { WorkSection } from "@/components/work-section"
import { ProcessSection } from "@/components/process-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { IndustriesSection } from "@/components/industries-section"
import { ContactSection } from "@/components/contact-section"

export default function Page() {
  return (
    <main>
      <HeroSection />
      <ProofBar />
      <ServicesSection />
      <ResultsSection />
      <WorkSection />
      <ProcessSection />
      <TestimonialsSection />
      <IndustriesSection />
      <ContactSection />
    </main>
  )
}
