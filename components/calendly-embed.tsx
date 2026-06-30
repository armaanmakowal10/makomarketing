"use client"

import { useEffect } from "react"

const CALENDLY_URL = "https://calendly.com/makomarketing0/30min"

// Theme params so the widget matches the cyan-on-black brand (hex, no '#').
const THEMED_URL = `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=060809&text_color=f5f5f5&primary_color=14e4fe`

export function CalendlyEmbed() {
  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    )
    if (existing) return
    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div
      className="calendly-inline-widget w-full"
      data-url={THEMED_URL}
      // minWidth kept below the smallest phone width so the widget never
      // overflows its panel on narrow screens; height is tall enough for the
      // month/time picker on mobile.
      style={{ minWidth: "260px", height: "720px" }}
    />
  )
}
