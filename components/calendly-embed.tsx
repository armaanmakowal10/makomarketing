"use client"

import { useEffect } from "react"

// TODO: replace with your real Calendly scheduling link (e.g. the "30 Minute
// Meeting" event link from your Calendly dashboard).
const CALENDLY_URL = "https://calendly.com/makomarketing0/free-audit"

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
      style={{ minWidth: "320px", height: "720px" }}
    />
  )
}
