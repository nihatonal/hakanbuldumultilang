'use client';

import React, { useTransition } from 'react';
import { Badge } from '../ui/badge';
import { motion } from 'framer-motion';
import { fadeUp, containerStagger } from '@/lib/animations';
import { useTranslations } from 'next-intl';
const HeroSection = () => {
    const t = useTranslations("services")
    return (
        <section className="section-padding bg-gradient-to-r from-primary to-primary-light text-white">
            <motion.div
                className="container-max text-center"
                variants={containerStagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.div variants={fadeUp}>
                    <Badge className="mb-4 bg-accent text-accent-foreground">
                        {t("hero.badge")}
                    </Badge>
                </motion.div>

                <motion.h1
                    variants={fadeUp}
                    className="font-display text-4xl md:text-6xl font-bold mb-6"
                >
                     {t("hero.title")}
                </motion.h1>

                <motion.p
                    variants={fadeUp}
                    className="text-xl mb-8 max-w-3xl mx-auto text-white/90"
                >
                    {t("hero.subtitle")}
                </motion.p>
            </motion.div>
        </section>
    );
};

export default HeroSection;
