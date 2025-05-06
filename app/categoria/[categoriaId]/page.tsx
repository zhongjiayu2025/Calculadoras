// app/categoria/[categoriaId]/page.tsx

// 这行是新添加的，用于配置 Edge Runtime
export const runtime = 'edge';

// 客户端组件指令保持不变
"use client"

import { useCallback } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { categorias } from "@/lib/categories"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import * as Icons from "lucide-react"

// Componente dinámico para iconos de Lucide
const DynamicIcon = ({ name }: { name: string }) => {
  const IconComponent = Icons[name as keyof typeof Icons] || Icons.Calculator
  // 确保类名也被传递给 IconComponent
  return <IconComponent className="h-5 w-5" />
}

interface CategoriaPageProps {
  params: {
    categoriaId: string
  }
}

// 注意：页面组件本身仍然可以是客户端组件 "use client"
// runtime 配置影响的是 Next.js 如何处理这个路由的服务器端部分（如果适用）
// 以及它与 Cloudflare Pages Functions 的集成方式。
export default function CategoriaPage({ params }: CategoriaPageProps) {
  const getCategoriaById = useCallback((id: string) => {
    return categorias.find((categoria) => categoria.id === id)
  }, [])

  const categoria = getCategoriaById(params.categoriaId)

  if (!categoria) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild className="shadow-sm">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Volver</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          {/* 确保 DynamicIcon 正确接收并应用 className */}
          <DynamicIcon name={categoria.icono} />
          {categoria.nombre}
        </h1>
      </div>

      <p className="text-muted-foreground">{categoria.descripcion}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoria.calculadoras.map((calculadora) => (
          <Card key={calculadora.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3 bg-muted/30">
              <div className="flex items-center gap-2 mb-1">
                {/* 确保 DynamicIcon 正确接收并应用 className */}
                <DynamicIcon name={calculadora.icono} />
                <CardTitle className="text-lg">{calculadora.nombre}</CardTitle>
              </div>
              <CardDescription>{calculadora.descripcion}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href={calculadora.ruta}>Abrir calculadora</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
