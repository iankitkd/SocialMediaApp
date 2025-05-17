import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const publicRoutes = ['/signup']
  const protectedRoutes = ['/profile', '/logout', '/compose']
  const isProtected = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  )

  if (!token && isProtected) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (token && publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/home', req.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", '/login', '/signup', '/logout', '/compose/:path*'],
};


// there is a small problem of login form unreachable, if token is (invalid or expired) on browser
// so remove /login here