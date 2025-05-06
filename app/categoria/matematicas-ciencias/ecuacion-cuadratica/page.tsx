"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function EcuacionCuadraticaPage() {
  const [coefA, setCoefA] = useState("1")
  const [coefB, setCoefB] = useState("0")
  const [coefC, setCoefC] = useState("0")
  const [resultado, setResultado] = useState<{
    tipoSolucion: string
    x1?: number
    x2?: number
    parteReal?: number
    parteImaginaria?: number
  } | null>(null)

  const resolverEcuacion = () => {
    const a = Number.parseFloat(coefA)
    const b = Number.parseFloat(coefB)
    const c = Number.parseFloat(coefC)

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      setResultado(null)
      return
    }

    if (a === 0) {
      // No es una ecuación cuadrática sino lineal
      if (b === 0) {
        if (c === 0) {
          setResultado({ tipoSolucion: "infinitas" })
        } else {
          setResultado({ tipoSolucion: "sinSolucion" })
        }
      } else {
        const x = -c / b
        setResultado({ tipoSolucion: "lineal", x1: x })
      }
      return
    }

    // Calculamos el discriminante
    const discriminante = b * b - 4 * a * c

    if (discriminante > 0) {
      // Dos soluciones reales distintas
      const x1 = (-b + Math.sqrt(discriminante)) / (2 * a)
      const x2 = (-b - Math.sqrt(discriminante)) / (2 * a)
      setResultado({ tipoSolucion: "dosReales", x1, x2 })
    } else if (discriminante === 0) {
      // Una solución real (doble)
      const x = -b / (2 * a)
      setResultado({ tipoSolucion: "unaReal", x1: x })
    } else {
      // Soluciones complejas conjugadas
      const parteReal = -b / (2 * a)
      const parteImaginaria = Math.sqrt(-discriminante) / (2 * a)
      setResultado({ tipoSolucion: "complejas", parteReal, parteImaginaria })
    }
  }

  const renderResultado = () => {
    if (!resultado) return null

    switch (resultado.tipoSolucion) {
      case "dosReales":
        return (
          <>
            <p className="text-lg font-medium mb-2">Soluciones reales:</p>
            <p className="text-xl">x₁ = {resultado.x1?.toFixed(4)}</p>
            <p className="text-xl">x₂ = {resultado.x2?.toFixed(4)}</p>
          </>
        )
      case "unaReal":
        return (
          <>
            <p className="text-lg font-medium mb-2">Solución real (doble):</p>
            <p className="text-xl">x = {resultado.x1?.toFixed(4)}</p>
          </>
        )
      case "complejas":
        return (
          <>
            <p className="text-lg font-medium mb-2">Soluciones complejas conjugadas:</p>
            <p className="text-xl">
              x₁ = {resultado.parteReal?.toFixed(4)} + {resultado.parteImaginaria?.toFixed(4)}i
            </p>
            <p className="text-xl">
              x₂ = {resultado.parteReal?.toFixed(4)} - {resultado.parteImaginaria?.toFixed(4)}i
            </p>
          </>
        )
      case "lineal":
        return (
          <>
            <p className="text-lg font-medium mb-2">Ecuación lineal:</p>
            <p className="text-xl">x = {resultado.x1?.toFixed(4)}</p>
          </>
        )
      case "infinitas":
        return <p className="text-lg">La ecuación tiene infinitas soluciones.</p>
      case "sinSolucion":
        return <p className="text-lg">La ecuación no tiene solución.</p>
      default:
        return null
    }
  }

  return (
    <CalculatorLayout
      title="Calculadora de Ecuación Cuadrática"
      description="Resuelve ecuaciones cuadráticas de la forma ax² + bx + c = 0, encontrando las raíces reales o complejas."
      icon="Function"
      backTo="/categoria/matematicas-ciencias"
      backToLabel="Matemáticas y Ciencias"
    >
      <div className="grid gap-6">
        <div className="flex items-center justify-center text-lg font-medium">
          <span>
            <span className="inline-block w-6 text-right">a</span>x² +
            <span className="inline-block w-6 text-right ml-1">b</span>x +
            <span className="inline-block w-6 text-right ml-1">c</span> = 0
          </span>
        </div>

        <div className="grid gap-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="coef-a">Coeficiente a</Label>
              <Input id="coef-a" type="number" step="any" value={coefA} onChange={(e) => setCoefA(e.target.value)} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="coef-b">Coeficiente b</Label>
              <Input id="coef-b" type="number" step="any" value={coefB} onChange={(e) => setCoefB(e.target.value)} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="coef-c">Coeficiente c</Label>
              <Input id="coef-c" type="number" step="any" value={coefC} onChange={(e) => setCoefC(e.target.value)} />
            </div>
          </div>

          <Button type="button" onClick={resolverEcuacion}>
            Resolver ecuación
          </Button>
        </div>

        {resultado && (
          <Card>
            <CardContent className="p-6">
              <div className="text-center">{renderResultado()}</div>
            </CardContent>
          </Card>
        )}

        <div className="text-sm text-muted-foreground">
          <p>La fórmula general para resolver ecuaciones cuadráticas es:</p>
          <div className="py-2 px-4 my-2 bg-accent/50 rounded">
            <p className="text-center">x = (-b ± √(b² - 4ac)) / (2a)</p>
          </div>
          <p>Donde el discriminante (b² - 4ac) determina la naturaleza de las soluciones:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Si b² - 4ac {">"} 0, hay dos soluciones reales distintas.</li>
            <li>Si b² - 4ac = 0, hay una solución real (doble).</li>
            <li>Si b² - 4ac {"<"} 0, hay dos soluciones complejas conjugadas.</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
