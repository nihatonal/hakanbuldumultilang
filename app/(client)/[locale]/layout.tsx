import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Locale, routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

const siteUrl = "https://www.hakanbuldu.com";
export const metadata: Metadata = {
  title: "Hakan Buldu | Ceza, İdare, İş, Medeni ve Tazminat Hukuku",

  description:
    "Hakan Buldu'nun hukuk blogunda ceza hukuku, idare hukuku, iş hukuku, medeni hukuk ve tazminat hukuku alanlarında güncel hukuki gelişmeleri, rehber niteliğindeki makaleleri ve güvenilir bilgilendirme içeriklerini keşfedin.",

  alternates: {
    canonical: `${siteUrl}/`,
  },

  keywords: [
    "Hakan Buldu",
    "hukuk blogu",
    "ceza hukuku",
    "idare hukuku",
    "iş hukuku",
    "medeni hukuk",
    "tazminat hukuku",
    "hukuki makale",
    "hukuki bilgilendirme",
    "avukat blogu",
  ],

  openGraph: {
    title: "Hakan Buldu | Hukuk Blogu",
    description:
      "Ceza, idare, iş, medeni ve tazminat hukuku alanlarında güncel hukuki makaleler ve güvenilir bilgilendirme içerikleri.",
    url: siteUrl,
    siteName: "Hakan Buldu",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/og-home.jpg`,
        width: 1200,
        height: 630,
        alt: "Hakan Buldu Hukuk Blogu",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Hakan Buldu | Hukuk Blogu",
    description:
      "Ceza, idare, iş, medeni ve tazminat hukuku alanlarında güncel hukuki içerikler.",
    images: [`${siteUrl}/images/og-home.jpg`],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
