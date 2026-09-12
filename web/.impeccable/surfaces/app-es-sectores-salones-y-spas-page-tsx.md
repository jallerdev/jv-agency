---
version: 1
slug: "app-es-sectores-salones-y-spas-page-tsx"
primary_target: "app/(es)/sectores/salones-y-spas/page.tsx"
related_targets: ["app/(en)/en/industries/salons-and-spas/page.tsx","components/paginas/Salones.tsx","content/paginas/salones.ts"]
---

# Salones y spas · plantilla de sector

**Modo:** Persuade.

## Diagnóstico medido

**19 hallazgos**: 6 `icon-tile-stack`, **6 `nested-cards`** —tarjeta dentro de
tarjeta, empatada con chatbot como la peor del sitio— y 2 `line-length`.

Comparte esqueleto con clínicas y con las páginas de servicio, y ese es el
problema de fondo: el mismo orden con el mismo peso en cada bloque.

En la fase 0 se corrigió que el plazo de la tienda decía «3 semanas», que es el
tramo urgente del cotizador con 25 % de recargo; ahora dice «3 a 5 semanas»
como su propia página de servicio.

## Pieza firma — «La carta de servicios»

Una carta de ejemplo —corte, color, uñas, spa— con precio o rango y duración.
Al tocar un servicio, el `ChatSimulator` de al lado arranca con «Buenas, ¿tienen
cupo el sábado para color?» y reproduce la conversación.

Une las dos ideas centrales de la página: **precio publicado** y **reservar sin
veinte mensajes**.

El bloque «Y una que no voy a escribir: promesas de resultado» enseña esas
promesas tachándose, una sola vez al entrar en vista.

## Resto

`ProofCard` con insignias claras, precios desde `CATALOGO`, `ReadinessChecklist`
+ `ProcessTimeline`, `FaqAccordion`. Todo lo demás sale del kit.

## Cuidado con

- El plazo del chatbot de esta página dice «de 2 a 5 semanas» **y está bien**:
  es el bot de CITAS, cuyo rango real es `A_PRICES.deliveryWeeks.citas` = 2 a 5.
  El «de 1 a 5» de la página de chatbot es el rango de la línea entera. No se
  «unifican».
- El motivo del sector sale del contenido, no de un color nuevo.

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
