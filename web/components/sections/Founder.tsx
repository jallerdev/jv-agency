"use client";

import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, UserRound } from "lucide-react";

import { FOUNDER } from "@/content/home/founder";
import { enlaceReal } from "@/lib/rutas";
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
const GLIFOS = { yo: UserRound, linkedin: Linkedin, github: Github } as const;

export function Founder({ idioma }: { idioma: Idioma }) {
  const cuerpo = FOUNDER.cuerpo[idioma];
  const negrita = FOUNDER.negrita[idioma];
  const corte = cuerpo.indexOf(negrita);

  return (
    <Seccion id="quien" className="border-y border-line">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {/* En móvil la ficha va CENTRADA y en horizontal: el monograma de
            18 rem alineado a la izquierda dejaba media pantalla vacía a su
            derecha y el nombre colgando debajo, descentrado respecto al
            titular que viene después. En fila y centrado, la identidad se lee
            como una unidad y ocupa 96 px de alto en vez de 300.
            De `lg` en adelante recupera la columna vertical, que es donde sí
            tiene sitio. */}
        <div className="flex items-center gap-5 lg:block">
          <div className="jv-bloom jv-card grid aspect-square w-20 shrink-0 place-items-center sm:w-24 lg:w-full lg:max-w-[18rem]">
            <Logo className="h-10 w-auto text-brand sm:h-12 lg:h-24" />
          </div>
          <div className="min-w-0 lg:mt-6">
            <p className="font-semibold text-ink">{FOUNDER.nombre}</p>
            <p className="font-mono text-xs uppercase leading-relaxed tracking-[0.12em] text-ink-muted">
              {FOUNDER.rol[idioma]}
            </p>
          </div>
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

          {/* Los tres enlaces, como pastillas con icono.
              Antes eran texto suelto con una flecha detrás, y la flecha se
              caía sola al renglón de abajo en cuanto la columna se estrechaba:
              tres etiquetas grises indistinguibles con un símbolo huérfano
              debajo. Como pastilla, cada una tiene borde, área táctil de 44 px
              y un glifo que dice de qué se trata antes de leer la palabra. */}
          <ul className="jv-rule mt-12 flex flex-wrap gap-3">
            {FOUNDER.enlaces.map((e) => {
              const Glifo = GLIFOS[e.icono];
              return (
                <li key={e.texto.es}>
                  <Link
                    href={enlaceReal(e.href[idioma])}
                    {...(e.externo
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="jv-chip jv-chip-off group min-h-11 gap-2.5 pr-4 text-[0.9375rem] hover:border-brand hover:text-brand"
                  >
                    <Glifo className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                    {e.texto[idioma]}
                    <ArrowUpRight
                      aria-hidden
                      strokeWidth={2}
                      className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity duration-base ease-ps group-hover:opacity-100"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
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

  /* UN SOLO `div` ENTRE EL `dl` Y SUS `dt`/`dd`, y es la regla del HTML, no una
     preferencia: una lista de descripción admite que cada pareja vaya envuelta
     en un `div` —para poder maquetarla— pero en UNO. Aquí había dos anidados,
     `.jv-cap` por fuera y el flex por dentro, y con eso el `dl` deja de ser una
     lista de descripción válida: los `dt` y los `dd` quedan huérfanos para quien
     la lee con lector de pantalla. Lo cazó Lighthouse en la portada
     —`definition-list` y `dlitem`, accesibilidad en 93— y se arregla juntando
     las dos clases en la misma caja, que es donde tenían que estar.

     El <dd> va antes en el marcado y el flex lo pone arriba: una lista de
     descripción se define término→descripción, y el orden visual es cosa del
     diseño, no del HTML. */
  return (
    <div className="jv-cap flex flex-col-reverse gap-1">
      <dt className="text-[0.9375rem] leading-snug text-ink-soft">{cifra.etiqueta[idioma]}</dt>
      <dd className="font-mono text-[clamp(2.5rem,5vw,3.5rem)] leading-none tabular-nums text-ink">
        {cifra.prefijo && <span className="text-ink-muted">{cifra.prefijo}</span>}
        <span ref={ref}>{valor}</span>
        {cifra.sufijo && <span className="text-brand">{cifra.sufijo}</span>}
      </dd>
    </div>
  );
}
