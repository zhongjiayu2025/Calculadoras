"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  showText?: boolean
  size?: "sm" | "md" | "lg"
  onClick?: () => void
}

export function Logo({ className, showText = true, size = "md", onClick }: LogoProps) {
  const sizes = {
    sm: { container: "h-8", image: 24, text: "text-lg" },
    md: { container: "h-10", image: 32, text: "text-xl" },
    lg: { container: "h-12", image: 40, text: "text-2xl" },
  }

  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2 transition-opacity hover:opacity-90", sizes[size].container, className)}
      onClick={onClick}
    >
      <div className="relative aspect-square h-full">
        <Image
          src="/logo.png"
          alt="CalculosFaciles.org Logo"
          width={sizes[size].image}
          height={sizes[size].image}
          className="object-contain"
          priority
          loading="eager"
        />
      </div>
      {showText && (
        <span className={cn("font-bold tracking-tight", sizes[size].text)}>
          <span className="text-primary">Calculos</span>
          <span className="text-foreground">Faciles</span>
        </span>
      )}
    </Link>
  )
}
