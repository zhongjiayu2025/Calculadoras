"use client"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    // Mark as loaded after component mounts
    setIsLoaded(true)
  }, [])

  return (
    <section
      ref={ref}
      className="hero-section text-center py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background rounded-lg"
    >
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Calculadoras Simples y Útiles</h1>

      {/* Optimize the problematic text element */}
      <p
        className={`hero-text text-lg md:text-xl text-muted-foreground mx-auto mb-8 ${
          isLoaded && inView ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
        style={{
          maxWidth: "42rem",
          // Use font-display in inline style as well
          fontDisplay: "swap",
          // Prevent layout shift with height
          minHeight: "1.75rem",
        }}
      >
        Herramientas de cálculo rápidas y prácticas para resolver necesidades comunes en el día a día
      </p>
    </section>
  )
}
