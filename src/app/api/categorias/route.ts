import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  const body = await req.json();
  const category = await prisma.category.create({
    data: {
      name: body.name,
      slug: body.slug || body.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-"),
      description: body.description || null,
      image: body.image || null,
      order: body.order || 0,
    },
  });
  return NextResponse.json(category);
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const body = await req.json();
  const category = await prisma.category.update({
    where: { id },
    data: {
      name: body.name,
      slug: body.slug,
      description: body.description,
      image: body.image,
      order: body.order,
    },
  });
  return NextResponse.json(category);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  await prisma.category.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
