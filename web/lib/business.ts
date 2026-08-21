// Fuente única de verdad de los DATOS DEL NEGOCIO (NAP + datos legales).
// Se reutiliza en el Footer, las páginas legales y el JSON-LD (structured data).
// Mantener coherente con la verificación de negocio en Meta y el RUT.

import { SITE_NAME, SITE_URL } from "@/lib/site";

export const BUSINESS = {
  /** Nombre comercial (marca, visible al público). */
  tradeName: SITE_NAME, // "JV Agencia"
  /**
   * Nombre legal del responsable (persona natural) EN EL ORDEN DEL RUT: apellidos
   * primero, SIN TILDES — exactamente "GAMBIN JALLER LUIS ANGEL". NO cambiar la
   * ortografía ni el orden: la verificación de Meta compara el string contra el RUT
   * y una tilde ("Gambín"/"Ángel") o el orden invertido rompen la coincidencia
   * (fue la causa del rechazo). Título capitalizado para lectura; el string exacto
   * en mayúscula vive en `legalNameOfficial`.
   */
  legalName: "Gambin Jaller Luis Angel",
  /** Razón social EXACTA como aparece en el RUT/DIAN (match del crawler de Meta). */
  legalNameOfficial: "GAMBIN JALLER LUIS ANGEL",
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
    // Exacto como el RUT (campo 41. Dirección principal).
    street: "URB LA CRUZ CR 19 MZ G LT 19",
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
    instagram: "https://www.instagram.com/jvagencia/",
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
