import { NextRequest } from "next/server";
const { readData, addWithdrawalRequest } = await import("@/lib/store");

export async function GET() {
  const data = await readData();
  return Response.json({ withdrawals: data.withdrawalRequests });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await addWithdrawalRequest({
    userId: body.userId,
    name: body.name,
    amount: Number(body.amount ?? 0),
    network: body.network,
    phone: body.phone,
    country: body.country,
  });
  return Response.json({ ok: true, data: result });
}
