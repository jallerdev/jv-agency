---
name: JV Agencia
description: Casi negro, un solo acento naranja y cero sombras — el sistema del home de jvagencia.com
colors:
  canvas: "#080808"
  canvas-tint: "#0d0908"
  surface: "#111111"
  surface-raised: "#171717"
  brand-500: "#e8623f"
  brand-600: "#db482d"
  brand-700: "#b63a24"
  brand-400: "#ec7e5e"
  accent-quiet: "rgba(232, 98, 63, 0.12)"
  accent-quiet-line: "rgba(232, 98, 63, 0.32)"
  text-strong: "#fafafa"
  text-body: "rgba(250, 250, 250, 0.62)"
  text-muted: "rgba(250, 250, 250, 0.50)"
  text-on-accent: "#080808"
  line: "rgba(255, 255, 255, 0.08)"
  line-soft: "rgba(255, 255, 255, 0.05)"
  line-strong: "rgba(255, 255, 255, 0.16)"
  state-muted: "rgba(255, 255, 255, 0.03)"
  state-hover: "rgba(255, 255, 255, 0.06)"
  success: "#4ade80"
  danger: "#f87171"
  warning: "#fbbf24"
typography:
  hero:
    fontFamily: "Figtree, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2rem, 5vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  display:
    fontFamily: "Figtree, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.25rem, 4.6vw, 3.875rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Figtree, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.625rem, 2.5vw, 2.375rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.012em"
  title:
    fontFamily: "Figtree, system-ui, -apple-system, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.011em"
  lead:
    fontFamily: "Figtree, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.0625rem, 1.35vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "-0.002em"
  body:
    fontFamily: "Figtree, system-ui, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.5556
    letterSpacing: "-0.002em"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.16em"
  ui-lg:
    fontFamily: "Figtree, system-ui, -apple-system, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  ui:
    fontFamily: "Figtree, system-ui, -apple-system, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.4
  ui-sm:
    fontFamily: "Figtree, system-ui, -apple-system, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.2
  ui-xs:
    fontFamily: "Figtree, system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.2
rounded:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "18px"
  xl: "24px"
  pill: "999px"
spacing:
  gutter: "1.25rem"
  section-y: "clamp(4.5rem, 9vw, 8.5rem)"
  header-h: "5.5rem"
  maxw: "1200px"
  maxw-narrow: "900px"
  maxw-prose: "68ch"
components:
  button-primary:
    backgroundColor: "{colors.brand-500}"
    textColor: "{colors.text-on-accent}"
    rounded: "{rounded.pill}"
    padding: "0.6875rem 1.375rem"
    height: "2.75rem"
  button-primary-hover:
    backgroundColor: "{colors.brand-600}"
    textColor: "{colors.text-on-accent}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text-strong}"
    rounded: "{rounded.pill}"
    padding: "0.6875rem 1.375rem"
    height: "2.75rem"
  button-icon:
    backgroundColor: "transparent"
    textColor: "{colors.text-strong}"
    rounded: "{rounded.md}"
    height: "2.75rem"
    width: "2.75rem"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-body}"
    rounded: "{rounded.lg}"
  card-interactive-hover:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text-body}"
    rounded: "{rounded.lg}"
  chip-off:
    backgroundColor: "{colors.state-muted}"
    textColor: "{colors.text-body}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 0.875rem"
  chip-on:
    backgroundColor: "{colors.brand-500}"
    textColor: "{colors.text-on-accent}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 0.875rem"
  eyebrow:
    backgroundColor: "transparent"
    textColor: "{colors.text-muted}"
    typography: "{typography.label}"
  eyebrow-sentence:
    backgroundColor: "transparent"
    textColor: "{colors.text-muted}"
    typography: "{typography.label}"
---

# Design System: JV Agencia

## Overview

**El taller a oscuras.** Un fondo casi negro donde lo único encendido es lo que
se puede tocar: el precio, el botón, el número del paso. El sistema se comporta
como un banco de trabajo bien iluminado en un cuarto oscuro — nada decora, todo
señala.

El mundo es **oscuro por decisión, no por moda**: `:root` es oscuro y no existe
modo claro. Hubo uno y se quitó porque apuntaba a variables inexistentes y nada
lo activaba nunca; si algún día hace falta para propuestas impresas, se escribe
entero y se prueba.

Tres reglas gobiernan el conjunto:

1. **Un solo acento.** El naranja `#E8623F` y nada más. El violeta y el teal de
   HalcónOS —el producto del que se portó este sistema— salieron a propósito:
   un producto puede permitirse dos colores funcionales; un estudio con dos
   acentos no tiene ninguno.
2. **Cero sombras.** La jerarquía la dan el escalón de superficie y el filete
   de 1 px. La escala `boxShadow` existe y vale `none` en todos sus niveles,
   para no romper los sitios de uso mientras se limpian.
3. **El negro es `#080808`, no `#000`.** Un negro puro sobre OLED se traga el
   borde de las superficies y la jerarquía desaparece.

**Antirreferencia declarada:** el sistema terracota-y-papel anterior (Fraunces
+ Plus Jakarta Sans sobre papel cálido). Leía como artesanal, y lo que vende el
estudio es software. Queda escrito para que nadie lo reintroduzca sin darse
cuenta. *Nota:* los nueve documentos de cotización en `public/*.html` sí usan
esa familia, a propósito y por separado — son papel imprimible, no sitio.

## Colors

### Marca

| Token | Valor | Trabajo |
|---|---|---|
| `brand-500` | `#E8623F` | **El acento.** Contrasta 5,5:1 como texto sobre `#080808`: AA a cualquier tamaño. |
| `brand-600` | `#DB482D` | Hover del CTA, un 8 % más oscuro. |
| `brand-700` | `#B63A24` | Pulsado. |
| `accent-quiet` | naranja al 12 % | Relleno de pastilla y de rótulo. |

**El naranja se reparte entre CINCO sitios y ninguno más:** el CTA primario, la
numeración de secciones y pasos, el subrayado que crece en el hover de un
enlace, el punto de «en línea», y el logo. Repartirlo más lo apaga.

**El texto sobre relleno naranja es casi negro, no blanco**, y es la decisión
que más sorprende del sistema: `#080808` sobre `#E8623F` da 5,96:1; el blanco
da 3,36:1 y no pasa AA.

### Neutros

`canvas` `#080808` · `canvas-tint` `#0d0908` (casi negro con sesgo cálido, solo
hero y cierre) · `surface` `#111111` · `surface-raised` `#171717`.

Los filetes son blanco con alfa, en tres pesos: `.05` (suave), `.08` (el de por
defecto), `.16` (fuerte). Las dos capas de estado —`.03` en reposo, `.06` en
hover— existen para que ningún hover tenga que inventarse un gris.

### Tinta

`text-strong` `#FAFAFA` · `text-body` blanco al 62 % · `text-muted` blanco al
**50 %**. Ese 50 no es redondeo: al 44 % daba 4,25:1 sobre el casi negro, por
debajo de AA, y es el color de `.jv-eyebrow` y de los placeholders, o sea de
todo el sitio. El mínimo exacto para 4,5:1 es 0,4605.

### Tripletas RGB, y por qué existen

Cada color usable con opacidad va **dos veces**: en hex y como tripleta
(`--brand-500-rgb: 232 98 63`). Tailwind no sabe meterle alfa a un `var()` que
contiene un hex: descarta la utilidad entera **en silencio**. Así se perdieron
ochenta reglas —`bg-surface/70`, `text-brand/10`, `border-brand/30`— que
parecían escritas y no existían en el CSS servido. **Si cambias un hex, cambia
su tripleta.**

## Typography

Dos familias, autoalojadas con `next/font/local` desde `app/fuentes.ts`:

- **Figtree** (variable 300–900) — titulares y cuerpo. Cubre el grotesk de los
  titulares, así que no entra ninguna familia nueva. Instrument Serif salió del
  sistema y con ella cuatro `woff2`.
- **JetBrains Mono** — rótulos, cifras de interfaz y código.

La escala vive en variables (`--text-hero` … `--text-eyebrow`) y todas las
medidas grandes son `clamp()`, así que no hay saltos por breakpoint.

**El cuerpo es 18 px con interlínea de 28** (`--lh-body: 1.5556`), que es lo
que corre en HalcónOS. El design system portado decía 15; al medirlo, el
producto usaba 15 para la tabla densa y 18/28 para el texto. La página estaba
tomando el tamaño de la tabla.

**Tracking negativo en los titulares** (`-0.03em` en hero y display, `-0.012em`
en sección) y **positivo y grande en los rótulos** (`0.16em`). Pesos: 600 en
titulares, 700 en lo que tiene que pesar, 400 en el cuerpo.

### La escala de interfaz

Los siete papeles de arriba cubren la lectura. **Debajo corre una escala de
interfaz** que no estaba escrita y sí está en uso, y por no escribirla el
detector la marcaba como salida del sistema:

| Paso | Valor | Dónde |
|---|---|---|
| `ui-lg` | 1.25rem | `.jv-titulo`, el título de tarjeta |
| `ui` | 1.0625rem | `.jv-navlink`, los enlaces de la barra |
| `ui-sm` | 0.9375rem | `.jv-boton` y `.jv-boton-2` |
| `ui-xs` | 0.875rem | `.skip-link`, pastillas y pies de tabla |
| `text-xs` | 0.75rem | cifras de las demos, horas, pies de fuente y el rótulo |

**Fuera de la escala, y es deuda anotada:** `.legal` corre su propio ramal
—1.4rem en el h2, 1.1rem en el h3, 0.975rem en el cuerpo— que no coincide con
ningún paso del sistema; y `MetaTechProvider` usa `text-[13px]` y `1.75rem`
sueltos. Ninguno es visible en la portada, así que ninguno se toca en caliente:
se alinean cuando les toque su fase.

**Medida de línea: 65–75 caracteres.** `main p` sin `max-w` propio hereda
`68ch`. El tope solo aplica a quien no declara el suyo: donde alguien escribió
`max-w-[46ch]`, esa decisión manda.

## Layout

- Contenedor `1200px`; variante estrecha `900px`; prosa `68ch`.
- Margen lateral `--gutter: 1.25rem` (`px-5`) en todas las secciones.
- Ritmo vertical `--section-y: clamp(4.5rem, 9vw, 8.5rem)`.
- Encabezado fijo de `5.5rem` **medido, no estimado**: a 4,5rem la barra
  desaparecía contra el hero, y en una portada larga el encabezado es el único
  elemento presente todo el rato.
- La barra de acción móvil reserva su alto en el flujo
  (`--barra-movil-h`, 4,3125rem + `env(safe-area-inset-bottom)`): es `fixed`, y
  sin reservarlo se sentaba encima de los últimos 76 px del pie.
- Objetivos táctiles ≥ 44 px, sin excepción. Los botones de icono son 44×44
  exactos con el icono a 20.

## Elevation & Depth

**Plano, con capas tonales.** No hay sombras. La profundidad se construye con
tres superficies (`canvas` → `surface` → `surface-raised`) y un filete de 1 px.
El único relieve permitido es `--inset-hairline`, un blanco al 6 % en el borde
superior.

Un gradiente y solo uno: `--bloom-brand`, naranja al 8 % en radial detrás de un
titular. Plano y barato.

## Shapes

Escala de radio: `4 · 8 · 12 · 18 · 24 · 999`. Tailwind reasigna sus nombres
(`rounded-3xl` → 24 px, `rounded-xl` → 12 px) para no reescribir los sitios de
uso. **Los botones y las pastillas son píldoras**; las tarjetas, 18 px.

La forma de marca es **la barra inclinada «/»** del logo, en `currentColor`.

## Components

- **`.jv-card`** — superficie + filete + 18 px de radio. Sin sombra.
  **`.jv-card-int`** añade el hover: el borde pasa a naranja y **no se mueve
  nada**. Una rejilla de siete tarjetas que saltan al pasar el ratón convierte
  el recorrido en un temblor; el color basta para decir «esto se toca».
- **`.jv-boton`** — píldora naranja, texto casi negro, 44 px de alto mínimo.
  **`.jv-boton-2`** es filete sin relleno y nunca compite: una pantalla tiene
  un solo CTA principal.
- **`.jv-chip`** con `-on` / `-off` — estado u opción.
- **`.jv-navlink`** — el filete naranja crece desde la izquierda en hover y
  queda fijo con `data-activo`, porque quien navega con teclado necesita ver
  dónde está sin pasar el ratón.
- **`.jv-eyebrow`** — rótulo en mono, 12 px, `0.16em`, `text-muted`. Es el
  marcador de sección del sistema y aparece en el home. Son 12 px y no 11
  porque a 11, en mayúscula y con ese tracking, era el texto más pequeño del
  sitio; 12 sigue siendo rótulo y se lee de un vistazo.
- **`.jv-eyebrow-frase`** — el mismo rótulo cuando lleva una FRASE y no una
  etiqueta. Misma familia, tamaño y color; **sin mayúscula** y con el tracking
  aflojado a `0.04em`. Existe porque las frases largas del sistema son
  justamente las etiquetas de honestidad —«Ejemplo · pantallas de muestra,
  producto y precios inventados», sesenta y un caracteres— y la mayúscula borra
  los ascendentes que dan forma a la palabra. **Regla: más de ~30 caracteres,
  va en `-frase`.**
- **`.jv-rule`** — filete arriba y aire. La alternativa a meter cada grupo en
  su propia caja, que es lo que aplana una página.
- **`.jv-titulo`** / **`.jv-lead`** — título de tarjeta y entradilla.

Todas van en `@layer components`, a propósito: así una utilidad escrita en el
sitio de uso sigue ganando (`jv-card bg-raised` cambia el fondo sin pelear con
la especificidad) y la clase da el valor por defecto, no la última palabra.

**`components/ui/button.tsx` delega en `.jv-boton` y `.jv-boton-2`**, no los
repite. Ahí vivía una segunda definición de botón escrita cuando el sitio era
bronce —con sombra y con `hover:-translate-y-0.5`— y el sitio acababa con dos
botones que se parecían sin ser iguales: la cabecera usaba la clase del sistema
y diecinueve archivos usaban el otro. `Eyebrow` de `components/ui/seccion.tsx`
hace lo mismo con `.jv-eyebrow`.

### El kit de las páginas internas

`components/kit/` — se construyen una vez y las leen todas las páginas. Todo lo
que tenga que ver con precio sale de `CATALOGO`:

| Componente | Qué hace |
|---|---|
| `Breadcrumbs` | Migas con su `BreadcrumbList`. `aria-current` solo en la última. |
| `PriceTag` · `PriceCard` | El precio en línea y en tarjeta. Números tabulares. |
| `PisoDeRuta` | El «desde» de una RUTA: la línea más barata que vende esa página. |
| `PageHero` | Hero asimétrico con migas, ticket y una pieza real a la derecha. |
| `ContrastBlock` | «Casi todos hacen X. Yo hago Y.» Dos columnas desiguales, 2/5 y 3/5. |
| `PainGrid` | Bento asimétrico. **El icono va en línea con el titular, nunca en un azulejo encima.** |
| `InOutLedger` | «Lo que entra / lo que no entra», con los sellos de quién cobra. |
| `ProofCard` | Marco de navegador. En producción enlaza y late; estudio va con filete discontinuo. |
| `SectionIndex` | Índice con seguimiento de scroll. Solo con seis secciones o más. |
| `FinalCTA` · `NextStep` | El cierre, idéntico en todas, y el siguiente paso lógico. |

### Foco

Anillo de `2px` en `brand-500` con `3px` de separación, en **todo** lo
interactivo. No se quita nunca.

## Motion

Una curva firma gobierna el sistema: **`--ease-ps: cubic-bezier(.2,.7,.2,1)`**,
que usan todos los reveal, lift y clip.

| Token | Valor | Uso |
|---|---|---|
| `--duration-quick` | 0.12 s | color, presión |
| `--duration-base` | 0.2 s | estados de interfaz |
| `--duration-slow` | 0.32 s | cambios mayores |
| `--dur-reveal` | 0.7 s | entrada al hacer scroll |
| `--dur-clip` | 0.9 s | barrido de imagen |
| `--dur-marquee` | 120 s | la marquesina |

Entrada: opacidad + `24px` de subida, con cascada de `80ms` por hijo
(`--i`). Las imágenes no suben: se descubren de abajo arriba con `clip-path`.

`prefers-reduced-motion` pone **todas** las duraciones y el desplazamiento a
cero desde `:root`; no hace falta apagarlas una por una en cada componente.

**El levantamiento de `.jv-lift` va dentro de `@media (hover: hover)`.** En una
pantalla táctil `:hover` no es un estado pasajero: se queda pegado después de
tocar y no se suelta hasta que tocas otra cosa, así que una tarjeta se quedaba
dos píxeles arriba sin forma de deshacerlo. La pulsación (`:active`, escala
0,985) sí va en todas partes: dura lo que dura el dedo encima.

**Los tres niveles de movimiento**, para que cada pieza sepa a cuál pertenece:

| Nivel | Qué es | Con qué se hace |
|---|---|---|
| 1 · Respuesta | Todo lo que se toca responde | `--duration-quick` y `--duration-base` con `--ease-ps` |
| 2 · Revelado | Lo que gana con aparecer en orden | `Reveal` / `.jv-reveal`, `--dur-reveal` |
| 3 · Pieza firma | Una por página, y solo una | Se define en el brief de esa página |

El encargo de las internas proponía una segunda pareja de curvas
(`--ease-out`, `--ease-inout`). **No entran**: el sistema ya tiene cinco curvas
con trabajo asignado y `--ease-ps` es la firma. Dos sistemas de easing
conviviendo es exactamente cómo aparecieron los dos sistemas de botón.

La marquesina va a 120 s y no a los 45 de la referencia: con seis copias de
once frases el carril mide ~13.000 px, y a 45 s pasaría a 290 px/s — ilegible.

## Do's and Don'ts

**Haz**

- Saca los colores de los alias semánticos (`--accent`, `--surface`,
  `--text-body`), nunca de la rampa cruda.
- Usa el escalón de superficie y el filete para separar. Es el sistema entero.
- Pon el texto casi negro sobre cualquier relleno naranja.
- Cambia el hex **y** su tripleta RGB a la vez.
- Deja que `clamp()` haga el trabajo responsive de la tipografía.

**No hagas**

- **No añadas un segundo acento.** Ni teal, ni violeta, ni un «color de éxito»
  que se vea como marca. Verde, ámbar y rojo existen solo para estado.
- **No pongas sombras.** La escala vale `none` a propósito.
- **No escribas un precio a mano.** Salen de `lib/quote.ts` y se formatean con
  `money(n, idioma)`.
- **No uses `#000`.**
- **No pongas `opacity: 0` inicial en el H1 ni en el elemento LCP.**
- **No metas fotografía de banco**, en ninguna página, por ningún motivo.
- **No hagas que las tarjetas salten en hover.**
