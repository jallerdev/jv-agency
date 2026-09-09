import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * INCLUYE / NO INCLUYE, CON LA ETIQUETA DE QUIÉN LO HACE
 * ─────────────────────────────────────────────────────────────────────────
 * Las dos listas siguen ENTERAS: son la columna vertebral de honestidad del
 * sitio y no se recortan. Lo que cambia es que dejan de ser dos <ul> sueltos y
 * pasan a leerse como un solo libro de cuentas.
 *
 * La jugada que sí ahorra texto: cada renglón del «no incluye» lleva una
 * micro-etiqueta con QUIÉN lo hace entonces —tú · tu contador · la pasarela ·
 * la transportadora · se cotiza aparte—. Esa respuesta hoy va escondida dentro
 * de cada frase; sacada a etiqueta, la frase se parte por la mitad y el
 * visitante obtiene lo que vino a saber, que no es «qué falta» sino «entonces
 * quién resuelve eso».
 *
 * La etiqueta va INLINE, pegada a la última palabra, no en su propio flex-item:
 * así nunca cae huérfana en un renglón suyo a 390 px.
 *
 * SIN FONDO PROPIO: estas secciones ya viven dentro de una `.banda`.
 */

export type ItemNoIncluye = {
  texto: string;
  /** Quién lo hace entonces. Dos o tres palabras: «tu contador», «la pasarela». */
  quien: string;
};

export function Comparador({
  incluye,
  noIncluye,
  tituloIncluye,
  tituloNoIncluye,
  nota,
  tituloComo: Titulo = "h3",
  className,
}: {
  incluye: string[];
  noIncluye: ItemNoIncluye[];
  tituloIncluye?: React.ReactNode;
  tituloNoIncluye?: React.ReactNode;
  /** Va bajo el título de «no incluye». Es donde se explica por qué importa. */
  nota?: React.ReactNode;
  /** El nivel real depende de la página. Por defecto h3. */
  tituloComo?: "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={cn("grid gap-8 lg:grid-cols-2 lg:gap-12", className)}>
      <section>
        {tituloIncluye && (
          <Titulo className="font-display text-2xl text-ink sm:text-3xl">{tituloIncluye}</Titulo>
        )}
        <ul className={cn("divide-y divide-line", tituloIncluye && "mt-6")}>
          {incluye.map((x) => (
            <li key={x} className="flex items-start gap-3 py-3">
              <Check aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="min-w-0 font-body text-[15px] leading-snug text-ink-soft">{x}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* El filete que separa las dos mitades es horizontal a 390 y vertical de
          lg en adelante. Al revés, la línea vertical queda flotando en el aire. */}
      <section className="border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
        {tituloNoIncluye && (
          <Titulo className="font-display text-2xl text-ink sm:text-3xl">{tituloNoIncluye}</Titulo>
        )}
        {nota && (
          <p className="mt-4 font-body text-[15px] leading-relaxed text-ink-soft">{nota}</p>
        )}
        <ul className={cn("divide-y divide-line", (tituloNoIncluye || nota) && "mt-6")}>
          {noIncluye.map((x) => (
            <li key={x.texto} className="flex items-start gap-3 py-3">
              <X aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <p className="min-w-0 font-body text-[15px] leading-snug text-ink-soft">
                {x.texto}{" "}
                <span className="ml-0.5 inline-flex items-center whitespace-nowrap rounded-full border border-line px-2 py-0.5 align-middle font-mono text-[11px] uppercase tracking-[0.14em] text-accent-ink">
                  {x.quien}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
