import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";

import { CASO } from "@/content/home/caso";
import type { Idioma } from "@/content/types";
import { Seccion, EncabezadoSeccion } from "@/components/ui/seccion";
import { Reveal } from "@/components/Reveal";

/**
 * El caso a fondo.
 *
 * La captura va dentro de un marco con barra de navegador falsa. No es adorno:
 * pone la dirección a la vista, y una dirección que se puede escribir en el
 * navegador es la diferencia entre enseñar una maqueta y enseñar algo que
 * existe. Es el mismo argumento que la sección entera.
 *
 * Sin sombra —lo pide la especificación— así que el marco lo hace el filete de
 * 1px y el escalón de superficie.
 */
export function Caso({ idioma }: { idioma: Idioma }) {
  return (
    <Seccion id="trabajo">
      <Reveal>
        <EncabezadoSeccion contenido={CASO} idioma={idioma} />
      </Reveal>

      <Reveal delay={80} className="jv-card mt-16 overflow-hidden">
        <div className="flex items-center gap-2 border-b border-line px-5 py-3">
          <span className="flex shrink-0 items-center gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          </span>
          <span className="ml-2 flex min-w-0 items-center gap-2 rounded-full border border-line px-4 py-1">
            <span aria-hidden className="jv-latido h-1.5 w-1.5 rounded-full bg-brand" />
            <span className="truncate font-mono text-xs text-ink-muted">
              {CASO.dominio}
            </span>
          </span>
        </div>

        <div className="relative aspect-[16/9] overflow-hidden bg-canvas">
          <Image
            src={CASO.imagen}
            alt={CASO.alt[idioma]}
            width={2000}
            height={1160}
            quality={85}
            sizes="(min-width:1280px) 76rem, 92vw"
            className="h-full w-full object-cover object-top"
            priority={false}
          />
        </div>
      </Reveal>

      <Reveal delay={140} className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="jv-titulo text-2xl">{CASO.proyecto}</h3>
            <span className="jv-chip jv-chip-off text-xs">
              {CASO.categoria[idioma]}
            </span>
          </div>
          <p className="mt-4 text-pretty text-ink-soft">
            {CASO.descripcion[idioma]}
          </p>
          <a
            href={CASO.enlace.href[idioma]}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-target mt-7 inline-flex items-center gap-2 rounded-full border border-brand px-5 py-2.5 text-sm font-semibold text-brand transition-colors duration-base ease-ps hover:bg-brand hover:text-on-accent"
          >
            {CASO.enlace.texto[idioma]}
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>

        <div>
          <p className="jv-eyebrow text-brand">{CASO.construido.titulo[idioma]}</p>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {CASO.construido.items[idioma].map((i) => (
              <li key={i} className="flex items-start gap-3 py-3 text-sm text-ink-soft">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2} />
                {i}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Seccion>
  );
}
