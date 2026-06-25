import { HeroSection } from "@/components/hero-section"
import { ScrollRegion } from "@/components/scroll-region"
import { ResultsSection } from "@/components/results-section"
import { WhySpecialSection } from "@/components/why-special-section"
import { ServicesBrief } from "@/components/services-brief"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"

export default function Page() {
  return (
    <main>
      <HeroSection />
      <ScrollRegion>
        <ResultsSection />
        <WhySpecialSection />
        <ServicesBrief />
        <AboutSection />
        <ContactSection />
      </ScrollRegion>
    </main>
  )
}
