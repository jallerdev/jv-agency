---
version: 1
slug: "components-legalpage-tsx"
primary_target: "components/LegalPage.tsx"
related_targets: ["app/(es)/privacidad/page.tsx","app/(es)/terminos/page.tsx","app/(es)/cookies/page.tsx","app/(es)/eliminacion-de-datos/page.tsx"]
---

# Legales · privacidad, términos, cookies, eliminación de datos

**Modo:** Read. Nadie llega aquí por gusto; llega a comprobar algo.

## Diagnóstico medido

`/privacidad`: **7 hallazgos, 6 de ellos `line-length`.** Es la superficie más
homogénea del sitio en su defecto: párrafos largos sin tope de medida.

## Qué se hace

Tipografía de lectura, índice con anclas, fecha de última actualización
—`LEGAL_UPDATED` en `lib/business.ts`— y barra de progreso.

**Ninguna otra animación.** Un documento legal con revelados por scroll parece
que esconde algo.

## Cuidado con

- La clase `.legal` de `app/globals.css` ya tiene reglas de tabla
  (`display:block; overflow-x:auto`) añadidas porque una tabla de tres columnas
  desbordaba a 390 px. Cualquier tabla nueva las hereda.
- El tope de medida tiene que cubrir `li`, no solo `p`: es donde está el
  problema.

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
