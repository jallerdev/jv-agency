import { IDIOMA_POR_DEFECTO, type Idioma } from "@/content/types";
import { slugEmparejado } from "@/lib/blog-slugs";

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
  "/agendar": "/en/book-a-call",
  "/servicios/chatbot-whatsapp": "/en/services/whatsapp-chatbot",
  "/servicios/diseno-de-paginas-web": "/en/services/web-design",
  "/servicios/tiendas-virtuales": "/en/services/online-stores",
  "/servicios/software-a-la-medida": "/en/services/custom-software",
  "/sectores/salones-y-spas": "/en/industries/salons-and-spas",
  "/sectores/clinicas-y-consultorios": "/en/industries/clinics",
  "/servicios/posicionamiento-seo": "/en/services/seo",
  "/blog": "/en/blog",
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
  /* Vacío: ya no queda ninguna página en castellano sin su equivalente en
     inglés. Se deja el mapa, y `enlaceReal` con él, porque la siguiente
     página que se escriba va a nacer en un idioma antes que en el otro y es
     el único sitio donde eso se declara sin romper nada. */
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
  "/diseno-de-paginas-web-en-medellin",
  "/diseno-de-paginas-web-en-cali",
  "/diseno-de-paginas-web-en-bucaramanga",
  "/diseno-de-paginas-web-en-santa-marta",
  "/privacidad",
  "/terminos",
  "/cookies",
] as const;

/**
 * La cabecera con la que `proxy.ts` le cuenta a la app en qué ruta iba la
 * petición. La lee `app/global-not-found.tsx`, que es la única página del sitio
 * que no puede saberlo de otra manera: el convenio de Next no le pasa props.
 */
export const CABECERA_RUTA = "x-jv-ruta";

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

  /* Los artículos del blog no están en el mapa y no pueden estarlo: se añaden
     escribiendo un post, no editando este archivo, y listarlos aquí uno a uno
     sería una lista que se queda vieja el día que se publique el siguiente.
     El par sale del propio manifiesto. */
  const post = paraBlog(limpia);
  if (post) return post;

  if (idiomaDeRuta(limpia) === "en") {
    return INVERSO[limpia] ?? null;
  }

  return RUTAS[limpia] ?? null;
}

/**
 * A DÓNDE LLEVA EL CONMUTADOR DE IDIOMA, SIEMPRE.
 *
 * `rutaEnOtroIdioma` devuelve `null` en las diez rutas que existen solo en
 * castellano —las siete de ciudad y las tres legales—, y con eso la cabecera
 * dejaba de pintar el conmutador. Visto desde el código es prudente; visto
 * desde la pantalla, quien llega a «diseño de páginas web en Cali» desde un
 * buscador en inglés ve un sitio que en todas las demás páginas ofrece inglés
 * y en esta no, sin decir por qué. Eso no es prudencia, es una función que
 * desaparece.
 *
 * Así que el conmutador se pinta siempre. Cuando no hay equivalente lleva a la
 * portada del otro idioma y LO DICE —en el `title` y en el nombre accesible—,
 * que es la diferencia entre un puente y un enlace roto.
 *
 * `exacto: false` también sirve para lo otro que hay que hacer distinto: ese
 * enlace NO lleva `hrefLang`. Declarar `hrefLang="en"` sobre la portada
 * inglesa desde la página de Cali le estaría diciendo al buscador que una es
 * la traducción de la otra, y no lo es. El `hreflang` del documento sigue
 * siendo solo `es-CO`, como debe.
 */
export function puenteDeIdioma(ruta: string): { href: string; exacto: boolean } {
  const otra = rutaEnOtroIdioma(ruta);
  if (otra) return { href: otra, exacto: true };
  return { href: idiomaDeRuta(ruta) === "es" ? "/en" : "/", exacto: false };
}

/** El par de un artículo del blog, o `null` si la ruta no es un artículo. */
function paraBlog(ruta: string): string | null {
  const es = ruta.startsWith("/blog/") ? ruta.slice("/blog/".length) : null;
  const en = ruta.startsWith("/en/blog/") ? ruta.slice("/en/blog/".length) : null;
  if (!es && !en) return null;

  const otro = slugEmparejado((es ?? en) as string, es ? "es" : "en");
  if (!otro) return null;
  return es ? `/en/blog/${otro}` : `/blog/${otro}`;
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
