import { categorias } from "@/lib/categories"

export async function GET() {
  const baseUrl = "https://calculosfaciles.org"

  // Fecha actual para lastmod
  const date = new Date().toISOString()

  // Crear URLs para la página principal y páginas de categorías
  const urls = [
    {
      url: baseUrl,
      lastmod: date,
      changefreq: "weekly",
      priority: 1.0,
    },
    ...categorias.map((categoria) => ({
      url: `${baseUrl}/categoria/${categoria.id}`,
      lastmod: date,
      changefreq: "weekly",
      priority: 0.9,
    })),
  ]

  // Añadir URLs para cada calculadora
  categorias.forEach((categoria) => {
    categoria.calculadoras.forEach((calculadora) => {
      urls.push({
        url: `${baseUrl}${calculadora.ruta}`,
        lastmod: date,
        changefreq: "monthly",
        priority: 0.8,
      })
    })
  })

  // Generar XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>
  `,
    )
    .join("")}
</urlset>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
