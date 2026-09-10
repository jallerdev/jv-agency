import type { Encabezado, Enlace, Texto } from "@/content/types";

export type Vertical = {
  numero: string;
  eyebrow: Texto;
  titulo: Texto;
  cuerpo: Texto;
  enlace: Enlace;
  /** Captura real de /public/work. Nunca banco de imágenes. */
  imagen: string;
  alt: Texto;
};

export type Verticales = Encabezado & { paneles: readonly Vertical[] };

export const VERTICALES: Verticales = {
  eyebrow: { es: "Para quién", en: "Who it's for" },
  titulo: {
    es: "Tres formas de llegar aquí, y las tres terminan en lo mismo.",
    en: "Three ways to get here, and all three end the same way.",
  },
  acento: { es: "terminan en lo mismo.", en: "end the same way." },
  paneles: [
    {
      numero: "01",
      eyebrow: { es: "PYMEs", en: "Small business" },
      titulo: {
        es: "Negocios que necesitan una web seria",
        en: "Businesses that need a serious site",
      },
      cuerpo: {
        es: "Tu negocio funciona, pero cuando alguien te busca encuentra un perfil sin precios ni horario. Una página que conteste eso mientras tú trabajas.",
        en: "Your business works, but when someone looks you up they find a profile with no prices and no hours. A site that answers that while you work.",
      },
      enlace: {
        texto: { es: "Ver diseño web", en: "See web design" },
        href: { es: "/servicios/diseno-de-paginas-web", en: "/en/services/web-design" },
      },
      imagen: "/work/marcopolo.webp",
      alt: {
        es: "Peluquería Marcopolo — sitio que diseñé y desarrollé",
        en: "Peluquería Marcopolo — site I designed and built",
      },
    },
    {
      numero: "02",
      eyebrow: { es: "Comercio", en: "Commerce" },
      titulo: {
        es: "Negocios que quieren vender en línea",
        en: "Businesses that want to sell online",
      },
      cuerpo: {
        es: "Vendes por Instagram y se te van pedidos en los mensajes. Un catálogo con inventario, pagos y envíos, y la tienda a tu nombre —no alquilada.",
        en: "You sell through Instagram and lose orders in the DMs. A catalogue with inventory, payments and shipping, and the store in your name —not rented.",
      },
      enlace: {
        texto: { es: "Ver tiendas virtuales", en: "See online stores" },
        href: { es: "/servicios/tiendas-virtuales", en: "/en/services/online-stores" },
      },
      imagen: "/work/bloomrose.webp",
      alt: {
        es: "Bloomrose — tienda online que diseñé y desarrollé",
        en: "Bloomrose — online store I designed and built",
      },
    },
    {
      numero: "03",
      eyebrow: { es: "Software", en: "Software" },
      titulo: {
        es: "Empresas que necesitan software a la medida",
        en: "Companies that need custom software",
      },
      cuerpo: {
        es: "Hay un proceso que te come el día y vive en hojas de cálculo. Un sistema hecho para ese proceso, no una plantilla a la que hay que amoldarse.",
        en: "There's a process eating your day and living in spreadsheets. A system built for that process, not a template you have to bend to.",
      },
      enlace: {
        texto: { es: "Ver software a la medida", en: "See custom software" },
        href: { es: "/servicios/software-a-la-medida", en: "/en/services/custom-software" },
      },
      imagen: "/work/halconos.webp",
      alt: {
        es: "HalcónOS — CRM de ventas que diseñé y desarrollé",
        en: "HalcónOS — sales CRM I designed and built",
      },
    },
  ],
};
