import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail, createUser, hashPassword } from "@/lib/db";
import { createToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, name, phone, country } = body;

    if (!email || !password || !name || !phone || !country) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const user = await createUser(name, phone, country, email, password);
    const token = createToken(user.id, false);

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, balance: user.balance },
      token,
    });
    response.cookies.set("auth_token", token, { maxAge: 24 * 60 * 60, secure: true, sameSite: "lax" });
    return response;
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
