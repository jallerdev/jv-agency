import { NextResponse, type NextRequest } from "next/server";

import { CABECERA_RUTA } from "@/lib/rutas";
import { excedido, ipDe } from "@/lib/limite";
import {
  buscarDoc,
  buscarDocPorSlug,
  emitirToken,
  esAnexo,
  igualSeguro,
  nombreCookie,
  palabrasDe,
  tokenValido,
  DURACION_MS,
  PARAM_LLAVE,
  RUTA_ACCESO,
  RUTA_PROPUESTA,
  RUTA_TARJETA,
  type Portada,
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

  if (pathname.startsWith(RUTA_PROPUESTA)) return entrarConPalabras(req, pathname);

  const doc = buscarDoc(pathname);
  if (!doc) return seguir(req);

  const clave = process.env[doc.passEnv];
  // Enlace con llave (ver PARAM_LLAVE): entra y deja la misma llave como cookie.
  // Se sirve directo, sin redirigir: WhatsApp arma la vista previa con esta
  // URL, y una redirección le mostraría la pantalla de acceso.
  const llave = req.nextUrl.searchParams.get(PARAM_LLAVE) ?? undefined;
  const conLlave = !!clave && (await tokenValido(llave, doc.id, clave));
  const abierto =
    conLlave ||
    // Sin contraseña configurada nadie entra: mejor inaccesible que abierto.
    (!!clave && (await tokenValido(req.cookies.get(nombreCookie(doc.id))?.value, doc.id, clave)));

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
  const res = doc.file && !esAnexo(doc, pathname)
    ? (() => {
        const url = req.nextUrl.clone();
        url.pathname = doc.file as string;
        return NextResponse.rewrite(url);
      })()
    : seguir(req);

  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("Cache-Control", "no-store");
  if (conLlave && llave) {
    // La cookie dura lo que le queda a la llave: así la demo y las visitas
    // siguientes abren sin el parámetro, y nada dura más que el enlace.
    dejarCookie(res, doc.id, llave, Number(llave.split(".")[0]));
  }
  return res;
}

/** Cookie de acceso a un documento, viva hasta `vence` (ms). */
function dejarCookie(res: NextResponse, docId: string, token: string, vence: number) {
  res.cookies.set(nombreCookie(docId), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor((vence - Date.now()) / 1000),
  });
}

/* Veinte intentos cada cuarto de hora por IP. La clienta toca su enlace unas
   pocas veces; quien pruebe palabras al azar necesitaría siglos para dar con
   tres de 256 (16,7 millones de combinaciones). */
const CUPO_PALABRAS = { intentos: 20, ventanaMs: 15 * 60 * 1000 };

/**
 * Enlace con palabras (ver RUTA_PROPUESTA en lib/private-docs.ts).
 *
 *   /propuesta/<slug>                    → pantalla de acceso
 *   /propuesta/<slug>/<palabras>         → la propuesta
 *   /propuesta/<slug>/<palabras>/<anexo> → el anexo (p. ej. la tienda)
 *
 * Un slug o anexo que no existe da 404, igual que cualquier ruta inventada.
 */
async function entrarConPalabras(req: NextRequest, pathname: string) {
  const [slug = "", palabras = "", corto, ...sobra] = pathname
    .slice(RUTA_PROPUESTA.length)
    .toLowerCase()
    .split("/");
  const doc = buscarDocPorSlug(slug);
  const anexo = corto ? doc?.anexos?.find((a) => a.corto === corto) : undefined;
  if (!doc?.enlace || sobra.length || (corto && !anexo)) return seguir(req);
  const destino = anexo?.archivo ?? doc.paths[0];

  if (excedido(`propuesta:${ipDe(req)}`, CUPO_PALABRAS) !== null) {
    return new NextResponse("Demasiados intentos. Espere unos minutos.", {
      status: 429,
      headers: { "Retry-After": "900", "X-Robots-Tag": "noindex, nofollow" },
    });
  }

  const clave = process.env[doc.passEnv];
  const vale = !!clave && !!palabras && igualSeguro(palabras, await palabrasDe(doc.id, clave));
  if (!vale || !clave) {
    const url = req.nextUrl.clone();
    url.pathname = RUTA_ACCESO;
    url.search = "";
    url.searchParams.set("doc", doc.id);
    url.searchParams.set("next", destino);
    const res = NextResponse.redirect(url);
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }

  const portada = anexo ?? doc.enlace;
  const imagen = `${req.nextUrl.origin}${RUTA_TARJETA}/${doc.enlace.slug}${anexo ? `/${anexo.corto}` : ""}`;
  const res = new NextResponse(paginaDeSalto(portada, destino, imagen), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "no-store",
      "Referrer-Policy": "no-referrer",
    },
  });
  // La cookie de siempre: desde aquí la página y sus anexos abren solos.
  dejarCookie(res, doc.id, await emitirToken(doc.id, clave), Date.now() + DURACION_MS);
  return res;
}

const escapar = (t: string) =>
  t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * La página que ve WhatsApp (por su tarjeta) y que el navegador deja atrás al
 * instante. El salto va doble: `meta refresh` para lo que no corre JavaScript y
 * `location.replace` para que el botón de atrás no vuelva aquí.
 */
function paginaDeSalto(p: Portada, destino: string, imagen: string) {
  const t = escapar(p.titulo);
  const d = escapar(p.descripcion);
  return `<!doctype html>
<html lang="es"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${t} · JV Agencia</title>
<meta name="description" content="${d}">
<meta name="robots" content="noindex, nofollow">
<meta property="og:type" content="website">
<meta property="og:site_name" content="JV Agencia">
<meta property="og:locale" content="es_CO">
<meta property="og:title" content="${t}">
<meta property="og:description" content="${d}">
<meta property="og:image" content="${escapar(imagen)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta http-equiv="refresh" content="0;url=${escapar(destino)}">
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#faf8f5;color:#6e6862;font:16px system-ui,sans-serif}a{color:inherit}</style>
</head><body>
<a href="${escapar(destino)}">Abrir</a>
<script>location.replace(${JSON.stringify(destino)})</script>
</body></html>`;
}
