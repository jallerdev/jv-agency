import type { Texto, Traducido } from "@/content/types";

/**
 * CHATBOT DE WHATSAPP, EN LAS DOS LENGUAS
 * ──────────────────────────────────────────────────────────────────────────
 * Esta página existe por un hallazgo concreto: la palabra «chatbot» no
 * aparecía ni una vez en todo el sitio mientras el mercado colombiano busca
 * exactamente eso. Se estaba vendiendo el producto correcto con el nombre
 * equivocado.
 *
 * LOS PRECIOS NO SE CONVIERTEN A DÓLARES en la versión en inglés: van en pesos
 * con la moneda dicha, por la misma razón que en /precios —convertir obligaría
 * a inventar una tasa y a mantenerla al día, y el precio dejaría de ser un
 * dato para ser una estimación—.
 */

export type TipoAutomatizacion = "faq" | "avisos" | "leads" | "citas" | "pedidos";

export const TIPOS: readonly {
  key: TipoAutomatizacion;
  titulo: Texto;
  cuerpo: Texto;
}[] = [
  {
    key: "faq",
    titulo: { es: "Respuestas automáticas", en: "Automatic replies" },
    cuerpo: {
      es: "Contesta las preguntas repetidas de siempre: horarios, precios, ubicación.",
      en: "Answers the same repeated questions: hours, prices, where you are.",
    },
  },
  {
    key: "avisos",
    titulo: { es: "Avisos y recordatorios", en: "Notices and reminders" },
    cuerpo: {
      es: "Notifica estados: pedido listo, envío en camino, turno mañana.",
      en: "Notifies status: order ready, shipment on the way, appointment tomorrow.",
    },
  },
  {
    key: "leads",
    titulo: { es: "Captura y calificación de interesados", en: "Lead capture and qualifying" },
    cuerpo: {
      es: "Hace las preguntas de calificación y deja al interesado listo en tu embudo.",
      en: "Asks the qualifying questions and leaves the lead ready in your pipeline.",
    },
  },
  {
    key: "citas",
    titulo: { es: "Agendamiento de citas", en: "Appointment booking" },
    cuerpo: {
      es: "Muestra disponibilidad, agenda y confirma. Con recordatorio previo.",
      en: "Shows availability, books and confirms. With a reminder beforehand.",
    },
  },
  {
    key: "pedidos",
    titulo: { es: "Pedidos y catálogo", en: "Orders and catalogue" },
    cuerpo: {
      es: "Muestra el catálogo, arma el pedido y confirma la compra.",
      en: "Shows the catalogue, builds the order and confirms the purchase.",
    },
  },
];

export const CHATBOT = {
  badge: { es: "Chatbot de WhatsApp", en: "WhatsApp chatbot" },
  titulo: { es: "Tu WhatsApp contesta solo:", en: "Your WhatsApp answers on its own:" },
  tituloAcento: { es: "responde, agenda y vende", en: "it replies, books and sells" },
  entradilla: {
    es: "Aquí la gente le escribe a un negocio antes que llamarlo o llenarle un formulario. El que contesta primero, vende: un chatbot hace que ese primero seas tú, a cualquier hora.",
    en: "Here people message a business before they call it or fill in a form. Whoever answers first, sells: a chatbot makes that first one you, at any hour.",
  },
  ctaPrincipal: { es: "Agenda una llamada", en: "Book a call" },
  ctaSecundario: { es: "Ver precios", en: "See pricing" },

  diferenciador: {
    titulo: { es: "Casi todos te revenden una plataforma.", en: "Almost everyone resells you a platform." },
    acento: { es: "Yo conecto directo.", en: "I connect you directly." },
    parrafo1: {
      es: "La mayoría de agencias en Colombia no está conectada a Meta: te revende el servicio de un tercero. Si ese tercero sube el precio o cierra, quedas colgado y ellos no pueden hacer nada.",
      en: "Most agencies in Colombia aren't connected to Meta: they resell a third party's service. If that third party raises its price or shuts down, you're stranded and they can't do a thing.",
    },
    fuerte: {
      es: "Soy proveedor de tecnología verificado por Meta.",
      en: "I'm a technology provider verified by Meta.",
    },
    parrafo2: {
      es: " La conexión de tu número la hago yo, sin intermediario. Es verificable —no es un sello que me puse solo.",
      en: " I connect your number myself, with no middleman. It's verifiable —not a badge I gave myself.",
    },
  },

  paraQuienTitulo: {
    es: "Esto te sirve si te pasa alguna de estas",
    en: "This is for you if any of these happen",
  },
  paraQuien: [
    {
      titulo: { es: "Vives contestando lo mismo", en: "You spend the day answering the same thing" },
      cuerpo: {
        es: "Horarios, precios, dónde quedas, si hay domicilio. Diez veces al día, todos los días.",
        en: "Hours, prices, where you are, whether you deliver. Ten times a day, every day.",
      },
    },
    {
      titulo: {
        es: "Se te pierden mensajes de noche y los domingos",
        en: "You lose messages at night and on Sundays",
      },
      cuerpo: {
        es: "El que escribe a las 9 p. m. y no recibe respuesta, a las 9:05 ya le escribió a otro.",
        en: "Whoever writes at 9 p.m. and gets no answer has messaged someone else by 9:05.",
      },
    },
    {
      titulo: { es: "Agendas citas por chat", en: "You book appointments over chat" },
      cuerpo: {
        es: "El ida y vuelta de «¿a qué hora tiene?» se come la mañana.",
        en: "The back and forth of «what time do you have?» eats up the morning.",
      },
    },
    {
      titulo: { es: "Tomas pedidos por WhatsApp", en: "You take orders over WhatsApp" },
      cuerpo: {
        es: "Y los anotas en una libreta o en las notas del teléfono, con el riesgo que eso tiene.",
        en: "And you write them in a notebook or your phone's notes, with the risk that carries.",
      },
    },
  ] as readonly { titulo: Texto; cuerpo: Texto }[],

  reloj: {
    titulo: {
      es: "Las horas en que tu WhatsApp contesta",
      en: "The hours your WhatsApp answers",
    },
    hoy: { es: "Hoy", en: "Today" },
    conBot: { es: "Con el bot", en: "With the bot" },
    nota: { es: "Ejemplo · mostrador de 8 a 6", en: "Example · counter open 8 to 6" },
    horas: { es: "h", en: "h" },
  },

  precios: {
    badge: { es: "Precios", en: "Pricing" },
    titulo: { es: "Qué se puede automatizar", en: "What can be automated" },
    entradilla: {
      es: "Precios de referencia. Puedes empezar por lo más simple y crecer después, sin rehacer lo hecho.",
      en: "Reference prices. You can start with the simplest one and grow later, without redoing what's done.",
    },
    desde: { es: "desde", en: "from" },
    aclaracionTitulo: { es: "Una aclaración de entrada:", en: "One thing up front:" },
    aclaracion1: {
      es: " el consumo de la API lo cobra Meta directamente a tu cuenta, con tu propio medio de pago. No está en estos precios porque no lo facturo yo: depende de cuántas conversaciones tengas.",
      en: " Meta charges API usage directly to your account, with your own payment method. It isn't in these prices because I don't bill it: it depends on how many conversations you have.",
    },
    aclaracion2Antes: { es: "Y el plan de mantenimiento va aparte, desde ", en: "And the maintenance plan is separate, from " },
    aclaracion2Despues: {
      es: ". Sin plan, si expira el token de Meta o rechazan una plantilla, la automatización deja de responder y nadie se entera.",
      en: ". Without a plan, if the Meta token expires or a template is rejected, the automation stops replying and nobody finds out.",
    },
    alMes: { es: " al mes", en: " a month" },
  },

  hilo: {
    negocio: { es: "Salón de ejemplo", en: "Example salon" },
    iniciales: "SE",
    mensajes: {
      es: [
        "Buenas, ¿tienen cita para mañana?",
        "¡Hola! Sí. Mañana me quedan 9:00 a. m., 11:30 a. m. y 4:00 p. m. ¿Cuál te sirve?",
        "La de 11:30",
        "Listo, te aparté mañana 11:30 a. m. Te llega un recordatorio dos horas antes.",
        "Si necesitas otra cosa, mañana a primera hora te escribe una persona del equipo.",
      ],
      en: [
        "Hi, do you have an appointment for tomorrow?",
        "Hi! Yes. Tomorrow I have 9:00 a.m., 11:30 a.m. and 4:00 p.m. left. Which works for you?",
        "The 11:30 one",
        "Done, I've held tomorrow 11:30 a.m. for you. You'll get a reminder two hours before.",
        "If you need anything else, someone from the team will write to you first thing tomorrow.",
      ],
    } as Traducido<readonly string[]>,
    horas: ["9:41 p. m.", "9:41 p. m.", "9:42 p. m.", "9:42 p. m.", "9:42 p. m."],
  },

  incluyeTitulo: {
    es: "Qué incluye, en cualquiera de los cinco",
    en: "What's included, in any of the five",
  },
  incluye: {
    es: [
      "Conexión de tu número a la plataforma oficial de WhatsApp Business",
      "Diseño del flujo de conversación, escrito con tus palabras y no con las mías",
      "Dos plantillas de mensaje aprobadas ante Meta",
      "Traspaso a una persona cuando la conversación se complica",
      "Panel para ver las conversaciones y lo que el bot no supo contestar",
      "Capacitación de entrega y 30 días de ajustes sin costo",
    ],
    en: [
      "Connecting your number to the official WhatsApp Business platform",
      "Designing the conversation flow, written in your words and not mine",
      "Two message templates approved by Meta",
      "Handover to a person when the conversation gets complicated",
      "A panel to see the conversations and what the bot couldn't answer",
      "Handover training and 30 days of adjustments at no cost",
    ],
  } as Traducido<readonly string[]>,

  procesoTitulo: { es: "Cómo se hace", en: "How it's done" },
  previo: {
    etiqueta: { es: "Antes del paso 01", en: "Before step 01" },
    texto: {
      es: "Tu número de WhatsApp Business y una semana de chats. El reloj no ha arrancado.",
      en: "Your WhatsApp Business number and a week of chats. The clock hasn't started.",
    },
  },
  proceso: [
    {
      etiqueta: { es: "Paso 01", en: "Step 01" },
      texto: {
        es: "Leo una semana de tus chats. No invento preguntas: miro lo que te escriben.",
        en: "I read a week of your chats. I don't invent questions: I look at what people write to you.",
      },
    },
    {
      etiqueta: { es: "Paso 02", en: "Step 02" },
      texto: {
        es: "Conecto tu número con Meta. Sigue siendo tuyo y no cambia.",
        en: "I connect your number with Meta. It stays yours and doesn't change.",
      },
    },
    {
      etiqueta: { es: "Paso 03", en: "Step 03" },
      texto: {
        es: "Escribo el flujo y lo pruebas conmigo, antes de que lo vea un cliente.",
        en: "I write the flow and you test it with me, before any customer sees it.",
      },
    },
    {
      etiqueta: { es: "Paso 04", en: "Step 04" },
      texto: {
        es: "Sale al aire. Lo que el bot no supo contestar se revisa y se le enseña.",
        en: "It goes live. Whatever the bot couldn't answer gets reviewed and taught to it.",
      },
    },
  ] as readonly { etiqueta: Texto; texto: Texto }[],
  plazo: {
    es: "De 1 a 5 semanas, según lo que necesites",
    en: "1 to 5 weeks, depending on what you need",
  },

  faqTitulo: { es: "Lo que siempre preguntan", en: "What people always ask" },
  faq: [
    {
      q: { es: "¿Reemplaza a alguien de mi equipo?", en: "Does it replace someone on my team?" },
      a: {
        es: "No, y no te lo vendo así. Filtra: contesta lo repetido y te pasa a ti las conversaciones que valen la pena. Lo que recuperas son horas, no un sueldo.",
        en: "No, and I won't sell it to you that way. It filters: it answers the repetitive stuff and passes you the conversations worth having. What you get back is hours, not a salary.",
      },
    },
    {
      q: { es: "¿Tengo que cambiar de número?", en: "Do I have to change my number?" },
      a: {
        es: "No. Se conecta tu número actual de WhatsApp Business: sigue siendo tuyo y sigues escribiendo desde el teléfono.",
        en: "No. Your current WhatsApp Business number gets connected: it stays yours and you keep writing from your phone.",
      },
    },
    {
      q: { es: "¿Cuánto cuestan las conversaciones?", en: "How much do conversations cost?" },
      a: {
        es: "Eso lo cobra Meta directamente a tu cuenta, con tu propio medio de pago. Yo cobro por construirlo y mantenerlo, no por las conversaciones.",
        en: "Meta charges that directly to your account, with your own payment method. I charge for building and maintaining it, not for the conversations.",
      },
    },
    {
      q: { es: "¿En cuánto tiempo queda funcionando?", en: "How long until it's working?" },
      a: {
        es: "Entre 1 y 5 semanas según lo que necesites: unas respuestas automáticas salen en 2 semanas; un sistema de pedidos con catálogo toma 5.",
        en: "Between 1 and 5 weeks depending on what you need: automatic replies take 2 weeks; an order system with a catalogue takes 5.",
      },
    },
    {
      q: { es: "¿Y si el bot no sabe contestar algo?", en: "What if the bot doesn't know an answer?" },
      a: {
        es: "Pasa la conversación a una persona. Además queda registrado, para enseñarle esa respuesta y que la próxima vez la sepa.",
        en: "It hands the conversation to a person. It's also logged, so that answer can be taught to it and it knows next time.",
      },
    },
    {
      q: { es: "¿Necesito un plan mensual?", en: "Do I need a monthly plan?" },
      /* El precio se inyecta en el componente: sale de A_PRICES, que es la
         fuente de verdad del cotizador y no se copia a mano. */
      a: {
        es: "Es muy recomendable. Una automatización queda corriendo y hay cosas que se vencen solas: si expira el token de Meta o rechazan una plantilla, deja de responder y nadie se entera hasta que un cliente reclama. Los planes empiezan en {precio} al mes.",
        en: "It's strongly recommended. An automation keeps running and some things expire on their own: if the Meta token expires or a template is rejected, it stops replying and nobody finds out until a customer complains. Plans start at {precio} a month.",
      },
    },
  ] as readonly { q: Texto; a: Texto }[],

  cierre: {
    titulo: {
      es: "Cuéntame qué te preguntan todo el día",
      en: "Tell me what they ask you all day",
    },
    cuerpo: {
      es: "Veinte minutos bastan para saber si te sirve, cuánto costaría y en cuánto quedaría funcionando. Si no te sirve, te lo digo.",
      en: "Twenty minutes is enough to know whether it's any use to you, what it would cost and how soon it would be working. If it's no use, I'll say so.",
    },
    otros: { es: "Ver los demás servicios", en: "See the other services" },
  },
} as const;
