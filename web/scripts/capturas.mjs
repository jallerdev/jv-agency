/**
 * CAPTURAS DEL AUDIT
 * ---------------------------------------------------------------------------
 * Una imagen de pagina completa por ruta y por ancho: `-d` es 1440 px y `-m`
 * es 390 px. Salen a notas/capturas/, que esta en .gitignore Y sin seguimiento:
 * son ~10 MB de PNG y no tienen por que vivir en el historial de git. Estuvieron
 * seguidas un tiempo —la regla de .gitignore llego despues de committearlas, y
 * .gitignore no desindexa nada—, asi que sus blobs siguen en los commits
 * viejos de esta rama; lo que ya no pasa es que se sumen mas.
 *
 * Antes de correrlo: `pnpm dev` en otra terminal.
 *
 *     node scripts/capturas.mjs
 *
 * El aviso de cookies se responde una vez por contexto; si no, tapa la esquina
 * inferior izquierda en las once capturas.
 */
import { createRequire } from 'node:module';

/**
 * Playwright no es dependencia de este proyecto —no se usa en el build ni en
 * ninguna prueba— y aqui hace falta solo para regenerar las capturas. Se busca
 * primero donde node lo encuentre normalmente y, si no esta, se dice como
 * instalarlo.
 *
 * Antes esto era `createRequire` con una ruta absoluta al checkout de otro
 * proyecto en una maquina concreta: reventaba con MODULE_NOT_FOUND para
 * cualquier otra persona, en CI, o en cuanto ese checkout cambiara de sitio.
 * O sea: el camino documentado para regenerar las capturas no se podia correr.
 */
const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  console.error(
    'Falta playwright, que no es dependencia de este proyecto porque solo\n' +
    'sirve para esto. Instalalo suelto y vuelve a correr:\n\n' +
    '    pnpm dlx playwright install chromium\n' +
    '    pnpm add -D playwright\n'
  );
  process.exit(1);
}
import fs from 'node:fs';
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
    await p.evaluate(() => scrollTo(0, 0));
    /* 1.400 ms y no 900: `Reveal` entra en 0,7 s con su escalonado encima, y
       una foto disparada antes sale con media pagina en blanco. Me paso: la
       primera captura de /contacto salio vacia y parecia que la pagina no
       existia. */
    await p.waitForTimeout(1400);
    await p.screenshot({ path: `${OUT}/${nombre}-${sufijo}.png`, fullPage: true });
    console.log(`${nombre}-${sufijo}  ${H}px`);
  }
  await ctx.close();
}
await b.close();
