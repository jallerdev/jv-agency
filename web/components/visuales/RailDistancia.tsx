import { cn } from "@/lib/utils";

/**
 * LA DISTANCIA REAL
 * ─────────────────────────────────────────────────────────────────────────
 * La ventaja competitiva de un estudio en la costa es geográfica, y hoy se
 * cuenta con una frase. El rail la cuenta Y cuenta la limitación en el mismo
 * dibujo: el carril se apaga hacia el final, que dice «esto se vuelve remoto»
 * sin escribirlo.
 *
 * NO ES UN MAPA a propósito. Un mapa de Bolívar y Atlántico insinúa una
 * cobertura que no existe, y a 390 px sus etiquetas colisionan unas con otras.
 * El rail no tiene ese modo de fallo.
 *
 * ESCALA: las paradas van EQUIESPACIADAS, no a escala lineal. Con 0, 20, 120 y
 * 1.000 km una escala real amontona las tres primeras en el 2% del carril; y
 * una escala «ajustada a ojo» sería un dato falso dibujado. El kilometraje va
 * escrito en mono al lado de cada parada, que es donde el dato se lee.
 *
 * EL CARRIL: cada tramo va de su color al del siguiente, así que los tramos
 * encadenados forman UN degradado continuo sin que el componente tenga que
 * saber cuánto mide nada. Un solo elemento absoluto de punta a punta no sirve:
 * a 390 px su alto depende del texto de la última parada.
 */

export type ParadaDistancia = {
  lugar: string;
  /** Cómo se escribe la distancia. Texto, no número: lleva el «≈» y la unidad. */
  distancia: string;
  /** Qué significa esa distancia para el cliente. Dos líneas máximo. */
  nota: string;
};

export const PARADAS_POR_DEFECTO: ParadaDistancia[] = [
  { lugar: "Turbaco, Bolívar", distancia: "0 km", nota: "Aquí vivo y aquí trabajo." },
  { lugar: "Cartagena", distancia: "≈ 20 km", nota: "Nos vemos si el proyecto lo pide." },
  { lugar: "Barranquilla", distancia: "≈ 120 km", nota: "Nos vemos si el proyecto lo pide." },
  { lugar: "Bogotá", distancia: "≈ 1.000 km", nota: "A distancia, y lo digo yo primero." },
];

/* Paradas de color del carril: primary → secondary → line. Los tres son de la
   paleta; lo que se interpola es la mezcla entre ellos, no un color nuevo. */
const PARADAS_COLOR = [
  [124, 108, 245], /* violeta-500  #7C6CF5 */
  [157, 146, 248], /* violeta-400  #9D92F8 */
  [ 56, 189, 248], /* cielo-400    #38BDF8 */
] as const;

function colorEn(t: number) {
  const p = Math.min(Math.max(t, 0), 1) * (PARADAS_COLOR.length - 1);
  const i = Math.min(Math.floor(p), PARADAS_COLOR.length - 2);
  const f = p - i;
  const a = PARADAS_COLOR[i];
  const b = PARADAS_COLOR[i + 1];
  const c = a.map((v, k) => Math.round(v + (b[k] - v) * f));
  return `rgb(${c[0]} ${c[1]} ${c[2]})`;
}

export function RailDistancia({
  paradas = PARADAS_POR_DEFECTO,
  nota = "Distancias por carretera, aproximadas. Las paradas van equiespaciadas: esto no es un mapa a escala.",
  className,
}: {
  paradas?: ParadaDistancia[];
  nota?: string;
  className?: string;
}) {
  const ultimo = paradas.length - 1;

  return (
    <div className={className}>
      <ol className="flex flex-col sm:flex-row sm:items-stretch">
        {paradas.map((p, i) => {
          const esUltimo = i === ultimo;
          const desde = colorEn(ultimo === 0 ? 0 : i / ultimo);
          const hasta = colorEn(ultimo === 0 ? 1 : Math.min(i + 1, ultimo) / ultimo);

          return (
            <li
              key={p.lugar}
              className="relative flex gap-4 sm:flex-1 sm:flex-col sm:gap-0 sm:pr-3"
            >
              <div className="relative flex w-5 shrink-0 items-start justify-center sm:h-5 sm:w-full sm:items-start sm:justify-start">
                {/* Tramo hacia la parada siguiente. El último no lleva. */}
                {!esUltimo && (
                  <span
                    aria-hidden
                    style={
                      { "--c0": desde, "--c1": hasta } as React.CSSProperties &
                        Record<string, string>
                    }
                    className="absolute left-1/2 top-3 h-[calc(100%-0.75rem)] w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[var(--c0)] to-[var(--c1)] sm:left-0 sm:top-[9px] sm:h-[3px] sm:w-full sm:-translate-x-0 sm:bg-gradient-to-r"
                  />
                )}
                <span
                  aria-hidden
                  style={{ backgroundColor: desde }}
                  className="relative h-[10px] w-[10px] shrink-0 rounded-full border-2 border-surface"
                />
              </div>

              <div className={cn("min-w-0 flex-1 pb-7 sm:pb-0 sm:pt-3", esUltimo && "pb-0")}>
                <p className="font-mono text-[11px] tabular-nums tracking-[0.1em] text-accent-ink">
                  {p.distancia}
                </p>
                <p className="mt-1 font-body text-[15px] font-semibold leading-snug text-ink">
                  {p.lugar}
                </p>
                <p className="mt-1 text-pretty font-body text-[13px] leading-snug text-ink-soft">
                  {p.nota}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      {nota && (
        <p className="mt-6 max-w-[56ch] font-mono text-[11px] leading-relaxed text-ink-soft">
          {nota}
        </p>
      )}
    </div>
  );
}
