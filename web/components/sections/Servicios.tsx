import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SERVICIOS } from "@/content/home/servicios";
import { enlaceReal } from "@/lib/rutas";
import type { Idioma } from "@/content/types";
import { Seccion, EncabezadoSeccion } from "@/components/ui/seccion";
import { Reveal } from "@/components/Reveal";

/**
 * Las siete tarjetas.
 *
 * Seis servicios y una séptima que NO es un servicio: es el CTA sobre fondo
 * naranja. Va dentro de la misma rejilla a propósito —si fuera un bloque aparte
 * debajo, se leería como el cierre de la página y no como «y si ninguna de
 * estas seis es la tuya, hablamos»—.
 *
 * La rejilla es de tres columnas y las siete piezas la llenan exacta: 3+3+1, y
 * la última ocupa el ancho que sobra. No hay huecos que tapar, que es de donde
 * salían las composiciones raras de la versión anterior.
 */
export function Servicios({ idioma }: { idioma: Idioma }) {
  return (
    <Seccion id="servicios">
      <Reveal>
        <EncabezadoSeccion contenido={SERVICIOS} idioma={idioma} />
      </Reveal>

      <Reveal stagger className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICIOS.tarjetas.map((t) => (
          <article
            key={t.id}
            className="jv-card jv-card-int group relative flex flex-col p-7"
          >
            <div className="flex items-baseline justify-between gap-4">
              {/* El numeral es uno de los cinco sitios del naranja. */}
              <span className="font-mono text-2xl tabular-nums text-brand">
                {t.numero}
              </span>
              {t.enlace && (
                <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-ink-muted transition-colors duration-base ease-ps group-hover:text-brand">
                  {t.enlace.texto[idioma]}
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
              )}
            </div>

            <h3 className="jv-titulo mt-6">{t.titulo[idioma]}</h3>
            <p className="mt-3 flex-1 text-pretty text-ink-soft">
              {t.cuerpo[idioma]}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {t.chips[idioma].map((c) => (
                <li key={c} className="jv-chip jv-chip-off text-xs">
                  {c}
                </li>
              ))}
            </ul>

            {/* El enlace cubre la tarjeta entera, pero el nombre accesible sale
                del título: un enlace que se anuncia como «Ver servicio» seis
                veces seguidas no dice a dónde va. */}
            {t.enlace && (
              <Link
                href={enlaceReal(t.enlace.href[idioma])}
                className="absolute inset-0 rounded-[inherit]"
                aria-label={`${t.titulo[idioma]} — ${t.enlace.texto[idioma]}`}
              >
                <span className="sr-only">{t.titulo[idioma]}</span>
              </Link>
            )}
          </article>
        ))}

        {/* La séptima. Fondo naranja, texto casi negro: 5,96:1. */}
        <article className="flex flex-col justify-between rounded-[--radius-lg] bg-brand p-7 text-on-accent sm:col-span-2 lg:col-span-1">
          <div>
            <h3 className="jv-titulo text-on-accent">
              {SERVICIOS.cta.titulo[idioma]}
            </h3>
            <p className="mt-3 text-pretty text-on-accent/80">
              {SERVICIOS.cta.cuerpo[idioma]}
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {SERVICIOS.cta.botones.map((b, i) => (
              <Link
                key={b.href[idioma]}
                href={enlaceReal(b.href[idioma])}
                className={
                  i === 0
                    ? "tap-target inline-flex items-center rounded-full bg-canvas px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-base ease-ps hover:bg-surface"
                    : "tap-target inline-flex items-center rounded-full border border-canvas/25 px-5 py-2.5 text-sm font-semibold text-on-accent transition-colors duration-base ease-ps hover:border-canvas/50"
                }
              >
                {b.texto[idioma]}
              </Link>
            ))}
          </div>
        </article>
      </Reveal>
    </Seccion>
  );
}
