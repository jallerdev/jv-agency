import type { Texto, Traducido } from "@/content/types";

/**
 * POSICIONAMIENTO SEO, EN LAS DOS LENGUAS
 * ──────────────────────────────────────────────────────────────────────────
 * EL EJE DE LA PÁGINA, y es lo que casi nadie explica: la diferencia entre SEO
 * TÉCNICO —una sola vez, va con el sitio— y POSICIONAMIENTO —trabajo mensual—.
 * Confundirlos es lo que hace que el mes dos decepcione.
 *
 * LO QUE ESTA PÁGINA NO HACE: repetir el artículo del blog. «¿Cuánto cuesta el
 * SEO en Colombia?» explica el mercado con tablas y fuentes citadas; esta
 * página vende el servicio. Se enlazan, no se copian.
 *
 * NO SE PROMETE UNA POSICIÓN. Ni aquí ni en el dato estructurado. Va en la
 * primera pantalla y no en la letra pequeña: el cliente que llega quemado del
 * SEO llega por lo mismo.
 */
export const SEO = {
  badge: { es: "Posicionamiento SEO", en: "SEO" },
  titulo: {
    es: "Posicionamiento SEO para que te encuentren",
    en: "SEO so that people find you",
  },
  tituloAcento: { es: "sin pagar por cada clic", en: "without paying for every click" },
  entradilla: {
    es: "Tu cliente ya está buscando lo que vendes: escribe «funeraria en Cartagena», mira los primeros que salen y llama a uno. Si no estás ahí, no es que no te quieran: es que no te ven. Posicionar es meterte en esa lista y quedarte.",
    en: "Your customer is already searching for what you sell: they type “funeral home in Cartagena”, look at the first ones that come up and call one. If you're not there, it isn't that they don't want you: it's that they don't see you. Ranking means getting into that list and staying.",
  },
  ctaPrincipal: { es: "Agenda una llamada", en: "Book a call" },
  ctaSecundario: { es: "Ver precios", en: "See pricing" },

  honestidadTitulo: {
    es: "No te voy a garantizar el primer puesto.",
    en: "I'm not going to guarantee you first place.",
  },
  honestidadAcento: { es: "Nadie puede.", en: "Nobody can." },
  /* El primer párrafo sale de `SEO_HONESTY_NOTE` en `lib/quote.ts`, que es la
     fuente única de esa frase en todo el sitio. Aquí solo va su traducción. */
  honestidadNota: {
    en: "Nobody can guarantee you first place on Google, and anyone who promises it in writing is lying to you: Google decides positions, not the agency. What I do guarantee is the work done, measured and visible in a report. The first movement shows between month 3 and month 6.",
  },
  honestidadP2: {
    es: "Va en la primera pantalla y no en la letra pequeña: el cliente que llega quemado del SEO llega por lo mismo, le prometieron una posición y le cobraron seis meses.",
    en: "It goes on the first screen and not in the small print: the client who arrives burned by SEO arrives for the same reason — they were promised a position and charged for six months.",
  },
  honestidadFuerte: { es: "Y no soy una agencia SEO.", en: "And I'm not an SEO agency." },
  honestidadP3: {
    es: " No hay ejecutivo de cuentas en la mitad: el que investiga, el que escribe y el que te contesta el WhatsApp somos la misma persona.",
    en: " There's no account executive in the middle: whoever researches, whoever writes and whoever answers your WhatsApp are the same person.",
  },

  ejeTitulo: {
    es: "Con las mismas tres letras te venden dos cosas distintas",
    en: "The same three letters are sold to you as two different things",
  },
  ejeEntradilla: {
    es: "Casi toda pelea de precio de SEO es, en el fondo, una confusión de producto. Saber cuál de las dos estás comprando te ahorra la decepción del mes dos.",
    en: "Almost every argument about SEO pricing is, underneath, a confusion of product. Knowing which of the two you're buying saves you the month-two disappointment.",
  },
  tecnico: {
    titulo: { es: "SEO técnico", en: "Technical SEO" },
    cuerpo: {
      es: "Se hace una sola vez y se acaba. Va incluido cuando la página web la hago yo.",
      en: "It's done once and it's finished. It's included when I build the website.",
    },
    items: {
      es: [
        "Títulos y descripciones escritos, uno por página",
        "Datos estructurados (JSON-LD) del tipo que corresponda al negocio",
        "sitemap.xml, robots.txt y canónicos",
        "Imágenes comprimidas, con nombre y texto alternativo",
        "Alta en Google Search Console y envío del sitemap",
        "Es la base técnica. No es posicionamiento mensual: eso va aparte",
      ],
      en: [
        "Titles and descriptions written, one per page",
        "Structured data (JSON-LD) of whichever type fits the business",
        "sitemap.xml, robots.txt and canonicals",
        "Compressed images, with a filename and alt text",
        "Google Search Console setup and sitemap submission",
        "It's the technical base. It isn't monthly SEO: that goes separately",
      ],
    } as Traducido<readonly string[]>,
  },
  posicionamiento: {
    titulo: { es: "Posicionamiento", en: "Ranking work" },
    cuerpo: {
      es: "Trabajo mensual y continuo. Es esto lo que se contrata en esta página.",
      en: "Monthly, continuous work. This is what's hired on this page.",
    },
    items: {
      es: [
        "Una ciudad y un servicio principal trabajados a fondo",
        "Ficha de Google Business gestionada: publicaciones, fotos y respuestas a reseñas",
        "2 contenidos al mes, escritos y publicados",
        "Optimización continua de las páginas que ya tienes",
        "Vigilancia de posiciones de hasta 30 búsquedas",
        "Informe mensual con lo hecho, lo que se movió y lo que sigue",
      ],
      en: [
        "One city and one main service worked on properly",
        "Google Business profile managed: posts, photos and replies to reviews",
        "2 pieces of content a month, written and published",
        "Continuous optimisation of the pages you already have",
        "Rank tracking for up to 30 searches",
        "A monthly report with what was done, what moved and what's next",
      ],
    } as Traducido<readonly string[]>,
  },
  ejeCierreFuerte: { es: "Dicho de una vez:", en: "Put plainly:" },
  ejeCierreResto: {
    es: " el técnico es que Google pueda leerte; posicionar es ganarle terreno a quien también está trabajando. Venderlos con el mismo nombre es lo que hace creer que por una sola factura se queda uno primero.",
    en: " technical SEO is Google being able to read you; ranking is gaining ground on people who are also working at it. Selling them under the same name is what makes people believe one invoice buys first place.",
  },

  paraQuienTitulo: {
    es: "Esto te sirve si te pasa alguna de estas",
    en: "This is for you if any of these happen",
  },
  paraQuien: [
    {
      icono: "buscar",
      titulo: {
        es: "Te buscan por tu nombre y sí sales; por lo que vendes, no",
        en: "They search your name and you show up; for what you sell, you don't",
      },
      cuerpo: {
        es: "Escribe «lo que haces + tu ciudad» y salen otros seis. Ese es el hueco que se trabaja.",
        en: "Type “what you do + your city” and six others come up. That's the gap this works on.",
      },
    },
    {
      icono: "mapa",
      titulo: { es: "No sales en el mapa", en: "You don't show on the map" },
      cuerpo: {
        es: "Arriba de todo salen tres negocios con estrellas y un botón de «Cómo llegar». Sin ficha de Google Business no entras a esa lista.",
        en: "Above everything, three businesses show up with stars and a “Directions” button. Without a Google Business profile you don't get into that list.",
      },
    },
    {
      icono: "grafica",
      titulo: {
        es: "Vives de la pauta y el día que la apagas desapareces",
        en: "You live off ads and the day you switch them off you vanish",
      },
      cuerpo: {
        es: "Pagar por clic funciona mientras estés pagando. Esto es lento, pero no se apaga cuando se acaba el presupuesto del mes.",
        en: "Paying per click works while you're paying. This is slow, but it doesn't switch off when the month's budget runs out.",
      },
    },
    {
      icono: "llave",
      titulo: {
        es: "Tienes página hace años y nunca te trajo un cliente",
        en: "You've had a site for years and it never brought you a customer",
      },
      cuerpo: {
        es: "Casi siempre no es la página: es que Google no la puede leer, o nadie escribió las palabras con las que te buscan.",
        en: "Usually it isn't the site: it's that Google can't read it, or nobody wrote the words people search you by.",
      },
    },
  ] as readonly { icono: string; titulo: Texto; cuerpo: Texto }[],

  preciosBadge: { es: "Precios", en: "Pricing" },
  preciosTitulo: {
    es: "Qué se hace exactamente y cuánto cuesta",
    en: "What exactly gets done and what it costs",
  },
  preciosEntradilla: {
    es: "Dos productos y dos trabajos de arranque. Puedes contratar solo el primero y quedarte ahí: la auditoría se paga una vez y no obliga a nada.",
    en: "Two products and two start-up jobs. You can hire only the first and stop there: the audit is paid once and commits you to nothing.",
  },
  desde: { es: "desde", en: "from" },
  auditoria: {
    titulo: { es: "Auditoría SEO", en: "SEO audit" },
    cuerpo: {
      es: "El diagnóstico: por qué no apareces cuando te buscan, qué te está frenando y en qué orden se arregla. Sale de tus datos —tu sitio rastreado, tu Search Console, tu analítica—, no de un PDF exportado de una herramienta. Pago único.",
      en: "The diagnosis: why you don't show up when people search, what's holding you back and in what order it gets fixed. It comes out of your data —your site crawled, your Search Console, your analytics— not out of a PDF exported from a tool. One-off payment.",
    },
    plazo: { es: "5 días", en: "5 days" },
  },
  plan: {
    titulo: { es: "Plan mensual de posicionamiento", en: "Monthly SEO plan" },
    cuerpo: {
      es: "El trabajo continuo: una ciudad y un servicio principal a fondo, la ficha de Google Business gestionada, 2 contenidos al mes, vigilancia de hasta 30 búsquedas e informe mensual. Sin permanencia.",
      en: "The continuous work: one city and one main service done properly, the Google Business profile managed, 2 pieces of content a month, tracking for up to 30 searches and a monthly report. No lock-in.",
    },
    plazo: { es: "trabajo continuo", en: "ongoing work" },
    alMes: { es: " al mes", en: " a month" },
  },
  sumadorTitulo: { es: "Cómo se arma tu número", en: "How your number adds up" },
  sumadorEntradilla: {
    es: "Lo que sube la mensualidad es el alcance, no una tabla de planes. Márcalo y mira la suma.",
    en: "What pushes the monthly fee up is the scope, not a table of plans. Tick it and watch the total.",
  },
  sectoresCaros: {
    es: "Los sectores caros —salud, legal, inmobiliario, seguros— pesan más, porque hay más gente peleando la misma búsqueda.",
    en: "Expensive sectors —health, legal, real estate, insurance— weigh more, because more people are fighting over the same search.",
  },
  restoPreciosAntes: { es: "El resto de precios están publicados en ", en: "The rest of the prices are published on " },
  restoPreciosEnlace: { es: "la página de precios", en: "the pricing page" },
  restoPreciosMedio: {
    es: ". Y si lo que quieres es entender el mercado antes de comparar propuestas, ",
    en: ". And if what you want is to understand the market before comparing proposals, ",
  },
  restoPreciosBlog: {
    es: "cuánto cuesta el SEO en Colombia",
    en: "what SEO costs in Colombia",
  },
  restoPreciosDespues: {
    es: " lo explica con los rangos de las agencias, los precios de las herramientas y las fuentes citadas.",
    en: " explains it with agency ranges, tool prices and cited sources.",
  },

  comparador: {
    incluye: { es: "Qué incluye", en: "What it includes" },
    noIncluyeAntes: { es: "Qué ", en: "What it " },
    noIncluyeAcento: { es: "no", en: "doesn't" },
    noIncluyeDespues: { es: " incluye", en: " include" },
    nota: {
      es: "Esta lista vale más que la de arriba. Es la que evita el problema del mes dos.",
      en: "This list is worth more than the one above. It's the one that avoids the month-two problem.",
    },
  },
  incluye: {
    es: [
      "Acceso de lectura a tu Search Console y a tu analítica, desde el mes uno",
      "Informe mensual con lo que hice, lo que se movió y lo que sigue",
      "Los contenidos los escribo yo, investigados y publicados con sus imágenes",
      "La ficha de Google Business gestionada: publicaciones, fotos y respuesta a reseñas",
      "Las cuentas quedan a tu nombre: si mañana te vas, te llevas todo",
      "Sin cláusula de permanencia. Se paga mes a mes",
    ],
    en: [
      "Read access to your Search Console and your analytics, from month one",
      "A monthly report with what I did, what moved and what's next",
      "I write the content myself, researched and published with its images",
      "The Google Business profile managed: posts, photos and replies to reviews",
      "The accounts stay in your name: if you leave tomorrow, you take everything",
      "No lock-in clause. It's paid month to month",
    ],
  } as Traducido<readonly string[]>,
  noIncluye: [
    {
      texto: {
        es: "Garantía de primer puesto, ni «top 3 en 60 días».",
        en: "A guarantee of first place, or “top 3 in 60 days”.",
      },
      quien: { es: "nadie puede darla", en: "nobody can give it" },
    },
    {
      texto: {
        es: "Enlaces comprados, que Google nombra como spam.",
        en: "Bought links, which Google names as spam.",
      },
      quien: { es: "no se compran", en: "not bought" },
    },
    {
      texto: {
        es: "Pauta ni Google Ads. Esto no es publicidad pagada.",
        en: "Ads or Google Ads. This isn't paid advertising.",
      },
      quien: { es: "otro servicio", en: "another service" },
    },
    {
      texto: {
        es: "Veinte artículos al mes hechos por una máquina y publicados sin leerlos.",
        en: "Twenty articles a month made by a machine and published unread.",
      },
      quien: { es: "los escribo yo", en: "I write them" },
    },
    {
      texto: { es: "Manejo de redes sociales.", en: "Social media management." },
      quien: { es: "otro proveedor", en: "another provider" },
    },
    {
      texto: {
        es: "Rediseño de la página. Si hay que rehacerla, te lo digo.",
        en: "Redesigning the site. If it needs redoing, I'll tell you.",
      },
      quien: { es: "se cotiza aparte", en: "quoted separately" },
    },
  ] as readonly { texto: Texto; quien: Texto }[],

  procesoTitulo: { es: "Cómo se hace", en: "How it's done" },
  proceso: [
    {
      n: "01",
      titulo: { es: "Miro tu sitio y tus datos", en: "I look at your site and your data" },
      cuerpo: {
        es: "Rastreo la página entera y abro tu Search Console y tu analítica. Si no las tienes, las instalo. Es la auditoría: 5 días.",
        en: "I crawl the whole site and open your Search Console and your analytics. If you don't have them, I install them. That's the audit: 5 days.",
      },
    },
    {
      n: "02",
      titulo: {
        es: "Arreglo lo que te está frenando",
        en: "I fix what's holding you back",
      },
      cuerpo: {
        es: "Páginas lentas, enlaces rotos, textos repetidos. Va una sola vez, el primer mes.",
        en: "Slow pages, broken links, duplicated text. It happens once, in the first month.",
      },
    },
    {
      n: "03",
      titulo: {
        es: "Averiguo con qué palabras te buscan",
        en: "I find out what words people search you by",
      },
      cuerpo: {
        es: "Una página por intención de búsqueda, nunca una por sinónimo.",
        en: "One page per search intent, never one per synonym.",
      },
    },
    {
      n: "04",
      titulo: {
        es: "Trabajo el mapa y el contenido, cada mes",
        en: "I work the map and the content, every month",
      },
      cuerpo: {
        es: "Ficha de Google Business, páginas nuevas cuando la investigación las pida, y los contenidos del mes publicados.",
        en: "Google Business profile, new pages when the research calls for them, and the month's content published.",
      },
    },
    {
      n: "05",
      titulo: { es: "Te mando el informe y hablamos", en: "I send you the report and we talk" },
      cuerpo: {
        es: "Qué hice, qué se movió y qué sigue. Con tus datos, no con la captura de una herramienta mía.",
        en: "What I did, what moved and what's next. With your data, not a screenshot of a tool of mine.",
      },
    },
  ] as readonly { n: string; titulo: Texto; cuerpo: Texto }[],
  cuandoTitulo: {
    es: "Y cuándo se ve algo, dicho antes de empezar",
    en: "And when something shows, said before we start",
  },
  previo: {
    etiqueta: { es: "Mes 0", en: "Month 0" },
    texto: {
      es: "Auditoría y arreglo del sitio. Todavía no se está posicionando nada.",
      en: "Audit and site fixes. Nothing is being ranked yet.",
    },
  },
  hitos: [
    {
      etiqueta: { es: "Mes 1 y 2", en: "Month 1 and 2" },
      texto: {
        es: "Ficha, páginas y los primeros contenidos. Hay datos, todavía no posiciones.",
        en: "Profile, pages and the first content. There's data, not positions yet.",
      },
    },
    {
      etiqueta: { es: "Mes 3 a {meses}", en: "Month 3 to {meses}" },
      texto: {
        es: "Empiezan a moverse las primeras búsquedas. Es el tramo que hay que esperar.",
        en: "The first searches start to move. It's the stretch you have to wait out.",
      },
    },
    {
      etiqueta: { es: "Cada mes", en: "Every month" },
      texto: {
        es: "Contenido, ficha, ajustes e informe. Esto no se termina: se sostiene.",
        en: "Content, profile, adjustments and a report. This doesn't finish: it's sustained.",
      },
    },
  ] as readonly { etiqueta: Texto; texto: Texto }[],

  localBadge: { es: "SEO local", en: "Local SEO" },
  localTitulo: {
    es: "Donde de verdad se gana: las búsquedas con ciudad",
    en: "Where it's really won: searches with a city in them",
  },
  localEntradilla: {
    es: "Pelear «diseño web» a secas contra medio país es caro y lento. Pelear «lo que vendes + tu ciudad» es otra cosa: menos gente buscando, pero gente que compra hoy y cerca. Ahí es donde trabajo, desde Turbaco, Bolívar.",
    en: "Fighting “web design” flat against half the country is expensive and slow. Fighting “what you sell + your city” is another thing: fewer people searching, but people who buy today and nearby. That's where I work, from Turbaco, Bolívar.",
  },
  fichaTitulo: { es: "Ficha de Google Business", en: "Google Business Profile" },
  fichaRotulo: {
    es: "Ejemplo · campos genéricos, no los de ningún negocio",
    en: "Example · generic fields, not any real business's",
  },
  fichaPorLlenar: { es: "Por llenar", en: "To fill in" },
  fichaCampos: [
    {
      etiqueta: { es: "Nombre", en: "Name" },
      valor: { es: "El nombre exacto con el que te buscan", en: "The exact name people search for you by" },
    },
    {
      etiqueta: { es: "Categoría", en: "Category" },
      valor: { es: "Tu categoría principal, y las secundarias", en: "Your main category, and the secondary ones" },
    },
    {
      etiqueta: { es: "Dirección", en: "Address" },
      valor: { es: "Tu dirección, o la zona que cubres", en: "Your address, or the area you cover" },
    },
    {
      etiqueta: { es: "Horario", en: "Hours" },
      valor: { es: "Tu horario real, sábados incluidos", en: "Your real hours, Saturdays included" },
    },
    {
      etiqueta: { es: "Teléfono", en: "Phone" },
      valor: { es: "El WhatsApp por el que sí contestas", en: "The WhatsApp you actually answer" },
    },
    {
      etiqueta: { es: "Servicios", en: "Services" },
      valor: { es: "Lo que haces, uno por uno y con su precio", en: "What you do, one by one and with its price" },
    },
    {
      etiqueta: { es: "Fotos", en: "Photos" },
      valor: { es: "Fachada, adentro y trabajo hecho", en: "Front, inside and work done" },
    },
    { etiqueta: { es: "Reseñas", en: "Reviews" } },
    { etiqueta: { es: "Publicaciones", en: "Posts" } },
    { etiqueta: { es: "Preguntas frecuentes", en: "Frequently asked questions" } },
  ] as readonly { etiqueta: Texto; valor?: Texto }[],
  consultaEjemplo: { es: "funeraria en Cartagena", en: "funeral home in Cartagena" },
  ciudadesTitulo: { es: "Y por ciudad, si es lo tuyo", en: "And by city, if that's your thing" },
  ciudadesEntradilla: {
    es: "Cada ciudad se trabaja aparte, con sus propias páginas y sus propias búsquedas.",
    en: "Each city is worked on separately, with its own pages and its own searches.",
  },
  ciudades: [
    { texto: { es: "Cartagena", en: "Cartagena" }, href: "/diseno-de-paginas-web-en-cartagena" },
    { texto: { es: "Barranquilla", en: "Barranquilla" }, href: "/diseno-de-paginas-web-en-barranquilla" },
    { texto: { es: "Bogotá", en: "Bogotá" }, href: "/diseno-de-paginas-web-en-bogota" },
  ] as readonly { texto: Texto; href: string }[],
  iaTitulo: {
    es: "Y lo que ya se está moviendo: que te nombre la IA",
    en: "And what's already moving: getting named by AI",
  },
  iaP1: {
    es: "Cada vez más gente pregunta en ChatGPT en vez de bajar a los diez resultados azules, y la base es la misma de siempre: páginas legibles, datos estructurados correctos e información verificable —precios, plazos, quién responde.",
    en: "More and more people ask ChatGPT instead of scrolling the ten blue results, and the base is the same as always: readable pages, correct structured data and verifiable information —prices, timelines, who answers.",
  },
  iaP2: {
    es: "Lo que no te vendo es una garantía de que un modelo te mencione. Eso no lo controla nadie.",
    en: "What I won't sell you is a guarantee that a model mentions you. Nobody controls that.",
  },
  iaSectorAntes: { es: "Si tu negocio es ", en: "If your business is " },
  iaSectorClinica: { es: "una clínica o un consultorio", en: "a clinic or a practice" },
  iaSectorMedio: { es: " o ", en: " or " },
  iaSectorSalon: { es: "un salón o un spa", en: "a salon or a spa" },
  iaSectorDespues: {
    es: ", ahí está lo que cambia en cada caso.",
    en: ", that's where what changes in each case is set out.",
  },

  verificarTitulo: { es: "Lo que puedes verificar hoy", en: "What you can verify today" },
  verificar: [
    {
      fuerte: { es: "Este mismo sitio.", en: "This very site." },
      resto: {
        es: " Ábrele el código: datos estructurados puestos, sitemap y canónicos, una sola página por intención de búsqueda y los precios publicados en vez de escondidos detrás de una llamada. Es el trabajo que te vendo, hecho sobre mí mismo.",
        en: " Open its source: structured data in place, sitemap and canonicals, one page per search intent and the prices published instead of hidden behind a call. It's the work I sell you, done on myself.",
      },
    },
    {
      fuerte: { es: "El artículo del mercado.", en: "The market article." },
      resto: {
        es: " lleva los rangos de las agencias, los precios de lista de las herramientas y la cuenta de la nómina, con fuente y fecha. Puedes comprobar cada dato.",
        en: " carries the agency ranges, the list prices of the tools and the payroll maths, with source and date. You can check every figure.",
      },
      enlace: {
        texto: {
          es: "¿Cuánto cuesta el SEO en Colombia?",
          en: "What does SEO cost in Colombia?",
        },
        href: "/blog/cuanto-cuesta-el-seo-en-colombia",
      },
    },
    {
      fuerte: { es: "Las páginas que están en línea.", en: "The sites that are live." },
      resto: {
        es: " Salieron con el SEO técnico incluido desde el primer día. Están en el portafolio, con su dominio, para que las abras y las midas tú.",
        en: " They went live with technical SEO included from day one. They're in the portfolio, with their domain, for you to open and measure yourself.",
      },
    },
  ] as readonly {
    fuerte: Texto;
    resto: Texto;
    enlace?: { texto: Texto; href: string };
  }[],
  /* NO HAY CASO DE CLIENTE CON SEIS MESES CUMPLIDOS, y por eso esta página no
     enseña resultados de posicionamiento de nadie. Es el dato que más pesa
     acá y el que más fácil sería inventar: una captura de Search Console sin
     dueño, un «+300% de impresiones» sin negocio detrás. Cuando exista un caso
     real —con nombre, ciudad, qué se hizo y qué muestran sus impresiones y sus
     clics— entra aquí. Mientras tanto lo que se enseña son las páginas que
     están en línea, que el visitante puede abrir y medir él mismo. */

  faqTitulo: { es: "Lo que siempre preguntan", en: "What people always ask" },
  faqGrupos: [
    { clave: "resultados", titulo: { es: "Resultados y plazos", en: "Results and timelines" } },
    { clave: "producto", titulo: { es: "Qué es y qué no es", en: "What it is and isn't" } },
    { clave: "arranque", titulo: { es: "Antes de arrancar", en: "Before starting" } },
    { clave: "mes", titulo: { es: "El trabajo de cada mes", en: "The monthly work" } },
  ] as readonly { clave: "resultados" | "producto" | "arranque" | "mes"; titulo: Texto }[],
  cierre: {
    titulo: { es: "Dime qué vendes y en qué ciudad", en: "Tell me what you sell and in which city" },
    cuerpo: {
      es: "Con eso miro tu sitio y las búsquedas de tu sector, y te digo si esto te sirve, por dónde empezaría y cuánto costaría. Si lo que necesitas no es SEO, te lo digo también: sale más barato para los dos.",
      en: "With that I look at your site and your sector's searches, and I tell you whether this is any use to you, where I'd start and what it would cost. If what you need isn't SEO, I'll say that too: it works out cheaper for both of us.",
    },
  },
} as const;

/**
 * LAS TRECE PREGUNTAS
 * ──────────────────────────────────────────────────────────────────────────
 * Van como texto, no como JSX: en el archivo original la respuesta era un
 * fragmento de React con enlaces dentro, y eso no se puede traducir sin
 * duplicar el marcado. Las tres que llevan enlace lo traen aparte, y el
 * componente lo pega al final.
 *
 * `{auditoria}`, `{puestaApunto}`, `{ficha}`, `{ciudadExtra}`, `{contenido}` y
 * `{meses}` los sustituye el componente con `lib/quote.ts`.
 */
export const SEO_FAQ: readonly {
  q: Texto;
  a: Texto;
  grupo: "resultados" | "producto" | "arranque" | "mes";
  enlace?: { texto: Texto; href: string };
}[] = [
  {
    grupo: "resultados",
    q: {
      es: "¿Me garantizas el primer puesto en Google?",
      en: "Do you guarantee me first place on Google?",
    },
    a: {
      es: "No, y desconfía de quien te lo ponga por escrito. Las posiciones las decide Google, no yo. Lo que sí te garantizo es el trabajo hecho, medido y visible en un informe. Los primeros movimientos se ven entre el mes 3 y el 6.",
      en: "No, and be wary of anyone who puts it in writing. Google decides positions, not me. What I do guarantee is the work done, measured and visible in a report. The first movement shows between month 3 and 6.",
    },
  },
  {
    grupo: "resultados",
    q: { es: "¿En cuánto tiempo veo algo?", en: "How long until I see something?" },
    a: {
      es: "Entre el mes 3 y el mes 6 empiezan a moverse las primeras búsquedas. Antes de eso hay datos, y sirven para corregir el rumbo, no para juzgar si funcionó. Si alguien te promete resultados en tres semanas, te está vendiendo otra cosa.",
      en: "Between month 3 and month 6 the first searches start to move. Before that there's data, and it's for correcting course, not for judging whether it worked. If someone promises you results in three weeks, they're selling you something else.",
    },
  },
  {
    grupo: "producto",
    q: {
      es: "¿Por qué es mensual y no un pago único?",
      en: "Why is it monthly and not a one-off payment?",
    },
    a: {
      es: "Porque no es una obra que se termina. Tu competencia también publica, Google cambia sus criterios y las búsquedas de tu sector se mueven. Lo que sí es de una sola vez es el SEO técnico y el arreglo del sitio: eso se hace, queda hecho y no se vuelve a cobrar.",
      en: "Because it isn't a job that finishes. Your competition publishes too, Google changes its criteria and your sector's searches move. What is one-off is the technical SEO and the site fixes: that gets done, stays done and isn't charged again.",
    },
  },
  {
    grupo: "producto",
    q: {
      es: "¿Qué diferencia hay entre el SEO técnico que viene con la web y esto que me cobras aparte?",
      en: "What's the difference between the technical SEO that comes with the site and this that you charge separately?",
    },
    a: {
      es: "El SEO técnico es que Google pueda leer y mostrar bien tu página: títulos, datos estructurados, sitemap, velocidad, imágenes. Se hace una vez, va incluido cuando yo hago el sitio y se acaba. Posicionar es el trabajo continuo de ganarle terreno a otros que también están trabajando. Confundirlos es lo que hace que el mes dos decepcione.",
      en: "Technical SEO is Google being able to read and display your page properly: titles, structured data, sitemap, speed, images. It's done once, it's included when I build the site, and it's finished. Ranking is the continuous work of gaining ground on others who are also working at it. Confusing the two is what makes month two disappointing.",
    },
  },
  {
    grupo: "mes",
    q: {
      es: "¿Qué me entregas cada mes? ¿Cómo sé que trabajaste?",
      en: "What do you deliver each month? How do I know you worked?",
    },
    a: {
      es: "Un informe con lo hecho, lo que se movió y lo que sigue. Y algo que vale más que el informe: acceso de lectura a tu propia Search Console y a tu analítica. Esos números no los maquilla nadie. Es la pregunta de una línea que resuelve cualquier duda con cualquier proveedor: ¿me das acceso de lectura a mi Search Console?",
      en: "A report with what was done, what moved and what's next. And something worth more than the report: read access to your own Search Console and your analytics. Nobody touches up those numbers. It's the one-line question that settles any doubt with any provider: will you give me read access to my Search Console?",
    },
  },
  {
    grupo: "arranque",
    q: {
      es: "¿Puedo contratar solo la auditoría y arreglarlo yo?",
      en: "Can I hire only the audit and fix it myself?",
    },
    a: {
      es: "Sí. La auditoría cuesta {auditoria} y sale en 5 días. Te queda la lista de lo que está frenando el sitio, en orden de qué se arregla primero. Si lo arreglas tú o tu desarrollador, perfecto: para eso está escrita en español y no en jerga.",
      en: "Yes. The audit costs {auditoria} and takes 5 days. You're left with the list of what's holding the site back, in the order it gets fixed. If you or your developer fix it, perfect: that's why it's written in plain language and not in jargon.",
    },
  },
  {
    grupo: "arranque",
    q: { es: "¿Sirve si la página me la hizo otro?", en: "Does it work if someone else built my site?" },
    a: {
      es: "Sí, y es la mitad de los casos. Por eso existe la revisión y arreglo del sitio de {puestaApunto}: es dejar la base pareja antes de empezar a empujar. Si la página la hice yo con SEO técnico incluido, eso ya está hecho y no se cobra.",
      en: "Yes, and it's half the cases. That's why the site review and fix at {puestaApunto} exists: it levels the base before starting to push. If I built the site with technical SEO included, that's already done and isn't charged.",
    },
  },
  {
    grupo: "resultados",
    q: { es: "Si dejo de pagar, ¿pierdo lo que gané?", en: "If I stop paying, do I lose what I gained?" },
    a: {
      es: "No de un día para otro, y nada de lo hecho se borra: las páginas, los contenidos, los arreglos y la ficha son tuyos y quedan. Lo que pasa es que el trabajo se detiene y los demás siguen, así que lo ganado se va desgastando con los meses. No es un interruptor, es una inercia.",
      en: "Not overnight, and nothing that was done gets deleted: the pages, the content, the fixes and the profile are yours and they stay. What happens is that the work stops and everyone else carries on, so what you gained wears down over the months. It isn't a switch, it's inertia.",
    },
  },
  {
    grupo: "arranque",
    q: {
      es: "¿Necesito la ficha de Google Business? ¿La creas tú?",
      en: "Do I need a Google Business profile? Do you create it?",
    },
    a: {
      es: "Si atiendes clientes de una ciudad, es lo que más mueve y es gratis tenerla. Sin ficha no sales en el mapa ni en el bloque de tres resultados que aparece arriba de todo, y no puedes recibir reseñas. Si no la tienes, la creo y la verifico por {ficha}, una sola vez.",
      en: "If you serve customers in a city, it's what moves the needle most and it's free to have. Without a profile you don't show on the map or in the block of three results at the top, and you can't receive reviews. If you don't have one, I create it and verify it for {ficha}, once.",
    },
  },
  {
    grupo: "producto",
    q: {
      es: "Otros me cobran $250.000 al mes. ¿Por qué tú cobras más?",
      en: "Others charge me $250,000 COP a month. Why do you charge more?",
    },
    a: {
      es: "Porque por debajo de cierto precio no se compra menos SEO: se compra otra cosa con el mismo nombre —enlaces comprados, artículos de máquina sin revisar, o un PDF exportado de una herramienta con un logo encima—. La cuenta completa, con los precios de las herramientas y las horas que lleva un mes de trabajo, la escribí con fuentes en",
      en: "Because below a certain price you don't buy less SEO: you buy something else with the same name —bought links, unreviewed machine-written articles, or a PDF exported from a tool with a logo on top—. The full maths, with tool prices and the hours a month of work takes, I wrote with sources in",
    },
    enlace: {
      texto: { es: "cuánto cuesta el SEO en Colombia", en: "what SEO costs in Colombia" },
      href: "/blog/cuanto-cuesta-el-seo-en-colombia",
    },
  },
  {
    grupo: "mes",
    q: {
      es: "¿Cuántas ciudades y cuántas búsquedas cubre el plan?",
      en: "How many cities and how many searches does the plan cover?",
    },
    a: {
      es: "El plan de entrada trabaja una ciudad y un servicio principal a fondo, con vigilancia de hasta 30 búsquedas. Cada ciudad adicional suma {ciudadExtra} al mes. Prefiero una ciudad bien trabajada que cinco a medias: repartir el mismo esfuerzo entre cinco no posiciona en ninguna.",
      en: "The entry plan works one city and one main service properly, with tracking for up to 30 searches. Each additional city adds {ciudadExtra} a month. I'd rather have one city done well than five done halfway: splitting the same effort across five ranks in none of them.",
    },
  },
  {
    grupo: "producto",
    q: {
      es: "¿Esto sirve para que me mencione ChatGPT o la IA de Google?",
      en: "Does this help ChatGPT or Google's AI mention me?",
    },
    a: {
      es: "Ayuda, y es la misma base: los modelos y los resúmenes con IA se alimentan de páginas que se pueden leer, con datos estructurados y con información concreta y verificable. Lo que no te puedo vender es una garantía de que un modelo te nombre: nadie controla eso, ni siquiera quien lo entrena.",
      en: "It helps, and it's the same base: models and AI summaries feed on pages that can be read, with structured data and concrete, verifiable information. What I can't sell you is a guarantee that a model names you: nobody controls that, not even whoever trains it.",
    },
  },
  {
    grupo: "arranque",
    q: {
      es: "Vendo casi todo por WhatsApp. ¿El SEO me sirve igual?",
      en: "I sell almost everything over WhatsApp. Is SEO still any use to me?",
    },
    a: {
      es: "Sí, y son dos piezas del mismo camino. El posicionamiento trae la conversación; el chatbot de WhatsApp la atiende a la hora que llegue. Traer gente a un número que contesta al otro día es pagar por perderla.",
      en: "Yes, and they're two pieces of the same path. SEO brings the conversation; the WhatsApp chatbot answers it whenever it arrives. Bringing people to a number that replies the next day is paying to lose them.",
    },
    enlace: {
      texto: { es: "Ver el chatbot de WhatsApp", en: "See the WhatsApp chatbot" },
      href: "/servicios/chatbot-whatsapp",
    },
  },
  {
    grupo: "mes",
    q: { es: "¿Tengo que escribir blog? ¿Lo escribes tú?", en: "Do I have to write a blog? Do you write it?" },
    a: {
      es: "Lo escribo yo. El plan de entrada trae 2 contenidos al mes, investigados, escritos, publicados y enlazados desde y hacia las páginas que corresponden. Si quieres más, cada contenido adicional cuesta {contenido} al mes.",
      en: "I write it. The entry plan brings 2 pieces of content a month, researched, written, published and linked from and to the pages they belong with. If you want more, each additional piece costs {contenido} a month.",
    },
  },
  {
    grupo: "resultados",
    q: {
      es: "¿Cuánto tiempo tengo que quedarme amarrado?",
      en: "How long am I locked in for?",
    },
    a: {
      es: "Nada. No hay cláusula de permanencia y se paga mes a mes. Lo que sí te pido es que lo mires con horizonte de {meses} meses, porque antes de eso los números todavía no dicen si sirvió. Si a los tres meses no ves movimiento y no te puedo explicar por qué, no tiene sentido que sigas.",
      en: "Not at all. There's no lock-in clause and it's paid month to month. What I do ask is that you look at it over a {meses}-month horizon, because before that the numbers still don't say whether it worked. If at three months you see no movement and I can't explain why, there's no sense in you carrying on.",
    },
  },
];
