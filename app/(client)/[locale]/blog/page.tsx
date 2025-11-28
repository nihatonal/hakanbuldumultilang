// app/blog/page.tsx
import { Metadata } from "next";
import Script from "next/script";
import { getAllBlogs } from "@/sanity/queries";
import { getLatestBlogs, getMostViewedBlogs } from "@/sanity/queries/index";
import BlogPageClient from "./BlogPageClient";
import { buildI18nCanonical } from "@/lib/seo";

interface BlogPageProps {
  params: Promise<{ locale: "tr" | "en" }>;
  searchParams?: { category?: string };
}


const siteUrl = "https://www.hakanbuldu.com";
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title:
      locale === "tr"
        ? "Hukuk Blogu - Hakan Buldu | Güncel Hukuki Bilgiler"
        : "Legal Blog - Hakan Buldu | Updated Legal Insights",

    description:
      locale === "tr"
        ? "Ceza, idare, iş ve aile hukuku konularında güncel makaleler ve bilgilendirici yazılar."
        : "Articles on criminal, administrative, labor, and family law with updated legal insights.",

    ...buildI18nCanonical(locale, {
      tr: "/blog",
      en: "/blog",
    }),

    robots: {
      index: true,
      follow: true,
    },
  };
}

const jsonLd = (locale: "tr" | "en") => ({
  "@context": "https://schema.org",
  "@type": "Blog",
  name: locale === "tr" ? "Hukuk Blogu" : "Legal Blog",
  url: `${siteUrl}/${locale}/blog`,
  description:
    locale === "tr"
      ? "Ceza, idare, iş ve aile hukuku alanlarında güncel bilgiler ve hukuki rehberler içeren blog."
      : "A blog offering updated legal information and insights.",
  creator: {
    "@type": "Person",
    name: "Hakan Buldu",
  },
  publisher: {
    "@type": "Organization",
    name: "Hakan Buldu",
    url: siteUrl,
  },
});


export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;   // 🔥 ÖNEMLİ
  const selectedCategory = resolvedSearchParams?.category || "";

  const blogs = await getAllBlogs();
  const latestBlogs = await getLatestBlogs();
  const mostViewed = await getMostViewedBlogs();

  return (
    <>
      <Script type="application/ld+json" id="blog-jsonld">
      {JSON.stringify(jsonLd(locale))}
      </Script>

      <BlogPageClient
        blogs={blogs}
        latestBlogs={latestBlogs}
        mostViewed={mostViewed}
        initialCategory={selectedCategory} // client component'e gönder
      />
    </>
  );
};
