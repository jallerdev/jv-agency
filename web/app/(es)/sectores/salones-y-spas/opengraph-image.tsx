import { SALONES } from "@/content/paginas/salones";
import { tarjetaOg } from "@/lib/og";

/**
 * La tarjeta social del sector.
 *
 * Next la sirve en `/sectores/salones-y-spas/opengraph-image` y la declara sola en el `<head>`:
 * la página no tiene que declarar ninguna imagen.
 */
const tarjeta = tarjetaOg({
  eyebrow: SALONES.badge.es,
  titulo: `${SALONES.titulo.es} ${SALONES.tituloAcento.es}`,
  precio: "landing",
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
