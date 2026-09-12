import type { Idioma } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * EL RELOJ DE 24 HORAS
 * ─────────────────────────────────────────────────────────────────────────
 * «El que escribe a las 9 p. m. y no recibe respuesta, a las 9:05 ya le
 * escribió a otro» es la mejor línea de la página. Esto la dibuja.
 *
 * ANTES ERAN DOS DONAS, una al lado de la otra, y comparar dos círculos
 * distintos obliga a medirlos con el ojo. Aquí hay UNA esfera de veinticuatro
 * horas: el arco corto es el mostrador abierto y el anillo completo es el bot.
 * El hueco entre los dos —esas catorce horas— es el argumento, y se ve sin
 * leer una cifra.
 *
 * EL MARCADOR VA A LAS 9:41 P. M. porque es la hora de la conversación de
 * ejemplo de esta misma página: el visitante ve el punto fuera del horario de
 * mostrador y encuentra, dos secciones más abajo, esa hora exacta en el chat.
 *
 * SVG PURO, SIN ESTADO Y SIN KEYFRAMES: nada que apagar con movimiento
 * reducido. El horario de mostrador va rotulado como supuesto, que es lo que
 * es: aquí no se inventa el horario de nadie.
 */

const R_EXTERIOR = 52;
const R_INTERIOR = 38;
const CIRC_EXT = 2 * Math.PI * R_EXTERIOR;
const CIRC_INT = 2 * Math.PI * R_INTERIOR;

/** Grados desde arriba para una hora del día, con 0 h en las doce. */
const grados = (hora: number) => (hora / 24) * 360;

/** Punto del círculo para una hora, en el sistema del viewBox. */
function punto(hora: number, radio: number) {
  const rad = ((grados(hora) - 90) * Math.PI) / 180;
  return { x: 60 + radio * Math.cos(rad), y: 60 + radio * Math.sin(rad) };
}

export function Reloj24({
  idioma,
  titulo,
  abre,
  cierra,
  marcador,
  etiquetaHoy,
  etiquetaBot,
  nota,
  horas,
  className,
}: {
  idioma: Idioma;
  titulo: string;
  /** Hora de apertura del mostrador del ejemplo, en horas (8 = 8 a. m.). */
  abre: number;
  cierra: number;
  /** La hora del marcador, en horas decimales. 21.68 son las 9:41 p. m. */
  marcador: number;
  etiquetaHoy: string;
  etiquetaBot: string;
  nota: string;
  /** Cómo se escribe la hora del marcador, ya formateada. */
  horas: string;
  className?: string;
}) {
  const abierto = cierra - abre;
  const arco = (abierto / 24) * CIRC_INT;
  const p = punto(marcador, R_EXTERIOR);

  return (
    <div className={cn("jv-card p-7", className)}>
      <h3 className="jv-titulo">{titulo}</h3>

      <div className="mt-6 grid grid-cols-1 items-center gap-7 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
        {/* El `viewBox` se abre 12 unidades por lado: los rótulos de las horas
            van a 62 del centro y con la caja en 0–120 el «00» quedaba cortado
            por el borde de arriba. */}
        <svg
          viewBox="-12 -12 144 144"
          className="mx-auto w-full max-w-[14rem]"
          role="img"
          aria-label={`${etiquetaBot}: 24 h. ${etiquetaHoy}: ${abierto} h.`}
        >
          {/* Anillo exterior: las 24 horas, completo. Es el bot. */}
          <circle
            cx="60"
            cy="60"
            r={R_EXTERIOR}
            fill="none"
            stroke="var(--brand-500)"
            strokeWidth="6"
            strokeDasharray={`${CIRC_EXT} 0`}
          />

          {/* Anillo interior: el mostrador. El resto del anillo queda en el
              color del filete, que es el hueco del que habla la sección. */}
          <circle cx="60" cy="60" r={R_INTERIOR} fill="none" stroke="var(--line)" strokeWidth="10" />
          <circle
            cx="60"
            cy="60"
            r={R_INTERIOR}
            fill="none"
            stroke="var(--text-body)"
            strokeWidth="10"
            strokeDasharray={`${arco} ${CIRC_INT - arco}`}
            transform={`rotate(${grados(abre) - 90} 60 60)`}
          />

          {/* Las cuatro horas cardinales, para que la esfera se lea como un
              reloj de 24 y no como una dona cualquiera. */}
          {[0, 6, 12, 18].map((h) => {
            const q = punto(h, R_EXTERIOR + 10);
            return (
              <text
                key={h}
                x={q.x}
                y={q.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="7"
                className="fill-ink-muted font-mono"
              >
                {String(h).padStart(2, "0")}
              </text>
            );
          })}

          {/* El marcador de la conversación de ejemplo. */}
          <circle cx={p.x} cy={p.y} r="5" fill="var(--canvas)" stroke="var(--brand-300)" strokeWidth="2.5" />
        </svg>

        <dl className="grid gap-4">
          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-brand"
            />
            <div>
              <dt className="font-semibold text-ink">{etiquetaBot}</dt>
              <dd className="font-mono text-sm tabular-nums text-ink-soft">
                24 {idioma === "es" ? "h" : "h"}
              </dd>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-ink-soft"
            />
            <div>
              <dt className="font-semibold text-ink">{etiquetaHoy}</dt>
              <dd className="font-mono text-sm tabular-nums text-ink-soft">
                {abierto} {idioma === "es" ? "h" : "h"}
              </dd>
            </div>
          </div>

          <div className="jv-rule flex items-start gap-3 pt-4">
            <span
              aria-hidden="true"
              className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-brand-300"
            />
            <p className="font-mono text-sm text-ink-soft">{horas}</p>
          </div>
        </dl>
      </div>

      <p className="jv-eyebrow mt-6 text-ink-muted">{nota}</p>
    </div>
  );
}
