/**
 * Recomendaciones y testimonios de clientes.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  CÓMO AGREGAR UNA
 * ─────────────────────────────────────────────────────────────────────────
 * Se copian A MANO. LinkedIn no tiene forma de traerlas solo: su API no
 * expone las recomendaciones de un perfil (solo nombre, foto y correo con
 * "Sign in with LinkedIn"), y raspar el perfil va contra sus términos y lo
 * bloquean activamente. Copiar y pegar es la vía legítima y la única estable.
 *
 * Antes de publicar una, dos cosas:
 *  1. Pedirle el visto bueno a quien la escribió. Es pública en LinkedIn,
 *     pero republicar su nombre y su cargo en un sitio comercial es otra
 *     cosa. Un mensaje basta, y de paso suele traer una segunda recomendación.
 *  2. Dejar el texto TAL CUAL. Se puede recortar con […] si es muy largo,
 *     nunca reescribir: la gracia es que se note que lo escribió otra persona.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  POR QUÉ NO LLEVAN DATOS ESTRUCTURADOS DE RESEÑA
 * ─────────────────────────────────────────────────────────────────────────
 * Tentador, pero está prohibido y no sirve. Desde septiembre de 2019 Google
 * no muestra estrellas cuando la reseña es "self-serving" — es decir, cuando
 * la empresa reseñada controla las reseñas sobre sí misma en su propio sitio.
 * Aplica justamente a los tipos que usa este sitio: Organization y
 * ProfessionalService.
 *
 * Publicarlas como texto normal NO acarrea penalización, y siguen sirviendo
 * para lo que de verdad importa: que una persona lea y confíe, y que Google
 * vea señales de experiencia real (E-E-A-T). Lo que NO hay que hacer es
 * marcarlas con `Review` o `AggregateRating` colgando de la organización.
 *
 * Las estrellas en Google salen de la ficha de Google Business, no de acá.
 */

export type Testimonial = {
  /** Texto tal como lo escribió la persona. */
  quote: string;
  /** Nombre completo de quien la escribió. */
  author: string;
  /** Cargo y empresa, como aparece en su perfil. */
  role: string;
  /** De dónde salió: se muestra al lector como prueba de que no es inventada. */
  source: "LinkedIn" | "Google" | "WhatsApp" | "Correo";
  /** Enlace al perfil o a la reseña original. Opcional pero recomendado. */
  url?: string;
  /** Iniciales para el monograma. Si se omite, se calculan del nombre. */
  initials?: string;
};

/**
 * Vacío a propósito: aquí no va nada inventado. Mientras esté vacío, la
 * sección no se renderiza y la portada se ve exactamente como hoy.
 *
 * Ejemplo de una entrada, para copiar:
 *
 *   {
 *     quote:
 *       "Luis entendió lo que necesitábamos antes que nosotros mismos. " +
 *       "Entregó a tiempo y el sitio quedó mejor de lo que pedimos.",
 *     author: "Nombre Apellido",
 *     role: "Gerente · Empresa S.A.S.",
 *     source: "LinkedIn",
 *     url: "https://www.linkedin.com/in/usuario/",
 *   },
 */
export const TESTIMONIALS: Testimonial[] = [];

/** Iniciales del nombre, máximo dos letras. */
export function initialsOf(t: Testimonial): string {
  if (t.initials) return t.initials.toUpperCase().slice(0, 2);
  return t.author
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}
