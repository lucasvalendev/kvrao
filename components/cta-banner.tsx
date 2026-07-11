'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { InstagramIcon } from '@/components/instagram-icon'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { INSTAGRAM_URL, WHATSAPP_URL } from '@/lib/contact'

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl border border-primary/30 bg-card px-6 py-14 text-center md:px-16"
        >
          <div className="pointer-events-none absolute -top-8 -left-8 opacity-15">
            <Image src="/images/caveira-agua.png" alt="" width={220} height={220} />
          </div>
          <div className="pointer-events-none absolute -right-8 -bottom-8 opacity-15">
            <Image src="/images/caveira-agua.png" alt="" width={220} height={220} />
          </div>

          <h2 className="relative font-serif text-3xl tracking-wide text-foreground text-balance md:text-5xl">
            SEU CARRO TÁ PEDINDO SOCORRO.
            <br />
            <span className="text-primary">O KVRÃO ATENDE.</span>
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg leading-relaxed text-muted-foreground text-pretty">
            Não deixa a sujeira criar raiz. Passa aqui hoje e sai com o carro mais limpo do bairro.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-10 py-4 font-serif text-lg tracking-wider text-primary-foreground transition-transform hover:scale-105"
            >
              <WhatsAppIcon size={20} />
              BORA LAVAR
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-8 py-4 font-serif text-lg tracking-wider text-secondary-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <InstagramIcon size={20} />
              INSTAGRAM
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
