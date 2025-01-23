import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { sessionCookieName, validateSession } from './src/lib/auth/session';
import { authRoutes, todoRoutes } from './src/lib/router';

export function middleware(request: NextRequest) {
  const sessionId = request.cookies.get(sessionCookieName)?.value;
  const isValidSession = sessionId ? validateSession(sessionId) : false;
  const isAuthRoute = Object.values(authRoutes).includes(request.nextUrl.pathname);
  const isTodosRoute = Object.values(todoRoutes).includes(request.nextUrl.pathname);

  if (!isAuthRoute && !isValidSession) {
    return NextResponse.redirect(new URL(authRoutes.Login, request.url));
  }

  if (isValidSession && !isTodosRoute) {
    return NextResponse.redirect(new URL(todoRoutes.List, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
