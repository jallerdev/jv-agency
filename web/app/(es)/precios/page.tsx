import type { Metadata } from "next";

import { PaginaPrecios } from "@/components/paginas/Precios";
import { SITE_URL } from "@/lib/site";

const TITULO = "Precios de páginas web en Colombia | JV Agencia";
const DESCRIPCION =
  "Cuánto cuesta una página web, una tienda online o el SEO de tu negocio. Precios desde $850.000 y plazos reales, publicados. Sin cotización a puerta cerrada.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  alternates: {
    canonical: "/precios",
    languages: { "es-CO": "/precios", en: "/en/pricing", "x-default": "/precios" },
  },
  openGraph: {
    title: TITULO,
    description: "Precios y plazos publicados: página web desde $850.000, lista en 5 días.",
    url: `${SITE_URL}/precios`,
    type: "website",
    locale: "es_LA",
  },
};

export default function Precios() {
  return (
    <PaginaPrecios idioma="es" ruta="/precios" titulo={TITULO} descripcion={DESCRIPCION} />
  );
}
