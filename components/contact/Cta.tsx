"use client"
import React from 'react'
import { Button } from '../ui/button'
import { Phone, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, containerStagger } from '@/lib/animations';
import { SiWhatsapp } from 'react-icons/si';
import { useTranslations } from 'next-intl'
const Cta = () => {
    const t = useTranslations('contact.cta')
    return (
        <section className="section-padding bg-gradient-to-r from-primary to-primary-light text-white">
            <motion.div
                className="container-max text-center"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerStagger}
            >
                <motion.div variants={fadeUp}>
                    <MessageSquare className="h-16 w-16 text-accent mx-auto mb-6" />
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                        {t('title')}
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <motion.div
                    variants={fadeUp}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent-dark">
                        <a href="tel:+905305610034" className="flex items-center justify-center gap-2">
                            <Phone className="h-5 w-5" />
                            {t('cta1.label')}
                        </a>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="bg-[#075E54] border-none text-white hover:bg-white hover:text-primary">
                        <a href="https://wa.me/905305610034" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                            <SiWhatsapp className="h-5 w-5" />
                            {t('cta2.label')}
                        </a>
                    </Button>
                </motion.div>
            </motion.div>
        </section>

    )
}

export default Cta
