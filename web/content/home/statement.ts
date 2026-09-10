import type { Encabezado, Enlace } from "@/content/types";

export type Statement = Encabezado & { enlace: Enlace };

/**
 * El bloque que explica el argumento del estudio en dos frases.
 *
 * Va justo después del hero a propósito: el hero promete acabado, y esto dice
 * de dónde sale. Sin él, la promesa se queda en adjetivo.
 */
export const STATEMENT: Statement = {
  titulo: {
    es: "Diseño y código en las mismas manos.",
    en: "Design and code in the same hands.",
  },
  acento: {
    es: "las mismas manos.",
    en: "the same hands.",
  },
  entradilla: {
    es: "No coordinas a un diseñador con un programador ni pagas para que se entiendan. Lo que se dibuja es lo que se construye, porque lo dibuja y lo construye la misma persona —y eso se nota en el resultado y en el plazo.",
    en: "You don't coordinate a designer with a developer, or pay for them to understand each other. What gets drawn is what gets built, because the same person does both —and it shows in the result and in the timeline.",
  },
  enlace: {
    texto: { es: "Hablemos de tu proyecto", en: "Let's talk about your project" },
    href: { es: "/agendar", en: "/en/book-a-call" },
  },
};
