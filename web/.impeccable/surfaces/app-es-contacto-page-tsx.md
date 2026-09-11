---
version: 1
slug: "app-es-contacto-page-tsx"
primary_target: "app/(es)/contacto/page.tsx"
related_targets: ["app/(en)/en/contact/page.tsx","components/paginas/Contacto.tsx","content/paginas/contacto.ts"]
---

# Contacto · superficie de conversión

**Modo:** Operate. El visitante viene a hacer una cosa: elegir por dónde habla.

## Diagnóstico medido

**4 hallazgos, 3 de ellos `icon-tile-stack`**: los tres canales están montados
como el azulejo de icono de 44 px sobre el titular, que es exactamente la
plantilla de tarjeta genérica.

El problema mayor no lo ve el detector: **repite a `/agendar`** —el mismo
formulario y casi los mismos tres beneficios—, así que dos rutas compiten por
la misma intención.

## La diferencia que se establece

**Contacto es para ELEGIR CANAL. Agendar es para reservar.**

1. Los tres canales como tarjetas grandes y tocables, cada una con su promesa
   de respuesta. Icono y titular en línea, no apilados.
2. **Hora local en vivo**: «Son las 3:12 p. m. en Turbaco», calculada en el
   navegador con `BUSINESS.zonaHoraria` (`America/Bogota`), y si está dentro
   del horario. **El horario ya está confirmado y vive en `BUSINESS.horario`**:
   lunes a viernes de 8:00 a 18:00 y sábados de 9:00 a 14:00. No se escribe en
   el copy: se lee de ahí, porque lo van a leer también el dato estructurado y
   cualquier aviso de «fuera de horario» del formulario.
3. La ficha «El estudio» como credencial compacta: quién responde, dónde, a
   quién atiende, idiomas. Sale de `lib/business.ts`.
4. Mapa SVG estilizado con el pin en Turbaco. **Sin iframe de Google Maps**:
   pesa, rastrea y contradice la promesa de velocidad.
5. En escritorio, canales a la izquierda y formulario a la derecha; en móvil, el
   formulario plegado bajo «O reserva aquí mismo».

## Cuidado con

- `BUSINESS.address` deja `street` y `postalCode` vacíos **a propósito**: no hay
  local y la dirección es la casa de Luis. El mapa marca Turbaco, no un punto
  exacto.
- El número de WhatsApp es uno solo y coincide con la ficha de Google. No se
  publica un segundo.

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
