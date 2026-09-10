import type { Metadata } from "next";

import { PaginaClinicas } from "@/components/paginas/Clinicas";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Websites for clinics and medical practices | JV Agencia",
  description:
    "I design websites for practices, clinics and medical centres in Colombia: services explained the way the patient searches for them, booking without a call, and data handled properly.",
  alternates: {
    canonical: "/en/industries/clinics",
    languages: {
      "es-CO": "/sectores/clinicas-y-consultorios",
      en: "/en/industries/clinics",
      "x-default": "/sectores/clinicas-y-consultorios",
    },
  },
  openGraph: {
    title: "Websites for clinics and medical practices | JV Agencia",
    description:
      "So the patient knows who you are, what you treat and how to book, without calling. From $850,000 COP and in 5 days.",
    url: `${SITE_URL}/en/industries/clinics`,
    type: "website",
    locale: "en_US",
  },
};

export default function Clinics() {
  return <PaginaClinicas idioma="en" ruta="/en/industries/clinics" />;
}
