import type { Texto, Traducido } from "@/content/types";

/**
 * DISEÑO DE PÁGINAS WEB, EN LAS DOS LENGUAS
 * ──────────────────────────────────────────────────────────────────────────
 * Es el término principal del negocio. Una sola página para una sola
 * intención: «diseño web», «creación de páginas web», «hacer una página web» y
 * «diseño de sitios web» son la misma búsqueda y viven todas aquí. Crear una
 * por sinónimo produce doorway pages y Google las castiga desde hace más de
 * diez años.
 *
 * LO QUE NO ENTRA, Y ES DELIBERADO: la tienda virtual tiene página propia; el
 * desglose de «cuánto cuesta» es del blog; la comparativa de precios es de
 * /precios; y las ciudades ya tienen sus tres páginas.
 *
 * EN INGLÉS SE MANTIENE TODO menos las tres páginas de ciudad, que son SEO
 * local en español y desde el inglés apuntan a la española.
 */

export const WEB = {
  badge: { es: "Diseño de páginas web", en: "Web design" },
  titulo: { es: "Diseño de páginas web", en: "Web design" },
  tituloAcento: {
    es: "para negocios que quieren vender más",
    en: "for businesses that want to sell more",
  },
  entradilla: {
    es: "Tu próximo cliente te busca en el celular ahora mismo. Si encuentra un perfil sin precios, sin horario y sin forma clara de escribirte, se va al de al lado. Una página web contesta esas tres cosas mientras tú trabajas.",
    en: "Your next customer is searching for you on their phone right now. If they find a profile with no prices, no hours and no clear way to write to you, they go to the one next door. A website answers those three things while you work.",
  },
  ctaPrincipal: { es: "Agenda una llamada", en: "Book a call" },
  ctaSecundario: { es: "Ver el precio y el plazo", en: "See the price and timeline" },
  ubicacion: {
    es: "Turbaco, Bolívar · trabajo con negocios de Cartagena y de toda Colombia",
    en: "Turbaco, Bolívar · I work with businesses in Cartagena and all of Colombia",
  },

  diferenciador: {
    titulo: {
      es: "Casi nadie publica precio y plazo juntos.",
      en: "Almost nobody publishes price and timeline together.",
    },
    acento: {
      es: "Y ninguno dice quién escribe el código.",
      en: "And none of them says who writes the code.",
    },
    parrafo1: {
      es: "Unas agencias ponen precio y no dicen cuánto tardan; otras dicen «de 4 a 8 semanas» y te mandan a un formulario. Saber cuánto te cuesta te toma tres llamadas.",
      en: "Some agencies give a price and don't say how long they take; others say “4 to 8 weeks” and send you to a form. Finding out what it costs you takes three calls.",
    },
    fuerte: {
      es: "Acá está el número, el plazo y el nombre.",
      en: "Here's the number, the timeline and the name.",
    },
    parrafo2: {
      es: " Me llamo Luis Jaller, vivo en Turbaco, Bolívar, y soy el que diseña y el que programa. Hablas con la misma persona de la primera llamada a la entrega.",
      en: " I'm Luis Jaller, I live in Turbaco, Bolívar, and I'm the one who designs and the one who codes. You talk to the same person from the first call to handover.",
    },
  },

  /**
   * LA TABLA DEL DIFERENCIADOR
   * ────────────────────────────────────────────────────────────────────────
   * No dice nada que no diga ya el párrafo de arriba: «unas agencias ponen
   * precio y no dicen cuánto tardan; otras dicen "de 4 a 8 semanas" y te
   * mandan a un formulario». La tabla es ESE párrafo en tres filas, para que
   * se vea de un golpe lo que en prosa hay que reconstruir leyendo.
   *
   * Por eso las celdas de las dos primeras filas son «sí», «no» y «no lo
   * dice», y nada más: cualquier otra cosa sería una afirmación sobre
   * terceros que el copy no hace y que no se puede sostener. El «de 4 a 8
   * semanas» va entrecomillado porque es la cita que ya estaba escrita.
   */
  tabla: {
    titulo: { es: "Quién publica qué", en: "Who publishes what" },
    columnas: {
      es: ["Precio publicado", "Plazo publicado", "Quién programa"],
      en: ["Price published", "Timeline published", "Who writes the code"],
    } as Traducido<readonly string[]>,
    si: { es: "Sí", en: "Yes" },
    no: { es: "No", en: "No" },
    calla: { es: "No lo dice", en: "Doesn't say" },
    filas: [
      {
        quien: { es: "Unas agencias", en: "Some agencies" },
        celdas: ["si", "no", "calla"],
      },
      {
        quien: { es: "Otras", en: "Others" },
        celdas: ["no", "cita", "calla"],
        cita: { es: "«de 4 a 8 semanas»", en: "“4 to 8 weeks”" },
      },
      {
        quien: { es: "Acá", en: "Here" },
        celdas: ["piso", "plazo", "nombre"],
        propia: true,
      },
    ] as readonly {
      quien: Texto;
      celdas: readonly string[];
      cita?: Texto;
      propia?: boolean;
    }[],
  },

  paraQuienTitulo: {
    es: "Nadie se levanta queriendo «una página web»",
    en: "Nobody wakes up wanting “a website”",
  },
  paraQuienEntradilla: {
    es: "Se levanta con uno de estos seis problemas.",
    en: "They wake up with one of these six problems.",
  },
  paraQuien: [
    {
      icono: "movil",
      titulo: {
        es: "Todo tu negocio vive en Instagram",
        en: "Your whole business lives on Instagram",
      },
      cuerpo: {
        es: "Un perfil te da alcance. Pero el que te busca por tu nombre en Google no encuentra nada.",
        en: "A profile gives you reach. But whoever searches your name on Google finds nothing.",
      },
      enlace: {
        texto: {
          es: "¿Página web o solo Instagram?",
          en: "Website or just Instagram?",
        },
        href: {
          es: "/blog/pagina-web-o-solo-instagram",
          en: "/en/blog/website-or-just-instagram",
        },
      },
    },
    {
      icono: "rehacer",
      titulo: {
        es: "Tienes página, pero te da pena mandarla",
        en: "You have a site, but you're embarrassed to send it",
      },
      cuerpo: {
        es: "Se hizo hace cinco años y en el celular se ve corrida. Más del 70% de las búsquedas en Colombia salen del teléfono: ahí se pierde el cliente.",
        en: "It was built five years ago and looks broken on a phone. Over 70% of searches in Colombia come from a phone: that's where the customer is lost.",
      },
    },
    {
      icono: "llave",
      titulo: {
        es: "No la puedes tocar sin llamar a alguien",
        en: "You can't touch it without calling someone",
      },
      cuerpo: {
        es: "Cambiar un precio o subir una foto se volvió un favor que hay que pedir. Es la queja número uno que escucho.",
        en: "Changing a price or uploading a photo turned into a favour you have to ask for. It's the number one complaint I hear.",
      },
    },
    {
      icono: "landing",
      titulo: {
        es: "Vas a pautar y no tienes a dónde mandar el clic",
        en: "You're about to run ads and have nowhere to send the click",
      },
      cuerpo: {
        es: "Mandar la pauta a un perfil de Instagram es botar plata. Para eso está la landing: una página, un objetivo y la conversión medida.",
        en: "Sending ad traffic to an Instagram profile is throwing money away. That's what a landing page is for: one page, one goal and the conversion measured.",
      },
    },
    {
      icono: "empresa",
      titulo: {
        es: "El negocio creció y la página quedó chiquita",
        en: "The business grew and the site stayed small",
      },
      cuerpo: {
        es: "Ya no son dos servicios, son ocho, y ya no eres tú solo. Eso es una web corporativa, con panel para mantenerla al día tú.",
        en: "It's not two services any more, it's eight, and it's not just you. That's a corporate site, with a panel so you keep it up to date yourself.",
      },
    },
    {
      icono: "buscar",
      titulo: {
        es: "Quieres rehacerla, pero te da miedo perder lo posicionado",
        en: "You want to redo it, but you're afraid of losing your rankings",
      },
      cuerpo: {
        es: "Miedo con fundamento y con solución: se traen los textos, se redirigen las direcciones viejas y se conserva lo que ya rankea.",
        en: "A well-founded fear with a solution: the text comes across, the old addresses are redirected and what already ranks is preserved.",
      },
    },
  ] as readonly {
    icono: string;
    titulo: Texto;
    cuerpo: Texto;
    enlace?: { texto: Texto; href: Traducido<string> };
  }[],

  /* Lo que entra en cualquier proyecto. Está aquí y no en `lib/quote.ts`
     porque el cotizador es interno y monolingüe; la página es pública y va en
     dos lenguas. Los dos últimos son de esta página. */
  incluyeSiempre: {
    es: [
      "Diseño propio, sin plantilla comprada",
      "Adaptado a teléfono, tableta y computador",
      "Formulario de contacto que llega a tu correo y a tu WhatsApp",
      "Velocidad y accesibilidad revisadas antes de entregar",
      "Certificado de seguridad (HTTPS) y respaldo del sitio",
      "Capacitación de entrega y 30 días de ajustes sin costo",
      "Dominio a tu nombre y correo con tu dirección: hola@tumarca.com, no @gmail.com",
      "SEO técnico de entrega: título y descripción por página, datos estructurados, sitemap y alta en Google Search Console",
    ],
    en: [
      "Original design, no bought template",
      "Works on phone, tablet and desktop",
      "Contact form that reaches your inbox and your WhatsApp",
      "Speed and accessibility checked before handover",
      "Security certificate (HTTPS) and site backup",
      "Handover training and 30 days of adjustments at no cost",
      "Domain in your name and email at your address: hello@yourbrand.com, not @gmail.com",
      "Technical SEO at handover: title and description per page, structured data, sitemap and Google Search Console setup",
    ],
  } as Traducido<readonly string[]>,

  formatosTitulo: {
    es: "Tres formatos, cada uno con su piso y su plazo",
    en: "Three formats, each with its floor price and timeline",
  },
  formatosEntradillaAntes: {
    es: "Es un piso, no una tarifa cerrada: el número final depende de cuántas páginas, de quién escriba los textos y de qué funciones lleve, y te lo doy por escrito antes de que pagues nada. La tabla completa está en ",
    en: "It's a floor, not a fixed rate: the final number depends on how many pages, who writes the copy and what features it carries, and I give it to you in writing before you pay anything. The full table is in ",
  },
  formatosEntradillaEnlace: { es: "precios", en: "pricing" },
  badgePrecio: { es: "Precio y plazo", en: "Price and timeline" },
  /* El pie del ticket del hero. NO es una frase nueva: es la primera oración
     de `formatosEntradillaAntes`, la que abre la sección de precio. Se repite
     aquí porque el número grande del hero sin esa condición se lee como tarifa
     cerrada, y la condición estaba mil píxeles más abajo. */
  ticketNota: {
    es: "Es un piso, no una tarifa cerrada.",
    en: "It's a floor, not a fixed rate.",
  },
  tambien: { es: "también:", en: "also called:" },
  quePaginas: { es: "Qué páginas trae", en: "Which pages it comes with" },
  ademasDe: { es: "Además de lo de siempre", en: "On top of the usual" },
  desde: { es: "desde", en: "from" },
  segunLoQueHaya: { es: "según lo que haya hoy", en: "depends on what's there today" },

  formatos: [
    {
      icono: "landing",
      nombre: { es: "Landing page", en: "Landing page" },
      tambien: { es: "página de aterrizaje", en: "one-page site" },
      paginas: {
        es: ["Una sola página con todas sus secciones"],
        en: ["A single page with all its sections"],
      },
      incluye: {
        es: [
          "Una sección de héroe pensada para convertir, no para decorar",
          "Bloques de servicios, prueba social y preguntas frecuentes",
          "Botón de WhatsApp fijo mientras el visitante baja",
          "Página de gracias, para poder medir la conversión",
        ],
        en: [
          "A hero section built to convert, not to decorate",
          "Blocks for services, social proof and frequently asked questions",
          "A WhatsApp button that stays put as the visitor scrolls",
          "A thank-you page, so the conversion can be measured",
        ],
      },
    },
    {
      icono: "empresa",
      nombre: { es: "Página web corporativa", en: "Corporate website" },
      tambien: {
        es: "web corporativa, sitio institucional",
        en: "company site, institutional site",
      },
      paginas: {
        es: ["Inicio", "Nosotros", "Servicios", "Contacto", "Aviso de privacidad y términos"],
        en: ["Home", "About", "Services", "Contact", "Privacy notice and terms"],
      },
      incluye: {
        es: [
          "Menú de navegación y pie de página completos",
          "Panel para que edites textos e imágenes sin tocar código",
          "Ficha de cada servicio dentro de la página de Servicios",
          "Datos estructurados de negocio local para Google",
        ],
        en: [
          "Full navigation menu and footer",
          "A panel so you edit text and images without touching code",
          "A card for each service inside the Services page",
          "Local business structured data for Google",
        ],
      },
    },
    {
      icono: "rehacer",
      nombre: { es: "Rediseño de la que ya tienes", en: "Redesign of the one you have" },
      tambien: { es: "migración", en: "migration" },
      paginas: {
        es: ["Las que tenga hoy tu sitio, revisadas una por una"],
        en: ["Whatever your site has today, reviewed one by one"],
      },
      incluye: {
        es: [
          "Revisión de lo que hay: qué se salva y qué se bota, dicho antes de empezar",
          "Traslado de textos, fotos, productos y artículos",
          "Redirecciones de las direcciones viejas para no perder el posicionamiento",
          "Comparación de velocidad antes y después, con los números a la vista",
        ],
        en: [
          "A review of what's there: what stays and what goes, said before starting",
          "Moving over text, photos, products and articles",
          "Redirects for the old addresses so no rankings are lost",
          "A speed comparison before and after, with the numbers in plain sight",
        ],
      },
    },
  ],

  arbol: {
    p1: {
      es: "¿Vas a cobrar en línea, con carrito y pago?",
      en: "Are you going to charge online, with a cart and payment?",
    },
    p1si: { es: "Sí, quiero vender", en: "Yes, I want to sell" },
    p1no: { es: "No por ahora", en: "Not for now" },
    tienda: {
      titulo: { es: "Eso ya es una tienda virtual", en: "That's an online store already" },
      detalle: {
        es: "Carrito, inventario y pagos dejan de ser una página web. Va por otro lado, con otro precio y otro plazo.",
        en: "Cart, inventory and payments stop being a website. It goes elsewhere, with another price and another timeline.",
      },
      enlace: { es: "Ver tiendas virtuales", en: "See online stores" },
      href: { es: "/servicios/tiendas-virtuales", en: "/en/services/online-stores" },
      semanas: { es: "3 a 5 semanas", en: "3 to 5 weeks" },
    },
    p2: { es: "¿La página ya existe?", en: "Does the site already exist?" },
    p2si: { es: "Sí, hay una", en: "Yes, there's one" },
    p2no: { es: "No, de cero", en: "No, from scratch" },
    rediseno: {
      titulo: { es: "Rediseño de la que ya tienes", en: "Redesign of the one you have" },
      detalle: {
        es: "Primero la reviso y te digo qué se salva. El precio sale de esa revisión, no de un tarifario.",
        en: "First I review it and tell you what's worth keeping. The price comes out of that review, not out of a rate card.",
      },
      pie: {
        es: "Sin piso publicable · sale de la revisión",
        en: "No publishable floor · comes out of the review",
      },
    },
    p3: {
      es: "¿Un solo servicio o el negocio completo?",
      en: "One service or the whole business?",
    },
    p3uno: { es: "Un servicio o una campaña", en: "One service or one campaign" },
    p3todo: { es: "El negocio completo", en: "The whole business" },
    landing: {
      titulo: { es: "Landing page", en: "Landing page" },
      detalle: {
        es: "Una sola página, un solo objetivo y la conversión medida.",
        en: "One page, one goal and the conversion measured.",
      },
      dias: { es: "5 días", en: "5 days" },
    },
    corporativa: {
      titulo: { es: "Página web corporativa", en: "Corporate website" },
      detalle: {
        es: "Varias páginas —servicios, quiénes somos, contacto— y panel para mantenerla al día tú.",
        en: "Several pages —services, about, contact— and a panel so you keep it up to date yourself.",
      },
      semanas: { es: "1 a 2 semanas", en: "1 to 2 weeks" },
    },
  },

  /**
   * La nota con la que llega el formulario de agenda cuando se entra desde el
   * selector. `{formato}` es el resultado del árbol y `{detalle}` su piso y su
   * plazo, los dos tal cual salen de `lib/quote.ts`: aquí no se escribe ni una
   * cifra.
   *
   * Se escribe en primera persona del visitante porque es SU nota: la va a ver
   * en el campo de mensaje y la puede borrar o cambiar antes de enviar.
   */
  notaSelector: {
    es: "Contesté el selector de la página de diseño web y me salió: {formato} ({detalle}).",
    en: "I answered the selector on the web design page and it suggested: {formato} ({detalle}).",
  },

  comparador: {
    incluye: {
      es: "Lo que entra siempre, sea cual sea el formato",
      en: "What's always included, whatever the format",
    },
    noIncluyeAntes: { es: "Y lo que ", en: "And what " },
    noIncluyeAcento: { es: "no", en: "doesn't" },
    noIncluyeDespues: { es: " entra", en: " come with it" },
    nota: {
      es: "Esta lista vale más que la de arriba. Todo pleito que he visto entre un negocio y su proveedor web empezó por algo que nadie dijo al principio.",
      en: "This list is worth more than the one above. Every dispute I've seen between a business and its web provider started with something nobody said up front.",
    },
  },

  /* `{piso}`, `{ecom}`, `{auditoria}`, `{seoMes}` y `{marca}` los sustituye el
     componente con los números de `lib/quote.ts`: aquí no se escribe ni una
     cifra a mano. */
  noIncluye: [
    {
      texto: {
        es: "El presupuesto de pauta. Dejo la landing y la medición funcionando; lo que le pagas a Meta o a Google Ads lo pones tú.",
        en: "The ad budget. I leave the landing page and the tracking working; what you pay Meta or Google Ads is yours to put in.",
      },
      quien: { es: "tu tarjeta", en: "your card" },
    },
    {
      texto: {
        es: "El posicionamiento mensual. El SEO técnico de entrega sí va; posicionar es trabajo de todos los meses: auditoría desde {auditoria} y plan local desde {seoMes} al mes.",
        en: "Monthly SEO. Technical SEO at handover is included; ranking is monthly work: an audit from {auditoria} and a local plan from {seoMes} a month.",
      },
      quien: { es: "se cotiza aparte", en: "quoted separately" },
    },
    {
      texto: {
        es: "Carrito, inventario y pagos en línea. Eso ya es una tienda virtual: desde {ecom} y de 3 a 5 semanas.",
        en: "Cart, inventory and online payments. That's an online store already: from {ecom} and 3 to 5 weeks.",
      },
      quien: { es: "otra página, otro precio", en: "another page, another price" },
    },
    {
      texto: {
        es: "Sesión de fotos y video. Uso banco de imágenes con licencia y te arreglo las que tomes con el celular.",
        en: "A photo or video shoot. I use licensed stock and clean up the ones you take with your phone.",
      },
      quien: { es: "un fotógrafo", en: "a photographer" },
    },
    {
      texto: {
        es: "Logo y marca desde cero. Si ya tienes logo, lo aplicamos; crear la identidad se cotiza desde {marca}.",
        en: "A logo and brand from scratch. If you already have a logo, we apply it; creating the identity is quoted from {marca}.",
      },
      quien: { es: "se cotiza aparte", en: "quoted separately" },
    },
    {
      texto: {
        es: "Redes sociales y contenido de todos los meses. No manejo cuentas ni programo publicaciones, y te lo digo de una vez en vez de venderlo mal.",
        en: "Social media and monthly content. I don't run accounts or schedule posts, and I say so up front instead of selling it badly.",
      },
      quien: { es: "no es lo mío", en: "not my thing" },
    },
  ] as readonly { texto: Texto; quien: Texto }[],

  procesoTitulo: { es: "Cómo se hace", en: "How it's done" },
  procesoEntradilla: {
    es: "Antes del día 1 hay una llamada de veinte minutos con el precio por escrito. Esa no cuesta nada y no cuenta como día de trabajo.",
    en: "Before day 1 there's a twenty-minute call with the price in writing. That one costs nothing and doesn't count as a working day.",
  },
  previo: {
    etiqueta: { es: "Antes del día 1", en: "Before day 1" },
    texto: {
      es: "Tu contenido y tu marca, en mi mano. El reloj todavía no ha arrancado.",
      en: "Your content and your brand, in my hands. The clock hasn't started yet.",
    },
  },
  hitos: [
    {
      etiqueta: { es: "Día 1", en: "Day 1" },
      texto: {
        es: "Estructura: qué ve tu cliente, en qué orden y qué quieres que haga.",
        en: "Structure: what your customer sees, in what order and what you want them to do.",
      },
    },
    {
      etiqueta: { es: "Día 2 y 3", en: "Day 2 and 3" },
      texto: {
        es: "Diseño y programación, al mismo tiempo. Lo que apruebas es lo que se publica.",
        en: "Design and code, at the same time. What you approve is what goes live.",
      },
    },
    {
      etiqueta: { es: "Día 4", en: "Day 4" },
      texto: {
        es: "La revisas conmigo en vivo, en tu teléfono y en tu computador.",
        en: "You review it with me live, on your phone and on your computer.",
      },
    },
    {
      etiqueta: { es: "Día 5", en: "Day 5" },
      texto: {
        es: "Sale al aire con dominio, certificado, correo y medición. Y te enseño a manejarla.",
        en: "It goes live with domain, certificate, email and tracking. And I teach you to run it.",
      },
    },
  ] as readonly { etiqueta: Texto; texto: Texto }[],

  acopio: {
    titulo: {
      es: "Qué necesito de ti para arrancar",
      en: "What I need from you to start",
    },
    nota: {
      es: "El reloj arranca cuando llega el material, no al aceptar la propuesta.",
      en: "The clock starts when the material arrives, not when the proposal is accepted.",
    },
    items: {
      es: [
        "Tu logo, en el mejor archivo que tengas",
        "Los textos, o el visto bueno para que los escriba yo",
        "Fotos del negocio, del equipo y del trabajo hecho",
        "Precios o tarifas, si los vas a publicar",
        "Horarios reales, sábados incluidos",
        "Accesos al dominio y al correo, si ya los tienes",
      ],
      en: [
        "Your logo, in the best file you have",
        "The copy, or the go-ahead for me to write it",
        "Photos of the business, the team and the work done",
        "Prices or rates, if you're going to publish them",
        "Real opening hours, Saturdays included",
        "Access to the domain and the email, if you already have them",
      ],
    } as Traducido<readonly string[]>,
    listos: { es: "listos", en: "ready" },
    de: { es: "de", en: "of" },
  },

  /**
   * LA PIEZA FIRMA: «Cinco días, en pantalla».
   *
   * Los pasos NO se escriben aquí otra vez: son `previo` y `hitos`, los
   * mismos que ya contaba el riel de plazo. Lo único que se añade es lo que
   * hay que poder leer de la ilustración sin verla —`pantalla`—, que es el
   * texto que oye quien usa lector de pantalla y lo que se lee si el dibujo
   * no carga. Va en el mismo orden: primero el previo, después los cuatro
   * días.
   */
  firma: {
    titulo: { es: "Cinco días, en pantalla", en: "Five days, on screen" },
    /* Decía «el marco de la derecha va cambiando»: en un teléfono no hay
       marco a la derecha —cada paso lleva el suyo debajo— y la frase era
       falsa justo donde llega la mayoría. */
    entradilla: {
      es: "Lo mismo de arriba, pero viéndolo: qué hay en la pantalla cada uno de los cinco días.",
      en: "The same as above, but seen: what's on the screen on each of the five days.",
    },
    pantallas: {
      es: [
        "El logo, las fotos y los textos entran al marco como archivos sueltos.",
        "El marco enseña la estructura en bloques grises, todavía sin color ni tipografía.",
        "El marco partido en dos: a un lado el diseño con color y tipografía, al otro el código que lo produce.",
        "El marco se desdobla en teléfono y computador, con notas de revisión que se van resolviendo.",
        "La barra de dirección con candado, el dominio propio y el punto de «en línea».",
      ],
      en: [
        "The logo, the photos and the copy drop into the frame as loose files.",
        "The frame shows the structure in grey blocks, still with no colour or typography.",
        "The frame split in two: on one side the design with colour and type, on the other the code that produces it.",
        "The frame unfolds into a phone and a desktop, with review notes being resolved.",
        "The address bar with its padlock, the domain of your own and the “online” dot.",
      ],
    } as Traducido<readonly string[]>,
    /* El rótulo del marco del día 5. El dominio de ejemplo ya estaba escrito
       en la lista de «lo que entra siempre» (hola@tumarca.com): es el mismo
       nombre, no uno nuevo. */
    dominioEjemplo: { es: "tumarca.com", en: "yourbrand.com" },
    enLinea: { es: "En línea", en: "Online" },
  },

  faqTitulo: { es: "Lo que siempre preguntan", en: "What people always ask" },
  faqEntradilla: {
    es: "Están contestadas de frente, incluidas las incómodas.",
    en: "Answered head-on, the uncomfortable ones included.",
  },

  cierre: {
    titulo: { es: "Cuéntame qué vendes y a quién", en: "Tell me what you sell and to whom" },
    cuerpo: {
      es: "Veinte minutos bastan para saber qué formato te conviene, cuánto costaría y en cuánto queda lista. Si no necesitas una página web, te lo digo.",
      en: "Twenty minutes is enough to know which format suits you, what it would cost and how soon it's ready. If you don't need a website, I'll tell you.",
    },
  },
} as const;

/**
 * LAS QUINCE PREGUNTAS
 * ──────────────────────────────────────────────────────────────────────────
 * Van aparte porque son la mitad del archivo y porque son lo que más se edita.
 * `{piso}`, `{mantenimiento}` y `{renovacion}` los sustituye el componente con
 * los números de `lib/quote.ts`.
 *
 * `verify` marca un dato SIN CONFIRMAR. Se pinta a la vista en desarrollo y
 * `sinPendientes()` lo quita en producción: una cifra inventada cuesta más que
 * un hueco.
 */
export const WEB_FAQ_GRUPOS = [
  {
    clave: "precio",
    titulo: { es: "Precio y pagos", en: "Price and payments" },
  },
  {
    clave: "plazo",
    titulo: { es: "Plazo, textos y ajustes", en: "Timeline, copy and revisions" },
  },
  {
    clave: "tuyo",
    titulo: { es: "Qué recibes y de quién es", en: "What you get and whose it is" },
  },
  {
    clave: "google",
    titulo: { es: "Google y posicionamiento", en: "Google and rankings" },
  },
  {
    clave: "trabajar",
    titulo: { es: "Trabajar conmigo", en: "Working with me" },
  },
] as const satisfies readonly { clave: string; titulo: Texto }[];

export type GrupoFaq = (typeof WEB_FAQ_GRUPOS)[number]["clave"];

export const WEB_FAQ: readonly {
  q: Texto;
  a: Texto;
  /** A qué bloque del acordeón pertenece. Ver `WEB_FAQ_GRUPOS`. */
  grupo: GrupoFaq;
  verify?: string;
}[] = [
  {
    grupo: "precio",
    q: {
      es: "¿Cuánto me cuesta y qué entra exactamente por ese precio?",
      en: "What does it cost me and what exactly do I get for that price?",
    },
    a: {
      es: "Desde {piso}, y lo que entra por ese piso está en la lista de «lo que entra siempre»: diseño propio sin plantilla, programación, que se vea bien en teléfono y computador, el formulario que te llega al correo y al WhatsApp, certificado de seguridad, capacitación y 30 días de ajustes sin costo. Es un piso, no una tarifa cerrada: el número final depende de cuántas páginas, de quién escriba los textos y de qué funciones lleve, y te lo doy por escrito antes de que pagues nada.",
      en: "From {piso}, and what that floor buys is in the “what's always included” list: original design with no template, the code, working properly on phone and desktop, the form that reaches your inbox and your WhatsApp, the security certificate, training and 30 days of adjustments at no cost. It's a floor, not a fixed rate: the final number depends on how many pages, who writes the copy and what features it carries, and I give it to you in writing before you pay anything.",
    },
  },
  {
    grupo: "plazo",
    q: {
      es: "¿En cuánto me la entregas de verdad, y desde cuándo se cuentan los días?",
      en: "How soon do you really deliver, and when do the days start counting?",
    },
    a: {
      es: "Cinco días. Y la segunda mitad de la pregunta importa más que la primera: los días empiezan a contar cuando tengo el contenido y la marca, no el día que hablamos. Si me tardas dos semanas en mandar las fotos, la entrega se corre dos semanas y eso no es culpa de nadie. Si los textos los escribo yo, ese tiempo ya está contado.",
      en: "Five days. And the second half of the question matters more than the first: the days start counting when I have the content and the brand, not the day we talk. If it takes you two weeks to send the photos, delivery moves two weeks and that's nobody's fault. If I write the copy, that time is already counted in.",
    },
  },
  {
    grupo: "tuyo",
    q: {
      es: "¿Yo la puedo editar después sin llamarte?",
      en: "Can I edit it afterwards without calling you?",
    },
    a: {
      es: "En la web corporativa, sí: entra el panel para que cambies textos e imágenes sin tocar código, y te enseño a usarlo el día de la entrega. En una landing de una sola página los cambios son tan pocos que normalmente los hago yo dentro de los 30 días, y si la quieres autoadministrable igual, se agrega. Prefiero decirte esto a venderte «autoadministrable» a secas y que después descubras qué se podía tocar y qué no.",
      en: "On a corporate site, yes: the panel is included so you change text and images without touching code, and I teach you to use it on handover day. On a single-page landing there are so few changes that I usually make them myself within the 30 days, and if you want it self-managed anyway, it gets added. I'd rather tell you this than sell you “self-managed” flat and have you find out later what could be touched and what couldn't.",
    },
  },
  {
    grupo: "tuyo",
    q: {
      es: "¿El dominio y el hosting quedan a mi nombre o al tuyo?",
      en: "Do the domain and hosting stay in my name or yours?",
    },
    a: {
      es: "A tu nombre. El dominio se registra con tus datos y el alojamiento queda a nombre del negocio, no del mío. Es tuyo desde el primer día y no necesitas mi permiso para nada.",
      en: "In your name. The domain is registered with your details and the hosting stays in the business's name, not mine. It's yours from day one and you don't need my permission for anything.",
    },
  },
  {
    grupo: "tuyo",
    q: {
      es: "Si mañana me voy con otro proveedor, ¿me llevo la página?",
      en: "If I move to another provider tomorrow, do I take the site with me?",
    },
    a: {
      es: "Te la llevas. Te entrego los accesos y el código, y no hay nada amarrado a una plataforma mía que deje de funcionar cuando yo no esté. Amarrar clientes con la clave del dominio es una práctica común en este negocio y es la razón por la que mucha gente llega quemada.",
      en: "You take it. I hand over the credentials and the code, and nothing is tied to a platform of mine that stops working when I'm not around. Locking clients in with the domain password is common practice in this business and it's why a lot of people arrive burned.",
    },
  },
  {
    grupo: "tuyo",
    q: {
      es: "¿La haces en WordPress, en plantilla comprada o a la medida?",
      en: "Do you build it in WordPress, on a bought template or custom?",
    },
    a: {
      es: "A la medida, con Next.js y React. No compro una plantilla de mercado ni le cambio los colores a algo que ya vendieron mil veces. La diferencia que tú notas es velocidad y que se vea como tu negocio y no como el de otro. La diferencia que nota Google es la misma: velocidad.",
      en: "Custom, with Next.js and React. I don't buy a marketplace template or recolour something that's been sold a thousand times. The difference you notice is speed, and that it looks like your business and not someone else's. The difference Google notices is the same one: speed.",
    },
  },
  {
    grupo: "google",
    q: {
      es: "¿Incluye SEO? ¿Voy a aparecer en Google por esto?",
      en: "Does it include SEO? Will I show up on Google because of this?",
    },
    a: {
      es: "Incluye el SEO técnico de entrega: título y descripción escritos uno por página, datos estructurados, sitemap, robots, imágenes comprimidas con su texto alternativo y el alta en Google Search Console. Eso es la base para poder aparecer. Aparecer de primero es otra cosa: es trabajo mensual, no te lo prometo —y desconfía del que te lo prometa—, y los primeros movimientos se ven entre el mes 3 y el 6.",
      en: "It includes technical SEO at handover: a title and description written for each page, structured data, sitemap, robots, compressed images with their alt text and the Google Search Console setup. That's the base for being able to show up. Showing up first is another matter: it's monthly work, I don't promise it —and be wary of anyone who does— and the first movement shows between month 3 and 6.",
    },
  },
  {
    grupo: "google",
    q: {
      es: "Ya tengo página. ¿Pierdo lo que tengo posicionado si la cambio?",
      en: "I already have a site. Do I lose my rankings if I change it?",
    },
    a: {
      es: "No, si se hace bien. Antes de tocar nada se anota qué direcciones tienes hoy y por qué búsquedas te encuentran; después cada dirección vieja se redirige a la nueva que le corresponde. Lo que se pierde es cuando alguien publica el sitio nuevo encima del viejo sin mirar eso, y entonces Google llega a páginas que ya no existen.",
      en: "No, if it's done properly. Before touching anything, we write down which addresses you have today and which searches find you; then each old address is redirected to the new one it belongs to. What gets lost is when someone publishes the new site on top of the old one without looking at that, and Google lands on pages that no longer exist.",
    },
  },
  {
    grupo: "plazo",
    q: {
      es: "¿Quién escribe los textos y quién consigue las fotos?",
      en: "Who writes the copy and who gets the photos?",
    },
    a: {
      es: "Como prefieras, y cambia el precio. Si los mandas tú, no cuestan nada y yo los maqueto y les corrijo la forma. Si los escribo yo, se cobran por página, porque el trabajo crece con cada página. Las fotos: puedo usar banco de imágenes con licencia y mejorarte las que tomes con el celular, pero contratar una sesión de fotos no entra.",
      en: "Whichever you prefer, and it changes the price. If you send them, they cost nothing and I lay them out and fix the form. If I write them, they're charged per page, because the work grows with each page. Photos: I can use licensed stock and improve the ones you take with your phone, but hiring a shoot isn't included.",
    },
  },
  {
    grupo: "precio",
    q: {
      es: "¿Qué pago cada año después de entregada?",
      en: "What do I pay each year after handover?",
    },
    a: {
      es: "La renovación anual son {renovacion}: cubre el dominio, el alojamiento y que el sitio siga en pie. Aparte, si quieres que además le hagan mantenimiento —copias de seguridad, actualizaciones, cambios de contenido cada mes— hay planes mensuales que empiezan en {mantenimiento} al mes. Ese sí es opcional: sin plan el sitio es tuyo igual y sigue funcionando.",
      en: "The yearly renewal is {renovacion}: it covers the domain, the hosting and keeping the site standing. Separately, if you also want maintenance —backups, updates, content changes every month— there are monthly plans starting at {mantenimiento} a month. That one is optional: without a plan the site is still yours and still works.",
    },
  },
  {
    grupo: "precio",
    q: {
      es: "¿Cómo se paga? ¿Cuánto por adelantado?",
      en: "How is it paid? How much up front?",
    },
    a: {
      es: "Los anticipos, los hitos y el saldo van escritos en la propuesta antes de empezar, con sus fechas. No hay nada que firmar en persona y no te pido plata antes de que tengas el alcance y el precio por escrito.",
      en: "The deposits, the milestones and the balance are written in the proposal before starting, with their dates. There's nothing to sign in person and I don't ask you for money before you have the scope and the price in writing.",
    },
  },
  {
    grupo: "tuyo",
    q: { es: "¿Se ve bien en el celular?", en: "Does it look right on a phone?" },
    a: {
      es: "Se diseña primero para el celular y después para el computador, no al revés. En Colombia más de siete de cada diez búsquedas salen del teléfono, así que la versión móvil no es una adaptación: es la principal. Antes de entregar se revisan velocidad y accesibilidad, y te muestro los números.",
      en: "It's designed for the phone first and the desktop after, not the other way round. In Colombia more than seven out of ten searches come from a phone, so the mobile version isn't an adaptation: it's the main one. Before handover, speed and accessibility are checked and I show you the numbers.",
    },
  },
  {
    grupo: "plazo",
    q: {
      es: "¿Y si no me gusta el diseño? ¿Cuántos ajustes tengo?",
      en: "And if I don't like the design? How many revisions do I get?",
    },
    /* DOS RONDAS, con número. Era lo primero que preguntaba un cliente quemado
       y el sitio no lo decía en ninguna parte. Un «los ajustes que necesites»
       suena generoso y termina en pelea: el que se pasa de la raya no sabe que
       se pasó. */
    a: {
      es: "Dos rondas de ajustes entran en el precio. La revisas antes de que salga al aire y los cambios se hacen ahí mismo, en vivo. Si después de la segunda ronda quieres cambiar de rumbo, eso se cotiza aparte y te digo cuánto antes de tocar nada. Ya publicada quedan 30 días de ajustes sin costo.",
      en: "Two rounds of revisions are included in the price. You review it before it goes live and the changes are made right there, live. If after the second round you want to change direction, that's quoted separately and I tell you the cost before touching anything. Once published, there are 30 days of adjustments at no cost.",
    },
  },
  {
    grupo: "trabajar",
    q: {
      es: "¿Trabajas con negocios fuera de tu ciudad?",
      en: "Do you work with businesses outside your city?",
    },
    a: {
      es: "Sí. Vivo en Turbaco, Bolívar, a 20 kilómetros de Cartagena, y trabajo con negocios de toda Colombia. Casi todo se resuelve por WhatsApp y videollamada, que es como ya trabajas. Si el proyecto pide que nos veamos y estás en Cartagena o en Bolívar, nos vemos.",
      en: "Yes. I live in Turbaco, Bolívar, 20 kilometres from Cartagena, and I work with businesses all over Colombia. Almost everything gets sorted over WhatsApp and video call, which is how you already work. If the project calls for meeting and you're in Cartagena or Bolívar, we meet.",
    },
  },
  {
    grupo: "trabajar",
    q: {
      es: "Eres uno solo. ¿Qué pasa si te enfermas o desapareces?",
      en: "You're one person. What happens if you get sick or disappear?",
    },
    a: {
      es: "Es la pregunta correcta y no te voy a vender que soy un equipo. Por eso el dominio y el hosting quedan a tu nombre, el código te lo entrego y nada depende de una plataforma mía: si mañana no estoy, cualquier desarrollador puede seguir. Lo que sí te doy y una agencia no: si llegas a tener alguna inconformidad, te responde el mismo que hizo el trabajo.",
      en: "It's the right question and I'm not going to sell you that I'm a team. That's why the domain and hosting stay in your name, I hand over the code and nothing depends on a platform of mine: if I'm not around tomorrow, any developer can carry on. What I give you and an agency doesn't: if something isn't right, the person who did the work is the one who answers.",
    },
  },
];

/**
 * EL TRABAJO QUE RESPALDA ESTO
 * ──────────────────────────────────────────────────────────────────────────
 * Con la separación de siempre: lo que está en producción con dominio propio,
 * y lo que se construyó por iniciativa propia. Mezclarlos insinuaría clientes
 * que no existen.
 */
export const WEB_PRUEBAS = {
  titulo: { es: "El trabajo que respalda esto", en: "The work that backs this up" },
  entradilla: {
    es: "Con la separación de siempre: lo que está en producción con dominio propio, y lo que construí por iniciativa propia.",
    en: "With the usual separation: what's in production with its own domain, and what I built on my own initiative.",
  },
  fichas: [
    {
      etiqueta: { es: "En producción · Cartagena", en: "In production · Cartagena" },
      nombre: { es: "Bloomrose", en: "Bloomrose" },
      cuerpo: {
        es: "Tienda de bisutería para el mercado colombiano, diseñada y programada completa: catálogo con inventario, carrito, cuentas, pagos en línea y envíos. Ábrela y revísala sin pedirme permiso.",
        en: "A jewellery store for the Colombian market, designed and coded end to end: catalogue with inventory, cart, accounts, online payments and shipping. Open it and check it without asking me.",
      },
      url: "https://www.bloomroseaccesorios.com",
      dominio: "bloomroseaccesorios.com",
    },
    {
      etiqueta: { es: "En producción · producto propio", en: "In production · own product" },
      nombre: { es: "HalcónOS y Hummik", en: "HalcónOS and Hummik" },
      cuerpo: {
        es: "Un CRM de ventas y una agenda de citas por WhatsApp, míos y en línea. No son páginas web, son software a la medida, y están acá por una razón: si puedo sostener eso, tu página no es el reto.",
        en: "A sales CRM and a WhatsApp appointment book, mine and online. They aren't websites, they're custom software, and they're here for a reason: if I can keep those standing, your site isn't the hard part.",
      },
      url: "https://halcon.jvagencia.com",
      dominio: "halcon.jvagencia.com",
    },
    {
      etiqueta: { es: "Proyectos de estudio", en: "Studio projects" },
      nombre: {
        es: "Animal Expert, Elka Gómez y Marcopolo",
        en: "Animal Expert, Elka Gómez and Marcopolo",
      },
      cuerpo: {
        es: "Una veterinaria de Turbaco, un centro de fisioterapia de Cartagena y un salón de Barranquilla. Construidos completos, pero por iniciativa propia y nadie me los encargó: no son clientes que pagaron.",
        en: "A veterinary clinic in Turbaco, a physiotherapy centre in Cartagena and a salon in Barranquilla. Built in full, but on my own initiative and nobody commissioned them: they aren't paying clients.",
      },
    },
  ] as readonly {
    etiqueta: Texto;
    /* `nombre` es Texto y no string aunque dos de los tres sean nombres
       propios: el tercero es una LISTA de nombres, y la «y» que los une es
       castellano. Un `string` obligaba a leer «Animal Expert, Elka Gómez y
       Marcopolo» dentro de una página en inglés. */
    nombre: Texto;
    cuerpo: Texto;
    url?: string;
    dominio?: string;
  }[],
};

/** «¿Buscabas alguien cerca de ti?» — la ventaja y el límite, sin fingir. */
export const WEB_CERCA = {
  titulo: {
    es: "¿Buscabas un diseñador de páginas web cerca de ti?",
    en: "Were you looking for a web designer near you?",
  },
  cuerpoAntes: { es: "Vivo en ", en: "I live in " },
  lugar: { es: "Turbaco, Bolívar", en: "Turbaco, Bolívar" },
  cuerpoDespues: {
    es: ". No tengo oficina en el Centro de Cartagena y no la voy a fingir.",
    en: ". I don't have an office in downtown Cartagena and I'm not going to pretend I do.",
  },
  /* Las tres de ciudad no se traducen: «diseño de páginas web en Cartagena» es
     SEO local en español y no tiene búsqueda equivalente en inglés. Desde el
     inglés apuntan a la española. */
  ciudades: [
    {
      texto: { es: "Páginas web en Cartagena", en: "Websites in Cartagena" },
      href: "/diseno-de-paginas-web-en-cartagena",
    },
    {
      texto: { es: "Páginas web en Barranquilla", en: "Websites in Barranquilla" },
      href: "/diseno-de-paginas-web-en-barranquilla",
    },
    {
      texto: { es: "Páginas web en Bogotá", en: "Websites in Bogotá" },
      href: "/diseno-de-paginas-web-en-bogota",
    },
  ] as readonly { texto: Texto; href: string }[],
};
