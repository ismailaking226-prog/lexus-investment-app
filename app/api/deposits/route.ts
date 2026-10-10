import { NextRequest } from "next/server";
const { readData, writeData, addDepositRequest } = await import("@/lib/store");

export async function GET() {
  const data = await readData();
  return Response.json({
    deposits: data.depositRequests,
    withdrawals: data.withdrawalRequests,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await addDepositRequest({
    userId: body.userId,
    name: body.name,
    amount: Number(body.amount ?? 0),
    phone: body.phone,
    country: body.country,
    network: body.network,
    proof: body.proof ?? "proof.jpg",
  });
  return Response.json({ ok: true, data: result });
}
