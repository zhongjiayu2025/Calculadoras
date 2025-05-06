"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RitmoCarreraPage() {
  const [distancia, setDistancia] = useState("10")
  const [unidadDistancia, setUnidadDistancia] = useState("km")
  const [horas, setHoras] = useState("0")
  const [minutos, setMinutos] = useState("45")
  const [segundos, setSegundos] = useState("0")
  const [resultado, setResultado] = useState<{
    ritmoMinKm: string
    ritmoMinMilla: string
    velocidadKmH: number
    velocidadMH: number
  } | null>(null)

  const calcularRitmo = () => {
    // Convertir inputs a números
    const distanciaNum = Number.parseFloat(distancia)
    const horasNum = Number.parseInt(horas)
    const minutosNum = Number.parseInt(minutos)
    const segundosNum = Number.parseInt(segundos)

    if (isNaN(distanciaNum) || isNaN(horasNum) || isNaN(minutosNum) || isNaN(segundosNum) || distanciaNum <= 0) {
      return
    }

    // Calcular tiempo total en segundos
    const tiempoTotalSegundos = horasNum * 3600 + minutosNum * 60 + segundosNum

    // Convertir distancia a kilómetros y millas
    let distanciaKm = distanciaNum
    if (unidadDistancia === "m") {
      distanciaKm = distanciaNum / 1000
    } else if (unidadDistancia === "mi") {
      distanciaKm = distanciaNum * 1.60934
    }
    const distanciaMillas = distanciaKm / 1.60934

    // Calcular ritmo (tiempo por unidad de distancia)
    const segundosPorKm = tiempoTotalSegundos / distanciaKm
    const segundosPorMilla = tiempoTotalSegundos / distanciaMillas

    // Formatear ritmo en min:seg
    const ritmoMinKm = formatearTiempo(segundosPorKm)
    const ritmoMinMilla = formatearTiempo(segundosPorMilla)

    // Calcular velocidad en km/h y mph
    const velocidadKmH = (distanciaKm / tiempoTotalSegundos) * 3600
    const velocidadMH = (distanciaMillas / tiempoTotalSegundos) * 3600

    setResultado({
      ritmoMinKm,
      ritmoMinMilla,
      velocidadKmH,
      velocidadMH,
    })
  }

  // Función para formatear segundos en formato min:seg
  const formatearTiempo = (segundos: number): string => {
    const minutos = Math.floor(segundos / 60)
    const segs = Math.round(segundos % 60)
    return `${minutos}:${segs.toString().padStart(2, "0")}`
  }

  return (
    <CalculatorLayout
      title="Calculadora de Ritmo de Carrera"
      description="Calcula el ritmo medio de carrera (min/km o min/milla) a partir de la distancia recorrida y el tiempo empleado."
      icon="Running"
      backTo="/categoria/vida-diaria"
      backToLabel="Vida Diaria y Utilidades"
    >
      <div className="grid gap-6">
        <div className="grid gap-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 grid gap-2">
              <Label htmlFor="distancia">Distancia</Label>
              <Input
                id="distancia"
                type="number"
                min="0.01"
                step="0.01"
                value={distancia}
                onChange={(e) => setDistancia(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="unidad-distancia">Unidad</Label>
              <Select value={unidadDistancia} onValueChange={setUnidadDistancia}>
                <SelectTrigger id="unidad-distancia">
                  <SelectValue placeholder="Unidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="km">km</SelectItem>
                  <SelectItem value="m">m</SelectItem>
                  <SelectItem value="mi">millas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Tiempo</Label>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Input
                  id="horas"
                  type="number"
                  min="0"
                  max="99"
                  value={horas}
                  onChange={(e) => setHoras(e.target.value)}
                  placeholder="Horas"
                />
                <Label htmlFor="horas" className="text-xs text-center">
                  Horas
                </Label>
              </div>
              <div className="grid gap-2">
                <Input
                  id="minutos"
                  type="number"
                  min="0"
                  max="59"
                  value={minutos}
                  onChange={(e) => setMinutos(e.target.value)}
                  placeholder="Minutos"
                />
                <Label htmlFor="minutos" className="text-xs text-center">
                  Minutos
                </Label>
              </div>
              <div className="grid gap-2">
                <Input
                  id="segundos"
                  type="number"
                  min="0"
                  max="59"
                  value={segundos}
                  onChange={(e) => setSegundos(e.target.value)}
                  placeholder="Segundos"
                />
                <Label htmlFor="segundos" className="text-xs text-center">
                  Segundos
                </Label>
              </div>
            </div>
          </div>

          <Button type="button" onClick={calcularRitmo}>
            Calcular ritmo
          </Button>
        </div>

        {resultado && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Ritmo</h3>
                  <p className="text-2xl font-bold">{resultado.ritmoMinKm} min/km</p>
                  <p className="text-sm text-muted-foreground mt-1">{resultado.ritmoMinMilla} min/milla</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Velocidad</h3>
                  <p className="text-2xl font-bold">{resultado.velocidadKmH.toFixed(2)} km/h</p>
                  <p className="text-sm text-muted-foreground mt-1">{resultado.velocidadMH.toFixed(2)} mph</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="text-sm text-muted-foreground">
          <p className="font-medium">Información útil:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>
              El ritmo de carrera se expresa habitualmente en minutos por kilómetro (min/km) o minutos por milla
              (min/mi).
            </li>
            <li>Un ritmo de 5:00 min/km equivale a correr a 12 km/h.</li>
            <li>Un ritmo de 8:00 min/km equivale a correr a 7.5 km/h.</li>
            <li>Para maratones, un ritmo de 5:41 min/km te permitiría terminar en 4 horas.</li>
            <li>1 milla = 1.60934 kilómetros.</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
