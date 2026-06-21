import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Mako Marketing — Turning Traffic Into Paying Customers"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          position: "relative",
        }}
      >
        {/* glow */}
        <div
          style={{
            position: "absolute",
            width: 700,
            height: 700,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(20,228,254,0.35), rgba(0,0,0,0) 70%)",
          }}
        />
        {/* mountain */}
        <svg width="220" height="110" viewBox="0 0 200 90" fill="none">
          <path
            d="M8 80 L40 38 L54 52 L74 20 L94 50 L110 36 L130 62 L152 32 L174 58 L192 80"
            stroke="#14e4fe"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 92,
            fontWeight: 700,
            letterSpacing: -3,
          }}
        >
          <span style={{ color: "#f5f5f5" }}>MAKO&nbsp;</span>
          <span style={{ color: "#14e4fe" }}>MARKETING</span>
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 30,
            color: "#9fb0b6",
            letterSpacing: 1,
          }}
        >
          Turning Traffic Into Paying Customers
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 26,
            color: "#14e4fe",
            letterSpacing: 4,
          }}
        >
          905-260-5457
        </div>
      </div>
    ),
    { ...size }
  )
}
