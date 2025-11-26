import Container from "@/components/Container";
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Script from "next/script";
import Title from "@/components/Title";
import { SINGLE_BLOG_QUERYResult } from "@/sanity/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import {
    getBlogCategories,
    getLatestBlogs,
    getSingleBlog
} from "@/sanity/queries";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import { Calendar, ChevronLeftIcon, Eye } from "lucide-react";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NotReadyBlog from '../../../../assets/images/not-ready-blog-main-image.webp'
import { client } from "@/sanity/lib/client";
import SingleBlogContent from './SingleBlogContent';
import { getMostViewedBlogs } from "@/sanity/queries/index";

type Props = {
    params: Promise<{ slug: string; }>;
};

interface Blog {
    _id: string;
    title: string;
    body: Array<{
        _key: string;
        _type: string;
        children: Array<{ _key: string; text: string; marks: string[] }>;
    }>;
    readingTime: number,
    mainImage: {
        asset: {
            url: string;
        };
        alt?: string;
    };
    slug: { current: string };
    publishedAt: string;
    viewCount: number;
    blogcategories: { title: string }[];
}
const siteUrl = 'https://www.hakanbuldu.com';

const Breadcrumb = ({ categories, title }: { categories: string[], title: string }) => {
    return (
        <nav aria-label="breadcrumb" className="text-sm mb-4">
            <ol className="flex gap-1 flex-wrap text-gray-600">
                <li>
                    <Link href="/" className="hover:underline text-blue-700">Ana Sayfa</Link>
                </li>
                <li>/</li>
                <li>
                    <Link href="/blog" className="hover:underline text-blue-700">Blog</Link>
                </li>
                {categories.map((cat, index) => (
                    <React.Fragment key={index}>
                        <li>/</li>
                        <li>
                            <Link
                                href={`/blog?category=${encodeURIComponent(cat.toLowerCase().replace(/\s+/g, '-'))}`}
                                className="hover:underline text-blue-700"
                            >
                                {cat}
                            </Link>
                        </li>
                    </React.Fragment>
                ))}
                <li>/</li>
                <li className="text-gray-500">{title}</li>
            </ol>
        </nav>
    );
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const blog: SINGLE_BLOG_QUERYResult = await getSingleBlog(slug);

    if (!blog) {
        return {
            title: 'Hukuk Hizmeti',
            description: 'Uzmanlık alanları hakkında bilgi alın.',
            alternates: {
                canonical: `${siteUrl}/blog`,
            },
        };
    }

    const canonical = `${siteUrl}/blog/${blog.slug.current}`;

    return {
        title: `${blog.title} | Avukat Hakan Buldu`,
        description: blog.description,
        alternates: {
            canonical,
        },
        openGraph: {
            title: blog.title,
            description: blog.description,
            url: canonical,
            type: 'website',
            images: blog.mainImage
                ? [
                    {
                        url: urlFor(blog.mainImage).url(), // ❌ siteUrl ekleme
                        width: 1200,
                        height: 630,
                        alt: blog.mainImage.alt || blog.title,
                    },
                ]
                : [],
        },
    };
}


const SingleBlogPage = async ({
    params,
}: {
    params: { slug: string };
}) => {
    const { slug } = await params;
    const blog: SINGLE_BLOG_QUERYResult = await getSingleBlog(slug);
    if (!blog) return notFound();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: blog.title,
        description: blog.description,
        image: blog.mainImage ? urlFor(blog.mainImage).url() : undefined,
        datePublished: blog.publishedAt,
        author: {
            "@type": "Person",
            name: "Hakan Buldu",
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${siteUrl}/blog/${blog.slug.current}`,
        },
    };

    return (
        <>
            <Script type="application/ld+json" id="blog-jsonld">
                {JSON.stringify(jsonLd)}
            </Script>
            <Script type="application/ld+json" id="breadcrumb-jsonld">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": `${siteUrl}/` },
                        { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${siteUrl}/blog` },
                        ...blog.blogcategories.map((cat, index) => ({
                            "@type": "ListItem",
                            "position": 3 + index,
                            "name": cat.title,
                            "item": `${siteUrl}/blog?category=${encodeURIComponent(cat.title.toLowerCase().replace(/\s+/g, '-'))}`
                        })),
                        { "@type": "ListItem", "position": 3 + blog.blogcategories.length, "name": blog.title, "item": `${siteUrl}/blog/${blog.slug.current}` }
                    ]
                })}
            </Script>

            <div className="py-4 md:py-10 bg-gray-100">
                <Container className="relative grid grid-cols-1 lg:grid-cols-4 gap-5">
                    {/* <SingleBlogContent slug={slug} /> */}
                    <div className="md:col-span-3">
                        <div className="w-full aspect-[12/6] md:aspect-auto relative rounded-t-xl">
                            {blog?.mainImage && (
                                <div className="flex flex-col gap-2">
                                    <div className="md:hidden text-primary/50">
                                        <Link href="/blog" className="flex items-center gap-1">
                                            <ChevronLeftIcon className="size-5" />
                                            <span className="text-sm font-semibold">
                                                Blog
                                            </span>
                                        </Link>
                                    </div>
                                    <Image
                                        src={urlFor(blog?.mainImage).url()}
                                        alt={blog.title || "Blog Image"}
                                        width={600}
                                        height={600}
                                        className="w-full max-h-[350px] object-cover rounded-lg"
                                    />

                                </div>

                            )}
                            <div className="absolute md:hidden bottom-3 right-3 flex flex-wrap gap-1 z-10">
                                {blog.blogcategories.map((cat, index) => (
                                    <span
                                        key={index}
                                        className="bg-primary/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm"
                                    >
                                        {cat.title}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {!blog?.mainImage && (
                            <Image
                                src={NotReadyBlog}
                                alt={blog.title || "Blog Image"}
                                width={600}
                                height={600}
                                className="w-full max-h-[350px] object-cover rounded-lg"
                            />
                        )}

                        <div>
                            <div className="text-xs flex items-center gap-5 mt-4">
                                <div className="hidden md:flex items-center gap-2 group cursor-pointer">
                                    {blog?.blogcategories?.map(
                                        (item: { title: string }, index: number) => (
                                            <p
                                                key={index}
                                                className="relative font-semibold text-muted-foreground tracking-wider"
                                            >
                                                {item?.title}
                                                <span className="absolute left-0 -bottom-1.5 bg-muted-foreground/30 inline-block w-full h-[2px] hover:bg-shop_dark_green hover:cursor-pointer hoverEffect" />
                                            </p>
                                        )
                                    )}

                                </div>
                                <p className="flex items-center gap-1 text-muted-foreground relative group hover:cursor-pointer hover:text-shop_dark_green hoverEffect">
                                    <Calendar size={15} />{" "}
                                    {dayjs(blog.publishedAt).locale("tr").format("D MMM YYYY")}
                                    <span className="absolute left-0 -bottom-1.5 bg-muted-foreground/30 inline-block w-full h-[2px] group-hover:bg-shop_dark_green hoverEffect" />
                                </p>
                                <p className="flex items-center gap-1 text-muted-foreground relative group hover:cursor-pointer hover:text-shop_dark_green hoverEffect">
                                    ⏱ {blog.readingTime} min read
                                    <span className="absolute left-0 -bottom-1.5 bg-muted-foreground/30 inline-block w-full h-[2px] group-hover:bg-shop_dark_green hoverEffect" />
                                </p>
                                <p className="flex items-center gap-1 text-muted-foreground relative group hover:cursor-pointer hover:text-shop_dark_green hoverEffect">
                                    <Eye size={14} /> <SingleBlogContent count={blog.viewCount} slug={slug} /> okundu
                                    <span className="absolute left-0 -bottom-1.5 bg-muted-foreground/30 inline-block w-full h-[2px] group-hover:bg-shop_dark_green hoverEffect" />
                                </p>
                            </div>
                            <div className="my-5">
                                <Breadcrumb categories={blog.blogcategories.map(c => c.title)} title={blog.title} />
                                <h1 className="text-3xl font-bold text-primary">{blog?.title}</h1>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-primary">
                                    <div>
                                        {blog.body && (
                                            <PortableText
                                                value={blog.body}
                                                components={{
                                                    block: {
                                                        normal: ({ children }) => (
                                                            <p className="my-6 text-base leading-relaxed text-[hsl(var(--foreground))]">
                                                                {children}
                                                            </p>
                                                        ),
                                                        h2: ({ children }) => (
                                                            <h2 className="my-8 text-2xl font-bold text-[hsl(var(--primary))] tracking-tight">
                                                                {children}
                                                            </h2>
                                                        ),
                                                        h3: ({ children }) => (
                                                            <h3 className="my-6 text-xl font-semibold text-[hsl(var(--primary-light))] tracking-tight">
                                                                {children}
                                                            </h3>
                                                        ),
                                                        blockquote: ({ children }) => (
                                                            <blockquote className="my-6 pl-6 border-l-4 border-[hsl(var(--accent))] italic text-[hsl(var(--foreground))] bg-[hsl(var(--secondary))] rounded-md py-2">
                                                                {children}
                                                            </blockquote>
                                                        ),
                                                    },
                                                    types: {
                                                        image: ({ value }) => (
                                                            <Image
                                                                alt={value.alt || ""}
                                                                src={urlFor(value).width(1600).quality(80).url()}
                                                                width={1600}
                                                                height={900}
                                                                className="rounded-xl shadow-card my-8"
                                                            />
                                                        ),
                                                        separator: ({ value }) => {
                                                            if (value.style === "line") {
                                                                return <hr className="my-10 border-t border-[hsl(var(--border))]" />
                                                            }
                                                            if (value.style === "space") {
                                                                return <div className="my-10" />
                                                            }
                                                            return null
                                                        },
                                                    },
                                                    list: {
                                                        bullet: ({ children }) => (
                                                            <ul className="list-disc pl-6 space-y-2 text-base text-[hsl(var(--foreground))]">
                                                                {children}
                                                            </ul>
                                                        ),
                                                        number: ({ children }) => (
                                                            <ol className="list-decimal pl-6 space-y-2 text-base text-[hsl(var(--foreground))]">
                                                                {children}
                                                            </ol>
                                                        ),
                                                    },
                                                    listItem: {
                                                        bullet: ({ children }) => <li className="pl-1">{children}</li>,
                                                        number: ({ children }) => <li className="pl-1">{children}</li>,
                                                    },
                                                    marks: {
                                                        strong: ({ children }) => (
                                                            <strong className="font-semibold text-[hsl(var(--foreground))]">
                                                                {children}
                                                            </strong>
                                                        ),
                                                        code: ({ children }) => (
                                                            <code className="bg-[hsl(var(--secondary))] px-2 py-1 text-sm rounded-md font-mono text-[hsl(var(--foreground))]">
                                                                {children}
                                                            </code>
                                                        ),
                                                        link: ({ value, children }) => (
                                                            <Link
                                                                href={value.href}
                                                                target={value.href.startsWith("http") ? "_blank" : undefined}
                                                                rel={value.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                                                className="underline underline-offset-4 text-[hsl(var(--accent))] hover:text-[hsl(var(--accent-dark))]"
                                                            >
                                                                {children}
                                                            </Link>
                                                        ),
                                                    },
                                                }}
                                            />

                                        )}
                                        {!blog.body && (
                                            <div className="mt-8 rounded-lg bg-yellow-50 border border-yellow-300 text-yellow-800 px-6 py-4 text-center shadow-sm">
                                                <h3 className="text-lg font-semibold mb-1">Makale Hazırlanıyor</h3>
                                                <p className="text-sm">
                                                    Bu içerik henüz yayına hazır değil. Kısa süre içinde güncellenecektir.
                                                </p>
                                            </div>
                                        )}

                                        <div className="mt-10">
                                            <Link href="/blog" className="flex items-center gap-1">
                                                <ChevronLeftIcon className="size-5" />
                                                <span className="text-sm font-semibold">
                                                    Blog
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <BlogLeft />
                </Container>
            </div>
        </>
    );
};

const BlogLeft = async () => {
    const categories = await getBlogCategories();
    const latestBlogs = await getLatestBlogs();
    const mostViewed = await getMostViewedBlogs();


    return (
        <div>
            <div className="bg-background border border-primary-light/30 p-5 rounded-md">
                <Title className="text-base">Kategoriler</Title>
                <div className="space-y-2 mt-2">
                    {categories?.map((cat: BlogCategory, index: number) => (
                        <Link
                            key={index}
                            href={`/blog?category=${encodeURIComponent(cat.title.toLowerCase().replace(/\s+/g, '-'))}`}
                            className="text-primary flex items-center justify-between text-sm font-medium hover:text-accent"
                        >
                            <p>{cat.title}</p>
                            <p className="text-darkColor font-semibold">{cat.count}</p>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="bg-background md:sticky top-18 border border-primary-light/30 p-5 rounded-md mt-10">
                <Title className="text-base">Son Yazılar</Title>
                <div className="space-y-4 mt-4">
                    {latestBlogs?.map((blog: Blog, index: number) => (
                        <Link
                            href={`/blog/${blog?.slug?.current}`}
                            key={index}
                            className="flex items-center gap-2 group "
                        >
                            {blog?.mainImage && (
                                <Image
                                    src={urlFor(blog?.mainImage).url()}
                                    alt="blogImage"
                                    width={100}
                                    height={100}
                                    className="w-16 h-16 rounded-full object-cover border-[1px] border-shop_dark_green/10 group-hover:border-shop_dark_green hoverEffect"
                                />
                            )}
                            {!blog?.mainImage && (
                                <Image
                                    src={NotReadyBlog}
                                    alt="blogImage"
                                    width={100}
                                    height={100}
                                    className="w-16 h-16 rounded-full object-cover border-[1px] border-shop_dark_green/10 group-hover:border-shop_dark_green hoverEffect"
                                />
                            )}
                            <p className="line-clamp-2 text-sm text-primary group-hover:text-accent hoverEffect">
                                {blog?.title}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="bg-background md:sticky top-96 border border-primary-light/30 p-5 rounded-md mt-10">
                <Title className="text-base">Popüler Yazılar</Title>
                <div className="space-y-4 mt-4">
                    {mostViewed?.map((blog: Blog, index: number) => (
                        <Link
                            href={`/blog/${blog?.slug?.current}`}
                            key={index}
                            className="flex items-center gap-2 group "
                        >
                            {blog?.mainImage && (
                                <Image
                                    src={urlFor(blog?.mainImage).url()}
                                    alt="blogImage"
                                    width={100}
                                    height={100}
                                    className="w-16 h-16 rounded-full object-cover border-[1px] border-shop_dark_green/10 group-hover:border-shop_dark_green hoverEffect"
                                />
                            )}
                            {!blog?.mainImage && (
                                <Image
                                    src={NotReadyBlog}
                                    alt="blogImage"
                                    width={100}
                                    height={100}
                                    className="w-16 h-16 rounded-full object-cover border-[1px] border-shop_dark_green/10 group-hover:border-shop_dark_green hoverEffect"
                                />
                            )}
                            <p className="line-clamp-2 text-sm text-primary group-hover:text-accent hoverEffect">
                                {blog?.title}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SingleBlogPage;

export async function generateStaticParams() {
    const blogs = await client.fetch(`
      *[_type == "blog" && !(_id in path("drafts.**"))]{ slug }
    `);

    return blogs.map((blog: Blog) => ({
        slug: blog.slug.current,
    }));
}