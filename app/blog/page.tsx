import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { blogPosts } from "@/content/blog-posts"
import { UrgencyPill } from "@/components/urgency-pill"

const SITE_URL = "https://www.makomarketing.ca"

export const metadata: Metadata = {
  title: "Blog | Marketing Guides for Service Businesses",
  description:
    "Practical guides on Google Ads, Meta Ads, local SEO, Local Service Ads, lead follow-up, and web design for service-based businesses, from the Mako Marketing team.",
  keywords: [
    "marketing blog for service businesses",
    "Google Ads guides",
    "local SEO tips",
    "Meta Ads guides",
    "lead generation tips",
    "contractor marketing",
  ],
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    title: "The Mako Marketing Blog | Guides for Service Businesses",
    description:
      "Practical, no fluff guides on paid ads, SEO, and web design for service-based businesses.",
  },
}

// Blog + ItemList structured data — helps search engines understand the blog
// as a collection and index every article from the listing page.
const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${SITE_URL}/blog`,
  name: "The Mako Marketing Blog",
  description:
    "Practical guides on Google Ads, Meta Ads, local SEO, and web design for service-based businesses.",
  url: `${SITE_URL}/blog`,
  publisher: { "@type": "Organization", name: "Mako Marketing", url: SITE_URL },
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.date,
    articleSection: post.category,
  })),
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export default function BlogPage() {
  const posts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
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
            Practical, no fluff guides on paid ads, SEO, and web design for
            service-based businesses. Real strategies you can act on today.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-line bg-surface-1/50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:bg-surface-1/70 md:p-8"
            >
              <div className="flex items-center gap-3 text-xs uppercase tracking-wider">
                <span className="rounded-full border border-line-strong bg-cyan/5 px-3 py-1 text-cyan">
                  {post.category}
                </span>
                <span className="text-muted-foreground">
                  {formatDate(post.date)}
                </span>
              </div>
              <h2 className="text-display mt-6 text-2xl leading-snug text-near-white transition-colors group-hover:text-cyan">
                {post.title}
              </h2>
              <p className="mt-4 flex-1 text-base leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-near-white/60 transition-colors group-hover:text-cyan">
                Read article
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mx-auto mt-16 flex max-w-7xl flex-col items-start gap-6 rounded-3xl border border-line-strong bg-surface-1 p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <h2 className="text-display max-w-2xl text-[clamp(1.6rem,3.5vw,2.6rem)] leading-tight text-near-white">
            Want results now instead of reading about them?
          </h2>
          <div className="flex shrink-0 flex-col items-start gap-3">
            <UrgencyPill />
            <Link
              href="/free-audit"
              className="btn-cyan h-12 px-7 text-base"
            >
              Get Started <ArrowUpRight className="size-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
