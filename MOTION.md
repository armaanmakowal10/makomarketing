# Motion & UI System — Mako Marketing

This site's motion layer is built on **Lenis** (smooth scroll) + **Framer Motion**
(`framer-motion`, scroll/inview/spring animations) + two hand-rolled **2D canvas**
backdrops. GSAP and Three.js are intentionally **not** used — Framer Motion + canvas
cover the same choreography at a fraction of the bundle size and complexity.

All animation honours `prefers-reduced-motion` and animates only `transform`,
`opacity`, `color`, and `clip-path` (compositor-friendly — no layout thrash).

---

## Foundation

| Concern | Where | Notes / how to tune |
| --- | --- | --- |
| Smooth scroll | [`components/smooth-scroll.tsx`](components/smooth-scroll.tsx) | Lenis on its own RAF loop. Bails out entirely under reduced-motion. Anchor links (`#id`) are intercepted and routed through `lenis.scrollTo` with an `-80px` offset. Tune feel via `duration` (1.1s) and `easing`. |
| Scroll progress bar | [`components/scroll-progress.tsx`](components/scroll-progress.tsx) | Cyan 2px top bar; `scaleX` driven by `useScroll` + `useSpring`. Tune `stiffness`/`damping`. |
| Global backdrop | [`components/site-backdrop.tsx`](components/site-backdrop.tsx) | Fixed full-page cyan particle constellation reacting to cursor + scroll velocity. **Mobile**: fewer particles, link pass + shadow blur skipped (see `mobile` flag). Tune `LINK_DIST`, particle `count`. |
| Hero backdrop | [`components/fluid-backdrop.tsx`](components/fluid-backdrop.tsx) | Low-res canvas plasma + CSS blur. **Disabled on mobile / reduced-motion** (static CSS gradient fallback, no RAF). RAF **pauses when the hero scrolls off-screen** (IntersectionObserver). Tune `SCALE`, blob `hue`/`r`. |
| Design tokens / easings | [`app/globals.css`](app/globals.css) | `--ease` / `--ease-out` cubic-beziers, `--dur-fast/dur/dur-slow`. Film grain (`.grain`), grid (`.bg-grid`), glows (`.glow-cyan`, `.text-glow`), marquee keyframes, button styles live here. |

### Reusable primitives

| Primitive | File | Purpose |
| --- | --- | --- |
| `Reveal` | [`components/reveal.tsx`](components/reveal.tsx) | Fade + upward translate on scroll-into-view (`whileInView`, `once`). Props: `delay`, `y`, `as`. |
| `StaggerGroup` / `StaggerItem` | [`components/reveal.tsx`](components/reveal.tsx) | Container + child for staggered grid/list reveals. Tune `staggerChildren` (0.09s). |
| `Magnetic` | [`components/magnetic.tsx`](components/magnetic.tsx) | Pointer-follow translate for CTAs. Prop `strength` (0.2–0.4). Disabled under reduced-motion. |
| `AnimatedCounter` | [`components/animated-counter.tsx`](components/animated-counter.tsx) | Counts a numeric value up on scroll-in. Handles a leading prefix (`+187%`), decimals (`4.2x`), and suffixes (`%`, `+`, `/7`). Non-numeric values render as-is. Prop `duration` (1600ms). |

The shared easing across the site is `[0.16, 1, 0.3, 1]` (exported as `EASE` in
several components). Durations sit in the 0.4–0.9s band; stagger 0.05–0.12s.

---

## Section choreography

| Section | File | Effect | Powered by |
| --- | --- | --- | --- |
| Navbar | [`site-header.tsx`](components/site-header.tsx) | Transparent over hero → frosted black bar (`backdrop-blur` + border) once scrolled past 85% of the viewport. `Get Started` is `Magnetic` + cyan glow. | scroll listener + CSS transition; Framer for the full-screen menu |
| Hero | [`hero-section.tsx`](components/hero-section.tsx) | Word-by-word headline rise (overflow-clip), staggered subhead/CTA, scroll parallax + fade. | Framer (`useScroll`/`useTransform`, per-word springs) |
| Manifesto | [`manifesto-section.tsx`](components/manifesto-section.tsx) | Scrubbed word reveal grey→white; accent words (`revenue/rank/convert/scale`) hit cyan. Tune via `offset`. | Framer scroll-scrub |
| Services | [`services-section.tsx`](components/services-section.tsx) | Sticky stacking cards that scale down as the next arrives; cursor-follow spotlight, ±5° tilt, border intensifies on hover; index label brightens grey→cyan as each card is reached. | Framer (`useTransform`, `useSpring`) |
| Industries | [`industries-section.tsx`](components/industries-section.tsx) | Staggered tile reveal; per-tile cursor spotlight + lift on hover. | `StaggerGroup` + CSS |
| Results | [`results-section.tsx`](components/results-section.tsx) | Count-up on both the case metrics (4.2x / +187% / 62%) and the stat tiles. Disclaimer kept static. | `AnimatedCounter` |
| Marquee | [`marquee-divider.tsx`](components/marquee-divider.tsx) | Infinite horizontal scroll. Tune speed via `.marquee` / `.marquee-slow` durations in `globals.css`. | CSS keyframes |
| Selected Work | [`work-section.tsx`](components/work-section.tsx) | Image `clip-path` wipe-in on scroll; hover scale + cyan overlay + slide-up label. Desktop: horizontal scroll track; mobile: snap carousel. Links untouched. | Framer (`clip-path`, `useScroll` x-track) |
| Process | [`process-section.tsx`](components/process-section.tsx) | Vertical connector line "draws" (`scaleY` spring) as you scroll; steps reveal in sequence. Tune `offset` / spring. | Framer (`useScroll` + `useSpring`) |
| Testimonials | [`testimonials-section.tsx`](components/testimonials-section.tsx) | Two marquee rows in opposite directions, pause-on-hover. | CSS marquee |
| Contact | [`contact-section.tsx`](components/contact-section.tsx) | Heading reveal; per-field staggered entrance; cyan focus ring. Form fields, validation, and mailto handler are unchanged. | `Reveal` + `StaggerGroup` |
| Footer | [`site-footer.tsx`](components/site-footer.tsx) + [`footer-wordmark.tsx`](components/footer-wordmark.tsx) | Staggered column reveal; oversized "MAKO MARKETING" watermark parallaxes; `Back to top` smooth-scrolls via the Lenis anchor handler. | `StaggerGroup` + Framer parallax |
| Intro overlay | [`intro-overlay.tsx`](components/intro-overlay.tsx) | One-time (per session) loading curtain: logo path-draw, % counter, panels slide up. Skippable. | Framer |

---

## Performance guardrails

- Reduced-motion: smooth scroll disabled, animations render in (near-)final state,
  marquees frozen (see the `@media (prefers-reduced-motion)` block in `globals.css`).
- Mobile: hero plasma replaced by a static gradient; global constellation runs a
  lighter path (no O(n²) link pass, no shadow blur).
- The hero plasma RAF loop is paused while off-screen.
- Animate transform / opacity / color / clip-path only — no width/height/top/left.

## Tuning cheatsheet

- **Global feel**: `--ease*` and `--dur*` in `globals.css`.
- **Reveal distance/speed**: `y` and the `transition` in `reveal.tsx`.
- **Marquee speed**: `.marquee` (38s) / `.marquee-slow` (60s) in `globals.css`.
- **Counter speed**: `duration` prop on `AnimatedCounter`.
- **Backdrop intensity**: particle `count` / `LINK_DIST` in `site-backdrop.tsx`,
  blob `r`/`hue` and canvas `opacity` in `fluid-backdrop.tsx`.
