import type { Metadata } from "next";

import { PaginaWeb } from "@/components/paginas/Web";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Web design in Colombia | JV Agencia",
  description:
    "I design and code websites for businesses in Colombia. From $850,000 COP, self-managed, with the domain in your name. Price and timeline published before we start.",
  alternates: {
    canonical: "/en/services/web-design",
    languages: {
      "es-CO": "/servicios/diseno-de-paginas-web",
      en: "/en/services/web-design",
      "x-default": "/servicios/diseno-de-paginas-web",
    },
  },
  openGraph: {
    title: "Web design in Colombia | JV Agencia",
    description:
      "Custom websites from $850,000 COP. I design them and I code them, from Turbaco, Bolívar.",
    url: `${SITE_URL}/en/services/web-design`,
    type: "website",
    locale: "en_US",
  },
};

export default function WebDesign() {
  return <PaginaWeb idioma="en" ruta="/en/services/web-design" />;
}
