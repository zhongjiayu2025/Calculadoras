"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Send } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ContactoPageClient() {
  const [formState, setFormState] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  })

  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validación básica
    if (!formState.nombre || !formState.email || !formState.mensaje) {
      setFormStatus({
        success: false,
        message: "Por favor, completa todos los campos obligatorios.",
      })
      return
    }

    // Simulación de envío (en un caso real, aquí iría la lógica para enviar el formulario)
    setTimeout(() => {
      setFormStatus({
        success: true,
        message: "¡Gracias por tu mensaje! Te responderemos lo antes posible.",
      })

      // Resetear el formulario
      setFormState({
        nombre: "",
        email: "",
        asunto: "",
        mensaje: "",
      })
    }, 1000)
  }

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Contacto</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Envíanos un mensaje</CardTitle>
            </CardHeader>
            <CardContent>
              {formStatus && (
                <Alert
                  className={`mb-6 ${formStatus.success ? "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-300" : "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-300"}`}
                >
                  <AlertTitle>{formStatus.success ? "Éxito" : "Error"}</AlertTitle>
                  <AlertDescription>{formStatus.message}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">
                      Nombre <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      value={formState.nombre}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="asunto">Asunto</Label>
                  <Input
                    id="asunto"
                    name="asunto"
                    value={formState.asunto}
                    onChange={handleChange}
                    placeholder="Asunto de tu mensaje"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensaje">
                    Mensaje <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="mensaje"
                    name="mensaje"
                    value={formState.mensaje}
                    onChange={handleChange}
                    placeholder="Escribe tu mensaje aquí..."
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" className="w-full md:w-auto">
                  <Send className="mr-2 h-4 w-4" /> Enviar mensaje
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Información de contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <a href="mailto:info@calculosFaciles.org" className="text-primary hover:underline">
                    info@calculosFaciles.org
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Sitio web</h3>
                  <a href="https://calculosFaciles.org" className="text-primary hover:underline">
                    calculosFaciles.org
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Sobre nosotros</h3>
                <p className="text-sm text-muted-foreground">
                  calculosFaciles.org es un sitio web dedicado a proporcionar herramientas de cálculo gratuitas y
                  fáciles de usar para ayudar a los usuarios en sus tareas diarias, estudios y trabajo.
                </p>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Tiempo de respuesta</h3>
                <p className="text-sm text-muted-foreground">
                  Nos esforzamos por responder a todas las consultas en un plazo de 24-48 horas laborables.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Preguntas frecuentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">¿Las calculadoras son gratuitas?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Sí, todas las calculadoras y herramientas disponibles en calculosFaciles.org son completamente gratuitas
                para su uso.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">¿Puedo sugerir una nueva calculadora?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                ¡Por supuesto! Nos encantaría recibir tus sugerencias. Utiliza el formulario de contacto para enviarnos
                tus ideas.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">¿Cómo reporto un error en una calculadora?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Si encuentras algún error en nuestras calculadoras, por favor háganoslo saber a través del formulario de
                contacto, indicando la calculadora específica y el problema encontrado.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">¿Puedo utilizar estas calculadoras en mi sitio web?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Nuestras calculadoras están protegidas por derechos de autor. Si estás interesado en utilizar alguna de
                ellas en tu sitio web, por favor contáctanos para discutir las opciones disponibles.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
