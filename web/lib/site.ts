// Fuente única de verdad para la URL pública del sitio.
// Dominio canónico CON www. El apex (jvagencia.com) redirige a www vía middleware.ts.
// Puedes sobreescribirlo con NEXT_PUBLIC_SITE_URL en el entorno de despliegue.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.jvagencia.com";

export const SITE_NAME = "JV Agencia";
