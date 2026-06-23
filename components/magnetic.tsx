import type { ReactNode } from "react"

// Magnetic pointer-follow effect removed — renders children statically.

export function Magnetic({
  children,
  className,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  if (className) return <div className={className}>{children}</div>
  return <>{children}</>
}
