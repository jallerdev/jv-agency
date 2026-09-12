"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import type { Idioma } from "@/content/types";
/* `@/lib/money` y NO `@/lib/quote`, aunque `quote` reexporte `money` y las dos
   líneas compilen igual. Esto es un componente de CLIENTE: importar de `quote`
   mete el catálogo entero —mil quinientas líneas de precios, extras, plazos y
   textos— en el paquete del navegador para usar un formateador de seis. Medido:
   /precios enviaba 39 kB de trozos propios y 25 de ellos eran el catálogo.
   Es la razón exacta por la que `lib/money.ts` existe. */
import { money } from "@/lib/money";
import { cn } from "@/lib/utils";

/**
 * LA CALCULADORA DE EXTRAS
 * ──────────────────────────────────────────────────────────────────────────
 * Los cinco extras estaban como cinco tarjetas con su precio al pie, y sumar
 * quedaba de tarea del visitante: «dos millones y medio, más ciento ochenta,
 * más…». El que hace esa cuenta a ojo casi siempre se pasa, y el que se pasa
 * no escribe.
 *
 * TRES REGLAS QUE ESTO NO ROMPE:
 *
 * · LOS PRECIOS NO VIVEN AQUÍ. Llegan por props desde `lib/quote.ts`, que es
 *   la misma fuente del cotizador interno y de /precios. Esta pieza suma; no
 *   sabe cuánto vale nada.
 * · ES UN ESTIMADO Y LO DICE DONDE SE MIRA EL NÚMERO, no en un pie que hay
 *   que ir a buscar. Un total redondo al lado de un formulario se lee como
 *   cotización cerrada, y esa es exactamente la discusión que el sitio evita.
 * · LAS NOTAS FIJAS —la comisión de la pasarela y la renovación anual— van
 *   pegadas al total y no se pueden desmarcar: no son extras opcionales, son
 *   cosas que el cliente va a pagar igual y que no me paga a mí.
 *
 * SIN JAVASCRIPT se ve la lista completa con su precio y el piso: se pierde la
 * suma, no la información.
 */

export type Extra = {
  clave: string;
  titulo: string;
  cuerpo?: string;
  precio: number;
  /**
   * Cómo se cobra ESTE extra. Por defecto va con la base.
   *
   * Existe porque el plan de SEO mezcla las dos cosas: una ciudad más sube la
   * mensualidad, pero la puesta a punto del sitio se paga una vez. Sumarlas en
   * un solo total daría un número que no existe —ni es lo que se paga el
   * primer mes ni lo que se paga cada mes— y el visitante lo descubriría en la
   * propuesta, que es el peor momento.
   */
  unidad?: "base" | "unico";
};

export function AddOnCalculator({
  base,
  baseEtiqueta,
  extras,
  idioma,
  titulo,
  totalEtiqueta,
  totalUnicoEtiqueta,
  aviso,
  notas,
  desde,
  className,
}: {
  /** El piso publicado del servicio. */
  base: number;
  baseEtiqueta: string;
  extras: readonly Extra[];
  idioma: Idioma;
  titulo: string;
  totalEtiqueta: string;
  /** Cómo se llama el pago único, si algún extra lo es. */
  totalUnicoEtiqueta?: string;
  aviso: string;
  /** Lo que se paga igual y no lo cobro yo. Texto ya compuesto. */
  notas?: readonly string[];
  desde: string;
  className?: string;
}) {
  const [marcados, setMarcados] = useState<string[]>([]);
  const elegidos = extras.filter((e) => marcados.includes(e.clave));
  const total =
    base + elegidos.filter((e) => e.unidad !== "unico").reduce((s, e) => s + e.precio, 0);
  const totalUnico = elegidos
    .filter((e) => e.unidad === "unico")
    .reduce((s, e) => s + e.precio, 0);

  const alternar = (clave: string) =>
    setMarcados((m) => (m.includes(clave) ? m.filter((c) => c !== clave) : [...m, clave]));

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-px overflow-hidden rounded-[--radius-lg] border border-line bg-line lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]",
        className,
      )}
    >
      <div className="bg-canvas p-6 sm:p-8">
        <h3 className="jv-titulo">{titulo}</h3>

        <ul className="mt-6 flex flex-col divide-y divide-line border-y border-line">
          {extras.map((e) => {
            const marcado = marcados.includes(e.clave);
            return (
              <li key={e.clave}>
                {/* Una casilla de verdad, no un div con aspecto de casilla: se
                    marca con la barra espaciadora, se anuncia como casilla y
                    entra en el orden de tabulación. */}
                <label className="flex cursor-pointer items-start gap-4 py-4">
                  <input
                    type="checkbox"
                    checked={marcado}
                    onChange={() => alternar(e.clave)}
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-surface duration-base ease-ps",
                      marcado ? "border-brand bg-brand text-on-accent" : "border-line-strong bg-surface",
                      "peer-focus-visible:ring-2 peer-focus-visible:ring-brand peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-canvas",
                    )}
                  >
                    {marcado && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="font-semibold text-ink">{e.titulo}</span>
                      <span className="font-mono text-sm tabular-nums text-brand">
                        {desde} {money(e.precio, idioma)}
                      </span>
                    </span>
                    {e.cuerpo && (
                      <span className="mt-1 block text-sm leading-relaxed text-ink-soft">
                        {e.cuerpo}
                      </span>
                    )}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      {/* El total se queda a la vista mientras se marcan los extras: si hay que
          desplazarse para verlo, la calculadora no calcula nada. */}
      <div className="bg-surface p-6 sm:p-8">
        <div className="lg:sticky lg:top-28">
          <p className="jv-eyebrow text-ink-muted">{baseEtiqueta}</p>
          <p className="mt-2 font-mono text-sm tabular-nums text-ink-soft">
            {desde} {money(base, idioma)}
          </p>

          <p className="jv-rule mt-6 pt-5 jv-eyebrow text-ink-muted">{totalEtiqueta}</p>
          <p
            aria-live="polite"
            className="mt-2 font-display text-[length:var(--text-h2)] font-semibold leading-none tabular-nums tracking-[-0.03em] text-ink"
          >
            {desde} {money(total, idioma)}
          </p>

          {totalUnico > 0 && totalUnicoEtiqueta && (
            <>
              <p className="jv-rule mt-6 pt-5 jv-eyebrow text-ink-muted">{totalUnicoEtiqueta}</p>
              <p
                aria-live="polite"
                className="mt-2 font-mono text-[length:var(--text-h4)] tabular-nums text-ink"
              >
                {money(totalUnico, idioma)}
              </p>
            </>
          )}

          <p className="mt-4 text-sm leading-relaxed text-ink-soft">{aviso}</p>

          {notas && notas.length > 0 && (
            <ul className="jv-rule mt-6 flex flex-col gap-3 pt-5">
              {notas.map((n) => (
                <li key={n} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                  <span
                    aria-hidden="true"
                    className="mt-[0.5em] h-1 w-1 shrink-0 rounded-full bg-line-strong"
                  />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
