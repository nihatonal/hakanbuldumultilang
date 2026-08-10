"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

interface SingleBlogContentProps {
  slug: string;
  count: number;
}

export default function SingleBlogContent({
  slug,
  count,
}: SingleBlogContentProps) {
  const [viewCount, setViewCount] =
    useState(count);

  const hasIncremented =
    useRef(false);

  useEffect(() => {
    if (hasIncremented.current) {
      return;
    }

    hasIncremented.current = true;

    const incrementView = async () => {
      try {
        const incrementResponse =
          await fetch(
            `/api/increment-view?slug=${encodeURIComponent(
              slug,
            )}`,
          );

        if (!incrementResponse.ok) {
          throw new Error(
            `Increment failed: ${incrementResponse.status}`,
          );
        }

        /*
         * Increment endpoint'i yeni viewCount'u
         * döndürüyorsa doğrudan kullan.
         */
        const incrementData =
          await incrementResponse.json();

        if (
          typeof incrementData?.viewCount ===
          "number"
        ) {
          setViewCount(
            incrementData.viewCount,
          );

          return;
        }

        /*
         * Endpoint henüz yeni değeri dönmüyorsa
         * fallback olarak tekrar oku.
         */
        const viewResponse = await fetch(
          `/api/view-count?slug=${encodeURIComponent(
            slug,
          )}`,
        );

        if (!viewResponse.ok) {
          return;
        }

        const viewData =
          await viewResponse.json();

        if (
          typeof viewData?.viewCount ===
          "number"
        ) {
          setViewCount(
            viewData.viewCount,
          );
        }
      } catch (error) {
        console.error(
          "View count error:",
          error,
        );
      }
    };

    incrementView();
  }, [slug]);

  return <span>{viewCount}</span>;
}