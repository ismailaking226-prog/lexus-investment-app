import { NextRequest, NextResponse } from "next/server";
import { getUsers } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload || !payload.isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const country = req.nextUrl.searchParams.get("country");
  let users = await getUsers();
  
  if (country && country !== "Tous") {
    users = users.filter((u) => u.country === country);
  }

  return NextResponse.json({ users });
}
