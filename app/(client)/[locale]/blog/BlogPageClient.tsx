"use client";
import useSWR from 'swr';
import { client } from '@/sanity/lib/client';
import React, { useState, useEffect, useMemo } from "react";
import Container from "@/components/Container";
import Title from "@/components/Title";
import { urlFor } from "@/sanity/lib/image";
import { Calendar, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import NotReadyBlog from '../../../../assets/images/not-ready-blog-main-image.webp';
import CategorySelectWrapper from "@/components/CategorySelectWrapper ";
import { blockContentToText } from "@/lib/blockContentToText";

const BLOG_QUERY = `*[_type=="blog"] | order(publishedAt desc){
    _id,
    title,
    body,
    readingTime,
    mainImage,
    slug,
    publishedAt,
    viewCount,
    blogcategories[]->{ title }
  }`;
const LATEST_BLOGS_QUERY = `*[_type == 'blog'] 
  | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    readingTime,
    blogcategories[]->{title}
  }`;
const MOST_VIEWED_QUERY = `*[_type == "blog" && defined(viewCount)]
| order(viewCount desc)[0...3] {
  _id,
  title,
  slug,
  viewCount,
  publishedAt,
  mainImage,
  readingTime,
  blogcategories[]->{
    title
  }
}`;

interface Blog {
    _id: string;
    title: string;
    body: Array<{
        _key: string;
        _type: string;
        children: Array<{ _key: string; text: string; marks: string[] }>;
    }>;
    readingTime: number,
    mainImage?: {
        asset: {
            url: string;
        };
        alt?: string;
    };
    viewCount: number;
    slug: { current: string };
    publishedAt: string;
    blogcategories?: { title: string }[];
}

interface BlogPageProps {
    blogs: Blog[];
    latestBlogs?: Blog[];
    mostViewed?: Blog[];
    initialCategory?: string;
}

const fetcher = (query: string) => client.fetch(query);

const BlogPageClient: React.FC<BlogPageProps> = ({
    blogs: initialBlogs,
    latestBlogs: initialLatest,
    mostViewed: initialMostViewed,
    initialCategory = ""
}) => {
    const [selectedCategory, setSelectedCategory] = useState(initialCategory.toLowerCase().trim().replace(/\s+/g, '-'));
    const [searchQuery, setSearchQuery] = useState("");

    // 🔁 Ana blog listesi
    const { data: blogs, mutate: mutateBlogs } = useSWR(BLOG_QUERY, fetcher, {
        fallbackData: initialBlogs,
    });

    // 🔁 Son yazılar
    const { data: latestBlogs, mutate: mutateLatest } = useSWR(LATEST_BLOGS_QUERY, fetcher, {
        fallbackData: initialLatest,
    });

    // 🔁 En çok okunanlar
    const { data: mostViewed, mutate: mutateMostViewed } = useSWR(MOST_VIEWED_QUERY, fetcher, {
        fallbackData: initialMostViewed,
    });

    // 🔁 Real-time güncellemeler
    useEffect(() => {
        const sub1 = client.listen(BLOG_QUERY).subscribe(() => mutateBlogs());
        const sub2 = client.listen(LATEST_BLOGS_QUERY).subscribe(() => mutateLatest());
        const sub3 = client.listen(MOST_VIEWED_QUERY).subscribe(() => mutateMostViewed());

        return () => {
            sub1.unsubscribe();
            sub2.unsubscribe();
            sub3.unsubscribe();
        };
    }, [mutateBlogs, mutateLatest, mutateMostViewed]);


    const categories = useMemo(() => {
        return Array.from(
            new Set(
                blogs.flatMap(blog => blog.blogcategories?.map(cat => cat.title) || [])
            )
        );
    }, [blogs]);

    const filteredBlogs = useMemo(() => {
        return blogs.filter((blog) => {
            const matchesCategory =
                !selectedCategory || blog.blogcategories?.some((cat) => cat.title.toLowerCase().trim().replace(/\s+/g, '-') === selectedCategory);

            const contentText = blockContentToText(blog.body || "");
            const matchesSearch =
                !searchQuery ||
                blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                contentText.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesCategory && matchesSearch;
        });
    }, [blogs, selectedCategory, searchQuery]);


    if (!blogs || !latestBlogs || !mostViewed) return <p>Loading...</p>;
    return (
        <div className="bg-background py-10">
            <Container>
                <Title>Blog</Title>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-0 md:gap-8 mt-4 text-primary">
                    {/* Main content */}

                    <div className={`mt-6 md:mt-0 order-2 md:order-1 grid grid-cols-1 md:grid-cols-2 gap-6 
                    `}>
                        {filteredBlogs.map((blog) => (
                            <Link
                                key={blog._id}
                                href={`/blog/${blog.slug.current}`}
                                className={`relative flex flex-col items-start p-0 bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1
                                md:max-h-[300px]`}
                            >
                                {/* Thumbnail + Categories overlay */}
                                <div className="w-full aspect-[12/6] relative overflow-hidden rounded-t-xl">
                                    <Image
                                        src={blog.mainImage ? urlFor(blog.mainImage).url() : NotReadyBlog}
                                        alt={blog.title}
                                        fill
                                        priority
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                    {/* Categories overlay */}
                                    <div className="absolute bottom-3 right-3 flex flex-wrap gap-1 z-10">
                                        {blog.blogcategories?.map((cat, index) => (
                                            <span
                                                key={index}
                                                className="bg-primary/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm"
                                            >
                                                {cat.title}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Blog Bilgileri */}
                                <div className="flex-1 flex flex-col w-full p-4 z-10">
                                    {/* Tarih, Görüntülenme ve Okuma Süresi */}
                                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-2">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            {dayjs(blog.publishedAt).locale("tr").format("D MMM YYYY")}
                                        </span>
                                        <span className="mx-1">•</span>
                                        <span className="flex items-center gap-1">
                                            <Eye size={14} />
                                            {blog.viewCount} okundu
                                        </span>

                                        <span className="mx-1">•</span>

                                        <span className="flex items-center gap-1">
                                            ⏱ {blog.readingTime} dk.
                                        </span>
                                    </div>

                                    {/* Başlık */}
                                    <h3 className="text-primary/90 font-semibold text-lg line-clamp-2 transition-colors duration-300 group-hover:text-accent">
                                        {blog.title}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Last blogs with thumbnails */}
                    {latestBlogs.length > 0 && (
                        <div className="md:hidden bg-white p-4 rounded-xl shadow-sm order-3 mt-10">
                            <h4 className="font-semibold text-lg mb-4 text-primary/90">Son Yazılar</h4>
                            <ul className="space-y-3">
                                {latestBlogs.map((blog) => (
                                    <li key={blog._id}>
                                        <Link
                                            href={`/blog/${blog.slug.current}`}
                                            className="flex items-center gap-3 p-2 rounded-md transition-all duration-300 group hover:bg-primary/5"
                                        >
                                            {/* Thumbnail */}
                                            <div className="w-12 h-12 flex-shrink-0 overflow-hidden rounded-md bg-gray-200">
                                                <Image
                                                    src={blog.mainImage ? urlFor(blog.mainImage).url() : NotReadyBlog}
                                                    alt={blog.title}
                                                    width={48}
                                                    height={48}
                                                    priority
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>

                                            {/* Title + Hover border */}
                                            <span className="flex-1 relative text-primary/90 line-clamp-2 group-hover:text-accent transition-colors duration-300">
                                                {blog.title}
                                                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full"></span>
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {/* Popular blogs with thumbnails */}
                    {mostViewed.length > 0 && (
                        <div className="md:hidden bg-white p-4 rounded-xl shadow-sm order-3 mt-10">
                            <h4 className="font-semibold text-lg mb-4 text-primary/90">Popüler Yazılar</h4>
                            <ul className="space-y-3">
                                {mostViewed.map((blog) => (
                                    <li key={blog._id}>
                                        <Link
                                            href={`/blog/${blog.slug.current}`}
                                            className="flex items-center gap-3 p-2 rounded-md transition-all duration-300 group hover:bg-primary/5"
                                        >
                                            {/* Thumbnail */}
                                            <div className="w-12 h-12 flex-shrink-0 overflow-hidden rounded-md bg-gray-200">
                                                <Image
                                                    src={blog.mainImage ? urlFor(blog.mainImage).url() : NotReadyBlog}
                                                    alt={blog.title}
                                                    width={48}
                                                    height={48}
                                                    priority
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>

                                            {/* Title + Hover border */}
                                            <span className="flex-1 relative text-primary/90 line-clamp-2 group-hover:text-accent transition-colors duration-300">
                                                {blog.title}
                                                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full"></span>
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Sidebar */}
                    <aside className="order-1 md:order-2 bg-background shadow-md md:shadow-none md:bg-transparent p-4 md:p-0 sticky top-16 md:top-24 md:space-y-6 z-10">
                        {/* Search */}
                        <div>
                            <input
                                type="text"
                                placeholder="Ara..."
                                className="w-full px-4 py-2 mb-4 md:mb-0 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Categories */}
                        <div>
                            <h4 className="font-semibold text-lg md:mb-2 ">Kategoriler</h4>
                            <CategorySelectWrapper
                                categories={categories}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                            />
                        </div>


                        {/* Last blogs with thumbnails */}
                        {latestBlogs.length > 0 && (
                            <div className="hidden md:block bg-white p-4 rounded-xl shadow-sm">
                                <h4 className="font-semibold text-lg mb-4 text-primary/90">Son Yazılar</h4>
                                <ul className="space-y-3">
                                    {latestBlogs.map((blog) => (
                                        <li key={blog._id}>
                                            <Link
                                                href={`/blog/${blog.slug.current}`}
                                                className="flex items-center gap-3 p-2 rounded-md transition-all duration-300 group hover:bg-primary/5"
                                            >
                                                {/* Thumbnail */}
                                                <div className="w-12 h-12 flex-shrink-0 overflow-hidden rounded-md bg-gray-200">
                                                    <Image
                                                        src={blog.mainImage ? urlFor(blog.mainImage).url() : NotReadyBlog}
                                                        alt={blog.title}
                                                        width={48}
                                                        height={48}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                </div>

                                                {/* Title + Hover border */}
                                                <span className="flex-1 relative text-primary/90 line-clamp-2 group-hover:text-accent transition-colors duration-300">
                                                    {blog.title}
                                                    <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full"></span>
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {/* Popular blogs with thumbnails */}
                        {mostViewed.length > 0 && (
                            <div className="hidden md:block bg-white p-4 rounded-xl shadow-sm">
                                <h4 className="font-semibold text-lg mb-4 text-primary/90">Popüler Yazılar</h4>
                                <ul className="space-y-3">
                                    {mostViewed.map((blog) => (
                                        <li key={blog._id}>
                                            <Link
                                                href={`/blog/${blog.slug.current}`}
                                                className="flex items-center gap-3 p-2 rounded-md transition-all duration-300 group hover:bg-primary/5"
                                            >
                                                {/* Thumbnail */}
                                                <div className="w-12 h-12 flex-shrink-0 overflow-hidden rounded-md bg-gray-200">
                                                    <Image
                                                        src={blog.mainImage ? urlFor(blog.mainImage).url() : NotReadyBlog}
                                                        alt={blog.title}
                                                        width={48}
                                                        height={48}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                </div>

                                                {/* Title + Hover border */}
                                                <span className="flex-1 relative text-primary/90 line-clamp-2 group-hover:text-accent transition-colors duration-300">
                                                    {blog.title}
                                                    <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full"></span>
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </aside>
                </div>
            </Container>
        </div>
    );
};

export default BlogPageClient;
