import { NextRequest } from "next/server";
const { readData, writeData } = await import("@/lib/store");

export async function GET() {
  const data = await readData();
  return Response.json({ users: data.users });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const data = await readData();
  const nextUser = {
    id: Date.now(),
    name: body.name ?? "Nouvel utilisateur",
    phone: body.phone ?? "+22900000000",
    country: body.country ?? "Bénin",
    balance: 0,
    investements: 0,
    wallet: 0,
  };
  data.users.unshift(nextUser);
  await writeData(data);
  return Response.json({ ok: true, user: nextUser });
}
