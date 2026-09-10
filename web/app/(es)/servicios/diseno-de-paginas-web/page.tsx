import type { Metadata } from "next";

import { PaginaWeb } from "@/components/paginas/Web";
import { SITE_URL } from "@/lib/site";

/**
 * El término principal del negocio. UNA SOLA PÁGINA PARA UNA SOLA INTENCIÓN:
 * «diseño web», «creación de páginas web», «hacer una página web» y «diseño de
 * sitios web» son la misma búsqueda y viven todas aquí. Crear una por sinónimo
 * produce doorway pages y Google las castiga desde hace más de diez años.
 *
 * «Desarrollo web» vive en el cuerpo, nunca en el h1: es palabra de agencia,
 * no la que escribe el cliente colombiano.
 */
export const metadata: Metadata = {
  title: "Diseño de páginas web en Colombia | JV Agencia",
  description:
    "Diseño y programo páginas web para negocios de Colombia. Desde $850.000, autoadministrable, con el dominio a tu nombre. Precio y plazo publicados antes de empezar.",
  alternates: {
    canonical: "/servicios/diseno-de-paginas-web",
    languages: {
      "es-CO": "/servicios/diseno-de-paginas-web",
      en: "/en/services/web-design",
      "x-default": "/servicios/diseno-de-paginas-web",
    },
  },
  openGraph: {
    title: "Diseño de páginas web en Colombia | JV Agencia",
    description:
      "Páginas web a la medida desde $850.000. Las diseño y las programo yo, desde Turbaco, Bolívar.",
    url: `${SITE_URL}/servicios/diseno-de-paginas-web`,
    type: "website",
    locale: "es_LA",
  },
};

export default function DisenoDePaginasWeb() {
  return <PaginaWeb idioma="es" ruta="/servicios/diseno-de-paginas-web" />;
}
