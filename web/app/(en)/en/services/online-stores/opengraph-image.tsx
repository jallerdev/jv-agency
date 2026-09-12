import { TIENDAS } from "@/content/paginas/tiendas";
import { tarjetaOg } from "@/lib/og";

/**
 * The service's social card. The chip carries the catalogue's «tienda» floor price.
 *
 * Next la sirve en `/en/services/online-stores/opengraph-image` y la declara sola en el `<head>`:
 * la página no tiene que declarar ninguna imagen.
 */
const tarjeta = tarjetaOg({
  eyebrow: TIENDAS.badge.en,
  titulo: `${TIENDAS.titulo.en} ${TIENDAS.tituloAcento.en}`,
  precio: "tienda",
  idioma: "en",
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
