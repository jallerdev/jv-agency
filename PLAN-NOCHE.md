# Plan de la noche · 9 de septiembre de 2026

Lo que voy a dejar hecho mientras duermes, en orden. Cada tanda espera a la
anterior a propósito: dos workflows editando los mismos archivos al mismo
tiempo se pisan, y prefiero secuencial y sano que paralelo y roto.

Estado: se actualiza a medida que avanzo.

---

## Hecho antes de empezar

- [x] **Next 16.3.4 + React 19.2.8.** Cuatro cambios obligados: `params` y
      `searchParams` ahora son promesas, React 19 quitó el namespace global
      `JSX`, `cloneElement` se tipa contra las props reales del hijo, y
      `middleware.ts` pasó a `proxy.ts`. Build limpio, ocho rutas verificadas
      con navegador real: 200, hidratan, cero errores de consola.
- [x] **GitHub roto del JSON-LD.** `founderProfiles` apuntaba a
      `github.com/jallerangel`, que da 404. Corregido a `jallerdev`.
- [x] **Firma de la cotización de Pixels** unificada a «Luis Jaller».
- [x] **`COPY-PRIMERA-PERSONA.md`** con el copy del sitio reescrito a primera
      persona, archivo por archivo.

---

## Tanda A · Rediseño integral  🔄 corriendo

Workflow de cuatro fases y doce agentes.

1. **Diagnóstico** — cinco auditorías en paralelo, cada una con sus propias
   capturas en escritorio y móvil: jerarquía y ritmo, presentación del
   portafolio, movimiento, experiencia móvil, y acabado fino.
2. **Fundamentos** — un solo agente construye lo compartido: escala de
   duraciones, curvas de aceleración con nombre, `Reveal` con variantes y
   escalonado, y respeto real a `prefers-reduced-motion`.
3. **Secciones** — cinco agentes en paralelo, cada uno con archivos exclusivos:
   apertura (hero, header, **menú móvil que hoy no existe**), portafolio,
   oferta, prueba social, cierre.
4. **Revisión** — un agente hace el pase de coherencia que ninguno pudo hacer:
   `tsc --noEmit`, costuras entre secciones, movimiento acumulado, foco visible,
   desbordamiento a 390 px.

El encargo principal, con tus palabras: que las capturas de las webs se vean
épicas y que la sección se sienta única.

---

## Tanda B · El copy en primera persona

Aplicar `COPY-PRIMERA-PERSONA.md` al código. Espera a la Tanda A porque toca
los mismos componentes.

- Todo el sitio de plural a **yo/mi/me**.
- Metadatos, `og:description` y textos alternativos incluidos.
- Portafolio: **NÜVA fuera** (hasta verificar la habilitación en REPS) y el
  segundo grupo pasa a «Proyectos de estudio», con el texto que dice la verdad:
  los construí por iniciativa propia, nadie me los encargó.
- Los datos sin confirmar quedan marcados `[PENDIENTE: dato]` a la vista, no
  rellenados con algo verosímil.

---

## Tanda C · La página de precios

Ruta nueva `/precios`, enlazada desde el header, el hero, el pie y los
artículos del blog.

Los únicos números permitidos:

| Servicio | Desde | Plazo |
|---|---|---|
| Página web | $850.000 | 5 días |
| Tienda online | $2.500.000 | 3 semanas |
| Auditoría SEO | $390.000 | 5 días |
| SEO local mensual | $450.000/mes | — |
| Renovación anual | $290.000 | — |
| Software a la medida | según alcance | — |

Publicar precios es el diferenciador: ninguna agencia de Cartagena lo hace.

---

## Tanda D · Las páginas que faltan para vender

Del mapa de `SEO-INTENCIONES-DE-COMPRA.md`. Hoy el sitio no tiene **una sola
página** que apunte a la intención de comprar.

Cinco páginas de servicio, empezando por las que ya tienen precio publicado:

- `/servicios/diseno-de-paginas-web`
- `/servicios/posicionamiento-seo`
- `/servicios/tiendas-virtuales`
- `/servicios/software-a-la-medida`

(`/servicios/chatbot-whatsapp` ya existe y sirve de patrón.)

---

## Tanda F · Intenciones de compra  🔄 corriendo

Workflow de seis fases y once agentes, en paralelo con el rediseño porque no
comparten un solo archivo: aquel edita `web/components/`, este crea rutas
nuevas bajo `web/app/`.

**Lo que dicen los datos reales.** Search Console, tres meses: 4 clics, 199
impresiones, posición media 28,3. De 41 consultas, la agencia aparece por una
sola cosa de su negocio —«cuánto cuesta una página web», 7 impresiones, 0
clics—. Todo lo demás son consultas de HalcónOS. El sitio cubre la intención de
**duda** y no tiene nada en la de **decisión**. Nadie lo busca con «en
Cartagena» porque no hay una sola página que lo diga.

1. **Investigación** — tres agentes con búsqueda web real: quién sale primero
   hoy en cada ciudad y qué promete; qué cobran de verdad por un chatbot en
   Colombia y cómo cobra Meta las conversaciones; qué cobran por SEO y por qué
   existe un piso de precio.
2. **Ciudades** — `/diseno-de-paginas-web-en-cartagena` primero (Pixels Maker y
   Elka Gómez son de allá), luego Barranquilla (Marcopolo) y Bogotá de último.
   **Límite duro: máximo diez páginas de ciudad en todo el sitio, cada una con
   contenido propio real.** Diez páginas clonadas con el nombre cambiado son
   *doorway pages* y eso cuesta el sitio. Al agente de Bogotá le di permiso
   explícito de **no hacerla** si no encuentra un ángulo honesto: no hay ni un
   proyecto de allá.
3. **Artículos** — «¿Cuánto cuesta un chatbot de WhatsApp en Colombia?» (el
   gemelo del artículo que mejor funciona, con mucha menos competencia) y
   «¿Cuánto cuesta el SEO en Colombia?».
4. **Sectores** — audita primero, construye después. La regla es *sin caso, no
   hay página*, así que es probable que salgan una o dos de las cuatro, no
   cuatro. Prefiero que descarte y explique por qué.
5. **Integración** — sitemap, registro de los artículos, y los enlaces internos
   entre lo viejo y lo nuevo, que es la mitad del valor y casi nunca se hace.
   Más una comprobación de que dos páginas no acaben peleando por la misma
   búsqueda.
6. **Técnico** — HSTS con `includeSubDomains` (con la precaución de no romper
   `halcon.jvagencia.com`), CSP en modo **solo reporte** para empezar, y Core
   Web Vitals medidos de verdad, no estimados.

**Un dato del ACTION-PLAN estaba viejo:** decía que el redirect apex→www era
307. Ya no. Hoy responde **308**, lo resuelve `web/proxy.ts`, y lo verifiqué con
curl. HSTS sí existe (`max-age=63072000`) pero sin `includeSubDomains`. CSP no
hay ninguna.

---

## Tanda E · Cierre

- `pnpm build` limpio.
- Recorrido con navegador de todas las rutas: 200, hidratación, consola limpia.
- Commits separados por tanda, en español, sin `Co-Authored-By`.
- Empujar a `main` y verificar que Vercel despliega.

---

## Lo que NO puedo hacer sin ti

| Qué | Por qué te necesito |
|---|---|
| Search Console | Hay que pegar el código de verificación que te da Google |
| `[PENDIENTE: dato]` tiempo de respuesta | El sitio decía «<24h» y no está confirmado |
| `[PENDIENTE: precio]` plan mensual de mantenimiento | Aparece dos veces en la página de chatbot |
| Plazos contradictorios | El FAQ dice «1 a 4 semanas» y los precios «5 días» |
| ¿Fintech y logística? | La línea del NDA en «sobre mí» nombra dos sectores |
| Dirección del taller de Yeiser | Para las fichas de Google de Pixels Maker |
| Rotar contraseñas | `Colombia2026` es adivinable y la de Pixels viajó por chat |

---

## Incidente de la madrugada: el puerto 3000

Los once agentes de los dos workflows tienen `http://localhost:3000` escrito en
el prompt, y eso no se puede cambiar con el workflow en marcha.

Pasó lo siguiente, en cadena:

1. Mis servidores de desarrollo se morían solos, con código 0 y sin error.
   **La causa eran `pkill -f "next dev"` cruzados entre las dos sesiones.** Ese
   patrón busca por línea de comandos y no distingue proyecto: el proceso padre
   de cualquier Next contiene «next dev» y el hijo se llama `next-server`, así
   que cada `pkill` de una sesión mataba también el servidor de la otra. Yo lo
   corrí tres veces y la otra sesión otras tantas.
   La regla que faltaba: **guardar el PID al lanzar y matar ese PID**, nunca por
   patrón de nombre.
2. Cada vez que el 3000 quedaba libre, otro proyecto lo tomaba. Durante un rato
   `localhost:3000` sirvió el sitio de la **Dra. Natalia Acosta**.
3. La sesión de ese proyecto, en espejo, estuvo tomando capturas de JV Agencia
   creyendo que era el suyo. Lo detectó porque sus selectores no encontraban los
   botones esperados.

Resuelto así:

- Nada de `pkill` por patrón. Se guarda el PID al lanzar y se mata ese PID.
  (Los servidores además van desasociados con `setsid nohup … < /dev/null &`,
  que no estorba, pero conviene saber que eso **no** protege de un `pkill`: yo
  primero culpé a un reaper de la sesión y me equivoqué.)
- Hay un **guardián** corriendo que cada 30 segundos comprueba el `<title>` —no
  solo que el puerto responda— y relanza si hace falta. Si ve que el 3000 lo
  tiene otro proyecto, lo anota y no lo toca.
  Registro en `scratchpad/guardian.log`.
- La otra sesión movió su servidor al 3200 por su cuenta.

**Queda por revisar:** si algún agente verificó su trabajo durante la ventana en
que el 3000 servía el sitio equivocado, sus conclusiones no valen. Al terminar
los workflows repito la verificación contra el puerto bueno y lo digo aquí.

La lección, para las dos sesiones: un 200 en el puerto no prueba que sea tu
sitio, y una tarea en segundo plano no garantiza que siga viva.

---

## Aviso: dos sesiones en el mismo repo

`jv-agency-96` estuvo commiteando aquí esta noche. Uno de sus commits
—`1850f5e`— se llevó dentro un cambio mío que estaba preparado para otro
commit. No se perdió nada, pero quedó registrado bajo un mensaje que habla de
otra cosa. Si vas a seguir con dos sesiones, conviene que cada una trabaje en
su propia rama.
