import { PRECIOS } from "@/content/paginas/precios";
import { tarjetaOg } from "@/lib/og";

/**
 * The social card for the pricing page.
 *
 * Next la sirve en `/en/pricing/opengraph-image` y la declara sola en el `<head>`:
 * la página no tiene que declarar ninguna imagen.
 */
const tarjeta = tarjetaOg({
  eyebrow: PRECIOS.badge.en,
  titulo: `${PRECIOS.titulo.en} ${PRECIOS.tituloAcento.en}`,
  precio: "landing",
  idioma: "en",
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
