import { NextRequest } from "next/server";
const { readData, approveDeposit, rejectDeposit, approveWithdrawal, rejectWithdrawal } = await import("@/lib/store");

export async function GET() {
  const data = await readData();
  return Response.json({
    deposits: data.depositRequests,
    withdrawals: data.withdrawalRequests,
    stats: {
      users: data.users.length,
      totalVolume: data.users.reduce((sum, user) => sum + user.balance, 0),
    },
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (body.action === "approve-deposit") {
    const result = await approveDeposit(Number(body.id));
    return Response.json({ ok: !!result, data: result });
  }
  if (body.action === "reject-deposit") {
    const result = await rejectDeposit(Number(body.id));
    return Response.json({ ok: !!result, data: result });
  }
  if (body.action === "approve-withdrawal") {
    const result = await approveWithdrawal(Number(body.id));
    return Response.json({ ok: !!result, data: result });
  }
  if (body.action === "reject-withdrawal") {
    const result = await rejectWithdrawal(Number(body.id));
    return Response.json({ ok: !!result, data: result });
  }
  return Response.json({ ok: false, message: "Unknown admin action" });
}
