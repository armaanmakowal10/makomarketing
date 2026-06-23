import { Star } from "lucide-react"

export function ProofBar() {
  return (
    <section className="relative border-y border-line bg-black/30 py-5 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-5 text-center sm:flex-row sm:gap-3 md:px-8">
        <span className="flex gap-0.5 text-cyan" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-4 fill-cyan" />
          ))}
        </span>
        <span className="text-sm tracking-wide text-near-white/80">
          Trusted by 100+ service businesses across Canada
        </span>
      </div>
    </section>
  )
}
