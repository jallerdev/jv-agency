import type { Metadata } from "next";

import { PaginaCiudad } from "@/components/paginas/Ciudad";
import { SANTA_MARTA } from "@/content/ciudades/santa-marta";
import { SITE_URL } from "@/lib/site";

/**
 * Página de ciudad para la intención transaccional «diseño de páginas web en
 * Santa Marta». El material —cifras, confesión, preguntas y distancia— vive en
 * `content/ciudades/santa-marta.ts`; el esqueleto, en `components/paginas/Ciudad.tsx`.
 *
 * SIN `hreflang`: no hay versión en inglés y no la va a haber. «Diseño de
 * páginas web en Santa Marta» es una búsqueda local en castellano y no tiene
 * equivalente en inglés que valga la pena perseguir. Mismo criterio que las
 * tres de Bolívar, Atlántico y Bogotá.
 */
export const metadata: Metadata = {
  title: "Diseño de páginas web en Santa Marta | Luis Jaller · JV Agencia",
  description: SANTA_MARTA.metaDescripcion,
  alternates: { canonical: SANTA_MARTA.ruta },
  openGraph: {
    title: "Diseño de páginas web en Santa Marta | Luis Jaller · JV Agencia",
    description: SANTA_MARTA.ogDescripcion,
    url: `${SITE_URL}${SANTA_MARTA.ruta}`,
    type: "website",
    locale: "es_LA",
  },
};

export default function DisenoPaginasWebSantaMartaPage() {
  return <PaginaCiudad ciudad={SANTA_MARTA} />;
}
