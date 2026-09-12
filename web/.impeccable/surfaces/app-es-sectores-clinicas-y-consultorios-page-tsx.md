---
version: 1
slug: "app-es-sectores-clinicas-y-consultorios-page-tsx"
primary_target: "app/(es)/sectores/clinicas-y-consultorios/page.tsx"
related_targets: ["app/(en)/en/industries/clinics/page.tsx","components/paginas/Clinicas.tsx","content/paginas/clinicas.ts"]
---

# Clínicas y consultorios · plantilla de sector

**Modo:** Persuade, con una restricción legal encima.

## Diagnóstico medido

**21 hallazgos**: 6 `icon-tile-stack`, 4 `nested-cards`, 4 `line-length` y 2
`tiny-text`. Mismo esqueleto que salones.

## Pieza firma — «Lo que no voy a escribir, aunque me lo pidas»

Las frases —«resultados garantizados», «sin dolor», «recuperación en X días»—
se escriben y luego una barra de censura se desliza sobre ellas.

Justo después, el hueco del portafolio como `CasillaVacia`: «Sitio de salud
terminado, sin publicar hasta verificar la habilitación». Es la pieza más
honesta del sitio y tiene que verse como una decisión, no como un error.

## Resto

Una ficha de profesional de ejemplo —nombre, especialidad, registro—, el
recuadro de la Ley 1581 y el `BloqueLocalGoogle` reutilizado con «odontólogo en
Cartagena». `ProofCard`, precios desde `CATALOGO`, checklist, proceso y
`FaqAccordion`.

## Cuidado con

- **Ninguna pieza puede insinuar un resultado clínico.** Es el único sector del
  sitio donde una animación entusiasta se convierte en un problema legal.
- El mismo matiz del plazo del chatbot que en salones: «de 2 a 5 semanas» es el
  bot de citas y es correcto.
- El proyecto de salud no se publica hasta verificar la habilitación. El hueco
  se queda.

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
