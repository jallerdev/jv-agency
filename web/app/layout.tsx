import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-mono",
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
