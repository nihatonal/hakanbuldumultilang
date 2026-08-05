import { BookOpenText, Eye, FolderOpen, Scale } from "lucide-react";

import Container from "@/components/Container";
import { client } from "@/sanity/lib/client";

const BLOG_STATISTICS_QUERY = `
  {
    "articleCount": count(
      *[
        _type == "blog" &&
        defined(slug.current)
      ]
    ),

    "categoryCount": count(
      *[
        _type == "blogcategory" &&
        defined(slug.current)
      ]
    ),

    "totalViews": math::sum(
      *[
        _type == "blog" &&
        defined(viewCount)
      ].viewCount
    ),

    "experienceYears": coalesce(
      *[
        _type == "author" &&
        isPrimary == true
      ][0].experienceYears,

      *[
        _type == "author"
      ][0].experienceYears,

      0
    )
  }
`;

interface BlogStatistics {
  articleCount: number;
  categoryCount: number;
  totalViews: number | null;
  experienceYears: number;
}

async function getBlogStatistics(): Promise<BlogStatistics> {
  try {
    const statistics = await client.fetch<BlogStatistics>(
      BLOG_STATISTICS_QUERY,
    );

    return {
      articleCount: statistics.articleCount ?? 0,
      categoryCount: statistics.categoryCount ?? 0,
      totalViews: statistics.totalViews ?? 0,
      experienceYears: statistics.experienceYears ?? 0,
    };
  } catch (error) {
    console.error("Blog istatistikleri alınamadı:", error);

    return {
      articleCount: 0,
      categoryCount: 0,
      totalViews: 0,
      experienceYears: 0,
    };
  }
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("tr-TR").format(value);
}

export default async function StatisticsBand() {
  const statistics = await getBlogStatistics();

  const items = [
    {
      label: "Yayımlanan Makale",
      value: formatNumber(statistics.articleCount),
      icon: BookOpenText,
    },
    {
      label: "Hukuk Kategorisi",
      value: formatNumber(statistics.categoryCount),
      icon: FolderOpen,
    },
    {
      label: "Toplam Okunma",
      value: formatNumber(statistics.totalViews ?? 0),
      icon: Eye,
    },
    {
      label: "Hukuk Alanında Deneyim",
      value:
        statistics.experienceYears > 0 ? `${statistics.experienceYears}+` : "—",
      icon: Scale,
    },
  ];

  return (
    <section className="bg-primary text-primary-foreground">
      <Container>
        <div className="grid grid-cols-2 divide-x divide-y divide-white/10 border-x border-white/10 lg:grid-cols-4 lg:divide-y-0">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex min-h-[180px] flex-col justify-between p-6 sm:p-8 lg:min-h-[210px] lg:p-10"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5">
                  <Icon aria-hidden="true" className="h-5 w-5 text-accent" />
                </div>

                <div className="mt-8">
                  <p className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {item.value}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-white/55">
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
