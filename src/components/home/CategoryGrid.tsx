import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
  _count: { products: number };
}

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/categorias/${cat.slug}`}
          className="group flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 text-center transition-all hover:border-orange-300 hover:shadow-md"
        >
          <span className="text-4xl mb-3">{cat.image || "📦"}</span>
          <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
            {cat.name}
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            {cat._count.products} {cat._count.products === 1 ? "produto" : "produtos"}
          </p>
        </Link>
      ))}
    </div>
  );
}
