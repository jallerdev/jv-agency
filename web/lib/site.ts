// Fuente única de verdad para la URL pública del sitio.
// Dominio canónico CON www. El apex (jvagencia.com) redirige a www vía middleware.ts.
// Puedes sobreescribirlo con NEXT_PUBLIC_SITE_URL en el entorno de despliegue.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.jvagencia.com";

export const SITE_NAME = "JV Agencia";

/**
 * Identificador de medición de Google Analytics 4.
 *
 * Es público por naturaleza —viaja en el HTML de cada página—, así que no es un
 * secreto y no va en variables de entorno. Se puede sobreescribir por si algún
 * día hay una propiedad distinta para pruebas.
 */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID || "G-H6R8GNP9S8";
