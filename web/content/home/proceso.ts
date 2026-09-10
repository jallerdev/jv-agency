import type { Encabezado, Texto } from "@/content/types";

export type Paso = {
  numero: string;
  titulo: Texto;
  cuerpo: Texto;
};

export type Proceso = Encabezado & { pasos: readonly Paso[] };

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
  pasos: [
    {
      numero: "01",
      titulo: { es: "Entiendo tu proyecto", en: "I understand your project" },
      cuerpo: {
        es: "Antes de diseñar o programar, escucho. Defino contigo qué necesitas y para qué, y te digo con franqueza si lo que pides es lo que te conviene.",
        en: "Before designing or coding, I listen. We define together what you need and why, and I tell you straight if what you're asking for is what suits you.",
      },
    },
    {
      numero: "02",
      titulo: { es: "Diseño la interfaz", en: "I design the interface" },
      cuerpo: {
        es: "Pantallas y experiencia que se ven de marca grande —y pensadas desde el primer día en cómo se van a construir, para que nada del diseño se caiga al programarlo.",
        en: "Screens and experience that look like a big brand —and thought through from day one for how they'll be built, so nothing in the design falls apart in code.",
      },
    },
    {
      numero: "03",
      titulo: { es: "Construyo a la medida", en: "I build it to fit" },
      cuerpo: {
        es: "Programo tu web o tu software con código sólido, rápido y hecho para durar. Sin plantillas compradas ni constructores que después no se pueden tocar.",
        en: "I code your site or software solid, fast and built to last. No bought templates, no builders you can't touch afterwards.",
      },
    },
    {
      numero: "04",
      titulo: { es: "Lanzo y acompaño", en: "I launch and stay" },
      cuerpo: {
        es: "Publico, dejo todo documentado y te siento a manejarlo hasta que lo hagas sin preguntarme. Después sigo contigo con soporte y mejoras.",
        en: "I publish, document everything and sit you down to run it until you can do it without asking me. Then I stay with support and improvements.",
      },
    },
  ],
};
