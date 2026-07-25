import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ofertas e Produtos",
  description: "Veja todas as ofertas e produtos disponíveis na Vitrine Shopee.",
};

interface SearchParams {
  q?: string;
  categoria?: string;
  ordenar?: string;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { q, categoria, ordenar } = params;

  const where: Record<string, unknown> = { active: true };

  if (q) {
    where.OR = [
      { name: { contains: q } },
      { description: { contains: q } },
      { tags: { contains: q } },
      { brand: { contains: q } },
    ];
  }

  if (categoria) {
    where.category = { slug: categoria };
  }

  let orderBy: Record<string, string> = { createdAt: "desc" };
  if (ordenar === "preco-asc") orderBy = { price: "asc" };
  else if (ordenar === "preco-desc") orderBy = { price: "desc" };
  else if (ordenar === "avaliacao") orderBy = { rating: "desc" };
  else if (ordenar === "desconto") orderBy = { originalPrice: "desc" };

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true, coupons: true },
      orderBy,
    }),
    prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { order: "asc" },
    }),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {q ? `Resultados para "${q}"` : "Todas as Ofertas"}
        </h1>
        <p className="mt-2 text-gray-600">
          {products.length} {products.length === 1 ? "produto encontrado" : "produtos encontrados"}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-6">
            <div>
              <h3 className="mb-3 font-semibold text-gray-900">Categorias</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/produtos"
                    className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                      !categoria ? "bg-orange-50 font-medium text-orange-600" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Todas
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/produtos?categoria=${cat.slug}`}
                      className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                        categoria === cat.slug
                          ? "bg-orange-50 font-medium text-orange-600"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {cat.name} ({cat._count.products})
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 font-semibold text-gray-900">Ordenar por</h3>
              <ul className="space-y-1">
                {[
                  { value: "", label: "Mais recentes" },
                  { value: "preco-asc", label: "Menor preço" },
                  { value: "preco-desc", label: "Maior preço" },
                  { value: "avaliacao", label: "Melhor avaliação" },
                ].map((opt) => (
                  <li key={opt.value}>
                    <Link
                      href={opt.value ? `/produtos?ordenar=${opt.value}` : "/produtos"}
                      className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                        ordenar === opt.value
                          ? "bg-orange-50 font-medium text-orange-600"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {opt.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <div>
          {products.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center">
              <SlidersHorizontal className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-4 text-lg font-semibold text-gray-600">
                Nenhum produto encontrado
              </h3>
              <p className="mt-2 text-gray-500">
                Tente buscar por outros termos ou ajuste os filtros.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} showCategory />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
