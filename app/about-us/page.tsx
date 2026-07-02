import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowUpRight,
  Target,
  Gauge,
  Handshake,
  LineChart,
  MonitorSmartphone,
  Search,
  Megaphone,
  MapPin,
  Wrench,
  HeartPulse,
  Scale,
  Home,
  Car,
  Sparkles,
} from "lucide-react"
import { UrgencyPill } from "@/components/urgency-pill"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal"
import { SplitHeading } from "@/components/split-heading"
import { Magnetic } from "@/components/magnetic"
import { AnimatedCounter } from "@/components/animated-counter"
import { AboutHeroVisual } from "@/components/about-hero-visual"
import { AboutFaq } from "@/components/about-faq"

const SITE_URL = "https://www.makomarketing.ca"

export const metadata: Metadata = {
  title: { absolute: "About Us" },
  description:
    "Meet Mako Marketing — an Ontario-based digital marketing agency helping service-based businesses across Canada win more customers with high-performance web design, Google Ads, Meta Ads, Local Service Ads, and SEO.",
  keywords: [
    "about Mako Marketing",
    "digital marketing agency Ontario",
    "marketing agency for service businesses",
    "Google Ads agency Canada",
    "Meta Ads agency",
    "local SEO",
    "web design agency",
    "lead generation agency",
  ],
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: "About Us | Mako Marketing",
    description:
      "An Ontario-based digital marketing agency helping service-based businesses across Canada turn online attention into booked, paying customers.",
    url: `${SITE_URL}/about-us`,
    type: "website",
  },
}

const capabilities = [
  {
    icon: MonitorSmartphone,
    title: "Web Design & Development",
    body: "Fast, mobile-first websites engineered around Core Web Vitals and one job: turning visitors into booked customers.",
  },
  {
    icon: Target,
    title: "Google Ads",
    body: "High-intent Search and Performance Max campaigns that capture people actively looking for what you offer.",
  },
  {
    icon: Megaphone,
    title: "Meta Ads",
    body: "Scroll-stopping Facebook and Instagram creative that turns cold audiences into warm, qualified leads.",
  },
  {
    icon: MapPin,
    title: "Local Service Ads",
    body: "Google Guaranteed placement at the top of local results, where you only pay for real leads.",
  },
  {
    icon: Search,
    title: "SEO",
    body: "Technical, local, and content SEO that compounds — building traffic and trust that you own long term.",
  },
  {
    icon: LineChart,
    title: "Tracking & Reporting",
    body: "Conversion tracking wired end to end, with plain-English reporting tied to revenue, not vanity metrics.",
  },
]

const industries = [
  { icon: Wrench, label: "Home & trade services" },
  { icon: HeartPulse, label: "Health & wellness" },
  { icon: Scale, label: "Legal & professional" },
  { icon: Home, label: "Real estate" },
  { icon: Car, label: "Auto & repair" },
  { icon: Sparkles, label: "Local retail & more" },
]

const values = [
  {
    icon: Target,
    title: "Outcomes, not vanity metrics",
    body: "We measure success in booked jobs and revenue — not impressions. Every campaign ties back to a number that matters to your bottom line.",
  },
  {
    icon: Gauge,
    title: "Performance by default",
    body: "Fast, search-optimized websites and tightly-managed ad accounts. We sweat Core Web Vitals, tracking, and conversion paths so nothing leaks.",
  },
  {
    icon: Handshake,
    title: "Straight talk",
    body: "Clear reporting, clear pricing, and no jargon. You always know what we're doing, why, and what it's returning.",
  },
  {
    icon: LineChart,
    title: "Built to compound",
    body: "We start where the fastest wins are, then reinvest into the channels that prove out — so results grow month over month.",
  },
]

const stats = [
  { value: "100+", label: "Satisfied clients" },
  { value: "24/7", label: "Always-on visibility" },
  { value: "150%", label: "Avg. lead increase" },
  { value: "8+", label: "Years of experience" },
]

const faqs = [
  {
    q: "What kind of businesses do you work with?",
    a: "We specialize in service-based and local businesses — home and trade services, health and wellness, professional services, real estate, auto, and local retail. If your growth depends on a ringing phone and a full calendar, we're built for you.",
  },
  {
    q: "Where is Mako Marketing based and who do you serve?",
    a: "We're based in Ontario and work with service businesses across Canada. Because everything we do is digital and performance-tracked, we can run your web, ads, and SEO no matter where you operate.",
  },
  {
    q: "Do you lock clients into long-term contracts?",
    a: "No. We earn the relationship every month with results and transparent reporting. We cap onboarding at a small number of new clients so every account gets genuine attention.",
  },
  {
    q: "How quickly will I see results?",
    a: "Paid channels like Google and Meta Ads can start driving leads within the first few weeks, while SEO and content compound over months. On your free audit we'll tell you honestly where the fastest wins are for your business.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
}

export default function AboutPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pt-32 md:px-8 md:pt-40">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 55% at 20% 25%, rgba(20,228,254,0.12), transparent 70%)",
          }}
        />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div>
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-cyan">
                About Mako Marketing
              </p>
            </Reveal>
            <h1 className="text-display mt-4 max-w-3xl text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.05] text-near-white">
              <SplitHeading
                text={"A growth partner for\nservice-based businesses"}
                accent={["service-based", "businesses"]}
              />
            </h1>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Mako Marketing is an Ontario-based digital marketing agency
                building the platform your business deserves — high-performance
                websites paired with Google Ads, Meta Ads, Local Service Ads, and
                SEO. We help local and service-based businesses across Canada turn
                online attention into booked, paying customers, around the clock.
              </p>
            </Reveal>

            <StaggerGroup className="mt-7 flex flex-wrap gap-2.5">
              {[
                "Ontario-based",
                "Serving all of Canada",
                "Service-business specialists",
                "Performance-first",
              ].map((chip) => (
                <StaggerItem key={chip}>
                  <span className="inline-block rounded-full border border-cyan/30 bg-cyan/[0.06] px-3.5 py-1.5 text-sm text-near-white/85">
                    {chip}
                  </span>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <Reveal delay={0.1} className="mt-9">
              <Magnetic strength={0.3}>
                <Link href="/free-audit" className="btn-cyan h-14 px-8 text-base">
                  Get a Free Audit <ArrowUpRight className="size-5" />
                </Link>
              </Magnetic>
            </Reveal>
          </div>

          {/* Animated hero visual — fills the right side on desktop */}
          <div className="hidden lg:block">
            <AboutHeroVisual />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <span className="inline-block h-1 w-12 rounded-full bg-gradient-to-r from-cyan to-transparent" />
              <h2 className="text-display mt-5 text-[clamp(1.8rem,4vw,3rem)] leading-tight text-near-white">
                We exist to make your phone ring
              </h2>
            </div>
          </Reveal>
          <StaggerGroup className="flex flex-col gap-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {[
              "Too many great businesses lose customers to competitors with worse service but better marketing. We started Mako to close that gap — giving owners a digital presence that actually wins the click, earns the trust, and books the job.",
              "We combine conversion-first web development with disciplined paid media and SEO. That means a site engineered to load fast and convert, campaigns managed by people who watch the numbers daily, and a strategy that scales as you grow.",
              "Everything is measured. Every dollar of ad spend is tracked to a lead, every lead to a booked job, and every report written in plain English you can actually act on — no dashboards full of metrics that don't pay the bills.",
              "No long lock-ins, no smoke and mirrors — just a focused team obsessed with the results that move your business forward.",
            ].map((p, i) => (
              <StaggerItem key={i}>
                <p className="border-l-2 border-line pl-5 transition-colors hover:border-cyan/50">
                  {p}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* What we do */}
      <section className="border-t border-line px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan">
              What we do
            </p>
            <h2 className="text-display mt-4 max-w-3xl text-[clamp(1.8rem,4vw,3rem)] leading-tight text-near-white">
              One team across web, paid &amp; organic
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Each channel is engineered to work together and grow your revenue,
              never to compete for the same budget.
            </p>
          </Reveal>
          <StaggerGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => {
              const Icon = c.icon
              return (
                <StaggerItem key={c.title}>
                  <div className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-line bg-surface-1/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40">
                    <span className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-cyan/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="flex size-11 items-center justify-center rounded-xl border border-line-strong bg-cyan/5 text-cyan transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan group-hover:text-black">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="text-display text-lg text-near-white md:text-xl">
                      {c.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                      {c.body}
                    </p>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerGroup>
          <Reveal delay={0.05}>
            <Link
              href="/services"
              className="group mt-9 inline-flex items-center gap-2 text-sm font-medium text-near-white transition-colors hover:text-cyan"
            >
              Explore our services in detail
              <span className="flex size-8 items-center justify-center rounded-full border border-line-strong text-cyan transition-all group-hover:translate-x-0.5 group-hover:bg-cyan group-hover:text-black">
                <ArrowUpRight className="size-4" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Who we work with */}
      <section className="border-t border-line px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-cyan">
                Who we work with
              </p>
              <h2 className="text-display mt-4 text-[clamp(1.8rem,4vw,3rem)] leading-tight text-near-white">
                Built for local &amp; service-based businesses
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                If your customers find you online and book by phone or form, we
                know how to fill your calendar.
              </p>
            </Reveal>
            <StaggerGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {industries.map((ind) => {
                const Icon = ind.icon
                return (
                  <StaggerItem key={ind.label}>
                    <div className="group flex h-full items-center gap-3 rounded-2xl border border-line bg-surface-1/40 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 md:flex-col md:items-start md:gap-4 md:p-5">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-cyan/5 text-cyan transition-colors group-hover:bg-cyan group-hover:text-black">
                        <Icon className="size-5" />
                      </span>
                      <span className="text-sm font-medium text-near-white/90">
                        {ind.label}
                      </span>
                    </div>
                  </StaggerItem>
                )
              })}
            </StaggerGroup>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="border-t border-line px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan">
              How we work
            </p>
            <h2 className="text-display mt-4 max-w-3xl text-[clamp(1.8rem,4vw,3rem)] leading-tight text-near-white">
              Principles behind every campaign
            </h2>
          </Reveal>
          <StaggerGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {values.map((v) => {
              const Icon = v.icon
              return (
                <StaggerItem key={v.title}>
                  <div className="group flex h-full flex-col gap-4 rounded-2xl border border-line bg-surface-1/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 md:p-7">
                    <span className="flex size-12 items-center justify-center rounded-xl border border-line-strong bg-cyan/5 text-cyan transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan group-hover:text-black">
                      <Icon className="size-6" />
                    </span>
                    <h3 className="text-display text-xl text-near-white md:text-2xl">
                      {v.title}
                    </h3>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {v.body}
                    </p>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-line px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <StaggerGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {stats.map((s) => (
              <StaggerItem
                key={s.label}
                className="group bg-black/50 px-6 py-10 text-center transition-colors hover:bg-cyan/[0.04] md:px-8 md:py-14"
              >
                <div className="text-display text-[clamp(2.4rem,5vw,3.8rem)] text-white-gradient">
                  <AnimatedCounter value={s.value} />
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {s.label}
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan">
              Common questions
            </p>
            <h2 className="text-display mt-4 text-[clamp(1.8rem,4vw,3rem)] leading-tight text-near-white">
              Good to know
            </h2>
          </Reveal>
          <AboutFaq faqs={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line px-5 py-16 md:px-8 md:py-24">
        <Reveal className="mx-auto max-w-7xl">
          <div className="relative flex flex-col items-start gap-6 overflow-hidden rounded-3xl border border-line-strong bg-surface-1 p-8 md:flex-row md:items-center md:justify-between md:p-12">
            <div className="pointer-events-none absolute -left-20 -top-20 size-64 rounded-full bg-cyan/10 blur-3xl" />
            <h2 className="text-display relative max-w-2xl text-[clamp(1.6rem,3.5vw,2.6rem)] leading-tight text-near-white">
              Ready to turn traffic into paying customers?
            </h2>
            <div className="relative flex shrink-0 flex-col items-start gap-3">
              <UrgencyPill />
              <Magnetic strength={0.3}>
                <Link href="/free-audit" className="btn-cyan h-12 px-7 text-base">
                  Get Started <ArrowUpRight className="size-5" />
                </Link>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
