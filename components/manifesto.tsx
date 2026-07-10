"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const stats = [
  { value: "CAPRICHO", label: "em cada detalhe, do aro ao teto" },
  { value: "AGILIDADE", label: "seu carro pronto sem enrolação" },
  { value: "CONFIANÇA", label: "quem lava uma vez, volta sempre" },
];

export function Manifesto() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/images/eddie-moto.png"
              alt="Mascote do KVRÃO pilotando uma moto envenenada"
              width={480}
              height={480}
              className="drop-shadow-[0_0_50px_rgba(56,189,248,0.2)]"
            />
          </motion.div>
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 font-serif text-sm tracking-[0.3em] text-primary">
              O KVRÃO
            </p>
            <h2 className="font-serif text-4xl tracking-wide text-foreground text-balance md:text-5xl">
              LAVAGEM NÃO É LUXO. É RESPEITO PELO SEU CARRO.
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground text-pretty">
              O Lava Rápido KVRÃO nasceu na Vila Tesouro com uma missão simples:
              fazer o serviço que os outros não têm coragem de fazer direito.
              Aqui ninguém passa pano em cima de sujeira — a gente arranca ela
              pela raiz. Musica boa na caixa de som, jato de pressão na mão e
              capricho de sobra.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="border-l-2 border-primary pl-4"
              >
                <p className="font-serif text-lg tracking-wider text-primary">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
