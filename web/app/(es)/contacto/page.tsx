import type { Metadata } from "next";

import { PaginaContacto } from "@/components/paginas/Contacto";
import { SITE_URL } from "@/lib/business";

export const metadata: Metadata = {
  title: "Contacto — hablemos de tu proyecto | JV Agencia",
  description:
    "Agenda una llamada de 20 minutos sin costo, escríbeme por WhatsApp o mándame un correo. Contesto yo, en menos de 24 horas.",
  alternates: {
    canonical: "/contacto",
    languages: { "es-CO": "/contacto", en: "/en/contact", "x-default": "/contacto" },
  },
  openGraph: {
    title: "Contacto | JV Agencia",
    description: "Llamada de 20 minutos sin costo, WhatsApp o correo. Contesto yo.",
    url: `${SITE_URL}/contacto`,
    type: "website",
    locale: "es_LA",
  },
};

export default function Contacto() {
  return <PaginaContacto idioma="es" ruta="/contacto" />;
}
