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

// Guía de ventas interna: privada (solo por link + contraseña) y no indexable.
// Se sirve el HTML estático desde public/kit-vendedores.html; la ruta limpia
// /kit-vendedores se reescribe a ese archivo. La contraseña vive en la env var
// GUIDE_PASSWORD (configurar en Vercel); sin ella, la guía queda inaccesible.
const GUIDE_PATHS = new Set(["/kit-vendedores", "/kit-vendedores.html"]);

function guideAuthOk(req: NextRequest): boolean {
  const expectedPass = process.env.GUIDE_PASSWORD;
  if (!expectedPass) return false; // sin contraseña configurada → no se expone
  const expectedUser = process.env.GUIDE_USER || "jvagencia";

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
  const user = decoded.slice(0, sep);
  const pass = decoded.slice(sep + 1);
  return user === expectedUser && pass === expectedPass;
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

  // Guía privada: Basic Auth + noindex.
  const { pathname } = req.nextUrl;
  if (GUIDE_PATHS.has(pathname)) {
    if (!guideAuthOk(req)) {
      return new NextResponse("Material privado de JV Agencia. Acceso restringido.", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="JV Agencia - Material privado"',
          "Content-Type": "text/plain; charset=utf-8",
          "X-Robots-Tag": "noindex, nofollow",
          "Cache-Control": "no-store",
        },
      });
    }
    const url = req.nextUrl.clone();
    if (pathname === "/kit-vendedores") url.pathname = "/kit-vendedores.html";
    const res = NextResponse.rewrite(url);
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    res.headers.set("Cache-Control", "no-store");
    return res;
  }

  return NextResponse.next();
}
