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

/**
 * Cuánto dura la cuenta, cuánto se separa una fila de la siguiente y cuánto
 * espera antes de arrancar.
 *
 * LOS TRES NÚMEROS SE SUBIERON DESPUÉS DE MIRARLO. Con 700 ms de cuenta y 50
 * de escalón, las ocho cifras se movían casi a la vez y terminaban a los 1,2
 * segundos de cargar: medido con capturas, la animación existía y no se veía
 * —Luis la buscó y no la encontró—. Una cuenta que nadie ve es trabajo de
 * cómputo pagado a cambio de nada.
 *
 * Ahora la cascada baja por la columna en el orden en que hay que leerla y la
 * última cifra aterriza a los 1,9 segundos. Es largo para una animación, y es
 * correcto para ESTA: la tabla de precios publicados es el argumento entero
 * del sitio, y se mira una vez.
 *
 * La espera inicial es para no competir con el pintado de la página: sin ella
 * la cuenta arrancaba mientras el navegador todavía estaba colocando el hero.
 */
const DURACION = 1100;
const ESCALON = 90;
const ESPERA = 200;

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
    /* EL ESCALONADO VIVE DENTRO DEL BUCLE, no en un `setTimeout` por fila.
       Con ocho temporizadores, el navegador los agrupa en cuanto la pestaña
       no está al frente y los ocho disparan juntos: medido, las ocho cifras
       salían con el mismo avance exacto y la cascada no existía. Dentro del
       bucle, el retraso es aritmética sobre el reloj de la animación y no
       depende de cuándo le dé la gana al temporizador. */
    const retraso = ESPERA + indice * ESCALON;
    const paso = (ahora: number) => {
      if (!inicio) inicio = ahora;
      const t = Math.min(Math.max(ahora - inicio - retraso, 0) / DURACION, 1);
      /* La misma intención que `--ease-entrance`: llega rápido y aterriza. */
      const suave = 1 - (1 - t) ** 3;
      setN(Math.round(desde + (valor - desde) * suave));
      if (t < 1) frame = requestAnimationFrame(paso);
    };
    frame = requestAnimationFrame(paso);

    return () => cancelAnimationFrame(frame);
  }, [valor, indice]);

  return <>{money(n, idioma)}</>;
}
