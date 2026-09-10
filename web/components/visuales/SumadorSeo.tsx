"use client";

import { useState } from "react";
import Link from "next/link";

import { SEO_PRICES, money } from "@/lib/quote";
import { cn } from "@/lib/utils";
import type { Idioma } from "@/content/types";

/**
 * EL SUMADOR: CÓMO SE ARMA TU NÚMERO
 * ─────────────────────────────────────────────────────────────────────────
 * Hoy esta misma información va en un bloque denso de tres frases con cinco
 * cifras dentro, y nadie hace esa suma mentalmente. Hecha a la vista, el
 * visitante llega a la llamada con SU número aproximado ya en la cabeza —que
 * es justo lo contrario de la cotización a puerta cerrada que la página
 * entera critica.
 *
 * TODAS LAS CIFRAS SALEN DE `SEO_PRICES`. Cero literales: si el piso cambia
 * en lib/quote.ts, este visual cambia con él.
 *
 * DOS TOTALES, NO UNO. Mezclar la mensualidad con lo que se paga una sola vez
 * en un único número grande es la clase de suma que hace que un cliente crea
 * que va a pagar $1.680.000 todos los meses. Se separan.
 *
 * A 390 la barra apilada horizontal no cabe (cinco segmentos de 70 px no
 * admiten ni una palabra), así que cada fila lleva su propia barrita debajo:
 * igual de informativo y sin depender del ancho.
 */

type Fila = {
  id: string;
  importe: number;
  grupo: "mes" | "unaVez";
};

/**
 * Los rótulos, en las dos lenguas. Las CIFRAS no están aquí: salen de
 * `SEO_PRICES` y no se copian, para que un cambio de precio no deje una
 * lengua con el número viejo.
 */
const T = {
  es: {
    titulo: "Cómo se arma tu número",
    alMes: "Al mes",
    unaVez: "Una sola vez, al arrancar",
    porMes: "/mes",
    nota: "Es una aproximación, para que llegues a la llamada con tu número en la cabeza. El número final va por escrito antes de que pagues nada.",
    filas: {
      plan: {
        concepto: "Plan Local",
        detalle: "Un negocio, una ciudad, un servicio principal.",
      },
      ciudad: {
        concepto: "Una ciudad más",
        detalle: "Cada ciudad adicional se trabaja aparte.",
      },
      contenido: {
        concepto: "Un contenido más al mes",
        detalle: "Además de los que ya trae el plan.",
      },
      puestaApunto: {
        concepto: "Revisión y arreglo del sitio",
        detalle: "Va una sola vez, al arrancar. Si el sitio lo hice yo, ya está hecho.",
      },
      ficha: {
        concepto: "Ficha de Google Business",
        detalle: "Creación y verificación. Es lo que te pone en el mapa.",
      },
    },
  },
  en: {
    titulo: "How your number adds up",
    alMes: "Per month",
    unaVez: "One-off, at the start",
    porMes: "/month",
    nota: "It's an approximation, so you arrive at the call with your number already in your head. The final number goes in writing before you pay anything.",
    filas: {
      plan: {
        concepto: "Local plan",
        detalle: "One business, one city, one main service.",
      },
      ciudad: {
        concepto: "One more city",
        detalle: "Each additional city is worked on separately.",
      },
      contenido: {
        concepto: "One more piece of content a month",
        detalle: "On top of what the plan already brings.",
      },
      puestaApunto: {
        concepto: "Site review and fixes",
        detalle: "One-off, at the start. If I built the site, it's already done.",
      },
      ficha: {
        concepto: "Google Business profile",
        detalle: "Creation and verification. It's what puts you on the map.",
      },
    },
  },
} as const;

const OPCIONALES: Fila[] = [
  { id: "ciudad", importe: SEO_PRICES.ciudadExtra, grupo: "mes" },
  { id: "contenido", importe: SEO_PRICES.contenidoExtraUnidad, grupo: "mes" },
  { id: "puestaApunto", importe: SEO_PRICES.extras.puestaApunto, grupo: "unaVez" },
  { id: "ficha", importe: SEO_PRICES.extras.ficha, grupo: "unaVez" },
];

const BASE: Fila = { id: "plan", importe: SEO_PRICES.plan.local, grupo: "mes" };

export function SumadorSeo({
  enlace,
  idioma = "es",
  className,
}: {
  idioma?: Idioma;
  /**
   * Enlace opcional al detalle. OJO: `/cotizador` es una ruta PRIVADA —vive en
   * lib/private-docs.ts y responde 307 hacia /acceso—, así que no se enlaza
   * desde una página pública. Si quieres rematar con algo, apunta al ancla de
   * precios de la propia página («#precios»).
   */
  enlace?: { texto: string; href: string };
  className?: string;
}) {
  const t = T[idioma];
  const rotulo = (id: string) => t.filas[id as keyof typeof t.filas];

  const [activas, setActivas] = useState<Record<string, boolean>>({});

  const alternar = (id: string) => setActivas((p) => ({ ...p, [id]: !p[id] }));

  const elegidas = OPCIONALES.filter((f) => activas[f.id]);
  const totalMes = BASE.importe + elegidas.filter((f) => f.grupo === "mes").reduce((s, f) => s + f.importe, 0);
  const totalUnaVez = elegidas.filter((f) => f.grupo === "unaVez").reduce((s, f) => s + f.importe, 0);

  /* Cada barrita se mide contra el importe mayor de su propio grupo: comparar
     una mensualidad con un pago único no significa nada. */
  const topeMes = Math.max(BASE.importe, ...OPCIONALES.filter((f) => f.grupo === "mes").map((f) => f.importe));
  const topeUnaVez = Math.max(...OPCIONALES.filter((f) => f.grupo === "unaVez").map((f) => f.importe));

  const barra = (f: Fila) => {
    const tope = f.grupo === "mes" ? topeMes : topeUnaVez;
    return tope === 0 ? 0 : Math.round((f.importe / tope) * 100);
  };

  return (
    <div className={cn("jv-card p-5 sm:p-6", className)}>
      <p className="jv-eyebrow text-accent-ink">
        {t.titulo}
      </p>

      <ul className="mt-4 divide-y divide-line">
        {/* El piso, siempre puesto. No es un interruptor: es de dónde se parte. */}
        <li className="py-3 first:pt-0">
          <div className="flex min-h-11 items-start gap-3">
            {/* Hueco del ancho de la casilla, para que el piso quede alineado
                con los conceptos que sí llevan interruptor. */}
            <span aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                <span className="font-body text-[15px] font-semibold leading-snug text-ink">
                  {rotulo(BASE.id).concepto}
                </span>
                <span className="whitespace-nowrap font-mono text-sm tabular-nums text-primary-dark">
                  {money(BASE.importe, idioma)}
                  <span className="text-ink-soft">{t.porMes}</span>
                </span>
              </span>
              <span className="mt-0.5 block font-body text-[13px] leading-snug text-ink-soft">
                {rotulo(BASE.id).detalle}
              </span>
            </span>
          </div>
          <span aria-hidden className="mt-2 block h-[3px] w-full rounded-full bg-background">
            <span
              style={{ width: `${barra(BASE)}%` }}
              className="block h-full rounded-full bg-primary/30 transition-[width] duration-base ease-state"
            />
          </span>
        </li>

        {OPCIONALES.map((f) => {
          const activa = Boolean(activas[f.id]);
          return (
            <li key={f.id} className="py-1">
              <label className="flex min-h-11 cursor-pointer items-start gap-3 py-2.5">
                <input
                  type="checkbox"
                  checked={activa}
                  onChange={() => alternar(f.id)}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-primary"
                />
                <span className="min-w-0 flex-1">
                  {/* Concepto e importe en la MISMA línea, con flex-wrap: a 390
                      el importe cae debajo solo cuando de verdad no cabe. */}
                  <span className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                    <span
                      className={cn(
                        "font-body text-[15px] leading-snug",
                        activa ? "font-semibold text-ink" : "text-ink"
                      )}
                    >
                      {rotulo(f.id).concepto}
                    </span>
                    <span
                      className={cn(
                        "whitespace-nowrap font-mono text-sm tabular-nums",
                        activa ? "text-primary-dark" : "text-ink-soft"
                      )}
                    >
                      + {money(f.importe, idioma)}
                      <span className="text-ink-soft">{f.grupo === "mes" ? t.porMes : ""}</span>
                    </span>
                  </span>
                  <span className="mt-0.5 block font-body text-[13px] leading-snug text-ink-soft">
                    {rotulo(f.id).detalle}
                  </span>
                </span>
              </label>
              <span aria-hidden className="mb-2 block h-[3px] w-full rounded-full bg-background">
                <span
                  style={{ width: activa ? `${barra(f)}%` : "0%" }}
                  className="block h-full rounded-full bg-primary/30 transition-[width] duration-base ease-state"
                />
              </span>
            </li>
          );
        })}
      </ul>

      {/* Los dos totales, separados a propósito. */}
      <dl className="mt-4 grid gap-2 jv-rule pt-4" aria-live="polite">
        <div className="flex items-baseline justify-between gap-3">
          <dt className="font-body text-[15px] text-ink">{t.alMes}</dt>
          <dd className="font-mono text-lg tabular-nums text-primary-dark">
            {money(totalMes, idioma)}
            <span className="text-sm text-ink-soft">{t.porMes}</span>
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt className="min-w-0 font-body text-[15px] text-ink-soft">{t.unaVez}</dt>
          <dd className="shrink-0 font-mono text-[15px] tabular-nums text-ink-soft">
            {totalUnaVez === 0 ? "—" : money(totalUnaVez, idioma)}
          </dd>
        </div>
      </dl>

      <p className="mt-4 text-pretty font-body text-[13px] leading-relaxed text-ink-soft">
        {t.nota}
        {enlace && (
          <>
            {" "}
            <Link
              href={enlace.href}
              className="font-semibold text-primary-dark underline underline-offset-2"
            >
              {enlace.texto}
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
