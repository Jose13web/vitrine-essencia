import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { formatPrice, calcDiscount, formatDate } from "@/lib/utils";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import { ExternalLink, Tag, Star, ShieldCheck, Truck, ChevronLeft } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) return { title: "Produto não encontrado" };

  return {
    title: product.name,
    description: product.shortDesc || product.description.substring(0, 160),
    openGraph: {
      title: `${product.name} - Vitrine Shopee`,
      description: product.description.substring(0, 160),
      images: [{ url: product.imageUrl }],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      coupons: { where: { active: true } },
      reviews: { include: { user: true }, orderBy: { createdAt: "desc" }, take: 5 },
    },
  });

  if (!product) notFound();

  const discount = product.originalPrice
    ? calcDiscount(product.originalPrice, product.price)
    : 0;

  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
      active: true,
    },
    include: { category: true, coupons: true },
    take: 4,
  });

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = product.reviews.filter((r) => r.rating === star).length;
    return { star, count, percent: product.reviewCount > 0 ? (count / product.reviews.length) * 100 : 0 };
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-orange-600">Início</Link>
        <span>/</span>
        <Link href="/produtos" className="hover:text-orange-600">Produtos</Link>
        <span>/</span>
        <Link href={`/categorias/${product.category.slug}`} className="hover:text-orange-600">
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="text-gray-800">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative rounded-2xl border border-gray-200 bg-white p-8">
          {discount > 0 && (
            <div className="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
              -{discount}%
            </div>
          )}
          <img
            src={product.imageUrl}
            alt={product.name}
            className="mx-auto max-h-96 w-full object-contain"
          />
        </div>

        <div>
          <span className="text-sm font-medium text-orange-600">{product.category.name}</span>
          <h1 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating.toFixed(1)} ({product.reviewCount.toLocaleString()} avaliações)
            </span>
          </div>

          <div className="mt-6 rounded-xl bg-orange-50 p-6">
            {product.originalPrice && product.originalPrice > product.price && (
              <p className="text-sm text-gray-400 line-through">
                De {formatPrice(product.originalPrice)}
              </p>
            )}
            <p className="text-4xl font-extrabold text-orange-600">
              {formatPrice(product.price)}
            </p>
            {discount > 0 && (
              <p className="mt-1 text-sm font-medium text-green-600">
                Você economiza {formatPrice(product.originalPrice! - product.price)}
              </p>
            )}
          </div>

          {product.coupons.length > 0 && (
            <div className="mt-4 space-y-2">
              <h3 className="flex items-center gap-2 font-semibold text-gray-800">
                <Tag className="h-4 w-4 text-green-600" />
                Cupons Disponíveis
              </h3>
              {product.coupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className="flex items-center justify-between rounded-lg border border-dashed border-green-300 bg-green-50 px-4 py-2"
                >
                  <div>
                    <span className="font-mono font-bold text-green-700">{coupon.code}</span>
                    {coupon.description && (
                      <p className="text-xs text-gray-500">{coupon.description}</p>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-green-600">{coupon.discount}</span>
                </div>
              ))}
            </div>
          )}

          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-orange-600 hover:shadow-xl"
          >
            <ExternalLink className="h-5 w-5" />
            Ver Oferta na Shopee
          </a>

          <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs text-gray-600">
            <div className="rounded-lg bg-gray-50 p-3">
              <ShieldCheck className="mx-auto mb-1 h-5 w-5 text-green-500" />
              Compra Segura
            </div>
            <div className="rounded-lg bg-gray-50 p-3">
              <Tag className="mx-auto mb-1 h-5 w-5 text-orange-500" />
              Melhor Preço
            </div>
            <div className="rounded-lg bg-gray-50 p-3">
              <Truck className="mx-auto mb-1 h-5 w-5 text-blue-500" />
              Frete Disponível
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Descrição do Produto</h2>
        <p className="whitespace-pre-line text-gray-700 leading-relaxed">
          {product.description}
        </p>
        {product.tags && (
          <div className="mt-4 flex flex-wrap gap-2">
            {product.tags.split(",").map((tag) => (
              <span
                key={tag.trim()}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
              >
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}
      </div>

      {product.reviews.length > 0 && (
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Avaliações</h2>
          <div className="grid gap-6 md:grid-cols-[200px_1fr]">
            <div className="text-center">
              <p className="text-5xl font-bold text-orange-600">{product.rating.toFixed(1)}</p>
              <div className="mx-auto mt-2 flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.round(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-1 text-sm text-gray-500">{product.reviewCount} avaliações</p>
            </div>
            <div className="space-y-2">
              {ratingDistribution.map((dist) => (
                <div key={dist.star} className="flex items-center gap-2">
                  <span className="w-8 text-right text-sm text-gray-600">{dist.star}★</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-yellow-400"
                      style={{ width: `${dist.percent}%` }}
                    />
                  </div>
                  <span className="w-8 text-xs text-gray-500">{dist.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {product.reviews.map((review) => (
              <div key={review.id} className="border-t pt-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-sm font-bold text-orange-600">
                    {review.user.name?.[0] || "U"}
                  </div>
                  <span className="font-medium text-gray-800">{review.user.name || "Usuário"}</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3 w-3 ${
                          star <= review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                {review.comment && (
                  <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {relatedProducts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Produtos Relacionados</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
