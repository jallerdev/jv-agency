import type { Metadata } from "next";

import { PaginaSalones } from "@/components/paginas/Salones";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Websites for beauty salons and spas | JV Agencia",
  description:
    "I design websites for beauty salons, hairdressers, barbershops and spas in Colombia: a service list with prices, booking over WhatsApp and the work on show.",
  alternates: {
    canonical: "/en/industries/salons-and-spas",
    languages: {
      "es-CO": "/sectores/salones-y-spas",
      en: "/en/industries/salons-and-spas",
      "x-default": "/sectores/salones-y-spas",
    },
  },
  openGraph: {
    title: "Websites for beauty salons and spas | JV Agencia",
    description:
      "A service list with prices, booking without twenty messages and your work on show. From $850,000 COP and in 5 days.",
    url: `${SITE_URL}/en/industries/salons-and-spas`,
    type: "website",
    locale: "en_US",
  },
};

export default function SalonsAndSpas() {
  return <PaginaSalones idioma="en" ruta="/en/industries/salons-and-spas" />;
}
