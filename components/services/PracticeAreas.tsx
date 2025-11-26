'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import {
    CheckCircle,
    ArrowRight
} from 'lucide-react';
import Container from '../Container';
import { motion } from 'framer-motion';
import { fadeUp, containerStagger } from '@/lib/animations';
import Link from '@/node_modules/next/link';
import { practicesData } from '@/constants/practiceAreas';
const PracticeAreas = () => {
    const locale = useLocale();
    const data = practicesData[locale];
    return (
        <section className="section-padding">
            <Container>
                <motion.div
                    className="container-max"
                    variants={containerStagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <div
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {data.map((area, index) => (
                            <motion.div key={index} variants={fadeUp}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.2 }}
                            >
                                <Card className="card-elegant relative hover:shadow-accent/20 h-full">
                                    {/* İKON - SOL ÜST KÖŞEDE */}
                                    <div className="absolute top-4 right-4 p-2.5 bg-accent/10 rounded-md z-10">
                                        <area.icon className="h-8 w-8 text-accent" />
                                    </div>

                                    {/* ANA İÇERİK */}
                                    <div className="p-4 flex flex-col h-full">
                                        <h3 className="font-display text-xl sm:text-2xl font-bold text-primary mb-3">
                                            {area.title}
                                        </h3>

                                        <p className="text-muted-foreground text-sm sm:text-base mb-4">
                                            {area.description}
                                        </p>

                                        <div className="mb-4">
                                            <h4 className="font-semibold text-primary text-sm sm:text-base mb-2">Hizmet Alanları:</h4>
                                            <ul className="space-y-1">
                                                {area.services.map((service, i) => (
                                                    <li
                                                        key={i}
                                                        className="flex items-start text-sm text-muted-foreground"
                                                    >
                                                        <CheckCircle className="h-4 w-4 text-accent mt-0.5 mr-2 flex-shrink-0" />
                                                        {service}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="mt-auto pt-2">
                                            <Badge variant="secondary" className="text-xs">
                                                {area.experience}
                                            </Badge>
                                        </div>
                                        <Link href={`/calisma-alanlari/${area.slug}`} className=" flex items-center py-2 px-4 rounded-full mt-8 md:mt-0 ml-auto bg-accent/80 cursor-pointer text-accent text-white hover:bg-accent/100">
                                            Detaylar <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </div>
                                </Card>


                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </Container>
        </section>
    );
};

export default PracticeAreas;
