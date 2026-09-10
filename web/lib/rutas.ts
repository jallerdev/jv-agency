import { IDIOMA_POR_DEFECTO, type Idioma } from "@/content/types";

/**
 * EL MAPA DE RUTAS ENTRE LOS DOS IDIOMAS
 * ──────────────────────────────────────────────────────────────────────────
 * Español en la raíz, inglés bajo `/en/`. Ni una URL de las que ya tienen
 * posicionamiento se mueve: un `/es/` simétrico habría sido más limpio de
 * mirar y habría puesto en juego las impresiones que el sitio ya tiene, para
 * no ganar nada.
 *
 * Los slugs en inglés están TRADUCIDOS, no prefijados. `/en/servicios/...`
 * no posiciona en inglés; `/en/services/web-design` sí.
 *
 * LAS TRES DE CIUDAD NO ESTÁN AQUÍ, y es a propósito: «diseño de páginas web
 * en Cartagena» es SEO local y no tiene búsqueda equivalente en inglés.
 * Declaran `hreflang` solo `es-CO` y no participan del cambio de idioma.
 */
export const RUTAS: Readonly<Record<string, string>> = {
  "/": "/en",
  "/precios": "/en/pricing",
  "/sobre-nosotros": "/en/about",
  "/contacto": "/en/contact",
  "/servicios/chatbot-whatsapp": "/en/services/whatsapp-chatbot",
};

/**
 * Lo que todavía NO está traducido, con el slug que le toca cuando lo esté.
 *
 * Vive aquí y no en `RUTAS` a propósito: si estuviera arriba, el conmutador de
 * idioma de la cabecera pintaría un enlace a una página que devuelve 404 y el
 * `sitemap` le ofrecería a Google URLs que no existen. Traducir una página es
 * moverla de esta lista a la de arriba, y todo lo demás —`hreflang`, sitemap,
 * conmutador— se entera solo.
 */
export const PENDIENTES: Readonly<Record<string, string>> = {
  "/servicios/diseno-de-paginas-web": "/en/services/web-design",
  "/servicios/tiendas-virtuales": "/en/services/online-stores",
  "/servicios/posicionamiento-seo": "/en/services/seo",
  "/servicios/software-a-la-medida": "/en/services/custom-software",
  "/sectores/salones-y-spas": "/en/industries/salons-and-spas",
  "/sectores/clinicas-y-consultorios": "/en/industries/clinics",
  "/blog": "/en/blog",
};

/** El mismo mapa al revés, construido una vez. */
const INVERSO: Readonly<Record<string, string>> = Object.fromEntries(
  Object.entries(RUTAS).map(([es, en]) => [en, es])
);

/** Las rutas sin traducción: existen solo en español. */
export const SOLO_ESPANOL = [
  "/diseno-de-paginas-web-en-cartagena",
  "/diseno-de-paginas-web-en-barranquilla",
  "/diseno-de-paginas-web-en-bogota",
  "/privacidad",
  "/terminos",
  "/cookies",
] as const;

/** El idioma que le corresponde a una ruta, por su prefijo. */
export function idiomaDeRuta(ruta: string): Idioma {
  return ruta === "/en" || ruta.startsWith("/en/") ? "en" : IDIOMA_POR_DEFECTO;
}

/**
 * La misma página en el otro idioma, o `null` si no existe.
 *
 * Devolver `null` en vez de la portada es deliberado: mandar a alguien de
 * «/diseño de páginas web en Cartagena» a la home en inglés es un salto que
 * no pidió. Sin equivalente, el conmutador no se pinta.
 */
export function rutaEnOtroIdioma(ruta: string): string | null {
  /* El ancla y la query no viajan: son de la página, no de la ruta. */
  const limpia = ruta.split("#")[0].split("?")[0].replace(/\/+$/, "") || "/";

  if (idiomaDeRuta(limpia) === "en") {
    return INVERSO[limpia] ?? null;
  }

  return RUTAS[limpia] ?? null;
}

/** Las dos versiones de una ruta, para `hreflang` y para el sitemap. */
export function paresDeIdioma(ruta: string): Record<Idioma, string> | null {
  const otra = rutaEnOtroIdioma(ruta);
  if (!otra) return null;
  return idiomaDeRuta(ruta) === "en" ? { es: otra, en: ruta } : { es: ruta, en: otra };
}

/** El mapa inverso de lo pendiente: del slug inglés a la página en español. */
const PENDIENTE_INVERSO: Readonly<Record<string, string>> = Object.fromEntries(
  Object.entries(PENDIENTES).map(([es, en]) => [en, es])
);

/**
 * La URL a la que enlazar DE VERDAD.
 *
 * La navegación se escribe con los slugs definitivos en las dos lenguas, que
 * es como debe quedar. Mientras una traducción no exista, enlazar su slug
 * sería mandar a un 404, así que esta función devuelve la página en español
 * en su lugar: mejor la información en el otro idioma que ninguna.
 *
 * No hace falta acordarse de nada al traducir una página: en cuanto su par
 * pasa de `PENDIENTES` a `RUTAS`, esta función deja de desviarla y el menú
 * apunta solo a la versión en inglés.
 */
export function enlaceReal(href: string): string {
  const [ruta, ancla = ""] = href.split(/(?=#)/);
  const limpia = ruta.replace(/\/+$/, "") || "/";
  const desvio = PENDIENTE_INVERSO[limpia];
  return desvio ? desvio + ancla : href;
}
