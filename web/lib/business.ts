// Fuente única de verdad de los DATOS DEL NEGOCIO (NAP + datos legales).
// Se reutiliza en el Footer, las páginas legales y el JSON-LD (structured data).
// Mantener coherente con la verificación de negocio en Meta y el RUT.

import { SITE_NAME, SITE_URL } from "@/lib/site";

export const BUSINESS = {
  /** Nombre comercial (marca, visible al público). */
  tradeName: SITE_NAME, // "JV Agencia"
  /** Nombre legal del responsable (persona natural — coincide con el RUT). */
  legalName: "Luis Ángel Gambín Jaller",
  /** NIT / identificación fiscal. */
  taxId: "1007264035-7",

  email: "contacto@jvagencia.com",

  /** WhatsApp Business de la agencia (el de la WABA). Formato E.164 sin "+". */
  whatsapp: "573159475589",
  whatsappDisplay: "+57 315 947 5589",

  /** Teléfono comercial (el registrado como teléfono del negocio en Meta). */
  phone: "+573118694288",
  phoneDisplay: "+57 311 869 4288",

  address: {
    street: "URB La Cruz Cr 19 Mz G Lt 19",
    city: "Turbaco",
    region: "Bolívar",
    postalCode: "131001",
    country: "Colombia",
    countryCode: "CO",
  },

  /** Mercado al que prestamos servicio. */
  areaServed: "Latinoamérica",

  /** Redes sociales activas (las vacías no se renderizan ni entran al JSON-LD). */
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61590790404252",
    instagram: "https://www.instagram.com/jvangencia/",
  },
} as const;

/** Dirección en una sola línea (footer, etc.). */
export const ADDRESS_LINE = `${BUSINESS.address.city}, ${BUSINESS.address.region}, ${BUSINESS.address.country}`;

/** Enlace listo para el botón / link de WhatsApp. */
export const WHATSAPP_PREFILL =
  "Hola JV Agencia 👋 Me interesa hablar sobre un proyecto de diseño o desarrollo web.";
export const WHATSAPP_LINK = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
  WHATSAPP_PREFILL,
)}`;

/** Lista de URLs de redes sociales activas (para sameAs y footer). */
export const SOCIAL_LINKS = Object.entries(BUSINESS.social)
  .filter(([, url]) => Boolean(url))
  .map(([network, url]) => ({ network, url }));

/** Última actualización de los documentos legales. */
export const LEGAL_UPDATED = "5 de junio de 2026";

export { SITE_NAME, SITE_URL };
