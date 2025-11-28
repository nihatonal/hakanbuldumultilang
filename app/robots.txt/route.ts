// app/robots.txt/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const siteUrl = "https://www.hakanbuldu.com";

  const robotsTxt = `
User-agent: *
Disallow: /studio/
Disallow: /api/
Disallow: /admin/    # (Opsiyonel ama önerilir)
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

  return new NextResponse(robotsTxt.trim(), {
    headers: { "Content-Type": "text/plain" },
  });
}
