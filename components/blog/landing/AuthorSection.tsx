import {
  ArrowUpRight,
  Check,
  Mail,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Container from "@/components/Container";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const AUTHOR_QUERY = `
  coalesce(
    *[
      _type == "author" &&
      isPrimary == true
    ][0],

    *[
      _type == "author"
    ][0]
  ) {
    _id,
    name,
    title,
    photo,
    shortBio,
    experienceYears,
    expertise,
    quote,
    email,
    phone
  }
`;

interface Author {
  _id: string;
  name: string;
  title: string;
  shortBio: string;
  experienceYears?: number;
  expertise?: string[];
  quote?: string;
  email?: string;
  phone?: string;
  photo?: {
    alt?: string;
    asset?: {
      _ref?: string;
      _type?: string;
    };
  };
}

async function getAuthor(): Promise<Author | null> {
  try {
    return await client.fetch<Author | null>(AUTHOR_QUERY);
  } catch (error) {
    console.error("Yazar bilgileri alınamadı:", error);
    return null;
  }
}

export default async function AuthorSection() {
  const author = await getAuthor();

  if (!author) {
    return null;
  }

  const imageUrl = author.photo
    ? urlFor(author.photo)
        .width(900)
        .height(1100)
        .quality(90)
        .url()
    : null;

  return (
    <section id="author" className="section-padding bg-page-background">
      <Container>
        <div className="grid overflow-hidden rounded-3xl border border-border bg-white shadow-card lg:grid-cols-[0.85fr_1.15fr]">
          {/* Fotoğraf */}
          <div className="relative min-h-[420px] overflow-hidden bg-secondary lg:min-h-[680px]">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={author.photo?.alt || author.name}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 gradient-primary" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-primary/65 via-transparent to-transparent" />

            {author.experienceYears !== undefined && (
              <div className="absolute bottom-6 left-6 rounded-2xl border border-white/20 bg-primary/75 px-5 py-4 text-white backdrop-blur-md">
                <p className="text-3xl font-semibold">
                  {author.experienceYears}+
                </p>

                <p className="mt-1 text-sm text-white/65">
                  Yıllık deneyim
                </p>
              </div>
            )}
          </div>

          {/* İçerik */}
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14 xl:p-16">
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-accent-dark" />

              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-dark">
                Yazarı tanıyın
              </p>
            </div>

            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.025em] text-primary md:text-4xl lg:text-5xl">
              {author.name}
            </h2>

            <p className="mt-3 font-medium text-primary-light">
              {author.title}
            </p>

            {author.quote && (
              <blockquote className="mt-7 border-l-2 border-accent pl-5 text-xl font-medium leading-8 text-primary">
                “{author.quote}”
              </blockquote>
            )}

            <p className="mt-7 text-base leading-8 text-muted-foreground">
              {author.shortBio}
            </p>

            {author.expertise && author.expertise.length > 0 && (
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {author.expertise.slice(0, 6).map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm font-medium text-primary"
                  >
                    <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-accent/20 text-accent-dark">
                      <Check
                        aria-hidden="true"
                        className="h-3.5 w-3.5"
                      />
                    </span>

                    {item}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/about"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-primary-light"
              >
                Hakkında

                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              {author.email && (
                <a
                  href={`mailto:${author.email}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 font-semibold text-primary transition hover:bg-secondary"
                >
                  <Mail
                    aria-hidden="true"
                    className="h-4 w-4"
                  />

                  E-posta
                </a>
              )}

              {author.phone && (
                <a
                  href={`tel:${author.phone.replace(/\s+/g, "")}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 font-semibold text-primary transition hover:bg-secondary"
                >
                  <Phone
                    aria-hidden="true"
                    className="h-4 w-4"
                  />

                  Telefon
                </a>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}