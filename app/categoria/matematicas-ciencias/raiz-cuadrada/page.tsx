"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function RaizCuadradaPage() {
  const [numero, setNumero] = useState("")
  const [resultado, setResultado] = useState<{
    raizExacta: number
    esExacta: boolean
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calcularRaizCuadrada = () => {
    // Limpiar estados previos
    setError(null)
    setResultado(null)

    // Validar que sea un número
    const num = Number.parseFloat(numero)
    if (isNaN(num)) {
      setError("Por favor, introduce un número válido")
      return
    }

    // Validar que sea no negativo
    if (num < 0) {
      setError("No se puede calcular la raíz cuadrada de un número negativo en el conjunto de los números reales")
      return
    }

    // Calcular la raíz cuadrada
    const raiz = Math.sqrt(num)

    // Verificar si la raíz es exacta (un número entero)
    const esExacta = raiz === Math.floor(raiz)

    setResultado({
      raizExacta: raiz,
      esExacta,
    })
  }

  return (
    <CalculatorLayout
      title="Calculadora de Raíz Cuadrada"
      description="Calcula la raíz cuadrada de un número no negativo."
      icon="Check"
      backTo="/categoria/matematicas-ciencias"
      backToLabel="Matemáticas y Ciencias"
    >
      <div className="grid gap-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="numero">Número</Label>
            <Input
              id="numero"
              type="number"
              min="0"
              step="any"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              placeholder="Introduce un número no negativo"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <Button type="button" onClick={calcularRaizCuadrada}>
            Calcular raíz cuadrada
          </Button>
        </div>

        {resultado && (
          <Card className="bg-primary/10">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Resultado</h3>
                <p className="text-3xl font-bold">
                  √{numero} = {resultado.raizExacta.toFixed(resultado.esExacta ? 0 : 8)}
                </p>
                {!resultado.esExacta && (
                  <p className="mt-2 text-sm text-muted-foreground">Este resultado es una aproximación decimal.</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-sm text-muted-foreground">
          <p className="font-medium">¿Qué es la raíz cuadrada?</p>
          <p className="mt-2">
            La raíz cuadrada de un número <em>a</em> es un número <em>b</em> tal que <em>b²</em> = <em>a</em>.
          </p>
          <p className="mt-2">Por ejemplo, la raíz cuadrada de 9 es 3, porque 3² = 9.</p>
          <p className="mt-2">Algunas propiedades importantes:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>La raíz cuadrada de un número negativo no existe en el conjunto de los números reales.</li>
            <li>La raíz cuadrada de 0 es 0.</li>
            <li>La raíz cuadrada de 1 es 1.</li>
            <li>√(a × b) = √a × √b, para a, b &gt;= 0.</li>
            <li>√(a / b) = √a / √b, para a &gt;= 0, b &gt; 0.</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
