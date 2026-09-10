import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Camera,
  ExternalLink,
  Scissors,
  ShieldCheck,
  Sparkles,
  Tags,
  Users,
} from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HiloWhatsApp, type MensajeHilo } from "@/components/visuales/HiloWhatsApp";
import { ListaAcopio } from "@/components/visuales/ListaAcopio";
import { RailPlazo } from "@/components/visuales/RailPlazo";
import { SITE_URL } from "@/lib/site";
import { A_PRICES, money } from "@/lib/quote";

/**
 * Página de sector para «página web para salón de belleza / peluquería / spa».
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  POR QUÉ ESTA PÁGINA SÍ EXISTE Y OTRAS DEL MAPA NO
 * ─────────────────────────────────────────────────────────────────────────
 * La regla de `SEO-INTENCIONES-DE-COMPRA.md` (sección 4) es tajante: página de
 * sector SOLO donde haya un trabajo real que mostrar. El mapa proponía cuatro
 * sectores; con el inventario en la mano solo dos se sostienen, y este es el
 * más sólido de los dos:
 *
 *   · Peluquería Marcopolo — salón de Barranquilla, sitio completo construido.
 *   · Fta. Elka Gómez — rehabilitación, masaje y spa en Cartagena.
 *   · Hummik — producto propio, en línea: agenda de citas por WhatsApp.
 *
 * Restaurantes e inmobiliarias se descartaron por lo mismo al revés: no hay un
 * solo trabajo de esos dos oficios en todo el repositorio. Una página de sector
 * sin caso es una página vacía que además le compite al blog, que sí tiene el
 * artículo de restaurantes posicionado.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  LO QUE NO SE PUEDE ROMPER ACÁ
 * ─────────────────────────────────────────────────────────────────────────
 * Marcopolo y Elka Gómez son PROYECTOS DE ESTUDIO: sitios completos que Luis
 * diseñó y construyó por iniciativa propia para negocios reales de la región.
 * NO son clientes que pagaron y no se presentan como tales — esa es la misma
 * clasificación que fija COPY-PRIMERA-PERSONA.md y que ya respetan la página
 * de Barranquilla y la de Cartagena. Si alguien alguna vez los convierte en
 * «casos de éxito», la página se vuelve mentira.
 *
 * Sin cifras de mercado inventadas: acá no hay «el 70% de las citas se pierden
 * por no contestar». Los únicos números son los precios autorizados y los del
 * cotizador (`lib/quote.ts`), que es la fuente única.
 *
 * Una sola página cubre toda la intención: salón de belleza, peluquería,
 * barbería, spa, uñas, estética. Son sinónimos del mismo oficio para el que
 * busca, y una página por sinónimo es exactamente lo que Google castiga.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  RITMO DE FONDOS (fase «menos texto, más visual»)
 * ─────────────────────────────────────────────────────────────────────────
 * banda: «qué resuelve» + «la reserva, mostrada» —dos `.banda` seguidas se
 * funden en un solo capítulo, que es justo lo que son: el argumento y su
 * demostración—. Canvas: hero, LA PRUEBA DE TRABAJO, precios y arranque.
 * banda otra vez para las preguntas, canvas para el cierre. Ninguna sección
 * dentro de una banda lleva fondo propio: el tono lo pone la banda.
 */
export const metadata: Metadata = {
  title: "Páginas web para salones de belleza y spas | JV Agencia",
  description:
    "Diseño páginas web para salones de belleza, peluquerías, barberías y spas en Colombia: carta de servicios con precio, reserva por WhatsApp y el trabajo a la vista.",
  alternates: { canonical: "/sectores/salones-y-spas" },
  openGraph: {
    title: "Páginas web para salones de belleza y spas | JV Agencia",
    description:
      "Carta de servicios con precio, reserva sin veinte mensajes y tus trabajos a la vista. Desde $850.000 y en 5 días.",
    url: `${SITE_URL}/sectores/salones-y-spas`,
    type: "website",
  },
};

/**
 * Lo que necesita la página de un salón o un spa. Cada punto es del OFICIO: si
 * alguno sirviera igual para una ferretería, está mal escrito y se bota.
 *
 * Las descripciones se recortaron a dos frases: lo que se puede MOSTRAR ya no
 * se cuenta. La reserva, en particular, la enseña <HiloWhatsApp> en la sección
 * siguiente, así que acá quedó en una línea.
 */
const NECESITA = [
  {
    icon: Tags,
    titulo: "La carta de servicios, con el precio adentro",
    desc: "Lo primero que te preguntan por mensaje es cuánto vale. Con el precio publicado, la conversación empieza en «¿tienes cupo el sábado?». Si te varía por largo o por técnica, va el rango y de qué depende.",
  },
  {
    icon: CalendarCheck,
    titulo: "Reservar sin veinte mensajes",
    desc: "Ese ida y vuelta se lo come quien esté atendiendo, con las manos llenas de tinte. Cada servicio con su duración, y al chat con el que escogió.",
    link: { href: "/servicios/chatbot-whatsapp", label: "Chatbot que agenda las citas" },
  },
  {
    icon: Camera,
    titulo: "El trabajo a la vista, con fotos tuyas",
    desc: "Acá el catálogo son las fotos: el color, el corte, las uñas. Sirve la del celular con buena luz; no sirve la modelo de banco de imágenes que jamás pisó tu silla. La galería la subes tú.",
  },
  {
    icon: Users,
    titulo: "Quién atiende, con nombre y cara",
    desc: "La gente no pide cita en el salón: pide cita con alguien. Cada estilista o terapeuta con nombre, foto y en qué es mejor.",
  },
  {
    icon: ShieldCheck,
    titulo: "Las reglas de la casa, escritas",
    desc: "Anticipo, cancelación, retardo y plantón. Publicadas no te hacen antipático: te ahorran la discusión en la puerta, y cuando las reclamas no estás improvisando.",
  },
  {
    icon: Sparkles,
    titulo: "En spa: qué incluye, cuánto dura, qué no aplica",
    desc: "Un ritual no se vende con una foto de piedras calientes: se vende explicado. Y las contraindicaciones que hoy adviertes por chat, dichas antes de reservar y no en la camilla.",
  },
];

/**
 * El hilo de esta página: reserva de color un sábado, de noche y con el salón
 * cerrado. Sin cifras: acá no se inventa el precio de un color ajeno. La
 * última burbuja no es del bot, es el traspaso a una persona — que es el
 * argumento entero.
 */
const HILO_SALON: MensajeHilo[] = [
  { de: "cliente", texto: "Buenas, ¿tienen cupo el sábado para color?", hora: "9:41 p.m." },
  { de: "bot", escribiendo: true },
  {
    de: "bot",
    texto: "¡Hola! El sábado me quedan tres horas: 9:00 a.m., 11:30 a.m. y 3:00 p.m. El color toma unas tres horas.",
    hora: "9:41 p.m.",
  },
  { de: "cliente", texto: "La de 11:30", hora: "9:42 p.m." },
  {
    de: "bot",
    texto: "Listo, quedaste el sábado a las 11:30 a.m. Te llega un recordatorio el día antes.",
    hora: "9:42 p.m.",
  },
  {
    de: "bot",
    traspaso: true,
    texto: "Si quieres cambiar la hora o preguntar por un precio puntual, mañana te contesta una persona del salón.",
    hora: "9:42 p.m.",
  },
];

/** Precios autorizados. El del chatbot sale del cotizador para no tener dos verdades. */
const PRECIOS = [
  {
    q: "Página web del salón",
    desde: money(850000),
    plazo: "5 días",
    d: "Carta con precios, galería que actualizas tú, tu equipo, horario, cómo llegar y WhatsApp a la vista.",
    href: "/servicios/diseno-de-paginas-web",
  },
  {
    q: "Chatbot que agenda citas",
    desde: money(A_PRICES.base.citas),
    plazo: "de 2 a 5 semanas",
    d: "Tu número muestra la disponibilidad, agenda, confirma y recuerda la cita el día antes. El recordatorio es lo que muerde el plantón.",
    href: "/servicios/chatbot-whatsapp",
  },
  {
    q: "SEO local, mensual",
    desde: `${money(650000)}/mes`,
    plazo: "trabajo continuo",
    d: "Aparecer cuando escriben «peluquería» o «spa» más tu ciudad o tu barrio. Es mensual porque es continuo.",
    href: "/servicios/posicionamiento-seo",
  },
  {
    q: "Auditoría SEO",
    desde: money(390000),
    plazo: "5 días",
    d: "Ya tienes página y no aparece. Te digo por qué y qué se arregla primero. Sirve igual si te la hizo otro.",
    href: "/servicios/posicionamiento-seo",
  },
  {
    q: "Tienda online",
    desde: money(2500000),
    plazo: "3 semanas",
    d: "Si además vendes producto: catálogo con inventario, carrito, pagos en línea y envíos.",
    href: "/servicios/tiendas-virtuales",
  },
];

const FAQS = [
  {
    q: "¿Pongo los precios en la página o mejor no?",
    a: "Ponlos. El que pregunta el precio por mensaje y no lo recibe, se va. Si depende del largo o de la técnica, va el rango: «color desde X, según largo y si hay decoloración». Lo que espanta no es el precio, es tener que pedirlo.",
  },
  {
    q: "Vivo del Instagram y me va bien. ¿Para qué quiero página?",
    a: "No compiten. Instagram te muestra a quien no te conocía; la página te encuentra el que ya te está buscando por el nombre, el que te recomendaron y el que a las once de la noche averigua dónde le hacen las uñas mañana.",
    link: { href: "/blog/pagina-web-o-solo-instagram", label: "¿Página web o solo Instagram?" },
  },
  {
    q: "¿Puedo tener reserva en línea de verdad, conectada a la agenda?",
    a: "Se puede, pero antes te pregunto cómo llevas la agenda hoy: si la llevan cuatro personas en un cuaderno, un sistema en línea no arregla el desorden, lo publica. Casi siempre funciona primero la página que manda al chat con el servicio escogido; y cuando el volumen lo pide, un chatbot que agenda y recuerda, desde " + money(A_PRICES.base.citas) + ".",
  },
  {
    q: "Me cambian los precios cada tanto. ¿Toca llamarte cada vez?",
    a: "No. La carta de servicios te queda editable y te enseño a moverla el día de la entrega. Cobrarte por cada cambio de precio sería un mal negocio para los dos.",
  },
  {
    q: "¿La página me quita los plantones?",
    a: "Ella sola, no. Lo muerden tres cosas juntas: las reglas escritas donde el cliente las vea, el recordatorio el día antes y un anticipo cuando el servicio es largo. La página pone lo primero; el recordatorio lo hace el chatbot de citas.",
  },
  {
    q: "Trabajo sola, alquilo silla o atiendo en casa. ¿Igual me sirve?",
    a: "Igual, y a veces más: cuando no tienes local con letrero, la página es tu fachada. No hay que tener quince sillas para merecer una página seria.",
  },
  {
    q: "¿Me pones de primero en Google cuando busquen «peluquería en Barranquilla»?",
    a: "No te lo prometo, y desconfía del que te lo prometa. Los primeros movimientos se ven entre el mes 3 y el mes 6. Y antes de gastar en eso hay algo gratis que pesa más: la ficha de Google Business, con fotos de verdad y reseñas de tus clientas.",
  },
];

export default function SalonesYSpasPage() {
  // Service, no LocalBusiness: el negocio es de área de servicio y no hay local
  // en las ciudades que se nombran. Sin FAQPage a propósito — desde 2023 Google
  // lo restringió a sitios de gobierno y salud.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/sectores/salones-y-spas#servicio`,
    name: "Diseño de páginas web para salones de belleza y spas",
    alternateName: [
      "Página web para salón de belleza",
      "Página web para peluquería",
      "Página web para barbería",
      "Página web para spa",
      "Diseño web para centros de estética",
    ],
    serviceType: "Diseño y desarrollo de páginas web para el sector de belleza y bienestar",
    description:
      "Diseño y programación de páginas web para salones de belleza, peluquerías, barberías, centros de uñas y spas en Colombia: carta de servicios con precios, galería del trabajo, equipo con nombre, políticas de cita y reserva por WhatsApp.",
    provider: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/sectores/salones-y-spas`,
    audience: {
      "@type": "BusinessAudience",
      name: "Salones de belleza, peluquerías, barberías, centros de estética y spas",
    },
    areaServed: [
      { "@type": "Country", name: "Colombia" },
      { "@type": "AdministrativeArea", name: "Bolívar, Colombia" },
      { "@type": "AdministrativeArea", name: "Atlántico, Colombia" },
    ],
    offers: [
      {
        "@type": "Offer",
        name: "Página web para salón de belleza o spa",
        description:
          "Carta de servicios con precios, galería editable, equipo, políticas de cita y WhatsApp. Entrega en 5 días.",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "COP",
          minPrice: 850000,
        },
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Chatbot de WhatsApp que agenda citas",
        description:
          "Muestra disponibilidad, agenda, confirma y recuerda la cita el día anterior.",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "COP",
          minPrice: A_PRICES.base.citas,
        },
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "SEO local mensual",
        description:
          "Trabajo continuo para aparecer en búsquedas de belleza y bienestar con nombre de ciudad.",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "COP",
          minPrice: 650000,
        },
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Auditoría SEO",
        description: "Diagnóstico de por qué una página de salón o spa no aparece cuando la buscan.",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "COP",
          minPrice: 390000,
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
              <Scissors className="h-3.5 w-3.5" />
              Belleza y bienestar
            </Badge>
            <h1 className="mt-6 font-display text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
              Páginas web para salones de belleza y spas{" "}
              <span className="block text-metal">que viven de la agenda llena</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Tu clienta no busca un logo bonito: busca cuánto vale, cómo se ve tu trabajo y si
              tienes cupo el sábado.
            </p>
            <p className="mx-auto mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              La diseño y la programo yo, desde Turbaco, Bolívar. Una página web desde{" "}
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

        {/* ── Qué necesita la página de un salón ─────────────────────── */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Qué tiene que resolver la página de un salón o un spa
            </h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {NECESITA.map((n, i) => {
              const Icon = n.icon;
              return (
                <Reveal key={n.titulo} index={i}>
                  <article className="flex h-full flex-col jv-card p-6 md:p-7">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-quiet text-accent-ink ring-1 ring-inset ring-accent-quiet-line">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-body text-xl font-semibold text-ink">{n.titulo}</h3>
                    <p className="mt-2 flex-1 font-body leading-relaxed text-ink-soft">{n.desc}</p>
                    {n.link && (
                      <Link
                        href={n.link.href}
                        className="mt-5 inline-flex min-h-11 items-center gap-2 font-body text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
                      >
                        {n.link.label} <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <p className="mt-6 font-body text-lg leading-relaxed text-ink-soft">
              <strong className="text-ink">Y una que no voy a escribir:</strong> promesas de
              resultado. Ni «bajas tres tallas», ni «te quita las estrías», ni «te rejuvenece diez
              años». No lo escribo, y no te conviene tenerlo escrito.
            </p>
          </Reveal>
        </section>

        {/* ── La reserva, mostrada ───────────────────────────────────────
            Segunda `.banda` seguida: se funde con la anterior y las dos leen
            como un solo capítulo —el argumento y su demostración—. */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                Así se ve una reserva que no te interrumpe
              </h2>
              <p className="mt-4 font-body text-lg leading-relaxed text-ink-soft">
                Esto contesta tu número a las nueve y media de la noche, con el salón cerrado. La
                última burbuja no es del bot: es el traspaso a una persona.
              </p>
              <Link
                href="/servicios/chatbot-whatsapp"
                className="mt-6 inline-flex min-h-11 items-center gap-2 font-body text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
              >
                Ver el chatbot que agenda citas <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>

            {/* HiloWhatsApp ya trae escalonado propio: no se envuelve en otro Reveal. */}
            <HiloWhatsApp
              className="mx-auto w-full max-w-md"
              negocio="Salón de ejemplo"
              iniciales="SE"
              mensajes={HILO_SALON}
            />
          </div>
        </section>

        {/* ── El trabajo real de este sector (canvas: es la prueba) ──── */}
        <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <Badge>Lo que hay hecho</Badge>
            <h2 className="mt-6 font-display text-3xl text-ink sm:text-4xl">
              El trabajo de este sector que tengo, dicho como es
            </h2>
            <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-ink-soft">
              Dos de los tres son proyectos de estudio: los construí completos por iniciativa
              propia y nadie me los encargó. No te los vendo como clientes, porque no lo son.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            <Reveal>
              <article className="flex h-full flex-col overflow-hidden jv-card">
                <div className="aspect-[16/10] overflow-hidden border-b border-line bg-canvas">
                  <Image
                    src="/work/marcopolo.webp"
                    alt="Peluquería Marcopolo: captura del sitio que diseñé y construí"
                    width={1600}
                    height={1000}
                    quality={82}
                    sizes="(min-width:1024px) 22rem, (min-width:768px) 45vw, 92vw"
                    className="h-auto w-full"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="w-fit rounded-full border border-line px-3 py-1 jv-eyebrow text-ink-soft">
                    Proyecto de estudio · Barranquilla
                  </span>
                  <h3 className="mt-3 font-body text-xl font-semibold text-ink">Peluquería Marcopolo</h3>
                  <p className="mt-2 flex-1 font-body text-[15px] leading-relaxed text-ink-soft">
                    Salón de Barranquilla con cuatro décadas: corte de autor, color editorial y
                    tratamientos. Sin dominio conectado todavía.
                  </p>
                  <Link
                    href="/diseno-de-paginas-web-en-barranquilla"
                    className="mt-4 inline-flex min-h-11 items-center gap-2 font-body text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
                  >
                    Páginas web en Barranquilla <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </Reveal>

            <Reveal delay={80}>
              <article className="flex h-full flex-col overflow-hidden jv-card">
                <div className="aspect-[16/10] overflow-hidden border-b border-line bg-canvas">
                  <Image
                    src="/work/elka-spa.webp"
                    alt="Fta. Elka Gómez: captura del sitio que diseñé y construí"
                    width={1600}
                    height={1000}
                    quality={82}
                    sizes="(min-width:1024px) 22rem, (min-width:768px) 45vw, 92vw"
                    className="h-auto w-full"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="w-fit rounded-full border border-line px-3 py-1 jv-eyebrow text-ink-soft">
                    Proyecto de estudio · Cartagena
                  </span>
                  <h3 className="mt-3 font-body text-xl font-semibold text-ink">Fta. Elka Gómez</h3>
                  <p className="mt-2 flex-1 font-body text-[15px] leading-relaxed text-ink-soft">
                    Rehabilitación, masaje y spa en Cartagena. Un negocio que es dos cosas a la vez,
                    y la página tiene que separarlas. También sin dominio conectado.
                  </p>
                  <Link
                    href="/sectores/clinicas-y-consultorios"
                    className="mt-4 inline-flex min-h-11 items-center gap-2 font-body text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
                  >
                    El lado de consultorio <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </Reveal>

            <Reveal delay={160}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-primary/25 bg-surface">
                <div className="aspect-[16/10] overflow-hidden border-b border-primary/25 bg-canvas">
                  <Image
                    src="/work/hummik.webp"
                    alt="Hummik: captura del producto de agenda de citas que construí"
                    width={1600}
                    height={1000}
                    quality={82}
                    sizes="(min-width:1024px) 22rem, (min-width:768px) 45vw, 92vw"
                    className="h-auto w-full"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="w-fit rounded-full bg-primary/12 px-3 py-1 jv-eyebrow text-primary-dark">
                    Producto propio · en línea
                  </span>
                  <h3 className="mt-3 font-body text-xl font-semibold text-ink">Hummik</h3>
                  <p className="mt-2 flex-1 font-body text-[15px] leading-relaxed text-ink-soft">
                    Agenda de citas por WhatsApp, con recordatorios contra los plantones. Es mío, no
                    un encargo: lo puedes abrir ahora mismo y probarlo.
                  </p>
                  <a
                    href="https://www.hummik.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex min-h-11 items-center gap-2 font-body text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
                  >
                    hummik.com <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </article>
            </Reveal>
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
              , con la misma separación: producción con dominio propio y lo que construí por mi
              cuenta.
            </p>
          </Reveal>
        </section>

        {/* ── Precios ────────────────────────────────────────────────── */}
        <section id="precios" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-12 md:px-8">
          <Reveal>
            <Badge>Precios</Badge>
            <h2 className="mt-6 font-display text-3xl text-ink sm:text-4xl">
              Lo que cuesta, sin que tengas que escribir para preguntar
            </h2>
            <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-ink-soft">
              Publico los míos por la misma razón por la que te digo que publiques los tuyos. Son
              precios de partida reales, y lo que suba de ahí te lo digo antes de empezar.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PRECIOS.map((p, i) => (
              <Reveal key={p.q} index={i}>
                <article className="flex h-full flex-col jv-card p-6 md:p-7">
                  <h3 className="font-body text-xl font-semibold text-ink">{p.q}</h3>
                  <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-ink-soft">
                    {p.d}
                  </p>
                  {p.href && (
                    <Link
                      href={p.href}
                      className="mt-4 inline-flex min-h-11 items-center gap-2 font-body text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
                    >
                      Ver el detalle <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                  <div className="mt-4 jv-rule pt-4">
                    <p className="font-mono text-lg text-primary-dark">desde {p.desde}</p>
                    <p className="mt-1 font-body text-sm text-ink-soft">{p.plazo}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-6 jv-card p-6 font-body leading-relaxed text-ink-soft md:p-7">
              <p>
                <strong className="text-ink">La renovación anual cuesta {money(290000)}</strong> y
                cubre el dominio, el alojamiento y que la página siga en pie. Va acá arriba y no en
                una nota al pie, porque es el costo que a todo el mundo se le aparece de sorpresa al
                año siguiente.
              </p>
              <p className="mt-4">
                Los desgloses largos:{" "}
                <Link
                  href="/blog/cuanto-cuesta-una-pagina-web-en-colombia"
                  className="font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  cuánto cuesta una página web
                </Link>
                ,{" "}
                <Link
                  href="/blog/cuanto-se-demora-hacer-una-pagina-web"
                  className="font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  cuánto se demora
                </Link>
                ,{" "}
                <Link
                  href="/blog/cuanto-cuesta-el-seo-en-colombia"
                  className="font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  cuánto cuesta el SEO
                </Link>{" "}
                y{" "}
                <Link
                  href="/blog/cuanto-cuesta-un-chatbot-de-whatsapp-en-colombia"
                  className="font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  cuánto cuesta un chatbot
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── Arranque: la lista y el plazo ──────────────────────────── */}
        <section className="mx-auto max-w-5xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Lo que necesito de ti para arrancar
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <ListaAcopio
              className="mt-8"
              titulo="Marca lo que ya tienes"
              almacen="acopio-salones"
              items={[
                "Tu lista de servicios con precio o rango, y cuánto dura cada uno",
                "De 10 a 20 fotos de trabajos tuyos, con buena luz",
                "Los nombres de quienes atienden y en qué es bueno cada uno",
                "Horario real, incluidos domingos y festivos si abres",
                "Tus reglas de anticipo, cancelación y retardo, como las manejas hoy",
                "Accesos al dominio y al correo, si ya los tienes",
              ]}
            />
          </Reveal>

          <Reveal>
            <h2 className="mt-14 font-display text-3xl text-ink sm:text-4xl">Cómo trabajo</h2>
          </Reveal>
          <Reveal delay={80}>
            <RailPlazo
              className="mt-8"
              previo={{
                etiqueta: "Antes de empezar",
                texto: "Reúnes el material de la lista de arriba. El reloj todavía no ha arrancado.",
              }}
              hitos={[
                {
                  etiqueta: "Paso 01",
                  texto: "Hablamos por WhatsApp: qué vendes, cómo llevas la agenda y qué te preguntan siempre.",
                },
                {
                  etiqueta: "Paso 02",
                  texto: "Te mando la propuesta escrita, con lo que incluye y lo que no.",
                },
                {
                  etiqueta: "Paso 03",
                  texto: "La construyo yo. Hablas con el mismo que escribe el código.",
                },
                {
                  etiqueta: "Paso 04",
                  texto: "Te la entrego y te enseño a moverla: subir una foto, cambiar un precio.",
                },
              ]}
            />
          </Reveal>

          <Reveal>
            <p className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 font-body text-sm text-ink-soft">
              Una página web, en 5 días desde que llega el material.
            </p>
          </Reveal>
        </section>

        {/* ── Preguntas del oficio ───────────────────────────────────── */}
        <section className="banda mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Lo que me preguntan los salones y los spas
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} index={i}>
                <article className="jv-card p-6 md:p-7">
                  <h3 className="font-body text-xl font-semibold text-ink">{f.q}</h3>
                  <p className="mt-3 font-body leading-relaxed text-ink-soft">{f.a}</p>
                  {f.link && (
                    <Link
                      href={f.link.href}
                      className="mt-4 inline-flex min-h-11 items-center gap-2 font-body text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
                    >
                      {f.link.label} <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Cierre ─────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 py-16 text-center md:px-8 md:py-24">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Cuéntame cómo llevas la agenda hoy
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-body text-lg leading-relaxed text-ink-soft">
              Con eso ya sé si necesitas una página, un chatbot que agende, o nada de esto todavía.
              Si es lo último, te lo digo igual.
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href="/#contacto">
                  Agenda una llamada <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/servicios/chatbot-whatsapp">Ver el chatbot de WhatsApp</Link>
              </Button>
            </div>
            <p className="mx-auto mt-8 max-w-2xl font-body text-sm leading-relaxed text-ink-soft">
              Si buscas por ciudad:{" "}
              <Link
                href="/diseno-de-paginas-web-en-cartagena"
                className="font-semibold text-primary-dark underline-offset-4 hover:underline"
              >
                Cartagena
              </Link>
              ,{" "}
              <Link
                href="/diseno-de-paginas-web-en-barranquilla"
                className="font-semibold text-primary-dark underline-offset-4 hover:underline"
              >
                Barranquilla
              </Link>{" "}
              y{" "}
              <Link
                href="/diseno-de-paginas-web-en-bogota"
                className="font-semibold text-primary-dark underline-offset-4 hover:underline"
              >
                Bogotá
              </Link>
              . Y si tu negocio es de salud,{" "}
              <Link
                href="/sectores/clinicas-y-consultorios"
                className="font-semibold text-primary-dark underline-offset-4 hover:underline"
              >
                clínicas y consultorios
              </Link>{" "}
              tiene su propia página.
            </p>
          </Reveal>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
