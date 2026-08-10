import dayjs from "dayjs";
import "dayjs/locale/tr";
import { ArrowUpRight, Calendar, Clock, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Container from "@/components/Container";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const FEATURED_ARTICLE_QUERY = `
  coalesce(
    *[
      _type == "blog" &&
      featured == true &&
      defined(slug.current) &&
      defined(publishedAt)
    ]
    | order(publishedAt desc)[0],

    *[
      _type == "blog" &&
      defined(slug.current) &&
      defined(publishedAt)
    ]
    | order(publishedAt desc)[0]
  ) {
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

interface FeaturedBlog {
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
  locale: "tr" | "en";
}

async function getFeaturedArticle(): Promise<FeaturedBlog | null> {
  try {
    return await client.fetch<FeaturedBlog | null>(FEATURED_ARTICLE_QUERY);
  } catch (error) {
    console.error("Öne çıkan blog yazısı alınamadı:", error);
    return null;
  }
}

export default async function FeaturedArticle() {
  const article = await getFeaturedArticle();

  if (!article) {
    return null;
  }

  const imageUrl = article.mainImage
    ? urlFor(article.mainImage).width(1400).height(900).quality(90).url()
    : null;

  const formattedDate = dayjs(article.publishedAt)
    .locale("tr")
    .format("D MMMM YYYY");

  return (
    <section className="section-padding bg-page-background">
      <Container>
        {/* Section heading */}
        <div className="mb-9 md:mb-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-9 bg-accent-dark" />

            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-dark">
              Öne çıkan yazı
            </p>
          </div>

          <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.025em] text-primary md:text-4xl lg:text-5xl">
                Güncel hukuki değerlendirme
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                Son yayımlanan hukuki içerik ve güncel gelişmelere ilişkin
                değerlendirmeler.
              </p>
            </div>

            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 font-semibold text-primary transition hover:text-primary-light"
            >
              Tüm yazılar
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>

        {/* Featured article */}
        <article className="group grid overflow-hidden rounded-3xl border border-border bg-card shadow-card transition duration-500 hover:shadow-elegant lg:grid-cols-[1.15fr_0.85fr]">
          {/* Image */}
          <Link
            href={`/${article.locale}/blog/${article.slug.current}`}
            prefetch={false}
            aria-label={article.title}
            className="relative min-h-[300px] overflow-hidden bg-secondary sm:min-h-[400px] lg:min-h-[520px]"
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={article.mainImage?.alt || article.title}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
              />
            ) : (
              <div className="absolute inset-0 gradient-primary">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_40%)]" />

                <div className="relative flex h-full items-end p-8 text-white/60">
                  <span className="text-sm">Hukuki değerlendirme</span>
                </div>
              </div>
            )}

            <div className="absolute inset-0 bg-linear-to-t from-primary/30 via-transparent to-transparent" />

            {article.blogcategories && article.blogcategories.length > 0 && (
              <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
                {article.blogcategories.map((category) => (
                  <span
                    key={category._id}
                    className="rounded-full border border-white/20 bg-primary/75 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}
          </Link>

          {/* Content */}
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12 xl:p-14">
            {article.blogcategories?.[0] && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-dark">
                {article.blogcategories[0].title}
              </p>
            )}

            <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.02em] text-primary sm:text-3xl lg:text-4xl">
              <Link
                href={`/blog/${article.slug.current}`}
                className="transition-colors duration-300 hover:text-primary-light"
              >
                {article.title}
              </Link>
            </h3>

            {article.description && (
              <p className="mt-5 line-clamp-3 text-base leading-7 text-muted-foreground">
                {article.description}
              </p>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Calendar aria-hidden="true" className="h-4 w-4" />
                {formattedDate}
              </span>

              {typeof article.viewCount === "number" && (
                <span className="inline-flex items-center gap-1.5">
                  <Eye aria-hidden="true" className="h-4 w-4" />
                  {article.viewCount} okundu
                </span>
              )}

              {typeof article.readingTime === "number" && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock aria-hidden="true" className="h-4 w-4" />
                  {article.readingTime} dk.
                </span>
              )}
            </div>

            <Link
              href={`/blog/${article.slug.current}`}
              className="group/link mt-9 inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition duration-300 hover:bg-primary-light"
            >
              Yazıyı oku
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              />
            </Link>
          </div>
        </article>
      </Container>
    </section>
  );
}
