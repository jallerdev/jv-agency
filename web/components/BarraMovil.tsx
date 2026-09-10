"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { CABECERA } from "@/content/layout/header";
import type { Idioma } from "@/content/types";
import { WHATSAPP_LINK } from "@/lib/business";
import { WhatsAppGlyph } from "@/components/WhatsAppGlyph";
import { cn } from "@/lib/utils";

/**
 * LA BARRA DE ACCIÓN EN MÓVIL
 * ──────────────────────────────────────────────────────────────────────────
 * En un teléfono, el CTA de la cabecera desaparece a los 300 px de scroll y
 * el siguiente no llega hasta el pie. Esta barra lo mantiene a un pulgar de
 * distancia durante los ocho mil píxeles del medio.
 *
 * TRES REGLAS QUE LA HACEN ÚTIL Y NO MOLESTA:
 *
 * 1. NO APARECE DE ENTRADA. Sale pasada la primera pantalla: mientras se ve
 *    el hero, el CTA del hero ya está ahí y la barra sería un duplicado
 *    tapando contenido.
 *
 * 2. SE APARTA EN LA SECCIÓN DE AGENDA. Si estás rellenando el formulario, una
 *    barra fija que dice «agenda tu llamada» tapa justamente el campo que
 *    estás escribiendo. El observador la retira mientras #agenda está a la
 *    vista.
 *
 * 3. RESPETA EL BORDE DEL TELÉFONO. `env(safe-area-inset-bottom)` mantiene los
 *    botones por encima de la barra de gestos; sin eso, en un iPhone el
 *    deslizador del sistema queda encima del botón.
 */
export function BarraMovil({ idioma }: { idioma: Idioma }) {
  const [visible, setVisible] = useState(false);
  const [enAgenda, setEnAgenda] = useState(false);

  useEffect(() => {
    let cuadro = 0;
    const leer = () => {
      cuadro = 0;
      setVisible(window.scrollY > window.innerHeight * 0.9);
    };
    const alScroll = () => {
      if (!cuadro) cuadro = requestAnimationFrame(leer);
    };
    leer();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", alScroll);
      if (cuadro) cancelAnimationFrame(cuadro);
    };
  }, []);

  useEffect(() => {
    const agenda = document.getElementById("agenda");
    if (!agenda || typeof IntersectionObserver === "undefined") return;
    const observador = new IntersectionObserver(
      ([entrada]) => setEnAgenda(entrada.isIntersecting),
      { rootMargin: "-20% 0px -20% 0px" }
    );
    observador.observe(agenda);
    return () => observador.disconnect();
  }, []);

  const fuera = !visible || enAgenda;

  return (
    <div
      aria-hidden={fuera}
      inert={fuera}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-negro/90 backdrop-blur-md transition-transform duration-slow ease-ps lg:hidden",
        fuera ? "translate-y-full" : "translate-y-0"
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <Link href={CABECERA.cta.href[idioma]} className="jv-boton flex-1 justify-center">
          {CABECERA.cta.texto[idioma]}
        </Link>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="jv-boton-2 !mr-0 aspect-square !px-0 justify-center"
        >
          <WhatsAppGlyph className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
