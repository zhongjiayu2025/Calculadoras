import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Aviso Legal | CalculosFaciles.org",
  description: "Información legal sobre CalculosFaciles.org, términos de uso y limitaciones de responsabilidad.",
}

export default function AvisoLegalPage() {
  return (
    <div className="container max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Aviso Legal</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Información General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de
            Servicios de la Sociedad de la Información y del Comercio Electrónico, a continuación se reflejan los
            siguientes datos:
          </p>
          <p>
            El titular de este sitio web <strong>CalculosFaciles.org</strong> es el propietario del dominio, con
            dirección de correo electrónico de contacto:{" "}
            <Link href="mailto:info@calculosfaciles.org" className="text-primary hover:underline">
              info@calculosfaciles.org
            </Link>
            .
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Objeto y Ámbito de Aplicación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Las presentes disposiciones regulan el uso del servicio del sitio web CalculosFaciles.org, que el titular
            pone gratuitamente a disposición de los usuarios de Internet.
          </p>
          <p>El acceso al sitio web implica la aceptación sin reservas del presente aviso legal.</p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Propiedad Intelectual e Industrial</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            El titular es propietario de todos los derechos de propiedad intelectual e industrial de su página web, así
            como de los elementos contenidos en la misma (a título enunciativo: imágenes, sonido, audio, vídeo, software
            o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados,
            programas de ordenador necesarios para su funcionamiento, acceso y uso, etc.).
          </p>
          <p>
            Todos los derechos reservados. En virtud de lo dispuesto en los artículos 8 y 32.1, párrafo segundo, de la
            Ley de Propiedad Intelectual, quedan expresamente prohibidas la reproducción, la distribución y la
            comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los
            contenidos de esta página web, con fines comerciales, en cualquier soporte y por cualquier medio técnico,
            sin la autorización del titular.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Exclusión de Garantías y Responsabilidad</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            El titular no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que
            pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del
            portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber
            adoptado todas las medidas tecnológicas necesarias para evitarlo.
          </p>
          <p>
            El contenido de este sitio web tiene carácter meramente informativo y educativo. Las calculadoras y
            herramientas proporcionadas son solo para fines de referencia y no deben utilizarse como sustituto del
            asesoramiento profesional. El usuario debe verificar cualquier resultado y utilizarlo bajo su propia
            responsabilidad.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Modificaciones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            El titular se reserva el derecho a efectuar sin previo aviso las modificaciones que considere oportunas en
            su portal, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través de
            la misma como la forma en la que éstos aparezcan presentados o localizados en su portal.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Enlaces</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            En el caso de que en CalculosFaciles.org se dispusiesen enlaces o hipervínculos hacia otros sitios de
            Internet, el titular no ejercerá ningún tipo de control sobre dichos sitios y contenidos. En ningún caso el
            titular asumirá responsabilidad alguna por los contenidos de algún enlace perteneciente a un sitio web
            ajeno, ni garantizará la disponibilidad técnica, calidad, fiabilidad, exactitud, amplitud, veracidad,
            validez y constitucionalidad de cualquier material o información contenida en ninguno de dichos
            hipervínculos u otros sitios de Internet.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Derecho de Exclusión</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            El titular se reserva el derecho a denegar o retirar el acceso a portal y/o los servicios ofrecidos sin
            necesidad de preaviso, a instancia propia o de un tercero, a aquellos usuarios que incumplan las presentes
            Condiciones Generales de Uso.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Legislación Aplicable</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            La relación entre el titular y el usuario se regirá por la normativa española vigente y cualquier
            controversia se someterá a los Juzgados y tribunales competentes.
          </p>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground mt-8">
        Última actualización:{" "}
        {new Date().toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}
      </p>
    </div>
  )
}
