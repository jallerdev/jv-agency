import { SOFTWARE } from "@/content/paginas/software";
import { tarjetaOg } from "@/lib/og";

/**
 * La tarjeta social del servicio. El chip trae el «desde» de `software` del catálogo.
 *
 * Next la sirve en `/servicios/software-a-la-medida/opengraph-image` y la declara sola en el `<head>`:
 * la página no tiene que declarar ninguna imagen.
 */
const tarjeta = tarjetaOg({
  eyebrow: SOFTWARE.badge.es,
  titulo: `${SOFTWARE.titulo.es} ${SOFTWARE.tituloAcento.es}`,
  precio: "software",
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
