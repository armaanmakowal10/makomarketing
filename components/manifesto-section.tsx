const TEXT =
  "We build digital platforms that turn attention into revenue. Engineered to rank, designed to convert, and built to scale your business around the clock."

// Words rendered in cyan for emphasis.
const ACCENT = new Set(["revenue.", "rank,", "convert,", "scale"])

const words = TEXT.split(" ")

export function ManifestoSection() {
  return (
    <section className="relative bg-transparent py-[16vh] md:py-[22vh]">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <p className="mb-10 text-xs uppercase tracking-[0.3em] text-cyan">
          / The Mako Difference
        </p>
        <p className="text-display text-[clamp(1.8rem,5.2vw,4rem)] leading-[1.15] text-near-white">
          {words.map((word, i) => (
            <span key={i} className={ACCENT.has(word) ? "text-cyan" : undefined}>
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
