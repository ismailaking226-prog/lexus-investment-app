import { NextRequest, NextResponse } from "next/server";
import { createDepositRequest, getDepositRequests, approveDeposit, rejectDeposit } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const deposits = await getDepositRequests();
  return NextResponse.json({ deposits });
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { amount, phone, network, proof_file, action, deposit_id, reason } = body;

    if (action === "create") {
      const deposit = await createDepositRequest(payload.userId as string, amount, phone, network, proof_file);
      return NextResponse.json({ success: true, deposit });
    }

    if (action === "approve" && payload.isAdmin) {
      const deposit = await approveDeposit(deposit_id, payload.userId as string);
      return NextResponse.json({ success: true, deposit });
    }

    if (action === "reject" && payload.isAdmin) {
      const deposit = await rejectDeposit(deposit_id, payload.userId as string, reason);
      return NextResponse.json({ success: true, deposit });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
