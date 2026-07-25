import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Tag, Copy, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cupons de Desconto Shopee",
  description: "Acesse os melhores cupons de desconto da Shopee. Economize em suas compras!",
};

export default async function CouponsPage() {
  const coupons = await prisma.coupon.findMany({
    where: { active: true },
    include: { product: { include: { category: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Cupons de Desconto</h1>
        <p className="mt-2 text-gray-600">
          Use estes cupons ao finalizar sua compra na Shopee e economize ainda mais!
        </p>
      </div>

      <div className="space-y-4">
        {coupons.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center">
            <Tag className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-4 text-lg font-semibold text-gray-600">Nenhum cupom disponível</h3>
            <p className="mt-2 text-gray-500">Volte em breve para novos cupons!</p>
          </div>
        ) : (
          coupons.map((coupon) => (
            <div
              key={coupon.id}
              className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-green-100">
                  <Tag className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-green-100 px-3 py-1 font-mono font-bold text-green-700">
                      {coupon.code}
                    </span>
                    <span className="text-lg font-bold text-green-600">{coupon.discount}</span>
                  </div>
                  {coupon.description && (
                    <p className="mt-1 text-sm text-gray-500">{coupon.description}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-400">
                    Produto:{" "}
                    <Link href={`/produtos/${coupon.product.slug}`} className="text-orange-600 hover:underline">
                      {coupon.product.name}
                    </Link>
                    {" · "}Categoria: {coupon.product.category.name}
                  </p>
                </div>
              </div>

              <a
                href={coupon.product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-600"
              >
                <ExternalLink className="h-4 w-4" />
                Usar Cupom
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
