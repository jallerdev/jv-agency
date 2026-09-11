---
version: 1
slug: "app-es-servicios-posicionamiento-seo-page-tsx"
primary_target: "app/(es)/servicios/posicionamiento-seo/page.tsx"
related_targets: ["app/(en)/en/services/seo/page.tsx","components/paginas/Seo.tsx","content/paginas/seo.ts"]
---

# Posicionamiento SEO · superficie de servicio

**Modo:** Persuade.

## Diagnóstico medido

**23 hallazgos: la página con más del sitio, empatada con el artículo del
chatbot.** Nueve `icon-tile-stack` —es la que más azulejos de icono tiene—,
cuatro `nested-cards`, tres `line-length` y dos `tiny-text`.

Los tres `line-length` están localizados: son los `<span class="mt-1 block
text-sm">` de la lista de qué incluye el plan, a 14 px y ~695 px de ancho, lo
que da **100 caracteres por línea**. Es el peor dato de medida de todo el
sitio, y viene de que la regla global de 68ch solo cubre `<p>`.

## Estructura propuesta

1. `PageHero`. Bajo el H1, una barra de búsqueda que escribe una sola vez
   «funeraria en Cartagena» —el ejemplo del propio copy— y apunta a la pieza
   firma.
2. «No te voy a garantizar el primer puesto. Nadie puede.» como declaración
   tipográfica a todo el ancho.
3. SEO técnico vs. posicionamiento: dos columnas con dos iconos de estado, un
   check que se completa una vez y un ciclo que gira despacio.
4. `PainGrid` (4). **Aquí mueren la mayoría de los nueve azulejos.**
5. **Pieza firma.**
6. Precios: dos `PriceCard` desde `catalogo("auditoria")` y `catalogo("seoMes")`
   + la calculadora actual migrada a `AddOnCalculator`.
7. `InOutLedger`.
8. Proceso (5 pasos) y «cuándo se ve algo» (mes 0 → mes 6+) como timeline
   horizontal con la línea dibujada por scroll. **Sin eje numérico**: no se
   ilustran resultados.
9. Bloque de IA.
10. «Lo que puedes verificar hoy»: la primera tarjeta enseña **el JSON-LD real
    de esta misma página**, leído del esquema en tiempo de build. Es la prueba
    más honesta que el sitio puede dar.
11. `FaqAccordion` agrupado, `FinalCTA`.

## Pieza firma — «Completa la ficha y entra al mapa»

Fusiona el medidor de ficha (`FichaGoogle`, 7/10) y la demo del paquete local
(`BloqueLocalGoogle`). El usuario marca los campos que faltan; el anillo sube a
10/10 y el negocio de ejemplo entra al paquete de tres del mapa con animación
de layout mientras los competidores se reacomodan.

Se mantiene literal el texto «Ejemplo · no es un resultado real. El trabajo es
entrar en la lista, no prometer el primer puesto.»

## Cuidado con

- **No hay caso de SEO con seis meses cumplidos, y por eso esta página no
  enseña resultados de clientes.** Luis está construyendo uno con su propio
  sitio y **eso no se publica**. Ninguna pieza de esta página puede insinuar
  una posición ganada, un tráfico o un plazo de resultado.
- `SEO_PRICES.mesesParaResultados` es 6 y existe para el texto, no para una
  gráfica.

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
