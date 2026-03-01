"use client"

import { useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How long does it take to design a website?",
    answer:
      "Most projects are completed within approximately 2 weeks, depending on the scope and complexity. We work efficiently without sacrificing quality, keeping you updated at every stage of the process.",
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer:
      "Yes, maintenance and support are included. We offer ongoing technical support, content updates, and performance monitoring to ensure your site stays fast, secure, and up-to-date.",
  },
  {
    question: "Can you improve my existing website?",
    answer:
      "Absolutely. We specialize in redesigns and optimizations. Whether it is a visual refresh, speed improvements, or SEO enhancements, we can audit your current site and implement targeted upgrades.",
  },
  {
    question: "Will my website be mobile-friendly?",
    answer:
      "Yes, every website we build is fully responsive and optimized for all devices — from smartphones and tablets to desktop screens. Mobile-first design is a core part of our development process.",
  },
]

export function FAQ() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref)

  return (
    <section className="bg-background">
      <div
        ref={ref}
        className={`mx-auto max-w-7xl transition-all duration-700 ${
          isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="grid grid-cols-1 border-t border-border md:grid-cols-2">
          {/* Left: heading */}
          <div className="border-b border-border px-10 py-14 md:border-b-0 md:border-r md:px-12 md:py-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl md:leading-[1.15]">
              Frequently asked
              <br />
              questions.
            </h2>
            <p className="mt-4 max-w-[300px] text-sm leading-relaxed text-muted-foreground">
              Everything you need to know before getting started.
            </p>
          </div>

          {/* Right: accordion */}
          <div className="px-10 py-14 md:px-12 md:py-16">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-border"
                >
                  <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
