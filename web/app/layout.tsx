import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  metadataBase: new URL("https://jvagency.com"),
  title: "J&V Agency — Estudio de diseño y desarrollo web para PYMEs en LATAM",
  description:
    "Diseño + código en el mismo equipo. Webs y software a medida que se ven de marca grande y funcionan de verdad. Sin presupuesto corporativo.",
  keywords: [
    "desarrollo web",
    "software a medida",
    "diseño web",
    "diseño UI",
    "estudio de desarrollo LATAM",
    "web para PYMEs",
  ],
  authors: [{ name: "J&V Agency" }],
  openGraph: {
    type: "website",
    locale: "es_LA",
    title: "J&V Agency — Hacemos que te tomen en serio",
    description:
      "Estudio de diseño + código para PYMEs de LATAM. Diseño que enamora, código que aguanta.",
    siteName: "J&V Agency",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "J&V Agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "J&V Agency — Hacemos que te tomen en serio",
    description:
      "Diseño + código en el mismo equipo. Webs y software a medida para PYMEs de LATAM.",
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
        {children}
      </body>
    </html>
  );
}
