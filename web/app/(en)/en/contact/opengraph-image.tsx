import { CONTACTO } from "@/content/paginas/contacto";
import { tarjetaOg } from "@/lib/og";

/**
 * The contact page's card.
 *
 * Next la sirve en `/en/contact/opengraph-image` y la declara sola en el `<head>`:
 * la página no tiene que declarar ninguna imagen.
 */
const tarjeta = tarjetaOg({
  eyebrow: CONTACTO.badge.en,
  titulo: `${CONTACTO.titulo.en} ${CONTACTO.tituloAcento.en}`,
  idioma: "en",
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
