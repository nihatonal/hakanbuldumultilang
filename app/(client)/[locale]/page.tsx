import React from "react";

import HomeAbout from "@/components/HomeAbout";
import HomeCta from "@/components/HomeCta";
import HomeHero from "@/components/HomeHero";
import HomeServices from "@/components/HomeServices";
import HomeStatistics from "@/components/HomeStatistics";
import Testimonials from "@/components/Testimonials";
import { getMostViewedBlogs } from "@/sanity/queries/index";
import PopularBlogs from "@/components/PopularBlogs";
import { buildI18nCanonical } from "@/lib/seo";
import Script from "@/node_modules/next/script";
import { homeJsonLd } from "@/lib/jsonld";


export async function generateMetadata({ params }) {
  const { locale } = await params;

  return buildI18nCanonical(locale, `/`);
}

const Home = async ({ params }) => {
  const { locale } = await params;
  // const categories = await getCategories(6);
  const mostViewed = await getMostViewedBlogs();
  return (
    <>
      {/* JSON-LD */}
      <Script type="application/ld+json" id="home-jsonld">
        {JSON.stringify(homeJsonLd(locale))}
      </Script>

      <div>
        <HomeHero />
        <HomeStatistics />
        <HomeServices />
        <HomeAbout />
        <Testimonials />
        <HomeCta />
        <PopularBlogs mostViewed={mostViewed} />
      </div>
    </>
  );
};

export default Home;
