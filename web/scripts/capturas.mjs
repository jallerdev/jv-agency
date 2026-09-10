/**
 * CAPTURAS DEL AUDIT
 * ---------------------------------------------------------------------------
 * Una imagen de pagina completa por ruta y por ancho: `-d` es 1440 px y `-m`
 * es 390 px. Salen a notas/capturas/, que esta en .gitignore: son 17 MB de PNG
 * y no tienen por que vivir en el historial de git.
 *
 * Antes de correrlo: `pnpm dev` en otra terminal.
 *
 *     node scripts/capturas.mjs
 *
 * El aviso de cookies se responde una vez por contexto; si no, tapa la esquina
 * inferior izquierda en las once capturas.
 */
import { createRequire } from 'node:module';
const require = createRequire('/home/jallerangel/Documents/JALLER.DEV/pixels-maker/package.json');
const { chromium } = require('playwright');
const fs = require('fs');
const OUT = new URL('../notas/capturas/', import.meta.url).pathname;
fs.mkdirSync(OUT, { recursive: true });
const RUTAS = [
  ['portada', '/'], ['portada-en', '/en'],
  ['precios', '/precios'], ['precios-en', '/en/pricing'],
  ['contacto', '/contacto'],
  ['sobre-mi', '/sobre-nosotros'],
  ['web', '/servicios/diseno-de-paginas-web'],
  ['tiendas', '/servicios/tiendas-virtuales'],
  ['chatbot', '/servicios/chatbot-whatsapp'],
  ['software', '/servicios/software-a-la-medida'],
  ['seo', '/servicios/posicionamiento-seo'],
  ['blog', '/blog'],
];
const b = await chromium.launch();
for (const [ancho, alto, sufijo] of [[1440, 900, 'd'], [390, 844, 'm']]) {
  const ctx = await b.newContext({ viewport: { width: ancho, height: alto }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  // el aviso de cookies tapa la esquina en todas: se acepta una vez por contexto
  await p.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await p.evaluate(() => { try { localStorage.setItem('jv-cookies', 'no'); } catch {} });
  for (const [nombre, ruta] of RUTAS) {
    await p.goto('http://localhost:3000' + ruta, { waitUntil: 'networkidle' });
    const H = await p.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < H; y += Math.floor(alto * 0.7)) { await p.evaluate(v => scrollTo(0, v), y); await p.waitForTimeout(60); }
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(900);
    await p.screenshot({ path: `${OUT}/${nombre}-${sufijo}.png`, fullPage: true });
    console.log(`${nombre}-${sufijo}  ${H}px`);
  }
  await ctx.close();
}
await b.close();
