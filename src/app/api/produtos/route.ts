import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    include: { category: true, coupons: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();
  const product = await prisma.product.create({
    data: {
      name: body.name,
      slug: body.slug || body.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-"),
      description: body.description || "",
      shortDesc: body.shortDesc || null,
      price: body.price || 0,
      originalPrice: body.originalPrice || null,
      affiliateUrl: body.affiliateUrl || "",
      imageUrl: body.imageUrl || "https://placehold.co/600x600/f3f4f6/999999?text=Produto",
      brand: body.brand || null,
      categoryId: body.categoryId,
      featured: body.featured || false,
      active: body.active ?? true,
      tags: body.tags || "",
    },
  });
  return NextResponse.json(product);
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const body = await req.json();
  const product = await prisma.product.update({
    where: { id },
    data: {
      name: body.name,
      slug: body.slug,
      description: body.description,
      shortDesc: body.shortDesc,
      price: body.price,
      originalPrice: body.originalPrice,
      affiliateUrl: body.affiliateUrl,
      imageUrl: body.imageUrl,
      brand: body.brand,
      categoryId: body.categoryId,
      featured: body.featured,
      active: body.active,
      tags: body.tags,
    },
  });
  return NextResponse.json(product);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
