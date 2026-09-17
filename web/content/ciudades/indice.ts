import type { Texto, Traducido } from "@/content/types";

/**
 * LAS SIETE CIUDADES, EN UN SOLO SITIO.
 *
 * POR QUÉ EXISTE ESTE ARCHIVO
 * ---------------------------
 * La lista estaba escrita cinco veces: el pie, el sitemap, los chips de
 * «también trabajo en» y los bloques de ciudad de `/precios`,
 * `/servicios/diseno-de-paginas-web` y `/servicios/posicionamiento-seo`.
 *
 * Cuando en septiembre de 2026 se publicaron Medellín, Cali, Bucaramanga y
 * Santa Marta, **tres de esas listas se quedaron en las tres viejas**. El
 * resultado, medido en Search Console: las tres antiguas recibían diez u once
 * fuentes de enlace interno y las cuatro nuevas cuatro, y las nuevas estaban en
 * la posición 77 mientras Cartagena estaba en la 41.
 *
 * Parchear las tres listas habría durado hasta la octava ciudad. Con esto, el
 * número de enlaces es igual al número de ciudades por construcción.
 *
 * LO QUE NO ENTRA AQUÍ
 * --------------------
 * Solo datos de enlace: nombre y ruta. El contenido de cada página vive en su
 * propio archivo (`medellin.ts`, `cali.ts`…) o, en las tres escritas a mano,
 * dentro de su `page.tsx`. Y **este archivo no importa ninguno de ellos**: los
 * de contenido traen iconos de `lucide-react`, y esta lista la lee también el
 * sitemap, donde ese peso no pinta nada.
 *
 * Las siete existen SOLO en español: «diseño de páginas web en Cartagena» es
 * SEO local y no tiene búsqueda equivalente en inglés. Por eso `href` es la
 * misma ruta en las dos lenguas.
 */
export type CiudadEnlace = {
  /** Como se escribe, con tilde: «Medellín», «Bogotá». */
  nombre: string;
  /** La ruta, con barra inicial. */
  ruta: string;
};

/* El orden importa y no es alfabético: es el de cercanía y antigüedad. Las
   tres primeras son las que llevan más tiempo publicadas y las que tienen
   contenido escrito a mano. */
export const CIUDADES: readonly CiudadEnlace[] = [
  { nombre: "Cartagena", ruta: "/diseno-de-paginas-web-en-cartagena" },
  { nombre: "Barranquilla", ruta: "/diseno-de-paginas-web-en-barranquilla" },
  { nombre: "Bogotá", ruta: "/diseno-de-paginas-web-en-bogota" },
  { nombre: "Medellín", ruta: "/diseno-de-paginas-web-en-medellin" },
  { nombre: "Cali", ruta: "/diseno-de-paginas-web-en-cali" },
  { nombre: "Bucaramanga", ruta: "/diseno-de-paginas-web-en-bucaramanga" },
  { nombre: "Santa Marta", ruta: "/diseno-de-paginas-web-en-santa-marta" },
];

/** Las rutas sin la barra inicial, que es como las pide el sitemap. */
export const RUTAS_CIUDAD: readonly string[] = CIUDADES.map((c) => c.ruta.slice(1));

/**
 * El rótulo de cada enlace. Dos estilos, porque dos sitios los piden distintos:
 * en una lista que ya se titula «ciudades» basta el nombre; suelto entre
 * enlaces de servicio hace falta decir de qué es la página.
 */
function rotulo(nombre: string, estilo: "nombre" | "paginas"): Texto {
  return estilo === "nombre"
    ? { es: nombre, en: nombre }
    : { es: `Páginas web en ${nombre}`, en: `Websites in ${nombre}` };
}

/** Para los consumidores que quieren `href` por idioma (pie, `/precios`). */
export function enlacesCiudad(
  estilo: "nombre" | "paginas" = "nombre",
): readonly { texto: Texto; href: Traducido<string> }[] {
  return CIUDADES.map((c) => ({
    texto: rotulo(c.nombre, estilo),
    href: { es: c.ruta, en: c.ruta },
  }));
}

/** Para los que quieren una sola ruta (las páginas de servicio). */
export function enlacesCiudadPlanos(
  estilo: "nombre" | "paginas" = "nombre",
): readonly { texto: Texto; href: string }[] {
  return CIUDADES.map((c) => ({ texto: rotulo(c.nombre, estilo), href: c.ruta }));
}
