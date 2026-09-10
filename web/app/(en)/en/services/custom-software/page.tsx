import type { Metadata } from "next";

import { PaginaSoftware } from "@/components/paginas/Software";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Custom software development | JV Agencia",
  description:
    "Custom software for the process that eats your day: web apps, internal systems and admin panels. The code lives in your repository from day one.",
  alternates: {
    canonical: "/en/services/custom-software",
    languages: {
      "es-CO": "/servicios/software-a-la-medida",
      en: "/en/services/custom-software",
      "x-default": "/servicios/software-a-la-medida",
    },
  },
  openGraph: {
    title: "Custom software development | JV Agencia",
    description:
      "Internal systems, panels and web apps built for your process. The code is yours and the price follows the scope.",
    url: `${SITE_URL}/en/services/custom-software`,
    type: "website",
    locale: "en_US",
  },
};

export default function CustomSoftware() {
  return <PaginaSoftware idioma="en" ruta="/en/services/custom-software" />;
}
