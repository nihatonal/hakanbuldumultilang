'use client'
import { useLocale, useTranslations } from 'next-intl';
import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Container from './Container'
import { motion } from 'framer-motion'
import { containerStagger, fadeUp } from '@/lib/animations'
import { practicesData } from '@/constants/practiceAreas'
import IconMapper from "@/components/IconMapper";
const HomeServices = () => {
    const locale = useLocale();
    const t = useTranslations('home.services');
    const data = practicesData[locale];

    return (
        <section className="section-padding bg-secondary/100">
            <Container>
                {/* Header Section */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
                        {t("title")}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t("subtitle")}
                    </p>
                </motion.div>

                {/* Cards Section */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={containerStagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    {data.slice(0, 3).map((area, index) => (
                        <motion.div key={index} variants={fadeUp}>
                            <Card className="card-elegant group hover:shadow-accent/20 cursor-pointer">
                                <Link href={`/${locale === "en" ? "services" : "calisma-alanlari"}/${area.slug}`} className="block">
                                    <div className="flex items-center mb-4">
                                        <div className="p-3 bg-accent/10 rounded-lg mr-4 group-hover:bg-accent/20 transition-colors">
                                            <IconMapper name={area.icon} size={32} className="text-accent" />
                                        </div>
                                        <h3 className="font-display text-xl font-semibold text-primary">
                                            {area.title}
                                        </h3>
                                    </div>
                                    <p className="text-muted-foreground mb-4 line-clamp-3">{area.description}</p>
                                    <div className="flex items-center text-accent font-medium group-hover:text-accent-dark transition-colors">
                                        {t("ctaCard")}
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom Button */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <Button asChild size="lg" className="btn-primary">
                        <Link href={t("cta.path")}>{t("cta.label")}</Link>
                    </Button>
                </motion.div>
            </Container>
        </section>
    )
}

export default HomeServices
