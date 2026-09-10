import { FRASES } from "@/content/home/marquee";
import type { Idioma } from "@/content/types";

/**
 * LA MARQUESINA, DE VERDAD INFINITA
 * ──────────────────────────────────────────────────────────────────────────
 * El truco de siempre es duplicar el carril y moverlo un −50%: al llegar al
 * final, la segunda copia está donde arrancó la primera y no hay salto.
 *
 * PERO SOLO FUNCIONA SI UNA COPIA ES MÁS ANCHA QUE LA PANTALLA. Con diez
 * palabras cortas, una copia medía 1.133 px y la ventana 1.440: al final del
 * ciclo se veía el hueco de trescientos píxeles entre el final de la segunda
 * copia y el borde derecho, y la marquesina dejaba de parecer infinita, que es
 * justo lo que Luis señaló.
 *
 * Por eso se pintan SEIS copias y se mueve −50%: las tres que recorren el
 * carril miden más de tres mil píxeles, así que a cualquier ancho razonable
 * —incluso un monitor ultrapanorámico— siempre hay contenido llenando la
 * pantalla. El coste son unos cuantos <span> de más, que no es coste.
 *
 * Va `aria-hidden`: es una banda decorativa que repite seis veces lo mismo, y
 * un lector de pantalla leyendo sesenta y seis frases seguidas sería una
 * trampa, no una ayuda.
 */
const COPIAS = 6;

export function Marquee({ idioma }: { idioma: Idioma }) {
  const frases = FRASES[idioma];
  const carril = Array.from({ length: COPIAS }, () => frases).flat();

  return (
    <section
      aria-hidden
      className="group relative overflow-hidden border-y border-line py-7"
    >
      {/* Los bordes se desvanecen: sin esto el texto aparece y desaparece de
          golpe contra el filete lateral y se lee como un recorte. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-canvas to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-canvas to-transparent sm:w-32" />

      <div className="jv-marquee items-center group-hover:[animation-play-state:paused]">
        {carril.map((frase, i) => (
          <span key={`${frase}-${i}`} className="flex shrink-0 items-center">
            <span className="whitespace-nowrap px-6 text-[0.9375rem] text-ink-soft transition-colors duration-base ease-ps group-hover:text-ink sm:px-8 sm:text-base">
              {frase}
            </span>
            {/* El punto de marca entre frases: sin separador, once frases
                seguidas se leen como una sola de sesenta palabras. */}
            <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-brand/60" />
          </span>
        ))}
      </div>
    </section>
  );
}
