import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return { title: "Categoria não encontrada" };
  return {
    title: category.name,
    description: category.description || `Produtos na categoria ${category.name}`,
  };
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      products: {
        where: { active: true },
        include: { category: true, coupons: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!category) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-orange-600">Início</Link>
        <span>/</span>
        <Link href="/categorias" className="hover:text-orange-600">Categorias</Link>
        <span>/</span>
        <span className="text-gray-800">{category.name}</span>
      </nav>

      <div className="mb-8 flex items-center gap-4">
        <span className="text-5xl">{category.image || "📦"}</span>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
          {category.description && (
            <p className="mt-1 text-gray-600">{category.description}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            {category.products.length} produtos encontrados
          </p>
        </div>
      </div>

      {category.products.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center">
          <p className="text-lg text-gray-500">
            Nenhum produto nesta categoria ainda.
          </p>
          <Link href="/produtos" className="mt-4 inline-block text-orange-600 font-medium">
            Ver todos os produtos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {category.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
