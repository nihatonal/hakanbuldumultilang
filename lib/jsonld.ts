// lib/jsonld.ts
export function homeJsonLd(locale: "tr" | "en" | "ru") {
  const siteUrl = "https://www.hakanbuldu.com";

  const translations = {
    tr: {
      websiteName: "Hakan Buldu - Hukuki Danışmanlık",
      description:
        "15+ yıllık deneyimle ceza, idare, iş ve aile hukuku alanlarında profesyonel hukuki destek.",
    },
    en: {
      websiteName: "Hakan Buldu - Legal Consultancy",
      description:
        "Professional legal support in criminal, administrative, labor and family law with 15+ years of experience.",
    },
    ru: {
      websiteName: "Hakan Buldu - Юридическая консультация",
      description:
        "Профессиональная юридическая поддержка по уголовному, административному, трудовому и семейному праву с более чем 15-летним опытом.",
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: translations[locale].websiteName,
        url: `${siteUrl}/${locale}`,
        description: translations[locale].description,
        inLanguage: locale,
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/${locale}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        name: "Hakan Buldu",
        url: siteUrl,
        logo: `${siteUrl}/assets/images/logo.png`,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+90-555-555-5555",
            contactType: "customer service",
            availableLanguage: ["tr", "en", "ru"],
          },
        ],
        sameAs: ["https://www.linkedin.com/in/hakan-buldu"],
      },
    ],
  };
}
