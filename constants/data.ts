type MenuItem = { path: string; label: string };
type HeaderData = { [locale: string]: MenuItem[] };

export const headerData: HeaderData = {
  tr: [
    { path: "/tr", label: "Ana Sayfa" },
    { path: "/hakkinda", label: "Hakkında" },
    { path: "/calisma-alanlari", label: "Çalışma Alanları" },
    { path: "/blog", label: "Blog" },
    { path: "/iletisim", label: "İletişim" },
  ],
  en: [
    { path: "/en", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Contact" },
  ],
};

export const staticsData = [
  { label: "experience", value: 15, type: "number" },
  { label: "people", value: 500, type: "number" },
  { label: "articles", value: 50, type: "number" },
  { label: "session", value: 300, type: "number" },
];
