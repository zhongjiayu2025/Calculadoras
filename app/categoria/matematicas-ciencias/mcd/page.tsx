"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function McdPage() {
  const [numeros, setNumeros] = useState("")
  const [resultado, setResultado] = useState<{
    mcd: number
    pasos: string[]
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Función para calcular el MCD usando el algoritmo de Euclides
  const calcularMCD = (a: number, b: number, pasos: string[] = []): [number, string[]] => {
    if (b === 0) {
      return [a, pasos]
    }

    pasos.push(`MCD(${a}, ${b}) = MCD(${b}, ${a % b})`)
    return calcularMCD(b, a % b, pasos)
  }

  // Función para calcular el MCD de múltiples números
  const calcularMCDMultiple = (nums: number[]): [number, string[]] => {
    if (nums.length === 0) return [0, []]
    if (nums.length === 1) return [Math.abs(nums[0]), []]

    let pasos: string[] = []
    let resultado = Math.abs(nums[0])

    for (let i = 1; i < nums.length; i++) {
      const [nuevoMCD, nuevosPasos] = calcularMCD(resultado, Math.abs(nums[i]))
      resultado = nuevoMCD
      pasos = [...pasos, ...nuevosPasos]
      if (i < nums.length - 1) {
        pasos.push(`MCD(${resultado}, ${Math.abs(nums[i + 1])})`)
      }
    }

    return [resultado, pasos]
  }

  const calcular = () => {
    setError(null)
    setResultado(null)

    // Validar entrada
    if (!numeros.trim()) {
      setError("Por favor, introduce al menos dos números separados por comas")
      return
    }

    // Parsear los números
    const numerosArray = numeros
      .split(",")
      .map((n) => n.trim())
      .filter((n) => n !== "")
      .map((n) => Number.parseInt(n))

    // Verificar que todos sean números válidos
    if (numerosArray.some(isNaN)) {
      setError("Por favor, introduce solo números enteros separados por comas")
      return
    }

    // Verificar que haya al menos dos números
    if (numerosArray.length < 2) {
      setError("Por favor, introduce al menos dos números separados por comas")
      return
    }

    // Verificar que no todos los números sean cero
    if (numerosArray.every((n) => n === 0)) {
      setError("El MCD no está definido cuando todos los números son cero")
      return
    }

    // Calcular el MCD
    const [mcd, pasos] = calcularMCDMultiple(numerosArray)
    setResultado({ mcd, pasos })
  }

  return (
    <CalculatorLayout
      title="Calculadora de Máximo Común Divisor (MCD)"
      description="Encuentra el máximo común divisor de dos o más números enteros."
      icon="Divide"
      backTo="/categoria/matematicas-ciencias"
      backToLabel="Matemáticas y Ciencias"
    >
      <div className="grid gap-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="numeros">Números enteros (separados por comas)</Label>
            <Input
              id="numeros"
              type="text"
              value={numeros}
              onChange={(e) => setNumeros(e.target.value)}
              placeholder="Ejemplo: 24, 36, 48"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <Button type="button" onClick={calcular}>
            Calcular MCD
          </Button>
        </div>

        {resultado && (
          <Card className="bg-primary/10">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Máximo Común Divisor</h3>
                <p className="text-3xl font-bold">{resultado.mcd}</p>
              </div>

              {resultado.pasos.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Pasos (Algoritmo de Euclides):</h4>
                  <div className="bg-background/80 p-3 rounded-md text-sm font-mono">
                    {resultado.pasos.map((paso, index) => (
                      <div key={index}>{paso}</div>
                    ))}
                    <div className="font-bold mt-1">MCD = {resultado.mcd}</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <div className="text-sm text-muted-foreground">
          <p className="font-medium">¿Qué es el Máximo Común Divisor (MCD)?</p>
          <p className="mt-2">
            El Máximo Común Divisor (MCD) de dos o más números enteros es el mayor número entero positivo que divide a
            todos ellos sin dejar residuo.
          </p>
          <p className="mt-2">Por ejemplo:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>El MCD de 12 y 18 es 6, ya que 6 es el mayor número que divide exactamente a ambos.</li>
            <li>El MCD de 15, 20 y 25 es 5.</li>
            <li>El MCD de números primos entre sí (como 7 y 13) es 1.</li>
          </ul>
          <p className="mt-2">
            Esta calculadora utiliza el algoritmo de Euclides, un método eficiente para encontrar el MCD basado en la
            división con residuo.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  )
}
