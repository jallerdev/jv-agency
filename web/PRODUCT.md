# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dueños de negocio pequeño y mediano en Colombia —principalmente la costa
Caribe: Turbaco, Cartagena, Barranquilla, Santa Marta— y, en menor medida,
Latinoamérica y clientes de habla inglesa. No son compradores técnicos: llegan
desde una búsqueda («cuánto cuesta una página web», «diseño de páginas web en
Cartagena»), casi siempre desde el teléfono, con dos preguntas antes que
ninguna otra: **cuánto cuesta y cuánto se demora**.

Tres situaciones se repiten y las páginas existen para atenderlas:

- **No tiene sitio.** Todo el negocio vive en Instagram o en WhatsApp y quiere
  algo propio que pueda mandar por un enlace.
- **Tiene sitio y no lo puede tocar.** Depende de un tercero para cambiar un
  precio o una foto, y le da pena mandar la dirección.
- **Ya cotizó en otra parte.** Viene a comparar contra un número que le dieron
  sin desglosar, y lo que decide la conversación es que aquí el número está
  publicado.

Un segundo público lee las mismas páginas: quien evalúa si Luis es una persona
sola o una agencia. La respuesta está escrita en el sitio a propósito.

## Product Purpose

`jvagencia.com` es el sitio comercial de JV Agencia —Luis Jaller, un estudio de
una persona en Turbaco, Bolívar— que vende diseño y desarrollo web, tiendas
virtuales, chatbots de WhatsApp, posicionamiento SEO y software a la medida.

El sitio no es un catálogo: es el primer filtro. Su trabajo es que quien no
encaja se retire antes de la llamada y quien encaja llegue con el precio, el
plazo y el alcance ya entendidos. El éxito se mide en llamadas agendadas y
conversaciones de WhatsApp que empiezan sabiendo el precio, no en visitas.

## Positioning

**«Diseño y código en las mismas manos»**, y la honestidad radical como
mecanismo, no como tono:

- Precios y plazos **publicados**, servicio por servicio, en la página y en el
  cotizador. Nadie más en el mercado local los publica juntos.
- Una lista explícita de **«lo que no entra»** en cada servicio, y una página
  de **«qué no hago»**.
- Separación declarada entre **proyectos en producción** (con dominio propio,
  enlazables y comprobables) y **proyectos de estudio**.
- Huecos de portafolio **dejados visibles** («Sin cliente de Bogotá», «Sitio de
  salud terminado, sin publicar hasta verificar la habilitación») en vez de
  rellenarlos.
- «Si no te sirvo, te lo digo» — incluido recomendar no contratar.
- **Proveedor de tecnología verificado por Meta**: la conexión de WhatsApp
  Business la hace Luis directamente, sin revender la plataforma de un tercero.

Una agencia vecina puede copiar la estética; no puede copiar publicar el precio
sin tener a quién culpar por él.

## Operating Context

- Se consulta casi siempre desde el teléfono, con datos móviles, y muchas veces
  fuera de horario de oficina. La velocidad de carga es parte del argumento de
  venta: un sitio lento contradice lo que vende.
- La conversión termina en uno de tres canales: el formulario de agenda (que
  consulta disponibilidad real en Google Calendar y crea el evento con Meet),
  WhatsApp, o correo.
- Los leads del formulario entran al CRM propio (HalcónOS) por API.
- Después del sitio, la conversación continúa en documentos de cotización en
  HTML (`public/*.html`), que tienen su propia familia visual —Fraunces + Plus
  Jakarta Sans, fondo claro imprimible— y **no siguen el sistema del sitio**.
- El sitio es la pieza de SEO del estudio: el copy está escrito contra
  intención de búsqueda colombiana y no se reescribe por motivos estéticos.

## Capabilities and Constraints

**Stack.** Next.js 16 (App Router, Turbopack) sobre Vercel, React 19,
TypeScript, Tailwind 3, pnpm. Dos layouts raíz por grupos de ruta: `app/(es)` y
`app/(en)`. Las páginas son Server Components salvo las islas con estado.

**Idiomas.** Español en la raíz, inglés bajo `/en/` con slug traducido. Traducir
una página es mover una línea de `PENDIENTES` a `RUTAS` en `lib/rutas.ts`; el
menú, el pie, el conmutador, el `hreflang` y el sitemap se enteran solos. El
blog es la excepción: su par sale de `slugEmparejado()`.
**Las páginas de ciudad no se traducen** —«diseño de páginas web en Cartagena»
no tiene búsqueda equivalente en inglés— y declaran `hreflang` solo `es-CO`.

**Una sola fuente de precios.** `lib/quote.ts`: `PRICES`, `A_PRICES`,
`SEO_PRICES`, los pisos publicados en `PISOS` y el formateador `money(n, idioma)`.
Ningún precio se escribe a mano en un componente. En inglés el punto separa
decimales, así que un precio en pesos formateado con el locale español se lee
como dólares: ese defecto ya salió a producción una vez.

**59 rutas** en el sitemap: portada, 5 servicios, precios, sobre, blog con 11
artículos, 2 sectores, 7 ciudades, contacto, agendar, 4 legales, y el espejo en
inglés de todo lo traducible.

**Constantes verificadas.** `lib/business.ts` es la fuente única del NAP y de
los datos legales, y su ortografía está atada a la verificación de Meta contra
el RUT: no se «corrige».

**Lo que el sitio no hace y no va a hacer:** aplicaciones nativas de iOS o
Android, pauta publicitaria, fotografía, ni pasarela de pago propia (la cobra
un tercero).

## Brand Commitments

- **Nombre y persona:** JV Agencia · Luis Jaller · Turbaco, Bolívar, Colombia.
- **Logo:** la barra inclinada «/», tipográfica, en `currentColor`.
- **Voz:** primera persona del singular, directa, cálida, colombiana sin exceso
  de regionalismos. Frases cortas. Nunca plural mayestático: es una persona.
- **El copy no se reescribe.** H1, H2, párrafos, preguntas y respuestas de FAQ,
  URLs y JSON-LD están optimizados para búsqueda y son contenido aprobado. El
  microcopy nuevo (errores de formulario, estados vacíos, etiquetas de
  controles) sí se escribe.
- **El home es la referencia visual.** Su lenguaje —oscuro `#080808`, acento
  naranja único `#E8623F`, Figtree y JetBrains Mono, sin sombras— gobierna el
  resto del sitio. Ver `DESIGN.md`.
- **Sin fotografía de banco.** Ninguna imagen de archivo, en ninguna página.
- **Los testimonios de LinkedIn se citan literales**, en su idioma original, y
  no se editan.

## Evidence on Hand

Lo que existe y se puede enseñar:

- **En producción, con dominio propio y enlazable:** HalcónOS
  (`halcon.jvagencia.com`, CRM propio), Hummik (`hummik.com`), Bloomrose
  (`bloomroseaccesorios.com`, tienda).
- **Proyectos de estudio, declarados como tales:** Animal Expert, Fta. Elka
  Gómez, Peluquería Marcopolo.
- **Cliente real autorizado a nombrarse:** Funeraria San Francisco de Asís
  (Cartagena).
- **Tres recomendaciones de LinkedIn** verificables, con nombre y cargo.
- **Verificación de Meta** como proveedor de tecnología.
- **Cifras oficiales de cámara de comercio** en cada página de ciudad, con la
  fuente y la fecha citadas.

Lo que **no** existe y no se puede inventar:

- **No hay un caso de SEO con resultados.** Ninguna página muestra posiciones
  ganadas, tráfico ni «resultados en X días». Luis está construyendo ese caso
  con su propio sitio; **eso no se publica** hasta que sea verificable.
- **No hay oficina ni cliente** en Medellín, Cali, Bucaramanga, Santa Marta ni
  Bogotá, y cada una de esas páginas lo dice.
- No hay fotografía propia de Luis publicada en el sitio.
- No hay capturas móviles reales para el comparador de anchos.
- Los sectores de los proyectos bajo NDA siguen sin definir.

Un marcador `[PENDIENTE: …]` es la única forma permitida de dejar un hueco de
dato: visible en desarrollo, nunca en producción.

## Product Principles

1. **El precio va primero y completo.** Si una página habla de un servicio,
   dice cuánto cuesta y cuánto tarda, y lo que no incluye.
2. **Demostrar, no afirmar.** La tesis «diseño y código en las mismas manos» se
   prueba con piezas interactivas que funcionan, no con adjetivos.
3. **El hueco vale más que el relleno.** Un espacio vacío declarado es prueba
   de honestidad; un testimonio inventado destruye el único diferencial.
4. **Rápido de verdad.** Ninguna decisión visual puede empeorar la carga: el
   sitio es la demostración del producto.
5. **Fácil de cambiar después.** Contenido tipado fuera de los componentes, un
   solo origen de tokens y un solo origen de precios. Cambiar un precio es
   cambiar una línea.

## Accessibility & Inclusion

AA como piso medido, no aspirado: 0 textos por debajo de 4,5:1 sobre el fondo
real, verificado por barrido en las 59 rutas a 1440 y 390 px. Foco visible en
todo lo interactivo, objetivos táctiles ≥ 44 px, un solo `h1` por página, sin
saltos de nivel, sin desborde lateral. Toda demo interactiva se opera con
teclado y funciona con `prefers-reduced-motion`. El público real navega con una
mano, en la calle, con datos móviles.
