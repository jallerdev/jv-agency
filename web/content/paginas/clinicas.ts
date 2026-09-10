import type { Texto, Traducido } from "@/content/types";

/**
 * CLÍNICAS Y CONSULTORIOS, EN LAS DOS LENGUAS
 * ──────────────────────────────────────────────────────────────────────────
 * QUÉ SOSTIENE ESTA PÁGINA: Animal Expert y Fta. Elka Gómez, dos sitios
 * completos construidos por iniciativa propia, y Hummik, producto propio. Es
 * material honesto pero MODESTO, y la página lo dice en voz alta con una
 * casilla vacía declarada en la propia vitrina. Nadie diseña un hueco en su
 * portafolio, y por eso es lo más creíble de la sección. NO SE QUITA.
 *
 * HAY UN SITIO DE SALUD TERMINADO QUE NO SE NOMBRA AQUÍ, porque falta
 * verificar su habilitación en el REPS. Se menciona la REGLA sin nombrar el
 * proyecto ni su especialidad. Si algún día la verificación se hace, ese caso
 * entra y esta página mejora sola.
 *
 * LO QUE NO SE PUEDE ROMPER:
 * · Animal Expert y Elka Gómez son PROYECTOS DE ESTUDIO, no clientes.
 * · Nada de promesas de resultado en salud, ni propias ni sugeridas.
 * · De normas se cita solo lo sostenible: la Ley 1581 de 2012 y su trato
 *   reforzado de los datos de salud como sensibles, y la existencia del REPS.
 *   Ninguna resolución de publicidad sanitaria: no está verificada.
 * · El bloque local NO promete el primer puesto: promete entrar en la lista.
 */
export const CLINICAS = {
  badge: { es: "Salud y consulta", en: "Health and practice" },
  titulo: {
    es: "Páginas web para clínicas y consultorios",
    en: "Websites for clinics and practices",
  },
  tituloAcento: {
    es: "donde el paciente decide antes de llamar",
    en: "where the patient decides before calling",
  },
  entradilla1: {
    es: "Busca tu nombre y quiere ver qué atiendes, cuánto dura la cita y dónde quedas. Si eso no está en ninguna parte, le escribe al que sí lo puso.",
    en: "They search your name and want to see what you treat, how long the appointment takes and where you are. If that isn't anywhere, they write to whoever did put it up.",
  },
  entradilla2Antes: {
    es: "La diseño y la programo yo, desde Turbaco, Bolívar. Una página web desde ",
    en: "I design it and I code it, from Turbaco, Bolívar. A website from ",
  },
  entradilla2Medio: { es: ", entregada en ", en: ", delivered in " },
  entradilla2Dias: { es: "5 días", en: "5 days" },
  ctaPrincipal: { es: "Agenda una llamada", en: "Book a call" },
  ctaSecundario: { es: "Ver los precios", en: "See the prices" },

  necesitaTitulo: {
    es: "Qué tiene que resolver la página de un consultorio",
    en: "What a practice's website has to solve",
  },
  necesitaEntradilla: {
    es: "Seis cosas concretas, y ninguna es «transmitir confianza». La confianza es el resultado de que estén las seis.",
    en: "Six concrete things, and none of them is «conveying trust». Trust is the result of the six being there.",
  },
  necesita: [
    {
      icono: "persona",
      titulo: {
        es: "El nombre del profesional, no solo el de la clínica",
        en: "The professional's name, not just the clinic's",
      },
      cuerpo: {
        es: "Nombre completo, especialidad, años de ejercicio y registro profesional. Un logo bonito sin una sola persona detrás manda al paciente a seguir buscando.",
        en: "Full name, specialty, years in practice and professional registration. A pretty logo with not one person behind it sends the patient off to keep looking.",
      },
    },
    {
      icono: "lista",
      titulo: {
        es: "Los servicios dichos como los dice el paciente",
        en: "Services named the way the patient names them",
      },
      cuerpo: {
        es: "Nadie busca «terapia física de miembro inferior»: busca «dolor de rodilla». La página se escribe en el idioma del que tiene el problema, con el nombre técnico detrás y no al revés.",
        en: "Nobody searches for «lower-limb physical therapy»: they search for «knee pain». The page is written in the language of whoever has the problem, with the technical name behind it and not the other way round.",
      },
    },
    {
      icono: "cita",
      titulo: { es: "Pedir la cita sin tener que llamar", en: "Booking without having to call" },
      cuerpo: {
        es: "El que a las once de la noche busca quién le vea un dolor no espera a mañana: le escribe al que le contestó. Que la página diga qué se agenda, cuánto dura y con quién.",
        en: "Whoever at eleven at night is looking for someone to see a pain doesn't wait for tomorrow: they write to whoever answered. Let the page say what can be booked, how long it takes and with whom.",
      },
      enlace: {
        texto: { es: "Chatbot que agenda citas", en: "A chatbot that books appointments" },
        href: { es: "/servicios/chatbot-whatsapp", en: "/en/services/whatsapp-chatbot" },
      },
    },
    {
      icono: "check",
      titulo: { es: "Cómo se prepara la cita", en: "How to prepare for the appointment" },
      cuerpo: {
        es: "En ayunas o no, traer exámenes, venir acompañado, qué documento. Cada llamada que recibes por eso es una interrupción que la página podía evitar.",
        en: "Fasting or not, bring test results, come with someone, which document. Every call you get about that is an interruption the site could have prevented.",
      },
    },
    {
      icono: "mapa",
      titulo: {
        es: "Sedes, horario y si atiendes particular o por convenio",
        en: "Locations, hours and whether you take private or insured patients",
      },
      cuerpo: {
        es: "Dirección con punto de referencia, horario real —sábados incluidos— y si atiendes particular, prepagada o convenio. Lo que no digas te lo preguntan por chat, y esa conversación no la cobras.",
        en: "Address with a landmark, real hours —Saturdays included— and whether you take private, prepaid or insured patients. Whatever you don't say gets asked over chat, and you don't bill that conversation.",
      },
    },
    {
      icono: "candado",
      titulo: {
        es: "Los datos de un paciente no son datos cualquiera",
        en: "A patient's data isn't just any data",
      },
      cuerpo: {
        es: "La Ley 1581 de 2012 trata los datos de salud como sensibles: no se recogen sin autorización. En tu página eso es un formulario que pide lo mínimo para llamarte —no el motivo de consulta— y una política de datos que existe de verdad.",
        en: "Colombia's Law 1581 of 2012 treats health data as sensitive: it isn't collected without consent. On your site that means a form asking for the minimum needed to call you —not the reason for the visit— and a data policy that actually exists.",
      },
    },
  ] as readonly {
    icono: string;
    titulo: Texto;
    cuerpo: Texto;
    enlace?: { texto: Texto; href: Traducido<string> };
  }[],

  noEscriboTitulo: {
    es: "Lo que no voy a escribir en tu página,",
    en: "What I won't write on your site,",
  },
  noEscriboAcento: { es: "aunque me lo pidas", en: "even if you ask me to" },
  noEscribo: {
    es: [
      "Promesas de resultado. Ni «resultados garantizados», ni «sin dolor», ni «recuperación en X días».",
      "Servicios que no correspondan a lo que tienes habilitado. Si no está a tu nombre en el REPS, no va en la página.",
      "Fotos ni testimonios de pacientes sin su autorización escrita. Son datos sensibles y se tratan como tales.",
      "Comparaciones con otros profesionales o clínicas. No hace falta bajar a nadie para explicar por qué te buscan a ti.",
    ],
    en: [
      "Promises of results. Not «guaranteed results», not «pain-free», not «recovery in X days».",
      "Services that don't match what you're licensed for. If it isn't in your name on the REPS register, it doesn't go on the site.",
      "Photos or testimonials from patients without their written consent. That's sensitive data and it gets treated as such.",
      "Comparisons with other professionals or clinics. You don't need to put anyone down to explain why people come to you.",
    ],
  } as Traducido<readonly string[]>,
  noEscriboCierreAntes: {
    es: "Y lo aplico conmigo mismo: tengo un sitio de salud terminado que ",
    en: "And I apply it to myself: I have a finished healthcare site that ",
  },
  noEscriboCierreFuerte: {
    es: "no está publicado en mi portafolio",
    en: "isn't published in my portfolio",
  },
  noEscriboCierreDespues: {
    es: " porque falta verificar la habilitación. Es incómodo tener una vitrina con un hueco; es peor mostrar algo que no se puede sostener.",
    en: " because its licensing still needs verifying. It's uncomfortable to have a shop window with a gap; it's worse to show something you can't stand behind.",
  },

  trabajoBadge: { es: "Lo que hay hecho", en: "What's been built" },
  trabajoTitulo: {
    es: "El trabajo de este sector que tengo, dicho como es",
    en: "The work I have in this sector, said as it is",
  },
  trabajoEntradilla: {
    es: "Los dos primeros son proyectos de estudio: los construí completos por iniciativa propia y nadie me los encargó. No son clientes y no te los vendo como tales.",
    en: "The first two are studio projects: I built them in full on my own initiative and nobody commissioned them. They aren't clients and I'm not selling them to you as such.",
  },
  trabajo: [
    {
      imagen: "/work/animal-expert.webp",
      etiqueta: { es: "Proyecto de estudio · Turbaco", en: "Studio project · Turbaco" },
      nombre: "Animal Expert",
      cuerpo: {
        es: "Consulta especializada, cirugía, rayos X, fisioterapia y vacunación, con agenda en línea. Una clínica con todos sus problemas de página, con pacientes de cuatro patas. Sin dominio conectado todavía.",
        en: "Specialist consultation, surgery, X-ray, physiotherapy and vaccination, with online booking. A clinic with every website problem a clinic has, with four-legged patients. No domain connected yet.",
      },
      alt: {
        es: "Animal Expert: captura del sitio que diseñé y construí",
        en: "Animal Expert: a screenshot of the site I designed and built",
      },
    },
    {
      imagen: "/work/elka-spa.webp",
      etiqueta: { es: "Proyecto de estudio · Cartagena", en: "Studio project · Cartagena" },
      nombre: "Fta. Elka Gómez",
      cuerpo: {
        es: "Más de 30 años tratando el dolor: rehabilitación, masaje y spa. Un consultorio y un spa en el mismo negocio obligan a separar dos públicos: el que llega con una lesión y el que llega a desconectarse.",
        en: "Over 30 years treating pain: rehabilitation, massage and spa. A practice and a spa in the same business force you to separate two audiences: whoever arrives with an injury and whoever arrives to switch off.",
      },
      alt: {
        es: "Fta. Elka Gómez: captura del sitio que diseñé y construí",
        en: "Fta. Elka Gómez: a screenshot of the site I designed and built",
      },
      enlace: {
        texto: { es: "El lado de spa, en su propia página", en: "The spa side, on its own page" },
        href: { es: "/sectores/salones-y-spas", en: "/en/industries/salons-and-spas" },
      },
    },
    {
      imagen: "/work/hummik.webp",
      destacada: true,
      etiqueta: { es: "Producto propio · en línea", en: "Own product · live" },
      nombre: "Hummik",
      cuerpo: {
        es: "Agenda de citas por WhatsApp: el paciente reserva desde el chat, la cita cae sola en el calendario y salen recordatorios contra los que no llegan. Es mío y está publicado: lo puedes abrir y probarlo.",
        en: "A WhatsApp appointment book: the patient books from the chat, the appointment lands in the calendar on its own and reminders go out against no-shows. It's mine and it's published: you can open it and try it.",
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
  /* El hueco declarado. Va del mismo alto que las otras tres tarjetas: es lo
     más creíble de la sección y no se quita. */
  casilla: {
    rotulo: { es: "Lo que no tengo", en: "What I don't have" },
    cuerpo: {
      es: "Todavía no tengo una clínica de varias sedes ni una historia clínica conectada. Si tu proyecto es más grande, te lo digo de frente en la llamada: prefiero perder el trabajo a inventarme un caso.",
      en: "I don't yet have a multi-site clinic or a connected clinical record system. If your project is bigger, I'll tell you straight on the call: I'd rather lose the work than invent a case study.",
    },
  },
  portafolioAntes: { es: "Lo demás está en ", en: "The rest is in " },
  portafolioEnlace: { es: "el portafolio completo", en: "the full portfolio" },
  portafolioDespues: {
    es: ", separado igual: producción con dominio propio y lo que construí por mi cuenta.",
    en: ", separated the same way: production with its own domain, and what I built on my own.",
  },

  preciosBadge: { es: "Precios", en: "Pricing" },
  preciosTitulo: {
    es: "Lo que cuesta, dicho antes de que preguntes",
    en: "What it costs, said before you ask",
  },
  preciosEntradilla: {
    es: "Precios de partida reales. De ahí para arriba según lo que necesites, y te lo digo antes de empezar, no en la factura.",
    en: "Real starting prices. Up from there according to what you need, and I tell you before starting, not on the invoice.",
  },
  verDetalle: { es: "Ver el detalle", en: "See the detail" },
  desde: { es: "desde", en: "from" },
  segunAlcance: { es: "Según el alcance", en: "Depends on scope" },
  precios: [
    {
      clave: "web",
      titulo: { es: "Página web del consultorio", en: "The practice's website" },
      plazo: { es: "5 días", en: "5 days" },
      cuerpo: {
        es: "Quién eres y qué atiendes, preparación de la cita, sede con mapa, horario y WhatsApp a la vista.",
        en: "Who you are and what you treat, how to prepare for the appointment, location with a map, hours and WhatsApp on show.",
      },
      href: { es: "/servicios/diseno-de-paginas-web", en: "/en/services/web-design" },
    },
    {
      clave: "citas",
      titulo: { es: "Chatbot que agenda citas", en: "A chatbot that books appointments" },
      plazo: { es: "de 2 a 5 semanas", en: "2 to 5 weeks" },
      cuerpo: {
        es: "Tu número muestra disponibilidad, agenda, confirma y recuerda la cita el día anterior. El recordatorio es lo que le baja el filo al que no llega.",
        en: "Your number shows availability, books, confirms and reminds the day before. The reminder is what takes the edge off no-shows.",
      },
      href: { es: "/servicios/chatbot-whatsapp", en: "/en/services/whatsapp-chatbot" },
    },
    {
      clave: "software",
      titulo: { es: "Software a la medida", en: "Custom software" },
      plazo: { es: "se define al cotizar", en: "defined when quoting" },
      cuerpo: {
        es: "Cuando el problema ya no es la página sino el proceso: agenda con varios profesionales, sedes, historias clínicas.",
        en: "When the problem is no longer the site but the process: scheduling several professionals, locations, clinical records.",
      },
      href: { es: "/servicios/software-a-la-medida", en: "/en/services/custom-software" },
    },
    {
      clave: "auditoria",
      titulo: { es: "Auditoría SEO", en: "SEO audit" },
      plazo: { es: "5 días", en: "5 days" },
      cuerpo: {
        es: "Ya tienes página y no apareces por tu especialidad más tu ciudad. Te digo por qué y qué se arregla primero.",
        en: "You already have a site and you don't show up for your specialty plus your city. I tell you why and what gets fixed first.",
      },
      href: { es: "/servicios/posicionamiento-seo", en: "/en/services/seo" },
    },
    {
      clave: "seoMes",
      titulo: { es: "SEO local, mensual", en: "Local SEO, monthly" },
      plazo: { es: "trabajo continuo", en: "ongoing work" },
      cuerpo: {
        es: "Aparecer en «odontólogo en Cartagena» o «fisioterapia en Turbaco»: tu especialidad con el nombre de tu ciudad al lado.",
        en: "Showing up for «dentist in Cartagena» or «physiotherapy in Turbaco»: your specialty with your city's name next to it.",
      },
      href: { es: "/servicios/posicionamiento-seo", en: "/en/services/seo" },
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
    es: " y cubre el dominio, el alojamiento y que la página siga en pie. Va acá y no en una nota al pie, porque es el costo que a todo el mundo le aparece de sorpresa al año siguiente.",
    en: " and covers the domain, the hosting and keeping the site standing. It goes here and not in a footnote, because it's the cost that surprises everyone the following year.",
  },
  posicionamientoAntes: {
    es: "Y en posicionamiento, los primeros movimientos se ven ",
    en: "And in SEO, the first movement shows ",
  },
  posicionamientoFuerte: {
    es: "entre el mes 3 y el mes 6",
    en: "between month 3 and month 6",
  },
  posicionamientoDespues: {
    es: ". Nadie te puede prometer el primer puesto en Google, ni yo tampoco.",
    en: ". Nobody can promise you first place on Google, and neither can I.",
  },

  fichaTitulo: {
    es: "Antes de pagar posicionamiento: la ficha",
    en: "Before paying for SEO: the profile",
  },
  fichaEntradilla: {
    es: "El bloque de tres que sale arriba del mapa se alimenta de una ficha bien llena, y llenarla es gratis.",
    en: "The block of three that shows above the map feeds on a well-filled profile, and filling it is free.",
  },
  fichaTituloCaja: { es: "Ficha de Google Business", en: "Google Business Profile" },
  fichaRotulo: {
    es: "Ejemplo · campos genéricos, no los de ningún negocio",
    en: "Example · generic fields, not any real business's",
  },
  fichaPorLlenar: { es: "Por llenar", en: "To fill in" },
  fichaCampos: [
    {
      etiqueta: { es: "Nombre", en: "Name" },
      valor: { es: "El nombre con el que te buscan", en: "The name people search for you by" },
    },
    {
      etiqueta: { es: "Categoría", en: "Category" },
      valor: {
        es: "Tu especialidad, y las secundarias",
        en: "Your specialty, and the secondary ones",
      },
    },
    {
      etiqueta: { es: "Dirección", en: "Address" },
      valor: {
        es: "La sede, con punto de referencia",
        en: "The location, with a landmark",
      },
    },
    {
      etiqueta: { es: "Horario", en: "Hours" },
      valor: {
        es: "Tu horario real, sábados incluidos",
        en: "Your real hours, Saturdays included",
      },
    },
    {
      etiqueta: { es: "Teléfono", en: "Phone" },
      valor: {
        es: "El WhatsApp por el que sí contestas",
        en: "The WhatsApp you actually answer",
      },
    },
    {
      etiqueta: { es: "Servicios", en: "Services" },
      valor: { es: "Lo que atiendes, uno por uno", en: "What you treat, one by one" },
    },
    {
      etiqueta: { es: "Fotos", en: "Photos" },
      valor: {
        es: "Fachada, sala de espera y consultorio",
        en: "Front, waiting room and consulting room",
      },
    },
    { etiqueta: { es: "Reseñas", en: "Reviews" } },
    { etiqueta: { es: "Preguntas frecuentes", en: "Frequently asked questions" } },
  ] as readonly { etiqueta: Texto; valor?: Texto }[],
  consultaEjemplo: { es: "odontólogo en Cartagena", en: "dentist in Cartagena" },
  tuNegocio: { es: "Tu consultorio", en: "Your practice" },

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
        "Tu nombre completo, especialidad y número de registro profesional",
        "Los servicios que atiendes, con el nombre técnico y el nombre común",
        "Qué debe hacer el paciente antes de la cita, servicio por servicio",
        "Dirección de cada sede, punto de referencia y horario real",
        "Si atiendes particular, prepagada o por convenio",
        "Tu política de tratamiento de datos, si ya la tienes escrita",
        "Accesos al dominio y al correo, si ya los tienes",
      ],
      en: [
        "Your full name, specialty and professional registration number",
        "The services you offer, with the technical name and the common name",
        "What the patient should do before the appointment, service by service",
        "The address of each location, a landmark and real opening hours",
        "Whether you take private, prepaid or insured patients",
        "Your data-processing policy, if you already have it written",
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
        es: "Hablamos por WhatsApp: qué atiendes, cómo llevas la agenda y qué te preguntan siempre.",
        en: "We talk on WhatsApp: what you treat, how you keep the diary and what people always ask you.",
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
        es: "Te la entrego y te enseño a moverla: un horario, un servicio, una preparación.",
        en: "I hand it over and teach you to run it: an opening time, a service, a preparation note.",
      },
    },
  ] as readonly { etiqueta: Texto; texto: Texto }[],
  plazoNota: {
    es: "Una página web, en 5 días desde que llega el material.",
    en: "A website, in 5 days from when the material arrives.",
  },

  faqTitulo: {
    es: "Lo que me preguntan los consultorios",
    en: "What practices ask me",
  },
  cierre: {
    titulo: {
      es: "Cuéntame qué te preguntan antes de cada cita",
      en: "Tell me what people ask you before every appointment",
    },
    cuerpo: {
      es: "Con esa lista ya sé qué tiene que decir tu página y si además te conviene un chatbot que agende. Si no te conviene ninguno de los dos, también te lo digo.",
      en: "With that list I already know what your site has to say and whether a booking chatbot suits you too. If neither suits you, I'll say that as well.",
    },
    otro: { es: "Ver el chatbot de WhatsApp", en: "See the WhatsApp chatbot" },
  },
} as const;

/**
 * LAS SIETE PREGUNTAS DEL SECTOR
 * `{citas}`, `{web}` y `{auditoria}` los sustituye el componente.
 */
export const CLINICAS_FAQ: readonly { q: Texto; a: Texto }[] = [
  {
    q: {
      es: "¿Puedo poner fotos de antes y después de mis pacientes?",
      en: "Can I put before-and-after photos of my patients?",
    },
    a: {
      es: "Solo con la autorización escrita de esa persona: la cara y el cuerpo de un paciente en un procedimiento son datos sensibles bajo la Ley 1581 de 2012. Sin autorización firmada, la foto no entra. Y aunque la tengas, no se acompaña de una promesa de resultado.",
      en: "Only with that person's written consent: a patient's face and body in a procedure are sensitive data under Colombia's Law 1581 of 2012. Without signed consent, the photo doesn't go in. And even with it, it isn't paired with a promise of results.",
    },
  },
  {
    q: {
      es: "¿La página puede guardar la historia clínica?",
      en: "Can the site store clinical records?",
    },
    a: {
      es: "No, y no debería: una página pública no es el lugar de una historia clínica. Si necesitas historias, agenda de varios profesionales o sedes, eso es software a la medida. Te digo cuál de los dos necesitas antes de cobrarte el equivocado.",
      en: "No, and it shouldn't: a public website is not the place for clinical records. If you need records, scheduling across several professionals or locations, that's custom software. I tell you which of the two you need before charging you for the wrong one.",
    },
  },
  {
    q: {
      es: "¿Agenda en línea de verdad o mejor WhatsApp?",
      en: "Real online booking, or better over WhatsApp?",
    },
    a: {
      es: "Depende de cómo llevas la agenda hoy. Si hoy la maneja una persona en una libreta, publicar una agenda en línea no arregla el desorden: lo expone. Casi siempre conviene empezar por la página que manda al chat con el servicio ya escogido, y de ahí subir a un chatbot que agenda y recuerda, desde {citas}.",
      en: "It depends how you keep the diary today. If one person keeps it in a notebook, publishing an online diary doesn't fix the mess: it exposes it. It usually pays to start with the site sending people to the chat with the service already picked, and from there move up to a chatbot that books and reminds, from {citas}.",
    },
  },
  {
    q: {
      es: "Soy un solo profesional, con consultorio alquilado. ¿Me sirve?",
      en: "I'm a single practitioner, renting a room. Is it for me?",
    },
    a: {
      es: "Sí, y suele ser donde más se nota: cuando no tienes clínica con letrero, la página es lo que le confirma al paciente que existes y dónde estás. Desde {web} y en 5 días.",
      en: "Yes, and it's usually where it shows most: when you don't have a clinic with a sign, the site is what confirms to the patient that you exist and where you are. From {web} and in 5 days.",
    },
  },
  {
    q: {
      es: "Soy odontólogo, veterinaria o fisioterapeuta. ¿Esta página es para mí?",
      en: "I'm a dentist, a vet or a physiotherapist. Is this page for me?",
    },
    a: {
      es: "Sí. Cambia la especialidad, no el trabajo: quién atiende, qué se atiende, cómo se pide la cita, cómo se prepara y cómo se tratan los datos. Los dos que tengo hechos son un centro médico veterinario y un consultorio de fisioterapia.",
      en: "Yes. The specialty changes, the work doesn't: who treats, what's treated, how the appointment is booked, how to prepare and how the data is handled. The two I've built are a veterinary medical centre and a physiotherapy practice.",
    },
  },
  {
    q: {
      es: "¿Me pones de primero en Google cuando busquen mi especialidad en mi ciudad?",
      en: "Will you put me first on Google when they search my specialty in my city?",
    },
    a: {
      es: "No te lo prometo, y desconfía del que te lo prometa. Los primeros movimientos se ven entre el mes 3 y el mes 6. El trabajo es entrar en la lista, como lo dibuja el bloque de arriba.",
      en: "I don't promise it, and be wary of anyone who does. The first movement shows between month 3 and month 6. The work is getting into the list, as the block above draws it.",
    },
  },
  {
    q: {
      es: "Ya me hicieron una página y no aparece por ningún lado. ¿La rehacemos?",
      en: "Someone already built me a site and it doesn't show up anywhere. Do we redo it?",
    },
    a: {
      es: "Primero la reviso. Muchas veces no hay que rehacer nada: en ninguna parte dice la ciudad, nunca se le avisó a Google y no hay una sola reseña. La auditoría cuesta desde {auditoria} y en 5 días te digo qué tiene. Si conviene rehacerla te lo digo, y si no, también.",
      en: "First I review it. Often nothing needs redoing: the city isn't mentioned anywhere, Google was never told about it and there isn't a single review. The audit costs from {auditoria} and in 5 days I tell you what it has. If it's worth redoing I'll say so, and if it isn't, I'll say that too.",
    },
  },
];
