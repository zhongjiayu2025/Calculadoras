"use client"

import { useState, useEffect } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function GasolinaViajePage() {
  const [distancia, setDistancia] = useState("100")
  const [consumo, setConsumo] = useState("7")
  const [tipoConsumo, setTipoConsumo] = useState("l/100km")
  const [precio, setPrecio] = useState("1.65")
  const [resultados, setResultados] = useState<{
    litrosNecesarios: number
    costoTotal: number
  } | null>(null)

  const calcularGasolina = () => {
    const distanciaNum = Number.parseFloat(distancia)
    const consumoNum = Number.parseFloat(consumo)
    const precioNum = Number.parseFloat(precio)

    if (
      isNaN(distanciaNum) ||
      isNaN(consumoNum) ||
      isNaN(precioNum) ||
      distanciaNum <= 0 ||
      consumoNum <= 0 ||
      precioNum <= 0
    ) {
      return
    }

    let litrosNecesarios: number

    // Calcular litros necesarios según el tipo de consumo
    if (tipoConsumo === "l/100km") {
      // Litros por cada 100 km
      litrosNecesarios = (distanciaNum * consumoNum) / 100
    } else {
      // Kilómetros por litro
      litrosNecesarios = distanciaNum / consumoNum
    }

    // Calcular costo total
    const costoTotal = litrosNecesarios * precioNum

    setResultados({
      litrosNecesarios,
      costoTotal,
    })
  }

  // Recalcular cuando cambian los valores
  useEffect(() => {
    calcularGasolina()
  }, [distancia, consumo, tipoConsumo, precio])

  return (
    <CalculatorLayout
      title="Calculadora de Gasolina para Viaje"
      description="Estima la cantidad de gasolina necesaria y el coste total para un viaje, basándose en la distancia, el consumo medio del vehículo y el precio del combustible."
      icon="Fuel"
      backTo="/categoria/vida-diaria"
      backToLabel="Vida Diaria y Utilidades"
    >
      <div className="grid gap-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="distancia">Distancia del viaje (km)</Label>
            <Input
              id="distancia"
              type="number"
              min="1"
              step="1"
              value={distancia}
              onChange={(e) => setDistancia(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 grid gap-2">
              <Label htmlFor="consumo">Consumo del vehículo</Label>
              <Input
                id="consumo"
                type="number"
                min="0.1"
                step="0.1"
                value={consumo}
                onChange={(e) => setConsumo(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tipo-consumo">Unidad</Label>
              <Select value={tipoConsumo} onValueChange={setTipoConsumo}>
                <SelectTrigger id="tipo-consumo">
                  <SelectValue placeholder="Unidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="l/100km">L/100km</SelectItem>
                  <SelectItem value="km/l">km/L</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="precio">Precio del combustible (€/L)</Label>
            <Input
              id="precio"
              type="number"
              min="0.01"
              step="0.01"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </div>

          <Button type="button" onClick={calcularGasolina}>
            Calcular
          </Button>
        </div>

        {resultados && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Combustible necesario</h3>
                  <p className="text-2xl font-bold">{resultados.litrosNecesarios.toFixed(2)} litros</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Coste total</h3>
                  <p className="text-2xl font-bold">
                    {resultados.costoTotal.toLocaleString("es-ES", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="text-sm text-muted-foreground">
          <p className="font-medium">Consejos para ahorrar combustible:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Mantén una velocidad constante y evita aceleraciones y frenadas bruscas.</li>
            <li>Revisa la presión de los neumáticos regularmente.</li>
            <li>No lleves peso innecesario en el vehículo.</li>
            <li>Utiliza el aire acondicionado solo cuando sea necesario.</li>
            <li>Realiza un mantenimiento regular del vehículo (filtros, aceite, etc.).</li>
          </ul>
          <p className="mt-2">
            <strong>Nota:</strong> Esta calculadora proporciona una estimación. El consumo real puede variar según
            factores como el estilo de conducción, las condiciones de la carretera, el tráfico y el estado del vehículo.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  )
}
