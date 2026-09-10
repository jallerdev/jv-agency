import type { Metadata } from "next";

import { PaginaAgendar } from "@/components/paginas/Agendar";
import { AGENDAR_META } from "@/content/paginas/agendar";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: AGENDAR_META.title.en,
  description: AGENDAR_META.description.en,
  alternates: {
    canonical: "/en/book-a-call",
    languages: { "es-CO": "/agendar", en: "/en/book-a-call", "x-default": "/agendar" },
  },
  openGraph: {
    title: AGENDAR_META.title.en,
    description: AGENDAR_META.description.en,
    url: `${SITE_URL}/en/book-a-call`,
    type: "website",
    locale: "en_US",
  },
};

export default function BookACall() {
  return <PaginaAgendar idioma="en" ruta="/en/book-a-call" />;
}
