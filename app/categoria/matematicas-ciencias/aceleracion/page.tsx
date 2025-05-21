"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AceleracionPage() {
  const [velocidadInicial, setVelocidadInicial] = useState("")
  const [velocidadFinal, setVelocidadFinal] = useState("")
  const [tiempo, setTiempo] = useState("")
  const [unidadVelocidad, setUnidadVelocidad] = useState("m/s")
  const [unidadTiempo, setUnidadTiempo] = useState("s")
  const [resultado, setResultado] = useState<{
    aceleracion: number
    unidad: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Función para convertir velocidad a m/s
  const convertirVelocidadAMS = (valor: number, unidad: string): number => {
    switch (unidad) {
      case "km/h":
        return valor * (1000 / 3600) // km/h a m/s
      case "mph":
        return valor * 0.44704 // mph a m/s
      default:
        return valor // ya está en m/s
    }
  }

  // Función para convertir tiempo a segundos
  const convertirTiempoASegundos = (valor: number, unidad: string): number => {
    switch (unidad) {
      case "min":
        return valor * 60 // minutos a segundos
      case "h":
        return valor * 3600 // horas a segundos
      default:
        return valor // ya está en segundos
    }
  }

  // Función para obtener la unidad de aceleración
  const obtenerUnidadAceleracion = (unidadVel: string, unidadT: string): string => {
    if (unidadVel === "m/s" && unidadT === "s") return "m/s²"
    if (unidadVel === "km/h" && unidadT === "s") return "km/h/s"
    if (unidadVel === "km/h" && unidadT === "h") return "km/h²"
    if (unidadVel === "mph" && unidadT === "s") return "mph/s"
    if (unidadVel === "mph" && unidadT === "h") return "mph/h"
    return "m/s²" // valor por defecto
  }

  const calcularAceleracion = () => {
    setError(null)
    setResultado(null)

    // Validar entrada
    const vi = Number.parseFloat(velocidadInicial)
    const vf = Number.parseFloat(velocidadFinal)
    const t = Number.parseFloat(tiempo)

    if (isNaN(vi) || isNaN(vf) || isNaN(t)) {
      setError("Por favor, introduce valores numéricos válidos")
      return
    }

    if (t <= 0) {
      setError("El tiempo debe ser mayor que cero")
      return
    }

    // Convertir a unidades estándar (m/s y segundos)
    const viMS = convertirVelocidadAMS(vi, unidadVelocidad)
    const vfMS = convertirVelocidadAMS(vf, unidadVelocidad)
    const tS = convertirTiempoASegundos(t, unidadTiempo)

    // Calcular aceleración en m/s²
    const aceleracionMS2 = (vfMS - viMS) / tS

    // Convertir aceleración a la unidad seleccionada
    let aceleracionFinal = aceleracionMS2
    if (unidadVelocidad === "km/h") {
      aceleracionFinal = aceleracionMS2 * 3.6 // m/s² a km/h/s
    } else if (unidadVelocidad === "mph") {
      aceleracionFinal = aceleracionMS2 * 2.23694 // m/s² a mph/s
    }

    // Ajustar por unidad de tiempo
    if (unidadTiempo === "min") {
      aceleracionFinal = aceleracionFinal * 60 // por segundo a por minuto
    } else if (unidadTiempo === "h") {
      aceleracionFinal = aceleracionFinal * 3600 // por segundo a por hora
    }

    setResultado({
      aceleracion: aceleracionFinal,
      unidad: obtenerUnidadAceleracion(unidadVelocidad, unidadTiempo),
    })
  }

  return (
    <CalculatorLayout
      title="Calculadora de Aceleración"
      description="Este calculador de aceleracion determina la aceleración constante a partir de la velocidad inicial, la velocidad final y el tiempo."
      icon="ZapFast"
      backTo="/categoria/matematicas-ciencias"
      backToLabel="Matemáticas y Ciencias"
    >
      <div className="grid gap-6">
        <div className="grid gap-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 grid gap-2">
              <Label htmlFor="velocidad-inicial">Velocidad inicial</Label>
              <Input
                id="velocidad-inicial"
                type="number"
                step="any"
                value={velocidadInicial}
                onChange={(e) => setVelocidadInicial(e.target.value)}
                placeholder="Ejemplo: 0"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="unidad-velocidad">Unidad</Label>
              <Select value={unidadVelocidad} onValueChange={setUnidadVelocidad}>
                <SelectTrigger id="unidad-velocidad">
                  <SelectValue placeholder="Unidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="m/s">m/s</SelectItem>
                  <SelectItem value="km/h">km/h</SelectItem>
                  <SelectItem value="mph">mph</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 grid gap-2">
              <Label htmlFor="velocidad-final">Velocidad final</Label>
              <Input
                id="velocidad-final"
                type="number"
                step="any"
                value={velocidadFinal}
                onChange={(e) => setVelocidadFinal(e.target.value)}
                placeholder="Ejemplo: 10"
              />
            </div>
            <div className="grid gap-2">
              <Label className="opacity-0">Unidad</Label>
              <div className="h-10 flex items-center px-3 border rounded-md bg-muted/50">{unidadVelocidad}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 grid gap-2">
              <Label htmlFor="tiempo">Tiempo</Label>
              <Input
                id="tiempo"
                type="number"
                min="0.001"
                step="any"
                value={tiempo}
                onChange={(e) => setTiempo(e.target.value)}
                placeholder="Ejemplo: 2"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="unidad-tiempo">Unidad</Label>
              <Select value={unidadTiempo} onValueChange={setUnidadTiempo}>
                <SelectTrigger id="unidad-tiempo">
                  <SelectValue placeholder="Unidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="s">segundos</SelectItem>
                  <SelectItem value="min">minutos</SelectItem>
                  <SelectItem value="h">horas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="button" onClick={calcularAceleracion}>
            Calcular aceleración
          </Button>
        </div>

        {resultado && (
          <Card className="bg-primary/10">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Aceleración</h3>
                <p className="text-3xl font-bold">
                  {resultado.aceleracion.toFixed(4)} {resultado.unidad}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-sm text-muted-foreground">
          <p className="font-medium">¿Qué es la aceleración?</p>
          <p className="mt-2">
            La aceleración es la tasa de cambio de la velocidad con respecto al tiempo. Indica cuán rápidamente cambia
            la velocidad de un objeto.
          </p>
          <p className="mt-2">La fórmula básica para calcular la aceleración constante es:</p>
          <div className="py-2 px-4 my-2 bg-accent/50 rounded text-center">
            <p>a = (v₂ - v₁) / t</p>
          </div>
          <p>Donde:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>a = aceleración</li>
            <li>v₁ = velocidad inicial</li>
            <li>v₂ = velocidad final</li>
            <li>t = tiempo transcurrido</li>
          </ul>
          <p className="mt-2">Ejemplos de aceleración en la vida cotidiana:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Un automóvil que acelera de 0 a 100 km/h en 8 segundos tiene una aceleración de 12.5 km/h/s.</li>
            <li>La aceleración debida a la gravedad en la Tierra es aproximadamente 9.8 m/s².</li>
            <li>
              La desaceleración (aceleración negativa) ocurre cuando un vehículo frena, reduciendo su velocidad con el
              tiempo.
            </li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
