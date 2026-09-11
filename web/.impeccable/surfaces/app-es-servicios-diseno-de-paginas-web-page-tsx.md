---
version: 1
slug: "app-es-servicios-diseno-de-paginas-web-page-tsx"
primary_target: "app/(es)/servicios/diseno-de-paginas-web/page.tsx"
related_targets: ["app/(en)/en/services/web-design/page.tsx","components/paginas/Web.tsx","content/paginas/web.ts"]
---

# Diseño de páginas web · superficie de servicio

**Modo:** Persuade. El visitante decide y actúa.

## Diagnóstico medido

La página más larga del sitio: ~14 secciones y 15 preguntas frecuentes, sin
índice, sin progreso y sin forma de saltar a «precio». Todos sus bloques pesan
igual, de modo que el selector de formato, la lista de acopio, el riel de plazo
y el riel de distancia se leen como cuatro párrafos más.

El detector, en la línea base del 11 de septiembre de 2026 (1280 px, sobre el
build de producción), encontró aquí **14 hallazgos**: 8 `icon-tile-stack`
—la rejilla de seis dolores y las tres tarjetas de formato usan el azulejo de
44-48 px sobre el titular, que es la plantilla de tarjeta de IA—, 2
`cramped-padding` y 4 de la familia del antetítulo, que son decisión de marca y
ya están registrados como ignorados.

## Estructura propuesta

1. `PageHero`, variante servicio, con el ticket visible —piso, plazo y «Luis
   Jaller»—. El piso y el plazo salen de `catalogo("landing")`.
2. `ContrastBlock` «Casi nadie publica precio y plazo juntos», convertido en
   una tabla mínima de tres filas por tres columnas, derivada SOLO de lo que
   dice el copy actual.
3. `PainGrid` con los seis problemas, en bento asimétrico. **Aquí muere el
   azulejo de icono**: icono y titular en línea, o el icono sin caja.
4. Precio y plazo: el selector «¿Vas a cobrar en línea?» abre la sección; la
   tarjeta recomendada se destaca con animación de layout y las otras se
   atenúan. La lógica actual del selector se conserva.
5. `InOutLedger`.
6. `ReadinessChecklist` y, a continuación, la pieza firma.
7. Trabajo: Bloomrose grande, HalcónOS y Hummik medianos, estudio pequeños.
8. `CoastMap` para «¿Buscabas un diseñador cerca de ti?».
9. `FaqAccordion` agrupado (15 preguntas, agrupadas por tema).
10. `FinalCTA` + `NextStep` → tiendas o SEO.

## Pieza firma — «Cinco días, en pantalla»

Pasos a la izquierda, marco de dispositivo `sticky` a la derecha que cambia con
cada paso: los archivos cayendo antes del día 1, el wireframe el día 1, el
marco partido en diseño y código los días 2 y 3 —la tesis del sitio en una
imagen—, el desdoble a teléfono y computador el día 4, y la barra de dirección
con candado y punto verde el día 5.

En móvil no hay `sticky`: cada paso lleva su ilustración en línea. Con
movimiento reducido, cada paso muestra su estado final.

## Cuidado con

- **El plazo de «5 días» es el tramo urgente del cotizador**
  (`PRICES.deliveryWeeks.landing.urgent` = 1 semana; el estándar son 2). Es la
  promesa publicada del sitio y no se toca sin decisión de Luis, pero no se
  refuerza con un contador que lo haga más rotundo de lo que es.
- Las tres tarjetas de formato son el sitio donde es más fácil acabar con «tres
  tarjetas iguales con icono», que la sección 11 del encargo declara no
  terminado.

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
