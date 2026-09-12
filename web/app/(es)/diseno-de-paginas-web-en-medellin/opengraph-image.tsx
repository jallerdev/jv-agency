import { MEDELLIN } from "@/content/ciudades/medellin";
import { tarjetaOg } from "@/lib/og";

/**
 * La tarjeta social de Medellín.
 *
 * EL TITULAR VA ENTERO, con la segunda línea y todo: «desde Bolívar y a distancia» es lo único
 * que distingue esta tarjeta de las otras seis, y es además la parte honesta
 * —dónde estoy y dónde no—. Sin ella, siete ciudades compartirían una tarjeta
 * que solo cambia el topónimo, que es exactamente lo que se le reprocha a una
 * página de ciudad hecha en serie.
 */
const tarjeta = tarjetaOg({
  eyebrow: MEDELLIN.badge,
  titulo: `Diseño de páginas web en ${MEDELLIN.nombre}, ${MEDELLIN.tituloAcento}`,
  precio: "landing",
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
