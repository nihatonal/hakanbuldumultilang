import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Locale, routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

const siteUrl = "https://www.hakanbuldu.com";
export const metadata: Metadata = {
  title: "Hakan Buldu | Ceza, İdare, İş ve Aile Hukukunda Uzman",
  description:
    "15+ yıllık deneyim, 500+ dava ve %95 başarı oranıyla Hakan Buldu; ceza, idare, iş ve aile hukuku alanlarında güvenilir ve etkili hukuki destek sunar.",
  alternates: {
    canonical: `${siteUrl}/`
  }
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>
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
