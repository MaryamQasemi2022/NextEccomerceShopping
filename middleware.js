import { NextResponse } from "next/server";

export async function middleware(req, res) {
  const token = req.cookies.get("token");

  if (token && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (!token && req.nextUrl.pathname.startsWith("/cart")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (!token && req.nextUrl.pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/cart/:path*", "/profile/:path*"],
};
