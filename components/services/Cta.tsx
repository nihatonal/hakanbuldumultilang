'use client';

import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, containerStagger } from '@/lib/animations';
import { useTranslations } from 'next-intl';
const Cta = () => {
    const t = useTranslations("services")
    return (
        <section className="section-padding bg-gradient-to-r from-primary to-primary-light text-white">
            <motion.div
                className="container-max text-center"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerStagger}
            >
                {/* Başlık ve açıklama */}
                <motion.div variants={fadeUp} className="mb-6">
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                        {t("cta.title")}
                    </h2>
                    <p className="text-xl mb-8 max-w-3xl mx-auto text-white/90">
                        {t("cta.subtitle")}
                    </p>
                </motion.div>

                {/* Buton */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    variants={fadeUp}
                >
                    <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent-dark">
                        <Link href={t("cta.cta.path")} className="flex items-center justify-center gap-2">
                            <Phone className="h-5 w-5" />
                            {t("cta.cta.label")}
                        </Link>
                    </Button>
                </motion.div>
            </motion.div>

        </section>
    );
};

export default Cta;
