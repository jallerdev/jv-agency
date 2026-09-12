import { NextResponse, type NextRequest } from "next/server";

import { CABECERA_RUTA } from "@/lib/rutas";
import {
  buscarDoc,
  nombreCookie,
  tokenValido,
  RUTA_ACCESO,
} from "@/lib/private-docs";

// Dominio canónico CON www: el apex (jvagencia.com) redirige 308 → www.jvagencia.com.
// localhost, IPs y dominios de preview se dejan intactos (no coinciden con el apex).
// Nota: lo ideal es resolver esto también a nivel de Cloudflare/hosting (más rápido);
// este proxy es la red de seguridad que viaja con la app.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest).*)",
  ],
};

/**
 * Puerta de los documentos privados.
 *
 * El catálogo y la firma viven en `lib/private-docs.ts`, compartidos con la
 * pantalla de acceso y con la ruta que valida la contraseña: si estuvieran
 * duplicados aquí, agregar un documento obligaría a acordarse de dos sitios.
 *
 * Ya no hay Basic Auth. En su lugar, una cookie firmada por documento; sin
 * cookie válida se manda a `/acceso`, que es una página del sitio y no la
 * ventana gris del navegador.
 */
/**
 * Deja pasar la petición, pero contándole a la app en qué ruta iba.
 *
 * `app/global-not-found.tsx` —el 404 de las URL que no emparejan con ninguna
 * ruta— no recibe props: el convenio de Next es explícito en que no acepta
 * ninguna. Y sin saber la ruta no puede saber el idioma, así que una dirección
 * rota bajo `/en/` contestaría en castellano. Esta cabecera es el único hilo
 * que queda entre la URL pedida y esa página.
 *
 * Va en la petición y no en la respuesta: `NextResponse.next({ request })` es
 * la forma documentada de que un componente de servidor pueda leerla con
 * `headers()`.
 */
function seguir(req: NextRequest) {
  const headers = new Headers(req.headers);
  headers.set(CABECERA_RUTA, req.nextUrl.pathname);
  return NextResponse.next({ request: { headers } });
}

export async function proxy(req: NextRequest) {
  const hostname = (req.headers.get("host") ?? "").split(":")[0].toLowerCase();

  // Apex → www.
  if (hostname === "jvagencia.com") {
    const url = req.nextUrl.clone();
    url.protocol = "https:";
    url.host = "www.jvagencia.com";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  const { pathname } = req.nextUrl;

  // La pantalla de acceso y la ruta que comprueba la clave NO pueden quedar
  // detrás de la puerta: sería un bucle de redirecciones.
  if (pathname === RUTA_ACCESO || pathname.startsWith("/api/acceso")) {
    return seguir(req);
  }

  const doc = buscarDoc(pathname);
  if (!doc) return seguir(req);

  const clave = process.env[doc.passEnv];
  const abierto =
    // Sin contraseña configurada nadie entra: mejor inaccesible que abierto.
    !!clave && (await tokenValido(req.cookies.get(nombreCookie(doc.id))?.value, doc.id, clave));

  if (!abierto) {
    const url = req.nextUrl.clone();
    url.pathname = RUTA_ACCESO;
    url.search = "";
    url.searchParams.set("doc", doc.id);
    url.searchParams.set("next", pathname);
    const res = NextResponse.redirect(url);
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }

  // Con acceso: se sirve el archivo estático (o la ruta de la app, si no hay
  // archivo), siempre con noindex y sin caché.
  const res = doc.file
    ? (() => {
        const url = req.nextUrl.clone();
        url.pathname = doc.file as string;
        return NextResponse.rewrite(url);
      })()
    : seguir(req);

  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("Cache-Control", "no-store");
  return res;
}
