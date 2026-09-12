import { SEO } from "@/content/paginas/seo";
import { tarjetaOg } from "@/lib/og";

/**
 * The service's social card. The chip carries the catalogue's «auditoria» floor price.
 *
 * Next la sirve en `/en/services/seo/opengraph-image` y la declara sola en el `<head>`:
 * la página no tiene que declarar ninguna imagen.
 */
const tarjeta = tarjetaOg({
  eyebrow: SEO.badge.en,
  titulo: `${SEO.titulo.en} ${SEO.tituloAcento.en}`,
  precio: "auditoria",
  idioma: "en",
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
