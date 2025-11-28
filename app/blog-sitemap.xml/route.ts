import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

interface BlogItem {
  slug: { current: string };
  publishedAt?: string;
}

export async function GET() {
  const baseUrl = "https://www.hakanbuldu.com";

  const blogs = await client.fetch<BlogItem[]>(
    `*[_type=="blog"]{slug, publishedAt}`
  );

  const urls = blogs
    .map(
      (blog) => `
<url>
  <loc>${baseUrl}/tr/blog/${blog.slug.current}</loc>
  <lastmod>${
    blog.publishedAt
      ? new Date(blog.publishedAt).toISOString()
      : new Date().toISOString()
  }</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
