import { Heart } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Meus Favoritos",
};

export default function FavoritesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900">Meus Favoritos</h1>
      <p className="mt-2 text-gray-600">Produtos que você salvou</p>

      <div className="mt-8 rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center">
        <Heart className="mx-auto h-16 w-16 text-gray-300" />
        <h3 className="mt-4 text-lg font-semibold text-gray-600">
          Nenhum favorito ainda
        </h3>
        <p className="mt-2 text-gray-500">
          Explore nossas ofertas e salve os produtos que mais gostar.
        </p>
        <Link
          href="/produtos"
          className="mt-4 inline-flex items-center rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-600"
        >
          Ver Ofertas
        </Link>
      </div>
    </div>
  );
}
