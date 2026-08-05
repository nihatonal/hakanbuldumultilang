import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { routing } from "./i18n/routing";

const intlProxy = createMiddleware(routing);

type AppLocale = (typeof routing.locales)[number];

const BLOG_ONLY_MODE = process.env.BLOG_ONLY_MODE === "true";
const MAINTENANCE_MODE = process.env.MAINTENANCE_MODE === "true";

/**
 * Proxy kontrolüne girmemesi gereken statik dosyalar.
 */
const PUBLIC_FILE =
  /\.(?:avif|css|gif|ico|jpeg|jpg|js|json|map|png|svg|txt|webp|woff|woff2|xml)$/i;

/**
 * URL'nin ilk segmentinin desteklenen locale olup olmadığını kontrol eder.
 *
 * Örnek:
 * /tr/blog  -> tr
 * /en/blog  -> en
 */
function isSupportedLocale(value: string): value is AppLocale {
  return routing.locales.includes(value as AppLocale);
}

/**
 * Pathname içinden locale değerini bulur.
 */
function getLocaleFromPathname(pathname: string): AppLocale | null {
  const firstSegment = pathname.split("/").filter(Boolean)[0];

  if (!firstSegment) {
    return null;
  }

  return isSupportedLocale(firstSegment) ? firstSegment : null;
}

/**
 * Next.js sistem rotaları, API, Sanity Studio,
 * sitemap dosyaları ve statik dosyalar Proxy tarafından yönlendirilmez.
 */
function isPublicOrInternalPath(pathname: string): boolean {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/studio") ||
    pathname.startsWith("/icons") ||
    pathname === "/favicon.ico" ||
    pathname === "/manifest.json" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/blog-sitemap.xml" ||
    pathname === "/pages-sitemap.xml" ||
    pathname === "/services-sitemap.xml" ||
    PUBLIC_FILE.test(pathname)
  );
}

/**
 * Bakım sayfasının kendisi ve locale'li bakım rotaları.
 */
function isMaintenancePath(pathname: string): boolean {
  return (
    pathname === "/maintenance" ||
    routing.locales.some((locale) => pathname === `/${locale}/maintenance`)
  );
}

/**
 * Locale ana sayfasını kontrol eder.
 *
 * /tr
 * /en
 * /ru
 */

function isLocaleHomePath(pathname: string, locale: AppLocale): boolean {
  return pathname === `/${locale}` || pathname === `/${locale}/`;
}

/**
 * Blog arşivini ve blog detaylarını açık tutar.
 *
 * /tr/blog
 * /tr/blog/yazi-slug
 */
function isBlogPath(pathname: string, locale: AppLocale): boolean {
  return (
    pathname === `/${locale}/blog` || pathname.startsWith(`/${locale}/blog/`)
  );
}

/**
 * Blog modunda açık kalacak zorunlu hukuki sayfalar.
 *
 * Buradaki isimler senin gerçek klasör adlarınla aynıdır:
 * privacy
 * cookies
 * termsOfUse
 * rightsOfContent
 */
function isAllowedLegalPath(pathname: string, locale: AppLocale): boolean {
  const allowedPaths = [
    `/${locale}/gizlilik-politikasi`,
    `/${locale}/kullanim-sartlari`,
    `/${locale}/cerez-politikasi`,
    `/${locale}/telif-ve-marka-haklari`,

    `/${locale}/privacy`,
    `/${locale}/cookies`,
    `/${locale}/termsOfUse`,
    `/${locale}/rightsOfContent`,
  ];

  return allowedPaths.some(
    (allowedPath) =>
      pathname === allowedPath || pathname.startsWith(`${allowedPath}/`),
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /**
   * Statik dosyalar, API, Sanity Studio ve sistem rotaları
   * doğrudan çalışmaya devam eder.
   */
  if (isPublicOrInternalPath(pathname)) {
    return NextResponse.next();
  }

  /**
   * Maintenance modu en yüksek önceliğe sahiptir.
   */
  if (MAINTENANCE_MODE) {
    if (isMaintenancePath(pathname)) {
      return NextResponse.next();
    }

    return NextResponse.rewrite(new URL("/maintenance", request.url));
  }

  /**
   * Blog modu kapalıysa eski site tamamen normal çalışır.
   * Tüm locale yönlendirmelerini next-intl yönetir.
   */
  if (!BLOG_ONLY_MODE) {
    return intlProxy(request);
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/tr", request.url), 307);
  }

  const locale = getLocaleFromPathname(pathname);

  /**
   * URL'de locale yoksa next-intl devreye girer.
   *
   * Örneğin:
   * / -> /tr
   *
   * Sonuç routing ayarındaki defaultLocale ve localePrefix
   * seçeneğine göre belirlenir.
   */
  if (!locale) {
    return intlProxy(request);
  }

  /**
   * Blog-only modunda açık kalan rotalar:
   *
   * /tr
   * /tr/blog
   * /tr/blog/[slug]
   * /tr/privacy
   * /tr/cookies
   * /tr/termsOfUse
   * /tr/rightsOfContent
   */
  const isAllowedPath =
    isLocaleHomePath(pathname, locale) ||
    isBlogPath(pathname, locale) ||
    isAllowedLegalPath(pathname, locale);

  if (isAllowedPath) {
    return intlProxy(request);
  }

  /**
   * About, services, contact gibi eski kurumsal sayfalar
   * silinmez; yalnızca geçici olarak locale ana sayfasına gider.
   *
   * Örnek:
   * /tr/about -> /tr
   * /en/services -> /en
   */
  return NextResponse.redirect(new URL(`/${locale}`, request.url), 307);
}

export const config = {
  matcher: [
    /**
     * API, Next.js asset rotaları, Vercel sistem rotaları
     * ve uzantılı statik dosyalar matcher seviyesinde hariç tutulur.
     */
    "/((?!api|_next/static|_next/image|_vercel|.*\\..*).*)",
  ],
};
