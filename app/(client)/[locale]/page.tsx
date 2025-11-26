import React from "react";

import HomeAbout from "@/components/HomeAbout";
import HomeCta from "@/components/HomeCta";
import HomeHero from "@/components/HomeHero";
import HomeServices from "@/components/HomeServices";
import HomeStatistics from "@/components/HomeStatistics";
import Testimonials from "@/components/Testimonials";
import { getMostViewedBlogs } from "@/sanity/queries/index";
import PopularBlogs from "@/components/PopularBlogs";



const Home = async () => {
  // const categories = await getCategories(6);
  const mostViewed = await getMostViewedBlogs();
  return (
    <div>
      <HomeHero />
      <HomeStatistics />
      <HomeServices />
      <HomeAbout />
      <Testimonials />
      <HomeCta />
      <PopularBlogs mostViewed={mostViewed} />
    </div>
  );
};

export default Home;
