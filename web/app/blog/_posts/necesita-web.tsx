import Link from "next/link";

// Post: ¿Mi negocio necesita página web en 2026?
// Query objetivo: "mi negocio necesita página web"
export function NecesitaWebPost() {
  return (
    <>
      <p>
        <strong>Respuesta honesta:</strong> no todos los negocios la necesitan hoy. Hay cuatro
        casos en los que te conviene esperar, y decirlo nos cuesta trabajo a nosotros. Pero
        vender una web a quien no la va a aprovechar termina en un cliente insatisfecho.
      </p>

      <h2>La pregunta correcta no es esa</h2>
      <p>
        &quot;¿Necesito página web?&quot; no se puede responder en abstracto. La pregunta útil es{" "}
        <strong>¿cómo te encuentran hoy tus clientes, y qué se está perdiendo en el camino?</strong>
      </p>
      <p>
        Si la respuesta es &quot;me buscan en Google y no aparezco&quot;, la web resuelve un
        problema medible. Si es &quot;todos llegan por recomendación y no doy abasto&quot;, la web
        no es tu prioridad este trimestre.
      </p>

      <h2>Cuándo sí, sin dudarlo</h2>

      <h3>1. Tus clientes te buscan en Google antes de comprar</h3>
      <p>
        Servicios profesionales, salud, construcción, educación, cualquier compra con precio alto.
        La gente investiga antes de llamar. Si no existes en esa búsqueda, no entras a la
        comparación — y no es que pierdas contra el competidor: es que ni apareces.
      </p>

      <h3>2. Vendes algo que requiere explicación</h3>
      <p>
        Si cada venta empieza explicando lo mismo por WhatsApp, la web hace ese trabajo por ti
        veinticuatro horas al día. El cliente llega sabiendo qué haces, cuánto cuesta más o menos
        y si le sirve. Las conversaciones que sí ocurren son con gente más avanzada.
      </p>

      <h3>3. Compites contra negocios que sí tienen</h3>
      <p>
        En sectores donde todos tus competidores tienen web, no tenerla te ubica como el más
        pequeño o el menos serio. Sea justo o no, el cliente lo lee así.
      </p>

      <h3>4. Necesitas que te tomen en serio</h3>
      <p>
        Para vender a empresas, licitar, o cobrar tickets altos, un correo{" "}
        <code>@gmail.com</code> y un Instagram no alcanzan. La web es el requisito mínimo de
        credibilidad.
      </p>

      <h2>Cuándo NO — o al menos, todavía no</h2>

      <h3>1. Tu cuello de botella es la capacidad, no la demanda</h3>
      <p>
        Si ya tienes más trabajo del que puedes atender, más visibilidad no te ayuda: te llena
        de solicitudes que vas a rechazar. Invierte primero en poder atender más.
      </p>

      <h3>2. Tu negocio es 100% local y de paso</h3>
      <p>
        Una tienda de barrio o un puesto de comida en una zona de alto tránsito vive del que
        pasa por enfrente. Ahí{" "}
        <strong>
          un perfil de Google Business bien hecho vale más que una web, y es gratis
        </strong>
        . Foto, horario, teléfono y reseñas. Empieza por ahí.
      </p>

      <h3>3. Todavía no sabes qué vendes</h3>
      <p>
        Si el negocio está probando y el servicio cambia cada mes, la web va a quedar
        desactualizada antes de terminarse. Espera a que el modelo se estabilice.
      </p>

      <h3>4. No tienes quién la mantenga</h3>
      <p>
        Una web con precios de hace dos años y un teléfono viejo hace más daño que no tenerla.
        Comunica descuido. Si nadie va a actualizarla, no la hagas todavía.
      </p>

      <h2>Cómo decidirlo en cinco minutos</h2>
      <p>Responde esto con números, no con intuición:</p>
      <ol>
        <li>
          <strong>Busca tu negocio en Google</strong> como lo buscaría un cliente: el servicio +
          tu ciudad. ¿Apareces? ¿Aparece tu competencia?
        </li>
        <li>
          <strong>Cuenta cuántas veces al mes</strong> explicas lo mismo por WhatsApp a alguien
          que después no compra.
        </li>
        <li>
          <strong>Calcula cuánto vale un cliente</strong> para ti en promedio.
        </li>
        <li>
          <strong>Divide el costo de la web</strong> entre ese valor. Ese es el número de
          clientes que necesitas para que se pague.
        </li>
      </ol>
      <p>
        Si el número te parece alcanzable en un año, la inversión tiene sentido. Los rangos
        actuales están en{" "}
        <Link href="/blog/cuanto-cuesta-una-pagina-web-en-colombia">
          cuánto cuesta una página web en Colombia
        </Link>
        .
      </p>

      <h2>La alternativa intermedia que casi nadie propone</h2>
      <p>
        No tiene que ser todo o nada. Una landing de una página bien hecha —qué haces, para
        quién, prueba de trabajo, cómo contactarte— cuesta una fracción de un sitio completo y
        cubre el 80% del beneficio para un negocio pequeño.
      </p>
      <blockquote>
        Empezar con una página que se actualiza vence a un sitio de ocho que nadie toca.
      </blockquote>
      <p>
        Y si más adelante el negocio crece, esa landing se convierte en el home de un sitio
        mayor. No se tira nada.
      </p>
    </>
  );
}
