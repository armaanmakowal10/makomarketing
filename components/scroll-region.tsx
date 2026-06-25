"use client"

import { useRef, type ReactNode } from "react"
import { RegionShootingStar } from "@/components/region-shooting-star"

/**
 * Wraps everything BELOW the hero. Provides the measured bounds (hero bottom →
 * page end) for the single shooting star, which renders as a fixed background
 * layer that descends across this region as the user scrolls.
 */
export function ScrollRegion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div ref={ref}>
      <RegionShootingStar containerRef={ref} />
      {children}
    </div>
  )
}
