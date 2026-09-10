import type { Texto, Traducido } from "@/content/types";

/**
 * LA PÁGINA DE AGENDAR
 * ──────────────────────────────────────────────────────────────────────────
 * El formulario existía desde el principio, pero solo como el cierre de la
 * portada. La respuesta a «mándame el enlace para agendar» era «entra a
 * jvagencia.com y baja hasta el final», que no es un enlace.
 *
 * Ahora tiene URL propia y eso cambia tres cosas concretas:
 *   · Se puede pegar en un chat, en una firma de correo o en un anuncio.
 *   · Google puede indexarla y responde a «agendar llamada» con su nombre.
 *   · El CTA de la cabecera, que sale en las cuarenta y pico páginas, deja de
 *     significar «vuelve a la portada y busca».
 *
 * LOS TRES PUNTOS Y EL TITULAR NO SE REPITEN AQUÍ: salen de
 * `content/home/agenda.ts`, que es lo que ya pinta la sección de la portada.
 * Duplicarlos era garantizar que en dos meses la portada y esta página dijeran
 * cosas distintas del mismo servicio.
 */
export const AGENDAR = {
  badge: { es: "Agenda", en: "Book a call" },
  titulo: { es: "Reserva tus veinte minutos.", en: "Book your twenty minutes." },
  tituloAcento: { es: "Hoy mismo si hay cupo.", en: "Today if there's a slot." },
  entradilla: {
    es: "Escoges día y hora, y la invitación de Google Meet te llega al correo apenas confirmas. Sin costo, sin compromiso y sin intermediarios.",
    en: "You pick the day and time, and the Google Meet invite hits your inbox the moment you confirm. Free, no strings and no middlemen.",
  },

  /** Lo que pasa después de darle a reservar, dicho antes de que lo pregunten. */
  despuesTitulo: { es: "Qué pasa después", en: "What happens next" },
  despues: [
    {
      titulo: { es: "Te llega la invitación", en: "The invite arrives" },
      cuerpo: {
        es: "Al correo, en el momento. Con el enlace de Google Meet y el evento ya puesto en tu calendario.",
        en: "By email, right away. With the Google Meet link and the event already on your calendar.",
      },
    },
    {
      titulo: { es: "Miro lo que tengas", en: "I look at what you have" },
      cuerpo: {
        es: "Antes de la llamada reviso tu sitio, tu Instagram o lo que me hayas mandado. La llamada no arranca en cero.",
        en: "Before the call I go through your site, your Instagram or whatever you sent me. The call doesn't start from zero.",
      },
    },
    {
      titulo: { es: "Si no puedes, se mueve", en: "If you can't make it, move it" },
      cuerpo: {
        es: "Desde el mismo correo de la invitación, sin escribirme. Y si prefieres WhatsApp desde el principio, también sirve.",
        en: "From the invite email itself, without writing to me. And if you'd rather use WhatsApp from the start, that works too.",
      },
    },
  ] as readonly { titulo: Texto; cuerpo: Texto }[],

  /** La salida para quien no quiere reservar una hora. */
  alternativa: {
    texto: {
      es: "¿Prefieres escribir antes de reservar una hora?",
      en: "Would you rather write before booking a slot?",
    },
    enlace: { es: "Ver las otras dos vías", en: "See the other two ways" },
    href: { es: "/contacto", en: "/en/contact" },
  },
} as const;

export const AGENDAR_META = {
  title: {
    es: "Agenda una llamada | JV Agencia",
    en: "Book a call | JV Agencia",
  },
  description: {
    es: "Diagnóstico sin costo de 20 minutos por Google Meet. Escoges día y hora y la invitación te llega al correo. Hablas conmigo, no con un ejecutivo de cuentas.",
    en: "A free 20-minute diagnostic over Google Meet. You pick the day and time and the invite hits your inbox. You talk to me, not to an account executive.",
  },
} as const satisfies Record<string, Traducido<string>>;
