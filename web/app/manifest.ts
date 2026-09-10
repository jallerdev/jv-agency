import type { MetadataRoute } from "next";

import { SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Diseño y desarrollo web`,
    short_name: SITE_NAME,
    description:
      "Estudio de diseño y código de Luis Jaller para PYMEs de LATAM. Webs y software a la medida que se ven de marca grande y funcionan de verdad.",
    start_url: "/",
    display: "standalone",
    /* Los dos venían del design system de HalcónOS y sobrevivieron al cambio
       de marca: `#7C6CF5` es el VIOLETA y `#09090B` su casi negro, así que el
       sitio se anunciaba en un color que ya no usa en ninguna parte.
       `theme_color` es lo que tiñe la barra del navegador en Android, y va al
       casi negro del sitio y no al naranja: la cabecera es oscura, y con el
       acento ahí la barra del sistema quedaría naranja encima de una página
       negra. El naranja es acento, no fondo — la regla de siempre. */
    background_color: "#080808",
    theme_color: "#080808",
    lang: "es",
    icons: [
      { src: "/icon.png", sizes: "256x256", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      /* `maskable` es el que Android recorta a la forma del lanzador. Sin una
         entrada así, el sistema mete el icono dentro de un cuadro blanco y el
         resultado es una pastilla blanca con el nuestro pequeño en medio. El
         de iOS sirve porque va a sangre y sin esquina redonda propia. */
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png", purpose: "maskable" },
    ],
  };
}
