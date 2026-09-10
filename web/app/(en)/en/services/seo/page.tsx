import type { Metadata } from "next";

import { PaginaSeo } from "@/components/paginas/Seo";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "SEO in Colombia | JV Agencia",
  description:
    "Search engine optimisation and local SEO in Colombia. Audit from $390,000 COP and a monthly plan from $650,000 COP. I don't promise first place: I guarantee the work and the report.",
  alternates: {
    canonical: "/en/services/seo",
    languages: {
      "es-CO": "/servicios/posicionamiento-seo",
      en: "/en/services/seo",
      "x-default": "/servicios/posicionamiento-seo",
    },
  },
  openGraph: {
    title: "SEO in Colombia | JV Agencia",
    description:
      "Get found when people search for what you sell. SEO audit from $390,000 COP and monthly work from $650,000 COP.",
    url: `${SITE_URL}/en/services/seo`,
    type: "website",
    locale: "en_US",
  },
};

export default function Seo() {
  return <PaginaSeo idioma="en" ruta="/en/services/seo" />;
}
