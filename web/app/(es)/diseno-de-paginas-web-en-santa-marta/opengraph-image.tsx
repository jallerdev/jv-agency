import { SANTA_MARTA } from "@/content/ciudades/santa-marta";
import { tarjetaOg } from "@/lib/og";

/**
 * La tarjeta social de Santa Marta.
 *
 * EL TITULAR VA ENTERO, con la segunda línea y todo: «desde la misma costa» es lo único
 * que distingue esta tarjeta de las otras seis, y es además la parte honesta
 * —dónde estoy y dónde no—. Sin ella, siete ciudades compartirían una tarjeta
 * que solo cambia el topónimo, que es exactamente lo que se le reprocha a una
 * página de ciudad hecha en serie.
 */
const tarjeta = tarjetaOg({
  eyebrow: SANTA_MARTA.badge,
  titulo: `Diseño de páginas web en ${SANTA_MARTA.nombre}, ${SANTA_MARTA.tituloAcento}`,
  precio: "landing",
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
