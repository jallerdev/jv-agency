"use client";

import { useEffect, useRef } from "react";

/**
 * LA LUZ QUE SIGUE AL PUNTERO
 * ──────────────────────────────────────────────────────────────────────────
 * El recurso de Linear y de Stripe: un halo suave bajo el cursor que convierte
 * una tarjeta en un objeto con superficie. Es el único de los tres efectos de
 * la credencial que responde a la persona, y por eso es el que la hace sentir
 * viva en vez de decorada.
 *
 * TRES DECISIONES QUE EVITAN QUE CUESTE CARO:
 *
 * · Escribe DOS custom properties, no estilos. El navegador recalcula el
 *   degradado sin volver a maquetar nada; cambiar `left`/`top` obligaría a
 *   rehacer el layout en cada movimiento del ratón.
 * · Va con `requestAnimationFrame`. Un `mousemove` dispara hasta mil veces por
 *   segundo y aquí solo hacen falta sesenta.
 * · No se monta en pantallas táctiles ni con movimiento reducido: en un
 *   teléfono no hay puntero al que seguir, así que el escuchador sería puro
 *   coste sin nada a cambio.
 */
export function LuzPuntero() {
  const luz = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const nodo = luz.current;
    const tarjeta = nodo?.parentElement;
    if (!nodo || !tarjeta) return;

    const finoOreducido =
      typeof window.matchMedia === "function" &&
      (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        !window.matchMedia("(hover: hover) and (pointer: fine)").matches);
    if (finoOreducido) return;

    let cuadro = 0;
    let x = 0;
    let y = 0;

    const pintar = () => {
      cuadro = 0;
      nodo.style.setProperty("--jv-x", `${x}px`);
      nodo.style.setProperty("--jv-y", `${y}px`);
    };

    const alMover = (e: PointerEvent) => {
      const caja = tarjeta.getBoundingClientRect();
      x = e.clientX - caja.left;
      y = e.clientY - caja.top;
      if (!cuadro) cuadro = requestAnimationFrame(pintar);
    };

    tarjeta.addEventListener("pointermove", alMover);
    return () => {
      tarjeta.removeEventListener("pointermove", alMover);
      if (cuadro) cancelAnimationFrame(cuadro);
    };
  }, []);

  return <span ref={luz} aria-hidden className="jv-cred__luz" />;
}
