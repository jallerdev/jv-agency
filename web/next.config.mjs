/** @type {import('next').NextConfig} */

const enDesarrollo = process.env.NODE_ENV !== "production";

/* ───────────────────────────────────────────────────────────────────────────
 * HSTS
 * ───────────────────────────────────────────────────────────────────────────
 * Vercel ya servía `max-age=63072000` por su cuenta, pero SIN
 * `includeSubDomains`. Aquí se declara completo para que la cabecera sea
 * nuestra y no dependa del proveedor.
 *
 * Antes de añadir `includeSubDomains` se comprobó, con curl, que todos los
 * subdominios vivos sirven HTTPS correctamente (2026-09-09):
 *
 *   https://halcon.jvagencia.com        → 200, y ya manda su propio
 *                                          `includeSubDomains; preload`
 *   http://halcon.jvagencia.com         → 308 a https
 *   https://clerk.halcon.jvagencia.com  → 200
 *
 * No resuelve ningún otro subdominio (api, app, mail, blog, admin, crm: NXDOMAIN),
 * así que la directiva no puede dejar nada fuera de servicio hoy. La factura la
 * paga el FUTURO: cualquier subdominio nuevo tendrá que nacer con HTTPS válido
 * o el navegador se negará a abrirlo. Con Vercel emitiendo certificados solo
 * eso ya está resuelto; si algún día se apunta un subdominio a otro proveedor,
 * hay que acordarse de esta línea.
 *
 * NO se pone `preload`. Entrar en la lista de precarga de Chrome es fácil y
 * salir tarda meses, durante los cuales un subdominio sin HTTPS es
 * irrecuperable. halcon.jvagencia.com sí lo manda por su cuenta; esa decisión
 * es de ese proyecto, no de este.
 *
 * OJO CON EL ALCANCE REAL: HSTS solo cubre al host que la envía y a SUS
 * subdominios. Esta cabecera sale de www.jvagencia.com, así que cubre
 * `*.www.jvagencia.com` — que no existe. Quien de verdad cubriría a
 * halcon.jvagencia.com es el APEX (jvagencia.com), y el apex hoy responde un
 * 308 desde `proxy.ts`, que se salta esta capa de cabeceras de Next (se
 * verificó: la respuesta del apex no trae X-Frame-Options ni las demás).
 * Pendiente anotado en ACTION-PLAN.md: añadir la cabecera también a esa
 * redirección. Mientras tanto no hay agujero práctico, porque halcon manda su
 * propio HSTS.
 */
const HSTS = "max-age=63072000; includeSubDomains";

/* ───────────────────────────────────────────────────────────────────────────
 * CSP — POR AHORA EN MODO REPORT-ONLY
 * ───────────────────────────────────────────────────────────────────────────
 * Report-Only no bloquea nada: el navegador carga todo igual y solo anota en
 * consola lo que HABRÍA bloqueado. Es la única forma sensata de estrenar una
 * CSP en un sitio en producción.
 *
 * Qué carga el sitio de verdad (auditado recurso por recurso con Playwright,
 * 2026-09-09):
 *   - Scripts propios de Next desde `/_next/static` (self).
 *   - Google Analytics 4: `www.googletagmanager.com/gtag/js` + el snippet
 *     EN LÍNEA de `app/layout.tsx`. Solo en producción.
 *   - Estilos: la hoja de Tailwind (self) + los `<style>` en línea que
 *     inyecta `next/font` + los atributos `style` de React.
 *   - Tipografías: locales, en `/_next/static/media` (self). El sitio NO usa
 *     Google Fonts... pero los documentos privados estáticos de `/public`
 *     (kit-vendedores, cotizaciones, guías) SÍ tiran de fonts.googleapis.com
 *     y fonts.gstatic.com, y también los sirve esta app. Por eso están
 *     permitidos: sin ellos, esas páginas se quedarían sin tipografía el día
 *     que la política pase a bloquear.
 *   - Imágenes: propias, `data:` y `blob:` (los placeholders de next/image).
 *   - fetch: todo a `/api/*` del mismo origen (acceso, availability, schedule).
 *     Nada sale del dominio desde el navegador.
 *   - Marcos: ninguno. No hay un solo <iframe> en el sitio.
 *
 * QUÉ FALTA PARA PONERLA EN MODO BLOQUEANTE (y por qué no se hizo hoy):
 *
 *   1. `'unsafe-inline'` en script-src. Es el problema de fondo: Next inyecta
 *      sus propios <script> en línea (el payload de RSC) y GA4 lleva otro.
 *      Con 'unsafe-inline' la CSP no protege contra XSS inyectado, que es
 *      justo para lo que sirve. La solución correcta son NONCES por petición,
 *      y eso obliga a generar el nonce en `proxy.ts`, pasarlo a los <Script>
 *      y renderizar TODAS las páginas en dinámico — hoy el sitio es estático
 *      y esa es la razón de que vuele. Cambiarlo por la CSP sería pagar el
 *      rendimiento del sitio entero por una cabecera. Decisión: no hoy.
 *
 *   2. Un endpoint de informes. Sin `report-to`/`report-uri` las violaciones
 *      solo se ven abriendo la consola del navegador. Para pasar a bloquear
 *      hace falta recogerlas unos días de tráfico real y comprobar que la
 *      lista está vacía. Falta montar ese recolector.
 *
 *   3. Confirmar las rutas de GA4. `*.google-analytics.com` cubre los
 *      subdominios regionales (region1, region2...) que Google va cambiando.
 *      Hay que verlo con datos, no de memoria.
 *
 *   4. `frame-src 'none'` es correcto HOY. El día que se incruste un vídeo o
 *      un mapa habrá que abrirlo; en Report-Only eso se avisa solo.
 *
 * Cuando (1), (2) y (3) estén: se cambia la clave de la cabecera
 * `Content-Security-Policy-Report-Only` por `Content-Security-Policy` y se
 * añade `upgrade-insecure-requests` a la lista (ver el comentario del final).
 *
 * Verificado con navegador el 2026-09-09 sobre /, /servicios/chatbot-whatsapp,
 * /blog y /acceso: CERO violaciones y cero errores de página. Contra
 * producción, inyectando esta misma política y con GA4 cargando de verdad:
 * también cero.
 */
const GA_TAG = "https://www.googletagmanager.com";
const GA_COLECTA = [
  "https://www.google-analytics.com",
  "https://*.google-analytics.com",
  "https://*.analytics.google.com",
  "https://*.googletagmanager.com",
];

const csp = [
  "default-src 'self'",

  // 'unsafe-eval' SOLO en desarrollo: el recargado en caliente de Next compila
  // módulos con eval(). En producción no aparece, y por eso la política que se
  // ve en local es un pelo más laxa que la que sirve el sitio.
  `script-src 'self' 'unsafe-inline' ${GA_TAG}${enDesarrollo ? " 'unsafe-eval'" : ""}`,

  // fonts.googleapis.com sirve la HOJA de estilos de las fuentes; el archivo
  // .woff2 lo sirve gstatic y va en font-src.
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  `img-src 'self' data: blob: ${GA_TAG} https://www.google-analytics.com`,

  // ws:/wss: son el canal del recargado en caliente; fuera de desarrollo no
  // hacen falta.
  `connect-src 'self' ${GA_COLECTA.join(" ")}${enDesarrollo ? " ws: wss:" : ""}`,

  "manifest-src 'self'",
  "worker-src 'self' blob:",
  "media-src 'self'",

  // No hay iframes en el sitio; que el navegador avise si alguien mete uno.
  "frame-src 'none'",
  "object-src 'none'",

  // Coherente con X-Frame-Options: SAMEORIGIN, que se mantiene para los
  // navegadores viejos que no leen frame-ancestors.
  "frame-ancestors 'self'",

  "base-uri 'self'",
  // Los dos formularios (acceso y agendar llamada) envían por fetch al propio
  // dominio; ninguno postea fuera.
  "form-action 'self'",

  // `upgrade-insecure-requests` NO va aquí: el navegador la ignora en una
  // política de solo informe y, a cambio, escupe un aviso en consola en cada
  // carga. Se añade el día que la cabecera pase a bloquear.
].join("; ");

/* Cabeceras de seguridad aplicadas a todas las rutas de la app. */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  { key: "Strict-Transport-Security", value: HSTS },
  { key: "Content-Security-Policy-Report-Only", value: csp },
];

/* ───────────────────────────────────────────────────────────────────────────
 * EL PRESUPUESTO DE JAVASCRIPT, Y LA RUTA QUE SE PASA
 * ───────────────────────────────────────────────────────────────────────────
 * El encargo fija un techo de +30 kB comprimidos por página frente al sitio
 * anterior. Medido ruta por ruta contra producción, con Analytics fuera de la
 * cuenta —es de terceros y pesa igual en los dos—, diecisiete de dieciocho
 * rutas caben: de -8 kB a +19. La que se pasa es UNA:
 *
 *     /precios ........ 213 kB → 251 kB ..... +38 kB
 *
 * Y NO ES LO QUE PARECE. El encargo prevé este caso y manda el remedio: «si una
 * pieza firma lo exige, se carga con `dynamic()` cuando entra en vista». Se
 * midió antes de aplicarlo: quitando el constructor de propuestas ENTERO
 * —`components/visuales/Recibo.tsx`, la pieza firma de la página— el peso baja
 * 2 kB. Diferirlo sería trabajo con la forma correcta y el efecto de nada.
 *
 * DÓNDE ESTÁN LOS 38 kB DE VERDAD: /precios carga CINCO trozos de entrada de
 * cliente y los cinco llevan dentro una copia de `BarraMovil`, `WhatsAppButton`
 * y las clases de botón. Se comprobó extrayendo las cadenas de cada trozo: los
 * cinco contienen `h-[var(--barra-movil-h)]`. Turbopack emite un trozo por
 * frontera de cliente y copia las dependencias compartidas en cada uno en vez
 * de izarlas a un trozo común; en todo el build, `BarraMovil` aparece en 17
 * trozos distintos. No es un defecto del código de la página: es cómo se está
 * partiendo el paquete.
 *
 * POR QUÉ NO SE FUERZA HOY. La métrica que ese techo existe para proteger se
 * cumple justo en esa ruta, y con margen: /precios es la MÁS rápida de las tres
 * que más entran —LCP 1,11 s contra un techo de 2,5; CLS 0; TBT 88 ms contra un
 * techo de 200—. Cambiar el empaquetador para ganar 38 kB en una ruta que ya va
 * sobrada es arriesgar el build por una cifra, no por una mejora.
 *
 * SI ALGÚN DÍA ESTORBA, es aquí donde se arregla: o reduciendo las fronteras de
 * cliente que alcanza el árbol de /precios, o dándole al empaquetador una
 * estrategia de trozos comunes. Queda anotado con su medida para que quien lo
 * abra no tenga que volver a medirlo.
 * ─────────────────────────────────────────────────────────────────────────── */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    /* El 404 de las URL que no emparejan con ninguna ruta. Hace falta la
       bandera porque el sitio tiene dos layouts raíz —`(es)` y `(en)`— y sin
       ella Next se rinde al 404 gris de fábrica en todo lo que no caiga dentro
       de un segmento ya emparejado. El porqué completo, en
       `app/global-not-found.tsx`. */
    globalNotFound: true,
  },
  /* Next 16 exige declarar cada `quality` que se use en <Image>: si no, avisa
     por consola en CADA carga de la portada. Dos escalones, no cuatro. Venían
     tres valores puestos a ojo por tres manos distintas —90 en el caso a
     fondo, 88 y 85 en la rejilla— y la diferencia entre ellos no se ve, pero
     multiplica por tres la caché de imagen optimizada. 85 para las capturas
     de trabajo (bajan de 2000px a 1049 como mucho) y 75, el defecto de Next,
     para todo lo demás. */
  images: {
    qualities: [75, 85],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
