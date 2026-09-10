import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  Check,
  ClipboardList,
  ExternalLink,
  Lock,
  MapPin,
  Stethoscope,
  UserRound,
  X,
} from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BloqueLocalGoogle } from "@/components/visuales/BloqueLocalGoogle";
import { CasillaVacia } from "@/components/visuales/CasillaVacia";
import { FichaGoogle } from "@/components/visuales/FichaGoogle";
import { ListaAcopio } from "@/components/visuales/ListaAcopio";
import { RailPlazo } from "@/components/visuales/RailPlazo";
import { SITE_URL } from "@/lib/site";
import { A_PRICES, money } from "@/lib/quote";

/**
 * Página de sector para «página web para clínica / consultorio médico».
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  QUÉ SOSTIENE ESTA PÁGINA
 * ─────────────────────────────────────────────────────────────────────────
 * La regla de `SEO-INTENCIONES-DE-COMPRA.md`: sin trabajo real, no hay página
 * de sector. Lo que hay de este lado:
 *
 *   · Animal Expert — centro médico veterinario de Turbaco, con agenda en
 *     línea. Sitio completo, construido por iniciativa propia.
 *   · Fta. Elka Gómez — consultorio de fisioterapia en Cartagena, 30+ años.
 *     Sitio completo, construido por iniciativa propia.
 *   · Hummik — producto propio, en línea: agenda de citas por WhatsApp.
 *
 * Es material honesto pero MODESTO, y la página lo dice en voz alta. Desde la
 * fase de visuales ese «lo que no tengo» ya no es una tarjeta con tinte de
 * aviso: es una <CasillaVacia>, un hueco declarado en la propia vitrina, del
 * mismo alto que sus hermanas. Nadie diseña un hueco en su portafolio, y por
 * eso es lo más creíble de la sección. NO SE QUITA.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  NÜVA PLASTIC SURGERY NO SE NOMBRA ACÁ
 * ─────────────────────────────────────────────────────────────────────────
 * COPY-PRIMERA-PERSONA.md lo saca del portafolio hasta verificar la
 * habilitación en el REPS. Esta página respeta esa decisión: se menciona la
 * REGLA («no publico un sitio de salud sin verificar la habilitación») sin
 * nombrar al proyecto ni describir su especialidad. Si algún día la
 * verificación se hace, ese caso entra acá y esta página mejora sola.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  LO QUE NO SE PUEDE ROMPER
 * ─────────────────────────────────────────────────────────────────────────
 * · Animal Expert y Elka Gómez son PROYECTOS DE ESTUDIO, no clientes.
 * · Nada de promesas de resultado en salud, ni propias ni sugeridas.
 * · De normas se cita solo lo que se puede sostener: la Ley 1581 de 2012 y su
 *   trato reforzado de los datos de salud como datos sensibles, y la
 *   existencia del REPS. Ninguna resolución de publicidad sanitaria: no está
 *   verificada y la regla 3 del proyecto prohíbe citar lo que no se puede
 *   comprobar.
 * · El bloque local NO promete el primer puesto: promete entrar en la lista, y
 *   el visual lo dibuja así.
 *
 * Una sola página cubre la intención completa: clínica, consultorio, centro
 * médico, odontología, fisioterapia, veterinaria. Son el mismo trabajo de
 * página web y una por sinónimo sería una doorway page.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  RITMO DE FONDOS
 * ─────────────────────────────────────────────────────────────────────────
 * banda: «qué resuelve» + «lo que no escribo» (dos seguidas = un capítulo).
 * Canvas: hero, LA PRUEBA DE TRABAJO y los precios. banda para la ficha de
 * Google, canvas para el arranque, banda para las preguntas y canvas para el
 * cierre. Ninguna sección dentro de una banda lleva fondo ni borde propios.
 */
export const metadata: Metadata = {
  title: "Páginas web para clínicas y consultorios | JV Agencia",
  description:
    "Diseño páginas web para consultorios, clínicas y centros médicos en Colombia: servicios explicados como los busca el paciente, cita sin llamar y datos tratados en serio.",
  alternates: { canonical: "/sectores/clinicas-y-consultorios" },
  openGraph: {
    title: "Páginas web para clínicas y consultorios | JV Agencia",
    description:
      "Que el paciente sepa quién eres, qué atiendes y cómo pedir la cita, sin llamar. Desde $850.000 y en 5 días.",
    url: `${SITE_URL}/sectores/clinicas-y-consultorios`,
    type: "website",
  },
};

/** Lo que necesita la página de un consultorio. Todo del oficio, nada genérico. */
const NECESITA = [
  {
    icon: UserRound,
    titulo: "El nombre del profesional, no solo el de la clínica",
    desc: "Nombre completo, especialidad, años de ejercicio y registro profesional. Un logo bonito sin una sola persona detrás manda al paciente a seguir buscando.",
  },
  {
    icon: ClipboardList,
    titulo: "Los servicios dichos como los dice el paciente",
    desc: "Nadie busca «terapia física de miembro inferior»: busca «dolor de rodilla». La página se escribe en el idioma del que tiene el problema, con el nombre técnico detrás y no al revés.",
  },
  {
    icon: CalendarClock,
    titulo: "Pedir la cita sin tener que llamar",
    desc: "El que a las once de la noche busca quién le vea un dolor no espera a mañana: le escribe al que le contestó. Que la página diga qué se agenda, cuánto dura y con quién.",
    link: { href: "/servicios/chatbot-whatsapp", label: "Chatbot que agenda citas" },
  },
  {
    icon: Check,
    titulo: "Cómo se prepara la cita",
    desc: "En ayunas o no, traer exámenes, venir acompañado, qué documento. Cada llamada que recibes por eso es una interrupción que la página podía evitar.",
  },
  {
    icon: MapPin,
    titulo: "Sedes, horario y si atiendes particular o por convenio",
    desc: "Dirección con punto de referencia, horario real —sábados incluidos— y si atiendes particular, prepagada o convenio. Lo que no digas te lo preguntan por chat, y esa conversación no la cobras.",
  },
  {
    icon: Lock,
    titulo: "Los datos de un paciente no son datos cualquiera",
    desc: "La Ley 1581 de 2012 trata los datos de salud como sensibles: no se recogen sin autorización. En tu página eso es un formulario que pide lo mínimo para llamarte —no el motivo de consulta— y una política de datos que existe de verdad.",
  },
];

/**
 * La columna de honestidad de esta página. NO SE RECORTA de contenido: solo se
 * apretó la redacción. Va con la X, no con el check: son cosas que NO hago, y
 * el check al lado las leía al revés.
 */
const NO_ESCRIBO = [
  "Promesas de resultado. Ni «resultados garantizados», ni «sin dolor», ni «recuperación en X días».",
  "Servicios que no correspondan a lo que tienes habilitado. Si no está a tu nombre en el REPS, no va en la página.",
  "Fotos ni testimonios de pacientes sin su autorización escrita. Son datos sensibles y se tratan como tales.",
  "Comparaciones con otros profesionales o clínicas. No hace falta bajar a nadie para explicar por qué te buscan a ti.",
];

/** Precios autorizados; el del chatbot sale del cotizador, que es la fuente única. */
const PRECIOS = [
  {
    q: "Página web del consultorio",
    desde: money(850000),
    plazo: "5 días",
    d: "Quién eres y qué atiendes, preparación de la cita, sede con mapa, horario y WhatsApp a la vista.",
    href: "/servicios/diseno-de-paginas-web",
  },
  {
    q: "Chatbot que agenda citas",
    desde: money(A_PRICES.base.citas),
    plazo: "de 2 a 5 semanas",
    d: "Tu número muestra disponibilidad, agenda, confirma y recuerda la cita el día anterior. El recordatorio es lo que le baja el filo al que no llega.",
    href: "/servicios/chatbot-whatsapp",
  },
  {
    q: "Software a la medida",
    desde: "Según el alcance",
    plazo: "se define al cotizar",
    d: "Cuando el problema ya no es la página sino el proceso: agenda con varios profesionales, sedes, historias clínicas.",
    href: "/servicios/software-a-la-medida",
  },
  {
    q: "Auditoría SEO",
    desde: money(390000),
    plazo: "5 días",
    d: "Ya tienes página y no apareces por tu especialidad más tu ciudad. Te digo por qué y qué se arregla primero.",
    href: "/servicios/posicionamiento-seo",
  },
  {
    q: "SEO local, mensual",
    desde: `${money(650000)}/mes`,
    plazo: "trabajo continuo",
    d: "Aparecer en «odontólogo en Cartagena» o «fisioterapia en Turbaco»: tu especialidad con el nombre de tu ciudad al lado.",
    href: "/servicios/posicionamiento-seo",
  },
];

const FAQS = [
  {
    q: "¿Puedo poner fotos de antes y después de mis pacientes?",
    a: "Solo con la autorización escrita de esa persona: la cara y el cuerpo de un paciente en un procedimiento son datos sensibles bajo la Ley 1581 de 2012. Sin autorización firmada, la foto no entra. Y aunque la tengas, no se acompaña de una promesa de resultado.",
  },
  {
    q: "¿La página puede guardar la historia clínica?",
    a: "No, y no debería: una página pública no es el lugar de una historia clínica. Si necesitas historias, agenda de varios profesionales o sedes, eso es software a la medida. Te digo cuál de los dos necesitas antes de cobrarte el equivocado.",
  },
  {
    q: "¿Agenda en línea de verdad o mejor WhatsApp?",
    a: "Depende de cómo llevas la agenda hoy. Si hoy la maneja una persona en una libreta, publicar una agenda en línea no arregla el desorden: lo expone. Casi siempre conviene empezar por la página que manda al chat con el servicio ya escogido, y de ahí subir a un chatbot que agenda y recuerda, desde " + money(A_PRICES.base.citas) + ".",
  },
  {
    q: "Soy un solo profesional, con consultorio alquilado. ¿Me sirve?",
    a: "Sí, y suele ser donde más se nota: cuando no tienes clínica con letrero, la página es lo que le confirma al paciente que existes y dónde estás. Desde " + money(850000) + " y en 5 días.",
  },
  {
    q: "Soy odontólogo, veterinaria o fisioterapeuta. ¿Esta página es para mí?",
    a: "Sí. Cambia la especialidad, no el trabajo: quién atiende, qué se atiende, cómo se pide la cita, cómo se prepara y cómo se tratan los datos. Los dos que tengo hechos son un centro médico veterinario y un consultorio de fisioterapia.",
  },
  {
    q: "¿Me pones de primero en Google cuando busquen mi especialidad en mi ciudad?",
    a: "No te lo prometo, y desconfía del que te lo prometa. Los primeros movimientos se ven entre el mes 3 y el mes 6. El trabajo es entrar en la lista, como lo dibuja el bloque de arriba.",
  },
  {
    q: "Ya me hicieron una página y no aparece por ningún lado. ¿La rehacemos?",
    a: "Primero la reviso. Muchas veces no hay que rehacer nada: en ninguna parte dice la ciudad, nunca se le avisó a Google y no hay una sola reseña. La auditoría cuesta desde " + money(390000) + " y en 5 días te digo qué tiene. Si conviene rehacerla te lo digo, y si no, también.",
  },
];

export default function ClinicasYConsultoriosPage() {
  // Service, no LocalBusiness ni MedicalBusiness: el prestador de salud es el
  // cliente, no yo. Lo que se ofrece acá es diseño de páginas web, y marcarlo
  // como negocio médico sería declarar algo que no soy. Sin FAQPage: desde
  // 2023 Google lo restringió a sitios de gobierno y salud.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/sectores/clinicas-y-consultorios#servicio`,
    name: "Diseño de páginas web para clínicas y consultorios",
    alternateName: [
      "Página web para consultorio médico",
      "Página web para clínica",
      "Diseño web para centros médicos",
      "Página web para odontología",
      "Página web para veterinaria",
    ],
    serviceType: "Diseño y desarrollo de páginas web para prestadores de servicios de salud",
    description:
      "Diseño y programación de páginas web para consultorios, clínicas, centros médicos, odontología, fisioterapia y veterinarias en Colombia: servicios explicados en el lenguaje del paciente, agenda por WhatsApp, preparación de la cita, sedes y tratamiento de datos sensibles conforme a la Ley 1581 de 2012.",
    provider: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/sectores/clinicas-y-consultorios`,
    audience: {
      "@type": "BusinessAudience",
      name: "Consultorios, clínicas, centros médicos, odontología, fisioterapia y veterinarias",
    },
    areaServed: [
      { "@type": "Country", name: "Colombia" },
      { "@type": "AdministrativeArea", name: "Bolívar, Colombia" },
      { "@type": "AdministrativeArea", name: "Atlántico, Colombia" },
    ],
    offers: [
      {
        "@type": "Offer",
        name: "Página web para consultorio o clínica",
        description:
          "Perfil del profesional, servicios, preparación de la cita, sedes, horario y WhatsApp. Entrega en 5 días.",
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
        description: "Disponibilidad, agendamiento, confirmación y recordatorio previo a la cita.",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "COP",
          minPrice: A_PRICES.base.citas,
        },
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Auditoría SEO",
        description:
          "Diagnóstico de por qué la página de un consultorio no aparece en su búsqueda local.",
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
        description: "Trabajo continuo para aparecer en búsquedas de especialidad más ciudad.",
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
              <Stethoscope className="h-3.5 w-3.5" />
              Salud y consulta
            </Badge>
            <h1 className="mt-6 font-display text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
              Páginas web para clínicas y consultorios{" "}
              <span className="block text-metal">donde el paciente decide antes de llamar</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Busca tu nombre y quiere ver qué atiendes, cuánto dura la cita y dónde quedas. Si eso
              no está en ninguna parte, le escribe al que sí lo puso.
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

        {/* ── Qué necesita ───────────────────────────────────────────── */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Qué tiene que resolver la página de un consultorio
            </h2>
            <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-ink-soft">
              Seis cosas concretas, y ninguna es «transmitir confianza». La confianza es el
              resultado de que estén las seis.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {NECESITA.map((n, i) => {
              const Icon = n.icon;
              return (
                <Reveal key={n.titulo} index={i}>
                  <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 md:p-7">
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
        </section>

        {/* ── Lo que no escribo en una página de salud ────────────────
            Segunda `.banda` seguida: se funde con la anterior. SIN tarjeta ni
            degradado propios — antes traía un tinte encima de la banda y se
            veían dos tonos apilados con una línea dura a media banda. */}
        <section className="banda mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Lo que no voy a escribir en tu página,
              <span className="text-metal"> aunque me lo pidas</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <ul className="mt-8 grid gap-4">
              {NO_ESCRIBO.map((x) => (
                <li
                  key={x}
                  className="flex items-start gap-3 font-body text-lg leading-relaxed text-ink-soft"
                >
                  <X aria-hidden className="mt-1.5 h-5 w-5 shrink-0 text-danger" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
            <p className="mt-7 font-body leading-relaxed text-ink-soft">
              Y lo aplico conmigo mismo: tengo un sitio de salud terminado que{" "}
              <strong className="text-ink">no está publicado en mi portafolio</strong> porque falta
              verificar la habilitación. Es incómodo tener una vitrina con un hueco; es peor mostrar
              algo que no se puede sostener.
            </p>
          </Reveal>
        </section>

        {/* ── El trabajo real de este sector (canvas: es la prueba) ──── */}
        <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <Badge>Lo que hay hecho</Badge>
            <h2 className="mt-6 font-display text-3xl text-ink sm:text-4xl">
              El trabajo de este sector que tengo, dicho como es
            </h2>
            <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-ink-soft">
              Los dos primeros son proyectos de estudio: los construí completos por iniciativa
              propia y nadie me los encargó. No son clientes y no te los vendo como tales.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Reveal>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface">
                <div className="aspect-[16/10] overflow-hidden border-b border-line bg-canvas">
                  <Image
                    src="/work/animal-expert.webp"
                    alt="Animal Expert: captura del sitio que diseñé y construí"
                    width={1600}
                    height={1000}
                    quality={82}
                    sizes="(min-width:768px) 34rem, 92vw"
                    className="h-auto w-full"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <span className="w-fit rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                    Proyecto de estudio · Turbaco
                  </span>
                  <h3 className="mt-3 font-display text-2xl text-ink">Animal Expert</h3>
                  <p className="mt-2 flex-1 font-body leading-relaxed text-ink-soft">
                    Consulta especializada, cirugía, rayos X, fisioterapia y vacunación, con
                    agenda en línea. Una clínica con todos sus problemas de página, con pacientes
                    de cuatro patas. Sin dominio conectado todavía.
                  </p>
                </div>
              </article>
            </Reveal>

            <Reveal delay={80}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface">
                <div className="aspect-[16/10] overflow-hidden border-b border-line bg-canvas">
                  <Image
                    src="/work/elka-spa.webp"
                    alt="Fta. Elka Gómez: captura del sitio que diseñé y construí"
                    width={1600}
                    height={1000}
                    quality={82}
                    sizes="(min-width:768px) 34rem, 92vw"
                    className="h-auto w-full"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <span className="w-fit rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                    Proyecto de estudio · Cartagena
                  </span>
                  <h3 className="mt-3 font-display text-2xl text-ink">Fta. Elka Gómez</h3>
                  <p className="mt-2 flex-1 font-body leading-relaxed text-ink-soft">
                    Más de 30 años tratando el dolor: rehabilitación, masaje y spa. Un
                    consultorio y un spa en el mismo negocio obligan a separar dos públicos: el que
                    llega con una lesión y el que llega a desconectarse.
                  </p>
                  <Link
                    href="/sectores/salones-y-spas"
                    className="mt-4 inline-flex min-h-11 items-center gap-2 font-body text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
                  >
                    El lado de spa, en su propia página <ArrowRight className="h-4 w-4" />
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
                    sizes="(min-width:768px) 34rem, 92vw"
                    className="h-auto w-full"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <span className="w-fit rounded-full bg-primary/12 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-primary-dark">
                    Producto propio · en línea
                  </span>
                  <h3 className="mt-3 font-display text-2xl text-ink">Hummik</h3>
                  <p className="mt-2 flex-1 font-body leading-relaxed text-ink-soft">
                    Agenda de citas por WhatsApp: el paciente reserva desde el chat, la cita cae
                    sola en el calendario y salen recordatorios contra los que no llegan. Es mío y
                    está publicado: lo puedes abrir y probarlo.
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

            {/* El hueco declarado. Va acá, del mismo alto que las otras tres:
                es lo más creíble de la sección y no se quita. */}
            <Reveal delay={240}>
              <CasillaVacia className="h-full bg-surface/50" rotulo="Lo que no tengo">
                Todavía no tengo una clínica de varias sedes ni una historia clínica conectada. Si
                tu proyecto es más grande, te lo digo de frente en la llamada: prefiero perder el
                trabajo a inventarme un caso.
              </CasillaVacia>
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
              , separado igual: producción con dominio propio y lo que construí por mi cuenta.
            </p>
          </Reveal>
        </section>

        {/* ── Precios ────────────────────────────────────────────────── */}
        <section id="precios" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-12 md:px-8">
          <Reveal>
            <Badge>Precios</Badge>
            <h2 className="mt-6 font-display text-3xl text-ink sm:text-4xl">
              Lo que cuesta, dicho antes de que preguntes
            </h2>
            <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-ink-soft">
              Precios de partida reales. De ahí para arriba según lo que necesites, y te lo digo
              antes de empezar, no en la factura.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PRECIOS.map((p, i) => (
              <Reveal key={p.q} index={i}>
                <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 md:p-7">
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
                  <div className="mt-4 border-t border-line pt-4">
                    <p className="font-mono text-lg text-primary-dark">
                      {p.desde === "Según el alcance" ? p.desde : `desde ${p.desde}`}
                    </p>
                    <p className="mt-1 font-body text-sm text-ink-soft">{p.plazo}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-6 rounded-2xl border border-line bg-surface p-6 font-body leading-relaxed text-ink-soft md:p-7">
              <p>
                <strong className="text-ink">La renovación anual cuesta {money(290000)}</strong> y
                cubre el dominio, el alojamiento y que la página siga en pie. Va acá y no en una
                nota al pie, porque es el costo que a todo el mundo le aparece de sorpresa al año
                siguiente.
              </p>
              <p className="mt-4">
                Y en posicionamiento, los primeros movimientos se ven{" "}
                <strong className="text-ink">entre el mes 3 y el mes 6</strong>. Nadie te puede
                prometer el primer puesto en Google, ni yo tampoco. Los desgloses largos:{" "}
                <Link
                  href="/blog/cuanto-cuesta-una-pagina-web-en-colombia"
                  className="font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  cuánto cuesta una página web
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

        {/* ── La ficha y el bloque local ─────────────────────────────── */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Antes de pagar posicionamiento: la ficha
            </h2>
            <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-ink-soft">
              El bloque de tres que sale arriba del mapa se alimenta de una ficha bien llena, y
              llenarla es gratis.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <FichaGoogle
                campos={[
                  { etiqueta: "Nombre", valor: "El nombre con el que te buscan" },
                  { etiqueta: "Categoría", valor: "Tu especialidad, y las secundarias" },
                  { etiqueta: "Dirección", valor: "La sede, con punto de referencia" },
                  { etiqueta: "Horario", valor: "Tu horario real, sábados incluidos" },
                  { etiqueta: "Teléfono", valor: "El WhatsApp por el que sí contestas" },
                  { etiqueta: "Servicios", valor: "Lo que atiendes, uno por uno" },
                  { etiqueta: "Fotos", valor: "Fachada, sala de espera y consultorio" },
                  { etiqueta: "Reseñas" },
                  { etiqueta: "Preguntas frecuentes" },
                ]}
              />
            </Reveal>
            <Reveal delay={80}>
              <BloqueLocalGoogle consulta="odontólogo en Cartagena" tuNegocio="Tu consultorio" />
            </Reveal>
          </div>
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
              almacen="acopio-clinicas"
              items={[
                "Tu nombre completo, especialidad y número de registro profesional",
                "Los servicios que atiendes, con el nombre técnico y el nombre común",
                "Qué debe hacer el paciente antes de la cita, servicio por servicio",
                "Dirección de cada sede, punto de referencia y horario real",
                "Si atiendes particular, prepagada o por convenio",
                "Tu política de tratamiento de datos, si ya la tienes escrita",
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
                  texto: "Hablamos por WhatsApp: qué atiendes, cómo llevas la agenda y qué te preguntan siempre.",
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
                  texto: "Te la entrego y te enseño a moverla: un horario, un servicio, una preparación.",
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

        {/* ── Preguntas del sector ───────────────────────────────────── */}
        <section className="banda mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Lo que me preguntan los consultorios
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} index={i}>
                <article className="rounded-2xl border border-line bg-surface p-6 md:p-7">
                  <h3 className="font-body text-xl font-semibold text-ink">{f.q}</h3>
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
              Cuéntame qué te preguntan antes de cada cita
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-body text-lg leading-relaxed text-ink-soft">
              Con esa lista ya sé qué tiene que decir tu página y si además te conviene un chatbot
              que agende. Si no te conviene ninguno de los dos, también te lo digo.
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
              . Y si lo tuyo es estética o bienestar,{" "}
              <Link
                href="/sectores/salones-y-spas"
                className="font-semibold text-primary-dark underline-offset-4 hover:underline"
              >
                salones y spas
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
