import {
  ArrowUpRight,
  Mail,
  Phone,
  Scale,
} from "lucide-react";

import Container from "@/components/Container";
import { client } from "@/sanity/lib/client";

const CONTACT_QUERY = `
  coalesce(
    *[
      _type == "author" &&
      isPrimary == true
    ][0],

    *[
      _type == "author"
    ][0]
  ) {
    name,
    email,
    phone
  }
`;

interface ContactInformation {
  name?: string;
  email?: string;
  phone?: string;
}

async function getContactInformation():
  Promise<ContactInformation | null> {
  try {
    return await client.fetch<ContactInformation | null>(
      CONTACT_QUERY,
    );
  } catch (error) {
    console.error("İletişim bilgileri alınamadı:", error);
    return null;
  }
}

export default async function ContactCta() {
  const contact = await getContactInformation();

  if (!contact?.email && !contact?.phone) {
    return null;
  }

  const normalizedPhone =
    contact.phone?.replace(/[^\d+]/g, "") ?? "";

  return (
    <section className="section-padding bg-page-background">
      <Container>
        <div className="relative isolate overflow-hidden rounded-3xl bg-primary px-6 py-12 text-primary-foreground shadow-elegant sm:px-10 md:py-16 lg:px-16">
          {/* Dekorasyon */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border border-white/10" />
            <div className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full border border-white/10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(255,255,255,0.08),transparent_35%)]" />
          </div>

          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <Scale
                  aria-hidden="true"
                  className="h-5 w-5 text-accent"
                />

                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                  İletişim
                </p>
              </div>

              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.025em] text-white md:text-4xl lg:text-5xl">
                Hukuki bir konuda bilgiye mi ihtiyacınız var?
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">
                İncelediğiniz içerikler genel bilgilendirme amacı
                taşımaktadır. Somut durumunuza ilişkin değerlendirme
                ihtiyacınız varsa iletişim kanalları üzerinden
                ulaşabilirsiniz.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              {contact.phone && (
                <a
                  href={`tel:${normalizedPhone}`}
                  className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-accent px-6 py-4 font-semibold text-accent-foreground transition hover:bg-accent-light"
                >
                  <Phone
                    aria-hidden="true"
                    className="h-5 w-5"
                  />

                  Telefonla Ulaşın
                </a>
              )}

              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-xl border border-white/20 px-6 py-4 font-semibold text-white transition hover:border-white/35 hover:bg-white/10"
                >
                  <Mail
                    aria-hidden="true"
                    className="h-5 w-5"
                  />

                  E-posta Gönder

                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}