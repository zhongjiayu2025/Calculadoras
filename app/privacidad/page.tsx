import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Política de Privacidad | CalculosFaciles.org",
  description: "Información sobre cómo CalculosFaciles.org recopila, utiliza y protege tus datos personales.",
}

export default function PrivacidadPage() {
  return (
    <div className="container max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Introducción</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            En CalculosFaciles.org nos comprometemos a proteger tu privacidad. Esta Política de Privacidad explica cómo
            recopilamos, utilizamos y protegemos la información que nos proporcionas al utilizar nuestro sitio web.
          </p>
          <p>Al utilizar CalculosFaciles.org, aceptas las prácticas descritas en esta política.</p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Responsable del Tratamiento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            El responsable del tratamiento de los datos personales recogidos en CalculosFaciles.org es el titular del
            dominio, con dirección de correo electrónico:{" "}
            <Link href="mailto:info@calculosFaciles.org" className="text-primary hover:underline">
              info@calculosFaciles.org
            </Link>
            .
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Información que Recopilamos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            <strong>Información proporcionada voluntariamente:</strong> Podemos recopilar información personal que nos
            proporcionas voluntariamente, como tu nombre y dirección de correo electrónico cuando te pones en contacto
            con nosotros.
          </p>
          <p>
            <strong>Información recopilada automáticamente:</strong> Cuando visitas nuestro sitio web, podemos recopilar
            cierta información automáticamente, como:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Información sobre tu dispositivo (tipo de navegador, sistema operativo)</li>
            <li>Dirección IP</li>
            <li>Páginas que visitas en nuestro sitio web</li>
            <li>Tiempo que pasas en nuestro sitio web</li>
            <li>Información de cookies y tecnologías similares</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Uso de Cookies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestro sitio web, analizar cómo
            se utiliza y personalizar el contenido. Puedes configurar tu navegador para rechazar todas las cookies o
            para que te avise cuando se envía una cookie. Sin embargo, si no aceptas cookies, es posible que algunas
            partes de nuestro sitio web no funcionen correctamente.
          </p>
          <p>Tipos de cookies que utilizamos:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Cookies técnicas:</strong> Necesarias para el funcionamiento del sitio web.
            </li>
            <li>
              <strong>Cookies analíticas:</strong> Nos permiten analizar el uso del sitio web para mejorar su
              funcionamiento.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Cómo Utilizamos tu Información</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Utilizamos la información que recopilamos para:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Proporcionar, mantener y mejorar nuestro sitio web y servicios</li>
            <li>Responder a tus consultas y solicitudes</li>
            <li>Analizar cómo se utiliza nuestro sitio web para mejorar la experiencia del usuario</li>
            <li>Detectar, prevenir y abordar problemas técnicos</li>
            <li>Cumplir con obligaciones legales</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Compartir tu Información</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            No vendemos, comercializamos ni transferimos a terceros tu información personal identificable, excepto en
            los siguientes casos:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              A proveedores de servicios que nos ayudan a operar nuestro sitio web (como servicios de análisis web)
            </li>
            <li>Si estamos obligados por ley a hacerlo</li>
            <li>Para proteger nuestros derechos, propiedad o seguridad, o los de nuestros usuarios u otros</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Seguridad de los Datos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Implementamos medidas de seguridad adecuadas para proteger tu información personal contra acceso no
            autorizado, alteración, divulgación o destrucción. Sin embargo, ningún método de transmisión por Internet o
            método de almacenamiento electrónico es 100% seguro, por lo que no podemos garantizar su seguridad absoluta.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Tus Derechos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            De acuerdo con la legislación aplicable, tienes los siguientes derechos en relación con tus datos
            personales:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Derecho de acceso</li>
            <li>Derecho de rectificación</li>
            <li>Derecho de supresión</li>
            <li>Derecho a la limitación del tratamiento</li>
            <li>Derecho a la portabilidad de los datos</li>
            <li>Derecho de oposición</li>
            <li>Derecho a retirar el consentimiento</li>
          </ul>
          <p>
            Para ejercer estos derechos, puedes ponerte en contacto con nosotros a través de{" "}
            <Link href="mailto:info@calculosFaciles.org" className="text-primary hover:underline">
              info@calculosFaciles.org
            </Link>
            .
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Enlaces a Otros Sitios Web</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Nuestro sitio web puede contener enlaces a otros sitios web que no están operados por nosotros. Si haces
            clic en un enlace de terceros, serás dirigido al sitio de ese tercero. Te recomendamos encarecidamente que
            revises la Política de Privacidad de cada sitio que visites. No tenemos control ni asumimos responsabilidad
            alguna por el contenido, las políticas de privacidad o las prácticas de sitios web o servicios de terceros.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Cambios en esta Política de Privacidad</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Podemos actualizar nuestra Política de Privacidad de vez en cuando. Te notificaremos cualquier cambio
            publicando la nueva Política de Privacidad en esta página. Te recomendamos que revises esta Política de
            Privacidad periódicamente para conocer cualquier cambio.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Contacto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Si tienes alguna pregunta sobre esta Política de Privacidad, puedes contactarnos en{" "}
            <Link href="mailto:info@calculosFaciles.org" className="text-primary hover:underline">
              info@calculosFaciles.org
            </Link>
            .
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
