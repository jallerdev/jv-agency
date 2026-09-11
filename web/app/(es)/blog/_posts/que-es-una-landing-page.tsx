import Link from "next/link";

import { PISOS, money } from "@/lib/quote";

// Post: Qué es una landing page y cuándo te conviene
// Query objetivo: "qué es una landing page y para qué sirve"
//
// «landing page» es el término con más interés de los que le faltaban al blog
// (34,5 en Trends Colombia, contra 3,7 de «dominio y hosting»). La consulta es
// informativa, pero desemboca en una decisión de compra real y CARA: landing o
// sitio corporativo son dos precios muy distintos en `PISOS`.
//
// EL RIESGO de este artículo es volverse un glosario de marketing. Se evita
// contestando la pregunta que el visitante trae de verdad y no dice: «¿me
// estarán vendiendo una página suelta cuando necesito un sitio, o al revés?».
export function QueEsUnaLandingPagePost() {
  return (
    <>
      <p>
        <strong>
          Una landing page es una sola página con un solo objetivo y sin salidas.
        </strong>{" "}
        Sin menú de navegación, sin &quot;conócenos&quot;, sin blog. El visitante llega, lee y hace
        una cosa: deja sus datos, agenda, compra o escribe por WhatsApp.
      </p>
      <p>
        Todo lo que la hace distinta de una página normal viene de ahí. Un sitio web quiere que
        explores; una landing quiere que decidas.
      </p>

      <h2>Por qué se le quita el menú</h2>
      <p>
        Suena a error de principiante y es justo al revés. Cada enlace en la cabecera es una
        oportunidad de que alguien se vaya a otra parte sin hacer lo que viniste a pedirle. Si
        pagaste publicidad para traer a esa persona, ese menú te está costando plata.
      </p>
      <p>
        Por eso la landing casi siempre nace pegada a una campaña: pauta en Google o en redes,
        correo a tu base, un código QR en un volante. Hay una inversión detrás de cada visita, y
        la página existe para no desperdiciarla.
      </p>

      <h2>Las seis partes que casi todas tienen</h2>
      <ol>
        <li>
          <strong>Un titular que dice qué ganas tú, no qué vendo yo.</strong> &quot;Tu contabilidad
          al día sin perseguir facturas&quot; funciona mejor que &quot;Servicios contables
          integrales&quot;.
        </li>
        <li>
          <strong>Una sola llamada a la acción, repetida.</strong> El mismo botón, con el mismo
          texto, tres o cuatro veces a lo largo de la página. No uno distinto en cada sección.
        </li>
        <li>
          <strong>Prueba de que existes.</strong> Fotos reales del trabajo, reseñas con nombre,
          logos de clientes si los tienes permiso de usar. Testimonios inventados se notan y
          hacen daño.
        </li>
        <li>
          <strong>El manejo de la objeción.</strong> Lo que la gente piensa y no escribe:
          &quot;¿cuánto cuesta?&quot;, &quot;¿y si no funciona?&quot;, &quot;¿esto es para un
          negocio de mi tamaño?&quot;.
        </li>
        <li>
          <strong>Un formulario corto.</strong> Cada campo que agregas reduce la cantidad de gente
          que lo termina. Si te sirve con nombre y WhatsApp, pide nombre y WhatsApp.
        </li>
        <li>
          <strong>Velocidad.</strong> Es la parte invisible y la que más conversiones se lleva: si
          la página tarda en abrir desde datos móviles, la mitad de la gente se fue antes de leer
          el titular.
        </li>
      </ol>

      <h2>Landing o sitio: la decisión, en una tabla</h2>
      <p>
        Es la pregunta que la gente viene a hacer aunque escriba otra cosa. Van los dos casos, sin
        rodeos:
      </p>
      <table>
        <thead>
          <tr>
            <th>Te conviene una landing si…</th>
            <th>Te conviene un sitio si…</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Vendes un servicio o producto, no cinco</td>
            <td>Tienes varios servicios que explicar por separado</td>
          </tr>
          <tr>
            <td>Vas a pautar y necesitas dónde aterrizar a esa gente</td>
            <td>Quieres que te encuentren en Google sin pagar por cada visita</td>
          </tr>
          <tr>
            <td>Lanzas algo y quieres probar si interesa antes de invertir más</td>
            <td>Tu cliente te busca por nombre y necesita confirmar que existes</td>
          </tr>
          <tr>
            <td>Necesitas estar en línea esta semana</td>
            <td>Piensas publicar contenido, casos o catálogo con el tiempo</td>
          </tr>
        </tbody>
      </table>

      <h3>La trampa: la landing sola casi no posiciona</h3>
      <p>
        Es la limitación que nadie menciona cuando te la vende. Una página suelta compite en Google
        con una sola página, y contra sitios que tienen veinte. Sirve bien para tráfico pagado y
        para un enlace que tú repartes; no sirve para que te encuentren solos.
      </p>
      <p>
        Así que si tu plan es &quot;hago la landing y dejo de pagar publicidad cuando empiece a
        aparecer en Google&quot;, ese plan tiene un hueco. Aparecer en Google es otro trabajo, con
        su propio presupuesto y sus propios plazos —{" "}
        <Link href="/blog/cuanto-cuesta-el-seo-en-colombia">
          cuánto cuesta el SEO en Colombia
        </Link>{" "}
        lo desarrolla.
      </p>

      <h2>Qué cuesta cada cosa</h2>
      <p>
        Acá es donde la decisión se vuelve concreta. Una{" "}
        <strong>landing empieza en {money(PISOS.landing)}</strong> y un{" "}
        <strong>sitio corporativo en {money(PISOS.corporativa)}</strong>: no es una diferencia de
        matiz, y por eso vale la pena acertar.
      </p>
      <p>
        La diferencia de precio no está en el diseño, está en la cantidad de decisiones. Un sitio
        corporativo pide estructura de navegación, una página por servicio, textos para cada una y
        pensar cómo va a crecer. Una landing pide una sola cosa, muy bien hecha.
      </p>
      <p>
        Los rangos del mercado, con lo que casi nunca está incluido, están en{" "}
        <Link href="/blog/cuanto-cuesta-una-pagina-web-en-colombia">
          cuánto cuesta una página web en Colombia
        </Link>
        . Y los plazos —una landing sale en días, un sitio en semanas— en{" "}
        <Link href="/blog/cuanto-se-demora-hacer-una-pagina-web">
          cuánto se demora hacer una página web
        </Link>
        .
      </p>

      <h2>Cómo saber si la tuya funciona</h2>
      <p>
        Una landing tiene una ventaja sobre un sitio: se puede medir con un solo número. De cada
        cien que entran, cuántos hicieron lo que querías.
      </p>
      <p>
        Ese número varía muchísimo por sector y por la calidad del tráfico, así que no te sirve
        compararte con un promedio de internet. Te sirve compararte contigo mismo: mídelo esta
        semana, cambia una cosa, mídelo la siguiente. Empieza por el titular, que es lo que más
        mueve la aguja, y no cambies tres cosas a la vez o no vas a saber cuál funcionó.
      </p>

      <blockquote>
        Si vas a pautar, haz la cuenta antes: cuánto te cuesta cada clic, cuántos clics necesitas
        para un cliente y cuánto te deja ese cliente. Si el número no cierra, el problema no es la
        landing — es la campaña, y ninguna página arregla una campaña que no cierra.
      </blockquote>

      <h2>Una landing no reemplaza tu presencia entera</h2>
      <p>
        Lo digo porque es un error caro y frecuente: alguien hace una landing, la pauta, funciona, y
        decide que ya no necesita nada más. Pasan seis meses, deja de pagar publicidad y el
        teléfono se apaga de golpe, porque no había nada que sostuviera las visitas por su cuenta.
      </p>
      <p>
        Lo sano es ver la landing como lo que es: una herramienta de campaña, excelente en su
        trabajo, que convive con lo demás. Si tu cliente te busca por cercanía, además necesitas{" "}
        <Link href="/blog/como-aparecer-en-google-maps">la ficha de Google bien puesta</Link>. Si
        todavía no tienes claro si te conviene un sitio propio, empieza por{" "}
        <Link href="/blog/mi-negocio-necesita-pagina-web">¿mi negocio necesita página web?</Link>{" "}
        y por{" "}
        <Link href="/blog/pagina-web-o-solo-instagram">página web o solo Instagram</Link>.
      </p>
      <p>
        Y si ya sabes que lo que quieres es la página —landing o sitio—, lo que hago yo, con lo que
        entra y lo que no, está en{" "}
        <Link href="/servicios/diseno-de-paginas-web">diseño de páginas web</Link>.
      </p>
    </>
  );
}
