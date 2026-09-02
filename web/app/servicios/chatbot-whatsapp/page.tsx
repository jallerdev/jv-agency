import type { Metadata } from "next";
import Link from "next/link";
import {
  MessageSquareText,
  CalendarCheck,
  ShoppingBag,
  BellRing,
  UserRoundSearch,
  ArrowRight,
  Check,
  Clock,
} from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MetaTechProvider } from "@/components/MetaTechProvider";
import { SITE_URL } from "@/lib/site";
import { A_PRICES, A_TYPE_LABEL, A_TYPE_DESC, money } from "@/lib/quote";

/**
 * Página de servicio para la intención transaccional «chatbot de WhatsApp».
 *
 * Existe por un hallazgo concreto de la investigación de septiembre de 2026:
 * la palabra «chatbot» no aparecía NI UNA VEZ en todo el sitio, mientras el
 * mercado colombiano busca exactamente eso — los competidores que salen
 * primeros se llaman Chatbot Colombia, Bots Colombia, Botiffy. Estábamos
 * vendiendo el producto correcto con el nombre equivocado.
 *
 * El título y la descripción salen del mapa de `SEO-INTENCIONES-DE-COMPRA.md`.
 */
export const metadata: Metadata = {
  title: "Chatbot de WhatsApp para empresas en Colombia | JV Agencia",
  description:
    "Chatbot de WhatsApp que contesta solo, capta interesados, agenda citas y toma pedidos. Somos proveedor de tecnología verificado por Meta: la conexión la hacemos nosotros, sin intermediarios.",
  alternates: { canonical: "/servicios/chatbot-whatsapp" },
  openGraph: {
    title: "Chatbot de WhatsApp para empresas en Colombia | JV Agencia",
    description:
      "Su número contesta solo, a cualquier hora. Proveedor de tecnología verificado por Meta.",
    url: `${SITE_URL}/servicios/chatbot-whatsapp`,
    type: "website",
  },
};

const TIPOS = [
  { key: "faq" as const, icon: MessageSquareText },
  { key: "avisos" as const, icon: BellRing },
  { key: "leads" as const, icon: UserRoundSearch },
  { key: "citas" as const, icon: CalendarCheck },
  { key: "pedidos" as const, icon: ShoppingBag },
];

const PARA_QUIEN = [
  {
    titulo: "Vives contestando lo mismo",
    desc: "Horarios, precios, dónde quedas, si hay domicilio. Diez veces al día, todos los días.",
  },
  {
    titulo: "Se te pierden mensajes de noche y los domingos",
    desc: "El que escribe a las 9 p. m. y no recibe respuesta, a las 9:05 ya le escribió a otro.",
  },
  {
    titulo: "Agendas citas por chat",
    desc: "Clínicas, salones, talleres, consultorios. El ida y vuelta de «¿a qué hora tiene?» se come la mañana.",
  },
  {
    titulo: "Tomas pedidos por WhatsApp",
    desc: "Y los vas anotando en una libreta o en las notas del teléfono, con el riesgo que eso tiene.",
  },
];

const INCLUYE = [
  "Conexión de tu número a la plataforma oficial de WhatsApp Business",
  "Diseño del flujo de conversación, escrito con tus palabras y no con las nuestras",
  "Dos plantillas de mensaje aprobadas ante Meta",
  "Traspaso a una persona cuando la conversación se complica",
  "Panel para ver las conversaciones y lo que el bot no supo contestar",
  "Capacitación de entrega y 30 días de ajustes sin costo",
];

const PROCESO = [
  {
    n: "01",
    t: "Escuchamos una semana de tus chats",
    d: "No inventamos preguntas. Miramos lo que de verdad te escriben y qué contestas hoy.",
  },
  {
    n: "02",
    t: "Conectamos tu número",
    d: "Nosotros hacemos la conexión con Meta. Tu número sigue siendo tuyo y no cambia.",
  },
  {
    n: "03",
    t: "Escribimos el flujo y lo probamos contigo",
    d: "Lo ves funcionando y nos dices qué suena raro, antes de que lo vea un cliente.",
  },
  {
    n: "04",
    t: "Sale al aire y lo vamos ajustando",
    d: "Las preguntas que el bot no supo contestar se revisan y se le enseñan.",
  },
];

const FAQS = [
  {
    q: "¿Reemplaza a alguien de mi equipo?",
    a: "No, y no lo vendemos así. Filtra: contesta lo repetido y te pasa a ti las conversaciones que valen la pena. Lo que recuperas son horas, no un sueldo.",
  },
  {
    q: "¿Tengo que cambiar de número?",
    a: "No. Se conecta tu número actual de WhatsApp Business. Sigue siendo tuyo y sigues pudiendo escribir desde el teléfono.",
  },
  {
    q: "¿Cuánto cuestan las conversaciones?",
    a: "Eso lo cobra Meta directamente a tu cuenta, con tu propio medio de pago. Nosotros cobramos por construirlo y mantenerlo, no por las conversaciones. Lo decimos desde el principio para que no aparezca como sorpresa después.",
  },
  {
    q: "¿En cuánto tiempo queda funcionando?",
    a: "Entre 1 y 5 semanas según lo que necesites: unas respuestas automáticas salen en 2 semanas; un sistema de pedidos con catálogo toma 5.",
  },
  {
    q: "¿Y si el bot no sabe contestar algo?",
    a: "Pasa la conversación a una persona. Además queda registrado, para enseñarle esa respuesta y que la próxima vez la sepa.",
  },
  {
    q: "¿Necesito un plan mensual?",
    a: "Es muy recomendable. Una automatización queda corriendo y hay cosas que se vencen solas: si expira el token de Meta o rechazan una plantilla, deja de responder y nadie se entera hasta que un cliente reclama. Los planes empiezan en " + money(A_PRICES.mantenimiento.basico) + " al mes.",
  },
];

export default function ChatbotWhatsappPage() {
  // Datos estructurados de servicio. Sin FAQPage a propósito: desde 2023 Google
  // lo restringió a sitios de gobierno y salud, y usarlo aquí no da resultado
  // enriquecido.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/servicios/chatbot-whatsapp#servicio`,
    name: "Chatbot de WhatsApp para empresas",
    alternateName: ["Automatización de WhatsApp", "Bot de WhatsApp", "WhatsApp Business API"],
    serviceType: "Automatización de atención por WhatsApp",
    description:
      "Diseño, conexión y mantenimiento de chatbots sobre la WhatsApp Business Platform: respuestas automáticas, captación de interesados, agendamiento de citas, pedidos y avisos.",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "Country", name: "Colombia" },
      { "@type": "Place", name: "Latinoamérica" },
    ],
    url: `${SITE_URL}/servicios/chatbot-whatsapp`,
    offers: TIPOS.map((t) => ({
      "@type": "Offer",
      name: A_TYPE_LABEL[t.key],
      description: A_TYPE_DESC[t.key],
      price: A_PRICES.base[t.key],
      priceCurrency: "COP",
      availability: "https://schema.org/InStock",
    })),
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
            <Badge>Chatbot de WhatsApp</Badge>
            <h1 className="mt-6 font-display text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
              Su número contesta solo:
              <span className="block text-metal">responde, agenda y vende</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Colombia es el país que más usa WhatsApp en el mundo, y aquí la gente prefiere
              escribirle a un negocio antes que llamar o llenar un formulario. El que contesta
              primero, vende. Un chatbot hace que ese primero seas tú, a cualquier hora.
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
                <a href="#precios">Ver precios</a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mx-auto mt-10 max-w-3xl">
              <MetaTechProvider />
            </div>
          </Reveal>
        </section>

        {/* ── El diferenciador, arriba y no enterrado ─────────────────── */}
        <section className="mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <div className="rounded-[1.75rem] border border-primary/20 bg-gradient-to-br from-surface to-secondary/15 p-8 md:p-10">
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                Casi todos te revenden una plataforma.
                <span className="text-metal"> Nosotros conectamos directo.</span>
              </h2>
              <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
                La mayoría de agencias en Colombia no está conectada a Meta: te revenden el
                servicio de un tercero. Si ese tercero sube el precio, cambia las reglas o cierra,
                tú quedas colgado y ellos no pueden hacer nada.
              </p>
              <p className="mt-4 font-body text-lg leading-relaxed text-ink-soft">
                <strong className="text-ink">
                  J&amp;V es proveedor de tecnología verificado por Meta.
                </strong>{" "}
                La conexión de tu número la hacemos nosotros, sin intermediario. Es verificable —
                no es un sello que nos pusimos solos.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── Para quién es ──────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Esto te sirve si te pasa alguna de estas
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {PARA_QUIEN.map((p, i) => (
              <Reveal key={p.titulo} delay={i * 80}>
                <article className="h-full rounded-2xl border border-line bg-surface/70 p-7">
                  <h3 className="font-display text-xl text-ink">{p.titulo}</h3>
                  <p className="mt-2 font-body leading-relaxed text-ink-soft">{p.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Qué se puede automatizar · precios ──────────────────────── */}
        <section id="precios" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-12 md:px-8">
          <Reveal>
            <Badge>Precios</Badge>
            <h2 className="mt-6 font-display text-3xl text-ink sm:text-4xl">
              Qué se puede automatizar
            </h2>
            <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Precios de referencia del proyecto. Se puede empezar por lo más simple y crecer
              después, sin rehacer lo hecho.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TIPOS.map((t, i) => {
              const Icon = t.icon;
              return (
                <Reveal key={t.key} delay={i * 70}>
                  <article className="flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-7">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-surface shadow-soft">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-display text-xl text-ink">{A_TYPE_LABEL[t.key]}</h3>
                    <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-ink-soft">
                      {A_TYPE_DESC[t.key]}
                    </p>
                    <p className="mt-5 border-t border-line pt-4 font-mono text-lg text-primary-dark">
                      desde {money(A_PRICES.base[t.key])}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <div className="mt-6 rounded-2xl border border-line bg-background/40 p-7">
              <p className="font-body leading-relaxed text-ink-soft">
                <strong className="text-ink">Una aclaración que hacemos siempre, de entrada:</strong>{" "}
                el consumo de la API de WhatsApp lo cobra <strong className="text-ink">Meta</strong>{" "}
                directamente a tu cuenta, con tu propio medio de pago. No está en estos precios
                porque no lo facturamos nosotros — depende de cuántas conversaciones tengas.
              </p>
              <p className="mt-4 font-body leading-relaxed text-ink-soft">
                Y el plan de mantenimiento va aparte, desde{" "}
                <strong className="text-ink">{money(A_PRICES.mantenimiento.basico)} al mes</strong>.
                Sin plan, si expira el token de Meta o rechazan una plantilla, la automatización
                deja de responder y nadie se entera.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── Qué incluye ────────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                Qué incluye, en cualquiera de los cinco
              </h2>
              <ul className="mt-8 grid gap-3">
                {INCLUYE.map((x) => (
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
                {PROCESO.map((p) => (
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
                De 1 a 5 semanas, según lo que necesites
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Preguntas ──────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Lo que siempre preguntan</h2>
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
              Cuéntanos qué te preguntan todo el día
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-body text-lg leading-relaxed text-ink-soft">
              En una llamada de veinte minutos sabemos si esto te sirve, cuánto costaría y en
              cuánto quedaría funcionando. Si no te sirve, te lo decimos.
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href="/#contacto">
                  Agenda una llamada <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/#servicios">Ver los demás servicios</Link>
              </Button>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
