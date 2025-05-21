"use client"

import { useState, useEffect } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function VolumenConcretoPage() {
  const [largo, setLargo] = useState("0")
  const [ancho, setAncho] = useState("0")
  const [alto, setAlto] = useState("0")
  const [volumen, setVolumen] = useState(0)

  const calcularVolumen = () => {
    const l = Number.parseFloat(largo)
    const a = Number.parseFloat(ancho)
    const h = Number.parseFloat(alto)

    if (isNaN(l) || isNaN(a) || isNaN(h)) {
      setVolumen(0)
      return
    }

    // Volumen en metros cúbicos
    const vol = l * a * h
    setVolumen(vol)
  }

  // Recalcular cuando cambian los valores
  useEffect(() => {
    calcularVolumen()
  }, [largo, ancho, alto])

  return (
    <CalculatorLayout
      title="Calculadora de Volumen de Concreto"
      description="Esta tabla para calcular concreto te ayuda a estimar el volumen de material necesario para rellenar una forma rectangular simple."
      icon="Box"
      backTo="/categoria/construccion-hogar"
      backToLabel="Construcción y Hogar"
    >
      <div className="grid gap-6">
        <div className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="largo">Largo (metros)</Label>
              <Input
                id="largo"
                type="number"
                min="0"
                step="0.01"
                value={largo}
                onChange={(e) => setLargo(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="ancho">Ancho (metros)</Label>
              <Input
                id="ancho"
                type="number"
                min="0"
                step="0.01"
                value={ancho}
                onChange={(e) => setAncho(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="alto">Alto/Espesor (metros)</Label>
              <Input
                id="alto"
                type="number"
                min="0"
                step="0.01"
                value={alto}
                onChange={(e) => setAlto(e.target.value)}
              />
            </div>
          </div>

          <Button type="button" onClick={calcularVolumen}>
            Calcular volumen
          </Button>
        </div>

        <Card className="bg-primary/10">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Volumen de concreto necesario</h3>
              <p className="text-3xl font-bold">{volumen.toFixed(3)} m³</p>

              {volumen > 0 && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-sm font-medium">Equivalente a:</p>
                    <ul className="mt-1 space-y-1 text-sm">
                      <li>{(volumen * 1000).toFixed(2)} litros</li>
                      <li>{(volumen * 35.3147).toFixed(2)} pies cúbicos</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Sacos de cemento (aprox.):</p>
                    <ul className="mt-1 space-y-1 text-sm">
                      <li>
                        <strong>Mezcla básica 1:2:3:</strong> {Math.ceil(7.5 * volumen)} sacos de 50kg
                      </li>
                      <li>
                        <strong>Mezcla rica 1:1.5:2.5:</strong> {Math.ceil(9 * volumen)} sacos de 50kg
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="text-sm text-muted-foreground">
          <p className="font-medium">Información útil:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Esta calculadora estima el volumen para formas rectangulares simples (como losas, zapatas o muros).</li>
            <li>
              Para proyectos grandes, se recomienda añadir un 5-10% extra al volumen calculado para compensar pérdidas.
            </li>
            <li>La cantidad de sacos de cemento es aproximada y varía según la mezcla y el tipo de proyecto.</li>
            <li>Para estructuras más complejas o proyectos importantes, consulta con un profesional.</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
