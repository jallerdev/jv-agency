import { AlEntrar } from "@/components/AlEntrar";
import { cn } from "@/lib/utils";

/**
 * «LO QUE NO VOY A ESCRIBIR» — la pieza firma de /sectores/clinicas-y-consultorios
 * ─────────────────────────────────────────────────────────────────────────
 * Cinco frases que en una página de salud no se pueden escribir, y una barra
 * de censura que se desliza sobre cada una cuando la pieza entra en vista.
 *
 * POR QUÉ LAS FRASES Y NO LAS REGLAS. La página ya tenía las cuatro reglas
 * escritas y son correctas: promesas de resultado, servicios sin habilitación,
 * datos de paciente, comparaciones. Nadie las lee. Son cuatro párrafos de
 * normativa en la página de alguien que llegó buscando una web. Las frases
 * concretas SÍ se leen, porque el visitante las ha visto —o las ha escrito— en
 * su propia publicidad, y verlas tacharse delante de él hace el argumento en
 * un segundo. Las reglas siguen debajo, que es donde ahora sí se leen: como la
 * explicación de algo que ya entendió.
 *
 * LA FRASE SIGUE EN EL HTML, TACHADA. No se borra ni se esconde: se lee, se
 * entiende por qué está prohibida y el motivo va justo al lado. Un texto
 * escondido tras una barra sería un chiste visual; con el motivo al lado es
 * una lección.
 *
 * CON MOVIMIENTO REDUCIDO la barra está puesta desde el primer fotograma. Lo
 * que se pierde es el gesto, no el argumento: la frase sigue tachada.
 */

export type FraseTachada = { frase: string; motivo: string };

export function Censura({
  frases,
  rotulo,
  className,
}: {
  frases: readonly FraseTachada[];
  rotulo: string;
  className?: string;
}) {
  return (
    <AlEntrar className={cn("jv-censura", className)}>
      <figure className="jv-card overflow-hidden p-6 sm:p-8">
        <figcaption className="jv-eyebrow text-ink-muted">{rotulo}</figcaption>

        <ul className="mt-6 flex flex-col divide-y divide-line border-y border-line">
          {frases.map((f) => (
            <li
              key={f.frase}
              className="grid grid-cols-1 items-baseline gap-x-8 gap-y-2 py-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]"
            >
              {/* La frase y su barra. `inline-block` para que la barra mida lo
                  que mide el texto y no el renglón entero: tachada de pared a
                  pared no se lee como una frase prohibida, se lee como un
                  separador.

                  EL ALTO DE LA BARRA VA EN `em`, y su posición también: a
                  `top: 50%` la barra cae en el centro de la CAJA de línea, que
                  con interlineado 1,375 queda un quinto de eme por debajo del
                  centro visual de las letras —tachaba el pie de la palabra en
                  vez de la palabra—. `0.47em` es el centro óptico. */}
              <span className="relative inline-block w-fit text-[length:var(--text-h4)] font-semibold leading-snug text-ink-soft">
                {f.frase}
                <span
                  aria-hidden
                  className="jv-censura__barra absolute inset-x-0 top-[0.47em] block h-[0.42em] -translate-y-1/2 rounded-[2px] bg-brand"
                />
              </span>

              <span className="text-sm leading-relaxed text-ink-muted">{f.motivo}</span>
            </li>
          ))}
        </ul>
      </figure>
    </AlEntrar>
  );
}
