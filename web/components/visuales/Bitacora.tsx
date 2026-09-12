import { ArrowUpRight, BadgeCheck } from "lucide-react";

import { AlEntrar } from "@/components/AlEntrar";
import { cn } from "@/lib/utils";

/**
 * LA BITÁCORA DE /sobre-nosotros
 * ─────────────────────────────────────────────────────────────────────────
 * Un carril vertical con lo que está construido y sigue en línea, más la
 * única credencial que dio un tercero.
 *
 * NO ORDENA POR FECHA, Y ESO ES LA PIEZA
 * --------------------------------------
 * El encargo pedía una línea de tiempo. No hay fechas confirmadas de los
 * proyectos —solo la de la verificación de Meta—, así que una línea de tiempo
 * aquí habría sido cuatro fechas inventadas en la página que existe para decir
 * que este estudio no inventa nada. La columna del margen no lleva calendario:
 * lleva **el estado comprobable**. «En línea» para lo que se abre, la fecha
 * para la credencial, «sin dominio público» para lo que no tiene dirección.
 *
 * Cuando lleguen las fechas, esta pieza pasa a orden cronológico sin tocar el
 * diseño: la columna ya existe y solo cambia lo que dice.
 *
 * EL DOMINIO ES UN ENLACE, no un texto en mono. El argumento entero de la
 * sección es que no hay que creerle a nadie: si una fila dice una dirección y
 * no se puede tocar, la fila está pidiendo fe.
 *
 * EL CARRIL SE DIBUJA al entrar en vista —`scaleY` desde arriba, que es como
 * se traza una línea—. Las filas no desvanecen: nacen legibles. Con
 * `prefers-reduced-motion` la línea está dibujada desde el primer fotograma.
 */

export type EntradaBitacora = {
  clave: string;
  nombre: string;
  etiqueta: string;
  cuerpo: string;
  /** La fecha, solo donde existe de verdad. Manda sobre el estado. */
  fecha?: string;
  dominio?: string;
  url?: string;
  /** La credencial lleva sello en vez de punto: no es un proyecto. */
  credencial?: boolean;
};

export function Bitacora({
  entradas,
  estados,
  abrir,
  className,
}: {
  entradas: readonly EntradaBitacora[];
  estados: { enLinea: string; sinDominio: string };
  abrir: string;
  className?: string;
}) {
  return (
    <AlEntrar className={cn("jv-bitacora", className)}>
      <ol>
        {entradas.map((e, i) => {
          const esUltima = i === entradas.length - 1;
          const margen = e.fecha ?? (e.dominio ? estados.enLinea : estados.sinDominio);

          return (
            <li
              key={e.clave}
              className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-5 md:grid-cols-[minmax(0,11rem)_1.25rem_minmax(0,1fr)] md:gap-x-8"
            >
              {/* El margen de la bitácora. En escritorio abre la fila desde su
                  propia columna; en móvil no hay sitio para una columna de
                  once rem, así que baja al bloque de contenido. */}
              <p className="hidden pt-[3px] text-right font-mono text-xs leading-relaxed text-ink-muted md:block">
                {margen}
              </p>

              <div className="relative flex justify-center">
                {!esUltima && (
                  <span
                    aria-hidden
                    className="jv-bitacora__linea absolute left-1/2 top-5 h-[calc(100%-1.25rem)] w-[2px] -translate-x-1/2 rounded-full bg-line"
                  />
                )}
                {e.credencial ? (
                  <span className="relative mt-[1px] grid h-5 w-5 place-items-center rounded-full border border-brand/40 bg-canvas">
                    <BadgeCheck aria-hidden className="h-3.5 w-3.5 text-brand" strokeWidth={2.5} />
                  </span>
                ) : (
                  <span
                    aria-hidden
                    className="relative mt-[5px] h-[11px] w-[11px] rounded-full border-2 border-line-strong bg-canvas"
                  />
                )}
              </div>

              <div className="pb-10 md:pb-12">
                <p className="font-mono text-xs text-ink-muted md:hidden">{margen}</p>
                <p className="jv-eyebrow mt-2 text-brand md:mt-0">{e.etiqueta}</p>
                <h3 className="jv-titulo mt-2">{e.nombre}</h3>
                <p className="mt-2 max-w-[56ch] text-sm leading-relaxed text-ink-soft">{e.cuerpo}</p>

                {e.url && e.dominio && (
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="jv-enlace mt-3 inline-flex min-h-11 items-center gap-2 font-mono text-xs text-ink"
                  >
                    <span className="sr-only">{abrir}: </span>
                    {e.dominio}
                    <ArrowUpRight aria-hidden className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </AlEntrar>
  );
}
