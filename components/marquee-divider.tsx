const items = [
  "Mako Marketing",
  "Digital Growth",
  "Google Ads",
  "Meta Ads",
  "Web Design",
  "SEO",
]

export function MarqueeDivider() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-transparent py-10 md:py-14">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-4 px-5 md:gap-x-10 md:px-8">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-6 md:gap-10">
            <span className="text-display text-[clamp(1.1rem,3vw,2rem)] leading-none text-near-white/90">
              {item}
            </span>
            {i < items.length - 1 && (
              <span className="size-2 rounded-full bg-cyan md:size-2.5" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
