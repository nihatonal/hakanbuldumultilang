import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  FileText,
  Gavel,
  Landmark,
  Scale,
} from "lucide-react";
import Link from "next/link";

import Container from "@/components/Container";
import { client } from "@/sanity/lib/client";

const BLOG_CATEGORIES_QUERY = `
  *[
    _type == "blogcategory" &&
    defined(slug.current)
  ]
  | order(title asc) {
    _id,
    title,
    slug,
    description,
    "articleCount": count(
      *[
        _type == "blog" &&
        references(^._id) &&
        defined(slug.current)
      ]
    )
  }
`;

interface BlogCategory {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  articleCount: number;
}

async function getBlogCategories(): Promise<BlogCategory[]> {
  try {
    return await client.fetch<BlogCategory[]>(BLOG_CATEGORIES_QUERY);
  } catch (error) {
    console.error("Blog kategorileri alınamadı:", error);
    return [];
  }
}

const categoryIcons = [
  Scale,
  BriefcaseBusiness,
  Building2,
  Landmark,
  Gavel,
  FileText,
];

export default async function BlogCategories() {
  const categories = await getBlogCategories();

  if (categories.length === 0) {
    return null;
  }

  return (
    <section id="categories" className="section-padding bg-page-background scroll-mt-12">
      <Container>
        {/* Section header */}
        <div className="mb-10 max-w-3xl md:mb-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-9 bg-accent-dark" />

            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-dark">
              Hukuki konular
            </p>
          </div>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.025em] text-primary md:text-4xl lg:text-5xl">
            İlgi alanınıza göre içerikleri keşfedin
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
            Hukukun farklı alanlarındaki güncel yazılara ve uygulamaya yönelik
            değerlendirmelere kategori üzerinden ulaşabilirsiniz.
          </p>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = categoryIcons[index % categoryIcons.length];

            return (
              <Link
                key={category._id}
                href={`/blog?category=${encodeURIComponent(
                  category.slug.current,
                )}`}
                className="group relative flex min-h-[260px] flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-elegant md:p-7"
              >
                {/* Decorative element */}
                <div
                  aria-hidden="true"
                  className="absolute -right-14 -top-14 h-36 w-36 rounded-full border border-primary/5 transition-transform duration-500 group-hover:scale-125"
                />

                <div className="relative flex items-start justify-between gap-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </div>

                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-5 w-5 text-muted-foreground transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                  />
                </div>

                <div className="relative mt-8 flex flex-1 flex-col">
                  <h3 className="text-xl font-semibold tracking-[-0.015em] text-primary transition-colors group-hover:text-primary-light">
                    {category.title}
                  </h3>

                  {category.description && (
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                      {category.description}
                    </p>
                  )}

                  <div className="mt-auto pt-7">
                    <span className="inline-flex rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground">
                      {category.articleCount} yazı
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
