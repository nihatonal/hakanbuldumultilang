"use client"
import React from 'react'
import Container from '../Container';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';
import ContactMap from './MapFrame';
import { useTranslations } from 'next-intl';

const Map = () => {
    const t = useTranslations('contact.map')
    return (
        <section className="section-padding bg-secondary/30">
            <Container>
                <div className="container-max">
                    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <div className="text-center mb-12">
                            <h2 className="font-display text-3xl font-bold text-primary mb-4">
                                {t('title')}
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                {t('subtitle')}
                            </p>
                        </div>
                    </motion.div>
                    <ContactMap />
                    {/* <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <Card className="card-elegant overflow-hidden">
                            <div className="aspect-video">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3069.285513013939!2d32.8359!3d39.8803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f0f6c2a9c7f%3A0x8c8e9a19b0eaa9c9!2sY%C4%B1ld%C4%B1zevler%20Mahallesi%2C%20Rabindranath%20Tagore%20Cd.%2029%2F10%2C%20%C3%87ankaya%2FAnkara!5e0!3m2!1str!2str!4v1696700000000!5m2!1str!2str"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                          
                        </Card>
                    </motion.div> */}
                </div>
            </Container>
        </section>
    )
}

export default Map
