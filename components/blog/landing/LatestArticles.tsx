import dayjs from "dayjs";
import "dayjs/locale/tr";
import { ArrowRight, Calendar, Clock, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Container from "@/components/Container";
import NotReadyBlog from "@/assets/images/not-ready-blog-main-image.webp";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const LATEST_ARTICLES_QUERY = `
  *[
    _type == "blog" &&
    defined(slug.current) &&
    defined(publishedAt)
  ]
  | order(publishedAt desc)[1...4] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    readingTime,
    viewCount,
    description,
    blogcategories[]->{
      _id,
      title,
      slug
    }
  }
`;

interface LatestBlog {
  _id: string;
  title: string;

  slug: {
    current: string;
  };

  publishedAt: string;
  readingTime?: number;
  viewCount?: number;
  description?: string;

  mainImage?: {
    alt?: string;
    asset?: {
      _ref?: string;
      _type?: string;
    };
  };

  blogcategories?: Array<{
    _id: string;
    title: string;
    slug?: {
      current: string;
    };
  }>;
}

async function getLatestArticles(): Promise<LatestBlog[]> {
  try {
    return await client.fetch<LatestBlog[]>(LATEST_ARTICLES_QUERY);
  } catch (error) {
    console.error("Son blog yazıları alınamadı:", error);
    return [];
  }
}

export default async function LatestArticles() {
  const articles = await getLatestArticles();

  if (articles.length === 0) {
    return null;
  }

  return (
    <section
      id="latest-articles"
      className="section-padding bg-background"
    >
      <Container>
        {/* Section header */}
        <div className="mb-10 flex flex-col justify-between gap-6 md:mb-12 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-accent-dark" />

              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-dark">
                Son yazılar
              </p>
            </div>

            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.025em] text-primary md:text-4xl lg:text-5xl">
              Güncel hukuki değerlendirmeler
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
              Mevzuat değişiklikleri, yargı kararları ve uygulamada merak
              edilen hukuki konular üzerine yayımlanan son içerikler.
            </p>
          </div>

          <Link
            href="/blog"
            className="group inline-flex w-fit items-center gap-2 font-semibold text-primary transition-colors hover:text-primary-light"
          >
            Tüm yazıları görüntüle

            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Article cards */}
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => {
            const imageUrl = article.mainImage
              ? urlFor(article.mainImage)
                  .width(900)
                  .height(540)
                  .quality(85)
                  .url()
              : null;

            const formattedDate = dayjs(article.publishedAt)
              .locale("tr")
              .format("D MMM YYYY");

            return (
              <article
                key={article._id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-elegant"
              >
                {/* Image */}
                <Link
                  href={`/blog/${article.slug.current}`}
                  aria-label={article.title}
                  className="relative block aspect-video overflow-hidden bg-secondary"
                >
                  <Image
                    src={imageUrl || NotReadyBlog}
                    alt={article.mainImage?.alt || article.title}
                    fill
                    sizes="
                      (max-width: 768px) 100vw,
                      (max-width: 1024px) 50vw,
                      33vw
                    "
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-primary/30 via-transparent to-transparent" />

                  {article.blogcategories &&
                    article.blogcategories.length > 0 && (
                      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                        {article.blogcategories
                          .slice(0, 2)
                          .map((category) => (
                            <span
                              key={category._id}
                              className="rounded-full border border-white/20 bg-primary/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-md"
                            >
                              {category.title}
                            </span>
                          ))}
                      </div>
                    )}
                </Link>

                {/* Card content */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar
                        aria-hidden="true"
                        className="h-3.5 w-3.5"
                      />

                      {formattedDate}
                    </span>

                    {typeof article.viewCount === "number" && (
                      <span className="inline-flex items-center gap-1.5">
                        <Eye
                          aria-hidden="true"
                          className="h-3.5 w-3.5"
                        />

                        {article.viewCount} okundu
                      </span>
                    )}

                    {typeof article.readingTime === "number" && (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock
                          aria-hidden="true"
                          className="h-3.5 w-3.5"
                        />

                        {article.readingTime} dk.
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 text-xl font-semibold leading-snug tracking-[-0.015em] text-primary">
                    <Link
                      href={`/blog/${article.slug.current}`}
                      className="transition-colors duration-300 hover:text-primary-light"
                    >
                      {article.title}
                    </Link>
                  </h3>

                  {article.description && (
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                      {article.description}
                    </p>
                  )}

                  <Link
                    href={`/blog/${article.slug.current}`}
                    className="group/link mt-auto inline-flex w-fit items-center gap-2 pt-6 text-sm font-semibold text-primary transition-colors hover:text-primary-light"
                  >
                    Yazıyı oku

                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}