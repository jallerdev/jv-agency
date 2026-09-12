import { cn } from "@/lib/utils";

/**
 * LA PORTADA TIPOGRÁFICA DE UN ARTÍCULO
 * ─────────────────────────────────────────────────────────────────────────
 * El índice del blog era once filas de texto: rótulo, titular, entradilla,
 * fecha. Correcto y plano —nada distingue un artículo de otro hasta que lo
 * lees—. La portada le da a cada uno una cara sin meter una sola foto de
 * banco, que es lo que hacen los blogs que quieren parecer revistas.
 *
 * LO QUE VA EN GRANDE ES UN DATO, NO UNA DECORACIÓN. El piso de precio, el
 * plazo, la ventana de resultados: el motivo por el que alguien abre ese
 * artículo. Donde no hay cifra que dar, va el tiempo de lectura, que también
 * es real y además cambia en cada uno. Inventar una cifra para llenar la caja
 * sería justo lo contrario de lo que este blog defiende.
 *
 * SIN TEXTURA DE FONDO, Y SE INTENTÓ. La primera versión llevaba una trama por
 * categoría —rayas para precios, anillos para decisión, puntos para guías— y
 * el detector marcó las tres, cada una con su nombre de patrón genérico. Tenía
 * razón, y el argumento se sostiene sin él: la categoría YA ESTÁ ESCRITA en el
 * antetítulo, dos centímetros encima. Una trama que repite con textura lo que
 * la palabra ya dice no es información, es relleno con coartada.
 *
 * Lo que de verdad distingue una portada de otra es la cifra, y son once
 * cifras distintas. Con la caja limpia se leen mejor.
 *
 * LA MISMA PIEZA SIRVE DE `og:image` porque no depende de nada del navegador:
 * es tipografía sobre un color plano, que es lo que `next/og` sabe pintar.
 */

export type TramaPortada = "precios" | "decision" | "guias";

export function PortadaArticulo({
  cifra,
  categoria,
  className,
}: {
  /** La cifra, ya resuelta: el dato del artículo o su tiempo de lectura. */
  cifra: string;
  categoria: string;
  /** Se conserva en el tipo porque el manifiesto la sigue clasificando. */
  trama?: TramaPortada;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "jv-portada flex aspect-[16/9] flex-col justify-end overflow-hidden border-b border-line bg-surface p-6",
        className,
      )}
    >
      <span className="jv-eyebrow text-ink-muted">{categoria}</span>
      {/* La cifra se mueve un pelo al pasar por encima: es el único gesto de
          la tarjeta y dice que la tarjeta entera es el enlace. */}
      <span className="jv-portada__cifra mt-2 font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-semibold leading-none tracking-[-0.03em] text-brand">
        {cifra}
      </span>
    </div>
  );
}
