import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

import { SITE_NAME, SITE_URL, GA_MEASUREMENT_ID } from "@/lib/site";
import { StructuredData } from "@/components/StructuredData";

const fraunces = localFont({
  display: "swap",
  variable: "--font-display",
  src: [
    { path: "./fonts/Fraunces-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Fraunces-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Fraunces-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Fraunces-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Fraunces-300-italic.woff2", weight: "300", style: "italic" },
    { path: "./fonts/Fraunces-400-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/Fraunces-500-italic.woff2", weight: "500", style: "italic" },
    { path: "./fonts/Fraunces-600-italic.woff2", weight: "600", style: "italic" },
  ],
});

const jakarta = localFont({
  display: "swap",
  variable: "--font-body",
  src: [
    { path: "./fonts/PlusJakartaSans-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/PlusJakartaSans-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/PlusJakartaSans-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/PlusJakartaSans-700.woff2", weight: "700", style: "normal" },
  ],
});

const plexMono = localFont({
  display: "swap",
  variable: "--font-mono",
  src: [
    { path: "./fonts/IBMPlexMono-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/IBMPlexMono-500.woff2", weight: "500", style: "normal" },
  ],
});

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
  alternates: { canonical: "/" },
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${fraunces.variable} ${jakarta.variable} ${plexMono.variable} bg-paper bg-grain`}
      >
        <StructuredData />
        {children}

        {/* Google Analytics 4.
            Va con next/script y `afterInteractive`: se carga cuando la página
            ya es usable, para no competir con el contenido por el hilo
            principal ni castigar las métricas de carga que justamente sirve
            para medir.
            Solo en producción: en desarrollo ensuciaría los datos con visitas
            que no son de nadie. */}
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
