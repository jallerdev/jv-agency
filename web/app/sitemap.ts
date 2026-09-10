import type { MetadataRoute } from "next";

import { POSTS } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";
import { RUTAS } from "@/lib/rutas";

// Páginas de ciudad: intención de DECISIÓN ("diseño de páginas web en X").
// Son las que traen a alguien que ya quiere contratar, así que pesan igual
// que la página de servicio y por encima de cualquier artículo.
const CIUDADES = [
  "diseno-de-paginas-web-en-cartagena",
  "diseno-de-paginas-web-en-barranquilla",
  "diseno-de-paginas-web-en-bogota",
] as const;

// Páginas de servicio: intención de DECISIÓN también ("chatbot de WhatsApp
// Colombia", "crear tienda virtual Colombia"). Pesan igual que las de ciudad,
// que es lo que ya tenía el chatbot cuando era la única que existía.
const SERVICIOS = [
  "servicios/diseno-de-paginas-web",
  "servicios/chatbot-whatsapp",
  "servicios/tiendas-virtuales",
  "servicios/posicionamiento-seo",
  "servicios/software-a-la-medida",
] as const;

// Páginas de sector: comerciales también, pero la consulta es más estrecha
// que la de ciudad. Quedan justo debajo.
const SECTORES = ["sectores/salones-y-spas", "sectores/clinicas-y-consultorios"] as const;

/**
 * Las alternativas de idioma de una URL, si están construidas.
 *
 * Sale de `lib/rutas.ts`, que es el único sitio donde se declara qué páginas
 * existen en inglés. Así el sitemap no puede prometerle a Google una versión
 * traducida que todavía no está: traducir una página es mover una línea allá.
 */
function idiomas(ruta: string) {
  const en = RUTAS[ruta];
  if (!en) return undefined;
  return { languages: { "es-CO": `${SITE_URL}${ruta}`, en: `${SITE_URL}${en}` } };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1, alternates: idiomas("/") },
    /* La portada en inglés entra como URL propia: `alternates` le dice a
       Google que son la misma página en dos lenguas, pero cada una tiene que
       estar listada para que la rastree. */
    { url: `${SITE_URL}/en`, changeFrequency: "monthly", priority: 0.9 },
    ...CIUDADES.map((ruta) => ({
      url: `${SITE_URL}/${ruta}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...SERVICIOS.map((ruta) => ({
      url: `${SITE_URL}/${ruta}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    // Precios es pagina comercial, no articulo: la busca quien ya quiere
    // contratar y la enlazan el Header, el Hero, el pie y cada articulo.
    { url: `${SITE_URL}/precios`, changeFrequency: "monthly", priority: 0.9 },
    ...SECTORES.map((ruta) => ({
      url: `${SITE_URL}/${ruta}`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.9 },
    // Los posts salen del manifest de lib/blog.ts: al agregar uno allí entra
    // solo acá, sin tener que acordarse de tocar este archivo.
    ...POSTS.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt ?? p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/sobre-nosotros`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/privacidad`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terminos`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/cookies`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/eliminacion-de-datos`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
