import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ServiceWorkerRegistration } from "@/components/service-worker-registration"

// Optimize font loading with display: swap and preload
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
})

export const metadata: Metadata = {
  title: "Calculadoras Simples Online | Herramientas de cálculo gratuitas",
  description:
    "Colección gratuita de calculadoras online en español: interés compuesto, metros cuadrados, ritmo de carrera, letra DNI, euros-pesetas y más. Herramientas rápidas y prácticas.",
  keywords:
    "calculadoras online, calculadora interés compuesto, calculadora metros cuadrados, calculadora ritmo carrera, calculadora letra dni, calculadora euros pesetas, calculadora fondos indexados, calculadora raíz cuadrada, calculadora apiretal, calculadora dalsy",
  authors: [{ name: "CalculosFaciles.org" }],
  creator: "CalculosFaciles.org",
  publisher: "CalculosFaciles.org",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://calculosfaciles.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Calculadoras Simples Online | Herramientas de cálculo gratuitas",
    description:
      "Colección gratuita de calculadoras online en español para finanzas, salud, matemáticas y vida diaria.",
    url: "https://calculosfaciles.org",
    siteName: "CalculosFaciles.org",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadoras Simples Online | Herramientas de cálculo gratuitas",
    description:
      "Colección gratuita de calculadoras online en español para finanzas, salud, matemáticas y vida diaria.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        {/* Preload critical assets */}
        <link rel="preload" href="/logo.png" as="image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <ServiceWorkerRegistration />
      </body>
    </html>
  )
}
