import Link from "next/link"

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background"
    >
      {/* Grid pattern background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Top fade so grid fades out at the very top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <h1
          className="text-balance font-bold tracking-tighter text-foreground"
          style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)", lineHeight: 1.05 }}
        >
          We Develop The Platform
          <br />
          That Represents You.
        </h1>

        <p
          className="mx-auto mt-8 max-w-2xl text-pretty leading-relaxed text-muted-foreground md:text-xl"
          style={{ fontSize: "clamp(0.875rem, 1.5vw, 1.25rem)" }}
        >
          Custom web platforms for service-based businesses
          <br className="hidden sm:block" />
          ready to expand operational capacity.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <Link
            href="#contact"
            className="inline-flex h-14 items-center gap-3 rounded-full bg-foreground px-8 text-base font-medium text-background transition-opacity hover:opacity-90"
          >
            Get in Touch
          </Link>
          <Link
            href="#portfolio"
            className="inline-flex h-14 items-center rounded-full border border-border bg-background px-8 text-base font-medium text-foreground transition-colors hover:bg-secondary"
          >
            View Portfolio
          </Link>
        </div>
      </div>

      {/* Blue gradient glow at bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%]">
        {/* Deep blue glow - left */}
        <div
          className="absolute bottom-0 left-[10%] h-[80%] w-[40%] rounded-full opacity-60 blur-[80px]"
          style={{
            background:
              "radial-gradient(ellipse at center, #0066ff 0%, #0033aa 40%, transparent 70%)",
          }}
        />
        {/* Light blue glow - center */}
        <div
          className="absolute bottom-[10%] left-[35%] h-[60%] w-[30%] rounded-full opacity-50 blur-[60px]"
          style={{
            background:
              "radial-gradient(ellipse at center, #38bdf8 0%, #0ea5e9 40%, transparent 70%)",
          }}
        />
        {/* Navy blue glow - right */}
        <div
          className="absolute bottom-0 right-[5%] h-[80%] w-[45%] rounded-full opacity-60 blur-[80px]"
          style={{
            background:
              "radial-gradient(ellipse at center, #1d4ed8 0%, #1e3a8a 40%, transparent 70%)",
          }}
        />
        {/* Cyan accent - center-right */}
        <div
          className="absolute bottom-[5%] left-[45%] h-[40%] w-[25%] rounded-full opacity-40 blur-[50px]"
          style={{
            background:
              "radial-gradient(ellipse at center, #22d3ee 0%, #06b6d4 40%, transparent 70%)",
          }}
        />
      </div>

      {/* Bottom fade to clean edge */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
