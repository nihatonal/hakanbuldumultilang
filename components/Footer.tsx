"use client"
import { useTranslations, useLocale } from 'next-intl';
import { headerData } from '@/constants/data';
import Link from '@/node_modules/next/link';
import { Scale, Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';
import Container from './Container';

const Footer = () => {
    const t = useTranslations("common.footer")
    const locale = useLocale();
    const menuItems = headerData[locale];
    return (
        <footer className="bg-primary text-primary-foreground border-t py-10">
            <Container>
                <div className="container-max section-padding">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Logo and Description */}
                        <div className="lg:col-span-2">
                            <div className="flex space-x-2 mb-4">
                                <Scale className="h-6 w-6 text-accent" />
                                <span className="font-display font-semibold text-xl">{t("title")}</span>
                            </div>
                            <p className="text-primary-foreground/80 mb-4 max-w-md">
                                {t("subtitle")}
                            </p>
                            <div className="flex space-x-4 pointer-events-none">
                                <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                                    <Facebook className="h-5 w-5" />
                                </a>
                                <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                                    <Twitter className="h-5 w-5" />
                                </a>
                                <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                                    <Linkedin className="h-5 w-5" />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="font-display font-semibold text-lg mb-4">{t("quickLinks")}</h3>
                            <div className="space-y-2 flex flex-col">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        className={`text-primary-foreground/80 hover:text-accent transition-colors`}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="font-display font-semibold text-lg mb-4">{t("contact")}</h3>
                            <div className="space-y-3">
                                <div className="flex items-start space-x-3">
                                    <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                                    <span className="text-primary-foreground/80 text-sm">
                                        Atatürk Bulvarı No:123<br />
                                        Çankaya/Ankara
                                    </span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <a href="tel:+905305610034" className="flex items-center space-x-3">
                                        <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                                        <span className="text-primary-foreground/80 text-sm">+90 530 561 00 34</span>
                                    </a>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <a href="mailto:info@hakanbuldu.com" className="flex items-center space-x-3">
                                        <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                                        <span className="text-primary-foreground/80 text-sm">info@hakanbuldu.com</span>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="border-t border-primary-light mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-primary-foreground/60 text-sm">
                            {t("copyrights")}
                        </p>
                        <div className="grid grid-cols-2 lg:grid-cols-4 items-center space-y-2 lg:space-y-0 space-x-6 mt-4 md:mt-0">
                            <a href={t("policy.path")} className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">
                                {t("policy.label")}
                            </a>
                            <a href={t("terms.path")} className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">
                                {t("terms.label")}
                            </a>
                            <a href={t("cookies.path")} className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">
                                {t("cookies.label")}
                            </a>
                            <a href={t("rights.path")} className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">
                                {t("rights.label")}
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </footer >
    );
};

export default Footer;