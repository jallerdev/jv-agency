import type { Metadata } from "next";

import { PaginaCiudad } from "@/components/paginas/Ciudad";
import { CALI } from "@/content/ciudades/cali";
import { SITE_URL } from "@/lib/site";

/**
 * Página de ciudad para la intención transaccional «diseño de páginas web en
 * Cali». El material —cifras, confesión, preguntas y distancia— vive en
 * `content/ciudades/cali.ts`; el esqueleto, en `components/paginas/Ciudad.tsx`.
 *
 * SIN `hreflang`: no hay versión en inglés y no la va a haber. «Diseño de
 * páginas web en Cali» es una búsqueda local en castellano y no tiene
 * equivalente en inglés que valga la pena perseguir. Mismo criterio que las
 * tres de Bolívar, Atlántico y Bogotá.
 */
export const metadata: Metadata = {
  title: "Diseño de páginas web en Cali | Luis Jaller · JV Agencia",
  description: CALI.metaDescripcion,
  alternates: { canonical: CALI.ruta },
  openGraph: {
    title: "Diseño de páginas web en Cali | Luis Jaller · JV Agencia",
    description: CALI.ogDescripcion,
    url: `${SITE_URL}${CALI.ruta}`,
    type: "website",
    locale: "es_LA",
  },
};

export default function DisenoPaginasWebCaliPage() {
  return <PaginaCiudad ciudad={CALI} />;
}
