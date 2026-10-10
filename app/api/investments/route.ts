import { NextRequest, NextResponse } from "next/server";
import { createInvestment, getInvestmentsByUserId, getInvestments } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

const PRODUCTS = [
  { id: 1, name: "Lexus S", amount: 2000, daily: 300 },
  { id: 2, name: "Lexus RX", amount: 5000, daily: 800 },
  { id: 3, name: "Lexus ES", amount: 15000, daily: 2400 },
  { id: 4, name: "Lexus IS", amount: 35000, daily: 5600 },
  { id: 5, name: "Lexus GX", amount: 50000, daily: 8500 },
  { id: 6, name: "Lexus LC", amount: 100000, daily: 17000 },
  { id: 7, name: "Lexus LX", amount: 250000, daily: 45000 },
  { id: 8, name: "Lexus UX", amount: 500000, daily: 100000 },
  { id: 9, name: "Lexus F Sport", amount: 800000, daily: 200000 },
];

export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const investments = await getInvestmentsByUserId(payload.userId as string);
  return NextResponse.json({ products: PRODUCTS, investments });
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { product_id, action } = body;

    if (action === "invest") {
      const product = PRODUCTS.find((p) => p.id === product_id);
      if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

      const investment = await createInvestment(payload.userId as string, product_id, product.amount, product.daily);
      return NextResponse.json({ success: true, investment });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
