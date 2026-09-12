import { SOBRE } from "@/content/paginas/sobre";
import { tarjetaOg } from "@/lib/og";

/**
 * The studio's card. No price chip: this page doesn't sell a line, it says who does the work.
 *
 * Next la sirve en `/en/about/opengraph-image` y la declara sola en el `<head>`:
 * la página no tiene que declarar ninguna imagen.
 */
const tarjeta = tarjetaOg({
  eyebrow: SOBRE.badge.en,
  titulo: `${SOBRE.titulo.en} ${SOBRE.tituloAcento.en}`,
  idioma: "en",
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
