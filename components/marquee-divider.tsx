"use client"

const items = ["Mako Marketing", "Digital Growth", "Google Ads", "Meta Ads", "Web Design", "SEO"]

export function MarqueeDivider() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-transparent py-8 md:py-12">
      <div className="marquee-slow flex w-max items-center gap-8 md:gap-12">
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex shrink-0 items-center gap-8 md:gap-12">
            <span
              className={
                i % 2 === 0
                  ? "text-display text-[8vw] leading-none text-near-white/90 md:text-[5.5vw]"
                  : "text-display text-[8vw] leading-none text-transparent md:text-[5.5vw]"
              }
              style={
                i % 2 === 0
                  ? undefined
                  : { WebkitTextStroke: "1px rgba(20,228,254,0.55)" }
              }
            >
              {item}
            </span>
            <span className="size-2.5 shrink-0 rounded-full bg-cyan shadow-[0_0_12px_rgba(20,228,254,0.8)] md:size-3" />
          </div>
        ))}
      </div>
    </section>
  )
}
