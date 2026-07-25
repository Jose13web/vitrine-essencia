import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Dicas, Ofertas e Tutoriais",
  description: "Blog da Vitrine Shopee com dicas, tutoriais e as melhores ofertas da semana.",
};

export default async function BlogPage() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
      <p className="mt-2 text-gray-600">Dicas, tutoriais e ofertas imperdíveis</p>

      {articles.length === 0 ? (
        <div className="mt-8 rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center">
          <h3 className="text-lg font-semibold text-gray-600">Nenhum artigo publicado</h3>
          <p className="mt-2 text-gray-500">Em breve teremos conteúdo incrível!</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:shadow-lg"
            >
              {article.imageUrl && (
                <div className="aspect-video overflow-hidden bg-gray-100">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6">
                {article.publishedAt && (
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="h-3 w-3" />
                    {formatDate(article.publishedAt)}
                  </div>
                )}
                <h2 className="mt-2 text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-2">
                  {article.title}
                </h2>
                {article.excerpt && (
                  <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                    {article.excerpt}
                  </p>
                )}
                {article.tags && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {article.tags.split(",").slice(0, 3).map((tag) => (
                      <span
                        key={tag.trim()}
                        className="rounded-full bg-orange-50 px-2 py-0.5 text-xs text-orange-600"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-orange-600">
                  Ler mais <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
