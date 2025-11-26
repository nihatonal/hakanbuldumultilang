import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// next-intl middleware'i oluştur
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // 1. Önce mevcut next-intl yönlendirmesini uygula
  const response = intlMiddleware(request);

  // 2. Admin sayfaları için giriş kontrolü
  const isAdminPath = request.nextUrl.pathname.startsWith("/admin");
  if (isAdminPath) {
    const token = request.cookies.get("token")?.value;

    if (!token && !request.nextUrl.pathname.startsWith("/admin/login")) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|manifest.json|icons|robots.txt|sitemap.xml|images|fonts|bravix.png).*)",
  ],
};
