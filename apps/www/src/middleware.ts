import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.rewrite(
      new URL(`${process.env.SERVER_URL}${request.nextUrl.pathname}${request.nextUrl.search}`),
      { request },
    );
  }

  if (request.nextUrl.pathname.startsWith('/discover')) {
    const res = await fetch(`${process.env.SERVER_URL}/api/auth/sessions/current`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        cookie: request.headers.get('cookie') || '',
      },
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));

    if (res && res.session) {
      return NextResponse.redirect(new URL('/dashboard/search/organization', request.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|monitoring).*)',
    '/api/:path*',
  ],
};
