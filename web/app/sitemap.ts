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
  "diseno-de-paginas-web-en-medellin",
  "diseno-de-paginas-web-en-cali",
  "diseno-de-paginas-web-en-bucaramanga",
  "diseno-de-paginas-web-en-santa-marta",
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
  return { languages: pareja(ruta, en) };
}

/**
 * El mismo bloque de `languages` para las DOS URL del par, más `x-default`.
 *
 * Antes solo lo declaraba la castellana y la inglesa entraba pelada: Google
 * descarta un `hreflang` que no es recíproco, así que las anotaciones no
 * hacían nada. El bloque de los posts sí lo hacía bien —las dos entradas
 * comparten el mismo objeto— y es la forma que se generaliza aquí.
 *
 * `x-default` va también, porque los `metadata` de cada página lo declaran y
 * dos fuentes de `hreflang` que no dicen lo mismo son peor que una sola.
 */
function pareja(ruta: string, en: string) {
  /* La portada se lista como `<loc>https://www.jvagencia.com</loc>`, sin barra
     final, pero `SITE_URL + "/"` la añade: el `hreflang` apuntaba a una URL
     que no era, letra por letra, la que declara el sitemap, y una anotación
     que no coincide con su `<loc>` no es recíproca para Google. */
  const url = (r: string) => `${SITE_URL}${r === "/" ? "" : r}`;
  return {
    "es-CO": url(ruta),
    en: url(en),
    "x-default": url(ruta),
  };
}

/** La entrada de la URL inglesa, con el mismo par que su castellana. */
function enConPar(rutaEs: string, prioridad: number) {
  const en = RUTAS[rutaEs];
  if (!en) return [];
  return [
    {
      url: `${SITE_URL}${en}`,
      changeFrequency: "monthly" as const,
      priority: prioridad,
      alternates: { languages: pareja(rutaEs, en) },
    },
  ];
}

/** El inverso de `RUTAS`, para ir del slug inglés al castellano. */
const ES_DE: Readonly<Record<string, string>> = Object.fromEntries(
  Object.entries(RUTAS).map(([es, en]) => [en, es])
);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1, alternates: idiomas("/") },
    /* La portada en inglés entra como URL propia: `alternates` le dice a
       Google que son la misma página en dos lenguas, pero cada una tiene que
       estar listada para que la rastree. */
    ...enConPar("/", 0.9),
    ...CIUDADES.map((ruta) => ({
      url: `${SITE_URL}/${ruta}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...SERVICIOS.map((ruta) => ({
      url: `${SITE_URL}/${ruta}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
      alternates: idiomas(`/${ruta}`),
    })),
    /* Las traducidas entran como URL propia: `alternates` dice que son la
       misma página en dos lenguas, pero cada una tiene que estar listada para
       que Google la rastree. Salen de `RUTAS`, así que aparecen solas en
       cuanto una traducción existe. */
    ...Object.values(RUTAS)
      .filter((en) => en.startsWith("/en/services/"))
      .map((en) => ({
        url: `${SITE_URL}${en}`,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: { languages: pareja(ES_DE[en], en) },
      })),
    // Precios es pagina comercial, no articulo: la busca quien ya quiere
    // contratar y la enlazan el Header, el Hero, el pie y cada articulo.
    {
      url: `${SITE_URL}/precios`,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: idiomas("/precios"),
    },
    ...enConPar("/precios", 0.8),
    ...SECTORES.map((ruta) => ({
      url: `${SITE_URL}/${ruta}`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
      alternates: idiomas(`/${ruta}`),
    })),
    ...Object.values(RUTAS)
      .filter((en) => en.startsWith("/en/industries/"))
      .map((en) => ({
        url: `${SITE_URL}${en}`,
        changeFrequency: "monthly" as const,
        priority: 0.75,
        alternates: { languages: pareja(ES_DE[en], en) },
      })),
    {
      url: `${SITE_URL}/blog`,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: idiomas("/blog"),
    },
    ...enConPar("/blog", 0.8),
    // Los posts salen del manifest de lib/blog.ts: al agregar uno allí entra
    // solo acá, sin tener que acordarse de tocar este archivo.
    //
    // Los pares del blog NO pueden salir de `idiomas()`, que lee el mapa
    // estático de rutas: los slugs de los artículos viven en el manifiesto y
    // se declaran ahí. Se arman a mano con los dos slugs del propio post.
    ...POSTS.flatMap((p) => {
      const lastModified = new Date(p.updatedAt ?? p.publishedAt);
      const languages = {
        "es-CO": `${SITE_URL}/blog/${p.slug.es}`,
        en: `${SITE_URL}/en/blog/${p.slug.en}`,
        "x-default": `${SITE_URL}/blog/${p.slug.es}`,
      };
      return [
        {
          url: `${SITE_URL}/blog/${p.slug.es}`,
          lastModified,
          changeFrequency: "monthly" as const,
          priority: 0.8,
          alternates: { languages },
        },
        {
          url: `${SITE_URL}/en/blog/${p.slug.en}`,
          lastModified,
          changeFrequency: "monthly" as const,
          priority: 0.7,
          alternates: { languages },
        },
      ];
    }),
    {
      url: `${SITE_URL}/sobre-nosotros`,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: idiomas("/sobre-nosotros"),
    },
    ...enConPar("/sobre-nosotros", 0.6),
    {
      url: `${SITE_URL}/contacto`,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: idiomas("/contacto"),
    },
    ...enConPar("/contacto", 0.7),
    {
      url: `${SITE_URL}/agendar`,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: idiomas("/agendar"),
    },
    ...enConPar("/agendar", 0.7),
    { url: `${SITE_URL}/privacidad`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terminos`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/cookies`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/eliminacion-de-datos`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
