/**
 * Catálogo de lo que va detrás de contraseña, y la puerta que lo protege.
 *
 * Antes esto vivía dentro de `middleware.ts` con Basic Auth: el navegador
 * mostraba su ventanita gris pidiendo usuario y contraseña. Funcionaba, pero
 * era lo primero que veía un cliente al abrir su cotización —un diálogo del
 * sistema, sin marca, pidiéndole un "usuario" que no significa nada para él.
 *
 * Ahora hay una pantalla propia y solo pide contraseña. El acceso se guarda en
 * una cookie firmada, no en una cabecera que el navegador reenvía en cada
 * petición.
 *
 * CÓMO SE FIRMA. El valor de la cookie NO es la contraseña: es
 * `<vence>.<firma>`, donde la firma es un HMAC-SHA256 de `docId.vence` usando
 * la propia contraseña como clave. Tres consecuencias buenas:
 *
 *  1. Quien no sepa la contraseña no puede fabricar un token válido.
 *  2. La contraseña nunca viaja de vuelta al navegador ni queda guardada.
 *  3. Si se cambia la contraseña, todos los tokens emitidos dejan de valer
 *     solos, sin tener que revocar nada.
 *
 * Cada documento tiene su propia cookie, así que abrir el kit de vendedores no
 * abre la cotización de un cliente.
 */

export type DocPrivado = {
  /** Identificador corto. Nombra la cookie y viaja en la URL de acceso. */
  id: string;
  /** Cómo se llama el documento en la pantalla de acceso. */
  titulo: string;
  /** Una línea que le dice al visitante qué hay detrás. */
  descripcion: string;
  /** Rutas que sirven el documento: la limpia y la del archivo. */
  paths: string[];
  /**
   * Archivo dentro de public/. Si es `null`, la ruta la sirve Next.js y el
   * emparejamiento es por prefijo (el caso del cotizador).
   */
  file: string | null;
  /** Variable de entorno con la contraseña. Sin ella, nadie entra. */
  passEnv: string;
};

export const DOCS_PRIVADOS: DocPrivado[] = [
  {
    id: "kit",
    titulo: "Kit de ventas",
    descripcion: "Precios, ejemplos de cotización y guion de venta.",
    paths: ["/kit-vendedores", "/kit-vendedores.html"],
    file: "/kit-vendedores.html",
    passEnv: "GUIDE_PASSWORD",
  },
  {
    id: "capacitacion",
    titulo: "Qué estás vendiendo",
    descripcion: "El diccionario de cada servicio y cómo explicarlo.",
    paths: ["/capacitacion", "/capacitacion-vendedores.html"],
    file: "/capacitacion-vendedores.html",
    passEnv: "GUIDE_PASSWORD",
  },
  {
    id: "playbook",
    titulo: "Cómo conseguir clientes",
    descripcion: "A quién buscar, qué publicar y qué escribirle.",
    paths: ["/playbook", "/playbook-vendedores.html"],
    file: "/playbook-vendedores.html",
    passEnv: "GUIDE_PASSWORD",
  },
  {
    id: "cotizador",
    titulo: "Cotizador",
    descripcion: "Herramienta interna para armar el precio de un proyecto.",
    paths: ["/cotizador"],
    file: null,
    passEnv: "GUIDE_PASSWORD",
  },
  {
    id: "pixels",
    titulo: "Cotización · Pixels Maker",
    descripcion: "Posicionamiento local y orden del sitio web.",
    paths: ["/cotizacion-pixels-seo", "/cotizacion-pixels-seo.html"],
    file: "/cotizacion-pixels-seo.html",
    passEnv: "COTIZACION_PIXELS_PASSWORD",
  },
  {
    id: "funeraria",
    titulo: "Cotización · Funeraria San Francisco de Asís",
    descripcion: "El sitio web, ya entregado.",
    paths: ["/cotizacion-funeraria", "/cotizacion-funeraria-sfa.html"],
    file: "/cotizacion-funeraria-sfa.html",
    passEnv: "COTIZACION_FUNERARIA_PASSWORD",
  },
  {
    id: "guia-funeraria",
    titulo: "Guía · Funeraria San Francisco de Asís",
    descripcion: "Cómo revisar el sitio, paso a paso.",
    paths: ["/guia-funeraria", "/guia-funeraria-sfa.html"],
    file: "/guia-funeraria-sfa.html",
    passEnv: "COTIZACION_FUNERARIA_PASSWORD",
  },
  {
    id: "monica",
    titulo: "Cotización · Aula Mónica",
    descripcion: "El sitio web y su alcance.",
    paths: ["/cotizacion-monica", "/cotizacion-aula-monica.html"],
    file: "/cotizacion-aula-monica.html",
    passEnv: "COTIZACION_MONICA_PASSWORD",
  },
  {
    id: "propuesta-monica",
    titulo: "Propuesta · Aula Mónica",
    descripcion: "La versión corta de la propuesta.",
    paths: ["/propuesta-monica", "/propuesta-sencilla-monica.html"],
    file: "/propuesta-sencilla-monica.html",
    passEnv: "COTIZACION_MONICA_PASSWORD",
  },
];

/** Ruta de la pantalla de acceso. Nunca puede quedar detrás de la puerta. */
export const RUTA_ACCESO = "/acceso";

/** Cuánto dura el acceso antes de volver a pedir la contraseña. */
export const DURACION_MS = 30 * 24 * 60 * 60 * 1000; // 30 días

export const nombreCookie = (id: string) => `jv_acc_${id}`;

/**
 * Canonicaliza la ruta antes de compararla.
 *
 * Sin esto hay una fuga real: el middleware ve la ruta tal como llega, pero la
 * capa de archivos estáticos la decodifica antes de resolver el archivo. Así,
 * /kit-vendedores%2Ehtml no coincidiría con ninguna entrada, pasaría de largo,
 * y el estático se entregaría sin pedir nada.
 */
export function normalizarRuta(pathname: string): string {
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

/** El documento al que apunta una ruta, si es privada. */
export function buscarDoc(pathname: string): DocPrivado | undefined {
  const r = normalizarRuta(pathname);
  return DOCS_PRIVADOS.find((d) =>
    d.file
      ? d.paths.includes(r)
      : d.paths.some((p) => r === p || r.startsWith(p + "/")),
  );
}

export const buscarDocPorId = (id: string) => DOCS_PRIVADOS.find((d) => d.id === id);

// ── Firma ─────────────────────────────────────────────────────────────────
// Web Crypto, no el módulo `crypto` de Node: el middleware corre en el runtime
// Edge y allí `crypto.subtle` es lo único disponible. Sirve igual en el
// servidor, así que la misma función vale para emitir y para verificar.

const enc = new TextEncoder();

async function firmar(mensaje: string, clave: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(clave),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(mensaje));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Compara en tiempo constante, para no filtrar nada por diferencias de tiempo. */
export function igualSeguro(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Token para la cookie: `<vence>.<firma>`. */
export async function emitirToken(docId: string, clave: string): Promise<string> {
  const vence = Date.now() + DURACION_MS;
  return `${vence}.${await firmar(`${docId}.${vence}`, clave)}`;
}

export async function tokenValido(
  token: string | undefined,
  docId: string,
  clave: string,
): Promise<boolean> {
  if (!token) return false;
  const corte = token.indexOf(".");
  if (corte < 0) return false;
  const vence = Number(token.slice(0, corte));
  if (!Number.isFinite(vence) || Date.now() > vence) return false;
  return igualSeguro(token.slice(corte + 1), await firmar(`${docId}.${vence}`, clave));
}
