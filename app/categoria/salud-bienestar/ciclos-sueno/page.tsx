"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format, addMinutes, parse } from "date-fns"

// Duración aproximada de un ciclo de sueño en minutos
const DURACION_CICLO = 90
// Tiempo aproximado que tarda una persona en quedarse dormida
const TIEMPO_DORMIRSE = 15

export default function CiclosSuenoPage() {
  const [horaDespertar, setHoraDespertar] = useState("07:00")
  const [horaDormir, setHoraDormir] = useState("23:00")
  const [ciclosDespertar, setCiclosDespertar] = useState<string[]>([])
  const [ciclosDormir, setCiclosDormir] = useState<string[]>([])

  const calcularHorasDormir = () => {
    try {
      // Parsear la hora de despertar
      const fechaDespertar = parse(horaDespertar, "HH:mm", new Date())

      // Calcular las horas para dormir (5, 6, 7 y 8 ciclos antes de despertar)
      const resultados = []

      for (let ciclos = 6; ciclos >= 3; ciclos--) {
        // Tiempo total = tiempo para dormirse + (ciclos * duración del ciclo)
        const tiempoTotal = TIEMPO_DORMIRSE + ciclos * DURACION_CICLO
        // Restar el tiempo total a la hora de despertar
        const horaDormir = addMinutes(fechaDespertar, -tiempoTotal)
        // Formatear la hora
        resultados.push({
          hora: format(horaDormir, "HH:mm"),
          ciclos: ciclos,
        })
      }

      setCiclosDespertar(resultados.map((r) => r.hora))
    } catch (error) {
      console.error("Error al calcular las horas para dormir:", error)
      setCiclosDespertar([])
    }
  }

  const calcularHorasDespertar = () => {
    try {
      // Parsear la hora de dormir
      const fechaDormir = parse(horaDormir, "HH:mm", new Date())

      // Añadir el tiempo para dormirse
      const inicioDormir = addMinutes(fechaDormir, TIEMPO_DORMIRSE)

      // Calcular las horas para despertar (después de 4, 5, 6 y 7 ciclos)
      const resultados = []

      for (let ciclos = 3; ciclos <= 6; ciclos++) {
        // Tiempo total = ciclos * duración del ciclo
        const tiempoTotal = ciclos * DURACION_CICLO
        // Sumar el tiempo total a la hora de inicio del sueño
        const horaDespertar = addMinutes(inicioDormir, tiempoTotal)
        // Formatear la hora
        resultados.push({
          hora: format(horaDespertar, "HH:mm"),
          ciclos: ciclos,
        })
      }

      setCiclosDormir(resultados.map((r) => r.hora))
    } catch (error) {
      console.error("Error al calcular las horas para despertar:", error)
      setCiclosDormir([])
    }
  }

  return (
    <CalculatorLayout
      title="Calculadora de Ciclos de Sueño"
      description="Ayuda a determinar horarios óptimos para dormir o despertar basándose en ciclos de sueño de aproximadamente 90 minutos."
      icon="Moon"
      backTo="/categoria/salud-bienestar"
      backToLabel="Salud y Bienestar"
    >
      <div className="grid gap-6">
        <Tabs defaultValue="despertar">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="despertar">Si quiero despertar a...</TabsTrigger>
            <TabsTrigger value="dormir">Si me voy a dormir a...</TabsTrigger>
          </TabsList>

          <TabsContent value="despertar" className="mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="hora-despertar">¿A qué hora quieres despertar?</Label>
                <Input
                  id="hora-despertar"
                  type="time"
                  value={horaDespertar}
                  onChange={(e) => setHoraDespertar(e.target.value)}
                />
              </div>

              <Button type="button" onClick={calcularHorasDormir}>
                Calcular horas para dormir
              </Button>

              {ciclosDespertar.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <h3 className="text-lg font-medium mb-4">Deberías irte a dormir a las:</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {ciclosDespertar.map((hora, index) => (
                          <div key={index} className="bg-primary/10 p-3 rounded-lg">
                            <p className="text-2xl font-bold">{hora}</p>
                            <p className="text-xs text-muted-foreground mt-1">{6 - index} ciclos de sueño</p>
                          </div>
                        ))}
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground">
                        Estas horas te permitirán completar ciclos completos de sueño antes de despertar.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="dormir" className="mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="hora-dormir">¿A qué hora te vas a dormir?</Label>
                <Input
                  id="hora-dormir"
                  type="time"
                  value={horaDormir}
                  onChange={(e) => setHoraDormir(e.target.value)}
                />
              </div>

              <Button type="button" onClick={calcularHorasDespertar}>
                Calcular horas para despertar
              </Button>

              {ciclosDormir.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <h3 className="text-lg font-medium mb-4">Deberías despertar a las:</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {ciclosDormir.map((hora, index) => (
                          <div key={index} className="bg-primary/10 p-3 rounded-lg">
                            <p className="text-2xl font-bold">{hora}</p>
                            <p className="text-xs text-muted-foreground mt-1">{index + 3} ciclos de sueño</p>
                          </div>
                        ))}
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground">
                        Despertar en estos horarios te permitirá sentirte más descansado/a.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-sm text-muted-foreground">
          <p className="font-medium">¿Cómo funcionan los ciclos de sueño?</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>El sueño se compone de ciclos de aproximadamente 90 minutos.</li>
            <li>Cada ciclo incluye fases de sueño ligero, profundo y REM.</li>
            <li>Despertar al final de un ciclo completo suele resultar en mayor sensación de descanso.</li>
            <li>Se considera que una persona tarda unos 15 minutos en quedarse dormida.</li>
            <li>Para un adulto, se recomiendan entre 4 y 6 ciclos completos (6-9 horas) por noche.</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
