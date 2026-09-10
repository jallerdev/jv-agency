import type { Encabezado, Enlace, Texto } from "@/content/types";

export type Hero = Encabezado & {
  botones: [Enlace, Enlace];
  /** La línea de precio bajo los botones. Enlaza a la agenda, no a /precios:
   *  quien lee un precio y hace clic ya decidió, y mandarlo a una tabla de
   *  tarifas le pone un paso más entre la decisión y la llamada. */
  precio: { texto: Texto; enlace: Enlace };
  credencial: {
    sello: Texto;
    titulo: Texto;
    cuerpo: Texto;
    /** Cuándo se verificó. Dato real, no adorno: se puede comprobar. */
    fecha: Texto;
  };
};

export const HERO: Hero = {
  eyebrow: {
    es: "Diseñador web y desarrollador · LATAM",
    en: "Web designer and developer · LATAM",
  },
  titulo: {
    es: "Diseño de páginas web que hacen que te tomen en serio.",
    en: "Websites that make people take you seriously.",
  },
  /* La frase operativa, en naranja. Tiene que estar literal en `titulo`. */
  acento: {
    es: "te tomen en serio.",
    en: "take you seriously.",
  },
  entradilla: {
    es: "Diseño y programo yo mismo. Tu web o tu software con el acabado de una marca grande por fuera y la solidez de un buen producto por dentro —sin presupuesto corporativo.",
    en: "I design and code it myself. Your site or your software with the finish of a big brand on the outside and the solidity of a good product on the inside —without the corporate budget.",
  },
  botones: [
    {
      texto: { es: "Agenda una llamada", en: "Book a call" },
      href: { es: "/agendar", en: "/en/book-a-call" },
    },
    {
      texto: { es: "Ver mi trabajo", en: "See my work" },
      href: { es: "/#trabajo", en: "/en#trabajo" },
    },
  ],
  precio: {
    texto: { es: "Página web desde", en: "Websites from" },
    enlace: {
      texto: {
        es: "$850.000 · lista en 5 días",
        en: "$850,000 COP · live in 5 days",
      },
      href: { es: "/agendar", en: "/en/book-a-call" },
    },
  },
  credencial: {
    sello: { es: "Verificado por Meta", en: "Verified by Meta" },
    titulo: { es: "Proveedor de tecnología", en: "Technology provider" },
    cuerpo: {
      es: "Conecto tu WhatsApp Business y construyo las automatizaciones encima. La cuenta queda a tu nombre —no al mío.",
      en: "I connect your WhatsApp Business and build the automations on top. The account stays in your name —not mine.",
    },
    fecha: { es: "Verificado · jul 2026", en: "Verified · Jul 2026" },
  },
};
