import { HERO } from "@/content/home/hero";
import { tarjetaOg } from "@/lib/og";

/**
 * The home page's social card. It replaces the static `og.png`, which said the same thing on all forty routes.
 *
 * Next la sirve en `/en/opengraph-image` y la declara sola en el `<head>`:
 * la página no tiene que declarar ninguna imagen.
 */
const tarjeta = tarjetaOg({
  /* `eyebrow` es opcional en el tipo `Encabezado` —hay encabezados sin
     rótulo—, así que la portada declara el suyo de reserva en vez de
     afirmar que existe. */
  eyebrow: HERO.eyebrow?.en ?? "JV Agencia",
  titulo: HERO.titulo.en,
  precio: "landing",
  idioma: "en",
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
