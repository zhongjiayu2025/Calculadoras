"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ApiretarPage() {
  const [peso, setPeso] = useState("")
  const [dosis, setDosis] = useState<number | null>(null)

  const calcularDosis = () => {
    const pesoNum = Number.parseFloat(peso)

    if (isNaN(pesoNum) || pesoNum <= 0) {
      setDosis(null)
      return
    }

    // Para Apiretal (paracetamol): 15mg por kg de peso
    // Concentración de Apiretal: 100mg/ml
    const dosisEnMg = pesoNum * 15
    const dosisEnMl = dosisEnMg / 100

    setDosis(Math.round(dosisEnMl * 10) / 10) // Redondear a 1 decimal
  }

  return (
    <CalculatorLayout
      title="Calculadora de Dosis de Apiretal"
      description="Con la calculadora Apiretal, o nuestra Apiretal calculadora, estima la dosis (ml) de paracetamol según el peso del niño."
      icon="Droplet"
      backTo="/categoria/salud-bienestar"
      backToLabel="Salud y Bienestar"
      disclaimer="Esta calculadora es SOLO UNA REFERENCIA. CONSULTE SIEMPRE A SU MÉDICO o PEDIATRA antes de administrar cualquier medicamento. La dosis adecuada puede variar según la situación individual del paciente y otras consideraciones médicas."
    >
      <div className="grid gap-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="peso">Peso del niño (kg)</Label>
            <Input
              id="peso"
              type="number"
              min="0"
              step="0.1"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              placeholder="Ejemplo: 12.5"
            />
          </div>

          <Button type="button" onClick={calcularDosis}>
            Calcular dosis
          </Button>
        </div>

        {dosis !== null && (
          <Card className="bg-primary/10">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Dosis recomendada (estimación)</h3>
                <p className="text-3xl font-bold">{dosis} ml</p>
                <p className="mt-4 text-sm text-muted-foreground">
                  Esta es una dosis aproximada basada en 15mg de paracetamol por kg de peso corporal. Consulte a su
                  médico o las instrucciones del medicamento para confirmar la dosis correcta.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-sm text-muted-foreground">
          <p className="font-medium">Información importante:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Apiretal contiene 100mg de paracetamol por ml.</li>
            <li>No administre más de 4 dosis en 24 horas.</li>
            <li>Espere al menos 4-6 horas entre dosis.</li>
            <li>No administre por más de 3 días sin consultar a un médico.</li>
            <li>Si tiene cualquier duda, consulte siempre a un profesional sanitario.</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
