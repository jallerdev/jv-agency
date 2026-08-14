import Link from "next/link";

// Post: Qué debe tener la página web de un restaurante
// Query objetivo: "página web para restaurante"
export function WebRestaurantePost() {
  return (
    <>
      <p>
        <strong>Casi todo el que entra a la web de un restaurante busca tres cosas:</strong> el
        menú, el horario y cómo llegar. La mayoría de los sitios pone primero un video del chef y
        entierra las tres en un submenú. Eso es lo que hay que invertir.
      </p>

      <h2>El contexto que lo cambia todo: casi todos llegan desde el celular</h2>
      <p>
        Alguien está en la calle, con hambre, decidiendo entre tu restaurante y el de al lado.
        Tiene el teléfono en la mano y treinta segundos de paciencia.
      </p>
      <p>
        Todo lo que sigue parte de ahí. Si tu sitio se ve bien en un monitor pero pide hacer zoom
        en el celular, estás perdiendo justo en el momento de la decisión.
      </p>

      <h2>Las seis cosas, en orden</h2>

      <h3>1. El menú, con precios, en texto</h3>
      <p>
        Lo más buscado, por mucho. Y el error más común es publicarlo como <strong>imagen o
        PDF</strong>: pesa, no se lee sin hacer zoom, y Google no puede indexar lo que dice —
        así que nunca vas a aparecer cuando alguien busque un plato específico.
      </p>
      <p>
        El menú va en texto, con precios visibles. Sin precios, mucha gente asume que es caro y
        se va.
      </p>

      <h3>2. Horario, y si está abierto ahora</h3>
      <p>
        No basta con la tabla de horarios. Lo ideal es que el sitio diga{" "}
        <strong>&quot;abierto ahora&quot; o &quot;cierra en 40 minutos&quot;</strong>. Y mantén
        los festivos actualizados: nada molesta más que llegar a un local cerrado porque la web
        decía otra cosa.
      </p>

      <h3>3. Cómo llegar, con un toque</h3>
      <p>
        Dirección visible y un botón que abra Google Maps directo. No un mapa incrustado que
        tarda en cargar: un enlace que dispare la navegación.
      </p>

      <h3>4. Teléfono y WhatsApp como botón</h3>
      <p>
        Que marque al tocarlo. Un número que hay que copiar y pegar pierde llamadas. Si tomas
        reservas o domicilios por WhatsApp, ese botón es el más importante de todo el sitio.
      </p>

      <h3>5. Fotos reales de tus platos</h3>
      <p>
        Reales, no de banco de imágenes. La gente lo nota, y una foto genérica de pasta comunica
        exactamente lo contrario de lo que quieres. No necesitas fotógrafo profesional para
        empezar: buena luz natural y un celular decente rinden.
      </p>

      <h3>6. Reservas o pedidos, si aplica</h3>
      <p>
        Si tomas reservas, que se pueda hacer desde el sitio. Si haces domicilios, di claramente
        si es por tu canal propio o por una app, y a qué zonas llegas.
      </p>

      <h2>Lo que sobra</h2>
      <ul>
        <li>
          <strong>Video de fondo en el inicio.</strong> Pesa, gasta datos del cliente y retrasa
          lo que vino a buscar.
        </li>
        <li>
          <strong>Música automática.</strong> Está en un restaurante ruidoso o en una oficina.
          Ninguna de las dos quiere música.
        </li>
        <li>
          <strong>Pantalla de bienvenida.</strong> Un clic más entre el cliente y el menú.
        </li>
        <li>
          <strong>&quot;Nuestra historia&quot; de primero.</strong> Ponla, pero abajo. Primero
          come, después le importa quién cocina.
        </li>
        <li>
          <strong>Menú en PDF.</strong> Vale repetirlo porque es el error más frecuente y el más
          caro en SEO.
        </li>
      </ul>

      <h2>Lo que casi nadie hace y sí trae clientes</h2>
      <p>
        Un restaurante compite en búsquedas locales, y ahí hay dos palancas que valen más que el
        diseño:
      </p>
      <ol>
        <li>
          <strong>Perfil de Google Business impecable y enlazado a tu web.</strong> Para
          &quot;restaurantes cerca de mí&quot;, ese perfil pesa más que el sitio. Fotos al día,
          horario correcto y responder reseñas.
        </li>
        <li>
          <strong>Una página por plato estrella o por categoría.</strong> Si eres reconocido por
          la bandeja paisa, una página que hable de eso puede rankear para{" "}
          <em>&quot;bandeja paisa en [tu ciudad]&quot;</em>. Un menú en PDF nunca va a lograrlo.
        </li>
      </ol>
      <p>
        Añade el marcado <code>Restaurant</code> de schema.org con horario, rango de precios y
        tipo de cocina. Es lo que permite que Google muestre esa información directamente en el
        resultado.
      </p>

      <blockquote>
        Prueba tu propio sitio: abre el celular con datos móviles, no wifi, y cuenta cuántos
        toques necesitas para ver un precio. Si son más de dos, ahí está el problema.
      </blockquote>

      <h2>Cuánto cuesta algo así</h2>
      <p>
        Un sitio de restaurante bien resuelto cae en el rango de sitio corporativo: entre
        $2.500.000 y $6.000.000 según si incluye reservas o pedidos en línea. El desglose
        completo está en{" "}
        <Link href="/blog/cuanto-cuesta-una-pagina-web-en-colombia">
          cuánto cuesta una página web en Colombia
        </Link>
        .
      </p>
      <p>
        Y si tu restaurante vive de quien pasa por enfrente y todavía no estás seguro de
        necesitar sitio propio, lee primero{" "}
        <Link href="/blog/mi-negocio-necesita-pagina-web">
          ¿mi negocio necesita página web?
        </Link>{" "}
        — hay casos donde el perfil de Google alcanza por ahora.
      </p>
    </>
  );
}
