/**
 * La capa de contenido.
 *
 * POR QUÉ EXISTE
 * --------------
 * Antes el texto vivía dentro de los componentes: `PROYECTOS` en Portfolio,
 * `STEPS` en Process, `FAQS` declarado ONCE veces en archivos distintos, y el
 * copy del hero suelto en el JSX. Cambiar una frase obligaba a abrir un
 * componente de React, y traducir el sitio habría sido cazar strings.
 *
 * Ahora cada sección tiene su archivo y cada texto su clave. Un componente
 * recibe datos y decide cómo se ven; no sabe qué dicen.
 *
 * CÓMO SE TRADUCE
 * ---------------
 * `Traducido<T>` guarda las dos lenguas JUNTAS, no en archivos paralelos. Es a
 * propósito: con archivos espejo, añadir un campo en español y olvidarlo en
 * inglés compila igual y el hueco aparece en producción. Aquí no compila.
 */

export const IDIOMAS = ["es", "en"] as const;
export type Idioma = (typeof IDIOMAS)[number];

export const IDIOMA_POR_DEFECTO: Idioma = "es";

/** Un valor por idioma. Faltar uno es un error de tipos, no una sorpresa. */
export type Traducido<T> = Record<Idioma, T>;

/** Atajo para el caso más común: una cadena en las dos lenguas. */
export type Texto = Traducido<string>;

/** Lee el idioma pedido de cualquier estructura traducida. */
export function en<T>(valor: Traducido<T>, idioma: Idioma): T {
  return valor[idioma];
}

/* ── Piezas que se repiten entre secciones ─────────────────────────────── */

export type Enlace = {
  texto: Texto;
  href: Traducido<string>;
  /** Abre en otra pestaña. Solo para dominios que no son nuestros. */
  externo?: boolean;
};

export type Encabezado = {
  /** El antetítulo en mono mayúscula. Corto: dos o tres palabras. */
  eyebrow?: Texto;
  titulo: Texto;
  /**
   * La frase del titular que va en naranja. Tiene que aparecer LITERAL dentro
   * de `titulo`, o no se resalta nada: el componente parte la cadena por aquí.
   */
  acento?: Texto;
  entradilla?: Texto;
};
