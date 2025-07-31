import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const adminSession = request.cookies.get("admin-session");

  const isLoginPage = pathname === "/login";

  if (pathname.startsWith("/admin")) {
    if (!adminSession && !isLoginPage) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (adminSession && isLoginPage) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
