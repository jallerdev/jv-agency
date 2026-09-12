"use client";

import Link from "next/link";

import { COOKIES } from "@/content/layout/cookies";
import type { Idioma } from "@/content/types";

/**
 * EL AVISO DE COOKIES, CON MODO DE CONSENTIMIENTO V2
 * ──────────────────────────────────────────────────────────────────────────
 * Un aviso que no apaga nada es un cartel: hasta ahora GA4 arrancaba en cuanto
 * cargaba la página, decidiera lo que decidiera quien entra. Aquí el layout
 * declara el consentimiento DENEGADO por defecto y este componente lo sube a
 * concedido solo si la persona acepta; si rechaza, GA4 se queda en modo sin
 * cookies y no escribe nada en el navegador.
 *
 * DECISIONES QUE PARECEN DETALLES Y NO LO SON:
 *
 * · QUIÉN LO VE NO LO DECIDE REACT, y esto fue un arreglo de rendimiento con
 *   nombre y cifra. Se montaba en un efecto —para no leer `localStorage`
 *   durante la hidratación, que haría discrepar servidor y cliente— y eso lo
 *   pintaba DESPUÉS de hidratar. Resultado: el párrafo de este aviso pasó a ser
 *   el elemento más grande que pintaba cada página, o sea el LCP que mide
 *   Google. Lighthouse daba 4,4 s en /precios, con un 90 % de «render delay»,
 *   mientras el primer pintado ocurría a los 0,9 s: la página se veía entera y
 *   la métrica contaba el cartel que llegaba tres segundos tarde.
 *
 *   Ahora el aviso va SIEMPRE en el HTML del servidor y se enseña por atributo:
 *   un script en línea que bloquea —`app/Documento.tsx`— lee la decisión antes
 *   del primer fotograma y escribe `data-cookies` en el <html>; el CSS hace el
 *   resto. React no decide nada sobre su visibilidad, así que no hay
 *   discrepancia que evitar ni un segundo pintado que pagar.
 *
 * · Aceptar y rechazar pesan lo mismo. Un «rechazar» en gris pequeño al lado
 *   de un «aceptar» naranja no es una elección libre, y un consentimiento que
 *   no es libre no es consentimiento.
 *
 * · Va abajo a la izquierda, no tapando la pantalla. La barra de CTA móvil ya
 *   ocupa el borde inferior; el aviso se coloca encima de ella con `bottom` de
 *   sobra para que no se pisen.
 */
const CLAVE = "jv-cookies";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function guardar(valor: "si" | "no") {
  try {
    window.localStorage.setItem(CLAVE, valor);
  } catch {
    /* Navegación privada: la decisión vale para esta visita y ya. */
  }
  window.gtag?.("consent", "update", {
    analytics_storage: valor === "si" ? "granted" : "denied",
  });
}

export function Cookies({ idioma }: { idioma: Idioma }) {
  const decidir = (valor: "si" | "no") => {
    guardar(valor);
    /* Se esconde por el mismo atributo por el que se enseñó: una sola vía para
       decidir si el aviso se ve, y vive en el <html>, no en el estado. */
    document.documentElement.dataset.cookies = "decidido";
  };

  return (
    <div
      role="dialog"
      aria-label={COOKIES.titulo[idioma]}
      /* Por encima de la barra de CTA móvil, que ocupa el borde inferior hasta
         `lg`. Sin este desplazamiento las dos se pisan y el botón «Aceptar»
         queda debajo de la barra, que es justo el que hay que poder tocar. */
      className="jv-cookies fixed bottom-[6.25rem] left-4 right-4 z-50 max-w-md sm:right-auto lg:bottom-4"
    >
      <div className="jv-card bg-raised p-5">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-ink-muted">
          {COOKIES.titulo[idioma]}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{COOKIES.texto[idioma]}</p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => decidir("si")} className="jv-boton text-sm">
            {COOKIES.aceptar[idioma]}
          </button>
          <button type="button" onClick={() => decidir("no")} className="jv-boton-2 text-sm">
            {COOKIES.rechazar[idioma]}
          </button>
          <Link
            href={COOKIES.politica[idioma]}
            className="jv-enlace ml-auto inline-flex min-h-11 items-center text-sm text-ink-muted"
          >
            {COOKIES.detalle[idioma]}
          </Link>
        </div>
      </div>
    </div>
  );
}
