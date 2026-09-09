# Copy de jvagencia.com en primera persona

> Reescritura completa de plural a **yo/mi/me**. Quien habla es Luis Jaller;
> la marca sigue llamándose JV Agencia.
>
> Regla aplicada: prohibido *nosotros, nuestro, el equipo, la agencia, somos,
> diseñamos, trabajamos*. Trabajar solo es el argumento, no la debilidad.
>
> Los precios van visibles, en rangos. Es el diferenciador: ninguna agencia de
> Cartagena publica los suyos.
>
> Los datos sin confirmar quedan marcados **[PENDIENTE: dato]** y las
> afirmaciones por comprobar **[VERIFICAR: …]**, ambos visibles. No hay cifras,
> clientes ni resultados inventados.
>
> Los testimonios de LinkedIn no se tocan: son citas textuales de otras
> personas y van tal cual, en su idioma original.

---

## Rangos autorizados

Los únicos números de precio permitidos en todo el sitio.

| Servicio | Desde | Plazo |
|---|---|---|
| Página web | $850.000 | 5 días |
| Tienda online | $2.500.000 | 3 semanas |
| Auditoría SEO | $390.000 | 5 días |
| SEO local mensual | $450.000/mes | — |
| Renovación anual | $290.000 | — |
| Software a la medida | según alcance | — |

---

## `app/layout.tsx` — metadatos globales

**title**

```
Diseño de páginas web en Colombia para PYMEs | JV Agencia
```

**description**

```
Diseño páginas web, tiendas online y chatbots de WhatsApp para PYMEs de
Colombia y LATAM. Yo diseño y yo programo, sin presupuesto corporativo.
```

**og:title**

```
Diseño de páginas web en Colombia | JV Agencia
```

**og:description**

```
Páginas web, tiendas online y chatbots de WhatsApp para PYMEs. Las diseño y
las programo yo mismo.
```

**og:image alt**

```
JV Agencia — diseño y código en las mismas manos
```

**twitter:description**

```
Páginas web, tiendas online y chatbots de WhatsApp para PYMEs de Colombia y
LATAM.
```

---

## `components/Header.tsx` — navegación

| Antes | Ahora |
|---|---|
| Servicios | Servicios |
| — | **Precios** → `/precios` |
| Trabajo | Trabajo |
| Proceso | Proceso |
| **Nosotros** | **Sobre mí** |
| Preguntas | Preguntas |

Botón: `Agenda una llamada`

---

## `components/Hero.tsx`

**Badge**

```
Diseñador y desarrollador web · LATAM
```

**H1**

```
Diseño de páginas web
que hacen que te tomen en serio.
```

*(«te tomen en serio» va en el estilo metálico en cursiva, como está hoy)*

**Párrafo**

```
Diseño y programo yo mismo. Tu web o tu software con el acabado de una marca
grande por fuera y la solidez de un buen producto por dentro —sin presupuesto
corporativo.
```

**Botones**

```
Agenda una llamada
Ver mi trabajo
```

**Chip inferior** → enlaza a `/precios`

```
Página web desde $850.000 · lista en 5 días
```

---

## `app/precios/page.tsx` — página nueva

**title**

```
Precios de páginas web en Colombia | JV Agencia
```

**description**

```
Cuánto cuesta una página web, una tienda online o el SEO de tu negocio.
Precios desde $850.000 y plazos reales, publicados. Sin cotización a puerta
cerrada.
```

**og:description**

```
Precios y plazos publicados: página web desde $850.000, lista en 5 días.
```

**H1**

```
Los precios, publicados.
```

**Párrafo**

```
Casi nadie los pone. Yo sí: así sabes desde el primer minuto si te sirvo o no,
sin gastar una llamada para averiguar un número.
```

**Tabla**

```
Página web ................ desde $850.000 · lista en 5 días
Tienda online ............. desde $2.500.000 · 3 semanas
Auditoría SEO ............. desde $390.000 · 5 días
SEO local mensual ......... desde $450.000 al mes
Renovación anual .......... $290.000
Software a la medida ...... según alcance
```

**Nota bajo la tabla**

```
Son precios de arranque, no tarifas cerradas: el número final depende del
alcance, y te lo doy por escrito antes de que pagues nada. Lo que no va a
pasar es que el precio aparezca al final de un embudo de tres reuniones.
```

**Cierre**

```
¿Tu proyecto no encaja en ninguna línea?

Cuéntame qué necesitas y te digo en qué rango cae. Si no te puedo ayudar, te
lo digo también.

[Agenda una llamada]  [Escríbeme por WhatsApp]
```

---

## `components/MetaTechProvider.tsx`

**Eyebrow**

```
Automatizaciones sobre WhatsApp
```

**Título**

```
Proveedor de tecnología verificado por Meta
```

**Sello de fecha**

```
Verificado · jul 2026
```

**Cuerpo**

```
Conecto la cuenta de WhatsApp Business de tu negocio y construyo las
automatizaciones sobre ella. Tu número, tus plantillas y la cuenta a tu
nombre —no al mío.
```

**Versión compacta (pie de página)**

```
Proveedor de tecnología verificado por Meta
```

---

## `components/MediaSection.tsx` — el caso a fondo

**Badge**

```
Un caso a fondo
```

**H2**

```
Una tienda online de punta a punta.
```

**Párrafo**

```
En vez de enseñarte diez capturas, te cuento una entera: qué necesitaba el
negocio, qué construí y cómo quedó. Los demás proyectos están más abajo.
```

**alt de la imagen**

```
Bloomrose — tienda de bisutería y accesorios que diseñé y construí
```

**Ficha del proyecto**

```
Bloomrose · E-commerce

Tienda online de bisutería y accesorios para el mercado colombiano. Diseño y
desarrollo de punta a punta: catálogo, carrito, cuentas, pagos y envíos.
```

**Chips** — sin cambios

```
Diseño UI a medida
Pagos en línea (PSE, Nequi, tarjeta)
Cotización de envíos
Catálogo con control de stock
Cuentas y seguimiento de pedidos
```

**Botón**

```
Visitar sitio
```

---

## `components/Portfolio.tsx`

**Badge**

```
Proyectos
```

**H2**

```
Páginas web que ya están en línea, funcionando.
```

**Párrafo**

```
No son maquetas ni plantillas de muestra. Abajo hay dos grupos: lo que está en
producción con dominio propio, y proyectos de estudio que construí completos
por iniciativa propia.
```

### Grupo 1 — En producción

```
Con dominio propio y en línea. Toca cualquiera y compruébalo.
```

Fichas: **HalcónOS · Hummik · Bloomrose**

### Grupo 2 — Proyectos de estudio

```
Proyectos de estudio. Sitios que diseñé y construí completos para negocios
reales de la región, por iniciativa propia. Cada uno está terminado y se puede
abrir.
```

Fichas: **Animal Expert · Fta. Elka Gómez · Peluquería Marcopolo**

> ❌ **NÜVA Plastic Surgery sale de la lista.** No se publica hasta verificar la
> habilitación en REPS.

**alt de cada captura**

```
{nombre} — sitio que diseñé y desarrollé
```

**Descripciones de las fichas** — sin cambios; describen el negocio, no una
relación comercial.

---

## `lib/services.ts`

### Diseño de páginas web

```
Sitios, landing pages, e-commerce y web corporativa. Rápidos, sólidos y
pensados para crecer contigo. Desde $850.000.
```

### Chatbot de WhatsApp

```
Tu número contesta solo: capta interesados, agenda citas, toma pedidos y pasa
a una persona cuando se complica. Soy proveedor de tecnología verificado por
Meta, así que la conexión la hago yo y no la terceriza nadie.
```

### SEO y posicionamiento

```
Que te encuentren cuando buscan lo que vendes. El SEO técnico va con el sitio;
posicionar es trabajo mensual y te lo digo claro. Nadie garantiza el primer
puesto: yo garantizo el trabajo y el informe. Auditoría desde $390.000, plan
mensual desde $450.000.
```

### Software a la medida

```
Apps web, sistemas internos y plataformas hechas a tu medida, no forzadas a
una plantilla. El precio va según el alcance.
```

### Diseño web / UI

```
Interfaz y experiencia que se ven de marca grande, pensadas desde el primer
día en cómo se van a construir. No es un servicio aparte ni un extra: va
dentro de cada proyecto web que hago.
```

### Mantenimiento de páginas web

```
No desaparezco al entregar. Mejoras continuas, hosting y soporte para que todo
siga funcionando. Una automatización sobre todo: si expira un token de Meta o
rechazan una plantilla, deja de responder sin avisar.
```

---

## `components/Benefits.tsx`

**Badge**

```
Lo que hago
```

**H2**

```
Páginas web, tiendas online
y chatbots de WhatsApp.
```

**Párrafo**

```
No necesitas un diseñador por un lado y un programador por otro. Necesitas a
alguien que haga las dos cosas y que hable contigo directo. Eso hago —y desde
que Meta me verificó como proveedor de tecnología, también dejo tu WhatsApp
contestando solo.
```

**Enlace de tarjeta**

```
Ver el servicio
```

---

## `components/Process.tsx`

**Badge**

```
Cómo trabajo
```

**H2**

```
Cómo hago tu página web: un proceso que da tranquilidad.
```

**01 · Entiendo tu proyecto**

```
Antes de diseñar o programar, escucho. Defino contigo qué necesitas y para qué.
```

**02 · Diseño la interfaz**

```
Pantallas y experiencia que se ven de marca grande —y pensadas para
construirse bien.
```

**03 · Construyo a la medida**

```
Programo tu web o tu software con código sólido, rápido y hecho para durar.
```

**04 · Lanzo y acompaño**

```
Publico, dejo todo documentado y sigo contigo con soporte y mejoras.
```

---

## `components/Founder.tsx`

**Nombre**

```
Luis Jaller
```

**Rol**

```
Diseñador y desarrollador web
```

**Badge**

```
Quién está detrás
```

**H2**

```
Quién hace tu página web: Luis Jaller
```

**Párrafo**

```
Aquí no hay ejecutivo de cuentas ni cadena de correos. Hablas conmigo, y el
que diseña y escribe el código soy yo. Eso tiene un límite —no tomo veinte
proyectos a la vez— y una ventaja: nada se pierde entre lo que pides y lo que
se construye.
```

**Cifras**

| Valor | Etiqueta |
|---|---|
| 3+ | años construyendo producto |
| 11+ | proyectos en producción |
| **[PENDIENTE: dato]** | tiempo de respuesta |

**Enlaces**

```
Más sobre mí
LinkedIn
GitHub
```

---

## `components/Testimonials.tsx`

**Badge**

```
Lo que dicen
```

**H2**

```
No lo digo yo.
Lo dicen ellos.
```

**Párrafo**

```
Recomendaciones públicas de gente con la que he trabajado, escritas en sus
perfiles de LinkedIn. Están enlazadas para que cualquiera las verifique.
```

**Detalle del original**

```
Traducida del inglés · ver original
```

> ⚠️ Las dos recomendaciones de LinkedIn (David Adrian Uribe Soto y Justin
> Castro Perez) **no se tocan**: ni la traducción ni el original en inglés.

---

## `components/FAQ.tsx`

**Badge**

```
Preguntas frecuentes
```

**H2**

```
Preguntas frecuentes sobre hacer tu página web.
```

**Párrafo**

```
¿Tienes otra duda? Escríbeme y te respondo con franqueza, sin letra chica.
```

### ¿Por qué contratar a una sola persona y no a un diseñador y un programador por aparte?

```
Porque coordinar a dos que no se hablan sale más caro y más lento. Yo diseño
pensando en cómo se va a construir, y construyo respetando el diseño. Menos
reprocesos y menos correos en copia.
```

### ¿Trabajas solo? ¿Qué pasa si desapareces?

*(pregunta nueva: pone el límite por delante en vez de esconderlo)*

```
Trabajo solo, sí, y por eso no tomo veinte proyectos a la vez. Todo lo que
construyo queda documentado, y el código y los accesos son tuyos desde el
primer día: si mañana quieres seguir con otra persona, puedes, sin quedar
amarrado a mí.
```

### ¿Trabajas con negocios pequeños o solo con empresas grandes?

```
Trabajo con PYMEs y emprendedores que ya tienen clientes y quieren una web o
un software que esté a la altura de lo que venden. Si estás en ese punto,
encajamos.
```

### ¿Cuánto cuesta?

```
Está publicado en la página de precios: una página web arranca en $850.000 y
una tienda online en $2.500.000. No hay que sacarme el número en una reunión.
```

### ¿Cuánto tarda un proyecto?

**[VERIFICAR: los plazos de abajo (1 a 4 semanas) contradicen el «lista en 5
días» de la tabla de precios. Decide cuál es el bueno antes de publicar.]**

```
Depende del tipo: una landing page toma de 1 a 4 semanas, una web corporativa
de 2 a 5 y una tienda online de 3 a 8, según el plazo que escojas. Un software
a la medida varía más y lo estimo contigo. Las semanas se cuentan desde que
tenga el contenido y la marca; si los textos los escribo yo, ese tiempo ya
está contado.
```

### ¿Haces marketing o publicidad también?

```
Hago SEO —que te encuentren en Google sin pagar por cada clic— y chatbots de
WhatsApp. Lo que no hago es pauta pagada: no manejo tu presupuesto de anuncios
en Meta ni en Google Ads, ni community management. Prefiero decírtelo antes
que cobrarte por algo que no es lo mío. Si necesitas pauta, te dejo la landing
y el píxel listos para que quien la maneje trabaje sobre terreno firme.
```

### ¿Qué pasa después de entregar? ¿Me quedo solo?

```
No. La entrega incluye capacitación y 30 días de ajustes sin costo. De ahí en
adelante hay planes de mantenimiento mensual —desde el que solo vigila que el
sitio no se caiga hasta el que le hace mejoras cada mes— y te paso el que
corresponda con su precio en la propuesta. Si prefieres no contratar ninguno,
el sitio es tuyo igual y sigue funcionando.
```

### ¿Cómo empiezo?

```
Agenda una llamada de diagnóstico sin costo. Reviso tu situación, te digo con
franqueza si te puedo ayudar y, si encajamos, te armo una propuesta a tu
medida.
```

---

## `components/FinalCTA.tsx`

**H2**

```
Tu página web, hecha
por quien la programa.
```

**Párrafo**

```
Agenda una llamada y cuéntame qué necesitas. Te digo con franqueza si te puedo
ayudar —y cómo.
```

**Lista**

```
Diagnóstico sin costo de 20 minutos
Hablas directo con quien diseña y programa
Precios publicados, desde $850.000
```

---

## `components/ScheduleCall.tsx`

**Título**

```
Agenda tu llamada
```

**Subtítulo**

```
Diagnóstico sin costo de 20 minutos por Google Meet. Cuéntame qué necesitas.
```

**Etiqueta del grupo de servicios**

```
¿En qué te ayudo?
```

**Campos**

```
WhatsApp / teléfono
Fecha preferida
```

Placeholder de la nota:

```
¿Qué tienes en mente? Un sitio nuevo, un rediseño, una app…
```

**Mensajes de error**

```
Elige una opción
Escribe tu nombre
Ingresa un correo válido
Ingresa un teléfono válido
Elige una fecha
Elige una hora
Ese horario se acaba de ocupar. Elige otro.
No se pudo agendar. Intenta de nuevo o escríbeme por WhatsApp.
O escríbeme por WhatsApp
```

**Botón**

```
Agendar llamada
Agendando…
```

**Nota bajo el botón**

```
Sin compromiso. Recibirás la invitación de Google Meet en tu correo.
```

**Confirmación** — `{nombre}` y `{correo}` se rellenan en ejecución con lo que
escribió el visitante.

```
¡Listo, {nombre}!
Tu llamada quedó agendada.
Recibí tu solicitud de llamada.
Te envié la invitación a {correo} con el enlace de Google Meet. También puedes
unirte desde aquí:
Unirse a Google Meet
```

---

## `components/WhatsAppButton.tsx`

**aria-label y etiqueta visible**

```
Escríbeme por WhatsApp
```

**Mensaje precargado** — sin cambios (lo escribe el visitante, no tú)

```
Hola JV Agencia 👋 Me interesa hablar sobre un proyecto de diseño o desarrollo web.
```

---

## `components/Footer.tsx`

**Descripción de marca**

```
Diseño que enamora, código que aguanta. Webs y software a la medida para PYMEs
de LATAM, hechos por una sola persona de principio a fin.
```

**Columna Servicios**

```
Diseño de páginas web
Chatbot de WhatsApp
SEO y posicionamiento
Software a la medida
Diseño web / UI
Mantenimiento
```

**Columna Agencia**

```
Precios
Trabajo
Proceso
Blog
Sobre mí
Contacto
```

**Columna Producto** — sin cambios

```
HalcónOS — CRM de ventas
Blog de HalcónOS
```

**Columna Legal** — sin cambios

```
Política de privacidad
Términos y condiciones
Política de cookies
```

---

## `app/sobre-nosotros/page.tsx`

**title**

```
Sobre mí — Luis Jaller | JV Agencia
```

**description**

```
JV Agencia es el estudio de Luis Jaller, diseñador y desarrollador web en
Turbaco, Bolívar. Diseño y programo yo mismo para PYMEs de LATAM: 3+ años
construyendo producto, 11+ proyectos en producción.
```

**og:title**

```
Sobre mí — JV Agencia
```

**og:description**

```
El estudio de Luis Jaller: diseño y código en las mismas manos, para PYMEs de
LATAM.
```

**Badge**

```
El estudio
```

**H1**

```
Diseño y código, en las mismas manos.
```

**Párrafo**

```
JV Agencia soy yo, Luis Jaller. Uno el diseño y el desarrollo en un solo
proceso para que las PYMEs de LATAM tengan una web que se ve de marca grande
—y que funciona de verdad.
```

**Cifras**

| Valor | Etiqueta |
|---|---|
| 3+ | años construyendo producto |
| 11+ | proyectos en producción |
| **[PENDIENTE: dato]** | tiempo de respuesta |
| 1 | persona, de principio a fin |

**Nombre y rol**

```
Luis Jaller
Diseñador y desarrollador web
```

**Bio**

```
Diseñador y desarrollador web con foco fuerte en backend y arquitectura. No
solo escribo código: traduzco lo que necesita un negocio en decisiones de
producto claras. Me muevo entre producto, arquitectura y ejecución con la
misma facilidad, para entregar software que funciona y que además sirve para
algo.
```

### H2 · Cómo trabajo

**01 · Diseño y código en las mismas manos**

```
No te entrego un diseño bonito que nadie sabe construir, ni un sistema sólido
que se ve amateur. Las dos cosas, y hechas por la misma persona.
```

**02 · Pienso en tu negocio, no solo en la web**

```
Traduzco lo que necesita tu negocio en decisiones de producto. El objetivo no
es «una web», es credibilidad que vende y que no se rompe.
```

**03 · Socio técnico de largo plazo**

```
No entrego y desaparezco. Quedo como tu técnico de cabecera para mantener,
mejorar y escalar lo que construí.
```

### H2 · Qué domino

```
Tecnología moderna y probada para construir productos rápidos, sólidos y
listos para crecer.
```

*(el stack no cambia: Frontend · Backend · Cloud & DevOps · Datos · Mobile)*

### H2 · Algunos proyectos

**[VERIFICAR: ¿fintech y logística son reales?]**

```
Una muestra pública; el resto está bajo NDA (SaaS, fintech, logística).
```

```
BloomRose · E-commerce
Tienda online de bisutería y accesorios, de punta a punta.

HalcónOS · SaaS / CRM
CRM y gestor de proyectos para agencias.

InvitiApp · SaaS
Plataforma de invitaciones digitales.
```

### H2 · Cierre

```
¿Hablamos de tu proyecto?

Cuéntame qué necesitas y te respondo personalmente.

[Ver precios]  [Escríbeme por WhatsApp]
```

---

## `app/servicios/chatbot-whatsapp/page.tsx`

**title**

```
Chatbot de WhatsApp para empresas en Colombia | JV Agencia
```

**description**

```
Chatbot de WhatsApp que contesta solo, capta interesados, agenda citas y toma
pedidos. Soy proveedor de tecnología verificado por Meta: la conexión la hago
yo, sin intermediarios.
```

**og:description**

```
Tu número contesta solo, a cualquier hora. Proveedor de tecnología verificado
por Meta.
```

**H1**

```
Tu número contesta solo:
responde, agenda y vende
```

*(decía «Su número» — pasa a tuteo)*

**Párrafo**

```
Colombia es el país que más usa WhatsApp en el mundo, y aquí la gente prefiere
escribirle a un negocio antes que llamar o llenar un formulario. El que
contesta primero, vende. Un chatbot hace que ese primero seas tú, a cualquier
hora.
```

### H2 · El diferenciador

```
Casi todos te revenden una plataforma. Yo conecto directo.
```

```
La mayoría de agencias en Colombia no está conectada a Meta: te revenden el
servicio de un tercero. Si ese tercero sube el precio, cambia las reglas o
cierra, tú quedas colgado y ellos no pueden hacer nada.
```

```
Soy proveedor de tecnología verificado por Meta. La conexión de tu número la
hago yo, sin intermediario. Es verificable —no es un sello que me puse solo.
```

*(de paso corrige «J&V» a la marca única «JV Agencia»)*

### H2 · Esto te sirve si te pasa alguna de estas

Las cuatro tarjetas quedan igual: no tenían plural.

```
Vives contestando lo mismo
Se te pierden mensajes de noche y los domingos
Agendas citas por chat
Tomas pedidos por WhatsApp
```

### H2 · Qué se puede automatizar

```
Precios de referencia del proyecto. Puedes empezar por lo más simple y crecer
después, sin rehacer lo hecho.
```

**Aclaración de costos**

```
Una aclaración que hago siempre, de entrada: el consumo de la API de WhatsApp
lo cobra Meta directamente a tu cuenta, con tu propio medio de pago. No está
en estos precios porque no lo facturo yo — depende de cuántas conversaciones
tengas.
```

```
Y el plan de mantenimiento va aparte, desde [PENDIENTE: precio del plan
mensual de mantenimiento] al mes. Sin plan, si expira el token de Meta o
rechazan una plantilla, la automatización deja de responder y nadie se entera.
```

### H2 · Qué incluye, en cualquiera de los cinco

```
Conexión de tu número a la plataforma oficial de WhatsApp Business
Diseño del flujo de conversación, escrito con tus palabras y no con las mías
Dos plantillas de mensaje aprobadas ante Meta
Traspaso a una persona cuando la conversación se complica
Panel para ver las conversaciones y lo que el bot no supo contestar
Capacitación de entrega y 30 días de ajustes sin costo
```

### H2 · Cómo se hace

**01 · Escucho una semana de tus chats**

```
No invento preguntas. Miro lo que de verdad te escriben y qué contestas hoy.
```

**02 · Conecto tu número**

```
La conexión con Meta la hago yo. Tu número sigue siendo tuyo y no cambia.
```

**03 · Escribo el flujo y lo pruebas conmigo**

```
Lo ves funcionando y me dices qué suena raro, antes de que lo vea un cliente.
```

**04 · Sale al aire y lo voy ajustando**

```
Las preguntas que el bot no supo contestar se revisan y se le enseñan.
```

Pie:

```
De 1 a 5 semanas, según lo que necesites
```

### H2 · Lo que siempre preguntan

**¿Reemplaza a alguien de mi equipo?**

```
No, y no te lo vendo así. Filtra: contesta lo repetido y te pasa a ti las
conversaciones que valen la pena. Lo que recuperas son horas, no un sueldo.
```

**¿Tengo que cambiar de número?**

```
No. Se conecta tu número actual de WhatsApp Business. Sigue siendo tuyo y
sigues pudiendo escribir desde el teléfono.
```

**¿Cuánto cuestan las conversaciones?**

```
Eso lo cobra Meta directamente a tu cuenta, con tu propio medio de pago. Yo
cobro por construirlo y mantenerlo, no por las conversaciones. Te lo digo
desde el principio para que no aparezca como sorpresa después.
```

**¿En cuánto tiempo queda funcionando?**

```
Entre 1 y 5 semanas según lo que necesites: unas respuestas automáticas salen
en 2 semanas; un sistema de pedidos con catálogo toma 5.
```

**¿Y si el bot no sabe contestar algo?**

```
Pasa la conversación a una persona. Además queda registrado, para enseñarle
esa respuesta y que la próxima vez la sepa.
```

**¿Necesito un plan mensual?**

```
Es muy recomendable. Una automatización queda corriendo y hay cosas que se
vencen solas: si expira el token de Meta o rechazan una plantilla, deja de
responder y nadie se entera hasta que un cliente reclama. Los planes empiezan
en [PENDIENTE: precio del plan mensual de mantenimiento] al mes.
```

### H2 · Cierre

```
Cuéntame qué te preguntan todo el día
```

```
Veinte minutos bastan para saber si esto te sirve, cuánto costaría y en cuánto
quedaría funcionando. Si no te sirve, te lo digo.
```

```
[Agenda una llamada]  [Ver los demás servicios]
```

---

## `components/BlogPost.tsx` — cierre de cada artículo

**H2**

```
¿Necesitas una web para tu negocio?
```

**Párrafo**

```
Diseño y programo sitios para PYMEs de LATAM. Una página web arranca en
$850.000 y queda lista en 5 días; los demás precios están publicados.
```

**Botones**

```
Ver precios          → /precios
Hablar conmigo       → /#contacto
```

---

## `app/blog/_posts/` — las líneas que estaban en plural

**`necesita-web.tsx`**

```
Respuesta honesta: no todos los negocios la necesitan hoy. Hay cuatro casos en
los que te conviene esperar, y decirlo me cuesta trabajo a mí. Pero venderle
una web a quien no la va a aprovechar termina en un cliente insatisfecho.
```

**`cuanto-cuesta.tsx`**

```
Si llegaste acá porque tú vendes sitios web y quieres saber cuánto cobrar,
escribí la versión desde el otro lado del mostrador en el blog de mi producto
de ventas: cuánto cobrar por una página web
```

**`cuanto-demora.tsx`**

```
Si todavía estás decidiendo el alcance, mira los rangos en cuánto cuesta una
página web en Colombia o cuéntame tu caso y te doy el cronograma en la primera
llamada.
```

Los `excerpt` de `lib/blog.ts` ya estaban en primera persona del singular
(«Te muestro…», «Te doy…»). No cambian.

---

## `components/StructuredData.tsx`

> El `name` de la Person ya dice exactamente **Luis Jaller** en el código
> (commit `b702d58`). Sale de `BUSINESS.founderName`.

**ProfessionalService · description**

```
Estudio de diseño y desarrollo web, software a la medida, chatbots de WhatsApp
y SEO para PYMEs en Latinoamérica, a cargo de Luis Jaller.
```

**Catálogo de servicios** — los nombres se alinean con `lib/services.ts`

```
Diseño de páginas web
  Landing pages, webs corporativas y tiendas online con diseño propio.

Chatbot de WhatsApp
  Respuestas automáticas, captura de interesados, agendamiento de citas,
  pedidos y avisos sobre la WhatsApp Business Platform.

SEO y posicionamiento
  SEO técnico entregado con el sitio y planes mensuales de posicionamiento
  local.

Software a la medida
  Apps web, sistemas internos y plataformas hechas a la medida.

Diseño web / UI
  Interfaz y experiencia de usuario para web y producto digital.

Mantenimiento y soporte
  Planes mensuales de vigilancia, respaldos, cambios de contenido y mejoras
  continuas.
```

---

## `app/manifest.ts`

**name**

```
JV Agencia — Diseño y desarrollo web
```

**description**

```
Estudio de diseño y código de Luis Jaller para PYMEs de LATAM. Webs y software
a la medida que se ven de marca grande y funcionan de verdad.
```

---

## Páginas legales

**`app/privacidad/page.tsx` · description**

```
Política de tratamiento de datos personales de JV Agencia conforme a la Ley
1581 de 2012 (Habeas Data) de Colombia. Conoce qué datos recolecto, con qué
fin y cómo ejercer tus derechos.
```

**`app/privacidad/page.tsx` · cuerpo**

```
Esta política describe cómo los recolecto, uso y protejo, conforme a la Ley
1581 de 2012 y el Decreto 1074 de 2015.
```

**`app/cookies/page.tsx` · description**

```
Política de cookies del sitio web de JV Agencia: qué cookies uso, con qué fin
y cómo puedes gestionarlas.
```

**`app/terminos/page.tsx` · description** — sin cambios

```
Términos y condiciones de uso del sitio web y de los servicios de diseño y
desarrollo web de JV Agencia.
```

**`app/eliminacion-de-datos/page.tsx` · description** — sin cambios

```
Cómo solicitar la eliminación de tus datos personales tratados por JV Agencia,
incluidos los datos de WhatsApp.
```

---

## Otras cotizaciones y guías

El nombre del emisor pasa a **Luis Jaller** en todas las piezas de
`web/public/`. Ya estaba así en las guías de vendedores y en las cotizaciones
de Mónica y la funeraria; se corrigió en la de Pixels Maker, que decía «Luis
Ángel Gambín Jaller».

El nombre **legal** no se toca donde importa: `legalNameOfficial` («GAMBIN
JALLER LUIS ANGEL») sigue en `legalName` de la Organization, que es el campo
que Meta compara contra el RUT.

---

## Pendientes por resolver antes de publicar

| Qué | Dónde | Nota |
|---|---|---|
| **[PENDIENTE: dato]** tiempo de respuesta | `Founder.tsx`, `sobre-nosotros` | El sitio decía «<24h». No estaba en el brief: confírmalo o quítalo |
| **[PENDIENTE: precio]** plan mensual de mantenimiento | `servicios/chatbot-whatsapp` | Dos apariciones: la aclaración de costos y el FAQ del plan mensual |
| **[VERIFICAR]** plazos contradictorios | `FAQ.tsx` vs `/precios` | «1 a 4 semanas» contra «lista en 5 días» |
| **[VERIFICAR]** ¿fintech y logística? | `sobre-nosotros` | La línea del NDA nombra dos sectores sin respaldo a la vista |
| Página `/precios` | no existe todavía | Hay que crearla: la enlazan el Header, el Hero, el pie y los artículos |
| NÜVA Plastic Surgery | `Portfolio.tsx` | Fuera hasta verificar la habilitación en REPS |
| Ruta `/sobre-nosotros` | `Header.tsx`, `Footer.tsx` | La etiqueta pasa a «Sobre mí». Si cambias también la URL, hace falta un 301 |
