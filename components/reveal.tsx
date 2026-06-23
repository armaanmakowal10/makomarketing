import type { ReactNode } from "react"

// Animations removed — these now render their children statically.

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: "div" | "section" | "li" | "span"
}

export function Reveal({ children, className, as = "div" }: RevealProps) {
  const Tag = as
  return <Tag className={className}>{children}</Tag>
}

export function StaggerGroup({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={className}>{children}</div>
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={className}>{children}</div>
}
