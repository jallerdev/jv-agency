import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  ExternalLink,
  KeyRound,
  LayoutTemplate,
  MapPin,
  RefreshCw,
  Search,
  Smartphone,
} from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Faqs } from "@/components/Faqs";
import { sinPendientes } from "@/components/Pendiente";
import { BotonCuentame } from "@/components/Cuentame";
import { ArbolDecision, type NodoArbol } from "@/components/visuales/ArbolDecision";
import { Comparador } from "@/components/visuales/Comparador";
import { ListaAcopio } from "@/components/visuales/ListaAcopio";
import { RailDistancia } from "@/components/visuales/RailDistancia";
import { RailPlazo } from "@/components/visuales/RailPlazo";
import { SITE_URL } from "@/lib/site";
import {
  INCLUIDO_SIEMPRE,
  INCLUIDO_POR_TIPO,
  PAGINAS_BASE,
  PRICES,
  money,
} from "@/lib/quote";

/**
 * Página de servicio para «diseño de páginas web», el término principal del
 * negocio. Es la #4 del orden de rentabilidad de
 * `SEO-INTENCIONES-DE-COMPRA.md`, después del chatbot.
 *
 * UNA SOLA PÁGINA PARA UNA SOLA INTENCIÓN. «Diseño web», «diseño de páginas
 * web», «creación de páginas web», «hacer una página web» y «diseño de sitios
 * web» son la misma búsqueda: van todas acá dentro y no generan página propia.
 * Crear una por sinónimo produce doorway pages y Google las castiga desde hace
 * más de diez años.
 *
 * QUÉ ENTRA Y QUÉ NO ENTRA EN ESTA PÁGINA
 * ---------------------------------------
 *  · Entran los TRES formatos de la misma intención: landing page, web
 *    corporativa y rediseño de la que ya existe. Un negocio que busca «diseño
 *    de páginas web» todavía no sabe cuál de los tres quiere.
 *  · NO entra la tienda virtual. Tiene su propia página en el mapa
 *    (/servicios/tiendas-virtuales) y compite por otra búsqueda: acá va una
 *    línea y nada más.
 *  · NO entra «cuánto cuesta una página web en Colombia»: eso es del artículo
 *    del blog, que declara esas keywords. Acá va UNA línea de precio y un
 *    enlace, no una sección construida sobre la pregunta.
 *  · NO entra la comparativa de precios: esa es /precios.
 *  · NO entran las ciudades: Cartagena, Barranquilla y Bogotá ya tienen página
 *    propia. Acá se nombran Turbaco, Bolívar y Cartagena en texto visible
 *    —que es lo que contesta «diseño de páginas web cerca de mí»— y se enlaza.
 *
 * «Desarrollo web» y «desarrollo de páginas web» viven en el cuerpo, nunca en
 * el h1: es palabra de agencia, no la que escribe el cliente colombiano.
 *
 * EL HUECO DEL MERCADO, que es lo que sostiene el encabezado: de los
 * competidores revisados (Cangrejo Digital, PACOWEB, Since Marketing, AMD,
 * Click Sólido, INGYNET, Milods, Dayvo, Distecnoweb), casi ninguno publica
 * precio Y plazo juntos, y ninguno dice quién escribe el código.
 */
export const metadata: Metadata = {
  title: "Diseño de páginas web en Colombia | JV Agencia",
  description:
    "Diseño y programo páginas web para negocios de Colombia. Desde $850.000, autoadministrable, con el dominio a tu nombre. Precio y plazo publicados antes de empezar.",
  alternates: { canonical: "/servicios/diseno-de-paginas-web" },
  openGraph: {
    title: "Diseño de páginas web en Colombia | JV Agencia",
    description:
      "Páginas web a la medida desde $850.000. Las diseño y las programo yo, desde Turbaco, Bolívar.",
    url: `${SITE_URL}/servicios/diseno-de-paginas-web`,
    type: "website",
  },
};

/**
 * Precio impreso. El formateador de `es-CO` mete un espacio duro después del
 * signo («$ 850.000») y el precio autorizado se escribe «$850.000» —así está
 * en /precios y en el chip del Hero—. En esta página conviven un titular
 * escrito a mano y unas tarjetas que leen el número de `lib/quote.ts`: sin
 * esto, el mismo precio aparecía de dos formas distintas en la misma pantalla.
 * El número sigue saliendo del cotizador; lo único que cambia es el espacio.
 */
const pesos = (n: number) => money(n).replace(/\s/g, "");

/**
 * Los pisos PUBLICADOS. Ojo: no son `PRICES.base`. Esa es la base con la que
 * arranca el cotizador antes de sumar nada, y para landing y tienda no coincide
 * con el número que el sitio anuncia. Se declaran acá una sola vez y de acá los
 * leen la tarjeta, el árbol de decisión y la lista de lo que no entra: antes el
 * 2.500.000 estaba escrito a mano en dos sitios de esta misma página.
 */
const PISO_LANDING = 850000;
const PISO_ECOM = 2500000;

/**
 * Las situaciones en que alguien contrata esto. No son perfiles de cliente:
 * son momentos. Quien se reconoce en uno ya sabe que necesita el servicio.
 */
const PARA_QUIEN = [
  {
    icon: Smartphone,
    titulo: "Todo tu negocio vive en Instagram",
    desc: "Un perfil te da alcance. Pero el que te busca por tu nombre en Google no encuentra nada.",
    link: { href: "/blog/pagina-web-o-solo-instagram", label: "¿Página web o solo Instagram?" },
  },
  {
    icon: RefreshCw,
    titulo: "Tienes página, pero te da pena mandarla",
    desc: "Se hizo hace cinco años y en el celular se ve corrida. Más del 70% de las búsquedas en Colombia salen del teléfono: ahí se pierde el cliente.",
  },
  {
    icon: KeyRound,
    titulo: "No la puedes tocar sin llamar a alguien",
    desc: "Cambiar un precio o subir una foto se volvió un favor que hay que pedir. Es la queja número uno que escucho.",
  },
  {
    icon: LayoutTemplate,
    titulo: "Vas a pautar y no tienes a dónde mandar el clic",
    desc: "Mandar la pauta a un perfil de Instagram es botar plata. Para eso está la landing: una página, un objetivo y la conversión medida.",
  },
  {
    icon: Building2,
    titulo: "El negocio creció y la página quedó chiquita",
    desc: "Ya no son dos servicios, son ocho, y ya no eres tú solo. Eso es una web corporativa, con panel para mantenerla al día tú.",
  },
  {
    icon: Search,
    titulo: "Quieres rehacerla, pero te da miedo perder lo posicionado",
    desc: "Miedo con fundamento y con solución: se traen los textos, se redirigen las direcciones viejas y se conserva lo que ya rankea.",
  },
];

/**
 * Los tres formatos de la misma intención. Las páginas base se leen de
 * `lib/quote.ts` para que no se desincronicen con el cotizador.
 */
const FORMATOS = [
  {
    icon: LayoutTemplate,
    nombre: "Landing page",
    tambien: "página de aterrizaje",
    incluye: INCLUIDO_POR_TIPO.landing,
    paginas: PAGINAS_BASE.landing,
    desde: PISO_LANDING,
  },
  {
    icon: Building2,
    nombre: "Página web corporativa",
    tambien: "web corporativa, sitio institucional",
    incluye: INCLUIDO_POR_TIPO.corp,
    paginas: PAGINAS_BASE.corp,
    /* Del cotizador, no de aquí: `PRICES.base.corp`. Las tres tarjetas
       imprimían el MISMO $850.000, que es el piso de la landing, así que la
       corporativa se anunciaba a menos de la mitad de lo que cuesta. */
    desde: PRICES.base.corp,
  },
  {
    icon: RefreshCw,
    nombre: "Rediseño de la que ya tienes",
    tambien: "migración",
    incluye: [
      "Revisión de lo que hay: qué se salva y qué se bota, dicho antes de empezar",
      "Traslado de textos, fotos, productos y artículos",
      "Redirecciones de las direcciones viejas para no perder el posicionamiento",
      "Comparación de velocidad antes y después, con los números a la vista",
    ],
    paginas: ["Las que tenga hoy tu sitio, revisadas una por una"],
    /* Sin piso publicable: un rediseño cuesta lo que cueste el sitio que
       queda debajo —no es lo mismo rehacer una página suelta que un
       institucional de siete— más el traslado. Poner una cifra aquí sería
       inventarla; el número sale de la revisión, que es justo lo primero que
       promete la tarjeta. */
    desde: null,
  },
];


/**
 * El árbol que encabeza los precios. Contesta la pregunta que de verdad trae
 * el visitante —«¿cuál de los tres pido?»— y su primera rama lo saca honesto
 * hacia tiendas virtuales, que era un párrafo entero de desvío.
 * Los pisos salen de PISO_LANDING, PISO_ECOM y PRICES.base.corp: ni un número
 * escrito a mano.
 */
const ARBOL: NodoArbol = {
  tipo: "pregunta",
  pregunta: "¿Vas a cobrar en línea, con carrito y pago?",
  opciones: [
    {
      etiqueta: "Sí, quiero vender",
      siguiente: {
        tipo: "resultado",
        titulo: "Eso ya es una tienda virtual",
        detalle:
          "Carrito, inventario y pagos dejan de ser una página web. Va por otro lado, con otro precio y otro plazo.",
        pie: `Desde ${pesos(PISO_ECOM)} · 3 a 5 semanas`,
        enlace: { texto: "Ver tiendas virtuales", href: "/servicios/tiendas-virtuales" },
      },
    },
    {
      etiqueta: "No por ahora",
      siguiente: {
        tipo: "pregunta",
        pregunta: "¿La página ya existe?",
        opciones: [
          {
            etiqueta: "Sí, hay una",
            siguiente: {
              tipo: "resultado",
              titulo: "Rediseño de la que ya tienes",
              detalle:
                "Primero la reviso y te digo qué se salva. El precio sale de esa revisión, no de un tarifario.",
              pie: "Sin piso publicable · sale de la revisión",
            },
          },
          {
            etiqueta: "No, de cero",
            siguiente: {
              tipo: "pregunta",
              pregunta: "¿Un solo servicio o el negocio completo?",
              opciones: [
                {
                  etiqueta: "Un servicio o una campaña",
                  siguiente: {
                    tipo: "resultado",
                    titulo: "Landing page",
                    detalle: "Una sola página, un solo objetivo y la conversión medida.",
                    pie: `Desde ${pesos(PISO_LANDING)} · 5 días`,
                  },
                },
                {
                  etiqueta: "El negocio completo",
                  siguiente: {
                    tipo: "resultado",
                    titulo: "Página web corporativa",
                    detalle:
                      "Varias páginas —servicios, quiénes somos, contacto— y panel para mantenerla al día tú.",
                    pie: `Desde ${pesos(PRICES.base.corp)} · 1 a 2 semanas`,
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
};

/** Lo que NO entra. Vale más que la lista de lo que sí: evita la pelea. */
const NO_INCLUYE = [
  {
    texto: "El presupuesto de pauta. Dejo la landing y la medición funcionando; lo que le pagas a Meta o a Google Ads lo pones tú.",
    quien: "tu tarjeta",
  },
  {
    texto: `El posicionamiento mensual. El SEO técnico de entrega sí va; posicionar es trabajo de todos los meses: auditoría desde ${pesos(390000)} y plan local desde ${pesos(650000)} al mes.`,
    quien: "se cotiza aparte",
  },
  {
    texto: `Carrito, inventario y pagos en línea. Eso ya es una tienda virtual: desde ${pesos(PISO_ECOM)} y de 3 a 5 semanas.`,
    quien: "otra página, otro precio",
  },
  {
    texto: "Sesión de fotos y video. Uso banco de imágenes con licencia y te arreglo las que tomes con el celular.",
    quien: "un fotógrafo",
  },
  {
    texto: `Logo y marca desde cero. Si ya tienes logo, lo aplicamos; crear la identidad se cotiza desde ${pesos(PRICES.marca.nada)}.`,
    quien: "se cotiza aparte",
  },
  {
    texto: "Redes sociales y contenido de todos los meses. No manejo cuentas ni programo publicaciones, y te lo digo de una vez en vez de venderlo mal.",
    quien: "no es lo mío",
  },
];

/**
 * Lo que entra siempre. Los dos últimos no están en `INCLUIDO_SIEMPRE` porque
 * son de esta página: el dominio a nombre del cliente y el SEO de entrega.
 */
const INCLUYE_SIEMPRE = [
  ...INCLUIDO_SIEMPRE,
  "Dominio a tu nombre y correo con tu dirección: hola@tumarca.com, no @gmail.com",
  "SEO técnico de entrega: título y descripción por página, datos estructurados, sitemap y alta en Google Search Console",
];

/**
 * Los cinco días, dibujados. El tramo previo del rail es la condición honesta
 * más cara de explicar del sitio —«el reloj arranca cuando llega el material»—
 * y como tramo punteado se entiende antes de leerla.
 */
const PREVIO_PLAZO = {
  etiqueta: "Antes del día 1",
  texto: "Tu contenido y tu marca, en mi mano. El reloj todavía no ha arrancado.",
};

const HITOS_PLAZO = [
  { etiqueta: "Día 1", texto: "Estructura: qué ve tu cliente, en qué orden y qué quieres que haga." },
  {
    etiqueta: "Día 2 y 3",
    texto: "Diseño y programación, al mismo tiempo. Lo que apruebas es lo que se publica.",
  },
  { etiqueta: "Día 4", texto: "La revisas conmigo en vivo, en tu teléfono y en tu computador." },
  {
    etiqueta: "Día 5",
    texto: "Sale al aire con dominio, certificado, correo y medición. Y te enseño a manejarla.",
  },
];

/** El material que hace arrancar el reloj, como lista de embarque. */
const MATERIAL = [
  "Tu logo, en el mejor archivo que tengas",
  "Los textos, o el visto bueno para que los escriba yo",
  "Fotos del negocio, del equipo y del trabajo hecho",
  "Precios o tarifas, si los vas a publicar",
  "Horarios reales, sábados incluidos",
  "Accesos al dominio y al correo, si ya los tienes",
];

const FAQS = [
  {
    q: "¿Cuánto me cuesta y qué entra exactamente por ese precio?",
    a: `Desde ${pesos(PISO_LANDING)}, y lo que entra por ese piso está en la lista de «lo que entra siempre»: diseño propio sin plantilla, programación, que se vea bien en teléfono y computador, el formulario que te llega al correo y al WhatsApp, certificado de seguridad, capacitación y 30 días de ajustes sin costo. Es un piso, no una tarifa cerrada: el número final depende de cuántas páginas, de quién escriba los textos y de qué funciones lleve, y te lo doy por escrito antes de que pagues nada.`,
  },
  {
    q: "¿En cuánto me la entregas de verdad, y desde cuándo se cuentan los días?",
    a: "Cinco días. Y la segunda mitad de la pregunta importa más que la primera: los días empiezan a contar cuando tengo el contenido y la marca, no el día que hablamos. Si me tardas dos semanas en mandar las fotos, la entrega se corre dos semanas y eso no es culpa de nadie. Si los textos los escribo yo, ese tiempo ya está contado.",
  },
  {
    q: "¿Yo la puedo editar después sin llamarte?",
    a: "En la web corporativa, sí: entra el panel para que cambies textos e imágenes sin tocar código, y te enseño a usarlo el día de la entrega. En una landing de una sola página los cambios son tan pocos que normalmente los hago yo dentro de los 30 días, y si la quieres autoadministrable igual, se agrega. Prefiero decirte esto a venderte «autoadministrable» a secas y que después descubras qué se podía tocar y qué no.",
  },
  {
    q: "¿El dominio y el hosting quedan a mi nombre o al tuyo?",
    a: "A tu nombre. El dominio se registra con tus datos y el alojamiento queda a nombre del negocio, no del mío. Es tuyo desde el primer día y no necesitas mi permiso para nada.",
  },
  {
    q: "Si mañana me voy con otro proveedor, ¿me llevo la página?",
    a: "Te la llevas. Te entrego los accesos y el código, y no hay nada amarrado a una plataforma mía que deje de funcionar cuando yo no esté. Amarrar clientes con la clave del dominio es una práctica común en este negocio y es la razón por la que mucha gente llega quemada.",
  },
  {
    q: "¿La haces en WordPress, en plantilla comprada o a la medida?",
    a: "A la medida, con Next.js y React. No compro una plantilla de mercado ni le cambio los colores a algo que ya vendieron mil veces. La diferencia que tú notas es velocidad y que se vea como tu negocio y no como el de otro. La diferencia que nota Google es la misma: velocidad.",
  },
  {
    q: "¿Incluye SEO? ¿Voy a aparecer en Google por esto?",
    a: "Incluye el SEO técnico de entrega: título y descripción escritos uno por página, datos estructurados, sitemap, robots, imágenes comprimidas con su texto alternativo y el alta en Google Search Console. Eso es la base para poder aparecer. Aparecer de primero es otra cosa: es trabajo mensual, no te lo prometo —y desconfía del que te lo prometa—, y los primeros movimientos se ven entre el mes 3 y el 6.",
  },
  {
    q: "Ya tengo página. ¿Pierdo lo que tengo posicionado si la cambio?",
    a: "No, si se hace bien. Antes de tocar nada se anota qué direcciones tienes hoy y por qué búsquedas te encuentran; después cada dirección vieja se redirige a la nueva que le corresponde. Lo que se pierde es cuando alguien publica el sitio nuevo encima del viejo sin mirar eso, y entonces Google llega a páginas que ya no existen.",
  },
  {
    q: "¿Quién escribe los textos y quién consigue las fotos?",
    a: "Como prefieras, y cambia el precio. Si los mandas tú, no cuestan nada y yo los maqueto y les corrijo la forma. Si los escribo yo, se cobran por página, porque el trabajo crece con cada página. Las fotos: puedo usar banco de imágenes con licencia y mejorarte las que tomes con el celular, pero contratar una sesión de fotos no entra.",
  },
  {
    q: "¿Qué pago cada año después de entregada?",
    a: "La renovación anual son $290.000: cubre el dominio, el alojamiento y que el sitio siga en pie. Aparte, si quieres que además le hagan mantenimiento —copias de seguridad, actualizaciones, cambios de contenido cada mes— hay planes mensuales que empiezan en " + pesos(PRICES.mantenimiento.basico) + " al mes. Ese sí es opcional: sin plan el sitio es tuyo igual y sigue funcionando.",
  },
  {
    q: "¿Cómo se paga? ¿Cuánto por adelantado?",
    a: "Los anticipos, los hitos y el saldo van escritos en la propuesta antes de empezar, con sus fechas. No hay nada que firmar en persona y no te pido plata antes de que tengas el alcance y el precio por escrito.",
  },
  {
    q: "¿Se ve bien en el celular?",
    a: "Se diseña primero para el celular y después para el computador, no al revés. En Colombia más de siete de cada diez búsquedas salen del teléfono, así que la versión móvil no es una adaptación: es la principal. Antes de entregar se revisan velocidad y accesibilidad, y te muestro los números.",
  },
  {
    q: "¿Y si no me gusta el diseño? ¿Cuántos ajustes tengo?",
    a: "La revisas antes de que salga al aire y los cambios se hacen ahí mismo, en vivo. Después de publicada quedan 30 días de ajustes sin costo.",
    // Va en `verify` y no dentro de la respuesta: Radix desmonta el contenido
    // del acordeón cerrado, así que ahí adentro el marcador no existiría en el
    // DOM hasta que alguien hiciera clic. Comprobado en el navegador.
    verify:
      "[PENDIENTE: cuántas rondas de ajuste de diseño entran en el precio, dicho con un número. Hoy el sitio no lo dice en ninguna parte y es lo primero que pregunta un cliente quemado.]",
  },
  {
    q: "¿Trabajas con negocios fuera de tu ciudad?",
    a: "Sí. Vivo en Turbaco, Bolívar, a 20 kilómetros de Cartagena, y trabajo con negocios de toda Colombia. Casi todo se resuelve por WhatsApp y videollamada, que es como ya trabajas. Si el proyecto pide que nos veamos y estás en Cartagena o en Bolívar, nos vemos.",
  },
  {
    q: "Eres uno solo. ¿Qué pasa si te enfermas o desapareces?",
    a: "Es la pregunta correcta y no te voy a vender que soy un equipo. Por eso el dominio y el hosting quedan a tu nombre, el código te lo entrego y nada depende de una plataforma mía: si mañana no estoy, cualquier desarrollador puede seguir. Lo que sí te doy y una agencia no: cuando escribas a reclamar, contesta el que hizo el trabajo.",
  },
];

export default function DisenoDePaginasWebPage() {
  // Service, sin FAQPage: desde 2023 Google restringió el resultado
  // enriquecido de FAQ a sitios de gobierno y salud.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/servicios/diseno-de-paginas-web#servicio`,
    name: "Diseño de páginas web",
    alternateName: [
      "Diseño web",
      "Creación de páginas web",
      "Diseño de páginas web profesionales",
      "Desarrollo de páginas web",
      "Diseño de sitios web",
      "Páginas web autoadministrables",
    ],
    serviceType: "Diseño y desarrollo de páginas web",
    description:
      "Diseño y programación de páginas web a la medida para pymes y negocios de Colombia: landing pages, webs corporativas autoadministrables y rediseño de sitios existentes. Desde $850.000, con dominio y hosting a nombre del cliente.",
    provider: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/servicios/diseno-de-paginas-web`,
    areaServed: [
      { "@type": "Country", name: "Colombia" },
      {
        "@type": "City",
        name: "Cartagena de Indias",
        containedInPlace: { "@type": "AdministrativeArea", name: "Bolívar" },
      },
      { "@type": "AdministrativeArea", name: "Bolívar, Colombia" },
    ],
    offers: [
      {
        "@type": "Offer",
        name: "Página web",
        description:
          "Página web a la medida, con diseño propio, dominio y correo corporativo. Entrega en 5 días.",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "COP",
          minPrice: 850000,
        },
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Renovación anual",
        description:
          "Renovación anual del dominio, el alojamiento y el mantenimiento del sitio en pie.",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "COP",
          price: 290000,
        },
        availability: "https://schema.org/InStock",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        {/* ── Encabezado ─────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 pb-8 pt-32 text-center md:px-8 md:pt-40">
          <Reveal>
            <Badge>Diseño de páginas web</Badge>
            <h1 className="mt-6 font-display text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
              {/* El espacio explícito importa: sin él, el textContent del h1
                  que lee un rastreador queda «páginas webpara». */}
              Diseño de páginas web{" "}
              <span className="block text-metal">para negocios que quieren vender más</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Tu próximo cliente te busca en el celular ahora mismo. Si encuentra un perfil sin
              precios, sin horario y sin forma clara de escribirte, se va al de al lado. Una
              página web contesta esas tres cosas mientras tú trabajas.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href="/#contacto">
                  Agenda una llamada <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#precio">Ver el precio y el plazo</a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="mx-auto mt-8 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-line bg-surface/70 px-5 py-2 font-body text-sm text-ink-soft">
              <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              Turbaco, Bolívar · trabajo con negocios de Cartagena y de toda Colombia
            </p>
          </Reveal>
        </section>

        {/* ── El diferenciador, arriba y no enterrado ─────────────────── */}
        {/* Sin tarjeta propia: la sección va DENTRO de una banda y el tono lo
            pone la banda. El degradado y el borde apilaban dos tonos. */}
        <section className="banda mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Casi nadie publica precio y plazo juntos.
              <span className="text-metal"> Y ninguno dice quién escribe el código.</span>
            </h2>
            <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Unas agencias ponen precio y no dicen cuánto tardan; otras dicen «de 4 a 8 semanas»
              y te mandan a un formulario. Saber cuánto te cuesta te toma tres llamadas.
            </p>
            <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              <strong className="text-ink">Acá está el número, el plazo y el nombre.</strong> Me
              llamo Luis Jaller, vivo en Turbaco, Bolívar, y soy el que diseña y el que programa.
              Hablas con la misma persona de la primera llamada a la entrega.
            </p>
          </Reveal>
        </section>

        {/* ── Para quién es ──────────────────────────────────────────── */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Nadie se levanta queriendo «una página web»
            </h2>
            <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Se levanta con uno de estos seis problemas.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {PARA_QUIEN.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.titulo} delay={i * 70}>
                  <article className="flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-7">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-on-accent shadow-soft">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-body text-xl font-semibold text-ink">{p.titulo}</h3>
                    <p className="mt-2 flex-1 font-body leading-relaxed text-ink-soft">{p.desc}</p>
                    {p.link && (
                      <Link
                        href={p.link.href}
                        className="mt-4 inline-flex min-h-11 items-center gap-2 font-body text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
                      >
                        {p.link.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ── Qué se hace y cuánto cuesta ────────────────────────────── */}
        <section id="precio" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-12 md:px-8">
          <Reveal>
            <Badge>Precio y plazo</Badge>
            <h2 className="mt-6 font-display text-3xl text-ink sm:text-4xl">
              Tres formatos, cada uno con su piso y su plazo
            </h2>
            <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Es un piso, no una tarifa cerrada: el número final depende de cuántas páginas, de
              quién escriba los textos y de qué funciones lleve, y te lo doy por escrito antes de
              que pagues nada. La tabla completa está en{" "}
              <Link href="/precios" className="text-primary-dark underline underline-offset-4">
                precios
              </Link>
              .
            </p>
          </Reveal>

          {/* Antes de las tres tarjetas, la pregunta que trae el visitante:
              cuál de los tres pedir. La primera rama lo manda a tiendas. */}
          <Reveal delay={80}>
            <ArbolDecision raiz={ARBOL} className="mt-10" />
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {FORMATOS.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.nombre} delay={i * 80}>
                  <article className="flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-7">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-on-accent shadow-soft">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-body text-xl font-semibold text-ink">{f.nombre}</h3>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                      también: {f.tambien}
                    </p>

                    <p className="mt-5 font-body text-sm font-semibold text-ink">Qué páginas trae</p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {f.paginas.map((p) => (
                        <li
                          key={p}
                          className="rounded-full border border-line px-3 py-1 font-body text-xs text-ink-soft"
                        >
                          {p}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-5 font-body text-sm font-semibold text-ink">
                      Además de lo de siempre
                    </p>
                    <ul className="mt-2 flex-1 grid gap-2">
                      {f.incluye.map((x) => (
                        <li key={x} className="flex items-start gap-2 font-body text-sm text-ink-soft">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="mt-5 border-t border-line pt-4 font-mono text-lg text-primary-dark">
                      {f.desde ? `desde ${pesos(f.desde)}` : "según lo que haya hoy"}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <p className="mt-8 max-w-2xl font-body text-base leading-relaxed text-ink-soft">
              ¿Comparando presupuestos? El desglose largo está en{" "}
              <Link
                href="/blog/cuanto-cuesta-una-pagina-web-en-colombia"
                className="text-primary-dark underline underline-offset-4"
              >
                cuánto cuesta una página web en Colombia
              </Link>{" "}
              y en{" "}
              <Link
                href="/blog/cuanto-se-demora-hacer-una-pagina-web"
                className="text-primary-dark underline underline-offset-4"
              >
                cuánto se demora hacer una página web
              </Link>
              .
            </p>
          </Reveal>
        </section>

        {/* ── Qué incluye y qué NO ───────────────────────────────────── */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <Comparador
              tituloComo="h2"
              tituloIncluye="Lo que entra siempre, sea cual sea el formato"
              tituloNoIncluye={
                <>
                  Y lo que <span className="text-metal">no</span> entra
                </>
              }
              nota="Esta lista vale más que la de arriba. Todo pleito que he visto entre un negocio y su proveedor web empezó por algo que nadie dijo al principio."
              incluye={INCLUYE_SIEMPRE}
              noIncluye={NO_INCLUYE}
            />
          </Reveal>
        </section>

        {/* ── Cómo se hace ───────────────────────────────────────────── */}
        <section className="banda mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Cómo se hace</h2>
            <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Antes del día 1 hay una llamada de veinte minutos con el precio por escrito. Esa no
              cuesta nada y no cuenta como día de trabajo.
            </p>
          </Reveal>

          {/* El tramo punteado es el argumento: el reloj arranca con el
              material, no con la firma. Dicho como dibujo y no como excusa. */}
          <Reveal delay={80}>
            <RailPlazo className="mt-10" previo={PREVIO_PLAZO} hitos={HITOS_PLAZO} />
          </Reveal>

          <Reveal delay={140}>
            <ListaAcopio className="mt-12 max-w-2xl" almacen="acopio-paginas-web" items={MATERIAL} />
          </Reveal>
        </section>

        {/* ── El trabajo que respalda esto ───────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              El trabajo que respalda esto
            </h2>
            <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Con la separación de siempre: lo que está en producción con dominio propio, y lo
              que construí por iniciativa propia.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <Reveal>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-7">
                <span className="w-fit rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                  En producción · Cartagena
                </span>
                <h3 className="mt-4 font-display text-2xl text-ink">Bloomrose</h3>
                <p className="mt-3 flex-1 font-body leading-relaxed text-ink-soft">
                  Tienda de bisutería para el mercado colombiano, diseñada y programada
                  completa: catálogo con inventario, carrito, cuentas, pagos en línea y envíos.
                  Ábrela y revísala sin pedirme permiso.
                </p>
                <a
                  href="https://www.bloomroseaccesorios.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-11 items-center gap-2 font-body text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  bloomroseaccesorios.com <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            </Reveal>

            <Reveal delay={80}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-7">
                <span className="w-fit rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                  En producción · producto propio
                </span>
                <h3 className="mt-4 font-display text-2xl text-ink">HalcónOS y Hummik</h3>
                <p className="mt-3 flex-1 font-body leading-relaxed text-ink-soft">
                  Un CRM de ventas y una agenda de citas por WhatsApp, míos y en línea. No son
                  páginas web, son{" "}
                  <Link
                    href="/servicios/software-a-la-medida"
                    className="text-primary-dark underline underline-offset-4 hover:text-accent"
                  >
                    software a la medida
                  </Link>
                  , y están acá por una razón: si puedo sostener eso, tu página no es el reto.
                </p>
                <a
                  href="https://halcon.jvagencia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-11 items-center gap-2 font-body text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  halcon.jvagencia.com <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            </Reveal>

            <Reveal delay={160}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-7">
                <span className="w-fit rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                  Proyectos de estudio
                </span>
                <h3 className="mt-4 font-display text-2xl text-ink">
                  Animal Expert, Elka Gómez y Marcopolo
                </h3>
                <p className="mt-3 flex-1 font-body leading-relaxed text-ink-soft">
                  Una veterinaria de Turbaco, un centro de fisioterapia de Cartagena y un salón
                  de Barranquilla. Construidos completos, pero{" "}
                  <strong className="text-ink">por iniciativa propia y nadie me los encargó</strong>
                  : no son clientes que pagaron.
                </p>
              </article>
            </Reveal>
          </div>

          <Reveal>
            <p className="mt-8 font-body leading-relaxed text-ink-soft">
              El portafolio completo, con las capturas, está{" "}
              <Link
                href="/#proyectos"
                className="font-semibold text-primary-dark underline-offset-4 hover:underline"
              >
                en la portada
              </Link>
              , y{" "}
              <Link
                href="/sobre-nosotros"
                className="font-semibold text-primary-dark underline-offset-4 hover:underline"
              >
                acá está quién soy
              </Link>
              .
            </p>
          </Reveal>
        </section>

        {/* ── Dónde estoy y a dónde llego ────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <div className="rounded-[1.5rem] border border-line bg-surface/70 p-7 md:p-10">
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                ¿Buscabas un diseñador de páginas web cerca de ti?
              </h2>
              <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
                Vivo en <strong className="text-ink">Turbaco, Bolívar</strong>. No tengo oficina en
                el Centro de Cartagena y no la voy a fingir.
              </p>

              {/* La ventaja y la limitación en el mismo dibujo. No es un mapa a
                  propósito: un mapa insinúa cobertura que no existe. */}
              <RailDistancia className="mt-8" />

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { href: "/diseno-de-paginas-web-en-cartagena", label: "Páginas web en Cartagena" },
                  {
                    href: "/diseno-de-paginas-web-en-barranquilla",
                    label: "Páginas web en Barranquilla",
                  },
                  { href: "/diseno-de-paginas-web-en-bogota", label: "Páginas web en Bogotá" },
                ].map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/25 bg-background/50 px-4 py-2 font-body text-sm text-primary-dark transition-colors hover:border-primary hover:bg-primary/5"
                  >
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    {c.label}
                  </Link>
                ))}
              </div>

              <p className="mt-7 font-body leading-relaxed text-ink-soft">
                ¿Tu sector tiene reglas propias? Hay páginas para{" "}
                <Link
                  href="/sectores/clinicas-y-consultorios"
                  className="font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  clínicas y consultorios
                </Link>
                ,{" "}
                <Link
                  href="/sectores/salones-y-spas"
                  className="font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  salones y spas
                </Link>{" "}
                y{" "}
                <Link
                  href="/blog/que-debe-tener-la-pagina-web-de-un-restaurante"
                  className="font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  restaurantes
                </Link>
                . Si el problema no es la página sino contestar los mensajes, eso es un{" "}
                <Link
                  href="/servicios/chatbot-whatsapp"
                  className="font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  chatbot de WhatsApp
                </Link>
                ; si ya existe y falta que la encuentren, eso es{" "}
                <Link
                  href="/servicios/posicionamiento-seo"
                  className="font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  posicionamiento web y SEO
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── Preguntas ──────────────────────────────────────────────── */}
        <section className="banda mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Lo que siempre preguntan
            </h2>
            <p className="mt-4 font-body text-lg leading-relaxed text-ink-soft">
              Están contestadas de frente, incluidas las incómodas.
            </p>
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <Faqs items={sinPendientes(FAQS)} />
          </Reveal>
        </section>

        {/* ── Cierre ─────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 py-16 text-center md:px-8 md:py-24">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Cuéntame qué vendes y a quién
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-body text-lg leading-relaxed text-ink-soft">
              Veinte minutos bastan para saber qué formato te conviene, cuánto costaría y en
              cuánto queda lista. Si no necesitas una página web, te lo digo.
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href="/#contacto">
                  Agenda una llamada <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <BotonCuentame />
            </div>
            <p className="mx-auto mt-8 max-w-xl font-body text-base leading-relaxed text-ink-soft">
              ¿Todavía no sabes si te conviene? Empieza por{" "}
              <Link
                href="/blog/mi-negocio-necesita-pagina-web"
                className="text-primary-dark underline underline-offset-4"
              >
                ¿mi negocio necesita página web?
              </Link>{" "}
              y por{" "}
              <Link href="/precios" className="text-primary-dark underline underline-offset-4">
                la tabla de precios
              </Link>
              .
            </p>
          </Reveal>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
