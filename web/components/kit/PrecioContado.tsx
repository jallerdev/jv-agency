"use client";

import { useEffect, useState } from "react";

import { money } from "@/lib/money";
import type { Idioma } from "@/content/types";

/**
 * EL PRECIO QUE SE CUENTA UNA VEZ, AL CARGAR
 * ─────────────────────────────────────────────────────────────────────────
 * La tabla de /precios es el hero de la página y el argumento entero del
 * sitio: «casi nadie los pone, yo sí». Estaba quieta. Ahora las ocho cifras
 * suben una sola vez, escalonadas, y el ojo recorre la columna de arriba abajo
 * en el orden en que hay que leerla.
 *
 * NO EMPIEZA EN CERO, Y ESO ES LA MITAD DEL DISEÑO. Un contador de precios que
 * arranca en «$0» dice, durante medio segundo, un precio que no es —y esta es
 * la página que existe para no hacer eso—. Arranca en la potencia de diez
 * inmediatamente inferior: $850.000 sale de $100.000 y $2.500.000 de
 * $1.000.000. Como efecto secundario, la cifra NUNCA cambia de número de
 * dígitos mientras cuenta, así que no hay ni un salto de ancho.
 *
 * CUENTA AL MONTAR, NO AL ENTRAR EN VISTA. `useCountUp` se niega a animar algo
 * que ya está en pantalla al cargar, y tiene razón para las cifras del pie de
 * página: ver contar algo que llevas mirando desde hace rato se lee como un
 * fallo de carga. Aquí es al revés —la tabla ES lo primero que se ve— y lo que
 * se quiere es justamente que el movimiento ocurra mientras se mira.
 *
 * NO MUEVE NI UN PÍXEL DE LA MAQUETA. La ranura de la cifra tiene ancho fijo y
 * `tabular-nums`, así que contar no puede empujar nada: cero desplazamiento
 * acumulado en la página cuyo argumento es que va rápido.
 *
 * CON MOVIMIENTO REDUCIDO, O SIN JAVASCRIPT, sale la cifra final desde el
 * primer fotograma. El servidor ya la pinta: esto solo la sustituye mientras
 * dura la cuenta.
 */

/** Cuánto dura la cuenta y cuánto se separa una fila de la siguiente. */
const DURACION = 700;
const ESCALON = 50;

/** La potencia de diez inmediatamente inferior. 850.000 → 100.000. */
const arranque = (objetivo: number) => {
  if (objetivo <= 0) return 0;
  return 10 ** Math.floor(Math.log10(objetivo));
};

export function PrecioContado({
  valor,
  idioma,
  indice = 0,
}: {
  valor: number;
  idioma: Idioma;
  /** Posición en la tabla: decide el escalón. */
  indice?: number;
}) {
  /* Nace en la cifra final: es lo que pinta el servidor y lo que se queda si
     el efecto no llega a correr. */
  const [n, setN] = useState(valor);

  useEffect(() => {
    const quieto =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (quieto || typeof requestAnimationFrame === "undefined") return;

    const desde = arranque(valor);
    if (desde >= valor) return;

    setN(desde);
    let frame = 0;
    let inicio = 0;
    const paso = (ahora: number) => {
      if (!inicio) inicio = ahora;
      const t = Math.min((ahora - inicio) / DURACION, 1);
      /* La misma intención que `--ease-entrance`: llega rápido y aterriza. */
      const suave = 1 - (1 - t) ** 3;
      setN(Math.round(desde + (valor - desde) * suave));
      if (t < 1) frame = requestAnimationFrame(paso);
    };

    const espera = setTimeout(() => {
      frame = requestAnimationFrame(paso);
    }, indice * ESCALON);

    return () => {
      clearTimeout(espera);
      cancelAnimationFrame(frame);
    };
  }, [valor, indice]);

  return <>{money(n, idioma)}</>;
}
