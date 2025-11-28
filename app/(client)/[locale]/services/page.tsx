import type { Metadata } from "next";
import HeroSection from '@/components/services/HeroSection';
import PracticeAreas from '@/components/services/PracticeAreas';
import WhyChooseMe from '@/components/services/WhyChooseMe';
import Process from '@/components/services/Process';
import Cta from '@/components/services/Cta';
import Script from "next/script";
import { buildI18nCanonical } from "@/lib/seo";

const siteUrl = "https://www.hakanbuldu.com";

export async function generateMetadata({ params }): Promise<Metadata> {
    const { locale } = await params;

    return {
        title:
            locale === "tr"
                ? "Çalışma Alanlarımız - Hakan Buldu | Hukuki Bilgi ve Rehberlik"
                : "Practice Areas - Hakan Buldu | Legal Information & Guidance",
        description:
            locale === "tr"
                ? "Ceza, idare, iş ve medeni hukuk konularında doğru bilgi ve rehberlik sağlamak için kapsamlı içerikler sunuyorum."
                : "Providing detailed legal information and guidance on criminal, administrative, labor, and civil law.",
        ...buildI18nCanonical(locale, {
            tr: "/calisma-alanlari",
            en: "/services",
        }),
    };
}


const Services = () => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Faaliyet Alanlarımız",
        url: `${siteUrl}/calisma-alanlari`,
        description:
            "Hakan Buldu, ceza, idare, iş ve aile hukuku gibi birçok alanda kapsamlı hukuki hizmet sunmaktadır.",
        mainEntity: [
            {
                "@type": "Service",
                name: "Ceza Hukuku",
                serviceType: "Ağır ceza davaları, tutuklamaya itiraz, istinaf ve temyiz başvuruları",
                areaServed: "TR",
                provider: {
                    "@type": "Person",
                    name: "Hakan Buldu"
                }
            },
            {
                "@type": "Service",
                name: "İdare Hukuku",
                serviceType: "İptal davaları, idari para cezaları, anayasa başvuruları",
                areaServed: "TR",
                provider: {
                    "@type": "Person",
                    name: "Hakan Buldu"
                }
            },
            {
                "@type": "Service",
                name: "İş Hukuku",
                serviceType: "İşe iade, tazminat davaları, iş kazası ve SGK uyuşmazlıkları",
                areaServed: "TR",
                provider: {
                    "@type": "Person",
                    name: "Hakan Buldu"
                }
            },
            {
                "@type": "Service",
                name: "Aile Hukuku",
                serviceType: "Boşanma, velayet, nafaka ve mal paylaşımı davaları",
                areaServed: "TR",
                provider: {
                    "@type": "Person",
                    name: "Hakan Buldu"
                }
            }
        ]
    };



    return (
        <>
            <Script type="application/ld+json" id="practice-jsonld">
                {JSON.stringify(jsonLd)}
            </Script>

            <div className="overflow-hidden bg-background">
                {/* Hero Section */}
                <HeroSection />

                {/* Practice Areas Grid */}
                <PracticeAreas />

                {/* Why Choose Us */}
                <WhyChooseMe />

                {/* Process Section */}
                <Process />

                {/* CTA Section */}
                <Cta />
            </div>
        </>
    );
};

export default Services;