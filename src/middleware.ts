import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('username')?.value
  const { pathname } = req.nextUrl

  // 예외 경로 정의
  const excludedPaths = ['/signin', '/terms', '/privacy']

  // 토큰이 없고, 예외 경로가 아닌 경우 리다이렉트
  if (!token && !excludedPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/signin', req.url))
  }

  // 그 외는 다음 단계로 진행
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.png|app-logo.png|og-image.jpeg|master.png).*)']
}
