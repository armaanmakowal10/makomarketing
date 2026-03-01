"use client"

import { useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
import { ArrowRight } from "lucide-react"

const services = [
  {
    title: "Google Ads",
    description:
      "Targeted Google Ads campaigns that put your business in front of the right customers. Maximize your ROI with data-driven ad strategies.",
    link: "#contact",
  },
  {
    title: "Meta Ads",
    description:
      "Reach your ideal audience on Facebook and Instagram with compelling ad campaigns. Drive engagement, leads, and sales through social advertising.",
    link: "#contact",
  },
  {
    title: "Web Development",
    description:
      "Fast, trusted, search-optimized websites that convert online interest into customers. Built with modern frameworks for maximum performance.",
    link: "#contact",
  },
  {
    title: "Google SEO",
    description:
      "Boost your Google rankings and drive consistent organic traffic. Data-driven strategies that deliver measurable results.",
    link: "#contact",
  },
]

export function Services() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref)

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Grid pattern background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Blue gradient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[5%] top-[10%] h-[60%] w-[40%] rounded-full opacity-40 blur-[100px]"
          style={{
            background:
              "radial-gradient(ellipse at center, #0066ff 0%, #0033aa 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute right-[10%] top-[20%] h-[50%] w-[30%] rounded-full opacity-30 blur-[80px]"
          style={{
            background:
              "radial-gradient(ellipse at center, #38bdf8 0%, #0ea5e9 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[5%] left-[40%] h-[40%] w-[35%] rounded-full opacity-35 blur-[90px]"
          style={{
            background:
              "radial-gradient(ellipse at center, #1d4ed8 0%, #1e3a8a 40%, transparent 70%)",
          }}
        />
      </div>

      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-7xl transition-all duration-700 ${
          isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Section heading row */}
        <div className="border-t border-border px-10 py-16 text-center md:px-12 md:py-20">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            What we do.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Everything your business needs to grow online.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {services.map((service, i) => (
            <a
              key={service.title}
              href={service.link}
              className={`group flex flex-col border-t border-border px-10 py-14 transition-colors hover:bg-[#0a0a0a] md:px-12 md:py-16 ${
                i % 2 === 0 ? "md:border-r" : ""
              }`}
            >
              <h3 className="text-2xl font-bold text-foreground">
                {service.title}
              </h3>
              <p className="mt-3 max-w-[340px] text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <div className="mt-auto pt-10">
                <div className="flex size-11 items-center justify-center rounded-full border border-border transition-colors group-hover:border-foreground/30">
                  <ArrowRight className="size-4 text-foreground" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
