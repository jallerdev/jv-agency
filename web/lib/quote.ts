// Cotizador web — configuración de precios y cálculo.
// Moneda: COP (peso colombiano). Los valores son base de referencia y
// se pueden ajustar aquí sin tocar la UI.

export const DISCOUNT_TODAY = 0.25; // 25% si se contrata hoy (promo de lanzamiento)

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
  discount: number;
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

  const discount = Math.round(subtotal * DISCOUNT_TODAY);
  const total = subtotal - discount;

  return { items, baseSum, deliveryAdjustment, subtotal, discount, total };
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
