import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/**
 * Rutas que no deben posicionar.
 *
 * Todas devuelven 401 detrás de Basic Auth, así que Google no puede leerlas —y
 * por eso mismo TAMPOCO puede ver el `noindex` que envían: para leer esa
 * cabecera tendría que poder entrar. El bloqueo real es este.
 *
 * Sin esto, una URL enlazada desde fuera puede terminar listada como dirección
 * suelta, sin contenido pero con el nombre a la vista. Con el cotizador eso
 * significaría anunciar que existe una lista de precios privada.
 */
const PRIVADAS = [
  "/api/",
  "/cotizador",
  "/kit-vendedores",
  "/capacitacion",
  "/playbook",
  "/cotizacion-",
  "/propuesta-",
  "/guia-funeraria",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: PRIVADAS },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
