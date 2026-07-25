import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/home/HeroSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import { Flame, TrendingUp, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

async function getHomeData() {
  const [featuredProducts, categories, recentProducts, allProducts] =
    await Promise.all([
      prisma.product.findMany({
        where: { featured: true, active: true },
        include: { category: true, coupons: true },
        orderBy: { createdAt: "desc" },
        take: 8,
      }),
      prisma.category.findMany({
        include: { _count: { select: { products: true } } },
        orderBy: { order: "asc" },
      }),
      prisma.product.findMany({
        where: { active: true },
        include: { category: true, coupons: true },
        orderBy: { createdAt: "desc" },
        take: 4,
      }),
      prisma.product.findMany({
        where: { active: true },
        include: { category: true, coupons: true },
        orderBy: { reviewCount: "desc" },
        take: 4,
      }),
    ]);

  return { featuredProducts, categories, recentProducts, allProducts };
}

export default async function HomePage() {
  const { featuredProducts, categories, recentProducts, allProducts } =
    await getHomeData();

  return (
    <div>
      <HeroSection />

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Categorias</h2>
          <Link href="/categorias" className="flex items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700">
            Ver todas <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <CategoryGrid categories={categories} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-center gap-2 mb-6">
          <Flame className="h-6 w-6 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-900">Ofertas em Destaque</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} showCategory />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 bg-gray-100 rounded-3xl my-8">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-6 w-6 text-orange-500" />
          <h2 className="text-2xl font-bold text-gray-900">Mais Populares</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} showCategory />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Adicionados Recentemente</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {recentProducts.map((product) => (
            <ProductCard key={product.id} product={product} showCategory />
          ))}
        </div>
      </section>
    </div>
  );
}
