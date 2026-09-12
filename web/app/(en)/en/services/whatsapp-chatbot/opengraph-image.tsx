import { CHATBOT } from "@/content/paginas/chatbot";
import { tarjetaOg } from "@/lib/og";

/**
 * The service's social card. The chip carries the catalogue's «chatbot» floor price.
 *
 * Next la sirve en `/en/services/whatsapp-chatbot/opengraph-image` y la declara sola en el `<head>`:
 * la página no tiene que declarar ninguna imagen.
 */
const tarjeta = tarjetaOg({
  eyebrow: CHATBOT.badge.en,
  titulo: `${CHATBOT.titulo.en} ${CHATBOT.tituloAcento.en}`,
  precio: "chatbot",
  idioma: "en",
});

export const { alt, size, contentType } = tarjeta;
export default tarjeta.Imagen;
