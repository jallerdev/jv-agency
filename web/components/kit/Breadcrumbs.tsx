import Link from "next/link";

import { SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Idioma } from "@/content/types";

/**
 * Las migas de pan, con su dato estructurado.
 *
 * POR QUÉ EXISTE
 * --------------
 * El sitio tenía UN solo `BreadcrumbList` en todo el dominio —el del artículo
 * de blog— y cuarenta páginas internas sin ninguno. Para quien llega a
 * `/servicios/tiendas-virtuales` desde una búsqueda, la miga es lo único que
 * dice dónde está parado; y para Google es lo que convierte la URL escueta del
 * resultado en una ruta legible.
 *
 * LA REGLA DE LA ÚLTIMA
 * ---------------------
 * El último elemento NO es un enlace: es dónde estás. Un enlace a la página
 * que ya estás viendo no lleva a ninguna parte y, con lector de pantalla, se
 * anuncia como una parada de tabulador que no hace nada. Lleva
 * `aria-current="page"`.
 *
 * EL SEPARADOR NO SE LEE
 * ----------------------
 * La barra va en un `<span aria-hidden>`. Es decoración: quien escuche la
 * página oye «Inicio, Servicios, Tiendas virtuales», no «Inicio barra
 * Servicios barra Tiendas virtuales».
 */

export type Miga = {
  texto: string;
  /** Ruta interna. La última miga lo omite: es la página actual. */
  href?: string;
};

const INICIO: Record<Idioma, string> = { es: "Inicio", en: "Home" };
const RAIZ: Record<Idioma, string> = { es: "/", en: "/en" };

export function Breadcrumbs({
  migas,
  idioma,
  className,
}: {
  /** Sin la raíz: se antepone sola. La última es la página actual. */
  migas: readonly Miga[];
  idioma: Idioma;
  className?: string;
}) {
  const todas: Miga[] = [{ texto: INICIO[idioma], href: RAIZ[idioma] }, ...migas];

  /* `itemListElement` pide URL absolutas. La de la página actual también: el
     dato estructurado describe la ruta entera, no la parte que falta. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: todas.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.texto,
      ...(m.href ? { item: `${SITE_URL}${m.href === "/" ? "" : m.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label={idioma === "es" ? "Migas de pan" : "Breadcrumb"}
        className={cn("text-sm", className)}
      >
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {todas.map((m, i) => {
            const ultima = i === todas.length - 1;
            return (
              <li key={m.texto} className="flex items-center gap-x-2">
                {i > 0 && (
                  <span aria-hidden="true" className="select-none text-ink-soft/60">
                    /
                  </span>
                )}
                {ultima || !m.href ? (
                  /* `aria-current` SOLO en la última: es la página actual. Un
                     tramo intermedio sin enlace —«Servicios», que no tiene
                     página propia— es texto y nada más; marcarlo como actual
                     le diría al lector de pantalla que hay dos páginas
                     actuales. */
                  <span aria-current={ultima ? "page" : undefined} className="text-ink-soft">
                    {m.texto}
                  </span>
                ) : (
                  <Link
                    href={m.href}
                    className="jv-navlink text-sm text-ink-soft hover:text-ink"
                  >
                    {m.texto}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
