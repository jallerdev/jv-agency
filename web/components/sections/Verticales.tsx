import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { VERTICALES } from "@/content/home/verticales";
import type { Idioma } from "@/content/types";
import { Seccion, EncabezadoSeccion } from "@/components/ui/seccion";

/**
 * Los tres paneles, con anclaje de scroll.
 *
 * `scroll-snap` en un carril, NO scroll horizontal clavado.
 *
 * La especificación pedía el clavado y lo cambié a propósito: clavar la sección
 * secuestra la rueda del ratón, y en móvil pelea con el gesto de volver atrás.
 * El anclaje da la misma sensación de «pasar de uno a otro» sin quitarle a
 * nadie el control de su propio scroll, que es una línea que no conviene cruzar
 * por un efecto. En escritorio ni siquiera hace falta el carril: caben los tres.
 *
 * El contador «0N / 03» no es adorno. Un carril horizontal esconde cuántos
 * faltan; el contador lo dice.
 */
export function Verticales({ idioma }: { idioma: Idioma }) {
  const total = String(VERTICALES.paneles.length).padStart(2, "0");

  return (
    <Seccion id="para-quien">
      <EncabezadoSeccion contenido={VERTICALES} idioma={idioma} />

      {/* El carril se sangra hasta el borde de pantalla para que el siguiente
          panel asome: sin eso nadie sabe que hay más y el anclaje no se
          descubre. De lg en adelante es rejilla y se acabó el carril. */}
      <ul className="no-scrollbar -mx-6 mt-16 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:-mx-12 md:px-12 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
        {VERTICALES.paneles.map((v) => (
          <li
            key={v.numero}
            className="jv-card jv-card-int group w-[85vw] shrink-0 snap-start overflow-hidden sm:w-[60vw] lg:w-auto"
          >
            <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-canvas">
              <Image
                src={v.imagen}
                alt={v.alt[idioma]}
                width={1600}
                height={1000}
                quality={85}
                sizes="(min-width:1024px) 26rem, (min-width:640px) 60vw, 85vw"
                className="h-full w-full object-cover object-top"
              />
            </div>

            <div className="p-7">
              <div className="flex items-baseline justify-between gap-4">
                <p className="jv-eyebrow text-brand">{v.eyebrow[idioma]}</p>
                <p className="font-mono text-xs tabular-nums text-ink-muted">
                  {v.numero} / {total}
                </p>
              </div>

              <h3 className="jv-titulo mt-4">{v.titulo[idioma]}</h3>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-ink-soft">
                {v.cuerpo[idioma]}
              </p>

              <Link
                href={v.enlace.href[idioma]}
                className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-ink-muted transition-colors duration-base ease-ps group-hover:text-brand"
              >
                {v.enlace.texto[idioma]}
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </Seccion>
  );
}
