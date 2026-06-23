import Link from "next/link"
import { ArrowUpRight, Phone } from "lucide-react"

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-32 md:pt-36"
    >
      {/* Static backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-grid bg-grid-fade absolute inset-0 opacity-50" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 40%, rgba(20,228,254,0.10), transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-5 text-center md:px-8">
        <h1 className="text-display text-balance text-[clamp(3rem,9vw,8rem)] leading-[0.95] text-near-white">
          We Develop The <span className="text-cyan-gradient">Platform</span> That
          Represents You
        </h1>

        <p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          End-to-end digital solutions and strategic advertising for
          service-based businesses seeking to expand operational capacity.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link href="#contact" className="btn-cyan h-14 px-8 text-base">
            Get Started <ArrowUpRight className="size-5" />
          </Link>
          <a href="tel:9052605457" className="btn-ghost h-14 px-8 text-base">
            <Phone className="size-4" /> 905-260-5457
          </a>
        </div>
      </div>
    </section>
  )
}
