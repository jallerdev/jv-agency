/**
 * EL FORMATO DEL DINERO, Y SOLO ESO
 * ──────────────────────────────────────────────────────────────────────────
 * Vivía dentro de `lib/quote.ts`, que es el catálogo entero: mil quinientas
 * líneas con precios, plazos, extras y textos. En cuanto un componente de
 * CLIENTE necesitó formatear un peso —el contador de la tabla de /precios—,
 * importarlo de ahí habría metido el catálogo completo en el paquete del
 * navegador para usar seis líneas.
 *
 * Así que el formateador se muda a su propio módulo y `lib/quote.ts` lo
 * reexporta: ninguna de las cuarenta llamadas que ya existen cambia de sitio, y
 * el cliente importa solo lo que gasta.
 *
 * POR QUÉ NO SE USA `Intl` A PELO EN CADA SITIO: `es-CO` mete un espacio duro
 * entre el signo y la cifra —«$ 850.000»— y el precio autorizado se escribe
 * «$850.000». Eso se quitaba a mano en dos páginas y la misma cifra salía con
 * espacio en una y sin él en otra.
 *
 * EN INGLÉS LLEVA «COP» DETRÁS. «$390,000» en un sitio que también vende fuera
 * del país se lee en dólares, que es el mismo error por el otro lado.
 */
const FORMATO = {
  es: new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }),
  en: new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }),
} as const;

export const money = (n: number, idioma: "es" | "en" = "es") =>
  idioma === "en"
    ? `$${FORMATO.en.format(n)} COP`
    : FORMATO.es.format(n).replace(/^(\$)\s+/u, "$1");
