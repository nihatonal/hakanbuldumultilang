//import Logo from "@/components/Logo";
import Image from "@/node_modules/next/image";
//import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <main className="min-h-screen w-full grid place-items-center bg-gradient-to-br from-slate-100 via-slate-100 to-slate-200 px-6">
      <div className="max-w-xl w-full text-center">
        {/* Image */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/maintenance.png"
            alt="Site under maintenance"
            width={320}
            height={320}
            priority
            className="mx-auto"
          />
        </div>

        {/* Badge */}
        <span className="inline-block mb-4 rounded-full bg-yellow-400/10 px-4 py-1 text-sm font-medium text-yellow-400">
          🚧 Bakım Modu
        </span>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-4">
          Site şu anda geliştirme aşamasında
        </h1>

        {/* Description */}
        <p className="text-slate-400 text-base md:text-lg leading-relaxed">
          Daha iyi bir deneyim sunabilmek için üzerinde çalışıyoruz.
          Çok yakında tekrar yayında olacağız.
        </p>
      </div>
    </main>
    // <div className="bg-background flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-10 md:py-32 min-h-screen">
    //   <div className="max-w-md w-full space-y-8 text-center">
    //     <Logo />

    //     <h2 className="mt-6 text-3xl font-extrabold text-foreground">
    //       Aradığınız sayfa bulunamadı
    //     </h2>
    //     <p className="mt-2 text-sm text-muted-foreground">
    //       Üzgünüz, girdiğiniz web adresi sitemizde mevcut değil.
    //       Lütfen aşağıdaki seçeneklerden birini kullanın.
    //     </p>

    //     <div className="mt-8 space-y-4">
    //       <Link
    //         href="/"
    //         className="w-full inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-semibold text-primary-foreground gradient-primary shadow-elegant hover:bg-primary-light transition"

    //       >
    //         Ana Sayfaya Dön
    //       </Link>
    //     </div>

    //     <p className="mt-8 text-sm text-muted-foreground">
    //       Daha fazla yardım için{" "}
    //       <Link
    //         href="/iletisim"
    //         className="font-medium text-accent hover:text-accent-dark"

    //       >
    //         bizimle iletişime geçin
    //       </Link>
    //       .
    //     </p>
    //   </div>
    // </div>
  );
};

export default NotFoundPage;
