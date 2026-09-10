"use client";

import { useEffect, useRef } from "react";

/* ===========================================================================
   Campo de manchas de gradiente.

   Es el `.gg` de palo-seco.com, portado al design system del estudio y de ahí
   al sitio. Verifiqué el CSS servido de palo-seco antes de traerlo: los tres
   fotogramas y las cinco duraciones —30, 20, 40, 40 y 20 s— son los suyos. Lo
   único que cambia es el color: de su naranja a la rampa violeta, con una
   mancha teal y una azul cielo.

   QUÉ SUSTITUYE
   -------------
   Aquí vivía un campo de pigmento bronce que multiplicaba sobre papel crema.
   Estaba bien resuelto para el sistema anterior y no sirve para este: sobre
   casi negro, `multiply` OSCURECE —una mancha oscura sobre fondo oscuro no se
   ve— y el claro de lectura que llevaba encima se convertía en un borrón
   blanco atravesando el titular. En oscuro la mezcla correcta es `screen`, que
   SUMA luz, y por eso el campo entero se rehízo en vez de recolorearse.

   LA SEXTA MANCHA
   ---------------
   Cinco orbitan solas; la sexta sigue al puntero con interpolación —no salta a
   la posición del ratón, se acerca a ella—. Es la única parte que necesita JS,
   se apaga con movimiento reducido y en un dispositivo táctil ni se monta:
   sin puntero que seguir, sería una mancha fija en una esquina.
   =========================================================================== */

export function Blobs({ variante }: { variante?: "left" | "right" | "top" }) {
  const puntero = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = puntero.current;
    if (!el) return;
    /* Sin puntero fino no hay nada que seguir, y con movimiento reducido el
       sistema pide que el campo se quede quieto. En los dos casos la mancha
       se retira del todo en lugar de quedarse clavada en el centro. */
    const finoYConMovimiento =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finoYConMovimiento) {
      el.style.display = "none";
      return;
    }

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let destinoX = x;
    let destinoY = y;
    let frame = 0;

    const mover = (e: PointerEvent) => {
      destinoX = e.clientX;
      destinoY = e.clientY;
      if (!frame) frame = requestAnimationFrame(seguir);
    };

    /* Interpolación al 6% por fotograma: la mancha llega con retraso, que es
       lo que la hace leerse como una masa con inercia y no como un cursor. */
    const seguir = () => {
      x += (destinoX - x) * 0.06;
      y += (destinoY - y) * 0.06;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame =
        Math.abs(destinoX - x) > 0.5 || Math.abs(destinoY - y) > 0.5
          ? requestAnimationFrame(seguir)
          : 0;
    };

    window.addEventListener("pointermove", mover, { passive: true });
    return () => {
      window.removeEventListener("pointermove", mover);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden
      className={["jv-gg", variante ? `jv-gg--${variante}` : ""].join(" ")}
    >
      <div className="jv-gg__stage">
        <div className="jv-blob jv-gg__blob jv-gg__b1" />
        <div className="jv-blob jv-gg__blob jv-gg__b2" />
        <div className="jv-blob jv-gg__blob jv-gg__b3" />
        <div className="jv-blob jv-gg__blob jv-gg__b4" />
        <div className="jv-blob jv-gg__blob jv-gg__b5" />
        <div ref={puntero} className="jv-gg__blob jv-gg__pointer" />
      </div>
    </div>
  );
}
