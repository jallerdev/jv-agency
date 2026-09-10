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
    background_color: "#09090B",
    theme_color: "#7C6CF5",
    lang: "es",
    icons: [
      { src: "/icon.png", sizes: "256x256", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
