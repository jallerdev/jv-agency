# Estado del rediseño — 10 de septiembre de 2026

Rama: `rediseno-naranja-bilingue`. **Sin desplegar**: el build está en verde,
pero no se hizo push a producción porque nadie ha revisado esto todavía.

---

## Lo que quedó hecho

### El sistema visual
La marca pasa a **naranja `#E8623F`** sobre `#080808`, con un solo acento
—fuera el violeta y el teal de HalcónOS— y sin sombras: la jerarquía la dan el
escalón de superficie y el filete de 1 px. Un solo origen de tokens
(`app/tokens.css`); `app/globals.css` ya no lo pisa.

### La portada, desde cero
Doce secciones en `components/sections/`, todas leyendo de `content/`:
hero, declaración, marquesina, caso a fondo, siete servicios, portafolio en
expedientes, proceso apilado, verticales, ficha del fundador, recomendaciones,
preguntas y agenda.

### Dos idiomas
Español en la raíz, inglés bajo `/en/` con **slug traducido**. Dos layouts raíz
(`app/(es)` y `app/(en)`) para que el `lang` del `<html>` diga la verdad sin
volver dinámico el sitio. `hreflang` recíproco con `x-default` al español.

**En inglés, hoy:**

| Español | Inglés |
|---|---|
| `/` | `/en` |
| `/precios` | `/en/pricing` |
| `/sobre-nosotros` | `/en/about` |
| `/contacto` | `/en/contact` |
| `/servicios/diseno-de-paginas-web` | `/en/services/web-design` |
| `/servicios/tiendas-virtuales` | `/en/services/online-stores` |
| `/servicios/chatbot-whatsapp` | `/en/services/whatsapp-chatbot` |
| `/servicios/software-a-la-medida` | `/en/services/custom-software` |
| `/servicios/posicionamiento-seo` | `/en/services/seo` |
| `/sectores/salones-y-spas` | `/en/industries/salons-and-spas` |
| `/sectores/clinicas-y-consultorios` | `/en/industries/clinics` |
| `/blog` | `/en/blog` |
| `/blog/[slug]` | `/en/blog/[slug]`, con slug traducido |

**Está todo.** `PENDIENTES` quedó vacío. Las tres de ciudad siguen sin par y es
a propósito: «diseño de páginas web en Cartagena» es SEO local y no tiene
búsqueda equivalente en inglés.

### Nuevo
- **Página de contacto** en los dos idiomas, con las tres vías y la agenda.
- **La marquesina pasa el catálogo con su precio de arranque** —los seis
  servicios— en vez del stack. Los pisos publicados salen de `PISOS` en
  `lib/quote.ts`, que es donde ya los leen las páginas de servicio: estaban
  copiados a mano en nueve componentes.
- **Agendamiento en dos pasos**, como el briefing de palo-seco. La lógica de
  reserva no se tocó.
- **Aviso de cookies con consentimiento previo**: GA4 arranca DENEGADO y solo
  sube si la persona acepta. Antes medía sin preguntar.
- **Límite por IP** en las tres rutas de API, y validación de correo y teléfono
  en el servidor de `/api/schedule`.

---

## Lo que falta

### 1. Los marcadores `[PENDIENTE]` que siguen abiertos
Se ven en desarrollo y `sinPendientes()` los quita en producción. Todos esperan
un dato que solo Luis tiene:

- Cuántas rondas de ajuste de diseño entran en el precio (`/servicios/diseno-de-paginas-web`).
- El piso por debajo del cual no vale la pena arrancar un software.
- El plazo típico de la primera versión útil de un software.
- Un caso real de posicionamiento con seis meses cumplidos.
- Los sectores de los proyectos bajo NDA (`/sobre-nosotros`).
- La fila de Colombia de la lista de tarifas de Meta, y el plazo para volver a
  pedir el check verde tras un rechazo (los dos artículos de chatbot).

### 2. La caducidad del 1 de octubre de 2026
El artículo del chatbot es el más perecedero del blog y ahora está en dos
idiomas, así que **hay que revisarlo dos veces**. Ese día Meta empieza a cobrar
los mensajes de servicio y publica lista nueva: toca revisar la sección «lo que
cambia el 1 de octubre», resolver los `[PENDIENTE]` y poner `updatedAt` en
`lib/blog.ts`. Si se actualiza uno solo, el otro queda cotizando las reglas del
trimestre pasado.

### 3. Decisiones de Luis, apuntadas y sin tocar
- **Cuatro ciudades más** —Medellín, Cali, Bucaramanga, Santa Marta—. Es el
  trabajo de SEO con más retorno que le queda al sitio, y depende de una
  respuesta que no es técnica: si hay intención de atender esas ciudades. Está
  razonado en `notas/SITEMAP-HTML-FPEDRAZA.md`.
- **Categorías en el blog**: cuando haya unos quince artículos. Con siete,
  agrupar deja grupos de uno.

### 4. SEO, cuando el rediseño esté aprobado
El orden acordado sigue en pie: sitemap (ya actualizado, 45 URL), lista de URLs
a indexar (está en `notas/URLS-A-INDEXAR.md`), auditoría de canibalización y
push a producción.

---

## Cómo quedó medido

| Qué | Resultado |
|---|---|
| Carga de 41 rutas × 2 anchos (1440 y 390) | 200, sin desborde lateral, sin errores de consola |
| Contraste de texto sobre el fondo real | 0 por debajo de AA |
| Anclas internas | 0 rotas |
| Castellano suelto en las 19 rutas `/en` | 0 fragmentos, 0 guillemets |
| Separador de miles por idioma | 0 precios con el separador de la otra lengua |
| `hreflang` | recíproco en las dos lenguas, incluidos los siete artículos |
| Enlaces internos | 0 con error, de 45 |
| Foco con tabulador en la portada | 55 paradas, 55 con anillo |
| Objetivos táctiles a 390 | 2 por debajo de 44 px, y los dos son enlaces dentro de una frase — la excepción que la propia WCAG 2.5.8 reconoce |
| Movimiento reducido | 0 elementos invisibles; la pila deja de ser pegajosa |
| Límite de la API | 429 en la petición 61, con `Retry-After` |
| `next build` | limpio |

---

## Capturas

En `notas/capturas/`, una por ruta y por ancho: `-d` es 1440 px y `-m` es
390 px. Están tomadas de página completa y con el aviso de cookies ya
respondido, para que no tape la esquina en las once.
