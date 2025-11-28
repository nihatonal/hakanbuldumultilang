import { NextResponse } from "next/server";
import { practicesData } from "@/constants/practiceAreas";

export function GET() {
  const baseUrl = "https://www.hakanbuldu.com";

  const trServices = practicesData.tr.map((s) => s.slug);
  const enServices = practicesData.en.map((s) => s.slug);

  let urls = "";

  trServices.forEach((slug) => {
    urls += `
<url>
  <loc>${baseUrl}/tr/calisma-alanlari/${slug}</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>`;
  });

  enServices.forEach((slug) => {
    urls += `
<url>
  <loc>${baseUrl}/en/services/${slug}</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
