"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import Lenis from "lenis"
import { gsap } from "gsap"
import {
  scrollState,
  lenisRef,
  scrollProgressMV,
  scrollYMV,
} from "@/lib/scroll-state"

// Land a deep-link target this many px from the top — just clears the fixed nav
// (~120px) with a little breathing room, so the section header sits right at the
// top of the viewport. Explicit math avoids the CSS scroll-margin / Lenis-offset
// interplay that was leaving sections ~100px too low.
const HEADER_OFFSET = 128

function scrollToHashTarget(el: HTMLElement) {
  const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
  const lenis = lenisRef.current
  if (lenis) lenis.scrollTo(y)
  else window.scrollTo({ top: y, behavior: "smooth" })
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Deep links across routes (e.g. a homepage service card → "/services#web-design").
  // A client-side navigation to a NEW path+hash never fires `hashchange` and doesn't
  // remount this component, so nothing scrolls on its own. Watch the route and scroll
  // to the hash once the target section has mounted (retry while it's still absent).
  useEffect(() => {
    const hash = window.location.hash
    if (!hash || hash === "#") return
    let tries = 0
    let cancelled = false
    const attempt = () => {
      if (cancelled) return
      const el = document.querySelector(hash)
      if (el) {
        scrollToHashTarget(el as HTMLElement)
        return
      }
      if (++tries < 12) setTimeout(attempt, 100)
    }
    // Wait a couple frames so the new route's content is in the DOM and laid out.
    requestAnimationFrame(() => requestAnimationFrame(attempt))
    return () => {
      cancelled = true
    }
  }, [pathname])

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })
    lenisRef.current = lenis

    // ── Back/forward scroll restoration ──────────────────────────────────────
    // scrollRestoration is "manual" (so a reload lands on the hero) and Lenis
    // doesn't restore on its own. Remember each history entry's scroll position
    // and put it back on popstate — so hitting Back after clicking a service
    // bubble lands you exactly where you were.
    const scrollPositions = new Map<string, number>()
    const historyKey = () =>
      (window.history.state && window.history.state.key) || window.location.href

    // Single RAF loop: drive Lenis from GSAP's ticker so scroll-linked motion
    // stays in sync (no 1–2 frame lag).
    lenis.on("scroll", (e: Lenis) => {
      scrollState.y = e.scroll
      scrollState.velocity = e.velocity
      scrollState.progress = e.progress
      scrollProgressMV.set(e.progress)
      scrollYMV.set(e.scroll)
      scrollPositions.set(historyKey(), window.scrollY)
    })

    const onPopState = () => {
      const y = scrollPositions.get(historyKey())
      if (y == null) return
      let tries = 0
      // On Back the page re-renders and isn't at full height yet, so scrolling too
      // early clamps to the current (shorter) max. Wait until the document is tall
      // enough to reach the target (or give up), then hold it there — re-asserting
      // to win over Next's own scroll handling.
      const restore = () => {
        tries++
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        if (maxScroll >= y - 2 || tries >= 25) {
          lenis.scrollTo(y, { immediate: true, force: true })
        }
        if (tries < 30 && Math.abs(window.scrollY - y) > 2) setTimeout(restore, 55)
      }
      requestAnimationFrame(() => requestAnimationFrame(restore))
    }
    window.addEventListener("popstate", onPopState)
    const update = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    // Anchor links scroll smoothly through Lenis.
    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement)?.closest('a[href*="#"]')
      if (!target) return
      const href = target.getAttribute("href") || ""
      const hash = href.includes("#") ? href.slice(href.indexOf("#")) : ""
      // Only intercept same-page anchors (href "#x" or "/#x" while on home).
      const path = href.split("#")[0]
      const samePage = path === "" || path === "/" && window.location.pathname === "/"
      if (!hash || hash === "#" || !samePage) return
      const el = document.querySelector(hash)
      if (el) {
        event.preventDefault()
        scrollToHashTarget(el as HTMLElement)
        // Reflect the section in the URL (bookmarkable) without a native jump —
        // replaceState doesn't fire hashchange, so it won't re-trigger a scroll.
        history.replaceState(null, "", hash)
      }
    }
    document.addEventListener("click", onClick)

    // Cross-page anchors (e.g. "/#contact" clicked from /about-us) are handled by
    // Next's router, not the click handler above. After navigation the URL carries
    // a hash but Lenis + manual scroll restoration means nothing scrolls on its
    // own — so scroll to the target ourselves once the element is in the DOM.
    const scrollToHash = () => {
      const hash = window.location.hash
      if (!hash || hash === "#") return
      const el = document.querySelector(hash)
      if (el) scrollToHashTarget(el as HTMLElement)
    }
    // Retry a few times: on a cold load the intro overlay locks scroll (lenis.stop)
    // and the target section may still be mounting, so a single attempt gets lost.
    const scrollToHashPersistent = () => {
      if (!window.location.hash || window.location.hash === "#") return
      let tries = 0
      const attempt = () => {
        scrollToHash()
        if (++tries < 8) setTimeout(attempt, 150)
      }
      attempt()
    }
    if (window.location.hash) {
      requestAnimationFrame(() => requestAnimationFrame(scrollToHashPersistent))
    }
    window.addEventListener("hashchange", scrollToHash)
    // The intro overlay holds scroll locked while it plays, then fires this event
    // once it clears — re-run the hash scroll so deep links survive the intro.
    window.addEventListener("mako-intro-done", scrollToHashPersistent)

    return () => {
      document.removeEventListener("click", onClick)
      window.removeEventListener("hashchange", scrollToHash)
      window.removeEventListener("mako-intro-done", scrollToHashPersistent)
      window.removeEventListener("popstate", onPopState)
      gsap.ticker.remove(update)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}
