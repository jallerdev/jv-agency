/**
 * ENLACES PARA MANDARLE UN DOCUMENTO PRIVADO A UN CLIENTE
 * ---------------------------------------------------------------------------
 * Imprime las URL con palabras que se le mandan al cliente: al tocarlas entra
 * sin escribir la contraseña (ver RUTA_PROPUESTA en lib/private-docs.ts). Una
 * por el documento y una por cada anexo.
 *
 *   node --env-file=.env.local --disable-warning=MODULE_TYPELESS_PACKAGE_JSON \
 *     scripts/enlace-acceso.mjs <doc>
 *
 *   (el aviso que se apaga es inofensivo: Node avisa que lib/ no declara "type")
 *
 * El documento necesita `enlace` en el catálogo. La contraseña sale de su
 * variable (passEnv) en .env.local y tiene que ser LA MISMA que en Vercel: con
 * otra, las palabras salen distintas y no abren en producción. Los enlaces no
 * vencen; para anularlos se cambia la contraseña.
 *
 * Es .mjs y no .ts para que `next build` no lo revise con TypeScript: importa
 * el catálogo con extensión .ts, que Node 24 ejecuta pero tsc no acepta.
 */
import { DOCS_PRIVADOS, palabrasDe, RUTA_PROPUESTA } from "../lib/private-docs.ts";

// Sin https://: WhatsApp igual lo vuelve enlace y se lee más limpio.
const SITIO = "www.jvagencia.com";

const [id] = process.argv.slice(2);
const doc = DOCS_PRIVADOS.find((d) => d.id === id);
if (!doc?.enlace) {
  const con = DOCS_PRIVADOS.filter((d) => d.enlace).map((d) => d.id);
  console.error(`«${id ?? ""}» no tiene enlace con palabras. Lo tienen: ${con.join(", ") || "ninguno"}`);
  process.exit(1);
}
const clave = process.env[doc.passEnv];
if (!clave) {
  console.error(`Falta ${doc.passEnv}. Córralo con --env-file=.env.local, o tráigala de Vercel.`);
  process.exit(1);
}

const base = `${SITIO}${RUTA_PROPUESTA}${doc.enlace.slug}/${await palabrasDe(doc.id, clave)}`;
console.log(`${base}\t${doc.enlace.titulo}`);
for (const a of doc.anexos ?? []) console.log(`${base}/${a.corto}\t${a.titulo}`);
