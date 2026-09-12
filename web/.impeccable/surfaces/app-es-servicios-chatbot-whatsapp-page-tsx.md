---
version: 1
slug: "app-es-servicios-chatbot-whatsapp-page-tsx"
primary_target: "app/(es)/servicios/chatbot-whatsapp/page.tsx"
related_targets: ["app/(en)/en/services/whatsapp-chatbot/page.tsx","components/paginas/Chatbot.tsx","content/paginas/chatbot.ts"]
---

# Chatbot de WhatsApp · superficie de servicio

**Modo:** Persuade.

## Diagnóstico medido

**22 hallazgos en la línea base, y la página con más `nested-cards` del sitio
(6)**: tarjeta dentro de tarjeta, que es lo que aplana una jerarquía hasta que
todo parece igual de importante. Además 5 `icon-tile-stack` y 2
`cramped-padding`.

Los 4 `low-contrast` de esta página **se verificaron uno por uno con el
navegador y son falsos**: el detector mide antes de que asiente la entrada por
scroll y lee un elemento en `opacity: 0` como 1,0:1. Medido con el reveal
asentado, el antetítulo naranja da 5,62:1 y el titular 18,09:1.

El activo escondido: el sello de proveedor verificado por Meta, que es la única
credencial verificable del sitio y hoy es un bloque más.

## Estructura propuesta

1. `PageHero` con el sello de Meta como pieza principal de la derecha, con un
   brillo diagonal lento al pasar el cursor, en el ángulo de la «/».
2. `ContrastBlock` «Casi todos te revenden una plataforma. Yo conecto directo»,
   con el diagrama `Tu número → Tercero → Meta` frente a `Tu número → Meta`: al
   entrar en vista, el nodo del tercero se corta y la línea directa se dibuja.
3. `PainGrid` (4) con la barra «10 h vs 24 h» convertida en un reloj de 24
   horas: arco de 8 a. m. a 6 p. m., luego el anillo completo, con marcador a
   las 9:41 p. m., que es la hora de la conversación de ejemplo.
4. **Pieza firma.**
5. Notas de costos: el consumo de la API lo cobra Meta —ya está en
   `CATALOGO[chatbot].notas`— y el mantenimiento sale de
   `catalogo("chatbotMes")`, que se creó en la fase 0 y ahora también aparece
   en /precios. Miniilustración de estado: luz verde con plan, luz roja «token
   expirado, el bot dejó de responder» sin plan.
6. Qué incluye (6), `ProcessTimeline` con `PLAZOS.chatbot`, `FaqAccordion`,
   `FinalCTA`.

## Pieza firma — «Qué se puede automatizar»

Cinco tarjetas de producto a la izquierda, teléfono fijo a la derecha con
`ChatSimulator`. Al activar cada tarjeta, el teléfono reproduce su guion.

**Hoy solo existe el guion de agenda.** Los otros cuatro se escriben como
borrador de 3 a 5 burbujas en el tono del sitio, se marcan
`[PENDIENTE: aprobar guion]` y se listan en el PR.

## Cuidado con

- El 1 de octubre de 2026 Meta empieza a cobrar los mensajes de servicio. Hay
  que rehacer la cifra por mensaje de Colombia y cambiar «lo que cambia» por
  «lo que cambió», en los dos idiomas. Vale para esta página y para los dos
  artículos del chatbot.
- Los plazos: **«de 1 a 5 semanas» es el rango de la línea entera**; «de 2 a 5»
  es el correcto para el bot de CITAS en concreto
  (`A_PRICES.deliveryWeeks.citas`), y por eso los sectores lo dicen así. No son
  una inconsistencia: son dos productos.

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
