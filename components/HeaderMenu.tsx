"use client";
import { useLocale } from 'next-intl';
import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const HeaderMenu = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const menuItems = headerData[locale];

  return (
    <nav className="flex items-center justify-between h-16">
      <div className="hidden lg:flex items-center space-x-8">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`font-medium transition-colors duration-200 ${pathname === item?.path
              ? 'text-accent font-semibold'
              : 'text-foreground hover:text-accent'
              }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default HeaderMenu;
