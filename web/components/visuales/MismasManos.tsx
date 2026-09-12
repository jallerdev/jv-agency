"use client";

import { useId, useState } from "react";

import type { Idioma } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * «LAS MISMAS MANOS» — la pieza firma de /sobre-nosotros
 * ─────────────────────────────────────────────────────────────────────────
 * La tesis de la marca es «diseño y código en las mismas manos», y la página
 * que existe para contarla lo decía en el H1 y en un párrafo de biografía.
 * Esto la vuelve un objeto: **una sola tarjeta** partida por una manija con la
 * «/» del logotipo. A la izquierda del corte se ve terminada; a la derecha, el
 * código que la produce.
 *
 * UNA TARJETA, NO DOS PANELES. El primer intento ponía la pieza terminada y el
 * bloque de código como dos cosas distintas centradas en un marco más ancho, y
 * el corte no partía nada: partía el marco. Se leía como dos capturas mal
 * alineadas. Registrando las dos capas en la MISMA caja —mismo ancho, mismo
 * borde, mismo relleno— el corte atraviesa un único objeto, que es lo que hace
 * que el gesto signifique algo.
 *
 * LOS DOS LADOS SON LO MISMO DE VERDAD, clase por clase. El marcado que se lee
 * a la derecha es el que dibuja la tarjeta de la izquierda —`jv-eyebrow
 * text-brand`, `jv-titulo mt-3`, `jv-rule mt-5 pt-4`— y el `<article
 * className="jv-card p-6">` de la primera línea es el marco de esta misma
 * pieza, que es `jv-card` con su relleno. No es una captura de código ni un
 * ejemplo parecido: si alguien cambia la tarjeta y no cambia el texto —o al
 * revés—, se ve aquí.
 *
 * ES UN `input[type=range]`, no un `div` que escucha el ratón. Con eso salen
 * gratis tres cosas que un comparador casero no tiene: se arrastra con el
 * dedo, se mueve con las flechas del teclado y se anuncia como control de
 * rango. Además, tocar en cualquier punto salta la manija ahí —que es el «un
 * toque alterna las capas» que pedía el encargo para el móvil— sin añadir un
 * segundo modo de interacción que aprender.
 *
 * LAS DOS CAPAS SE APILAN EN UNA CELDA DE `grid`, no con `absolute`. La altura
 * la tiene que poner la MÁS ALTA de las dos —el código— y una capa absoluta no
 * mide: el bloque de código habría quedado recortado por la altura de la
 * tarjeta.
 *
 * SIN JAVASCRIPT se ve media tarjeta y medio código, que es el estado en
 * reposo y ya cuenta la historia. Nada nace invisible.
 */

const T = {
  es: {
    etiqueta: "Cuánto código se ve",
    diseno: "Lo que ve tu cliente",
    codigo: "Lo que lo produce",
    ayuda: "Arrástralo, tócalo o muévelo con las flechas",
    valor: (n: number) => `${n} % de código a la vista`,
  },
  en: {
    etiqueta: "How much code shows",
    diseno: "What your customer sees",
    codigo: "What produces it",
    ayuda: "Drag it, tap it or move it with the arrow keys",
    valor: (n: number) => `${n}% code showing`,
  },
} as const;

/**
 * El marcado de la tarjeta, tal cual, renglón por renglón. Vive al lado del
 * componente que lo pinta: es la única forma de que los dos lados de la pieza
 * no se separen. En lista y no en una plantilla de texto porque el lado del
 * código lleva numeración de renglón, y numerar exige tenerlos contados.
 */
const CODIGO = [
  `<article className="jv-card p-6">`,
  `  <p className="jv-eyebrow text-brand">`,
  `    En producción`,
  `  </p>`,
  `  <h3 className="jv-titulo mt-3">`,
  `    Bloomrose`,
  `  </h3>`,
  `  <p className="mt-2 text-sm`,
  `     text-ink-soft">`,
  `    Tienda de bisutería y accesorios,`,
  `    de punta a punta.`,
  `  </p>`,
  `  <p className="jv-rule mt-5 pt-4`,
  `     font-mono text-xs text-ink-soft">`,
  `    bloomroseaccesorios.com`,
  `  </p>`,
  `</article>`,
];

export function MismasManos({ idioma, className }: { idioma: Idioma; className?: string }) {
  const t = T[idioma];
  const [pos, setPos] = useState(50);
  const id = useId();

  return (
    <figure className={cn("mx-auto w-full max-w-[30rem]", className)}>
      {/* El anillo de foco lo lleva el MARCO: el control real es transparente
          y ocupa la pieza entera, así que su propio anillo sería invisible. */}
      <div
        className={cn(
          "relative isolate grid overflow-hidden rounded-[--radius-lg] border border-line bg-canvas",
          "[&>*]:col-start-1 [&>*]:row-start-1",
          "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[--focus-ring-color]",
        )}
      >
        {/* Capa 1 · la tarjeta terminada. Es la que va en el flujo con la
            otra: entre las dos deciden la altura de la pieza. */}
        <div className="p-5 sm:p-6">
          <p className="jv-eyebrow text-brand">{idioma === "es" ? "En producción" : "In production"}</p>

          <h3 className="jv-titulo mt-3">Bloomrose</h3>

          <p className="mt-2 text-sm text-ink-soft">
            {idioma === "es"
              ? "Tienda de bisutería y accesorios, de punta a punta."
              : "A jewellery and accessories store, end to end."}
          </p>

          <p className="jv-rule mt-5 pt-4 font-mono text-xs text-ink-soft">
            bloomroseaccesorios.com
          </p>
        </div>

        {/* Capa 2 · el código que la produce, recortado hasta la manija.
            `aria-hidden` porque es la MISMA información que la capa de abajo
            dicha de otra forma; leerla dos veces no aporta nada, y el texto de
            ayuda ya explica qué hay a cada lado. */}
        <div
          aria-hidden="true"
          className="bg-surface p-5 sm:p-6"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        >
          <pre className="overflow-hidden font-mono text-xs leading-[1.6] text-ink-soft">
            <code>
              {CODIGO.map((linea, i) => (
                <span key={i} className="block whitespace-pre">
                  {/* La regleta de renglones es lo que hace que el lado
                      derecho se lea como código y no como texto suelto. */}
                  <span className="mr-3 inline-block w-4 select-none text-right text-ink-muted/60">
                    {i + 1}
                  </span>
                  {linea}
                </span>
              ))}
            </code>
          </pre>
        </div>

        {/* La manija: la «/» del logotipo, plantada en el corte. */}
        <div
          aria-hidden="true"
          className="pointer-events-none relative z-10 h-full w-px justify-self-start bg-brand"
          style={{ marginLeft: `${pos}%` }}
        >
          <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-brand bg-canvas font-display text-xl font-semibold leading-none text-brand">
            /
          </span>
        </div>

        {/* El control, a lo ancho de la pieza y por encima de todo. */}
        <label htmlFor={id} className="sr-only">
          {t.etiqueta}
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          step={1}
          value={pos}
          aria-valuetext={t.valor(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          className="relative z-20 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>

      {/* Los rótulos van DEBAJO y no encima de la pieza: montados sobre las
          esquinas se comían el filete superior de la tarjeta, que es parte de
          lo que hay que ver. */}
      <figcaption className="mt-4">
        <span className="flex items-baseline justify-between gap-4">
          <span className="jv-eyebrow text-ink-muted">{t.diseno}</span>
          <span className="jv-eyebrow text-ink-muted">{t.codigo}</span>
        </span>
        <span className="mt-3 block font-mono text-xs text-ink-muted">{t.ayuda}</span>
      </figcaption>
    </figure>
  );
}
