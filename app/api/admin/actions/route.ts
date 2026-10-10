import { NextRequest, NextResponse } from "next/server";
import { processDailyGains, getStats, getSettings, updateSettings, getUsers, updateUser } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload || !payload.isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const stats = await getStats();
  return NextResponse.json(stats);
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload || !payload.isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const body = await req.json();
    const { action, data } = body;

    if (action === "daily-gains") {
      const gains = await processDailyGains();
      return NextResponse.json({ success: true, gains_credited: gains.length, gains });
    }

    if (action === "update-settings") {
      const settings = await updateSettings(data);
      return NextResponse.json({ success: true, settings });
    }

    if (action === "adjust-balance") {
      const { user_id, amount } = data;
      const user = await updateUser(user_id, { balance: amount });
      return NextResponse.json({ success: true, user });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
