"use client";

import { useId, useState } from "react";
import Image from "next/image";

import { Pendiente } from "@/components/Pendiente";
import { cn } from "@/lib/utils";

/**
 * TELÉFONO Y ESCRITORIO, CON DESLIZADOR, SOBRE UNA CAPTURA REAL
 * ─────────────────────────────────────────────────────────────────────────
 * ⚠️ BLOQUEADO HASTA QUE EXISTAN LAS CAPTURAS MÓVILES. En /public/work solo
 * hay capturas de escritorio. Este componente NO es un antes/después de
 * rediseño: no existe un «antes» real de ningún proyecto y maquetar uno feo
 * sería inventar trabajo. Es EL MISMO SITIO REAL a dos anchos, que es un hecho
 * comprobable y prueba la promesa «adaptado a teléfono, tableta y computador»
 * —el único bullet que todo el mundo escribe y nadie demuestra, y el que más
 * importa con el 70% del tráfico colombiano en móvil—.
 *
 * PROHIBIDO alimentarlo recortando una captura de escritorio para que «parezca»
 * móvil: eso es inventar una pantalla que nunca se vio así. El componente se
 * niega a pintar si las dos fuentes son la misma y deja el marcador en su
 * lugar. Hace falta [PENDIENTE: capturas móviles reales de los proyectos].
 *
 * ACCESIBILIDAD: es un <input type="range"> restilado, no una implementación
 * propia con eventos de puntero. Así se heredan gratis el teclado (flechas,
 * Inicio, Fin), el foco visible y el rol de slider para lectores de pantalla.
 *
 * A 390: el mando mide 44 px, no los ~14 px del navegador; y el contenedor
 * lleva `touch-action: pan-y` o quien intente desplazar la página con el dedo
 * sobre la imagen queda atrapado arrastrando el deslizador.
 *
 * LAS DOS CAPTURAS DEBEN TENER LA MISMA RELACIÓN DE ASPECTO o el recorte salta
 * al deslizar.
 */

export type CapturaComparada = {
  src: string;
  /** Alt honesto: qué sitio es y a qué ancho se vio. */
  alt: string;
  width: number;
  height: number;
};

export function ComparadorAnchos({
  escritorio,
  movil,
  etiquetaMovil = "Teléfono",
  etiquetaEscritorio = "Escritorio",
  className,
}: {
  escritorio: CapturaComparada;
  movil: CapturaComparada;
  etiquetaMovil?: string;
  etiquetaEscritorio?: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const id = useId();

  /* Guardia dura: la misma imagen en los dos lados significa que alguien está
     haciendo pasar una captura de escritorio por una de móvil. */
  if (!movil?.src || movil.src === escritorio?.src) {
    return (
      <Pendiente>
        [PENDIENTE: capturas móviles reales para el comparador de anchos]. No se
        pinta con una captura de escritorio recortada: sería inventar una
        pantalla que nunca se vio así.
      </Pendiente>
    );
  }

  return (
    <figure className={cn("m-0", className)}>
      <div
        className="relative overflow-hidden rounded-2xl border border-line bg-background shadow-frame [touch-action:pan-y]"
        style={{ aspectRatio: `${escritorio.width} / ${escritorio.height}` }}
      >
        <Image
          src={escritorio.src}
          alt={escritorio.alt}
          width={escritorio.width}
          height={escritorio.height}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={movil.src}
            alt={movil.alt}
            width={movil.width}
            height={movil.height}
            className="h-full w-full object-cover object-top"
          />
        </div>

        {/* La juntura. Decorativa: quien manda es el range de abajo. */}
        <span
          aria-hidden
          style={{ left: `${pos}%` }}
          className="pointer-events-none absolute inset-y-0 w-[2px] -translate-x-1/2 bg-surface/90"
        />

        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-surface/90 px-2.5 py-1 jv-eyebrow text-accent-ink">
          {etiquetaMovil}
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-surface/90 px-2.5 py-1 jv-eyebrow text-accent-ink">
          {etiquetaEscritorio}
        </span>
      </div>

      <label htmlFor={id} className="sr-only">
        Comparar la vista de teléfono y la de escritorio
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="mt-4 w-full cursor-ew-resize appearance-none bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-dark
          [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-line
          [&::-webkit-slider-thumb]:-mt-[1.1875rem] [&::-webkit-slider-thumb]:h-11 [&::-webkit-slider-thumb]:w-11 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-line [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-soft
          [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-line
          [&::-moz-range-thumb]:h-11 [&::-moz-range-thumb]:w-11 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-line [&::-moz-range-thumb]:bg-primary"
      />

      <figcaption className="mt-2 font-mono text-[11px] leading-relaxed text-ink-soft">
        El mismo sitio real, a dos anchos. Arrastra o usa las flechas del teclado.
      </figcaption>
    </figure>
  );
}
