# Claude Code Prompt — Mako Marketing Rebuild (Animated Background + Sales-Optimized Layout)

> Paste everything below the line into Claude Code, run from the root of the `armaanmakowal10/makomarketing` repo.

---

## ROLE & GOAL

You are a senior frontend engineer + conversion-focused web designer. This is a **production Next.js (App Router) site on Vercel** for Mako Marketing, a digital marketing agency.

I want two things:
1. **A scroll-interactive animated background** across the whole site — smooth, premium, on-brand.
2. **A re-architected page layout optimized for clarity and conversion** — restructure the sections, sharpen the messaging hierarchy, and make the path to "contact us" obvious and repeated.

Keep all existing **SEO metadata, OpenGraph tags, canonical URL, and `LocalBusiness` JSON-LD** intact. Keep the contact form's fields, names, validation, and submit handler working. Keep all external project links working. You may restructure markup and layout freely otherwise.

Work **incrementally**: build the animated background foundation first and confirm it runs, then rebuild the layout section by section, committing as you go. Show me the background working before restructuring content.

## BRAND SYSTEM (use exactly)

- **Background:** pure black `#000000`
- **Primary accent:** electric cyan `#14E4FE` — used as a *spotlight*, not a wash (glows, key numbers, CTAs, hover states, underlines). Never flood the page with it.
- **Logo:** existing Mako wordmark at `/Mako-Marketing-logo-design.png` — keep it.
- **Aesthetic:** dark-mode-first, high contrast, generous negative space, sharp typographic hierarchy. Premium agency feel (Linear / Vercel / Awwwards tier). Confident and clean, never gimmicky. Every animation must feel intentional.

## TECH STACK — install these (all free for commercial use)

```bash
npm install lenis gsap @gsap/react motion
npm install three @react-three/fiber @react-three/drei   # for the WebGL background
```

For specific copy-paste UI effects, pull only the named components from these shadcn-CLI registries (own the code, don't bulk-install):
- **Aceternity UI** (`ui.aceternity.com`) — spotlight, background beams, hover cards
- **Magic UI** (`magicui.design`) — marquee, shimmer button, animated gradient text, blur-fade
- **React Bits** (`reactbits.dev`) — text reveal effects (BlurText, SplitText, GradientText)

## PART 1 — THE ANIMATED SCROLL-INTERACTIVE BACKGROUND

This is the signature feature. It is a single fixed full-viewport layer behind all content (`position: fixed; inset: 0; z-index: -1`), so it persists and reacts as the user scrolls the page on top of it.

**Smooth scroll engine (build first):**
- Use `ReactLenis` (`lenis/react`) wrapping the app in `app/layout.tsx` for buttery momentum scrolling.
- **Critical:** sync Lenis and GSAP on ONE requestAnimationFrame loop or scroll-linked motion lags. Set `autoRaf={false}`, then:
  ```ts
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  ```
- Expose Lenis scroll position + velocity so the background can read them.

**The background itself — on-brand and reactive.** Build a WebGL layer with React Three Fiber + drei. Pick ONE of these directions (default to the first; it best fits a digital-marketing/growth brand):

- **Option A — Flowing particle current (recommended):** a dark field of thousands of small cyan-tinted points/lines drifting like a slow current. Scroll *velocity* speeds up and stretches the flow; scroll *position* slowly shifts hue/density between sections. Subtle pointer parallax. Evokes momentum, data, traffic in motion.
- **Option B — Animated gradient mesh:** a slow-morphing deep-black-to-cyan gradient mesh with soft noise, where scroll drives the morph and color temperature.
- **Option C — Topographic / grid lines:** faint cyan contour or grid lines that warp and parallax with scroll, like a living blueprint.

Requirements for the background regardless of option:
- Sits at **very low opacity** behind content — it sets a mood, it never competes with text for attention or hurts legibility. Add a subtle dark vignette/gradient over it where text sits.
- Reacts to **both scroll position and scroll velocity** (read from Lenis) — this is what makes it "scroll-interactive."
- **Performance-gated:** disabled on mobile and under `prefers-reduced-motion`; replaced by a static cyan radial-gradient + faint noise fallback. Cap particle count; target 60fps (test with Chrome DevTools 4× CPU throttle).
- A thin cyan **scroll-progress bar** fixed at the top, width driven by Lenis scroll fraction.

## PART 2 — REBUILD THE LAYOUT FOR CLARITY & SALES

Re-architect the page into this order. The principle: **lead with the value prop, surface proof early, keep one primary action (contact), and repeat the CTA down the page.** Cut clutter; lead with outcomes/benefits, not feature lists.

1. **Sticky nav** — transparent over hero, frosted-black on scroll. Logo left; concise anchor links; click-to-call phone `905-260-5457`; one primary CTA button (`Get Started`) with a magnetic hover + cyan glow. One clear action, not five.

2. **Hero** — the sharpest possible value proposition. A bold headline focused on the outcome (turning traffic into paying customers / more booked jobs), a single-line subhead, and **one primary CTA** plus a secondary "Call us" link. Directly below the CTA, a **trust strip**: star rating + "Trusted by service businesses across Canada" or a row of client/industry logos. Headline animates in with a SplitText word reveal. Background flows behind it.

3. **Proof bar (new, high on the page)** — a slim band of credibility before asking them to read: client logos or a one-line outcome stat. Build trust *before* the pitch.

4. **Services — benefit-led** — the 5 offerings (Google Ads, Meta Ads, Local Service Ads, Web Development, Google SEO). Reframe each headline around the *result* the client gets, with the feature bullets as support. Cards reveal on a stagger; cursor-follow spotlight + cyan accent on hover (Aceternity/Magic UI card). Each card ends with a soft CTA.

5. **Results / outcomes** — the numbers, with **count-up animations** on scroll-into-view. NOTE: the current figures are samples ("real client numbers coming soon") — keep that disclaimer visible until real data is supplied. This section should feel earned and concrete.

6. **Selected Work** — the 6 real projects with their existing external links preserved. Image wipes in via `clip-path` on scroll; hover shows a cyan-tinted overlay with project name/role.

7. **Process — "How We Work"** — the 4 steps (Discover → Strategy → Build & Launch → Optimize & Scale) with a vertical line that "draws" as you scroll and each step revealing in sequence. This reduces perceived risk for the buyer.

8. **Testimonials — REAL reviews (important).** Replace the placeholder quotes (Walker / Maya Torres / Samuel Reed, etc.) with real client reviews. Display them as one or two opposite-direction Magic UI `Marquee` rows that pause on hover, each card with a subtle border-glow. **Leave clearly-marked placeholder slots / a TODO comment where I will paste the real review text and client names**, structured so it's a one-line edit per review. Real social proof is the highest-converting element on the page — give it prominence.

9. **Who We Serve** — the industries, condensed into a tidy, fast-animating grid (cyan underline-sweep on hover). Keep it light; it's supporting info, not a headline section.

10. **Final CTA section** — a strong closing pitch ("Ready to turn traffic into paying customers?") with the contact form, click-to-call, and email. Low friction. Heading uses a SplitText reveal; `Send inquiry` is a shimmer/magnetic CTA with a cyan glow. **Do not change the form's existing field names, validation, or submit handler.**

11. **Footer** — clean columns, a large faint "MAKO MARKETING" wordmark that parallaxes, and a `Back to top` that calls `lenis.scrollTo(0)`.

## CLARITY & CONVERSION PRINCIPLES (apply throughout)

- One **primary** action per screen (contact / get started). Secondary actions (call) are visually quieter.
- Benefit-first copy: lead with what the client *gets*, support with how.
- Repeat the CTA at natural decision points (after hero, after services, after results, final section).
- Reduce cognitive load: shorter line lengths, clear section labels, strong heading hierarchy, lots of breathing room.
- Don't let any animation delay readability or cause layout shift (CLS). Reserve space for animated elements.

## TYPOGRAPHY & POLISH

- Oversized, tightly-tracked display headings; comfortable body line-height; generous section padding.
- If a clean variable font isn't already loaded, propose one via `next/font` (ask before swapping).
- Faint film-grain/noise overlay on the black for a tactile premium feel.
- Easing: GSAP `power3.out` / custom cubic-beziers, durations ~0.4–0.9s, stagger 0.05–0.12s. Consistent hover timing everywhere.

## CONSTRAINTS / DO-NOT

1. Do not remove or alter existing SEO meta, OpenGraph, canonical, or JSON-LD.
2. Do not break the contact form submission or any external project links.
3. Respect `prefers-reduced-motion`; keep keyboard nav, focus states, and anchor links working (Lenis preserves native scroll — verify).
4. No WebGL on mobile; no scroll-jacking that traps the user; no autoplay audio.
5. Don't invent fake testimonials or client numbers — use placeholders/TODOs I will fill in.

## DELIVERABLES

1. Lenis + GSAP foundation wired into `app/layout.tsx`, with the fixed WebGL animated background reading scroll position + velocity (and its mobile/reduced-motion fallback).
2. The re-architected page in the section order above, committed section-by-section with clear messages.
3. Reusable primitives (`Reveal`, `SplitHeading`, `MagneticButton`, `ScrollProgress`).
4. Clearly-marked TODO slots for real testimonials and real result numbers.
5. A short `MOTION.md` documenting which library powers each effect and how to tune speeds/easings.

Start by installing dependencies and building the smooth-scroll + animated background foundation. Show me that working before rebuilding the layout. Ask me before any change to content, copy, fonts, or form behavior.
