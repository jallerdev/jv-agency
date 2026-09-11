import type { Metadata } from "next";

import { PaginaCiudad } from "@/components/paginas/Ciudad";
import { BUCARAMANGA } from "@/content/ciudades/bucaramanga";
import { SITE_URL } from "@/lib/site";

/**
 * Página de ciudad para la intención transaccional «diseño de páginas web en
 * Bucaramanga». El material —cifras, confesión, preguntas y distancia— vive en
 * `content/ciudades/bucaramanga.ts`; el esqueleto, en `components/paginas/Ciudad.tsx`.
 *
 * SIN `hreflang`: no hay versión en inglés y no la va a haber. «Diseño de
 * páginas web en Bucaramanga» es una búsqueda local en castellano y no tiene
 * equivalente en inglés que valga la pena perseguir. Mismo criterio que las
 * tres de Bolívar, Atlántico y Bogotá.
 */
export const metadata: Metadata = {
  title: "Diseño de páginas web en Bucaramanga | Luis Jaller · JV Agencia",
  description: BUCARAMANGA.metaDescripcion,
  alternates: { canonical: BUCARAMANGA.ruta },
  openGraph: {
    title: "Diseño de páginas web en Bucaramanga | Luis Jaller · JV Agencia",
    description: BUCARAMANGA.ogDescripcion,
    url: `${SITE_URL}${BUCARAMANGA.ruta}`,
    type: "website",
    locale: "es_LA",
  },
};

export default function DisenoPaginasWebBucaramangaPage() {
  return <PaginaCiudad ciudad={BUCARAMANGA} />;
}
