import type { Texto, Traducido } from "@/content/types";

/**
 * EL PIE
 * ──────────────────────────────────────────────────────────────────────────
 * Cuatro columnas y una marca de agua enorme al 4 %.
 *
 * La marca de agua no es decoración gratuita: el pie es el único bloque del
 * sitio que puede permitirse el nombre a 20 vw sin robarle sitio a nada,
 * porque debajo ya no hay contenido. Al 4 % de opacidad se lee como textura
 * —no compite con los enlaces, que es lo que pasa cuando alguien la sube al
 * 15 %— y le da al cierre un peso que cuatro listas de enlaces no dan.
 */

export type ColumnaPie = {
  titulo: Texto;
  enlaces: readonly { texto: Texto; href: Traducido<string>; externo?: boolean }[];
};

export const COLUMNAS: readonly ColumnaPie[] = [
  {
    titulo: { es: "Servicios", en: "Services" },
    enlaces: [
      {
        texto: { es: "Diseño de páginas web", en: "Web design" },
        href: { es: "/servicios/diseno-de-paginas-web", en: "/en/services/web-design" },
      },
      {
        texto: { es: "Tiendas virtuales", en: "Online stores" },
        href: { es: "/servicios/tiendas-virtuales", en: "/en/services/online-stores" },
      },
      {
        texto: { es: "Chatbot de WhatsApp", en: "WhatsApp chatbot" },
        href: { es: "/servicios/chatbot-whatsapp", en: "/en/services/whatsapp-chatbot" },
      },
      {
        texto: { es: "Posicionamiento SEO", en: "SEO" },
        href: { es: "/servicios/posicionamiento-seo", en: "/en/services/seo" },
      },
      {
        texto: { es: "Software a la medida", en: "Custom software" },
        href: { es: "/servicios/software-a-la-medida", en: "/en/services/custom-software" },
      },
    ],
  },
  {
    titulo: { es: "Estudio", en: "Studio" },
    enlaces: [
      { texto: { es: "Precios", en: "Pricing" }, href: { es: "/precios", en: "/en/pricing" } },
      { texto: { es: "Trabajo", en: "Work" }, href: { es: "/#portafolio", en: "/en#portafolio" } },
      { texto: { es: "Proceso", en: "Process" }, href: { es: "/#proceso", en: "/en#proceso" } },
      { texto: { es: "Sobre mí", en: "About" }, href: { es: "/sobre-nosotros", en: "/en/about" } },
      { texto: { es: "Blog", en: "Blog" }, href: { es: "/blog", en: "/en/blog" } },
      {
        texto: { es: "Contacto", en: "Contact" },
        href: { es: "/contacto", en: "/en/contact" },
      },
    ],
  },
  {
    titulo: { es: "Sectores", en: "Industries" },
    enlaces: [
      {
        texto: { es: "Salones y spas", en: "Salons and spas" },
        href: { es: "/sectores/salones-y-spas", en: "/en/industries/salons-and-spas" },
      },
      {
        texto: { es: "Clínicas y consultorios", en: "Clinics" },
        href: { es: "/sectores/clinicas-y-consultorios", en: "/en/industries/clinics" },
      },
      /* Las SIETE de ciudad no se traducen: «diseño de páginas web en
         Cartagena» es SEO local y no tiene búsqueda equivalente en inglés.
         Apuntan al español desde las dos lenguas, a propósito. */
      {
        texto: { es: "Cartagena", en: "Cartagena" },
        href: {
          es: "/diseno-de-paginas-web-en-cartagena",
          en: "/diseno-de-paginas-web-en-cartagena",
        },
      },
      {
        texto: { es: "Barranquilla", en: "Barranquilla" },
        href: {
          es: "/diseno-de-paginas-web-en-barranquilla",
          en: "/diseno-de-paginas-web-en-barranquilla",
        },
      },
      {
        texto: { es: "Bogotá", en: "Bogotá" },
        href: {
          es: "/diseno-de-paginas-web-en-bogota",
          en: "/diseno-de-paginas-web-en-bogota",
        },
      },
      {
        texto: { es: "Medellín", en: "Medellín" },
        href: {
          es: "/diseno-de-paginas-web-en-medellin",
          en: "/diseno-de-paginas-web-en-medellin",
        },
      },
      {
        texto: { es: "Cali", en: "Cali" },
        href: {
          es: "/diseno-de-paginas-web-en-cali",
          en: "/diseno-de-paginas-web-en-cali",
        },
      },
      {
        texto: { es: "Bucaramanga", en: "Bucaramanga" },
        href: {
          es: "/diseno-de-paginas-web-en-bucaramanga",
          en: "/diseno-de-paginas-web-en-bucaramanga",
        },
      },
      {
        texto: { es: "Santa Marta", en: "Santa Marta" },
        href: {
          es: "/diseno-de-paginas-web-en-santa-marta",
          en: "/diseno-de-paginas-web-en-santa-marta",
        },
      },
    ],
  },
  {
    titulo: { es: "Producto", en: "Product" },
    enlaces: [
      /* HalcónOS es producto propio. El enlace es legítimo y además cumple una
         función concreta: hasta que se puso, el subdominio no recibía ni un
         enlace del sitio principal. */
      {
        texto: { es: "HalcónOS — CRM de ventas", en: "HalcónOS — sales CRM" },
        href: { es: "https://halcon.jvagencia.com", en: "https://halcon.jvagencia.com" },
        externo: true,
      },
      {
        texto: { es: "Hummik — citas por WhatsApp", en: "Hummik — WhatsApp booking" },
        href: { es: "https://www.hummik.com", en: "https://www.hummik.com" },
        externo: true,
      },
      {
        texto: { es: "Política de privacidad", en: "Privacy policy" },
        href: { es: "/privacidad", en: "/privacidad" },
      },
      {
        texto: { es: "Términos y condiciones", en: "Terms and conditions" },
        href: { es: "/terminos", en: "/terminos" },
      },
      {
        texto: { es: "Política de cookies", en: "Cookie policy" },
        href: { es: "/cookies", en: "/cookies" },
      },
      /* Esta no es una legal más: es la URL de eliminación de datos que Meta
         exige a un Tech Provider y que su equipo de revisión comprueba. Estaba
         en el sitemap.xml y no la enlazaba NADIE —única huérfana de las 37
         URL del sitio—, así que Google la veía ofrecida y sin un solo enlace
         entrante, y un revisor de Meta solo podía llegar tecleándola. */
      {
        texto: { es: "Eliminación de datos", en: "Data deletion" },
        href: { es: "/eliminacion-de-datos", en: "/eliminacion-de-datos" },
      },
    ],
  },
];

export const PIE = {
  descripcion: {
    es: "Páginas web y software a la medida para negocios de LATAM, hechos por una sola persona de principio a fin.",
    en: "Websites and custom software for LATAM businesses, built end to end by one person.",
  },
  base: {
    es: "Turbaco, Bolívar · Colombia",
    en: "Turbaco, Bolívar · Colombia",
  },
  derechos: {
    es: "Todos los derechos reservados.",
    en: "All rights reserved.",
  },
  hecho: {
    es: "Hecho en Next.js, alojado en Vercel.",
    en: "Built with Next.js, hosted on Vercel.",
  },
} as const;
