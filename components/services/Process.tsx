'use client';

import React from 'react';
import Container from '../Container';
import { motion } from 'framer-motion';
import { fadeUp, containerStagger } from '@/lib/animations';
import { useTranslations } from 'next-intl';

type Steps = {
  title: string;
  description: string;
};
const Process = () => {
  const t = useTranslations("services");
  const stepsItems: Steps[] = t.raw('stepsItems');
  const steps = [
    {
      step: '01',
      title: stepsItems[0].title,
      description: stepsItems[0].description
    },
    {
      step: '02',
      title: stepsItems[1].title,
      description: stepsItems[1].description
    },
    {
      step: '03',
      title: stepsItems[2].title,
      description: stepsItems[2].description
    },
    {
      step: '04',
      title: stepsItems[3].title,
      description: stepsItems[3].description
    }
  ];



  return (
    <section className="section-padding">
      <Container>
        <motion.div
          className="container-max"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerStagger}
        >
          {/* BAŞLIK */}
          <motion.div className="text-center mb-16" variants={fadeUp}>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
              {t("steps.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("steps.subtitle")}
            </p>
          </motion.div>

          {/* ADIMLAR */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {steps.map((process, index) => (
              <motion.div key={index} className="text-center" variants={fadeUp}>
                {/* NUMARA VE ÇİZGİ */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto">
                    {process.step}
                  </div>
                </div>

                {/* METİN */}
                <h3 className="font-display text-xl font-semibold text-primary mb-2">
                  {process.title}
                </h3>
                <p className="text-muted-foreground text-sm">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Process;
