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

### Nuevo
- **Página de contacto** en los dos idiomas, con las tres vías y la agenda.
- **Agendamiento en dos pasos**, como el briefing de palo-seco. La lógica de
  reserva no se tocó.
- **Aviso de cookies con consentimiento previo**: GA4 arranca DENEGADO y solo
  sube si la persona acepta. Antes medía sin preguntar.
- **Límite por IP** en las tres rutas de API, y validación de correo y teléfono
  en el servidor de `/api/schedule`.

---

## Lo que falta

### 1. Traducir el resto (la tanda que quedó abierta)
Cuatro cosas, en este orden:

1. **`/servicios/posicionamiento-seo` → `/en/services/seo`.** Es la más cara de
   las que quedan: sus trece preguntas están escritas como JSX con enlaces
   dentro, y arrastra tres visuales con texto propio —`SumadorSeo`,
   `FichaGoogle` y `BloqueLocalGoogle`— que hay que volver bilingües antes.
2. **`/sectores/salones-y-spas` → `/en/industries/salons-and-spas`.**
3. **`/sectores/clinicas-y-consultorios` → `/en/industries/clinics`.**
4. **El blog**: el índice y los siete artículos. Es un trabajo de redacción, no
   de código: son artículos largos con fuentes citadas.

**El sitio no está roto mientras tanto.** `lib/rutas.ts` separa lo construido
(`RUTAS`) de lo pendiente (`PENDIENTES`), y `enlaceReal()` desvía al español lo
que todavía no existe. Traducir una página es **mover una línea** de
`PENDIENTES` a `RUTAS`: el menú, el pie, el conmutador de idioma, el `hreflang`
y el sitemap se enteran solos.

### 2. Decidir qué va en la marquesina
Está en `notas/PENDIENTE-MARQUESINA.md`. Ya no pasa el stack —Luis pidió que no
hubiera nada técnico— y ahora pasan las promesas del estudio. Falta que él
confirme si se queda así o se cambia por los servicios con precio.

### 3. Los marcadores `[PENDIENTE]` que siguen abiertos
Se ven en desarrollo y `sinPendientes()` los quita en producción. Hoy hay
cuatro, todos por un dato que Luis no ha confirmado:

- Cuántas rondas de ajuste de diseño entran en el precio (`/servicios/diseno-de-paginas-web`).
- El piso por debajo del cual no vale la pena arrancar un software (`/servicios/software-a-la-medida`).
- El plazo típico de la primera versión útil de un software.
- Un caso real de posicionamiento con seis meses cumplidos (`/servicios/posicionamiento-seo`).
- Los sectores de los proyectos bajo NDA (`/sobre-nosotros`).

### 4. SEO, cuando el rediseño esté aprobado
El orden acordado sigue en pie: sitemap (ya actualizado), lista de URLs a
indexar (está en `notas/URLS-A-INDEXAR.md`), auditoría de canibalización y
push a producción.

---

## Cómo quedó medido

| Qué | Resultado |
|---|---|
| Carga de 24 rutas × 2 anchos (1440 y 390) | 200, sin desborde lateral, sin errores de consola |
| Contraste de texto sobre el fondo real | 0 por debajo de AA |
| Anclas internas | 0 rotas |
| Enlaces internos | 0 con error, de 33 |
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
