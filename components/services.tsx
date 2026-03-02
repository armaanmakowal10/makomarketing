"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BackgroundBeams } from "@/components/background-beams"
import { cn } from "@/lib/utils"

const services = [
  {
    title: "Google Ads",
    description: "Targeted campaigns that put your business in front of the right customers.",
    link: "#contact",
    image: "/gads.jpeg",
  },
  {
    title: "Meta Ads",
    description: "Reach your ideal audience on Facebook and Instagram with compelling ad campaigns.",
    link: "#contact",
    image: "/mads.jpg",
    imageClassName: "mt-8 h-14 md:h-16",
  },
  {
    title: "Local Service Ads",
    description: "Get your business to appear when customers search for local services. Capture high-intent leads ready to book.",
    link: "#contact",
    image: "/lsa.png",
  },
  {
    title: "Web Development",
    description: "Fast, search-optimized websites that convert online interest into customers.",
    link: "#contact",
    image: "/www.png",
  },
  {
    title: "Google SEO",
    description: "Boost your rankings and drive consistent organic traffic with data-driven strategies.",
    link: "#contact",
    image: "/seo-logo.png",
  },
]

interface CardTransform {
  rotateX: number
  rotateY: number
  scale: number
}

interface Service3dCardProps {
  title: string
  description: string
  link: string
  image: string
  imageClassName?: string
}

function Service3dCard({ title, description, link, image, imageClassName }: Service3dCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const lastMousePosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const card = cardRef.current
    const imageEl = imageRef.current

    if (!card || !imageEl) return

    let rect: DOMRect
    let centerX: number
    let centerY: number

    const updateCardTransform = (mouseX: number, mouseY: number) => {
      if (!rect) {
        rect = card.getBoundingClientRect()
        centerX = rect.left + rect.width / 2
        centerY = rect.top + rect.height / 2
      }

      const relativeX = mouseX - centerX
      const relativeY = mouseY - centerY

      const cardTransform: CardTransform = {
        rotateX: -relativeY * 0.035,
        rotateY: relativeX * 0.035,
        scale: 1.025,
      }

      const imageTransform: CardTransform = {
        rotateX: -relativeY * 0.025,
        rotateY: relativeX * 0.025,
        scale: 1.05,
      }

      return { cardTransform, imageTransform }
    }

    const animate = () => {
      const { cardTransform, imageTransform } = updateCardTransform(
        lastMousePosition.current.x,
        lastMousePosition.current.y
      )

      card.style.transform = `perspective(1000px) rotateX(${cardTransform.rotateX}deg) rotateY(${cardTransform.rotateY}deg) scale3d(${cardTransform.scale}, ${cardTransform.scale}, ${cardTransform.scale})`
      card.style.boxShadow = "0 10px 35px rgba(0, 0, 0, 0.2)"

      imageEl.style.transform = `perspective(1000px) rotateX(${imageTransform.rotateX}deg) rotateY(${imageTransform.rotateY}deg) scale3d(${imageTransform.scale}, ${imageTransform.scale}, ${imageTransform.scale})`

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      lastMousePosition.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseEnter = () => {
      card.style.transition = "transform 0.2s ease, box-shadow 0.2s ease"
      imageEl.style.transition = "transform 0.2s ease"
      animate()
    }

    const handleMouseLeave = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"
      card.style.boxShadow = "none"
      card.style.transition = "transform 0.5s ease, box-shadow 0.5s ease"

      imageEl.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"
      imageEl.style.transition = "transform 0.5s ease"
    }

    card.addEventListener("mouseenter", handleMouseEnter)
    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      card.removeEventListener("mouseenter", handleMouseEnter)
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <a href={link} className="block h-full">
      <Card
        ref={cardRef}
        className="group flex h-full min-h-[280px] flex-col bg-black transition-colors hover:border-border/80 md:min-h-[320px]"
      >
        <CardHeader>
          <CardTitle className="text-lg text-white">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col space-y-4 text-sm">
          <p className="leading-relaxed text-muted-foreground">{description}</p>
          <span className="inline-flex items-center text-sm font-medium text-foreground transition-colors group-hover:text-foreground/80">
            Learn more
            <span className="ml-1">→</span>
          </span>
          <div
            ref={imageRef}
            className={cn("relative mt-auto w-full overflow-hidden rounded-md", imageClassName ?? "h-20 md:h-24")}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain"
            />
          </div>
        </CardContent>
      </Card>
    </a>
  )
}

export function Services() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref)

  return (
    <section className="relative overflow-hidden bg-background">
      <BackgroundBeams />

      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-7xl px-6 py-16 transition-all duration-700 md:px-8 md:py-24 ${
          isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Section heading */}
        <div className="max-w-2xl text-left">
          <h2 className="title-gradient text-3xl font-bold tracking-tight md:text-4xl">
            What we do.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            Everything your business needs to grow online.
          </p>
        </div>

        {/* Services grid - 2 cards in first row, 3 in second row */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={
                i < 2
                  ? "lg:col-span-3"
                  : "lg:col-span-2"
              }
            >
              <Service3dCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
