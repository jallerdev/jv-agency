import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

import { SITE_NAME, SITE_URL, GA_MEASUREMENT_ID } from "@/lib/site";
import { StructuredData } from "@/components/StructuredData";
import { CuentameProvider } from "@/components/Cuentame";
import { Blobs } from "@/components/Blobs";

/* ── Las tres familias del sistema ────────────────────────────────────────
   Instrument Serif para TODO titular y las cifras grandes; Figtree para
   cuerpo, interfaz y botones; JetBrains Mono para antetítulos, numerales de
   índice, precios y dominios. El sistema dice literal: nunca una cuarta.

   Instrument Serif sustituye a Larken —la display de palo-seco, con licencia
   comercial que el estudio no compró—; la sustitución está declarada en el
   readme del design system, no es un descuido.

   Se sirven desde app/fonts con `next/font/local`: sin petición a Google, sin
   salto de composición y con precarga. Los subconjuntos latin y latin-ext van
   por separado, así que un visitante que solo lee español no descarga los
   glifos que no usa. */
const figtree = localFont({
  display: "swap",
  variable: "--font-figtree",
  src: [
    { path: "./fonts/figtree-normal-300_900-latin.woff2", weight: "300 900", style: "normal" },
    { path: "./fonts/figtree-normal-300_900-latin-ext.woff2", weight: "300 900", style: "normal" },
  ],
});

const jetbrains = localFont({
  display: "swap",
  variable: "--font-jetbrains",
  src: [
    { path: "./fonts/jetbrains-normal-400-latin.woff2", weight: "400", style: "normal" },
    { path: "./fonts/jetbrains-normal-400-latin-ext.woff2", weight: "400", style: "normal" },
    { path: "./fonts/jetbrains-normal-500-latin.woff2", weight: "500", style: "normal" },
    { path: "./fonts/jetbrains-normal-500-latin-ext.woff2", weight: "500", style: "normal" },
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
    /* Las variables de next/font van en <html>, no en <body>.
       tokens.css define `--font-display: var(--font-instrument)` dentro de
       `:root`, que ES el <html>: si las familias se declaran un nivel mas
       abajo, esa referencia no las ve —una custom property se hereda hacia
       abajo, nunca hacia arriba— y las tres familias caian al system-ui sin
       avisar de nada. */
    <html lang="es" className={`${figtree.variable} ${jetbrains.variable}`}>
      <body className="bg-canvas font-body text-ink-soft antialiased">
        {/* El campo de manchas detrás de TODO el sitio, no solo del hero.
            Una sola instancia fija cubre las quince mil filas de scroll de
            cualquier página; poner una por sección multiplicaría por seis el
            coste sin que se vea más. */}
        <Blobs fijo />
        <StructuredData />
        {/* El diálogo de contacto vive en el layout, no en cada página: hay un
            solo panel montado para todo el sitio y cualquier botón lo abre. */}
        <CuentameProvider>{children}</CuentameProvider>

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
