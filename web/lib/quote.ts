// Cotizador web — configuración de precios y cálculo.
// Moneda: COP (peso colombiano). Los valores son base de referencia y
// se pueden ajustar aquí sin tocar la UI.

export const DISCOUNT_TODAY = 0.1; // 10% si se contrata hoy

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
    email: 100000,
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
  delivery: {
    urgent: { label: "Urgente — 1 semana", mod: 0.25 },
    standard: { label: "Estándar — 2 semanas", mod: 0 },
    extended: { label: "Extendida — 4 semanas", mod: -0.1 },
  } as Record<Delivery, { label: string; mod: number }>,
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
