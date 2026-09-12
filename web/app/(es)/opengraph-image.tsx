import { HERO } from "@/content/home/hero";
import { tarjetaOg } from "@/lib/og";

/**
 * La tarjeta social de la portada. Sustituye al `og.png` estático, que decía lo mismo en las cuarenta rutas.
 *
 * Next la sirve en `//opengraph-image` y la declara sola en el `<head>`:
 * la página no tiene que declarar ninguna imagen.
 */
const tarjeta = tarjetaOg({
  /* `eyebrow` es opcional en el tipo `Encabezado` —hay encabezados sin
     rótulo—, así que la portada declara el suyo de reserva en vez de
     afirmar que existe. */
  eyebrow: HERO.eyebrow?.es ?? "JV Agencia",
  titulo: HERO.titulo.es,
  precio: "landing",
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
