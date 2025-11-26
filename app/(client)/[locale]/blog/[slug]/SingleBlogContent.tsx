'use client';

import { useEffect, useState, useRef } from "react";

const SingleBlogContent = ({ slug, count }: { slug: string, count: number }) => {
    const [viewCount, setViewCount] = useState<number | null>(count);
    const hasIncremented = useRef(false); // 👈 sadece increment için

    useEffect(() => {
        const updateAndFetchView = async () => {
            try {
                if (!hasIncremented.current) {
                    hasIncremented.current = true;

                    // Paralel fetch işlemleri
                    const [_, viewRes] = await Promise.all([
                        fetch(`/api/increment-view?slug=${slug}`),
                        fetch(`/api/view-count?slug=${slug}`)
                    ]);

                    const data = await viewRes.json();
                    setViewCount(data.viewCount);
                } else {
                    // Sadece viewCount çek
                    const res = await fetch(`/api/view-count?slug=${slug}`);
                    const data = await res.json();
                    setViewCount(data.viewCount);
                }
            } catch (error) {
                console.error("View count error:", error);
            }
        };

        updateAndFetchView();
    }, [slug]);


    if (viewCount === null) return null;

    return (
        <span>
            {viewCount}
        </span>
    );
};

export default SingleBlogContent;
