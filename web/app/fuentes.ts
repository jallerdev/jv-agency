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
 *
 * ─────────────────────────────────────────────────────────────────────────
 * DE 114 kB A 51 kB, Y SIN QUITAR NI UN GLIFO (fase 7)
 * ─────────────────────────────────────────────────────────────────────────
 * Un teléfono descargaba SEIS archivos de fuente en cada página —114 kB, casi
 * tanto como los 171 kB de JavaScript de un sitio que es texto sobre negro—.
 * Dos de esos seis sobraban por duplicados y tres por inútiles. Medido, no
 * supuesto:
 *
 * 1 · JETBRAINS ESTABA DECLARADA DOS VECES, Y ERA EL MISMO ARCHIVO. Los dos
 *     `.woff2` de «peso 400» y «peso 500» tienen el MISMO sha256: son la misma
 *     fuente variable con eje `wght` de 400 a 800. El navegador los veía como
 *     dos URL distintas y se bajaba 31 kB dos veces, más 11 kB dos veces del
 *     latin-ext. Declarada una sola vez con su rango real, el navegador se baja
 *     un archivo y lo interpola.
 *
 *     Y de regalo, el peso 600 —281 usos en el sitio— deja de ser NEGRITA
 *     FALSA. Sin el rango declarado, el navegador engordaba el trazo a mano
 *     porque no sabía que la fuente sabía hacerlo sola.
 *
 * 2 · LATIN-EXT NO PINTABA NI UN CARÁCTER. Se recogieron todos los caracteres
 *     que el sitio dibuja en cada familia, recorriendo las 59 rutas y
 *     resolviendo `text-transform` —las versalitas cambian el glifo aunque no
 *     cambien el HTML—: 110 en mono, 112 en sans. Ninguno de los dos conjuntos
 *     tiene un solo carácter que falte en `latin` y esté en `latin-ext`. Son
 *     32 kB que se bajaban en cada página para no dibujar nada.
 *
 *     Los tres caracteres que se salen de `latin` —«→», «≈» y un emoji— NO
 *     están tampoco en `latin-ext`: ya se pintaban con la fuente del sistema y
 *     se siguen pintando igual. Quitar esos archivos no cambia un píxel.
 *
 * POR QUÉ NO SE RECORTA MÁS. Solo se usan 110 de los 229 glifos del subconjunto
 * latino, y recortarlo a medida bajaría otros ~20 kB. No se hace: el día que
 * alguien escriba una palabra con un carácter que no esté en la lista, sale un
 * cuadrito, y el ahorro no paga esa trampa. `latin` es el corte seguro.
 */
export const figtree = localFont({
  display: "swap",
  variable: "--font-figtree",
  src: [
    { path: "./fonts/figtree-normal-300_900-latin.woff2", weight: "300 900", style: "normal" },
  ],
});

export const jetbrains = localFont({
  display: "swap",
  variable: "--font-jetbrains",
  src: [
    /* Un solo archivo y el rango COMPLETO del eje, que es 400-800 y no «400» ni
       «500»: son los dos extremos que el navegador puede interpolar. */
    { path: "./fonts/jetbrains-normal-400-latin.woff2", weight: "400 800", style: "normal" },
  ],
});
