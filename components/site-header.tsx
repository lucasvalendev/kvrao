'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { InstagramIcon } from '@/components/instagram-icon'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { INSTAGRAM_URL, WHATSAPP_URL } from '@/lib/contact'


const links = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#antes-depois', label: 'Antes & Depois' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#como-chegar', label: 'Como Chegar' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#topo" className="flex items-center gap-2">
          <Image
            src="/images/caveira-agua.png"
            alt="Caveira azul do KVRÃO"
            width={40}
            height={40}
            className="animate-drip"
          />
          <span className="font-serif text-xl tracking-wider text-foreground">
            LAVA RÁPIDO <span className="text-primary">KVRÃO</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
            aria-label="Instagram do Lava Rápido KVRÃO"
          >
            <InstagramIcon size={20} />
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-transform hover:scale-105"
          >
            <WhatsAppIcon size={16} />
            AGENDAR
          </a>
        </nav>

        <button
          type="button"
          className="text-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 py-4 md:hidden" aria-label="Menu móvel">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <InstagramIcon size={18} />
              Instagram
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-bold text-primary-foreground"
            >
              <WhatsAppIcon size={18} />
              Agendar no WhatsApp
            </a>
          </div>
        </nav>
      )}
    </motion.header>
  )
}
