import type { Metadata } from "next";

import { PaginaPrecios } from "@/components/paginas/Precios";
import { SITE_URL } from "@/lib/site";

const TITLE = "Website pricing in Colombia | JV Agencia";
const DESCRIPTION =
  "What a website, an online store or SEO actually costs. Prices from $850,000 COP and real timelines, published. No quote behind closed doors.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/en/pricing",
    languages: { "es-CO": "/precios", en: "/en/pricing", "x-default": "/precios" },
  },
  openGraph: {
    title: TITLE,
    description: "Prices and timelines, published: a website from $850,000 COP, live in 5 days.",
    url: `${SITE_URL}/en/pricing`,
    type: "website",
    locale: "en_US",
  },
};

export default function Pricing() {
  return (
    <PaginaPrecios idioma="en" ruta="/en/pricing" titulo={TITLE} descripcion={DESCRIPTION} />
  );
}
