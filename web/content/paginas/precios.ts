import type { Idioma, Texto, Traducido } from "@/content/types";
import { money, PISOS } from "@/lib/quote";

/**
 * LOS PRECIOS, EN LAS DOS LENGUAS
 * ──────────────────────────────────────────────────────────────────────────
 * LOS NÚMEROS NO SE TRADUCEN Y NO SE CONVIERTEN. Van en pesos colombianos en
 * los dos idiomas, con la moneda dicha en el inglés («COP»), porque convertir
 * a dólares obligaría a inventar una tasa de cambio y a mantenerla al día: el
 * precio dejaría de ser un dato y pasaría a ser una estimación. Es la misma
 * regla que rige todo el sitio —no se publica una cifra que no se pueda
 * sostener—, aplicada aquí.
 *
 * El importe va como CADENA LITERAL, no como número formateado, para que
 * coincida carácter por carácter con el material comercial. El valor limpio
 * vive aparte, en `montoCop`, y de ahí sale el dato estructurado: el JSON-LD
 * lee el número, no el texto ya formateado.
 */
export type LineaPrecio = {
  servicio: Texto;
  /**
   * El precio impreso, SOLO para las líneas que no tienen un número que dar
   * («según alcance»). Cuando hay `montoCop`, el texto se compone con él y
   * este campo se deja fuera.
   *
   * Estaba escrito a mano en las seis líneas —«desde $850.000» / «from
   * $850,000 COP»— y al lado, en el mismo registro, `montoCop: 850000` para
   * el dato estructurado. El mismo número dos veces, en tres sitios contando
   * los dos idiomas, en la página que existe precisamente para ser la fuente
   * del precio. Subirlo pedía acertar en todos.
   */
  precio?: Texto;
  /** El plazo de entrega, si la línea tiene uno. */
  plazo?: Texto;
  /** El monto en pesos para el JSON-LD. Falta cuando no hay número que dar. */
  montoCop?: number;
  /** Si el monto es un piso («desde») o una tarifa cerrada. */
  esDesde?: boolean;
  /** Precio por mes: cambia el tipo de especificación en el dato estructurado. */
  mensual?: boolean;
  /** Descripción para el dato estructurado, no para la página. */
  schemaDesc: Texto;
};

/**
 * El precio tal y como se imprime, compuesto a partir del número.
 *
 * Una sola función para las dos lenguas: el «desde» y el «al mes» son las dos
 * únicas palabras que cambian, y tenerlas aquí evita que una línea diga «al
 * mes» en castellano y se olvide del «a month» en inglés, que es exactamente
 * el tipo de fallo que deja media tabla a medio traducir.
 */
const DESDE: Record<Idioma, string> = { es: "desde ", en: "from " };
const AL_MES: Record<Idioma, string> = { es: " al mes", en: " a month" };

export function precioImpreso(l: LineaPrecio, idioma: Idioma): string {
  if (l.montoCop === undefined) return l.precio?.[idioma] ?? "";
  return (
    (l.esDesde ? DESDE[idioma] : "") +
    money(l.montoCop, idioma) +
    (l.mensual ? AL_MES[idioma] : "")
  );
}

export const LINEAS: readonly LineaPrecio[] = [
  {
    servicio: { es: "Página web", en: "Website" },
    plazo: {
      es: "5 días la landing · 1 a 2 semanas la corporativa",
      en: "5 days for a landing page · 1 to 2 weeks for a corporate site",
    },
    montoCop: PISOS.landing,
    esDesde: true,
    schemaDesc: {
      es: "Página web a la medida, con dominio y correo propio.",
      en: "A custom website, with your own domain and email.",
    },
  },
  {
    servicio: { es: "Tienda online", en: "Online store" },
    plazo: { es: "3 a 5 semanas", en: "3 to 5 weeks" },
    montoCop: PISOS.tienda,
    esDesde: true,
    schemaDesc: {
      es: "Tienda en línea con catálogo, carrito, cuentas, pagos y envíos.",
      en: "An online store with catalogue, cart, accounts, payments and shipping.",
    },
  },
  {
    servicio: { es: "Auditoría SEO", en: "SEO audit" },
    plazo: { es: "5 días", en: "5 days" },
    montoCop: PISOS.auditoria,
    esDesde: true,
    schemaDesc: {
      es: "Diagnóstico de por qué un sitio no aparece cuando lo buscan, y qué se arregla primero.",
      en: "A diagnosis of why a site doesn't show up when people search for it, and what to fix first.",
    },
  },
  {
    servicio: { es: "SEO local mensual", en: "Monthly local SEO" },
    montoCop: PISOS.seoMes,
    esDesde: true,
    mensual: true,
    schemaDesc: {
      es: "Trabajo continuo de posicionamiento en búsquedas con ciudad.",
      en: "Ongoing work to rank for searches that name a city.",
    },
  },
  {
    servicio: { es: "Renovación anual", en: "Yearly renewal" },
    montoCop: PISOS.renovacion,
    schemaDesc: {
      es: "Renovación anual del dominio, el alojamiento y el mantenimiento del sitio en pie.",
      en: "Yearly renewal of the domain, the hosting and keeping the site standing.",
    },
  },
  {
    servicio: { es: "Software a la medida", en: "Custom software" },
    precio: { es: "según alcance", en: "depends on scope" },
    schemaDesc: {
      es: "Apps web, sistemas internos y plataformas hechas a la medida. El precio va según el alcance.",
      en: "Web apps, internal systems and custom platforms. The price follows the scope.",
    },
  },
];

/* Los tres renglones del documento de ejemplo. Son CONCEPTOS, no importes:
   describen de qué se compone cualquier propuesta y son verdaderos por
   construcción —ninguno afirma un número, un plazo ni un cliente. */
export const RENGLONES: readonly { concepto: Texto; detalle: Texto }[] = [
  {
    concepto: { es: "El formato", en: "The format" },
    detalle: {
      es: "Landing, corporativa, tienda o software.",
      en: "Landing page, corporate site, store or software.",
    },
  },
  {
    concepto: { es: "Lo que le sumes", en: "What you add" },
    detalle: {
      es: "Páginas, idiomas, pasarela, reservas.",
      en: "Pages, languages, payment gateway, bookings.",
    },
  },
  {
    concepto: { es: "Puesta en marcha", en: "Going live" },
    detalle: {
      es: "Dominio, correo y salida al aire.",
      en: "Domain, email and launch.",
    },
  },
];

/* Los destinos de quien ya vio un número: el detalle del servicio o su ciudad.
   NO se enlaza /cotizador: es la herramienta interna de venta, va detrás de
   contraseña y con noindex. Enlazarla desde una página pública dejaría al
   visitante en una pantalla de contraseña. */
export const DETALLE: readonly { texto: Texto; href: Traducido<string> }[] = [
  {
    texto: { es: "Todos los servicios", en: "All services" },
    href: { es: "/#servicios", en: "/en#servicios" },
  },
  {
    texto: { es: "Diseño de páginas web", en: "Web design" },
    href: { es: "/servicios/diseno-de-paginas-web", en: "/en/services/web-design" },
  },
  {
    texto: { es: "Chatbot de WhatsApp", en: "WhatsApp chatbot" },
    href: { es: "/servicios/chatbot-whatsapp", en: "/en/services/whatsapp-chatbot" },
  },
  {
    texto: { es: "Tiendas virtuales", en: "Online stores" },
    href: { es: "/servicios/tiendas-virtuales", en: "/en/services/online-stores" },
  },
  {
    texto: { es: "Posicionamiento SEO", en: "SEO" },
    href: { es: "/servicios/posicionamiento-seo", en: "/en/services/seo" },
  },
  {
    texto: { es: "Software a la medida", en: "Custom software" },
    href: { es: "/servicios/software-a-la-medida", en: "/en/services/custom-software" },
  },
  /* Las tres de ciudad no tienen versión en inglés y no la van a tener: son
     SEO local en español. Desde el inglés apuntan a la española. */
  {
    texto: { es: "Páginas web en Cartagena", en: "Websites in Cartagena" },
    href: {
      es: "/diseno-de-paginas-web-en-cartagena",
      en: "/diseno-de-paginas-web-en-cartagena",
    },
  },
  {
    texto: { es: "Páginas web en Barranquilla", en: "Websites in Barranquilla" },
    href: {
      es: "/diseno-de-paginas-web-en-barranquilla",
      en: "/diseno-de-paginas-web-en-barranquilla",
    },
  },
  {
    texto: { es: "Páginas web en Bogotá", en: "Websites in Bogotá" },
    href: {
      es: "/diseno-de-paginas-web-en-bogota",
      en: "/diseno-de-paginas-web-en-bogota",
    },
  },
];

export const PRECIOS = {
  badge: { es: "Precios", en: "Pricing" },
  titulo: { es: "Los precios,", en: "The prices," },
  tituloAcento: { es: "publicados.", en: "published." },
  entradilla: {
    es: "Casi nadie los pone. Yo sí: miras el número y sabes si te sirvo, sin gastar una llamada.",
    en: "Almost nobody publishes them. I do: you look at the number and know whether I'm any use to you, without spending a call.",
  },
  tablaTitulo: { es: "Precios y plazos", en: "Prices and timelines" },
  documento: {
    eyebrow: { es: "Tu propuesta", en: "Your proposal" },
    ejemplo: { es: "Ejemplo", en: "Example" },
    total: { es: "Total", en: "Total" },
    firma: { es: "Luis Jaller · Turbaco, Bolívar", en: "Luis Jaller · Turbaco, Bolívar" },
    compromiso: {
      es: "Por escrito, antes de pagar nada",
      en: "In writing, before you pay anything",
    },
    pie: {
      es: "Son precios de arranque: el final depende del alcance. El tuyo sale así —no al final de un embudo de tres reuniones.",
      en: "These are starting prices: the final one depends on scope. Yours comes out like this — not at the end of a three-meeting funnel.",
    },
  },
  detalleTitulo: { es: "Dónde ver el detalle", en: "Where to see the detail" },
  cierre: {
    titulo: {
      es: "¿Tu proyecto no encaja en ninguna línea?",
      en: "Doesn't your project fit any of these lines?",
    },
    cuerpo: {
      es: "Cuéntame qué necesitas y te digo en qué rango cae. Si no te puedo ayudar, te lo digo también.",
      en: "Tell me what you need and I'll tell you which range it falls into. If I can't help you, I'll say that too.",
    },
    cta: { es: "Agenda una llamada", en: "Book a call" },
    href: { es: "/#agenda", en: "/en#agenda" },
  },
} as const;
