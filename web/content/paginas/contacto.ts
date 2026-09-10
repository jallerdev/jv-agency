import type { Texto } from "@/content/types";

/**
 * LA PÁGINA DE CONTACTO
 * ──────────────────────────────────────────────────────────────────────────
 * Existía el diálogo «Cuéntame tu proyecto» y existía la sección de agenda al
 * final de la portada, pero no existía una URL a la que mandar a alguien
 * cuando pregunta «¿cómo te contacto?». Eso obligaba a decir «baja hasta el
 * final de la portada», que no es una respuesta.
 *
 * LAS TRES VÍAS ESTÁN EN LA MISMA PANTALLA, y en el orden en que sirven:
 * la llamada agendada primero —porque es la que resuelve—, WhatsApp después
 * —porque es la que la gente usa— y el correo al final, para lo que tiene
 * adjuntos. Ninguna esconde a la otra detrás de una pestaña.
 *
 * NO SE PROMETE UN HORARIO DE ATENCIÓN. El estudio es una persona; publicar
 * «lunes a viernes de 8 a 6» sería inventar una disponibilidad. Lo que sí se
 * puede sostener es el tiempo de respuesta, y eso es lo que se dice.
 */
export const CONTACTO = {
  badge: { es: "Contacto", en: "Contact" },
  titulo: { es: "Hablemos de", en: "Let's talk about" },
  tituloAcento: { es: "tu proyecto.", en: "your project." },
  entradilla: {
    es: "Escribes tú y contesto yo: aquí no hay bandeja compartida ni ejecutivo de cuentas. Elige la vía que te quede cómoda.",
    en: "You write and I answer: there's no shared inbox and no account executive here. Pick whichever way suits you.",
  },

  vias: [
    {
      id: "llamada",
      titulo: { es: "Agenda una llamada", en: "Book a call" },
      cuerpo: {
        es: "Veinte minutos por Google Meet, sin costo. Sales con un rango de precio y un plazo, dichos en la llamada.",
        en: "Twenty minutes over Google Meet, free. You leave with a price range and a timeline, said on the call.",
      },
      accion: { es: "Elegir horario", en: "Pick a time" },
      nota: { es: "Confirmación inmediata", en: "Confirmed instantly" },
    },
    {
      id: "whatsapp",
      titulo: { es: "Escríbeme por WhatsApp", en: "Message me on WhatsApp" },
      cuerpo: {
        es: "Para una pregunta suelta o para mandarme el enlace de tu sitio actual. Es el número del estudio, no un bot.",
        en: "For a quick question, or to send me the link to your current site. It's the studio's number, not a bot.",
      },
      accion: { es: "Abrir WhatsApp", en: "Open WhatsApp" },
      nota: { es: "Respondo en menos de 24 h", en: "I reply in under 24 h" },
    },
    {
      id: "correo",
      titulo: { es: "Mándame un correo", en: "Send me an email" },
      cuerpo: {
        es: "Si tienes un pliego, un documento o material de marca que enviar, esta es la vía con adjuntos.",
        en: "If you have a brief, a document or brand material to send, this is the one with attachments.",
      },
      accion: { es: "Escribir correo", en: "Write an email" },
      nota: { es: "Respondo en menos de 24 h", en: "I reply in under 24 h" },
    },
  ] as readonly {
    id: string;
    titulo: Texto;
    cuerpo: Texto;
    accion: Texto;
    nota: Texto;
  }[],

  fichaTitulo: { es: "El estudio", en: "The studio" },
  ficha: [
    {
      k: { es: "Quién responde", en: "Who answers" },
      v: { es: "Luis Jaller, en persona", en: "Luis Jaller, in person" },
    },
    {
      k: { es: "Dónde estoy", en: "Where I am" },
      v: { es: "Turbaco, Bolívar · Colombia", en: "Turbaco, Bolívar · Colombia" },
    },
    {
      k: { es: "A quién atiendo", en: "Who I work with" },
      v: { es: "Toda Latinoamérica, en remoto", en: "All of Latin America, remotely" },
    },
    {
      k: { es: "Idiomas", en: "Languages" },
      v: { es: "Español e inglés", en: "Spanish and English" },
    },
  ] as readonly { k: Texto; v: Texto }[],

  agendaTitulo: { es: "O reserva aquí mismo", en: "Or book right here" },
  agendaEntradilla: {
    es: "Dos pasos y listo. La invitación de Google Meet te llega al correo apenas confirmas.",
    en: "Two steps and you're done. The Google Meet invite hits your inbox the moment you confirm.",
  },
} as const;
