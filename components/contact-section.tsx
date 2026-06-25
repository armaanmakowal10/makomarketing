"use client"

import { useState } from "react"
import { ArrowUpRight, Check, Mail, Phone } from "lucide-react"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal"
import { Magnetic } from "@/components/magnetic"
import { SplitHeading } from "@/components/split-heading"

const budgets = [
  "Under $1,000 / mo",
  "$1,000 – $3,000 / mo",
  "$3,000 – $5,000 / mo",
  "$5,000 – $10,000 / mo",
  "$10,000+ / mo",
  "Not sure yet",
]

const PHONE_DISPLAY = "905-260-5457"
const PHONE_TEL = "tel:9052605457"
const EMAIL = "makomarketing0@gmail.com"

export function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    website: "",
    budget: "",
    message: "",
  })
  const [sent, setSent] = useState(false)

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(
      `New project inquiry — ${form.business || form.name || "Website lead"}`
    )
    const body = encodeURIComponent(
      `Name: ${form.name}\nBusiness: ${form.business}\nEmail: ${form.email}\nPhone: ${form.phone}\nCurrent website: ${form.website || "—"}\nCurrent monthly ad budget: ${form.budget}\n\n${form.message}`
    )
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-transparent py-24 md:py-32"
    >
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[50vh] w-[80vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(20,228,254,0.18),transparent_70%)] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          {/* Left: pitch + contact methods */}
          <div>
            <Reveal className="text-left">
          <p className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-cyan">
            Let&rsquo;s Talk
            <span className="h-px w-8 bg-gradient-to-r from-cyan/60 to-transparent" />
          </p>

          <h2 className="text-display mt-4 text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.05] text-near-white">
            <SplitHeading
              text={"Get More Customers.\nStarting Now."}
              accent={["Customers.", "Now."]}
            />
          </h2>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            A free audit, a custom growth plan, and real results — no contracts,
            no fluff.
          </p>

          {/* Scannable benefit chips */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            {["Free audit", "1-day reply", "No contracts"].map((c) => (
              <span
                key={c}
                className="flex items-center gap-1.5 rounded-full border border-cyan/30 bg-cyan/[0.06] px-3.5 py-1.5 text-sm text-near-white/85"
              >
                <Check className="size-3.5 text-cyan" />
                {c}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Magnetic strength={0.3}>
              <a href="/free-audit" className="btn-cyan h-14 px-9 text-base">
                Request your free audit <ArrowUpRight className="size-5" />
              </a>
            </Magnetic>
            <a
              href={PHONE_TEL}
              className="group inline-flex items-center gap-2 text-sm font-medium text-near-white transition-colors hover:text-cyan"
            >
              <Phone className="size-4 text-cyan" />
              or call {PHONE_DISPLAY}
            </a>
          </div>
            </Reveal>

            <Reveal className="mt-10">
              <div className="flex flex-col gap-4">
            <Magnetic strength={0.2}>
              <a
                href={PHONE_TEL}
                className="group flex items-center gap-4 rounded-2xl border border-line bg-surface-1/60 p-5 transition-colors hover:border-line-strong"
              >
                <span className="flex size-12 items-center justify-center rounded-xl border border-line-strong bg-cyan/5 text-cyan transition-all group-hover:bg-cyan group-hover:text-black">
                  <Phone className="size-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-muted-foreground">
                    Call us
                  </span>
                  <span className="text-display text-xl text-near-white">
                    {PHONE_DISPLAY}
                  </span>
                </span>
              </a>
            </Magnetic>
            <a
              href={`mailto:${EMAIL}`}
              className="group flex items-center gap-4 rounded-2xl border border-line bg-surface-1/60 p-5 transition-colors hover:border-line-strong"
            >
              <span className="flex size-12 items-center justify-center rounded-xl border border-line-strong bg-cyan/5 text-cyan transition-all group-hover:bg-cyan group-hover:text-black">
                <Mail className="size-5" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-widest text-muted-foreground">
                  Email us
                </span>
                <span className="text-lg text-near-white">{EMAIL}</span>
              </span>
            </a>
          </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={0.1}>
          <div className="rounded-3xl border border-line bg-surface-1/70 p-6 backdrop-blur-sm md:p-9">
            {sent ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <span className="flex size-16 items-center justify-center rounded-full border border-cyan bg-cyan/10 text-cyan">
                  <Check className="size-8" />
                </span>
                <h3 className="text-display mt-6 text-2xl text-near-white">
                  Thank you!
                </h3>
                <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                  Your email app should have opened with your details ready to
                  send. Prefer to talk now? Call us at {PHONE_DISPLAY}.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm text-cyan hover:underline"
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <StaggerGroup className="flex flex-col gap-5">
                  <StaggerItem className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field
                      label="Name"
                      id="name"
                      value={form.name}
                      onChange={update("name")}
                      required
                      placeholder="Your full name"
                    />
                    <Field
                      label="Business name"
                      id="business"
                      value={form.business}
                      onChange={update("business")}
                      required
                      placeholder="Your company"
                    />
                  </StaggerItem>
                  <StaggerItem className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field
                      label="Email"
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={update("email")}
                      required
                      placeholder="you@business.com"
                    />
                    <Field
                      label="Phone"
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={update("phone")}
                      required
                      placeholder="(905) 000-0000"
                    />
                  </StaggerItem>

                  <StaggerItem>
                    <Field
                      label="Current website (optional)"
                      id="website"
                      value={form.website}
                      onChange={update("website")}
                      placeholder="yourbusiness.com"
                    />
                  </StaggerItem>

                  <StaggerItem className="flex flex-col gap-2">
                    <label
                      htmlFor="budget"
                      className="text-xs uppercase tracking-widest text-muted-foreground"
                    >
                      Current monthly ad budget
                    </label>
                    <select
                      id="budget"
                      value={form.budget}
                      onChange={update("budget")}
                      required
                      className="h-12 rounded-xl border border-line bg-black/40 px-4 text-sm text-near-white outline-none transition-colors focus:border-cyan focus:ring-1 focus:ring-cyan/50"
                    >
                      <option value="" disabled>
                        Select a range
                      </option>
                      {budgets.map((b) => (
                        <option key={b} value={b} className="bg-black">
                          {b}
                        </option>
                      ))}
                    </select>
                  </StaggerItem>

                  <StaggerItem className="flex flex-col gap-2">
                    <label
                      htmlFor="message"
                      className="text-xs uppercase tracking-widest text-muted-foreground"
                    >
                      Message <span className="normal-case">(optional)</span>
                    </label>
                    <textarea
                      id="message"
                      value={form.message}
                      onChange={update("message")}
                      rows={4}
                      placeholder="Tell us about your goals…"
                      className="resize-none rounded-xl border border-line bg-black/40 px-4 py-3 text-sm text-near-white outline-none transition-colors placeholder:text-near-white/30 focus:border-cyan focus:ring-1 focus:ring-cyan/50"
                    />
                  </StaggerItem>

                  <StaggerItem>
                    <button
                      type="submit"
                      className="btn-cyan mt-2 h-14 w-full px-8 text-base"
                    >
                      Send inquiry <ArrowUpRight className="size-5" />
                    </button>
                  </StaggerItem>
                </StaggerGroup>
              </form>
            )}
          </div>
        </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  id,
  ...props
}: {
  label: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-xs uppercase tracking-widest text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="h-12 rounded-xl border border-line bg-black/40 px-4 text-sm text-near-white outline-none transition-colors placeholder:text-near-white/30 focus:border-cyan focus:ring-1 focus:ring-cyan/50"
      />
    </div>
  )
}

