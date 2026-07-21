import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { blogPosts, getPostBySlug } from "@/content/blog-posts"
import { UrgencyPill } from "@/components/urgency-pill"

const SITE_URL = "https://www.makomarketing.ca"

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const url = `${SITE_URL}/blog/${post.slug}`
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const url = `${SITE_URL}/blog/${post.slug}`

  // Related articles — same category first, then most recent. Internal links
  // help both readers and crawlers move between topically related posts.
  const related = [...blogPosts]
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const aCat = a.category === post.category ? 1 : 0
      const bCat = b.category === post.category ? 1 : 0
      return bCat - aCat || b.date.localeCompare(a.date)
    })
    .slice(0, 3)

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    keywords: post.keywords.join(", "),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: "Mako Marketing" },
    publisher: {
      "@type": "Organization",
      name: "Mako Marketing",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/Mako-Marketing-logo-design.png`,
      },
    },
  }

  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-5 pb-24 pt-32 md:px-8 md:pb-32 md:pt-40">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-cyan"
        >
          <ArrowLeft className="size-3.5" />
          All articles
        </Link>

        {/* Header */}
        <div className="mt-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider">
          <span className="rounded-full border border-line-strong bg-cyan/5 px-3 py-1 text-cyan">
            {post.category}
          </span>
          <span className="text-muted-foreground">{formatDate(post.date)}</span>
          <span className="text-near-white/40">{post.readMinutes} min read</span>
        </div>

        <h1 className="text-display mt-5 text-[clamp(2rem,4.8vw,3.25rem)] leading-[1.1] text-near-white">
          {post.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>

        <div className="mt-10 h-px w-full bg-line" />

        {/* Body */}
        <div className="mt-10 space-y-6">
          {post.body.map((block, i) => {
            if ("h2" in block) {
              return (
                <h2
                  key={i}
                  className="text-display pt-4 text-2xl leading-snug text-near-white md:text-[1.7rem]"
                >
                  {block.h2}
                </h2>
              )
            }
            if ("h3" in block) {
              return (
                <h3
                  key={i}
                  className="text-display pt-2 text-xl text-near-white"
                >
                  {block.h3}
                </h3>
              )
            }
            if ("ul" in block) {
              return (
                <ul key={i} className="flex flex-col gap-3">
                  {block.ul.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[15px] leading-relaxed text-near-white/80 md:text-base"
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )
            }
            return (
              <p
                key={i}
                className="text-[15px] leading-relaxed text-near-white/80 md:text-base"
              >
                {block.p}
              </p>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col items-start gap-5 rounded-3xl border border-cyan/25 bg-gradient-to-br from-cyan/[0.07] to-surface-1/20 p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <h2 className="text-display text-xl leading-snug text-near-white md:text-2xl">
              Want this done for your business?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              Book a free audit and we will show you exactly where your growth is
              hiding.
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-3">
            <UrgencyPill />
            <Link
              href="/free-audit"
              className="btn-cyan h-12 px-8 text-sm uppercase tracking-[0.1em]"
            >
              Get a Free Audit <ArrowUpRight className="size-5" />
            </Link>
          </div>
        </div>

        {/* Related articles — internal links between topically close posts */}
        <div className="mt-16">
          <h2 className="text-display text-xl text-near-white md:text-2xl">
            Keep reading
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-surface-1/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40"
              >
                <span className="self-start rounded-full border border-line-strong bg-cyan/5 px-2.5 py-1 text-[10px] uppercase tracking-wider text-cyan">
                  {r.category}
                </span>
                <span className="text-display mt-4 flex-1 text-base leading-snug text-near-white transition-colors group-hover:text-cyan">
                  {r.title}
                </span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-near-white/60 transition-colors group-hover:text-cyan">
                  Read article
                  <ArrowUpRight className="size-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </main>
  )
}
