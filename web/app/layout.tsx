import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/site";
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
  // El título arranca con lo que la gente escribe en Google —"diseño de páginas
  // web"— y no con el nombre de la agencia, que solo busca quien ya nos conoce.
  // 57 caracteres: cabe entero en el resultado sin que Google lo corte.
  title: "Diseño de páginas web en Colombia para PYMEs | JV Agencia",
  description:
    "Diseñamos páginas web, tiendas online y chatbots de WhatsApp para PYMEs de Colombia y LATAM. Diseño y código en el mismo equipo, sin presupuesto corporativo.",
  // `keywords` se quitó a propósito: Google dejó de usarla en 2009 y lo único
  // que logra es mostrarle a la competencia por qué términos peleamos.
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
    title: "Diseño de páginas web en Colombia | JV Agencia",
    description:
      "Páginas web, tiendas online y chatbots de WhatsApp para PYMEs. Diseño y código en el mismo equipo.",
    siteName: SITE_NAME,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "JV Agencia — diseño + código" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diseño de páginas web en Colombia | JV Agencia",
    description:
      "Páginas web, tiendas online y chatbots de WhatsApp para PYMEs de Colombia y LATAM.",
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
      </body>
    </html>
  );
}
