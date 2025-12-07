"use client"
import React from 'react'
import { Card } from '../ui/card'
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Container from '../Container';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
const Info = () => {
    const t = useTranslations('contact.info');
    const contactInfo = [
        {
            icon: Phone,
            title: t("phone.title"),
            details: ['+90 530 561 00 34'],
            description: t("phone.desc")
        },
        {
            icon: Mail,
            title: t("mail.title"),
            details: ['info@hakanbuldu.com'],
            description: t("mail.desc")
        },
        {
            icon: MapPin,
            title: t("address.title"),
            details: ['Yıldızevler mah. Rabindranath Tagore Cad. 29/10', 'Çankaya/Ankara'],
            description: t("address.desc"),
        },
        {
            icon: Clock,
            title: t("availablity.title"),
            details: [
                `${t("availablity.dates")}: 09:00-18:00`,
                `${t("availablity.dates2")}: 09:00-14:00`
            ],
            description: t("availablity.desc")
        }

    ];

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.15, type: "spring", stiffness: 50 }
        })
    }

    return (
        <section className="section-padding bg-secondary/30">
            <Container>
                <div className="container-max grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contactInfo.map((info, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={cardVariants}
                        >
                            <Card className="card-elegant text-center hover:-translate-y-1 hover:shadow-lg transition-transform duration-300">
                                <div className="p-4 bg-accent/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <info.icon className="h-8 w-8 text-accent" />
                                </div>
                                <h3 className="font-display text-xl font-semibold text-primary mb-3">
                                    {info.title}
                                </h3>
                                <div className="space-y-1 mb-3">
                                    {info.details.map((detail, detailIndex) => {
                                        const isPhone = info.title === 'Telefon';
                                        const isEmail = info.title === 'E-posta';
                                        return (
                                            <p key={detailIndex} className="text-foreground font-medium">
                                                {(isPhone || isEmail) ? (
                                                    <a
                                                        href={isPhone ? `tel:${detail.replace(/\s+/g, '')}` : `mailto:${detail}`}
                                                        className="hover:underline"
                                                    >
                                                        {detail}
                                                    </a>
                                                ) : detail}
                                            </p>
                                        )
                                    })}
                                </div>
                                <p className="text-muted-foreground text-sm">{info.description}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    )
}

export default Info
