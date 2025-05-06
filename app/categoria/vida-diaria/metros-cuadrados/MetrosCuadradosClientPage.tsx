"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Helmet } from "react-helmet"

export default function MetrosCuadradosClientPage() {
  const [largo, setLargo] = useState("")
  const [ancho, setAncho] = useState("")
  const [radio, setRadio] = useState("")
  const [base, setBase] = useState("")
  const [altura, setAltura] = useState("")
  const [tipoFigura, setTipoFigura] = useState("rectangulo")
  const [area, setArea] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calcularAreaRectangulo = () => {
    setError(null)

    const largoNum = Number.parseFloat(largo)
    const anchoNum = Number.parseFloat(ancho)

    if (isNaN(largoNum) || isNaN(anchoNum)) {
      setError("Por favor, introduce valores numéricos válidos")
      setArea(null)
      return
    }

    if (largoNum <= 0 || anchoNum <= 0) {
      setError("Las dimensiones deben ser mayores que cero")
      setArea(null)
      return
    }

    // Calcular área del rectángulo
    const areaCalculada = largoNum * anchoNum
    setArea(areaCalculada)
  }

  const calcularAreaCirculo = () => {
    setError(null)

    const radioNum = Number.parseFloat(radio)

    if (isNaN(radioNum)) {
      setError("Por favor, introduce un valor numérico válido")
      setArea(null)
      return
    }

    if (radioNum <= 0) {
      setError("El radio debe ser mayor que cero")
      setArea(null)
      return
    }

    // Calcular área del círculo: A = π * r²
    const areaCalculada = Math.PI * radioNum * radioNum
    setArea(areaCalculada)
  }

  const calcularAreaTriangulo = () => {
    setError(null)

    const baseNum = Number.parseFloat(base)
    const alturaNum = Number.parseFloat(altura)

    if (isNaN(baseNum) || isNaN(alturaNum)) {
      setError("Por favor, introduce valores numéricos válidos")
      setArea(null)
      return
    }

    if (baseNum <= 0 || alturaNum <= 0) {
      setError("Las dimensiones deben ser mayores que cero")
      setArea(null)
      return
    }

    // Calcular área del triángulo: A = (base * altura) / 2
    const areaCalculada = (baseNum * alturaNum) / 2
    setArea(areaCalculada)
  }

  const calcularArea = () => {
    if (tipoFigura === "rectangulo") {
      calcularAreaRectangulo()
    } else if (tipoFigura === "circulo") {
      calcularAreaCirculo()
    } else if (tipoFigura === "triangulo") {
      calcularAreaTriangulo()
    }
  }

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Calculadora de Metros Cuadrados",
            description: "Calcula el área de diferentes superficies: rectangular, circular o triangular.",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "EUR",
            },
          })}
        </script>
      </Helmet>
      <CalculatorLayout
        title="Calculadora de Metros Cuadrados (Área)"
        description="Calcula el área de diferentes superficies: rectangular, circular o triangular."
        icon="SquareStack"
        backTo="/categoria/vida-diaria"
        backToLabel="Vida Diaria y Utilidades"
      >
        <div className="grid gap-6">
          <Tabs value={tipoFigura} onValueChange={setTipoFigura}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="rectangulo">Rectángulo</TabsTrigger>
              <TabsTrigger value="circulo">Círculo</TabsTrigger>
              <TabsTrigger value="triangulo">Triángulo</TabsTrigger>
            </TabsList>

            <TabsContent value="rectangulo" className="mt-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="largo">Largo (metros)</Label>
                    <Input
                      id="largo"
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={largo}
                      onChange={(e) => setLargo(e.target.value)}
                      placeholder="Ejemplo: 5"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="ancho">Ancho (metros)</Label>
                    <Input
                      id="ancho"
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={ancho}
                      onChange={(e) => setAncho(e.target.value)}
                      placeholder="Ejemplo: 3"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="circulo" className="mt-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="radio">Radio (metros)</Label>
                  <Input
                    id="radio"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={radio}
                    onChange={(e) => setRadio(e.target.value)}
                    placeholder="Ejemplo: 2"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="triangulo" className="mt-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="base">Base (metros)</Label>
                    <Input
                      id="base"
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={base}
                      onChange={(e) => setBase(e.target.value)}
                      placeholder="Ejemplo: 4"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="altura">Altura (metros)</Label>
                    <Input
                      id="altura"
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={altura}
                      onChange={(e) => setAltura(e.target.value)}
                      placeholder="Ejemplo: 3"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="button" onClick={calcularArea}>
            Calcular área
          </Button>

          {area !== null && (
            <Card className="bg-primary/10">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Área calculada</h3>
                  <p className="text-3xl font-bold">{area.toFixed(2)} m²</p>
                  {tipoFigura === "rectangulo" && largo && ancho && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {largo} m × {ancho} m = {area.toFixed(2)} m²
                    </p>
                  )}
                  {tipoFigura === "circulo" && radio && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      π × ({radio} m)² = {area.toFixed(2)} m²
                    </p>
                  )}
                  {tipoFigura === "triangulo" && base && altura && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      ({base} m × {altura} m) ÷ 2 = {area.toFixed(2)} m²
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">¿Cómo calcular metros cuadrados?</h2>
            <p className="mb-3">
              El cálculo de metros cuadrados (m²) es fundamental para muchas actividades como construcción, decoración,
              compra de materiales o cálculo de presupuestos.
            </p>
            <h3 className="text-lg font-medium mb-2">Fórmulas para calcular áreas</h3>
            <ul className="list-disc pl-5 space-y-2 mb-3">
              <li>
                <strong>Rectángulo o cuadrado:</strong> Área = largo × ancho
                <p className="text-sm text-muted-foreground">Ejemplo: Un salón de 4m × 5m tiene un área de 20 m²</p>
              </li>
              <li>
                <strong>Círculo:</strong> Área = π × radio²
                <p className="text-sm text-muted-foreground">
                  Ejemplo: Un círculo de radio 3m tiene un área de 28.27 m²
                </p>
              </li>
              <li>
                <strong>Triángulo:</strong> Área = (base × altura) ÷ 2
                <p className="text-sm text-muted-foreground">
                  Ejemplo: Un triángulo de base 6m y altura 4m tiene un área de 12 m²
                </p>
              </li>
            </ul>
            <p>
              Esta calculadora te permite calcular rápidamente el área de diferentes formas geométricas sin necesidad de
              recordar las fórmulas.
            </p>
          </div>
        </div>
      </CalculatorLayout>
    </>
  )
}
