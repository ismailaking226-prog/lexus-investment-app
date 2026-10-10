export async function GET() {
  const { readData } = await import("@/lib/store");
  const products = await readData();
  return Response.json({ products: products.products });
}

export async function POST() {
  return Response.json({ ok: true, message: "Endpoint products initialized" });
}
