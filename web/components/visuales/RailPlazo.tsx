import { cn } from "@/lib/utils";

/**
 * EL RAIL DEL PLAZO, CON EL TRAMO QUE AÚN NO HA ARRANCADO
 * ─────────────────────────────────────────────────────────────────────────
 * La condición honesta más importante del sitio —«el reloj arranca cuando
 * llega el material, no al aceptar la propuesta»— hoy es una frase que el
 * cliente lee y no procesa. Dibujada como un tramo punteado que visiblemente
 * NO cuenta, se entiende antes de leerse: deja de ser una excusa dicha al
 * final y pasa a ser una regla enseñada al principio.
 *
 * FORMA NATIVA: la de 390 px. En columna es exactamente el <ol> de «Cómo se
 * hace» que ya tiene el sitio, con una guía dibujada al costado; de `sm` en
 * adelante el mismo DOM rota a horizontal. Ningún tramo lleva ancho fijo.
 */

export type HitoPlazo = {
  /** Rótulo corto en mono: «Día 1», «Sem 2». */
  etiqueta: string;
  /** Qué pasa en ese tramo. Una línea, dos como mucho. */
  texto: string;
};

/** El tramo de antes del día 1. Es el que hace valer el visual entero. */
export type TramoPrevio = {
  etiqueta: string;
  texto: string;
};

const PREVIO_POR_DEFECTO: TramoPrevio = {
  etiqueta: "Antes del día 1",
  texto: "Tu material: textos, fotos, logo. El reloj no ha arrancado.",
};

export function RailPlazo({
  hitos,
  previo = PREVIO_POR_DEFECTO,
  className,
}: {
  hitos: HitoPlazo[];
  /** `null` quita el tramo punteado. Por defecto va, que es la gracia. */
  previo?: TramoPrevio | null;
  className?: string;
}) {
  const tramos: { etiqueta: string; texto: string; esPrevio: boolean }[] = [
    ...(previo ? [{ ...previo, esPrevio: true }] : []),
    ...hitos.map((h) => ({ ...h, esPrevio: false })),
  ];

  return (
    <ol className={cn("flex flex-col sm:flex-row sm:items-stretch", className)}>
      {tramos.map((t, i) => {
        const esUltimo = i === tramos.length - 1;

        return (
          <li
            key={`${t.etiqueta}-${i}`}
            className="relative flex gap-4 sm:flex-1 sm:flex-col sm:gap-0 sm:pr-3"
          >
            {/* Carril: columna de 20 px a 390, franja de 20 px de alto en sm. */}
            <div className="relative flex w-5 shrink-0 items-start justify-center sm:h-5 sm:w-full sm:items-start sm:justify-start">
              {/* El tramo hacia el hito siguiente. En móvil arranca bajo el
                  punto y baja; en sm cruza la franja de lado a lado. El último
                  no lleva: el rail tiene que terminar EN la entrega, no seguir
                  de largo hacia un hito que no existe. */}
              {!esUltimo && (
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-1/2 top-3 h-[calc(100%-0.75rem)] w-[2px] -translate-x-1/2 sm:left-0 sm:top-[9px] sm:h-[3px] sm:w-full sm:-translate-x-0",
                    t.esPrevio
                      ? "w-0 border-l-2 border-dashed border-line bg-transparent sm:h-0 sm:w-full sm:border-l-0 sm:border-t-2"
                      : "rounded-full bg-secondary"
                  )}
                />
              )}
              <span
                aria-hidden
                className={cn(
                  "relative mt-1 h-[10px] w-[10px] shrink-0 rounded-full border-2 border-line sm:mt-0",
                  t.esPrevio ? "bg-line" : esUltimo ? "bg-primary-dark" : "bg-primary"
                )}
              />
            </div>

            <div className={cn("min-w-0 flex-1 pb-7 sm:pb-0 sm:pt-4", esUltimo && "pb-0")}>
              <p
                className={cn(
                  "jv-eyebrow",
                  t.esPrevio ? "text-ink-soft" : "text-accent-ink"
                )}
              >
                {t.etiqueta}
              </p>
              <p
                className={cn(
                  "mt-1.5 text-pretty font-body text-[13px] leading-snug",
                  t.esPrevio ? "text-ink-soft" : "text-ink"
                )}
              >
                {t.texto}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
