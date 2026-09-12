import { SEO } from "@/content/paginas/seo";
import { tarjetaOg } from "@/lib/og";

/**
 * La tarjeta social del servicio. El chip trae el «desde» de `auditoria` del catálogo.
 *
 * Next la sirve en `/servicios/posicionamiento-seo/opengraph-image` y la declara sola en el `<head>`:
 * la página no tiene que declarar ninguna imagen.
 */
const tarjeta = tarjetaOg({
  eyebrow: SEO.badge.es,
  titulo: `${SEO.titulo.es} ${SEO.tituloAcento.es}`,
  precio: "auditoria",
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
