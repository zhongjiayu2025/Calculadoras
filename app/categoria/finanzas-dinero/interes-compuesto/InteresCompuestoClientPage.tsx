"use client"

import { useState, useEffect } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Helmet } from "react-helmet"

export default function InteresCompuestoClientPage() {
  const [capital, setCapital] = useState("1000")
  const [interes, setInteres] = useState("5")
  const [periodo, setPeriodo] = useState("5")
  const [frecuencia, setFrecuencia] = useState("1")
  const [resultados, setResultados] = useState({
    montoFinal: 0,
    interesGenerado: 0,
  })

  const calcular = () => {
    const p = Number.parseFloat(capital) // Principal
    const r = Number.parseFloat(interes) / 100 // Tasa de interés en decimal
    const t = Number.parseFloat(periodo) // Tiempo en años
    const n = Number.parseInt(frecuencia) // Frecuencia de capitalización

    if (isNaN(p) || isNaN(r) || isNaN(t) || isNaN(n)) {
      return
    }

    // Fórmula del interés compuesto: A = P(1 + r/n)^(n*t)
    const montoFinal = p * Math.pow(1 + r / n, n * t)
    const interesGenerado = montoFinal - p

    setResultados({
      montoFinal,
      interesGenerado,
    })
  }

  // Calcular cuando cambian los valores
  useEffect(() => {
    calcular()
  }, [capital, interes, periodo, frecuencia])

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Calculadora de Interés Compuesto",
            description:
              "Calcula el valor futuro de una inversión o depósito basado en el capital inicial, tasa de interés anual, frecuencia de capitalización y período de tiempo.",
            applicationCategory: "FinanceApplication",
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
        title="Calculadora de Interés Compuesto"
        description="Calcula el valor futuro de una inversión o depósito basado en el capital inicial, tasa de interés anual, frecuencia de capitalización y período de tiempo."
        icon="TrendingUp"
        backTo="/categoria/finanzas-dinero"
        backToLabel="Finanzas y Dinero"
        disclaimer="Esta calculadora proporciona solo estimaciones. Los resultados reales pueden variar. No constituye asesoramiento financiero profesional."
      >
        <div className="grid gap-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="capital-inicial">Capital inicial (€)</Label>
              <Input
                id="capital-inicial"
                type="number"
                min="0"
                step="100"
                value={capital}
                onChange={(e) => setCapital(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="tasa-interes">Tasa de interés anual (%)</Label>
              <Input
                id="tasa-interes"
                type="number"
                min="0"
                step="0.1"
                value={interes}
                onChange={(e) => setInteres(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="periodo">Período (años)</Label>
              <Input id="periodo" type="number" min="1" value={periodo} onChange={(e) => setPeriodo(e.target.value)} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="frecuencia">Frecuencia de capitalización</Label>
              <Select value={frecuencia} onValueChange={setFrecuencia}>
                <SelectTrigger id="frecuencia">
                  <SelectValue placeholder="Selecciona la frecuencia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Anual (1 vez al año)</SelectItem>
                  <SelectItem value="2">Semestral (2 veces al año)</SelectItem>
                  <SelectItem value="4">Trimestral (4 veces al año)</SelectItem>
                  <SelectItem value="12">Mensual (12 veces al año)</SelectItem>
                  <SelectItem value="365">Diaria (365 veces al año)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="button" onClick={calcular}>
            Calcular
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Monto Final</h3>
                  <p className="text-2xl font-bold">
                    {resultados.montoFinal.toLocaleString("es-ES", {
                      style: "currency",
                      currency: "EUR",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Interés Generado</h3>
                  <p className="text-2xl font-bold">
                    {resultados.interesGenerado.toLocaleString("es-ES", {
                      style: "currency",
                      currency: "EUR",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">¿Qué es el interés compuesto?</h2>
            <p className="mb-3">
              El interés compuesto es el interés que se genera sobre el capital inicial más los intereses acumulados en
              períodos anteriores. Es lo que hace que tus inversiones crezcan exponencialmente con el tiempo.
            </p>
            <h3 className="text-lg font-medium mb-2">Fórmula del interés compuesto</h3>
            <div className="bg-accent/30 p-3 rounded-md mb-3">
              <p className="text-center font-medium">A = P(1 + r/n)^(n*t)</p>
            </div>
            <p className="mb-3">Donde:</p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>
                <strong>A</strong> = Monto final
              </li>
              <li>
                <strong>P</strong> = Capital inicial
              </li>
              <li>
                <strong>r</strong> = Tasa de interés anual (en decimal)
              </li>
              <li>
                <strong>n</strong> = Número de veces que el interés se capitaliza por año
              </li>
              <li>
                <strong>t</strong> = Tiempo en años
              </li>
            </ul>
            <p>
              Esta calculadora te permite simular diferentes escenarios de inversión para ver cómo crece tu dinero a lo
              largo del tiempo gracias al poder del interés compuesto.
            </p>
          </div>
        </div>
      </CalculatorLayout>
    </>
  )
}
