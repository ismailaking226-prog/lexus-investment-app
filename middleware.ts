import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  // Public routes
  if (pathname === "/" || pathname === "/auth/login" || pathname === "/auth/signup") {
    return NextResponse.next();
  }

  // Protected routes
  if (pathname.startsWith("/moi") || pathname.startsWith("/depot") || pathname.startsWith("/retrait") || pathname.startsWith("/investir")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // Admin routes
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    const payload = await verifyToken(token);
    if (!payload || !payload.isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon).*)"]
};
