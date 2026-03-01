"use client"

import { useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
import { ArrowRight } from "lucide-react"

const services = [
  {
    title: "Landing Pages",
    description:
      "High-converting pages designed to capture leads and drive bookings. Every element tested to maximize your ad spend.",
    image: "/landing_page.png",
  },
  {
    title: "SEO & Rankings",
    description:
      "Get found on Google when customers search for your services. On-page optimization, local SEO, and keyword strategy that compounds over time.",
    image: "/seo.png",
  },
  {
    title: "Speed & Performance",
    description:
      "Sub-second load times that reduce bounce rates and boost conversions. Google rewards fast sites with higher rankings.",
    image: "/speed.png",
  },
  {
    title: "Analytics & Tracking",
    description:
      "Know exactly where your leads come from. Conversion tracking, heatmaps, and monthly reports so you can see your ROI.",
    image: "/analytics.png",
  },
  {
    title: "Ongoing Optimization",
    description:
      "We don\u2019t launch and disappear. A/B testing, content updates, and technical maintenance to keep your numbers climbing.",
    image: "/ong_opt.png",
  },
]

export function Portfolio() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref)

  return (
    <section id="portfolio" className="relative overflow-hidden bg-background">
      {/* Blue gradient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[5%] top-[15%] h-[50%] w-[35%] rounded-full opacity-25 blur-[120px]"
          style={{
            background: "radial-gradient(ellipse at center, #0066ff 0%, #0033aa 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute right-[10%] top-[10%] h-[45%] w-[30%] rounded-full opacity-20 blur-[100px]"
          style={{
            background: "radial-gradient(ellipse at center, #38bdf8 0%, #0ea5e9 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[10%] left-[30%] h-[40%] w-[40%] rounded-full opacity-20 blur-[110px]"
          style={{
            background: "radial-gradient(ellipse at center, #1d4ed8 0%, #1e3a8a 40%, transparent 70%)",
          }}
        />
      </div>

      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-7xl transition-all duration-700 ${
          isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Top border line */}
        <div className="border-t border-border" />

        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Intro cell */}
          <div className="flex flex-col justify-center border-b border-border px-10 py-14 md:border-r md:px-12 md:py-16">
            <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl md:leading-[1.1]">
              Results,
              <br />
              delivered.
            </h2>
            <p className="mt-6 max-w-[260px] text-sm leading-relaxed text-muted-foreground">
              More traffic, more leads, more revenue. Everything we build is designed to grow your business.
            </p>
          </div>

          {/* Service 1 */}
          <a
            href="#contact"
            className="group flex flex-col border-b border-border px-10 pt-14 transition-colors hover:bg-[#0a0a0a] md:border-r md:px-12 md:pt-16"
          >
            <h3 className="text-2xl font-bold text-foreground">
              {services[0].title}
            </h3>
            <p className="mt-3 max-w-[280px] text-sm leading-relaxed text-muted-foreground">
              {services[0].description}
            </p>
            <div className="pt-8">
              <div className="flex size-11 items-center justify-center rounded-full border border-border transition-colors group-hover:border-foreground/30">
                <ArrowRight className="size-4 text-foreground" />
              </div>
            </div>
            <div className="mt-auto flex max-h-[100px] justify-center overflow-hidden">
              <img
                src={services[0].image}
                alt={services[0].title}
                className="mb-[-30px] w-[160px] rounded-t-lg"
              />
            </div>
          </a>

          {/* Service 2 */}
          <a
            href="#contact"
            className="group flex flex-col border-b border-border px-10 pt-14 transition-colors hover:bg-[#0a0a0a] md:px-12 md:pt-16"
          >
            <h3 className="text-2xl font-bold text-foreground">
              {services[1].title}
            </h3>
            <p className="mt-3 max-w-[280px] text-sm leading-relaxed text-muted-foreground">
              {services[1].description}
            </p>
            <div className="pt-8">
              <div className="flex size-11 items-center justify-center rounded-full border border-border transition-colors group-hover:border-foreground/30">
                <ArrowRight className="size-4 text-foreground" />
              </div>
            </div>
            <div className="mt-auto flex max-h-[100px] justify-center overflow-hidden">
              <img
                src={services[1].image}
                alt={services[1].title}
                className="mb-[-30px] h-[130px] w-[120px] rounded-t-lg"
              />
            </div>
          </a>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {services.slice(2).map((item, i) => (
            <a
              key={item.title}
              href="#contact"
              className={`group flex flex-col border-b border-border px-10 pt-14 transition-colors hover:bg-[#0a0a0a] md:px-12 md:pt-16 ${
                i < 2 ? "md:border-r" : ""
              }`}
            >
              <h3 className="text-2xl font-bold text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 max-w-[280px] text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              <div className="pt-8">
                <div className="flex size-11 items-center justify-center rounded-full border border-border transition-colors group-hover:border-foreground/30">
                  <ArrowRight className="size-4 text-foreground" />
                </div>
              </div>
              <div className="mt-auto flex max-h-[100px] justify-center overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="mb-[-30px] w-[160px] rounded-t-lg"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
