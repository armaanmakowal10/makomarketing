# Motion & Animation System — Mako Marketing

The site pairs **Lenis** smooth scroll + **GSAP** (ticker/ScrollTrigger sync) with a
**React Three Fiber** WebGL background and **Framer Motion** for in-view reveals.
Everything respects `prefers-reduced-motion` and is gated for mobile performance.

## Foundation

| Concern | File | Notes / how to tune |
| --- | --- | --- |
| Smooth scroll + RAF sync | [`components/smooth-scroll.tsx`](components/smooth-scroll.tsx) | Lenis driven by GSAP's ticker on ONE RAF loop (`gsap.ticker.add(t => lenis.raf(t*1000))`, `lagSmoothing(0)`). Updates the shared scroll store and fires `ScrollTrigger.update()`. Bails out entirely under reduced-motion. Tune `duration` (1.1s) / `easing`. |
| Shared scroll store | [`lib/scroll-state.ts`](lib/scroll-state.ts) | Mutable `{ y, velocity, progress }` updated by Lenis, read by the background each frame (no React re-renders). Also holds `lenisRef` so "Back to top" can call `lenis.scrollTo(0)`. |
| Animated background | [`components/animated-background.tsx`](components/animated-background.tsx) | R3F particle current (~3800 cyan points). Scroll **velocity** speeds up + stretches the flow; scroll **progress** drifts it; pointer adds parallax. Fixed full-viewport at `-z-10` with a vignette. **Disabled on mobile (≤768px) and reduced-motion** → static cyan-gradient fallback, no WebGL. Tune `COUNT`, `size`, `opacity`, drift constants in `useFrame`. |
| Scroll progress bar | [`components/scroll-progress.tsx`](components/scroll-progress.tsx) | Cyan 2px top bar; `scaleX` from `useScroll` + spring. |

## Reusable primitives

| Primitive | File | Purpose |
| --- | --- | --- |
| `Reveal` | [`components/reveal.tsx`](components/reveal.tsx) | Fade + upward translate on scroll-into-view (`once`). Props `delay`, `y`, `as`. |
| `StaggerGroup` / `StaggerItem` | [`components/reveal.tsx`](components/reveal.tsx) | Staggered grid/list reveals (`staggerChildren` 0.09s). |
| `SplitHeading` | [`components/split-heading.tsx`](components/split-heading.tsx) | Word-by-word heading reveal (blur-to-focus). `accent` tokens render in cyan. Used in the hero + final CTA. |
| `Magnetic` | [`components/magnetic.tsx`](components/magnetic.tsx) | Pointer-follow translate for CTAs. Prop `strength` (0.2–0.4). |
| `AnimatedCounter` | [`components/animated-counter.tsx`](components/animated-counter.tsx) | Count-up on scroll-in; handles prefix (`+187%`), decimals (`4.2x`), suffixes. |

## Section choreography (page order)

| # | Section | Effect | File |
| --- | --- | --- | --- |
| — | Header | Logo only, fixed top-left (no nav bar) | [`site-header.tsx`](components/site-header.tsx) |
| 1 | Hero | `SplitHeading` word reveal; staggered subhead/CTA; magnetic CTA; star trust strip | [`hero-section.tsx`](components/hero-section.tsx) |
| 2 | Proof bar | Slim credibility band (stars + trust line) | [`proof-bar.tsx`](components/proof-bar.tsx) |
| 3 | Services | Benefit-led headlines; staggered cards; cursor-follow spotlight; soft CTA each | [`services-section.tsx`](components/services-section.tsx) |
| 4 | Results | Count-ups on scroll; "sample results" disclaimer kept | [`results-section.tsx`](components/results-section.tsx) |
| 5 | Selected Work | `clip-path` image wipe on scroll; cyan hover overlay with name/role | [`work-section.tsx`](components/work-section.tsx) |
| 6 | Process | Vertical line "draws" (`scaleY` spring) as you scroll; steps reveal | [`process-section.tsx`](components/process-section.tsx) |
| 7 | Testimonials | Two opposite marquee rows, pause-on-hover, border-glow. **TODO placeholder slots** for real reviews | [`testimonials-section.tsx`](components/testimonials-section.tsx) |
| 8 | Who We Serve | Staggered grid; cyan underline-sweep on hover | [`industries-section.tsx`](components/industries-section.tsx) |
| 9 | Final CTA | `SplitHeading` heading; per-field stagger; form untouched | [`contact-section.tsx`](components/contact-section.tsx) |
| — | Footer | Staggered columns; parallax "MAKO MARKETING" wordmark; Back-to-top → `lenis.scrollTo(0)` | [`site-footer.tsx`](components/site-footer.tsx) + [`footer-wordmark.tsx`](components/footer-wordmark.tsx) |

## TODO before launch
- **Testimonials**: replace the `[ Paste real client review ]` placeholder slots in
  `testimonials-section.tsx` with real reviews (one-line edit per card).
- **Results**: the figures are samples — swap in real client numbers and remove the
  "sample results" disclaimer once supplied.

## Tuning cheatsheet
- Global easing/durations: `--ease*` / `--dur*` in [`app/globals.css`](app/globals.css).
- Background intensity: `COUNT` / `size` / `opacity` + drift constants in `animated-background.tsx`.
- Marquee speed: `.marquee` (38s) / `.marquee-slow` (60s) in `globals.css`.
- Reveal distance/speed: `y` + `transition` in `reveal.tsx`.
