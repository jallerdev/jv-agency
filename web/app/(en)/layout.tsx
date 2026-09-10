import type { Metadata } from "next";

import { Documento } from "@/app/Documento";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * LA RAÍZ EN INGLÉS.
 *
 * Existe como layout raíz aparte —no como un layout anidado— por una sola
 * razón: el atributo `lang` del <html>. Un layout único no puede saber en qué
 * ruta está sin leer cabeceras, y leer cabeceras vuelve dinámico TODO el
 * sitio, que es un precio altísimo por un atributo. Con dos raíces, cada
 * idioma declara el suyo y las páginas siguen siendo estáticas.
 *
 * El cuerpo del documento —fuentes, manchas, analítica, aviso de cookies— es
 * el mismo de `app/Documento.tsx`, para que no puedan separarse con el tiempo.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Web design, online stores and custom software | JV Agencia",
  description:
    "Websites, online stores and WhatsApp chatbots for small businesses in Colombia and LATAM. One person designs and writes the code.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  formatDetection: { telephone: true, email: true, address: true },
  alternates: {
    canonical: "/en",
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
    locale: "en_US",
    url: `${SITE_URL}/en`,
    title: "Web design, online stores and custom software | JV Agencia",
    description:
      "Websites, online stores and WhatsApp chatbots for small businesses. One person designs and writes the code.",
    siteName: SITE_NAME,
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: "JV Agencia — design and code in the same hands" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web design, online stores and custom software | JV Agencia",
    description:
      "Websites, online stores and WhatsApp chatbots for small businesses in Colombia and LATAM.",
    images: ["/og.png"],
  },
};

export default function LayoutEn({ children }: { children: React.ReactNode }) {
  return <Documento lang="en">{children}</Documento>;
}
