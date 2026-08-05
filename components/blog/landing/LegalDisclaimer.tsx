import { Info } from "lucide-react";

import Container from "@/components/Container";

export default function LegalDisclaimer() {
  return (
    <section className="bg-background pb-16 pt-4 md:pb-24">
      <Container>
        <div className="flex flex-col gap-5 rounded-2xl border border-border bg-secondary/60 p-6 sm:flex-row sm:items-start md:p-8">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Info
              aria-hidden="true"
              className="h-5 w-5"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-primary">
              Hukuki bilgilendirme
            </h2>

            <p className="mt-2 max-w-5xl text-sm leading-7 text-muted-foreground">
              Bu internet sitesinde yer alan yazılar ve açıklamalar genel
              bilgilendirme amacıyla hazırlanmıştır. İçerikler hukuki görüş,
              danışmanlık veya somut bir uyuşmazlığa yönelik profesyonel
              değerlendirme niteliği taşımaz. Her hukuki durum kendi özel
              koşulları içerisinde değerlendirilmelidir.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}