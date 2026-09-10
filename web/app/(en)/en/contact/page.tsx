import type { Metadata } from "next";

import { PaginaContacto } from "@/components/paginas/Contacto";
import { SITE_URL } from "@/lib/business";

export const metadata: Metadata = {
  title: "Contact — let's talk about your project | JV Agencia",
  description:
    "Book a free 20-minute call, message me on WhatsApp or send me an email. I answer, in under 24 hours.",
  alternates: {
    canonical: "/en/contact",
    languages: { "es-CO": "/contacto", en: "/en/contact", "x-default": "/contacto" },
  },
  openGraph: {
    title: "Contact | JV Agencia",
    description: "A free 20-minute call, WhatsApp or email. I answer.",
    url: `${SITE_URL}/en/contact`,
    type: "website",
    locale: "en_US",
  },
};

export default function Contact() {
  return <PaginaContacto idioma="en" ruta="/en/contact" />;
}
