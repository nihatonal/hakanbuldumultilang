import { practicesData } from "@/constants/practiceAreas";
import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

type Locale = "tr" | "en";

const locales: Locale[] = ["tr", "en"];

type SitemapEntry = {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
};

type BlogResult = {
  slug: { current: string };
  publishedAt?: string;
};

// Statik sayfalar
const staticPages = {
  tr: ["/", "/hakkinda", "/calisma-alanlari", "/blog", "/iletisim"],
  en: ["/", "/about", "/services", "/blog", "/contact"],
};

export async function GET() {
  const blogs: BlogResult[] = await client.fetch(
    `*[_type=="blog"]{slug, publishedAt}`
  );

  // ❗ Burası düzeltildi
  const services = Object.values(practicesData)
    .flat()
    .map((item: any) => item.slug);

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

    // BLOGS
    blogs.forEach((blog) => {
      allUrls.push({
        loc: `/${locale}/blog/${blog.slug.current}`,
        lastmod: blog.publishedAt
          ? new Date(blog.publishedAt).toISOString()
          : new Date().toISOString(),
        changefreq: "monthly",
        priority: 0.7,
      });
    });

    // SERVICES
    services.forEach((slug) => {
      allUrls.push({
        loc: `/${locale}/calisma-alanlari/${slug}`,
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
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
