import { WEB } from "@/content/paginas/web";
import { tarjetaOg } from "@/lib/og";

/**
 * La tarjeta social del servicio. El chip trae el «desde» de `landing` del catálogo.
 *
 * Next la sirve en `/servicios/diseno-de-paginas-web/opengraph-image` y la declara sola en el `<head>`:
 * la página no tiene que declarar ninguna imagen.
 */
const tarjeta = tarjetaOg({
  eyebrow: WEB.badge.es,
  titulo: `${WEB.titulo.es} ${WEB.tituloAcento.es}`,
  precio: "landing",
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
