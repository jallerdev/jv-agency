import { CLINICAS } from "@/content/paginas/clinicas";
import { tarjetaOg } from "@/lib/og";

/**
 * La tarjeta social del sector.
 *
 * Next la sirve en `/sectores/clinicas-y-consultorios/opengraph-image` y la declara sola en el `<head>`:
 * la página no tiene que declarar ninguna imagen.
 */
const tarjeta = tarjetaOg({
  eyebrow: CLINICAS.badge.es,
  titulo: `${CLINICAS.titulo.es} ${CLINICAS.tituloAcento.es}`,
  precio: "landing",
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
