import { CONTACTO } from "@/content/paginas/contacto";
import { tarjetaOg } from "@/lib/og";

/**
 * La tarjeta de contacto.
 *
 * Next la sirve en `/contacto/opengraph-image` y la declara sola en el `<head>`:
 * la página no tiene que declarar ninguna imagen.
 */
const tarjeta = tarjetaOg({
  eyebrow: CONTACTO.badge.es,
  titulo: `${CONTACTO.titulo.es} ${CONTACTO.tituloAcento.es}`,
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
