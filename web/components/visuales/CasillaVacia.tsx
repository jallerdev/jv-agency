import { cn } from "@/lib/utils";

/**
 * LA CASILLA VACÍA, ROTULADA
 * ─────────────────────────────────────────────────────────────────────────
 * Un hueco declarado en la vitrina. La página de Bogotá ya confiesa en prosa
 * que ninguno de los trabajos es de allí, y esa frase es lo más persuasivo que
 * tiene — pero leída como un párrafo más se pierde. Como agujero visible en la
 * rejilla es imposible de ignorar y es imposible de fingir: nadie diseña un
 * hueco en su propio portafolio.
 *
 * SIN FONDO PROPIO por defecto. Estas rejillas suelen vivir dentro de una
 * `.banda`, y ahí el tono lo pone la banda y solo la banda. Si la sección es
 * canvas y la casilla se pierde, se le añade `bg-surface/50` por `className`.
 *
 * El `min-h-[12rem]` no es decorativo: sin él, a 390 px la tarjeta colapsa a
 * una franja de 40 px y se lee como un error de render, no como una decisión.
 */
export function CasillaVacia({
  rotulo = "Casilla vacía",
  children,
  className,
}: {
  rotulo?: string;
  /** Qué falta y qué pasará cuando exista. Dos renglones como mucho. */
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "grid min-h-[12rem] place-items-center rounded-2xl border-2 border-dashed border-line bg-transparent p-6 text-center",
        className
      )}
    >
      <div className="max-w-[26ch]">
        <p className="jv-eyebrow text-ink-soft">{rotulo}</p>
        <p className="mt-3 text-balance font-body text-[15px] leading-snug text-ink-soft">
          {children}
        </p>
      </div>
    </article>
  );
}
