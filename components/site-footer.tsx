import Image from "next/image";
import { InstagramIcon } from "@/components/instagram-icon";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/contact";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center">
        <Image
          src="/images/logo-texto.png"
          alt="Lava Rápido KVRÃO"
          width={360}
          height={120}
          className="invert mix-blend-screen"
        />
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Estrada Municipal Martins Guimarães, 190 — Vila Tesouro
          <br />
          São José dos Campos/SP — CEP 12.221-520
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            aria-label="WhatsApp do Lava Rápido KVRÃO"
          >
            <WhatsAppIcon size={18} />
            (12) 98848-1898
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            aria-label="Instagram do Lava Rápido KVRÃO"
          >
            <InstagramIcon size={18} />
            @lavarapido_kvrao
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Lava Rápido KVRÃO. Sujeira aqui não
          sobrevive.
        </p>
      </div>
    </footer>
  );
}
