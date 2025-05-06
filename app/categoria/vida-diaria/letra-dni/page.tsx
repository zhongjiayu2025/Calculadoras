"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function LetraDniPage() {
  const [numeroDni, setNumeroDni] = useState("")
  const [letra, setLetra] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calcularLetra = () => {
    // Limpiar estados previos
    setError(null)
    setLetra(null)

    // Validar que sea un número de 8 dígitos
    if (!/^\d{1,8}$/.test(numeroDni)) {
      setError("Por favor, introduce un número de DNI válido (entre 1 y 8 dígitos)")
      return
    }

    // Algoritmo para calcular la letra del DNI español
    const letras = "TRWAGMYFPDXBNJZSQVHLCKE"
    const indice = Number.parseInt(numeroDni) % 23

    setLetra(letras.charAt(indice))
  }

  return (
    <CalculatorLayout
      title="Calculadora de Letra del DNI"
      description="Calcula la letra de control correspondiente a un número de DNI español de 8 dígitos."
      icon="CreditCard"
      backTo="/categoria/vida-diaria"
      backToLabel="Vida Diaria y Utilidades"
    >
      <div className="grid gap-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="numero-dni">Número del DNI (sin letra)</Label>
            <Input
              id="numero-dni"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={8}
              value={numeroDni}
              onChange={(e) => {
                // Solo permitir dígitos
                const value = e.target.value.replace(/\D/g, "")
                setNumeroDni(value)
              }}
              placeholder="Ejemplo: 12345678"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <Button type="button" onClick={calcularLetra}>
            Calcular letra
          </Button>
        </div>

        {letra && (
          <Card className="bg-primary/10">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">La letra del DNI es</h3>
                <div className="text-7xl font-bold mb-4">{letra}</div>
                <p className="text-2xl font-semibold">
                  {numeroDni}
                  {letra}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-sm text-muted-foreground">
          <p className="font-medium">¿Cómo se calcula la letra del DNI?</p>
          <p className="mt-2">
            La letra del DNI se calcula dividiendo el número del DNI entre 23 y tomando el resto de la división. Este
            resto, que estará entre 0 y 22, se utiliza como índice en la siguiente secuencia de letras:
          </p>
          <div className="py-2 px-4 my-2 bg-accent/50 rounded text-center">
            <p>TRWAGMYFPDXBNJZSQVHLCKE</p>
          </div>
          <p>
            Por ejemplo, para el DNI 12345678, el resto de dividir 12345678 entre 23 es 14, por lo que la letra
            correspondiente es la que está en la posición 14 de la secuencia, que es 'Z'.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  )
}
