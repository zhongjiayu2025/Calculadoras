"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CoeficientesBinomialesPage() {
  const [n, setN] = useState("")
  const [k, setK] = useState("")
  const [resultado, setResultado] = useState<{
    coeficiente: number
    formula: string
    pasos: string[]
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Función para calcular el factorial
  const factorial = (num: number): number => {
    if (num === 0 || num === 1) return 1
    let result = 1
    for (let i = 2; i <= num; i++) {
      result *= i
    }
    return result
  }

  // Función para calcular el coeficiente binomial usando la fórmula C(n,k) = n! / (k! * (n-k)!)
  const calcularCoeficienteBinomial = (n: number, k: number): [number, string[]] => {
    const pasos: string[] = []

    // Optimización: si k > n-k, usar k = n-k para reducir cálculos
    if (k > n - k) {
      k = n - k
      pasos.push(`Como ${k} > ${n}-${k}, usamos C(${n},${n}-${k}) = C(${n},${k}) para optimizar el cálculo`)
    }

    // Método directo para valores pequeños
    if (n <= 20) {
      const nFactorial = factorial(n)
      const kFactorial = factorial(k)
      const nkFactorial = factorial(n - k)

      pasos.push(`Calculamos ${n}! = ${nFactorial}`)
      pasos.push(`Calculamos ${k}! = ${kFactorial}`)
      pasos.push(`Calculamos (${n}-${k})! = ${n - k}! = ${nkFactorial}`)
      pasos.push(`C(${n},${k}) = ${n}! / (${k}! × (${n}-${k})!) = ${nFactorial} / (${kFactorial} × ${nkFactorial})`)

      const coeficiente = nFactorial / (kFactorial * nkFactorial)
      return [coeficiente, pasos]
    }
    // Método multiplicativo para valores grandes (evita desbordamiento)
    else {
      let coeficiente = 1
      pasos.push(`Para evitar desbordamiento con números grandes, usamos el método multiplicativo:`)
      pasos.push(`C(${n},${k}) = ∏(i=1 to ${k}) (${n}-${k}+i)/i`)

      for (let i = 1; i <= k; i++) {
        const numerador = n - k + i
        const denominador = i
        const valorPrevio = coeficiente
        coeficiente = (coeficiente * numerador) / denominador
        pasos.push(`Paso ${i}: ${valorPrevio} × (${numerador}/${denominador}) = ${coeficiente}`)
      }

      return [coeficiente, pasos]
    }
  }

  const calcular = () => {
    setError(null)
    setResultado(null)

    // Validar entrada
    const nValue = Number.parseInt(n)
    const kValue = Number.parseInt(k)

    if (isNaN(nValue) || isNaN(kValue)) {
      setError("Por favor, introduce valores numéricos válidos")
      return
    }

    if (nValue < 0 || kValue < 0) {
      setError("Los valores deben ser números enteros no negativos")
      return
    }

    if (kValue > nValue) {
      setError("El valor de k no puede ser mayor que n")
      return
    }

    // Calcular el coeficiente binomial
    try {
      const [coeficiente, pasos] = calcularCoeficienteBinomial(nValue, kValue)
      setResultado({
        coeficiente,
        formula: `C(${nValue},${kValue}) = \\binom{${nValue}}{${kValue}} = \\frac{${nValue}!}{${kValue}!(${nValue}-${kValue})!}`,
        pasos,
      })
    } catch (err) {
      setError("Error al calcular el coeficiente binomial. Intenta con valores más pequeños.")
      console.error(err)
    }
  }

  return (
    <CalculatorLayout
      title="Calculadora de Binomiales"
      description="Usa nuestro calculador de binomios para hallar el coeficiente 'n sobre k' (combinaciones de n elementos tomados de k en k)."
      icon="Code"
      backTo="/categoria/matematicas-ciencias"
      backToLabel="Matemáticas y Ciencias"
    >
      <div className="grid gap-6">
        <div className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="valor-n">Valor de n</Label>
              <Input
                id="valor-n"
                type="number"
                min="0"
                step="1"
                value={n}
                onChange={(e) => setN(e.target.value)}
                placeholder="Ejemplo: 5"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="valor-k">Valor de k</Label>
              <Input
                id="valor-k"
                type="number"
                min="0"
                step="1"
                value={k}
                onChange={(e) => setK(e.target.value)}
                placeholder="Ejemplo: 2"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="button" onClick={calcular}>
            Calcular coeficiente binomial
          </Button>
        </div>

        {resultado && (
          <Card className="bg-primary/10">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Coeficiente Binomial</h3>
                <div className="flex items-center justify-center mb-2">
                  <div className="text-3xl font-bold">
                    C({n},{k}) = <span className="text-primary">{resultado.coeficiente}</span>
                  </div>
                </div>
                <div className="text-lg">
                  <span className="inline-flex flex-col items-center mx-1">
                    <span>({n})</span>
                    <span className="border-t border-current w-full"></span>
                    <span>({k})</span>
                  </span>{" "}
                  = {resultado.coeficiente}
                </div>
              </div>

              {resultado.pasos.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Pasos del cálculo:</h4>
                  <div className="bg-background/80 p-3 rounded-md text-sm">
                    {resultado.pasos.map((paso, index) => (
                      <div key={index} className="mb-1">
                        {paso}
                      </div>
                    ))}
                    <div className="font-bold mt-1">Resultado: {resultado.coeficiente}</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <div className="text-sm text-muted-foreground">
          <p className="font-medium">¿Qué son los coeficientes binomiales?</p>
          <p className="mt-2">
            El coeficiente binomial C(n,k), también denotado como (n k) o nCk, representa el número de formas de
            seleccionar k elementos de un conjunto de n elementos, sin importar el orden.
          </p>
          <p className="mt-2">La fórmula para calcular el coeficiente binomial es:</p>
          <div className="py-2 px-4 my-2 bg-accent/50 rounded text-center">
            <p>C(n,k) = n! / (k! × (n-k)!)</p>
          </div>
          <p className="mt-2">Propiedades importantes:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>C(n,0) = C(n,n) = 1</li>
            <li>C(n,k) = C(n,n-k)</li>
            <li>C(n,k) + C(n,k-1) = C(n+1,k)</li>
          </ul>
          <p className="mt-2">Aplicaciones:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Teorema del binomio: (x + y)ⁿ = ∑ C(n,k) xⁿ⁻ᵏ yᵏ</li>
            <li>Probabilidad: cálculo de combinaciones en problemas de probabilidad</li>
            <li>Teoría de conjuntos: número de subconjuntos de tamaño k</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
