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
    paths: ["/cotizacion-monica", "/cotizacion-aula-monica.html"],
    file: "/cotizacion-aula-monica.html",
    passEnv: "COTIZACION_MONICA_PASSWORD",
    userEnv: "COTIZACION_MONICA_USER",
    defaultUser: "monica",
    realm: "JV Agencia - Cotizacion privada",
  },
];

function findPrivateDoc(pathname: string): PrivateDoc | undefined {
  return PRIVATE_DOCS.find((doc) => doc.paths.includes(pathname));
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

function docAuthOk(req: NextRequest, doc: PrivateDoc): boolean {
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
    if (!docAuthOk(req, doc)) {
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

  return NextResponse.next();
}
