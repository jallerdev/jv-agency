import type { Traducido } from "@/content/types";

/**
 * EL ARMAZÓN DEL BLOG
 * ──────────────────────────────────────────────────────────────────────────
 * Lo que rodea a los artículos —el titular del índice, la vuelta atrás, el
 * bloque de cierre—. El contenido de cada artículo vive en su componente y
 * los metadatos en `lib/blog.ts`.
 *
 * El cierre NO repite el precio a mano: lo pide con `{piso}` y quien lo pinta
 * lo sustituye con `PISOS.landing`. Estaba escrito «$850.000» dentro del JSX
 * y era la única cifra del sitio que no salía de `lib/quote.ts`.
 */
export const BLOG = {
  rotulo: { es: "Blog", en: "Blog" },
  titulo: {
    es: "Lo que deberías saber antes de pagar por una web",
    en: "What you should know before paying for a website",
  },
  entradilla: {
    es: "Precios reales, plazos honestos y criterios para decidir. Escrito para dueños de negocio, no para desarrolladores.",
    en: "Real prices, honest timelines and criteria for deciding. Written for business owners, not for developers.",
  },
  leer: { es: "Leer", en: "Read" },
  minutos: { es: "min", en: "min" },
  volver: { es: "Volver al blog", en: "Back to the blog" },
  lectura: { es: "min de lectura", en: "min read" },

  cierre: {
    titulo: {
      es: "¿Necesitas una web para tu negocio?",
      en: "Do you need a website for your business?",
    },
    cuerpo: {
      es: "Diseño y programo sitios para PYMEs de LATAM. Una página web arranca en {piso} y queda lista en 5 días; los demás precios están publicados.",
      en: "I design and code sites for small businesses across LATAM. A website starts at {piso} and is live in 5 days; the rest of the prices are published.",
    },
    precios: { es: "Ver precios", en: "See pricing" },
    hablar: { es: "Hablar conmigo", en: "Talk to me" },
  },
} as const satisfies Record<string, unknown>;

/** Los metadatos del índice, que no se leen en pantalla pero sí en Google. */
export const BLOG_META = {
  title: {
    es: "Blog — Guías sobre páginas web para negocios | JV Agencia",
    en: "Blog — Guides on websites for businesses | JV Agencia",
  },
  description: {
    es: "Precios reales, plazos y criterios para decidir sobre la página web de tu negocio, el chatbot de WhatsApp y el SEO. Sin tecnicismos y sin vender humo.",
    en: "Real prices, timelines and criteria for deciding on your business website, WhatsApp chatbot and SEO. No jargon and no hot air.",
  },
  ogDescription: {
    es: "Precios reales, plazos y criterios para decidir sobre la web de tu negocio.",
    en: "Real prices, timelines and criteria for deciding on your business website.",
  },
  nombre: {
    es: "Blog de JV Agencia",
    en: "JV Agencia blog",
  },
} as const satisfies Record<string, Traducido<string>>;
