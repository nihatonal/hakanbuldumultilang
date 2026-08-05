import { ChevronDown, HelpCircle } from "lucide-react";
import Script from "next/script";

import Container from "@/components/Container";
import { client } from "@/sanity/lib/client";

const FAQ_QUERY = `
  *[
    _type == "faq" &&
    isActive == true &&
    defined(question) &&
    defined(answer)
  ]
  | order(order asc)[0...8] {
    _id,
    question,
    answer,
    order
  }
`;

interface Faq {
  _id: string;
  question: string;
  answer: string;
  order: number;
}

async function getFaqs(): Promise<Faq[]> {
  try {
    return await client.fetch<Faq[]>(FAQ_QUERY);
  } catch (error) {
    console.error("FAQ verileri alınamadı:", error);
    return [];
  }
}

export default async function FaqSection() {
  const faqs = await getFaqs();

  if (faqs.length === 0) {
    return null;
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Script id="home-faq-jsonld" type="application/ld+json">
        {JSON.stringify(faqJsonLd)}
      </Script>

      <section id="faq" className="section-padding scroll-mt-24 bg-background">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            {/* Başlık */}
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-9 bg-accent-dark" />

                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-dark">
                  Sık sorulan sorular
                </p>
              </div>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.025em] text-primary md:text-4xl lg:text-5xl">
                Hukuki içerikler hakkında merak edilenler
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
                Platformun kullanımı, içeriklerin kapsamı ve hukuki
                bilgilendirmelerin niteliği hakkında sık sorulan sorular.
              </p>

              <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <HelpCircle
                  aria-hidden="true"
                  className="h-6 w-6 text-accent"
                />
              </div>
            </div>

            {/* Sorular */}
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <details
                  key={faq._id}
                  className="group rounded-2xl border border-border bg-card shadow-card"
                  open={index === 0}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-5 text-left sm:px-6">
                    <span className="font-semibold leading-6 text-primary">
                      {faq.question}
                    </span>

                    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-secondary text-primary transition-transform duration-300 group-open:rotate-180">
                      <ChevronDown aria-hidden="true" className="h-4 w-4" />
                    </span>
                  </summary>

                  <div className="border-t border-border px-5 py-5 sm:px-6">
                    <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
