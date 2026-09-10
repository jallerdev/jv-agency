import Link from "next/link";
import { Pendiente } from "@/components/Pendiente";

import { A_PRICES, A_TYPE_LABEL, META_BILLING_NOTE, money } from "@/lib/quote";
import type { AutomationType } from "@/lib/quote";

// Post: ¿Cuánto cuesta un chatbot de WhatsApp en Colombia?
// Query objetivo: "cuánto cuesta un chatbot de WhatsApp"
//
// Es el gemelo de `cuanto-cuesta.tsx` (el post que mejor rinde) aplicado a una
// consulta con mucha menos competencia. Su trabajo es alimentar
// /servicios/chatbot-whatsapp.
//
// POR QUÉ LOS PRECIOS PROPIOS SE IMPORTAN Y NO SE ESCRIBEN A MANO:
// si mañana cambia `A_PRICES` en lib/quote.ts, el cotizador y este artículo
// tienen que decir lo mismo. Hardcodearlos acá garantiza que en seis meses el
// blog esté cotizando otra cosa que la propuesta.
//
// ⚠️ CADUCIDAD — este es el post más perecedero del blog:
//   • El 1/10/2026 Meta empieza a cobrar los mensajes de servicio y publica
//     lista de tarifas nueva (las actualiza cada trimestre). Ese día hay que
//     revisar la sección «Lo que cambia el 1 de octubre», resolver los
//     [PENDIENTE] visibles y poner `updatedAt` en la entrada de lib/blog.ts.
//   • Los precios de los competidores están fechados en el texto a propósito:
//     si alguien los actualiza, se ve de una que la cita quedó vieja.

const TIPOS: AutomationType[] = ["faq", "avisos", "leads", "citas", "pedidos"];

export function CuantoCuestaChatbotPost() {
  return (
    <>
      <p>
        <strong>Respuesta corta:</strong> entre $600.000 y $2.500.000 de montaje, más una
        mensualidad que va de $150.000 a $1.600.000 según quién te lo arme. Pero el número que
        de verdad decide si te sirve no es ninguno de esos dos. Es el que casi nunca aparece en
        la cotización: lo que Meta te va a cobrar <em>a ti</em>, directo a tu medio de pago, por
        cada mensaje que salga de tu número. Y eso cambia el 1 de octubre de 2026.
      </p>

      <h2>Lo que se cobra hoy en Colombia</h2>
      <p>
        Precios publicados por proveedores colombianos, consultados en septiembre de 2026:
      </p>
      <table>
        <thead>
          <tr>
            <th>Proveedor</th>
            <th>Montaje (una vez)</th>
            <th>Mensualidad</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <a href="https://botiffy.com/blog-costo-chatbot-whatsapp-colombia.html" rel="noopener">
                Botiffy
              </a>{" "}
              (4 planes)
            </td>
            <td>$599.000 – desde $2.500.000</td>
            <td>$399.000 – $1.590.000</td>
          </tr>
          <tr>
            <td>
              <a href="https://codedrop.cloud/en/blog/chatbot-whatsapp-colombia-negocios" rel="noopener">
                CodeDrop
              </a>
            </td>
            <td>desde $600.000 · desde $1.500.000 con IA y agenda</td>
            <td>desde $150.000</td>
          </tr>
          <tr>
            <td>
              <a href="https://softhian.com/servicios/chatbots-y-automatizacion" rel="noopener">
                Softhian
              </a>{" "}
              (Bogotá)
            </td>
            <td>desde $1.000.000</td>
            <td>no publica</td>
          </tr>
          <tr>
            <td>
              <a href="https://panabot.co/" rel="noopener">
                PanaBot
              </a>
            </td>
            <td>no publica</td>
            <td>$49.000 / $149.000 / $299.000</td>
          </tr>
          <tr>
            <td>
              <a href="https://projectia.com.co/blog/chatbot-ia-whatsapp-business-colombia.html" rel="noopener">
                Projectia
              </a>
            </td>
            <td>no publica</td>
            <td>$500.000 – $2.500.000</td>
          </tr>
        </tbody>
      </table>
      <p>
        La mensualidad de Botiffy no es abierta: cada plan trae un tope —200, 500, 900 y 1.500
        conversaciones— y la que se pase de ahí se cobra aparte, entre $800 y $1.200 según el
        plan. Guarda ese dato: vuelve más abajo.
      </p>
      <p>
        Miré ocho proveedores colombianos. Cinco publican algún precio y uno solo publica la
        lista completa —montaje, mensualidad y costo de la conversación adicional—. Los otros
        tres (Chatbot Colombia, Bots Colombia y CRMwHATA) te piden llenar un formulario. No es
        mala fe: el precio sí depende del alcance. Pero si vas a comparar, ya sabes por qué te
        cuesta tanto.
      </p>

      <h2>Lo que cobro yo</h2>
      <p>Montaje, una sola vez. Salen del mismo cotizador con el que armo tu propuesta:</p>
      <table>
        <thead>
          <tr>
            <th>Lo que hace el bot</th>
            <th>Montaje</th>
            <th>Entrega</th>
          </tr>
        </thead>
        <tbody>
          {TIPOS.map((t) => (
            <tr key={t}>
              <td>{A_TYPE_LABEL[t]}</td>
              <td>{money(A_PRICES.base[t])}</td>
              <td>
                {A_PRICES.deliveryWeeks[t].urgent} a {A_PRICES.deliveryWeeks[t].extended} semanas
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Van {A_PRICES.plantillasIncluidas} plantillas aprobadas ante Meta; cada plantilla
        adicional, {money(A_PRICES.plantillaExtra)}. Se cotizan aparte la conexión y verificación
        de WhatsApp Business ({money(A_PRICES.extras.onboarding)}), las respuestas con IA sobre tu
        contenido ({money(A_PRICES.extras.ia)}), la integración con tu CRM (
        {money(A_PRICES.extras.crm)}) o con Google Calendar ({money(A_PRICES.extras.agenda)}), el
        cobro dentro del chat ({money(A_PRICES.extras.pagos)}), el traspaso a un agente humano (
        {money(A_PRICES.extras.handoff)}) y cada idioma adicional ({money(A_PRICES.extras.idioma)}
        ).
      </p>
      <p>
        Mantenimiento mensual: {money(A_PRICES.mantenimiento.basico)} el básico,{" "}
        {money(A_PRICES.mantenimiento.estandar)} el estándar y{" "}
        {money(A_PRICES.mantenimiento.avanzado)} el avanzado. Qué hace cada tipo de bot está en{" "}
        <Link href="/servicios/chatbot-whatsapp">la página del servicio</Link>.
      </p>
      <p>
        <strong>Lo que no cobro son las conversaciones.</strong> Y esa es la parte del negocio
        que casi nadie te explica bien.
      </p>

      <h2>La sorpresa: Meta te cobra aparte, a ti</h2>
      <blockquote>{META_BILLING_NOTE}</blockquote>
      <p>
        Eso no es letra pequeña mía: es cómo funciona la plataforma para todo el mundo. Lo que
        cambia de un proveedor a otro es quién te pasa la cuenta.
      </p>

      <h3>Ya no se cobra por conversación. Se cobra por mensaje.</h3>
      <p>
        Desde el <strong>1 de julio de 2025</strong>, Meta cobra por mensaje y no por
        conversación —<em>«Effective July 1, 2025, Meta charges on a per-message basis»</em>— y
        solo cuando el mensaje de plantilla se entrega:{" "}
        <a
          href="https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing/?locale=es_LA"
          rel="noopener"
        >
          <em>«You are only charged when a template message is delivered»</em>
        </a>
        .
      </p>
      <p>
        Si un proveedor todavía te cotiza «por conversación», está usando un modelo que Meta
        cambió hace más de un año. No es necesariamente engaño —muchas plataformas siguen
        empaquetando su servicio así—, pero sí es señal de que lo que te vende es su paquete y no
        la tarifa de Meta.
      </p>

      <h3>Qué se cobra y qué no</h3>
      <table>
        <thead>
          <tr>
            <th>Categoría</th>
            <th>Para qué es</th>
            <th>¿Se cobra?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Marketing</td>
            <td>Promociones, novedades, carrito abandonado</td>
            <td>Siempre</td>
          </tr>
          <tr>
            <td>Utilidad</td>
            <td>Confirmación de pedido, guía de envío, recordatorio de cita</td>
            <td>Hoy no, si va dentro de la ventana de servicio</td>
          </tr>
          <tr>
            <td>Autenticación</td>
            <td>Códigos de un solo uso</td>
            <td>Sí</td>
          </tr>
          <tr>
            <td>Servicio</td>
            <td>Tus respuestas libres dentro de la ventana</td>
            <td>Hoy no — cambia el 1 de octubre de 2026</td>
          </tr>
        </tbody>
      </table>
      <p>Cuatro reglas que conviene decir en voz alta porque casi nadie las explica:</p>
      <ul>
        <li>
          <strong>Los mensajes que te escriben tus clientes son gratis. Siempre.</strong> Te
          cobran lo que sale, no lo que entra.
        </li>
        <li>
          <strong>La ventana de servicio de 24 horas</strong> se abre sola cuando un cliente te
          escribe. Hoy, dentro de ella, lo que no es plantilla no se cobra.
        </li>
        <li>
          <strong>Punto de entrada gratuito: 72 horas.</strong> Si el cliente llega por un
          anuncio de click-to-WhatsApp y tú respondes dentro de las primeras 24 horas, se abre
          una ventana de 72 horas donde todo mensaje es gratis. Plata directa para quien pauta y
          no lo sabe.
        </li>
        <li>
          <strong>Los descuentos por volumen solo existen en utilidad y autenticación.</strong>{" "}
          Marketing no baja por mucho que mandes. Y Meta actualiza las tarifas cada trimestre: 1
          de enero, 1 de abril, 1 de julio y 1 de octubre.
        </li>
      </ul>

      <h3>Cuánto es eso en Colombia</h3>
      <p>
        Estás hablando de <strong>centavos de dólar por mensaje</strong>, no de dólares. Las
        fuentes que dicen haber verificado la lista oficial de Meta ponen el mensaje de marketing
        para Colombia en{" "}
        <a href="https://leadsales.io/blog/whatsapp-business-api-cuanto-cuesta/" rel="noopener">
          USD 0,0125
        </a>{" "}
        y el de utilidad en{" "}
        <a href="https://www.simla.com/blog/precios-whatsapp-business-api" rel="noopener">
          USD 0,0008
        </a>
        . Mil mensajes de marketing salen entonces por unos USD 12,50. Otras publicaciones de
        2026 dan cifras distintas para el mismo país, así que quédate con el orden de magnitud y
        no con la cifra al centavo: la única lista que manda es la de Meta, y cambia cada tres
        meses.
      </p>
      <Pendiente>[PENDIENTE: verificar la fila de Colombia contra la lista oficial de Meta el día de publicación. Entra lista nueva el 1 de octubre de 2026 y estas cifras caducan ese día.]</Pendiente>

      <h3>Lo que cambia el 1 de octubre de 2026</h3>
      <p>
        Esto pasa en tres semanas y es donde se va a llevar la sorpresa medio mercado. A partir
        de esa fecha Meta empieza a cobrar los <strong>mensajes de servicio</strong>: las
        respuestas libres que escribe una persona de tu equipo —o un bot— dentro de la ventana de
        24 horas. Eran gratis desde noviembre de 2024. Cada número de empresa recibe{" "}
        <strong>1.000 mensajes de servicio gratis al mes</strong>, que no se acumulan, y de ahí
        en adelante se cobran a la misma tarifa de utilidad/autenticación del país de quien
        recibe y <strong>sin descuento por volumen</strong>. Además, las plantillas de utilidad
        enviadas dentro de la ventana pasan a cobrarse. Meta dijo que publicaría las tarifas
        definitivas a más tardar el 1 de septiembre de 2026 (
        <a
          href="https://support.zendesk.com/hc/en-us/articles/11113277351322-Announcing-upcoming-changes-to-WhatsApp-Business-messaging-pricing"
          rel="noopener"
        >
          Zendesk
        </a>
        ,{" "}
        <a
          href="https://www.ycloud.com/blog/whatsapp-api-message-pricing-update-effective-october-1-2026"
          rel="noopener"
        >
          YCloud
        </a>
        ).
      </p>
      <p>
        Ahora, sin alarmar de más: para un negocio pequeño en Colombia esto pesa poco. Mil mensajes gratis al mes le alcanzan de sobra a quien atiende
        veinte o treinta chats al día, y lo que pase de ahí va a tarifa de utilidad, la más barata
        de todas. Para un centro de contacto con tres agentes escribiendo todo el día sí es una
        cuenta nueva. Lo importante no es el monto: es que{" "}
        <strong>tu cotización de hoy no lo tiene adentro</strong>, y quien te dijo «las
        conversaciones van incluidas» va a tener que hablarte otra vez.
      </p>
      <p>
        Aclaración que se pierde siempre: todo esto es de la API. Si atiendes desde la app
        gratuita de WhatsApp Business en tu teléfono, no te cobran nada y este cambio no te toca.
      </p>

      <h2>Quién te factura ese consumo</h2>
      <p>
        Meta define dos figuras y la diferencia es justo esa. Un <strong>Solution Partner</strong>{" "}
        tiene línea de crédito con Meta y puede extendérsela a sus clientes: el cliente no pone
        medio de pago propio y el partner le factura el consumo. Un <strong>Tech Provider</strong>{" "}
        no tiene línea de crédito, así que el cliente pone su propio medio de pago,{" "}
        <a
          href="https://developers.facebook.com/documentation/business-messaging/whatsapp/solution-providers/overview"
          rel="noopener"
        >
          Meta le factura el consumo directamente al cliente
        </a>{" "}
        y el proveedor factura los demás servicios.
      </p>
      <p>
        Yo soy <strong>proveedor de tecnología verificado por Meta</strong>: la conexión de tu
        número la hago yo, directo con Meta, sin plataforma de por medio. Qué significa eso de
        verdad:
      </p>
      <ul>
        <li>La cuenta de WhatsApp Business queda <strong>a tu nombre</strong>, no al mío.</li>
        <li>
          El consumo de la API te lo cobra Meta a ti, con tu medio de pago, a su tarifa de lista.
          Yo no lo facturo y por lo tanto no le pongo margen.
        </li>
        <li>Si mañana no quieres trabajar conmigo, te llevas el número, la cuenta y las plantillas.</li>
      </ul>
      <p>Y qué no significa, para que quede claro:</p>
      <ul>
        <li>
          No hace que tus mensajes sean más baratos por ser míos. La lista de Meta es la misma
          para todos; lo que cambia es si alguien le pone margen encima.
        </li>
        <li>No es el check verde. Eso es otra cosa y se pide aparte.</li>
        <li>No me da, ni te da, prioridad de ningún tipo ante Meta.</li>
      </ul>
      <p>
        Los dos números de arriba se pueden mirar lado a lado: una plataforma que revende cobra
        la conversación adicional entre $800 y $1.200, y Meta cobra el mensaje de marketing en
        Colombia en el orden de USD 0,0125. Miden cosas distintas —el primero incluye el servicio
        de la plataforma, el segundo es la lista— y ninguno está mal. Lo que sí deberías saber es
        cuál de los dos estás pagando.
      </p>

      <h2>Lo que casi nunca está incluido</h2>
      <ul>
        <li>
          <strong>El consumo de la API de Meta.</strong> Es el grande y va a tu cuenta. CodeDrop
          lo estima para un negocio pequeño en Colombia{" "}
          <a href="https://codedrop.cloud/en/blog/chatbot-whatsapp-colombia-negocios" rel="noopener">
            entre $60.000 y $120.000 al mes
          </a>{" "}
          según el volumen.
        </li>
        <li>
          <strong>La verificación de tu empresa en Meta Business Manager.</strong> Documentos y
          que el nombre registrado coincida con el legal. Sin eso no hay API.
        </li>
        <li>
          <strong>El check verde.</strong> No se compra: es la cuenta oficial de empresa, se
          solicita y Meta decide. Exige la verificación previa del negocio y trayectoria real de
          uso de la API, y el motivo de rechazo más común es que el nombre no coincida exactamente
          con el legal.{" "}
          <Pendiente>[PENDIENTE: confirmar en la ayuda oficial de Meta el plazo para volver a solicitarlo tras un rechazo — las fuentes secundarias hablan de 3 meses.]</Pendiente>
        </li>
        <li>
          <strong>Las plantillas más allá de las incluidas</strong> y la corrección de las que
          Meta rechace por redacción. Pregunta cuántas incluye la cotización y quién arregla un
          rechazo.
        </li>
        <li>
          <strong>Las integraciones.</strong> CRM, calendario, pasarela. A veces se resuelven con
          un intermediario tipo n8n o Make, que tiene{" "}
          <a href="https://auto-latam.com/blog/chatbot-whatsapp-precio-empresas-latam-2026" rel="noopener">
            su propia suscripción
          </a>
          .
        </li>
        <li>
          <strong>La escritura del flujo.</strong> Los textos del bot son contenido: si no los
          escribes tú, alguien los escribe y eso se cobra. Mismo punto que en{" "}
          <Link href="/blog/cuanto-cuesta-una-pagina-web-en-colombia">
            el presupuesto de una página web
          </Link>
          .
        </li>
        <li>
          <strong>El mantenimiento mensual.</strong> No es opcional de verdad: el token de Meta
          expira y las plantillas se rechazan. Sin monitoreo el bot deja de contestar y te enteras
          cuando reclama un cliente.
        </li>
        <li>
          <strong>El historial de tus chats no se muda.</strong> Al pasar el número a la API tu
          historial no viaja contigo, aunque tus clientes sí sigan viendo sus mensajes viejos en
          su teléfono. Existe <em>Coexistence</em>, que permite seguir atendiendo desde la app del
          celular con el mismo número. Pregúntalo antes de firmar.
        </li>
      </ul>

      <h2>Las cinco cosas que disparan el precio</h2>
      <ol>
        <li>
          <strong>Qué tiene que hacer el bot.</strong> Contestar horarios no es lo mismo que tomar
          un pedido. En mi propia lista es la diferencia entre {money(A_PRICES.base.faq)} y{" "}
          {money(A_PRICES.base.pedidos)}.
        </li>
        <li>
          <strong>La IA.</strong> Un menú de opciones es barato y predecible. Un bot que entiende
          lo que le escriben cuesta más de montar y de mantener, porque hay que revisarle lo que
          contesta.
        </li>
        <li>
          <strong>Las integraciones.</strong> Conectarlo con tu CRM, tu calendario o tu inventario
          es lo que más suma.
        </li>
        <li>
          <strong>El número de plantillas.</strong> Cada una se aprueba por separado ante Meta. Es
          trabajo por unidad.
        </li>
        <li>
          <strong>La urgencia.</strong> Comprimir un proyecto de cinco semanas en dos cuesta más,
          siempre.
        </li>
      </ol>

      <h2>Cinco preguntas antes de firmar</h2>
      <ul>
        <li>
          <strong>¿La cuenta de WhatsApp Business queda a nombre de mi empresa o del proveedor?</strong>{" "}
          Si queda a nombre de él, el número y las plantillas quedan de rehenes.
        </li>
        <li>
          <strong>¿Quién le paga a Meta el consumo: yo directo, o el proveedor y me lo revende?</strong>{" "}
          Las dos respuestas son legítimas. La que no lo es, es «no sé».
        </li>
        <li>
          <strong>¿Qué pasa el 1 de octubre con mis mensajes de servicio?</strong> Si te miran
          raro, no leyeron el anuncio de Meta.
        </li>
        <li>
          <strong>¿Cuántas plantillas están incluidas y quién arregla un rechazo?</strong>
        </li>
        <li>
          <strong>Si me voy, ¿me llevo el número y el flujo?</strong>
        </li>
      </ul>
      <blockquote>
        Un chatbot barato que no puedes mover a otro proveedor termina costando más que uno bien
        montado: lo pagas dos veces, la segunda para sacarlo de donde quedó amarrado.
      </blockquote>

      <h2>¿Y cómo sé si me va a servir?</h2>
      <p>
        Haz la cuenta al revés. Si el montaje te cuesta {money(A_PRICES.base.leads)} y el
        mantenimiento {money(A_PRICES.mantenimiento.basico)} al mes, el primer año son
        $3.360.000. Si tu cliente promedio te deja $200.000, necesitas 17 clientes en el año que
        hoy se te estén perdiendo. Si de los mensajes que te llegan de noche y los domingos se te
        cae más de uno cada tres semanas, la cuenta ya cerró.
      </p>
      <p>
        Si el número no cierra, la conversación no es sobre el precio del chatbot: es sobre si tu
        problema es de atención o es de otra cosa. Ese criterio lo desarrollo en{" "}
        <Link href="/blog/mi-negocio-necesita-pagina-web">¿mi negocio necesita página web?</Link> y
        aplica igual acá.
      </p>
      <p>
        Si quieres ver qué hace cada tipo de bot, está todo en{" "}
        <Link href="/servicios/chatbot-whatsapp">la página del chatbot de WhatsApp</Link>. Y si ya
        sabes lo que necesitas, <Link href="/agendar">escríbeme</Link>: te digo en qué rango cae
        y qué te va a cobrar Meta aparte.
      </p>
      <p>
        Donde más rápido se paga esto es en los negocios que viven de una agenda, porque cada
        mensaje sin contestar es un cupo que se fue: lo desgloso caso por caso en{" "}
        <Link href="/sectores/salones-y-spas">páginas web para salones de belleza y spas</Link> y
        en{" "}
        <Link href="/sectores/clinicas-y-consultorios">
          páginas web para clínicas y consultorios
        </Link>
        .
      </p>
    </>
  );
}
