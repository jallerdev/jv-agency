"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import type { Idioma } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * EL ÁRBOL DE DECISIÓN
 * ─────────────────────────────────────────────────────────────────────────
 * El visitante que llega a una página de servicio no sabe qué producto pedir:
 * ESA es su pregunta real, y hoy le entregamos tres tarjetas y la
 * responsabilidad de elegir. El árbol elige con él, y la primera rama lo saca
 * honestamente hacia otro servicio cuando lo que necesita no es este —lo que
 * ahorra el párrafo entero que hoy hay que escribir para desviarlo.
 *
 * NO ES UN DIAGRAMA SVG con líneas conectoras dibujadas: es justo lo que se
 * rompe al reflujar. Es un elector de pasos, y su forma nativa es la de 390 px
 * —pregunta arriba, dos botones grandes a ancho completo, respuesta abajo—.
 * La ramificación horizontal sería la variante de escritorio, no al revés.
 *
 * EL RASTRO SE QUEDA A LA VISTA: cada pregunta ya contestada sigue ahí con su
 * opción marcada (`aria-pressed`), así que cambiar de idea es un clic y no
 * hace falta empezar de cero. El panel de resultado reserva alto fijo para que
 * el contenido de abajo no salte al cambiar de respuesta.
 */

export type NodoArbol =
  | {
      tipo: "pregunta";
      pregunta: string;
      /** Dos opciones. Con tres ya no caben a 390 px en una fila de botones. */
      opciones: { etiqueta: string; siguiente: NodoArbol }[];
    }
  | {
      tipo: "resultado";
      /**
       * Con qué se corresponde este resultado fuera del árbol. Sirve para que
       * la página destaque la tarjeta del formato que acaba de salir: el
       * árbol dice cuál es y la rejilla lo señala, en vez de dejar que el
       * visitante busque a ojo entre tres tarjetas cuál era la suya.
       */
      clave?: string;
      titulo: string;
      detalle: string;
      /** El piso y el plazo. Sácalos de PRICES/lib, nunca de un literal aquí. */
      pie?: string;
      enlace?: { texto: string; href: string };
    };

/**
 * Los dos únicos textos que pone el componente por su cuenta; todo lo demás
 * viene del árbol. Estaban a medias: `reiniciar` llegaba traducido por prop y
 * la pista de abajo era un literal en castellano, así que en /en se leía media
 * pieza en cada idioma.
 */
const T = {
  es: {
    reiniciar: "Empezar de nuevo",
    pista: "Contesta y te digo cuál de los formatos te sirve.",
    /* Estaba escrito a pelo en el JSX, así que la página inglesa pintaba
       «Lo que te sirve» encima de un resultado en inglés. */
    rotulo: "Lo que te sirve",
  },
  en: {
    reiniciar: "Start over",
    pista: "Answer and I'll tell you which of the formats suits you.",
    rotulo: "What suits you",
  },
} as const;

export function ArbolDecision({
  raiz,
  idioma = "es",
  onResultado,
  className,
}: {
  raiz: NodoArbol;
  idioma?: Idioma;
  /**
   * Se avisa cada vez que cambia el resultado alcanzado, con su `clave`, y
   * con `null` mientras no haya resultado o al empezar de nuevo.
   */
  onResultado?: (clave: string | null) => void;
  className?: string;
}) {
  const t = T[idioma];
  const [ruta, setRuta] = useState<number[]>([]);

  /* Se recorre el árbol siguiendo la ruta y se va guardando cada pregunta que
     ya tiene respuesta, para poder pintarlas todas. */
  const contestadas: { nodo: Extract<NodoArbol, { tipo: "pregunta" }>; elegida: number }[] = [];
  let actual: NodoArbol = raiz;
  for (const elegida of ruta) {
    if (actual.tipo !== "pregunta") break;
    const siguiente = actual.opciones[elegida];
    if (!siguiente) break;
    contestadas.push({ nodo: actual, elegida });
    actual = siguiente.siguiente;
  }

  /* El aviso sale en un efecto y no dentro del onClick: el resultado no
     depende de la opción pulsada sino de a dónde lleva la rama entera, y eso
     solo se sabe después de recorrer el árbol con la ruta nueva. */
  const claveActual = actual.tipo === "resultado" ? actual.clave ?? null : null;
  useEffect(() => {
    onResultado?.(claveActual);
  }, [claveActual, onResultado]);

  const responder = (nivel: number, opcion: number) =>
    setRuta((r) => [...r.slice(0, nivel), opcion]);

  const pregunta = (
    nodo: Extract<NodoArbol, { tipo: "pregunta" }>,
    nivel: number,
    elegida: number | null
  ) => (
    <div key={`${nivel}-${nodo.pregunta}`} className="jv-rule pt-5 first:border-t-0 first:pt-0">
      <p className="font-body text-[15px] font-semibold leading-snug text-ink">{nodo.pregunta}</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {nodo.opciones.map((o, i) => (
          <button
            key={o.etiqueta}
            type="button"
            aria-pressed={elegida === i}
            onClick={() => responder(nivel, i)}
            className={cn(
              "min-h-11 text-balance rounded-xl border px-3 py-2 font-body text-[15px] font-semibold leading-snug transition-surface duration-quick ease-state",
              elegida === i
                ? "border-primary bg-primary text-on-accent"
                : "border-line bg-surface text-ink-soft hover:border-primary/40 hover:text-ink"
            )}
          >
            {o.etiqueta}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    /* PREGUNTAS A UN LADO, RESPUESTA AL OTRO, a partir de `md`.
       En una sola columna, el panel de respuesta es una caja vacía de 136 px
       de alto y ancho completo esperando a que alguien conteste: parece que la
       sección se quedó a medio construir. En dos columnas, el hueco es la
       mitad de la pieza que espera su otra mitad, que es lo que es. */
    <div className={cn("jv-card p-5 sm:p-6", className)}>
      <div className="grid gap-5 md:grid-cols-2 md:items-start md:gap-6">
        <div className="grid gap-5">
          {contestadas.map((c, i) => pregunta(c.nodo, i, c.elegida))}
          {actual.tipo === "pregunta" && pregunta(actual, contestadas.length, null)}
        </div>

        {/* Alto reservado: el contenido de abajo no salta al cambiar de rama.
            Lo que se anima es la opacidad, nunca la altura. */}
        <div
          aria-live="polite"
          className="grid min-h-[8.5rem] content-center rounded-xl border border-line bg-background p-4 transition-opacity duration-quick ease-state md:min-h-[11rem]"
        >
        {actual.tipo === "resultado" ? (
          <div>
            <p className="jv-eyebrow text-accent-ink">{t.rotulo}</p>
            <p className="mt-2 font-body text-xl font-semibold leading-tight text-ink">{actual.titulo}</p>
            <p className="mt-2 text-pretty font-body text-[15px] leading-snug text-ink-soft">
              {actual.detalle}
            </p>
            {actual.pie && (
              <p className="mt-3 font-mono text-xs tabular-nums text-primary-dark">
                {actual.pie}
              </p>
            )}
            {actual.enlace && (
              <Link
                href={actual.enlace.href}
                className="mt-3 inline-flex min-h-11 items-center font-body text-[15px] font-semibold text-primary-dark underline underline-offset-4"
              >
                {actual.enlace.texto}
              </Link>
            )}
          </div>
        ) : (
          /* `mx-auto`: el tope de medida de línea de `globals.css` encoge la
             caja, y sin márgenes automáticos un texto centrado se queda
             pegado a la izquierda de su contenedor. */
          <p className="mx-auto text-balance text-center font-body text-[15px] leading-snug text-ink-soft">
            {t.pista}
          </p>
        )}
        </div>
      </div>

      {ruta.length > 0 && (
        <button
          type="button"
          onClick={() => setRuta([])}
          className="mt-3 inline-flex min-h-11 items-center jv-eyebrow text-ink-soft underline underline-offset-4 hover:text-ink"
        >
          {t.reiniciar}
        </button>
      )}
    </div>
  );
}
