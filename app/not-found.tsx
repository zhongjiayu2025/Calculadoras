import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HomeIcon } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Página no encontrada</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Lo sentimos, la página que estás buscando no existe o ha sido movida a otra ubicación.
      </p>
      <Button asChild>
        <Link href="/" className="flex items-center gap-2">
          <HomeIcon className="h-4 w-4" />
          Volver a la página principal
        </Link>
      </Button>
    </div>
  )
}
