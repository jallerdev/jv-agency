/**
 * ENLACE CON LLAVE PARA UN DOCUMENTO PRIVADO
 * ---------------------------------------------------------------------------
 * Imprime la URL que se le manda al cliente: al tocarla entra sin escribir la
 * contraseña (ver PARAM_LLAVE en lib/private-docs.ts).
 *
 *   node --env-file=.env.local --disable-warning=MODULE_TYPELESS_PACKAGE_JSON \
 *     scripts/enlace-acceso.mjs <doc> [días]
 *
 *   (el aviso que se apaga es inofensivo: Node avisa que lib/ no declara "type")
 *
 * La contraseña sale de la variable del documento (passEnv) en .env.local, y
 * tiene que ser LA MISMA que en Vercel: firmada con otra, la llave no abre en
 * producción. Por defecto vence a los 30 días; cambiar la contraseña la anula
 * antes.
 *
 * Es .mjs y no .ts para que `next build` no lo revise con TypeScript: importa
 * el catálogo con extensión .ts, que Node 24 ejecuta pero tsc no acepta.
 */
import {
  DOCS_PRIVADOS,
  emitirToken,
  PARAM_LLAVE,
} from "../lib/private-docs.ts";

const SITIO = "https://www.jvagencia.com";

const [id, diasTxt = "30"] = process.argv.slice(2);
const doc = DOCS_PRIVADOS.find((d) => d.id === id);
if (!doc) {
  console.error(`Documento desconocido: «${id ?? ""}». Hay: ${DOCS_PRIVADOS.map((d) => d.id).join(", ")}`);
  process.exit(1);
}
const dias = Number(diasTxt);
if (!Number.isFinite(dias) || dias <= 0) {
  console.error(`Días inválidos: «${diasTxt}»`);
  process.exit(1);
}
const clave = process.env[doc.passEnv];
if (!clave) {
  console.error(`Falta ${doc.passEnv}. Córralo con --env-file=.env.local, o tráigala de Vercel.`);
  process.exit(1);
}

const llave = await emitirToken(doc.id, clave, dias * 24 * 60 * 60 * 1000);
const vence = new Date(Number(llave.split(".")[0])).toLocaleDateString("es-CO", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
console.log(`${SITIO}${doc.paths[0]}?${PARAM_LLAVE}=${llave}`);
console.error(`${doc.titulo} · vence el ${vence}`);
