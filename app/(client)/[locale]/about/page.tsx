import type { Metadata } from "next";
import HeroSection from '@/components/about/HeroSection';
import Achievements from '@/components/about/Achievements';
import Education from '@/components/about/Education';
import Princliples from '@/components/about/Princliples';
import Cta from '@/components/about/Cta';
import Script from "next/script";

const siteUrl = "https://www.hakanbuldu.com";

export const metadata: Metadata = {
    title: "Hakkımızda - Hakan Buldu | 15+ Yıllık Deneyimle Hukuki Destek",
    description: "Hukuki sorunlarınızda güçlü bir temsilciye mi ihtiyacınız var? Hakan Buldu ile hemen iletişime geçin, adalet için ilk adımı atın!",
    alternates: { canonical: `${siteUrl}/hakkinda` },
};

const AboutPage = () => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Hakan Buldu",
        jobTitle: "Danışman",
        url: siteUrl,
        description: "15+ yıllık tecrübesiyle ceza hukuku ve idare hukuku alanlarında güvenilir, sonuç odaklı avukat. Arabuluculuk ve bilirkişilik eğitimleri ile etkin çözümler sunar.",
        alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "Dokuz Eylül Üniversitesi Hukuk Fakültesi",
            sameAs: "https://www.deu.edu.tr/"
        },
        worksFor: {
            "@type": "Organization",
            name: "Hakan Buldu",
            url: siteUrl
        },
        sameAs: [
            "https://www.linkedin.com/in/hakan-buldu" // LinkedIn linkini gerçek URL ile değiştir
               
        ]
    };


    return (
        <>
            <Script type="application/ld+json" id="about-jsonld">
                {JSON.stringify(jsonLd)}
            </Script>

            <div className="overflow-hidden bg-background" >

                {/* Hero Section */}
                <HeroSection />
                {/* Achievements */}
                <Achievements />

                {/* Education & Career */}
                <Education />

                {/* Principles */}
                <Princliples />
                {/* CTA Section */}
                <Cta />
            </div>
        </>
    );
};

export default AboutPage;