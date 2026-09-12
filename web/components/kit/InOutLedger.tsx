import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import type { Idioma } from "@/content/types";

/**
 * «Lo que entra» / «Lo que no entra».
 *
 * LA COLUMNA DE LA DERECHA ES LA QUE VENDE
 * ----------------------------------------
 * Cualquiera publica lo que incluye. Publicar lo que NO incluye, con nombre y
 * con quién lo cobra, es el argumento entero de este estudio, y por eso la
 * columna de la derecha pesa más que la de la izquierda en vez de ser su
 * apéndice: mismo tamaño de letra, y el sello de quién cobra en tinta plena.
 *
 * LOS SELLOS
 * ----------
 * «tu tarjeta», «un fotógrafo», «se cotiza aparte», «no es lo mío». Entran
 * escalonados la primera vez que la lista aparece —nivel 2 de movimiento, una
 * sola vez— y son lo único que se mueve en este bloque. Con movimiento
 * reducido salen puestos, que es su estado final.
 */

export type Fila = {
  texto: string;
  /** El sello: quién lo cobra o por qué no entra. Solo en la columna de fuera. */
  sello?: string;
};

const TITULOS: Record<Idioma, { dentro: string; fuera: string }> = {
  es: { dentro: "Lo que entra", fuera: "Lo que no entra" },
  en: { dentro: "What's included", fuera: "What's not" },
};

export function InOutLedger({
  dentro,
  fuera,
  remate,
  idioma,
  titulos,
  className,
}: {
  dentro: readonly Fila[];
  fuera: readonly Fila[];
  /** «Esta lista vale más que la de arriba», o lo que diga la página. */
  remate?: string;
  idioma: Idioma;
  /** Para una página que llame a sus columnas de otra forma. */
  titulos?: { dentro: string; fuera: string };
  className?: string;
}) {
  const t = titulos ?? TITULOS[idioma];

  return (
    <div className={cn("grid grid-cols-1 gap-px overflow-hidden rounded-[--radius-lg] border border-line bg-line md:grid-cols-2", className)}>
      <section className="bg-canvas p-6 sm:p-8">
        <h3 className="jv-eyebrow text-ink-soft">{t.dentro}</h3>
        <ul className="mt-5 space-y-3">
          {dentro.map((f) => (
            <li key={f.texto} className="flex gap-3 text-ink">
              <span aria-hidden="true" className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-brand" />
              <span className="leading-relaxed">{f.texto}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-surface p-6 sm:p-8">
        <h3 className="jv-eyebrow text-ink-soft">{t.fuera}</h3>
        <Reveal as="ul" stagger className="mt-5 space-y-3">
          {fuera.map((f) => (
            <li key={f.texto} className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="leading-relaxed text-ink">{f.texto}</span>
              {f.sello && (
                <span className="jv-chip jv-chip-off shrink-0 text-xs">{f.sello}</span>
              )}
            </li>
          ))}
        </Reveal>

        {remate && (
          <p className="mt-7 border-t border-line pt-5 text-[length:var(--text-h4)] font-semibold leading-snug text-ink">
            {remate}
          </p>
        )}
      </section>
    </div>
  );
}
