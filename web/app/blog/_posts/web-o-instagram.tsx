import Link from "next/link";

// Post: ¿Página web o solo Instagram?
// Query objetivo: "página web o instagram"
export function WebOInstagramPost() {
  return (
    <>
      <p>
        <strong>No compiten.</strong> Instagram te expone ante gente que no te estaba buscando;
        la web te hace encontrable por quien ya te busca. Son dos movimientos distintos, y cuál
        te falta depende de cómo te compran hoy.
      </p>

      <h2>Qué hace bien cada uno</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Instagram</th>
            <th>Página web</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Descubrimiento</td>
            <td>Te encuentra quien no te buscaba</td>
            <td>Te encuentra quien ya busca lo que vendes</td>
          </tr>
          <tr>
            <td>Intención de compra</td>
            <td>Baja: la gente está pasando el rato</td>
            <td>Alta: escribió tu servicio en Google</td>
          </tr>
          <tr>
            <td>Costo de empezar</td>
            <td>Cero</td>
            <td>Desde $450.000</td>
          </tr>
          <tr>
            <td>Vida útil del contenido</td>
            <td>Horas</td>
            <td>Años</td>
          </tr>
          <tr>
            <td>Control</td>
            <td>Ninguno: las reglas las pone Meta</td>
            <td>Total</td>
          </tr>
          <tr>
            <td>Credibilidad para tickets altos</td>
            <td>Limitada</td>
            <td>Alta</td>
          </tr>
        </tbody>
      </table>

      <h2>El punto que casi nadie menciona: no eres dueño de tu audiencia</h2>
      <p>
        Tus seguidores no son tuyos. Son de Meta. Si mañana cambia el algoritmo, si te suspenden
        la cuenta por un reporte, o si alguien te la clona, pierdes el canal completo — y no hay
        a quién reclamarle.
      </p>
      <p>
        Le pasa a negocios reales todo el tiempo. Reconstruir cinco años de seguidores desde cero
        es un golpe del que muchos no se levantan.
      </p>
      <blockquote>
        Alquilas audiencia en redes. Eres dueño de tu web y de tu lista de contactos. Esa es
        toda la diferencia.
      </blockquote>

      <h2>La diferencia que decide: intención</h2>
      <p>
        Alguien que ve tu post de uñas acrílicas en Instagram estaba viendo videos, no buscando
        manicurista. Alguien que escribe &quot;uñas acrílicas Bocagrande&quot; en Google{" "}
        <strong>tiene la intención ahora</strong>.
      </p>
      <p>
        Esa segunda persona vale mucho más y es más fácil de convertir. Pero solo llega a ti si
        existes en el buscador — y un perfil de Instagram casi nunca rankea para esas búsquedas.
      </p>

      <h2>Entonces, ¿cuál necesitas?</h2>

      <h3>Instagram te alcanza si…</h3>
      <ul>
        <li>Vendes por impulso y lo visual es el 90% de la decisión.</li>
        <li>Tu ticket es bajo y la compra es rápida.</li>
        <li>Tu negocio es local y de paso.</li>
        <li>Estás empezando y no tienes presupuesto. Empieza acá, sin culpa.</li>
      </ul>

      <h3>Necesitas web si…</h3>
      <ul>
        <li>Tu ticket es alto y el cliente investiga antes de decidir.</li>
        <li>Vendes a empresas.</li>
        <li>Tus clientes buscan tu servicio en Google.</li>
        <li>Necesitas mostrar precios, procesos o portafolio ordenados.</li>
        <li>Te cansaste de repetir lo mismo por mensaje directo.</li>
      </ul>

      <h2>Lo que hace la mejor combinación</h2>
      <p>
        Instagram para captar atención y mostrar el día a día. La web para convertir a quien ya
        está interesado y para aparecer en Google. Y el enlace del perfil apuntando a la web, no
        a un árbol de enlaces genérico.
      </p>
      <p>Tres cosas concretas que hacen que se potencien:</p>
      <ol>
        <li>
          <strong>El enlace del perfil va a tu web</strong>, a una página que continúe lo que la
          persona vio en el post.
        </li>
        <li>
          <strong>Captura correos o WhatsApp desde la web.</strong> Es la lista que sí es tuya y
          que sobrevive a cualquier cambio de algoritmo.
        </li>
        <li>
          <strong>Reutiliza el contenido.</strong> Un post que funcionó bien es el borrador de
          una página que va a traerte visitas durante años.
        </li>
      </ol>

      <h2>Y si el presupuesto solo alcanza para una</h2>
      <p>
        Empieza por lo gratis y hazlo bien: <strong>perfil de Google Business</strong> con fotos,
        horario, teléfono y reseñas, más el Instagram que ya tienes. Eso te pone en el mapa
        literalmente.
      </p>
      <p>
        Cuando el negocio genere flujo estable, la web deja de ser un gasto y pasa a ser una
        inversión con retorno calculable. Los rangos están en{" "}
        <Link href="/blog/cuanto-cuesta-una-pagina-web-en-colombia">
          cuánto cuesta una página web en Colombia
        </Link>
        , y los criterios para decidir el momento en{" "}
        <Link href="/blog/mi-negocio-necesita-pagina-web">
          ¿mi negocio necesita página web?
        </Link>
        .
      </p>
    </>
  );
}
