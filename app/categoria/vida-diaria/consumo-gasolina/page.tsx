"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ConsumoGasolinaPage() {
  const [kilometrosInicial, setKilometrosInicial] = useState("")
  const [kilometrosFinal, setKilometrosFinal] = useState("")
  const [litrosRepostados, setLitrosRepostados] = useState("")
  const [precioLitro, setPrecioLitro] = useState("")
  const [distanciaTotal, setDistanciaTotal] = useState("")
  const [consumoTotal, setConsumoTotal] = useState("")
  const [metodoCalculo, setMetodoCalculo] = useState("odometro")
  const [resultados, setResultados] = useState<{
    consumoL100km: number
    consumoKmL: number
    costoKm: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calcularConsumoOdometro = () => {
    setError(null)

    const kmInicial = Number.parseFloat(kilometrosInicial)
    const kmFinal = Number.parseFloat(kilometrosFinal)
    const litros = Number.parseFloat(litrosRepostados)
    const precio = Number.parseFloat(precioLitro || "0")

    if (isNaN(kmInicial) || isNaN(kmFinal) || isNaN(litros)) {
      setError("Por favor, introduce valores numéricos válidos")
      return
    }

    if (kmFinal <= kmInicial) {
      setError("El kilometraje final debe ser mayor que el inicial")
      return
    }

    if (litros <= 0) {
      setError("La cantidad de litros debe ser mayor que cero")
      return
    }

    // Calcular distancia recorrida
    const distancia = kmFinal - kmInicial

    // Calcular consumo en L/100km
    const consumoL100km = (litros * 100) / distancia

    // Calcular consumo en km/L
    const consumoKmL = distancia / litros

    // Calcular costo por kilómetro
    const costoKm = isNaN(precio) || precio <= 0 ? 0 : (litros * precio) / distancia

    setResultados({
      consumoL100km,
      consumoKmL,
      costoKm,
    })
  }

  const calcularConsumoDirecto = () => {
    setError(null)

    const distancia = Number.parseFloat(distanciaTotal)
    const litros = Number.parseFloat(consumoTotal)
    const precio = Number.parseFloat(precioLitro || "0")

    if (isNaN(distancia) || isNaN(litros)) {
      setError("Por favor, introduce valores numéricos válidos")
      return
    }

    if (distancia <= 0 || litros <= 0) {
      setError("La distancia y los litros deben ser mayores que cero")
      return
    }

    // Calcular consumo en L/100km
    const consumoL100km = (litros * 100) / distancia

    // Calcular consumo en km/L
    const consumoKmL = distancia / litros

    // Calcular costo por kilómetro
    const costoKm = isNaN(precio) || precio <= 0 ? 0 : (litros * precio) / distancia

    setResultados({
      consumoL100km,
      consumoKmL,
      costoKm,
    })
  }

  const calcularConsumo = () => {
    if (metodoCalculo === "odometro") {
      calcularConsumoOdometro()
    } else {
      calcularConsumoDirecto()
    }
  }

  return (
    <CalculatorLayout
      title="Calculadora de Consumo de Gasolina"
      description="Calcula la eficiencia de combustible de un vehículo (L/100km o km/L) basándose en la distancia recorrida y el combustible consumido."
      icon="Car"
      backTo="/categoria/vida-diaria"
      backToLabel="Vida Diaria y Utilidades"
    >
      <div className="grid gap-6">
        <Tabs value={metodoCalculo} onValueChange={setMetodoCalculo}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="odometro">Usando odómetro</TabsTrigger>
            <TabsTrigger value="directo">Valores directos</TabsTrigger>
          </TabsList>

          <TabsContent value="odometro" className="mt-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="km-inicial">Kilometraje inicial</Label>
                  <Input
                    id="km-inicial"
                    type="number"
                    min="0"
                    step="1"
                    value={kilometrosInicial}
                    onChange={(e) => setKilometrosInicial(e.target.value)}
                    placeholder="Ejemplo: 12500"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="km-final">Kilometraje final</Label>
                  <Input
                    id="km-final"
                    type="number"
                    min="0"
                    step="1"
                    value={kilometrosFinal}
                    onChange={(e) => setKilometrosFinal(e.target.value)}
                    placeholder="Ejemplo: 12800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="litros-repostados">Litros repostados</Label>
                  <Input
                    id="litros-repostados"
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={litrosRepostados}
                    onChange={(e) => setLitrosRepostados(e.target.value)}
                    placeholder="Ejemplo: 25"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="precio-litro">Precio por litro (€) (opcional)</Label>
                  <Input
                    id="precio-litro"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={precioLitro}
                    onChange={(e) => setPrecioLitro(e.target.value)}
                    placeholder="Ejemplo: 1.65"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="directo" className="mt-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="distancia-total">Distancia recorrida (km)</Label>
                  <Input
                    id="distancia-total"
                    type="number"
                    min="1"
                    step="1"
                    value={distanciaTotal}
                    onChange={(e) => setDistanciaTotal(e.target.value)}
                    placeholder="Ejemplo: 300"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="consumo-total">Litros consumidos</Label>
                  <Input
                    id="consumo-total"
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={consumoTotal}
                    onChange={(e) => setConsumoTotal(e.target.value)}
                    placeholder="Ejemplo: 25"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="precio-litro-directo">Precio por litro (€) (opcional)</Label>
                <Input
                  id="precio-litro-directo"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={precioLitro}
                  onChange={(e) => setPrecioLitro(e.target.value)}
                  placeholder="Ejemplo: 1.65"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="button" onClick={calcularConsumo}>
          Calcular consumo
        </Button>

        {resultados && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Consumo</h3>
                  <p className="text-2xl font-bold">{resultados.consumoL100km.toFixed(2)} L/100km</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Rendimiento</h3>
                  <p className="text-2xl font-bold">{resultados.consumoKmL.toFixed(2)} km/L</p>
                </div>
              </CardContent>
            </Card>

            {resultados.costoKm > 0 && (
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Coste por km</h3>
                    <p className="text-2xl font-bold">
                      {resultados.costoKm.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3,
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        <div className="text-sm text-muted-foreground">
          <p className="font-medium">Información sobre consumo de combustible:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>
              <strong>L/100km:</strong> Litros consumidos por cada 100 kilómetros. Menor valor = mejor eficiencia.
            </li>
            <li>
              <strong>km/L:</strong> Kilómetros recorridos con un litro de combustible. Mayor valor = mejor eficiencia.
            </li>
            <li>Un consumo de 5 L/100km equivale a 20 km/L.</li>
            <li>
              El consumo real puede variar según el estilo de conducción, condiciones de la carretera, tráfico, clima y
              estado del vehículo.
            </li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
