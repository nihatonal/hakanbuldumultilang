'use client';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from './ui/button';
import { headerData } from '@/constants/data';
import { usePathname } from '@/node_modules/next/navigation';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function MobileMenu() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const locale = useLocale();
    const t = useTranslations("common")
    const menuItems = headerData[locale];

    return (
        <>
            {/* Hamburger Button */}
            <button
                onClick={toggleMenu}
                aria-label="mobile menu hamburger button"
                className="lg:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1 focus:outline-none z-50"
            >
                <motion.span
                    animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                    className={`block w-8 h-0.5  ${!isOpen ? "bg-primary" : "bg-background"} rounded`}
                />
                <motion.span
                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                    className={`block w-8 h-0.5  ${!isOpen ? "bg-primary" : "bg-background"} rounded`}
                />
                <motion.span
                    animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                    className={`block w-8 h-0.5  ${!isOpen ? "bg-primary" : "bg-background"} rounded`}
                />
            </button>

            {/* Sidebar + Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            onClick={toggleMenu}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black z-40"
                        />

                        {/* Sidebar */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed top-16 left-0 h-screen w-full shadow-lg z-50 flex flex-col "
                        >

                            <div className='absolute h-screen w-full top-0 right-0 bg-black/70 z-60'></div>
                            <div className='relative z-70 w-64 h-screen bg-background p-6 gap-4'>
                                <nav className='flex flex-col p-6 gap-4'>
                                    {menuItems.map((item) => (
                                        <Link
                                            key={item.path}
                                            href={item.path}
                                            onClick={toggleMenu}
                                            className={`font-medium transition-colors duration-200 ${pathname === item?.path
                                                ? 'text-accent font-semibold'
                                                : 'text-foreground hover:text-accent'
                                                }`}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </nav>
                                <Button asChild className="btn-hero">
                                    <Link href={t("consultation.path")}>{t("consultation.label")}</Link>
                                </Button>
                                {/* Alt İletişim Bilgileri */}
                                <div className="border-t border-border pt-6 mt-6">
                                    <p className="text-base font-bold text-foreground mb-4 tracking-wide">
                                        Hakan Buldu
                                    </p>
                                    <div className="space-y-3 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-3">
                                            <Phone className="w-4 h-4 text-accent" />
                                            <a
                                                href="tel:05305610034"
                                                className="hover:text-accent transition-colors"
                                            >
                                                +90 530 561 00 34
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Mail className="w-4 h-4 text-accent" />
                                            <a
                                                href="mailto:info@hakanbuldu.com"
                                                className="hover:text-accent transition-colors"
                                            >
                                                info@hakanbuldu.com
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <MapPin className="w-4 h-4 text-accent" />
                                            <span>Ankara, Türkiye</span>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
