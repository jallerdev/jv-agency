"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { FOUNDER } from "@/content/home/founder";
import type { Idioma } from "@/content/types";
import { Seccion, EncabezadoSeccion } from "@/components/ui/seccion";
import { useCountUp } from "@/hooks/useCountUp";
import { Logo } from "@/components/Logo";

/**
 * Quién está detrás.
 *
 * La referencia pone aquí una rejilla de doce personas. Aquí es una, y el
 * diseño lo asume en vez de disimularlo: una rejilla de un solo elemento se ve
 * como una rejilla a la que le faltan once.
 *
 * NO HAY RETRATO. El sitio no tiene foto real de Luis y una de banco sería
 * exactamente la mentira que este proyecto lleva meses quitando. En su lugar va
 * el monograma sobre el florón naranja, que es honesto y además es de marca.
 * Cuando haya foto, se sustituye este bloque y ya.
 */
export function Founder({ idioma }: { idioma: Idioma }) {
  const cuerpo = FOUNDER.cuerpo[idioma];
  const negrita = FOUNDER.negrita[idioma];
  const corte = cuerpo.indexOf(negrita);

  return (
    <Seccion id="quien" className="border-y border-line">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <div className="jv-bloom jv-card grid aspect-square w-full max-w-[18rem] place-items-center">
            <Logo className="h-24 w-auto text-brand" />
          </div>
          <p className="mt-6 font-semibold text-ink">{FOUNDER.nombre}</p>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-ink-muted">
            {FOUNDER.rol[idioma]}
          </p>
        </div>

        <div>
          <EncabezadoSeccion contenido={FOUNDER} idioma={idioma} />

          <p className="mt-8 max-w-[40rem] text-pretty text-lg leading-relaxed text-ink-soft">
            {corte === -1 ? (
              cuerpo
            ) : (
              <>
                {cuerpo.slice(0, corte)}
                <strong className="font-semibold text-ink">{negrita}</strong>
                {cuerpo.slice(corte + negrita.length)}
              </>
            )}
          </p>

          <dl className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {FOUNDER.cifras.map((c) => (
              <Cifra key={c.etiqueta.es} cifra={c} idioma={idioma} />
            ))}
          </dl>

          <div className="jv-rule mt-12 flex flex-wrap gap-x-8 gap-y-3">
            {FOUNDER.enlaces.map((e) => (
              <Link
                key={e.texto.es}
                href={e.href[idioma]}
                {...(e.externo
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group tap-row inline-flex items-center gap-1.5 py-2 text-sm text-ink-soft transition-colors duration-base ease-ps hover:text-brand"
              >
                <span className="relative">
                  {e.texto[idioma]}
                  <span
                    aria-hidden
                    className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-base ease-ps group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </span>
                {e.externo && <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Seccion>
  );
}

function Cifra({
  cifra,
  idioma,
}: {
  cifra: (typeof FOUNDER.cifras)[number];
  idioma: Idioma;
}) {
  const { ref, valor } = useCountUp(cifra.valor, Boolean(cifra.cuenta));

  return (
    <div className="jv-cap">
      {/* El <dd> va antes en el marcado y el flex lo pone arriba: una lista de
          descripción se define término→descripción, y el orden visual es cosa
          del diseño, no del HTML. */}
      <div className="flex flex-col-reverse gap-1">
        <dt className="text-sm text-ink-soft">{cifra.etiqueta[idioma]}</dt>
        <dd className="font-mono text-4xl tabular-nums text-ink">
          {cifra.prefijo && (
            <span className="text-ink-muted">{cifra.prefijo}</span>
          )}
          <span ref={ref}>{valor}</span>
          {cifra.sufijo && <span className="text-brand">{cifra.sufijo}</span>}
        </dd>
      </div>
    </div>
  );
}
