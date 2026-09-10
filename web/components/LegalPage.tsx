import type { ReactNode } from "react";

import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { LEGAL_UPDATED } from "@/lib/business";

/**
 * EL ARMAZÓN DE LAS PÁGINAS LEGALES
 * ──────────────────────────────────────────────────────────────────────────
 * Privacidad, términos, cookies y eliminación de datos.
 *
 * Usa la cabecera y el pie de `components/sections/`, los mismos que las otras
 * treinta y tantas rutas. Antes usaba los de `components/Header.tsx` y
 * `components/Footer.tsx`, que son los de antes del rediseño: estas cuatro
 * páginas salían con otra navegación, un pie monolingüe, sin conmutador de
 * idioma y con clases de un sistema de color que ya no existe. Y mientras
 * fueran las únicas que los usaban, esos dos archivos no se podían borrar.
 *
 * `id="contenido"` en el <main> no es decorativo: es el destino del enlace de
 * salto de la cabecera, que sin él no lleva a ninguna parte.
 *
 * Las cuatro son solo en castellano —así están declaradas en `SOLO_ESPANOL`—,
 * de ahí el `idioma="es"` fijo.
 */
export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <Header idioma="es" />
      <main id="contenido" className="mx-auto max-w-3xl px-5 pb-24 pt-32 md:px-8 md:pt-40">
        <p className="jv-eyebrow text-accent-ink">Legal</p>
        <h1 className="mt-3 font-display text-4xl text-ink md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-ink-soft">{intro}</p>
        <p className="mt-2 font-body text-sm text-ink-soft">
          Última actualización: {LEGAL_UPDATED}
        </p>
        <div className="legal mt-10">{children}</div>
      </main>
      <Footer idioma="es" />
      <WhatsAppButton idioma="es" />
    </>
  );
}
