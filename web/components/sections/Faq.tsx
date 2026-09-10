import Link from "next/link";

import { FAQ } from "@/content/home/faq";
import { enlaceReal } from "@/lib/rutas";
import type { Idioma } from "@/content/types";
import { Seccion, EncabezadoSeccion } from "@/components/ui/seccion";
import { Faqs } from "@/components/Faqs";

/**
 * Las preguntas, con su JSON-LD.
 *
 * SOBRE EL FAQPage. El repo lo omitía a propósito y lo dejaba escrito en siete
 * páginas: desde 2023 Google restringió el resultado enriquecido a sitios de
 * gobierno y salud, así que aquí no se va a mostrar. El dueño pidió emitirlo
 * igual sabiendo eso, y es defendible —no hace daño y otros buscadores sí lo
 * leen—, pero conviene que quede escrito para que nadie lo lea como una
 * promesa de estrellas en Google.
 *
 * El acordeón sale de `components/Faqs.tsx`, que ya es Radix y ya lo usan las
 * once páginas del sitio. Duplicarlo aquí habría sido el mismo error que tenía
 * la FAQ antes: la misma decisión tomada dos veces.
 */
export function Faq({ idioma }: { idioma: Idioma }) {
  const items = FAQ.preguntas.map((p) => ({
    q: p.q[idioma],
    a: p.a[idioma],
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: idioma,
    mainEntity: items.map((p) => ({
      "@type": "Question",
      name: p.q,
      acceptedAnswer: { "@type": "Answer", text: p.a },
    })),
  };

  return (
    <Seccion id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* La columna de la izquierda se queda pegada: mientras se abren y
            cierran ocho respuestas, el titular sigue diciendo de qué van. */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <EncabezadoSeccion contenido={FAQ} idioma={idioma} />
          <p className="mt-8 text-sm text-ink-soft">
            {FAQ.cierre.texto[idioma]}{" "}
            <Link
              href={enlaceReal(FAQ.cierre.enlace.href[idioma])}
              className="jv-enlace font-semibold text-brand"
            >
              {FAQ.cierre.enlace.texto[idioma]}
            </Link>
          </p>
        </div>

        <Faqs items={items} />
      </div>
    </Seccion>
  );
}
