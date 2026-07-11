"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";

type MediaItem =
  | {
      type: "image";
      src: string;
      alt: string;
      span: string;
    }
  | {
      type: "video";
      src: string;
      alt: string;
      span: string;
    };

const items: MediaItem[] = [
  {
    type: "image",
    src: "/images/galeria/IMG_0029 (1).jpg",
    alt: "Carro lavado no KVRÃO",
    span: "col-span-2 row-span-2",
  },
  {
    type: "video",
    src: "/images/galeria/WhatsApp Video 2026-07-09 at 13.05.10.mp4",
    alt: "Vídeo do serviço KVRÃO",
    span: "col-span-1 row-span-3",
  },
  {
    type: "image",
    src: "/images/galeria/IMG_0272 (1).jpg",
    alt: "Detalhe de limpeza",
    span: "col-span-1 row-span-1",
  },
  {
    type: "image",
    src: "/images/galeria/IMG_0474 (1).jpg",
    alt: "Resultado da lavagem",
    span: "col-span-1 row-span-1",
  },
  {
    type: "image",
    src: "/images/galeria/IMG_0950 (1).jpg",
    alt: "Interior higienizado",
    span: "col-span-2 row-span-1",
  },
  {
    type: "video",
    src: "/images/galeria/WhatsApp Video 2026-07-09 at 13.05.10 (1).mp4",
    alt: "Vídeo do trabalho KVRÃO",
    span: "col-span-1 row-span-3",
  },
  {
    type: "image",
    src: "/images/galeria/IMG_1566 (2).jpg",
    alt: "Lavagem detalhada",
    span: "col-span-2 row-span-1",
  },
  {
    type: "image",
    src: "/images/galeria/IMG_3866 (1).jpg",
    alt: "Serviço completo",
    span: "col-span-1 row-span-1",
  },
  {
    type: "image",
    src: "/images/galeria/IMG_4203 (1).jpg",
    alt: "Moto lavada no KVRÃO",
    span: "col-span-1 row-span-1",
  },
  {
    type: "image",
    src: "/images/galeria/IMG_4244 (2).jpg",
    alt: "Detalhe de jato",
    span: "col-span-2 row-span-2",
  },
  {
    type: "image",
    src: "/images/galeria/IMG_5523 (1).jpg",
    alt: "Resultado real",
    span: "col-span-1 row-span-1",
  },
  {
    type: "image",
    src: "/images/galeria/IMG_7075 (1).jpg",
    alt: "Lavagem externa",
    span: "col-span-1 row-span-1",
  },
  {
    type: "image",
    src: "/images/galeria/IMG_7111 (2).jpg",
    alt: "Depois do acabamento",
    span: "col-span-2 row-span-1",
  },
  {
    type: "image",
    src: "/images/galeria/IMG_7696 (1).jpg",
    alt: "Carro zero sujeira",
    span: "col-span-1 row-span-1",
  },
];

function VideoTile({ src, alt }: { src: string; alt: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-muted">
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        loop
        preload="metadata"
        className="h-full w-full object-cover"
        aria-label={alt}
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute inset-0 flex items-center justify-center bg-background/20 transition-colors hover:bg-background/30"
        aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
          {playing ? (
            <Pause size={22} fill="currentColor" aria-hidden="true" />
          ) : (
            <Play
              size={22}
              fill="currentColor"
              className="ml-0.5"
              aria-hidden="true"
            />
          )}
        </span>
      </button>
    </div>
  );
}

function ImageTile({
  src,
  alt,
  onPress,
  onRelease,
}: {
  src: string;
  alt: string;
  onPress: () => void;
  onRelease: () => void;
}) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const activeRef = useRef(false);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const endPress = () => {
    clearTimer();
    startRef.current = null;
    if (activeRef.current) {
      activeRef.current = false;
      onRelease();
    }
  };

  return (
    <div
      className="relative h-full w-full cursor-zoom-in select-none overflow-hidden bg-muted"
      onPointerDown={(e) => {
        if (e.button !== 0) return;
        startRef.current = { x: e.clientX, y: e.clientY };
        clearTimer();
        // delay → scroll lateral ainda funciona
        timerRef.current = setTimeout(() => {
          activeRef.current = true;
          onPress();
        }, 160);
      }}
      onPointerMove={(e) => {
        if (!startRef.current || activeRef.current) return;
        const dx = Math.abs(e.clientX - startRef.current.x);
        const dy = Math.abs(e.clientY - startRef.current.y);
        if (dx > 10 || dy > 10) endPress();
      }}
      onPointerUp={endPress}
      onPointerCancel={endPress}
      onPointerLeave={endPress}
      role="button"
      tabIndex={0}
      aria-label={`${alt} — segure para ampliar`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activeRef.current = true;
          onPress();
        }
      }}
      onKeyUp={(e) => {
        if (e.key === "Enter" || e.key === " ") endPress();
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 25vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        draggable={false}
      />
    </div>
  );
}

export function Gallery() {
  const [expanded, setExpanded] = useState<{ src: string; alt: string } | null>(
    null,
  );
  const releaseExpanded = useCallback(() => setExpanded(null), []);

  useEffect(() => {
    if (!expanded) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onUp = () => releaseExpanded();
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [expanded, releaseExpanded]);

  return (
    <section id="galeria" className="border-y border-border bg-card/40 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 font-serif text-sm tracking-[0.3em] text-primary">
            TRABALHOS
          </p>
          <h2 className="font-serif text-4xl tracking-wide text-foreground text-balance md:text-5xl">
            GALERIA DO QUE JÁ SAIU DAQUI
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground text-pretty">
            Alguns serviços já realizados no lava rápido KVRÃO.
          </p>
        </motion.div>

        {/* Mobile: rolagem lateral snap */}
        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => (
            <article
              key={item.src}
              className={
                item.type === "video"
                  ? "group relative aspect-[9/16] w-[52%] shrink-0 snap-center overflow-hidden rounded-lg border border-border"
                  : "group relative aspect-[3/4] w-[70%] shrink-0 snap-center overflow-hidden rounded-lg border border-border"
              }
            >
              {item.type === "video" ? (
                <VideoTile src={item.src} alt={item.alt} />
              ) : (
                <ImageTile
                  src={item.src}
                  alt={item.alt}
                  onPress={() => setExpanded({ src: item.src, alt: item.alt })}
                  onRelease={releaseExpanded}
                />
              )}
            </article>
          ))}
        </div>

        {/* sm+: bento grid */}
        <div className="hidden auto-rows-[120px] grid-cols-4 gap-3 sm:grid md:auto-rows-[140px] lg:auto-rows-[160px]">
          {items.map((item, i) => (
            <motion.article
              key={item.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: Math.min(i * 0.03, 0.35) }}
              className={`group relative min-h-0 overflow-hidden rounded-lg border border-border ${item.span}`}
            >
              {item.type === "video" ? (
                <VideoTile src={item.src} alt={item.alt} />
              ) : (
                <ImageTile
                  src={item.src}
                  alt={item.alt}
                  onPress={() => setExpanded({ src: item.src, alt: item.alt })}
                  onRelease={releaseExpanded}
                />
              )}
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            key="zoom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Imagem ampliada"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="relative h-[min(85vh,900px)] w-full max-w-3xl overflow-hidden rounded-xl border border-primary/40 shadow-2xl"
            >
              <Image
                src={expanded.src}
                alt={expanded.alt}
                fill
                sizes="100vw"
                className="object-contain"
                draggable={false}
                priority
              />
            </motion.div>
            <p className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-wider text-muted-foreground">
              SOLTA PRA FECHAR
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
