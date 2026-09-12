import { tarjetaOg } from "@/lib/og";

/**
 * La tarjeta social de la eliminación de datos.
 *
 * Sin chip de precio y con el rótulo «Legal»: una página que se comparte para
 * leerla, no para contratar. La plantilla es la misma que la del resto del
 * sitio —el documento legal no es un anexo de otra marca—.
 */
const tarjeta = tarjetaOg({
  eyebrow: "Legal",
  titulo: "Eliminación de datos",
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
