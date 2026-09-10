import type { Idioma } from "@/content/types";

/**
 * LOS SLUGS DEL BLOG, Y NADA MÁS
 * ──────────────────────────────────────────────────────────────────────────
 * Este archivo existe por el peso, no por la organización.
 *
 * El conmutador de idioma vive en `components/sections/Header.tsx`, que es
 * `"use client"`, y para emparejar un artículo con su traducción llamaba a
 * `slugEmparejado`, que estaba en `lib/blog.ts`. Importar una función de ahí
 * arrastra el módulo entero, y el módulo entero es el manifiesto: siete
 * artículos × dos idiomas de título, descripción, extracto y lista de
 * palabras clave. Medido en el build: esa prosa acababa en catorce chunks del
 * navegador, en TODAS las rutas del sitio, solo para poder cambiar de idioma
 * en las siete del blog.
 *
 * Aquí solo hay catorce cadenas cortas. `lib/blog.ts` las lee de aquí, así que
 * el par sigue declarándose una sola vez y no hay dos listas que sincronizar.
 */
export const SLUGS = {
  cuestaWeb: {
    es: "cuanto-cuesta-una-pagina-web-en-colombia",
    en: "how-much-does-a-website-cost-in-colombia",
  },
  cuestaChatbot: {
    es: "cuanto-cuesta-un-chatbot-de-whatsapp-en-colombia",
    en: "how-much-does-a-whatsapp-chatbot-cost-in-colombia",
  },
  cuestaSeo: {
    es: "cuanto-cuesta-el-seo-en-colombia",
    en: "how-much-does-seo-cost-in-colombia",
  },
  necesitaWeb: {
    es: "mi-negocio-necesita-pagina-web",
    en: "does-my-business-need-a-website",
  },
  webOInstagram: {
    es: "pagina-web-o-solo-instagram",
    en: "website-or-just-instagram",
  },
  restaurante: {
    es: "que-debe-tener-la-pagina-web-de-un-restaurante",
    en: "what-a-restaurant-website-needs",
  },
  cuantoDemora: {
    es: "cuanto-se-demora-hacer-una-pagina-web",
    en: "how-long-does-it-take-to-build-a-website",
  },
} as const satisfies Record<string, Record<Idioma, string>>;

/**
 * El slug del mismo artículo en el otro idioma, o `null` si no es un artículo.
 *
 * Lo usa `lib/rutas.ts` para el conmutador: el mapa estático de rutas no puede
 * listar los posts uno a uno sin quedarse desfasado la próxima vez que se
 * escriba uno.
 */
export function slugEmparejado(slug: string, de: Idioma): string | null {
  const otro: Idioma = de === "es" ? "en" : "es";
  for (const par of Object.values(SLUGS)) {
    if (par[de] === slug) return par[otro];
  }
  return null;
}
