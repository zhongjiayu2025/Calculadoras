"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"
import { categorias } from "@/lib/categories"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center px-4">
        <Logo showText className="mr-4" />

        <nav className="hidden md:flex md:flex-1 md:gap-5" aria-label="Navegación principal">
          {categorias.map((categoria) => (
            <Link
              key={categoria.id}
              href={`/categoria/${categoria.id}`}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative py-1",
                pathname === `/categoria/${categoria.id}` || pathname.startsWith(`/categoria/${categoria.id}/`)
                  ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary"
                  : "text-muted-foreground",
              )}
            >
              {categoria.nombre}
            </Link>
          ))}
        </nav>

        <div className="flex gap-2 ml-auto">
          <ModeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menú de navegación</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-4 mt-6">
                <Logo size="sm" onClick={() => setOpen(false)} />
                <nav className="flex flex-col gap-2" aria-label="Navegación móvil">
                  {categorias.map((categoria) => (
                    <Link
                      key={categoria.id}
                      href={`/categoria/${categoria.id}`}
                      className={cn(
                        "flex py-2 text-base transition-colors hover:text-primary",
                        pathname === `/categoria/${categoria.id}` || pathname.startsWith(`/categoria/${categoria.id}/`)
                          ? "text-primary font-medium"
                          : "text-muted-foreground",
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {categoria.nombre}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
