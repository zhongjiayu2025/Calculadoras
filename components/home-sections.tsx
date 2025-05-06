import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Check, HelpCircle, Info, Search, Settings, Star } from "lucide-react"

export function WhyChooseUsSection() {
  return (
    <section id="por-que-elegirnos" className="py-12 bg-primary/5 rounded-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">¿Por qué elegir calculosFaciles.org?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-background hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Precisión garantizada</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Nuestras calculadoras online están desarrolladas con algoritmos precisos y verificados para ofrecerte
                resultados exactos en los que puedes confiar para tus cálculos diarios.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-background hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Fácil de usar</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Diseñamos cada calculadora con una interfaz intuitiva y sencilla, para que puedas realizar tus cálculos
                rápidamente sin complicaciones ni conocimientos técnicos.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-background hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Totalmente gratuitas</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Todas nuestras calculadoras son 100% gratuitas. Creemos que las herramientas de cálculo deben ser
                accesibles para todos, sin costes ni suscripciones.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="bg-background hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Amplia variedad de calculadoras</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Desde finanzas hasta salud, matemáticas y vida diaria, ofrecemos más de 20 calculadoras especializadas
                para cubrir todas tus necesidades de cálculo en un solo lugar.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-background hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Explicaciones detalladas</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Cada calculadora incluye información adicional que te ayuda a entender las fórmulas utilizadas y cómo
                interpretar correctamente los resultados obtenidos.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Button asChild size="lg" className="px-8">
            <Link href="/categoria/finanzas-dinero">Explorar calculadoras</Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Optimizadas para dispositivos móviles y de escritorio. Sin necesidad de descargar aplicaciones.
          </p>
        </div>
      </div>
    </section>
  )
}

export function HowToUseSection() {
  return (
    <section id="como-usar" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Cómo usar nuestras calculadoras</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Encuentra la calculadora adecuada</h3>
                  <p className="text-muted-foreground">
                    Navega por nuestras categorías (Finanzas, Salud, Matemáticas, Vida Diaria) o utiliza las
                    calculadoras populares en la página principal para encontrar la herramienta que necesitas.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Introduce tus datos</h3>
                  <p className="text-muted-foreground">
                    Completa los campos requeridos con tus valores específicos. Cada calculadora tiene campos claramente
                    etiquetados para facilitar la entrada de datos.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Obtén resultados instantáneos</h3>
                  <p className="text-muted-foreground">
                    Haz clic en el botón "Calcular" y obtén resultados precisos al instante. Los resultados se muestran
                    de forma clara y con las unidades correspondientes.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Interpreta los resultados</h3>
                  <p className="text-muted-foreground">
                    Revisa la información adicional que proporcionamos debajo de cada calculadora para entender mejor
                    los resultados y su aplicación práctica.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-3">Consejos útiles:</h3>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>
                  Utiliza el punto (.) como separador decimal en todas nuestras calculadoras para asegurar resultados
                  precisos.
                </li>
                <li>
                  Puedes volver a calcular con diferentes valores tantas veces como necesites para comparar resultados.
                </li>
                <li>
                  Consulta la sección de información en cada calculadora para entender las fórmulas y conceptos
                  utilizados.
                </li>
              </ul>
            </div>
          </div>

          <Card className="bg-primary/5 border-none shadow-sm">
            <CardHeader>
              <CardTitle>Ejemplo práctico: Calculadora de Interés Compuesto</CardTitle>
              <CardDescription>
                Una de nuestras calculadoras más populares para planificación financiera
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="font-medium">1. Introduce los datos de tu inversión:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Capital inicial: 10.000€</li>
                  <li>Tasa de interés anual: 5%</li>
                  <li>Período: 10 años</li>
                  <li>Frecuencia de capitalización: Anual</li>
                </ul>
              </div>

              <div className="space-y-2">
                <p className="font-medium">2. Haz clic en "Calcular"</p>
              </div>

              <div className="space-y-2">
                <p className="font-medium">3. Interpreta los resultados:</p>
                <div className="bg-background p-3 rounded-md">
                  <p className="text-sm">
                    <span className="font-medium">Monto final:</span> 16.288,95€
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Interés generado:</span> 6.288,95€
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Link
                  href="/categoria/finanzas-dinero/interes-compuesto"
                  className="text-primary hover:underline font-medium"
                >
                  Probar la calculadora de interés compuesto →
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export function FAQSection() {
  return (
    <section id="preguntas-frecuentes" className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <HelpCircle className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold">Preguntas frecuentes</h2>
          <p className="text-muted-foreground mt-2">
            Respuestas a las dudas más comunes sobre nuestras calculadoras online
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>¿Son precisas las calculadoras de calculosFaciles.org?</AccordionTrigger>
              <AccordionContent>
                Sí, todas nuestras calculadoras online están desarrolladas con algoritmos matemáticos precisos y han
                sido verificadas para garantizar resultados exactos. Utilizamos fórmulas estándar reconocidas en cada
                campo específico, ya sea finanzas, matemáticas, salud o vida diaria. Sin embargo, recomendamos utilizar
                los resultados como referencia y, en casos críticos o profesionales, consultar con un especialista.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>¿Las calculadoras son realmente gratuitas?</AccordionTrigger>
              <AccordionContent>
                Absolutamente. Todas las calculadoras disponibles en calculosFaciles.org son 100% gratuitas y pueden
                utilizarse sin limitaciones. No requerimos registro, suscripción ni pago alguno para acceder a cualquier
                funcionalidad de nuestro sitio web. Nuestro objetivo es proporcionar herramientas de cálculo accesibles
                para todos.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>¿Cómo puedo guardar mis cálculos para consultarlos más tarde?</AccordionTrigger>
              <AccordionContent>
                Actualmente, nuestras calculadoras no almacenan los resultados de forma permanente. Sin embargo, puedes
                guardar o imprimir la página de resultados utilizando las funciones de tu navegador. También puedes
                tomar capturas de pantalla o anotar los resultados manualmente. Estamos trabajando en implementar una
                función de historial de cálculos en futuras actualizaciones.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>¿Es seguro ingresar mis datos personales o financieros?</AccordionTrigger>
              <AccordionContent>
                Nuestras calculadoras procesan todos los datos localmente en tu dispositivo y no enviamos tu información
                personal o financiera a nuestros servidores. No almacenamos ningún dato que ingreses en las
                calculadoras. Puedes utilizar nuestras herramientas con total tranquilidad respecto a la privacidad de
                tu información. Para más detalles, consulta nuestra{" "}
                <Link href="/privacidad" className="text-primary hover:underline">
                  Política de Privacidad
                </Link>
                .
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>¿Cómo puedo sugerir una nueva calculadora?</AccordionTrigger>
              <AccordionContent>
                Valoramos mucho tus sugerencias. Si hay alguna calculadora específica que te gustaría ver en nuestro
                sitio, puedes enviarnos tu idea a través de nuestro{" "}
                <Link href="/contacto" className="text-primary hover:underline">
                  formulario de contacto
                </Link>
                . Evaluamos regularmente las sugerencias de nuestros usuarios para seguir ampliando nuestra colección de
                calculadoras y satisfacer las necesidades de nuestra comunidad.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>¿Con qué frecuencia se actualizan las calculadoras?</AccordionTrigger>
              <AccordionContent>
                Revisamos y actualizamos nuestras calculadoras regularmente para garantizar su precisión y
                funcionalidad. Esto incluye ajustes en fórmulas, mejoras en la interfaz de usuario y correcciones de
                posibles errores. También añadimos nuevas calculadoras periódicamente. Cualquier actualización
                importante se comunicará en nuestra página principal.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>¿Puedo utilizar las calculadoras en mi dispositivo móvil?</AccordionTrigger>
              <AccordionContent>
                Sí, todas nuestras calculadoras están optimizadas para funcionar perfectamente en dispositivos móviles,
                tablets y ordenadores. La interfaz se adapta automáticamente al tamaño de tu pantalla para ofrecerte la
                mejor experiencia posible. No es necesario descargar ninguna aplicación, simplemente accede a nuestro
                sitio web desde el navegador de tu dispositivo.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger>¿Cómo reporto un error en una calculadora?</AccordionTrigger>
              <AccordionContent>
                Si encuentras algún error o inconsistencia en alguna de nuestras calculadoras, por favor háganoslo saber
                a través de nuestro{" "}
                <Link href="/contacto" className="text-primary hover:underline">
                  formulario de contacto
                </Link>
                . Incluye detalles específicos como el nombre de la calculadora, los valores introducidos y el resultado
                incorrecto obtenido. Investigaremos y corregiremos cualquier problema lo antes posible.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">¿No encuentras respuesta a tu pregunta?</p>
            <Button asChild>
              <Link href="/contacto">Contáctanos</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
