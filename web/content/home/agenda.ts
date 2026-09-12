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

/**
 * LOS TEXTOS DEL FORMULARIO
 * ──────────────────────────────────────────────────────────────────────────
 * Estaban escritos dentro de `ScheduleCall.tsx`, unas cuarenta cadenas
 * sueltas, y por eso la portada en inglés seguía diciendo «Agenda tu llamada»
 * y «Elige una fecha para ver los horarios».
 *
 * Se sacan aquí enteros, no solo los que se veían mal: un formulario a medio
 * traducir es peor que uno sin traducir, porque el fallo aparece justo en el
 * paso donde la persona ya decidió escribir.
 */
export const FORM = {
  es: {
    titulo: "Agenda tu llamada",
    intro: "Diagnóstico sin costo de 20 minutos por Google Meet. Cuéntame qué necesitas.",
    paso: (n: number) => `Paso ${n} de 2`,
    promesa: "Te respondo en menos de 24 h",
    servicio: "¿En qué te ayudo?",
    nombre: "Nombre",
    nombrePlaceholder: "Tu nombre",
    correo: "Correo",
    correoPlaceholder: "tu@correo.com",
    telefono: "WhatsApp / teléfono",
    fecha: "Fecha preferida",
    hora: "Hora disponible",
    libres: (n: number) => `${n} libres`,
    sinFecha: "Elige una fecha para ver los horarios.",
    buscando: "Buscando horarios disponibles",
    sinHoras: "No hay horarios disponibles ese día. Prueba con otra fecha.",
    nota: "Cuéntame brevemente",
    notaOpcional: "(opcional)",
    notaPlaceholder: "¿Qué tienes en mente? Un sitio nuevo, un rediseño, una app…",
    continuar: "Continuar",
    atras: "Atrás",
    enviar: "Agendar llamada",
    enviando: "Agendando…",
    aviso: "Sin compromiso. Recibirás la invitación de Google Meet en tu correo.",
    porWhatsApp: "O escríbeme por WhatsApp",
    errores: {
      servicio: "Elige una opción",
      nombre: "Escribe tu nombre",
      correo: "Ingresa un correo válido",
      telefono: "Ingresa un teléfono válido",
      fecha: "Elige una fecha",
      hora: "Elige una hora",
      ocupado: "Ese horario se acaba de ocupar. Elige otro.",
      envio: "No se pudo agendar. Intenta de nuevo o escríbeme por WhatsApp.",
    },
    exito: {
      saludo: (nombre: string) => `¡Listo, ${nombre}!`,
      agendada: "Tu llamada quedó agendada.",
      recibida: "Recibí tu solicitud de llamada.",
      filas: { servicio: "Servicio", fecha: "Fecha", hora: "Hora", correo: "Correo" },
      conMeet: (correo: string) => ({
        antes: "Te envié la invitación a ",
        correo,
        despues: " con el enlace de Google Meet. También puedes unirte desde aquí:",
      }),
      unirse: "Unirse a Google Meet",
      /* La descarga del `.ics`. Existe porque la invitación de Google llega al
         correo, y quien reserva desde el trabajo con Outlook o desde un
         teléfono sin la cuenta de Google puesta se queda sin recordatorio. Un
         archivo de calendario lo abre cualquier agenda del mundo. */
      calendario: "Añadir a mi calendario",
      evento: "Llamada de diagnóstico · JV Agencia",
      sinMeet:
        "Para confirmar la cita, envíame los datos por WhatsApp. Te respondo para cerrar el horario.",
      confirmar: "Confirmar por WhatsApp",
      otra: "Agendar otra",
    },
    wa: {
      saludo: "Hola JV Agencia 👋 Quiero agendar una llamada.",
      nombre: "Nombre",
      servicio: "Servicio",
      fecha: "Fecha",
      hora: "Hora",
      correo: "Email",
      telefono: "Teléfono",
      notaEtiqueta: "Nota",
    },
    /* El navegador pinta el mes y el día del calendario nativo según SU
       locale, no el del documento. Esto es solo para la fecha en palabras. */
    locale: "es-CO",
  },
  en: {
    titulo: "Book your call",
    intro: "A free 20-minute call over Google Meet. Tell me what you need.",
    paso: (n: number) => `Step ${n} of 2`,
    promesa: "I reply in under 24 h",
    servicio: "What can I help with?",
    nombre: "Name",
    nombrePlaceholder: "Your name",
    correo: "Email",
    correoPlaceholder: "you@email.com",
    telefono: "WhatsApp / phone",
    fecha: "Preferred date",
    hora: "Available time",
    libres: (n: number) => `${n} open`,
    sinFecha: "Pick a date to see the available times.",
    buscando: "Looking for available times",
    sinHoras: "No times available that day. Try another date.",
    nota: "Tell me briefly",
    notaOpcional: "(optional)",
    notaPlaceholder: "What do you have in mind? A new site, a redesign, an app…",
    continuar: "Continue",
    atras: "Back",
    enviar: "Book the call",
    enviando: "Booking…",
    aviso: "No strings attached. You'll get the Google Meet invite in your inbox.",
    porWhatsApp: "Or message me on WhatsApp",
    errores: {
      servicio: "Pick an option",
      nombre: "Enter your name",
      correo: "Enter a valid email",
      telefono: "Enter a valid phone number",
      fecha: "Pick a date",
      hora: "Pick a time",
      ocupado: "That slot was just taken. Pick another one.",
      envio: "The booking didn't go through. Try again or message me on WhatsApp.",
    },
    exito: {
      saludo: (nombre: string) => `You're set, ${nombre}!`,
      agendada: "Your call is booked.",
      recibida: "I got your call request.",
      filas: { servicio: "Service", fecha: "Date", hora: "Time", correo: "Email" },
      conMeet: (correo: string) => ({
        antes: "I sent the invite to ",
        correo,
        despues: " with the Google Meet link. You can also join from here:",
      }),
      unirse: "Join Google Meet",
      calendario: "Add to my calendar",
      evento: "Diagnostic call · JV Agencia",
      sinMeet:
        "To confirm the appointment, send me the details on WhatsApp. I'll reply to lock the time in.",
      confirmar: "Confirm on WhatsApp",
      otra: "Book another",
    },
    wa: {
      saludo: "Hi JV Agencia 👋 I'd like to book a call.",
      nombre: "Name",
      servicio: "Service",
      fecha: "Date",
      hora: "Time",
      correo: "Email",
      telefono: "Phone",
      notaEtiqueta: "Note",
    },
    locale: "en-US",
  },
} as const;

/** Los nombres cortos de las pastillas de servicio, por idioma. */
export const SERVICIO_CORTO: Record<"es" | "en", Record<string, string>> = {
  es: {
    web: "Páginas web",
    chatbot: "Chatbot",
    seo: "SEO",
    software: "Software",
    design: "Diseño / UI",
    support: "Mantenimiento",
  },
  en: {
    web: "Websites",
    chatbot: "Chatbot",
    seo: "SEO",
    software: "Software",
    design: "Design / UI",
    support: "Maintenance",
  },
};
