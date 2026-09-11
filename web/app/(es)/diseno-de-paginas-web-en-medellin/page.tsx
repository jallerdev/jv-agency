import type { Metadata } from "next";

import { PaginaCiudad } from "@/components/paginas/Ciudad";
import { MEDELLIN } from "@/content/ciudades/medellin";
import { SITE_URL } from "@/lib/site";

/**
 * Página de ciudad para la intención transaccional «diseño de páginas web en
 * Medellín». El material —cifras, confesión, preguntas y distancia— vive en
 * `content/ciudades/medellin.ts`; el esqueleto, en `components/paginas/Ciudad.tsx`.
 *
 * SIN `hreflang`: no hay versión en inglés y no la va a haber. «Diseño de
 * páginas web en Medellín» es una búsqueda local en castellano y no tiene
 * equivalente en inglés que valga la pena perseguir. Mismo criterio que las
 * tres de Bolívar, Atlántico y Bogotá.
 */
export const metadata: Metadata = {
  title: "Diseño de páginas web en Medellín | Luis Jaller · JV Agencia",
  description: MEDELLIN.metaDescripcion,
  alternates: { canonical: MEDELLIN.ruta },
  openGraph: {
    title: "Diseño de páginas web en Medellín | Luis Jaller · JV Agencia",
    description: MEDELLIN.ogDescripcion,
    url: `${SITE_URL}${MEDELLIN.ruta}`,
    type: "website",
    locale: "es_LA",
  },
};

export default function DisenoPaginasWebMedellinPage() {
  return <PaginaCiudad ciudad={MEDELLIN} />;
}
