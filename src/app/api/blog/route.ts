import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(articles);
}

export async function POST(req: Request) {
  const body = await req.json();
  const article = await prisma.article.create({
    data: {
      title: body.title,
      slug: body.slug || body.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-"),
      excerpt: body.excerpt || null,
      content: body.content || "",
      imageUrl: body.imageUrl || null,
      tags: body.tags || "",
      published: body.published ?? false,
      publishedAt: body.published ? new Date() : null,
    },
  });
  return NextResponse.json(article);
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const body = await req.json();
  const article = await prisma.article.update({
    where: { id },
    data: {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      imageUrl: body.imageUrl,
      tags: body.tags,
      published: body.published,
      publishedAt: body.published ? new Date() : null,
    },
  });
  return NextResponse.json(article);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  await prisma.article.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
