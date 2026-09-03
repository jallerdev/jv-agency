import { NextResponse, type NextRequest } from "next/server";

// Dominio canónico CON www: el apex (jvagencia.com) redirige 308 → www.jvagencia.com.
// localhost, IPs y dominios de preview se dejan intactos (no coinciden con el apex).
// Nota: lo ideal es resolver esto también a nivel de Cloudflare/hosting (más rápido);
// este middleware es la red de seguridad que viaja con la app.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest).*)",
  ],
};

// Documentos privados: se sirven como HTML estático desde public/, detrás de
// Basic Auth y con noindex. Las credenciales viven SIEMPRE en variables de
// entorno (configurar en Vercel); si falta la contraseña, el documento queda
// inaccesible en vez de quedar abierto. Nunca escribir contraseñas aquí.
type PrivateDoc = {
  /** Rutas que sirven el documento (limpia y con .html). */
  paths: string[];
  /** Archivo real dentro de public/. */
  file: string;
  /** Env var con la contraseña. Sin ella, 401 siempre. */
  passEnv: string;
  /** Env var con el usuario, y su valor por defecto. */
  userEnv: string;
  defaultUser: string;
  realm: string;
};

const PRIVATE_DOCS: PrivateDoc[] = [
  {
    paths: ["/kit-vendedores", "/kit-vendedores.html"],
    file: "/kit-vendedores.html",
    passEnv: "GUIDE_PASSWORD",
    userEnv: "GUIDE_USER",
    defaultUser: "jvagencia",
    realm: "JV Agencia - Material privado",
  },
  {
    paths: ["/propuesta-monica", "/propuesta-sencilla-monica.html"],
    file: "/propuesta-sencilla-monica.html",
    passEnv: "COTIZACION_MONICA_PASSWORD",
    userEnv: "COTIZACION_MONICA_USER",
    defaultUser: "monica",
    realm: "JV Agencia - Propuesta privada",
  },
  {
    paths: ["/cotizacion-monica", "/cotizacion-aula-monica.html"],
    file: "/cotizacion-aula-monica.html",
    passEnv: "COTIZACION_MONICA_PASSWORD",
    userEnv: "COTIZACION_MONICA_USER",
    defaultUser: "monica",
    realm: "JV Agencia - Cotizacion privada",
  },
  {
    paths: ["/cotizacion-funeraria", "/cotizacion-funeraria-sfa.html"],
    file: "/cotizacion-funeraria-sfa.html",
    passEnv: "COTIZACION_FUNERARIA_PASSWORD",
    userEnv: "COTIZACION_FUNERARIA_USER",
    defaultUser: "funeraria",
    realm: "JV Agencia - Cotizacion privada",
  },
  {
    paths: ["/playbook", "/playbook-vendedores.html"],
    file: "/playbook-vendedores.html",
    passEnv: "GUIDE_PASSWORD",
    userEnv: "GUIDE_USER",
    defaultUser: "jvagencia",
    realm: "JV Agencia - Material privado",
  },
  {
    paths: ["/capacitacion", "/capacitacion-vendedores.html"],
    file: "/capacitacion-vendedores.html",
    passEnv: "GUIDE_PASSWORD",
    userEnv: "GUIDE_USER",
    defaultUser: "jvagencia",
    realm: "JV Agencia - Material privado",
  },
  {
    paths: ["/cotizacion-pixels", "/cotizacion-pixels-maker.html"],
    file: "/cotizacion-pixels-maker.html",
    passEnv: "COTIZACION_PIXELS_PASSWORD",
    userEnv: "COTIZACION_PIXELS_USER",
    defaultUser: "pixels",
    realm: "JV Agencia - Cotizacion privada",
  },
  {
    // Anexo de la cotizacion. Lleva la contrasena del panel del cliente, asi
    // que va detras de la misma puerta y con noindex.
    paths: ["/guia-funeraria", "/guia-funeraria-sfa.html"],
    file: "/guia-funeraria-sfa.html",
    passEnv: "COTIZACION_FUNERARIA_PASSWORD",
    userEnv: "COTIZACION_FUNERARIA_USER",
    defaultUser: "funeraria",
    realm: "JV Agencia - Guia privada",
  },
];

/**
 * Rutas de la APP que quedan detrás de Basic Auth.
 *
 * Se diferencian de PRIVATE_DOCS en dos cosas: no hay archivo en public/ que
 * servir —la ruta la pinta Next.js como siempre— y el emparejamiento es por
 * prefijo, para cubrir cualquier subruta que cuelgue de ella.
 *
 * El cotizador entra aquí por decisión de negocio: publicar la lista de
 * precios completa deja que la competencia la copie y que el cliente vea el
 * número antes de que nadie le explique qué está comprando. Queda como
 * herramienta de venta interna, con la misma contraseña del kit de vendedores
 * —GUIDE_PASSWORD— para que el vendedor maneje una sola clave.
 */
type PrivateRoute = {
  /** Prefijo de ruta, en minúscula y sin barra final. */
  prefix: string;
  passEnv: string;
  userEnv: string;
  defaultUser: string;
  realm: string;
};

const PRIVATE_ROUTES: PrivateRoute[] = [
  {
    prefix: "/cotizador",
    passEnv: "GUIDE_PASSWORD",
    userEnv: "GUIDE_USER",
    defaultUser: "jvagencia",
    realm: "JV Agencia - Herramienta de venta",
  },
];

/**
 * Canonicaliza la ruta antes de compararla contra PRIVATE_DOCS.
 *
 * Sin esto hay una fuga real: el middleware ve la ruta tal como llega, pero la
 * capa de archivos estáticos la decodifica antes de resolver el archivo. Asi,
 * /kit-vendedores%2Ehtml no coincide con ninguna entrada de la lista, pasa de
 * largo, y el estático se entrega sin pedir contraseña. Lo mismo con cualquier
 * otro caracter codificado (%2D, %6C, ...).
 *
 * Se decodifica hasta punto fijo (por si viene codificado varias veces), se
 * colapsan las barras, se quita la barra final y se pasa a minúsculas. Al
 * comparar sobre la forma canónica, todas las variantes caen en la misma
 * entrada y quedan detrás de Basic Auth.
 */
function normalizePath(pathname: string): string {
  let out = pathname;
  for (let i = 0; i < 5; i++) {
    let decoded: string;
    try {
      decoded = decodeURIComponent(out);
    } catch {
      break; // secuencia inválida: nos quedamos con la última forma válida
    }
    if (decoded === out) break;
    out = decoded;
  }
  out = out.replace(/\\/g, "/").replace(/\/{2,}/g, "/");
  if (out.length > 1) out = out.replace(/\/+$/, "");
  return out.toLowerCase();
}

function findPrivateDoc(pathname: string): PrivateDoc | undefined {
  const normalized = normalizePath(pathname);
  return PRIVATE_DOCS.find((doc) => doc.paths.includes(normalized));
}

function findPrivateRoute(pathname: string): PrivateRoute | undefined {
  const normalized = normalizePath(pathname);
  return PRIVATE_ROUTES.find(
    (r) => normalized === r.prefix || normalized.startsWith(r.prefix + "/"),
  );
}

/**
 * Compara en tiempo constante para no filtrar la contraseña por diferencias
 * de tiempo. Longitudes distintas se rechazan de una.
 */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Credenciales esperadas. Lo comparten los documentos y las rutas privadas. */
type Guarded = { passEnv: string; userEnv: string; defaultUser: string };

function authOk(req: NextRequest, doc: Guarded): boolean {
  const expectedPass = process.env[doc.passEnv];
  if (!expectedPass) return false; // sin contraseña configurada → no se expone
  const expectedUser = process.env[doc.userEnv] || doc.defaultUser;

  const header = req.headers.get("authorization") ?? "";
  if (!header.startsWith("Basic ")) return false;

  let decoded: string;
  try {
    decoded = atob(header.slice(6));
  } catch {
    return false;
  }
  const sep = decoded.indexOf(":");
  if (sep < 0) return false;

  return (
    safeEqual(decoded.slice(0, sep), expectedUser) &&
    safeEqual(decoded.slice(sep + 1), expectedPass)
  );
}

export function middleware(req: NextRequest) {
  const hostname = (req.headers.get("host") ?? "").split(":")[0].toLowerCase();

  // Apex → www.
  if (hostname === "jvagencia.com") {
    const url = req.nextUrl.clone();
    url.protocol = "https:";
    url.host = "www.jvagencia.com";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  // Documentos privados: Basic Auth + noindex + sin caché.
  const { pathname } = req.nextUrl;
  const doc = findPrivateDoc(pathname);
  if (doc) {
    if (!authOk(req, doc)) {
      return new NextResponse("Material privado de JV Agencia. Acceso restringido.", {
        status: 401,
        headers: {
          "WWW-Authenticate": `Basic realm="${doc.realm}"`,
          "Content-Type": "text/plain; charset=utf-8",
          "X-Robots-Tag": "noindex, nofollow",
          "Cache-Control": "no-store",
        },
      });
    }
    const url = req.nextUrl.clone();
    url.pathname = doc.file;
    const res = NextResponse.rewrite(url);
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    res.headers.set("Cache-Control", "no-store");
    return res;
  }

  // Rutas privadas de la app: misma puerta, pero la sirve Next.js sin rewrite.
  const route = findPrivateRoute(pathname);
  if (route) {
    if (!authOk(req, route)) {
      return new NextResponse("Herramienta interna de JV Agencia. Acceso restringido.", {
        status: 401,
        headers: {
          "WWW-Authenticate": `Basic realm="${route.realm}"`,
          "Content-Type": "text/plain; charset=utf-8",
          "X-Robots-Tag": "noindex, nofollow",
          "Cache-Control": "no-store",
        },
      });
    }
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    res.headers.set("Cache-Control", "no-store");
    return res;
  }

  return NextResponse.next();
}
