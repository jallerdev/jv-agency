# Prompt — Elevar las páginas internas de jvagencia.com al nivel del home

> **Para quién es este prompt:** un agente de código (Claude Code u otro) con acceso al repositorio Next.js del sitio.
> **Cómo ejecutarlo:** por fases, un PR por fase (ver sección 10). No intentes hacerlo todo de una vez.
> **Herramienta de ejecución:** este prompt se ejecuta con la skill **Impeccable** (`/impeccable <comando>`). Este documento define _qué_ hacer en cada página; Impeccable pone el _cómo_ y las verificaciones. La sección 12 dice qué comando usar en cada fase y cómo evitar que rompa la marca. Si Impeccable no está instalada: `npx impeccable install` desde la raíz del proyecto.

---

## 1. Tu rol

Eres diseñador de producto senior e ingeniero frontend. Tu trabajo **no es rediseñar la marca**: el home de jvagencia.com ya define el lenguaje visual y es la referencia. Tu trabajo es que las 16 páginas internas se sientan hechas por la misma mano, con el mismo nivel de acabado, y que cada una tenga un momento memorable que demuestre lo que se vende en ella.

La tesis del sitio es "diseño y código en las mismas manos". Cada página interna debe **demostrar** esa tesis con piezas interactivas bien hechas, no afirmarla con más texto.

---

## 2. Contexto del sitio

- **Stack:** Next.js en Vercel. `theme-color` `#080808` (tema oscuro). Logo tipográfico "/". Versión ES y EN (`/en/...`).
- **Marca:** una sola persona, Luis Jaller, en Turbaco, Bolívar. El diferencial es la honestidad radical: precios y plazos publicados, lista de "lo que no entra", separación explícita entre proyectos en producción y proyectos de estudio, "si no te sirvo, te lo digo".
- **Tono:** directo, cálido, colombiano sin exceso de regionalismos. El copy es excelente y está optimizado para SEO. **No se toca** (ver reglas).
- **Lo que tiene el home y las internas no:** narrativa con ritmo (cada sección con un peso distinto), caso de estudio a fondo (Bloomrose), marquee de precios, sello de "Verificado por Meta", portafolio separado por "En producción / Proyectos de estudio", sección "Para quién" con imágenes reales, testimonios verificables de LinkedIn, y el formulario de agenda integrado.

### Mapa de páginas a trabajar

| Ruta                                                              | Tipo                  |
| ----------------------------------------------------------------- | --------------------- |
| `/servicios/diseno-de-paginas-web`                                | Servicio              |
| `/servicios/tiendas-virtuales`                                    | Servicio              |
| `/servicios/chatbot-whatsapp`                                     | Servicio              |
| `/servicios/posicionamiento-seo`                                  | Servicio              |
| `/servicios/software-a-la-medida`                                 | Servicio              |
| `/precios`                                                        | Utilidad (conversión) |
| `/sobre-nosotros`                                                 | Marca personal        |
| `/blog` y `/blog/[slug]`                                          | Contenido             |
| `/contacto` y `/agendar`                                          | Conversión            |
| `/sectores/salones-y-spas`, `/sectores/clinicas-y-consultorios`   | Sector (plantilla)    |
| `/diseno-de-paginas-web-en-cartagena`, `-barranquilla`, `-bogota` | Ciudad (plantilla)    |
| `/privacidad`, `/terminos`, `/cookies`, `/eliminacion-de-datos`   | Legal                 |
| `/en/*`                                                           | Espejo en inglés      |
| `404`                                                             | Nueva                 |

---

## 3. Diagnóstico (resultado del rastreo)

**El problema central es la monotonía estructural.** Las páginas de servicio, sector y ciudad repiten casi el mismo esqueleto, con el mismo peso visual en cada bloque:

```
Hero → "Casi todos hacen X. Yo hago Y." → "Esto te sirve si…" (4–6 tarjetas)
→ Precios → Qué entra / Qué no entra → Cómo se hace (timeline)
→ Checklist "0 de N listos" → Trabajo → FAQ (6–15 preguntas) → CTA final
```

Consecuencias concretas:

1. **Páginas muy largas sin orientación.** Diseño web tiene ~14 secciones y 15 preguntas frecuentes; SEO y software, 13–15. No hay índice, ni progreso, ni forma de saltar a "precio".
2. **Los mejores activos están enterrados.** Ya existen componentes interactivos valiosos que hoy se presentan como un bloque más del flujo: el selector de formato ("¿Vas a cobrar en línea?"), las pantallas de ejemplo de la tienda (ficha → carrito → pago), el panel de "esto lo haces tú", la conversación de WhatsApp, la barra "10 h vs 24 h", la calculadora de SEO, el medidor de la ficha de Google Business (7/10), la demo del paquete local "Sin ficha / Con ficha", el panel con roles (Administrador / Vendedor), la checklist y el riel de distancias (0 km → 1.000 km). **Estos son los protagonistas del rediseño.**
3. **Componentes duplicados con variaciones.** La tarjeta de precio, la timeline, la checklist, el chat de ejemplo, el riel de distancias y la demo del paquete local aparecen en varias páginas con diferencias menores. Hay que unificarlos en un kit.
4. **`/precios` es la página más débil** y de las más importantes: una lista corta, un "Tu propuesta" con valores vacíos (`$ —`) y enlaces. Además le falta el chatbot de WhatsApp.
5. **`/sobre-nosotros` es la página con menos personalidad**: sin foto, con un tono de hoja de vida que no suena como el resto del sitio, y con datos que contradicen otras páginas (ver sección 9).
6. **Blog:** listado plano de 7 artículos sin jerarquía, sin filtro por categoría y sin imagen. El artículo no tiene índice, autor, relacionados ni progreso de lectura.
7. **`/contacto` y `/agendar` repiten** el mismo formulario y casi los mismos tres beneficios.
8. **Metadatos sociales repetidos:** las páginas internas heredan `twitter:title` y `twitter:description` del home, y no tienen `og:image` propia.

> Nota: este diagnóstico salió de leer estructura, contenido y componentes interactivos, no el CSS renderizado. Por eso la Fase 0 genera `DESIGN.md` desde el código del home y corre `npx impeccable detect` contra las URLs reales, que sí inspecciona el diseño renderizado. Si esos resultados contradicen algo de esta sección, gana lo medido.

---

## 4. Reglas no negociables

1. **No reescribas el copy.** H1, H2, textos de párrafo, preguntas y respuestas de FAQ, URLs y JSON-LD se mantienen. Puedes reordenar secciones, agrupar, colapsar o convertir listas en tablas, pero todo el contenido debe seguir **renderizado en el HTML del servidor** (acordeones con `<details>` o equivalente, pestañas con todo el contenido en el DOM; nada cargado al hacer clic). Las únicas ediciones de texto permitidas son las correcciones de la sección 9, y deben listarse en el PR.
2. **El sitio vende "rápido de verdad".** Ninguna animación puede empeorar Core Web Vitals. Presupuestos en la sección 11.
3. **Reutiliza el sistema del home.** No inventes paleta, tipografías ni radios nuevos. Si algo falta, extiéndelo desde los tokens existentes.
4. **Una sola pieza firma por página.** Todo lo demás, sobrio. Si una página tiene dos momentos "wow", quita uno.
5. **Honestidad visual.** Todo mock lleva su etiqueta "Ejemplo · …" como hoy. Nunca inventes métricas, logos de clientes, testimonios, capturas de resultados ni cifras de posicionamiento. Si una pieza necesita datos que no existen (fechas, foto, horario de atención), deja un marcador visible `[PENDIENTE: dato de Luis]` y repórtalo en el PR.
6. **Una sola fuente de datos.** Precios, plazos y extras salen de un único módulo (`lib/pricing.ts` o similar) que alimenta todas las páginas, el marquee del home y el JSON-LD. Nada de precios escritos a mano en componentes.
7. **Accesibilidad completa.** Todas las demos se pueden usar con teclado, tienen foco visible, roles ARIA correctos y funcionan sin movimiento.

---

## 5. Fase 0 — Auditoría y sistema (antes de tocar UI)

1. `/impeccable init`: responde con las secciones 2 y 4 de este documento (audiencia, voz, honestidad radical, restricciones). Queda en `PRODUCT.md`. Elige `buildPath: code`: el sitio ya existe y se mejora en código, no desde comps.
2. `/impeccable document`: genera `DESIGN.md` a partir del código del home (colores, escala tipográfica, pesos, interlineados, radios, sombras, bordes, espaciados, ancho máximo). Revisa que refleje el home tal como está; ese archivo es la ley para el resto.
3. Línea base: corre `npx impeccable detect` contra cada URL de producción de la sección 2 y guarda los hallazgos. Luego `/impeccable critique` y `/impeccable audit` sobre las páginas internas. Contrasta sus conclusiones con el diagnóstico de la sección 3.
4. `/impeccable extract`: inventario de componentes de las páginas internas con sus duplicados (tarjetas de precio, timelines, checklists, chats de ejemplo, rieles de distancia, demos de ficha y paquete local, bloques "Entra / No entra", CTA finales), mapeados a los componentes del kit de la sección 7.
5. Crea la fuente única de precios y plazos, con esta forma mínima por servicio: `id`, `nombre`, `desde` (número en COP), `unidad` (`único` | `mes` | `año`), `plazo`, `extras[]` (con precio), `notas[]` (lo que cobra un tercero). Resuelve con ella las inconsistencias de la sección 9.
6. Convierte cada página de la sección 8 en su brief de superficie (`.impeccable/surfaces/<ruta>.md`): diagnóstico, estructura, pieza firma y restricciones. Así cada comando posterior trabaja con el plan de esa página y no improvisa.
7. Entregable: `PRODUCT.md`, `DESIGN.md`, los briefs de superficie, el reporte de línea base y la lista de inconsistencias resueltas. **Espera aprobación antes de la Fase 1.**

---

## 6. Sistema de movimiento

El movimiento tiene tres niveles. La mayoría del sitio vive en el nivel 1.

**Nivel 1 — Respuesta (en todas partes).** Todo lo que el usuario toca responde: botones, toggles, pestañas, acordeones, checklists, calculadoras, selección de fecha. Muestra qué cambió.

**Nivel 2 — Revelado (con moderación).** Solo para contenido que gana con aparecer en orden: una fila de cifras que cuenta hacia arriba una vez, una línea de timeline que se dibuja con el scroll, una lista de "no entra" que se sella. **No** pongas fade-up en cada sección: es la marca más reconocible de un sitio genérico.

**Nivel 3 — Pieza firma (una por página).** Una secuencia orquestada que demuestra el servicio. Especificadas en la sección 8.

### Tokens

```css
--dur-micro: 120ms; /* color, presión de botón */
--dur-ui: 220ms; /* toggles, pestañas, acordeones */
--dur-reveal: 560ms; /* revelados de nivel 2 */
--dur-set: 900ms; /* pasos de piezas firma */
--ease-out: cubic-bezier(0.22, 1, 0.36, 1); /* por defecto */
--ease-inout: cubic-bezier(0.65, 0, 0.35, 1); /* cambios de estado */
```

- Resorte para cambios de layout (Motion): `{ type: "spring", stiffness: 380, damping: 36 }`. Sin rebote en nada que no sea juguetón.
- Desplazamiento en revelados: 16 px, nunca más de 24 px.
- Escalonado: 60 ms, máximo 6 elementos; el resto aparece junto.
- Presión de botón: `scale(0.98)`. Hover de tarjeta: `translateY(-2px)` y borde más claro, solo dentro de `@media (hover: hover)`.
- Cifras que cambian (calculadoras, totales): interpolación del número con `font-variant-numeric: tabular-nums` y formato `es-CO`.

### El motivo de marca: la barra "/"

El logo es una barra inclinada. Úsala como el único motivo gráfico del movimiento, siempre con el mismo ángulo del logo:

- **Transición entre páginas:** un barrido diagonal breve (≤ 400 ms) con el ángulo de la barra. Con View Transitions si la versión de Next del proyecto lo soporta; si no, sin transición (no la simules con JS pesado).
- **Hover del logo:** la barra se redibuja (trazo SVG) en 300 ms.
- **Divisores y cursores de las demos** (por ejemplo, el control deslizante de "Sobre mí") usan la barra como forma.

### Implementación

- **Motion** (`motion/react`) con `LazyMotion` + `domAnimation` y componentes `m.*` para no cargar el paquete completo. Solo en islas de cliente; el resto de la página sigue siendo componente de servidor.
- **CSS primero** para lo simple: barras de progreso y líneas de timeline con `animation-timeline: view()` / `scroll()` dentro de `@supports`, con respaldo estático.
- **Secciones fijas con `position: sticky`**, no con JS que secuestra el scroll. **Prohibido** el smooth scroll artificial (Lenis y similares): afecta accesibilidad y la promesa de velocidad.
- Anima solo `transform`, `opacity` y `clip-path`. Nunca `height`, `top` o `width` directamente (para acordeones usa la técnica de `grid-template-rows: 0fr → 1fr`).
- **El H1 y el elemento LCP se pintan visibles desde el primer frame.** Nada de `opacity: 0` inicial en el hero principal. Puedes animar el subtítulo, los CTA o una decoración.
- `prefers-reduced-motion: reduce` → cada animación se reemplaza por un cambio instantáneo o un fundido de 120 ms. Las piezas firma muestran su estado final por paso.
- Pausa cualquier bucle fuera de pantalla o con la pestaña oculta.

---

## 7. Kit de componentes compartidos

Construye estos componentes una vez y úsalos en todas las páginas. Cada uno lee datos de la fuente única cuando aplica.

1. **`PageHero`** — variantes `servicio`, `sector`, `ciudad` y `utilidad`. Composición asimétrica: texto a la izquierda, a la derecha una pieza **real** (captura de un proyecto en producción, el sello de Meta, un ticket de precio), nunca una ilustración de relleno. Incluye migas de pan arriba y un "ticket" compacto con los tres datos que la marca promete: precio desde, plazo y "Luis Jaller".
2. **`SectionIndex`** — índice "En esta página" con scroll-spy, solo en páginas con 6 o más secciones. En escritorio (≥ 1280 px), riel fijo a la izquierda con el indicador activo deslizándose entre ítems (animación de layout). En móvil, un chip plegable bajo el hero. Los enlaces a "Precio" y "Preguntas" siempre visibles.
3. **`ContrastBlock`** — para el bloque "Casi todos hacen X. Yo hago Y." que abre casi todas las páginas. Dos columnas desiguales: la práctica común en tono apagado y la de JV en tinta plena. Al entrar en vista, una sola vez, la columna común se atenúa. Tipografía grande; es una declaración, no una tarjeta.
4. **`PainGrid`** — para "Esto te sirve si te pasa alguna de estas". Bento asimétrico (dos celdas grandes, el resto chicas), no la cuadrícula de tres columnas iguales. Las tarjetas con enlace a un artículo del blog lo muestran como una línea al pie.
5. **`PriceCard`** y **`PriceTag`** — una sola tarjeta de precio para todo el sitio: nombre, "desde", unidad, plazo, una línea de qué incluye, enlace al detalle. Tamaños `sm` / `md` / `lg`. Números tabulares.
6. **`AddOnCalculator`** — generaliza la calculadora de SEO: precio base + extras con toggles → total mensual y único, con el resumen fijo al lado en escritorio y abajo en móvil. Se usa en SEO, tiendas y precios. Siempre con el aviso de que el número final va por escrito.
7. **`InOutLedger`** — "Lo que entra / Lo que no entra". Dos columnas; las etiquetas de la columna "no entra" (`tu tarjeta`, `un fotógrafo`, `se cotiza aparte`, `no es lo mío`) se tratan como sellos que se estampan en secuencia la primera vez que la lista entra en vista (nivel 2). La frase "Esta lista vale más que la de arriba" gana protagonismo tipográfico.
8. **`ReadinessChecklist`** + **`ProcessTimeline`** — van juntos, porque el copy dice "el reloj arranca cuando llega el material". La checklist tiene un anillo de progreso y, al completarse, un cronómetro pasa de "Antes del día 1" a "Día 1" y la timeline de al lado se activa. La línea de la timeline se dibuja con el scroll (CSS). El estado de la checklist es solo visual; no se guarda.
9. **`ChatSimulator`** — la conversación de WhatsApp como componente reproducible: burbujas que aparecen en orden con indicador de "escribiendo…", horas, y la burbuja de traspaso a una persona con su estilo propio. Se reproduce una vez al entrar en vista, con botón "Repetir". Acepta guiones distintos por página.
10. **`ProofCard`** — tarjeta de proyecto con marco de navegador (barra de dirección con el dominio real) y una insignia que distingue sin ambigüedad `En producción` (punto verde con pulso lento) de `Proyecto de estudio` (sin punto, borde discontinuo). En producción, el marco es un enlace real.
11. **`EmptySlot`** — el componente de la honestidad: un espacio de portafolio intencionalmente vacío, con borde discontinuo y el texto que ya existe ("Sin cliente de Bogotá", "Sitio de salud terminado, sin publicar", "Lo que no tengo"). Se vuelve un motivo reconocible del sitio.
12. **`CoastMap`** — reemplaza el riel de distancias. Mapa SVG simplificado (costa Caribe y Bogotá) con Turbaco como origen; la ruta hacia la ciudad de la página se dibuja al entrar en vista y un contador de kilómetros sube hasta el valor. Bogotá con línea punteada ("a distancia"). Las otras ciudades del mapa son enlaces internos.
13. **`LocalPackDemo`** + **`BusinessProfileMeter`** — unifica la demo "Sin ficha / Con ficha" y el medidor de la ficha de Google Business (ver pieza firma de SEO).
14. **`FaqAccordion`** — con 8 o más preguntas, agrupadas por tema con pestañas o subtítulos (por ejemplo: Precio y pago · Plazos · Propiedad y control · Técnico · Riesgo). Todas las respuestas en el DOM, `FAQPage` JSON-LD sin cambios. Apertura con la técnica de `grid-template-rows`.
15. **`FinalCTA`** + **`NextStep`** — CTA final idéntico en estructura en todo el sitio, más una tarjeta de "siguiente paso lógico" (diseño web → tiendas o SEO; tiendas → chatbot; chatbot → software), siguiendo el orden que el propio sitio recomienda: primero la web, después el chatbot, luego el sistema.
16. **`MobileActionBar`** — barra inferior en móvil con "Agenda una llamada" y WhatsApp. Aparece después del hero y se oculta cuando el CTA final o el pie están en vista. Reemplaza al botón flotante de WhatsApp en móvil para no apilar dos elementos.
17. **`Breadcrumbs`** — en todas las páginas internas, con `BreadcrumbList` JSON-LD.

---

## 8. Página por página

Cada página indica: el diagnóstico corto, la estructura propuesta (orden de secciones) y su pieza firma. Lo que no se menciona se resuelve con el kit.

### 8.1 `/servicios/diseno-de-paginas-web`

**Diagnóstico:** la página más larga del sitio. Tiene el selector de formato, la checklist, la timeline de 5 días y el riel de distancias, todos con el mismo peso.

**Estructura:**

1. `PageHero` con el ticket "desde $850.000 · 5 días · Luis Jaller" visible: es exactamente la promesa de la sección siguiente.
2. `ContrastBlock` "Casi nadie publica precio y plazo juntos": convierte el párrafo en una tabla mínima de tres filas (unas agencias / otras / JV) por tres columnas (precio publicado · plazo publicado · quién programa), derivada solo de lo que dice el copy.
3. `PainGrid` con los 6 problemas.
4. Precio y plazo: el selector "¿Vas a cobrar en línea?" abre la sección. Al responder, la tarjeta recomendada se destaca con animación de layout y las otras se atenúan; con "Sí, quiero vender" aparece una tarjeta que lleva a tiendas. Revisa la lógica actual del selector y mantenla.
5. `InOutLedger`.
6. **Pieza firma** (abajo) con `ReadinessChecklist` justo antes.
7. Trabajo: Bloomrose grande con `ProofCard`, HalcónOS/Hummik medianos, proyectos de estudio pequeños.
8. `CoastMap` para "¿Buscabas un diseñador cerca de ti?".
9. `FaqAccordion` agrupado (15 preguntas).
10. `FinalCTA` + `NextStep`.

**Pieza firma — "Cinco días, en pantalla":** sección con los pasos a la izquierda y un marco de dispositivo fijo (`sticky`) a la derecha que cambia con cada paso:

- _Antes del día 1:_ logo, fotos y textos caen dentro del marco como archivos.
- _Día 1:_ aparece el wireframe en bloques grises.
- _Días 2 y 3:_ el marco se divide: a un lado el diseño se llena de color y tipografía; al otro, unas líneas de código real (cortas, JSX con clases) se escriben. Es la tesis del sitio en una imagen.
- _Día 4:_ el marco se desdobla en teléfono y computador, aparecen pines de comentario y se resuelven.
- _Día 5:_ barra de dirección con candado y `tumarca.com`, punto verde "En línea".

En móvil no hay sticky: cada paso muestra su ilustración en línea, animada al entrar en vista. Con movimiento reducido, cada paso muestra su estado final.

### 8.2 `/servicios/tiendas-virtuales`

**Diagnóstico:** tiene el mejor material demostrativo del sitio (tres pantallas de compra, panel de administración, comparación con Shopify y WooCommerce, cinco extras con precio), pero se lee como documento.

**Estructura:**

1. `PageHero` con captura real de Bloomrose en marco de teléfono.
2. `ContrastBlock` "Casi todos te alquilan una plantilla. Yo te construyo la tienda."
3. `PainGrid` (4).
4. **Pieza firma** (abajo).
5. Comparación Shopify / WooCommerce / A la medida: tabla de tres columnas con filas "El día 1 · Después · Por venta" y el veredicto de cada una. La columna "A la medida" destacada, pero la línea "Te lo digo aunque no me convenga" del bloque de Shopify se trata como cita visible: la honestidad es el argumento. Sin cifras inventadas de otras plataformas.
6. Precio: `PriceCard` grande de $2.500.000 + `AddOnCalculator` con los cinco extras. La pasarela y la renovación de $290.000 como notas fijas junto al total.
7. "Y esto lo haces tú": las tres microdemos se vuelven interactivas de verdad (escribir un precio → "Guardar" → check; subir una foto → barra de progreso → "Listo"; marcar "Despachado" → aviso "El cliente recibe el aviso").
8. `InOutLedger`, `ReadinessChecklist` (8) + `ProcessTimeline` (semanas).
9. Bloomrose como caso de estudio con el mismo formato del home.
10. `FaqAccordion` agrupado: Pagos y comisiones · Envíos · Operación · Seguridad y datos.
11. `FinalCTA` "Mándame tu lista de productos" + `NextStep` (chatbot).

**Pieza firma — "Así compra tu cliente", en un solo teléfono:** un teléfono fijo mientras el usuario baja por los tres pasos. Ficha: la talla M agotada se tacha con un leve temblor. Carrito: la línea de envío "calcula" y el total se interpola hasta $190.000. Pago: se elige Nequi, el botón pasa a estado de carga y cae una notificación "Pedido pagado · 11:04 p. m.". Todo con la etiqueta "Ejemplo · pantallas de muestra" que ya existe.

### 8.3 `/servicios/chatbot-whatsapp`

**Estructura:**

1. `PageHero` con el sello "Proveedor de tecnología verificado por Meta" como pieza principal de la derecha: brillo diagonal lento al pasar el cursor (con el ángulo de la "/").
2. `ContrastBlock` "Casi todos te revenden una plataforma. Yo conecto directo.", con un diagrama simple: `Tu número → Tercero → Meta` frente a `Tu número → Meta`. Al entrar en vista, el nodo del tercero se corta y la línea directa se dibuja.
3. `PainGrid` (4) acompañado de la barra "10 h vs 24 h" convertida en un reloj de 24 horas: un arco de 8 a. m. a 6 p. m. y luego el anillo completo, con un marcador a las 9:41 p. m. (la hora de la conversación de ejemplo).
4. **Pieza firma** (abajo).
5. Notas de costos: consumo de Meta (lo paga el cliente a Meta) y mantenimiento desde $180.000/mes, con una miniilustración de estado: luz verde con plan; luz roja "token expirado, el bot dejó de responder" sin plan.
6. Qué incluye (6), `ProcessTimeline` (1 a 5 semanas), `FaqAccordion`, `FinalCTA`.

**Pieza firma — "Qué se puede automatizar":** las cinco tarjetas de producto a la izquierda y un teléfono fijo a la derecha con `ChatSimulator`. Al activar cada tarjeta (scroll o clic), el teléfono reproduce su guion: respuestas automáticas, avisos, captura de interesados, agenda, pedidos. Hoy solo existe el guion de agenda: escribe borradores de 3 a 5 burbujas para los otros cuatro en el tono del sitio, márcalos `[PENDIENTE: aprobar guion]` y lístalos en el PR.

### 8.4 `/servicios/posicionamiento-seo`

**Estructura:**

1. `PageHero`. Debajo del H1, una barra de búsqueda que escribe una sola vez "funeraria en Cartagena" (el ejemplo del propio copy) y apunta a la pieza firma.
2. "No te voy a garantizar el primer puesto. Nadie puede." como declaración tipográfica a todo el ancho. Opcional: la frase genérica «top 3 en 60 días» aparece y se tacha.
3. SEO técnico vs. posicionamiento: dos columnas con dos iconos animados de estado: un check que se completa ("una vez") y un ciclo que gira despacio ("cada mes").
4. `PainGrid` (4).
5. **Pieza firma** (abajo).
6. Precios: dos `PriceCard` + la calculadora actual migrada a `AddOnCalculator`.
7. Qué incluye / qué no (`InOutLedger`).
8. Proceso (5 pasos) y "cuándo se ve algo" (mes 0 → mes 6+) como timeline horizontal con la línea dibujada por scroll. Sin eje numérico: no se ilustran resultados.
9. Bloque de IA ("que te nombre la IA").
10. "Lo que puedes verificar hoy": la primera tarjeta ("Este mismo sitio. Ábrele el código") muestra un bloque de código con **el JSON-LD real de esta misma página**, leído del esquema en tiempo de build. Es la prueba más honesta posible.
11. `FaqAccordion` agrupado, `FinalCTA`.

**Pieza firma — "Completa la ficha y entra al mapa":** fusiona el medidor de ficha (7/10) y la demo del paquete local. El usuario marca los campos que faltan (reseñas, publicaciones, preguntas); el anillo sube a 10/10 y, en el panel de al lado, el negocio de ejemplo entra al paquete de tres del mapa con animación de layout mientras los competidores se reacomodan. Mantén el texto "Ejemplo · no es un resultado real. El trabajo es entrar en la lista, no prometer el primer puesto."

### 8.5 `/servicios/software-a-la-medida`

**Estructura:**

1. `PageHero` con captura real de HalcónOS.
2. "¿Necesitas software o te sirve una página web?": dos tarjetas grandes "El problema está afuera / adentro" como selector; la elegida se expande con su recomendación. Debajo, la escalera "web → chatbot → sistema" en tres peldaños, que es el orden que el sitio recomienda.
3. `PainGrid` (6).
4. **Pieza firma** (abajo), seguida de los otros cinco tipos de sistema en bento.
5. Precio: "Lo que sube / Lo que lo baja" en dos columnas con indicadores de dirección, y "Cómo se paga" como una barra segmentada (anticipo · hitos · saldo) sin montos.
6. Qué incluye siempre; "Qué no hago" (7) como filas plegables: el título visible, el detalle al expandir. Recorta mucho largo sin quitar contenido del DOM.
7. `ProcessTimeline` (etapas), HalcónOS y Hummik con `ProofCard` y el aviso "producto propio, no encargos".
8. Stack en cuadrícula agrupada, con wordmarks monocromos.
9. `FaqAccordion` agrupado, `FinalCTA`.

**Pieza firma — "Un panel con roles, en dos clics":** el tablero ya existe; hazlo impecable. Al pasar de Administrador a Vendedor a comisión, las tarjetas del otro vendedor se colapsan con `AnimatePresence`, las columnas se reacomodan con animación de layout y el contador pasa de "8 negocios visibles" a 4 con interpolación. Extra opcional: arrastrar tarjetas entre columnas, solo si queda accesible con teclado.

### 8.6 `/precios` — reconstrucción

**Diagnóstico:** la página más débil y la más cercana a la conversión. Le faltan servicios y su "Tu propuesta" no hace nada.

**Estructura:**

1. Hero: "Los precios, publicados." y **la tabla de precios es el hero**: en el primer pantallazo se ven los números. Filas tipográficas grandes (servicio · desde · plazo · enlace), números tabulares; al pasar el cursor por una fila aparece una línea de qué incluye. Debe incluir todo lo que el sitio cobra: página web (landing $850.000, corporativa $1.750.000, rediseño según lo que haya), tienda online, chatbot (de $700.000 a $2.400.000 según el nivel), mantenimiento del chatbot ($180.000/mes), auditoría SEO, SEO local mensual, logo y marca (desde $650.000), renovación anual y software según alcance.
2. **Pieza firma** (abajo).
3. "Lo que no está en estos precios": pasarela de pago, consumo de la API de Meta, pauta, fotografía; cada uno con quién lo cobra.
4. Tres tarjetas a los artículos "¿Cuánto cuesta…?" del blog, para quien quiere comparar con el mercado.
5. `FaqAccordion` corto reutilizando preguntas de precio que ya existen en las páginas de servicio (sin copy nuevo).
6. `FinalCTA`.
7. JSON-LD `Offer` por servicio, generado desde la fuente única.

**Pieza firma — "Tu propuesta", como recibo:** el bloque actual se vuelve un configurador real: control segmentado para el formato, extras desde la fuente única y puesta en marcha. El recibo se imprime línea por línea (el papel sale de una ranura, con borde perforado) y el total se interpola. Al pie, "Luis Jaller · Turbaco, Bolívar · Por escrito, antes de pagar nada". Botón **"Llévala a la llamada"**: abre `/agendar` con la configuración en parámetros de URL y el campo "Cuéntame brevemente" ya prellenado. Aviso visible: estimación, el número final va por escrito.

### 8.7 `/sobre-nosotros`

**Diagnóstico:** no hay foto, el texto biográfico suena a hoja de vida y no al resto del sitio, y el stack y los proyectos no coinciden con otras páginas.

**Estructura:**

1. Hero con **foto real de Luis** (grande, en su lugar de trabajo; `[PENDIENTE: foto]` si no existe, nunca imagen de banco) y el H1 "Diseño y código, en las mismas manos."
2. **Pieza firma** (abajo).
3. Cifras (3+, 11+, <24 h, 1) que cuentan una sola vez al entrar en vista.
4. Bitácora: timeline de lo construido (InvitiApp, HalcónOS, Hummik, Bloomrose, verificación de Meta en julio de 2026). `[PENDIENTE: fechas de Luis]`.
5. Cómo trabajo (3 principios) y un enlace a "Qué no hago" de la página de software, para mantener la voz honesta.
6. Recomendaciones de LinkedIn: reutiliza el componente de testimonios del home.
7. Stack corregido (sección 9). CTA personal con WhatsApp.

**Pieza firma — "Las mismas manos":** una pieza de interfaz (por ejemplo, la tarjeta de Bloomrose) con un control deslizante vertical cuya manija es la "/". A un lado del control se ve el diseño terminado; al otro, el código que lo produce. En móvil, un toque alterna las dos capas. Es la tesis de la marca hecha objeto.

### 8.8 `/blog`

1. Hero con H1 y chips de filtro (Todos · Precios · Decisión · Guías) con conteo; el filtrado reordena la cuadrícula con animación de layout.
2. Artículo destacado grande (el más reciente).
3. Cuadrícula con **portadas tipográficas generadas**: cada artículo muestra en grande su cifra clave ("$850.000", "5 días", "mes 3 a 6", "24 h") sobre una textura por categoría. Sin fotos de banco. La misma pieza sirve de `og:image` vía `next/og`.
4. Hover: la cifra se desplaza levemente y el subrayado del título crece.

### 8.9 `/blog/[slug]`

- Barra de progreso de lectura (CSS con `animation-timeline: scroll()`, con respaldo).
- Índice fijo con scroll-spy en escritorio; plegable en móvil.
- La "Respuesta corta" como recuadro destacado al inicio (también ayuda a los resúmenes de IA).
- Tablas con estilo propio, desplazamiento horizontal en móvil con sombra indicadora y primera columna fija.
- Citas destacadas con tratamiento tipográfico.
- CTA contextual según la categoría (precios → `PriceCard` pequeña; SEO → enlace a la calculadora).
- Caja de autor (foto de Luis, una línea, LinkedIn), fecha de actualización visible, dos artículos relacionados y "Siguiente artículo".
- Medida de línea ≤ 68 caracteres, interlineado ~1,65.

### 8.10 `/contacto`

Hoy repite a `/agendar`. Diferéncialas: **contacto es para elegir canal**.

1. Los tres canales como tarjetas grandes y tocables, cada una con su promesa de respuesta.
2. Hora local en vivo: "Son las 3:12 p. m. en Turbaco", calculada en el navegador con la zona `America/Bogota`, y si está dentro del horario de respuesta `[PENDIENTE: horario de Luis]`. Es un detalle personal y verificable.
3. La ficha "El estudio" como una credencial compacta (quién responde, dónde, a quién atiende, idiomas).
4. Mapa SVG estilizado con el pin en Turbaco (sin iframe de Google Maps).
5. En escritorio, canales a la izquierda y formulario a la derecha; en móvil, el formulario plegado bajo "O reserva aquí mismo".

### 8.11 `/agendar`

Página de foco: una sola tarea.

1. Encabezado simplificado (logo y "Volver"); pie mínimo.
2. El formulario es el hero y en móvil queda visible sin hacer scroll.
3. Calendario propio: selección de fecha con animación, horarios como chips, barra de progreso "Paso 1 de 2", transición lateral entre pasos, validación en línea con mensajes que dicen qué corregir.
4. Estado de éxito: check animado, resumen del evento, "Añadir a Google Calendar" y descarga `.ics`, con WhatsApp como alternativa.
5. Lateral con foto pequeña de Luis y los tres beneficios; "Qué pasa después" como tres pasos debajo.
6. Prellenado desde `/precios` y desde los CTA de cada servicio (`?servicio=tiendas`), con un chip del servicio elegido.

### 8.12 Sectores (plantilla) — salones y clínicas

Misma plantilla, distinta pieza firma. El motivo del sector sale del contenido, no de un color nuevo.

**Salones y spas — pieza firma "La carta de servicios":** una carta de ejemplo (corte, color, uñas, spa) con precio o rango y duración. Al tocar un servicio, el `ChatSimulator` de al lado arranca con "Buenas, ¿tienen cupo el sábado para color?" y reproduce la conversación. Une las dos ideas centrales de la página: precio publicado y reservar sin veinte mensajes. El bloque "Y una que no voy a escribir: promesas de resultado" muestra esas promesas tachándose (nivel 2).

**Clínicas y consultorios — pieza firma "Lo que no voy a escribir, aunque me lo pidas":** las frases ("resultados garantizados", "sin dolor", "recuperación en X días") se escriben y luego una barra de censura se desliza sobre ellas. Justo después, el hueco del portafolio como `EmptySlot`: "Sitio de salud terminado, sin publicar hasta verificar la habilitación". Además: una ficha de profesional de ejemplo (nombre, especialidad, registro), el recuadro de la Ley 1581 y el `LocalPackDemo` reutilizado con "odontólogo en Cartagena".

En ambas: `ProofCard` con insignias claras, precios desde la fuente única, checklist + proceso y `FaqAccordion`.

### 8.13 Ciudades (plantilla) — Cartagena, Barranquilla, Bogotá

**Pieza firma compartida — `CoastMap`:** la ruta desde Turbaco hasta la ciudad de la página se dibuja y los kilómetros cuentan. La ciudad actual va resaltada; las otras son enlaces.

**Común a las tres:**

- Cifras oficiales en grande, con su fuente y fecha debajo (formato de cita), contando una sola vez.
- Las mismas seis tarjetas de precio en las tres (hoy cada ciudad muestra un conjunto distinto).
- Portafolio con `ProofCard` y el `EmptySlot` "Sin cliente de [ciudad]" donde aplique.

**Específico:**

- _Cartagena:_ los seis tipos de negocio con los nombres de barrios como textura tipográfica discreta; mantén la microdemo de la carta ("cazuela de mariscos").
- _Barranquilla:_ los porcentajes de empresas nuevas (34,9 %, 24,6 %, 12,1 %) como barras horizontales; el bloque de Carnaval como franja de calendario (octubre–noviembre: pedirla · enero: construirla · febrero: Carnaval). Unifica el CTA del hero con "Agenda una llamada".
- _Bogotá:_ las cinco localidades como barras horizontales animadas; "Lo que cambia a tu favor / en tu contra" con el estilo de `InOutLedger`.

### 8.14 Legales

Tipografía de lectura, índice con anclas, fecha de última actualización y barra de progreso. Ninguna otra animación.

### 8.15 `/en/*`

Paridad total de componentes. Formato de moneda y números con `Intl.NumberFormat` según el idioma (COP en ambos). Las páginas de ciudad no tienen versión en inglés: el selector ES/EN debe llevar a `/en` en lugar de mostrarse roto u oculto sin explicación, y los `hreflang` deben ser coherentes.

### 8.16 404 (nueva)

La "/" del logo grande, dibujándose. Texto en la voz del sitio (propuesta, a aprobar): "Esta página no existe. Los precios sí." con enlaces a precios, servicios y agendar.

### 8.17 Elementos globales

- **Encabezado:** fijo; al bajar se compacta con fondo desenfocado. "Menú" abre un panel a pantalla completa con los servicios y su precio "desde" (escalonado de 40 ms, trampa de foco, cierre con Esc).
- **Pie:** el wordmark "JV AGENCIA" se revela con `clip-path` al entrar en vista.
- **Imágenes sociales por página** con `opengraph-image.tsx`: plantilla oscura, la "/", el título de la página y un chip con el precio "desde" cuando aplique. Corrige `twitter:title` y `twitter:description` para que salgan de cada página.

---

## 9. Inconsistencias encontradas (resolver en la Fase 0 con la fuente única)

1. **`/precios` no incluye el chatbot de WhatsApp** (desde $700.000) ni su mantenimiento ($180.000/mes), aunque está en el home, en su página y en las ciudades.
2. **Plazo de la tienda:** "3 semanas" en la meta descripción de la tienda, en ciudades y en sectores; "3 a 5 semanas" en `/precios` y en el cuerpo de la página del servicio.
3. **Plazo del chatbot:** "de 1 a 5 semanas" en su página y en Bogotá; "de 2 a 5 semanas" en Cartagena y en los sectores.
4. **Sobre mí lista React Native y Expo** (móvil), mientras la página de software dice "no hago app nativa para Android o iOS". También incluye Kubernetes, que no aparece en software. Decide con Luis y deja una sola versión.
5. **Proyectos distintos:** Sobre mí muestra "BloomRose", HalcónOS e InvitiApp; el resto del sitio escribe "Bloomrose" y muestra Hummik en lugar de InvitiApp.
6. **CTA del hero de Barranquilla:** "Cuéntame tu proyecto" como acción principal; todas las demás páginas usan "Agenda una llamada".
7. **Tarjetas de precio distintas en cada ciudad:** Barranquilla no muestra el chatbot aunque tiene la sección de conversación de WhatsApp.
8. **Metadatos:** `twitter:title` y `twitter:description` del home repetidos en todas las internas; sin `og:image` propia; las páginas de ciudad no tienen `og:locale`.
9. **Anclas:** el botón del home "Ver mi trabajo" apunta a `/#trabajo` y el pie a `/#portafolio`. Verifica que ambas existan o unifica.

---

## 10. Fases y PRs

| Fase | Alcance                                                                                                                            | Comandos de Impeccable                                                                    | Espera aprobación |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------- |
| 0    | Contexto, sistema, línea base, fuente única de precios, correcciones de la sección 9                                               | `init`, `document`, `critique`, `audit`, `extract` + `detect`                             | Sí                |
| 1    | Kit de componentes (sección 7), sistema de movimiento (sección 6), encabezado, menú, pie, migas, `MobileActionBar`, transición "/" | `extract`, `animate`, `layout`                                                            | Sí                |
| 2    | Las cinco páginas de servicio                                                                                                      | Por página: `shape` → `layout` → `animate` (pieza firma) → `adapt` → `polish`             | Por página        |
| 3    | Precios, sobre mí, contacto, agendar                                                                                               | Igual que la fase 2, más `harden` en el formulario de agenda y el configurador de precios | Sí                |
| 4    | Plantilla de sectores y de ciudades (5 páginas)                                                                                    | `shape` de la plantilla una vez, luego `layout` + `animate` por página                    | Sí                |
| 5    | Blog, artículo, imágenes sociales, 404, legales, paridad `/en`                                                                     | `typeset` (lectura del blog), `harden` (i18n de `/en`), `delight` (404)                   | Sí                |
| 6    | QA completa (sección 11)                                                                                                           | `audit`, `optimize`, `polish` + `detect` en todas las URLs                                | —                 |
| 7    | Rendimiento en móvil (sección 13). Va **después** de la 6: optimizar mientras las páginas todavía cambian es medir humo            | `optimize`                                                                                | Sí                |

Cada PR incluye: capturas antes y después en 375 px y 1440 px, reporte de Lighthouse móvil, salida de `npx impeccable detect` antes y después, lista de cambios de texto (debería estar vacía salvo la sección 9) y la lista de `[PENDIENTE]`.

---

## 11. Criterios de aceptación

- Lighthouse móvil por página: rendimiento ≥ 95, accesibilidad 100, SEO 100.
- LCP < 2,0 s, CLS < 0,05, INP < 200 ms (en campo, vía Vercel Speed Insights, cuando haya datos).
- El JavaScript de cliente por página no crece más de 30 KB comprimidos respecto al estado actual; si una pieza firma lo exige, se carga con `dynamic()` cuando entra en vista.
- Con `prefers-reduced-motion`, todo el contenido y todas las demos funcionan.
- Todas las demos se pueden operar con teclado y lector de pantalla (roles, `aria-pressed`, `aria-live` para totales que cambian).
- Revisado en 375, 768, 1280 y 1536 px. Objetivos táctiles ≥ 44 px.
- Sin errores de hidratación ni advertencias en `next build`.
- H1, H2, URLs y JSON-LD idénticos al estado actual, salvo lo listado en la sección 9 (verificar con un diff del texto renderizado).
- Prueba final de estilo: si una sección se pudiera confundir con una plantilla genérica (tres tarjetas iguales con icono, fade-up en todo, gradiente morado), no está terminada.

---

## 12. Cómo usar Impeccable sin romper la marca

Impeccable tiene criterio propio, y eso es bueno. Pero este sitio ya tiene una identidad aprobada y un copy trabajado para SEO. Estas reglas mandan sobre las sugerencias de cualquier comando:

1. **El home no se toca.** Es la referencia de `DESIGN.md`. No corras `bolder`, `quieter`, `colorize` ni `typeset` sobre él.
2. **`distill` colapsa, no borra.** En este sitio, "quitar complejidad" significa agrupar, plegar y ordenar (FAQ agrupadas, filas expandibles, índice de página). Ningún párrafo, pregunta ni lista desaparece del HTML.
3. **`clarify` solo para microcopy nuevo:** mensajes de error del formulario, estados vacíos, etiquetas de controles de las demos, textos del estado de éxito. Nunca sobre titulares, párrafos ni FAQ existentes.
4. **Elecciones de marca que el detector puede marcar** (la fuente del sitio, el negro de fondo, el uso de separadores "·", las etiquetas sobre los titulares): si son decisiones del home, no se cambian. Regístralas con `npx impeccable ignores add-value <regla> <valor> --reason "Marca JV, definida en el home"` y sigue. Todo lo demás que marque el detector, se corrige.
5. **`overdrive` y `delight` con cuota:** como máximo uno de los dos por página, y solo para la pieza firma definida en la sección 8. Si el comando propone un segundo efecto llamativo, se descarta.
6. **`bolder`** solo si `critique` dice explícitamente que una página interna se queda corta frente al home, y solo sobre la sección señalada.
7. **`live` para iterar las piezas firma:** úsalo en el servidor de desarrollo local para comparar variantes de cada pieza firma antes de fijarla. Nunca contra el sitio en producción.
8. **Los límites de rendimiento de la sección 11 ganan** sobre cualquier efecto que proponga un comando. Si una animación no cabe en el presupuesto, se simplifica.

---

## 13. Fase 7 — Rendimiento en móvil

Va **después de la fase 6**, y el orden importa: optimizar mientras las páginas
todavía cambian es medir humo. Cuando la QA cierre, esto se mide, se arregla y
se vuelve a medir.

### Lo que hay hoy, medido y no supuesto

**PageSpeed Insights sobre producción, 11 de septiembre de 2026** —producción
corre el código ANTERIOR al rediseño de las internas, así que estos números son
la línea base del sitio publicado, no del trabajo nuevo:

| | Móvil | Escritorio |
|---|---|---|
| Rendimiento | **66** | 94 |
| First Contentful Paint | 3,6 s | 1,0 s |
| Largest Contentful Paint | **6,0 s** | 1,2 s |
| Speed Index | 5,9 s | 1,6 s |
| Total Blocking Time | 50 ms | 50 ms |
| Cumulative Layout Shift | 0 | 0 |

Accesibilidad 90 · Prácticas recomendadas 100 · SEO 100 en las dos.

**Y medido en local sobre el build nuevo**, con un teléfono emulado a 4× de CPU
y 4G lenta: FCP 2,37 s, LCP 2,37 s, CLS 0, 285 KB transferidos —171 KB de
JavaScript y 114 KB de fuentes—.

### Lo que esos números ya dicen

- **TBT de 50 ms y CLS de 0.** No es JavaScript ejecutándose ni contenido que
  salta: el problema es que el **primer pintado llega tarde**.
- **FCP y LCP coinciden**, en producción y en local. Cuando por fin se pinta
  algo, se pinta todo: hay una cadena de bloqueo antes del primer pixel.
- **El elemento LCP es un párrafo**, no una imagen. O sea que ni siquiera hay
  una imagen grande a la que culpar: lo que tarda es el texto en poder
  dibujarse.
- **114 KB de fuentes** frente a 171 KB de JavaScript. En una página de texto
  sobre fondo negro, las fuentes pesan casi tanto como todo el código.

### El trabajo, por orden de impacto probable

1. **Las fuentes primero.** Dos familias variables autoalojadas. Comprobar el
   rango de pesos que se usa de verdad, subsetear a latín, revisar
   `font-display` y precargar **solo** la que pinta el LCP. Un fallback con
   métricas ajustadas (`size-adjust`) para que el intercambio no mueva nada.
   Objetivo: bajar de 114 KB y que el texto sea visible antes de que llegue la
   fuente.
2. **El campo de manchas** (`components/Blobs.tsx`) cubre todo el sitio y es de
   cliente. Medir qué aporta a la cadena crítica; si estorba, que entre después
   del primer pintado.
3. **Inventario de JavaScript por ruta.** El encargo fija un techo de +30 KB
   comprimidos por página y la fase 2 añadió piezas de cliente. Medir ruta por
   ruta, y cortar lo que no pague su peso: importaciones de iconos sueltas,
   componentes de cliente que podrían ser de servidor.
4. **Por qué el LCP es un párrafo.** Si el H1 debería serlo y no lo es, algo lo
   está retrasando. Mirar la cadena completa: HTML → CSS crítico → fuente →
   pintado.
5. **Imágenes:** `priority` solo en la del hero de cada página, `sizes`
   correctos —los de las capturas se revisaron en la fase 2, el resto no— y
   formatos modernos.
6. **Cabeceras y caché en Vercel**, que es lo último y lo más barato.
7. **Volver a medir**: PSI sobre la URL de previsualización de la rama y, tras
   el merge, sobre producción. Con las mismas cinco métricas de la tabla.

### Criterios de aceptación de la fase

- Móvil **≥ 90** en las tres rutas que más entran: portada,
  `/servicios/diseno-de-paginas-web` y `/precios`.
- **LCP < 2,5 s** en el teléfono emulado, **CLS 0**, **TBT < 200 ms**.
- El presupuesto de JavaScript de la sección 11 se cumple ruta por ruta, no de
  media.
- Ni una animación de las piezas firma se quita para llegar a la cifra: si algo
  no cabe, se simplifica —que es lo que ya manda la sección 12.8—.
