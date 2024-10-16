import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Daftar rute publik
  const publicPaths = [
    "/auth/login",
    "/api/login",
    "/api/register",
    "/oauth/sso/authorize",
  ];
  const isPublicPath = publicPaths.includes(pathname);
  // Pengecualian untuk file statis dan aset Next.js
  const isStaticFile =
    pathname.startsWith("/_next") || pathname.startsWith("/static");

  // Abaikan middleware untuk file statis
  if (isStaticFile) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value || "";
  const authHeader = request.headers.get("Authorization") || "";
  const bearerToken = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  // Handle API routes
  if (pathname.startsWith("/api")) {
    // Allow public API routes without Bearer token
    if (isPublicPath) {
      return NextResponse.next();
    }

    // Secure other API routes with Bearer token
    if (!bearerToken) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    return NextResponse.next();
  }
  // console.log("HIIIITTT", isPublicPath, token);
  // Handle non-API routes with cookie-based authentication
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
