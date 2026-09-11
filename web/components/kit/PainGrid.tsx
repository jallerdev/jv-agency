import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

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
      /* LAS CUATRO COLUMNAS SOLO A PARTIR DE `xl`.
         Estaban desde `lg`, y a 1.024 px cada celda pequeña medía 230: los
         titulares se partían en cinco renglones —«Quieres / rehacerla, pero /
         te da miedo / perder lo / posicionado»— y el cuerpo iba a veinte
         caracteres por línea. Entre `sm` y `lg` van dos columnas, con las dos
         grandes a ancho completo. */
      className={cn(
        "grid grid-cols-1 gap-px overflow-hidden rounded-[--radius-lg] border border-line bg-line sm:grid-cols-2 xl:grid-cols-4",
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
              grande ? "sm:col-span-2" : "sm:col-span-1",
            )}
          >
            <h3 className="flex items-start gap-2.5">
              {/* 24 px y trazo 2, no 20 y 1,75: a ese tamaño y ese grosor, un
                  teléfono o una lupa en naranja sobre casi negro se leen como
                  una mota, no como un signo. El icono acompaña a un titular de
                  20-24 px; por debajo de eso parece suciedad en la pantalla. */}
              {Icono && (
                <Icono
                  aria-hidden="true"
                  strokeWidth={2}
                  className="mt-[0.1em] h-6 w-6 shrink-0 text-brand"
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
              /* Con `jv-navlink` no parecía un enlace: texto blanco en negrita
                 y nada más. `jv-enlace` le pone el subrayado de marca, y la
                 flecha dice que lleva a otra página. */
              <Link
                href={d.enlace.href}
                className="jv-enlace mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brand"
              >
                {d.enlace.texto}
                <ArrowUpRight aria-hidden="true" strokeWidth={2} className="h-4 w-4" />
              </Link>
            )}
          </Reveal>
        );
      })}
    </div>
  );
}
