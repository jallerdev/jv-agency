import { SOBRE } from "@/content/paginas/sobre";
import { tarjetaOg } from "@/lib/og";

/**
 * La tarjeta del estudio. Sin chip de precio: esta página no vende una línea, explica quién trabaja.
 *
 * Next la sirve en `/sobre-nosotros/opengraph-image` y la declara sola en el `<head>`:
 * la página no tiene que declarar ninguna imagen.
 */
const tarjeta = tarjetaOg({
  eyebrow: SOBRE.badge.es,
  titulo: `${SOBRE.titulo.es} ${SOBRE.tituloAcento.es}`,
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
