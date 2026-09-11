import Link from "next/link";

// Post: Por qué mi página web no aparece en Google
// Query objetivo: "por que mi pagina no aparece en google"
//
// LA INTENCIÓN DETRÁS DE ESTA BÚSQUEDA no es informativa: es de alguien que ya
// pagó por un sitio y no está viendo nada. Llega molesto y con razón. El
// artículo que gana ahí no es el que le vende una auditoría en el primer
// párrafo: es el que le deja comprobar las cinco causas él mismo en diez
// minutos, porque tres de las cinco se arreglan sin contratar a nadie. Las
// otras dos son las que sí valen una llamada, y para entonces ya hay confianza.
export function NoApareceEnGooglePost() {
  return (
    <>
      <p>
        <strong>
          Antes de pelear con nadie: busca en Google <code>site:tudominio.com</code>
        </strong>{" "}
        —así, pegado, con tu dominio— y mira cuántos resultados salen. Esa sola búsqueda separa
        los dos mundos posibles, y la puedes hacer ahora mismo.
      </p>
      <ul>
        <li>
          <strong>Salen páginas tuyas.</strong> Entonces Google sí te tiene. Tu problema no es que
          no apareces: es que no apareces <em>arriba</em>, que es otra cosa y se arregla distinto.
          Salta a la causa 4.
        </li>
        <li>
          <strong>No sale nada, o sale muchísimo menos de lo que tienes.</strong> Google no te
          indexó. Las causas 1, 2 y 3 son las candidatas, y dos de ellas se arreglan solas en
          quince minutos.
        </li>
      </ul>

      <h2>Causa 1 · Tu sitio es nuevo y todavía no le ha dado tiempo</h2>
      <p>
        La más común, y la que menos gusta. Un sitio recién publicado tarda{" "}
        <strong>de días a algunas semanas</strong> en aparecer, y en quedar bien ubicado para
        búsquedas peleadas tarda meses. No hay truco que compre ese tiempo.
      </p>
      <p>
        Lo que sí puedes hacer es dejar de esperar a que te encuentren: dar de alta el sitio en{" "}
        <a href="https://search.google.com/search-console" rel="noopener">
          Google Search Console
        </a>
        , que es gratis, y mandarle el sitemap. Ahí además vas a ver, con datos y no con
        suposiciones, qué páginas tiene Google y cuáles no. Si no tienes acceso a esa herramienta
        y alguien te hizo el sitio, pídeselo: es tuyo.
      </p>

      <h2>Causa 2 · El sitio le está diciendo a Google que no entre</h2>
      <p>
        Pasa más de lo que debería, y casi siempre por lo mismo: el sitio se construyó en un
        entorno de pruebas con la indexación bloqueada a propósito, y al publicarlo nadie quitó el
        bloqueo.
      </p>
      <p>Dos cosas que revisar, y las dos las puedes mirar tú:</p>
      <ol>
        <li>
          <strong>
            Abre <code>tudominio.com/robots.txt</code>
          </strong>
          . Si ves <code>Disallow: /</code>, ahí está: le estás diciendo a los buscadores que no
          rastreen nada.
        </li>
        <li>
          <strong>Mira el código de una página.</strong> Clic derecho, «ver código fuente», y busca{" "}
          <code>noindex</code>. Si aparece en una etiqueta <code>robots</code>, esa página está
          pidiendo explícitamente no salir en Google.
        </li>
      </ol>
      <p>
        Cualquiera de las dos es un arreglo de un minuto para quien tenga acceso al sitio. Y es la
        causa que más rabia da descubrir tarde, porque son meses de no existir por una línea que
        sobró.
      </p>

      <h2>Causa 3 · Google no puede leer lo que muestras</h2>
      <p>
        Si tu sitio pinta todo el contenido con JavaScript, o si tu contenido principal son
        imágenes —el menú del restaurante como foto, los servicios como un PDF— Google puede estar
        viendo una página vacía donde tú ves una llena.
      </p>
      <p>
        La prueba casera: abre tu página, selecciona el texto con el mouse e intenta copiarlo. Si
        no se puede seleccionar, no es texto. Y lo que no es texto no posiciona. Es exactamente el
        error del{" "}
        <Link href="/blog/que-debe-tener-la-pagina-web-de-un-restaurante">
          menú en PDF de los restaurantes
        </Link>
        , y aplica igual a cualquier catálogo.
      </p>

      <h2>Causa 4 · Sí apareces, pero detrás de todos los demás</h2>
      <p>
        Este es el caso más frecuente de todos, y el más malinterpretado. Estás en Google, en la
        posición 40. Nadie llega a la posición 40, así que para efectos prácticos no existes — pero
        el problema no es técnico, es de competencia.
      </p>
      <p>Las tres razones, en orden de cuánto pesan:</p>
      <ul>
        <li>
          <strong>Tu página no habla de lo que la gente busca.</strong> Tu portada dice
          &quot;Bienvenidos a nuestra empresa, líderes en soluciones integrales&quot; y la gente
          escribe &quot;cerrajería 24 horas Bucaramanga&quot;. No hay forma de que Google empareje
          esas dos frases, porque no comparten una sola palabra útil.
        </li>
        <li>
          <strong>No tienes una página por cada cosa que vendes.</strong> Una sola página
          intentando rankear para cinco servicios pierde contra cinco páginas dedicadas. Es la
          diferencia entre un folleto y un sitio.
        </li>
        <li>
          <strong>Nadie te enlaza.</strong> Google usa los enlaces de otros sitios como señal de
          que existes de verdad. Un sitio al que nadie apunta compite en desventaja, y eso no se
          arregla escribiendo más.
        </li>
      </ul>

      <h2>Causa 5 · Te están penalizando por algo que hicieron por ti</h2>
      <p>
        La menos común y la más cara. Si en algún momento alguien te «posicionó» comprando cientos
        de enlaces, llenando las páginas de palabras clave repetidas o copiando textos de otro
        sitio, es posible que estés penalizado.
      </p>
      <p>
        Search Console te lo dice sin ambigüedad, en la sección de acciones manuales. Si ahí no
        hay nada, no estás penalizado y puedes descartar esta causa — mucha gente asume que sí y
        gasta meses persiguiendo un fantasma.
      </p>

      <h2>El orden en que yo lo revisaría</h2>
      <ol>
        <li>
          <code>site:tudominio.com</code>, para saber en cuál de los dos mundos estás.
        </li>
        <li>
          <code>robots.txt</code> y <code>noindex</code>. Quince minutos, gratis, y descarta lo
          más grave.
        </li>
        <li>Search Console: cobertura, acciones manuales y qué consultas ya te traen gente.</li>
        <li>
          Leer tu propia portada en voz alta y preguntarte si alguien escribiría eso en Google.
        </li>
      </ol>
      <p>
        Los tres primeros no te cuestan nada y resuelven la mayoría de los casos. Si llegaste al
        cuarto y ahí está el problema, entonces sí es trabajo: hay que reescribir para lo que la
        gente busca y darle a cada servicio su página.
      </p>

      <blockquote>
        Desconfía de quien te diagnostique sin abrir tu Search Console. Sin esos datos, cualquier
        explicación de por qué no apareces es una conjetura bien vestida.
      </blockquote>

      <h2>Si quieres que lo mire yo</h2>
      <p>
        Eso es una{" "}
        <Link href="/servicios/posicionamiento-seo">auditoría de posicionamiento</Link>: qué te
        está frenando hoy y la lista de arreglos en orden de impacto, para que la ejecute
        cualquiera — yo o tu proveedor actual. Cuánto cuesta ese trabajo en el mercado colombiano,
        con rangos y qué debería incluir, está en{" "}
        <Link href="/blog/cuanto-cuesta-el-seo-en-colombia">cuánto cuesta el SEO en Colombia</Link>
        .
      </p>
      <p>
        Y si de esta revisión sale que el problema no es el posicionamiento sino el sitio —que es
        lento, que no se puede editar, que no se ve en un celular—, esa conversación es otra:{" "}
        <Link href="/blog/cuanto-cuesta-una-pagina-web-en-colombia">
          cuánto cuesta una página web en Colombia
        </Link>{" "}
        tiene los rangos, y{" "}
        <Link href="/servicios/diseno-de-paginas-web">diseño de páginas web</Link> lo que hago yo
        por ese precio.
      </p>
      <p>
        Un último caso, y lo pongo porque me lo encuentro seguido: a veces la respuesta correcta no
        es tocar el sitio sino arreglar la ficha del negocio. Si tu cliente te busca por cercanía,
        eso se juega en el mapa y no en tu web —{" "}
        <Link href="/blog/como-aparecer-en-google-maps">cómo aparecer en Google Maps</Link> lo
        explica paso a paso.
      </p>
    </>
  );
}
