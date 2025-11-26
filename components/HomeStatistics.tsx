'use client';
import { useTranslations } from 'next-intl';
import { staticsData } from '@/constants/data';
import React from 'react';
import Container from './Container';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const HomeStatistics = () => {
    const t = useTranslations('home.stats');
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3, // Yüzde kaç görünürse tetiklensin
    });

    return (
        <section
            ref={ref}
            className="bg-gradient-to-r from-primary to-primary-light text-white py-16"
        >
            <Container>
                <div className="container-max">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {staticsData.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: index * 0.2, duration: 0.5 }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                                    {inView ? (
                                        <CountUp end={parseFloat(stat.value)} duration={2} separator="," />
                                    ) : (
                                        0
                                    )}
                                    {stat.type === "percentage" ? "%" : "+"}
                                </div>
                                <div className="text-white/80">{t(stat.label)}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default HomeStatistics;
