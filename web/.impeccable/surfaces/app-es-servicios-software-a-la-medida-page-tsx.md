---
version: 1
slug: "app-es-servicios-software-a-la-medida-page-tsx"
primary_target: "app/(es)/servicios/software-a-la-medida/page.tsx"
related_targets: ["app/(en)/en/services/custom-software/page.tsx","components/paginas/Software.tsx","content/paginas/software.ts"]
---

# Software a la medida · superficie de servicio

**Modo:** Persuade.

## Diagnóstico medido

**14 hallazgos**: 6 `icon-tile-stack`, **5 `line-length`** y 1
`cramped-padding`. Los cinco de medida son párrafos con `max-w-3xl` —768 px— a
18 px de cuerpo, que dan 86 caracteres por línea. Es la causa más repetida del
sitio entero.

La página tiene el mejor activo interactivo del estudio, el panel con roles,
y lo enseña al mismo nivel que una lista.

## Estructura propuesta

1. `PageHero` con captura real de HalcónOS.
2. «¿Necesitas software o te sirve una página web?»: dos tarjetas grandes —«El
   problema está afuera / adentro»— como selector; la elegida se expande con su
   recomendación. Debajo, la escalera «web → chatbot → sistema» en tres
   peldaños, que es el orden que el propio sitio recomienda.
3. `PainGrid` (6).
4. **Pieza firma**, seguida de los otros cinco tipos de sistema en bento.
5. Precio: «Lo que sube / Lo que lo baja» en dos columnas con indicadores de
   dirección, y «Cómo se paga» como barra segmentada —anticipo · hitos ·
   saldo— sin montos. El piso (`catalogo("software")`, $2.000.000) y el plazo
   de primera versión (`PLAZOS.software`) ya vienen del catálogo.
6. Qué incluye siempre; «Qué no hago» (7) como filas plegables: título visible,
   detalle al expandir. **Nada sale del DOM.**
7. `ProcessTimeline` por etapas; HalcónOS y Hummik con `ProofCard` y el aviso
   «producto propio, no encargos».
8. Stack en cuadrícula agrupada, con wordmarks monocromos.
9. `FaqAccordion` agrupado, `FinalCTA`.

## Pieza firma — «Un panel con roles, en dos clics»

`PanelRolesCrm` ya existe y funciona: hay que volverlo impecable. Al pasar de
Administrador a Vendedor a comisión, las tarjetas del otro vendedor se colapsan
con `AnimatePresence`, las columnas se reacomodan con animación de layout y el
contador de negocios visibles se interpola. Arrastrar tarjetas entre columnas
es opcional y solo si queda accesible con teclado.

## Cuidado con

- **Esta página dice que no se hacen apps nativas de Android ni iOS**, y
  `/sobre-nosotros` lista React Native y Expo en el stack. La contradicción
  sigue abierta y necesita decisión de Luis: es la inconsistencia 4 del
  encargo.
- El piso no se negocia en la página: si el presupuesto no llega, el copy ya
  dice que se avisa en la llamada.

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
