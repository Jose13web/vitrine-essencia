"use client";

import Link from "next/link";
import { Heart, Star, Tag } from "lucide-react";
import { formatPrice, calcDiscount } from "@/lib/utils";
import { useState } from "react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    originalPrice?: number | null;
    imageUrl: string;
    rating: number;
    reviewCount: number;
    brand?: string | null;
    shortDesc?: string | null;
    category?: { name: string; slug: string };
    coupons?: { code: string; discount: string }[];
  };
  showCategory?: boolean;
}

export default function ProductCard({ product, showCategory = false }: ProductCardProps) {
  const [favorited, setFavorited] = useState(false);
  const discount = product.originalPrice
    ? calcDiscount(product.originalPrice, product.price)
    : 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg">
      {discount > 0 && (
        <div className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-bold text-white">
          -{discount}%
        </div>
      )}

      <button
        onClick={(e) => {
          e.preventDefault();
          setFavorited(!favorited);
        }}
        className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-1.5 backdrop-blur transition-colors hover:bg-white"
      >
        <Heart
          className={`h-4 w-4 transition-colors ${
            favorited ? "fill-red-500 text-red-500" : "text-gray-400"
          }`}
        />
      </button>

      <Link href={`/produtos/${product.slug}`} className="block">
        <div className="relative aspect-square bg-gray-100 p-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-contain transition-transform group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        {showCategory && product.category && (
          <span className="mb-1 text-xs font-medium text-orange-600">
            {product.category.name}
          </span>
        )}

        <Link href={`/produtos/${product.slug}`}>
          <h3 className="line-clamp-2 text-sm font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
            {product.brand && <span className="text-gray-500">{product.brand} - </span>}
            {product.name}
          </h3>
        </Link>

        {product.shortDesc && (
          <p className="mt-1 line-clamp-1 text-xs text-gray-500">{product.shortDesc}</p>
        )}

        <div className="mt-2 flex items-center gap-1">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-3 w-3 ${
                  star <= Math.round(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            {product.rating.toFixed(1)} ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        <div className="mt-auto pt-3">
          {product.originalPrice && product.originalPrice > product.price && (
            <p className="text-xs text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </p>
          )}
          <p className="text-lg font-bold text-orange-600">
            {formatPrice(product.price)}
          </p>

          {product.coupons && product.coupons.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {product.coupons.slice(0, 2).map((coupon) => (
                <span
                  key={coupon.code}
                  className="inline-flex items-center gap-1 rounded-md bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700"
                >
                  <Tag className="h-3 w-3" />
                  {coupon.discount}
                </span>
              ))}
            </div>
          )}

          <Link
            href={`/produtos/${product.slug}`}
            className="mt-3 block w-full rounded-xl bg-orange-500 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            Ver Oferta
          </Link>
        </div>
      </div>
    </div>
  );
}
