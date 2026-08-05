"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { headerData } from "@/constants/data";

export default function HeaderMenu() {
  const pathname = usePathname();
  const locale = useLocale();

  const [currentHash, setCurrentHash] = useState("");

  const menuItems = headerData[locale] ?? headerData.tr;

  useEffect(() => {
    const updateHash = () => {
      setCurrentHash(window.location.hash);
    };

    updateHash();

    window.addEventListener("hashchange", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
    };
  }, [pathname]);

  const isActive = (path: string) => {
    const [menuPath, menuHash] = path.split("#");

    /*
     * Hash içeren menüler:
     * /tr#categories
     * /tr#faq
     */
    if (menuHash) {
      return (
        pathname === menuPath &&
        currentHash === `#${menuHash}`
      );
    }

    /*
     * Ana sayfa yalnızca hash yokken aktif olsun.
     */
    if (menuPath === "/tr") {
      return pathname === "/tr" && currentHash === "";
    }

    /*
     * Blog sayfası ve blog detayları:
     * /tr/blog
     * /tr/blog/[slug]
     */
    return (
      pathname === menuPath ||
      pathname.startsWith(`${menuPath}/`)
    );
  };

  return (
    <nav
      aria-label="Ana navigasyon"
      className="hidden h-16 items-center lg:flex"
    >
      <div className="flex items-center gap-8">
        {menuItems.map((item) => {
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`relative py-5 text-sm font-medium transition-colors duration-200 ${
                active
                  ? "text-accent"
                  : "text-foreground hover:text-accent"
              }`}
            >
              {item.label}

              {active && (
                <span className="absolute inset-x-0 bottom-2 h-0.5 rounded-full bg-accent" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}