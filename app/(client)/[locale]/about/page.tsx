import type { Metadata } from "next";
import HeroSection from '@/components/about/HeroSection';
import Achievements from '@/components/about/Achievements';
import Education from '@/components/about/Education';
import Princliples from '@/components/about/Princliples';
import Cta from '@/components/about/Cta';
import Script from "next/script";
import { buildI18nCanonical } from "@/lib/seo";

const siteUrl = "https://www.hakanbuldu.com";

// ---------------------------------------------
// ✅ 1) Metadata (senin hatayı da düzelttim: asyncgenerateMetadata → generateMetadata)
// ---------------------------------------------
export async function generateMetadata({ params }): Promise<Metadata> {
    const { locale } = await params;

    return {
        title:
            locale === "tr"
                ? "Hakkımızda - Hakan Buldu | 15+ Yıllık Deneyimle Hukuki Destek"
                : "About - Hakan Buldu | Legal Support With 15+ Years Experience",

        description:
            locale === "tr"
                ? "Hukuki sorunlarınızda güçlü bir temsilciye mi ihtiyacınız var? Hakan Buldu ile hemen iletişime geçin."
                : "Need strong legal representation? Contact Hakan Buldu for effective legal solutions.",

        ...buildI18nCanonical(locale, {
            tr: "/hakkinda",
            en: "/about",
        }),
    };
}

// ---------------------------------------------
// ✅ 2) Sayfa bileşeni artık locale alıyor
// ---------------------------------------------
const AboutPage = async ({ params }) => {
    const { locale } = await params;

    // ---------------------------------------------
    // ✅ 3) JSON-LD'yi iki dil için ayrı oluştur
    // ---------------------------------------------
    const jsonLd =
        locale === "tr"
            ? {
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Hakan Buldu",
                jobTitle: "Avukat & Danışman",
                url: siteUrl,
                description:
                    "15+ yıllık tecrübesiyle ceza hukuku ve idare hukuku alanlarında güvenilir, sonuç odaklı avukat.",
                alumniOf: {
                    "@type": "CollegeOrUniversity",
                    name: "Dokuz Eylül Üniversitesi Hukuk Fakültesi",
                    sameAs: "https://www.deu.edu.tr/",
                },
                worksFor: {
                    "@type": "Organization",
                    name: "Hakan Buldu Hukuk",
                    url: siteUrl,
                },
                sameAs: ["https://www.linkedin.com/in/hakan-buldu"],
                inLanguage: "tr",
            }
            : {
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Hakan Buldu",
                jobTitle: "Lawyer & Consultant",
                url: siteUrl,
                description:
                    "A reliable and solution-oriented lawyer with over 15 years of experience in criminal and administrative law.",
                alumniOf: {
                    "@type": "CollegeOrUniversity",
                    name: "Dokuz Eylul University Faculty of Law",
                    sameAs: "https://www.deu.edu.tr/",
                },
                worksFor: {
                    "@type": "Organization",
                    name: "Hakan Buldu Law Office",
                    url: siteUrl,
                },
                sameAs: ["https://www.linkedin.com/in/hakan-buldu"],
                inLanguage: "en",
            };

    // ---------------------------------------------
    // UI
    // ---------------------------------------------
    return (
        <>
            <Script type="application/ld+json" id="about-jsonld">
                {JSON.stringify(jsonLd)}
            </Script>

            <div className="overflow-hidden bg-background">
                <HeroSection />
                <Achievements />
                <Education />
                <Princliples />
                <Cta />
            </div>
        </>
    );
};

export default AboutPage;
