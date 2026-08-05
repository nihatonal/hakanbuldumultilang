import AuthorSection from "./AuthorSection";
import BlogCategories from "./BlogCategories";
import BlogHero from "./BlogHero";
import BlogSearch from "./BlogSearch";
import ContactCta from "./ContactCta";
import FaqSection from "./FaqSection";
import FeaturedArticle from "./FeaturedArticle";
import LatestArticles from "./LatestArticles";
import LegalDisclaimer from "./LegalDisclaimer";
import StatisticsBand from "./StatisticsBand";

export default function BlogLandingPage() {
  return (
    <main className="bg-page-background">
      <BlogHero />
      <BlogSearch />
      <FeaturedArticle />
      <LatestArticles />
      <BlogCategories />
      <StatisticsBand />
      <AuthorSection />
      <FaqSection />
      <ContactCta />
      <LegalDisclaimer />
    </main>
  );
}
