"use client"

import { useEffect, useRef } from "react"

const CALENDLY_URL = "https://calendly.com/makomarketing0/30min"

// Theme params so the widget matches the cyan-on-black brand (hex, no '#').
const THEMED_URL = `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=060809&text_color=f5f5f5&primary_color=14e4fe`

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js"

export function CalendlyEmbed() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false

    // Render the widget into our own div. Doing it manually (instead of relying
    // on Calendly's one-time auto-scan of [data-url] elements) means it also
    // renders on client-side navigations, when the script is already loaded and
    // the auto-scan never runs again — the bug that left the panel blank.
    const init = () => {
      const el = ref.current
      const Calendly = (window as unknown as { Calendly?: { initInlineWidget: (o: object) => void } }).Calendly
      if (cancelled || !el || !Calendly) return
      el.innerHTML = ""
      Calendly.initInlineWidget({ url: THEMED_URL, parentElement: el })
    }

    if ((window as unknown as { Calendly?: unknown }).Calendly) {
      init()
      return () => {
        cancelled = true
      }
    }

    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`
    )
    if (!script) {
      script = document.createElement("script")
      script.src = SCRIPT_SRC
      script.async = true
      document.body.appendChild(script)
    }
    script.addEventListener("load", init, { once: true })

    return () => {
      cancelled = true
      script?.removeEventListener("load", init)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="h-full w-full"
      // Fills the booking panel so it matches the form column's height. Min width
      // stays below the smallest phone so the widget never overflows its panel.
      style={{ minWidth: "260px", minHeight: "620px" }}
    />
  )
}
