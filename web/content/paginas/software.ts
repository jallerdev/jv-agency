import type { Texto, Traducido } from "@/content/types";

/**
 * SOFTWARE A LA MEDIDA, EN LAS DOS LENGUAS
 * ──────────────────────────────────────────────────────────────────────────
 * POR QUÉ «A LA MEDIDA» Y NO «A MEDIDA»: las dos formas conviven en el mercado
 * colombiano. El h1 y la ruta usan «a la medida», que es el uso local, y «a
 * medida» suelto aparece una vez en el cuerpo para no perder a quien lo
 * escribe así. En inglés el término es uno: «custom software».
 *
 * UNA SOLA PÁGINA, NO UNA POR SINÓNIMO. Los casos de uso —inventario,
 * reservas, agenda, sedes, CRM— son SECCIONES, no páginas: una por cada uno
 * sería una doorway page.
 *
 * LO QUE NO SE PUEDE ROMPER:
 * · No hay PRECIO publicado: `lib/quote.ts` no cotiza esta línea y lo que se
 *   cobra sigue siendo «según alcance». Lo único autorizado es el PISO —
 *   `PISOS.software`—, que Luis fijó en $2.000.000 porque hasta el encargo más
 *   pequeño arranca con diseño de base de datos, accesos y despliegue. Es un
 *   «desde», no una tarifa: ningún otro número se inventa, tampoco en el
 *   JSON-LD.
 * · HalcónOS y Hummik son PRODUCTO PROPIO, no encargos de cliente, y se
 *   nombran con esas palabras exactas.
 * · No se promete app nativa para Android ni iOS: son apps web.
 */
export const SOFTWARE = {
  badge: { es: "Software a la medida", en: "Custom software" },
  titulo: { es: "Software a la medida", en: "Custom software" },
  tituloAcento: {
    es: "para el proceso que te come el día",
    en: "for the process that eats your day",
  },
  entradilla: {
    es: "Hay un momento en que el negocio deja de crecer por lo que vende y se frena por dentro: el Excel que solo entiende una persona, los pedidos en un cuaderno, tres chats que nadie sabe quién atiende. Eso no se arregla con otra herramienta más.",
    en: "There's a point where the business stops growing because of what it sells and starts jamming from the inside: the spreadsheet only one person understands, the orders in a notebook, three chats nobody knows who handles. Another tool doesn't fix that.",
  },
  ctaPrincipal: { es: "Agenda una llamada", en: "Book a call" },
  ctaSecundario: { es: "Cómo se cotiza", en: "How it's quoted" },

  /* Va arriba a propósito. Es la confusión que más plata cuesta de los dos
     lados: el que quería una web y le venden un sistema, y el que necesitaba
     un sistema y se conforma con una web. */
  calificar: {
    tituloAntes: { es: "Antes de nada:", en: "First things first:" },
    tituloAcento: {
      es: "¿necesitas software o te sirve una página web?",
      en: "do you need software or will a website do?",
    },
    entradilla: {
      es: "Mucha gente escribe «software» cuando quiere una página web, y contratar lo equivocado cuesta caro en las dos direcciones. La regla que uso es esta:",
      en: "Plenty of people write “software” when they want a website, and hiring the wrong one is expensive in both directions. The rule I use is this:",
    },
    afueraTitulo: { es: "Si el problema está afuera", en: "If the problem is outside" },
    afueraAntes: {
      es: "No te conocen, no te encuentran en Google, o lo que hay de ti en internet no está a la altura de lo que vendes. Eso es una ",
      en: "Nobody knows you, nobody finds you on Google, or what's out there about you isn't up to what you sell. That's a ",
    },
    afueraFuerte: { es: "página web", en: "website" },
    afueraDespues: {
      es: ": desde {piso} y lista en 5 días.",
      en: ": from {piso} and ready in 5 days.",
    },
    afueraEnlace: { es: "Ver precios de páginas web", en: "See website pricing" },
    adentroTitulo: { es: "Si el problema está adentro", en: "If the problem is inside" },
    adentroAntes: {
      es: "Te escriben y vendes, pero por dentro el proceso no da abasto: inventario que no cuadra, agenda que se choca, sedes que no ven lo mismo. Eso sí es ",
      en: "People write to you and you sell, but inside the process can't keep up: inventory that doesn't add up, a diary that double-books, branches that don't see the same thing. That is ",
    },
    adentroFuerte: { es: "software a la medida", en: "custom software" },
    adentroDespues: { es: ".", en: "." },
    cierreAntes: {
      es: "Y si lo que quieres es que WhatsApp conteste y agende solo, eso es más barato que un sistema: ",
      en: "And if what you want is for WhatsApp to answer and book on its own, that's cheaper than a system: ",
    },
    cierreEnlace: { es: "chatbot de WhatsApp", en: "WhatsApp chatbot" },
    cierreDespues: {
      es: ". Primero la web, después el chatbot y solo entonces el sistema: en ese orden sale más barato, y así lo recomiendo.",
      en: ". The site first, then the chatbot and only then the system: in that order it's cheaper, and that's how I recommend it.",
    },
  },

  paraQuienTitulo: {
    es: "Cuándo se contrata esto de verdad",
    en: "When people actually hire this",
  },
  paraQuienEntradilla: {
    es: "Nadie se levanta queriendo comprar software. Se llega por una de estas seis, y casi siempre después de aguantarla de más.",
    en: "Nobody wakes up wanting to buy software. People get here through one of these six, and almost always after putting up with it too long.",
  },
  paraQuien: [
    {
      titulo: { es: "El Excel ya no da más", en: "The spreadsheet can't take any more" },
      cuerpo: {
        es: "Fórmulas que nadie se atreve a tocar y una copia distinta en cada computador. Funciona hasta el día que esa persona sale a vacaciones.",
        en: "Formulas nobody dares touch and a different copy on every computer. It works until the day that person goes on holiday.",
      },
    },
    {
      titulo: {
        es: "El inventario real no coincide con el del papel",
        en: "Real stock doesn't match what's on paper",
      },
      cuerpo: {
        es: "Vendes lo que no tienes, o tienes parado lo que creías vendido. Un inventario que descuenta solo al facturar acaba con la discusión de quién anotó mal.",
        en: "You sell what you don't have, or you're sitting on what you thought you'd sold. Inventory that discounts itself when you invoice ends the argument about who wrote it down wrong.",
      },
    },
    {
      titulo: {
        es: "Agendas a varias personas a la vez",
        en: "You book several people at once",
      },
      cuerpo: {
        es: "Con tres o cuatro profesionales de horarios distintos, la agenda deja de ser una libreta y pasa a ser un problema de software.",
        en: "With three or four professionals on different schedules, the diary stops being a notebook and becomes a software problem.",
      },
    },
    {
      titulo: {
        es: "Tienes dos o tres sedes y ninguna ve lo mismo",
        en: "You have two or three branches and none sees the same thing",
      },
      cuerpo: {
        es: "Cada punto lleva sus números como puede y consolidarlos es el trabajo del domingo. De los procesos que más rápido se pagan solos.",
        en: "Each site keeps its numbers however it can and consolidating them is Sunday's job. One of the processes that pays for itself fastest.",
      },
    },
    {
      titulo: {
        es: "Pagas cinco herramientas que no se hablan",
        en: "You pay for five tools that don't talk to each other",
      },
      cuerpo: {
        es: "Una para facturar, otra para el chat, otra para la agenda, y el puente eres tú copiando y pegando. Ahí no falta otra herramienta: faltan integraciones.",
        en: "One to invoice, another for chat, another for the diary, and the bridge is you copying and pasting. What's missing there isn't another tool: it's integrations.",
      },
    },
    {
      titulo: {
        es: "Tienes una idea de producto y quieres salir con lo mínimo",
        en: "You have a product idea and want to launch with the minimum",
      },
      cuerpo: {
        es: "No necesitas la plataforma completa para saber si alguien la usa: necesitas la parte más chica que ya sirva —un MVP— en línea, y decidir con datos.",
        en: "You don't need the whole platform to find out whether anyone uses it: you need the smallest part that's already useful —an MVP— live, and then decide with data.",
      },
    },
  ] as readonly { titulo: Texto; cuerpo: Texto }[],

  construyoTitulo: { es: "Qué construyo, en concreto", en: "What I build, concretely" },
  construyoEntradilla: {
    es: "No son productos de catálogo: son las formas que más se repiten, y casi todo proyecto es dos o tres de estas juntas. Lo busques como software a medida o como «un programa para mi negocio», es esto.",
    en: "They aren't catalogue products: they're the shapes that repeat most, and almost every project is two or three of them together. Whether you look for it as custom software or as “a program for my business”, this is it.",
  },
  panelTitulo: { es: "Un panel con roles, en dos clics", en: "A panel with roles, in two clicks" },
  panelEntradilla: {
    es: "Cambia la vista y mira qué desaparece. Eso es lo que ve un vendedor a comisión.",
    en: "Switch the view and watch what disappears. That's what a commission-based salesperson sees.",
  },
  construyo: [
    {
      icono: "inventario",
      titulo: {
        es: "Sistema de inventario y operación",
        en: "Inventory and operations system",
      },
      cuerpo: {
        es: "Entradas, salidas, existencias por bodega y el histórico de quién movió qué. La hoja compartida de hoy, con reglas que no se pueden saltar.",
        en: "Ins, outs, stock by warehouse and the history of who moved what. Today's shared spreadsheet, with rules that can't be skipped.",
      },
    },
    {
      icono: "agenda",
      titulo: { es: "Sistema de reservas y agenda", en: "Bookings and scheduling system" },
      cuerpo: {
        es: "Varios profesionales, duraciones distintas, bloqueos, cancelaciones y recordatorios. Si además agenda por chat, se junta con el chatbot.",
        en: "Several professionals, different durations, blocks, cancellations and reminders. If it also books over chat, it joins up with the chatbot.",
      },
    },
    {
      icono: "panel",
      titulo: {
        es: "Panel administrable y panel de control interno",
        en: "Admin panel and internal dashboard",
      },
      cuerpo: {
        es: "Cambias precios, productos, textos o usuarios sin escribirme. Con roles: nadie ve la caja completa por accidente.",
        en: "You change prices, products, copy or users without writing to me. With roles: nobody sees the whole till by accident.",
      },
    },
    {
      icono: "crm",
      titulo: { es: "CRM interno y seguimiento de clientes", en: "Internal CRM and client tracking" },
      cuerpo: {
        es: "Dónde va cada negociación, quién la tiene y cuándo hay que volver a llamar. Es el tablero de aquí arriba.",
        en: "Where each deal stands, who owns it and when to call back. It's the board up here.",
      },
    },
    {
      icono: "integra",
      titulo: { es: "Integraciones con lo que ya usas", en: "Integrations with what you already use" },
      cuerpo: {
        es: "Con WhatsApp, con tu contabilidad, con una pasarela o con el Excel que no piensas soltar. Siempre que el otro lado tenga por dónde conectarse.",
        en: "With WhatsApp, with your accounting, with a payment gateway or with the spreadsheet you're not letting go of. As long as the other side has a way in.",
      },
    },
    {
      icono: "cohete",
      titulo: {
        es: "Plataforma web a la medida, por etapas",
        en: "A custom web platform, in stages",
      },
      cuerpo: {
        es: "Si el proyecto es grande no se construye entero de una: sale primero la parte que ya te sirve y de ahí crece. Aplicaciones a la medida, no una plantilla forzada.",
        en: "If the project is big it doesn't get built all at once: the part that's already useful goes out first and grows from there. Custom applications, not a template forced into shape.",
      },
    },
  ] as readonly { icono: string; titulo: Texto; cuerpo: Texto }[],
  saludAntes: {
    es: "Un caso que se repite en salud:",
    en: "A case that repeats in healthcare:",
  },
  saludDespues: {
    es: " agenda de varios profesionales, control de sedes e historia clínica. Ahí la web y el sistema son dos proyectos distintos y conviene no mezclarlos —con ejemplos, en ",
    en: " scheduling several professionals, branch control and clinical records. There the site and the system are two different projects and it's better not to mix them —with examples, in ",
  },
  saludEnlace: {
    es: "páginas web para clínicas y consultorios",
    en: "websites for clinics and practices",
  },

  precio: {
    badge: { es: "Precio", en: "Price" },
    titulo: {
      es: "Cuánto cuesta: según el alcance, y así se calcula",
      en: "What it costs: depends on scope, and this is how it's worked out",
    },
    entradillaAntes: {
      es: "Publico el precio de lo que tiene forma conocida —una ",
      en: "I publish the price of what has a known shape —a ",
    },
    entradillaEnlace: {
      es: "página web desde {piso}, una tienda online desde {ecom}",
      en: "website from {piso}, an online store from {ecom}",
    },
    entradillaDespues: {
      es: "—. El software no la tiene: dos proyectos que se cuentan igual pueden costar tres veces distinto, y un «desde» bonito acá es el que después crece cuando ya no te puedes devolver. Lo que sí te doy es la lista de lo que mueve la aguja.",
      en: "—. Software doesn't: two projects described the same way can cost three times as much, and a pretty “from” here is the one that grows later, when you can't turn back. What I do give you is the list of what moves the needle.",
    },
    subeTitulo: { es: "Lo que sube el precio", en: "What pushes the price up" },
    sube: {
      es: [
        "Cuántos roles distintos hay y qué puede ver cada uno",
        "Cuántas integraciones con sistemas de terceros, y si esos sistemas colaboran",
        "Si hay que traer datos viejos, y en qué estado están",
        "Si además del panel interno hace falta una parte para el cliente final",
        "Si el proceso está escrito en algún lado o hay que reconstruirlo preguntando",
        "Si hay obligaciones de por medio: datos sensibles, trazabilidad, auditoría",
      ],
      en: [
        "How many different roles there are and what each one can see",
        "How many integrations with third-party systems, and whether those systems cooperate",
        "Whether old data has to be brought across, and what state it's in",
        "Whether, beyond the internal panel, a part for the end customer is needed",
        "Whether the process is written down anywhere or has to be reconstructed by asking",
        "Whether obligations are involved: sensitive data, traceability, auditing",
      ],
    } as Traducido<readonly string[]>,
    bajaTitulo: { es: "Lo que lo baja", en: "What brings it down" },
    baja: {
      es: [
        "Arrancar por una sola etapa, la que ya te sirve sola",
        "Tener claro el proceso antes de la llamada, aunque sea en una hoja",
        "Aceptar que la primera versión sea fea por dentro y correcta por fuera",
        "Dejar por fuera lo que hoy no se usa, aunque «algún día podría servir»",
        "Usar lo que ya existe donde exista: no todo hay que construirlo",
      ],
      en: [
        "Starting with a single stage, the one that's already useful on its own",
        "Having the process clear before the call, even if it's on one sheet",
        "Accepting that the first version is ugly inside and correct outside",
        "Leaving out what isn't used today, even if “some day it might be handy”",
        "Using what already exists where it exists: not everything has to be built",
      ],
    } as Traducido<readonly string[]>,
    pagoFuerte: { es: "Cómo se paga:", en: "How it's paid:" },
    pagoAntes: {
      es: " por etapas y contra entregables. Los anticipos, los hitos y el saldo van escritos en la propuesta antes de empezar, y las condiciones generales están publicadas en los ",
      en: " in stages and against deliverables. The deposits, the milestones and the balance are written in the proposal before starting, and the general conditions are published in the ",
    },
    pagoEnlace: { es: "términos del servicio", en: "terms of service" },
    pagoDespues: {
      es: ". Si una etapa no se entregó, no se cobra.",
      en: ". If a stage wasn't delivered, it isn't charged.",
    },
    /* EL PISO, que es la pregunta que el visitante vino a hacer y la sección
       no contestaba. No es una tarifa —el precio sigue saliendo del alcance—:
       es la línea por debajo de la cual el encargo no da, y decirla ahorra la
       llamada a los dos. La cifra vive en `PISOS.software`. */
    pisoFuerte: { es: "El piso:", en: "The floor:" },
    pisoTexto: {
      es: " por debajo de ahí el encargo no da. Hasta el software más pequeño arranca con diseño de base de datos, accesos y despliegue, y ese trabajo existe aunque la interfaz sea una sola pantalla. Si tu presupuesto está por debajo te lo digo en la llamada, y miramos si lo que necesitas es software o es otra cosa más barata.",
      en: " below that the job doesn't add up. Even the smallest custom software starts with database design, credentials and deployment, and that work exists even if the interface is a single screen. If your budget is under that I'll say so on the call, and we'll look at whether what you need is software or something cheaper.",
    },
  },

  incluyeTitulo: { es: "Qué incluye siempre", en: "What's always included" },
  incluye: {
    es: [
      "Alcance escrito antes de cobrar nada: qué se construye, en qué etapas y qué queda por fuera",
      "El código en TU repositorio desde el primer commit, no al final del proyecto",
      "Los accesos y las cuentas a tu nombre: servidor, base de datos, dominio y correo",
      "Panel administrable para que no dependas de mí para el día a día",
      "Documentación de cómo se despliega, cómo se restaura y qué hace cada parte",
      "Copias de seguridad configuradas, y probadas restaurándolas al menos una vez",
      "Capacitación de entrega y 30 días de ajustes sin costo",
    ],
    en: [
      "Scope in writing before anything is charged: what gets built, in which stages and what's left out",
      "The code in YOUR repository from the first commit, not at the end of the project",
      "The credentials and accounts in your name: server, database, domain and email",
      "An admin panel so you don't depend on me for the day to day",
      "Documentation of how it deploys, how it restores and what each part does",
      "Backups configured, and tested by restoring them at least once",
      "Handover training and 30 days of adjustments at no cost",
    ],
  } as Traducido<readonly string[]>,
  noHagoAntes: { es: "Qué ", en: "What I " },
  noHagoAcento: { es: "no", en: "don't" },
  noHagoDespues: { es: " hago", en: " do" },
  noHagoEntradilla: {
    es: "Esta lista vale más que la de arriba. Todo el mundo dice que sí a todo en la reunión de venta; los problemas empiezan después.",
    en: "This list is worth more than the one above. Everyone says yes to everything in the sales meeting; the problems start afterwards.",
  },
  noHago: [
    {
      titulo: { es: "App nativa para Android o iOS", en: "A native app for Android or iOS" },
      cuerpo: {
        es: "Hago apps web: se abren desde el navegador, se instalan como acceso directo en el teléfono y se actualizan solas. No publico en Play Store ni en App Store, y prefiero decírtelo antes que aprenderlo con tu plata.",
        en: "I build web apps: they open from the browser, install as a shortcut on the phone and update themselves. I don't publish on Play Store or App Store, and I'd rather tell you than learn it with your money.",
      },
    },
    {
      titulo: {
        es: "Software de estante: contable, de nómina o POS",
        en: "Off-the-shelf software: accounting, payroll or POS",
      },
      cuerpo: {
        es: "Si lo que buscas es un programa que ya existe para facturar o liquidar nómina, cómpralo. Sale más barato que mandarlo a hacer y ya lo probaron miles de negocios. Lo que sí hago es conectarlo con lo tuyo.",
        en: "If what you're after is a program that already exists to invoice or run payroll, buy it. It's cheaper than commissioning one and thousands of businesses have already tested it. What I do is connect it to yours.",
      },
    },
    {
      titulo: {
        es: "Trabajo por horas dentro de tu equipo",
        en: "Hourly work inside your team",
      },
      cuerpo: {
        es: "No me contratas como programador freelance por horas ni entro a la nómina de nadie. Trabajo por proyecto, con alcance escrito y entregables. Si lo que necesitas es una persona sentada en tu oficina, no soy yo.",
        en: "You don't hire me as an hourly freelance developer and I don't join anyone's payroll. I work by project, with written scope and deliverables. If what you need is a person sitting in your office, that isn't me.",
      },
    },
    {
      titulo: {
        es: "Alcance abierto de «lo vamos viendo»",
        en: "Open-ended “we'll see as we go” scope",
      },
      cuerpo: {
        es: "Los cambios que aparecen a mitad de camino se anotan, se estiman y entran en una etapa siguiente. No se meten calladamente en la actual: así es como un proyecto se dobla de plazo sin que nadie sepa cuándo pasó.",
        en: "Changes that show up mid-way get written down, estimated and put into a following stage. They don't get slipped quietly into the current one: that's how a project doubles its timeline without anyone knowing when it happened.",
      },
    },
    {
      titulo: {
        es: "Migración de datos viejos, por defecto",
        en: "Migrating old data, by default",
      },
      cuerpo: {
        es: "Traer diez años de una base sucia es un proyecto en sí mismo. Se mira antes, se dice cuánto se puede rescatar de verdad y se cotiza aparte. Nunca se promete que va a entrar todo.",
        en: "Bringing across ten years of a dirty database is a project in itself. It gets looked at first, how much can really be salvaged gets said, and it's quoted separately. It's never promised that everything will come across.",
      },
    },
    {
      titulo: {
        es: "Integraciones con sistemas que no dejan conectarse",
        en: "Integrations with systems that won't let you in",
      },
      cuerpo: {
        es: "Si tu proveedor no tiene API ni forma de exportar, no hay integración posible por más que la quieras. Eso se averigua en el diagnóstico, no tres meses después.",
        en: "If your provider has no API and no way to export, no integration is possible however much you want it. That gets found out in the diagnosis, not three months later.",
      },
    },
    {
      titulo: {
        es: "Soporte 24/7 con respuesta en minutos",
        en: "24/7 support with a response in minutes",
      },
      cuerpo: {
        es: "Soy una persona. Respondo dentro de las 24 horas hábiles y para caídas hay un plan de mantenimiento con su alcance escrito. Prometerte un centro de soporte que no existe sería mentir.",
        en: "I'm one person. I answer within 24 working hours and for outages there's a maintenance plan with its scope written down. Promising you a support centre that doesn't exist would be lying.",
      },
    },
  ] as readonly { titulo: Texto; cuerpo: Texto }[],

  procesoTitulo: { es: "Cómo se hace", en: "How it's done" },
  previo: {
    etiqueta: { es: "Antes de la etapa 01", en: "Before stage 01" },
    texto: {
      es: "Diagnóstico de 20 minutos. Si te sirve una página web y no software, ahí te lo digo.",
      en: "A 20-minute call. If a website suits you and not software, I'll say so right there.",
    },
  },
  proceso: [
    {
      etiqueta: { es: "Etapa 01", en: "Stage 01" },
      texto: {
        es: "Alcance por escrito: qué se construye, qué no, en cuántas etapas y qué cuesta cada una.",
        en: "Scope in writing: what gets built, what doesn't, in how many stages and what each one costs.",
      },
    },
    {
      etiqueta: { es: "Etapa 02", en: "Stage 02" },
      texto: {
        es: "Primera versión útil, en línea. La parte más chica que ya te sirve, con tus datos reales.",
        en: "First useful version, live. The smallest part that's already useful, with your real data.",
      },
    },
    {
      etiqueta: { es: "Etapa 03", en: "Stage 03" },
      texto: {
        es: "Se ajusta con el uso. Cada etapa sale de lo que estorbó en la anterior, no de una lista vieja.",
        en: "It gets adjusted through use. Each stage comes out of what got in the way in the last one, not out of an old list.",
      },
    },
    {
      etiqueta: { es: "Etapa 04", en: "Stage 04" },
      texto: {
        es: "Entrega: código, accesos, documentación, capacitación y 30 días de ajustes sin costo.",
        en: "Handover: code, credentials, documentation, training and 30 days of adjustments at no cost.",
      },
    },
  ] as readonly { etiqueta: Texto; texto: Texto }[],
  plazoNota: {
    es: "El plazo sale del alcance y queda escrito en la propuesta, con fechas",
    en: "The timeline comes out of the scope and is written into the proposal, with dates",
  },
  /* El plazo de la primera versión útil: lo que más preguntan en la llamada.
     El recargo por urgencia va dicho aquí y no en la propuesta, porque
     enterarse tarde de que correr cuesta más es exactamente lo que vuelve
     hostil una cotización. */
  plazoPrimera: {
    es: "La primera versión útil sale en un mes. Si la necesitas en tres semanas se puede, recortando el alcance y con un 20% de recargo por la urgencia: comprimir no sale gratis y prefiero decírtelo ahora y no a mitad de camino.",
    en: "The first useful version ships in a month. If you need it in three weeks it can be done, by cutting the scope and with a 20% rush surcharge: compressing isn't free and I'd rather tell you now than halfway through.",
  },

  pruebaTitulo: { es: "Lo que puedes abrir ahora mismo", en: "What you can open right now" },
  pruebaP1Antes: {
    es: "La pregunta que hay que hacerle a cualquiera que ofrezca desarrollo de software es esta: ",
    en: "The question to ask anyone offering software development is this: ",
  },
  pruebaP1Cursiva: {
    es: "enséñeme algo suyo que siga funcionando en producción",
    en: "show me something of yours that's still running in production",
  },
  pruebaP1Despues: {
    es: ". No una maqueta: una dirección que yo pueda abrir. Acá van dos, con dominio propio.",
    en: ". Not a mockup: an address I can open. Here are two, on their own domains.",
  },
  pruebaP2Antes: { es: "Y digo lo que son: ", en: "And I'll say what they are: " },
  pruebaP2Fuerte: {
    es: "son producto propio, no encargos de cliente. Los construí yo, por mi cuenta y con mi plata.",
    en: "they're my own products, not client commissions. I built them, on my own and with my money.",
  },
  pruebaP2Despues: {
    es: " No prueban que alguien me pagó por hacerlos: prueban que sé construir y sostener un sistema completo, que es lo que vas a comprar.",
    en: " They don't prove somebody paid me to make them: they prove I can build and keep a complete system standing, which is what you're buying.",
  },
  pruebaEtiqueta: {
    es: "Producto propio · En producción",
    en: "Own product · In production",
  },
  prueba: [
    {
      nombre: "HalcónOS",
      cuerpo: {
        es: "CRM de ventas para agencias en LATAM: caza interesados, redacta propuestas y lleva cada conversación de WhatsApp al pipeline. Con roles: un vendedor a comisión ve sus clientes y no los del resto.",
        en: "A sales CRM for LATAM agencies: it hunts leads, drafts proposals and takes every WhatsApp conversation into the pipeline. With roles: a commission salesperson sees their clients and nobody else's.",
      },
      url: "https://halcon.jvagencia.com",
      dominio: "halcon.jvagencia.com",
    },
    {
      nombre: "Hummik",
      cuerpo: {
        es: "Agenda de citas por WhatsApp: el cliente reserva desde el chat o desde un enlace, la cita cae sola en el calendario y salen los recordatorios contra los plantones.",
        en: "A WhatsApp appointment book: the customer books from the chat or from a link, the appointment lands in the calendar on its own and the reminders go out against no-shows.",
      },
      url: "https://www.hummik.com",
      dominio: "hummik.com",
    },
  ] as readonly { nombre: string; cuerpo: Texto; url: string; dominio: string }[],

  stackTitulo: { es: "Con qué lo construyo", en: "What I build it with" },
  stackEntradilla: {
    es: "Nada exótico, a propósito: todo esto lo lee cualquier desarrollador del mercado, así que el día que cambies de manos no te encuentras un sistema escrito en un idioma que solo yo hablo.",
    en: "Nothing exotic, on purpose: any developer on the market reads all of this, so the day you change hands you don't find a system written in a language only I speak.",
  },
  stack: [
    { grupo: { es: "Frontend", en: "Frontend" }, items: ["TypeScript", "React", "Next.js", "Tailwind CSS"] },
    { grupo: { es: "Backend", en: "Backend" }, items: ["Node.js", "NestJS", "Express", "Prisma"] },
    { grupo: { es: "Datos", en: "Data" }, items: ["PostgreSQL", "Redis", "DynamoDB"] },
    {
      grupo: { es: "Infraestructura", en: "Infrastructure" },
      items: ["AWS", "Docker", "Terraform", "GitHub Actions"],
    },
  ] as readonly { grupo: Texto; items: readonly string[] }[],

  faqTitulo: {
    es: "Las preguntas que hay que hacer antes de firmar",
    en: "The questions to ask before signing",
  },
  faqEntradilla: {
    es: "Separan a quien va a entregar de quien va a improvisar. Hazlas también en las otras cotizaciones que pidas.",
    en: "They separate whoever is going to deliver from whoever is going to improvise. Ask them in the other quotes you get too.",
  },

  cierre: {
    titulo: {
      es: "Cuéntame el proceso que te come el día",
      en: "Tell me about the process that eats your day",
    },
    cuerpo: {
      es: "Veinte minutos alcanzan para saber si esto se resuelve con software, con una página web o con nada. Si te sirve más barato de otra manera, te lo digo ahí mismo.",
      en: "Twenty minutes is enough to know whether this is solved with software, with a website or with nothing. If something cheaper suits you better, I'll say so right there.",
    },
  },
} as const;

/**
 * LAS TRECE PREGUNTAS
 * ──────────────────────────────────────────────────────────────────────────
 * `{piso}` lo sustituye el componente con el número de `lib/quote.ts`.
 */
export const SOFTWARE_FAQ: readonly { q: Texto; a: Texto }[] = [
  {
    q: {
      es: "¿Cuánto cuesta un software a la medida? ¿Por qué no hay un precio publicado?",
      en: "What does custom software cost? Why isn't there a published price?",
    },
    a: {
      es: "Porque no existe un precio honesto que publicar. Una página web es un producto con forma conocida y por eso su precio está publicado; un software no: dos proyectos que se describen igual en una frase pueden costar tres veces distinto según cuántos usuarios, cuántos roles, cuántas integraciones y cuántos datos viejos haya de por medio. Lo que sí te doy antes de cobrar nada es la propuesta escrita con el número adentro y las etapas separadas, para que veas dónde se va cada peso.",
      en: "Because there's no honest price to publish. A website is a product with a known shape and that's why its price is published; software isn't: two projects described the same way in one sentence can cost three times as much depending on how many users, how many roles, how many integrations and how much old data is involved. What I do give you before charging anything is the written proposal with the number in it and the stages separated, so you see where each peso goes.",
    },
  },
  {
    q: {
      es: "¿El código queda 100% mío y en mi repositorio?",
      en: "Is the code 100% mine and in my repository?",
    },
    a: {
      es: "Sí, y no al final: desde el primer commit. El repositorio se crea en tu cuenta, no en la mía, y ves crecer el proyecto día a día. La propiedad de los entregables pasa formalmente a ti cuando el proyecto está pagado —así está escrito en los términos y así se firma—, pero no existe un momento en que el código viva escondido en una máquina mía como prenda.",
      en: "Yes, and not at the end: from the first commit. The repository is created in your account, not mine, and you watch the project grow day by day. Ownership of the deliverables formally passes to you when the project is paid —that's written into the terms and that's how it's signed— but there's no moment where the code lives hidden on a machine of mine as collateral.",
    },
  },
  {
    q: {
      es: "Si mañana trabajo con otro equipo, ¿me quedo amarrado a ti?",
      en: "If I work with another team tomorrow, am I locked in to you?",
    },
    a: {
      es: "No, y está construido a propósito para que no. Repositorio tuyo, accesos tuyos, base de datos tuya, documentación de cómo se despliega y se restaura, y nada de tecnología rara: TypeScript, Node.js, React y PostgreSQL los lee cualquier desarrollador del mercado. El día que quieras cambiar, le entregas esto a otra persona y arranca leyendo, no adivinando.",
      en: "No, and it's built that way on purpose. Your repository, your credentials, your database, documentation of how it deploys and restores, and no exotic technology: TypeScript, Node.js, React and PostgreSQL are read by any developer on the market. The day you want to switch, you hand this to someone else and they start by reading, not guessing.",
    },
  },
  {
    q: {
      es: "Eres una sola persona. ¿Qué pasa si te pasa algo?",
      en: "You're one person. What happens if something happens to you?",
    },
    a: {
      es: "Es la pregunta correcta y no la voy a esquivar. Trabajo solo, y por eso no tomo veinte proyectos a la vez. La respuesta no es prometerte un equipo que no tengo: es que todo lo que construyo queda documentado y que el código y los accesos son tuyos desde el primer día. Si mañana desaparezco, tu sistema sigue corriendo y otra persona puede tomarlo. Lo que no puedo prometerte es un centro de soporte con turnos, y por eso tampoco te lo cobro.",
      en: "It's the right question and I'm not going to dodge it. I work alone, and that's why I don't take twenty projects at once. The answer isn't to promise you a team I don't have: it's that everything I build is documented and the code and credentials are yours from day one. If I disappear tomorrow, your system keeps running and someone else can take it over. What I can't promise you is a support centre with shifts, and that's why I don't charge you for one either.",
    },
  },
  {
    q: { es: "¿Quién va a escribir el código, con nombre?", en: "Who will write the code, by name?" },
    a: {
      es: "Luis Jaller. Yo diseño y yo programo, sin subcontratar ni pasarle el proyecto a un practicante después de la reunión de venta. Puedes ver el stack, los perfiles y el trabajo hecho en la página del estudio antes de contratar nada.",
      en: "Luis Jaller. I design and I code, without subcontracting or handing the project to an intern after the sales meeting. You can see the stack, the profiles and the work done on the studio page before hiring anything.",
    },
  },
  {
    q: {
      es: "¿No me sirve mejor comprar un software ya hecho?",
      en: "Wouldn't I be better off buying software that already exists?",
    },
    a: {
      es: "Muchas veces sí, y te lo digo aunque me deje sin proyecto. Si lo que necesitas es facturar, liquidar nómina o llevar contabilidad, cómpralo hecho: cuesta menos y ya lo depuraron miles de negocios. El software a la medida se justifica cuando tu proceso es raro de verdad, cuando ninguna herramienta del mercado lo cubre sin que tu equipo trabaje al revés, o cuando llevas años pagando suscripciones por cinco herramientas que no se hablan.",
      en: "Often yes, and I'll say so even if it costs me the project. If what you need is to invoice, run payroll or keep accounts, buy it ready-made: it costs less and thousands of businesses have already debugged it. Custom software is justified when your process is genuinely unusual, when no tool on the market covers it without your team working backwards, or when you've spent years paying subscriptions for five tools that don't talk to each other.",
    },
  },
  {
    q: {
      es: "¿Cuánto se demora? ¿Podemos empezar por lo mínimo y crecer?",
      en: "How long does it take? Can we start with the minimum and grow?",
    },
    a: {
      es: "Empezar por lo mínimo no es una opción de descuento: es como se hace bien. Sale primero la parte más chica que ya te sirva, se usa con datos reales y de ahí crece por etapas. El plazo del proyecto completo sale del alcance y queda escrito en la propuesta, con fechas, antes de que firmes.",
      en: "Starting with the minimum isn't a discount option: it's how it's done properly. The smallest part that's already useful goes out first, gets used with real data and grows from there in stages. The full project's timeline comes out of the scope and is written into the proposal, with dates, before you sign.",
    },
  },
  {
    q: { es: "¿Cómo se estructura el pago?", en: "How is payment structured?" },
    a: {
      es: "Por etapas y contra entregables, no un pago único al final ni todo por delante. Los anticipos, los hitos y el saldo van escritos en la propuesta antes de empezar, con qué se entrega en cada tramo. Si una etapa no se entregó, no se cobra.",
      en: "In stages and against deliverables, not a single payment at the end or everything up front. The deposits, the milestones and the balance are written into the proposal before starting, with what gets delivered in each stretch. If a stage wasn't delivered, it isn't charged.",
    },
  },
  {
    q: {
      es: "¿Qué incluye el soporte después de entregar?",
      en: "What does support include after handover?",
    },
    a: {
      es: "La entrega trae capacitación y 30 días de ajustes sin costo. De ahí en adelante el mantenimiento es un plan aparte y opcional, con su alcance escrito. Si no contratas ninguno, el sistema es tuyo igual y sigue funcionando: no hay un interruptor mío que lo apague.",
      en: "Handover comes with training and 30 days of adjustments at no cost. From there on, maintenance is a separate, optional plan with its scope written down. If you don't take one, the system is still yours and keeps working: there's no switch of mine that turns it off.",
    },
  },
  {
    q: {
      es: "¿Dónde quedan mis datos? ¿Esto cumple la Ley 1581 de 2012?",
      en: "Where does my data live? Does this comply with Colombia's Law 1581 of 2012?",
    },
    a: {
      es: "Los datos quedan en infraestructura contratada a tu nombre, no en una cuenta mía. La ley te hace responsable a ti del tratamiento, así que lo que hago del lado del software es que puedas cumplirla: recoger solo lo necesario, guardar la autorización, tener registro de quién consultó qué, y poder borrar o exportar los datos de una persona cuando lo pida. Si manejas datos de salud, que la ley trata como sensibles, eso cambia el diseño desde el principio y se conversa antes, no después.",
      en: "The data lives on infrastructure contracted in your name, not in an account of mine. The law makes you responsible for the processing, so what I do on the software side is make it possible for you to comply: collect only what's needed, store the consent, keep a record of who looked at what, and be able to delete or export a person's data when they ask. If you handle health data, which the law treats as sensitive, that changes the design from the start and gets discussed beforehand, not afterwards.",
    },
  },
  {
    q: {
      es: "¿Se conecta con lo que ya uso: contabilidad, WhatsApp, Excel?",
      en: "Does it connect with what I already use: accounting, WhatsApp, spreadsheets?",
    },
    a: {
      es: "Con WhatsApp sí, y de primera mano: soy proveedor de tecnología verificado por Meta. Con Excel también, en los dos sentidos. Con tu contabilidad, depende de si tu proveedor tiene API o al menos una exportación decente; eso se averigua en el diagnóstico y te lo digo antes de que sea una promesa. Si no hay por dónde conectarse, no hay integración, y prefiero decirlo temprano.",
      en: "With WhatsApp yes, and first-hand: I'm a technology provider verified by Meta. With spreadsheets too, in both directions. With your accounting, it depends on whether your provider has an API or at least a decent export; that gets found out in the diagnosis and I tell you before it becomes a promise. If there's no way in, there's no integration, and I'd rather say so early.",
    },
  },
  {
    q: {
      es: "¿Me entregas documentación o quedo dependiendo de que tú te acuerdes?",
      en: "Do I get documentation or do I end up depending on your memory?",
    },
    a: {
      es: "Entrego documentación escrita: cómo se despliega, cómo se restaura una copia de seguridad, qué hace cada módulo y qué variables necesita para correr. No es un extra que se cobra aparte: un sistema sin manual es un sistema que te amarra a la memoria de una persona, y eso es exactamente lo que este servicio no debería hacerte.",
      en: "I hand over written documentation: how it deploys, how a backup is restored, what each module does and what variables it needs to run. It isn't an extra charged separately: a system without a manual is a system that ties you to one person's memory, and that's exactly what this service shouldn't do to you.",
    },
  },
  {
    q: {
      es: "¿Yo necesito software o me sirve una página web?",
      en: "Do I need software or will a website do?",
    },
    a: {
      es: "Regla rápida: si tu problema es que no te conocen, no te encuentran o no te escriben, es una página web —desde {piso} y en 5 días—. Si tu problema es que sí te escriben pero por dentro el proceso no da abasto, ahí es software. Muchos negocios necesitan primero lo uno y después lo otro, en ese orden, y sale más barato así.",
      en: "Quick rule: if your problem is that nobody knows you, nobody finds you or nobody writes to you, it's a website —from {piso} and in 5 days—. If your problem is that people do write but inside the process can't keep up, that's software. Plenty of businesses need one first and then the other, in that order, and it works out cheaper that way.",
    },
  },
];
