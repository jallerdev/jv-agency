import { SOFTWARE } from "@/content/paginas/software";
import { tarjetaOg } from "@/lib/og";

/**
 * The service's social card. The chip carries the catalogue's «software» floor price.
 *
 * Next la sirve en `/en/services/custom-software/opengraph-image` y la declara sola en el `<head>`:
 * la página no tiene que declarar ninguna imagen.
 */
const tarjeta = tarjetaOg({
  eyebrow: SOFTWARE.badge.en,
  titulo: `${SOFTWARE.titulo.en} ${SOFTWARE.tituloAcento.en}`,
  precio: "software",
  idioma: "en",
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
