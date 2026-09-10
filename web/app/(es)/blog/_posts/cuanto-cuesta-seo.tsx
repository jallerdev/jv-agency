import Link from "next/link";

import { SEO_PRICES } from "@/lib/quote";

// Post: ¿Cuánto cuesta el SEO en Colombia?
// Query objetivo: "cuánto cuesta el SEO en Colombia"
//
// Los precios propios NO se escriben a mano: salen de SEO_PRICES en
// lib/quote.ts, que es lo que cotiza el cotizador. Si mañana sube el plan
// Local, el artículo sube con él y no queda contradiciendo la propuesta que
// recibe el cliente.
//
// `money()` de quote.ts formatea "$ 650.000" con espacio; el resto del blog
// escribe "$650.000". Para no mezclar dos tipografías de precio en el mismo
// texto, se formatea acá sin espacio.
const cop = (n: number) => `$${n.toLocaleString("es-CO")}`;

// La tabla no tiene estilos en .legal y a 390 px se sale. El contenedor con
// scroll propio es lo que impide que la página entera desborde.
function Tabla({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full min-w-[34rem] border-collapse text-left align-top font-body text-sm [&_td]:border-t [&_td]:border-line [&_td]:py-3 [&_td]:pr-4 [&_td]:align-top [&_th]:pb-2 [&_th]:pr-4 [&_th]:font-semibold [&_th]:text-ink">
        {children}
      </table>
    </div>
  );
}

export function CuantoCuestaSeoPost() {
  return (
    <>
      <p>
        <strong>Respuesta corta:</strong> el posicionamiento mensual se cotiza en Colombia entre
        $650.000 y $12.000.000 al mes, y el grueso de las pymes cae entre $1.000.000 y
        $4.500.000. Una auditoría, que se paga una sola vez, va de $500.000 a $5.000.000 según
        el tamaño del sitio.
      </p>
      <p>
        La respuesta útil es más larga, porque ese rango no dice nada si no sabes qué estás
        comprando. Y en SEO, más que en cualquier otro servicio, lo que se compra por debajo de
        cierto precio no es un servicio más barato: es otra cosa con el mismo nombre.
      </p>

      <h2>Antes del precio: con la misma sigla se venden dos cosas distintas</h2>
      <p>
        Casi toda discusión de precio de SEO es, en realidad, una confusión de producto. Debajo
        de esas tres letras caben dos trabajos que no se parecen en nada.
      </p>

      <Tabla>
        <thead>
          <tr>
            <th />
            <th>SEO técnico</th>
            <th>Posicionamiento</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Cuándo se hace</strong>
            </td>
            <td>Una sola vez, al construir o al arreglar la página web</td>
            <td>Todos los meses, mientras dure</td>
          </tr>
          <tr>
            <td>
              <strong>Qué es</strong>
            </td>
            <td>
              Títulos y descripciones, datos estructurados, sitemap, canónicos, imágenes,
              velocidad, alta en Search Console
            </td>
            <td>
              Investigación de búsquedas, contenido nuevo, ficha de Google Business, optimización
              de lo que ya existe, medición y corrección
            </td>
          </tr>
          <tr>
            <td>
              <strong>Cómo se cobra</strong>
            </td>
            <td>Un valor cerrado, al entregar</td>
            <td>Una mensualidad</td>
          </tr>
          <tr>
            <td>
              <strong>Si lo dejas</strong>
            </td>
            <td>Queda hecho. No se deshace solo</td>
            <td>Se detiene, y el que sí sigue te pasa</td>
          </tr>
        </tbody>
      </Tabla>

      <blockquote className="my-7 border-l-2 border-line pl-5 text-ink">
        El SEO técnico es que Google <em>pueda</em> entender tu página web. El posicionamiento es
        que tu página <em>merezca</em> salir. Lo primero se entrega; lo segundo se gana, mes a
        mes.
      </blockquote>

      <p>
        Esa separación no es un invento mío: así cobra el mercado.{" "}
        <a href="https://www.laboratorioweb.com.co/cuanto-cuesta-el-seo-en-colombia/" rel="noopener">
          Laboratorio Web
        </a>{" "}
        publica «auditoría técnica: $1.000.000, pago único» en la misma tabla donde cobra
        $2.000.000 al mes por el servicio.{" "}
        <a href="https://togrowagencia.com/costo-seo-en-colombia-precios-planes/" rel="noopener">
          ToGrow
        </a>{" "}
        pone la auditoría como costo único de $1.500.000 a $5.000.000, y la mensualidad aparte.
      </p>
      <p>
        Cuando alguien te cobra $250.000 «de SEO» y te deja creer que con eso quedas de primero,
        te está vendiendo lo primero con el nombre de lo segundo. El SEO técnico va con la web y
        se entrega con ella — lo cuento en{" "}
        <Link href="/blog/cuanto-cuesta-una-pagina-web-en-colombia">
          cuánto cuesta una página web en Colombia
        </Link>
        .
      </p>

      <h2>Rangos reales del posicionamiento mensual (Colombia, 2026)</h2>
      <p>
        Siete proveedores colombianos que publican sus cifras. No es una encuesta ni un promedio:
        es lo que dice cada uno en su propia página, con el enlace al lado para que lo
        verifiques.
      </p>

      <Tabla>
        <thead>
          <tr>
            <th>Quién lo publica</th>
            <th>Qué publica</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <a
                href="https://togrowagencia.com/costo-seo-en-colombia-precios-planes/"
                rel="noopener"
              >
                ToGrow
              </a>
            </td>
            <td>
              SEO local $650.000 – $1.500.000/mes · pyme o corporativo $1.500.000 – $4.500.000 ·
              tienda virtual $3.000.000 – $7.500.000
            </td>
          </tr>
          <tr>
            <td>
              <a href="https://gulupadigital.com/cuanto-cuesta-el-seo-en-colombia-en-2026/" rel="noopener">
                Gulupa Digital
              </a>
            </td>
            <td>
              General $1.000.000 – $5.000.000/mes · sectores de alta competencia $6.000.000 –
              $12.000.000+ · freelancer $800.000 – $3.000.000
            </td>
          </tr>
          <tr>
            <td>
              <a href="https://stivenramirez.com/blog/cuanto-cuesta-el-seo-colombia/" rel="noopener">
                Stiven Ramírez
              </a>
            </td>
            <td>
              Freelance junior $900.000 – $2.000.000 · consultor sénior $3.500.000 – $7.500.000 ·
              agencia mediana $8.000.000 – $20.000.000+
            </td>
          </tr>
          <tr>
            <td>
              <a
                href="https://seoenmedellin.com/blog/cuanto-cuesta-una-auditoria-seo-en-colombia/"
                rel="noopener"
              >
                SEO en Medellín
              </a>
            </td>
            <td>
              Zona de riesgo $300.000 – $800.000/mes · profesional para pymes $1.500.000 –
              $4.500.000 · premium $5.000.000 – $12.000.000+
            </td>
          </tr>
          <tr>
            <td>
              <a href="https://www.laboratorioweb.com.co/cuanto-cuesta-el-seo-en-colombia/" rel="noopener">
                Laboratorio Web
              </a>
            </td>
            <td>
              Su propia lista: $2.000.000/mes · auditoría técnica $1.000.000 pago único ·
              artículos $300.000 – $500.000 cada uno
            </td>
          </tr>
          <tr>
            <td>
              <a
                href="https://marketingcpe.com.co/blog/seo/cuanto-cuesta-el-posicionamiento-seo-en-colombia/"
                rel="noopener"
              >
                Marketing CPE
              </a>
            </td>
            <td>
              Básico $650.000 – $4.500.000/mes · avanzado $1.800.000 – $12.000.000. Su resumen:
              «de $650.000 a $12.000.000 al mes»
            </td>
          </tr>
          <tr>
            <td>
              <a href="https://blog.drunel.com/cuanto-cuesta-el-seo-en-colombia/" rel="noopener">
                Drunel
              </a>
            </td>
            <td>
              30 USD la hora, con «una dedicación mínima de 20 horas mensuales por cliente»: unos
              600 USD al mes de arranque
            </td>
          </tr>
        </tbody>
      </Tabla>

      <p>Tres cosas que se leen entre líneas de esa tabla:</p>
      <ul>
        <li>
          <strong>El arranque real del SEO local está en $650.000 al mes.</strong> ToGrow y
          Marketing CPE ponen el piso exactamente ahí, cada uno por su lado.
        </li>
        <li>
          <strong>Nadie que publique cifras defiende algo por debajo.</strong> SEO en Medellín
          llama «riesgoso» al tramo de $300.000 a $800.000, y Gulupa marca como señal de alerta
          las cotizaciones «desde $300.000 sin explicar qué se compra».
        </li>
        <li>
          <strong>La horquilla es enorme porque no es el mismo servicio.</strong> Un negocio con
          un local y una ciudad no compra lo mismo que una tienda virtual con cuatro mil fichas
          de producto.
        </li>
      </ul>

      <h2>Cuánto cuesta una auditoría</h2>
      <Tabla>
        <thead>
          <tr>
            <th>Quién lo publica</th>
            <th>Precio de la auditoría</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Stiven Ramírez</td>
            <td>
              Revisión básica $500.000 – $900.000 · estándar $1.200.000 – $2.000.000 · completa
              $2.000.000 – $3.500.000
            </td>
          </tr>
          <tr>
            <td>Laboratorio Web</td>
            <td>$1.000.000, pago único</td>
          </tr>
          <tr>
            <td>ToGrow</td>
            <td>$1.500.000 – $5.000.000, costo único</td>
          </tr>
          <tr>
            <td>Marketing CPE</td>
            <td>$1.000.000 – $5.000.000</td>
          </tr>
          <tr>
            <td>SEO en Medellín</td>
            <td>$1.000.000 – $10.000.000 · sitios de menos de 50 URLs: $1.000.000 – $2.500.000</td>
          </tr>
        </tbody>
      </Tabla>
      <p>
        Fíjate en lo que dicen las cinco: <strong>pago único</strong>. La auditoría es el arranque
        parejo, no la mensualidad. Si te la venden como suscripción, pregunta qué se está
        auditando todos los meses.
      </p>

      <h2>Por qué existe un piso de precio</h2>
      <p>Tres cuentas, todas verificables. Ninguna necesita adjetivos.</p>

      <h3>1. La herramienta sola cuesta más que un plan barato</h3>
      <p>
        Precios de lista, consultados el 9 de septiembre de 2026:{" "}
        <a href="https://ahrefs.com/pricing" rel="noopener">
          Ahrefs
        </a>{" "}
        Lite, 129 USD al mes; Ahrefs Standard, 249 USD.{" "}
        <a href="https://www.semrush.com/pricing/" rel="noopener">
          Semrush
        </a>{" "}
        plan SEO, 139 USD; Starter, 199 USD. Al cambio de ese día —$3.116,47 por dólar— la
        licencia más barata de Ahrefs sale en unos $402.000 mensuales.
      </p>
      <p>
        Un plan de SEO de $300.000 al mes no alcanza ni para pagar la herramienta con la que
        supuestamente te lo van a hacer. Y eso es antes de que alguien abra el computador.
      </p>

      <h3>2. Las horas que hay detrás de un mes de trabajo</h3>
      <p>
        SEO en Medellín lo pone por escrito: «un presupuesto mensual sano debe cubrir entre 30 y
        80 horas de trabajo humano real». Drunel declara 20 horas mínimas por cliente a 30 USD la
        hora, que a la tasa de arriba son unos $93.500 la hora. Treinta horas a ese precio pasan
        de $2.800.000.
      </p>
      <p>
        Ahí sale la cuenta completa: un plan de $650.000 al mes solo cuadra cuando el que trabaja
        es el mismo que responde —sin comercial, sin gerente de proyecto, sin capa de agencia— y
        sobre un alcance chico de verdad: una ciudad, un servicio.
      </p>

      <h3>3. La cuenta que no admite discusión: la nómina</h3>
      <p>
        El{" "}
        <a href="https://www.buk.co/blog/salario-minimo-colombia" rel="noopener">
          salario mínimo de 2026
        </a>{" "}
        es de $1.750.905 más $249.095 de auxilio de transporte. Con prestaciones y seguridad
        social, esa persona le cuesta al empleador $2.715.573 al mes. La jornada ordinaria bajó a
        42 horas semanales, o sea 210 horas al mes: <strong>$12.931 la hora cargada</strong> —y
        estamos hablando de quien gana el mínimo, no de un especialista.
      </p>
      <p>
        Con eso, un plan de $300.000 al mes compra 23 horas de la persona peor pagada legalmente
        en Colombia, sin herramientas y sin nadie que revise. Nadie posiciona nada con eso. Por
        eso el precio bajo no compra menos SEO: compra otra cosa. Casi siempre enlaces comprados,
        artículos de máquina sin revisar, o un PDF exportado de una herramienta con un logo
        encima.
      </p>

      <h2>En cuánto tiempo se ve algo</h2>
      <p>
        Nunca una posición prometida. Lo que sí se puede decir, con fuente. Google lo publica en
        su{" "}
        <a
          href="https://developers.google.com/search/docs/fundamentals/do-i-need-seo"
          rel="noopener"
        >
          guía para contratar un SEO
        </a>
        : «en la mayoría de los casos, el SEO necesitará de cuatro meses a un año» para
        implementar las mejoras y después ver el beneficio.
      </p>
      <p>
        El{" "}
        <a
          href="https://ahrefs.com/blog/how-long-does-it-take-to-rank-in-google-and-how-old-are-top-ranking-pages/"
          rel="noopener"
        >
          estudio de Ahrefs
        </a>{" "}
        sobre cerca de un millón de URLs pone la cifra incómoda: solo el 1,74 % de las páginas
        nuevas entra al top 10 en su primer año, el 72,9 % de las páginas que están en el top 10
        tienen más de tres años, y la que está de primera lleva, en promedio, cinco años ahí.
      </p>
      <p>
        Las agencias colombianas coinciden entre ellas: ToGrow habla de 4 a 6 meses para los
        primeros resultados visibles, Drunel de 3 a 6 meses para las primeras señales, y{" "}
        <a href="https://cangrejodigital.com/seo/cuanto-cuesta-seo-colombia/" rel="noopener">
          Cangrejo Digital
        </a>{" "}
        de mejoras iniciales entre el mes 1 y el 3. Yo lo digo igual:{" "}
        <strong>los primeros movimientos se ven entre el mes 3 y el 6.</strong> Antes de eso,
        medir sirve para corregir, no para juzgar.
      </p>

      <h2>Cinco señales de que te están vendiendo humo</h2>
      <ol className="mb-5 list-decimal space-y-1 pl-6 marker:text-ink/50">
        <li>
          <strong>Te garantizan el primer puesto.</strong> Google lo dice con todas las letras:
          «nadie puede garantizar el primer puesto en Google», y advierte también del que alega
          una «relación especial» con Google o un «envío prioritario». La variante colombiana es
          «top 3 en 60 días».
        </li>
        <li>
          <strong>Te venden mil enlaces.</strong> Comprar y vender enlaces para posicionar está
          nombrado como spam en las{" "}
          <a
            href="https://developers.google.com/search/docs/essentials/spam-policies"
            rel="noopener"
          >
            políticas de Google
          </a>
          . Laboratorio Web publica el caso local: «500 enlaces por $200.000». Son $400 por
          enlace. Nadie consigue por $400 un enlace que un medio real haya decidido poner.
        </li>
        <li>
          <strong>Te mandan posiciones y ningún dato de tráfico.</strong> La ayuda de{" "}
          <a href="https://support.google.com/webmasters/answer/7042828" rel="noopener">
            Search Console
          </a>{" "}
          aclara que la posición es un promedio y cambia según el historial y la ubicación de
          quien busca. Los clics y las impresiones de tu propiedad, en cambio, no los maquilla
          nadie. Pregunta de una línea que resuelve el caso: <em>¿me das acceso de lectura a mi
          Search Console?</em> Si la respuesta se enreda, ya sabes.
        </li>
        <li>
          <strong>La auditoría es un PDF con el logo encima.</strong> Lo describe SEO en
          Medellín: «un PDF exportado directamente de una herramienta automatizada con el
          logotipo de ellos superpuesto». Una auditoría de verdad parte de <em>tus</em> datos: tu
          Search Console, tu analítica, tu sitio rastreado.
        </li>
        <li>
          <strong>Te cotizan sin haber mirado tu página.</strong> Drunel lo tiene en su lista de
          alerta, y Google agrega dos de la misma familia: desconfía del que no explique
          claramente qué va a hacer, y del que te escriba en frío.
        </li>
      </ol>
      <p>
        Y una para 2026: Google sumó a sus políticas de spam el uso de IA para «generar muchas
        páginas sin aportar valor». Los planes de «20 artículos al mes» por menos de lo que
        cuesta escribir uno bien caen justo ahí.
      </p>

      <h2>Qué cobro yo</h2>
      <p>
        Mi plan Local arranca en <strong>{cop(SEO_PRICES.plan.local)} al mes</strong>: una ciudad,
        un servicio principal, la ficha de Google Business gestionada, dos contenidos al mes y un
        informe donde se ve qué se hizo y qué se movió. Es exactamente el piso que publican
        ToGrow y Marketing CPE para SEO local en Colombia. No estoy por debajo del mercado: estoy
        en el arranque del mercado, y puedo estarlo porque no hay agencia de por medio. El que
        investiga, el que escribe y el que contesta el WhatsApp somos la misma persona. Ese es
        todo el descuento, y es honesto.
      </p>
      <p>
        La revisión y el arreglo del sitio son <strong>{cop(SEO_PRICES.extras.puestaApunto)}</strong>,
        se pagan una sola vez y <strong>no se cobran si la página web la hice yo</strong> con SEO
        técnico incluido. La ficha de Google Business, si no la tienes,{" "}
        {cop(SEO_PRICES.extras.ficha)} por una vez. Cuando el negocio tiene varios servicios o
        varias ciudades, el plan sube a {cop(SEO_PRICES.plan.crecimiento)} al mes.
      </p>
      <p>
        Lo que no vas a encontrar en ninguna propuesta mía es una garantía de primer puesto. Nadie
        puede dártela, y quien te la ponga por escrito te está mintiendo: las posiciones las
        decide Google. Lo que sí te garantizo es el trabajo hecho, medido y visible en un informe.
      </p>
      <p>
        Trabajo desde Turbaco, con negocios de la costa y del resto del país:{" "}
        <Link href="/diseno-de-paginas-web-en-cartagena">Cartagena</Link>,{" "}
        <Link href="/diseno-de-paginas-web-en-barranquilla">Barranquilla</Link> y{" "}
        <Link href="/diseno-de-paginas-web-en-bogota">Bogotá</Link>. Si todavía estás decidiendo
        si te conviene invertir en esto, empieza por{" "}
        <Link href="/blog/mi-negocio-necesita-pagina-web">
          ¿mi negocio necesita página web?
        </Link>{" "}
        —y si tu negocio es{" "}
        <Link href="/sectores/salones-y-spas">un salón o un spa</Link> o{" "}
        <Link href="/sectores/clinicas-y-consultorios">una clínica o un consultorio</Link>, ahí
        está lo que cambia en cada caso— y después vuelve. Y si ya lo tienes claro,{" "}
        <Link href="/agendar">cuéntame qué vendes y en qué ciudad</Link>: con eso te digo en
        qué plan caes antes de cobrarte nada.
      </p>
      <p>
        Este artículo explica el mercado. Lo que yo hago, con lo que incluye y lo que no, está
        en <Link href="/servicios/posicionamiento-seo">posicionamiento SEO</Link>.
      </p>
    </>
  );
}
