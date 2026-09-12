---
version: 1
slug: "app-es-precios-page-tsx"
primary_target: "app/(es)/precios/page.tsx"
related_targets: ["app/(en)/en/pricing/page.tsx","components/paginas/Precios.tsx","content/paginas/precios.ts"]
---

# Precios · superficie de conversión

**Modo:** Persuade. Es la página más cercana a la venta.

## Diagnóstico medido

El detector encuentra **2 hallazgos** y ninguno importa: el problema de esta
página no es visual, es que no hacía su trabajo.

En la fase 0 se arregló lo que sí era grave: **la tabla tenía seis filas y le
faltaban tres servicios que el resto del sitio sí cobra** —el chatbot de
WhatsApp, su mantenimiento mensual y el piso del software, que decía «según
alcance» teniendo `PISOS.software` fijado en $2.000.000—. Ahora las ocho filas
salen de `CATALOGO` en `lib/quote.ts`.

**Lo que sigue roto:** el bloque «Tu propuesta» muestra `$ —` en las cuatro
líneas. Es un configurador que no configura nada, en la página de conversión.

## Estructura propuesta

1. Hero: «Los precios, publicados.» y **la tabla ES el hero**. En el primer
   pantallazo se ven los números. Filas tipográficas grandes —servicio · desde ·
   plazo · enlace—, números tabulares, y al pasar el cursor por una fila
   aparece una línea de qué incluye.
2. **Pieza firma.**
3. «Lo que no está en estos precios»: pasarela, consumo de la API de Meta,
   pauta, fotografía, cada uno con quién lo cobra. Las dos primeras ya viven en
   `CATALOGO[*].notas`.
4. Tres tarjetas a los artículos «¿Cuánto cuesta…?» del blog.
5. `FaqAccordion` corto **reutilizando preguntas de precio que ya existen** en
   las páginas de servicio. Sin copy nuevo.
6. `FinalCTA`.
7. JSON-LD `Offer` por servicio, generado desde `CATALOGO`.

## Pieza firma — «Tu propuesta», como recibo

El bloque actual se vuelve un configurador real: control segmentado para el
formato, extras desde la fuente única y puesta en marcha. El recibo se imprime
línea por línea —el papel sale de una ranura, con borde perforado— y el total
se interpola. Al pie, «Luis Jaller · Turbaco, Bolívar · Por escrito, antes de
pagar nada».

Botón **«Llévala a la llamada»**: abre `/agendar` con la configuración en
parámetros de URL y «Cuéntame brevemente» ya prellenado.

Aviso visible y permanente: es una estimación, el número final va por escrito.

## Cuidado con

- El cotizador completo vive en `/cotizador`, detrás de contraseña y con
  `noindex`. **No se enlaza desde aquí**: dejaría al visitante en una pantalla
  de contraseña.
- La página existe para ser la fuente del precio. Cualquier número que aparezca
  aquí y no en `CATALOGO` es un error, no una excepción.

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
