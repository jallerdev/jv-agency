import type { Texto, Traducido } from "@/content/types";

/**
 * SALONES Y SPAS, EN LAS DOS LENGUAS
 * ──────────────────────────────────────────────────────────────────────────
 * POR QUÉ ESTA PÁGINA DE SECTOR SÍ EXISTE Y OTRAS NO: la regla es que solo hay
 * página de sector donde haya un trabajo real que mostrar. Aquí hay tres
 * —Marcopolo, Elka Gómez y Hummik—; de restaurantes e inmobiliarias no hay ni
 * uno, y una página de sector sin caso es una página vacía que además le
 * compite al blog.
 *
 * LO QUE NO SE PUEDE ROMPER: Marcopolo y Elka Gómez son PROYECTOS DE ESTUDIO,
 * sitios que se construyeron por iniciativa propia para negocios reales de la
 * región. NO son clientes que pagaron y no se presentan como tales. Si alguien
 * los convierte en «casos de éxito», la página se vuelve mentira.
 *
 * Sin cifras de mercado inventadas: aquí no hay «el 70 % de las citas se
 * pierden por no contestar». Los únicos números son los precios autorizados.
 *
 * UNA SOLA PÁGINA cubre toda la intención: salón de belleza, peluquería,
 * barbería, spa, uñas, estética. Son sinónimos del mismo oficio para quien
 * busca, y una página por sinónimo es lo que Google castiga.
 */
export const SALONES = {
  badge: { es: "Belleza y bienestar", en: "Beauty and wellness" },
  titulo: {
    es: "Páginas web para salones de belleza y spas",
    en: "Websites for beauty salons and spas",
  },
  tituloAcento: {
    es: "que viven de la agenda llena",
    en: "that live off a full diary",
  },
  entradilla1: {
    es: "Tu clienta no busca un logo bonito: busca cuánto vale, cómo se ve tu trabajo y si tienes cupo el sábado.",
    en: "Your client isn't looking for a pretty logo: she's looking for what it costs, what your work looks like and whether you have a slot on Saturday.",
  },
  entradilla2Antes: {
    es: "La diseño y la programo yo, desde Turbaco, Bolívar. Una página web desde ",
    en: "I design it and I code it, from Turbaco, Bolívar. A website from ",
  },
  entradilla2Medio: { es: ", entregada en ", en: ", delivered in " },
  entradilla2Dias: { es: "5 días", en: "5 days" },
  entradilla2Fin: { es: ".", en: "." },
  ctaPrincipal: { es: "Agenda una llamada", en: "Book a call" },
  ctaSecundario: { es: "Ver los precios", en: "See the prices" },

  necesitaTitulo: {
    es: "Qué tiene que resolver la página de un salón o un spa",
    en: "What a salon or spa website has to solve",
  },
  necesita: [
    {
      icono: "precios",
      titulo: {
        es: "La carta de servicios, con el precio adentro",
        en: "The service list, with the price in it",
      },
      cuerpo: {
        es: "Lo primero que te preguntan por mensaje es cuánto vale. Con el precio publicado, la conversación empieza en «¿tienes cupo el sábado?». Si te varía por largo o por técnica, va el rango y de qué depende.",
        en: "The first thing people ask by message is what it costs. With the price published, the conversation starts at “do you have a slot on Saturday?”. If it varies by length or technique, the range goes in and what it depends on.",
      },
    },
    {
      icono: "cita",
      titulo: { es: "Reservar sin veinte mensajes", en: "Booking without twenty messages" },
      cuerpo: {
        es: "Ese ida y vuelta se lo come quien esté atendiendo, con las manos llenas de tinte. Cada servicio con su duración, y al chat con el que escogió.",
        en: "That back and forth is eaten by whoever is working, hands full of dye. Each service with its duration, and straight to the chat with the one they picked.",
      },
      enlace: {
        texto: { es: "Chatbot que agenda las citas", en: "A chatbot that books the appointments" },
        href: { es: "/servicios/chatbot-whatsapp", en: "/en/services/whatsapp-chatbot" },
      },
    },
    {
      icono: "foto",
      titulo: {
        es: "El trabajo a la vista, con fotos tuyas",
        en: "The work on show, with your own photos",
      },
      cuerpo: {
        es: "Acá el catálogo son las fotos: el color, el corte, las uñas. Sirve la del celular con buena luz; no sirve la modelo de banco de imágenes que jamás pisó tu silla. La galería la subes tú.",
        en: "Here the catalogue is the photos: the colour, the cut, the nails. A phone shot with good light works; a stock model who never sat in your chair doesn't. You upload the gallery yourself.",
      },
    },
    {
      icono: "equipo",
      titulo: { es: "Quién atiende, con nombre y cara", en: "Who does the work, with a name and a face" },
      cuerpo: {
        es: "La gente no pide cita en el salón: pide cita con alguien. Cada estilista o terapeuta con nombre, foto y en qué es mejor.",
        en: "People don't book with the salon: they book with someone. Each stylist or therapist with a name, a photo and what they're best at.",
      },
    },
    {
      icono: "reglas",
      titulo: { es: "Las reglas de la casa, escritas", en: "The house rules, in writing" },
      cuerpo: {
        es: "Anticipo, cancelación, retardo y plantón. Publicadas no te hacen antipático: te ahorran la discusión en la puerta, y cuando las reclamas no estás improvisando.",
        en: "Deposit, cancellation, lateness and no-shows. Published they don't make you unfriendly: they save you the argument at the door, and when you enforce them you aren't improvising.",
      },
    },
    {
      icono: "spa",
      titulo: {
        es: "En spa: qué incluye, cuánto dura, qué no aplica",
        en: "In a spa: what's included, how long it lasts, what doesn't apply",
      },
      cuerpo: {
        es: "Un ritual no se vende con una foto de piedras calientes: se vende explicado. Y las contraindicaciones que hoy adviertes por chat, dichas antes de reservar y no en la camilla.",
        en: "A ritual doesn't sell with a photo of hot stones: it sells explained. And the contraindications you warn about over chat today, said before booking and not on the table.",
      },
    },
  ] as readonly {
    icono: string;
    titulo: Texto;
    cuerpo: Texto;
    enlace?: { texto: Texto; href: Traducido<string> };
  }[],
  noPrometo: {
    fuerte: { es: "Y una que no voy a escribir:", en: "And one I won't write:" },
    resto: {
      es: " promesas de resultado. Ni «bajas tres tallas», ni «te quita las estrías», ni «te rejuvenece diez años». No lo escribo, y no te conviene tenerlo escrito.",
      en: " promises of results. Not “drop three sizes”, not “removes stretch marks”, not “takes ten years off you”. I don't write it, and it isn't in your interest to have it written.",
    },
  },

  hiloTitulo: {
    es: "Así se ve una reserva que no te interrumpe",
    en: "This is what a booking that doesn't interrupt you looks like",
  },
  hiloEntradilla: {
    es: "Esto contesta tu número a las nueve y media de la noche, con el salón cerrado. La última burbuja no es del bot: es el traspaso a una persona.",
    en: "This is what your number answers at half past nine at night, with the salon closed. The last bubble isn't the bot's: it's the handover to a person.",
  },
  hiloEnlace: {
    es: "Ver el chatbot que agenda citas",
    en: "See the chatbot that books appointments",
  },
  hilo: {
    negocio: { es: "Salón de ejemplo", en: "Example salon" },
    iniciales: "SE",
    mensajes: {
      es: [
        "Buenas, ¿tienen cupo el sábado para color?",
        "¡Hola! El sábado me quedan tres horas: 9:00 a. m., 11:30 a. m. y 3:00 p. m. El color toma unas tres horas.",
        "La de 11:30",
        "Listo, quedaste el sábado a las 11:30 a. m. Te llega un recordatorio el día antes.",
        "Si quieres cambiar la hora o preguntar por un precio puntual, mañana te contesta una persona del salón.",
      ],
      en: [
        "Hi, do you have a slot on Saturday for colour?",
        "Hi! On Saturday I have three times left: 9:00 a.m., 11:30 a.m. and 3:00 p.m. Colour takes about three hours.",
        "The 11:30 one",
        "Done, you're booked Saturday at 11:30 a.m. You'll get a reminder the day before.",
        "If you want to change the time or ask about a specific price, someone from the salon will answer tomorrow.",
      ],
    } as Traducido<readonly string[]>,
    /* La hora se escribe distinto en cada lengua: en castellano «9:41 p. m.»
       con espacio duro y punto tras cada letra, en inglés «9:41 p.m.». Es de
       esas cosas que no se leen mal pero delatan que el texto viene traducido,
       así que va en la tabla como cualquier otra frase. */
    horas: {
      es: ["9:41 p. m.", "9:41 p. m.", "9:42 p. m.", "9:42 p. m.", "9:42 p. m."],
      en: ["9:41 p.m.", "9:41 p.m.", "9:42 p.m.", "9:42 p.m.", "9:42 p.m."],
    } as Traducido<readonly string[]>,
  },

  /* ── La pieza firma: la carta de servicios ────────────────────────
     Las dos ideas centrales de esta página —precio publicado y reservar sin
     veinte mensajes— vivían en dos bloques separados: una rejilla de razones y
     un hilo de WhatsApp fijo. Aquí se unen: se toca un servicio de la carta y
     la conversación de al lado arranca CON ESE servicio.

     LOS PRECIOS DE LA CARTA SON DE UN SALÓN DE EJEMPLO, NO DE JV AGENCIA, y la
     pieza lo rotula dentro de sí misma. No sale de `lib/quote.ts` a propósito:
     ese módulo es la fuente de lo que cobra el estudio, y meter ahí el precio
     de un corte de pelo sería contaminar la única fuente de precios reales con
     cifras de muestra. */
  carta: {
    titulo: {
      es: "Tu carta, y lo que pasa cuando alguien la lee",
      en: "Your menu, and what happens when someone reads it",
    },
    entradilla: {
      es: "Toca un servicio. A la derecha ves la conversación que tendría tu WhatsApp con ese servicio, sin que tú contestes nada.",
      en: "Tap a service. On the right you'll see the conversation your WhatsApp would have about it, without you answering a thing.",
    },
    rotulo: { es: "Carta · ejemplo", en: "Menu · example" },
    ayuda: { es: "Toca un servicio", en: "Tap a service" },
    nota: {
      es: "Los precios de la carta son de un salón de ejemplo, no míos. Los míos están más abajo.",
      en: "The menu prices belong to an example salon, not to me. Mine are further down.",
    },
    servicios: [
      {
        clave: "corte",
        nombre: { es: "Corte de autor", en: "Signature cut" },
        duracion: { es: "45 min", en: "45 min" },
        precio: { es: "desde $45.000", en: "from $45,000" },
      },
      {
        clave: "color",
        nombre: { es: "Color completo", en: "Full colour" },
        duracion: { es: "3 horas", en: "3 hours" },
        precio: { es: "desde $180.000", en: "from $180,000" },
      },
      {
        clave: "unas",
        nombre: { es: "Manicure y pedicure", en: "Manicure and pedicure" },
        duracion: { es: "1 h 15", en: "1 h 15" },
        precio: { es: "desde $60.000", en: "from $60,000" },
      },
      {
        clave: "masaje",
        nombre: { es: "Masaje relajante", en: "Relaxing massage" },
        duracion: { es: "1 hora", en: "1 hour" },
        precio: { es: "desde $110.000", en: "from $110,000" },
      },
    ] as readonly { clave: string; nombre: Texto; duracion: Texto; precio: Texto }[],
    /* El guion es uno solo y se compone con el servicio elegido: cuatro
       guiones escritos a mano se habrían desincronizado al primer retoque. */
    guion: {
      es: [
        "Buenas, ¿tienen cupo el sábado para {servicio}?",
        "¡Hola! Sí. {Servicio} toma {duracion} y va {precio}. El sábado me quedan las 9:00 a. m. y las 11:30 a. m.",
        "La de 11:30",
        "Listo, quedaste el sábado a las 11:30 a. m. Te llega un recordatorio el día antes.",
        "Si quieres cambiar la hora o preguntar por un precio puntual, mañana te contesta una persona del salón.",
      ],
      en: [
        "Hi, do you have a Saturday slot for {servicio}?",
        "Hi! Yes. {Servicio} takes {duracion} and it's {precio}. On Saturday I have 9:00 a.m. and 11:30 a.m. left.",
        "The 11:30 one",
        "Done, you're booked Saturday at 11:30 a.m. You'll get a reminder the day before.",
        "If you want to change the time or ask about a specific price, someone from the salon will answer tomorrow.",
      ],
    } as Traducido<readonly string[]>,
    horas: {
      es: ["9:41 p. m.", "9:41 p. m.", "9:42 p. m.", "9:42 p. m.", "9:42 p. m."],
      en: ["9:41 p.m.", "9:41 p.m.", "9:42 p.m.", "9:42 p.m.", "9:42 p.m."],
    } as Traducido<readonly string[]>,
  },

  trabajoBadge: { es: "Lo que hay hecho", en: "What's been built" },
  trabajoTitulo: {
    es: "El trabajo de este sector que tengo, dicho como es",
    en: "The work I have in this sector, said as it is",
  },
  trabajoEntradilla: {
    es: "Dos de los tres son proyectos de estudio: los construí completos por iniciativa propia y nadie me los encargó. No te los vendo como clientes, porque no lo son.",
    en: "Two of the three are studio projects: I built them in full on my own initiative and nobody commissioned them. I'm not selling them to you as clients, because they aren't.",
  },
  trabajo: [
    {
      imagen: "/work/marcopolo.webp",
      etiqueta: { es: "Proyecto de estudio · Barranquilla", en: "Studio project · Barranquilla" },
      nombre: "Peluquería Marcopolo",
      cuerpo: {
        es: "Salón de Barranquilla con cuatro décadas: corte de autor, color editorial y tratamientos. Sin dominio conectado todavía.",
        en: "A Barranquilla salon with four decades behind it: signature cuts, editorial colour and treatments. No domain connected yet.",
      },
      alt: {
        es: "Peluquería Marcopolo: captura del sitio que diseñé y construí",
        en: "Peluquería Marcopolo: a screenshot of the site I designed and built",
      },
      enlace: {
        texto: { es: "Páginas web en Barranquilla", en: "Websites in Barranquilla" },
        href: {
          es: "/diseno-de-paginas-web-en-barranquilla",
          en: "/diseno-de-paginas-web-en-barranquilla",
        },
      },
    },
    {
      imagen: "/work/elka-spa.webp",
      etiqueta: { es: "Proyecto de estudio · Cartagena", en: "Studio project · Cartagena" },
      nombre: "Fta. Elka Gómez",
      cuerpo: {
        es: "Rehabilitación, masaje y spa en Cartagena. Un negocio que es dos cosas a la vez, y la página tiene que separarlas. También sin dominio conectado.",
        en: "Rehabilitation, massage and spa in Cartagena. A business that's two things at once, and the site has to separate them. Also with no domain connected.",
      },
      alt: {
        es: "Fta. Elka Gómez: captura del sitio que diseñé y construí",
        en: "Fta. Elka Gómez: a screenshot of the site I designed and built",
      },
      enlace: {
        texto: { es: "El lado de consultorio", en: "The clinic side" },
        href: { es: "/sectores/clinicas-y-consultorios", en: "/en/industries/clinics" },
      },
    },
    {
      imagen: "/work/hummik.webp",
      destacada: true,
      etiqueta: { es: "Producto propio · en línea", en: "Own product · live" },
      nombre: "Hummik",
      cuerpo: {
        es: "Agenda de citas por WhatsApp, con recordatorios contra los plantones. Es mío, no un encargo: lo puedes abrir ahora mismo y probarlo.",
        en: "A WhatsApp appointment book, with reminders against no-shows. It's mine, not a commission: you can open it right now and try it.",
      },
      alt: {
        es: "Hummik: captura del producto de agenda de citas que construí",
        en: "Hummik: a screenshot of the appointment product I built",
      },
      url: "https://www.hummik.com",
      dominio: "hummik.com",
    },
  ] as readonly {
    imagen: string;
    destacada?: boolean;
    etiqueta: Texto;
    nombre: string;
    cuerpo: Texto;
    alt: Texto;
    enlace?: { texto: Texto; href: Traducido<string> };
    url?: string;
    dominio?: string;
  }[],
  portafolioAntes: { es: "Lo demás está en ", en: "The rest is in " },
  portafolioEnlace: { es: "el portafolio completo", en: "the full portfolio" },
  portafolioDespues: {
    es: ", con la misma separación: producción con dominio propio y lo que construí por mi cuenta.",
    en: ", with the same separation: production with its own domain, and what I built on my own.",
  },

  preciosBadge: { es: "Precios", en: "Pricing" },
  preciosTitulo: {
    es: "Lo que cuesta, sin que tengas que escribir para preguntar",
    en: "What it costs, without you having to write to ask",
  },
  preciosEntradilla: {
    es: "Publico los míos por la misma razón por la que te digo que publiques los tuyos. Son precios de partida reales, y lo que suba de ahí te lo digo antes de empezar.",
    en: "I publish mine for the same reason I tell you to publish yours. They're real starting prices, and whatever goes up from there I tell you before starting.",
  },
  verDetalle: { es: "Ver el detalle", en: "See the detail" },
  desde: { es: "desde", en: "from" },
  precios: [
    {
      clave: "web",
      titulo: { es: "Página web del salón", en: "The salon's website" },
      plazo: { es: "5 días", en: "5 days" },
      cuerpo: {
        es: "Carta con precios, galería que actualizas tú, tu equipo, horario, cómo llegar y WhatsApp a la vista.",
        en: "A list with prices, a gallery you update yourself, your team, hours, how to get there and WhatsApp on show.",
      },
      href: { es: "/servicios/diseno-de-paginas-web", en: "/en/services/web-design" },
    },
    {
      clave: "citas",
      titulo: { es: "Chatbot que agenda citas", en: "A chatbot that books appointments" },
      plazo: { es: "de 2 a 5 semanas", en: "2 to 5 weeks" },
      cuerpo: {
        es: "Tu número muestra la disponibilidad, agenda, confirma y recuerda la cita el día antes. El recordatorio es lo que muerde el plantón.",
        en: "Your number shows availability, books, confirms and reminds the day before. The reminder is what bites into no-shows.",
      },
      href: { es: "/servicios/chatbot-whatsapp", en: "/en/services/whatsapp-chatbot" },
    },
    {
      clave: "seoMes",
      titulo: { es: "SEO local, mensual", en: "Local SEO, monthly" },
      plazo: { es: "trabajo continuo", en: "ongoing work" },
      cuerpo: {
        es: "Aparecer cuando escriben «peluquería» o «spa» más tu ciudad o tu barrio. Es mensual porque es continuo.",
        en: "Showing up when people type “hairdresser” or “spa” plus your city or your neighbourhood. It's monthly because it's continuous.",
      },
      href: { es: "/servicios/posicionamiento-seo", en: "/en/services/seo" },
    },
    {
      clave: "auditoria",
      titulo: { es: "Auditoría SEO", en: "SEO audit" },
      plazo: { es: "5 días", en: "5 days" },
      cuerpo: {
        es: "Ya tienes página y no aparece. Te digo por qué y qué se arregla primero. Sirve igual si te la hizo otro.",
        en: "You already have a site and it doesn't show up. I tell you why and what gets fixed first. It works the same if someone else built it.",
      },
      href: { es: "/servicios/posicionamiento-seo", en: "/en/services/seo" },
    },
    {
      clave: "tienda",
      titulo: { es: "Tienda online", en: "Online store" },
      /* «3 a 5», no «3»: en el cotizador (`PRICES.deliveryWeeks.ecom`) tres
         semanas es el plazo URGENTE, que lleva un 25 % de recargo, y cinco es
         el estándar. Anunciar el urgente como si fuera el normal es prometer
         un plazo que se cobra aparte. */
      plazo: { es: "3 a 5 semanas", en: "3 to 5 weeks" },
      cuerpo: {
        es: "Si además vendes producto: catálogo con inventario, carrito, pagos en línea y envíos.",
        en: "If you also sell product: catalogue with inventory, cart, online payments and shipping.",
      },
      href: { es: "/servicios/tiendas-virtuales", en: "/en/services/online-stores" },
    },
  ] as readonly {
    clave: string;
    titulo: Texto;
    plazo: Texto;
    cuerpo: Texto;
    href: Traducido<string>;
  }[],
  renovacionFuerte: {
    es: "La renovación anual cuesta {renovacion}",
    en: "The yearly renewal costs {renovacion}",
  },
  renovacionResto: {
    es: " y cubre el dominio, el alojamiento y que la página siga en pie. Va acá arriba y no en una nota al pie, porque es el costo que a todo el mundo se le aparece de sorpresa al año siguiente.",
    en: " and covers the domain, the hosting and keeping the site standing. It goes up here and not in a footnote, because it's the cost that surprises everyone the following year.",
  },

  arranqueTitulo: {
    es: "Lo que necesito de ti para arrancar",
    en: "What I need from you to start",
  },
  acopio: {
    titulo: { es: "Marca lo que ya tienes", en: "Tick what you already have" },
    nota: {
      es: "El reloj arranca cuando llega el material, no al aceptar la propuesta.",
      en: "The clock starts when the material arrives, not when the proposal is accepted.",
    },
    items: {
      es: [
        "Tu lista de servicios con precio o rango, y cuánto dura cada uno",
        "De 10 a 20 fotos de trabajos tuyos, con buena luz",
        "Los nombres de quienes atienden y en qué es bueno cada uno",
        "Horario real, incluidos domingos y festivos si abres",
        "Tus reglas de anticipo, cancelación y retardo, como las manejas hoy",
        "Accesos al dominio y al correo, si ya los tienes",
      ],
      en: [
        "Your service list with price or range, and how long each one takes",
        "10 to 20 photos of your own work, with good light",
        "The names of whoever does the work and what each one is good at",
        "Real opening hours, Sundays and holidays included if you open",
        "Your deposit, cancellation and lateness rules, as you handle them today",
        "Access to the domain and the email, if you already have them",
      ],
    } as Traducido<readonly string[]>,
  },
  procesoTitulo: { es: "Cómo trabajo", en: "How I work" },
  previo: {
    etiqueta: { es: "Antes de empezar", en: "Before starting" },
    texto: {
      es: "Reúnes el material de la lista de arriba. El reloj todavía no ha arrancado.",
      en: "You gather the material from the list above. The clock hasn't started yet.",
    },
  },
  proceso: [
    {
      etiqueta: { es: "Paso 01", en: "Step 01" },
      texto: {
        es: "Hablamos por WhatsApp: qué vendes, cómo llevas la agenda y qué te preguntan siempre.",
        en: "We talk on WhatsApp: what you sell, how you keep the diary and what people always ask you.",
      },
    },
    {
      etiqueta: { es: "Paso 02", en: "Step 02" },
      texto: {
        es: "Te mando la propuesta escrita, con lo que incluye y lo que no.",
        en: "I send you the written proposal, with what it includes and what it doesn't.",
      },
    },
    {
      etiqueta: { es: "Paso 03", en: "Step 03" },
      texto: {
        es: "La construyo yo. Hablas con el mismo que escribe el código.",
        en: "I build it. You talk to the same person who writes the code.",
      },
    },
    {
      etiqueta: { es: "Paso 04", en: "Step 04" },
      texto: {
        es: "Te la entrego y te enseño a moverla: subir una foto, cambiar un precio.",
        en: "I hand it over and teach you to run it: upload a photo, change a price.",
      },
    },
  ] as readonly { etiqueta: Texto; texto: Texto }[],
  plazoNota: {
    es: "Una página web, en 5 días desde que llega el material.",
    en: "A website, in 5 days from when the material arrives.",
  },

  faqTitulo: {
    es: "Lo que me preguntan los salones y los spas",
    en: "What salons and spas ask me",
  },
  cierre: {
    titulo: {
      es: "Cuéntame cómo llevas la agenda hoy",
      en: "Tell me how you keep the diary today",
    },
    cuerpo: {
      es: "Con eso ya sé si necesitas una página, un chatbot que agende, o nada de esto todavía. Si es lo último, te lo digo igual.",
      en: "With that I already know whether you need a site, a chatbot that books, or none of this yet. If it's the last one, I'll say so anyway.",
    },
    otro: { es: "Ver el chatbot de WhatsApp", en: "See the WhatsApp chatbot" },
  },
} as const;

/**
 * LAS SIETE PREGUNTAS DEL OFICIO
 * `{citas}` lo sustituye el componente con el precio de `lib/quote.ts`.
 */
export const SALONES_FAQ: readonly {
  q: Texto;
  a: Texto;
  enlace?: { texto: Texto; href: Traducido<string> };
}[] = [
  {
    q: {
      es: "¿Pongo los precios en la página o mejor no?",
      en: "Should I put prices on the site or not?",
    },
    a: {
      es: "Ponlos. El que pregunta el precio por mensaje y no lo recibe, se va. Si depende del largo o de la técnica, va el rango: «color desde X, según largo y si hay decoloración». Lo que espanta no es el precio, es tener que pedirlo.",
      en: "Put them. Whoever asks the price by message and doesn't get it, leaves. If it depends on length or technique, the range goes in: “colour from X, depending on length and whether there's bleaching”. What scares people off isn't the price, it's having to ask for it.",
    },
  },
  {
    q: {
      es: "Vivo del Instagram y me va bien. ¿Para qué quiero página?",
      en: "I live off Instagram and it's going well. Why would I want a site?",
    },
    a: {
      es: "No compiten. Instagram te muestra a quien no te conocía; la página te encuentra el que ya te está buscando por el nombre, el que te recomendaron y el que a las once de la noche averigua dónde le hacen las uñas mañana.",
      en: "They don't compete. Instagram shows you to people who didn't know you; the site is found by whoever is already searching your name, whoever was given your name, and whoever at eleven at night is working out where to get their nails done tomorrow.",
    },
    enlace: {
      texto: { es: "¿Página web o solo Instagram?", en: "Website or just Instagram?" },
      href: { es: "/blog/pagina-web-o-solo-instagram", en: "/en/blog/website-or-just-instagram" },
    },
  },
  {
    q: {
      es: "¿Puedo tener reserva en línea de verdad, conectada a la agenda?",
      en: "Can I have real online booking, connected to the diary?",
    },
    a: {
      es: "Se puede, pero antes te pregunto cómo llevas la agenda hoy: si la llevan cuatro personas en un cuaderno, un sistema en línea no arregla el desorden, lo publica. Casi siempre funciona primero la página que manda al chat con el servicio escogido; y cuando el volumen lo pide, un chatbot que agenda y recuerda, desde {citas}.",
      en: "You can, but first I ask how you keep the diary today: if four people keep it in a notebook, an online system doesn't fix the mess, it publishes it. What usually works first is the site sending people to the chat with the service already picked; and when the volume calls for it, a chatbot that books and reminds, from {citas}.",
    },
  },
  {
    q: {
      es: "Me cambian los precios cada tanto. ¿Toca llamarte cada vez?",
      en: "My prices change now and then. Do I have to call you every time?",
    },
    a: {
      es: "No. La carta de servicios te queda editable y te enseño a moverla el día de la entrega. Cobrarte por cada cambio de precio sería un mal negocio para los dos.",
      en: "No. The service list is editable and I teach you to change it on handover day. Charging you for every price change would be a bad deal for both of us.",
    },
  },
  {
    q: { es: "¿La página me quita los plantones?", en: "Will the site stop no-shows?" },
    a: {
      es: "Ella sola, no. Lo muerden tres cosas juntas: las reglas escritas donde el cliente las vea, el recordatorio el día antes y un anticipo cuando el servicio es largo. La página pone lo primero; el recordatorio lo hace el chatbot de citas.",
      en: "On its own, no. Three things together bite into them: the rules written where the client can see them, the reminder the day before, and a deposit when the service is long. The site does the first; the reminder is the booking chatbot's job.",
    },
  },
  {
    q: {
      es: "Trabajo sola, alquilo silla o atiendo en casa. ¿Igual me sirve?",
      en: "I work alone, rent a chair or work from home. Is it still for me?",
    },
    a: {
      es: "Igual, y a veces más: cuando no tienes local con letrero, la página es tu fachada. No hay que tener quince sillas para merecer una página seria.",
      en: "Just the same, and sometimes more: when you don't have a shopfront with a sign, the site is your shopfront. You don't need fifteen chairs to deserve a serious website.",
    },
  },
  {
    q: {
      es: "¿Me pones de primero en Google cuando busquen «peluquería en Barranquilla»?",
      en: "Will you put me first on Google when they search “hairdresser in Barranquilla”?",
    },
    a: {
      es: "No te lo prometo, y desconfía del que te lo prometa. Los primeros movimientos se ven entre el mes 3 y el mes 6. Y antes de gastar en eso hay algo gratis que pesa más: la ficha de Google Business, con fotos de verdad y reseñas de tus clientas.",
      en: "I don't promise it, and be wary of anyone who does. The first movement shows between month 3 and month 6. And before spending on that there's something free that counts for more: the Google Business profile, with real photos and reviews from your clients.",
    },
  },
];
