---
version: 1
slug: "app-es-servicios-tiendas-virtuales-page-tsx"
primary_target: "app/(es)/servicios/tiendas-virtuales/page.tsx"
related_targets: ["app/(en)/en/services/online-stores/page.tsx","components/paginas/Tiendas.tsx","content/paginas/tiendas.ts"]
---

# Tiendas virtuales · superficie de servicio

**Modo:** Persuade.

## Diagnóstico medido

Tiene el mejor material demostrativo del sitio —tres pantallas de compra, panel
de administración, comparación con Shopify y WooCommerce, cinco extras con
precio— y lo presenta como documento: todo en el mismo peso visual, de arriba
abajo.

La línea base del detector encontró **6 hallazgos** y ninguno estructural: el
antetítulo (marca), dos `all-caps-body`, un `tiny-text` de 11 px y un
`cramped-padding`. O sea: el problema de esta página **no lo ve un detector**.
Es que el mejor activo del sitio está enterrado en la mitad de un texto largo.

Se corrigió en la fase 0 que la meta descripción prometía «lista en 3 semanas»
mientras el cuerpo decía «3 a 5»: tres semanas es el tramo URGENTE del
cotizador, con 25 % de recargo.

## Estructura propuesta

1. `PageHero` con captura real de Bloomrose en marco de teléfono.
2. `ContrastBlock` «Casi todos te alquilan una plantilla. Yo te construyo la
   tienda.»
3. `PainGrid` (4).
4. **Pieza firma.**
5. Comparación Shopify / WooCommerce / A la medida en tabla de tres columnas,
   con las filas «El día 1 · Después · Por venta». La línea «Te lo digo aunque
   no me convenga» se trata como cita visible: la honestidad es el argumento.
   **Sin cifras inventadas de otras plataformas.**
6. Precio: `PriceCard` grande con `catalogo("tienda")` + `AddOnCalculator` con
   los cinco extras. La pasarela y la renovación como notas fijas junto al
   total; las dos ya viven en `CATALOGO[tienda].notas` y en
   `catalogo("renovacion")`.
7. «Y esto lo haces tú»: las tres microdemos se vuelven interactivas de verdad
   —escribir un precio y guardar, subir una foto con barra de progreso, marcar
   «Despachado» y ver el aviso al cliente—.
8. `InOutLedger`, `ReadinessChecklist` (8) + `ProcessTimeline` en semanas.
9. Bloomrose como caso de estudio con el formato del home.
10. `FaqAccordion` agrupado: Pagos y comisiones · Envíos · Operación ·
    Seguridad y datos.
11. `FinalCTA` «Mándame tu lista de productos» + `NextStep` → chatbot.

## Pieza firma — «Así compra tu cliente», en un solo teléfono

Un teléfono fijo mientras el usuario baja por los tres pasos. Ficha: la talla M
agotada se tacha con un temblor leve. Carrito: la línea de envío «calcula» y el
total se interpola. Pago: se elige Nequi, el botón pasa a carga y cae una
notificación de pedido pagado. Conserva la etiqueta «Ejemplo · pantallas de
muestra» que ya existe.

## Cuidado con

- El `tiny-text` de 11 px de esta página hay que mirarlo: si es `.jv-eyebrow`,
  es marca; si es texto de tabla, es un defecto.
- Los cinco extras tienen precio en `TOGGLES` de `lib/quote.ts`. La calculadora
  los lee de ahí; no se copian.

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
