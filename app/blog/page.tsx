import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights and practical guides on Google Ads, Meta Ads, SEO, and web design for service-based businesses — from the Mako Marketing team.",
}

const posts = [
  {
    category: "Google Ads",
    date: "Coming soon",
    title: "5 Google Ads mistakes draining your budget",
    excerpt:
      "The quiet settings and structural slip-ups that quietly burn ad spend — and the quick fixes that put it back to work generating leads.",
    read: "6 min read",
  },
  {
    category: "SEO",
    date: "Coming soon",
    title: "Local SEO: how service businesses win the map pack",
    excerpt:
      "Why the top three local results capture most of the calls, and the concrete steps to earn your spot in them this quarter.",
    read: "8 min read",
  },
  {
    category: "Web Design",
    date: "Coming soon",
    title: "The anatomy of a service site that converts",
    excerpt:
      "From above-the-fold to the contact form — the page elements that turn a curious visitor into a booked appointment.",
    read: "5 min read",
  },
]

export default function BlogPage() {
  return (
    <main>
      {/* Header */}
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
            The Mako Blog
          </p>
          <h1 className="text-display mt-4 max-w-4xl text-[clamp(2.25rem,6vw,5rem)] leading-[1.05] text-near-white">
            Insights to help you <span className="text-cyan-gradient">grow</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Practical guides on paid ads, SEO, and web design for service-based
            businesses. Full articles are on the way — here&rsquo;s what&rsquo;s
            coming first.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.title}
              className="flex h-full flex-col rounded-2xl border border-line bg-surface-1/50 p-7 transition-colors hover:border-line-strong md:p-8"
            >
              <div className="flex items-center gap-3 text-xs uppercase tracking-wider">
                <span className="rounded-full border border-line-strong bg-cyan/5 px-3 py-1 text-cyan">
                  {post.category}
                </span>
                <span className="text-muted-foreground">{post.date}</span>
              </div>
              <h2 className="text-display mt-6 text-2xl leading-snug text-near-white">
                {post.title}
              </h2>
              <p className="mt-4 flex-1 text-base leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
              <span className="mt-6 text-sm text-near-white/40">{post.read}</span>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mx-auto mt-16 flex max-w-7xl flex-col items-start gap-6 rounded-3xl border border-line-strong bg-surface-1 p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <h2 className="text-display max-w-2xl text-[clamp(1.6rem,3.5vw,2.6rem)] leading-tight text-near-white">
            Want results now instead of reading about them?
          </h2>
          <Link href="/#contact" className="btn-cyan h-12 shrink-0 px-7 text-base">
            Get Started <ArrowUpRight className="size-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}
