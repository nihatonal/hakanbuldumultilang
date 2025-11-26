'use client'
import { useTranslations } from 'next-intl';
import Link from 'next/link'
import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import heroImage from '../assets/images/hero-lawyer.jpg'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { containerStagger, fadeUp } from '@/lib/animations'

const HomeHero = () => {
    const t = useTranslations('home.hero');
    return (
        <section className="relative h-screen flex items-center justify-center text-white px-2 md:px-0">
            {/* Arka Plan */}
            <div className="fixed top-0 left-0 w-full h-screen -z-10 overflow-hidden">
                <Image
                    src={heroImage}
                    alt="avukat burosu hero image"
                    className="object-cover w-full h-full"
                    priority
                    sizes="100vw"
                    width={1920}
                    height={1080}
                />
                <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" />
            </div>


            {/* İçerik */}
            <motion.div
                className="container-max text-center"
                variants={containerStagger}
                initial="hidden"
                animate="show"
                viewport={{ once: true }}
            >
                <motion.div variants={fadeUp}>
                    <Badge className="mb-4 p-2 px-4 bg-accent text-accent-foreground hover:bg-accent">

                        {t('badge')}
                    </Badge>
                </motion.div>

                <motion.div variants={fadeUp}>
                    <h1 className="font-display text-4xl md:text-7xl font-bold mb-6">
                        {t('title')}
                    </h1>
                </motion.div>

                <motion.div variants={fadeUp}>
                    <p className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    variants={containerStagger}
                >
                    <motion.div variants={fadeUp}>
                        <Button asChild size="lg" className="btn-hero">
                            <Link href={t("cta.path")}>
                                {t('cta.label')}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default HomeHero
