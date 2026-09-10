import type { Encabezado, Enlace, Texto, Traducido } from "@/content/types";

export type Caso = Encabezado & {
  proyecto: string;
  categoria: Texto;
  dominio: string;
  url: string;
  imagen: string;
  alt: Texto;
  descripcion: Texto;
  construido: { titulo: Texto; items: Traducido<readonly string[]> };
  enlace: Enlace;
};

/**
 * Un solo caso, contado entero.
 *
 * La alternativa era enseñar diez capturas. Diez capturas prueban que hay
 * volumen; una contada de punta a punta prueba que se sabe hacer, que es la
 * duda que de verdad tiene alguien a punto de contratar.
 */
export const CASO: Caso = {
  eyebrow: { es: "Un caso a fondo", en: "One case in depth" },
  titulo: {
    es: "Una tienda online de punta a punta.",
    en: "An online store, end to end.",
  },
  acento: { es: "de punta a punta.", en: "end to end." },
  entradilla: {
    es: "En vez de enseñarte diez capturas, te cuento una entera: qué necesitaba el negocio, qué construí y cómo quedó.",
    en: "Instead of showing you ten screenshots, I'll walk you through one: what the business needed, what I built and how it turned out.",
  },
  proyecto: "Bloomrose",
  categoria: { es: "Tienda online", en: "Online store" },
  dominio: "bloomroseaccesorios.com",
  url: "https://www.bloomroseaccesorios.com",
  imagen: "/work/bloomrose.webp",
  alt: {
    es: "Bloomrose — tienda de bisutería y accesorios que diseñé y construí",
    en: "Bloomrose — jewellery and accessories store I designed and built",
  },
  descripcion: {
    es: "Tienda online de bisutería y accesorios para el mercado colombiano. Diseño y desarrollo de punta a punta: catálogo, carrito, cuentas, pagos y envíos.",
    en: "Online jewellery and accessories store for the Colombian market. Design and development end to end: catalogue, cart, accounts, payments and shipping.",
  },
  construido: {
    titulo: { es: "Qué construí", en: "What I built" },
    items: {
      es: [
        "Diseño de interfaz a medida",
        "Pagos en línea (PSE, Nequi, tarjeta)",
        "Cotización de envíos",
        "Catálogo con control de stock",
        "Cuentas y seguimiento de pedidos",
      ],
      en: [
        "Custom interface design",
        "Online payments (PSE, Nequi, card)",
        "Shipping quotes",
        "Catalogue with stock control",
        "Accounts and order tracking",
      ],
    },
  },
  enlace: {
    texto: { es: "Abrir sitio", en: "Open site" },
    href: {
      es: "https://www.bloomroseaccesorios.com",
      en: "https://www.bloomroseaccesorios.com",
    },
    externo: true,
  },
};
