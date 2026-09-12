import type { Idioma } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * LA DISTANCIA REAL
 * ─────────────────────────────────────────────────────────────────────────
 * La ventaja de un estudio en la costa es geográfica, y hoy se cuenta con una
 * frase. El rail la dibuja: el carril se aclara con la distancia —de brand-700
 * a brand-300—, así que la última parada pesa menos en la página que la
 * primera sin que haga falta escribir «esto ya es remoto».
 *
 * LO QUE LA DISTANCIA CAMBIA ES SI NOS VEMOS EN PERSONA, no si tomo el
 * trabajo. Se atiende a negocios de cualquier parte de Colombia; lo que no
 * existe es una oficina en cada ciudad, y eso es lo que el rail declara. Las
 * páginas de ciudad existen para buscar trabajo en esas plazas, no para
 * insinuar una sede allá: la última parada lo dice en palabras y la nota al
 * pie lo remata.
 *
 * NO ES UN MAPA a propósito. Un mapa dibuja una mancha de cobertura —y una
 * mancha es más difícil de decir con precisión que una línea de paradas—, y a
 * 390 px sus etiquetas colisionan unas con otras. El rail no tiene ese modo de
 * fallo.
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

/**
 * Las paradas por defecto, en los dos idiomas.
 *
 * Estaban solo en castellano y el componente se monta sin props desde
 * `components/paginas/Web.tsx`, que sirve tanto
 * `/servicios/diseno-de-paginas-web` como `/en/services/web-design`: la página
 * en inglés pintaba un bloque entero de prosa castellana. El lugar y el
 * kilometraje no se traducen —son nombres propios y números—, la nota sí.
 */
export const PARADAS_POR_DEFECTO: Record<Idioma, ParadaDistancia[]> = {
  es: [
    { lugar: "Turbaco, Bolívar", distancia: "0 km", nota: "Aquí vivo y aquí trabajo." },
    { lugar: "Cartagena", distancia: "≈ 20 km", nota: "Nos vemos si el proyecto lo pide." },
    { lugar: "Barranquilla", distancia: "≈ 120 km", nota: "Nos vemos si el proyecto lo pide." },
    {
      lugar: "Bogotá y el resto del país",
      distancia: "≈ 1.000 km",
      nota: "A distancia, y lo digo yo primero. Se trabaja igual.",
    },
  ],
  en: [
    { lugar: "Turbaco, Bolívar", distancia: "0 km", nota: "This is where I live and work." },
    { lugar: "Cartagena", distancia: "≈ 20 km", nota: "We meet in person if the project calls for it." },
    { lugar: "Barranquilla", distancia: "≈ 120 km", nota: "We meet in person if the project calls for it." },
    {
      lugar: "Bogotá and the rest of the country",
      distancia: "≈ 1,000 km",
      nota: "Remote, and I say so first. The work is the same.",
    },
  ],
};

/**
 * La nota al pie. Dice dos cosas y las dos hacen falta:
 *
 * · Que el dibujo no está a escala, porque si no lo dice alguien va a medir
 *   con el ojo y a concluir que Barranquilla queda a mitad de camino de
 *   Bogotá.
 * · Que la distancia decide si nos vemos, no si tomo el trabajo. Sin esa
 *   frase, un riel que empieza en Turbaco y termina a 1.000 km se lee como un
 *   radio de cobertura, y el radio de cobertura es todo el país.
 */
const NOTA_PIE: Record<Idioma, string> = {
  es: "Distancias por carretera, aproximadas; las paradas van equiespaciadas, así que esto no es un mapa a escala. Trabajo con negocios de cualquier parte de Colombia: la distancia decide si nos vemos en persona, no si tomo el proyecto.",
  en: "Road distances, approximate; the stops are evenly spaced, so this isn't a map to scale. I work with businesses anywhere in Colombia: distance decides whether we meet in person, not whether I take the project.",
};

/* Paradas de color del carril, dentro de la rampa de marca: 600 → 500 → 300.
   Estaban en violeta y azul cielo —#7C6CF5, #9D92F8, #38BDF8— de la marca
   anterior. Van escritas como tripletas porque el carril INTERPOLA entre
   ellas para dibujar el degradado, y `var(--brand-500)` no se puede
   interpolar en JavaScript. Si cambia la rampa, cambian aquí. */
const PARADAS_COLOR = [
  [182,  58,  36], /* brand-700  #B63A24 */
  [232,  98,  63], /* brand-500  #E8623F */
  [240, 153, 125], /* brand-300  #F0997D */
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
  idioma = "es",
  paradas,
  nota,
  className,
}: {
  idioma?: Idioma;
  paradas?: readonly ParadaDistancia[];
  nota?: string;
  className?: string;
}) {
  const lista = paradas ?? PARADAS_POR_DEFECTO[idioma];
  const pie = nota ?? NOTA_PIE[idioma];
  const ultimo = lista.length - 1;

  return (
    <div className={className}>
      <ol className="flex flex-col sm:flex-row sm:items-stretch">
        {lista.map((p, i) => {
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
                  className="relative h-[10px] w-[10px] shrink-0 rounded-full border-2 border-line"
                />
              </div>

              <div className={cn("min-w-0 flex-1 pb-7 sm:pb-0 sm:pt-3", esUltimo && "pb-0")}>
                <p className="font-mono text-xs tabular-nums tracking-[0.1em] text-accent-ink">
                  {p.distancia}
                </p>
                <p className="mt-1 font-body text-[15px] font-semibold leading-snug text-ink">
                  {p.lugar}
                </p>
                {/* 14 px = el paso `ui-xs` de la escala de interfaz. Estaba en
                    13 px, que no es ningún paso: era la única letra del sitio
                    de ese tamaño. */}
                <p className="mt-1 text-pretty font-body text-sm leading-snug text-ink-soft">
                  {p.nota}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      {/* La condición era `nota &&`, no `pie &&`: la nota al pie solo salía en
          las páginas que pasaban una propia —Cartagena, Barranquilla— y el
          texto por defecto no se pintó nunca en ningún sitio. La escala y la
          cobertura son justamente lo que hay que aclarar donde nadie escribió
          una nota a mano. */}
      {pie && (
        <p className="mt-6 max-w-[56ch] font-mono text-xs leading-relaxed text-ink-soft">
          {pie}
        </p>
      )}
    </div>
  );
}
