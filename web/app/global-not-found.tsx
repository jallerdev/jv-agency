import type { Metadata } from "next";
import { headers } from "next/headers";

import "./globals.css";
import { figtree, jetbrains } from "./fuentes";
import { NoEncontrada } from "@/components/paginas/NoEncontrada";
import { CABECERA_RUTA, idiomaDeRuta } from "@/lib/rutas";

/**
 * EL 404 DE LAS URL QUE NO EMPAREJAN CON NADA
 * ──────────────────────────────────────────────────────────────────────────
 * POR QUÉ EXISTE ESTE ARCHIVO Y NO BASTA CON `not-found.tsx`
 * ----------------------------------------------------------
 * El sitio tiene DOS layouts raíz, `app/(es)` y `app/(en)`, porque el `lang`
 * del <html> tiene que decir la verdad en cada idioma. Con dos raíces, Next no
 * puede saber cuál usar para una URL que no empareja con ninguna ruta —no hay
 * layout que componer— y se rinde al 404 gris de fábrica: «404: This page could
 * not be found».
 *
 * Y eso era lo que pasaba de verdad, comprobado con curl:
 *
 *   /blog/no-existe ....... 404 con NUESTRA página   (cae dentro de `(es)`)
 *   /no-existe ............ 404 gris de Next
 *   /servicios/no-existe .. 404 gris de Next
 *   /en/no-existe ......... 404 gris de Next
 *
 * O sea que la página del 404 estaba escrita y prácticamente nadie la veía: se
 * llega a un 404 por un enlace viejo o una dirección mal copiada, y esas casi
 * nunca caen dentro de un segmento que empareje.
 *
 * `global-not-found` es el convenio que Next documenta para exactamente este
 * caso —«tu app tiene varios layouts raíz»—. Se salta el renderizado normal y
 * devuelve esta página directamente, así que TIENE que traer su propio
 * documento completo: <html>, <body>, los estilos y las fuentes. Eso es lo que
 * explica el doble <html> del intento anterior: se puede devolver el armazón o
 * envolverlo, no las dos cosas.
 *
 * EL IDIOMA SALE DE LA CABECERA, y es el único sitio del sitio donde hace falta
 * ese rodeo: el convenio no pasa props. `proxy.ts` escribe la ruta pedida en
 * `x-jv-ruta` y aquí se lee. Sin ella, una dirección rota bajo `/en/` contestaría
 * en castellano, que es el fallo que se venía a arreglar.
 *
 * LOS `not-found.tsx` DE CADA GRUPO SE QUEDAN. No son redundantes: atienden un
 * caso distinto —una ruta que SÍ empareja y llama a `notFound()`, como un slug
 * de blog que no existe— y ahí sí hay layout, así que la página sale con su
 * idioma correcto sin pasar por aquí.
 */

export const metadata: Metadata = {
  title: "Esta página no existe | JV Agencia",
  description:
    "La dirección no corresponde a ninguna página. Los precios, los servicios y la agenda siguen donde estaban.",
  robots: { index: false, follow: true },
};

export default async function GlobalNotFound() {
  const ruta = (await headers()).get(CABECERA_RUTA) ?? "/";
  const idioma = idiomaDeRuta(ruta);

  return (
    <html
      lang={idioma}
      className={`${figtree.variable} ${jetbrains.variable}`}
      /* Por lo mismo que en `app/Documento.tsx`: el script de cookies escribe
         `data-cookies` en este elemento antes de hidratar. */
      suppressHydrationWarning
    >
      <body className="bg-canvas font-body text-ink-soft antialiased">
        <NoEncontrada idioma={idioma} />
      </body>
    </html>
  );
}
