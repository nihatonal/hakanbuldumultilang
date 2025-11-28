import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { practicesData } from '@/constants/practiceAreas';
import ServiceDetails from '@/components/ServiceDetails';

type Props = { params: Promise<{ locale: string; slug: string }> };

const siteUrl = 'https://www.hakanbuldu.com';
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;

    const data = practicesData[locale as keyof typeof practicesData];
    const currentArea = data.find((item) => item.slug === slug);

    if (!currentArea) {
        return {
            title: "Hukuk Hizmeti",
            description: "Uzmanlık alanları hakkında bilgi alın.",
            alternates: {
                canonical: `${siteUrl}/${locale}/calisma-alanlari`,
            },
        };
    }

    // index üzerinden EN & TR eşleme
    const index = data.findIndex((item) => item.slug === slug);

    const trArea = practicesData.tr[index];
    const enArea = practicesData.en[index];

    const canonicalPath =
        locale === "tr"
            ? `/calisma-alanlari/${trArea.slug}`
            : `/services/${enArea.slug}`;

    return {
        title: `${currentArea.title} | Avukat Hakan Buldu`,
        description: currentArea.description,
        alternates: {
            canonical: `${siteUrl}/${locale}${canonicalPath}`,
            languages: {
                "tr": `${siteUrl}/tr/calisma-alanlari/${trArea.slug}`,
                "en": `${siteUrl}/en/services/${enArea.slug}`,
                "x-default": `${siteUrl}/tr/calisma-alanlari/${trArea.slug}`,
            }
        },
        openGraph: {
            title: currentArea.title,
            description: currentArea.description,
            url: `${siteUrl}/${locale}${canonicalPath}`,
            type: "website",
            images: [
                {
                    url: `${siteUrl}/images/services/${currentArea.slug}.jpg`,
                    width: 1200,
                    height: 630,
                    alt: currentArea.title,
                },
            ],
        },
    };
}

export default async function ServicePage({ params }: Props) {
    const { locale, slug } = await params;
    const data = practicesData[locale as keyof typeof practicesData];
    const area = data.find((item) => item.slug === slug);

    if (!area) {
        return notFound();
    }
    const safeArea = {
        title: area.title,
        description: area.description,
        services: area.services,
        detailTitle: area.detailTitle,
        detailDescription: area.detailDescription,
        detailedServices: area.detailedServices,
        faq: area.faq,
        examples: area.examples,
    };


    return (
        <ServiceDetails area={safeArea} />
    );

}

export async function generateStaticParams() {
    return Object.keys(practicesData).flatMap((locale) =>
        practicesData[locale as keyof typeof practicesData].map((area) => ({
            locale,
            slug: area.slug,
        }))
    );
}
