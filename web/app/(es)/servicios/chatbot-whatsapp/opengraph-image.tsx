import { CHATBOT } from "@/content/paginas/chatbot";
import { tarjetaOg } from "@/lib/og";

/**
 * La tarjeta social del servicio. El chip trae el «desde» de `chatbot` del catálogo.
 *
 * Next la sirve en `/servicios/chatbot-whatsapp/opengraph-image` y la declara sola en el `<head>`:
 * la página no tiene que declarar ninguna imagen.
 */
const tarjeta = tarjetaOg({
  eyebrow: CHATBOT.badge.es,
  titulo: `${CHATBOT.titulo.es} ${CHATBOT.tituloAcento.es}`,
  precio: "chatbot",
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
