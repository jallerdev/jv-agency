import Link from "next/link";

import { cn } from "@/lib/utils";
import type { Idioma } from "@/content/types";

/**
 * La tarjeta de proyecto, con marco de navegador.
 *
 * LA DISTINCIÓN QUE HACE ESTA TARJETA ES EL PUNTO DEL SITIO
 * ---------------------------------------------------------
 * El punto va en NARANJA y no en verde: el sistema tiene un solo acento y el
 * verde está reservado a estado de formulario. El «en línea» de la portada ya
 * se pinta así, con `.jv-latido`, y esta tarjeta usa la misma clase para que
 * las dos superficies latan igual.
 *
 * «En producción» y «Proyecto de estudio» no pueden parecerse. Un portafolio
 * que mezcla lo que está en línea con lo que se hizo para practicar, y lo
 * enseña igual, está mintiendo por omisión aunque cada palabra sea cierta.
 *
 * Por eso la diferencia es de FORMA y no solo de etiqueta:
 *   en producción  → filete continuo, punto naranja que late despacio, y el
 *                    marco entero es un enlace de verdad al dominio real.
 *   estudio        → filete discontinuo, sin punto, sin enlace.
 *
 * Alguien que pase la vista sin leer las etiquetas igual ve dos cosas
 * distintas. Ese es el objetivo.
 *
 * EL DOMINIO VA EN LA BARRA DE DIRECCIÓN
 * --------------------------------------
 * Escrito, comprobable y con `break-all`: un dominio largo en un teléfono de
 * 390px rompe la tarjeta si no se le deja partir.
 */

const ESTADO: Record<"produccion" | "estudio", Record<Idioma, string>> = {
  produccion: { es: "En producción", en: "In production" },
  estudio: { es: "Proyecto de estudio", en: "Studio project" },
};

const ABRE: Record<Idioma, string> = { es: "Abre en otra pestaña", en: "Opens in a new tab" };

export function ProofCard({
  nombre,
  categoria,
  cuerpo,
  dominio,
  url,
  estado,
  idioma,
  destacada = false,
  className,
  children,
}: {
  nombre: string;
  categoria?: string;
  cuerpo?: string;
  /** El dominio, sin protocolo. Solo para los que están en línea. */
  dominio?: string;
  /** La URL real. Sin ella, la tarjeta no enlaza aunque diga «en producción». */
  url?: string;
  estado: "produccion" | "estudio";
  idioma: Idioma;
  /** Una tarjeta por rejilla puede pedir más aire. */
  destacada?: boolean;
  className?: string;
  /** La captura, si la hay. */
  children?: React.ReactNode;
}) {
  const enLinea = estado === "produccion" && Boolean(url);

  const marco = (
    /* `h-full` y columna: en una rejilla, dos tarjetas de la misma fila tienen
       que llegar abajo iguales. Sin esto, la que tiene menos texto queda corta
       y la fila se ve rota. */
    <div
      className={cn(
        "jv-card flex h-full flex-col overflow-hidden",
        estado === "estudio" && "border-dashed",
        enLinea && "jv-card-int jv-lift",
      )}
    >
      {/* La barra de dirección. `aria-hidden` porque es la ilustración de un
          navegador, no información: el dominio se anuncia con el enlace.

          SIN DOMINIO NO HAY BARRA. Pintaba un guion dentro de una pastilla
          vacía, que es una ventana de navegador sin dirección: justo lo que un
          proyecto de estudio no tiene. Mejor no dibujar la ventana. */}
      {dominio && (
        <div
          aria-hidden="true"
          className="flex items-center gap-2 border-b border-line bg-raised px-3 py-2"
        >
          <span className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-line-strong" />
            <span className="h-2 w-2 rounded-full bg-line-strong" />
            <span className="h-2 w-2 rounded-full bg-line-strong" />
          </span>
          <span className="min-w-0 flex-1 truncate rounded-full bg-surface px-3 py-1 font-mono text-xs text-ink-soft">
            {dominio}
          </span>
        </div>
      )}

      {children && <div className="relative">{children}</div>}

      <div className={cn("flex flex-1 flex-col p-6", destacada && "sm:p-8")}>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "jv-chip jv-chip-off text-xs",
              estado === "estudio" && "border-dashed",
            )}
          >
            {estado === "produccion" && (
              <span
                aria-hidden="true"
                className="jv-latido h-1.5 w-1.5 rounded-full bg-brand"
              />
            )}
            {ESTADO[estado][idioma]}
          </span>
          {categoria && <span className="jv-chip jv-chip-off text-xs">{categoria}</span>}
        </div>

        <h3 className={cn("jv-titulo mt-4", destacada && "text-[length:var(--text-h3)]")}>
          {nombre}
        </h3>
        {cuerpo && <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{cuerpo}</p>}
        {dominio && (
          /* `break-all` porque un dominio largo en un teléfono de 390px
             desborda la tarjeta, y un desborde lateral es de las pocas cosas
             que el barrido de calidad no perdona. */
          <p className="mt-4 break-all font-mono text-xs text-ink-soft">{dominio}</p>
        )}
      </div>
    </div>
  );

  if (!enLinea) return <div className={cn("h-full", className)}>{marco}</div>;

  return (
    <Link
      href={url!}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${nombre} — ${dominio} · ${ABRE[idioma]}`}
      className={cn("focus-ring block h-full rounded-[--radius-lg]", className)}
    >
      {marco}
    </Link>
  );
}
