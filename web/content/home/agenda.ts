import type { Encabezado, Texto } from "@/content/types";

export const AGENDA: Encabezado & {
  puntos: readonly { titulo: Texto; cuerpo: Texto }[];
} = {
  eyebrow: { es: "Agenda", en: "Book" },
  titulo: {
    es: "Veinte minutos y sales sabiendo qué necesitas.",
    en: "Twenty minutes and you leave knowing what you need.",
  },
  acento: { es: "qué necesitas.", en: "what you need." },
  entradilla: {
    es: "Sin costo y sin compromiso. Si lo que necesitas no lo hago yo, te digo quién.",
    en: "Free and with no strings. If what you need isn't something I do, I'll tell you who does.",
  },
  puntos: [
    {
      titulo: { es: "Hablas conmigo", en: "You talk to me" },
      cuerpo: {
        es: "No hay ejecutivo de cuentas. El que atiende la llamada es el que escribe el código.",
        en: "There's no account executive. Whoever takes the call is the one who writes the code.",
      },
    },
    {
      titulo: { es: "Sales con un número", en: "You leave with a number" },
      cuerpo: {
        es: "Un rango de precio y un plazo reales, dichos en la llamada, no en una propuesta a los ocho días.",
        en: "A real price range and timeline, said on the call, not in a proposal eight days later.",
      },
    },
    {
      titulo: { es: "Por Google Meet", en: "Over Google Meet" },
      cuerpo: {
        es: "La invitación te llega al correo apenas confirmas. No hay que instalar nada.",
        en: "The invite hits your inbox the moment you confirm. Nothing to install.",
      },
    },
  ],
};
