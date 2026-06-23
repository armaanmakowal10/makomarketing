import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Target, Gauge, Handshake, LineChart } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Mako Marketing is a digital marketing agency that builds high-performance websites and runs Google Ads, Meta Ads, and SEO for service-based businesses.",
}

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

export default function AboutPage() {
  return (
    <main>
      {/* Intro */}
      <section className="relative overflow-hidden px-5 pt-32 md:px-8 md:pt-44">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 50% at 25% 30%, rgba(20,228,254,0.10), transparent 70%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan">
            About Mako Marketing
          </p>
          <h1 className="text-display mt-4 max-w-4xl text-[clamp(2.25rem,6vw,5rem)] leading-[1.05] text-near-white">
            A growth partner for{" "}
            <span className="text-cyan-gradient">service-based businesses</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Mako Marketing builds the digital platform your business deserves —
            high-performance websites paired with Google Ads, Meta Ads, Local
            Service Ads, and SEO. We help local and service-based businesses turn
            online attention into booked, paying customers, around the clock.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <h2 className="text-display text-[clamp(1.8rem,4vw,3rem)] leading-tight text-near-white">
            We exist to make your phone ring
          </h2>
          <div className="flex flex-col gap-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              Too many great businesses lose customers to competitors with worse
              service but better marketing. We started Mako to close that gap —
              giving owners a digital presence that actually wins the click, earns
              the trust, and books the job.
            </p>
            <p>
              We combine conversion-first web development with disciplined paid
              media and SEO. That means a site engineered to load fast and
              convert, campaigns managed by people who watch the numbers daily,
              and a strategy that scales as you grow.
            </p>
            <p>
              No long lock-ins, no smoke and mirrors — just a focused team
              obsessed with the results that move your business forward.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-line px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-display max-w-3xl text-[clamp(1.8rem,4vw,3rem)] leading-tight text-near-white">
            How we work
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {values.map((v) => {
              const Icon = v.icon
              return (
                <div
                  key={v.title}
                  className="flex flex-col gap-5 rounded-2xl border border-line bg-surface-1/40 p-7 transition-colors hover:border-line-strong md:p-8"
                >
                  <span className="flex size-12 items-center justify-center rounded-xl border border-line-strong bg-cyan/5 text-cyan">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="text-display text-xl text-near-white md:text-2xl">
                    {v.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {v.body}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-line px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-black/50 px-6 py-10 text-center md:px-8 md:py-14"
              >
                <div className="text-display text-[clamp(2.4rem,5vw,3.8rem)] text-white-gradient">
                  {s.value}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 rounded-3xl border border-line-strong bg-surface-1 p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <h2 className="text-display max-w-2xl text-[clamp(1.6rem,3.5vw,2.6rem)] leading-tight text-near-white">
            Ready to turn traffic into paying customers?
          </h2>
          <Link href="/#contact" className="btn-cyan h-12 shrink-0 px-7 text-base">
            Get Started <ArrowUpRight className="size-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}
