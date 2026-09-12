import { BLOG } from "@/content/paginas/blog";
import { tarjetaOg } from "@/lib/og";

/**
 * The blog index card.
 *
 * Next la sirve en `/en/blog/opengraph-image` y la declara sola en el `<head>`:
 * la página no tiene que declarar ninguna imagen.
 */
const tarjeta = tarjetaOg({
  eyebrow: BLOG.rotulo.en,
  titulo: BLOG.titulo.en,
  idioma: "en",
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
