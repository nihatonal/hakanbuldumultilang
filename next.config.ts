import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.sanity.io"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  async rewrites() {
    return [
      // TR locale
      { source: "/:locale/hakkinda", destination: "/:locale/about" },
      { source: "/:locale/iletisim", destination: "/:locale/contact" },
      { source: "/:locale/calisma-alanlari", destination: "/:locale/services" },
      {
        source: "/:locale/calisma-alanlari/:slug",
        destination: "/:locale/services/:slug",
      },
      {
        source: "/:locale/gizlilik-politikasi",
        destination: "/:locale/privacy",
      },
      {
        source: "/:locale/kullanim-sartlari",
        destination: "/:locale/termsOfUse",
      },
      { source: "/:locale/cerez-politikasi", destination: "/:locale/cookies" },
      {
        source: "/:locale/telif-ve-marka-haklari",
        destination: "/:locale/rightsOfContent",
      },

      // EN locale
      { source: "/:locale/about-us", destination: "/:locale/about" },
      { source: "/:locale/contact", destination: "/:locale/contact" },
      { source: "/:locale/services", destination: "/:locale/services" },
      {
        source: "/:locale/services/:slug",
        destination: "/:locale/services/:slug",
      },
      { source: "/:locale/privacy-policy", destination: "/:locale/privacy" },
      { source: "/:locale/terms-of-use", destination: "/:locale/termsOfUse" },
      { source: "/:locale/cookies-policy", destination: "/:locale/cookies" },
      {
        source: "/:locale/copyrights",
        destination: "/:locale/rightsOfContent",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
