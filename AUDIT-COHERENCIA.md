# Auditoría de coherencia — J&V Agencia

> Hecha el 2 de septiembre de 2026. Barrió `web/`, los dos kits de ventas, el blog,
> `llms.txt` y los datos estructurados, buscando sitios donde el sitio **dice una cosa y
> el cotizador hace otra**.
>
> Todo lo marcado ✅ ya está corregido y verificado. Lo de la última sección son
> decisiones tuyas que no podía tomar solo.

---

## Resumen

| | |
|---|---|
| Incoherencias encontradas | **11** |
| Corregidas | **11** |
| Archivos tocados | 12 |
| `tsc --noEmit` | limpio |
| `next build` | 23/23 páginas |
| Prueba de navegador | sin errores de consola |

---

## 1 · La grande: el cotizador hacía las mismas preguntas para todo ✅

Las siete preguntas de extras se hacían iguales para landing, corporativa y tienda.
En la práctica eso significaba:

- A un **landing de campaña** se le preguntaba si quería *blog* y *pasarela de pago*.
- A una **tienda online** se le preguntaba si quería *cobrar*, que es para lo que existe.
- A nadie se le preguntaba **quién escribe los textos**, que es lo que más veces deja un
  proyecto parado.

**Arreglado.** Cada opción declara ahora a qué productos pertenece (`appliesTo` en
`web/lib/quote.ts`) y el cotizador arma los pasos según el tipo elegido:

| Producto | Pasos | Lo que se le pregunta y a los otros no |
|---|---|---|
| Landing page | 10 | Píxel y conversiones de campaña · Leads a hoja/CRM · Agendamiento |
| Web corporativa | 10 | Blog · Portafolio · Sedes y mapa · Área privada de clientes |
| Tienda online | 12 | Cómo va a cobrar · Envíos · Variantes · Cupones · Facturación DIAN · Carrito abandonado |

Verificado en navegador: los tres flujos generan pasos distintos y ninguno muestra
opciones del otro.

### Preguntas nuevas, comunes a los tres

Salieron de mirar cómo cotizan las calculadoras de agencia grandes (WebFX cobra la
redacción por número de páginas, como línea aparte):

1. **¿Quién escribe los textos y pone las fotos?** — se cobra por página ($60.000 solo
   textos, $95.000 textos + imágenes de banco), porque el trabajo escala con las páginas.
2. **¿Ya tienes web?** — si hay que migrar contenido y redirigir URLs viejas, +$250.000.
3. **¿Cómo está tu marca?** — sin logo, +$650.000 de identidad; con logo pero nada más,
   +$180.000 de extensión al sitio.
4. **Analítica y medición** — +$120.000, dentro del paso de SEO.

### Un cambio de criterio que vale la pena señalar

La pasarela de pago dejó de ser *«¿la quieres?»* y pasó a ser **«¿cómo vas a cobrar?»**,
con tres respuestas: pasarela (+$300.000), **pedido que se cierra por WhatsApp ($0)** o
las dos (+$380.000). En Colombia mucho comercio pequeño cobra por transferencia y una
tienda sin pasarela sigue siendo una tienda: forzar el cobro en línea espantaba a ese
cliente.

---

## 2 · «Decir muy bien lo que incluye» ✅

Antes solo los extras tenían desglose. Ahora:

- **`INCLUIDO_POR_TIPO`** — qué trae el precio base de cada producto, aparte de las
  páginas. Un landing incluye la página de gracias y el botón de WhatsApp fijo; una
  corporativa, el panel para editar textos; una tienda, el panel de productos y el panel
  de pedidos.
- **`INCLUIDO_SIEMPRE`** — se le agregó el certificado de seguridad y el respaldo, que
  se hacían y no se decían.
- **Cada opción tiene su «Qué incluye»** plegable, incluidas las 17 funciones nuevas.
- **La pantalla final repite lo incluido** después de mostrar el precio, que es cuando
  el cliente pregunta «¿y esto qué trae?».
- Los **planes de mantenimiento y de SEO** listan punto por punto qué se hace cada mes.

---

## 3 · SEO como servicio ✅

Antes el SEO existía **solo** como un extra de $250.000 dentro del cotizador web, y no
figuraba como servicio en la portada, ni en el pie, ni en `llms.txt`. Eso mezclaba dos
cosas distintas: el SEO técnico se hace una vez y se acaba; posicionar es trabajo mensual.
Venderlos con el mismo nombre hacía creer que por $250.000 se llegaba al primer puesto.

**Ahora son tres cosas separadas:**

| | Qué es | Precio |
|---|---|---|
| SEO técnico | Con el sitio, una vez | $250.000 |
| SEO técnico + contenido inicial | Lo anterior + investigación de búsquedas y textos | $650.000 |
| **Posicionamiento mensual** | Pestaña propia en el cotizador | desde $650.000/mes |

Planes mensuales: **Local $650.000** · **Crecimiento $1.100.000** · **Sector competido
$1.800.000**. Más ciudad adicional $250.000/mes, contenido adicional $180.000, puesta a
punto inicial $850.000 (una vez) y ficha de Google $180.000 (una vez).

El plan de entrada arranca en $650.000 **a propósito**: por debajo de $500.000/mes el
mercado colombiano es granja de enlaces, contenido de IA sin revisar o auditorías
automáticas. Eso quedó escrito como argumento de venta en el cotizador y en el kit.

Y en los tres sitios donde se habla de SEO quedó la misma frase: **nadie garantiza el
primer puesto, y quien lo prometa por escrito está mintiendo.**

---

## 4 · Mantenimiento web ✅

El cotizador de automatizaciones tenía planes mensuales; el web no, aunque
«Mantenimiento y soporte» se anuncia como servicio en la portada. Era la incoherencia
más visible entre lo que el sitio promete y lo que sabe cotizar.

**Básico $120.000** · **Estándar $250.000** · **Avanzado $450.000** al mes, más la opción
de no contratar ninguno. El mensual se muestra **separado del total del proyecto**, no
sumado: mezclarlos infla el número de entrada y hace creer que el mantenimiento es un
pago único.

---

## 5 · Precios desactualizados en los kits de ventas ✅

Los dos kits (`kit-ventas-jv-agencia.html` y `web/public/kit-vendedores.html`, que eran
byte a byte idénticos) llevaban los precios viejos:

| | Kit decía | Real |
|---|---|---|
| Web corporativa | $800.000 | **$1.750.000** |
| Tienda online | $1.500.000 | **$1.900.000** |

Estaba en 6 lugares. Un vendedor podía cerrar una corporativa en $800.000.

También decía **«página adicional: cada página extra sobre la primera»**, que contradice
el modelo actual —la corporativa ya trae 5 páginas y la tienda 6—. Corregido a «sobre las
que el proyecto ya incluye».

**Además se le agregó al kit:**

- Tabla de las funciones que solo aplican a un producto, para que el vendedor sepa qué
  ofrecerle a cada cliente.
- Sección nueva de **ingreso recurrente**: mantenimiento, SEO y automatización de
  WhatsApp con sus precios.
- Tarjetas de **automatización de WhatsApp** y **SEO** en el catálogo explicado, que no
  estaban.
- Los tres ejemplos de cotización recalculados, más un cuarto de SEO mensual.
- Aviso de que el consumo de WhatsApp lo factura Meta, no nosotros.

---

## 6 · El FAQ contradecía la oferta ✅

Tres respuestas estaban desalineadas:

1. **«¿Hacen marketing o publicidad también?» → «No.»** Contradecía de frente la
   automatización de WhatsApp (que ya se vendía) y el SEO (que se acaba de agregar).
   Reescrita: SEO y automatización sí; pauta pagada y community management no.
2. **«Una web suele tomar de 4 a 8 semanas»** — el cotizador ofrece un landing en 2
   semanas y una corporativa en 3. El cliente cotizaba una cosa y leía otra. Ahora dice
   los rangos reales por tipo.
3. **«Ofrecemos planes de acompañamiento»** era vago; ahora los planes tienen nombre y
   precio, y la respuesta remite al cotizador.

---

## 7 · Un precio equivocado en el blog ✅

`web/app/blog/_posts/web-o-instagram.tsx` decía que una web arranca **«Desde $800.000»**,
cuando el producto de entrada son $450.000. Espantaba al lector con un precio que no
cobramos. Corregido.

---

## 8 · `llms.txt` incompleto ✅

Listaba 4 servicios cuando el sitio ya vende 6, y le faltaban 4 páginas que sí existen
y sí están en el sitemap: `/sobre-nosotros`, `/blog`, `/eliminacion-de-datos` y la
descripción real del cotizador. Es el archivo que leen los modelos de IA cuando alguien
les pregunta por la agencia.

---

## 9 · Datos estructurados sin los servicios nuevos ✅

`knowsAbout` se quedó en 5 temas, sin WhatsApp ni SEO. Y no había **`hasOfferCatalog`**,
que para un negocio de servicios es lo que le dice a Google *qué* vendemos, no solo
quién somos. Se agregó, con los 6 servicios y su descripción, alineados con la portada
y con las líneas del cotizador.

---

## 10 · La portada vendía 5 servicios y el cotizador cotizaba 2 ✅

`Benefits.tsx` anunciaba desarrollo web, automatización de WhatsApp, software a medida,
diseño/UI y mantenimiento. El cotizador solo sabía cotizar los dos primeros.

Ahora son **6 servicios** (entró SEO y posicionamiento) y el cotizador cubre **3 líneas**
en pestañas: sitio web, automatización y SEO. Software a medida y diseño/UI siguen siendo
«hablemos», que fue tu decisión, y el cotizador lo dice explícitamente al final del paso
de funciones.

La rejilla de servicios se recalculó a 3+2 / 2+3 / 3+2 para que las filas sigan sumando 5
con la tarjeta nueva.

---

## 11 · La comisión del vendedor no contemplaba lo recurrente ✅

El kit decía «20% del valor de cada proyecto». Con los planes mensuales nuevos, un
vendedor podía prometerle a un cliente —o esperar para sí— una comisión recurrente que
nadie ha acordado. Se agregó una nota: el 20% aplica al valor del proyecto y **los planes
mensuales se liquidan aparte, confirmando contigo**.

Ver la pregunta 1 de la sección siguiente.

---

# Lo que necesito que decidas tú

Ninguna de estas la podía resolver solo, y ninguna bloquea lo que ya está hecho.

### 1. ¿El vendedor gana comisión sobre los planes mensuales?

Hoy el kit dice 20% del proyecto y que lo recurrente «se liquida aparte, pregúntale a
Luis». Hay que cerrarlo antes de que alguien venda un plan de SEO de $650.000/mes.
Lo típico del mercado es 10 % del recurrente durante los primeros 6 o 12 meses, pero es
tu margen: dime el número y lo escribo en el kit.

### 2. ¿La puesta a punto de SEO se le cobra a un cliente cuyo sitio hicimos nosotros?

Hoy el cotizador la trae marcada y dice que se puede desmarcar «si el sitio lo hicimos
nosotros con SEO técnico». Queda a criterio del vendedor, y eso puede terminar en
descuentos improvisados. Dos salidas: descontarla siempre en ese caso, o dejarla y
justificarla porque la auditoría igual hay que hacerla.

### 3. Los precios de las 17 funciones nuevas los puse yo

Están calibrados contra la banda freelance −30 % que ya acordaste, pero son estimaciones
mías de esfuerzo. Los que más me gustaría que revises, porque son los que más pueden
dolerte si quedan bajos:

| Función | Puse | Por qué dudo |
|---|---|---|
| Facturación electrónica (DIAN) | $700.000 | Integrar un proveedor autorizado es más trabajo del que parece |
| Área privada de clientes | $900.000 | Es casi un software a medida; podría ser el doble |
| Agendamiento en línea | $350.000 | Ya lo tenemos hecho para el propio sitio, así que quizá está bien |

### 4. ¿Cotización de Pixels Maker lista para enviar?

Está en `web/public/cotizacion-pixels-maker.html`. **Antes de mandarla revisa dos cosas:**

- **No lleva nombre de persona** en «Preparado para», solo «Pixels Maker». No supe a
  nombre de quién va.
- El **plan de mantenimiento** que propuse es el Básico ($120.000/mes) porque el sitio es
  estático y no hay base de datos. La cotización de la funeraria usaba tarifa anual; aquí
  usé el plan mensual nuevo para que todo diga lo mismo. Si prefieres cobrarle anual,
  dímelo y lo cambio.

### 5. Software a medida y diseño/UI siguen sin cotizador

Fue tu decisión y está bien resuelta —el cotizador lo dice y el kit también—, pero son
los dos servicios de la portada que no se pueden cotizar solos. Si algún día quieres que
entren, el motor ya está armado para agregar una pestaña más.
