"use client";
import { useTranslations } from 'next-intl';
import useSWR from 'swr';
import { client } from '@/sanity/lib/client';
import React, { useEffect } from "react";
import Container from "@/components/Container";

import { urlFor } from "@/sanity/lib/image";
import { Calendar, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import NotReadyBlog from '../assets/images/not-ready-blog-main-image.webp';
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'

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
    mostViewed?: Blog[];
}
const fetcher = (query: string) => client.fetch(query);

const PopularBlogs: React.FC<BlogPageProps> = ({ mostViewed: initialMostViewed }) => {
    const t = useTranslations("home.blogs")
    // 🔁 En çok okunanlar
    const { data: mostViewed, mutate: mutateMostViewed } = useSWR(MOST_VIEWED_QUERY, fetcher, {
        fallbackData: initialMostViewed,
    });

    // 🔁 Real-time güncellemeler
    useEffect(() => {

        const sub3 = client.listen(MOST_VIEWED_QUERY).subscribe(() => mutateMostViewed());

        return () => {
            sub3.unsubscribe();
        };
    }, [mutateMostViewed]);

    if (!mostViewed) return <p>Loading...</p>;

    return (
        <div className="bg-background section-padding ">
            <Container>
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <motion.h2
                        variants={fadeUp}
                        className="font-display text-4xl md:text-5xl font-bold text-primary mb-4"
                    >
                        {t("title")}
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        {t("subtitle")}
                    </motion.p>
                </motion.div>

                <div className={`mt-5 md:mt-0 order-2 md:order-1 grid grid-cols-1 md:grid-cols-3 gap-6 `}>
                    {mostViewed.map((blog) => (
                        <Link
                            key={blog._id}
                            href={`/blog/${blog.slug.current}`}
                            className="relative flex flex-col items-start p-0 bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
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
            </Container>
        </div>
    );
};

export default PopularBlogs;
