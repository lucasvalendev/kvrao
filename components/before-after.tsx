'use client'

import { useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MoveHorizontal } from 'lucide-react'

type ComparisonProps = {
  before: string
  after: string
  label: string
}

function ComparisonSlider({ before, after, label }: ComparisonProps) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, pct)))
  }, [])

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={containerRef}
        className="relative aspect-[3/4] w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-lg border border-border"
        onPointerDown={(e) => {
          dragging.current = true
          e.currentTarget.setPointerCapture(e.pointerId)
          updatePosition(e.clientX)
        }}
        onPointerMove={(e) => {
          if (dragging.current) updatePosition(e.clientX)
        }}
        onPointerUp={() => {
          dragging.current = false
        }}
        role="slider"
        aria-label={`Comparação antes e depois - ${label}`}
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') setPosition((p) => Math.max(0, p - 5))
          if (e.key === 'ArrowRight') setPosition((p) => Math.min(100, p + 5))
        }}
      >
        {/* After (base layer) */}
        <img
          src={after || '/placeholder.svg'}
          alt={`Depois da higienização - ${label}`}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        {/* Before (clipped layer) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img
            src={before || '/placeholder.svg'}
            alt={`Antes da higienização - ${label}`}
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
        </div>

        {/* Divider */}
        <div
          className="absolute inset-y-0 z-10 w-0.5 bg-primary"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
            <MoveHorizontal size={18} aria-hidden="true" />
          </div>
        </div>

        {/* Labels */}
        <span className="absolute top-3 left-3 rounded bg-background/80 px-2.5 py-1 text-xs font-bold tracking-wider text-foreground backdrop-blur-sm">
          ANTES
        </span>
        <span className="absolute top-3 right-3 rounded bg-primary/90 px-2.5 py-1 text-xs font-bold tracking-wider text-primary-foreground">
          DEPOIS
        </span>
      </div>
      <p className="text-center text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  )
}

export function BeforeAfter() {
  return (
    <section id="antes-depois" className="border-y border-border bg-card/40 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 font-serif text-sm tracking-[0.3em] text-primary">RESULTADO REAL</p>
          <h2 className="font-serif text-4xl tracking-wide text-foreground text-balance md:text-5xl">
            ANTES & DEPOIS — SEM FILTRO
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground text-pretty">
            Foto real, serviço real. Arrasta a barra e vê com seus próprios olhos o que o KVRÃO faz com banco sujo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-2"
        >
          <ComparisonSlider
            before="/images/antes-motorista.jpeg"
            after="/images/depois-motorista.jpeg"
            label="Banco do motorista — higienização completa"
          />
          <ComparisonSlider
            before="/images/antes-carona.jpeg"
            after="/images/depois-carona.jpeg"
            label="Banco do carona — higienização completa"
          />
        </motion.div>
      </div>
    </section>
  )
}
