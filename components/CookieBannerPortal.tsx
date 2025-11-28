// components/CookieBannerPortal.tsx
"use client";

import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CookieBannerPortal() {
    const [visible, setVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    const pathname = usePathname();

    // ---- Locale detection ----
    const locale = pathname?.split("/")[1] === "en" ? "en" : "tr";

    // ---- i18n texts ----
    const t = {
        tr: {
            message:
                "Bu web sitesi çerezleri kullanmaktadır. Siteyi kullanmaya devam ederek çerez kullanımını kabul etmiş olursunuz.",
            policy: "Çerez Politikası",
            accept: "Kabul Et",
            policyPath: "/cerez-politikasi",
        },
        en: {
            message:
                "This website uses cookies. By continuing to browse the site, you accept the use of cookies.",
            policy: "Cookies Policy",
            accept: "Accept",
            policyPath: "/cookies-policy",
        },
    };

    useEffect(() => {
        const consent = localStorage.getItem("cookie_consent");
        if (!consent) setVisible(true);
        setMounted(true);
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookie_consent", "true");
        setVisible(false);
    };

    if (!mounted || !visible) return null;

    return ReactDOM.createPortal(
        <div className="fixed bottom-0 left-0 w-full z-50 bg-gray-900 text-white text-sm p-4 shadow-md">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-center md:text-left">{t[locale].message}</p>

                <div className="flex items-center gap-4 justify-center md:justify-end">
                    <Link
                        href={`/${locale}${t[locale].policyPath}`}
                        className="underline text-blue-300 hover:text-blue-200"
                    >
                        {t[locale].policy}
                    </Link>

                    <button
                        onClick={acceptCookies}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        {t[locale].accept}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
