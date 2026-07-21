/**
 * Background for the booking / free-audit page — pure black, no ambient glow.
 */
export function FreeAuditBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 bg-black"
    />
  )
}
