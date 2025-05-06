// "use client" 必须是第一行有效代码
"use client";

// Edge Runtime 配置紧随其后
export const runtime = 'edge';

// 然后是其他的 import 语句
import { useCallback } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { categorias } from "@/lib/categories"; // 确认路径正确
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // 确认路径正确
import { Button } from "@/components/ui/button"; // 确认路径正确
import * as Icons from "lucide-react";

// Componente dinámico para iconos de Lucide
const DynamicIcon = ({ name }: { name: string }) => {
  // 确保 Icons 对象中确实有名为 name 的 key
  const IconComponent = Icons[name as keyof typeof Icons] || Icons.Calculator;
  // 返回组件实例，并应用固定类名
  return <IconComponent className="h-5 w-5" />;
};

interface CategoriaPageProps {
  params: {
    categoriaId: string;
  };
}

export default function CategoriaPage({ params }: CategoriaPageProps) {
  // useCallback 保持不变
  const getCategoriaById = useCallback((id: string) => {
    return categorias.find((categoria) => categoria.id === id);
  }, []);

  const categoria = getCategoriaById(params.categoriaId);

  // 如果找不到分类，显示404页面
  if (!categoria) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* 标题和返回按钮 */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild className="shadow-sm">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Volver</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          {/* 使用 DynamicIcon 组件 */}
          <DynamicIcon name={categoria.icono} />
          {categoria.nombre}
        </h1>
      </div>

      {/* 分类描述 */}
      <p className="text-muted-foreground">{categoria.descripcion}</p>

      {/* 计算器卡片网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoria.calculadoras.map((calculadora) => (
          <Card key={calculadora.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3 bg-muted/30">
              <div className="flex items-center gap-2 mb-1">
                {/* 使用 DynamicIcon 组件 */}
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
  );
}
