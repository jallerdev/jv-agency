import { AGENDAR } from "@/content/paginas/agendar";
import { tarjetaOg } from "@/lib/og";

/**
 * La tarjeta de la agenda.
 *
 * Next la sirve en `/agendar/opengraph-image` y la declara sola en el `<head>`:
 * la página no tiene que declarar ninguna imagen.
 */
const tarjeta = tarjetaOg({
  eyebrow: AGENDAR.badge.es,
  titulo: `${AGENDAR.titulo.es} ${AGENDAR.tituloAcento.es}`,
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
