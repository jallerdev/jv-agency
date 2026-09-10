import type { Metadata } from "next";

import { PaginaSalones } from "@/components/paginas/Salones";
import { SITE_URL } from "@/lib/site";

/**
 * PÁGINA DE SECTOR SOLO DONDE HAY TRABAJO QUE MOSTRAR. Aquí hay tres piezas
 * —Marcopolo, Elka Gómez y Hummik—; de restaurantes e inmobiliarias no hay ni
 * una, y por eso esos dos sectores no tienen página: una de sector sin caso es
 * una página vacía que además le compite al blog.
 *
 * Una sola página cubre salón, peluquería, barbería, spa, uñas y estética: son
 * sinónimos del mismo oficio para quien busca.
 */
export const metadata: Metadata = {
  title: "Páginas web para salones de belleza y spas | JV Agencia",
  description:
    "Diseño páginas web para salones de belleza, peluquerías, barberías y spas en Colombia: carta de servicios con precio, reserva por WhatsApp y el trabajo a la vista.",
  alternates: {
    canonical: "/sectores/salones-y-spas",
    languages: {
      "es-CO": "/sectores/salones-y-spas",
      en: "/en/industries/salons-and-spas",
      "x-default": "/sectores/salones-y-spas",
    },
  },
  openGraph: {
    title: "Páginas web para salones de belleza y spas | JV Agencia",
    description:
      "Carta de servicios con precio, reserva sin veinte mensajes y tus trabajos a la vista. Desde $850.000 y en 5 días.",
    url: `${SITE_URL}/sectores/salones-y-spas`,
    type: "website",
    locale: "es_LA",
  },
};

export default function SalonesYSpas() {
  return <PaginaSalones idioma="es" ruta="/sectores/salones-y-spas" />;
}
