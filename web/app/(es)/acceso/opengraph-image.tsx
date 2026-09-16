import { tarjetaOg } from "@/lib/og";

/**
 * La tarjeta de la pantalla de acceso.
 *
 * NO NOMBRA EL DOCUMENTO, y es a propósito: el convenio de archivo de Next no
 * recibe los parámetros de la URL, así que una sola imagen sirve a la
 * cotización de un cliente y al kit de ventas. Quién es el destinatario va en
 * el `og:title`, que sí se arma por documento en `generateMetadata`.
 *
 * Lo que sí hace la imagen es avisar de la contraseña. Quien recibe el enlace
 * por WhatsApp ve la tarjeta antes de tocar nada: si ya sabe que hay una
 * puerta, no cree que el enlace esté roto.
 */
const tarjeta = tarjetaOg({
  eyebrow: "Documento privado",
  titulo: "Este enlace pide contraseña",
  alt: "JV Agencia — documento privado, pide contraseña",
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
