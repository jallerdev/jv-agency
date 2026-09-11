# Línea base · Fase 0

**11 de septiembre de 2026.** Medido sobre el build de producción
(`next build` + `next start`), 59 rutas del sitemap, 1280 px, Chrome real.
Detector de Impeccable 4.1.1 + medición propia con Playwright para verificar lo
que el detector reportó.

---

## 1 · Lo que encontró el detector

**597 hallazgos brutos en las 59 rutas.** Después de registrar las decisiones de
marca del home como ignoradas: **494 reales**.

| Regla | Bruto | Veredicto |
|---|---:|---|
| `line-length` | 246 | **Real.** Cuatro causas, localizadas abajo. |
| `icon-tile-stack` | 103 | **Real.** El azulejo de icono de 44-48 px sobre el titular. |
| `hero-eyebrow-chip` | 55 | **Marca.** Es `.jv-eyebrow`, y está en el home. Registrada. |
| `kicker-above-heading` | 48 | **Marca.** Mismo elemento. Registrada. |
| `nested-cards` | 45 | **Real.** Tarjeta dentro de tarjeta. |
| `low-contrast` | 31 | **FALSO.** Verificado con el navegador. Ver §2. |
| `cramped-padding` | 26 | **Real.** |
| `all-caps-body` | 18 | **Real a medias.** Antetítulos de 31 a 52 caracteres: demasiado largos para ser rótulos. |
| `tiny-text` | 14 | **Decisión pendiente.** Son los 11 px de `--text-eyebrow`. |
| `radial-spotlight-glow` | 4 | **Marca.** Es `--bloom-brand`. **No** se silencia a nivel de regla: una quinta instancia sí sería un defecto. |
| `heading-rhythm` | 4 | **Real.** Cuatro h3 pegados al bloque de arriba. |
| `tight-leading` | 3 | **Real.** `line-height: 1.11`. |

Las cinco páginas con más hallazgos: `/servicios/posicionamiento-seo` (23),
`/servicios/chatbot-whatsapp` (22), `/diseno-de-paginas-web-en-cartagena` (22),
`/sectores/clinicas-y-consultorios` (21), `/sectores/salones-y-spas` (19).
Las tres con menos: `/sobre-nosotros` (1), `/blog` (1), `/agendar` (1) — y las
tres necesitan trabajo, lo que dice exactamente hasta dónde llega un detector.

## 2 · Los 31 `low-contrast` son un artefacto de medición

El detector los reporta como **1,0:1 «via analytic-gradient+alpha»**. Un texto
real nunca da 1,0:1; da 1,0:1 cuando el color de frente y el de fondo son el
mismo, que es lo que ocurre con un elemento en `opacity: 0`. El sitio entra con
`.jv-reveal[data-armed]:not(.in) { opacity: 0 }`, y el detector fotografía antes
de que el observador dispare.

Medido con Playwright, con el scroll recorrido y la entrada asentada, sobre
`/servicios/chatbot-whatsapp`:

| Elemento | Reportado | Medido |
|---|---|---|
| Antetítulo «Automatizaciones sobre WhatsApp» | 3,4:1 | **5,62:1** |
| «Proveedor de tecnología verificado por Meta» | 1,0:1 | **18,09:1** |
| «a tu nombre» | 1,0:1 | **18,09:1** |

**Contraste real bajo AA: 0.** Coincide con el barrido propio de las 59 rutas a
1440 y 390 px.

## 3 · Los 246 `line-length`, localizados

Medidos con un patrón real renderizado en la fuente y el tamaño de cada
elemento, no con `fontSize × 0.5`. Cuatro causas, y una sola de ellas explica la
mitad:

| Causa | Medida | Dónde |
|---|---|---|
| **`max-w-3xl` (768 px) con cuerpo de 18 px** | **86ch** | Servicios, sectores y las tres ciudades viejas. La causa más repetida del sitio. |
| **`<li>` de la prosa del blog, sin tope** | **88–91ch** | Los once artículos. La regla global de `68ch` solo cubre `main p`. |
| **`<span class="mt-1 block text-sm">` a 14 px** | **100ch** | La lista de qué incluye el plan de SEO. El peor dato del sitio. |
| **El aviso de copyright del pie, 12 px** | **82ch** | Las 59 rutas. Un hallazgo por página: 59 de los 246. |

Ninguna necesita rediseño: necesitan que el tope de medida deje de aplicarse
solo a `<p>` y que `max-w-3xl` no sea el ancho por defecto de un párrafo de
18 px.

## 4 · Inventario de componentes (extract)

**El kit que pedía el encargo ya existe a medias.** Lo que hay:

| Kit pedido | Ya existe | Usos | Qué le falta |
|---|---|---:|---|
| `EmptySlot` | `visuales/CasillaVacia` | 5 | Nada. Es el motivo más reconocible del sitio. |
| `ChatSimulator` | `visuales/HiloWhatsApp` | 4 | Aceptar guiones por página y botón «Repetir». |
| `ReadinessChecklist` | `visuales/ListaAcopio` | 6 | Anillo de progreso y enlace con la timeline. |
| `ProcessTimeline` | `visuales/RailPlazo` | 10 | Línea dibujada por scroll. |
| `BusinessProfileMeter` | `visuales/FichaGoogle` | 3 | Fusionarse con el siguiente. |
| `LocalPackDemo` | `visuales/BloqueLocalGoogle` | 4 | Fusionarse con el anterior. |
| `AddOnCalculator` | `visuales/SumadorSeo` | 2 | Generalizar a tiendas y precios. |
| `CoastMap` | `visuales/RailDistancia` | 6 | Sustituirlo: riel → mapa. |
| `MobileActionBar` | `BarraMovil` | 11 | Nada. Ya reserva su alto. |
| `FaqAccordion` | `Faqs` (Radix) | 6 | Agrupar por tema con 8+ preguntas. |
| Pieza firma de software | `visuales/PanelRolesCrm` | 1 | Animación de layout y contador. |
| «Esto lo haces tú» | `visuales/PanelAutonomia` | 3 | Volver interactivas las tres microdemos. |
| Selector de formato | `visuales/ArbolDecision` | 2 | Conservar la lógica; cambiar la piel. |

**Lo que hay que construir:** `PageHero` (4 variantes), `SectionIndex`,
`ContrastBlock`, `PainGrid`, `PriceCard` / `PriceTag`, `InOutLedger`,
`ProofCard`, `Breadcrumbs`, `FinalCTA` + `NextStep`, `CoastMap`.

**Código muerto:** `components/Credentials.tsx` — 0 usos.
**Sin migas en ninguna página**: el único `BreadcrumbList` del sitio está en el
artículo de blog.

## 5 · Las inconsistencias de la sección 9

### Resueltas en esta fase

1. **`/precios` no cobraba lo que el sitio cobra.** Le faltaban el chatbot de
   WhatsApp, su mantenimiento mensual y el piso del software —que decía «según
   alcance» con `PISOS.software` fijado en $2.000.000—. Ahora la tabla tiene
   ocho filas y sale de `CATALOGO`.
2. **El plazo de la tienda.** «3 semanas» en cinco sitios, «3 a 5» en otros
   dos. Gana **3 a 5**, y no por mayoría: en `PRICES.deliveryWeeks.ecom`, tres
   semanas es el tramo **urgente**, que lleva 25 % de recargo, y cinco es el
   estándar. El sitio anunciaba como normal un plazo que cobra aparte.
3. **Los precios escritos a mano en las tres ciudades viejas**, JSON-LD
   incluido. Ahora salen de `CATALOGO`.
4. **Barranquilla no ofrecía el chatbot** teniendo una sección entera de
   conversación de WhatsApp. Cartagena tampoco lo declaraba en su JSON-LD, y no
   mostraba la renovación anual.
5. **El CTA del hero de Barranquilla** decía «Cuéntame tu proyecto»; las otras
   seis ciudades dicen «Agenda una llamada».
6. **La tarjeta de Twitter de la portada se heredaba a las cuarenta internas.**
   Los dos layouts declaraban `twitter.title` y `twitter.description`
   literales, y Next fusiona los metadatos por objeto. Verificado corregido en
   ES y EN.
7. **Las tarjetas de precio de las ciudades** ya no son tres juegos distintos.

### Que el encargo daba por inconsistentes y NO lo son

- **El plazo del chatbot.** «De 1 a 5 semanas» es el rango de la línea entera;
  «de 2 a 5» es el del bot de **citas** en concreto
  (`A_PRICES.deliveryWeeks.citas` = 2 · 3 · 5), que es el que ofrecen los dos
  sectores. Son dos productos, no dos verdades. Sí estaba mal en Cartagena, que
  lo decía en una tarjeta de chatbot genérico; ahí se corrigió.
- **Las anclas `/#trabajo` y `/#portafolio`.** Las dos existen y apuntan a
  secciones distintas. No está roto; está mal nombrado.
- **«Logo y marca desde $650.000» no es un servicio del sitio.** Es
  `PRICES.marca.nada`, un extra del cotizador web. No se publica como línea.

### Abiertas, esperando decisión de Luis

- **El stack de `/sobre-nosotros` contradice a `/servicios/software-a-la-medida`.**
- **«BloomRose» vs «Bloomrose», e InvitiApp vs Hummik** en la bitácora.

## 6 · Donde el encargo y la medición no coinciden

El encargo se escribió antes del trabajo del 10 y 11 de septiembre. Gana lo
medido, como él mismo dice:

- **Siete páginas de ciudad, no tres.** Cuatro corren ya sobre
  `components/paginas/Ciudad.tsx`.
- **Once artículos de blog, no siete.** Las categorías ya son viables:
  Precios 4 · Guías 4 · Decisión 3.
- **La fuente única de precios ya existía** (`lib/quote.ts`, `PISOS`). Lo que
  faltaba eran los PLAZOS y el catálogo, que es lo que se añadió.
- **`--text-muted` ya se subió a 0,50** para pasar AA en todo el sitio.
- **Las reglas de tabla de `.legal`** ya existen.

## 7 · Decisiones que hacen falta antes de la fase 1

1. **Los 11 px del antetítulo** (`--text-eyebrow`). Pasan AA de contraste, pero
   14 hallazgos de `tiny-text` y 18 de `all-caps-body` dicen que algunos son
   demasiado largos para ser rótulos. ¿Se sube a 12 px, se acortan, o se queda?
2. **El stack de `/sobre-nosotros`**: ¿se quitan React Native, Expo y
   Kubernetes, o se matiza lo que dice la página de software?
3. **«BloomRose» / InvitiApp** en la bitácora de `/sobre-nosotros`.
4. **El horario de atención**, para la hora local en vivo de `/contacto`.
5. **La foto de Luis**, para `/sobre-nosotros` y la caja de autor del blog.

---

## 8 · Verificación al cerrar la fase 0

`next build` limpio. Barrido propio de las **59 rutas a 1440 y 390 px** sobre el
build de producción, con el scroll recorrido:

```
59 rutas x 2 anchos = 118 cargas
codigo!=200: 0 · contraste bajo AA: 0 · desbordes: 0 · errores de consola: 0
```

Un aviso sobre cómo medir contraste en este sitio, porque cuesta media hora
cada vez que se olvida: **hay que esperar a que la animación de entrada
termine**. Un elemento a mitad del fundido da un número real pero falso. El
párrafo del CTA naranja de la portada se leyó 4,29:1 a media transición y
**4,78:1 en reposo**, que es lo que vale y pasa AA para 17 px. El detector de
Impeccable comete ese error 31 veces y reporta 1,0:1, que es el fundido en su
primer fotograma.

El margen de ese párrafo es estrecho —`text-on-accent/80` sobre el naranja— y
conviene tenerlo anotado: cualquier bajada de la opacidad lo tumba.

### Lo verificado a mano después de los cambios

- `/precios`: ocho filas, con chatbot, mantenimiento y el piso del software.
  Su JSON-LD emite las ocho `Offer` con `UnitPriceSpecification` en las dos
  mensuales.
- Barranquilla y Cartagena: el chatbot aparece en las tarjetas y en el JSON-LD;
  Cartagena recupera la renovación anual.
- `twitter:title` y `twitter:description` propios en ES y EN.
- Ni un precio escrito a mano queda en las rutas públicas. El único que
  sobrevive está en `/lab`, que no está en el sitemap.

## 9 · Lo que destapó escribir `DESIGN.md`

Con el sistema escrito, el detector puede comparar cada tamaño de letra contra
la rampa. Nueve literales quedaban fuera. **Cinco eran un hueco del documento,
no del código**: la escala de INTERFAZ —1.25rem del título de tarjeta, 1.0625rem
del enlace de barra, 0.9375rem del botón, 0.875rem de las pastillas— existe y se
usa en todo el sitio, y `DESIGN.md` solo había recogido los siete papeles de
lectura. Ya está escrita.

**Los cuatro que quedan son deuda real, y se dejan marcados a propósito:**

- **`.legal` corre su propio ramal tipográfico** —`1.4rem` en el h2, `1.1rem`
  en el h3, `0.975rem` en el cuerpo—, ninguno coincide con un paso del sistema
  (`--text-h3` es 1.5rem y `--text-h4` 1.1875rem). Son cuatro documentos legales
  con su propia tipografía, y es la fase 5.
- **`MetaTechProvider`** usa `text-[13px]` y `sm:text-[1.75rem]` sueltos.

No se silencian: ninguno se ve en la portada, así que no hay prisa, pero
taparlos con un `ignore` sería justo la forma de que nadie los vuelva a mirar.

---

## 10 · Cierre de la medida de línea y del rótulo

Decidido con Luis después de la fase 0. **597 → 230 hallazgos.**

| Regla | Antes | Ahora |
|---|---:|---:|
| `line-length` | 246 | **0** |
| `tiny-text` | 14 | **0** |
| `all-caps-body` | 18 | 14 |
| `hero-eyebrow-chip` + `kicker-above-heading` | 103 | 0 (marca, registrada) |

### La medida, con dos reglas

```css
main :is(p, li, dd, dt, blockquote, figcaption, span):not([class*="max-w"]),
footer p:not([class*="max-w"])            { max-width: var(--maxw-prose); }
main :is(p, li, blockquote):is([class*="max-w-3xl"], [class*="max-w-4xl"])
                                          { max-width: var(--maxw-prose); }
```

La primera amplía a `li`, `dd`, `blockquote` y `span` lo que solo cubría `p`
—en un `span` el tope solo pica cuando es `display:block`, que era justo el
caso de 100ch— y mete el pie, cuyo aviso de copyright iba a 82ch en las 59
rutas. La segunda le quita el ancho de CONTENEDOR a los párrafos que lo habían
tomado por ancho de lectura: `max-w-3xl` son 768 px, que con cuerpo de 18 px
dan 86 caracteres. `max-w-2xl` se queda: 672 px dan ~75ch, el tope de la banda.

### El rótulo

- `--text-eyebrow` pasa de **11 px a 12 px**.
- Los **26 `text-[11px]`** y los `text-[0.7rem]` escritos a mano en componentes
  pasan a `text-xs`, que es el mismo escalón de 12 px. No quedaba ninguno.
- Nace **`.jv-eyebrow-frase`**: el rótulo sin mayúscula, para las frases
  largas. Se aplicó a las dos peores —la etiqueta de honestidad de tiendas
  (61 caracteres) y la línea de sinónimos de diseño web (45)— en los dos
  idiomas.
- **Los 14 `all-caps-body` que quedan son rótulos de 31 a 37 caracteres**
  —«Proyecto de estudio · Barranquilla», «Por escrito, antes de pagar nada»—
  que hacen trabajo de etiqueta y se leen bien. Se quedan.

### El stack de `/sobre-nosotros`

Partido en dos, que era la decisión de Luis: **«Con lo que construyo tus
encargos»** (frontend, backend, nube, datos) y **«Y además sé»** (móvil,
orquestación), este segundo con borde discontinuo y una nota que dice que es
experiencia y no oferta, y que las apps nativas siguen fuera. La contradicción
con `/servicios/software-a-la-medida` queda resuelta sin quitarle experiencia a
nadie.

### Verificación

`next build` limpio · 118 cargas · **0 no-200 · 0 bajo AA · 0 desbordes · 0
errores de consola**.

Y una corrección al guion de medida: esperaba **350 ms** tras el barrido de
scroll cuando `--dur-reveal` son 700 ms, así que leía los últimos elementos a
media transición y daba contrastes reales pero falsos. Ahora espera 1400 ms.
Es el mismo error que comete el detector, solo que el detector no espera nada.

---

## 11 · Los datos de Luis, y un sector que salió de la lista

Confirmados el 11 de septiembre de 2026.

- **«Bloomrose»**, con esa grafía. `/sobre-nosotros` escribía «BloomRose».
- **La bitácora enseña InvitiApp y Hummik**, los dos: eran dos listas distintas
  del mismo trabajo. La rejilla pasó de tres columnas a cuatro.
- **Horario de atención**, en `BUSINESS.horario` y no en el copy: lunes a
  viernes de 8:00 a 18:00, sábados de 9:00 a 14:00, zona `America/Bogota`.
  Vive ahí porque lo van a leer tres sitios —la hora local en vivo de
  `/contacto`, el `openingHoursSpecification` del dato estructurado y cualquier
  aviso de «fuera de horario» del formulario—, y escrito tres veces se
  desincroniza a la primera. Colombia no tiene horario de verano, así que el
  desfase es siempre −05:00 y no hay nada que ajustar dos veces al año.
- **Los sectores del NDA se publican**, y con eso se cierra el marcador de
  `content/paginas/sobre.ts`. Queda **un solo marcador abierto en todo el
  sitio**: las capturas móviles reales de `ComparadorAnchos.tsx`.

### Fintech no entra, y por qué queda escrito

La frase vieja decía «SaaS, fintech, logística». El portafolio personal de Luis
(`jaller-dev.vercel.app`) lista un proyecto etiquetado **«Fintech · integración
de pagos & reconciliación»**, y de ahí salió el primer borrador de esta página.
**Luis lo desmintió: nunca ha trabajado en fintech.** Manda él, no la otra
página.

Se deja el motivo escrito en el código para que, si alguien vuelve a ver esa
etiqueta en el portafolio y la trae para acá, sepa que ya se miró y se descartó
a propósito.

La regla de fondo, que es la misma que deja sin caso a la página de SEO: **un
sector que no se pueda sostener en una llamada no se publica, aunque esté
escrito en otro sitio.**
