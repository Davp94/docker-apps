import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  let token = request.cookies.get('token')?.value;
  const url = request.nextUrl.clone();
  const path = request.nextUrl.pathname;

  if( !token && path !== '/auth/login'){
    url.pathname = '/auth/login'
    return NextResponse.redirect(url);
  }

  if (token && path === '/auth/login') {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|layout/|themes/).*)'],
}