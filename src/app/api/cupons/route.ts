import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const coupons = await prisma.coupon.findMany({
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(coupons);
}

export async function POST(req: Request) {
  const body = await req.json();
  const coupon = await prisma.coupon.create({
    data: {
      code: body.code,
      discount: body.discount,
      description: body.description || null,
      productId: body.productId,
      active: body.active ?? true,
    },
  });
  return NextResponse.json(coupon);
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const body = await req.json();
  const coupon = await prisma.coupon.update({
    where: { id },
    data: {
      code: body.code,
      discount: body.discount,
      description: body.description,
      productId: body.productId,
      active: body.active,
    },
  });
  return NextResponse.json(coupon);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  await prisma.coupon.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
