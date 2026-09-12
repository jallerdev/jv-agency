import { SALONES } from "@/content/paginas/salones";
import { tarjetaOg } from "@/lib/og";

/**
 * The industry page's social card.
 *
 * Next la sirve en `/en/industries/salons-and-spas/opengraph-image` y la declara sola en el `<head>`:
 * la página no tiene que declarar ninguna imagen.
 */
const tarjeta = tarjetaOg({
  eyebrow: SALONES.badge.en,
  titulo: `${SALONES.titulo.en} ${SALONES.tituloAcento.en}`,
  precio: "landing",
  idioma: "en",
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
