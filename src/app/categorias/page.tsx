import { prisma } from "@/lib/prisma";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Categorias de Produtos",
  description: "Explore todas as categorias de produtos da Vitrine Shopee.",
};

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { order: "asc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900">Categorias</h1>
      <p className="mt-2 text-gray-600">Explore ofertas por categoria</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categorias/${cat.slug}`}
            className="group rounded-2xl border border-gray-200 bg-white p-8 text-center transition-all hover:border-orange-300 hover:shadow-lg"
          >
            <span className="text-5xl">{cat.image || "📦"}</span>
            <h2 className="mt-4 text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
              {cat.name}
            </h2>
            {cat.description && (
              <p className="mt-2 text-sm text-gray-500">{cat.description}</p>
            )}
            <p className="mt-3 text-sm font-medium text-orange-600">
              {cat._count.products} {cat._count.products === 1 ? "produto" : "produtos"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
