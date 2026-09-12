import { TIENDAS } from "@/content/paginas/tiendas";
import { tarjetaOg } from "@/lib/og";

/**
 * La tarjeta social del servicio. El chip trae el «desde» de `tienda` del catálogo.
 *
 * Next la sirve en `/servicios/tiendas-virtuales/opengraph-image` y la declara sola en el `<head>`:
 * la página no tiene que declarar ninguna imagen.
 */
const tarjeta = tarjetaOg({
  eyebrow: TIENDAS.badge.es,
  titulo: `${TIENDAS.titulo.es} ${TIENDAS.tituloAcento.es}`,
  precio: "tienda",
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
