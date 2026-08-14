import Link from "next/link";

// Post: ¿Cuánto se demora hacer una página web?
// Query objetivo: "cuánto se demora hacer una página web"
export function CuantoDemoraPost() {
  return (
    <>
      <p>
        <strong>Entre 2 y 12 semanas</strong> según el tipo de sitio. Pero el dato útil no es
        ese: lo que estira los proyectos casi nunca es el desarrollo. Es el contenido, las
        aprobaciones y las decisiones que nadie toma.
      </p>

      <h2>Plazos reales por tipo de proyecto</h2>
      <table>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Plazo típico</th>
            <th>Con todo listo de tu lado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Landing de una página</td>
            <td>2 – 3 semanas</td>
            <td>1 semana</td>
          </tr>
          <tr>
            <td>Sitio corporativo (4-6 páginas)</td>
            <td>4 – 6 semanas</td>
            <td>2 – 3 semanas</td>
          </tr>
          <tr>
            <td>Tienda en línea</td>
            <td>8 – 12 semanas</td>
            <td>5 – 6 semanas</td>
          </tr>
          <tr>
            <td>Rediseño</td>
            <td>3 – 5 semanas</td>
            <td>2 semanas</td>
          </tr>
        </tbody>
      </table>
      <p>
        Fíjate en la última columna. La diferencia entre las dos no es velocidad del equipo: es
        cuánto tiempo el proyecto pasa esperándote.
      </p>

      <h2>En qué se va el tiempo de verdad</h2>
      <p>Un sitio corporativo típico de cinco semanas se reparte más o menos así:</p>
      <ul>
        <li>
          <strong>Descubrimiento y estructura</strong> — 3 a 5 días. Qué páginas, qué dice cada
          una, qué debe lograr.
        </li>
        <li>
          <strong>Diseño</strong> — 1 a 2 semanas, incluidas las rondas de ajustes.
        </li>
        <li>
          <strong>Desarrollo</strong> — 1 a 2 semanas.
        </li>
        <li>
          <strong>Contenido</strong> — <em>variable, y es el que manda.</em> Si los textos y las
          fotos están listos, no suma nada. Si no, puede sumar un mes.
        </li>
        <li>
          <strong>Revisión y publicación</strong> — 3 a 5 días.
        </li>
      </ul>

      <blockquote>
        La causa número uno de retraso en proyectos web no es técnica: es esperar los textos y
        las fotos del cliente.
      </blockquote>

      <h2>Las cuatro cosas que dependen de ti</h2>
      <ol>
        <li>
          <strong>Tener el contenido antes de empezar.</strong> Textos de cada sección, fotos,
          logo en buena resolución, datos de contacto. Si no los tienes, decídelo al inicio y
          contrata la redacción — no lo dejes para &quot;cuando toque&quot;.
        </li>
        <li>
          <strong>Definir quién aprueba.</strong> Una sola persona. Un proyecto donde tres socios
          opinan por separado y se contradicen puede duplicar el plazo.
        </li>
        <li>
          <strong>Responder rápido en las rondas.</strong> Si cada revisión tarda una semana en
          volver, un proyecto de cinco semanas se vuelve de nueve sin que nadie haya trabajado
          más.
        </li>
        <li>
          <strong>Dar los accesos a tiempo.</strong> Dominio, hosting, redes, analítica. Pedirlos
          el último día es un clásico que cuesta días.
        </li>
      </ol>

      <h2>Lo que hace que se estire sin que nadie tenga la culpa</h2>
      <ul>
        <li>
          <strong>Cambios de alcance a mitad de camino.</strong> &quot;Ya que estamos,
          agreguemos…&quot; Cada uno es legítimo, y cada uno mueve la fecha.
        </li>
        <li>
          <strong>Integraciones con terceros.</strong> Depender de la pasarela de pagos o de un
          sistema de inventario mete tiempos que no controla nadie del equipo.
        </li>
        <li>
          <strong>Aprobar el diseño y luego querer cambiarlo.</strong> Rehacer diseño con el
          desarrollo empezado cuesta el doble.
        </li>
        <li>
          <strong>Fotografía.</strong> Si hay que producir sesión, agenda con semanas de
          anticipación.
        </li>
      </ul>

      <h2>¿Se puede acelerar?</h2>
      <p>Sí, con tres condiciones honestas:</p>
      <ul>
        <li>
          <strong>Recortando alcance,</strong> no comprimiendo el trabajo. Salir con tres páginas
          y agregar el resto después es la forma sana.
        </li>
        <li>
          <strong>Con el contenido 100% listo</strong> el día uno.
        </li>
        <li>
          <strong>Pagando urgencia.</strong> Reordenar la agenda de un equipo tiene costo.
        </li>
      </ul>
      <p>
        Desconfía de quien prometa una tienda en línea completa en una semana. O usa una
        plantilla sin adaptar, o va a entregar algo a medias que vas a terminar rehaciendo.
      </p>

      <h2>Una recomendación que ahorra meses</h2>
      <p>
        <strong>Sal antes con menos.</strong> Un sitio de tres páginas publicado en dos semanas
        empieza a traerte visitas mientras trabajas el resto. Uno de doce páginas que sale en
        tres meses no te trajo nada durante tres meses.
      </p>
      <p>
        Y en SEO el tiempo compone: una página que lleva seis meses publicada rankea mejor que
        una idéntica publicada ayer. Salir antes no es solo llegar antes — es empezar antes el
        reloj que sí importa.
      </p>
      <p>
        Si todavía estás decidiendo el alcance, mira los rangos en{" "}
        <Link href="/blog/cuanto-cuesta-una-pagina-web-en-colombia">
          cuánto cuesta una página web en Colombia
        </Link>{" "}
        o cotiza tu caso en el <Link href="/cotizador">cotizador</Link>.
      </p>
    </>
  );
}
