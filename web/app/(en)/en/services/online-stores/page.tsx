import type { Metadata } from "next";

import { PaginaTiendas } from "@/components/paginas/Tiendas";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Online store development in Colombia | JV Agencia",
  description:
    "I build your online store with catalogue, inventory, cart, payments via PSE, Nequi and card, and quoted shipping. From $2,500,000 COP, ready in 3 weeks.",
  alternates: {
    canonical: "/en/services/online-stores",
    languages: {
      "es-CO": "/servicios/tiendas-virtuales",
      en: "/en/services/online-stores",
      "x-default": "/servicios/tiendas-virtuales",
    },
  },
  openGraph: {
    title: "Online store development in Colombia | JV Agencia",
    description:
      "Your store charges on its own: PSE, Nequi and card, inventory and shipping. From $2,500,000 COP, ready in 3 weeks.",
    url: `${SITE_URL}/en/services/online-stores`,
    type: "website",
    locale: "en_US",
  },
};

export default function OnlineStores() {
  return <PaginaTiendas idioma="en" ruta="/en/services/online-stores" />;
}
