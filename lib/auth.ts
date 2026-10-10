import { jwtVerify } from "jose";
const secret = new TextEncoder().encode(process.env.JWT_SECRET || "lexus-secret-key-change-in-production");

export async function verifyToken(token: string) {
  try {
    const verified = await jwtVerify(token, secret);
    return verified.payload;
  } catch {
    return null;
  }
}

export function createToken(userId: string, isAdmin: boolean = false) {
  const payload = {
    userId,
    isAdmin,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
  };
  
  // Simple base64 token for demo (in production use real JWT)
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}
