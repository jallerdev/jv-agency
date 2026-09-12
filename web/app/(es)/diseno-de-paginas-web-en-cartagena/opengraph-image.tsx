import { tarjetaOg } from "@/lib/og";

/**
 * La tarjeta social de Cartagena de Indias.
 *
 * EL TITULAR VA ENTERO, con la segunda línea y todo: «y vivo a 20 kilómetros de allí» es lo único
 * que distingue esta tarjeta de las otras seis, y es además la parte honesta
 * —dónde estoy y dónde no—. Sin ella, siete ciudades compartirían una tarjeta
 * que solo cambia el topónimo, que es exactamente lo que se le reprocha a una
 * página de ciudad hecha en serie.
 *
 * LAS CADENAS VAN LITERALES porque esta es una de las tres páginas de ciudad
 * heredadas: su encabezado está escrito a mano dentro de `page.tsx` y no hay
 * constante que importar. Si algún día se portan a `content/ciudades/`, esto
 * pasa a leer de ahí como las otras cuatro.
 */
const tarjeta = tarjetaOg({
  eyebrow: "Cartagena de Indias · Bolívar",
  titulo: "Diseño de páginas web en Cartagena de Indias, y vivo a 20 kilómetros de allí",
  precio: "landing",
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
