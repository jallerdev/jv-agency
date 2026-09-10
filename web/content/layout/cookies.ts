import type { Texto, Traducido } from "@/content/types";

/**
 * EL AVISO DE COOKIES
 * ──────────────────────────────────────────────────────────────────────────
 * No es un adorno legal: el sitio carga Google Analytics 4, y la Ley 1581 de
 * 2012 pide consentimiento previo para tratar datos personales. Hasta ahora
 * GA4 arrancaba solo, sin preguntar. Con este aviso arranca DENEGADO —modo de
 * consentimiento v2— y solo sube a concedido si la persona acepta.
 *
 * Por eso el botón de rechazar tiene el mismo peso visual que el de aceptar:
 * un «rechazar» escondido en letra gris invalida el consentimiento, que por
 * definición tiene que ser libre.
 */
export const COOKIES = {
  titulo: { es: "Cookies", en: "Cookies" },
  texto: {
    es: "Uso Google Analytics para saber qué páginas sirven y cuáles no. Nada más: ni publicidad, ni perfiles, ni venta de datos. Si prefieres que no, el sitio funciona igual.",
    en: "I use Google Analytics to learn which pages work and which don't. Nothing else: no ads, no profiling, no selling data. If you'd rather not, the site works just the same.",
  },
  aceptar: { es: "Aceptar", en: "Accept" },
  rechazar: { es: "Rechazar", en: "Decline" },
  detalle: { es: "Ver la política", en: "Read the policy" },
  politica: { es: "/cookies", en: "/cookies" } as Traducido<string>,
} satisfies Record<string, Texto | Traducido<string>>;
