import { BLOG } from "@/content/paginas/blog";
import { tarjetaOg } from "@/lib/og";

/**
 * La tarjeta del índice del blog.
 *
 * Next la sirve en `/blog/opengraph-image` y la declara sola en el `<head>`:
 * la página no tiene que declarar ninguna imagen.
 */
const tarjeta = tarjetaOg({
  eyebrow: BLOG.rotulo.es,
  titulo: BLOG.titulo.es,
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
