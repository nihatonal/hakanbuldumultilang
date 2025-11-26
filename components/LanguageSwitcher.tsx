"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const locales = [
    { code: "tr", label: "Tr" },
    { code: "en", label: "En" },
];

const LanguageSwitcher: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [open, setOpen] = useState(false);

    // Mevcut locale
    const currentLocale = pathname?.split("/")[1] || "tr";

    const changeLocale = (locale: string) => {
        const segments = pathname?.split("/") || [];
        segments[1] = locale; // locale segmentini değiştir
        const newPath = segments.join("/") + (searchParams ? `?${searchParams.toString()}` : "");
        router.push(newPath);
        setOpen(false);
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setOpen(!open)}
                className="cursor-pointer bg-gray-50 text-gray-800 hover:text-accent font-medium py-2 px-4 rounded"
            >
                {locales.find((l) => l.code === currentLocale)?.label || "Language"}
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-auto bg-white border rounded shadow-md z-50">
                    {locales
                        .filter((l) => l.code !== currentLocale)
                        .map((locale) => (
                            <button
                                key={locale.code}
                                onClick={() => changeLocale(locale.code)}
                                className="cursor-pointer block w-full rounded text-left px-4 py-2 hover:bg-gray-100"
                            >
                                {locale.label}
                            </button>
                        ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
