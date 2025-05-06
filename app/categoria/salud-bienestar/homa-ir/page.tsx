"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function HomaIrPage() {
  const [glucosa, setGlucosa] = useState("")
  const [insulina, setInsulina] = useState("")
  const [unidadGlucosa, setUnidadGlucosa] = useState("mg/dl")
  const [unidadInsulina, setUnidadInsulina] = useState("uUI/ml")
  const [indiceHoma, setIndiceHoma] = useState<number | null>(null)
  const [interpretacion, setInterpretacion] = useState<string | null>(null)

  const calcularHoma = () => {
    let glucosaValor = Number.parseFloat(glucosa)
    let insulinaValor = Number.parseFloat(insulina)

    if (isNaN(glucosaValor) || isNaN(insulinaValor) || glucosaValor <= 0 || insulinaValor <= 0) {
      setIndiceHoma(null)
      setInterpretacion(null)
      return
    }

    // Convertir glucosa a mg/dl si está en mmol/L
    if (unidadGlucosa === "mmol/L") {
      glucosaValor = glucosaValor * 18
    }

    // Convertir insulina a uUI/ml si está en pmol/L
    if (unidadInsulina === "pmol/L") {
      insulinaValor = insulinaValor / 6.945
    }

    // Fórmula HOMA-IR: (Glucosa [mg/dl] × Insulina [uUI/ml]) / 405
    const homa = (glucosaValor * insulinaValor) / 405
    setIndiceHoma(homa)

    // Interpretación básica
    if (homa < 1.0) {
      setInterpretacion("Sensibilidad a la insulina normal")
    } else if (homa >= 1.0 && homa <= 2.5) {
      setInterpretacion("Resistencia a la insulina promedio")
    } else if (homa > 2.5 && homa <= 5.0) {
      setInterpretacion("Resistencia a la insulina moderada")
    } else {
      setInterpretacion("Resistencia a la insulina significativa")
    }
  }

  return (
    <CalculatorLayout
      title="Calculadora del Índice HOMA-IR"
      description="Calcula el índice HOMA-IR para evaluar la resistencia a la insulina, a partir de los valores de glucosa e insulina en ayunas."
      icon="Activity"
      backTo="/categoria/salud-bienestar"
      backToLabel="Salud y Bienestar"
      disclaimer="Esta calculadora proporciona solo una estimación. El resultado debe ser interpretado por un profesional médico. No debe utilizarse para autodiagnóstico o tratamiento."
    >
      <div className="grid gap-6">
        <div className="grid gap-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 grid gap-2">
              <Label htmlFor="glucosa">Glucosa en ayunas</Label>
              <Input
                id="glucosa"
                type="number"
                min="0"
                step="0.1"
                value={glucosa}
                onChange={(e) => setGlucosa(e.target.value)}
                placeholder="Ejemplo: 95"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="unidad-glucosa">Unidad</Label>
              <Select value={unidadGlucosa} onValueChange={setUnidadGlucosa}>
                <SelectTrigger id="unidad-glucosa">
                  <SelectValue placeholder="Unidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mg/dl">mg/dl</SelectItem>
                  <SelectItem value="mmol/L">mmol/L</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 grid gap-2">
              <Label htmlFor="insulina">Insulina en ayunas</Label>
              <Input
                id="insulina"
                type="number"
                min="0"
                step="0.1"
                value={insulina}
                onChange={(e) => setInsulina(e.target.value)}
                placeholder="Ejemplo: 5"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="unidad-insulina">Unidad</Label>
              <Select value={unidadInsulina} onValueChange={setUnidadInsulina}>
                <SelectTrigger id="unidad-insulina">
                  <SelectValue placeholder="Unidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uUI/ml">μUI/ml</SelectItem>
                  <SelectItem value="pmol/L">pmol/L</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="button" onClick={calcularHoma}>
            Calcular HOMA-IR
          </Button>
        </div>

        {indiceHoma !== null && (
          <Card className="bg-primary/10">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Índice HOMA-IR</h3>
                <p className="text-3xl font-bold">{indiceHoma.toFixed(2)}</p>
                {interpretacion && (
                  <p className="mt-2 text-sm font-medium">
                    Interpretación: <span className="font-normal">{interpretacion}</span>
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-sm text-muted-foreground">
          <p className="font-medium">Información sobre el índice HOMA-IR:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>
              El índice HOMA-IR (Homeostatic Model Assessment for Insulin Resistance) es un método para evaluar la
              resistencia a la insulina a partir de los niveles de glucosa e insulina en ayunas.
            </li>
            <li>La fórmula utilizada es: HOMA-IR = (Glucosa [mg/dl] × Insulina [μUI/ml]) / 405</li>
            <li>
              Valores de referencia generales (pueden variar según laboratorio y población):
              <ul className="list-disc pl-5 mt-1">
                <li>{"<"} 1.0: Sensibilidad a la insulina normal</li>
                <li>1.0 - 2.5: Resistencia a la insulina promedio</li>
                <li>2.5 - 5.0: Resistencia a la insulina moderada</li>
                <li>{">"}5.0: Resistencia a la insulina significativa</li>
              </ul>
            </li>
            <li>
              La resistencia a la insulina es un factor de riesgo para desarrollar diabetes tipo 2, síndrome metabólico
              y enfermedades cardiovasculares.
            </li>
            <li>
              Los resultados deben ser interpretados por un profesional médico en el contexto de la historia clínica
              completa del paciente.
            </li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
