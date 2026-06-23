import Image from "next/image"
import Link from "next/link"

export function SiteHeader() {
  return (
    <Link
      href="/"
      aria-label="Mako Marketing home"
      className="fixed left-5 top-5 z-50 md:left-8 md:top-6"
    >
      <Image
        src="/Mako-Marketing-logo-design.png"
        alt="Mako Marketing"
        width={300}
        height={120}
        priority
        className="h-14 w-auto object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] md:h-20"
      />
    </Link>
  )
}
