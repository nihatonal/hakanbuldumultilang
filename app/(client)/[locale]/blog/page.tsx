import type { Metadata } from "next";
import Script from "next/script";

import { buildI18nCanonical } from "@/lib/seo";
import {
  getAllBlogs,
  getLatestBlogs,
  getMostViewedBlogs,
} from "@/sanity/queries";

import BlogPageClient, {
  type Blog,
} from "./BlogPageClient";

interface BlogPageProps {
  params: Promise<{
    locale: "tr" | "en";
  }>;

  searchParams: Promise<{
    category?: string | string[];
    search?: string | string[];
  }>;
}

const siteUrl = "https://www.hakanbuldu.com";

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title:
      locale === "tr"
        ? "Hukuk Blogu | Hakan Buldu"
        : "Legal Blog | Hakan Buldu",

    description:
      locale === "tr"
        ? "Ceza hukuku, idare hukuku, iş hukuku, medeni hukuk ve diğer hukuk alanlarında güncel makaleler, rehberler ve hukuki bilgilendirme içerikleri."
        : "Legal articles, guides and informative content covering criminal, administrative, labor and civil law.",

    ...buildI18nCanonical(locale, "/blog"),

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title:
        locale === "tr"
          ? "Hukuk Blogu | Hakan Buldu"
          : "Legal Blog | Hakan Buldu",

      description:
        locale === "tr"
          ? "Güncel hukuki makaleler, rehberler ve bilgilendirme içerikleri."
          : "Updated legal articles, guides and informative content.",

      url: `${siteUrl}/${locale}/blog`,
      siteName: "Hakan Buldu",
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
    },
  };
}

function createJsonLd(locale: "tr" | "en") {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",

    name:
      locale === "tr"
        ? "Hakan Buldu Hukuk Blogu"
        : "Hakan Buldu Legal Blog",

    url: `${siteUrl}/${locale}/blog`,

    description:
      locale === "tr"
        ? "Ceza, idare, iş, medeni ve diğer hukuk alanlarında güncel hukuki bilgiler ve rehberler."
        : "Legal information, articles and guides.",

    author: {
      "@type": "Person",
      name: "Hakan Buldu",
    },

    publisher: {
      "@type": "Person",
      name: "Hakan Buldu",
      url: siteUrl,
    },
  };
}

export default async function BlogPage({
  params,
  searchParams,
}: BlogPageProps) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;

  const categoryParam =
    resolvedSearchParams.category;

  const searchParam =
    resolvedSearchParams.search;

  const selectedCategory =
    typeof categoryParam === "string"
      ? categoryParam
      : "";

  const initialSearch =
    typeof searchParam === "string"
      ? searchParam
      : "";

  /*
   * Sorguları ardışık yapmak yerine paralel çalıştırıyoruz.
   */
  const [
    blogsResult,
    latestBlogsResult,
    mostViewedResult,
  ] = await Promise.all([
    getAllBlogs(),
    getLatestBlogs(),
    getMostViewedBlogs(),
  ]);

  /*
   * Query helper'larının mevcut dönüş tipi {}
   * olarak infer edildiği için burada Blog[] tipini
   * açıkça tanımlıyoruz.
   */
  const blogs = blogsResult as Blog[];
  const latestBlogs =
    latestBlogsResult as Blog[];
  const mostViewed =
    mostViewedResult as Blog[];

  return (
    <>
      <Script
        id="blog-jsonld"
        type="application/ld+json"
      >
        {JSON.stringify(
          createJsonLd(locale),
        )}
      </Script>

      <BlogPageClient
        blogs={blogs}
        latestBlogs={latestBlogs}
        mostViewed={mostViewed}
        initialCategory={selectedCategory}
        initialSearch={initialSearch}
      />
    </>
  );
}