"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Armchair, Droplets, Gem, Scooter, Sparkles, Zap } from "lucide-react";

const services = [
  {
    icon: Droplets,
    title: "Lavagem Completa",
    description:
      "Externa e interna, com jato de pressão, shampoo automotivo e secagem caprichada. O básico bem feito — que aqui de básico não tem nada.",
  },
  {
    icon: Armchair,
    title: "Higienização Completa",
    description:
      "Banco, carpete, teto, painel e portas — tudo higienizado com extração profunda. Tira sujeira, mancha e cheiro ruim. Seu carro volta a parecer zero km.",
  },
  {
    icon: Sparkles,
    title: "Polimento",
    description:
      "Acabamento profissional que remove riscos leves e devolve o brilho espelhado da pintura. Carro sai refletindo até a inveja do vizinho.",
  },
  {
    icon: Gem,
    title: "Enceramento e Cristalização",
    description:
      "Cera que encera e cristaliza numa tacada só — proteção na pintura, brilho duradouro e repelência à água. Carro protegido e com cara de vitrine.",
  },
  {
    icon: Scooter,
    title: "Lavagem de Motos",
    description:
      "Tratamento especial para as duas rodas. Lavagem detalhada, corrente, aros e brilho no tanque. Moto do KVRÃO anda limpa.",
  },
  {
    icon: Zap,
    title: "Pacote Pesado",
    description:
      "O combo completo: lavagem, higienização, polimento e mais. Pra quem não faz nada pela metade. O serviço mais brabo da Vila Tesouro.",
  },
];

export function Services() {
  return (
    <section id="servicos" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 font-serif text-sm tracking-[0.3em] text-primary">
            SERVIÇOS
          </p>
          <h2 className="font-serif text-4xl tracking-wide text-foreground text-balance md:text-5xl">
            AQUI A SUJEIRA NÃO TEM VEZ
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground text-pretty">
            Do carro de família à moto envenenada. Cada serviço feito com o
            mesmo capricho, sem enrolação.
          </p>
        </motion.div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {services.map((service) => (
            <article
              key={service.title}
              className="group flex w-[85%] shrink-0 snap-center flex-col items-center justify-center rounded-lg border border-border bg-card px-6 py-10 text-center transition-colors hover:border-primary/50"
            >
              <div className="mb-4 inline-flex rounded-md bg-primary/10 p-4 text-primary transition-transform group-hover:scale-110">
                <service.icon size={32} aria-hidden="true" />
              </div>
              <h3 className="mb-2 font-serif text-xl tracking-wide text-card-foreground">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </article>
          ))}
        </div>

        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-lg border border-border bg-card px-6 py-[90px] transition-colors hover:border-primary/50 flex flex-col items-center justify-center text-center"
            >
              <div className="mb-4 inline-flex rounded-md bg-primary/10 p-4 text-primary transition-transform group-hover:scale-110">
                <service.icon size={32} aria-hidden="true" />
              </div>
              <h3 className="mb-2 font-serif text-xl tracking-wide text-card-foreground">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pointer-events-none -mt-3 -mb-24 flex justify-end"
        >
          <Image
            src="/images/eddie-jato.png"
            alt=""
            width={432}
            height={432}
            className="opacity-60 mix-blend-screen"
          />
        </motion.div>
      </div>
    </section>
  );
}
