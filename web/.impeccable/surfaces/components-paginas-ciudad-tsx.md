---
version: 1
slug: "components-paginas-ciudad-tsx"
primary_target: "components/paginas/Ciudad.tsx"
related_targets: ["app/(es)/diseno-de-paginas-web-en-cartagena/page.tsx","app/(es)/diseno-de-paginas-web-en-barranquilla/page.tsx","app/(es)/diseno-de-paginas-web-en-bogota/page.tsx","content/ciudades/tipos.ts"]
---

# Ciudades · plantilla

**Modo:** Persuade. Siete páginas, dos arquitecturas, a propósito.

## Estado real

**Siete ciudades, no tres.** Cartagena, Barranquilla y Bogotá son archivos
sueltos de ~700 líneas cada uno: son las URL ya indexadas y **no se pone en
juego su posicionamiento por elegancia de código**. Medellín, Cali, Bucaramanga
y Santa Marta corren sobre `components/paginas/Ciudad.tsx` +
`content/ciudades/`. Portar las tres viejas es un trabajo aparte y verificable,
y sigue pendiente.

## Diagnóstico medido

Cartagena: 22 hallazgos —6 `icon-tile-stack`, 6 `line-length`, 4 `tiny-text`—.
Medellín, sobre la plantilla nueva: 10. La diferencia es la plantilla, y es el
mejor argumento para portar las tres viejas.

Los `low-contrast` de estas páginas se verificaron con el navegador y son
falsos: el detector mide antes de que asiente la entrada por scroll.

## Lo que se arregló en la fase 0

- Los **precios y los plazos estaban escritos a mano** en las tres páginas
  viejas —«desde $850.000», «3 semanas»—, incluido dentro del JSON-LD. Ahora
  salen de `CATALOGO`.
- **Barranquilla no ofrecía el chatbot** teniendo una sección entera de
  conversación de WhatsApp. Cartagena tampoco lo tenía en su JSON-LD.
- **Cartagena no mostraba la renovación anual**, que es la única línea que se
  vuelve a cobrar cada año.
- El CTA del hero de Barranquilla decía «Cuéntame tu proyecto» cuando las otras
  seis dicen «Agenda una llamada».
- El plazo del chatbot en Cartagena decía «de 2 a 5 semanas» —que es el del bot
  de citas— en una tarjeta de chatbot genérico.

## Pieza firma compartida — `CoastMap`

Sustituye a `RailDistancia`. Mapa SVG simplificado de la costa Caribe y Bogotá,
con Turbaco como origen. La ruta hacia la ciudad de la página se dibuja al
entrar en vista y el contador de kilómetros sube hasta el valor. Bogotá con
línea punteada, «a distancia». Las otras ciudades del mapa son enlaces internos.

## Común a las siete

- Cifras oficiales en grande, **con su fuente y su fecha debajo**, en formato de
  cita, contando una sola vez.
- Las mismas tarjetas de precio, desde `CATALOGO`.
- Portafolio con `ProofCard` y `CasillaVacia` «Sin cliente de [ciudad]» donde
  aplique.

## Específico

- **Cartagena:** los seis tipos de negocio con los nombres de barrios como
  textura tipográfica discreta; se mantiene la microdemo de la carta.
- **Barranquilla:** los porcentajes de empresas nuevas (34,9 % · 24,6 % ·
  12,1 %) como barras horizontales; el bloque de Carnaval como franja de
  calendario —octubre-noviembre: pedirla · enero: construirla · febrero:
  Carnaval—.
- **Bogotá:** las cinco localidades como barras horizontales; «Lo que cambia a
  tu favor / en tu contra» con el estilo de `InOutLedger`.

## La regla que impide que esto sea una doorway page

Está escrita en el tipo `Ciudad` de `content/ciudades/tipos.ts` y **es
obligatoria**: cada ciudad trae cifras propias de su cámara de comercio con
fuente citada, más la confesión de que no hay oficina ni cliente allá. Si
alguien añade una octava copiando el archivo y cambiando el topónimo, hay que
bajarla.

`Service` en el JSON-LD, **nunca `LocalBusiness`**. No hay local en ninguna de
esas ciudades y fingir una dirección es justo lo que Google castiga.

**Las páginas de ciudad no se traducen** y declaran `hreflang` solo `es-CO`.

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
