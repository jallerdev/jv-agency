# Traspaso — precios, cotizador y cotización de Pixels Maker

> **Sesión nueva: lee este archivo primero.** Después `SESION.md` y `PENDIENTES.md`.
> Fecha: 2026-09-02. Esta rama de trabajo se separó de la sesión de **Pixels Maker**
> (repo `../pixels-maker`), que sigue viva en otra terminal. **Aquí no se toca ese repo.**

---

## 1 · Qué se cambió en esta sesión (sin commitear todavía)

Cuatro archivos, 167 líneas. Todos en `web/`:

| Archivo | Qué |
|---|---|
| `components/Benefits.tsx` | Quinto servicio: **Automatización de WhatsApp**, destacado. Rejilla recalculada a 3+2 / 2+3 / 5 |
| `components/Footer.tsx` | "Automatización de WhatsApp" en la lista de Servicios |
| `lib/quote.ts` | `PAGINAS_BASE`, `INCLUIDO_SIEMPRE`, `EXTRA_DETALLE`, `basePages()`, precio de `corp` |
| `components/Cotizador.tsx` | Muestra los tres desgloses; el contador arranca en las páginas incluidas |

**No son míos y ya estaban modificados antes de empezar:** `kit-ventas-jv-agencia.html` y
`web/public/kit-vendedores.html`. No los toqué. Confirmar con Luis antes de commitear.

### Detalle de lo que hace cada cosa

- **`PAGINAS_BASE`** — qué páginas trae el precio base de cada tipo.
  `landing` 1 · `corp` 5 (Inicio, Nosotros, Servicios, Contacto, Aviso de privacidad y términos)
  · `ecom` 6. Antes el contador arrancaba en 1 para todos y decía "la primera va incluida":
  nadie sabía qué compraba.
- **`INCLUIDO_SIEMPRE`** — lo que entra en cualquier proyecto (diseño propio, responsive,
  formulario a correo y WhatsApp, velocidad y accesibilidad revisadas, capacitación + 30 días).
- **`EXTRA_DETALLE`** — qué incluye cada uno de los 7 extras. El de SEO cierra con
  *"No es posicionamiento mensual: eso va aparte"*, que evita la discusión de después.
- **`basePages()`** — tolera `null` a propósito: el cotizador la llama antes de que se elija
  tipo, y sin esa guarda **rompía el prerender de `/cotizador`** en el build.

---

## 2 · Precios: la investigación que los sustenta

Mercado colombiano, septiembre de 2026. **La banda que aplica es la de freelance, no la de
agencia** — decisión de Luis en esta sesión.

| | Agencia | **Freelance** |
|---|---|---|
| Proyecto informativo | $1.500.000 – $30.000.000+ | **$1.500.000 – $3.500.000** |
| Proyecto pequeño | — | $800.000 – $2.500.000 |
| Landing | $500.000 – $2.500.000 | — |
| Corporativa 5–10 páginas | $2.500.000 – $6.000.000 | — |
| E-commerce | $1.800.000 – $15.000.000 | — |
| Premium | $6.000.000 – $18.000.000 | — |
| **SEO local mensual** | **$900.000 – $2.200.000** | — |
| Hora freelance | — | $110k–$150k con cliente internacional |

**Regla acordada: punto medio freelance, menos 30 %.**

- Corporativa: medio $2.500.000 → −30 % = **$1.750.000** (ya aplicado en `PRICES.base.corp`).
- Landing ($450.000) y tienda ($1.900.000) **se dejan como estaban**: ya venían dentro de banda.

**Dos pisos que no se cruzan, y hay que decírselos al cliente:**

- Freelance por debajo de **$600.000**: el mercado ahí es plantilla prediseñada y sin soporte.
- SEO por debajo de **$500.000/mes**: casi siempre granja de enlaces, contenido de IA sin
  revisar o auditorías automáticas. Sirve como argumento de venta, no solo de defensa.

Las bandas y el porqué del −30 % quedaron escritos como comentario en `lib/quote.ts`, para
poder revisarlos en seis meses sin volver a adivinar.

### Fuentes

- Precio web Colombia: [Cangrejo Digital](https://cangrejodigital.com/diseno-web/cuanto-cuesta-pagina-web-colombia/) · [Novux](https://novuxstudio.com/diseno-y-desarrollo-web/cuanto-cuesta-una-pagina-web/)
- Freelance vs agencia: [K&T Code](https://www.kytcode.lat/blog/cuanto-cuesta-una-pagina-web-en-colombia) · [Stiven Ramírez](https://stivenramirez.com/blog/cuanto-cobra-disenador-web-colombia/)
- Tarifa por hora: [Vacantes Remotas](https://www.vacantesremotas.com/blog/cuanto-cobrar-como-freelancer-en-latinoamerica-en-2026) · [Hostinger](https://www.hostinger.com/co/tutoriales/cuanto-cobrar-por-una-pagina-web)
- SEO Colombia: [Gulupa Digital](https://gulupadigital.com/en/2026-03-13-cuanto-cuesta-posicionamiento-seo-colombia-2026/) · [Consolidación Digital](https://www.consolidaciondigital.com/blog/seo/cuanto-cuesta-seo-colombia)

---

## 3 · Lo que sigue: `cotizacion-pixels-maker.html`

Va en `web/public/`, siguiendo el patrón de `cotizacion-funeraria-sfa.html` y
`cotizacion-aula-monica.html`: HTML autocontenido, `noindex`, tematizado con la paleta del
cliente sobre la misma retícula.

**Ya está preparado:** `docs/cotizaciones/estilo-pixels-maker.css` — el CSS de la familia J&V
con la paleta de Pixels Maker (amarillo `#FFFF00` / negro / blanco, muestreados de su logotipo;
tipografías Big Shoulders Display + Barlow). Pegarlo dentro del `<style>` del nuevo archivo.

### Estructura del documento (la de funeraria-sfa)

```
01 Para qué es este documento
02 Lo que quedó hecho
03 Lo que se dibujó desde cero
04 Lo que vale
05 Lo que usted paga
06 El saldo y el mantenimiento
07 Lo que necesito de usted
```

Clases disponibles en el CSS: `sec` `card` `cards` `tbl-wrap` `price` `name` `totalrow`
`fine` `note` `offerbox` `eyebrow` `list` `yes`/`no` `bar` `doc` `head`.
Añadidas para este cliente: `marca-caja` `decision` `mercado` `fase-tag` `hecho`.

### Cifras propuestas (banda freelance −30 %)

| Fase | Alcance | |
|---|---|---|
| 1 — **entregada** | Home + página de sector + arquitectura de 30 rutas + sistema de diseño + SEO técnico completo + 50 assets procesados | $2.800.000 |
| 2 | 19 páginas de aterrizaje (7 sectores + 9 tipos + 3 ciudades) | $2.650.000 |
| 3 | 7 fichas de proyecto + nosotros + contacto | $1.320.000 |
| 4 | Google Business, formularios, analítica, Search Console | $320.000 |
| | **Total del sitio** | **$7.090.000** |
| | SEO local mensual | $650.000/mes |

> Bajó de $13.100.000 (banda agencia) a $7.090.000. El retainer de $650.000 queda por encima
> del umbral de $500.000 donde el mercado ya es granja de enlaces.

### ⛔ Bloqueante antes de escribir el documento

**¿La fase 1 ya está pagada, o entra en la cotización?** Cambia el documento entero: si está
pagada, el documento cotiza fases 2–4 y muestra la 1 como valor entregado; si no, es una
cotización de proyecto completo con un saldo. **Preguntarle a Luis, no suponer.**

---

## 4 · Convenciones del repo — verificadas, no asumidas

- Gestor: **pnpm**. Build: `pnpm build` (o `npx next build`).
- `SESION.md` dice que los commits van **en inglés**, pero el `git log` real está **en español,
  imperativo** (`Quitar el precio del dominio…`, `Mover el perfil de Google…`).
  **Preguntar cuál manda antes del primer commit.**
- **Sin trailer `Co-Authored-By`** — esto sí está confirmado y el log lo respeta.
- Datos del negocio centralizados en `web/lib/business.ts`. Reutilizar, no repetir.

## 5 · Un fallo que costó tiempo, para no repetirlo

Al probar el cotizador, los botones no respondían: los assets devolvían **400 con
`text/html`** y la página nunca hidrataba. No era el código — era un `next start` viejo
sirviendo los hashes de un build anterior. **Matar todos los `next start` antes de levantar
uno nuevo** después de cada build.

**Volvió a pasar el 2026-09-02, y así fue como se coló** (dos trampas, las dos evitables):

1. `next start` sobre un puerto ocupado **no hace ruido**: falla con `EADDRINUSE` dentro
   del log y el proceso viejo sigue atendiendo. Si se lanza con `setsid ... &` ni siquiera
   se ve el error. **Revisar el log de arranque, no asumir que arrancó.**
2. **`curl` devolvió 200 y eso no prueba nada.** El HTML lo pinta el servidor y llega
   perfecto; lo que revienta es la hidratación, en el navegador. Un 200 con la página
   rota se ve idéntico a un 200 sano.

Receta que sí funciona:

```bash
ps -eo pid,cmd | grep -E "next-server|next start" | grep -v grep   # ver qué hay vivo
kill -9 <pid>                 # `pkill -f next` mata también el shell de la herramienta
rm -rf .next && npx next build
npx next start -p <puerto> ; head -4 <log>   # confirmar que arrancó de verdad
```

Y verificar con navegador, no con `curl`: cargar la página, escuchar `pageerror` y
**hacer clic en un botón** para comprobar que React respondió.

---

## 6 · Qué NO se toca aquí

Todo lo de **Pixels Maker** vive en `../pixels-maker` y sigue en la otra terminal:
las tres opciones de FAQ ya resueltas, el índice de tipos, el menú móvil, la auditoría de
accesibilidad. Si algo de allá hace falta como insumo, se lee, no se edita.
