// Cotizador — configuración de precios y cálculo de las tres líneas de negocio.
// Moneda: COP (peso colombiano). Los valores son base de referencia y se pueden
// ajustar aquí sin tocar la UI.
//
// El archivo tiene tres bloques, en este orden:
//   1. SITIOS WEB          — computeTotals
//   2. AUTOMATIZACIONES    — computeAutomationTotals
//   3. SEO / POSICIONAMIENTO — computeSeoTotals
//
// Los tres comparten `PRICES.delivery` y `money()` a propósito: los precios de
// la agencia se mantienen en un solo lugar.

// ═══════════════════════════════════════════════════════════════════════════
//  COTIZADOR WEB
// ═══════════════════════════════════════════════════════════════════════════

export type SiteType = "landing" | "corp" | "ecom";
export type Delivery = "urgent" | "standard" | "extended";

/** Cómo va a cobrar la tienda. Solo aplica a `ecom`. */
export type Cobro = "pasarela" | "whatsapp" | "ambas";
/** Quién produce los textos y las fotos. */
export type Contenido = "cliente" | "textos" | "todo";
/** De dónde parte el proyecto. */
export type Migracion = "nueva" | "migrar" | "rehacer";
/** Qué tiene ya de identidad de marca. */
export type Marca = "completa" | "solo-logo" | "nada";
/** Nivel de SEO que se entrega con el sitio (una sola vez, no mensual). */
export type SeoNivel = "ninguno" | "tecnico" | "tecnico-contenido";
/** Plan de mantenimiento del sitio, mensual. */
export type MantenimientoWeb = "ninguno" | "basico" | "estandar" | "avanzado";

/**
 * Interruptores de sí/no. NO todos se le preguntan a todos: cada uno declara
 * en `appliesTo` a qué tipos de proyecto pertenece.
 *
 * Este es el arreglo del problema viejo del cotizador: antes las siete
 * preguntas de extras se hacían iguales para landing, corporativa y tienda.
 * A un landing de campaña se le preguntaba si quería blog y pasarela de pago;
 * a una tienda se le preguntaba si quería cobrar. Ninguna de las dos tiene
 * sentido, y cada pregunta que no aplica es una oportunidad de abandonar.
 */
export type ToggleKey =
  // Puesta en marcha — los tres tipos
  | "domain"
  | "hosting"
  | "email"
  // Comunes — los tres tipos
  | "lang"
  | "analytics"
  // Landing page
  | "ads"
  | "leadsync"
  | "booking"
  // Web corporativa
  | "blog"
  | "portfolio"
  | "locations"
  | "clientarea"
  // Tienda online
  | "shipping"
  | "variants"
  | "coupons"
  | "invoicing"
  | "cartrecovery";

/**
 * Páginas que ya vienen dentro del precio base de cada tipo de proyecto.
 * Antes el contador arrancaba en 1 para todos y decía "la primera va incluida":
 * quien pedía una web corporativa no tenía forma de saber qué le entraba por
 * el precio, y terminaba sumando a mano páginas que ya estaban dentro.
 */
export const PAGINAS_BASE: Record<SiteType, string[]> = {
  landing: ["Una sola página con todas sus secciones"],
  corp: ["Inicio", "Nosotros", "Servicios", "Contacto", "Aviso de privacidad y términos"],
  ecom: [
    "Inicio",
    "Catálogo",
    "Ficha de producto",
    "Carrito y pago",
    "Contacto",
    "Aviso de privacidad y términos",
  ],
};

/** Lo que entra en cualquier proyecto, sin importar el tipo. */
export const INCLUIDO_SIEMPRE: string[] = [
  "Diseño propio, sin plantilla comprada",
  "Adaptado a teléfono, tableta y computador",
  "Formulario de contacto que llega a tu correo y a tu WhatsApp",
  "Velocidad y accesibilidad revisadas antes de entregar",
  "Certificado de seguridad (HTTPS) y respaldo del sitio",
  "Capacitación de entrega y 30 días de ajustes sin costo",
];

/**
 * Lo que además entra por el precio base SEGÚN EL TIPO. Es la respuesta a
 * "¿y qué me llevo exactamente por ese millón y medio?", que hasta ahora el
 * cotizador no contestaba.
 */
export const INCLUIDO_POR_TIPO: Record<SiteType, string[]> = {
  landing: [
    "Una sección de héroe pensada para convertir, no para decorar",
    "Bloques de servicios, prueba social y preguntas frecuentes",
    "Botón de WhatsApp fijo mientras el visitante baja",
    "Página de gracias, para poder medir la conversión",
  ],
  corp: [
    "Menú de navegación y pie de página completos",
    "Panel para que edites textos e imágenes sin tocar código",
    "Ficha de cada servicio dentro de la página de Servicios",
    "Datos estructurados de negocio local para Google",
  ],
  ecom: [
    "Panel de administración de productos, precios e inventario",
    "Carrito, cálculo de totales y proceso de compra completo",
    "Panel de pedidos con estados y notificación al cliente",
    "Fichas de producto con galería, descripción y disponibilidad",
    "Datos estructurados de producto para Google Shopping",
  ],
};

/** Tolera `null`: el cotizador la llama antes de que se elija tipo. */
export const basePages = (t: SiteType | null | undefined) =>
  t ? PAGINAS_BASE[t].length : 1;

export const PRICES = {
  /* Anclaje: banda FREELANCE de Colombia 2026, no la de agencia.
       proyecto informativo freelance ....... $1.500.000 – $3.500.000
       proyecto pequeño ..................... $  800.000 – $2.500.000
       (agencia, para contraste) ............ $1.500.000 – $30.000.000+
     Sobre el punto medio freelance se aplica −30 %.
       corporativa: medio $2.500.000 → −30 % = $1.750.000, y de ahí salen las
       5 páginas incluidas; los extras se suman aparte.
     Landing y tienda se dejan como estaban: ya estaban dentro de banda.
     Piso que no se cruza: por debajo de $600.000 el mercado es plantilla sin
     soporte, y competir ahí destruye el margen sin ganar el cliente. */
  base: { landing: 450000, corp: 1750000, ecom: 1900000 } as Record<SiteType, number>,
  extraPage: 80000,

  /* Producción de contenido. Se cobra POR PÁGINA porque el trabajo escala con
     las páginas: es el mismo criterio que usan las calculadoras de agencia
     grandes, que cotizan "copywriting" por número de páginas y no a tanto
     alzado. Escribir los textos de un sitio es la tarea que más veces retrasa
     una entrega, y cobrarla aparte es lo que hace que el cliente decida en
     serio si la va a hacer él. */
  contenido: {
    cliente: 0,
    textos: 60000,
    todo: 95000,
  } as Record<Contenido, number>,

  migracion: { nueva: 0, migrar: 250000, rehacer: 0 } as Record<Migracion, number>,

  marca: { completa: 0, "solo-logo": 180000, nada: 650000 } as Record<Marca, number>,

  /* Una tienda SIN pasarela sigue siendo una tienda: en Colombia una parte
     grande del comercio pequeño cierra el pedido por WhatsApp y cobra por
     transferencia. Por eso la pregunta no es "¿quieres cobrar?" sino "¿cómo
     vas a cobrar?", y una de las respuestas vale cero. */
  cobro: { pasarela: 300000, whatsapp: 0, ambas: 380000 } as Record<Cobro, number>,

  seo: { ninguno: 0, tecnico: 250000, "tecnico-contenido": 650000 } as Record<SeoNivel, number>,

  toggles: {
    domain: 100000,
    hosting: 150000,
    email: 150000,
    lang: 200000,
    analytics: 120000,
    ads: 180000,
    leadsync: 250000,
    booking: 350000,
    blog: 150000,
    portfolio: 220000,
    locations: 180000,
    clientarea: 900000,
    shipping: 350000,
    variants: 250000,
    coupons: 150000,
    invoicing: 700000,
    cartrecovery: 300000,
  } as Record<ToggleKey, number>,

  productsTier: [
    { label: "0 a 50 productos", min: 0, max: 50, add: 250000 },
    { label: "50 a 150 productos", min: 51, max: 150, add: 450000 },
    { label: "150 a 400 productos", min: 151, max: 400, add: 1000000 },
    { label: "400 a 1.000 productos", min: 401, max: 1000, add: 2000000 },
    { label: "1.000 a 5.000 productos", min: 1001, max: 5000, add: 3000000 },
  ],

  /* Mantenimiento mensual del sitio. Existía en el cotizador de
     automatizaciones y no en el web, aunque "Mantenimiento y soporte" se
     anuncia como servicio en la portada: era la incoherencia más visible
     entre lo que el sitio promete y lo que el cotizador sabe cotizar. */
  mantenimiento: {
    ninguno: 0,
    basico: 120000,
    estandar: 250000,
    avanzado: 450000,
  } as Record<MantenimientoWeb, number>,

  // El ajuste de precio por plazo es uniforme; las SEMANAS dependen del tipo de
  // proyecto (un landing no toma lo mismo que una tienda) — ver deliveryWeeks.
  delivery: {
    urgent: { tier: "Urgente", mod: 0.25 },
    standard: { tier: "Estándar", mod: 0 },
    extended: { tier: "Extendida", mod: -0.1 },
  } as Record<Delivery, { tier: string; mod: number }>,

  // Semanas estimadas de entrega por tipo de proyecto y plazo.
  deliveryWeeks: {
    landing: { urgent: 1, standard: 2, extended: 4 },
    corp: { urgent: 2, standard: 3, extended: 5 },
    ecom: { urgent: 3, standard: 5, extended: 8 },
  } as Record<SiteType, Record<Delivery, number>>,
};

export const TYPE_LABEL: Record<SiteType, string> = {
  landing: "Landing page",
  corp: "Web corporativa",
  ecom: "Tienda online",
};

/** Cómo se nombra el proyecto dentro de una frase ("las funciones de tu…"). */
export const TYPE_NOUN: Record<SiteType, string> = {
  landing: "landing",
  corp: "web",
  ecom: "tienda",
};

// ── Definición de cada interruptor ────────────────────────────────────────

export type ToggleDef = {
  label: string;
  desc: string;
  price: number;
  incluye: string[];
  appliesTo: SiteType[];
  /** Se marca como recomendado en estos tipos: guía sin obligar. */
  recomendadoEn?: SiteType[];
};

const TODOS: SiteType[] = ["landing", "corp", "ecom"];

export const TOGGLES: Record<ToggleKey, ToggleDef> = {
  // ── Puesta en marcha ───────────────────────────────────────────────────
  domain: {
    label: "Registro de dominio",
    desc: "La dirección propia del negocio: tumarca.com",
    price: PRICES.toggles.domain,
    appliesTo: TODOS,
    recomendadoEn: TODOS,
    incluye: [
      "Registro del dominio a tu nombre, no al mío",
      "Apuntado al hosting y certificado SSL activo",
      "Primer año incluido; la renovación anual la pagas al registrador",
    ],
  },
  hosting: {
    label: "Hosting y configuración",
    desc: "Dónde vive el sitio para que esté siempre prendido",
    price: PRICES.toggles.hosting,
    appliesTo: TODOS,
    recomendadoEn: TODOS,
    incluye: [
      "Alojamiento configurado y optimizado para el sitio",
      "SSL, copias de seguridad y CDN",
      "Primer año incluido",
    ],
  },
  email: {
    label: "Correo corporativo",
    desc: "hola@tumarca.com en vez de @gmail.com",
    price: PRICES.toggles.email,
    appliesTo: TODOS,
    recomendadoEn: ["corp", "ecom"],
    incluye: [
      "Buzones con tu dominio: hola@tumarca.com",
      "Registros SPF, DKIM y DMARC para que no caiga en spam",
      "Configurado en tu teléfono y computador",
    ],
  },

  // ── Comunes ────────────────────────────────────────────────────────────
  lang: {
    label: "Idioma adicional",
    desc: "El sitio también en inglés u otro idioma",
    price: PRICES.toggles.lang,
    appliesTo: TODOS,
    incluye: [
      "Todo el contenido traducido y revisado",
      "Selector de idioma y URLs separadas por idioma",
      "hreflang para que Google sepa cuál servir a cada país",
    ],
  },
  analytics: {
    label: "Analítica y medición",
    desc: "Saber cuánta gente entra y cuántos te escriben",
    price: PRICES.toggles.analytics,
    appliesTo: TODOS,
    recomendadoEn: TODOS,
    incluye: [
      "Google Analytics 4 instalado y configurado",
      "Eventos de conversión: clic a WhatsApp, envío de formulario, llamada",
      "Alta en Google Search Console y envío del sitemap",
      "Panel con las cuatro cifras que importan, explicado en una llamada",
    ],
  },

  // ── Landing page ───────────────────────────────────────────────────────
  ads: {
    label: "Píxel y conversiones de campaña",
    desc: "Para que Meta y Google Ads sepan quién convirtió",
    price: PRICES.toggles.ads,
    appliesTo: ["landing"],
    recomendadoEn: ["landing"],
    incluye: [
      "Píxel de Meta y etiqueta de Google Ads instalados",
      "Evento de conversión disparado en la página de gracias",
      "API de conversiones de Meta, para no depender de las cookies",
      "Verificación de que la conversión llega al administrador de anuncios",
    ],
  },
  leadsync: {
    label: "Los interesados llegan a tu lista",
    desc: "Cada formulario cae en tu hoja de cálculo o CRM",
    price: PRICES.toggles.leadsync,
    appliesTo: ["landing", "corp"],
    recomendadoEn: ["landing"],
    incluye: [
      "Cada envío del formulario entra a Google Sheets o a tu CRM",
      "Aviso inmediato por correo y por WhatsApp",
      "Los campos quedan separados en columnas, listos para filtrar",
      "Marca de origen: de qué campaña o anuncio vino cada interesado",
    ],
  },
  booking: {
    label: "Agendamiento en línea",
    desc: "Que reserven la cita solos, sin escribirte ni llamarte",
    price: PRICES.toggles.booking,
    appliesTo: ["landing", "corp"],
    incluye: [
      "Calendario con tu disponibilidad real, conectado a tu Google Calendar",
      "El cliente escoge día y hora y le llega la confirmación por correo",
      "Recordatorio automático antes de la cita",
      "Tú bloqueas horarios, días no laborables y vacaciones desde tu propio calendario",
      "Una sola agenda y un solo servicio. Varias agendas —dos o más profesionales con horarios distintos— o cobrar la cita por adelantado se cotizan aparte",
    ],
  },

  // ── Web corporativa ────────────────────────────────────────────────────
  blog: {
    label: "Blog / Noticias",
    desc: "Para publicar y aparecer en Google por más búsquedas",
    price: PRICES.toggles.blog,
    appliesTo: ["corp", "ecom"],
    recomendadoEn: ["corp"],
    incluye: [
      "Sección de blog que administras tú, sin tocar código",
      "Portada, ficha de artículo, categorías y buscador",
      "Datos estructurados de artículo para Google Noticias y Discover",
    ],
  },
  portfolio: {
    label: "Portafolio o casos de éxito",
    desc: "Mostrar trabajos hechos, uno por uno",
    price: PRICES.toggles.portfolio,
    appliesTo: ["corp"],
    recomendadoEn: ["corp"],
    incluye: [
      "Listado de proyectos con filtro por categoría",
      "Ficha propia de cada proyecto, con su enlace para compartir",
      "Galería de fotos con carga diferida",
      "Lo administras tú: agregar un caso no requiere programar",
    ],
  },
  locations: {
    label: "Sedes y mapa",
    desc: "Varias direcciones, cada una con su ficha",
    price: PRICES.toggles.locations,
    appliesTo: ["corp", "ecom"],
    incluye: [
      "Página o bloque por sede, con dirección, horario y teléfono",
      "Mapa incrustado y botón de cómo llegar",
      "Datos estructurados de negocio local por sede",
    ],
  },
  clientarea: {
    label: "Zona privada para tus clientes",
    desc: "Cada cliente entra con su clave y ve solo lo suyo: sus facturas, sus documentos, el estado de su caso",
    price: PRICES.toggles.clientarea,
    appliesTo: ["corp"],
    incluye: [
      "Registro, inicio de sesión y recuperación de contraseña",
      "Cada cliente ve únicamente su información, nunca la de otro",
      "Sirve para: consultar facturas, descargar documentos, ver en qué va un trámite o un pedido",
      "Tú administras quién entra y qué puede ver",
      "Es lo más grande de esta lista. Ya no es una página: es un sistema con usuarios, y agrega semanas al cronograma",
    ],
  },

  // ── Tienda online ──────────────────────────────────────────────────────
  shipping: {
    label: "Envíos y transportadora",
    desc: "Cobrar el envío bien, no a ojo",
    price: PRICES.toggles.shipping,
    appliesTo: ["ecom"],
    recomendadoEn: ["ecom"],
    incluye: [
      "Tarifas por ciudad o por peso, configurables por ti",
      "Opción de recoger en tienda, sin costo de envío",
      "Umbral de envío gratis desde cierto monto",
      "Número de guía enviado al cliente cuando despachas",
    ],
  },
  variants: {
    label: "Variantes de producto",
    desc: "Tallas, colores y presentaciones con su propio stock",
    price: PRICES.toggles.variants,
    appliesTo: ["ecom"],
    recomendadoEn: ["ecom"],
    incluye: [
      "Talla, color, sabor o presentación en un mismo producto",
      "Inventario y precio independientes por variante",
      "Foto que cambia al escoger la variante",
      "Aviso de agotado por variante, no por producto entero",
    ],
  },
  coupons: {
    label: "Cupones y descuentos",
    desc: "Códigos de promoción y rebajas por temporada",
    price: PRICES.toggles.coupons,
    appliesTo: ["ecom"],
    incluye: [
      "Códigos de descuento por porcentaje o por monto",
      "Vigencia, tope de usos y monto mínimo de compra",
      "Precio tachado en el catálogo durante la promoción",
    ],
  },
  invoicing: {
    label: "Facturación electrónica (DIAN)",
    desc: "Factura válida emitida sola en cada venta",
    price: PRICES.toggles.invoicing,
    appliesTo: ["ecom"],
    incluye: [
      "Conexión con un proveedor tecnológico autorizado por la DIAN",
      "Factura emitida y enviada al comprador al confirmar el pago",
      "Manejo de IVA, INC y productos exentos",
      "No incluye la habilitación de tu empresa ante la DIAN, que es trámite tuyo",
    ],
  },
  cartrecovery: {
    label: "Recuperación de carrito",
    desc: "Recordarle al que dejó la compra a medias",
    price: PRICES.toggles.cartrecovery,
    appliesTo: ["ecom"],
    incluye: [
      "Detección del carrito abandonado con el correo ya capturado",
      "Secuencia de recordatorios por correo o WhatsApp",
      "Informe de cuántos carritos se recuperaron y por cuánto",
    ],
  },
};

const TOGGLE_KEYS = Object.keys(TOGGLES) as ToggleKey[];

/** Los interruptores que se le preguntan a un tipo de proyecto. */
export const togglesFor = (t: SiteType | null, grupo?: "setup" | "features"): ToggleKey[] => {
  if (!t) return [];
  const setup: ToggleKey[] = ["domain", "hosting", "email"];
  return TOGGLE_KEYS.filter((k) => {
    if (!TOGGLES[k].appliesTo.includes(t)) return false;
    if (grupo === "setup") return setup.includes(k);
    if (grupo === "features") return !setup.includes(k) && k !== "analytics";
    return true;
  });
};

// ── Opciones de las preguntas de una sola respuesta ───────────────────────

export type Opcion<T extends string> = {
  id: T;
  label: string;
  desc: string;
  /** Precio fijo, o `porPagina` si escala con el número de páginas. */
  porPagina?: boolean;
};

export const CONTENIDO_OPCIONES: Opcion<Contenido>[] = [
  {
    id: "cliente",
    label: "Tú entregas los textos y las fotos",
    desc: "Tú mandas todo listo. Yo lo maqueto y lo corrijo de forma.",
  },
  {
    id: "textos",
    label: "Yo escribo los textos, tú das las fotos",
    desc: "Escribo cada página pensada para vender. Las imágenes las pones tú.",
    porPagina: true,
  },
  {
    id: "todo",
    label: "Yo me encargo de todo",
    desc: "Textos escritos por mí, imágenes de banco con licencia, y te arreglo las fotos que tomes con el celular.",
    porPagina: true,
  },
];

export const MIGRACION_OPCIONES: Opcion<Migracion>[] = [
  { id: "nueva", label: "No tengo web todavía", desc: "Es la primera vez que el negocio va a tener sitio." },
  { id: "rehacer", label: "Tengo, pero empezamos de cero", desc: "La actual no sirve y no vale la pena traer nada de ella." },
  { id: "migrar", label: "Tengo, y hay que traer el contenido", desc: "Pasamos textos, fotos, productos o artículos, y redirigimos las URLs viejas para no perder el posicionamiento." },
];

export const MARCA_OPCIONES: Opcion<Marca>[] = [
  { id: "completa", label: "Tengo logo y manual de marca", desc: "Colores, tipografías y uso del logo ya definidos. Los aplicamos tal cual." },
  { id: "solo-logo", label: "Tengo logo, nada más", desc: "Extendemos el logo a una paleta, una tipografía y un estilo para el sitio." },
  { id: "nada", label: "No tengo nada todavía", desc: "Creo la identidad: logo, paleta, tipografías y manual de uso básico." },
];

export const COBRO_OPCIONES: Opcion<Cobro>[] = [
  { id: "whatsapp", label: "El pedido se cierra por WhatsApp", desc: "El carrito arma el pedido y lo manda al chat. Tú cobras como cobras hoy." },
  { id: "pasarela", label: "Cobro en línea con pasarela", desc: "PSE, Nequi, Bancolombia y tarjeta. El cliente paga y el pedido queda confirmado solo." },
  { id: "ambas", label: "Las dos, que el cliente escoja", desc: "Pasarela para el que quiere pagar ya, y WhatsApp para el que prefiere hablar antes." },
];

export const SEO_OPCIONES: Opcion<SeoNivel>[] = [
  { id: "ninguno", label: "Todavía no", desc: "El sitio queda bien construido, pero sin trabajo de posicionamiento." },
  { id: "tecnico", label: "SEO técnico", desc: "Que Google entienda y muestre bien cada página desde el primer día." },
  { id: "tecnico-contenido", label: "SEO técnico + contenido inicial", desc: "Lo anterior más la investigación de palabras clave y los textos escritos para posicionar." },
];

/** Qué incluye cada nivel de SEO de entrega. */
export const SEO_DETALLE: Record<SeoNivel, string[]> = {
  ninguno: [
    "El sitio igual sale rápido, accesible y sin errores de construcción",
    "Lo puedes agregar después, sin rehacer nada",
  ],
  tecnico: [
    "Títulos y descripciones escritos, uno por página",
    "Datos estructurados (JSON-LD) del tipo que corresponda al negocio",
    "sitemap.xml, robots.txt y canónicos",
    "Imágenes comprimidas, con nombre y texto alternativo",
    "Alta en Google Search Console y envío del sitemap",
    "Es la base técnica. No es posicionamiento mensual: eso va aparte",
  ],
  "tecnico-contenido": [
    "Todo lo del SEO técnico",
    "Investigación de palabras clave del sector y de la ciudad",
    "Mapa de una página por intención de búsqueda, sin páginas repetidas",
    "Los textos de cada página escritos para esa intención",
    "Ficha de Google Business creada y verificada",
    "Sigue sin ser posicionamiento mensual: eso es la línea de SEO",
  ],
};

export const MANTENIMIENTO_OPCIONES: Opcion<MantenimientoWeb>[] = [
  { id: "ninguno", label: "Sin plan", desc: "Te entrego el sitio y queda a tu cargo. Puedes contratarlo después." },
  { id: "basico", label: "Básico", desc: "Que no se caiga y que esté al día." },
  { id: "estandar", label: "Estándar", desc: "Lo anterior más cambios de contenido cada mes." },
  { id: "avanzado", label: "Avanzado", desc: "Lo anterior más mejoras continuas y acompañamiento." },
];

export const MANTENIMIENTO_DETALLE: Record<MantenimientoWeb, string[]> = {
  ninguno: [
    "El sitio es tuyo y sigue funcionando",
    "Los 30 días de ajustes de la entrega se mantienen",
    "Si algo se rompe después, se cobra por hora",
  ],
  basico: [
    "Hosting, dominio y certificado renovados y vigilados",
    "Copias de seguridad semanales, con restauración si algo falla",
    "Actualizaciones de seguridad y revisión de que el sitio esté arriba",
    "Hasta 2 cambios pequeños de texto o imagen al mes",
  ],
  estandar: [
    "Todo lo del plan Básico",
    "Hasta 6 cambios de contenido al mes (textos, fotos, productos, precios)",
    "Informe mensual de visitas y contactos recibidos",
    "Soporte por WhatsApp con respuesta el mismo día hábil",
  ],
  avanzado: [
    "Todo lo del plan Estándar",
    "Cambios de contenido sin tope razonable",
    "Una mejora de diseño o de función al mes, acordada contigo",
    "Revisión trimestral de velocidad, accesibilidad y conversión",
    "Prioridad en la cola: tu proyecto entra primero",
  ],
};

export type Answers = {
  type: SiteType | null;
  pages: number;
  productsTierIdx: number | null;
  cobro: Cobro;
  contenido: Contenido;
  migracion: Migracion;
  marca: Marca;
  seo: SeoNivel;
  toggles: Record<ToggleKey, boolean>;
  delivery: Delivery;
  mantenimiento: MantenimientoWeb;
};

const NINGUN_TOGGLE = TOGGLE_KEYS.reduce(
  (acc, k) => ({ ...acc, [k]: false }),
  {} as Record<ToggleKey, boolean>,
);

export const initialAnswers: Answers = {
  type: null,
  pages: 1,
  productsTierIdx: null,
  cobro: "whatsapp",
  contenido: "cliente",
  migracion: "nueva",
  marca: "completa",
  seo: "tecnico",
  toggles: { ...NINGUN_TOGGLE, domain: true, hosting: true, analytics: true },
  delivery: "standard",
  mantenimiento: "basico",
};

export type LineItem = { label: string; amount: number };

export type Totals = {
  items: LineItem[];
  baseSum: number;
  deliveryAdjustment: number;
  subtotal: number;
  total: number;
  /** Recurrente mensual. NO se suma al total: es otra cosa y mezclarlas engaña. */
  monthly: number;
  monthlyLabel: string;
  monthlyDetalle: string[];
};

export function computeTotals(a: Answers): Totals {
  const items: LineItem[] = [];

  if (a.type) {
    items.push({ label: TYPE_LABEL[a.type], amount: PRICES.base[a.type] });
  }

  const extraPages = Math.max(0, (a.pages || 1) - basePages(a.type));
  if (extraPages > 0) {
    items.push({
      label: `${extraPages} página${extraPages > 1 ? "s" : ""} adicional${extraPages > 1 ? "es" : ""}`,
      amount: extraPages * PRICES.extraPage,
    });
  }

  if (a.type === "ecom" && a.productsTierIdx !== null) {
    const tier = PRICES.productsTier[a.productsTierIdx];
    items.push({ label: `Catálogo · ${tier.label}`, amount: tier.add });
  }

  if (a.type === "ecom" && PRICES.cobro[a.cobro] > 0) {
    const op = COBRO_OPCIONES.find((o) => o.id === a.cobro);
    items.push({ label: `Cobro · ${op?.label ?? a.cobro}`, amount: PRICES.cobro[a.cobro] });
  }

  // El contenido escala con las páginas: es el trabajo que más veces retrasa
  // una entrega y por eso se cotiza por página, no a tanto alzado.
  const tarifaContenido = PRICES.contenido[a.contenido];
  if (tarifaContenido > 0) {
    const paginas = Math.max(1, a.pages || 1);
    items.push({
      label:
        a.contenido === "todo"
          ? `Textos e imágenes · ${paginas} página${paginas > 1 ? "s" : ""}`
          : `Redacción de textos · ${paginas} página${paginas > 1 ? "s" : ""}`,
      amount: tarifaContenido * paginas,
    });
  }

  if (PRICES.migracion[a.migracion] > 0) {
    items.push({ label: "Migración del sitio actual", amount: PRICES.migracion[a.migracion] });
  }

  if (PRICES.marca[a.marca] > 0) {
    items.push({
      label: a.marca === "nada" ? "Identidad de marca" : "Extensión de marca al sitio",
      amount: PRICES.marca[a.marca],
    });
  }

  if (PRICES.seo[a.seo] > 0) {
    const op = SEO_OPCIONES.find((o) => o.id === a.seo);
    items.push({ label: op?.label ?? "SEO", amount: PRICES.seo[a.seo] });
  }

  // Solo se cobran los interruptores que APLICAN al tipo elegido: si alguien
  // marcó "blog" con la corporativa y luego se pasó a landing, el blog no se
  // cuela en el total.
  for (const key of TOGGLE_KEYS) {
    if (!a.toggles[key]) continue;
    if (a.type && !TOGGLES[key].appliesTo.includes(a.type)) continue;
    items.push({ label: TOGGLES[key].label, amount: PRICES.toggles[key] });
  }

  const baseSum = items.reduce((s, it) => s + it.amount, 0);

  const del = PRICES.delivery[a.delivery] ?? PRICES.delivery.standard;
  const deliveryAdjustment = Math.round(baseSum * del.mod);
  const subtotal = baseSum + deliveryAdjustment;

  const monthly = PRICES.mantenimiento[a.mantenimiento] ?? 0;
  const planLabel = MANTENIMIENTO_OPCIONES.find((o) => o.id === a.mantenimiento)?.label ?? "";

  return {
    items,
    baseSum,
    deliveryAdjustment,
    subtotal,
    total: subtotal,
    monthly,
    monthlyLabel: a.mantenimiento === "ninguno" ? "Sin plan de mantenimiento" : `Mantenimiento ${planLabel}`,
    monthlyDetalle: MANTENIMIENTO_DETALLE[a.mantenimiento],
  };
}

/* El formateador se mudó a `lib/money.ts` para que los componentes de cliente
   puedan importarlo sin arrastrar este catálogo entero al navegador. Se
   reexporta aquí: las cuarenta llamadas que ya existen no cambian de sitio. */
export { money } from "@/lib/money";


/** Semanas de entrega para un tipo de proyecto y plazo (default landing si no hay tipo). */
export function deliveryWeeksFor(type: SiteType | null, delivery: Delivery): number {
  return PRICES.deliveryWeeks[type ?? "landing"][delivery];
}

/** Etiqueta dinámica del plazo, p. ej. "Estándar — 2 semanas" / "Estándar — 5 semanas". */
export function deliveryLabel(type: SiteType | null, delivery: Delivery): string {
  const weeks = deliveryWeeksFor(type, delivery);
  return `${PRICES.delivery[delivery].tier} — ${weeks} semana${weeks > 1 ? "s" : ""}`;
}

// ═══════════════════════════════════════════════════════════════════════════
//  COTIZADOR DE AUTOMATIZACIONES (WhatsApp Business Platform)
// ═══════════════════════════════════════════════════════════════════════════
//
// Línea de negocio aparte de las webs. Vive en este archivo a propósito: los
// precios de la agencia se mantienen en un solo lugar.
//
// Dos diferencias estructurales con el cotizador web, y las dos importan:
//
//  1. HAY UN RECURRENTE. Una web se entrega y termina; una automatización queda
//     corriendo y hay que monitorearla, así que la cotización devuelve `total`
//     (una vez) y `monthly` (mensual) por separado. Mezclarlos infla el número
//     de entrada y confunde al cliente.
//
//  2. LAS CONVERSACIONES NO SON INGRESO MIO. Soy Tech Provider verificado
//     por Meta: en ese modelo Meta le cobra el consumo de la API DIRECTAMENTE al
//     cliente, con su propio medio de pago. Yo cobro por construir y
//     mantener. Por eso el costo de conversaciones NO entra en los totales — se
//     comunica como nota (ver `META_BILLING_NOTE`). Meterlo como ingreso sería
//     cobrar dos veces algo que no facturo.

export type AutomationType = "faq" | "leads" | "citas" | "pedidos" | "avisos";

export type AutomationExtraKey =
  | "onboarding"
  | "ia"
  | "crm"
  | "agenda"
  | "pagos"
  | "handoff"
  | "idioma";

export type MaintenancePlan = "ninguno" | "basico" | "estandar" | "avanzado";

export const A_PRICES = {
  base: {
    faq: 700000,
    leads: 1200000,
    citas: 1600000,
    pedidos: 2400000,
    avisos: 900000,
  } as Record<AutomationType, number>,

  // Cada plantilla se aprueba por separado en Meta y hay que gestionarla; por
  // eso se cobra por unidad más allá de las incluidas.
  plantillasIncluidas: 2,
  plantillaExtra: 80000,

  extras: {
    onboarding: 350000,
    ia: 600000,
    crm: 450000,
    agenda: 300000,
    pagos: 500000,
    handoff: 250000,
    idioma: 200000,
  } as Record<AutomationExtraKey, number>,

  // Recurrente mensual. Sin plan, la automatización queda sin monitoreo: si
  // expira el token o Meta rechaza una plantilla, se cae y nadie se entera.
  mantenimiento: {
    ninguno: 0,
    basico: 180000,
    estandar: 350000,
    avanzado: 600000,
  } as Record<MaintenancePlan, number>,

  // Mismo ajuste por plazo que el cotizador web, para no tener dos lógicas.
  deliveryWeeks: {
    faq:     { urgent: 1, standard: 2, extended: 3 },
    leads:   { urgent: 1, standard: 2, extended: 4 },
    citas:   { urgent: 2, standard: 3, extended: 5 },
    pedidos: { urgent: 3, standard: 5, extended: 7 },
    avisos:  { urgent: 1, standard: 2, extended: 3 },
  } as Record<AutomationType, Record<Delivery, number>>,
};

export const A_TYPE_LABEL: Record<AutomationType, string> = {
  faq: "Respuestas automáticas",
  leads: "Captura y calificación de leads",
  citas: "Agendamiento de citas",
  pedidos: "Pedidos y catálogo",
  avisos: "Avisos y recordatorios",
};

export const A_TYPE_DESC: Record<AutomationType, string> = {
  faq: "Contesta las preguntas repetidas de siempre: horarios, precios, ubicación.",
  leads: "Hace las preguntas de calificación y deja el lead listo en tu pipeline.",
  citas: "Muestra disponibilidad, agenda y confirma. Con recordatorio previo.",
  pedidos: "Muestra el catálogo, arma el pedido y confirma la compra.",
  avisos: "Notifica estados: pedido listo, envío en camino, turno mañana.",
};

const A_EXTRA_LABELS: Record<AutomationExtraKey, string> = {
  onboarding: "Conexión y verificación de WhatsApp Business",
  ia: "Respuestas con IA sobre tu contenido",
  crm: "Integración con tu CRM",
  agenda: "Integración con Google Calendar",
  pagos: "Cobro dentro de la conversación",
  handoff: "Traspaso a un agente humano",
  idioma: "Idioma adicional",
};

const A_EXTRA_KEYS: AutomationExtraKey[] = [
  "onboarding",
  "ia",
  "crm",
  "agenda",
  "pagos",
  "handoff",
  "idioma",
];

export const A_PLAN_LABEL: Record<MaintenancePlan, string> = {
  ninguno: "Sin mantenimiento",
  basico: "Básico — monitoreo y hasta 2 cambios/mes",
  estandar: "Estándar — monitoreo, cambios y gestión de plantillas",
  avanzado: "Avanzado — todo lo anterior más mejoras continuas",
};

export const A_PLAN_DETALLE: Record<MaintenancePlan, string[]> = {
  ninguno: [
    "La automatización queda funcionando y a tu cargo",
    "Si expira el token de Meta o rechazan una plantilla, deja de responder sin avisar",
    "Lo puedes contratar después, cuando lo necesites",
  ],
  basico: [
    "Monitoreo de que el número siga contestando, todos los días",
    "Renovación del token de Meta antes de que expire",
    "Hasta 2 cambios de mensaje o de flujo al mes",
    "Aviso proactivo si Meta cambia algo que te afecte",
  ],
  estandar: [
    "Todo lo del plan Básico",
    "Cambios de flujo y de mensajes sin tope razonable",
    "Gestión de plantillas: redacción, envío a aprobación y corrección de rechazos",
    "Informe mensual de conversaciones, respuestas y traspasos a persona",
  ],
  avanzado: [
    "Todo lo del plan Estándar",
    "Una mejora del flujo al mes, que te propongo con base en los datos",
    "Revisión de las preguntas que el bot no supo contestar, y su solución",
    "Prioridad en la cola de soporte",
  ],
};

export type AutomationAnswers = {
  type: AutomationType | null;
  plantillas: number;
  onboarding: boolean;
  ia: boolean;
  crm: boolean;
  agenda: boolean;
  pagos: boolean;
  handoff: boolean;
  idioma: boolean;
  mantenimiento: MaintenancePlan;
  delivery: Delivery;
};

export const initialAutomationAnswers: AutomationAnswers = {
  type: null,
  plantillas: A_PRICES.plantillasIncluidas,
  onboarding: true, // el caso normal es que aún no tengan la WABA conectada
  ia: false,
  crm: false,
  agenda: false,
  pagos: false,
  handoff: false,
  idioma: false,
  mantenimiento: "basico",
  delivery: "standard",
};

/** Misma forma que el cotizador web: `Totals` ya trae el recurrente mensual. */
export type AutomationTotals = Totals;

/** Nota obligatoria en la propuesta: el consumo de Meta no lo facturo yo. */
export const META_BILLING_NOTE =
  "El consumo de la API de WhatsApp lo cobra Meta directamente a tu cuenta, con tu " +
  "propio medio de pago. No está incluido acá porque no lo facturo yo: " +
  "depende de cuántas conversaciones tengas.";

/** La misma advertencia en inglés, para el blog y las páginas de /en. */
export const META_BILLING_NOTE_EN =
  "WhatsApp API usage is billed by Meta directly to your account, with your own " +
  "payment method. It isn't included here because I don't invoice it: " +
  "it depends on how many conversations you have.";

/** Las cinco automatizaciones, con su nombre en inglés. */
export const A_TYPE_LABEL_EN: Record<AutomationType, string> = {
  faq: "Automatic replies",
  leads: "Lead capture and qualification",
  citas: "Appointment booking",
  pedidos: "Orders and catalogue",
  avisos: "Alerts and reminders",
};

export function computeAutomationTotals(a: AutomationAnswers): AutomationTotals {
  const items: LineItem[] = [];

  if (a.type) {
    items.push({ label: A_TYPE_LABEL[a.type], amount: A_PRICES.base[a.type] });
  }

  const extras = Math.max(0, (a.plantillas || 0) - A_PRICES.plantillasIncluidas);
  if (extras > 0) {
    items.push({
      label: `${extras} plantilla${extras > 1 ? "s" : ""} de mensaje adicional${extras > 1 ? "es" : ""}`,
      amount: extras * A_PRICES.plantillaExtra,
    });
  }

  for (const key of A_EXTRA_KEYS) {
    if (a[key]) items.push({ label: A_EXTRA_LABELS[key], amount: A_PRICES.extras[key] });
  }

  const baseSum = items.reduce((s, it) => s + it.amount, 0);
  const del = PRICES.delivery[a.delivery] ?? PRICES.delivery.standard;
  const deliveryAdjustment = Math.round(baseSum * del.mod);
  const subtotal = baseSum + deliveryAdjustment;

  const monthly = A_PRICES.mantenimiento[a.mantenimiento] ?? 0;

  return {
    items,
    baseSum,
    deliveryAdjustment,
    subtotal,
    total: subtotal,
    monthly,
    monthlyLabel: A_PLAN_LABEL[a.mantenimiento],
    monthlyDetalle: A_PLAN_DETALLE[a.mantenimiento],
  };
}

/** Semanas de entrega de la automatización (default `faq` si aún no eligió tipo). */
export function automationWeeksFor(type: AutomationType | null, delivery: Delivery): number {
  return A_PRICES.deliveryWeeks[type ?? "faq"][delivery];
}

export function automationDeliveryLabel(
  type: AutomationType | null,
  delivery: Delivery
): string {
  const weeks = automationWeeksFor(type, delivery);
  return `${PRICES.delivery[delivery].tier} — ${weeks} semana${weeks > 1 ? "s" : ""}`;
}

// ═══════════════════════════════════════════════════════════════════════════
//  COTIZADOR DE SEO / POSICIONAMIENTO
// ═══════════════════════════════════════════════════════════════════════════
//
// Tercera línea de negocio. Antes el SEO existía en el sitio SOLO como un
// extra de $250.000 dentro del cotizador web, lo que dejaba dos huecos:
//
//  1. Ese extra es SEO TÉCNICO: se hace una vez y se acaba. Posicionar es
//     trabajo mensual y continuo. Venderlos con el mismo nombre y el mismo
//     precio hacía que el cliente creyera que por $250.000 quedaba primero
//     en Google, que es la promesa que más rápido quema a una agencia.
//  2. El SEO no figuraba como servicio en la portada, en el pie ni en el
//     llms.txt, aunque es de lo que más se pregunta.
//
// PRECIOS. Banda del mercado colombiano en 2026 para SEO local mensual:
// $900.000 – $2.200.000. Debajo de $500.000/mes lo que se vende casi siempre
// es granja de enlaces, contenido de IA sin revisar o auditorías automáticas.
// Ese piso es argumento de venta, no solo de defensa: el plan de entrada
// arranca en $650.000 justo por encima de él.

export type SeoPlan = "local" | "crecimiento" | "competido";

export type SeoExtraKey = "puestaApunto" | "ficha" | "contenidoExtra";

export const SEO_PRICES = {
  /** Mensualidad de cada plan. */
  plan: {
    local: 650000,
    crecimiento: 1100000,
    competido: 1800000,
  } as Record<SeoPlan, number>,

  /** Ciudades más allá de la que incluye el plan. Mensual. */
  ciudadExtra: 250000,

  /** Artículos por encima de los que trae el plan. Mensual. */
  contenidoExtraUnidad: 180000,

  /** Trabajos de una sola vez, al arrancar. */
  extras: {
    puestaApunto: 850000,
    ficha: 180000,
    contenidoExtra: 0, // se calcula por unidad, ver arriba
  } as Record<SeoExtraKey, number>,

  /** Meses que tarda en verse el efecto. No es un compromiso de permanencia. */
  mesesParaResultados: 6,
};

export const SEO_PLAN_LABEL: Record<SeoPlan, string> = {
  local: "Local",
  crecimiento: "Crecimiento",
  competido: "Sector competido",
};

export const SEO_PLAN_DESC: Record<SeoPlan, string> = {
  local: "Un negocio, una ciudad, un servicio principal.",
  crecimiento: "Varios servicios o varias ciudades a la vez.",
  competido: "Sectores caros: salud, legal, inmobiliario, seguros.",
};

/** Artículos de contenido que trae cada plan al mes. */
export const SEO_PLAN_CONTENIDOS: Record<SeoPlan, number> = {
  local: 2,
  crecimiento: 4,
  competido: 8,
};

export const SEO_PLAN_DETALLE: Record<SeoPlan, string[]> = {
  local: [
    "Una ciudad y un servicio principal trabajados a fondo",
    "Ficha de Google Business gestionada: publicaciones, fotos y respuestas a reseñas",
    "2 contenidos al mes, escritos y publicados",
    "Optimización continua de las páginas que ya tienes",
    "Vigilancia de posiciones de hasta 30 búsquedas",
    "Informe mensual con lo hecho, lo que se movió y lo que sigue",
  ],
  crecimiento: [
    "Todo lo del plan Local",
    "Varios servicios o varias ciudades trabajados en paralelo",
    "4 contenidos al mes",
    "Enlaces y altas en directorios locales del sector",
    "Páginas de aterrizaje nuevas cuando la investigación las pida",
    "Vigilancia de hasta 100 búsquedas",
    "Llamada mensual de revisión, no solo el informe",
  ],
  competido: [
    "Todo lo del plan Crecimiento",
    "Contenido semanal: 8 piezas al mes",
    "Digital PR: enlaces de medios y sitios con autoridad real",
    "Análisis de la competencia y de los huecos que deja",
    "Datos estructurados avanzados y optimización para búsquedas con IA",
    "Vigilancia de hasta 300 búsquedas",
    "Informe quincenal y llamada cada dos semanas",
  ],
};

export const SEO_EXTRA_LABEL: Record<SeoExtraKey, string> = {
  puestaApunto: "Revisión y arreglo del sitio",
  ficha: "Ficha de Google Business",
  contenidoExtra: "Contenidos adicionales",
};

export const SEO_EXTRA_DETALLE: Record<SeoExtraKey, string[]> = {
  puestaApunto: [
    "Reviso el sitio entero y hago la lista de lo que lo está frenando en Google",
    "Arreglo lo encontrado: páginas lentas, enlaces rotos, textos repetidos, imágenes pesadas, páginas que Google no puede leer",
    "Averiguo qué busca la gente de tu sector y con qué palabras exactas, y asigno una página a cada búsqueda",
    "Dejo los títulos, las descripciones y los datos que Google lee en cada página",
    "Instalo la analítica y doy de alta el sitio en Google, para poder medir desde el mes uno",
    "Va una sola vez, al principio. Es arrancar parejo: sin esto, el trabajo mensual empuja un carro con el freno puesto",
    "Si el sitio lo hice yo con SEO técnico incluido, esto ya está hecho y no se cobra",
  ],
  ficha: [
    "Creación y verificación de la ficha ante Google",
    "Categorías, servicios, horarios, zona de cobertura y fotos",
    "Primeras publicaciones y plantilla para pedir reseñas por WhatsApp",
    "Va una sola vez. Es lo que hace que salgas en el mapa",
  ],
  contenidoExtra: [
    "Artículo investigado, escrito y publicado, con sus imágenes",
    "Enlazado desde y hacia las páginas que corresponden",
    "Se suma a los que ya trae tu plan",
  ],
};

export type SeoAnswers = {
  plan: SeoPlan | null;
  /** Ciudades objetivo en total, incluida la que trae el plan. */
  ciudades: number;
  /** Artículos adicionales al mes, sobre los que trae el plan. */
  contenidoExtra: number;
  puestaApunto: boolean;
  ficha: boolean;
};

export const initialSeoAnswers: SeoAnswers = {
  plan: null,
  ciudades: 1,
  contenidoExtra: 0,
  puestaApunto: true,
  ficha: true,
};

export type SeoTotals = {
  /** Pagos de una sola vez, al arrancar. */
  setupItems: LineItem[];
  setupTotal: number;
  /** Lo que se paga cada mes. */
  monthlyItems: LineItem[];
  monthlyTotal: number;
  /** Primer pago = arranque + primer mes. */
  primerPago: number;
};

export function computeSeoTotals(a: SeoAnswers): SeoTotals {
  const setupItems: LineItem[] = [];
  const monthlyItems: LineItem[] = [];

  if (a.plan) {
    monthlyItems.push({
      label: `Plan ${SEO_PLAN_LABEL[a.plan]}`,
      amount: SEO_PRICES.plan[a.plan],
    });

    const ciudadesExtra = Math.max(0, (a.ciudades || 1) - 1);
    if (ciudadesExtra > 0) {
      monthlyItems.push({
        label: `${ciudadesExtra} ciudad${ciudadesExtra > 1 ? "es" : ""} adicional${ciudadesExtra > 1 ? "es" : ""}`,
        amount: ciudadesExtra * SEO_PRICES.ciudadExtra,
      });
    }

    if (a.contenidoExtra > 0) {
      monthlyItems.push({
        label: `${a.contenidoExtra} contenido${a.contenidoExtra > 1 ? "s" : ""} adicional${a.contenidoExtra > 1 ? "es" : ""} al mes`,
        amount: a.contenidoExtra * SEO_PRICES.contenidoExtraUnidad,
      });
    }
  }

  if (a.puestaApunto) {
    setupItems.push({
      label: SEO_EXTRA_LABEL.puestaApunto,
      amount: SEO_PRICES.extras.puestaApunto,
    });
  }
  if (a.ficha) {
    setupItems.push({ label: SEO_EXTRA_LABEL.ficha, amount: SEO_PRICES.extras.ficha });
  }

  const setupTotal = setupItems.reduce((s, it) => s + it.amount, 0);
  const monthlyTotal = monthlyItems.reduce((s, it) => s + it.amount, 0);

  return {
    setupItems,
    setupTotal,
    monthlyItems,
    monthlyTotal,
    primerPago: setupTotal + monthlyTotal,
  };
}

/** Cuántos contenidos al mes salen en total con el plan y los adicionales. */
export function seoContenidosTotales(a: SeoAnswers): number {
  return (a.plan ? SEO_PLAN_CONTENIDOS[a.plan] : 0) + (a.contenidoExtra || 0);
}

/**
 * Nota obligatoria en cualquier propuesta de SEO. Prometer posiciones es la
 * mentira estándar del sector y la razón por la que el cliente llega quemado.
 */
export const SEO_HONESTY_NOTE =
  "Nadie puede garantizarte el primer puesto en Google, y quien te lo prometa " +
  "por escrito te está mintiendo: las posiciones las decide Google, no la " +
  "agencia. Lo que sí te garantizo es el trabajo hecho, medido y visible en un " +
  "informe. Los primeros movimientos se ven entre el mes 3 y el 6.";

// ═══════════════════════════════════════════════════════════════════════════
//  LOS PISOS PUBLICADOS
// ═══════════════════════════════════════════════════════════════════════════
//
// El «desde» que se enseña en la página, que NO es `PRICES.base`: esa es la
// base con la que arranca el cotizador antes de sumar nada, y para landing y
// tienda no coincide con lo que se anuncia.
//
// Vive aquí porque estaba copiado a mano en nueve componentes —850.000 cuatro
// veces, 2.500.000 cuatro veces, 650.000 cuatro veces— y subir un precio
// obligaba a acertar en los nueve. El primero que se olvidara dejaba dos
// páginas del mismo sitio cobrando distinto por lo mismo, que es de las cosas
// que un cliente sí nota y no perdona.
export const PISOS = {
  /** Landing de una página. */
  landing: 850000,
  /** Sitio corporativo de varias páginas. */
  corporativa: PRICES.base.corp,
  /** Tienda con pagos y envíos. */
  tienda: 2500000,
  /** Auditoría de SEO, pago único. */
  auditoria: 390000,
  /** Posicionamiento mensual. */
  seoMes: 650000,
  /** Renovación anual de dominio y alojamiento. */
  renovacion: 290000,
  /* El PISO de la línea de chatbots, que es el de preguntas frecuentes y no el
     de citas. Se saca con Math.min de los cinco a propósito: escogerlo a mano
     es cómo el carril de la portada llegó a anunciar «desde $1.600.000»
     mientras la página de chatbots empezaba en 700.000, o sea un «desde» más
     caro que el precio más barato del mismo servicio. */
  chatbot: Math.min(...Object.values(A_PRICES.base)),
  /* El mantenimiento del chatbot, mensual. Es el plan básico: el más barato de
     los tres, que es lo que un «desde» tiene que enseñar. Sin plan la
     automatización queda sin monitoreo, y el día que Meta rechace una plantilla
     o expire el token el bot deja de contestar sin avisar. */
  chatbotMes: A_PRICES.mantenimiento.basico,
  /* El piso del software a la medida. No sale de sumar pantallas: sale de que
     hasta el encargo más pequeño arranca con diseño de base de datos, accesos
     y despliegue, y ese trabajo existe aunque la interfaz sea una sola vista.
     Por debajo de esta cifra el encargo no es software: es otra cosa, y más
     barata. */
  software: 2000000,
} as const;

// ═══════════════════════════════════════════════════════════════════════════
//  EL CATÁLOGO PUBLICADO
// ═══════════════════════════════════════════════════════════════════════════
//
// `PISOS` resolvió los precios copiados a mano. Los PLAZOS siguen copiados, y
// ya se desincronizaron: la tienda se anunciaba en «3 semanas» en la meta
// descripción de su propia página, en tres ciudades y en los dos sectores, y
// en «3 a 5 semanas» en /precios y en el cuerpo de esa misma página. El
// chatbot iba «de 1 a 5 semanas» en su página y en Bogotá, y «de 2 a 5» en
// Cartagena y en los sectores. Un plazo no es un detalle de redacción: es lo
// segundo que pregunta un cliente y lo primero que le recuerda a uno cuando se
// pasa.
//
// La regla para resolverlos: MANDA LA PÁGINA DEL SERVICIO. Es la que el
// cliente lee entera antes de escribir, la que tiene el detalle del alcance y
// la única donde el plazo aparece con lo que lo mueve. Las ciudades, los
// sectores y /precios lo citan; no lo deciden.
//
// `null` significa que ese servicio NO tiene plazo de entrega, no que falte
// el dato: la renovación es anual y el SEO mensual es trabajo continuo. Poner
// un número ahí sería prometer un resultado, que es justo lo que el sitio dice
// que no hace.

/** Una cadena en las dos lenguas, sin depender de la capa de contenido. */
export type Bilingue = { es: string; en: string };

export const PLAZOS = {
  landing: { es: "5 días", en: "5 days" },
  corporativa: { es: "1 a 2 semanas", en: "1 to 2 weeks" },
  tienda: { es: "3 a 5 semanas", en: "3 to 5 weeks" },
  chatbot: { es: "de 1 a 5 semanas", en: "1 to 5 weeks" },
  auditoria: { es: "5 días", en: "5 days" },
  software: {
    es: "primera versión útil en un mes",
    en: "first useful version in a month",
  },
  seoMes: null,
  renovacion: null,
} as const satisfies Record<string, Bilingue | null>;

/** Cómo se cobra cada línea. */
export type Unidad = "unico" | "mes" | "anio";

export type ServicioPublicado = {
  id: keyof typeof PISOS;
  nombre: Bilingue;
  /** El «desde», en pesos. Sale de `PISOS`, nunca de un literal. */
  desde: number;
  unidad: Unidad;
  /** `null` cuando el servicio no tiene entrega: ver la nota de `PLAZOS`. */
  plazo: Bilingue | null;
  href: Bilingue;
  desc: Bilingue;
  /** Lo que cobra un tercero y por eso NO está en el precio de arriba. */
  notas: Bilingue[];
  /**
   * Para qué líneas base tiene sentido este recurrente, y solo esas.
   *
   * Existe porque /precios ofrecía los tres extras con cualquier base: se podía
   * escoger «Auditoría SEO» y marcar «Mantenimiento del chatbot», que es
   * mantener un bot que no se compró, o «Renovación anual» de un sitio que la
   * auditoría no entrega. Un armador que deja armar cosas imposibles no
   * inspira confianza en los números que enseña al lado.
   *
   * Solo lo llevan los recurrentes. Una línea sin este campo no es un extra.
   */
  paraBases?: readonly ServicioPublicado["id"][];
};

/**
 * Todo lo que el sitio cobra, en un solo sitio, para que ninguna página pueda
 * enseñar una lista distinta de otra.
 *
 * Faltaban tres líneas en /precios —el chatbot, su mantenimiento y el piso del
 * software, que ya existe en `PISOS.software`— mientras las tres se anunciaban
 * en la portada, en las páginas de servicio y en las ciudades. Y Barranquilla
 * enseñaba seis tarjetas sin chatbot teniendo una sección entera de
 * conversación de WhatsApp.
 */
export const CATALOGO: readonly ServicioPublicado[] = [
  {
    id: "landing",
    nombre: { es: "Página web", en: "Website" },
    desde: PISOS.landing,
    unidad: "unico",
    plazo: {
      es: `${PLAZOS.landing.es} la landing · ${PLAZOS.corporativa.es} la corporativa`,
      en: `${PLAZOS.landing.en} for a landing page · ${PLAZOS.corporativa.en} for a corporate site`,
    },
    href: { es: "/servicios/diseno-de-paginas-web", en: "/en/services/web-design" },
    desc: {
      es: "De una landing a una web corporativa. Diseño propio, no plantilla comprada.",
      en: "From a landing page to a corporate site. Designed from scratch, not a bought template.",
    },
    notas: [],
  },
  {
    id: "tienda",
    nombre: { es: "Tienda virtual", en: "Online store" },
    desde: PISOS.tienda,
    unidad: "unico",
    plazo: PLAZOS.tienda,
    href: { es: "/servicios/tiendas-virtuales", en: "/en/services/online-stores" },
    desc: {
      es: "Catálogo, carrito, pagos en línea y panel para administrar productos e inventario.",
      en: "Catalogue, cart, online payments and a panel to manage products and stock.",
    },
    notas: [
      {
        es: "La pasarela de pago cobra su comisión por venta. Ese porcentaje es suyo, no mío.",
        en: "The payment gateway charges its own commission per sale. That percentage is theirs, not mine.",
      },
    ],
  },
  {
    id: "chatbot",
    nombre: { es: "Chatbot de WhatsApp", en: "WhatsApp chatbot" },
    desde: PISOS.chatbot,
    unidad: "unico",
    plazo: PLAZOS.chatbot,
    href: { es: "/servicios/chatbot-whatsapp", en: "/en/services/whatsapp-chatbot" },
    desc: {
      es: "Tu número contesta solo: responde lo repetido, capta interesados y agenda.",
      en: "Your number answers on its own: handles the repeated questions, captures leads and books.",
    },
    notas: [
      {
        es: "El consumo de la API de Meta lo cobra Meta, a tu cuenta y no a la mía.",
        en: "Meta's API usage is billed by Meta, to your account and not mine.",
      },
    ],
  },
  {
    id: "chatbotMes",
    nombre: { es: "Mantenimiento del chatbot", en: "Chatbot maintenance" },
    desde: PISOS.chatbotMes,
    unidad: "mes",
    plazo: null,
    href: { es: "/servicios/chatbot-whatsapp", en: "/en/services/whatsapp-chatbot" },
    desc: {
      es: "Monitoreo del token y de las plantillas. Sin plan, si Meta rechaza una plantilla el bot deja de contestar y nadie se entera.",
      en: "Token and template monitoring. Without a plan, if Meta rejects a template the bot stops answering and nobody notices.",
    },
    notas: [],
    /* No se mantiene un bot que no se compró. */
    paraBases: ["chatbot"],
  },
  {
    id: "auditoria",
    nombre: { es: "Auditoría SEO", en: "SEO audit" },
    desde: PISOS.auditoria,
    unidad: "unico",
    plazo: PLAZOS.auditoria,
    href: { es: "/servicios/posicionamiento-seo", en: "/en/services/seo" },
    desc: {
      es: "Qué te está frenando hoy en Google, con la lista de arreglos en orden de impacto.",
      en: "What is holding you back on Google today, with the fixes listed by impact.",
    },
    notas: [],
  },
  {
    id: "seoMes",
    nombre: { es: "SEO local mensual", en: "Monthly local SEO" },
    desde: PISOS.seoMes,
    unidad: "mes",
    plazo: null,
    href: { es: "/servicios/posicionamiento-seo", en: "/en/services/seo" },
    desc: {
      es: "Trabajo continuo de posicionamiento en búsquedas con ciudad.",
      en: "Ongoing work to rank for searches that name a city.",
    },
    notas: [],
    /* Donde hay algo que posicionar: una web, una tienda, o el sitio que la
       auditoría acaba de revisar —que es su continuación natural—. Un chatbot
       no sale en Google y un sistema interno no tiene por qué salir. */
    paraBases: ["landing", "tienda", "auditoria"],
  },
  {
    id: "software",
    nombre: { es: "Software a la medida", en: "Custom software" },
    desde: PISOS.software,
    unidad: "unico",
    plazo: PLAZOS.software,
    href: { es: "/servicios/software-a-la-medida", en: "/en/services/custom-software" },
    desc: {
      es: "Sistemas internos: inventario, pedidos, historias, comisiones. Hasta el más pequeño arranca con base de datos, accesos y despliegue.",
      en: "Internal systems: stock, orders, records, commissions. Even the smallest one starts with a database, credentials and deployment.",
    },
    notas: [],
  },
  {
    id: "renovacion",
    nombre: { es: "Renovación anual", en: "Yearly renewal" },
    desde: PISOS.renovacion,
    unidad: "anio",
    plazo: null,
    href: { es: "/precios", en: "/en/pricing" },
    desc: {
      es: "Dominio, alojamiento, certificado y respaldos del sitio entregado.",
      en: "Domain, hosting, certificate and backups of the delivered site.",
    },
    notas: [],
    /* «Del sitio entregado»: solo la web y la tienda lo son. La auditoría
       revisa un sitio que ya es tuyo y el software a la medida lleva su propio
       despliegue dentro del alcance, no una tarifa de lista. */
    paraBases: ["landing", "tienda"],
  },
];

/** Una línea del catálogo por id, para que una página no tenga que filtrar. */
export const catalogo = (id: ServicioPublicado["id"]): ServicioPublicado => {
  const l = CATALOGO.find((s) => s.id === id);
  if (!l) throw new Error(`No hay línea de catálogo para "${id}"`);
  return l;
};
