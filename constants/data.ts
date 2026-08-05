type MenuItem = {
  path: string;
  label: string;
};

type HeaderData = {
  [locale: string]: MenuItem[];
};

export const headerData: HeaderData = {
  tr: [
    {
      path: "/tr",
      label: "Ana Sayfa",
    },
    {
      path: "/tr/blog",
      label: "Tüm Yazılar",
    },
    {
      path: "/tr#categories",
      label: "Kategoriler",
    },
    {
      path: "/tr#faq",
      label: "Sık Sorulan Sorular",
    },
  ],

  en: [
    {
      path: "/tr",
      label: "Ana Sayfa",
    },
    {
      path: "/tr/blog",
      label: "Tüm Yazılar",
    },
    {
      path: "/tr#categories",
      label: "Kategoriler",
    },
    {
      path: "/tr#faq",
      label: "Sık Sorulan Sorular",
    },
  ],

  ru: [
    {
      path: "/tr",
      label: "Ana Sayfa",
    },
    {
      path: "/tr/blog",
      label: "Tüm Yazılar",
    },
    {
      path: "/tr#categories",
      label: "Kategoriler",
    },
    {
      path: "/tr#faq",
      label: "Sık Sorulan Sorular",
    },
  ],
};

export const staticsData = [
  { label: "experience", value: 15, type: "number" },
  { label: "people", value: 500, type: "number" },
  { label: "articles", value: 50, type: "number" },
  { label: "session", value: 300, type: "number" },
];