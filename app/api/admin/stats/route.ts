import { NextRequest } from "next/server";
const { readData, writeData, setPaymentLink, setTelegramLink, getStats, updateReferral } = await import("@/lib/store");

export async function GET() {
  const data = await readData();
  return Response.json({
    telegramLink: data.telegramLink,
    paymentLink: data.paymentLink,
    referral: data.referral,
    stats: {
      users: data.users.length,
      deposits: data.depositRequests.length,
      withdrawals: data.withdrawalRequests.length,
      totalVolume: data.users.reduce((sum, item) => sum + item.balance, 0),
    },
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (body.type === "telegram") {
    const value = await setTelegramLink(body.link);
    return Response.json({ ok: true, telegramLink: value });
  }
  if (body.type === "payment") {
    const value = await setPaymentLink(body.link);
    return Response.json({ ok: true, paymentLink: value });
  }
  if (body.type === "referral") {
    const value = await updateReferral({
      level1: Number(body.level1 ?? 25),
      level2: Number(body.level2 ?? 3),
      level3: Number(body.level3 ?? 2),
    });
    return Response.json({ ok: true, referral: value });
  }
  return Response.json({ ok: true, stats: await getStats() });
}
