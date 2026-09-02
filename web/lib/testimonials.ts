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
  /**
   * Si la recomendación se escribió en otro idioma, `quote` lleva la traducción
   * y aquí queda el texto original. La tarjeta avisa que está traducida: al
   * lector le sirve el español, pero la prueba es el original y no se tira.
   */
  originalLang?: "en";
  original?: string;
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
export const TESTIMONIALS: Testimonial[] = [
  {
    // Original en inglés; la traducción es nuestra y la tarjeta lo dice.
    quote:
      "Luis ha estado trabajando conmigo en InvitiApp y ha sido fantástico. Ha ayudado con la " +
      "infraestructura en AWS, el desarrollo full-stack con Next.js, las pruebas, la detección de " +
      "mejoras de rendimiento en la base de datos, y ha aportado ideas valiosas de producto. Y lo " +
      "más importante: de verdad le importa el producto.",
    original:
      "Luis has been working with me on InvitiApp, and he has been fantastic. He has helped with " +
      "AWS infrastructure, full-stack development using Next.js, testing, identifying database " +
      "performance improvements, and contributing valuable product ideas. Most importantly, he " +
      "genuinely cares about the product. Thank you, Luis, for all your great work on InvitiApp!",
    originalLang: "en",
    author: "David Adrian Uribe Soto",
    role: "Software Engineer · lo supervisó directamente en InvitiApp",
    source: "LinkedIn",
    url: "https://www.linkedin.com/in/jallerdev",
  },
  {
    quote:
      "Tuve la oportunidad de trabajar con Luis y, honestamente, es de esas personas que hacen que " +
      "el trabajo en equipo sea fácil. Es un desarrollador muy sólido, sobre todo en backend, y se " +
      "le nota el dominio que tiene del ecosistema de Node.js y TypeScript. Más allá de lo técnico, " +
      "lo que más valoro es lo intencional que es al hacer las cosas bien: siempre está pensando en " +
      "escalabilidad, en automatización y en cómo mejorar el flujo de trabajo del equipo. […]",
    original:
      "I had the chance to work with Luis, and honestly, he's one of those people who just makes " +
      "teamwork easy. He's a very solid developer, especially on the backend, and it really shows " +
      "how strong his command is of the Node.js and TypeScript ecosystem. Beyond his technical " +
      "skills, what I appreciate the most is how intentional he is about doing things right. He's " +
      "always thinking about scalability, automation, and how to improve the team's workflow. His " +
      "experience with tools like Docker, Terraform, and AWS brings a lot of structure and " +
      "reliability […]",
    originalLang: "en",
    author: "Justin Castro Perez",
    role: "Systems Engineer · trabajaron juntos en varias empresas",
    source: "LinkedIn",
    url: "https://www.linkedin.com/in/jallerdev",
  },
];

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
