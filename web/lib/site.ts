// Fuente única de verdad para la URL pública del sitio.
// En producción, define NEXT_PUBLIC_SITE_URL en Vercel (ej. https://jvagency.com).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://jvagency.com";

export const SITE_NAME = "J&V Agency";
