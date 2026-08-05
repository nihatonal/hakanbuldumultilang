import BlogLandingPage from "@/components/blog/landing/BlogLandingPage";

type HomePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function HomePage({
  params,
}: HomePageProps) {
  const { locale } = await params;

  return <BlogLandingPage locale={locale} />;
}