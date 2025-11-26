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

const siteUrl = "https://www.hakanbuldu.com";

export const metadata: Metadata = {
    title: "İletişim - Hakan Buldu | Hukuki Bilgi ve Rehberlik",
    description: "Hukuki konular hakkında bilgi ve rehberlik almak için Hakan Buldu ile iletişime geçin. Ankara merkezli güvenilir ve deneyimli danışmanlık.",
    alternates: {
        canonical: `${siteUrl}/iletisim`,
    },
    openGraph: {
        title: "İletişim - Hakan Buldu",
        description: "Hukuki konularda doğru bilgi ve rehberlik almak için Hakan Buldu ile iletişime geçin.",
        url: `${siteUrl}/iletisim`,
        type: "website",
        images: [
            {
                url: `${siteUrl}/assets/images/contact-og-image.webp`,
                width: 1200,
                height: 630,
                alt: "Hakan Buldu İletişim",
            },
        ],
    },
};


const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "İletişim - Hakan Buldu",
    description: "Hukuki danışmanlık için iletişim sayfası.",
    url: `${siteUrl}/iletisim`,
    contactType: "Hukuki Danışmanlık",
    areaServed: "Ankara, Türkiye",
    availableLanguage: ["tr"],
    mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${siteUrl}/iletisim`,
    },
};

const ContactPage = async () => {

    const categories = await getBlogCategories();

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