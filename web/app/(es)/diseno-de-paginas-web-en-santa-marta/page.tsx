import type { Metadata } from "next";

import { PaginaCiudad } from "@/components/paginas/Ciudad";
import { SANTA_MARTA } from "@/content/ciudades/santa-marta";
import { SITE_URL } from "@/lib/site";
import { money, PISOS } from "@/lib/quote";

/**
 * Página de ciudad para la intención transaccional «diseño de páginas web en
 * Santa Marta». El material —cifras, confesión, preguntas y distancia— vive en
 * `content/ciudades/santa-marta.ts`; el esqueleto, en `components/paginas/Ciudad.tsx`.
 *
 * SIN `hreflang`: no hay versión en inglés y no la va a haber. «Diseño de
 * páginas web en Santa Marta» es una búsqueda local en castellano y no tiene
 * equivalente en inglés que valga la pena perseguir. Mismo criterio que las
 * tres de Bolívar, Atlántico y Bogotá.
 *
 * TITLE: «diseño web santa marta» trae más impresiones que la forma larga
 * (Search Console, nov. 2026), así que el title lleva las dos formas y el precio.
 */
const TITULO = `Diseño web en Santa Marta: páginas web desde ${money(PISOS.landing)}`;

export const metadata: Metadata = {
  title: TITULO,
  description: SANTA_MARTA.metaDescripcion,
  alternates: { canonical: SANTA_MARTA.ruta },
  openGraph: {
    title: TITULO,
    description: SANTA_MARTA.ogDescripcion,
    url: `${SITE_URL}${SANTA_MARTA.ruta}`,
    type: "website",
    locale: "es_LA",
  },
};

export default function DisenoPaginasWebSantaMartaPage() {
  return <PaginaCiudad ciudad={SANTA_MARTA} />;
}
