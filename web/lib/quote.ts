// Cotizador web — configuración de precios y cálculo.
// Moneda: COP (peso colombiano). Los valores son base de referencia y
// se pueden ajustar aquí sin tocar la UI.

export type SiteType = "landing" | "corp" | "ecom";
export type Delivery = "urgent" | "standard" | "extended";
export type ExtraKey =
  | "gateway"
  | "email"
  | "domain"
  | "hosting"
  | "seo"
  | "lang"
  | "blog";

export const PRICES = {
  base: { landing: 450000, corp: 800000, ecom: 1500000 } as Record<SiteType, number>,
  extraPage: 80000,
  extras: {
    gateway: 300000,
    email: 150000,
    domain: 100000,
    hosting: 150000,
    seo: 250000,
    lang: 200000,
    blog: 150000,
  } as Record<ExtraKey, number>,
  productsTier: [
    { label: "0 a 50 productos", min: 0, max: 50, add: 250000 },
    { label: "50 a 150 productos", min: 51, max: 150, add: 450000 },
    { label: "150 a 400 productos", min: 151, max: 400, add: 1000000 },
    { label: "400 a 1.000 productos", min: 401, max: 1000, add: 2000000 },
    { label: "1.000 a 5.000 productos", min: 1001, max: 5000, add: 3000000 },
  ],
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

export type Answers = {
  type: SiteType | null;
  pages: number;
  productsTierIdx: number | null;
  gateway: boolean;
  email: boolean;
  domain: boolean;
  hosting: boolean;
  seo: boolean;
  lang: boolean;
  blog: boolean;
  delivery: Delivery;
};

export const initialAnswers: Answers = {
  type: null,
  pages: 1,
  productsTierIdx: null,
  gateway: false,
  email: false,
  domain: false,
  hosting: false,
  seo: false,
  lang: false,
  blog: false,
  delivery: "standard",
};

export type LineItem = { label: string; amount: number };

export type Totals = {
  items: LineItem[];
  baseSum: number;
  deliveryAdjustment: number;
  subtotal: number;
  total: number;
};

const EXTRA_LABELS: Record<ExtraKey, string> = {
  gateway: "Pasarela de pago",
  email: "Correo corporativo",
  domain: "Registro de dominio",
  hosting: "Hosting y configuración",
  seo: "SEO básico",
  lang: "Idioma adicional",
  blog: "Blog / Noticias",
};

const EXTRA_KEYS: ExtraKey[] = [
  "gateway",
  "email",
  "domain",
  "hosting",
  "seo",
  "lang",
  "blog",
];

export function computeTotals(a: Answers): Totals {
  const items: LineItem[] = [];

  if (a.type) {
    items.push({ label: TYPE_LABEL[a.type], amount: PRICES.base[a.type] });
  }

  const extraPages = Math.max(0, (a.pages || 1) - 1);
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

  for (const key of EXTRA_KEYS) {
    if (a[key]) items.push({ label: EXTRA_LABELS[key], amount: PRICES.extras[key] });
  }

  const baseSum = items.reduce((s, it) => s + it.amount, 0);

  const del = PRICES.delivery[a.delivery] ?? PRICES.delivery.standard;
  const deliveryAdjustment = Math.round(baseSum * del.mod);
  const subtotal = baseSum + deliveryAdjustment;
  const total = subtotal;

  return { items, baseSum, deliveryAdjustment, subtotal, total };
}

const copFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export const money = (n: number) => copFormatter.format(n);

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
//  2. LAS CONVERSACIONES NO SON INGRESO NUESTRO. Somos Tech Provider verificado
//     por Meta: en ese modelo Meta le cobra el consumo de la API DIRECTAMENTE al
//     cliente, con su propio medio de pago. Nosotros cobramos por construir y
//     mantener. Por eso el costo de conversaciones NO entra en los totales — se
//     comunica como nota (ver `META_BILLING_NOTE`). Meterlo como ingreso sería
//     cobrar dos veces algo que no facturamos.

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

export type AutomationTotals = Totals & {
  /** Recurrente mensual del plan de mantenimiento. No se suma al total. */
  monthly: number;
  monthlyLabel: string;
};

/** Nota obligatoria en la propuesta: el consumo de Meta no lo facturamos nosotros. */
export const META_BILLING_NOTE =
  "El consumo de la API de WhatsApp lo cobra Meta directamente a tu cuenta, con tu " +
  "propio medio de pago. No está incluido acá porque no lo facturamos nosotros: " +
  "depende de cuántas conversaciones tengas.";

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
