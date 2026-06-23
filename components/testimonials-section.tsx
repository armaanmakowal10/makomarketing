import { Quote } from "lucide-react"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal"

const testimonials = [
  {
    quote:
      "Mako Marketing transformed our online presence. We went from invisible to fully booked in under two months.",
    name: "Walker",
    role: "Business Consultant",
  },
  {
    quote:
      "Their SEO strategy doubled our organic traffic. The team truly understands what drives results.",
    name: "Maya Torres",
    role: "Digital Strategist",
  },
  {
    quote:
      "Our new site looks incredible and loads fast. Sign-ups increased by 60% in the first month.",
    name: "Samuel Reed",
    role: "Fitness Studio Owner",
  },
  {
    quote:
      "Professional, responsive, and incredibly talented. My listings page finally converts visitors into leads.",
    name: "Aria Kim",
    role: "Real Estate Advisor",
  },
  {
    quote:
      "Working with Mako was seamless from start to finish. They delivered beyond our expectations.",
    name: "Jason Patel",
    role: "Marketing Director",
  },
  {
    quote:
      "The website they built for my practice is beautiful and brings in new clients every week.",
    name: "Chloe Ramirez",
    role: "Wellness Coach",
  },
]

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-transparent py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan">
            06 / Social Proof
          </p>
          <h2 className="text-display mt-4 max-w-3xl text-[clamp(2rem,5vw,3.6rem)] text-near-white">
            What Our Clients <span className="text-cyan-gradient">Say</span>
          </h2>
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <figure className="flex h-full flex-col justify-between rounded-2xl border border-line bg-surface-1/60 p-7 transition-colors hover:border-line-strong">
                <Quote className="size-7 text-cyan" />
                <blockquote className="mt-5 text-base leading-relaxed text-near-white/90">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6">
                  <div className="text-sm font-semibold text-near-white">
                    {t.name}
                  </div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
