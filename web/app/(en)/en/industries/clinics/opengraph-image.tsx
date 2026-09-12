import { CLINICAS } from "@/content/paginas/clinicas";
import { tarjetaOg } from "@/lib/og";

/**
 * The industry page's social card.
 *
 * Next la sirve en `/en/industries/clinics/opengraph-image` y la declara sola en el `<head>`:
 * la página no tiene que declarar ninguna imagen.
 */
const tarjeta = tarjetaOg({
  eyebrow: CLINICAS.badge.en,
  titulo: `${CLINICAS.titulo.en} ${CLINICAS.tituloAcento.en}`,
  precio: "landing",
  idioma: "en",
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
