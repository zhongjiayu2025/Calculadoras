import type React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import * as Icons from "lucide-react"

// Componente dinámico para iconos de Lucide
const DynamicIcon = ({ name }: { name: string }) => {
  const IconComponent = Icons[name as keyof typeof Icons] || Icons.Calculator
  return <IconComponent className="h-5 w-5" />
}

interface CalculatorLayoutProps {
  title: string
  description: string
  icon: string
  disclaimer?: string
  backTo: string
  backToLabel: string
  children: React.ReactNode
}

export function CalculatorLayout({
  title,
  description,
  icon,
  disclaimer,
  backTo,
  backToLabel,
  children,
}: CalculatorLayoutProps) {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild className="shadow-sm">
          <Link href={backTo}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Volver a {backToLabel}</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <DynamicIcon name={icon} className="text-primary" />
          {title}
        </h1>
      </div>

      <Card className="shadow-md border-t-4 border-t-primary">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <DynamicIcon name={icon} className="text-primary h-5 w-5" />
            {title}
          </CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {disclaimer && (
            <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-950/50 text-yellow-800 dark:text-yellow-200 text-sm rounded-md border border-yellow-200 dark:border-yellow-800 shadow-sm">
              <strong className="font-semibold">Importante:</strong> {disclaimer}
            </div>
          )}
          {children}
        </CardContent>
      </Card>
    </div>
  )
}
