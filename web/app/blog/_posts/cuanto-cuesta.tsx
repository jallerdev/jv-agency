import Link from "next/link";

// Post: ¿Cuánto cuesta una página web en Colombia?
// Query objetivo: "cuánto cuesta una página web"
export function CuantoCuestaPost() {
  return (
    <>
      <p>
        <strong>Respuesta corta:</strong> entre $800.000 y $12.000.000 según el tipo de sitio. La
        respuesta útil es más larga, porque lo que define el precio no es el número de páginas
        sino qué problema de negocio resuelve el sitio.
      </p>

      <h2>Por qué nadie te da un número por teléfono</h2>
      <p>
        Preguntar cuánto cuesta una página web es como preguntar cuánto cuesta un local: depende
        del tamaño, la zona y para qué lo vas a usar. Pero eso no es excusa para que te den
        largas.
      </p>
      <p>
        Un proveedor serio debería poder ubicarte en un rango en la primera conversación. Si
        después de veinte minutos todavía no te dijo ni un orden de magnitud, probablemente esté
        calculando cuánto puedes pagar en vez de cuánto cuesta el trabajo.
      </p>

      <h2>Rangos reales en Colombia (2026)</h2>
      <p>
        Lo que se ve hoy en el mercado colombiano. Tu caso puede salirse del rango por razones
        legítimas — úsalo para saber si una cotización está en el rango o muy fuera.
      </p>
      <table>
        <thead>
          <tr>
            <th>Tipo de sitio</th>
            <th>Rango</th>
            <th>Para quién</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Landing de una página</td>
            <td>$800.000 – $2.500.000</td>
            <td>Un servicio, un objetivo, un formulario de contacto</td>
          </tr>
          <tr>
            <td>Sitio corporativo (4-6 páginas)</td>
            <td>$2.500.000 – $6.000.000</td>
            <td>Empresa con varios servicios que necesita credibilidad</td>
          </tr>
          <tr>
            <td>Tienda en línea</td>
            <td>$5.000.000 – $12.000.000</td>
            <td>Catálogo, pagos, inventario y envíos</td>
          </tr>
          <tr>
            <td>Rediseño de un sitio existente</td>
            <td>$1.500.000 – $4.000.000</td>
            <td>Ya hay contenido; el trabajo es estructura y diseño</td>
          </tr>
        </tbody>
      </table>

      <h2>Lo que casi nunca está incluido (y te van a cobrar aparte)</h2>
      <p>Acá es donde los presupuestos se desvían. Pregunta por cada uno antes de firmar:</p>
      <ul>
        <li>
          <strong>Dominio y hosting.</strong> Entre $150.000 y $600.000 al año según el tráfico.
          Muchas cotizaciones incluyen el primer año y no lo dicen.
        </li>
        <li>
          <strong>Contenido.</strong> Los textos y las fotos. Si no los entregas tú, alguien
          tiene que escribirlos y fotografiar, y eso se cobra.
        </li>
        <li>
          <strong>Correo corporativo.</strong> El <code>@tunegocio.com</code> es un servicio
          aparte.
        </li>
        <li>
          <strong>Mantenimiento.</strong> Actualizaciones, respaldos y seguridad. Entre $150.000
          y $500.000 mensuales.
        </li>
        <li>
          <strong>Pasarela de pagos.</strong> Wompi, PayU o Mercado Pago cobran su comisión por
          transacción, independiente de lo que pagues por el desarrollo.
        </li>
      </ul>

      <h2>Las cinco cosas que disparan el precio</h2>
      <ol>
        <li>
          <strong>Integraciones.</strong> Conectar el sitio con tu inventario, tu facturación o
          un sistema que ya usas es lo que más suma.
        </li>
        <li>
          <strong>Contenido en varios idiomas.</strong> Prácticamente duplica el trabajo de
          contenido.
        </li>
        <li>
          <strong>Diseño a medida vs plantilla.</strong> Una plantilla bien adaptada puede ser la
          decisión correcta si el presupuesto manda.
        </li>
        <li>
          <strong>Cuentas de usuario.</strong> En el momento en que alguien tiene que
          registrarse, dejas de tener un sitio y empiezas a tener software.
        </li>
        <li>
          <strong>Urgencia.</strong> Comprimir un proyecto de seis semanas en dos cuesta más,
          siempre.
        </li>
      </ol>

      <h2>Cómo saber si una cotización es razonable</h2>
      <p>Tres preguntas que separan una propuesta seria de una improvisada:</p>
      <ul>
        <li>
          <strong>¿Qué pasa si necesito un cambio después de aprobar el diseño?</strong> Una
          respuesta seria define cuántas rondas de ajustes están incluidas.
        </li>
        <li>
          <strong>¿El sitio queda a mi nombre?</strong> El dominio y el hosting deben estar a
          nombre tuyo. Si quedan a nombre del proveedor, quedas atado.
        </li>
        <li>
          <strong>¿Puedo editar el contenido yo?</strong> Cambiar un precio o una foto no debería
          requerir llamar a nadie.
        </li>
      </ul>

      <blockquote>
        Una web barata que no puedes actualizar termina costando más que una bien hecha: la
        pagas dos veces, la segunda para rehacerla.
      </blockquote>

      <h2>¿Y cómo sé si me va a servir?</h2>
      <p>
        Haz la cuenta al revés. Si un cliente tuyo deja en promedio $400.000 y el sitio cuesta
        $3.000.000, necesitas ocho clientes en el año para que se pague. Si tu negocio recibe
        veinte solicitudes al mes por WhatsApp, ocho al año es un piso bajo.
      </p>
      <p>
        Si haciendo esa cuenta el número no cierra, la conversación no es sobre el precio de la
        web: es sobre si la web es lo que tu negocio necesita ahora. Lo desarrollo en{" "}
        <Link href="/blog/mi-negocio-necesita-pagina-web">
          ¿mi negocio necesita página web?
        </Link>
        .
      </p>

      <h2>Nota para agencias y freelancers</h2>
      <p>
        Si llegaste acá porque <em>tú</em> vendes sitios web y quieres saber cuánto cobrar,
        escribimos la versión desde el otro lado del mostrador en el blog de nuestro producto de
        ventas:{" "}
        <a
          href="https://halcon.jvagencia.com/blog/cuanto-cobrar-por-una-pagina-web-colombia"
          rel="noopener"
        >
          cuánto cobrar por una página web
        </a>
        , con los tres modelos de cobro y cómo defender tu precio.
      </p>
    </>
  );
}
