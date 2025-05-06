import Link from "next/link"
import { Logo } from "@/components/logo"

export function Footer() {
  return (
    <footer className="border-t py-8 md:py-10 bg-muted/30">
      <div className="container flex flex-col gap-6 md:flex-row md:items-center px-4">
        <div className="flex items-center gap-2 text-sm md:flex-1">
          <Logo size="sm" showText={false} />
          <span className="font-medium">© {new Date().getFullYear()} CalculosFaciles.org</span>
        </div>
        <div className="flex gap-6 text-sm">
          <Link href="/aviso-legal" className="hover:text-primary transition-colors">
            Aviso Legal
          </Link>
          <Link href="/privacidad" className="hover:text-primary transition-colors">
            Política de Privacidad
          </Link>
          <Link href="/contacto" className="hover:text-primary transition-colors">
            Contacto
          </Link>
        </div>
        <div className="text-xs text-muted-foreground mt-4 md:mt-0 md:text-right">
          <p>
            Calculadoras online gratuitas para uso personal y educativo.
            <br />
            No constituyen asesoramiento profesional.
          </p>
        </div>
      </div>
    </footer>
  )
}
