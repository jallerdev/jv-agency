import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/**
 * Lo único que se bloquea por robots.txt son los endpoints de la API: no tienen
 * nada que indexar y no hay ninguna URL suya que haya que sacar del índice.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  POR QUÉ LOS DOCUMENTOS PRIVADOS **NO** VAN AQUÍ
 * ─────────────────────────────────────────────────────────────────────────
 * Estaban, y era contraproducente. `Disallow` no saca una página del índice:
 * impide rastrearla. Y para que Google obedezca un `noindex` tiene que poder
 * leerlo — si le cierras el paso, nunca lo ve.
 *
 * El resultado de bloquear una URL que ya está indexada es exactamente lo que
 * se quería evitar: Google la conoce por los enlaces, no puede entrar a
 * comprobar nada, y la deja listada como dirección suelta sin contenido.
 * `/cotizador` estuvo público y en el sitemap durante meses, así que es muy
 * probable que esté en esa situación.
 *
 * La configuración correcta es la contraria: dejar rastrear y responder
 * `noindex`, que es lo que ya hacen. Hoy cada ruta privada devuelve 307 con
 * `X-Robots-Tag: noindex, nofollow` hacia /acceso, que a su vez es 200 con
 * `noindex` en su metadata. Google entra, lee la instrucción y la retira.
 *
 * No se expone nada por esto: la puerta sigue siendo el login de /acceso. Lo
 * único que Google puede ver es una redirección a una página de acceso que le
 * pide no indexarla.
 *
 * Para las URLs que YA estén indexadas, esto las va retirando solo, pero es
 * lento. La vía rápida es la herramienta de Retiradas de Search Console —que
 * necesita el dominio verificado allí, y sigue pendiente.
 */
const BLOQUEADAS = ["/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: BLOQUEADAS },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
