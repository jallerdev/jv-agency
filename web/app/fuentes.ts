import localFont from "next/font/local";

/**
 * LAS DOS FAMILIAS DEL SISTEMA
 * ──────────────────────────────────────────────────────────────────────────
 * Figtree para titulares, cuerpo e interfaz; JetBrains Mono para antetítulos,
 * numerales, precios y dominios. El sistema dice literal: nunca una tercera.
 *
 * Instrument Serif salió con el cambio de marca. La especificación pide
 * titulares grotesk y Figtree ya es variable 300-900, así que cubre el papel
 * sin sumar una fuente más al presupuesto de descarga.
 *
 * VIVEN EN SU PROPIO ARCHIVO, y no dentro del layout, porque ahora hay DOS
 * layouts raíz —español e inglés— y `next/font/local` resuelve las rutas
 * `./fonts/...` relativas AL ARCHIVO que lo llama. Declararlas dos veces
 * duplicaría las fuentes en el bundle y, peor, generaría dos juegos de
 * nombres de familia distintos para la misma tipografía.
 */
export const figtree = localFont({
  display: "swap",
  variable: "--font-figtree",
  src: [
    { path: "./fonts/figtree-normal-300_900-latin.woff2", weight: "300 900", style: "normal" },
    { path: "./fonts/figtree-normal-300_900-latin-ext.woff2", weight: "300 900", style: "normal" },
  ],
});

export const jetbrains = localFont({
  display: "swap",
  variable: "--font-jetbrains",
  src: [
    { path: "./fonts/jetbrains-normal-400-latin.woff2", weight: "400", style: "normal" },
    { path: "./fonts/jetbrains-normal-400-latin-ext.woff2", weight: "400", style: "normal" },
    { path: "./fonts/jetbrains-normal-500-latin.woff2", weight: "500", style: "normal" },
    { path: "./fonts/jetbrains-normal-500-latin-ext.woff2", weight: "500", style: "normal" },
  ],
});
