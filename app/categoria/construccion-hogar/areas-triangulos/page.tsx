"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AreasTriangulosPage() {
  const [base, setBase] = useState("")
  const [altura, setAltura] = useState("")
  const [ladoA, setLadoA] = useState("")
  const [ladoB, setLadoB] = useState("")
  const [ladoC, setLadoC] = useState("")
  const [metodo, setMetodo] = useState("base-altura")
  const [area, setArea] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calcularAreaBaseAltura = () => {
    setError(null)

    const baseNum = Number.parseFloat(base)
    const alturaNum = Number.parseFloat(altura)

    if (isNaN(baseNum) || isNaN(alturaNum)) {
      setError("Por favor, introduce valores numéricos válidos")
      setArea(null)
      return
    }

    if (baseNum <= 0 || alturaNum <= 0) {
      setError("La base y la altura deben ser mayores que cero")
      setArea(null)
      return
    }

    // Fórmula: Área = (base * altura) / 2
    const areaCalculada = (baseNum * alturaNum) / 2
    setArea(areaCalculada)
  }

  const calcularAreaHeron = () => {
    setError(null)

    const a = Number.parseFloat(ladoA)
    const b = Number.parseFloat(ladoB)
    const c = Number.parseFloat(ladoC)

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      setError("Por favor, introduce valores numéricos válidos")
      setArea(null)
      return
    }

    if (a <= 0 || b <= 0 || c <= 0) {
      setError("Todos los lados deben ser mayores que cero")
      setArea(null)
      return
    }

    // Verificar la desigualdad triangular
    if (a + b <= c || a + c <= b || b + c <= a) {
      setError("Los valores no forman un triángulo válido (la suma de dos lados debe ser mayor que el tercer lado)")
      setArea(null)
      return
    }

    // Fórmula de Herón: Área = √(s(s-a)(s-b)(s-c)) donde s = (a+b+c)/2
    const s = (a + b + c) / 2
    const areaCalculada = Math.sqrt(s * (s - a) * (s - b) * (s - c))
    setArea(areaCalculada)
  }

  const calcularArea = () => {
    if (metodo === "base-altura") {
      calcularAreaBaseAltura()
    } else {
      calcularAreaHeron()
    }
  }

  return (
    <CalculatorLayout
      title="Calculadora de Áreas de Triángulos"
      description="Usa nuestro calculador de areas de triangulos para hallar el área de un triángulo proporcionando la base y altura, o los tres lados (fórmula de Herón)."
      icon="Triangle"
      backTo="/categoria/construccion-hogar"
      backToLabel="Construcción y Hogar"
    >
      <div className="grid gap-6">
        <Tabs value={metodo} onValueChange={setMetodo}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="base-altura">Base y Altura</TabsTrigger>
            <TabsTrigger value="tres-lados">Tres Lados (Herón)</TabsTrigger>
          </TabsList>

          <TabsContent value="base-altura" className="mt-4">
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
                    placeholder="Ejemplo: 5"
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

          <TabsContent value="tres-lados" className="mt-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="lado-a">Lado A (metros)</Label>
                  <Input
                    id="lado-a"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={ladoA}
                    onChange={(e) => setLadoA(e.target.value)}
                    placeholder="Ejemplo: 5"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lado-b">Lado B (metros)</Label>
                  <Input
                    id="lado-b"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={ladoB}
                    onChange={(e) => setLadoB(e.target.value)}
                    placeholder="Ejemplo: 6"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lado-c">Lado C (metros)</Label>
                  <Input
                    id="lado-c"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={ladoC}
                    onChange={(e) => setLadoC(e.target.value)}
                    placeholder="Ejemplo: 7"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Button type="button" onClick={calcularArea}>
          Calcular área
        </Button>

        {error && <p className="text-sm text-red-500">{error}</p>}

        {area !== null && (
          <Card className="bg-primary/10">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Área del triángulo</h3>
                <p className="text-3xl font-bold">{area.toFixed(2)} m²</p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-sm text-muted-foreground">
          <p className="font-medium">Fórmulas utilizadas:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>
              <strong>Método base-altura:</strong> Área = (base × altura) / 2
            </li>
            <li>
              <strong>Fórmula de Herón:</strong> Área = √(s(s-a)(s-b)(s-c)) donde s = (a+b+c)/2
              <br />
              <span className="text-xs">
                Esta fórmula permite calcular el área conociendo solo los tres lados, sin necesidad de conocer la
                altura.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
