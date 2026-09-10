# Revisión: el sitemap HTML de fpedraza.co

Pedido por Luis el 2026-09-10: «revisa esto y verifica cómo podemos aplicarlo
al proyecto» — <https://fpedraza.co/sitemap/>.

## Qué es lo que hace fpedraza

Una **página HTML** en `/sitemap/` —no el `sitemap.xml`, que es otra cosa— que
lista todo el contenido del sitio agrupado por categoría, con el número de
artículos entre corchetes y la fecha de cada uno en `YYYY-MM-DD`:

```
Branding [8]   Copywriting [3]   Diseño web [14]   SEO [27]
Marketing Digital [14]   Negocios digitales [12]   …
```

Dieciocho categorías, más de setenta artículos fechados entre 2022 y 2025, y
una sección aparte —«Ciudades y Países»— con una página por ciudad bajo
`/seo/{ciudad}/`: Medellín, Cartagena, Barranquilla, Cali, Bucaramanga, Santa
Marta, y varias internacionales.

## Por qué a él le sirve y a nosotros no

Una página así resuelve **un problema de profundidad**: cuando tienes cien URL,
la mayoría queda a cuatro o cinco clics de la portada, y ni Google ni una
persona llegan. El sitemap HTML las sube todas a dos.

**Ese problema aquí no existe.** Medido recorriendo el sitio desde la portada:

| A cuántos clics de la portada | URL |
|---|---|
| 0 | 1 |
| 1 | 19 |
| 2 | 17 |
| más de 2 | **0** |

Las 37 URL del sitio están enlazadas y ninguna pasa de dos clics. Una página
`/sitemap` sería una lista de treinta y siete enlaces que ya están en la
cabecera y en el pie: cero ganancia de rastreo, una URL más que mantener, y un
sitio que enseña una página de índice cuando no tiene contenido que indexar es
un sitio que parece más grande de lo que es. **No la hagamos.**

Lo que sí destapó el recorrido, y ya está arreglado: `/eliminacion-de-datos`
era la única huérfana —en el `sitemap.xml` y sin un solo enlace entrante—, y es
justo la URL que Meta comprueba para aprobar a un Tech Provider. Ya va en el
pie.

## Lo que sí vale la pena copiarle

Tres cosas, por orden de lo que rinde:

### 1. La cobertura de ciudades. Es lo único grande.

Él tiene siete ciudades colombianas con página propia; nosotros tres
—Cartagena, Barranquilla, Bogotá—. Y el patrón es el mismo que ya usamos:
servicio + ciudad, que es como se busca de verdad.

Faltan las obvias: **Medellín, Cali, Bucaramanga, Santa Marta**. Cada una es
una página nueva, no una plantilla rellenada: la nuestra de Cartagena tiene
contenido propio y no se puede clonar cambiando el nombre —Google lleva años
penalizando exactamente eso—.

Antes de escribir ninguna hay que decidir una cosa que no me toca a mí: **¿hay
intención de atender esas ciudades?** Una página que posiciona en Medellín trae
llamadas de Medellín. Si la respuesta es que sí, es el trabajo de SEO con más
retorno que le queda al sitio.

### 2. Categorías en el blog, pero todavía no.

Él agrupa setenta artículos en dieciocho categorías porque sin agrupar son
ilegibles. Nosotros tenemos **siete**, y siete caben en una pantalla. Categorizar
siete artículos en cinco grupos deja grupos de uno, que se lee como un sitio a
medio llenar.

El umbral razonable son unos quince artículos. Apuntado para entonces.

### 3. La fecha visible en el listado — ya la tenemos.

Él pone `2025-09-28` delante de cada título, y en artículos de precios la fecha
ES parte del contenido: un precio sin fecha al lado no se sabe si vale hoy.

Fui a añadirlo y ya estaba: `app/(es)/blog/page.tsx` pinta un `<time>` con su
icono junto a los minutos de lectura, y el `publishedAt` / `updatedAt` sale
además en el schema. No hay nada que hacer.

Lo que sí falta —y es de la misma familia— es que la fecha del listado usa
`publishedAt` y no `updatedAt`. En «cuánto cuesta una página web en Colombia»,
que se revisa cuando cambian los precios, el dato útil es cuándo se revisó por
última vez, no cuándo se escribió. Apuntado para cuando se toque el blog.

## Resumen

- Página `/sitemap` HTML: **no**. Con 37 URL a dos clics no compra nada.
- Huérfana de `/eliminacion-de-datos`: **arreglada**.
- Fecha en el índice del blog: **ya estaba**. Queda enseñar `updatedAt` en vez de `publishedAt`.
- Cuatro ciudades más: **es la decisión grande**, y es de Luis.
- Categorías del blog: **cuando haya quince artículos**.
