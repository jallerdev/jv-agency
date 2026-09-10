import type { Metadata } from "next";

import { PaginaSeo } from "@/components/paginas/Seo";
import { SITE_URL } from "@/lib/site";

/**
 * El término va con las dos palabras juntas —posicionamiento y SEO— porque así
 * es como se busca acá y así lo titula el líder del sector.
 *
 * ESTA PÁGINA NO REPITE EL ARTÍCULO DEL BLOG: «¿Cuánto cuesta el SEO en
 * Colombia?» explica el mercado con tablas y fuentes citadas; esta vende el
 * servicio. Se enlazan, no se copian.
 */
export const metadata: Metadata = {
  title: "Posicionamiento SEO en Colombia | JV Agencia",
  description:
    "Posicionamiento web y SEO local en Colombia. Auditoría desde $390.000 y plan mensual desde $650.000. No prometo el primer puesto: garantizo el trabajo y el informe.",
  alternates: {
    canonical: "/servicios/posicionamiento-seo",
    languages: {
      "es-CO": "/servicios/posicionamiento-seo",
      en: "/en/services/seo",
      "x-default": "/servicios/posicionamiento-seo",
    },
  },
  openGraph: {
    title: "Posicionamiento SEO en Colombia | JV Agencia",
    description:
      "Que te encuentren cuando buscan lo que vendes. Auditoría SEO desde $390.000 y posicionamiento mensual desde $650.000.",
    url: `${SITE_URL}/servicios/posicionamiento-seo`,
    type: "website",
    locale: "es_LA",
  },
};

export default function PosicionamientoSeo() {
  return <PaginaSeo idioma="es" ruta="/servicios/posicionamiento-seo" />;
}
