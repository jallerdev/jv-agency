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
import { Faqs } from "@/components/Faqs";
import { sinPendientes } from "@/components/Pendiente";
import { HiloWhatsApp } from "@/components/visuales/HiloWhatsApp";
import { RailPlazo } from "@/components/visuales/RailPlazo";
import { SITE_URL } from "@/lib/site";
import { A_PRICES, A_TYPE_LABEL, A_TYPE_DESC, money } from "@/lib/quote";

/**
 * Página de servicio para la intención transaccional «chatbot de WhatsApp».
 *
 * Existe por un hallazgo concreto de la investigación de septiembre de 2026:
 * la palabra «chatbot» no aparecía NI UNA VEZ en todo el sitio, mientras el
 * mercado colombiano busca exactamente eso — los competidores que salen
 * primeros se llaman Chatbot Colombia, Bots Colombia, Botiffy. Estaba
 * vendiendo el producto correcto con el nombre equivocado.
 *
 * El título y la descripción salen del mapa de `SEO-INTENCIONES-DE-COMPRA.md`.
 */
export const metadata: Metadata = {
  title: "Chatbot de WhatsApp para empresas en Colombia | JV Agencia",
  description:
    "Chatbot de WhatsApp que contesta solo, capta interesados, agenda citas y toma pedidos. Soy proveedor de tecnología verificado por Meta: la conexión la hago yo, sin intermediarios.",
  alternates: { canonical: "/servicios/chatbot-whatsapp" },
  openGraph: {
    title: "Chatbot de WhatsApp para empresas en Colombia | JV Agencia",
    description:
      "Tu WhatsApp contesta solo, a cualquier hora. Proveedor de tecnología verificado por Meta.",
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
    desc: "El ida y vuelta de «¿a qué hora tiene?» se come la mañana.",
  },
  {
    titulo: "Tomas pedidos por WhatsApp",
    desc: "Y los anotas en una libreta o en las notas del teléfono, con el riesgo que eso tiene.",
  },
];

const INCLUYE = [
  "Conexión de tu número a la plataforma oficial de WhatsApp Business",
  "Diseño del flujo de conversación, escrito con tus palabras y no con las mías",
  "Dos plantillas de mensaje aprobadas ante Meta",
  "Traspaso a una persona cuando la conversación se complica",
  "Panel para ver las conversaciones y lo que el bot no supo contestar",
  "Capacitación de entrega y 30 días de ajustes sin costo",
];

/* El proceso, en la forma del rail: una línea por paso. Antes eran cuatro
   títulos con su párrafo debajo; el paso 03 lo enseña ahora el hilo de
   WhatsApp de más arriba, así que contarlo otra vez sobraba. */
const PROCESO = [
  { etiqueta: "Paso 01", texto: "Leo una semana de tus chats. No invento preguntas: miro lo que te escriben." },
  { etiqueta: "Paso 02", texto: "Conecto tu número con Meta. Sigue siendo tuyo y no cambia." },
  { etiqueta: "Paso 03", texto: "Escribo el flujo y lo pruebas conmigo, antes de que lo vea un cliente." },
  { etiqueta: "Paso 04", texto: "Sale al aire. Lo que el bot no supo contestar se revisa y se le enseña." },
];

/* El hilo que se pinta en la sección de precios. El guion es el de esta
   página —cita pedida de noche— y la última burbuja es el traspaso, que es
   la objeción real: «¿va a sonar como un robot y espantarme al cliente?». */
const HILO = [
  { de: "cliente" as const, texto: "Buenas, ¿tienen cita para mañana?", hora: "9:41 p. m." },
  { de: "bot" as const, escribiendo: true },
  {
    de: "bot" as const,
    texto: "¡Hola! Sí. Mañana me quedan 9:00 a. m., 11:30 a. m. y 4:00 p. m. ¿Cuál te sirve?",
    hora: "9:41 p. m.",
  },
  { de: "cliente" as const, texto: "La de 11:30", hora: "9:42 p. m." },
  {
    de: "bot" as const,
    texto: "Listo, te aparté mañana 11:30 a. m. Te llega un recordatorio dos horas antes.",
    hora: "9:42 p. m.",
  },
  {
    de: "bot" as const,
    traspaso: true,
    texto: "Si necesitas otra cosa, mañana a primera hora te escribe una persona del equipo.",
    hora: "9:42 p. m.",
  },
];

/**
 * EL RELOJ DEL DOMINGO — dos anillos de 24 horas.
 *
 * «El que escribe a las 9 p. m. y no recibe respuesta, a las 9:05 ya le
 * escribió a otro» es la mejor línea de la página y hasta hoy iba sola. El
 * hueco del anillo ES el argumento: se entiende en medio segundo y no inventa
 * ni una cifra —el horario de mostrador va rotulado como supuesto—.
 *
 * SVG puro, sin estado y sin keyframes: nada que apagar bajo movimiento
 * reducido. NO se apila a 390: la comparación es el contenido y una dona
 * encima de otra la destruye. A 390 quedan ~139 px por anillo, de sobra.
 */
const R = 40;
const CIRC = 2 * Math.PI * R;
const ANILLOS = [
  { id: "hoy", titulo: "Hoy", horas: 10 },
  { id: "bot", titulo: "Con el bot", horas: 24 },
];

function RelojDelDomingo() {
  return (
    <div className="rounded-2xl border border-line bg-surface/70 p-7">
      <h3 className="font-display text-xl text-ink">Las horas en que tu WhatsApp contesta</h3>
      <div className="mt-6 grid grid-cols-2 gap-4">
        {ANILLOS.map((a) => {
          const arco = (a.horas / 24) * CIRC;
          return (
            <div key={a.id}>
              <svg
                viewBox="0 0 100 100"
                className="w-full"
                role="img"
                aria-label={`${a.titulo}: contesta ${a.horas} de 24 horas`}
              >
                <defs>
                  <linearGradient id={`reloj-${a.id}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#985C3E" />
                    <stop offset="100%" stopColor="#C0763B" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r={R} fill="none" stroke="#E4D8CB" strokeWidth="11" />
                <circle
                  cx="50"
                  cy="50"
                  r={R}
                  fill="none"
                  stroke={`url(#reloj-${a.id})`}
                  strokeWidth="11"
                  strokeDasharray={`${arco} ${CIRC - arco}`}
                  transform="rotate(-90 50 50)"
                />
                <text
                  x="50"
                  y="50"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="19"
                  className="fill-ink font-mono"
                >
                  {a.horas} h
                </text>
              </svg>
              <p className="mt-2 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-accent-ink">
                {a.titulo}
              </p>
            </div>
          );
        })}
      </div>
      <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent-ink">
        Ejemplo · mostrador de 8 a 6
      </p>
    </div>
  );
}

const FAQS = [
  {
    q: "¿Reemplaza a alguien de mi equipo?",
    a: "No, y no te lo vendo así. Filtra: contesta lo repetido y te pasa a ti las conversaciones que valen la pena. Lo que recuperas son horas, no un sueldo.",
  },
  {
    q: "¿Tengo que cambiar de número?",
    a: "No. Se conecta tu número actual de WhatsApp Business: sigue siendo tuyo y sigues escribiendo desde el teléfono.",
  },
  {
    q: "¿Cuánto cuestan las conversaciones?",
    a: "Eso lo cobra Meta directamente a tu cuenta, con tu propio medio de pago. Yo cobro por construirlo y mantenerlo, no por las conversaciones.",
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
    // El precio sale de A_PRICES, que es la fuente de verdad del cotizador.
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
              {/* El espacio explícito importa: sin él, el textContent del h1 que
                  lee un rastreador queda «contesta solo:responde». */}
              Tu WhatsApp contesta solo:{" "}
              <span className="block text-metal">responde, agenda y vende</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Aquí la gente le escribe a un negocio antes que llamarlo o llenarle un
              formulario. El que contesta primero, vende: un chatbot hace que ese primero seas
              tú, a cualquier hora.
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
        <section className="banda mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <div className="rounded-[1.75rem] border border-primary/20 bg-gradient-to-br from-surface to-secondary/15 p-8 md:p-10">
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                Casi todos te revenden una plataforma.
                <span className="text-metal"> Yo conecto directo.</span>
              </h2>
              <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
                La mayoría de agencias en Colombia no está conectada a Meta: te revende el
                servicio de un tercero. Si ese tercero sube el precio o cierra, quedas colgado y
                ellos no pueden hacer nada.
              </p>
              <p className="mt-4 font-body text-lg leading-relaxed text-ink-soft">
                <strong className="text-ink">
                  Soy proveedor de tecnología verificado por Meta.
                </strong>{" "}
                La conexión de tu número la hago yo, sin intermediario. Es verificable —no es un
                sello que me puse solo.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── Para quién es ──────────────────────────────────────────── */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
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
          <Reveal delay={160} className="mx-auto mt-5 block max-w-lg">
            <RelojDelDomingo />
          </Reveal>
        </section>

        {/* ── Qué se puede automatizar · precios ──────────────────────── */}
        <section id="precios" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-12 md:px-8">
          <Reveal>
            <Badge>Precios</Badge>
            <h2 className="mt-6 font-display text-3xl text-ink sm:text-4xl">
              Qué se puede automatizar
            </h2>
            <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Precios de referencia. Puedes empezar por lo más simple y crecer después, sin
              rehacer lo hecho.
            </p>
          </Reveal>

          {/* Así suena, con las palabras exactas. La última burbuja no es del
              bot: es el traspaso a una persona, que es lo que quita el miedo
              a comprar. Trae escalonado propio; no va dentro de otro Reveal. */}
          <HiloWhatsApp
            className="mx-auto mt-10 max-w-md"
            negocio="Salón de ejemplo"
            iniciales="SE"
            mensajes={HILO}
          />

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
                <strong className="text-ink">Una aclaración de entrada:</strong> el consumo de la
                API lo cobra <strong className="text-ink">Meta</strong> directamente a tu cuenta,
                con tu propio medio de pago. No está en estos precios porque no lo facturo yo:
                depende de cuántas conversaciones tengas.
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

        {/* ── Qué incluye · cómo se hace ─────────────────────────────── */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Qué incluye, en cualquiera de los cinco
            </h2>
            <ul className="mt-8 grid gap-3 md:grid-cols-2 md:gap-x-8">
              {INCLUYE.map((x) => (
                <li key={x} className="flex items-start gap-3 font-body text-ink-soft">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="mt-14 font-display text-3xl text-ink sm:text-4xl">Cómo se hace</h2>
            {/* El tramo punteado dice lo que nadie pregunta y todo el mundo
                asume: el reloj no arranca al aceptar la propuesta. */}
            <RailPlazo
              className="mt-8"
              previo={{
                etiqueta: "Antes del paso 01",
                texto: "Tu número de WhatsApp Business y una semana de chats. El reloj no ha arrancado.",
              }}
              hitos={PROCESO}
            />
            <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-4 py-2 font-body text-sm text-ink-soft">
              <Clock className="h-4 w-4 text-accent" aria-hidden="true" />
              De 1 a 5 semanas, según lo que necesites
            </p>
          </Reveal>
        </section>

        {/* ── Preguntas ──────────────────────────────────────────────── */}
        <section className="banda mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Lo que siempre preguntan</h2>
          </Reveal>
          <Reveal delay={80} className="mt-10">
            {/* Mismo acordeon que la portada. Antes eran tarjetas siempre
                abiertas: seis respuestas largas seguidas que habia que
                atravesar para llegar al cierre. */}
            <Faqs items={sinPendientes(FAQS)} />
          </Reveal>
        </section>

        {/* ── Cierre ─────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 py-16 text-center md:px-8 md:py-24">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Cuéntame qué te preguntan todo el día
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-body text-lg leading-relaxed text-ink-soft">
              Veinte minutos bastan para saber si te sirve, cuánto costaría y en cuánto quedaría
              funcionando. Si no te sirve, te lo digo.
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
            <p className="mx-auto mt-8 max-w-xl font-body text-base leading-relaxed text-ink-soft">
              ¿Comparando presupuestos? Está la cuenta en{" "}
              <Link
                href="/blog/cuanto-cuesta-un-chatbot-de-whatsapp-en-colombia"
                className="text-primary-dark underline underline-offset-4"
              >
                cuánto cuesta un chatbot de WhatsApp en Colombia
              </Link>
              . El chatbot contesta; lo que le da algo que mostrar es la página, y eso es{" "}
              <Link
                href="/servicios/diseno-de-paginas-web"
                className="text-primary-dark underline underline-offset-4"
              >
                diseño de páginas web
              </Link>{" "}
              o, si vendes producto,{" "}
              <Link
                href="/servicios/tiendas-virtuales"
                className="text-primary-dark underline underline-offset-4"
              >
                creación de tiendas virtuales
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
