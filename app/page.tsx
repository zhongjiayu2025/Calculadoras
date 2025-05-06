"use client"

import Link from "next/link"
import { categorias } from "@/lib/categories"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import * as Icons from "lucide-react"
import { WhyChooseUsSection, HowToUseSection, FAQSection } from "@/components/home-sections"

// Componente dinámico para iconos de Lucide
const DynamicIcon = ({ name }: { name: string }) => {
  const IconComponent = Icons[name as keyof typeof Icons] || Icons.Calculator
  return <IconComponent className="h-5 w-5" />
}

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <section className="text-center py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background rounded-lg">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Calculadoras Faciles</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Herramientas de cálculo rápidas y prácticas para resolver necesidades comunes en el día a día
        </p>
      </section>

      <section aria-labelledby="categorias-titulo">
        <h2 id="categorias-titulo" className="text-2xl font-semibold mb-6 text-center">
          Categorías de Calculadoras
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categorias.map((categoria) => (
            <Card key={categoria.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3 bg-muted/30">
                <div className="flex items-center gap-2 mb-1.5">
                  <DynamicIcon name={categoria.icono} className="text-primary" />
                  <CardTitle>{categoria.nombre}</CardTitle>
                </div>
                <CardDescription>{categoria.descripcion}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categoria.calculadoras.map((calculadora) => (
                    <Link
                      key={calculadora.id}
                      href={calculadora.ruta}
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-accent transition-colors"
                    >
                      <DynamicIcon name={calculadora.icono} className="text-secondary h-4 w-4" />
                      <span>{calculadora.nombre}</span>
                    </Link>
                  ))}
                </div>
                <Button asChild variant="outline" className="w-full mt-4">
                  <Link href={`/categoria/${categoria.id}`}>Ver todas</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12 bg-primary/5 p-6 rounded-lg shadow-md" aria-labelledby="calculadoras-populares">
        <h2 id="calculadoras-populares" className="text-2xl font-semibold mb-4 text-center">
          Calculadoras más populares
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            href="/categoria/finanzas-dinero/interes-compuesto"
            className="p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow border border-border hover:border-primary/30"
          >
            <h3 className="font-medium flex items-center gap-2">
              <Icons.TrendingUp className="h-4 w-4 text-primary" />
              Calculadora de Interés Compuesto
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Calcula el crecimiento de tus inversiones a lo largo del tiempo
            </p>
          </Link>
          <Link
            href="/categoria/vida-diaria/metros-cuadrados"
            className="p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow border border-border hover:border-primary/30"
          >
            <h3 className="font-medium flex items-center gap-2">
              <Icons.SquareStack className="h-4 w-4 text-primary" />
              Calculadora de Metros Cuadrados
            </h3>
            <p className="text-sm text-muted-foreground mt-1">Calcula el área de diferentes superficies fácilmente</p>
          </Link>
          <Link
            href="/categoria/vida-diaria/letra-dni"
            className="p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow border border-border hover:border-primary/30"
          >
            <h3 className="font-medium flex items-center gap-2">
              <Icons.CreditCard className="h-4 w-4 text-primary" />
              Calculadora de Letra DNI
            </h3>
            <p className="text-sm text-muted-foreground mt-1">Calcula la letra correspondiente a tu número de DNI</p>
          </Link>
          <Link
            href="/categoria/finanzas-dinero/euros-pesetas"
            className="p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow border border-border hover:border-primary/30"
          >
            <h3 className="font-medium flex items-center gap-2">
              <Icons.RefreshCw className="h-4 w-4 text-primary" />
              Conversor Euros ↔ Pesetas
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Convierte entre euros y pesetas con el tipo de cambio oficial
            </p>
          </Link>
          <Link
            href="/categoria/salud-bienestar/apiretal"
            className="p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow border border-border hover:border-primary/30"
          >
            <h3 className="font-medium flex items-center gap-2">
              <Icons.Droplet className="h-4 w-4 text-primary" />
              Calculadora de Dosis de Apiretal
            </h3>
            <p className="text-sm text-muted-foreground mt-1">Estima la dosis recomendada según el peso del niño</p>
          </Link>
          <Link
            href="/categoria/matematicas-ciencias/raiz-cuadrada"
            className="p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow border border-border hover:border-primary/30"
          >
            <h3 className="font-medium flex items-center gap-2">
              <Icons.Check className="h-4 w-4 text-primary" />
              Calculadora de Raíz Cuadrada
            </h3>
            <p className="text-sm text-muted-foreground mt-1">Calcula la raíz cuadrada de cualquier número positivo</p>
          </Link>
        </div>
      </section>

      {/* Nuevas secciones añadidas */}
      <WhyChooseUsSection />
      <HowToUseSection />
      <FAQSection />
    </div>
  )
}
