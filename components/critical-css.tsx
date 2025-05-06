"use client"

import { useEffect, useState } from "react"

// This component inlines critical CSS and defers non-critical CSS
export function CriticalCSS() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Critical CSS for above-the-fold content
  const criticalCSS = `
    /* Critical styles for hero section */
    .hero-section {
      content-visibility: auto;
      contain-intrinsic-size: 0 500px;
    }
    
    .hero-text {
      font-display: swap;
      max-width: 42rem;
      margin-left: auto;
      margin-right: auto;
    }
    
    /* Optimize paint performance */
    .will-change-opacity {
      will-change: opacity;
    }
  `

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
      {mounted && (
        <link
          rel="stylesheet"
          href="/deferred-styles.css"
          media="print"
          onLoad={(e) => {
            // @ts-ignore
            e.target.media = "all"
          }}
        />
      )}
    </>
  )
}
