import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/db";
import { createToken } from "@/lib/auth";
import crypto from "crypto";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (user.password !== hashPassword(password)) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isAdmin = email === "admin@lexus.local";
    const token = createToken(user.id, isAdmin);

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, balance: user.balance, isAdmin },
      token,
    });
    response.cookies.set("auth_token", token, { maxAge: 24 * 60 * 60, secure: true, sameSite: "lax" });
    return response;
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
