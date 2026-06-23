// Count-up animation removed — renders the value statically.

export function AnimatedCounter({
  value,
  className,
}: {
  value: string
  className?: string
  duration?: number
}) {
  return <span className={className}>{value}</span>
}
