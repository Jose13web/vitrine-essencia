import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article) return { title: "Artigo não encontrado" };
  return {
    title: article.title,
    description: article.excerpt || article.content.substring(0, 160),
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article) notFound();

  const htmlContent = article.content
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-6 mb-3 text-gray-800">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4 text-gray-900">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-gray-700">$1</li>')
    .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal text-gray-700">$1</li>')
    .replace(/\n\n/g, '<br/><br/>');

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-orange-600 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao Blog
      </Link>

      {article.imageUrl && (
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full rounded-2xl object-cover"
          style={{ maxHeight: 400 }}
        />
      )}

      <h1 className="mt-6 text-3xl font-extrabold text-gray-900 md:text-4xl">
        {article.title}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
        {article.publishedAt && (
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {formatDate(article.publishedAt)}
          </span>
        )}
      </div>

      {article.tags && (
        <div className="mt-4 flex flex-wrap gap-2">
          {article.tags.split(",").map((tag) => (
            <span
              key={tag.trim()}
              className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600"
            >
              <Tag className="h-3 w-3" />
              {tag.trim()}
            </span>
          ))}
        </div>
      )}

      <div
        className="prose prose-orange mt-8 max-w-none text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
}
