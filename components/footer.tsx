import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 border-t border-border sm:grid-cols-3">
          <div className="border-b border-border px-10 py-10 sm:border-b-0 sm:border-r md:px-12 md:py-12">
            <Link href="#home" className="text-sm font-bold text-foreground">
              Mako Marketing
            </Link>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Turning Traffic Into Paying Customers.
            </p>
          </div>

          <div className="border-b border-border px-10 py-10 sm:border-b-0 sm:border-r md:px-12 md:py-12">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Products
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <Link
                  href="#contact"
                  className="text-sm text-foreground transition-colors hover:text-muted-foreground"
                >
                  Web Design
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-sm text-foreground transition-colors hover:text-muted-foreground"
                >
                  Google SEO
                </Link>
              </li>
            </ul>
          </div>

          <div className="px-10 py-10 md:px-12 md:py-12">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Contact
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li className="text-sm text-foreground">North America</li>
              <li>
                <a
                  href="mailto:makomarketing0@gmail.com"
                  className="text-sm text-foreground transition-colors hover:text-muted-foreground"
                >
                  makomarketing0@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border px-10 py-8 text-center md:px-12">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 Mako Marketing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
