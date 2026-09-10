import type { Encabezado, Texto } from "@/content/types";

export type Paso = {
  numero: string;
  titulo: Texto;
  cuerpo: Texto;
  /** Tres o cuatro palabras que resumen el paso. No son adorno: dicen qué
   *  entregable sale de ahí, que es lo que el párrafo no alcanza a decir sin
   *  alargarse. */
  chips: { es: readonly string[]; en: readonly string[] };
};

export type Proceso = Encabezado & {
  /** El rótulo que antecede al número: «Paso 03». Va traducido porque en
   *  inglés no es «Paso» y el numeral solo no dice qué es. */
  rotulo: Texto;
  pasos: readonly Paso[];
};

export const PROCESO: Proceso = {
  eyebrow: { es: "Cómo trabajo", en: "How I work" },
  titulo: {
    es: "Cómo hago tu página web: un proceso que da tranquilidad.",
    en: "How I build your site: a process that puts you at ease.",
  },
  acento: {
    es: "un proceso que da tranquilidad.",
    en: "a process that puts you at ease.",
  },
  rotulo: { es: "Paso", en: "Step" },
  pasos: [
    {
      numero: "01",
      titulo: { es: "Entiendo tu proyecto", en: "I understand your project" },
      cuerpo: {
        es: "Antes de diseñar o programar, escucho. Defino contigo qué necesitas y para qué, y te digo con franqueza si lo que pides es lo que te conviene.",
        en: "Before designing or coding, I listen. We define together what you need and why, and I tell you straight if what you're asking for is what suits you.",
      },
      chips: {
        es: ["Llamada de 20 min", "Alcance por escrito", "Rango de precio"],
        en: ["20-min call", "Scope in writing", "Price range"],
      },
    },
    {
      numero: "02",
      titulo: { es: "Diseño la interfaz", en: "I design the interface" },
      cuerpo: {
        es: "Pantallas y experiencia que se ven de marca grande —y pensadas desde el primer día en cómo se van a construir, para que nada del diseño se caiga al programarlo.",
        en: "Screens and experience that look like a big brand —and thought through from day one for how they'll be built, so nothing in the design falls apart in code.",
      },
      chips: {
        es: ["Pantallas reales", "Revisión contigo", "Sin plantillas"],
        en: ["Real screens", "Review with you", "No templates"],
      },
    },
    {
      numero: "03",
      titulo: { es: "Construyo a la medida", en: "I build it to fit" },
      cuerpo: {
        es: "Programo tu web o tu software con código sólido, rápido y hecho para durar. Sin plantillas compradas ni constructores que después no se pueden tocar.",
        en: "I code your site or software solid, fast and built to last. No bought templates, no builders you can't touch afterwards.",
      },
      chips: {
        es: ["Código propio", "Rápido de verdad", "Listo para crecer"],
        en: ["My own code", "Genuinely fast", "Ready to grow"],
      },
    },
    {
      numero: "04",
      titulo: { es: "Lanzo y acompaño", en: "I launch and stay" },
      cuerpo: {
        es: "Publico, dejo todo documentado y te siento a manejarlo hasta que lo hagas sin preguntarme. Después sigo contigo con soporte y mejoras.",
        en: "I publish, document everything and sit you down to run it until you can do it without asking me. Then I stay with support and improvements.",
      },
      chips: {
        es: ["Dominio y correo", "Te enseño a usarlo", "Soporte después"],
        en: ["Domain and email", "I show you how", "Support after"],
      },
    },
  ],
};
