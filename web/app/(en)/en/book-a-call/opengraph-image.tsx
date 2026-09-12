import { AGENDAR } from "@/content/paginas/agendar";
import { tarjetaOg } from "@/lib/og";

/**
 * The booking page's card.
 *
 * Next la sirve en `/en/book-a-call/opengraph-image` y la declara sola en el `<head>`:
 * la página no tiene que declarar ninguna imagen.
 */
const tarjeta = tarjetaOg({
  eyebrow: AGENDAR.badge.en,
  titulo: `${AGENDAR.titulo.en} ${AGENDAR.tituloAcento.en}`,
  idioma: "en",
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
