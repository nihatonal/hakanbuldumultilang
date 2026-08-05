import { ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import Container from "@/components/Container";

export default function BlogHero() {
  return (
    <section className="relative isolate overflow-hidden bg-primary text-primary-foreground md:px-12">
      {/* Arka plan dekorasyonu */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-44 -top-44 h-[520px] w-[520px] rounded-full border border-white/10" />

        <div className="absolute -bottom-72 -left-48 h-[620px] w-[620px] rounded-full border border-white/10" />

        <div className="absolute right-[14%] top-[18%] h-2 w-2 rounded-full bg-accent" />

        <div className="absolute bottom-[18%] right-[32%] h-px w-32 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
      </div>

      <Container>
        <div className="relative flex min-h-[calc(100svh-80px)] items-center py-20 md:min-h-[720px] md:py-28 lg:min-h-[780px]">
          <div className="max-w-5xl">
            {/* Eyebrow */}
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-accent" />

              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent md:text-sm">
                Hukuk · Mevzuat · Güncel Değerlendirmeler
              </p>
            </div>

            {/* Başlık */}
            <h1 className="max-w-5xl text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-5xl md:text-6xl lg:text-[76px]">
              Hukuki gelişmeleri
              <span className="block text-white/60">
                açık ve anlaşılır bir dille
              </span>
              takip edin.
            </h1>

            {/* Açıklama */}
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8 md:mt-9">
              Güncel mevzuat, yargı kararları ve uygulamada merak edilen
              hukuki konular üzerine hazırlanmış güvenilir değerlendirmeler.
            </p>

            {/* Butonlar */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-11">
              <Link
                href="/blog"
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-accent px-7 py-4 font-semibold text-accent-foreground shadow-accent transition duration-300 hover:-translate-y-0.5 hover:bg-accent-light"
              >
                Tüm Yazıları İncele

                <ArrowUpRight
                  aria-hidden="true"
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <a
                href="#latest-articles"
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-xl border border-white/20 px-7 py-4 font-semibold text-white transition duration-300 hover:border-white/35 hover:bg-white/10"
              >
                Son Yazılara Git

                <ArrowDown
                  aria-hidden="true"
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-1"
                />
              </a>
            </div>

            {/* Alt bilgi */}
            <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm text-white/50 md:mt-16">
              <span>Güncel hukuki içerikler</span>
              <span className="hidden h-1 w-1 rounded-full bg-accent sm:block" />
              <span>Uzman değerlendirmeleri</span>
              <span className="hidden h-1 w-1 rounded-full bg-accent sm:block" />
              <span>Sade ve anlaşılır anlatım</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}