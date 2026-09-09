import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  Check,
  ClipboardList,
  Clock,
  ExternalLink,
  Lock,
  MapPin,
  Stethoscope,
  UserRound,
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
 * Es material honesto pero MODESTO, y la página lo dice en voz alta en el
 * bloque «Lo que no tengo». No hay ninguna clínica de especialidades con
 * varias sedes en el inventario, y fingirla sería exactamente lo que este
 * proyecto se prohíbe.
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
 *
 * Una sola página cubre la intención completa: clínica, consultorio, centro
 * médico, odontología, fisioterapia, veterinaria. Son el mismo trabajo de
 * página web y una por sinónimo sería una doorway page.
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
    desc: "Acá el paciente averigua con quién lo van a atender antes de pedir la cita. Nombre completo, especialidad, dónde estudió, cuántos años lleva y el número de registro profesional. Si lo que encuentra es un logo bonito sin una sola persona detrás, duda y sigue buscando.",
  },
  {
    icon: ClipboardList,
    titulo: "Los servicios dichos como los dice el paciente",
    desc: "Nadie busca «terapia física de miembro inferior»: busca «dolor de rodilla». La página se escribe en el idioma del que tiene el problema y trae el nombre técnico detrás, no al revés. Es el mismo trabajo de palabras de búsqueda que hago en cualquier proyecto, aplicado a tu consulta.",
  },
  {
    icon: CalendarClock,
    titulo: "Pedir la cita sin tener que llamar",
    desc: "El que a las once de la noche está buscando quién le vea un dolor no va a esperar a mañana para llamar: le escribe al que le contestó. Que la página diga qué se agenda, cuánto dura y con quién, y que mande al chat con eso ya escogido. Cuando el volumen lo pide, un chatbot agenda y confirma solo.",
    link: { href: "/servicios/chatbot-whatsapp", label: "Chatbot que agenda citas" },
  },
  {
    icon: Check,
    titulo: "Cómo se prepara la cita",
    desc: "En ayunas o no, traer exámenes anteriores, venir acompañado, cuánto antes llegar, qué documento se necesita. Cada llamada que recibes para preguntar eso es una llamada que la página podía haber contestado, y una interrupción menos para quien esté en consulta.",
  },
  {
    icon: MapPin,
    titulo: "Sedes, horario y si atiendes particular o por convenio",
    desc: "El paciente quiere saber si le sirves antes de escribirte. Dirección con mapa y punto de referencia, horario de verdad —sábados incluidos si abres— y si atiendes particular, prepagada o convenio. Lo que no digas te lo van a preguntar por chat, y esa conversación no la cobras.",
  },
  {
    icon: Lock,
    titulo: "Los datos de un paciente no son datos cualquiera",
    desc: "La Ley 1581 de 2012 trata los datos de salud como datos sensibles: tienen protección reforzada y no se recogen sin autorización. En la práctica, en tu página eso significa un formulario que pide lo mínimo para poder llamarte —no el motivo de consulta— y una política de tratamiento de datos que existe de verdad y no es un enlace muerto en el pie.",
  },
];

/** Precios autorizados; el del chatbot sale del cotizador, que es la fuente única. */
const PRECIOS = [
  {
    q: "Página web del consultorio",
    desde: money(850000),
    plazo: "5 días",
    d: "Quién eres y qué atiendes, servicios explicados, preparación de la cita, sede con mapa, horario y el botón de WhatsApp visible desde el primer segundo.",
    href: "/servicios/diseno-de-paginas-web",
  },
  {
    q: "Chatbot que agenda citas",
    desde: money(A_PRICES.base.citas),
    plazo: "de 2 a 5 semanas",
    d: "Tu número muestra disponibilidad, agenda, confirma y recuerda la cita el día anterior. El recordatorio es lo que le baja el filo al paciente que no llega.",
    href: "/servicios/chatbot-whatsapp",
  },
  {
    q: "Software a la medida",
    desde: "Según el alcance",
    plazo: "se define al cotizar",
    d: "Cuando el problema ya no es la página sino el proceso: agenda propia con varios profesionales, control de sedes, historias clínicas. Se cotiza mirando el proceso, no adivinando.",
    href: "/servicios/software-a-la-medida",
  },
  {
    q: "Auditoría SEO",
    desde: money(390000),
    plazo: "5 días",
    d: "Ya tienes página y no apareces cuando buscan tu especialidad más tu ciudad. Te digo por qué, qué se arregla primero y qué se puede medir.",
    href: "/servicios/posicionamiento-seo",
  },
  {
    q: "SEO local, mensual",
    desde: `${money(450000)}/mes`,
    plazo: "trabajo continuo",
    d: "El trabajo continuo de aparecer en «odontólogo en Cartagena», «fisioterapia en Turbaco» o lo que sea que atiendas, con el nombre de tu ciudad al lado.",
    href: "/servicios/posicionamiento-seo",
  },
];

const FAQS = [
  {
    q: "¿Puedo poner fotos de antes y después de mis pacientes?",
    a: "Solo con la autorización escrita de esa persona, y no la doy por supuesta: la cara y el cuerpo de un paciente en un procedimiento son datos sensibles bajo la Ley 1581 de 2012. Si no tienes la autorización firmada, la foto no entra en la página. Y aunque la tengas, la foto no se acompaña de una promesa de resultado.",
  },
  {
    q: "¿La página puede guardar la historia clínica?",
    a: "No, y no debería. Una página web pública no es el lugar de una historia clínica. Si de verdad necesitas manejar historias, agenda de varios profesionales o control de sedes, eso es software a la medida: otro proyecto, otro alcance y otra conversación. Te digo cuál de los dos necesitas antes de cobrarte el equivocado.",
  },
  {
    q: "¿Agenda en línea de verdad o mejor WhatsApp?",
    a: "Depende de cómo llevas la agenda hoy. Si hoy la maneja una persona en una libreta, publicar una agenda en línea no arregla el desorden: lo expone. Casi siempre conviene empezar por la página que manda al chat con el servicio ya escogido, y de ahí subir a un chatbot que agenda y recuerda, desde " + money(A_PRICES.base.citas) + ".",
  },
  {
    q: "Soy un solo profesional, con consultorio alquilado. ¿Me sirve?",
    a: "Sí, y suele ser donde más se nota. Cuando no tienes una clínica con letrero, la página es lo que le confirma al paciente que existes, que estás donde dices y que te puede escribir. Una página web desde " + money(850000) + " y en 5 días es de las inversiones más pequeñas que vas a hacer en tu consulta.",
  },
  {
    q: "Soy odontólogo, veterinaria o fisioterapeuta. ¿Esta página es para mí?",
    a: "Sí. Cambia la especialidad, no el trabajo de la página: quién atiende, qué se atiende, cómo se pide la cita, cómo se prepara, dónde queda y cómo se tratan los datos. Los dos trabajos que tengo hechos en este sector son justamente un centro médico veterinario y un consultorio de fisioterapia.",
  },
  {
    q: "¿Me pones de primero en Google cuando busquen mi especialidad en mi ciudad?",
    a: "No te lo prometo, y desconfía del que te lo prometa. Los primeros movimientos se ven entre el mes 3 y el mes 6. Y antes de gastar en posicionamiento hay algo gratis que pesa más: la ficha de Google Business con la dirección, el horario y reseñas reales de pacientes.",
  },
  {
    q: "Ya me hicieron una página y no aparece por ningún lado. ¿La rehacemos?",
    a: "Primero la reviso. Muchas veces no hay que rehacer nada: es que en ninguna parte de la página dice la ciudad, nunca se le avisó a Google que existe y no hay una sola reseña. La auditoría cuesta desde " + money(390000) + " y en 5 días te digo qué tiene. Si lo que conviene es rehacerla, te lo digo; y si no, también.",
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
          minPrice: 450000,
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
              Al paciente le da pereza llamar y le da desconfianza un consultorio del que no
              encuentra nada. Busca tu nombre, quiere ver qué atiendes, cuánto se demora la cita y
              dónde quedas. Si eso no está en ninguna parte, escribe al que sí lo puso.
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
        <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
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
        </section>

        {/* ── Lo que no escribo en una página de salud ───────────────── */}
        <section className="mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <div className="rounded-[1.75rem] border border-primary/20 bg-gradient-to-br from-surface to-secondary/15 p-8 md:p-10">
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                Lo que no voy a escribir en tu página,
                <span className="text-metal"> aunque me lo pidas</span>
              </h2>
              <ul className="mt-7 grid gap-4">
                {[
                  "Promesas de resultado. Ni «resultados garantizados», ni «sin dolor», ni «recuperación en X días». Ni te conviene tenerlo escrito ni yo lo escribo.",
                  "Servicios que no correspondan a lo que tienes habilitado. Si el servicio no está a tu nombre en el REPS, no va en la página.",
                  "Fotos ni testimonios de pacientes sin su autorización escrita. Son datos sensibles y se tratan como tales.",
                  "Comparaciones con otros profesionales o clínicas. No hace falta bajar a nadie para explicar por qué te buscan a ti.",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-3 font-body text-lg leading-relaxed text-ink-soft">
                    <Check className="mt-1.5 h-5 w-5 shrink-0 text-primary" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-7 font-body leading-relaxed text-ink-soft">
                Y lo aplico conmigo mismo: tengo un sitio de salud terminado que{" "}
                <strong className="text-ink">no está publicado en mi portafolio</strong> porque
                todavía falta verificar la habilitación. Es incómodo tener una vitrina con un hueco,
                pero es peor mostrar algo que no se puede sostener.
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
              Los dos primeros son proyectos de estudio: los diseñé y los construí completos por
              iniciativa propia, para negocios reales de la región, y nadie me los encargó. No son
              clientes y no te los vendo como tales.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Reveal>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-7">
                <span className="w-fit rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                  Proyecto de estudio · Turbaco
                </span>
                <h3 className="mt-4 font-display text-2xl text-ink">Animal Expert</h3>
                <p className="mt-3 flex-1 font-body leading-relaxed text-ink-soft">
                  Centro médico veterinario de Turbaco: consulta especializada, cirugía, rayos X,
                  fisioterapia y vacunación, con agenda en línea. Es una clínica con todos sus
                  problemas de página —los servicios, las urgencias, el horario, quién atiende y
                  cómo se pide la cita—, solo que con pacientes de cuatro patas. Lo construí{" "}
                  <strong className="text-ink">por iniciativa propia</strong> y todavía no tiene
                  dominio conectado, así que no hay enlace que abrir.
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
                  experiencias de spa. Un consultorio y un spa en el mismo negocio, que es más común
                  de lo que parece y obliga a separar dos públicos en una sola página: el que llega
                  con una lesión y el que llega a desconectarse. Mismo caso que el anterior:
                  construido por iniciativa propia y sin dominio conectado.
                </p>
                <Link
                  href="/sectores/salones-y-spas"
                  className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  El lado de spa, en su propia página <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            </Reveal>

            <Reveal delay={160}>
              <article className="flex h-full flex-col rounded-2xl border border-primary/25 bg-gradient-to-br from-surface to-secondary/15 p-7">
                <span className="w-fit rounded-full bg-primary/12 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-primary-dark">
                  Producto propio · en línea
                </span>
                <h3 className="mt-4 font-display text-2xl text-ink">Hummik</h3>
                <p className="mt-3 flex-1 font-body leading-relaxed text-ink-soft">
                  Agenda de citas por WhatsApp: el paciente reserva desde el chat o desde un enlace,
                  la cita cae sola en el calendario y salen recordatorios contra los que no llegan.
                  Es un producto mío, no un encargo, y está publicado: lo puedes abrir y probarlo sin
                  pedirme permiso.
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

            <Reveal delay={240}>
              <article className="flex h-full flex-col rounded-2xl border border-warning/40 bg-warning/10 p-7">
                <span className="w-fit rounded-full border border-warning/50 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                  Lo que no tengo
                </span>
                <h3 className="mt-4 font-display text-2xl text-ink">
                  No tengo todavía una clínica grande
                </h3>
                <p className="mt-3 flex-1 font-body leading-relaxed text-ink-soft">
                  Ni una clínica de especialidades con varias sedes, ni un consultorio con historia
                  clínica conectada. Lo que hay es lo de arriba: un centro médico veterinario y un
                  consultorio de fisioterapia, los dos construidos completos. Si tu proyecto es más
                  grande que eso, dímelo en la llamada y te digo de frente si te sirvo o no.
                  Prefiero perder el trabajo a inventarme un caso.
                </p>
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
              , separado igual: lo que está en producción con dominio propio y lo que construí por
              mi cuenta.
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
                cubre el dominio, el alojamiento y que la página siga en pie y actualizada. Va dicho
                acá y no en una nota al pie, porque es el costo que a todo el mundo le aparece de
                sorpresa al año siguiente.
              </p>
              <p>
                Sobre el posicionamiento: los primeros movimientos se ven{" "}
                <strong className="text-ink">entre el mes 3 y el mes 6</strong>. Nadie te puede
                prometer el primer puesto en Google, ni yo tampoco. Si quieres el desglose largo,
                está en{" "}
                <Link
                  href="/blog/cuanto-cuesta-una-pagina-web-en-colombia"
                  className="font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  cuánto cuesta una página web en Colombia
                </Link>{" "}
                y{" "}
                <Link
                  href="/blog/mi-negocio-necesita-pagina-web"
                  className="font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  si tu negocio necesita página web
                </Link>
                . El trabajo mensual se cotiza aparte:{" "}
                <Link
                  href="/blog/cuanto-cuesta-el-seo-en-colombia"
                  className="font-semibold text-primary-dark underline-offset-4 hover:underline"
                >
                  cuánto cuesta el SEO en Colombia
                </Link>
                , y si además quieres que el WhatsApp confirme citas solo,{" "}
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

        {/* ── Lo que necesito para arrancar ──────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                Lo que necesito de ti para arrancar
              </h2>
              <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
                Los proyectos rara vez se demoran por el código: se demoran esperando el contenido.
                Te lo pido de una y en lista.
              </p>
              <ul className="mt-8 grid gap-3">
                {[
                  "Tu nombre completo, especialidad y número de registro profesional",
                  "Los servicios que atiendes, con el nombre técnico y el nombre común",
                  "Qué debe hacer el paciente antes de la cita, servicio por servicio",
                  "Dirección de cada sede, punto de referencia y horario real",
                  "Si atiendes particular, prepagada o por convenio",
                  "Tu política de tratamiento de datos, si ya la tienes escrita",
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
                    d: "Me cuentas qué atiendes, cómo llevas la agenda hoy y qué te preguntan siempre antes de una cita. En veinte minutos sé si esto te sirve.",
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
                    d: "Cambiar un horario, agregar un servicio, actualizar la preparación de un examen. Eso lo haces tú, sin llamarme.",
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

        {/* ── Preguntas del sector ───────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Lo que me preguntan los consultorios
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} index={i}>
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
