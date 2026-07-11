"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Navigation } from "lucide-react";
import { InstagramIcon } from "@/components/instagram-icon";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/contact";

const ADDRESS =
  "Estrada Municipal Martins Guimarães, 190 - Vila Tesouro - São José dos Campos - SP, 12221-520";

const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`;
const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`;

export function Location() {
  return (
    <section
      id="como-chegar"
      className="border-t border-border bg-card/40 py-24"
    >
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 font-serif text-sm tracking-[0.3em] text-primary">
            LOCALIZAÇÃO
          </p>
          <h2 className="font-serif text-4xl tracking-wide text-foreground text-balance md:text-5xl">
            COLA AQUI NA VILA TESOURO
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground text-pretty">
            Fácil de chegar, difícil de esquecer. Aponta o GPS e vem que o KVRÃO
            resolve.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center gap-6 lg:col-span-2"
          >
            <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-5">
              <div className="rounded-md bg-primary/10 p-3 text-primary">
                <MapPin size={24} aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-serif text-lg tracking-wide text-card-foreground">
                  Endereço
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Estrada Municipal Martins Guimarães, 190
                  <br />
                  Vila Tesouro — São José dos Campos/SP
                  <br />
                  CEP 12.221-520
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-5">
              <div className="rounded-md bg-primary/10 p-3 text-primary">
                <Clock size={24} aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-serif text-lg tracking-wide text-card-foreground">
                  Horário
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Segunda a sábado — 8h30 às 17h30
                  <br />
                  Domingo — fechado (até o KVRÃO descansa)
                </p>
              </div>
            </div>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/50"
            >
              <div className="rounded-md bg-primary/10 p-3 text-primary">
                <InstagramIcon size={24} />
              </div>
              <div>
                <h3 className="font-serif text-lg tracking-wide text-card-foreground">
                  Instagram
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  @lavarapido_kvrao
                  <br />
                  Fotos, bastidores e promo do KVRÃO
                </p>
              </div>
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/50"
            >
              <div className="rounded-md bg-primary/10 p-3 text-primary">
                <WhatsAppIcon size={24} />
              </div>
              <div>
                <h3 className="font-serif text-lg tracking-wide text-card-foreground">
                  WhatsApp
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  (12) 98848-1898
                  <br />
                  Agenda direto com o KVRÃO
                </p>
              </div>
            </a>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-8 py-4 font-serif text-lg tracking-wider text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                <WhatsAppIcon size={20} />
                WHATSAPP
              </a>
              <a
                href={mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-border bg-secondary px-8 py-4 font-serif text-lg tracking-wider text-secondary-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Navigation size={20} aria-hidden="true" />
                COMO CHEGAR
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-lg border border-border lg:col-span-3"
          >
            <iframe
              src={mapsEmbedUrl}
              title="Mapa do Lava Rápido KVRÃO em São José dos Campos"
              className="h-[400px] w-full lg:h-full lg:min-h-[460px]"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
