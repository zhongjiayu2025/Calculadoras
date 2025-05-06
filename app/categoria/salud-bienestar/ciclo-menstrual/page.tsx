"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { addDays, format, parse } from "date-fns"
import { es } from "date-fns/locale"

export default function CicloMenstrualPage() {
  const [ultimaMenstruacion, setUltimaMenstruacion] = useState("")
  const [duracionCiclo, setDuracionCiclo] = useState("28")
  const [duracionPeriodo, setDuracionPeriodo] = useState("5")
  const [resultados, setResultados] = useState<{
    proximaMenstruacion: string
    finProximaMenstruacion: string
    inicioFertil: string
    finFertil: string
    ovulacion: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calcularCiclo = () => {
    setError(null)

    if (!ultimaMenstruacion) {
      setError("Por favor, introduce la fecha de tu última menstruación")
      return
    }

    try {
      const fechaUltimaMenstruacion = parse(ultimaMenstruacion, "yyyy-MM-dd", new Date())
      const ciclo = Number.parseInt(duracionCiclo)
      const periodo = Number.parseInt(duracionPeriodo)

      if (isNaN(ciclo) || ciclo < 21 || ciclo > 35) {
        setError("La duración del ciclo debe estar entre 21 y 35 días")
        return
      }

      if (isNaN(periodo) || periodo < 2 || periodo > 8) {
        setError("La duración del período debe estar entre 2 y 8 días")
        return
      }

      // Calcular próxima menstruación
      const proximaMenstruacion = addDays(fechaUltimaMenstruacion, ciclo)
      const finProximaMenstruacion = addDays(proximaMenstruacion, periodo - 1)

      // Calcular ovulación (aproximadamente 14 días antes de la próxima menstruación)
      const ovulacion = addDays(proximaMenstruacion, -14)

      // Calcular ventana fértil (5 días antes y 1 día después de la ovulación)
      const inicioFertil = addDays(ovulacion, -5)
      const finFertil = addDays(ovulacion, 1)

      setResultados({
        proximaMenstruacion: format(proximaMenstruacion, "d 'de' MMMM 'de' yyyy", { locale: es }),
        finProximaMenstruacion: format(finProximaMenstruacion, "d 'de' MMMM 'de' yyyy", { locale: es }),
        inicioFertil: format(inicioFertil, "d 'de' MMMM 'de' yyyy", { locale: es }),
        finFertil: format(finFertil, "d 'de' MMMM 'de' yyyy", { locale: es }),
        ovulacion: format(ovulacion, "d 'de' MMMM 'de' yyyy", { locale: es }),
      })
    } catch (err) {
      setError("Error al calcular las fechas. Por favor, verifica los datos introducidos.")
      console.error(err)
    }
  }

  return (
    <CalculatorLayout
      title="Calculadora de Ciclo Menstrual"
      description="Predice la fecha aproximada de la próxima menstruación y la ventana fértil basándose en la fecha de la última menstruación y la duración promedio del ciclo."
      icon="Calendar"
      backTo="/categoria/salud-bienestar"
      backToLabel="Salud y Bienestar"
      disclaimer="Esta calculadora proporciona solo estimaciones basadas en ciclos regulares. Los ciclos menstruales pueden variar por muchos factores. NO debe usarse como método anticonceptivo ni para planificación familiar. Consulta siempre con un profesional de la salud."
    >
      <div className="grid gap-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="ultima-menstruacion">Fecha de tu última menstruación</Label>
            <Input
              id="ultima-menstruacion"
              type="date"
              value={ultimaMenstruacion}
              onChange={(e) => setUltimaMenstruacion(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="duracion-ciclo">Duración de tu ciclo (días)</Label>
              <Input
                id="duracion-ciclo"
                type="number"
                min="21"
                max="35"
                value={duracionCiclo}
                onChange={(e) => setDuracionCiclo(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">La media es de 28 días (rango normal: 21-35)</p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="duracion-periodo">Duración de tu período (días)</Label>
              <Input
                id="duracion-periodo"
                type="number"
                min="2"
                max="8"
                value={duracionPeriodo}
                onChange={(e) => setDuracionPeriodo(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">La media es de 5 días (rango normal: 2-8)</p>
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="button" onClick={calcularCiclo}>
            Calcular ciclo
          </Button>
        </div>

        {resultados && (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Próxima menstruación</h3>
                  <p className="text-primary font-semibold">
                    Del {resultados.proximaMenstruacion} al {resultados.finProximaMenstruacion}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Ventana fértil (estimada)</h3>
                  <p>
                    Del {resultados.inicioFertil} al {resultados.finFertil}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Ovulación (estimada)</h3>
                  <p>{resultados.ovulacion}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-sm text-muted-foreground">
          <p className="font-medium">Información importante:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>
              Esta calculadora asume ciclos regulares. Muchas mujeres tienen ciclos irregulares que pueden variar mes a
              mes.
            </li>
            <li>
              La ovulación típicamente ocurre 14 días antes del inicio de la siguiente menstruación, no necesariamente
              en el día 14 del ciclo.
            </li>
            <li>
              La ventana fértil incluye aproximadamente 5 días antes de la ovulación y 1 día después, debido a la
              supervivencia de los espermatozoides y el óvulo.
            </li>
            <li>
              Factores como estrés, cambios de peso, medicamentos, problemas de salud y viajes pueden afectar tu ciclo.
            </li>
            <li>
              Si estás intentando concebir o evitar un embarazo, consulta con un profesional de la salud sobre métodos
              más precisos.
            </li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
