// app/blog/page.tsx
import { Metadata } from "next";
import Script from "next/script";
import { getAllBlogs } from "@/sanity/queries";
import { getLatestBlogs, getMostViewedBlogs } from "@/sanity/queries/index";
import BlogPageClient from "./BlogPageClient";

interface BlogPageProps {
  searchParams?: { category?: string };
}

const siteUrl = "https://www.hakanbuldu.com";
export const metadata: Metadata = {
  title: "Hukuk Blogu - Hakan Buldu | Güncel Hukuki Bilgiler",
  description:
    "Ceza, idare, iş ve aile hukuku konularında güncel makaleler ve bilgilendirici yazılar. Hakan Buldu'nun hukuk blogunu keşfedin.",
  alternates: {
    canonical: `${siteUrl}/blog`
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Hukuk Blogu",
  url: `${siteUrl}/blog`,
  description:
    "Hakan Buldu tarafından hazırlanan, ceza, idare, iş ve aile hukuku alanlarında güncel bilgiler ve hukuki rehberler içeren blog.",
  creator: {
    "@type": "Person",
    name: "Hakan Buldu"
  },
  publisher: {
    "@type": "Organization",
    name: "Hakan Buldu Hukuk Bürosu",
    url: siteUrl
  }
};


const BlogPage = async ({ searchParams }: BlogPageProps) => {
  // searchParams async olarak çözülmeli
  const params = await searchParams;
  const selectedCategory = params?.category || "";

  const blogs = await getAllBlogs();
  const latestBlogs = await getLatestBlogs();
  const mostViewed = await getMostViewedBlogs();

  return (
    <>
      <Script type="application/ld+json" id="blog-jsonld">
        {JSON.stringify(jsonLd)}
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

export default BlogPage;
