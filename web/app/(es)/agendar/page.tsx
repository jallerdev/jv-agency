import type { Metadata } from "next";

import { PaginaAgendar } from "@/components/paginas/Agendar";
import { AGENDAR_META } from "@/content/paginas/agendar";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: AGENDAR_META.title.es,
  description: AGENDAR_META.description.es,
  alternates: {
    canonical: "/agendar",
    languages: { "es-CO": "/agendar", en: "/en/book-a-call", "x-default": "/agendar" },
  },
  openGraph: {
    title: AGENDAR_META.title.es,
    description: AGENDAR_META.description.es,
    url: `${SITE_URL}/agendar`,
    type: "website",
    locale: "es_LA",
  },
};

export default function Agendar() {
  return <PaginaAgendar idioma="es" ruta="/agendar" />;
}
