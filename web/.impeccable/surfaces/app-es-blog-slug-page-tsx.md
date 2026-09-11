---
version: 1
slug: "app-es-blog-slug-page-tsx"
primary_target: "app/(es)/blog/[slug]/page.tsx"
related_targets: ["app/(es)/blog/page.tsx","app/(en)/en/blog/page.tsx","app/(en)/en/blog/[slug]/page.tsx","components/paginas/BlogIndice.tsx","components/paginas/BlogArticulo.tsx"]
---

# Blog · índice y artículo

**Modo:** Read. El visitante viene a entender algo.

## Diagnóstico medido

El índice: listado plano, ahora de **once artículos**, sin jerarquía, sin
filtro por categoría y sin imagen. El encargo lo describía con siete; hay once,
repartidos en Precios (4), Guías (4) y Decisión (3), así que las categorías ya
son viables.

El artículo: **la superficie con peor medida de línea del sitio.** El detector
marca 13 `line-length` en «Cómo aparecer en Google Maps» y entre 4 y 11 en
cada uno de los demás. Medido con el navegador: los `<li>` del cuerpo van a
**88–91 caracteres por línea** a 15,6 px. La causa es que la regla global de
`68ch` en `app/globals.css` solo cubre `main p`, y la prosa de un artículo vive
tanto en `<li>` como en `<p>`.

También le faltan índice, autor, relacionados y progreso de lectura.

## Índice (`/blog`)

1. Hero con H1 y chips de filtro —Todos · Precios · Decisión · Guías— con
   conteo; el filtrado reordena la cuadrícula con animación de layout.
2. Artículo destacado grande, el más reciente.
3. Cuadrícula con **portadas tipográficas generadas**: cada artículo enseña en
   grande su cifra clave («$850.000», «5 días», «mes 3 a 6», «24 h») sobre una
   textura por categoría. **Sin fotos de banco.** La misma pieza sirve de
   `og:image` vía `next/og`.
4. Hover: la cifra se desplaza levemente y el subrayado del título crece.

## Artículo (`/blog/[slug]`)

- Barra de progreso de lectura en CSS con `animation-timeline: scroll()`, con
  respaldo estático.
- Índice fijo con scroll-spy en escritorio; plegable en móvil.
- La «Respuesta corta» como recuadro destacado al inicio: ayuda al lector y a
  los resúmenes de IA.
- Tablas con estilo propio, desplazamiento horizontal en móvil con sombra
  indicadora y primera columna fija. **Las reglas de tabla de `.legal` ya
  existen y se añadieron porque el artículo del dominio desbordaba a 390 px.**
- Citas destacadas con tratamiento tipográfico.
- CTA contextual por categoría: precios → `PriceCard` pequeña desde `CATALOGO`;
  SEO → enlace a la calculadora.
- Caja de autor (foto de Luis, una línea, LinkedIn), fecha de actualización
  visible, dos relacionados y «Siguiente artículo».
- **Medida de línea ≤ 68ch e interlineado ~1,65, aplicados a `p`, `li`, `dd` y
  `blockquote`, no solo a `p`.** Es el arreglo que se lleva ~130 de los 246
  hallazgos de medida del sitio.

## Cuidado con

- El par de idiomas del blog **no** sale de `lib/rutas.ts` como el resto: sale
  de `slugEmparejado()` en `lib/blog-slugs.ts`. Añadir un artículo es añadir el
  par ahí.
- Los dos artículos del chatbot llevan cifras de Meta con fecha: hay que
  repasarlos el 1 de octubre de 2026.

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
