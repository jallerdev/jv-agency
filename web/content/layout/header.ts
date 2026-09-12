import type { Texto, Traducido } from "@/content/types";

/**
 * LA NAVEGACIÓN
 * ──────────────────────────────────────────────────────────────────────────
 * Las rutas viven aquí con las dos lenguas juntas porque el inglés NO es el
 * español con un prefijo: `/en/services/web-design`, no `/en/servicios/...`.
 * Una URL en inglés que dice «servicios» no posiciona en inglés, así que el
 * slug se traduce y por eso cada destino guarda su par.
 *
 * El mega-menú cuelga solo de «Servicios»: es el único que tiene seis hijos.
 * Colgarlo de los cinco restantes habría sido el error de siempre —un panel
 * enorme para tres enlaces— y encima obligaría a pasar por encima de todos
 * para saber cuál abre algo.
 */

export type EntradaMenu = {
  texto: Texto;
  href: Traducido<string>;
  descripcion?: Texto;
};

export type EntradaNav = EntradaMenu & {
  /** Si trae hijos, el enlace abre el mega-menú al pasar por encima. */
  hijos?: readonly EntradaMenu[];
};

export const NAV: readonly EntradaNav[] = [
  {
    texto: { es: "Servicios", en: "Services" },
    href: { es: "/#servicios", en: "/en#servicios" },
    hijos: [
      {
        texto: { es: "Diseño de páginas web", en: "Web design" },
        href: { es: "/servicios/diseno-de-paginas-web", en: "/en/services/web-design" },
        descripcion: {
          es: "Sitios rápidos, hechos a mano, que cargan en menos de dos segundos.",
          en: "Fast, hand-built sites that load in under two seconds.",
        },
      },
      {
        texto: { es: "Tiendas virtuales", en: "Online stores" },
        href: { es: "/servicios/tiendas-virtuales", en: "/en/services/online-stores" },
        descripcion: {
          es: "Catálogo, inventario, pagos en línea y envíos con seguimiento.",
          en: "Catalogue, inventory, online payments and tracked shipping.",
        },
      },
      {
        texto: { es: "Chatbot de WhatsApp", en: "WhatsApp chatbot" },
        href: { es: "/servicios/chatbot-whatsapp", en: "/en/services/whatsapp-chatbot" },
        descripcion: {
          es: "Responde y agenda solo, a la hora que escriban.",
          en: "Answers and books on its own, whatever time they write.",
        },
      },
      {
        texto: { es: "Posicionamiento SEO", en: "SEO" },
        href: { es: "/servicios/posicionamiento-seo", en: "/en/services/seo" },
        descripcion: {
          es: "Que te encuentren buscando lo que vendes, no tu nombre.",
          en: "Get found for what you sell, not for your name.",
        },
      },
      {
        texto: { es: "Software a la medida", en: "Custom software" },
        href: { es: "/servicios/software-a-la-medida", en: "/en/services/custom-software" },
        descripcion: {
          es: "Cuando ninguna herramienta del mercado hace lo que necesitas.",
          en: "For when no off-the-shelf tool does what you need.",
        },
      },
      {
        texto: { es: "Precios", en: "Pricing" },
        href: { es: "/precios", en: "/en/pricing" },
        descripcion: {
          es: "Lo que cuesta cada cosa, en pesos y sin llamada previa.",
          en: "What each thing costs, in pesos, with no call first.",
        },
      },
    ],
  },
  {
    texto: { es: "Trabajo", en: "Work" },
    href: { es: "/#portafolio", en: "/en#portafolio" },
  },
  {
    texto: { es: "Proceso", en: "Process" },
    href: { es: "/#proceso", en: "/en#proceso" },
  },
  {
    texto: { es: "Precios", en: "Pricing" },
    href: { es: "/precios", en: "/en/pricing" },
  },
  {
    texto: { es: "Sobre mí", en: "About" },
    href: { es: "/sobre-nosotros", en: "/en/about" },
  },
  {
    texto: { es: "Blog", en: "Blog" },
    href: { es: "/blog", en: "/en/blog" },
  },
  {
    texto: { es: "Contacto", en: "Contact" },
    href: { es: "/contacto", en: "/en/contact" },
  },
] as const;

export const CABECERA = {
  cta: {
    texto: { es: "Agenda tu llamada", en: "Book a call" },
    /* A la PÁGINA y no al ancla de la portada. Este botón sale en las cuarenta
       y pico rutas del sitio: en cualquiera que no sea la portada, «/#agenda»
       quiere decir «vete a la portada y baja hasta el final», que es justo lo
       que la página de agendar viene a arreglar. Los CTA que viven dentro de
       la portada —el hero y la declaración— siguen siendo anclas, porque ahí
       el destino está a un scroll y cargar una página sería peor. */
    href: { es: "/agendar", en: "/en/book-a-call" },
  },
  menu: { es: "Menú", en: "Menu" },
  cerrar: { es: "Cerrar", en: "Close" },
  idioma: { es: "Cambiar a inglés", en: "Switch to Spanish" },
  /* Para las diez rutas que solo existen en castellano —las siete de ciudad y
     las tres legales—. El conmutador se pinta igual y lleva a la portada del
     otro idioma, pero diciendo a dónde va: un enlace que promete la misma
     página en inglés y entrega otra distinta es peor que no ofrecer nada. */
  idiomaSinPar: {
    es: "Esta página solo existe en español. Ir a la portada en inglés",
    en: "This page only exists in Spanish. Go to the Spanish home page",
  },
  saltar: { es: "Saltar al contenido", en: "Skip to content" },
} as const;
