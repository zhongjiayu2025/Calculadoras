"use client"

import { useState, useEffect } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function FondosIndexadosPage() {
  const [inversionInicial, setInversionInicial] = useState("10000")
  const [aportacionMensual, setAportacionMensual] = useState("200")
  const [rendimientoAnual, setRendimientoAnual] = useState("7")
  const [años, setAños] = useState("20")
  const [resultados, setResultados] = useState<{
    montoFinal: number
    interesGenerado: number
    aportacionesTotal: number
    datosGrafico: Array<{ año: number; valor: number }>
  } | null>(null)

  const calcular = () => {
    const invInicial = Number.parseFloat(inversionInicial) || 0
    const aportMensual = Number.parseFloat(aportacionMensual) || 0
    const rendimiento = Number.parseFloat(rendimientoAnual) / 100 || 0
    const periodosAños = Number.parseInt(años) || 0

    if (periodosAños <= 0) {
      return
    }

    // Rendimiento mensual
    const rendimientoMensual = Math.pow(1 + rendimiento, 1 / 12) - 1

    let montoAcumulado = invInicial
    const datosGrafico = [{ año: 0, valor: invInicial }]

    // Simulación mes a mes
    for (let mes = 1; mes <= periodosAños * 12; mes++) {
      // Aplicar rendimiento al monto actual
      montoAcumulado = montoAcumulado * (1 + rendimientoMensual)
      // Añadir aportación mensual
      montoAcumulado += aportMensual

      // Guardar datos para el gráfico (solo al final de cada año)
      if (mes % 12 === 0) {
        datosGrafico.push({
          año: mes / 12,
          valor: Math.round(montoAcumulado),
        })
      }
    }

    const aportacionesTotal = invInicial + aportMensual * periodosAños * 12
    const interesGenerado = montoAcumulado - aportacionesTotal

    setResultados({
      montoFinal: montoAcumulado,
      interesGenerado,
      aportacionesTotal,
      datosGrafico,
    })
  }

  // Calcular cuando cambian los valores
  useEffect(() => {
    calcular()
  }, [inversionInicial, aportacionMensual, rendimientoAnual, años])

  const formatoEuros = (valor: number) => {
    return valor.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  }

  return (
    <CalculatorLayout
      title="calculadora fondos indexados"
      description="Nuestra calculadora fondos indexados proyecta el crecimiento de tu inversión con capital inicial, aportaciones periódicas y tasa de retorno anual."
      icon="LineChart"
      backTo="/categoria/finanzas-dinero"
      backToLabel="Finanzas y Dinero"
      disclaimer="Esta calculadora proporciona solo estimaciones basadas en un rendimiento constante. Los rendimientos reales de los fondos indexados varían y pueden ser positivos o negativos. Rentabilidades pasadas no garantizan rentabilidades futuras. No constituye asesoramiento financiero profesional."
    >
      <div className="grid gap-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="inversion-inicial">Inversión inicial (€)</Label>
            <Input
              id="inversion-inicial"
              type="number"
              min="0"
              step="1000"
              value={inversionInicial}
              onChange={(e) => setInversionInicial(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="aportacion-mensual">Aportación mensual (€)</Label>
            <Input
              id="aportacion-mensual"
              type="number"
              min="0"
              step="50"
              value={aportacionMensual}
              onChange={(e) => setAportacionMensual(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <div className="flex justify-between">
              <Label htmlFor="rendimiento-anual">Rendimiento anual estimado (%)</Label>
              <span className="text-sm font-medium">{rendimientoAnual}%</span>
            </div>
            <Slider
              id="rendimiento-anual"
              min={1}
              max={15}
              step={0.5}
              value={[Number.parseFloat(rendimientoAnual)]}
              onValueChange={(value) => setRendimientoAnual(value[0].toString())}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1%</span>
              <span>5%</span>
              <span>10%</span>
              <span>15%</span>
            </div>
          </div>

          <div className="grid gap-2">
            <div className="flex justify-between">
              <Label htmlFor="años">Período de inversión (años)</Label>
              <span className="text-sm font-medium">{años} años</span>
            </div>
            <Slider
              id="años"
              min={1}
              max={40}
              step={1}
              value={[Number.parseInt(años)]}
              onValueChange={(value) => setAños(value[0].toString())}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1</span>
              <span>10</span>
              <span>20</span>
              <span>30</span>
              <span>40</span>
            </div>
          </div>

          <Button type="button" onClick={calcular}>
            Calcular
          </Button>
        </div>

        {resultados && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Valor final estimado</h3>
                    <p className="text-2xl font-bold">{formatoEuros(resultados.montoFinal)}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Total aportado</h3>
                    <p className="text-2xl font-bold">{formatoEuros(resultados.aportacionesTotal)}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Interés generado</h3>
                    <p className="text-2xl font-bold">{formatoEuros(resultados.interesGenerado)}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-4 text-center">
                  Proyección de crecimiento
                </h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={resultados.datosGrafico}
                      margin={{
                        top: 5,
                        right: 5,
                        left: 5,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="año" label={{ value: "Años", position: "insideBottomRight", offset: -5 }} />
                      <YAxis
                        tickFormatter={(value) => `${Math.round(value / 1000)}k`}
                        label={{ value: "Valor (€)", angle: -90, position: "insideLeft" }}
                      />
                      <Tooltip
                        formatter={(value) => [`${formatoEuros(Number(value))}`, "Valor"]}
                        labelFormatter={(label) => `Año ${label}`}
                      />
                      <Line type="monotone" dataKey="valor" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        <div className="text-sm text-muted-foreground">
          <p className="font-medium">Información sobre fondos indexados:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>
              Los fondos indexados son instrumentos de inversión que replican la composición y rendimiento de un índice
              de mercado (como el S&P 500, IBEX 35, etc.).
            </li>
            <li>
              Históricamente, el rendimiento promedio anual del S&P 500 ha sido de aproximadamente 7-10% (antes de
              inflación) en períodos largos.
            </li>
            <li>
              La inversión en fondos indexados suele ser considerada una estrategia de inversión pasiva con comisiones
              generalmente más bajas que los fondos gestionados activamente.
            </li>
            <li>
              El interés compuesto y las aportaciones periódicas pueden tener un impacto significativo en el crecimiento
              a largo plazo.
            </li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
