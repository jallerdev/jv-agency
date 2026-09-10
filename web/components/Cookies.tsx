"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
 * · No se pinta en el primer render. Leer localStorage durante la hidratación
 *   hace que el servidor y el cliente devuelvan HTML distinto, y React lo
 *   marca como error. Se lee en un efecto: el aviso aparece un instante
 *   después, que es exactamente cuando debe.
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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let decidido: string | null = null;
    try {
      decidido = window.localStorage.getItem(CLAVE);
    } catch {
      /* Si no se puede leer, se vuelve a preguntar. Preguntar de más es
         molesto; medir sin permiso es otra cosa. */
    }
    if (decidido === "si") window.gtag?.("consent", "update", { analytics_storage: "granted" });
    if (!decidido) setVisible(true);
  }, []);

  if (!visible) return null;

  const decidir = (valor: "si" | "no") => {
    guardar(valor);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label={COOKIES.titulo[idioma]}
      className="fixed bottom-4 left-4 right-4 z-50 max-w-md sm:right-auto"
    >
      <div className="jv-card bg-raised p-5">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-muted">
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
