"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { WHATSAPP_URL } from "@/lib/contact";

export function Hero() {
  return (
    <section
      id="topo"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      {/* Background art */}
      <div className="absolute inset-0">
        <Image
          src="/images/kvrao-art.jpeg"
          alt=""
          fill
          priority
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-20 md:grid-cols-2">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
          >
            <MapPin size={14} />
            Vila Tesouro — São José dos Campos
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-serif text-5xl leading-[1.05] tracking-wide text-foreground text-balance md:text-7xl"
          >
            SEU CARRO CHEGA{" "}
            <span className="text-muted-foreground line-through decoration-destructive">
              SUJO
            </span>
            .
            <br />
            SAI <span className="text-primary">BRILHANDO</span> COMO NOVO.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty"
          >
            Aqui não tem lavagem meia-boca. É jato de pressão, capricho de
            verdade e acabamento pesado. O KVRÃO devolve seu carro como se
            tivesse acabado de sair da loja.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 font-serif text-lg tracking-wider text-primary-foreground transition-transform hover:scale-105"
            >
              <WhatsAppIcon size={20} />
              WHATSAPP
            </a>
            <a
              href="#antes-depois"
              className="rounded-md border border-border bg-secondary px-8 py-4 font-serif text-lg tracking-wider text-secondary-foreground transition-colors hover:border-primary hover:text-primary"
            >
              VER RESULTADO
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 60, rotate: 4 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
          className="relative mx-auto hidden w-full max-w-md md:block"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/images/eddie-carro.png"
              alt="Mascote do KVRÃO lavando um carro preto com jato de água azul"
              width={560}
              height={560}
              priority
              className="drop-shadow-[0_0_40px_rgba(56,189,248,0.25)]"
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#servicos"
        aria-label="Rolar para serviços"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-muted-foreground"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown size={28} />
        </motion.div>
      </motion.a>
    </section>
  );
}
