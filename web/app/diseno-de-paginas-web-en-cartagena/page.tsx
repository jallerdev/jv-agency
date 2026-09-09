import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  Clock,
  ExternalLink,
  Hotel,
  MapPin,
  Ship,
  Stethoscope,
  Store,
  UtensilsCrossed,
} from "lucide-react";

import { Header } from "@/components/Header";
import { MOSTRAR_PENDIENTES, Pendiente } from "@/components/Pendiente";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/site";
import { WHATSAPP_LINK } from "@/lib/business";
import { A_PRICES, money } from "@/lib/quote";

/**
 * Página de ciudad para la intención transaccional «diseño de páginas web en
 * Cartagena».
 *
 * Por qué existe: Search Console, tres meses, dice que el sitio no aparece por
 * una sola consulta con ciudad. No porque no se busque, sino porque no había
 * una sola página que dijera «Cartagena». Esta es la primera de las tres del
 * mapa de `SEO-INTENCIONES-DE-COMPRA.md`, y va primero porque es la única
 * donde hay material propio de verdad: Bloomrose en producción, dos trabajos
 * reales de negocios cartageneros, dos proyectos de estudio de la zona y una
 * persona que vive en Turbaco.
 *
 * LO QUE NO PUEDE PASAR: que este archivo se copie cambiando «Cartagena» por
 * otra ciudad. Diez páginas iguales con el nombre cambiado son doorway pages y
 * Google las castiga desde hace más de diez años. Todo lo que hay acá abajo
 * —el censo de la Cámara de Comercio, los barrios, los sectores, los
 * proyectos— es de Cartagena y de Bolívar y no sirve en otra parte.
 *
 * SIN LocalBusiness EN EL JSON-LD, a propósito: no hay local en Cartagena.
 * Declarar uno es exactamente lo que Google penaliza. El negocio es de área de
 * servicio y eso se dice con `areaServed`, no fingiendo una dirección.
 *
 * Una sola página cubre las cuatro variantes de la misma intención: «diseño de
 * páginas web en Cartagena», «agencia de diseño web Cartagena», «páginas web
 * en Cartagena» y «diseño web Cartagena». En el h1 y el title va «Cartagena»
 * porque es lo que la gente escribe; «Cartagena de Indias», «Bolívar» y
 * «Colombia» viven en el cuerpo y en el schema para desambiguar de Cartagena,
 * Región de Murcia, que pelea la misma cadena.
 */
export const metadata: Metadata = {
  title: "Diseño de páginas web en Cartagena de Indias | JV Agencia",
  description:
    "Diseño y programo páginas web para negocios de Cartagena de Indias. Desde $850.000 y en 5 días. Vivo en Turbaco, a 20 kilómetros: nos vemos si hace falta.",
  alternates: { canonical: "/diseno-de-paginas-web-en-cartagena" },
  openGraph: {
    title: "Diseño de páginas web en Cartagena de Indias | JV Agencia",
    description:
      "Páginas web para negocios de Cartagena y Bolívar, desde $850.000 y en 5 días. Las diseño y las programo yo, desde Turbaco.",
    url: `${SITE_URL}/diseno-de-paginas-web-en-cartagena`,
    type: "website",
  },
};

/**
 * Cifras de la ciudad. Cada una con su fuente a la vista: es lo único que
 * separa un dato de un adorno, y acá se muestran en pantalla, no en un
 * comentario del código.
 */
const CIFRAS = [
  {
    dato: "43.044",
    de: "negocios censados en Cartagena, y 4.813 más en Turbaco",
    fuente: "Censo empresarial de la Cámara de Comercio de Cartagena, abril de 2026",
  },
  {
    dato: "34.531",
    de: "empresas activas en la ciudad, contra 32.702 el año anterior. Cerca de nueve de cada diez son microempresas",
    fuente: "Cartagena Cómo Vamos, con corte del Registro Mercantil al 31 de diciembre de 2025",
  },
  {
    dato: "13%",
    de: "del tejido empresarial vive de alojamiento y comida. El comercio, que es el más grande, reúne 10.878 empresas: el 32%",
    fuente: "Cartagena Cómo Vamos, misma medición",
  },
];

/**
 * Para quién es. Tipos de negocio DE CARTAGENA, con el problema que tiene cada
 * uno acá y no en abstracto. Si alguno de estos párrafos sirviera igual para
 * Bogotá, está mal escrito y hay que botarlo.
 */
const PARA_QUIEN = [
  {
    icon: Hotel,
    titulo: "Hoteles pequeños y hostales del Centro y Getsemaní",
    desc: "Vives de Booking y de Airbnb, y les pagas comisión por cada noche. Una página propia no te saca de esas plataformas: te deja una puerta más, la que te busca por tu nombre y no cobra comisión.",
  },
  {
    icon: UtensilsCrossed,
    titulo: "Restaurantes y bares",
    desc: "El que va caminando por la Calle del Arsenal busca tres cosas en el teléfono: carta, horario y cómo llegar. Si tu menú es la foto de una foto, se va al de al lado.",
    link: { href: "/blog/que-debe-tener-la-pagina-web-de-un-restaurante", label: "Qué debe tener la web de un restaurante" },
  },
  {
    icon: Ship,
    titulo: "Agencias de turismo y operadores de plan",
    desc: "Islas del Rosario, Playa Blanca, city tour, chiva. Te escriben una semana antes desde Bogotá o desde Buenos Aires y comparan tres números de WhatsApp a la vez. Gana el que contesta con precio, foto y qué pasa si llueve.",
    link: { href: "/servicios/chatbot-whatsapp", label: "Chatbot de WhatsApp que contesta solo" },
  },
  {
    icon: Building2,
    titulo: "Inmobiliarias y arriendo por días",
    desc: "Bocagrande, Castillogrande, Manga, Pie de la Popa. El que va a girar un depósito por un apartamento que no ha visto necesita comprobar que existes en algo más que un perfil con quince fotos.",
    link: { href: "/blog/pagina-web-o-solo-instagram", label: "¿Página web o solo Instagram?" },
  },
  {
    icon: Stethoscope,
    titulo: "Consultorios, odontología y estética",
    desc: "Acá el paciente averigua el nombre del profesional antes de pedir la cita. Si lo que encuentra es un perfil sin horarios, sin dirección y sin una línea que diga quién eres, duda y sigue buscando.",
  },
  {
    icon: Store,
    titulo: "Negocios de Turbaco, Arjona y la zona",
    desc: "Los 4.813 negocios que el censo contó en Turbaco no dejan de competir por estar fuera del distrito. Ferreterías, veterinarias, colegios, talleres, salones. A esos les queda más cerca que a nadie.",
  },
];

/**
 * Precios autorizados. Son los únicos números de precio que se publican en
 * todo el sitio; el del chatbot sale de `lib/quote.ts` para que no haya dos
 * verdades. El formato de moneda también sale de ahí.
 */
const PRECIOS = [
  {
    q: "Página web",
    desde: money(850000),
    plazo: "5 días",
    d: "Una página que carga rápido, se ve seria en el teléfono y dice en diez segundos qué haces y cómo te contactan. Con tu dominio y tu correo propio.",
    href: "/servicios/diseno-de-paginas-web",
  },
  {
    q: "Tienda online",
    desde: money(2500000),
    plazo: "3 semanas",
    d: "La tienda virtual completa: catálogo con inventario, carrito, cuentas de cliente, pagos en línea y cotización de envíos. Lo mismo que hice en Bloomrose.",
    href: "/servicios/tiendas-virtuales",
  },
  {
    q: "Chatbot de WhatsApp",
    desde: money(A_PRICES.base.faq),
    plazo: "de 2 a 5 semanas",
    d: "Tu número contesta solo las preguntas de siempre y te pasa la conversación cuando vale la pena.",
    href: "/servicios/chatbot-whatsapp",
  },
  {
    q: "Auditoría SEO",
    desde: money(390000),
    plazo: "5 días",
    d: "Por qué no apareces cuando te buscan, qué se arregla primero y qué se puede medir. Sirve igual si la página te la hizo otro.",
    href: "/servicios/posicionamiento-seo",
  },
  {
    q: "SEO local, mensual",
    desde: `${money(650000)}/mes`,
    plazo: "trabajo continuo",
    d: "El trabajo de aparecer en búsquedas con ciudad: «funeraria en Cartagena», «avisos publicitarios en Cartagena», lo que sea que vendas.",
    href: "/servicios/posicionamiento-seo",
  },
  {
    q: "Software a la medida",
    desde: "Según el alcance",
    plazo: "se define al cotizar",
    d: "Cuando el problema no es una página sino un proceso: reservas, inventario, historia clínica, lo que te come el día.",
    href: "/servicios/software-a-la-medida",
  },
];

const COMO_TRABAJO = [
  {
    n: "01",
    t: "Hablamos por WhatsApp",
    d: "Me cuentas qué vendes y a quién. En veinte minutos sé si esto te sirve, y si no te sirve te lo digo.",
  },
  {
    n: "02",
    t: "Te mando la propuesta con el precio adentro",
    d: "Escrita, con lo que incluye y lo que no. No hay «desde» que después crece cuando ya no te puedes devolver.",
  },
  {
    n: "03",
    t: "La construyo yo",
    d: "No hay ejecutivo de cuentas ni un equipo al que le pasan tu proyecto. Hablas con la misma persona que escribe el código.",
  },
  {
    n: "04",
    t: "Te la entrego y te enseño a moverla",
    d: "Cambiar la carta, subir una foto, agregar un servicio. Lo que el dueño sí quiere poder hacer sin llamar a nadie.",
  },
];

const FAQS = [
  {
    q: "¿Tienes oficina en Cartagena?",
    a: "No, y no la voy a inventar. Vivo en Turbaco, a 20 kilómetros. Casi todo se hace por WhatsApp y llamada; si necesitas que nos veamos la cara, nos vemos, porque es un viaje corto y no un vuelo.",
  },
  {
    q: "Mi negocio está en Turbaco, Arjona o Santa Rosa, no en Cartagena. ¿Igual me sirve?",
    a: "Igual, y es donde vivo. El censo de la Cámara de Comercio cuenta a Cartagena y a Turbaco en la misma medición, y a Google le da lo mismo el límite del distrito: tu cliente busca «lo que vendes» más el nombre del pueblo, y ahí es donde hay que aparecer.",
  },
  {
    q: "Vivo de Booking y de Airbnb. ¿Para qué quiero página propia?",
    a: "Para tener una puerta que no cobre comisión. La plataforma te trae al que no te conocía y te cobra por cada noche; tu página es para el que te recomendaron, para el que se quiere volver a hospedar y para el que te buscó por el nombre. No compiten, hacen cosas distintas.",
  },
  {
    q: "¿Me pones de primero en Google cuando busquen «páginas web en Cartagena»?",
    a: "No te lo prometo, y desconfía del que te lo prometa. Lo que sí te digo es cuándo se empieza a ver: los primeros movimientos, entre el mes 3 y el 6. Y antes de gastar en eso, hay algo gratis que pesa más: tener la ficha de Google Business con reseñas de verdad.",
  },
  {
    q: "Ya me hicieron una página y no aparece por ningún lado. ¿La rehacemos?",
    a: "Primero la reviso. Muchas veces no es la página: es que en ninguna parte de ella dice «Cartagena», nunca se le avisó a Google que existe y no hay una sola reseña. La auditoría cuesta desde " + money(390000) + " y en 5 días te digo qué tiene. Si lo que conviene es rehacerla, te lo digo, y si no, también.",
  },
  {
    q: "La carta me cambia según lo que llegue de Bazurto. ¿Toca llamarte cada vez?",
    a: "No. Te dejo la carta editable para que la cambies tú desde el teléfono y te enseño cómo el día de la entrega. Es de las poquísimas cosas que el dueño sí quiere tocar, y cobrarte por cada cambio de precio sería un mal negocio para los dos.",
  },
  {
    q: "Solo contesto por WhatsApp. ¿La página me sirve de algo?",
    a: "Sí, y no pelea con el WhatsApp: lo alimenta. La página trabaja de noche y los domingos, contesta las tres preguntas de siempre y te manda al chat gente que ya sabe qué vendes y cuánto vale. Si te escriben tanto que no alcanzas, el paso siguiente es un chatbot.",
  },
];

export default function DisenoPaginasWebCartagenaPage() {
  // Service, no LocalBusiness. Ver la nota de arriba: no hay local en
  // Cartagena y declarar uno es lo que Google castiga. El alcance se declara
  // con areaServed, que es lo correcto para un negocio de área de servicio.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/diseno-de-paginas-web-en-cartagena#servicio`,
    name: "Diseño de páginas web en Cartagena de Indias",
    alternateName: [
      "Agencia de diseño web en Cartagena",
      "Páginas web en Cartagena",
      "Diseño web Cartagena",
      "Creación de páginas web en Cartagena de Indias",
    ],
    serviceType: "Diseño y desarrollo de páginas web",
    description:
      "Diseño y programación de páginas web, tiendas online y chatbots de WhatsApp para negocios de Cartagena de Indias, Turbaco y el departamento de Bolívar. Precio publicado y entrega en 5 días.",
    provider: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/diseno-de-paginas-web-en-cartagena`,
    areaServed: [
      {
        "@type": "City",
        name: "Cartagena de Indias",
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: "Bolívar",
          containedInPlace: { "@type": "Country", name: "Colombia" },
        },
      },
      {
        "@type": "City",
        name: "Turbaco",
        containedInPlace: { "@type": "AdministrativeArea", name: "Bolívar" },
      },
      { "@type": "AdministrativeArea", name: "Bolívar, Colombia" },
    ],
    offers: [
      {
        "@type": "Offer",
        name: "Página web",
        description: "Página web a la medida, con dominio y correo propio. Entrega en 5 días.",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "COP",
          minPrice: 850000,
        },
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Tienda online",
        description: "Catálogo, carrito, pagos en línea y cotización de envíos. Entrega en 3 semanas.",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "COP",
          minPrice: 2500000,
        },
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Auditoría SEO",
        description: "Diagnóstico de por qué una página no aparece en las búsquedas locales de Cartagena.",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "COP",
          minPrice: 390000,
        },
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "SEO local mensual",
        description: "Trabajo continuo de posicionamiento en búsquedas con ciudad.",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "COP",
          minPrice: 650000,
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
            <Badge>
              <MapPin className="h-3.5 w-3.5" />
              Cartagena de Indias · Bolívar
            </Badge>
            <h1 className="mt-6 font-display text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
              Diseño de páginas web en Cartagena de Indias,{" "}
              <span className="block text-metal">y vivo a 20 kilómetros de allí</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Turbaco queda a 20 kilómetros de Cartagena, subiendo. Ahí vivo, ahí trabajo y de ahí
              salgo cuando toca vernos. No vengo de otra ciudad a entender el mercado de Cartagena:
              es donde compro el pan.
            </p>
            <p className="mx-auto mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Diseño y programo yo mismo, sin equipo intermedio. Una página web desde{" "}
              <strong className="text-ink">{money(850000)}</strong>, entregada en{" "}
              <strong className="text-ink">5 días</strong>.
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
                <a href="#precios">Ver los precios</a>
              </Button>
            </div>
          </Reveal>
        </section>

        {/* ── La ciudad, con cifras que se pueden comprobar ───────────── */}
        <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Cómo es de verdad el comercio de esta ciudad
            </h2>
            <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-ink-soft">
              No son cifras de relleno: son las mediciones públicas de la Cámara de Comercio y del
              Registro Mercantil, y explican a quién le hablo.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {CIFRAS.map((c, i) => (
              <Reveal key={c.dato} delay={i * 80}>
                <article className="flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-7">
                  <p className="font-display text-4xl text-primary-dark">{c.dato}</p>
                  <p className="mt-3 flex-1 font-body leading-relaxed text-ink-soft">{c.de}</p>
                  <p className="mt-5 border-t border-line pt-4 font-mono text-[11px] leading-relaxed text-ink-soft/80">
                    {c.fuente}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-6 rounded-2xl border border-line bg-background/40 p-7">
              <p className="font-body text-lg leading-relaxed text-ink-soft">
                Ese 13% son los hoteles chiquitos de San Diego, los hostales de Getsemaní y los
                restaurantes de barrio. Casi ninguno tiene página propia: viven de un perfil de
                Instagram y de un DM que a las nueve de la noche nadie alcanza a contestar. Y de
                cada diez empresas de Cartagena, casi nueve son microempresas —es decir, casi todas
                son negocios donde el dueño también atiende—.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── Para quién es ──────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Los negocios de Cartagena a los que esto les sirve
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {PARA_QUIEN.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.titulo} delay={i * 70}>
                  <article className="flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-7">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-surface shadow-soft">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-display text-xl text-ink">{p.titulo}</h3>
                    <p className="mt-2 flex-1 font-body leading-relaxed text-ink-soft">{p.desc}</p>
                    {p.link && (
                      <Link
                        href={p.link.href}
                        className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
                      >
                        {p.link.label} <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ── Precios ────────────────────────────────────────────────── */}
        <section id="precios" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-12 md:px-8">
          <Reveal>
            <Badge>Precios</Badge>
            <h2 className="mt-6 font-display text-3xl text-ink sm:text-4xl">
              Lo que cuesta, sin que tengas que escribir para preguntar
            </h2>
            <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-ink-soft">
              Publico mis precios porque me parece raro tener que mandar un correo para saber
              cuánto vale algo. Son precios de partida reales: de ahí para arriba según lo que
              necesites, y te lo digo antes de empezar, no en la factura.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PRECIOS.map((p, i) => (
              <Reveal key={p.q} delay={i * 70}>
                <article className="flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-7">
                  <h3 className="font-display text-xl text-ink">{p.q}</h3>
                  <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-ink-soft">
                    {p.d}
                  </p>
                  {p.href && (
                    <Link
                      href={p.href}
                      className="mt-4 inline-flex items-center gap-2 font-body text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
                    >
                      Ver el detalle <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                  <div className="mt-5 border-t border-line pt-4">
                    <p className="font-mono text-lg text-primary-dark">
                      {p.desde === "Según el alcance" ? p.desde : `desde ${p.desde}`}
                    </p>
                    <p className="mt-1 inline-flex items-center gap-2 font-body text-sm text-ink-soft">
                      <Clock className="h-4 w-4 text-accent" />
                      {p.plazo}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-6 grid gap-4 rounded-2xl border border-line bg-background/40 p-7 font-body leading-relaxed text-ink-soft">
              <p>
                <strong className="text-ink">La renovación anual cuesta {money(290000)}</strong> y
                cubre el dominio, el alojamiento y que la página siga actualizada y en pie. Lo digo
                acá arriba y no en una nota al pie, porque es el costo que a todo el mundo se le
                aparece de sorpresa al año siguiente.
              </p>
              <p>
                Sobre el posicionamiento: los primeros movimientos se ven{" "}
                <strong className="text-ink">entre el mes 3 y el mes 6</strong>. Nadie te puede
                prometer el primer puesto en Google, ni yo tampoco, y el que te lo prometa te está
                vendiendo otra cosa.
              </p>
              <p>
                Si quieres el desglose completo, lo escribí largo:{" "}
                <Link
                  href="/blog/cuanto-cuesta-una-pagina-web-en-colombia"
                  className="font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  cuánto cuesta una página web en Colombia
                </Link>{" "}
                y{" "}
                <Link
                  href="/blog/cuanto-se-demora-hacer-una-pagina-web"
                  className="font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  cuánto se demora hacerla
                </Link>
                . Y si lo que estás mirando es el trabajo mensual de posicionamiento,{" "}
                <Link
                  href="/blog/cuanto-cuesta-el-seo-en-colombia"
                  className="font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  cuánto cuesta el SEO en Colombia
                </Link>{" "}
                explica por qué existe un piso de precio.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── El trabajo propio de esta zona ──────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Lo que he hecho de este lado
            </h2>
            <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-ink-soft">
              Acá no hay logos de relleno. Digo cuál está en línea y se puede abrir, y cuál lo
              construí por iniciativa propia y todavía no tiene dominio conectado. Es la misma
              diferencia que le exijo a cualquier portafolio antes de creerle.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Reveal>
              <article className="flex h-full flex-col rounded-2xl border border-primary/25 bg-gradient-to-br from-surface to-secondary/15 p-7">
                <span className="w-fit rounded-full bg-primary/12 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-primary-dark">
                  En línea · Cartagena
                </span>
                <h3 className="mt-4 font-display text-2xl text-ink">Bloomrose</h3>
                <p className="mt-3 flex-1 font-body leading-relaxed text-ink-soft">
                  Tienda de bisutería y accesorios de Cartagena. La diseñé y la programé completa:
                  catálogo con control de inventario, carrito, cuentas de cliente, pagos en línea y
                  cotización de envíos. Es la que puedes abrir ahora mismo y comprobar sin
                  pedirme permiso.
                </p>
                <a
                  href="https://www.bloomroseaccesorios.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  bloomroseaccesorios.com <ExternalLink className="h-4 w-4" />
                </a>
                <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">
                  Cómo se arma una así, qué trae por dentro y cuánto cuesta está en{" "}
                  <Link
                    href="/servicios/tiendas-virtuales"
                    className="font-semibold text-primary-dark underline-offset-4 hover:underline"
                  >
                    creación de tiendas virtuales
                  </Link>
                  .
                </p>
              </article>
            </Reveal>

            <Reveal delay={80}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-7">
                <span className="w-fit rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                  Proyecto de estudio · Cartagena
                </span>
                <h3 className="mt-4 font-display text-2xl text-ink">Fta. Elka Gómez</h3>
                <p className="mt-3 flex-1 font-body leading-relaxed text-ink-soft">
                  Más de 30 años tratando el dolor en Cartagena: rehabilitación física, masaje y
                  experiencias de spa. Diseñé y construí la página completa por iniciativa propia,
                  no me lo encargaron, y todavía no tiene dominio conectado. Por eso no hay enlace
                  que abrir, y prefiero decírtelo a colgar una captura y llamarlo cliente.
                </p>
              </article>
            </Reveal>

            <Reveal delay={160}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-7">
                <span className="w-fit rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                  Proyecto de estudio · Turbaco
                </span>
                <h3 className="mt-4 font-display text-2xl text-ink">Animal Expert</h3>
                <p className="mt-3 flex-1 font-body leading-relaxed text-ink-soft">
                  Centro médico veterinario de Turbaco: consulta especializada, cirugía, rayos X,
                  fisioterapia y vacunación, con agenda en línea. Mismo caso que el anterior:
                  construido por iniciativa propia, en el pueblo donde vivo.
                </p>
              </article>
            </Reveal>

            {/* Nombra a Pixels Maker y a la Funeraria San Francisco de Asis con el

                detalle del trabajo. Sin su autorizacion escrita eso no puede estar en

                una pagina publica, asi que el bloque entero solo existe en desarrollo. */}

            {MOSTRAR_PENDIENTES && (

              <Reveal delay={240}>
                <article className="flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-7">
                  <span className="w-fit rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                    Trabajo con negocios cartageneros
                  </span>
                  <h3 className="mt-4 font-display text-2xl text-ink">
                    Pixels Maker y la Funeraria San Francisco de Asís
                  </h3>
                  <p className="mt-3 flex-1 font-body leading-relaxed text-ink-soft">
                    Dos negocios de Cartagena de Indias. Con Pixels &amp; Pixels el problema era de
                    búsqueda local pura: hacen letreros y avisos publicitarios, y cuando alguien
                    escribe «avisos publicitarios en Cartagena» no aparecen. A la funeraria le
                    entregué la página y el trabajo mensual para aparecer en «funeraria en Cartagena».
                    Es exactamente el mismo trabajo que hace falta acá: decirle a Google de qué es tu
                    negocio y en qué ciudad queda.
                  </p>
                  <Pendiente>[PENDIENTE: autorización de Pixels Maker y de la Funeraria San Francisco de Asís
                    para nombrarlos y mostrar el detalle del trabajo en una página pública. Hasta que
                    Luis la confirme, este bloque no se publica.]</Pendiente>
                </article>
              </Reveal>

            )}
          </div>

          <Reveal>
            <p className="mt-8 font-body leading-relaxed text-ink-soft">
              Lo demás está en{" "}
              <Link
                href="/#proyectos"
                className="font-semibold text-primary-dark underline-offset-4 hover:underline"
              >
                el portafolio completo
              </Link>
              , con la misma separación: lo que está en producción con dominio propio y lo que no.
            </p>
          </Reveal>
        </section>

        {/* ── Cómo se trabaja desde Bolívar ──────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                Qué significa que esté en Turbaco y no en Bocagrande
              </h2>
              <div className="mt-6 grid gap-4 font-body text-lg leading-relaxed text-ink-soft">
                <p>
                  No tengo local en Cartagena y no lo voy a fingir. El sitio lo dice desde el pie de
                  página: Turbaco, Bolívar, Colombia.
                </p>
                <p>
                  En la práctica cambia poco y cambia bien. Casi todo se hace por WhatsApp, que es
                  como ya trabajas: me mandas las fotos, los precios y lo que quieres decir, y te
                  voy mostrando avances. Pero si necesitas que nos sentemos con el papel encima,{" "}
                  <strong className="text-ink">son 20 kilómetros</strong>, no un tiquete de avión.
                </p>
                <p>
                  Y hay algo que ninguna agencia de otra ciudad te puede dar: cuando escribas para
                  reclamar, va a contestar el que hizo el trabajo.
                </p>
              </div>
              <ul className="mt-8 grid gap-3">
                {[
                  "Hablas siempre conmigo, de la primera llamada a la entrega",
                  "Página web entregada en 5 días, con el precio dicho antes de empezar",
                  "Nos vemos en persona en Cartagena o en Turbaco si el proyecto lo pide",
                  "Cubro Cartagena de Indias, Turbaco, Arjona, Turbaná y el resto de Bolívar",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-3 font-body text-ink-soft">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="font-display text-3xl text-ink sm:text-4xl">Cómo se hace</h2>
              <ol className="mt-8 grid gap-6">
                {COMO_TRABAJO.map((p) => (
                  <li key={p.n} className="flex gap-4">
                    <span className="font-mono text-sm text-accent">{p.n}</span>
                    <span>
                      <strong className="block font-body font-semibold text-ink">{p.t}</strong>
                      <span className="mt-1 block font-body text-sm leading-relaxed text-ink-soft">
                        {p.d}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-4 py-2 font-body text-sm text-ink-soft">
                <Clock className="h-4 w-4 text-accent" />
                Una página web, en 5 días
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Preguntas de acá ───────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Lo que me preguntan los negocios de Cartagena
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <article className="rounded-2xl border border-line bg-surface/70 p-7">
                  <h3 className="font-display text-xl text-ink">{f.q}</h3>
                  <p className="mt-3 font-body leading-relaxed text-ink-soft">{f.a}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Cierre ─────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 py-16 text-center md:px-8 md:py-24">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Cuéntame qué vendes y en qué parte de Cartagena
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-body text-lg leading-relaxed text-ink-soft">
              En veinte minutos sabemos si te sirve, cuánto costaría y en cuánto la tendrías. Si lo
              que necesitas no es una página web, te lo digo y no te cobro por decírtelo.
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href="/#contacto">
                  Agenda una llamada <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  Escríbeme por WhatsApp
                </a>
              </Button>
            </div>
            <p className="mx-auto mt-8 max-w-2xl font-body text-sm leading-relaxed text-ink-soft">
              También te puede servir:{" "}
              <Link href="/servicios/chatbot-whatsapp" className="text-primary-dark underline-offset-4 hover:underline">
                el chatbot de WhatsApp
              </Link>
              ,{" "}
              <Link href="/blog/mi-negocio-necesita-pagina-web" className="text-primary-dark underline-offset-4 hover:underline">
                si tu negocio necesita página web
              </Link>{" "}
              o{" "}
              <Link href="/" className="text-primary-dark underline-offset-4 hover:underline">
                todo lo que hago
              </Link>
              .
            </p>
            <p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-relaxed text-ink-soft">
              También trabajo{" "}
              <Link
                href="/diseno-de-paginas-web-en-barranquilla"
                className="text-primary-dark underline-offset-4 hover:underline"
              >
                diseño de páginas web en Barranquilla
              </Link>{" "}
              y{" "}
              <Link
                href="/diseno-de-paginas-web-en-bogota"
                className="text-primary-dark underline-offset-4 hover:underline"
              >
                en Bogotá
              </Link>
              . Y si tu negocio es{" "}
              <Link
                href="/sectores/salones-y-spas"
                className="text-primary-dark underline-offset-4 hover:underline"
              >
                un salón o un spa
              </Link>{" "}
              o{" "}
              <Link
                href="/sectores/clinicas-y-consultorios"
                className="text-primary-dark underline-offset-4 hover:underline"
              >
                una clínica o un consultorio
              </Link>
              , ahí está lo que cambia en cada caso.
            </p>
          </Reveal>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
