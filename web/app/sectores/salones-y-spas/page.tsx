import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Camera,
  Check,
  Clock,
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
 */
const NECESITA = [
  {
    icon: Tags,
    titulo: "La carta de servicios, con el precio adentro",
    desc: "Lo primero que te preguntan por mensaje es cuánto vale. Si el precio está en la página, la conversación empieza en «¿tienes cupo el sábado?» y no en «¿cuánto?». Si te varía por largo de pelo o por técnica, se pone el rango y se dice de qué depende: un rango honesto espanta mucho menos que un precio escondido.",
  },
  {
    icon: CalendarCheck,
    titulo: "Reservar sin veinte mensajes",
    desc: "«¿A qué hora tienes?» «A las 3.» «¿Y el sábado?» Ese ida y vuelta se lo come quien esté atendiendo, con las manos llenas de tinte. La página muestra cada servicio con su duración y manda al chat con el servicio ya escogido. Si el volumen lo pide, el paso siguiente es un chatbot que agenda y confirma solo.",
    link: { href: "/servicios/chatbot-whatsapp", label: "Chatbot que agenda las citas" },
  },
  {
    icon: Camera,
    titulo: "El trabajo a la vista, con fotos tuyas",
    desc: "En este oficio el catálogo son las fotos: el color, el corte, las uñas, la piel. Sirve la foto del celular bien tomada, con buena luz; no sirve el banco de imágenes con una modelo que jamás pisó tu silla. Te dejo la galería para que la subas tú desde el teléfono, sin llamarme.",
  },
  {
    icon: Users,
    titulo: "Quién atiende, con nombre y cara",
    desc: "La gente no pide cita en el salón: pide cita con alguien. Si cada estilista, barbero o terapeuta tiene nombre, foto y lo que hace mejor, el que llega nuevo ya sabe con quién quiere ir, y al que le hablaron de una persona en particular la encuentra.",
  },
  {
    icon: ShieldCheck,
    titulo: "Las reglas de la casa, escritas",
    desc: "Anticipo, cancelación, cuánto se espera al que llega tarde, qué pasa si no llegó. Tenerlo escrito en la página no te hace antipático: te ahorra la discusión en la puerta y hace que el plantón cueste algo. Y cuando lo reclamas, no estás improvisando una regla: estás mostrando la que ya estaba publicada.",
  },
  {
    icon: Sparkles,
    titulo: "En spa: qué incluye, cuánto dura y qué no aplica",
    desc: "Un ritual no se vende con una foto de piedras calientes: se vende explicado. Qué incluye, cuánto dura, qué te pones, si hay ducha, qué llevar. Y las contraindicaciones que tú ya adviertes por chat —embarazo, una lesión reciente, alguna condición— dichas antes de reservar y no en la camilla.",
  },
];

/** Precios autorizados. El del chatbot sale del cotizador para no tener dos verdades. */
const PRECIOS = [
  {
    q: "Página web del salón",
    desde: money(850000),
    plazo: "5 días",
    d: "Carta de servicios con precios, galería que actualizas tú, tu equipo con nombre, horario, cómo llegar y botón de WhatsApp que se ve desde el primer segundo.",
  },
  {
    q: "Chatbot que agenda citas",
    desde: money(A_PRICES.base.citas),
    plazo: "de 2 a 5 semanas",
    d: "Tu número muestra la disponibilidad, agenda, confirma y recuerda la cita el día antes. El recordatorio es lo que de verdad muerde el plantón.",
    href: "/servicios/chatbot-whatsapp",
  },
  {
    q: "SEO local, mensual",
    desde: `${money(450000)}/mes`,
    plazo: "trabajo continuo",
    d: "El trabajo de aparecer cuando escriben «peluquería» o «spa» más el nombre de tu ciudad o de tu barrio. Es mensual porque es continuo, y lo digo claro.",
  },
  {
    q: "Auditoría SEO",
    desde: money(390000),
    plazo: "5 días",
    d: "Ya tienes página y no aparece cuando te buscan. Te digo por qué, qué se arregla primero y qué se puede medir. Sirve igual si te la hizo otro.",
  },
  {
    q: "Tienda online",
    desde: money(2500000),
    plazo: "3 semanas",
    d: "Si además vendes producto —shampoo, esmaltes, línea propia—: catálogo con inventario, carrito, pagos en línea y cotización de envíos.",
  },
];

const FAQS = [
  {
    q: "¿Pongo los precios en la página o mejor no?",
    a: "Ponlos. El que pregunta el precio por mensaje y no lo recibe, se va. Si tu precio depende del largo del pelo o de la técnica, pones el rango y explicas de qué depende: «color desde X, según largo y si hay decoloración». Lo que espanta no es el precio, es tener que pedirlo.",
  },
  {
    q: "Vivo del Instagram y me va bien. ¿Para qué quiero página?",
    a: "No compiten, hacen cosas distintas. Instagram te muestra a quien no te conocía; la página te encuentra el que ya te está buscando por el nombre, el que te recomendaron y el que a las once de la noche está averiguando dónde le hacen las uñas mañana. Lo escribí largo acá: página web o solo Instagram.",
    link: { href: "/blog/pagina-web-o-solo-instagram", label: "¿Página web o solo Instagram?" },
  },
  {
    q: "¿Puedo tener reserva en línea de verdad, conectada a la agenda?",
    a: "Se puede, pero antes te pregunto cómo llevas la agenda hoy. Si la llevan cuatro personas en un cuaderno, meterle un sistema en línea no arregla el desorden: lo publica. En la mayoría de los salones lo que funciona primero es la página que manda al WhatsApp con el servicio ya escogido; y cuando el volumen lo pide, un chatbot que agenda y recuerda, desde " + money(A_PRICES.base.citas) + ".",
  },
  {
    q: "Me cambian los precios cada tanto. ¿Toca llamarte cada vez?",
    a: "No. La carta de servicios te queda editable y te enseño a moverla el día de la entrega. Cobrarte por cada cambio de precio sería un mal negocio para los dos: tú terminas con la carta desactualizada y yo con un cliente bravo.",
  },
  {
    q: "¿La página me quita los plantones?",
    a: "Ella sola, no. Lo que muerde el plantón son tres cosas juntas: las reglas escritas donde el cliente las vea, el recordatorio el día antes y un anticipo cuando el servicio es largo. La página pone lo primero; el recordatorio automático lo hace el chatbot de citas.",
  },
  {
    q: "Trabajo sola, alquilo silla o atiendo en casa. ¿Igual me sirve?",
    a: "Igual, y a veces más: cuando no tienes local con letrero, la página es tu fachada. Es donde alguien comprueba que existes, ve tu trabajo y sabe cuánto vale antes de escribirte. No hay que tener quince sillas para merecer una página seria.",
  },
  {
    q: "¿Me pones de primero en Google cuando busquen «peluquería en Barranquilla»?",
    a: "No te lo prometo, y desconfía del que te lo prometa. Los primeros movimientos se ven entre el mes 3 y el mes 6. Y antes de gastar en eso hay algo gratis que pesa más en este oficio: la ficha de Google Business, con fotos de verdad y reseñas de tus clientas.",
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
          minPrice: 450000,
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
              Un salón no se vende con un logo bonito. Se vende con la carta de servicios a la
              vista, con el trabajo que sale de tus manos y con una forma de reservar que no sea un
              chat de veinte mensajes mientras tienes a alguien en el lavacabezas.
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
        <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Qué tiene que resolver la página de un salón o un spa
            </h2>
            <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-ink-soft">
              No es una plantilla con fotos de stock y la palabra «belleza» repetida. Son seis cosas
              concretas, y todas salen del mismo sitio: lo que tus clientes preguntan antes de
              reservar.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {NECESITA.map((n, i) => {
              const Icon = n.icon;
              return (
                <Reveal key={n.titulo} index={i}>
                  <article className="flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-7">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-surface shadow-soft">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-display text-xl text-ink">{n.titulo}</h3>
                    <p className="mt-2 flex-1 font-body leading-relaxed text-ink-soft">{n.desc}</p>
                    {n.link && (
                      <Link
                        href={n.link.href}
                        className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
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
            <div className="mt-6 rounded-2xl border border-line bg-background/40 p-7">
              <p className="font-body text-lg leading-relaxed text-ink-soft">
                <strong className="text-ink">Y una que no voy a escribir en tu página:</strong>{" "}
                promesas de resultado. Ni «bajas tres tallas», ni «te quita las estrías», ni «te
                rejuvenece diez años». No lo escribo, y no te conviene tenerlo escrito. Lo que sí
                convence es lo de arriba: el trabajo real, dicho con precisión y con precio.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── El trabajo real de este sector ─────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <Badge>Lo que hay hecho</Badge>
            <h2 className="mt-6 font-display text-3xl text-ink sm:text-4xl">
              El trabajo de este sector que tengo, dicho como es
            </h2>
            <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-ink-soft">
              Dos de estos tres son proyectos de estudio: los diseñé y los construí completos por
              iniciativa propia, para negocios reales de la región, y nadie me los encargó. No te
              los vendo como clientes, porque no lo son. Prefiero decírtelo a colgar una captura y
              llamarla caso de éxito.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Reveal>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-7">
                <span className="w-fit rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                  Proyecto de estudio · Barranquilla
                </span>
                <h3 className="mt-4 font-display text-2xl text-ink">Peluquería Marcopolo</h3>
                <p className="mt-3 flex-1 font-body leading-relaxed text-ink-soft">
                  Un salón de Barranquilla con cuatro décadas de oficio: corte de autor, color
                  editorial y tratamientos. Diseñé y construí el sitio completo{" "}
                  <strong className="text-ink">por iniciativa propia</strong>, porque quería resolver
                  el problema de un salón cuya reputación vive en el boca a boca del barrio y en
                  ninguna otra parte. Todavía no tiene dominio conectado, así que no hay enlace que
                  abrir; la captura está en el portafolio.
                </p>
                <Link
                  href="/diseno-de-paginas-web-en-barranquilla"
                  className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  Diseño de páginas web en Barranquilla <ArrowRight className="h-4 w-4" />
                </Link>
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
                  experiencias de spa. Es el caso de un negocio que es dos cosas a la vez, y la
                  página tiene que separarlas: quien busca un masaje para desconectarse y quien
                  llega con una lesión no leen igual ni deciden igual. Mismo caso que el anterior:
                  construido por iniciativa propia y sin dominio conectado.
                </p>
                <Link
                  href="/sectores/clinicas-y-consultorios"
                  className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  El lado de consultorio, en su propia página <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            </Reveal>

            <Reveal delay={160} className="md:col-span-2">
              <article className="flex h-full flex-col rounded-2xl border border-primary/25 bg-gradient-to-br from-surface to-secondary/15 p-7">
                <span className="w-fit rounded-full bg-primary/12 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-primary-dark">
                  Producto propio · en línea
                </span>
                <h3 className="mt-4 font-display text-2xl text-ink">Hummik</h3>
                <p className="mt-3 flex-1 font-body leading-relaxed text-ink-soft">
                  Agenda de citas por WhatsApp: el cliente reserva desde el chat o desde un enlace,
                  la cita cae sola en el calendario y salen recordatorios contra los plantones. Es un
                  producto mío, no un encargo, y por eso lo puedes abrir ahora mismo y probarlo. Lo
                  pongo en esta página porque el problema que resuelve es literalmente el de un
                  salón: la agenda y el que no llegó.
                </p>
                <a
                  href="https://www.hummik.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  hummik.com <ExternalLink className="h-4 w-4" />
                </a>
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
              , con la misma separación de siempre: lo que está en producción con dominio propio y
              lo que construí por mi cuenta.
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
              Publico los precios por la misma razón por la que te digo que publiques los tuyos:
              tener que pedir un valor por mensaje es lo que hace que la gente se vaya. Son precios
              de partida reales, y lo que suba de ahí te lo digo antes de empezar.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PRECIOS.map((p, i) => (
              <Reveal key={p.q} index={i}>
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
                    <p className="font-mono text-lg text-primary-dark">desde {p.desde}</p>
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
                cubre el dominio, el alojamiento y que la página siga en pie y actualizada. Lo digo
                acá arriba y no en una nota al pie, porque es el costo que a todo el mundo se le
                aparece de sorpresa al año siguiente.
              </p>
              <p>
                Si quieres el desglose completo de precios y plazos, lo escribí largo:{" "}
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
                . El SEO local mensual va aparte y tiene lo suyo en{" "}
                <Link
                  href="/blog/cuanto-cuesta-el-seo-en-colombia"
                  className="font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  cuánto cuesta el SEO en Colombia
                </Link>
                , y si lo que quieres es que el WhatsApp agende solo, los números están en{" "}
                <Link
                  href="/blog/cuanto-cuesta-un-chatbot-de-whatsapp-en-colombia"
                  className="font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  cuánto cuesta un chatbot de WhatsApp
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── Cómo se hace ───────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                Lo que necesito de ti para arrancar
              </h2>
              <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
                Casi todos los proyectos que se demoran no se demoran por el código: se demoran
                esperando el contenido. Así que te lo pido de una y en lista, para que sepas en qué
                te vas a meter.
              </p>
              <ul className="mt-8 grid gap-3">
                {[
                  "Tu lista de servicios con precio o rango, y cuánto dura cada uno",
                  "De 10 a 20 fotos de trabajos tuyos, tomadas con buena luz",
                  "Los nombres de quienes atienden y en qué es bueno cada uno",
                  "Horario real, incluidos domingos y festivos si abres",
                  "Tus reglas de anticipo, cancelación y retardo, como las manejas hoy",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-3 font-body text-ink-soft">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="font-display text-3xl text-ink sm:text-4xl">Cómo trabajo</h2>
              <ol className="mt-8 grid gap-6">
                {[
                  {
                    n: "01",
                    t: "Hablamos por WhatsApp",
                    d: "Me cuentas qué servicios vendes, cómo llevas la agenda hoy y qué es lo que más te preguntan. En veinte minutos sé si esto te sirve, y si no te sirve te lo digo.",
                  },
                  {
                    n: "02",
                    t: "Te mando la propuesta con el precio adentro",
                    d: "Escrita, con lo que incluye y lo que no. Nada de un «desde» que crece cuando ya no te puedes devolver.",
                  },
                  {
                    n: "03",
                    t: "La construyo yo",
                    d: "No hay ejecutivo de cuentas ni un equipo al que le pasan tu proyecto. Hablas con el mismo que escribe el código.",
                  },
                  {
                    n: "04",
                    t: "Te la entrego y te enseño a moverla",
                    d: "Subir una foto del trabajo de ayer, cambiar el precio del color, agregar un servicio nuevo. Eso lo haces tú, desde el teléfono.",
                  },
                ].map((p) => (
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

        {/* ── Preguntas del oficio ───────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Lo que me preguntan los salones y los spas
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} index={i}>
                <article className="rounded-2xl border border-line bg-surface/70 p-7">
                  <h3 className="font-display text-xl text-ink">{f.q}</h3>
                  <p className="mt-3 font-body leading-relaxed text-ink-soft">{f.a}</p>
                  {f.link && (
                    <Link
                      href={f.link.href}
                      className="mt-4 inline-flex items-center gap-2 font-body text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
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
              Con eso ya sé si lo que necesitas es una página, un chatbot que agende, o nada de
              esto todavía. Si es lo último, te lo digo igual: no vendo lo que no te sirve.
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
