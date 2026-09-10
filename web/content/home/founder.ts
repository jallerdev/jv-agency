import type { Encabezado, Enlace, Texto } from "@/content/types";

export type Cifra = {
  valor: number;
  /** El «+» de «3+». Es parte de la cifra y va en naranja. */
  sufijo?: string;
  /** El «<» de un tope. Va antes y no cuenta: «menos de» no es una suma. */
  prefijo?: string;
  /** Un tope no crece, así que no se anima. */
  cuenta?: boolean;
  etiqueta: Texto;
};

export type Founder = Encabezado & {
  nombre: string;
  rol: Texto;
  cuerpo: Texto;
  /** Va en negrita dentro de `cuerpo`. Tiene que aparecer literal. */
  negrita: Texto;
  cifras: readonly Cifra[];
  /** `icono` elige el glifo: sin él, los tres enlaces se veían iguales y el
   *  único adorno era una flechita que además se caía a la línea de abajo. */
  enlaces: readonly (Enlace & { icono: "yo" | "linkedin" | "github" })[];
};

export const FOUNDER: Founder = {
  eyebrow: { es: "Quién está detrás", en: "Who's behind this" },
  titulo: {
    es: "Quién hace tu página web: Luis Jaller",
    en: "Who builds your site: Luis Jaller",
  },
  acento: { es: "Luis Jaller", en: "Luis Jaller" },
  nombre: "Luis Jaller",
  rol: {
    es: "Diseñador web y desarrollador",
    en: "Web designer and developer",
  },
  cuerpo: {
    es: "Sin ejecutivos de cuenta ni cadenas de correos. Hablas conmigo, y el que diseña y escribe el código soy yo. Eso tiene un límite —no tomo veinte proyectos a la vez— y una ventaja: nada se pierde entre lo que pides y lo que se construye.",
    en: "No account managers, no email chains. You talk to me, and the person who designs and writes the code is me. That has a limit —I don't take twenty projects at once— and an advantage: nothing gets lost between what you ask for and what gets built.",
  },
  negrita: { es: "Hablas conmigo", en: "You talk to me" },
  cifras: [
    {
      valor: 3,
      sufijo: "+",
      cuenta: true,
      etiqueta: { es: "años construyendo producto", en: "years building product" },
    },
    {
      valor: 11,
      sufijo: "+",
      cuenta: true,
      etiqueta: { es: "proyectos en producción", en: "projects in production" },
    },
    {
      /* Confirmado por Luis el 9 de septiembre de 2026. Sin contador: no es una
         cantidad que crezca, es un tope. */
      valor: 24,
      prefijo: "<",
      etiqueta: { es: "horas de respuesta", en: "hours to reply" },
    },
  ],
  enlaces: [
    {
      texto: { es: "Más sobre mí", en: "More about me" },
      href: { es: "/sobre-nosotros", en: "/en/about" },
      icono: "yo",
    },
    {
      texto: { es: "LinkedIn", en: "LinkedIn" },
      href: {
        es: "https://www.linkedin.com/in/jallerdev/",
        en: "https://www.linkedin.com/in/jallerdev/",
      },
      externo: true,
      icono: "linkedin",
    },
    {
      texto: { es: "GitHub", en: "GitHub" },
      href: { es: "https://github.com/jallerdev", en: "https://github.com/jallerdev" },
      externo: true,
      icono: "github",
    },
  ],
};
