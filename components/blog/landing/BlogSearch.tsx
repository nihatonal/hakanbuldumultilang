"use client";

import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowRight,
  Calendar,
  LoaderCircle,
  Search,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import "dayjs/locale/tr";

import Container from "@/components/Container";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const SEARCH_BLOGS_QUERY = `
  *[
    _type == "blog" &&
    defined(slug.current) &&
    (
      title match $term ||
      description match $term ||
      pt::text(body) match $term
    )
  ]
  | order(publishedAt desc)[0...6] {
    _id,
    title,
    slug,
    description,
    publishedAt,
    mainImage,
    blogcategories[]->{
      _id,
      title
    }
  }
`;

interface SearchResult {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  publishedAt?: string;
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
  }>;
}

export default function BlogSearch() {
  const router = useRouter();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const normalizedQuery = searchQuery.trim();

  useEffect(() => {
    if (normalizedQuery.length < 2) {
      setResults([]);
      setIsDropdownOpen(false);
      setIsLoading(false);
      setActiveIndex(-1);
      return;
    }

    const controller = new AbortController();

    const timeoutId = window.setTimeout(async () => {
      setIsLoading(true);

      try {
        const searchTerm = `*${normalizedQuery}*`;

        const data = await client.fetch<SearchResult[]>(
          SEARCH_BLOGS_QUERY,
          {
            term: searchTerm,
          },
          {
            signal: controller.signal,
          },
        );

        setResults(data);
        setIsDropdownOpen(true);
        setActiveIndex(-1);
      } catch (error) {
        if (
          error instanceof Error &&
          error.name !== "AbortError"
        ) {
          console.error("Blog arama sonuçları alınamadı:", error);
        }

        setResults([]);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [normalizedQuery]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(
          event.target as Node,
        )
      ) {
        setIsDropdownOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );
    };
  }, []);

  const goToSearchPage = () => {
    if (!normalizedQuery) {
      router.push("/blog");
      return;
    }

    const params = new URLSearchParams({
      search: normalizedQuery,
    });

    setIsDropdownOpen(false);
    router.push(`/blog?${params.toString()}`);
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (
      activeIndex >= 0 &&
      results[activeIndex]
    ) {
      router.push(
        `/blog/${results[activeIndex].slug.current}`,
      );
      return;
    }

    goToSearchPage();
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (!isDropdownOpen || results.length === 0) {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }

      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      setActiveIndex((currentIndex) =>
        currentIndex < results.length - 1
          ? currentIndex + 1
          : 0,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setActiveIndex((currentIndex) =>
        currentIndex > 0
          ? currentIndex - 1
          : results.length - 1,
      );
    }

    if (event.key === "Escape") {
      setIsDropdownOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <section className="relative z-20 bg-page-background section-padding">
      <Container>
        <div className="-mt-10 rounded-2xl border border-border bg-white p-5 shadow-elegant sm:p-7 md:-mt-12 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-dark">
                Hukuki içerik ara
              </p>

              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-primary md:text-3xl">
                Aradığınız hukuki konuya hızlıca ulaşın
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                Hukuki kavramı, dava türünü veya merak ettiğiniz
                konuyu yazarak ilgili içeriklere ulaşabilirsiniz.
              </p>
            </div>

            <div
              ref={searchContainerRef}
              className="relative"
            >
              <form
                onSubmit={handleSubmit}
                role="search"
              >
                <label
                  htmlFor="blog-search"
                  className="sr-only"
                >
                  Hukuki içerik ara
                </label>

                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-5 top-8 z-10 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                />

                <input
                  id="blog-search"
                  type="search"
                  value={searchQuery}
                  autoComplete="off"
                  aria-autocomplete="list"
                  aria-expanded={isDropdownOpen}
                  aria-controls="blog-search-results"
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                    setActiveIndex(-1);
                  }}
                  onFocus={() => {
                    if (
                      normalizedQuery.length >= 2 &&
                      (results.length > 0 || !isLoading)
                    ) {
                      setIsDropdownOpen(true);
                    }
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Örn. kıdem tazminatı, boşanma davası..."
                  className="h-16 w-full rounded-xl border border-border bg-secondary/40 pl-14 pr-32 text-sm text-primary outline-none transition placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 sm:pr-36"
                />

                {isLoading && (
                  <LoaderCircle
                    aria-label="Aranıyor"
                    className="absolute right-24 top-8 h-5 w-5 -translate-y-1/2 animate-spin text-muted-foreground sm:right-28"
                  />
                )}

                <button
                  type="submit"
                  className="absolute right-2 top-2 h-12 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-light sm:px-6"
                >
                  Ara
                </button>
              </form>

              {isDropdownOpen &&
                normalizedQuery.length >= 2 && (
                  <div
                    id="blog-search-results"
                    role="listbox"
                    className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 max-h-[430px] overflow-y-auto rounded-xl border border-border bg-white p-2 shadow-elegant"
                  >
                    {!isLoading && results.length === 0 ? (
                      <div className="px-4 py-6 text-center">
                        <p className="text-sm font-medium text-primary">
                          Sonuç bulunamadı
                        </p>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          Farklı bir kelime deneyebilir veya Enter’a
                          basarak tüm içeriklerde arama yapabilirsiniz.
                        </p>
                      </div>
                    ) : (
                      <>
                        {results.map((article, index) => {
                          const imageUrl = article.mainImage
                            ? urlFor(article.mainImage)
                                .width(180)
                                .height(120)
                                .quality(80)
                                .url()
                            : null;

                          const isActive =
                            index === activeIndex;

                          return (
                            <button
                              key={article._id}
                              type="button"
                              role="option"
                              aria-selected={isActive}
                              onMouseEnter={() =>
                                setActiveIndex(index)
                              }
                              onClick={() =>
                                router.push(
                                  `/blog/${article.slug.current}`,
                                )
                              }
                              className={`flex w-full cursor-pointer items-start gap-4 rounded-lg p-3 text-left transition ${
                                isActive
                                  ? "bg-secondary"
                                  : "hover:bg-secondary/70"
                              }`}
                            >
                              <div className="relative h-16 w-24 flex-none overflow-hidden rounded-md bg-secondary">
                                {imageUrl ? (
                                  <Image
                                    src={imageUrl}
                                    alt={
                                      article.mainImage?.alt ||
                                      article.title
                                    }
                                    fill
                                    sizes="96px"
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="flex h-full items-center justify-center">
                                    <Search className="h-4 w-4 text-muted-foreground" />
                                  </div>
                                )}
                              </div>

                              <div className="min-w-0 flex-1">
                                {article.blogcategories?.[0] && (
                                  <p className="text-[11px] font-semibold uppercase tracking-wider text-accent-dark">
                                    {
                                      article
                                        .blogcategories[0]
                                        .title
                                    }
                                  </p>
                                )}

                                <p className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-primary">
                                  {article.title}
                                </p>

                                {article.publishedAt && (
                                  <span className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
                                    <Calendar className="h-3.5 w-3.5" />

                                    {dayjs(article.publishedAt)
                                      .locale("tr")
                                      .format("D MMM YYYY")}
                                  </span>
                                )}
                              </div>

                              <ArrowRight className="mt-5 h-4 w-4 flex-none text-muted-foreground" />
                            </button>
                          );
                        })}

                        {results.length > 0 && (
                          <button
                            type="button"
                            onClick={goToSearchPage}
                            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border-t border-border px-4 py-3 text-sm font-semibold text-primary transition hover:bg-secondary"
                          >
                            “{normalizedQuery}” için tüm sonuçları
                            görüntüle

                            <ArrowRight className="h-4 w-4" />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}