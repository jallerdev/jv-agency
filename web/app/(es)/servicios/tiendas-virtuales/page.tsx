import type { Metadata } from "next";

import { PaginaTiendas } from "@/components/paginas/Tiendas";
import { SITE_URL } from "@/lib/site";

/**
 * DECISIÓN DE VOCABULARIO, y no es cosmética: en Colombia el dueño del negocio
 * busca «tienda virtual» —por eso va en la URL y en el h1— mientras que la
 * página de precios, las tres de ciudad y los dos sectores ya dicen «tienda
 * online». Son la MISMA intención, así que van en la MISMA página: «tienda
 * virtual» al frente y «tienda online» en el title y el cuerpo, para no partir
 * en dos una palabra que ya está publicada con precio y plazo.
 */
export const metadata: Metadata = {
  title: "Creación de tiendas virtuales y tienda online en Colombia | JV Agencia",
  description:
    "Creo tu tienda virtual con catálogo, inventario, carrito, pagos con PSE, Nequi y tarjeta y envíos cotizados. Tienda online desde $2.500.000, lista en 3 semanas.",
  alternates: {
    canonical: "/servicios/tiendas-virtuales",
    languages: {
      "es-CO": "/servicios/tiendas-virtuales",
      en: "/en/services/online-stores",
      "x-default": "/servicios/tiendas-virtuales",
    },
  },
  openGraph: {
    title: "Creación de tiendas virtuales y tienda online en Colombia | JV Agencia",
    description:
      "Tu tienda virtual cobra sola: PSE, Nequi y tarjeta, inventario y envíos. Desde $2.500.000, lista en 3 semanas.",
    url: `${SITE_URL}/servicios/tiendas-virtuales`,
    type: "website",
    locale: "es_LA",
  },
};

export default function TiendasVirtuales() {
  return <PaginaTiendas idioma="es" ruta="/servicios/tiendas-virtuales" />;
}
