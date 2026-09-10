import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
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
import { BotonCuentame } from "@/components/Cuentame";
import { RailPlazo } from "@/components/visuales/RailPlazo";
import { ListaAcopio } from "@/components/visuales/ListaAcopio";
import { PanelAutonomia } from "@/components/visuales/PanelAutonomia";
import { RailDistancia } from "@/components/visuales/RailDistancia";
import { SITE_URL } from "@/lib/site";
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
 *
 * ESQUELETO COMPARTIDO con Barranquilla y Bogotá. Las tres van en el mismo
 * orden y con el mismo ritmo de bandas —hero canvas · contexto y para-quién en
 * banda · PRECIOS en canvas para que destaquen · cómo se hace y desde dónde en
 * banda · prueba de trabajo en canvas · preguntas en banda · cierre en
 * canvas—. Lo que cambia entre hermanas es el material, no la estructura.
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
    de: "negocios censados en Cartagena, más 4.813 en Turbaco",
    fuente: "Censo empresarial de la Cámara de Comercio de Cartagena, abril de 2026",
  },
  {
    dato: "34.531",
    de: "empresas activas, contra 32.702 el año anterior. Casi nueve de cada diez son microempresas",
    fuente: "Cartagena Cómo Vamos, con corte del Registro Mercantil al 31 de diciembre de 2025",
  },
  {
    dato: "13%",
    de: "del tejido vive de alojamiento y comida. El comercio, el más grande, reúne 10.878 empresas: el 32%",
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
    desc: "Vives de Booking y de Airbnb, y les pagas comisión por cada noche. Una página propia no te saca de ahí: te deja una puerta más, la que no cobra comisión.",
  },
  {
    icon: UtensilsCrossed,
    titulo: "Restaurantes y bares",
    desc: "El que va por la Calle del Arsenal busca tres cosas en el teléfono: carta, horario y cómo llegar. Si tu menú es la foto de una foto, se va al de al lado.",
    link: { href: "/blog/que-debe-tener-la-pagina-web-de-un-restaurante", label: "Qué debe tener la web de un restaurante" },
  },
  {
    icon: Ship,
    titulo: "Agencias de turismo y operadores de plan",
    desc: "Islas del Rosario, Playa Blanca, chiva. Te escriben una semana antes y comparan tres números de WhatsApp a la vez. Gana el que contesta con precio, foto y qué pasa si llueve.",
    link: { href: "/servicios/chatbot-whatsapp", label: "Chatbot de WhatsApp que contesta solo" },
  },
  {
    icon: Building2,
    titulo: "Inmobiliarias y arriendo por días",
    desc: "Bocagrande, Castillogrande, Manga, Pie de la Popa. El que gira un depósito por un apartamento que no ha visto necesita comprobar que existes en algo más que un perfil con quince fotos.",
    link: { href: "/blog/pagina-web-o-solo-instagram", label: "¿Página web o solo Instagram?" },
  },
  {
    icon: Stethoscope,
    titulo: "Consultorios, odontología y estética",
    desc: "El paciente averigua el nombre del profesional antes de pedir la cita. Si encuentra un perfil sin horarios y sin dirección, duda y sigue buscando.",
  },
  {
    icon: Store,
    titulo: "Negocios de Turbaco, Arjona y la zona",
    desc: "Los 4.813 negocios que el censo contó en Turbaco compiten igual: ferreterías, veterinarias, colegios, talleres, salones. A esos les queda más cerca que a nadie.",
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
    d: "Carga rápido, se ve seria en el teléfono y dice en diez segundos qué haces. Con tu dominio y tu correo.",
    href: "/servicios/diseno-de-paginas-web",
  },
  {
    q: "Tienda online",
    desde: money(2500000),
    plazo: "3 semanas",
    d: "Catálogo con inventario, carrito, cuentas de cliente, pagos en línea y cotización de envíos. Como Bloomrose.",
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
    d: "Por qué no apareces y qué se arregla primero. Sirve igual si la página te la hizo otro.",
    href: "/servicios/posicionamiento-seo",
  },
  {
    q: "SEO local, mensual",
    desde: `${money(650000)}/mes`,
    plazo: "trabajo continuo",
    d: "Aparecer en búsquedas con ciudad: «funeraria en Cartagena», «avisos publicitarios en Cartagena».",
    href: "/servicios/posicionamiento-seo",
  },
  {
    q: "Software a la medida",
    desde: "Según el alcance",
    plazo: "se define al cotizar",
    d: "Cuando el problema no es una página sino un proceso: reservas, inventario, historia clínica.",
    href: "/servicios/software-a-la-medida",
  },
];

/** Los cinco días. El tramo previo lo dibuja el rail, no lo cuenta el texto. */
const DIAS = [
  { etiqueta: "Día 1", texto: "Estructura: qué ve tu cliente y en qué orden." },
  { etiqueta: "Día 2 y 3", texto: "Diseño y programación, al mismo tiempo." },
  { etiqueta: "Día 4", texto: "La revisas conmigo, en vivo, y ajustamos." },
  { etiqueta: "Día 5", texto: "Sale al aire y te enseño a manejarla." },
];

/** Enlaces del cierre. Fila de destinos tocables, no prosa con subrayados. */
const OTRAS_PAGINAS = [
  { href: "/diseno-de-paginas-web-en-barranquilla", label: "Diseño web en Barranquilla" },
  { href: "/diseno-de-paginas-web-en-bogota", label: "Diseño web en Bogotá" },
  { href: "/sectores/salones-y-spas", label: "Salones y spas" },
  { href: "/sectores/clinicas-y-consultorios", label: "Clínicas y consultorios" },
  { href: "/servicios/chatbot-whatsapp", label: "Chatbot de WhatsApp" },
];

const FAQS = [
  {
    q: "¿Tienes oficina en Cartagena?",
    a: "No, y no la voy a inventar. Vivo en Turbaco, a 20 kilómetros. Casi todo se hace por WhatsApp y llamada; si necesitas que nos veamos la cara, nos vemos: es un viaje corto, no un vuelo.",
  },
  {
    q: "Mi negocio está en Turbaco, Arjona o Santa Rosa, no en Cartagena. ¿Igual me sirve?",
    a: "Igual, y es donde vivo. A Google le da lo mismo el límite del distrito: tu cliente busca «lo que vendes» más el nombre del pueblo, y ahí es donde hay que aparecer.",
  },
  {
    q: "Vivo de Booking y de Airbnb. ¿Para qué quiero página propia?",
    a: "Para tener una puerta que no cobre comisión. La plataforma te trae al que no te conocía; tu página es para el que te recomendaron y para el que te buscó por el nombre. No compiten.",
  },
  {
    q: "¿Me pones de primero en Google cuando busquen «páginas web en Cartagena»?",
    a: "No te lo prometo, y desconfía del que te lo prometa. Lo que sí te digo es cuándo se empieza a ver: los primeros movimientos, entre el mes 3 y el 6. Y antes de gastar en eso hay algo gratis que pesa más: la ficha de Google Business con reseñas de verdad.",
  },
  {
    q: "Ya me hicieron una página y no aparece por ningún lado. ¿La rehacemos?",
    a: "Primero la reviso. Muchas veces no es la página: es que en ninguna parte dice «Cartagena», nunca se le avisó a Google que existe y no hay una sola reseña. La auditoría cuesta desde " + money(390000) + " y en 5 días te digo qué tiene. Si conviene rehacerla te lo digo, y si no, también.",
  },
  {
    q: "La carta me cambia según lo que llegue de Bazurto. ¿Toca llamarte cada vez?",
    a: "No. La carta queda editable y te enseño a cambiarla el día de la entrega, desde el teléfono. Cobrarte por cada cambio de precio sería un mal negocio para los dos.",
  },
  {
    q: "Solo contesto por WhatsApp. ¿La página me sirve de algo?",
    a: "Sí, y no pelea con el WhatsApp: lo alimenta. La página trabaja de noche y los domingos, contesta las tres preguntas de siempre y te manda al chat gente que ya sabe qué vendes y cuánto vale.",
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
        {/* ── Encabezado · canvas ────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 pb-8 pt-32 text-center md:px-8 md:pt-40">
          <Reveal>
            <Badge>
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              Cartagena de Indias · Bolívar
            </Badge>
            <h1 className="mt-6 font-display text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
              Diseño de páginas web en Cartagena de Indias,{" "}
              <span className="block text-metal">y vivo a 20 kilómetros de allí</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Vivo y trabajo en Turbaco, subiendo. No vengo de otra ciudad a entender el mercado de
              Cartagena: es donde compro el pan.
            </p>
            <p className="mx-auto mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Diseño y programo yo mismo, sin equipo intermedio. Desde{" "}
              <strong className="text-ink">{money(850000)}</strong>, en{" "}
              <strong className="text-ink">5 días</strong>.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href="/#contacto">
                  Agenda una llamada <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#precios">Ver los precios</a>
              </Button>
            </div>
          </Reveal>
        </section>

        {/* ── La ciudad, con cifras comprobables · banda ─────────────── */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Cómo es de verdad el comercio de esta ciudad
            </h2>
            <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-ink-soft">
              Mediciones públicas de la Cámara de Comercio y del Registro Mercantil. Explican a
              quién le hablo.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {CIFRAS.map((c, i) => (
              <Reveal key={c.dato} index={i}>
                <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 sm:p-7">
                  <p className="font-display text-4xl text-primary-dark">{c.dato}</p>
                  <p className="mt-3 flex-1 font-body leading-relaxed text-ink-soft">{c.de}</p>
                  <p className="mt-5 border-t border-line pt-4 font-mono text-[11px] leading-relaxed text-ink-soft">
                    {c.fuente}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-6 max-w-3xl font-body text-lg leading-relaxed text-ink-soft">
              Ese 13% son los hoteles chiquitos de San Diego, los hostales de Getsemaní y los
              restaurantes de barrio. Casi ninguno tiene página propia: viven de un perfil de
              Instagram y de un mensaje que a las nueve de la noche nadie alcanza a contestar.
            </p>
          </Reveal>
        </section>

        {/* ── Para quién es · banda (mismo capítulo que las cifras) ──── */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Los negocios de Cartagena a los que esto les sirve
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {PARA_QUIEN.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.titulo} index={i}>
                  <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 sm:p-7">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-quiet text-accent-ink ring-1 ring-inset ring-accent-quiet-line">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-body text-xl font-semibold text-ink">{p.titulo}</h3>
                    <p className="mt-2 flex-1 font-body leading-relaxed text-ink-soft">{p.desc}</p>
                    {p.link && (
                      <Link
                        href={p.link.href}
                        className="mt-4 inline-flex min-h-11 items-center gap-2 py-2.5 font-body text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
                      >
                        {p.link.label}{" "}
                        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                      </Link>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ── Precios · CANVAS a propósito: son la respuesta ─────────── */}
        <section id="precios" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-12 md:px-8">
          <Reveal>
            <Badge>Precios</Badge>
            <h2 className="mt-6 font-display text-3xl text-ink sm:text-4xl">
              Lo que cuesta, sin que tengas que escribir para preguntar
            </h2>
            <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-ink-soft">
              Precios de partida reales. De ahí para arriba según lo que necesites, y te lo digo
              antes de empezar, no en la factura.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PRECIOS.map((p, i) => (
              <Reveal key={p.q} index={i}>
                <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 sm:p-7">
                  <h3 className="font-body text-xl font-semibold text-ink">{p.q}</h3>
                  <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-ink-soft">
                    {p.d}
                  </p>
                  {p.href && (
                    <Link
                      href={p.href}
                      className="mt-3 inline-flex min-h-11 w-fit items-center gap-2 py-2.5 font-body text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
                    >
                      Ver el detalle{" "}
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </Link>
                  )}
                  <div className="mt-4 border-t border-line pt-4">
                    <p className="font-mono text-lg text-primary-dark">
                      {p.desde === "Según el alcance" ? p.desde : `desde ${p.desde}`}
                    </p>
                    <p className="mt-1 inline-flex items-center gap-2 font-body text-sm text-ink-soft">
                      <Clock className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      {p.plazo}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-6 grid gap-4 rounded-2xl border border-line bg-band/60 p-6 font-body leading-relaxed text-ink-soft sm:p-7">
              <p>
                <strong className="text-ink">La renovación anual cuesta {money(290000)}</strong> y
                cubre dominio, alojamiento y que la página siga actualizada y en pie. Lo digo acá
                arriba y no en una nota al pie: es el costo que a todo el mundo se le aparece de
                sorpresa al año siguiente.
              </p>
              <p>
                Los primeros movimientos de posicionamiento se ven{" "}
                <strong className="text-ink">entre el mes 3 y el mes 6</strong>. Nadie te puede
                prometer el primer puesto en Google, ni yo tampoco.
              </p>
              <p className="text-sm">
                El desglose largo:{" "}
                <Link
                  href="/blog/cuanto-cuesta-una-pagina-web-en-colombia"
                  className="font-semibold text-primary-dark underline underline-offset-4"
                >
                  cuánto cuesta una página web
                </Link>
                ,{" "}
                <Link
                  href="/blog/cuanto-se-demora-hacer-una-pagina-web"
                  className="font-semibold text-primary-dark underline underline-offset-4"
                >
                  cuánto se demora
                </Link>{" "}
                y{" "}
                <Link
                  href="/blog/cuanto-cuesta-el-seo-en-colombia"
                  className="font-semibold text-primary-dark underline underline-offset-4"
                >
                  cuánto cuesta el SEO
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── Cómo se hace · banda. El rail cuenta los días y el tramo
             punteado dice que el reloj arranca con TU material, que es la
             condición que más discusiones ahorra después. ─────────────── */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Cómo se hace, y cuándo arranca el reloj
            </h2>
            <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-ink-soft">
              Antes del día 1 hablamos veinte minutos y te mando la propuesta escrita, con el
              precio adentro. No hay ejecutivo de cuentas: hablas con el que escribe el código.
            </p>
          </Reveal>

          <Reveal>
            <RailPlazo
              className="mt-10"
              previo={{
                etiqueta: "Antes del día 1",
                texto: "Tus textos, tus fotos y tus precios. El reloj no ha arrancado.",
              }}
              hitos={DIAS}
            />
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <ListaAcopio
                almacen="acopio-cartagena"
                titulo="Lo que tienes que mandarme para que arranque"
                items={[
                  "Tu logo, en el mejor archivo que tengas",
                  "Los textos, o el visto bueno para que los escriba yo",
                  "Fotos del sitio, del equipo y del trabajo hecho",
                  "Precios o carta, si los vas a publicar",
                  "Horarios reales, sábados y festivos incluidos",
                  "Accesos al dominio y al correo, si ya los tienes",
                ]}
              />
            </Reveal>

            <Reveal delay={120}>
              <PanelAutonomia
                titulo="Y esto lo cambias tú, sin escribirme"
                precio={{ etiqueta: "Cambiar un precio de la carta", campo: "$ 38.000", boton: "Guardar" }}
                archivo={{ etiqueta: "Subir la foto del plato", nombre: "cazuela-de-mariscos.jpg", nota: "Listo" }}
                estado={{ etiqueta: "Marcar una reserva", elegida: "Confirmada", nota: "El cliente recibe el aviso" }}
              />
            </Reveal>
          </div>
        </section>

        {/* ── Desde dónde · banda (mismo capítulo que «cómo se hace») ── */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Qué significa que esté en Turbaco y no en Bocagrande
            </h2>
            <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-ink-soft">
              Cubro Cartagena de Indias, Turbaco, Arjona, Turbaná y el resto de Bolívar. Hablas
              siempre conmigo, de la primera llamada a la entrega, y cuando escribas para reclamar
              va a contestar el que hizo el trabajo.
            </p>
          </Reveal>

          <Reveal>
            <RailDistancia
              className="mt-10"
              paradas={[
                { lugar: "Turbaco, Bolívar", distancia: "0 km", nota: "Aquí vivo y aquí trabajo." },
                { lugar: "Cartagena de Indias", distancia: "≈ 20 km", nota: "Nos vemos si el proyecto lo pide." },
                { lugar: "Barranquilla", distancia: "≈ 120 km", nota: "También trabajo allá, a distancia." },
                { lugar: "El resto del país", distancia: "a distancia", nota: "Y lo digo yo primero." },
              ]}
            />
          </Reveal>
        </section>

        {/* ── El trabajo propio de esta zona · canvas ────────────────── */}
        <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Lo que he hecho de este lado
            </h2>
            <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-ink-soft">
              Acá no hay logos de relleno. Digo cuál está en línea y se puede abrir, y cuál lo
              construí por iniciativa propia.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Reveal>
              <article className="flex h-full flex-col rounded-2xl border border-primary/25 bg-gradient-to-br from-surface to-secondary/15 p-6 sm:p-7">
                <span className="w-fit rounded-full bg-primary/12 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-primary-dark">
                  En línea · Cartagena
                </span>
                <h3 className="mt-4 font-display text-2xl text-ink">Bloomrose</h3>
                <p className="mt-3 flex-1 font-body leading-relaxed text-ink-soft">
                  Tienda de bisutería y accesorios de Cartagena. La diseñé y la programé completa:
                  catálogo con inventario, carrito, cuentas de cliente, pagos en línea y cotización
                  de envíos. Es la que puedes abrir ahora mismo y comprobar.
                </p>
                <a
                  href="https://www.bloomroseaccesorios.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-11 w-fit items-center gap-2 py-2.5 font-body text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  bloomroseaccesorios.com{" "}
                  <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>
                <p className="mt-1 font-body text-sm leading-relaxed text-ink-soft">
                  Cómo se arma una así está en{" "}
                  <Link
                    href="/servicios/tiendas-virtuales"
                    className="font-semibold text-primary-dark underline underline-offset-4"
                  >
                    creación de tiendas virtuales
                  </Link>
                  .
                </p>
              </article>
            </Reveal>

            <Reveal delay={80}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 sm:p-7">
                <span className="w-fit rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                  Proyecto de estudio · Cartagena
                </span>
                <h3 className="mt-4 font-display text-2xl text-ink">Fta. Elka Gómez</h3>
                <p className="mt-3 flex-1 font-body leading-relaxed text-ink-soft">
                  Más de 30 años tratando el dolor en Cartagena: rehabilitación física, masaje y
                  experiencias de spa. La construí por iniciativa propia, no me la encargaron, y
                  todavía no tiene dominio conectado. Por eso no hay enlace que abrir: prefiero
                  decírtelo a colgar una captura y llamarlo cliente.
                </p>
              </article>
            </Reveal>

            <Reveal delay={160}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 sm:p-7">
                <span className="w-fit rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                  Proyecto de estudio · Turbaco
                </span>
                <h3 className="mt-4 font-display text-2xl text-ink">Animal Expert</h3>
                <p className="mt-3 flex-1 font-body leading-relaxed text-ink-soft">
                  Centro médico veterinario de Turbaco: consulta especializada, cirugía, rayos X y
                  agenda en línea. Mismo caso que el anterior: por iniciativa propia, en el pueblo
                  donde vivo.
                </p>
              </article>
            </Reveal>

            {/* Nombra a Pixels Maker y a la Funeraria San Francisco de Asis con el
                detalle del trabajo. Sin su autorizacion escrita eso no puede estar en
                una pagina publica, asi que el bloque entero solo existe en desarrollo. */}
            {MOSTRAR_PENDIENTES && (
              <Reveal delay={240}>
                <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 sm:p-7">
                  <span className="w-fit rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
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
                className="font-semibold text-primary-dark underline underline-offset-4"
              >
                el portafolio completo
              </Link>
              , con la misma separación: lo que está en producción con dominio propio y lo que no.
            </p>
          </Reveal>
        </section>

        {/* ── Preguntas de acá · banda ───────────────────────────────── */}
        <section className="banda mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Lo que me preguntan los negocios de Cartagena
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} index={i}>
                <article className="rounded-2xl border border-line bg-surface p-6 sm:p-7">
                  <h3 className="font-body text-xl font-semibold text-ink">{f.q}</h3>
                  <p className="mt-3 font-body leading-relaxed text-ink-soft">{f.a}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Cierre · canvas ────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 py-16 text-center md:px-8 md:py-24">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Cuéntame qué vendes y en qué parte de Cartagena
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-body text-lg leading-relaxed text-ink-soft">
              En veinte minutos sabemos si te sirve, cuánto costaría y en cuánto la tendrías. Si no
              es una página lo que necesitas, te lo digo y no te cobro por decírtelo.
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href="/#contacto">
                  Agenda una llamada <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <BotonCuentame />
            </div>

            <nav aria-label="Otras páginas del sitio" className="mt-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                También trabajo
              </p>
              <ul className="mt-4 flex flex-wrap justify-center gap-2">
                {OTRAS_PAGINAS.map((o) => (
                  <li key={o.href}>
                    <Link
                      href={o.href}
                      className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4 py-2.5 font-body text-sm text-ink-soft transition-colors hover:border-primary/40 hover:text-ink"
                    >
                      {o.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
