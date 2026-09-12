"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Idioma } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * «¿NECESITAS SOFTWARE O TE SIRVE UNA PÁGINA WEB?»
 * ─────────────────────────────────────────────────────────────────────────
 * La pregunta más cara de esta página, y estaba contada en dos párrafos
 * seguidos: quien llega buscando «un programa para mi negocio» tenía que
 * leerse los dos y decidir solo. Aquí decide en un clic, y la respuesta que
 * NO eligió sigue ahí, porque la mitad de las veces es la buena.
 *
 * MANDAR A OTRO SERVICIO CUANDO TOCA ES EL ARGUMENTO, no una fuga: «si el
 * problema está afuera, lo tuyo es una página web y cuesta la quinta parte».
 * Por eso la recomendación de cada lado lleva su enlace real.
 *
 * NO SE ESCONDE NADA AL NO ELEGIR. Las dos tarjetas traen su texto completo
 * desde el HTML del servidor; lo único que hace el clic es destacar una y
 * abrir su recomendación. Sin JavaScript se leen las dos enteras.
 *
 * LA ESCALERA DE ABAJO es el orden que el propio sitio recomienda —web,
 * después chatbot, y solo entonces sistema— y es la pieza que evita la venta
 * al revés: el que compra el sistema primero paga tres veces.
 */

export type LadoProblema = {
  clave: "afuera" | "adentro";
  titulo: string;
  /** El texto, ya compuesto: antes + fuerte + después. */
  cuerpo: React.ReactNode;
  enlace?: { texto: string; href: string };
};

export type Peldano = { rotulo: string; texto: string; href?: string };

const T = {
  es: { recomendado: "Lo que te sirve", orden: "El orden que recomiendo" },
  en: { recomendado: "What suits you", orden: "The order I recommend" },
} as const;

export function SelectorProblema({
  lados,
  peldanos,
  idioma,
  className,
}: {
  lados: readonly [LadoProblema, LadoProblema];
  peldanos: readonly Peldano[];
  idioma: Idioma;
  className?: string;
}) {
  const t = T[idioma];
  const [elegido, setElegido] = useState<"afuera" | "adentro" | null>(null);

  return (
    <div className={className}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {lados.map((l) => {
          const suyo = elegido === l.clave;
          const otro = elegido !== null && !suyo;
          return (
            <button
              key={l.clave}
              type="button"
              aria-pressed={suyo}
              onClick={() => setElegido(suyo ? null : l.clave)}
              className={cn(
                "jv-card jv-card-int relative flex flex-col p-6 text-left transition-[opacity,border-color] duration-base ease-ps sm:p-8",
                suyo && "border-brand",
                otro && "opacity-55",
              )}
            >
              {suyo && (
                <span className="absolute -top-[0.6875rem] left-6 bg-canvas px-2 jv-eyebrow text-brand">
                  {t.recomendado}
                </span>
              )}

              <span className="jv-titulo text-[length:var(--text-h3)]">{l.titulo}</span>
              <span className="mt-3 block leading-relaxed text-ink-soft">{l.cuerpo}</span>

              {/* El enlace aparece al elegir. Va como `<span>` porque esta
                  tarjeta entera ya es un botón y un enlace dentro de un botón
                  no es marcado válido; el enlace de verdad va debajo. */}
              {l.enlace && (
                <span
                  className={cn(
                    "mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-opacity duration-base ease-ps",
                    suyo ? "opacity-100" : "opacity-0",
                  )}
                  aria-hidden={!suyo}
                >
                  {l.enlace.texto}
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* El enlace real del lado elegido, fuera del botón. */}
      {lados.map((l) =>
        elegido === l.clave && l.enlace ? (
          <Link
            key={l.clave}
            href={l.enlace.href}
            className="jv-enlace mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand"
          >
            {l.enlace.texto}
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
          </Link>
        ) : null,
      )}

      {/* La escalera. Tres peldaños en orden, con el número delante: es una
          secuencia de verdad —cada uno se paga y se usa antes del siguiente—,
          así que el numeral dice algo y no decora. */}
      <div className="mt-12">
        <p className="jv-eyebrow text-ink-muted">{t.orden}</p>
        <ol className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-[--radius-lg] border border-line bg-line sm:grid-cols-3">
          {peldanos.map((p, i) => (
            <li key={p.rotulo} className="flex flex-col bg-canvas p-5 sm:p-6">
              <span className="flex items-baseline gap-3">
                <span className="font-mono text-sm tabular-nums text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="jv-titulo">{p.rotulo}</span>
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-ink-soft">{p.texto}</span>
              {p.href && (
                <Link
                  href={p.href}
                  className="jv-enlace mt-4 inline-flex min-h-11 w-fit items-center text-sm font-semibold text-brand"
                >
                  {p.rotulo}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
