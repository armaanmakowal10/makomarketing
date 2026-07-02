"use client"

import { useState } from "react"
import { ArrowUpRight, Check, Loader2 } from "lucide-react"
import { StaggerGroup, StaggerItem } from "@/components/reveal"

const budgets = [
  "Under $1,000 / mo",
  "$1,000 – $3,000 / mo",
  "$3,000 – $5,000 / mo",
  "$5,000 – $10,000 / mo",
  "$10,000+ / mo",
  "Not sure yet",
]

const PHONE_DISPLAY = "905-260-5457"

// Web3Forms access key — public-safe by design (it only identifies which inbox
// receives the submission; spam is filtered server-side + by the honeypot).
// Set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in .env.local.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? ""

type Status = "idle" | "sending" | "sent" | "error"

const emptyForm = {
  name: "",
  business: "",
  email: "",
  phone: "",
  website: "",
  budget: "",
  message: "",
}

export function InquiryForm() {
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState("")

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Honeypot — bots fill hidden fields; real users never do.
    const botField = (e.currentTarget.elements.namedItem("botcheck") as
      | HTMLInputElement
      | null)
    if (botField?.value) return

    if (!ACCESS_KEY) {
      setStatus("error")
      setError(
        "Form isn't configured yet. Add your Web3Forms access key to .env.local."
      )
      return
    }

    setStatus("sending")
    setError("")

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          from_name: "Mako Marketing Website",
          subject: `New inquiry — ${form.business || form.name || "Website lead"}`,
          Name: form.name,
          Business: form.business,
          Email: form.email,
          Phone: form.phone,
          "Current website": form.website || "—",
          "Monthly ad budget": form.budget,
          Message: form.message || "—",
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus("sent")
        setForm(emptyForm)
      } else {
        setStatus("error")
        setError(data.message || "Something went wrong. Please try again.")
      }
    } catch {
      setStatus("error")
      setError(
        "Couldn't reach the server. Check your connection and try again."
      )
    }
  }

  if (status === "sent") {
    return (
      <div className="flex min-h-[420px] flex-1 flex-col items-center justify-center text-center">
        <span className="flex size-16 items-center justify-center rounded-full border border-cyan bg-cyan/10 text-cyan">
          <Check className="size-8" />
        </span>
        <h3 className="text-display mt-6 text-2xl text-near-white">
          Thank you!
        </h3>
        <p className="mt-3 max-w-xs text-sm text-muted-foreground">
          Your inquiry is in — we&rsquo;ll get back to you within one business
          day. Prefer to talk now? Call us at {PHONE_DISPLAY}.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-cyan hover:underline"
        >
          Send another →
        </button>
      </div>
    )
  }

  const sending = status === "sending"

  return (
    <form onSubmit={onSubmit} className="flex flex-1 flex-col">
      {/* Honeypot field — hidden from humans, catches bots. */}
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <StaggerGroup className="flex flex-1 flex-col gap-5">
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

        <StaggerItem className="mt-auto">
          {status === "error" && (
            <p className="mb-3 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={sending}
            className="btn-cyan mt-2 h-14 w-full px-8 text-base disabled:cursor-not-allowed disabled:opacity-70"
          >
            {sending ? (
              <>
                Sending
                <Loader2 className="size-5 animate-spin" />
              </>
            ) : (
              <>
                Send inquiry <ArrowUpRight className="size-5" />
              </>
            )}
          </button>
        </StaggerItem>
      </StaggerGroup>
    </form>
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
