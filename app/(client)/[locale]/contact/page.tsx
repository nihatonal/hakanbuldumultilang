import type { Metadata } from "next";
import Script from "next/script";
import Info from '@/components/contact/Info';
import ContactForm from '@/components/contact/ContactForm';
import Container from '@/components/Container';
import ProcessSteps from '@/components/contact/ProcessSteps';
import Map from '@/components/contact/Map';
import Cta from '@/components/contact/Cta';
import {
    getBlogCategories
} from "@/sanity/queries";
import HeroSection from '@/components/contact/HeroSection';
import { buildI18nCanonical } from "@/lib/seo";

const siteUrl = "https://www.hakanbuldu.com";

export async function generateMetadata({ params }): Promise<Metadata> {
    const { locale } = await params;

    return {
        title:
            locale === "tr"
                ? "İletişim - Hakan Buldu | Hukuki Bilgi ve Rehberlik"
                : "Contact - Hakan Buldu | Legal Guidance",
        description:
            locale === "tr"
                ? "Hukuki konular hakkında bilgi ve rehberlik almak için Hakan Buldu ile iletişime geçin."
                : "Get legal information and guidance by contacting Hakan Buldu.",
        ...buildI18nCanonical(locale, {
            tr: "/iletisim",
            en: "/contact",
        }),
        openGraph: {
            title:
                locale === "tr"
                    ? "İletişim - Hakan Buldu"
                    : "Contact - Hakan Buldu",
            description:
                locale === "tr"
                    ? "Hukuki konularda doğru bilgi ve rehberlik almak için iletişime geçin."
                    : "Contact us for accurate legal guidance.",
            url:
                locale === "tr"
                    ? `${siteUrl}/tr/iletisim`
                    : `${siteUrl}/en/contact`,
            type: "website",
            images: [
                {
                    url: `${siteUrl}/assets/images/contact-og-image.webp`,
                    width: 1200,
                    height: 630,
                    alt:
                        locale === "tr"
                            ? "Hakan Buldu İletişim"
                            : "Hakan Buldu Contact",
                },
            ],
        },
    };
}


const ContactPage = async ({ params }) => {
    const { locale } = await params;
    const categories = await getBlogCategories();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: locale === "tr" ? "İletişim - Hakan Buldu" : "Contact - Hakan Buldu",
        description:
            locale === "tr"
                ? "Hukuki danışmanlık için iletişim sayfası."
                : "Contact page for legal consultation.",
        url:
            locale === "tr"
                ? `${siteUrl}/tr/iletisim`
                : `${siteUrl}/en/contact`,
        contactType: "Legal Consultation",
        areaServed: locale === "tr" ? "Ankara, Türkiye" : "Ankara, Turkey",
        availableLanguage: ["tr", "en"],
    };

    return (
        <>
            <Script type="application/ld+json" id="contact-jsonld">
                {JSON.stringify(jsonLd)}
            </Script>

            <div className="overflow-hidden bg-background">
                {/* Hero Section */}
                <HeroSection />

                {/* Contact Info Cards */}
                <Info />

                {/* Contact Form and Process */}
                <section className="section-padding">
                    <Container >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            {/* Contact Form */}
                            <ContactForm legalAreas={categories.map((item) => item.title)} />

                            {/* Process Steps */}
                            <ProcessSteps />
                        </div>
                    </Container>
                </section>

                {/* Map and Location (Placeholder) */}
                <Map />

                {/* Emergency Contact */}
                <Cta />

            </div>
        </>
    );
};

export default ContactPage;