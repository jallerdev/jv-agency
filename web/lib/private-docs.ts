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

/** Lo que dice la tarjeta de WhatsApp de un enlace con palabras. */
export type Portada = { eyebrow: string; titulo: string; descripcion: string };

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
  /**
   * Otros archivos de public/ que van con el documento, como la demo que la
   * cotización enlaza. Se sirven tal cual y los abre la misma cookie: sin esto,
   * el cliente entraría a la cotización y la demo le volvería a pedir la clave.
   * `corto` es el nombre con que se entra por el enlace de palabras
   * (/propuesta/…/tienda), y el resto es su tarjeta de WhatsApp.
   */
  anexos?: ({ archivo: string; corto: string } & Portada)[];
  /**
   * Enlace con palabras (ver RUTA_PROPUESTA): `slug` es el nombre legible del
   * enlace y el resto, la tarjeta que muestra WhatsApp. Sin esto, el documento
   * solo abre con contraseña o con llave.
   */
  enlace?: { slug: string } & Portada;
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
  {
    id: "meli",
    titulo: "Propuesta · Meli Shop",
    descripcion: "La tienda virtual y su ejemplo navegable.",
    paths: ["/cotizacion-meli-shop", "/cotizacion-meli-shop.html"],
    file: "/cotizacion-meli-shop.html",
    anexos: [
      {
        archivo: "/ejemplo-tienda-meli-shop.html",
        corto: "tienda",
        eyebrow: "Ejemplo navegable",
        titulo: "Así se vería la tienda de Meli Shop",
        descripcion: "Recórrala como lo haría una clienta: tallas, bolsa y pago.",
      },
    ],
    enlace: {
      slug: "meli-shop",
      eyebrow: "Propuesta",
      titulo: "Tienda virtual para Meli Shop",
      descripcion: "Lo que incluye, el plazo y la inversión.",
    },
    passEnv: "COTIZACION_MELI_PASSWORD",
  },
];

/** Ruta de la pantalla de acceso. Nunca puede quedar detrás de la puerta. */
export const RUTA_ACCESO = "/acceso";

/** Cuánto dura el acceso antes de volver a pedir la contraseña. */
export const DURACION_MS = 30 * 24 * 60 * 60 * 1000; // 30 días

export const nombreCookie = (id: string) => `jv_acc_${id}`;

/**
 * Enlace con llave: `/cotizacion-x?llave=<token>`. Sirve para mandarle la
 * cotización al cliente por WhatsApp sin que tenga que escribir nada.
 *
 * La llave es el mismo token firmado de la cookie (`<vence>.<firma>`), nunca
 * la contraseña. Por eso vence sola, nadie puede fabricarla sin la clave, y
 * cambiar la contraseña la anula. Abre lo mismo que la cookie, ni más ni menos:
 * quien reciba el enlace reenviado también entra, igual que si le pasaran la
 * contraseña. Para WhatsApp es mejor el enlace con palabras (RUTA_PROPUESTA),
 * que se lee y no parece un código.
 */
export const PARAM_LLAVE = "llave";

/**
 * Enlace con palabras: `/propuesta/<slug>/<tres-palabras>[/<anexo>]`, p. ej.
 * `www.jvagencia.com/propuesta/meli-shop/coral-brisa-palma`. Es lo que se le
 * manda al cliente por WhatsApp; lo imprime `scripts/enlace-acceso.mjs`.
 *
 * - Las palabras son los tres primeros bytes del HMAC de la contraseña,
 *   leídos en lib/palabras.ts. No se guardan en ningún lado y cambiar la
 *   contraseña las cambia: así se anula un enlace. No vencen solas.
 * - Son 24 bits, pocos para una firma: lo que impide adivinarlas es el límite
 *   de intentos del proxy (20 cada 15 minutos por IP), no el largo.
 * - <anexo> es el `corto` de un anexo, para entrar directo a él. No va firmado
 *   porque no abre nada distinto: solo elige la puerta dentro del documento.
 *
 * Con palabras buenas responde una página mínima que (1) lleva la tarjeta de
 * WhatsApp del documento, (2) deja la cookie de siempre y (3) salta a la
 * página real. No sirve el documento en esta URL: sus enlaces relativos se
 * romperían, y WhatsApp sin la cookie habría mostrado la tarjeta de la
 * pantalla de acceso, que dice «este enlace pide contraseña».
 */
export const RUTA_PROPUESTA = "/propuesta/";

/** Ruta de la imagen de la tarjeta: `/tarjeta/<slug>[/<anexo>]` (app/tarjeta). */
export const RUTA_TARJETA = "/tarjeta";

export const buscarDocPorSlug = (slug: string) =>
  DOCS_PRIVADOS.find((d) => d.enlace?.slug === slug);

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
    esAnexo(d, r) ||
    (d.file
      ? d.paths.includes(r)
      : d.paths.some((p) => r === p || r.startsWith(p + "/"))),
  );
}

/** Si la ruta es un anexo del documento (se sirve tal cual, sin rewrite). */
export const esAnexo = (doc: DocPrivado, pathname: string) => {
  const r = normalizarRuta(pathname);
  return !!doc.anexos?.some((a) => a.archivo === r);
};

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

/** Token para la cookie o la llave: `<vence>.<firma>`. */
export async function emitirToken(
  docId: string,
  clave: string,
  duracionMs: number = DURACION_MS,
): Promise<string> {
  const vence = Date.now() + duracionMs;
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

// ── Enlace con palabras (ver RUTA_PROPUESTA) ───────────────────────────────

/**
 * Las 256 palabras de los enlaces de propuesta (ver RUTA_PROPUESTA). Cada palabra es un byte de la firma: tres palabras, tres
 * bytes.
 *
 * NO SE REORDENA NI SE CAMBIA. El enlace de un cliente sale de la posición de
 * cada palabra en esta lista; mover una sola cambia los enlaces ya enviados y
 * dejan de abrir. Si alguna sobra, se reemplaza en su mismo lugar y se avisa
 * que los enlaces que la usaban hay que volverlos a mandar.
 *
 * Por qué estas: se escriben bien sin tildes ni eñe (así «limon» no parece un
 * error), son de la naturaleza, la fruta y la costa, y ninguna tiene doble
 * sentido en Colombia (fuera quedaron «concha», «conejo», «foca», «pavo» y
 * «coyote»).
 */
const PALABRAS: readonly string[] = [
  "agua", "alba", "alga", "alma", "almendra", "amapola", "ancla", "arena",
  "aroma", "arpa", "arrecife", "astro", "aurora", "avena", "avellana", "azul",
  "abeja", "acacia", "aguacate", "albahaca", "alondra", "ardilla", "ballena", "balsa",
  "barca", "baya", "begonia", "bosque", "brisa", "brillo", "bruma", "brote",
  "cacao", "cactus", "calma", "camelia", "canario", "canela", "canoa", "capullo",
  "caracol", "cardo", "carey", "cascada", "cedro", "ceiba", "cereza", "chispa",
  "cielo", "ciervo", "cigarra", "ciruela", "cisne", "clavel", "cobre", "coco",
  "cocuyo", "cometa", "copa", "coral", "cosecha", "costa", "cristal", "cumbre",
  "dalia", "delta", "diamante", "dorado", "duna", "durazno", "eco", "espiga",
  "esmeralda", "estero", "estrella", "eucalipto", "faro", "fiesta", "flamenco", "flor",
  "fresa", "fruta", "fuente", "gacela", "gardenia", "garza", "gaviota", "gema",
  "girasol", "glaciar", "globo", "golfo", "gota", "granada", "granate", "granizo",
  "grano", "grillo", "guadua", "guayaba", "guacamaya", "hamaca", "helecho", "hibisco",
  "hiedra", "hielo", "higo", "hinojo", "hoja", "iguana", "iris", "isla",
  "jacinto", "jade", "jaguar", "jengibre", "jilguero", "junco", "lago", "laguna",
  "laurel", "lava", "lavanda", "lila", "lima", "lince", "lirio", "llama",
  "lluvia", "loma", "loto", "lucero", "luna", "luz", "madera", "magnolia",
  "malva", "mamey", "manantial", "mango", "manglar", "manta", "manzana", "mar",
  "marea", "marfil", "margarita", "mariposa", "medusa", "melisa", "menta", "miel",
  "mimosa", "mineral", "mirlo", "mirto", "monte", "mora", "morado", "musgo",
  "naranja", "nardo", "neblina", "nieve", "nogal", "norte", "nube", "nutria",
  "oasis", "ola", "olivo", "olmo", "onda", "orca", "orilla", "oro",
  "ostra", "palma", "paloma", "pampa", "pantera", "papaya", "pera", "perla",
  "pimienta", "pinar", "pino", "piedra", "planeta", "playa", "pluma", "polen",
  "pomelo", "pradera", "prisma", "puma", "quetzal", "rama", "rayo", "reseda",
  "ribera", "roble", "roca", "romero", "rosa", "sabana", "salvia", "sauce",
  "selva", "semilla", "sendero", "sierra", "sirena", "sol", "sombra", "tamarindo",
  "tierra", "tilo", "tomillo", "topacio", "tortuga", "trigo", "trueno", "turquesa",
  "uva", "vainilla", "valle", "vela", "venado", "verano", "verbena", "vergel",
  "viento", "violeta", "yuca", "zafiro", "zarza", "zorzal", "albatros", "alce",
  "arce", "arco", "campo", "canto", "caoba", "cauce", "celeste", "cobalto",
  "colina", "corcel", "cordillera", "corriente", "crema", "cuarzo", "cueva", "dulce",
];

/** Las tres palabras del documento: `coral-brisa-palma`. */
export async function palabrasDe(docId: string, clave: string): Promise<string> {
  // Prefijo «palabras.» para que esta firma nunca coincida con la de una cookie.
  const hex = await firmar(`palabras.${docId}`, clave);
  return [0, 1, 2].map((i) => PALABRAS[parseInt(hex.slice(i * 2, i * 2 + 2), 16)]).join("-");
}
