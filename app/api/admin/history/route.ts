import { NextRequest, NextResponse } from "next/server";
import { getDepositRequests, getWithdrawalRequests } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload || !payload.isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const deposits = await getDepositRequests();
  const withdrawals = await getWithdrawalRequests();

  const depositHistory = deposits.filter((d) => d.status !== "pending");
  const withdrawalHistory = withdrawals.filter((w) => w.status !== "pending");

  return NextResponse.json({ depositHistory, withdrawalHistory });
}
