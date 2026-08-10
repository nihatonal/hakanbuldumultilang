import Container from "@/components/Container";
import Title from "@/components/Title";
import { buildI18nCanonical } from "@/lib/seo";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  getBlogCategories,
  getLatestBlogs,
  getSingleBlog,
} from "@/sanity/queries";
import { getMostViewedBlogs } from "@/sanity/queries/index";
import type { SINGLE_BLOG_QUERYResult } from "@/sanity/sanity.types";

import dayjs from "dayjs";
import "dayjs/locale/tr";

import {
  Calendar,
  ChevronLeftIcon,
  Eye,
} from "lucide-react";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";

import { PortableText } from "next-sanity";
import { cache } from "react";

import NotReadyBlog from "../../../../../assets/images/not-ready-blog-main-image.webp";
import SingleBlogContent from "./SingleBlogContent";

type Locale = "tr" | "en";

interface Props {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

interface SidebarBlog {
  _id?: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage?: unknown;
}

interface BlogCategory {
  title: string;
  count: number;
}

/**
 * Production site URL
 */
const siteUrl = "https://www.hakanbuldu.com";

/**
 * Aynı request sırasında generateMetadata ve page
 * aynı blogu isterse gereksiz ikinci sorguyu önler.
 */
const getCachedSingleBlog = cache(async (slug: string) => {
  return getSingleBlog(slug);
});

/**
 * Kategori title -> URL slug
 */
function createCategorySlug(title: string) {
  return title
    .toLocaleLowerCase("tr-TR")
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * Breadcrumb
 */
function Breadcrumb({
  categories,
  title,
  locale,
}: {
  categories: string[];
  title: string;
  locale: Locale;
}) {
  return (
    <nav
      aria-label="breadcrumb"
      className="mb-4 text-sm"
    >
      <ol className="flex flex-wrap gap-1 text-gray-600">
        <li>
          <Link
            href={`/${locale}`}
            className="text-blue-700 hover:underline"
          >
            Ana Sayfa
          </Link>
        </li>

        <li aria-hidden="true">/</li>

        <li>
          <Link
            href={`/${locale}/blog`}
            className="text-blue-700 hover:underline"
          >
            Blog
          </Link>
        </li>

        {categories.map((category) => (
          <li
            key={category}
            className="contents"
          >
            <span aria-hidden="true">/</span>

            <Link
              href={`/${locale}/blog?category=${encodeURIComponent(
                createCategorySlug(category),
              )}`}
              className="text-blue-700 hover:underline"
            >
              {category}
            </Link>
          </li>
        ))}

        <li aria-hidden="true">/</li>

        <li
          className="max-w-full truncate text-gray-500"
          aria-current="page"
        >
          {title}
        </li>
      </ol>
    </nav>
  );
}

/**
 * Metadata
 */
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug, locale } = await params;

  const blog: SINGLE_BLOG_QUERYResult =
    await getCachedSingleBlog(slug);

  if (!blog) {
    return {
      title: "Hukuk Blogu | Hakan Buldu",
      description:
        "Güncel hukuki makaleler ve bilgilendirme içerikleri.",
      ...buildI18nCanonical(locale, "/blog"),
    };
  }

  const description =
    blog.description ||
    `${blog.title} hakkında hukuki bilgilendirme ve değerlendirmeler.`;

  const ogImage = blog.mainImage
    ? urlFor(blog.mainImage)
        .width(1200)
        .height(630)
        .fit("crop")
        .quality(85)
        .auto("format")
        .url()
    : undefined;

  return {
    title: `${blog.title} | Hakan Buldu`,
    description,

    ...buildI18nCanonical(
      locale,
      `/blog/${blog.slug.current}`,
    ),

    openGraph: {
      title: blog.title,
      description,
      url: `${siteUrl}/${locale}/blog/${blog.slug.current}`,
      type: "article",
      publishedTime: blog.publishedAt || undefined,

      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt:
                blog.mainImage?.alt ||
                blog.title,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

/**
 * Single blog page
 */
export default async function SingleBlogPage({
  params,
}: Props) {
  const { slug, locale } = await params;

  const blog: SINGLE_BLOG_QUERYResult =
    await getCachedSingleBlog(slug);

  if (!blog) {
    notFound();
  }

  const categories = blog.blogcategories ?? [];

  const articleUrl =
    `${siteUrl}/${locale}/blog/${blog.slug.current}`;

  const mainImageUrl = blog.mainImage
    ? urlFor(blog.mainImage)
        .width(1400)
        .quality(82)
        .auto("format")
        .url()
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",

    headline: blog.title,
    description: blog.description || undefined,

    image: mainImageUrl || undefined,

    datePublished: blog.publishedAt,

    author: {
      "@type": "Person",
      name: "Hakan Buldu",
      url: siteUrl,
    },

    publisher: {
      "@type": "Person",
      name: "Hakan Buldu",
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },

    url: articleUrl,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: `${siteUrl}/${locale}`,
      },

      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/${locale}/blog`,
      },

      ...categories.map((category, index) => ({
        "@type": "ListItem",
        position: 3 + index,
        name: category.title,
        item:
          `${siteUrl}/${locale}/blog?category=` +
          encodeURIComponent(
            createCategorySlug(category.title),
          ),
      })),

      {
        "@type": "ListItem",
        position: 3 + categories.length,
        name: blog.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <>
      <Script
        id="blog-jsonld"
        type="application/ld+json"
      >
        {JSON.stringify(jsonLd)}
      </Script>

      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
      >
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>

      <main className="bg-gray-100 py-4 md:py-10">
        <Container className="relative grid grid-cols-1 gap-5 lg:grid-cols-4">
          {/* MAIN CONTENT */}
          <article className="min-w-0 lg:col-span-3">
            {/* Mobile back */}
            <div className="mb-3 text-primary/60 md:hidden">
              <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center gap-1 hover:text-primary"
              >
                <ChevronLeftIcon className="size-5" />

                <span className="text-sm font-semibold">
                  Blog
                </span>
              </Link>
            </div>

            {/* Main Image */}
            <div className="relative w-full">
              {mainImageUrl ? (
                <Image
                  src={mainImageUrl}
                  alt={
                    blog.mainImage?.alt ||
                    blog.title ||
                    "Blog görseli"
                  }
                  width={1400}
                  height={850}
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  priority
                  unoptimized
                  className="max-h-[450px] h-auto w-full rounded-xl object-cover"
                />
              ) : (
                <Image
                  src={NotReadyBlog}
                  alt={blog.title || "Blog görseli"}
                  width={1400}
                  height={850}
                  priority
                  className="max-h-[450px] h-auto w-full rounded-xl object-cover"
                />
              )}

              {categories.length > 0 && (
                <div className="absolute bottom-3 right-3 flex flex-wrap justify-end gap-1 md:hidden">
                  {categories.map((category) => (
                    <span
                      key={category.title}
                      className="rounded-full bg-primary/75 px-2.5 py-1 text-xs text-white backdrop-blur-sm"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Metadata row */}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-muted-foreground">
              {categories.length > 0 && (
                <div className="hidden flex-wrap items-center gap-3 md:flex">
                  {categories.map((category) => (
                    <Link
                      key={category.title}
                      href={`/${locale}/blog?category=${encodeURIComponent(
                        createCategorySlug(
                          category.title,
                        ),
                      )}`}
                      className="font-semibold tracking-wide transition-colors hover:text-accent"
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              )}

              {blog.publishedAt && (
                <div className="flex items-center gap-1.5">
                  <Calendar size={15} />

                  <time dateTime={blog.publishedAt}>
                    {dayjs(blog.publishedAt)
                      .locale("tr")
                      .format("D MMM YYYY")}
                  </time>
                </div>
              )}

              {blog.readingTime && (
                <div className="flex items-center gap-1.5">
                  <span aria-hidden="true">⏱</span>

                  <span>
                    {blog.readingTime} dk. okuma
                  </span>
                </div>
              )}

              <div className="flex items-center gap-1.5">
                <Eye size={14} />

                <SingleBlogContent
                  count={blog.viewCount ?? 0}
                  slug={slug}
                />

                <span>okundu</span>
              </div>
            </div>

            {/* Heading */}
            <header className="my-6">
              <Breadcrumb
                categories={categories.map(
                  (category) => category.title,
                )}
                title={blog.title}
                locale={locale}
              />

              <h1 className="text-3xl font-bold leading-tight text-primary md:text-4xl">
                {blog.title}
              </h1>

              {blog.description && (
                <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
                  {blog.description}
                </p>
              )}
            </header>

            {/* Portable Text */}
            {blog.body ? (
              <div className="text-primary">
                <PortableText
                  value={blog.body}
                  components={{
                    block: {
                      normal: ({ children }) => (
                        <p className="my-6 text-base leading-8 text-[hsl(var(--foreground))]">
                          {children}
                        </p>
                      ),

                      h1: ({ children }) => (
                        <h2 className="mb-5 mt-10 text-3xl font-bold tracking-tight text-[hsl(var(--primary))]">
                          {children}
                        </h2>
                      ),

                      h2: ({ children }) => (
                        <h2 className="mb-4 mt-10 text-2xl font-bold tracking-tight text-[hsl(var(--primary))]">
                          {children}
                        </h2>
                      ),

                      h3: ({ children }) => (
                        <h3 className="mb-3 mt-8 text-xl font-semibold tracking-tight text-[hsl(var(--primary-light))]">
                          {children}
                        </h3>
                      ),

                      h4: ({ children }) => (
                        <h4 className="mb-3 mt-7 text-lg font-semibold text-primary">
                          {children}
                        </h4>
                      ),

                      blockquote: ({ children }) => (
                        <blockquote className="my-8 rounded-r-lg border-l-4 border-[hsl(var(--accent))] bg-[hsl(var(--secondary))] py-4 pl-6 pr-5 italic leading-7 text-[hsl(var(--foreground))]">
                          {children}
                        </blockquote>
                      ),
                    },

                    types: {
                      image: ({ value }) => {
                        if (!value?.asset) {
                          return null;
                        }

                        const imageUrl = urlFor(value)
                          .width(1600)
                          .quality(80)
                          .auto("format")
                          .url();

                        return (
                          <figure className="my-8">
                            <Image
                              src={imageUrl}
                              alt={value.alt || ""}
                              width={1600}
                              height={1000}
                              sizes="(max-width: 1024px) 100vw, 75vw"
                              unoptimized
                              className="h-auto w-full rounded-xl object-cover shadow-card"
                            />

                            {value.alt && (
                              <figcaption className="mt-2 text-center text-xs text-muted-foreground">
                                {value.alt}
                              </figcaption>
                            )}
                          </figure>
                        );
                      },

                      separator: ({ value }) => {
                        if (value?.style === "line") {
                          return (
                            <hr className="my-10 border-t border-[hsl(var(--border))]" />
                          );
                        }

                        if (value?.style === "space") {
                          return (
                            <div
                              aria-hidden="true"
                              className="my-10"
                            />
                          );
                        }

                        return null;
                      },
                    },

                    list: {
                      bullet: ({ children }) => (
                        <ul className="my-6 list-disc space-y-2 pl-6 text-base leading-7 text-[hsl(var(--foreground))]">
                          {children}
                        </ul>
                      ),

                      number: ({ children }) => (
                        <ol className="my-6 list-decimal space-y-2 pl-6 text-base leading-7 text-[hsl(var(--foreground))]">
                          {children}
                        </ol>
                      ),
                    },

                    listItem: {
                      bullet: ({ children }) => (
                        <li className="pl-1">
                          {children}
                        </li>
                      ),

                      number: ({ children }) => (
                        <li className="pl-1">
                          {children}
                        </li>
                      ),
                    },

                    marks: {
                      strong: ({ children }) => (
                        <strong className="font-semibold text-[hsl(var(--foreground))]">
                          {children}
                        </strong>
                      ),

                      em: ({ children }) => (
                        <em>{children}</em>
                      ),

                      code: ({ children }) => (
                        <code className="rounded-md bg-[hsl(var(--secondary))] px-2 py-1 font-mono text-sm text-[hsl(var(--foreground))]">
                          {children}
                        </code>
                      ),

                      link: ({
                        value,
                        children,
                      }) => {
                        const href =
                          value?.href || "#";

                        const isExternal =
                          href.startsWith("http");

                        if (isExternal) {
                          return (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[hsl(var(--accent-dark))] underline underline-offset-4 transition-colors hover:text-[hsl(var(--accent))]"
                            >
                              {children}
                            </a>
                          );
                        }

                        return (
                          <Link
                            href={href}
                            className="text-[hsl(var(--accent-dark))] underline underline-offset-4 transition-colors hover:text-[hsl(var(--accent))]"
                          >
                            {children}
                          </Link>
                        );
                      },
                    },
                  }}
                />
              </div>
            ) : (
              <div className="mt-8 rounded-lg border border-yellow-300 bg-yellow-50 px-6 py-4 text-center text-yellow-800 shadow-sm">
                <h3 className="mb-1 text-lg font-semibold">
                  Makale Hazırlanıyor
                </h3>

                <p className="text-sm">
                  Bu içerik henüz yayına hazır değil.
                  Kısa süre içinde güncellenecektir.
                </p>
              </div>
            )}

            {/* Back to Blog */}
            <div className="mt-12 border-t border-border pt-6">
              <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center gap-1 font-semibold text-primary transition-colors hover:text-accent"
              >
                <ChevronLeftIcon className="size-5" />

                <span>Tüm Yazılara Dön</span>
              </Link>
            </div>
          </article>

          {/* SIDEBAR */}
          <BlogLeft locale={locale} />
        </Container>
      </main>
    </>
  );
}

/**
 * Sidebar
 */
async function BlogLeft({
  locale,
}: {
  locale: Locale;
}) {
  const [
    categories,
    latestBlogs,
    mostViewed,
  ] = await Promise.all([
    getBlogCategories(),
    getLatestBlogs(),
    getMostViewedBlogs(),
  ]);

  return (
    <aside className="space-y-8">
      {/* Categories */}
      <section className="rounded-lg border border-primary-light/30 bg-background p-5">
        <Title className="text-base">
          Kategoriler
        </Title>

        <div className="mt-4 space-y-2">
          {categories?.map(
            (category: BlogCategory) => (
              <Link
                key={category.title}
                href={`/${locale}/blog?category=${encodeURIComponent(
                  createCategorySlug(
                    category.title,
                  ),
                )}`}
                className="flex items-center justify-between text-sm font-medium text-primary transition-colors hover:text-accent"
              >
                <span>{category.title}</span>

                <span className="font-semibold text-darkColor">
                  {category.count}
                </span>
              </Link>
            ),
          )}
        </div>
      </section>

      {/* Latest */}
      <SidebarBlogList
        title="Son Yazılar"
        blogs={
          (latestBlogs ?? []) as SidebarBlog[]
        }
        locale={locale}
      />

      {/* Popular */}
      <SidebarBlogList
        title="Popüler Yazılar"
        blogs={
          (mostViewed ?? []) as SidebarBlog[]
        }
        locale={locale}
      />
    </aside>
  );
}

/**
 * Sidebar list component
 */
function SidebarBlogList({
  title,
  blogs,
  locale,
}: {
  title: string;
  blogs: SidebarBlog[];
  locale: Locale;
}) {
  if (!blogs?.length) {
    return null;
  }

  return (
    <section className="rounded-lg border border-primary-light/30 bg-background p-5">
      <Title className="text-base">
        {title}
      </Title>

      <div className="mt-4 space-y-4">
        {blogs.map((blog) => {
          const imageUrl = blog.mainImage
            ? urlFor(blog.mainImage)
                .width(128)
                .height(128)
                .fit("crop")
                .quality(75)
                .auto("format")
                .url()
            : null;

          return (
            <Link
              key={
                blog._id ||
                blog.slug.current
              }
              href={`/${locale}/blog/${blog.slug.current}`}
              className="group flex items-center gap-3"
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={
                    blog.title ||
                    "Blog görseli"
                  }
                  width={64}
                  height={64}
                  sizes="64px"
                  unoptimized
                  className="h-16 w-16 flex-none rounded-full border border-primary/10 object-cover transition group-hover:border-accent"
                />
              ) : (
                <Image
                  src={NotReadyBlog}
                  alt={
                    blog.title ||
                    "Blog görseli"
                  }
                  width={64}
                  height={64}
                  sizes="64px"
                  className="h-16 w-16 flex-none rounded-full border border-primary/10 object-cover"
                />
              )}

              <p className="line-clamp-2 text-sm leading-5 text-primary transition-colors group-hover:text-accent">
                {blog.title}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/**
 * Static blog paths
 */
export async function generateStaticParams() {
  const blogs = await client.fetch<
    Array<{
      slug?: {
        current?: string;
      };
    }>
  >(`
    *[
      _type == "blog" &&
      !(_id in path("drafts.**")) &&
      defined(slug.current)
    ]{
      slug
    }
  `);

  return blogs
    .filter(
      (
        blog,
      ): blog is {
        slug: {
          current: string;
        };
      } =>
        typeof blog.slug?.current ===
        "string",
    )
    .map((blog) => ({
      slug: blog.slug.current,
    }));
}