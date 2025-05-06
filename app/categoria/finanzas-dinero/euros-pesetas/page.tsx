"use client"

import { useState, useEffect } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Tipo de cambio fijo: 1 Euro = 166.386 Pesetas
const TIPO_CAMBIO = 166.386

export default function EurosPesetasPage() {
  const [euros, setEuros] = useState("1")
  const [pesetas, setPesetas] = useState("166.386")
  const [activeTab, setActiveTab] = useState("euros-a-pesetas")

  const convertirEurosAPesetas = () => {
    const eurosNum = Number.parseFloat(euros)
    if (isNaN(eurosNum)) {
      setPesetas("0")
      return
    }
    const pesetasNum = eurosNum * TIPO_CAMBIO
    setPesetas(pesetasNum.toFixed(2))
  }

  const convertirPesetasAEuros = () => {
    const pesetasNum = Number.parseFloat(pesetas)
    if (isNaN(pesetasNum)) {
      setEuros("0")
      return
    }
    const eurosNum = pesetasNum / TIPO_CAMBIO
    setEuros(eurosNum.toFixed(2))
  }

  // Manejar cambio de tabs
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    // Resetear valores al cambiar de tab
    if (value === "euros-a-pesetas") {
      setEuros("1")
      setPesetas("166.386")
    } else {
      setEuros("1")
      setPesetas("166.386")
    }
  }

  // Convertir cuando cambian los valores o la tab activa
  useEffect(() => {
    if (activeTab === "euros-a-pesetas") {
      convertirEurosAPesetas()
    } else {
      convertirPesetasAEuros()
    }
  }, [euros, pesetas, activeTab])

  return (
    <CalculatorLayout
      title="Conversor Euros ↔ Pesetas"
      description="Convierte cantidades entre Euros (EUR) y la antigua Peseta española (ESP) usando el tipo de cambio fijo oficial."
      icon="RefreshCw"
      backTo="/categoria/finanzas-dinero"
      backToLabel="Finanzas y Dinero"
    >
      <div className="grid gap-6">
        <Tabs defaultValue="euros-a-pesetas" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="euros-a-pesetas">Euros a Pesetas</TabsTrigger>
            <TabsTrigger value="pesetas-a-euros">Pesetas a Euros</TabsTrigger>
          </TabsList>

          <TabsContent value="euros-a-pesetas" className="mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="euros">Cantidad en Euros (€)</Label>
                <Input
                  id="euros"
                  type="number"
                  min="0"
                  step="0.01"
                  value={euros}
                  onChange={(e) => setEuros(e.target.value)}
                />
              </div>

              <Button type="button" onClick={convertirEurosAPesetas}>
                Convertir a Pesetas
              </Button>

              <Card className="bg-primary/10">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-lg font-medium mb-2">Resultado en Pesetas</h3>
                    <p className="text-3xl font-bold">{Number.parseFloat(pesetas).toLocaleString("es-ES")} ₧</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pesetas-a-euros" className="mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="pesetas">Cantidad en Pesetas (₧)</Label>
                <Input
                  id="pesetas"
                  type="number"
                  min="0"
                  step="1"
                  value={pesetas}
                  onChange={(e) => setPesetas(e.target.value)}
                />
              </div>

              <Button type="button" onClick={convertirPesetasAEuros}>
                Convertir a Euros
              </Button>

              <Card className="bg-primary/10">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-lg font-medium mb-2">Resultado en Euros</h3>
                    <p className="text-3xl font-bold">
                      {Number.parseFloat(euros).toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-sm text-muted-foreground">
          <p className="font-medium">Información sobre la conversión:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>El tipo de cambio fijo oficial es: 1 Euro = 166,386 Pesetas.</li>
            <li>Este tipo de cambio se estableció el 1 de enero de 1999.</li>
            <li>La peseta dejó de circular físicamente el 28 de febrero de 2002.</li>
            <li>El Banco de España sigue canjeando pesetas por euros sin fecha límite.</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  )
}
