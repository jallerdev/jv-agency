import type { Metadata, Viewport } from "next";

import { Documento } from "@/app/Documento";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * LA RAÍZ EN ESPAÑOL.
 *
 * El español vive en la raíz del dominio y el inglés bajo `/en/`. Ni una URL
 * de las que ya tienen posicionamiento se mueve: un `/es/` simétrico habría
 * sido más limpio de mirar y habría puesto en juego las impresiones que el
 * sitio ya tiene, a cambio de nada.
 */
/**
 * El color de la barra del navegador.
 *
 * No lo pone `app/manifest.ts`: ese `theme_color` solo aplica cuando el sitio
 * está INSTALADO como aplicación. Para una visita normal en Chrome de Android
 * hace falta este `<meta name="theme-color">`, que no existía, así que la
 * barra salía en el gris por defecto del navegador y cortaba en seco contra
 * la cabecera oscura.
 */
export const viewport: Viewport = {
  themeColor: "#080808",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // POR QUÉ ESTE TÍTULO YA NO DICE "DISEÑO DE PÁGINAS WEB EN COLOMBIA"
  // --------------------------------------------------------------------
  // Lo decía, y el openGraph de más abajo lo decía CARÁCTER POR CARÁCTER igual
  // que el title de /servicios/diseno-de-paginas-web. Dos URLs peleando la
  // misma búsqueda: Google escoge una, y la portada —que tiene toda la
  // autoridad interna— dejaba a la página de servicio sin salir nunca, aunque
  // sea la que tiene el precio, el plazo, lo que incluye y lo que no.
  //
  // Se resolvió cediendo el término exacto a la página de servicio, que es la
  // que responde la intención de contratar. Desde entonces cada enlace interno
  // que dice "diseño de páginas web" —el pie, que está en todo el sitio; las
  // tres ciudades; los sectores; el blog; la tarjeta de la portada— apunta a
  // ella y no acá.
  //
  // La portada se queda con lo que de verdad es: el catálogo y la marca. Sigue
  // llevando "páginas web" adelante, que es la palabra del mercado colombiano,
  // pero ya no compite por la frase completa. 66 caracteres.
  title: "Páginas web, tiendas virtuales y software en Colombia | JV Agencia",
  description:
    "Diseño páginas web, tiendas online y chatbots de WhatsApp para PYMEs de Colombia y LATAM. Yo diseño y yo programo, sin presupuesto corporativo.",
  // `keywords` se quitó a propósito: Google dejó de usarla en 2009 y lo único
  // que logra es mostrarle a la competencia por qué términos peleo.
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  formatDetection: { telephone: true, email: true, address: true },
  alternates: {
    canonical: "/",
    /* `hreflang` recíproco: cada idioma declara al otro y `x-default` apunta
       al español, que es el idioma del mercado principal. Sin la declaración
       de vuelta, Google ignora el par entero. */
    languages: {
      "es-CO": "/",
      en: "/en",
      "x-default": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "es_LA",
    url: SITE_URL,
    title: "Páginas web, tiendas virtuales y software en Colombia | JV Agencia",
    description:
      "Páginas web, tiendas virtuales y chatbots de WhatsApp para PYMEs. Las diseño y las programo yo mismo.",
    siteName: SITE_NAME,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "JV Agencia — diseño y código en las mismas manos" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Páginas web, tiendas virtuales y software en Colombia | JV Agencia",
    description:
      "Páginas web, tiendas virtuales y chatbots de WhatsApp para PYMEs de Colombia y LATAM.",
    images: ["/og.png"],
  },
};

export default function LayoutEs({ children }: { children: React.ReactNode }) {
  return <Documento lang="es">{children}</Documento>;
}
