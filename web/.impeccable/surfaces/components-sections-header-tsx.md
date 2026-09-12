---
version: 1
slug: "components-sections-header-tsx"
primary_target: "components/sections/Header.tsx"
related_targets: ["components/sections/Footer.tsx","components/BarraMovil.tsx","app/(es)/layout.tsx","app/(en)/layout.tsx"]
---

# Elementos globales · encabezado, pie, metadatos sociales, 404

**Modo:** Operate. Están en todas partes y nadie viene a verlos.

## Encabezado

Fijo; al bajar se compacta con fondo desenfocado. «Menú» abre un panel a
pantalla completa con los servicios y su precio «desde» leído de `CATALOGO`
—escalonado de 40 ms, trampa de foco, cierre con Esc—.

El alto son `5.5rem` **medidos**: a 4,5rem la barra desaparecía contra el hero.

## Pie

El wordmark «JV AGENCIA» se revela con `clip-path` al entrar en vista.

**Defecto medido, en las 59 rutas:** el aviso de copyright va a **82 caracteres
por línea** a 12 px. Es un hallazgo de `line-length` por página, o sea 59 de los
246 del sitio, y se arregla con una sola regla.

## Barra de acción móvil

`components/BarraMovil.tsx` ya existe y ya reserva su alto en el flujo
(`--barra-movil-h`, con `env(safe-area-inset-bottom)`). Aparece después del
hero y se oculta cuando el CTA final o el pie están en vista. **Reemplaza al
botón flotante de WhatsApp en móvil**, para no apilar dos elementos.

## Metadatos sociales

**Arreglado en la fase 0:** los dos layouts declaraban `twitter.title` y
`twitter.description` literales, y como Next fusiona los metadatos por objeto,
**las cuarenta páginas internas heredaban la tarjeta de Twitter de la portada**
—la página de SEO se anunciaba en Twitter como «Páginas web, tiendas virtuales
y software en Colombia»—. Quitados los dos campos, Next compone la tarjeta con
el `title` y la `description` de cada página. Verificado en ES y EN.

**Sigue abierto:** ninguna página interna tiene `og:image` propia. La portada
tiene `/og.png`; las internas que declaran su propio `openGraph` pierden las
imágenes del layout, porque Next reemplaza el objeto entero. La solución es
`opengraph-image.tsx` por ruta —plantilla oscura, la «/», el título de la página
y un chip con el precio «desde» cuando aplique— y está programada para la fase
5. Las páginas de ciudad tampoco declaran `og:locale`.

## 404 (nueva)

La «/» del logo grande, dibujándose. Texto en la voz del sitio, a aprobar:
«Esta página no existe. Los precios sí.», con enlaces a precios, servicios y
agendar.

## Anclas

`/#trabajo` (el caso a fondo) y `/#portafolio` (la rejilla) **existen los dos**
y apuntan a secciones distintas: `id="trabajo"` en `Caso.tsx` e
`id="portafolio"` en `Portafolio.tsx`. No está roto, pero el hero dice «Ver mi
trabajo» → `#trabajo` mientras el menú y el pie dicen «Trabajo» → `#portafolio`.
Conviene decidir cuál es «el trabajo» y que los tres enlaces coincidan.

## El motivo de marca: la barra «/»

El único motivo gráfico del movimiento, siempre con el ángulo del logo:
transición entre páginas con barrido diagonal de ≤ 400 ms (con View Transitions
si esta versión de Next las soporta; si no, **sin transición**, no simulada con
JS pesado), el logo que se redibuja en hover, y los divisores y cursores de las
demos.

## Restricciones que valen para todas las superficies

- **El copy no se reescribe.** H1, H2, párrafos, FAQ, URLs y JSON-LD se
  mantienen. Se puede reordenar, agrupar, plegar o pasar una lista a tabla,
  pero **todo el contenido sigue en el HTML del servidor**: acordeones con
  `<details>` o equivalente, pestañas con todo en el DOM. Nada cargado al
  hacer clic.
- **Ningún precio ni plazo se escribe a mano.** Salen de `CATALOGO` / `PISOS` /
  `PLAZOS` en `lib/quote.ts` y se formatean con `money(n, idioma)`.
- **Una sola pieza firma por página.** Todo lo demás, sobrio.
- **`[PENDIENTE: dato de Luis]`** es la única forma de dejar un hueco. Nunca se
  inventa una cifra, un cliente, un testimonio ni un resultado.
- **El sistema es el del home** (`DESIGN.md`): oscuro `#080808`, un solo acento
  naranja, cero sombras, Figtree + JetBrains Mono. No se inventan tokens.
- **Presupuesto de rendimiento** (sección 11 del encargo): Lighthouse móvil
  ≥ 95, el JS de cliente no crece más de 30 KB comprimidos por página, y con
  `prefers-reduced-motion` todo funciona.
