"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Phone } from "lucide-react";
import { Badge } from "../ui/badge";
import lawyerPortrait from "@/assets/images/avukat-odasi.webp";
import Container from "../Container";
import { motion } from "framer-motion";
import { fadeUp, containerStagger } from "@/lib/animations";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-primary-light text-white">
      <Container>
        <motion.div
          variants={containerStagger}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 md:gap-12 pb-12 md:pb-0"
        >
          {/* METİN BLOĞU */}
          <motion.div
            variants={containerStagger}
            className="flex flex-col justify-center items-start md:min-h-screen md:py-20 py-12"
          >
            <motion.div variants={fadeUp}>
              <Badge className="mb-4 bg-accent text-accent-foreground">
                Tarafsız & Bilgilendirici
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl md:text-6xl font-bold mb-6"
            >
              Hakan Buldu
            </motion.h1>

            <motion.p variants={fadeUp} className="text-xl mb-8 text-white/90">
              15 yılı aşkın hukuk tecrübemle, hukuki süreçlere ilişkin doğru
              bilgi paylaşımı ve yönlendirme sağlıyorum. Her bireyin haklarını
              bilinçli biçimde koruyabilmesi için tarafsız ve güven temelli
              rehberlik sunuyorum.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent-dark"
              >
                <Link href="/iletisim">
                  <Phone className="mr-2 h-5 w-5" />
                  İletişime Geçin
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
              >
                <Link href="/calisma-alanlari">Çalışma Alanları</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* GÖRSEL BLOĞU */}
          <motion.div
            variants={fadeUp}
            className="relative flex justify-center"
          >
            <div className="md:sticky md:top-24 self-start w-full max-w-[400px] rounded-2xl shadow-elegant overflow-hidden aspect-[3/4]">
              <Image
                src={lawyerPortrait}
                alt="Hakan Buldu"
                fill
                sizes="100vw"
                className="object-cover rounded-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default HeroSection;
