import { NextRequest, NextResponse } from "next/server";
import { createWithdrawalRequest, getWithdrawalRequests, approveWithdrawal, rejectWithdrawal } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const withdrawals = await getWithdrawalRequests();
  return NextResponse.json({ withdrawals });
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { amount, network, phone, action, withdrawal_id, reason } = body;

    if (action === "create") {
      const withdrawal = await createWithdrawalRequest(payload.userId as string, amount, network, phone);
      return NextResponse.json({ success: true, withdrawal });
    }

    if (action === "approve" && payload.isAdmin) {
      const withdrawal = await approveWithdrawal(withdrawal_id, payload.userId as string);
      return NextResponse.json({ success: true, withdrawal });
    }

    if (action === "reject" && payload.isAdmin) {
      const withdrawal = await rejectWithdrawal(withdrawal_id, payload.userId as string, reason);
      return NextResponse.json({ success: true, withdrawal });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
