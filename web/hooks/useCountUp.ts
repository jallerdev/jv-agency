"use client";

import { useEffect, useRef, useState } from "react";

const DURACION = 900;

/**
 * Cuenta desde cero hasta la cifra cuando entra en pantalla, una sola vez.
 *
 * Vivía dentro de `components/Founder.tsx`, privado. Lo sacamos porque la
 * portada nueva lo necesita en dos sitios, y un contador copiado es un contador
 * que se va a desincronizar: basta que alguien ajuste la duración en uno.
 *
 * TRES CASOS EN LOS QUE NO CUENTA, y los tres a propósito:
 *
 *  · Con `prefers-reduced-motion`. Un número que sube es movimiento.
 *  · Si al montar ya está a la vista. Contar algo que el visitante lleva
 *    mirando desde que cargó la página se ve como un error de carga, no como
 *    una animación.
 *  · Sin `IntersectionObserver`. Se muestra la cifra final y ya.
 *
 * En los tres, el valor devuelto es el definitivo desde el primer fotograma:
 * nunca se queda un cero en pantalla esperando algo que no va a pasar.
 */
export function useCountUp(objetivo: number, activo = true) {
  const ref = useRef<HTMLSpanElement>(null);
  const [valor, setValor] = useState(objetivo);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo || !activo) return;

    const reducido =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducido || typeof IntersectionObserver === "undefined") return;

    const caja = nodo.getBoundingClientRect();
    if (caja.top < window.innerHeight && caja.bottom > 0) return;

    setValor(0);

    let frame = 0;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        observador.disconnect();
        const inicio = performance.now();
        const paso = (ahora: number) => {
          const t = Math.min((ahora - inicio) / DURACION, 1);
          /* Misma intención que --ease-entrance: llega rápido y aterriza. */
          const suave = 1 - Math.pow(1 - t, 3);
          setValor(Math.round(objetivo * suave));
          if (t < 1) frame = requestAnimationFrame(paso);
        };
        frame = requestAnimationFrame(paso);
      },
      { threshold: 0.6 }
    );
    observador.observe(nodo);

    return () => {
      observador.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [objetivo, activo]);

  return { ref, valor };
}
