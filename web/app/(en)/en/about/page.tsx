import type { Metadata } from "next";

import { PaginaSobre } from "@/components/paginas/Sobre";
import { SITE_URL } from "@/lib/business";

export const metadata: Metadata = {
  title: "About — Luis Jaller | JV Agencia",
  description:
    "JV Agencia is Luis Jaller's studio, a web designer and developer in Turbaco, Bolívar, Colombia. I design and write the code myself for LATAM small businesses: 3+ years building product, 11+ projects in production.",
  alternates: {
    canonical: "/en/about",
    languages: { "es-CO": "/sobre-nosotros", en: "/en/about", "x-default": "/sobre-nosotros" },
  },
  openGraph: {
    title: "About — JV Agencia",
    description: "Luis Jaller's studio: design and code in the same hands, for LATAM businesses.",
    url: `${SITE_URL}/en/about`,
    type: "website",
    locale: "en_US",
  },
};

export default function About() {
  return <PaginaSobre idioma="en" ruta="/en/about" />;
}
