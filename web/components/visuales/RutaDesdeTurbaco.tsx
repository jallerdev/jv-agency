"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * LA RUTA DESDE TURBACO — la pieza firma de las páginas de ciudad
 * ─────────────────────────────────────────────────────────────────────────
 * Una sola ruta: de donde está el estudio a la ciudad de esta página. La línea
 * se traza al entrar en vista y el kilometraje sube hasta su cifra.
 *
 * POR QUÉ NO ES UN MAPA, que es lo que pedía el encargo. Se intentó y no se
 * sostiene: Turbaco, Cartagena y Barranquilla caben en grado y medio de
 * latitud y Bogotá está cinco grados al sur, así que un mapa A ESCALA amontona
 * las tres primeras en una esquina —ilegible—, y un mapa «ajustado a ojo» es
 * un dato falso dibujado, que es justo lo que este sitio no hace. La ruta de
 * dos puntos dice lo mismo que el mapa tenía que decir —a cuánto estoy de ti y
 * qué cambia eso— sin fingir una geografía.
 *
 * LO QUE LA DISTANCIA CAMBIA ES SI NOS VEMOS EN PERSONA, no si tomo el
 * trabajo. Es la frase que sostiene toda la familia de páginas de ciudad y va
 * debajo de la línea, no enterrada en un párrafo.
 *
 * DE 200 KM EN ADELANTE LA LÍNEA VA PUNTEADA. No es decoración: es la propia
 * página diciendo «esto es a distancia» antes de que el visitante lo pregunte,
 * y diciéndolo con la forma en vez de con un descargo al pie.
 *
 * SIN JAVASCRIPT, CON MOVIMIENTO REDUCIDO O ANTES DE ENTRAR EN VISTA se ve la
 * línea entera y la cifra final. El efecto puede no llegar; el dato, no.
 */

const T = {
  es: { origen: "Turbaco, Bolívar", ruta: "Distancia por carretera" },
  en: { origen: "Turbaco, Bolívar", ruta: "Distance by road" },
} as const;

/** A partir de aquí, la línea va punteada. */
const UMBRAL_REMOTO = 200;

/**
 * Saca el número de «≈ 1.000 km». El punto en castellano es separador de
 * millares, así que se quita antes de parsear: `parseFloat("1.000")` devuelve
 * uno, y la pieza habría contado hasta 1 km hasta Bogotá.
 */
function kilometros(texto: string): number | null {
  const limpio = texto.replace(/\s/g, "").replace(/\./g, "").replace(/,/g, ".");
  const m = limpio.match(/(\d+(?:\.\d+)?)/);
  return m ? Number(m[1]) : null;
}

export function RutaDesdeTurbaco({
  destino,
  distancia,
  nota,
  idioma = "es",
  className,
}: {
  destino: string;
  /** Tal como se escribe: «≈ 250 km». Lleva el signo y la unidad. */
  distancia: string;
  nota: string;
  idioma?: "es" | "en";
  className?: string;
}) {
  const t = T[idioma];
  const km = kilometros(distancia);
  const remoto = km !== null && km >= UMBRAL_REMOTO;

  const caja = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [cuenta, setCuenta] = useState<number | null>(km);

  useEffect(() => {
    const nodo = caja.current;
    if (!nodo) return;

    const quieto =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (quieto || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        setVisible(true);

        if (km === null || km === 0) return;
        const inicio = performance.now();
        let frame = 0;
        const paso = (ahora: number) => {
          /* 1.100 ms: el trazo de la línea dura 900 y la cifra tiene que
             llegar justo después, no antes —si el número aterriza con la línea
             a medio dibujar, parece que el dibujo va retrasado—. */
          const p = Math.min((ahora - inicio) / 1100, 1);
          setCuenta(Math.round(km * (1 - (1 - p) ** 3)));
          if (p < 1) frame = requestAnimationFrame(paso);
        };
        setCuenta(0);
        frame = requestAnimationFrame(paso);
        return () => cancelAnimationFrame(frame);
      },
      { rootMargin: "-10% 0px -10% 0px" },
    );
    obs.observe(nodo);
    return () => obs.disconnect();
  }, [km]);

  /* La cifra impresa conserva el formato original —el «≈», el separador de
     millares, la unidad— y solo sustituye el número mientras cuenta. */
  const impresa =
    km === null || cuenta === null || cuenta === km
      ? distancia
      : distancia.replace(
          /\d[\d.,]*/,
          new Intl.NumberFormat(idioma === "es" ? "es-CO" : "en-US").format(cuenta),
        );

  return (
    <figure
      ref={caja}
      data-visible={visible}
      className={cn("jv-ruta jv-card p-6 sm:p-8", className)}
    >
      <figcaption className="jv-eyebrow text-ink-muted">{t.ruta}</figcaption>

      {/* La cifra, arriba y grande: es el dato de la pieza. */}
      <p className="mt-5 whitespace-nowrap font-mono text-[length:var(--text-h2)] leading-none tabular-nums text-brand">
        {impresa}
      </p>

      {/* El trazo. Dos puntos y la línea entre ellos; en `sm` en horizontal y
          en un teléfono en vertical, porque una línea de 300 px con dos
          topónimos encima no cabe a 390. */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
        <p className="flex shrink-0 items-center gap-2.5 text-sm text-ink-soft">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full border-2 border-line-strong" />
          {t.origen}
        </p>

        <span aria-hidden className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-line">
          <span
            className={cn(
              "jv-ruta__linea absolute inset-0 block",
              remoto
                ? "bg-[repeating-linear-gradient(90deg,var(--brand-500)_0_10px,transparent_10px_18px)]"
                : "bg-brand",
            )}
          />
        </span>

        <p className="flex shrink-0 items-center gap-2.5 text-sm font-semibold text-ink">
          <span aria-hidden className="jv-latido h-2.5 w-2.5 rounded-full bg-brand" />
          {destino}
        </p>
      </div>

      <p className="jv-rule mt-7 max-w-[62ch] pt-6 leading-relaxed text-ink-soft">{nota}</p>

    </figure>
  );
}
