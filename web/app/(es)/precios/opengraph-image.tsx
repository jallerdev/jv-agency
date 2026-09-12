import { PRECIOS } from "@/content/paginas/precios";
import { tarjetaOg } from "@/lib/og";

/**
 * La tarjeta social de /precios.
 *
 * Next la sirve en `/precios/opengraph-image` y la declara sola en el `<head>`:
 * la página no tiene que declarar ninguna imagen.
 */
const tarjeta = tarjetaOg({
  eyebrow: PRECIOS.badge.es,
  titulo: `${PRECIOS.titulo.es} ${PRECIOS.tituloAcento.es}`,
  precio: "landing",
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
