import { WEB } from "@/content/paginas/web";
import { tarjetaOg } from "@/lib/og";

/**
 * The service's social card. The chip carries the catalogue's «landing» floor price.
 *
 * Next la sirve en `/en/services/web-design/opengraph-image` y la declara sola en el `<head>`:
 * la página no tiene que declarar ninguna imagen.
 */
const tarjeta = tarjetaOg({
  eyebrow: WEB.badge.en,
  titulo: `${WEB.titulo.en} ${WEB.tituloAcento.en}`,
  precio: "landing",
  idioma: "en",
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
