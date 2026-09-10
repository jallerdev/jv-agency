import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { STATEMENT } from "@/content/home/statement";
import type { Idioma } from "@/content/types";
import { Seccion, Titular } from "@/components/ui/seccion";

/**
 * El argumento del estudio, en dos frases.
 *
 * Sin antetítulo y a una sola columna estrecha: es lo único de la portada que
 * se lee como una declaración y no como un bloque de información, y darle
 * etiqueta lo convertiría en una sección más.
 */
export function Statement({ idioma }: { idioma: Idioma }) {
  return (
    <Seccion ancho="estrecho" className="border-y border-line">
      <Titular
        texto={STATEMENT.titulo[idioma]}
        acento={STATEMENT.acento?.[idioma]}
      />
      <p className="mt-8 text-pretty text-lg leading-relaxed text-ink-soft">
        {STATEMENT.entradilla![idioma]}
      </p>

      {/* Enlace con el subrayado que crece desde la izquierda: el gesto de
          hover del sistema, y otro de los cinco sitios del naranja. */}
      <Link
        href={STATEMENT.enlace.href[idioma]}
        className="group mt-10 inline-flex items-center gap-2 text-brand"
      >
        <span className="relative">
          {STATEMENT.enlace.texto[idioma]}
          <span
            aria-hidden
            className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-base ease-ps group-hover:scale-x-100 group-focus-visible:scale-x-100"
          />
        </span>
        <ArrowRight
          className="h-4 w-4 transition-transform duration-base ease-ps group-hover:translate-x-1"
          strokeWidth={2}
        />
      </Link>
    </Seccion>
  );
}
