import type { Metadata } from "next";

import { PaginaSoftware } from "@/components/paginas/Software";
import { SITE_URL } from "@/lib/site";

/**
 * POR QUÉ «A LA MEDIDA» Y NO «A MEDIDA»: las dos formas conviven en el mercado
 * colombiano. El h1 y la ruta usan «a la medida», que es el uso local, y «a
 * medida» suelto aparece una vez en el cuerpo para no perder a quien lo
 * escribe así.
 */
export const metadata: Metadata = {
  title: "Desarrollo de software a la medida | JV Agencia",
  description:
    "Software a la medida para el proceso que te come el día: apps web, sistemas internos y paneles administrables. El código queda en tu repositorio desde el primer día.",
  alternates: {
    canonical: "/servicios/software-a-la-medida",
    languages: {
      "es-CO": "/servicios/software-a-la-medida",
      en: "/en/services/custom-software",
      "x-default": "/servicios/software-a-la-medida",
    },
  },
  openGraph: {
    title: "Desarrollo de software a la medida | JV Agencia",
    description:
      "Sistemas internos, paneles y apps web hechos para tu proceso. El código es tuyo y el precio va según el alcance.",
    url: `${SITE_URL}/servicios/software-a-la-medida`,
    type: "website",
    locale: "es_LA",
  },
};

export default function SoftwareALaMedida() {
  return <PaginaSoftware idioma="es" ruta="/servicios/software-a-la-medida" />;
}
