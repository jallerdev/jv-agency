/**
 * CUÁNDO SE REVISÓ POR ÚLTIMA VEZ EL CONTENIDO DE CADA ZONA DEL SITIO
 * ──────────────────────────────────────────────────────────────────────────
 * Alimenta el `lastmod` del sitemap, y existe porque faltaba: de las 59 URL
 * que declara el sitemap, solo las 22 del blog llevaban fecha —los artículos
 * la tienen en su manifiesto—. Las otras 37 —portada, servicios, sectores,
 * ciudades, precios, legales— entraban sin ninguna.
 *
 * POR QUÉ IMPORTA. `lastmod` es la señal con la que Google decide si vuelve a
 * rastrear una URL que YA conoce. Sin ella no tiene motivo para volver, y el
 * síntoma es exactamente el que salió en Search Console: páginas en
 * «Descubierta: actualmente sin indexar». Se acaban de reescribir cuarenta
 * páginas y Google no tenía cómo enterarse.
 *
 * POR QUÉ NO ES `new Date()`. Poner la fecha del build haría que CADA
 * despliegue jurara que las 59 páginas cambiaron, incluso al corregir una
 * coma. Google dice en su documentación que usa `lastmod` mientras sea
 * «consistently accurate» y que lo ignora cuando no lo es: una fecha que
 * miente en cada despliegue es peor que no tener fecha, porque quema la señal
 * para siempre.
 *
 * POR QUÉ TAMPOCO SALE DE GIT EN TIEMPO DE BUILD. Sería lo ideal y no es
 * fiable: Vercel clona en superficial y `git log` puede no tener el historial
 * del archivo. Una señal que a veces existe y a veces no es la misma trampa.
 *
 * ASÍ QUE ES UN MAPA A MANO, con la misma disciplina que `LEGAL_UPDATED`. Las
 * fechas de abajo NO están puestas a ojo: salen de `git log -1 --format=%cs`
 * sobre los archivos que producen cada zona, el día que se creó este archivo.
 *
 * CÓMO SE MANTIENE: cuando cambies el CONTENIDO de una zona —el texto que lee
 * un visitante, no un refactor ni un arreglo de CSS—, sube su fecha. Si no
 * estás seguro de si un cambio cuenta, no la subas: una fecha de más cuesta la
 * credibilidad de todas las demás; una de menos solo cuesta que Google tarde
 * un poco más en volver.
 */

/** `YYYY-MM-DD`, que es lo que pide el estándar de sitemaps. */
export type Fecha = `${number}-${number}-${number}`;

export const REVISADO = {
  /** La portada y sus quince bloques. */
  portada: "2026-09-12",
  /** Las cinco páginas de servicio, en los dos idiomas. */
  servicios: "2026-09-12",
  /** Salones y spas, clínicas y consultorios. */
  sectores: "2026-09-12",
  /** Las siete de ciudad. */
  ciudades: "2026-09-12",
  /** La tabla de precios y el constructor de propuestas. */
  precios: "2026-09-12",
  /** El estudio. */
  sobre: "2026-09-13",
  /** Contacto. */
  contacto: "2026-09-11",
  /** La agenda. */
  agendar: "2026-09-12",
  /** El índice del blog. Los artículos llevan la suya, del manifiesto. */
  blog: "2026-09-12",
  /**
   * Las cuatro legales. Esta NO es la fecha en que se tocó el diseño: es la
   * del texto legal, que es lo único que le importa a quien la lee y lo que
   * dice la propia página en su encabezado. `LEGAL_UPDATED` en
   * `lib/business.ts` la escribe en letra; aquí va en el formato del sitemap.
   */
  legales: "2026-06-05",
} as const satisfies Record<string, Fecha>;

/** La fecha como `Date`, que es lo que espera `MetadataRoute.Sitemap`. */
export const revisado = (zona: keyof typeof REVISADO) => new Date(REVISADO[zona]);
