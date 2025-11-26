'use client'

import React from 'react'
import Container from './Container'
import { Card } from './ui/card'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { containerStagger, fadeUp } from '@/lib/animations'
import { useTranslations } from 'next-intl';
const Testimonials = () => {
    const t = useTranslations('home.testimonials');
    const testimonials = [
        {
            name: 'Ayşe Demir',
            role: 'Danışan',
            content:
                "Hakan Bey, hukuki sorularımı açık ve anlaşılır bir şekilde yanıtladı. Çok faydalı oldu.",
            rating: 5
        },
        {
            name: 'Ali Yılmaz',
            role: 'Danışan',
            content:
                "İş süreçlerimle ilgili hukuki bilgiler aldım ve süreci daha güvenle yönetebildim.",
            rating: 5
        },
        {
            name: 'Fatma Kaya',
            role: 'Danışan',
            content:
                "Hukuki konular hakkında verdiği bilgilendirme çok açıklayıcıydı ve kafam çok rahatladı.",
            rating: 5
        }
    ];


    return (
        <section className="section-padding bg-secondary/100">
            <Container>
                {/* Başlık Bölümü */}
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

                </motion.div>

                {/* Yorum Kartları */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={containerStagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            variants={fadeUp}
                            transition={{ type: 'spring', stiffness: 200 }}
                            className={"hover:shadow-lg hover:shadow-gray-200 rounded-xl"}
                        >
                            <Card className="card-elegant h-full">
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-accent fill-current" />
                                    ))}
                                </div>
                                <p className="text-muted-foreground mb-4 italic">
                                    &quot;{testimonial.content}&quot;
                                </p>
                                <div>
                                    <div className="font-semibold text-primary">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {testimonial.role}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </Container>
        </section>
    )
}

export default Testimonials
