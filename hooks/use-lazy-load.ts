"use client"

import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"

export function useLazyLoad(options = { threshold: 0.1, triggerOnce: true }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const { ref, inView } = useInView(options)

  useEffect(() => {
    if (inView && !isLoaded) {
      setIsLoaded(true)
    }
  }, [inView, isLoaded])

  return { ref, isLoaded, inView }
}
