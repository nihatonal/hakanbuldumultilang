
import CookieBannerPortal from "@/components/CookieBannerPortal";
import { Toaster } from "@/components/ui/toaster";
import Script from "@/node_modules/next/script";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";
import "./globals.css";

const siteUrl = "https://www.hakanbuldu.com";
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Hakan Buldu",
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/arama?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};
const legalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Hakan Buldu Hukuk Bürosu",
  image: `${siteUrl}/images/hakan-buldu.jpg`, // varsa avukatın fotoğrafı
  url: siteUrl,
  description:
    "Ceza, idare, iş ve aile hukuku alanlarında uzmanlığı",
  areaServed: "TR",
  address: {
    "@type": "PostalAddress",
    addressLocality: "İstanbul",
    addressCountry: "TR"
  },
  telephone: "+90 530 561 00 34", // Gerçek numarayla değiştir
  priceRange: "$$", // Orta segment
  founder: {
    "@type": "Person",
    name: "Hakan Buldu"
  },
  employee: {
    "@type": "Person",
    name: "Hakan Buldu"
  },
  sameAs: [
    "https://www.linkedin.com/in/...",
    "https://www.instagram.com/...",
    "https://www.avukatlar.org/..."
  ],
  legalName: "Hakan Buldu Hukuk Bürosu"
};
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#9F8CFD" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />

        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname
                  });
                `,
              }}
            />
          </>
        )}

        <Script type="application/ld+json" id="website-jsonld">
          {JSON.stringify(websiteJsonLd)}
        </Script>
        <Script type="application/ld+json" id="legalservice-jsonld">
          {JSON.stringify(legalServiceJsonLd)}
        </Script>
      </head>

      <body className="font-poppins antialiased">
        <CookieBannerPortal />
        {children}
        <Toaster />
      </body>
    </html>

  );
};
export default RootLayout;
