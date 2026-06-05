import type { MetadataRoute } from "next";

import { SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Diseño y desarrollo web`,
    short_name: SITE_NAME,
    description:
      "Estudio de diseño + código para PYMEs de LATAM. Webs y software a medida que se ven de marca grande y funcionan de verdad.",
    start_url: "/",
    display: "standalone",
    background_color: "#F4EDE4",
    theme_color: "#985C3E",
    lang: "es",
    icons: [
      { src: "/icon.png", sizes: "256x256", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
