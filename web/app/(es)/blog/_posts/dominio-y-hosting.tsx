import Link from "next/link";

import { PISOS, money } from "@/lib/quote";

// Post: Cuánto cuesta un dominio y un hosting en Colombia
// Query objetivo: "cuánto cuesta un dominio web en colombia"
//
// El autocompletado colombiano trae dos preguntas pegadas a esta: «dominio y
// hosting es lo mismo» y «dominio y hosting diferencia». O sea que la consulta
// no es solo de precio: es de alguien que no tiene claro qué está comprando.
// Por eso el artículo explica antes de cotizar.
//
// Y es el artículo que sostiene la renovación anual de `PISOS.renovacion`, que
// es la línea que más se malinterpreta de todo el sitio: el cliente cree que le
// están cobrando dos veces lo mismo.
export function DominioYHostingPost() {
  return (
    <>
      <p>
        <strong>
          Un dominio <code>.com</code> cuesta entre $45.000 y $90.000 al año. Un hosting decente
          para un sitio de negocio, entre $120.000 y $500.000 al año.
        </strong>{" "}
        Todo lo que pase mucho de ahí sin una razón clara merece una pregunta.
      </p>
      <p>
        Pero el precio es la parte fácil. Lo que de verdad decide si esto te sale caro o barato es
        a nombre de quién queda, y eso no aparece en ninguna tabla de precios.
      </p>

      <h2>No son lo mismo, y la diferencia importa</h2>
      <p>Es la confusión más común y se explica en dos frases:</p>
      <ul>
        <li>
          <strong>El dominio es la dirección.</strong> <code>tunegocio.com</code>. Lo alquilas por
          años a un registrador. Es tuyo mientras lo pagues, y es lo único de esta lista que no se
          puede reemplazar: si lo pierdes, pierdes la dirección que tus clientes conocen y los
          años de posicionamiento que tenía.
        </li>
        <li>
          <strong>El hosting es el terreno.</strong> El computador donde viven los archivos de tu
          sitio. Si mañana cambias de proveedor, mueves los archivos y nadie se entera.
        </li>
      </ul>
      <p>
        Dicho de otra forma: el hosting se cambia un martes cualquiera; el dominio se pierde para
        siempre. Ordena tus preocupaciones en ese orden.
      </p>

      <h2>Los precios, en pesos y de este año</h2>
      <table>
        <thead>
          <tr>
            <th>Qué</th>
            <th>Cuánto al año</th>
            <th>Qué estás pagando</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Dominio <code>.com</code>
            </td>
            <td>$45.000 – $90.000</td>
            <td>La dirección. Lo mismo en cualquier registrador serio.</td>
          </tr>
          <tr>
            <td>
              Dominio <code>.com.co</code>
            </td>
            <td>$60.000 – $130.000</td>
            <td>Igual, pero señala que eres colombiano. Útil si vendes solo acá.</td>
          </tr>
          <tr>
            <td>Hosting compartido</td>
            <td>$120.000 – $350.000</td>
            <td>Sirve para la mayoría de sitios de negocio.</td>
          </tr>
          <tr>
            <td>Hosting para tienda en línea</td>
            <td>$350.000 – $1.200.000</td>
            <td>Más recursos, porque hay catálogo, carrito y pagos.</td>
          </tr>
          <tr>
            <td>Certificado SSL (el candadito)</td>
            <td>$0</td>
            <td>
              Hoy es gratis con Let&apos;s Encrypt. Si te lo cobran aparte, pregunta por qué.
            </td>
          </tr>
          <tr>
            <td>Correo con tu dominio</td>
            <td>$25.000 – $130.000 por buzón</td>
            <td>
              <code>hola@tunegocio.com</code>. Es un servicio aparte, casi siempre.
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Los rangos son anchos a propósito. Un hosting de $120.000 y uno de $350.000 hacen lo
        mismo el 90 % del tiempo; la diferencia se nota el día que algo falla y necesitas que
        alguien conteste.
      </p>

      <h2>La pregunta que decide todo: ¿a nombre de quién queda?</h2>
      <p>
        Esta es la parte del artículo que importa, y por eso va con nombre propio. Cuando alguien
        te hace la web, hay dos maneras de montar esto:
      </p>
      <ul>
        <li>
          <strong>El dominio y el hosting a tu nombre, con tus accesos.</strong> Tú eres el titular
          en el registrador, tú tienes la clave. Tu proveedor trabaja ahí como invitado.
        </li>
        <li>
          <strong>Todo a nombre del proveedor.</strong> Él es el titular. Tú pagas una
          &quot;mensualidad de mantenimiento&quot; y nunca has visto un panel.
        </li>
      </ul>
      <p>
        La segunda es cómoda hasta el día que quieres irte. Ahí descubres que la dirección de tu
        negocio en internet no es tuya, que la transferencia depende de la buena voluntad de
        alguien con quien acabas de discutir, y que empezar de cero con otro dominio significa
        perder todo el posicionamiento acumulado.
      </p>
      <p>
        <strong>No es un tecnicismo: es quién tiene la llave de tu local.</strong> Y la pregunta
        se hace antes de firmar, no después.
      </p>

      <h3>Cómo comprobarlo hoy, en un minuto</h3>
      <p>
        Busca <em>&quot;whois tudominio.com&quot;</em> en Google y abre cualquiera de los
        consultores. Mira el registrante. Muchos dominios tienen la privacidad activada y ahí solo
        verás el registrador — en ese caso, entra a tu cuenta del registrador. Si no tienes cuenta,
        esa es la respuesta.
      </p>

      <h2>&quot;Es que me lo dieron gratis el primer año&quot;</h2>
      <p>
        Suele ser verdad y suele estar bien. Muchos proveedores incluyen el primer año en el
        precio del sitio, y es una cortesía legítima.
      </p>
      <p>
        Lo que hay que preguntar es qué pasa el año dos. Tres cosas concretas:
      </p>
      <ol>
        <li>
          <strong>Cuánto cuesta la renovación</strong>, dicho con un número antes de firmar.
        </li>
        <li>
          <strong>A nombre de quién quedó</strong> el dominio, según lo de arriba.
        </li>
        <li>
          <strong>Quién recibe el aviso de vencimiento.</strong> Si llega a un correo que dejó de
          revisarse, el dominio se cae solo. He visto sitios perderse así, y no por mala fe de
          nadie.
        </li>
      </ol>

      <blockquote>
        Un dominio vencido no se apaga de un día para otro: entra en un periodo de gracia y
        después en redención, donde recuperarlo cuesta bastante más que renovarlo. Ponle
        renovación automática y una alarma en el calendario. Las dos cosas, no una.
      </blockquote>

      <h2>Cómo lo hago yo, para que sepas con qué comparar</h2>
      <p>
        <strong>El dominio y el hosting quedan a tu nombre</strong>, con tus accesos, desde el
        primer día. No es generosidad: es que si mañana dejamos de trabajar juntos, quiero que te
        puedas llevar el sitio sin pedirme permiso. Un proveedor que te retiene la llave está
        compitiendo con la dificultad de irse, no con su trabajo.
      </p>
      <p>
        La renovación anual —dominio, alojamiento, certificado y respaldos del sitio ya entregado—
        cuesta <strong>{money(PISOS.renovacion)}</strong>. Es un precio cerrado, no un
        &quot;desde&quot;, y aparece en{" "}
        <Link href="/precios">la página de precios</Link> igual que todo lo demás.
      </p>
      <p>
        Lo que no está incluido ahí, y lo digo para que no haya sorpresa, son los cambios de
        contenido del año siguiente: eso se cotiza cuando aparezca, o se resuelve solo si el sitio
        se hizo para que lo edites tú — que es como los hago.
      </p>

      <h2>Dónde encaja esto en el costo total</h2>
      <p>
        Dominio y hosting son la línea pequeña de un presupuesto de sitio web, pero son la única
        que se repite todos los años. Sumarla desde el principio evita la conversación incómoda
        del mes trece.
      </p>
      <p>
        El desglose completo —qué cuesta el sitio, qué casi nunca está incluido y qué dispara el
        precio— está en{" "}
        <Link href="/blog/cuanto-cuesta-una-pagina-web-en-colombia">
          cuánto cuesta una página web en Colombia
        </Link>
        . Cuánto tarda, en{" "}
        <Link href="/blog/cuanto-se-demora-hacer-una-pagina-web">
          cuánto se demora hacer una página web
        </Link>
        . Y lo que hago yo por ese precio, con lo que entra y lo que no, en{" "}
        <Link href="/servicios/diseno-de-paginas-web">diseño de páginas web</Link>.
      </p>
      <p>
        Si todavía estás antes de esa decisión —si te conviene un sitio propio o te alcanza con la
        ficha de Google y las redes—, empieza por{" "}
        <Link href="/blog/mi-negocio-necesita-pagina-web">¿mi negocio necesita página web?</Link>
      </p>
    </>
  );
}
