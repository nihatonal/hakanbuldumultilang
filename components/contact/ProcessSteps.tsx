'use client'
import React from 'react'
import { Card } from '../ui/card'
import { CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp, containerStagger } from '@/lib/animations'
import { useTranslations } from 'next-intl'

const ProcessSteps = () => {
    const t = useTranslations('contact.processSteps')
    const steps = [] = t.raw('steps');

    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerStagger}
        >
            <motion.div variants={fadeUp} className="mb-8">
                <h2 className="font-display text-3xl font-bold text-primary mb-4">
                    {t('heading')}
                </h2>
                <p className="text-muted-foreground">{t('description')}</p>
            </motion.div>

            <div className="space-y-6">
                {steps.map((step: any, index: number) => (
                    <motion.div key={index} variants={fadeUp}>
                        <Card className="card-elegant">
                            <div className="flex items-start space-x-4">
                                <div className="bg-accent text-accent-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                    {step.step}
                                </div>
                                <div>
                                    <h3 className="font-display text-xl font-semibold text-primary mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-muted-foreground">{step.description}</p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <motion.div variants={fadeUp}>
                <Card className="card-accent mt-8">
                    <div className="flex items-start space-x-4 p-2">
                        <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="font-display text-lg font-semibold text-primary mb-2">
                                {t("infoCard.title")}
                            </h3>
                            <p className="text-muted-foreground text-sm"> {t("infoCard.description")}</p>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </motion.div>
    )
}

export default ProcessSteps
