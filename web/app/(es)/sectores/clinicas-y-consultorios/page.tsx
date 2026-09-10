import type { Metadata } from "next";

import { PaginaClinicas } from "@/components/paginas/Clinicas";
import { SITE_URL } from "@/lib/site";

/**
 * Una sola página cubre la intención completa: clínica, consultorio, centro
 * médico, odontología, fisioterapia, veterinaria. Son el mismo trabajo de
 * página web y una por sinónimo sería una doorway page.
 *
 * Hay un sitio de salud terminado que NO se nombra aquí hasta verificar su
 * habilitación en el REPS: se menciona la regla, no el proyecto.
 */
export const metadata: Metadata = {
  title: "Páginas web para clínicas y consultorios | JV Agencia",
  description:
    "Diseño páginas web para consultorios, clínicas y centros médicos en Colombia: servicios explicados como los busca el paciente, cita sin llamar y datos tratados en serio.",
  alternates: {
    canonical: "/sectores/clinicas-y-consultorios",
    languages: {
      "es-CO": "/sectores/clinicas-y-consultorios",
      en: "/en/industries/clinics",
      "x-default": "/sectores/clinicas-y-consultorios",
    },
  },
  openGraph: {
    title: "Páginas web para clínicas y consultorios | JV Agencia",
    description:
      "Que el paciente sepa quién eres, qué atiendes y cómo pedir la cita, sin llamar. Desde $850.000 y en 5 días.",
    url: `${SITE_URL}/sectores/clinicas-y-consultorios`,
    type: "website",
    locale: "es_LA",
  },
};

export default function ClinicasYConsultorios() {
  return <PaginaClinicas idioma="es" ruta="/sectores/clinicas-y-consultorios" />;
}
