import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PrecioContado } from "@/components/kit/PrecioContado";
import type { Idioma } from "@/content/types";
import { money } from "@/lib/money";
import { cn } from "@/lib/utils";

/**
 * UNA FILA DE PRECIO
 * ─────────────────────────────────────────────────────────────────────────
 * El mueble con el que todo el sitio dice cuánto cuesta algo: /precios, los
 * dos sectores y las siete ciudades. Estaba escrito siete veces con las mismas
 * cuarenta líneas de JSX, así que cualquier arreglo —la alineación de los
 * importes, el apilado en teléfono, el hover— había que hacerlo siete veces o
 * se quedaba a medias en seis páginas.
 *
 * LAS TRES RANURAS DEL IMPORTE, EN `rem` Y NO EN `ch`. El `ch` es el ancho del
 * glifo «0» de la primera fuente disponible, y aquí resolvía al valor de
 * reserva: «$2.500.000» se salía diecinueve píxeles de su caja. Con anchos
 * fijos los pesos caen en columna de arriba abajo, que es a lo que se viene a
 * una lista de precios.
 *
 * EL HOVER ES UNA CORTINA QUE ENTRA POR LA IZQUIERDA, no un cambio de color.
 * Una fila que solo se aclara al pasar por encima no dice que sea pulsable;
 * una cortina que barre en el sentido de la lectura, el nombre que se corre un
 * poco y una flecha que aparece al final, sí. El importe NO se mueve: es lo
 * único de la fila que está alineado con las otras siete, y moverlo rompería
 * la columna que la pieza existe para construir.
 *
 * SOLO DONDE HAY PUNTERO DE VERDAD. En táctil el hover se queda pegado después
 * de tocar, así que la cortina vive dentro de `@media (hover: hover)`. El
 * `:active` sí funciona en los dos y es el que confirma el toque.
 */

export function FilaPrecio({
  nombre,
  descripcion,
  plazo,
  monto,
  desde = true,
  unidad,
  href,
  idioma,
  /** Su posición en la tabla: decide el escalón de la cuenta. */
  indice,
  /** La cuenta solo se pide donde la tabla es el héroe de la página. */
  cuenta = false,
  className,
}: {
  nombre: string;
  descripcion?: string;
  plazo?: string;
  /** El importe en pesos, o el texto para las líneas sin número. */
  monto: number | string;
  desde?: boolean;
  /** «/mes», «/año». Va en su propia ranura para no mover la cifra. */
  unidad?: string;
  href?: string;
  idioma: Idioma;
  indice?: number;
  cuenta?: boolean;
  className?: string;
}) {
  const etiquetaDesde = desde && typeof monto === "number" ? (idioma === "es" ? "desde" : "from") : "";

  const cuerpo = (
    <>
      <span className="relative min-w-0 flex-1">
        <span className="jv-fila__nombre block text-[length:var(--text-h4)] font-semibold text-ink">
          {nombre}
        </span>
        {descripcion && (
          <span className="mt-1.5 block max-w-[62ch] text-sm leading-relaxed text-ink-soft">
            {descripcion}
          </span>
        )}
        {plazo && <span className="mt-2 block font-mono text-xs text-ink-muted">{plazo}</span>}
      </span>

      {typeof monto === "number" ? (
        <span className="relative flex items-baseline gap-2 font-mono tabular-nums sm:shrink-0">
          <span className="w-11 text-right text-xs text-ink-muted">{etiquetaDesde}</span>
          <span className="w-[7.5rem] text-right text-[length:var(--text-h4)] text-brand">
            {cuenta ? (
              <PrecioContado valor={monto} idioma={idioma} indice={indice} />
            ) : (
              money(monto, idioma)
            )}
          </span>
          <span className="w-9 whitespace-nowrap text-xs text-ink-muted">{unidad ?? ""}</span>
        </span>
      ) : (
        /* Sin número que dar, la fila lo dice con palabras y no finge una
           cifra. La ranura es la misma, así que la columna no se descuadra. */
        <span className="relative font-mono text-sm text-ink-muted sm:w-[10.75rem] sm:shrink-0 sm:text-right">
          {monto}
        </span>
      )}

      {/* LA RANURA DE LA FLECHA SE RESERVA SIEMPRE, tenga enlace o no. Sin
          reservarla, las filas con enlace empujaban su importe veinticuatro
          píxeles a la izquierda y la columna de pesos de las páginas de ciudad
          —donde la renovación anual no enlaza a ninguna parte— dejaba de estar
          alineada. Medido: siete bordes distintos en cuatro páginas. */}
      <ArrowRight
        aria-hidden
        strokeWidth={2}
        className={cn(
          "jv-fila__flecha relative hidden h-4 w-4 shrink-0 self-center text-brand sm:block",
          !href && "invisible",
        )}
      />
    </>
  );

  const clases = cn(
    "jv-fila relative flex flex-col gap-3 px-3 py-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6",
    href && "focus-ring",
    className,
  );

  return (
    <li className="max-w-none">
      {href ? (
        <Link href={href} className={clases}>
          {cuerpo}
        </Link>
      ) : (
        <span className={clases}>{cuerpo}</span>
      )}
    </li>
  );
}
