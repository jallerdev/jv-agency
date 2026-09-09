import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  Clock,
  ExternalLink,
  KeyRound,
  LayoutTemplate,
  MapPin,
  RefreshCw,
  Search,
  Smartphone,
  X,
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

/** El plazo está en disputa dentro del propio sitio. Se dice a la vista. */
/**
 * Las situaciones en que alguien contrata esto. No son perfiles de cliente:
 * son momentos. Quien se reconoce en uno ya sabe que necesita el servicio.
 */
const PARA_QUIEN = [
  {
    icon: Smartphone,
    titulo: "Todo tu negocio vive en Instagram",
    desc: "Funciona hasta que alguien te busca por tu nombre en Google y no encuentra nada. Un perfil te da alcance; una página es la que aparece cuando ya te están buscando.",
    link: { href: "/blog/pagina-web-o-solo-instagram", label: "¿Página web o solo Instagram?" },
  },
  {
    icon: RefreshCw,
    titulo: "Tienes página, pero te da pena mandarla",
    desc: "Se hizo hace cinco años, en el celular se ve corrida y tarda una eternidad en cargar. Más del 70% de las búsquedas en Colombia son desde el teléfono: ahí se pierde el cliente.",
  },
  {
    icon: KeyRound,
    titulo: "No la puedes tocar sin llamar a alguien",
    desc: "Cambiar un precio o subir una foto se volvió un favor que hay que pedir. Es la queja número uno que escucho, y por eso la palabra «autoadministrable» está en todos lados.",
  },
  {
    icon: LayoutTemplate,
    titulo: "Vas a pautar y no tienes a dónde mandar el clic",
    desc: "Pagar anuncios que caen en un perfil de Instagram es botar plata. Para eso está la landing page: una sola página, un solo objetivo, y la conversión medida.",
  },
  {
    icon: Building2,
    titulo: "El negocio creció y la página quedó chiquita",
    desc: "Ya no son dos servicios, son ocho. Ya no eres tú solo, hay equipo. Eso es una web corporativa, con su sección de servicios y su panel para que la mantengas al día.",
  },
  {
    icon: Search,
    titulo: "Quieres rehacerla, pero te da miedo perder lo posicionado",
    desc: "Es un miedo con fundamento y tiene solución conocida: se traen los textos, se redirigen las direcciones viejas y se conserva lo que ya estaba rankeando. No se empieza de cero a ciegas.",
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
    para: "Un producto, un servicio o una campaña con pauta detrás.",
    incluye: INCLUIDO_POR_TIPO.landing,
    paginas: PAGINAS_BASE.landing,
  },
  {
    icon: Building2,
    nombre: "Página web corporativa",
    tambien: "web corporativa, sitio institucional",
    para: "El negocio completo: quién eres, qué vendes y cómo te contratan.",
    incluye: INCLUIDO_POR_TIPO.corp,
    paginas: PAGINAS_BASE.corp,
  },
  {
    icon: RefreshCw,
    nombre: "Rediseño de la que ya tienes",
    tambien: "migración",
    para: "La página existe, pero está vieja, lenta o no se puede editar.",
    incluye: [
      "Revisión de lo que hay: qué se salva y qué se bota, dicho antes de empezar",
      "Traslado de textos, fotos, productos y artículos",
      "Redirecciones de las direcciones viejas para no perder el posicionamiento",
      "Comparación de velocidad antes y después, con los números a la vista",
    ],
    paginas: ["Las que tenga hoy tu sitio, revisadas una por una"],
  },
];

/** Lo que NO entra. Vale más que la lista de lo que sí: evita la pelea. */
const NO_INCLUYE = [
  {
    t: "El presupuesto de pauta",
    d: "Dejo la landing y la medición funcionando. Lo que le pagas a Meta o a Google Ads lo pones tú, con tu propia tarjeta.",
  },
  {
    t: "El posicionamiento mensual",
    d: `El SEO técnico de entrega sí va (títulos, datos estructurados, sitemap, velocidad). Posicionar es trabajo de todos los meses y se cobra aparte: auditoría desde ${pesos(390000)} y plan local desde ${pesos(650000)} al mes.`,
  },
  {
    t: "Carrito, inventario y pagos en línea",
    d: "Eso deja de ser una página web y pasa a ser una tienda virtual: otro precio y otro plazo. Desde $2.500.000, 3 semanas.",
  },
  {
    t: "Sesión de fotos y video",
    d: "Puedo usar imágenes de banco con licencia y arreglarte las que tomes con el celular. Contratar fotógrafo y producir la sesión no lo hago yo.",
  },
  {
    t: "Logo y marca desde cero",
    d: `Si ya tienes logo, lo aplicamos. Si no tienes nada, crear la identidad —logo, paleta, tipografías y manual básico— se cotiza aparte, desde ${pesos(PRICES.marca.nada)}.`,
  },
  {
    t: "Redes sociales y contenido de todos los meses",
    d: "No manejo cuentas ni programo publicaciones. Te digo de una vez que no es lo mío, en vez de venderlo mal.",
  },
];

/** Los cinco días, contados. La pregunta real es desde cuándo se cuentan. */
const PROCESO = [
  {
    n: "00",
    t: "Llamada de 20 minutos y precio por escrito",
    d: "Me cuentas qué vendes y a quién. Te digo si esto te sirve, cuánto cuesta y qué formato te conviene. Si no te sirve, te lo digo. El día cero no cuenta como día de trabajo.",
  },
  {
    n: "01",
    t: "Arranca el reloj cuando tengo con qué trabajar",
    d: "Los cinco días empiezan a contar el día que tengo el contenido y la marca en la mano. Si los textos los escribo yo, ese tiempo ya está contado adentro. Es la letra que casi nadie te dice y la que estira los proyectos al doble.",
  },
  {
    n: "02",
    t: "Estructura antes que colores",
    d: "Primero decidimos qué ve tu cliente, en qué orden y qué queremos que haga. El diseño bonito sobre una estructura mala no vende nada.",
  },
  {
    n: "03",
    t: "Diseño y programación, al mismo tiempo",
    d: "No hay entrega a otro equipo ni traducción de un archivo de diseño a código: lo diseño y lo programo yo, así que lo que apruebas es lo que se publica.",
  },
  {
    n: "04",
    t: "La revisas conmigo, en vivo",
    d: "La abres en tu teléfono y en tu computador y me dices qué cambiar. Los ajustes se hacen mientras hablamos, no en una lista para dentro de dos semanas.",
  },
  {
    n: "05",
    t: "Sale al aire y te enseño a manejarla",
    d: "Dominio apuntado, certificado activo, correo configurado, medición prendida y capacitación de entrega. De ahí en adelante quedan 30 días de ajustes sin costo.",
  },
];

const FAQS = [
  {
    q: "¿Cuánto me cuesta y qué entra exactamente por ese precio?",
    a: "Desde $850.000. Por ese piso entra el diseño propio —sin plantilla comprada—, la programación, que se vea bien en teléfono, tableta y computador, el formulario que te llega al correo y al WhatsApp, el certificado de seguridad, la capacitación de entrega y 30 días de ajustes sin costo. Es un piso, no una tarifa cerrada: el número final depende de cuántas páginas, si escribo yo los textos y qué funciones lleve, y te lo doy por escrito antes de que pagues nada.",
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
              Tu próximo cliente te está buscando en el celular ahora mismo. Si lo que encuentra
              es un perfil sin precios, sin horario y sin forma clara de escribirte, se va al de
              al lado y tú nunca te enteras de que existió. Una página web es la que contesta esas
              tres cosas mientras tú estás trabajando.
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
        <section className="mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <div className="rounded-[1.75rem] border border-primary/20 bg-gradient-to-br from-surface to-secondary/15 p-8 md:p-10">
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                Casi nadie publica precio y plazo juntos.
                <span className="text-metal"> Y ninguno dice quién escribe el código.</span>
              </h2>
              <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
                Revisa las páginas de las agencias colombianas de diseño web: unas ponen precio y
                no dicen cuánto tardan; otras dicen «de 4 a 8 semanas» y te mandan a un formulario
                de presupuesto. Averiguar cuánto te va a costar te toma tres llamadas.
              </p>
              <p className="mt-4 font-body text-lg leading-relaxed text-ink-soft">
                <strong className="text-ink">
                  Acá está el número, está el plazo y está el nombre.
                </strong>{" "}
                Me llamo Luis Jaller, vivo en Turbaco, Bolívar, y soy el que diseña y el que
                programa. No hay un vendedor que promete una cosa y un equipo rotando que entrega
                otra: hablas con la misma persona de la primera llamada a la entrega.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── Para quién es ──────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Esto te sirve si estás en alguna de estas
            </h2>
            <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Nadie se levanta queriendo «una página web». Se levanta con uno de estos seis
              problemas.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {PARA_QUIEN.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.titulo} delay={i * 70}>
                  <article className="flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-7">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-surface shadow-soft">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-xl text-ink">{p.titulo}</h3>
                    <p className="mt-2 flex-1 font-body leading-relaxed text-ink-soft">{p.desc}</p>
                    {p.link && (
                      <Link
                        href={p.link.href}
                        className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
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
              Desde $850.000: la landing en 5 días, la corporativa en 1 a 2 semanas
            </h2>
            <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Es un piso, no una tarifa cerrada. El número final depende de cuántas páginas lleve,
              de si los textos los escribes tú o los escribo yo y de qué funciones necesites —y te
              lo doy por escrito antes de que pagues nada. La tabla completa, con tienda online y
              SEO, está en{" "}
              <Link href="/precios" className="text-primary-dark underline underline-offset-4">
                precios
              </Link>
              .
            </p>
          </Reveal>


          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {FORMATOS.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.nombre} delay={i * 80}>
                  <article className="flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-7">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-surface shadow-soft">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-xl text-ink">{f.nombre}</h3>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                      también: {f.tambien}
                    </p>
                    <p className="mt-3 font-body leading-relaxed text-ink-soft">{f.para}</p>

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
                      Y además de lo de siempre
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
                      desde {pesos(850000)}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <p className="mt-6 rounded-2xl border border-line bg-background/40 p-7 font-body leading-relaxed text-ink-soft">
              <strong className="text-ink">¿Vas a vender en línea?</strong> Carrito, inventario y
              pagos ya no son una página web: son una{" "}
              <strong className="text-ink">tienda virtual</strong>, y va por otro lado: desde
              $2.500.000 y de 3 a 5 semanas. Está en{" "}
              <Link
                href="/servicios/tiendas-virtuales"
                className="text-primary-dark underline underline-offset-4"
              >
                tiendas virtuales
              </Link>
              , que es su propia página.
            </p>
          </Reveal>

          <Reveal>
            <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-ink-soft">
              Si todavía estás comparando presupuestos, el desglose largo —qué cobra cada tipo de
              proveedor en Colombia y las cinco cosas que disparan el precio— está en{" "}
              <Link
                href="/blog/cuanto-cuesta-una-pagina-web-en-colombia"
                className="text-primary-dark underline underline-offset-4"
              >
                cuánto cuesta una página web en Colombia
              </Link>{" "}
              y los plazos, en{" "}
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
        <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                Lo que entra siempre, sea cual sea el formato
              </h2>
              <ul className="mt-8 grid gap-3">
                {INCLUIDO_SIEMPRE.map((x) => (
                  <li key={x} className="flex items-start gap-3 font-body text-ink-soft">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <span>{x}</span>
                  </li>
                ))}
                <li className="flex items-start gap-3 font-body text-ink-soft">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span>
                    Dominio a tu nombre y correo con tu dirección —{" "}
                    <span className="text-ink">hola@tumarca.com</span>, no @gmail.com
                  </span>
                </li>
                <li className="flex items-start gap-3 font-body text-ink-soft">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span>
                    SEO técnico de entrega: título y descripción por página, datos estructurados,
                    sitemap y alta en Google Search Console
                  </span>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                Y lo que NO entra, dicho antes y no después
              </h2>
              <p className="mt-4 font-body leading-relaxed text-ink-soft">
                Esta lista vale más que la de arriba. Todo pleito que he visto entre un negocio y
                su proveedor web empezó por algo que nadie dijo al principio.
              </p>
              <ul className="mt-8 grid gap-5">
                {NO_INCLUYE.map((x) => (
                  <li key={x.t} className="flex items-start gap-3">
                    <X className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                    <span>
                      <strong className="block font-body font-semibold text-ink">{x.t}</strong>
                      <span className="mt-1 block font-body text-sm leading-relaxed text-ink-soft">
                        {x.d}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ── Cómo se hace ───────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Cómo se hace</h2>
            <p className="mt-4 font-body text-lg leading-relaxed text-ink-soft">
              Seis pasos, y el primero no cuesta nada.
            </p>
          </Reveal>
          <ol className="mt-10 grid gap-6">
            {PROCESO.map((p, i) => (
              <Reveal key={p.n} delay={i * 60}>
                <li className="flex gap-4">
                  <span className="font-mono text-sm text-accent">{p.n}</span>
                  <span>
                    <strong className="block font-body font-semibold text-ink">{p.t}</strong>
                    <span className="mt-1 block font-body text-sm leading-relaxed text-ink-soft">
                      {p.d}
                    </span>
                  </span>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal>
            <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-4 py-2 font-body text-sm text-ink-soft">
              <Clock className="h-4 w-4 text-accent" aria-hidden="true" />
              Cinco días de trabajo, contados desde que tengo el contenido y la marca
            </p>
          </Reveal>
        </section>

        {/* ── El trabajo que respalda esto ───────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              El trabajo que respalda esto
            </h2>
            <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Con la misma separación de siempre, porque mezclar las dos cosas es lo que hace que
              nadie crea un portafolio: lo que está en producción con dominio propio, y lo que
              construí por iniciativa propia.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <Reveal>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-7">
                <span className="w-fit rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                  En producción · Cartagena
                </span>
                <h3 className="mt-4 font-display text-2xl text-ink">Bloomrose</h3>
                <p className="mt-3 flex-1 font-body leading-relaxed text-ink-soft">
                  Tienda de bisutería y accesorios para el mercado colombiano. La diseñé y la
                  programé completa: catálogo con inventario, carrito, cuentas de cliente, pagos en
                  línea y cotización de envíos. La puedes abrir ahora mismo y revisarla sin
                  pedirme permiso.
                </p>
                <a
                  href="https://www.bloomroseaccesorios.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  bloomroseaccesorios.com <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            </Reveal>

            <Reveal delay={80}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-7">
                <span className="w-fit rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                  En producción · producto propio
                </span>
                <h3 className="mt-4 font-display text-2xl text-ink">HalcónOS y Hummik</h3>
                <p className="mt-3 flex-1 font-body leading-relaxed text-ink-soft">
                  Un CRM de ventas y una agenda de citas por WhatsApp, los dos míos y los dos en
                  línea. No son páginas web, son{" "}
                  <Link
                    href="/servicios/software-a-la-medida"
                    className="text-primary-dark underline underline-offset-4 hover:text-accent"
                  >
                    software a la medida
                  </Link>
                  , y están acá por una sola razón: si puedo construir y sostener eso, la página
                  de tu negocio no es el reto.
                </p>
                <a
                  href="https://halcon.jvagencia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  halcon.jvagencia.com <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            </Reveal>

            <Reveal delay={160}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-7">
                <span className="w-fit rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                  Proyectos de estudio
                </span>
                <h3 className="mt-4 font-display text-2xl text-ink">
                  Animal Expert, Elka Gómez y Marcopolo
                </h3>
                <p className="mt-3 flex-1 font-body leading-relaxed text-ink-soft">
                  Una veterinaria de Turbaco, un centro de fisioterapia y spa de Cartagena y un
                  salón de belleza de Barranquilla. Están diseñados y construidos completos, pero
                  los hice{" "}
                  <strong className="text-ink">por iniciativa propia y nadie me los encargó</strong>
                  : no son clientes que pagaron y no te los voy a presentar como si lo fueran.
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
              . Y si quieres saber con quién estás hablando antes de escribir,{" "}
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
            <div className="rounded-[1.75rem] border border-line bg-surface/70 p-8 md:p-10">
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                ¿Buscabas un diseñador de páginas web cerca de ti?
              </h2>
              <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
                Vivo en <strong className="text-ink">Turbaco, Bolívar</strong>, a 20 kilómetros de
                Cartagena de Indias. No tengo oficina en el Centro y no la voy a fingir. Trabajo
                con negocios de toda Colombia por WhatsApp y videollamada, y si estás en Cartagena
                o en Bolívar y el proyecto lo pide, nos vemos en persona.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
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
                    className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-background/50 px-4 py-2 font-body text-sm text-primary-dark transition-colors hover:border-primary hover:bg-primary/5"
                  >
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    {c.label}
                  </Link>
                ))}
              </div>
              <p className="mt-7 font-body leading-relaxed text-ink-soft">
                ¿Tu negocio es de un sector con reglas propias? Hay páginas escritas para{" "}
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
                y para{" "}
                <Link
                  href="/blog/que-debe-tener-la-pagina-web-de-un-restaurante"
                  className="font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  restaurantes
                </Link>
                . Y si tu problema no es la página sino contestar los mensajes, eso es un{" "}
                <Link
                  href="/servicios/chatbot-whatsapp"
                  className="font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  chatbot de WhatsApp
                </Link>
                ; si la página ya existe y lo que falta es que la encuentren, eso es{" "}
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
        <section className="mx-auto max-w-4xl px-5 py-12 md:px-8">
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
              cuánto quedaría lista. Si lo que necesitas no es una página web, te lo digo y no te
              cobro la llamada.
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
