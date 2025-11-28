import { NextResponse } from "next/server";

type Locale = "tr" | "en";

const staticPages: Record<Locale, string[]> = {
  tr: ["/", "/hakkinda", "/calisma-alanlari", "/blog", "/iletisim"],
  en: ["/", "/about", "/services", "/blog", "/contact"],
};

const legalPages: Record<Locale, string[]> = {
  tr: [
    "/gizlilik-politikasi",
    "/kullanim-sartlari",
    "/cerez-politikasi",
    "/telif-ve-marka-haklari",
  ],
  en: [
    "/privacy-policy",
    "/terms-of-use",
    "/cookies-policy",
    "/rights-of-content",
  ],
};

export function GET() {
  const baseUrl = "https://www.hakanbuldu.com";

  let urls = "";

  (["tr", "en"] as Locale[]).forEach((locale) => {
    [...staticPages[locale], ...legalPages[locale]].forEach((p) => {
      urls += `
<url>
  <loc>${baseUrl}/${locale}${p}</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>`;
    });
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
