import { AlEntrar } from "@/components/AlEntrar";
import { cn } from "@/lib/utils";

/**
 * LA FRANJA DE MESES — la pieza firma de /diseno-de-paginas-web-en-barranquilla
 * ─────────────────────────────────────────────────────────────────────────
 * Una ventana de meses y los tramos dibujados encima.
 *
 * POR QUÉ EXISTE. La respuesta más útil de esa página —«construirla toma cinco
 * días, así que en enero llegas; pero que te encuentren buscando no son días
 * sino meses: pídela en octubre»— estaba escondida en la pregunta número seis
 * de un acordeón. Es una cuenta de calendario, y una cuenta de calendario se
 * entiende en un calendario: el tramo de «pídela» queda a cuatro meses del de
 * «Carnaval», y esa distancia es el argumento entero.
 *
 * LA VENTANA EMPIEZA DONDE EMPIEZA LA CUENTA, no en enero. Con los doce meses
 * de un año natural, el tramo que cruza diciembre se parte en dos y el de
 * febrero queda a un mes del borde izquierdo, que es justo lo contrario de lo
 * que la pieza tiene que enseñar. Arrancando en octubre, los cinco meses que
 * importan ocupan la franja entera y ninguno se corta.
 *
 * EL RÓTULO VA FUERA DE LA BARRA. Dentro cabía en el tramo de dos meses y no
 * en el de uno: «Carnaval» salía como «C…». Fuera, en su columna, se lee
 * igual midan lo que midan.
 *
 * NO PROMETE POSICIONAMIENTO, y por eso el tramo largo se llama «se construye»
 * y la nota al pie repite la frase que sostiene el resto del sitio: los
 * primeros movimientos, entre el mes 3 y el 6.
 */

export type TramoMes = {
  /** Mes de inicio y de fin, 1 = enero. Los dos dentro de la ventana. */
  desde: number;
  hasta: number;
  rotulo: string;
  /** Cómo se dice el tramo al lado de la barra. */
  cuando: string;
  /** El tramo que es la meta, no el trabajo. Va lleno. */
  meta?: boolean;
};

const INICIALES = ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const NOMBRES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

export function FranjaMeses({
  meses,
  tramos,
  rotulo,
  nota,
  className,
}: {
  /** La ventana, en orden y con 1 = enero: `[10, 11, 12, 1, 2]`. */
  meses: readonly number[];
  tramos: readonly TramoMes[];
  rotulo: string;
  nota?: string;
  className?: string;
}) {
  /** Dónde cae cada mes dentro de la ventana. */
  const columna = (mes: number) => meses.indexOf(mes) + 1;

  return (
    <AlEntrar className={cn("jv-franja", className)}>
      <figure className="jv-card overflow-hidden p-6 sm:p-8">
        <figcaption className="jv-eyebrow text-ink-muted">{rotulo}</figcaption>

        <div className="mt-6 flex flex-col gap-3">
          {/* La regla de meses. Las columnas van en `repeat(n, 1fr)` y no en
              `auto`: cinco meses miden cinco cosas iguales, y una rejilla que
              se adapte al contenido haría diciembre más ancho que enero por
              tener una letra distinta. */}
          <div
            aria-hidden
            className="grid gap-px overflow-hidden rounded-full bg-line"
            style={{ gridTemplateColumns: `repeat(${meses.length}, minmax(0,1fr))` }}
          >
            {meses.map((m) => (
              <span
                key={m}
                className="grid h-8 place-items-center bg-canvas font-mono text-xs text-ink-muted"
              >
                {INICIALES[m - 1]}
              </span>
            ))}
          </div>

          <ol className="flex flex-col gap-2.5">
            {tramos.map((t, i) => (
              <li
                key={t.rotulo}
                className="grid grid-cols-1 items-center gap-x-5 gap-y-1.5 sm:grid-cols-[minmax(0,1fr)_minmax(0,13rem)]"
              >
                <span
                  aria-hidden
                  className="grid gap-px"
                  style={{ gridTemplateColumns: `repeat(${meses.length}, minmax(0,1fr))` }}
                >
                  <span
                    className={cn(
                      "jv-franja__tramo block h-7 rounded-full",
                      /* Los tramos de trabajo al 45 % y no en `brand-quiet`:
                         al 12 % sobre esta superficie se leen como una ranura
                         vacía, no como un tramo marcado. La meta va llena, que
                         es la jerarquía que la pieza quiere. */
                      t.meta ? "bg-brand" : "bg-brand/45",
                    )}
                    style={{
                      gridColumn: `${columna(t.desde)} / ${columna(t.hasta) + 1}`,
                      transitionDelay: `${i * 140}ms`,
                    }}
                  />
                </span>

                <span className="min-w-0">
                  <span
                    className={cn(
                      "block text-sm font-semibold",
                      t.meta ? "text-brand" : "text-ink",
                    )}
                  >
                    {t.rotulo}
                  </span>
                  <span className="block font-mono text-xs text-ink-muted">{t.cuando}</span>
                  {/* Para quien no ve la franja, el tramo dicho entero. */}
                  <span className="sr-only">
                    , de {NOMBRES[t.desde - 1]} a {NOMBRES[t.hasta - 1]}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        {nota && <p className="mt-7 max-w-[62ch] text-sm leading-relaxed text-ink-soft">{nota}</p>}
      </figure>
    </AlEntrar>
  );
}
