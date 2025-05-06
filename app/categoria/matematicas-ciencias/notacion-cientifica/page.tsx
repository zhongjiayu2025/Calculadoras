"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NotacionCientificaPage() {
  const [numeroDecimal, setNumeroDecimal] = useState("")
  const [numeroMantisa, setNumeroMantisa] = useState("")
  const [numeroExponente, setNumeroExponente] = useState("")
  const [resultadoDecimal, setResultadoDecimal] = useState<string | null>(null)
  const [resultadoCientifico, setResultadoCientifico] = useState<{
    mantisa: string
    exponente: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Convertir de notación decimal a científica
  const convertirANotacionCientifica = () => {
    setError(null)
    setResultadoCientifico(null)

    if (!numeroDecimal) {
      setError("Por favor, introduce un número")
      return
    }

    try {
      // Intentar parsear el número
      const num = Number.parseFloat(numeroDecimal)

      if (isNaN(num)) {
        setError("Por favor, introduce un número válido")
        return
      }

      if (num === 0) {
        setResultadoCientifico({ mantisa: "0", exponente: "0" })
        return
      }

      // Convertir a notación científica
      const exponente = Math.floor(Math.log10(Math.abs(num)))
      const mantisa = num / Math.pow(10, exponente)

      setResultadoCientifico({
        mantisa: mantisa.toFixed(6).replace(/\.?0+$/, ""),
        exponente: exponente.toString(),
      })
    } catch (err) {
      setError("Error al convertir el número. Verifica el formato.")
      console.error(err)
    }
  }

  // Convertir de notación científica a decimal
  const convertirANotacionDecimal = () => {
    setError(null)
    setResultadoDecimal(null)

    if (!numeroMantisa || !numeroExponente) {
      setError("Por favor, completa todos los campos")
      return
    }

    try {
      // Intentar parsear los números
      const mantisa = Number.parseFloat(numeroMantisa)
      const exponente = Number.parseInt(numeroExponente)

      if (isNaN(mantisa) || isNaN(exponente)) {
        setError("Por favor, introduce valores numéricos válidos")
        return
      }

      // Calcular el número en notación decimal
      const resultado = mantisa * Math.pow(10, exponente)

      // Formatear el resultado
      if (Math.abs(resultado) >= 1e-3 && Math.abs(resultado) < 1e7) {
        // Mostrar en notación decimal normal para números de tamaño razonable
        setResultadoDecimal(resultado.toString())
      } else {
        // Usar toExponential para números muy grandes o muy pequeños
        setResultadoDecimal(resultado.toExponential(10))
      }
    } catch (err) {
      setError("Error al convertir el número. Verifica el formato.")
      console.error(err)
    }
  }

  return (
    <CalculatorLayout
      title="Calculadora de Notación Científica"
      description="Convierte números entre notación decimal estándar y notación científica."
      icon="Superscript"
      backTo="/categoria/matematicas-ciencias"
      backToLabel="Matemáticas y Ciencias"
    >
      <div className="grid gap-6">
        <Tabs defaultValue="decimal-a-cientifica">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="decimal-a-cientifica">Decimal → Científica</TabsTrigger>
            <TabsTrigger value="cientifica-a-decimal">Científica → Decimal</TabsTrigger>
          </TabsList>

          <TabsContent value="decimal-a-cientifica" className="mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="numero-decimal">Número en notación decimal</Label>
                <Input
                  id="numero-decimal"
                  type="text"
                  value={numeroDecimal}
                  onChange={(e) => setNumeroDecimal(e.target.value)}
                  placeholder="Ejemplo: 0.00123 o 45600000"
                />
              </div>

              <Button type="button" onClick={convertirANotacionCientifica}>
                Convertir a notación científica
              </Button>

              {error && <p className="text-sm text-red-500">{error}</p>}

              {resultadoCientifico && (
                <Card className="bg-primary/10">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <h3 className="text-lg font-medium mb-2">Notación científica</h3>
                      <p className="text-2xl font-bold">
                        {resultadoCientifico.mantisa} × 10<sup>{resultadoCientifico.exponente}</sup>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="cientifica-a-decimal" className="mt-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="mantisa">Mantisa (a)</Label>
                  <Input
                    id="mantisa"
                    type="text"
                    value={numeroMantisa}
                    onChange={(e) => setNumeroMantisa(e.target.value)}
                    placeholder="Ejemplo: 1.23"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="exponente">Exponente (n)</Label>
                  <Input
                    id="exponente"
                    type="text"
                    value={numeroExponente}
                    onChange={(e) => setNumeroExponente(e.target.value)}
                    placeholder="Ejemplo: -3"
                  />
                </div>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                Formato: a × 10<sup>n</sup>
              </div>

              <Button type="button" onClick={convertirANotacionDecimal}>
                Convertir a notación decimal
              </Button>

              {error && <p className="text-sm text-red-500">{error}</p>}

              {resultadoDecimal && (
                <Card className="bg-primary/10">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <h3 className="text-lg font-medium mb-2">Notación decimal</h3>
                      <p className="text-2xl font-bold">{resultadoDecimal}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-sm text-muted-foreground">
          <p className="font-medium">¿Qué es la notación científica?</p>
          <p className="mt-2">
            La notación científica es una forma de escribir números que son demasiado grandes o demasiado pequeños de
            manera más conveniente. Se expresa como:
          </p>
          <div className="py-2 px-4 my-2 bg-accent/50 rounded text-center">
            <p>
              a × 10<sup>n</sup>
            </p>
          </div>
          <p>Donde:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>
              <strong>a</strong> es la mantisa, un número mayor o igual a 1 y menor que 10 (1 ≤ a {"<"} 10)
            </li>
            <li>
              <strong>n</strong> es el exponente, un número entero
            </li>
          </ul>
          <p className="mt-2">Ejemplos:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>
              0.00123 = 1.23 × 10<sup>-3</sup>
            </li>
            <li>
              45,600,000 = 4.56 × 10<sup>7</sup>
            </li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
