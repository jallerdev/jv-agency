import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

/**
 * «Esto te sirve si te pasa alguna de estas.»
 *
 * POR QUÉ NO ES UNA REJILLA DE TRES COLUMNAS IGUALES
 * --------------------------------------------------
 * Porque la rejilla de tres tarjetas iguales, cada una con su azulejo de icono
 * encima del titular, es literalmente la plantilla que sale de cualquier
 * generador. El detector la marcaba 103 veces en este sitio, y no porque el
 * detector sea quisquilloso: es que seis problemas distintos presentados con
 * seis cajas idénticas se leen como una lista de relleno, y ninguno de los
 * seis se queda.
 *
 * Dos cosas cambian eso y las dos están aquí:
 *
 *   1. BENTO ASIMÉTRICO. Las dos primeras celdas ocupan el doble. Son las dos
 *      que más pasan, y la forma lo dice antes que el texto.
 *   2. EL ICONO VA EN LÍNEA CON EL TITULAR, no en una caja encima. Sin
 *      azulejo, sin fondo, sin radio: el icono acompaña al titular como un
 *      signo de puntuación, no como una ilustración.
 */

export type Dolor = {
  titulo: string;
  cuerpo: string;
  icono?: LucideIcon;
  /** Un artículo del blog que lo desarrolla. Sale como una línea al pie. */
  enlace?: { texto: string; href: string };
};

/** Cuántas celdas van a doble ancho, empezando por la primera. */
const GRANDES = 2;

export function PainGrid({
  dolores,
  className,
}: {
  dolores: readonly Dolor[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-px overflow-hidden rounded-[--radius-lg] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {dolores.map((d, i) => {
        const Icono = d.icono;
        const grande = i < GRANDES;
        return (
          <Reveal
            key={d.titulo}
            delay={Math.min(i, 3) * 70}
            className={cn(
              "flex flex-col bg-canvas p-6 sm:p-7",
              grande ? "lg:col-span-2" : "lg:col-span-1",
            )}
          >
            <h3 className="flex items-start gap-2.5">
              {Icono && (
                <Icono
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className="mt-[0.15em] h-5 w-5 shrink-0 text-brand"
                />
              )}
              <span
                className={cn(
                  "jv-titulo",
                  grande && "text-[length:var(--text-h3)] leading-snug",
                )}
              >
                {d.titulo}
              </span>
            </h3>
            <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{d.cuerpo}</p>
            {d.enlace && (
              <Link
                href={d.enlace.href}
                className="jv-navlink mt-5 w-fit text-sm font-semibold text-ink"
              >
                {d.enlace.texto}
              </Link>
            )}
          </Reveal>
        );
      })}
    </div>
  );
}
