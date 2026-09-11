---
version: 1
slug: "app-es-agendar-page-tsx"
primary_target: "app/(es)/agendar/page.tsx"
related_targets: ["app/(en)/en/book-a-call/page.tsx","components/paginas/Agendar.tsx","components/ScheduleCall.tsx"]
---

# Agendar · superficie de foco

**Modo:** Operate. Una sola tarea.

## Diagnóstico medido

**1 hallazgo del detector.** El problema es de forma, no de estilo: el
formulario mide 979 px de alto y no cabe en una pantalla de 900, y pide seis
pastillas, cuatro campos, franjas horarias y un área de texto todo a la vez.

## Estructura propuesta

1. Encabezado simplificado —logo y «Volver»—; pie mínimo.
2. **El formulario es el hero** y en móvil queda visible sin hacer scroll.
3. Calendario propio: selección de fecha con animación, horarios como chips,
   barra «Paso 1 de 2», transición lateral entre pasos, validación en línea con
   mensajes que dicen qué corregir.
   - **Paso 1 · Quién eres:** nombre, correo, WhatsApp. Tres campos.
   - **Paso 2 · Qué necesitas:** servicio, fecha, franja y mensaje opcional.
   - El primer paso pide lo barato de dar, que es lo que sube la conversión de
     un formulario frío.
4. Estado de éxito: check animado, resumen del evento, «Añadir a Google
   Calendar», descarga `.ics`, y WhatsApp como alternativa.
5. Lateral con foto pequeña de Luis y los tres beneficios; «Qué pasa después»
   en tres pasos debajo.
6. Prellenado desde `/precios` y desde los CTA de servicio (`?servicio=tiendas`),
   con un chip del servicio elegido.

## Lo que NO se toca

`components/ScheduleCall.tsx` ya tiene la máquina de estados
—`idle → fecha → slots → enviando → éxito | error`—, la consulta de `freebusy`
contra Google Calendar, el 409 por franja ocupada y el respaldo a WhatsApp si
el envío falla. **Solo se le añade el eje de pasos y la validación por paso**:
«Continuar» no avanza con el paso 1 inválido, y el foco salta al primer campo
con error.

## Cuidado con

- `/api/schedule` **no valida correo ni teléfono en el servidor** y ninguna de
  las tres rutas de API tiene límite por IP. Es deuda declarada en la fase 5 del
  encargo; el rediseño del formulario no la resuelve y no debe ocultarla.
- El lead sale hacia HalcónOS por API key. Cualquier cambio de campos tiene que
  respetar el contrato.

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
