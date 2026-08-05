import {
  BookOpenText,
  Mail,
  Phone,
  Scale,
} from "lucide-react";
import Link from "next/link";

import Container from "./Container";

const quickLinks = [
  {
    label: "Ana Sayfa",
    href: "/tr",
  },
  {
    label: "Tüm Yazılar",
    href: "/blog",
  },
  {
    label: "Hukuk Kategorileri",
    href: "/tr#categories",
  },
  {
    label: "Yazarı Tanıyın",
    href: "/tr#author",
  },
];

const legalLinks = [
  {
    label: "Gizlilik Politikası",
    href: "/tr/gizlilik-politikasi",
  },
  {
    label: "Kullanım Şartları",
    href: "/tr/kullanim-sartlari",
  },
  {
    label: "Çerez Politikası",
    href: "/tr/cerez-politikasi",
  },
  {
    label: "Telif ve Marka Hakları",
    href: "/tr/telif-ve-marka-haklari",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-primary text-primary-foreground md:px-12">
      <Container>
        {/* Ana footer alanı */}
        <div className="grid grid-cols-1 gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.5fr_0.75fr_1fr] lg:gap-16 lg:py-20">
          {/* Marka ve açıklama */}
          <div>
            <Link
              href="/tr"
              className="inline-flex items-center gap-3"
              aria-label="Hakan Buldu ana sayfa"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5">
                <Scale
                  aria-hidden="true"
                  className="h-5 w-5 text-accent"
                />
              </span>

              <span className="font-display text-xl font-semibold text-white">
                Hakan Buldu
              </span>
            </Link>

            <p className="mt-5 max-w-lg text-sm leading-7 text-white/65 sm:text-base">
              Hukuki süreçler, güncel mevzuat ve temel haklar hakkında doğru,
              anlaşılır ve güvenilir bilgilere ulaşabileceğiniz bağımsız hukuk
              yayın platformu.
            </p>

            <div className="mt-7 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <BookOpenText
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 flex-none text-accent"
              />

              <p className="text-sm leading-6 text-white/60">
                Yayınlanan içerikler genel bilgilendirme amacı taşır ve
                hukuki danışmanlık niteliğinde değildir.
              </p>
            </div>
          </div>

          {/* Hızlı bağlantılar */}
          <nav aria-label="Footer hızlı bağlantılar">
            <h2 className="font-display text-lg font-semibold text-white">
              Hızlı Bağlantılar
            </h2>

            <div className="mt-5 flex flex-col items-start gap-3">
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/65 transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* İletişim */}
          <div>
            <h2 className="font-display text-lg font-semibold text-white">
              İletişim
            </h2>

            <div className="mt-5 space-y-4">
              <a
                href="tel:+905305610034"
                className="group flex items-center gap-3"
              >
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-white/10 bg-white/5">
                  <Phone
                    aria-hidden="true"
                    className="h-4 w-4 text-accent"
                  />
                </span>

                <span className="text-sm text-white/65 transition-colors group-hover:text-white">
                  +90 530 561 00 34
                </span>
              </a>

              <a
                href="mailto:info@hakanbuldu.com"
                className="group flex items-center gap-3"
              >
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-white/10 bg-white/5">
                  <Mail
                    aria-hidden="true"
                    className="h-4 w-4 text-accent"
                  />
                </span>

                <span className="break-all text-sm text-white/65 transition-colors group-hover:text-white">
                  info@hakanbuldu.com
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Alt footer alanı */}
        <div className="border-t border-white/10 py-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm text-white/50">
              © {currentYear} Hakan Buldu. Tüm hakları saklıdır.
            </p>

            <nav
              aria-label="Yasal bağlantılar"
              className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:flex lg:items-center"
            >
              {legalLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/50 transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </Container>
    </footer>
  );
}