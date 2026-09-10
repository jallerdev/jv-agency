import type { Metadata } from "next";

import { PaginaSobre } from "@/components/paginas/Sobre";
import { SITE_URL } from "@/lib/business";

export const metadata: Metadata = {
  title: "Sobre mí — Luis Jaller | JV Agencia",
  description:
    "JV Agencia es el estudio de Luis Jaller, diseñador web y desarrollador en Turbaco, Bolívar. Diseño y programo yo mismo para PYMEs de LATAM: 3+ años construyendo producto, 11+ proyectos en producción.",
  alternates: {
    canonical: "/sobre-nosotros",
    languages: { "es-CO": "/sobre-nosotros", en: "/en/about", "x-default": "/sobre-nosotros" },
  },
  openGraph: {
    title: "Sobre mí — JV Agencia",
    description:
      "El estudio de Luis Jaller: diseño y código en las mismas manos, para PYMEs de LATAM.",
    url: `${SITE_URL}/sobre-nosotros`,
    type: "website",
    locale: "es_LA",
  },
};

export default function SobreNosotros() {
  return <PaginaSobre idioma="es" ruta="/sobre-nosotros" />;
}
