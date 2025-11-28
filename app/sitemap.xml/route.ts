import { practicesData } from "@/constants/practiceAreas";
import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

type Locale = "tr" | "en";
const locales: Locale[] = ["tr", "en"];

interface BlogItem {
  slug: { current: string };
  publishedAt?: string;
}

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

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

export async function GET() {
  const blogs = (await client.fetch(
    `*[_type=="blog"]{slug, publishedAt}`
  )) as BlogItem[];

  const safeBlogs: BlogItem[] = Array.isArray(blogs) ? blogs : [];

  const trServices: string[] = Array.isArray(practicesData?.tr)
    ? practicesData.tr.map((s) => s.slug)
    : [];

  const enServices: string[] = Array.isArray(practicesData?.en)
    ? practicesData.en.map((s) => s.slug)
    : [];

  const allUrls: SitemapEntry[] = [];

  for (const locale of locales) {
    // STATIC PAGES
    staticPages[locale].forEach((path) => {
      allUrls.push({
        loc: `/${locale}${path}`,
        lastmod: new Date().toISOString(),
        changefreq: "monthly",
        priority: 0.8,
      });
    });

    // LEGAL PAGES
    legalPages[locale].forEach((path) => {
      allUrls.push({
        loc: `/${locale}${path}`,
        lastmod: new Date().toISOString(),
        changefreq: "yearly",
        priority: 0.5,
      });
    });

    // BLOG PAGES — ONLY TR
    if (locale === "tr") {
      safeBlogs.forEach((blog) => {
        allUrls.push({
          loc: `/tr/blog/${blog.slug.current}`,
          lastmod: blog.publishedAt
            ? new Date(blog.publishedAt).toISOString()
            : new Date().toISOString(),
          changefreq: "monthly",
          priority: 0.7,
        });
      });
    }

    // SERVICES
    const services = locale === "tr" ? trServices : enServices;
    const basePath = locale === "tr" ? "calisma-alanlari" : "services";

    services.forEach((slug) => {
      allUrls.push({
        loc: `/${locale}/${basePath}/${slug}`,
        lastmod: new Date().toISOString(),
        changefreq: "monthly",
        priority: 0.7,
      });
    });
  }

  const xmlUrls = allUrls
    .map(
      (url) => `<url>
  <loc>https://www.hakanbuldu.com${url.loc}</loc>
  <lastmod>${url.lastmod}</lastmod>
  <changefreq>${url.changefreq}</changefreq>
  <priority>${url.priority}</priority>
</url>`
    )
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
