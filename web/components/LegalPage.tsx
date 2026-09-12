import type { ReactNode } from "react";

import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Breadcrumbs } from "@/components/kit/Breadcrumbs";
import { IndiceArticulo } from "@/components/visuales/IndiceArticulo";
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
 *
 * QUÉ CAMBIÓ EN LA FASE 5, Y POR QUÉ
 * ----------------------------------
 * El encargo pide para estas cuatro lo mismo que para un artículo: tipografía
 * de lectura, índice con anclas, fecha de actualización visible y barra de
 * progreso. Y ninguna otra animación, que es la parte que importa: una página
 * legal con revelados al hacer scroll se lee como un folleto, y lo que tiene
 * que parecer es un documento.
 *
 * Así que comparten pieza con el blog —el mismo índice que se construye
 * leyendo los `h2`, la misma barra de lectura— en vez de tener las suyas. Son
 * el mismo problema: prosa larga que hay que poder recorrer.
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
      <span aria-hidden className="jv-lectura" />

      <Header idioma="es" />
      <main id="contenido">
        <header className="border-b border-line">
          <div className="mx-auto max-w-[1280px] px-6 pb-14 pt-[calc(var(--header-h)+2rem)] md:px-12 md:pb-16 md:pt-[calc(var(--header-h)+3rem)]">
            <Breadcrumbs migas={[{ texto: title }]} idioma="es" />

            <p className="jv-eyebrow mt-10 text-brand">Legal</p>
            <h1 className="mt-4 max-w-[20ch] text-balance text-[length:var(--text-display)]">
              {title}
            </h1>
            <p className="mt-6 max-w-[62ch] text-pretty text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
              {intro}
            </p>
            {/* La fecha en mono y arriba, no en letra pequeña al pie: en un
                documento legal, cuándo se actualizó es parte del documento. */}
            <p className="mt-8 font-mono text-xs text-ink-muted">
              Última actualización: {LEGAL_UPDATED}
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-12 md:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[36rem_16rem] lg:justify-center lg:gap-16">
            <article className="jv-cuerpo legal max-w-[36rem]" id="jv-legal">
              {children}
            </article>

            <aside className="order-first lg:order-none">
              <div className="lg:sticky lg:top-28">
                <IndiceArticulo selector="#jv-legal" titulo="En esta página" />
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer idioma="es" />
      <WhatsAppButton idioma="es" />
    </>
  );
}
