---
version: 1
slug: "app-es-sobre-nosotros-page-tsx"
primary_target: "app/(es)/sobre-nosotros/page.tsx"
related_targets: ["app/(en)/en/about/page.tsx","components/paginas/Sobre.tsx","content/paginas/sobre.ts"]
---

# Sobre nosotros · superficie de marca personal

**Modo:** Persuade, con el producto siendo la persona.

## Diagnóstico medido

**1 hallazgo del detector**, y aun así es la página con menos personalidad del
sitio: sin foto, con tono de hoja de vida, y con datos que contradicen otras
páginas. Ningún detector mide eso.

**Las tres contradicciones, ya resueltas con Luis el 11 de septiembre de 2026:**

1. **El stack está partido en dos**: «Con lo que construyo tus encargos»
   (frontend, backend, nube, datos) y «Y además sé» (móvil, orquestación), este
   segundo con borde discontinuo y una nota que dice que es experiencia y no
   oferta, y que las apps nativas siguen fuera. Ya no contradice a
   `/servicios/software-a-la-medida`.
2. **«Bloomrose»**, con esa grafía, como el resto del sitio.
3. **La bitácora enseña InvitiApp y Hummik**, los dos: eran las dos listas
   distintas de un mismo trabajo. La rejilla pasó de tres columnas a cuatro.

## Estructura propuesta

1. Hero con **foto real de Luis**, grande, en su lugar de trabajo, y el H1
   «Diseño y código, en las mismas manos.» Si no existe:
   `[PENDIENTE: foto de Luis]`. **Nunca una imagen de banco.**
2. **Pieza firma.**
3. Cifras (3+, 11+, <24 h, 1) que cuentan una sola vez al entrar en vista.
4. Bitácora: timeline de lo construido —InvitiApp, HalcónOS, Hummik, Bloomrose,
   la verificación de Meta—. `[PENDIENTE: fechas de Luis]`.
5. Cómo trabajo (3 principios) y enlace a «Qué no hago» de la página de
   software.
6. Recomendaciones de LinkedIn con el componente del home.
7. Stack corregido. CTA personal con WhatsApp.

## Pieza firma — «Las mismas manos»

Una pieza de interfaz real —la tarjeta de Bloomrose, por ejemplo— con un
control deslizante vertical cuya manija es la «/». A un lado el diseño
terminado; al otro, el código que lo produce. En móvil, un toque alterna las
dos capas. Es la tesis de la marca hecha objeto.

## Cuidado con

- **Los sectores del NDA ya están publicados**: SaaS empresarial y B2B,
  logística, analítica deportiva y comercio electrónico. **Se nombra el sector y
  nunca el cliente**, que es lo que el acuerdo permite. El marcador se cerró.
- **Fintech NO entra**, aunque el portafolio personal de Luis
  (`jaller-dev.vercel.app`) liste un proyecto con esa etiqueta: Luis lo
  desmintió. Si reaparece, ya se miró y se descartó.
- Queda un solo marcador abierto en todo el sitio: las capturas móviles reales
  de `ComparadorAnchos.tsx`.
- Las cifras son verificables o no van. «11+» y «3+» tienen que poder
  sostenerse si alguien pregunta cuáles.

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
