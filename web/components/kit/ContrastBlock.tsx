import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

/**
 * «Casi todos hacen X. Yo hago Y.»
 *
 * Es el bloque que abre casi todas las páginas del sitio y hoy se presenta
 * como un párrafo más. Aquí es una DECLARACIÓN: dos columnas desiguales, la
 * práctica común en tono apagado y la de JV en tinta plena, a tamaño de
 * titular. No es una tarjeta y no lleva caja: una caja lo devolvería al
 * montón del que se intenta sacar.
 *
 * LAS COLUMNAS SON DESIGUALES A PROPÓSITO
 * ---------------------------------------
 * 2 de 5 para lo común y 3 de 5 para lo propio. Dos columnas iguales dicen
 * «aquí hay dos opciones»; estas dicen cuál gana antes de leerlas.
 *
 * EL MOVIMIENTO, UNA VEZ
 * ----------------------
 * Al entrar en vista, la columna común se atenúa. Una sola vez, y con
 * movimiento reducido nace ya atenuada: el estado final es el que importa y
 * se lee igual sin la transición.
 */

export function ContrastBlock({
  comun,
  propio,
  como: Como = "p",
  etiquetaComun,
  etiquetaPropio,
  className,
  children,
}: {
  /** Lo que hace el mercado. Va apagado. */
  comun: string;
  /** Lo que hace JV. Va en tinta plena. */
  propio: string;
  /**
   * Con qué etiqueta se pinta la declaración. En casi todas las páginas esta
   * frase ES el encabezado de su sección —«Casi nadie publica precio y plazo
   * juntos»— y pintarla como párrafo le quita un nivel al esquema de títulos
   * que ya tenía la página. Por defecto `p`, porque la declaración puede ir
   * también dentro de una sección que ya tiene su h2.
   */
  como?: "h2" | "p";
  etiquetaComun?: string;
  etiquetaPropio?: string;
  className?: string;
  /** Una tabla, un diagrama: lo que la página quiera colgar debajo. */
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-12", className)}>
      <Reveal className="md:col-span-2">
        {etiquetaComun && <p className="jv-eyebrow text-ink-muted">{etiquetaComun}</p>}
        <p
          className={cn(
            "text-balance text-[length:var(--text-h3)] leading-snug text-ink-muted",
            etiquetaComun && "mt-3",
          )}
        >
          {comun}
        </p>
      </Reveal>

      <Reveal delay={120} className="md:col-span-3">
        {etiquetaPropio && <p className="jv-eyebrow text-brand">{etiquetaPropio}</p>}
        <Como
          className={cn(
            "text-balance text-[length:var(--text-h2)] font-semibold leading-tight tracking-[-0.02em] text-ink",
            etiquetaPropio && "mt-3",
          )}
        >
          {propio}
        </Como>
        {children && <div className="mt-8">{children}</div>}
      </Reveal>
    </div>
  );
}
