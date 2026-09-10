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

import { CHATBOT, TIPOS, type TipoAutomatizacion } from "@/content/paginas/chatbot";
import type { Idioma } from "@/content/types";
import { enlaceReal } from "@/lib/rutas";
import { SITE_URL } from "@/lib/site";
import { A_PRICES, money } from "@/lib/quote";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BarraMovil } from "@/components/BarraMovil";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MetaTechProvider } from "@/components/MetaTechProvider";
import { Faqs } from "@/components/Faqs";
import { HiloWhatsApp } from "@/components/visuales/HiloWhatsApp";
import { RailPlazo } from "@/components/visuales/RailPlazo";

/**
 * CHATBOT DE WHATSAPP, EN LOS DOS IDIOMAS
 * ──────────────────────────────────────────────────────────────────────────
 * Un componente para `/servicios/chatbot-whatsapp` y
 * `/en/services/whatsapp-chatbot`.
 *
 * LOS PRECIOS SALEN DE `lib/quote.ts`, que es la fuente de verdad del
 * cotizador interno. No se copian a mano al archivo de contenido: si alguien
 * sube una tarifa, sube en los dos idiomas y en la herramienta a la vez, o no
 * sube en ninguno.
 */
const GLIFOS: Record<TipoAutomatizacion, typeof MessageSquareText> = {
  faq: MessageSquareText,
  avisos: BellRing,
  leads: UserRoundSearch,
  citas: CalendarCheck,
  pedidos: ShoppingBag,
};

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
 * encima de otra la destruye.
 */
const R = 40;
const CIRC = 2 * Math.PI * R;

function RelojDelDomingo({ idioma }: { idioma: Idioma }) {
  const t = CHATBOT.reloj;
  const anillos = [
    { id: "hoy", titulo: t.hoy[idioma], horas: 10 },
    { id: "bot", titulo: t.conBot[idioma], horas: 24 },
  ];

  return (
    <div className="jv-card p-7">
      <h3 className="jv-titulo">{t.titulo[idioma]}</h3>
      <div className="mt-6 grid grid-cols-2 gap-4">
        {anillos.map((a) => {
          const arco = (a.horas / 24) * CIRC;
          return (
            <div key={a.id}>
              <svg
                viewBox="0 0 100 100"
                className="w-full"
                role="img"
                aria-label={`${a.titulo}: ${a.horas}/24`}
              >
                <defs>
                  <linearGradient id={`reloj-${idioma}-${a.id}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--brand-600)" />
                    <stop offset="100%" stopColor="var(--brand-400)" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r={R} fill="none" stroke="var(--line)" strokeWidth="11" />
                <circle
                  cx="50"
                  cy="50"
                  r={R}
                  fill="none"
                  stroke={`url(#reloj-${idioma}-${a.id})`}
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
                  {a.horas} {t.horas[idioma]}
                </text>
              </svg>
              <p className="jv-eyebrow mt-2 text-center text-accent-ink">{a.titulo}</p>
            </div>
          );
        })}
      </div>
      <p className="jv-eyebrow mt-5 text-accent-ink">{t.nota[idioma]}</p>
    </div>
  );
}

export function PaginaChatbot({ idioma, ruta }: { idioma: Idioma; ruta: string }) {
  const url = `${SITE_URL}${ruta}`;
  const mensajes = CHATBOT.hilo.mensajes[idioma];
  const horas = CHATBOT.hilo.horas[idioma];

  /* El guion del hilo: pregunta de noche, «escribiendo…», disponibilidad, el
     cliente escoge, confirmación y el traspaso a una persona. La última
     burbuja es la que quita el miedo a comprar —«¿va a sonar como un robot y
     espantarme al cliente?»—, así que va marcada aparte. */
  const hilo = [
    { de: "cliente" as const, texto: mensajes[0], hora: horas[0] },
    { de: "bot" as const, escribiendo: true },
    { de: "bot" as const, texto: mensajes[1], hora: horas[1] },
    { de: "cliente" as const, texto: mensajes[2], hora: horas[2] },
    { de: "bot" as const, texto: mensajes[3], hora: horas[3] },
    { de: "bot" as const, traspaso: true, texto: mensajes[4], hora: horas[4] },
  ];

  const faqs = CHATBOT.faq.map((f) => ({
    q: f.q[idioma],
    a: f.a[idioma].replace("{precio}", money(A_PRICES.mantenimiento.basico, idioma)),
  }));

  /* Datos estructurados de servicio. Sin FAQPage aquí a propósito: desde 2023
     Google lo restringió a sitios de gobierno y salud. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#servicio`,
    name: CHATBOT.badge[idioma],
    serviceType:
      idioma === "es" ? "Automatización de atención por WhatsApp" : "WhatsApp customer service automation",
    description: CHATBOT.entradilla[idioma],
    inLanguage: idioma,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "Country", name: "Colombia" },
      { "@type": "Place", name: idioma === "es" ? "Latinoamérica" : "Latin America" },
    ],
    url,
    offers: TIPOS.map((t) => ({
      "@type": "Offer",
      name: t.titulo[idioma],
      description: t.cuerpo[idioma],
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
      <Header idioma={idioma} />
      <main id="contenido">
        {/* ── Encabezado ──────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-6 pb-8 pt-32 text-center md:px-12 md:pt-40">
          <Reveal>
            <Badge>{CHATBOT.badge[idioma]}</Badge>
            <h1 className="mt-6 text-[length:var(--text-hero)]">
              {/* El espacio explícito importa: sin él, el textContent que lee un
                  rastreador queda «contesta solo:responde». */}
              {CHATBOT.titulo[idioma]}{" "}
              <span className="block text-brand">{CHATBOT.tituloAcento[idioma]}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft">
              {CHATBOT.entradilla[idioma]}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href={enlaceReal(idioma === "es" ? "/#agenda" : "/en#agenda")}>
                  {CHATBOT.ctaPrincipal[idioma]} <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#precios">{CHATBOT.ctaSecundario[idioma]}</a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mx-auto mt-10 max-w-3xl">
              <MetaTechProvider idioma={idioma} />
            </div>
          </Reveal>
        </section>

        {/* ── El diferenciador, arriba y no enterrado ─────────────────── */}
        <section className="mx-auto max-w-4xl px-6 py-12 md:px-12">
          <Reveal>
            <div className="jv-card p-8 md:p-10">
              <h2 className="text-[length:var(--text-display)]">
                {CHATBOT.diferenciador.titulo[idioma]}{" "}
                <span className="text-brand">{CHATBOT.diferenciador.acento[idioma]}</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                {CHATBOT.diferenciador.parrafo1[idioma]}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                <strong className="text-ink">{CHATBOT.diferenciador.fuerte[idioma]}</strong>
                {CHATBOT.diferenciador.parrafo2[idioma]}
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── Para quién es ──────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">
              {CHATBOT.paraQuienTitulo[idioma]}
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {CHATBOT.paraQuien.map((p, i) => (
              <Reveal key={p.titulo.es} delay={i * 80}>
                <article className="jv-card jv-card-int h-full p-7">
                  <h3 className="jv-titulo">{p.titulo[idioma]}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{p.cuerpo[idioma]}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={160} className="mx-auto mt-5 block max-w-lg">
            <RelojDelDomingo idioma={idioma} />
          </Reveal>
        </section>

        {/* ── Qué se puede automatizar · precios ──────────────────────── */}
        <section id="precios" className="mx-auto max-w-6xl scroll-mt-32 px-6 py-12 md:px-12">
          <Reveal>
            <Badge>{CHATBOT.precios.badge[idioma]}</Badge>
            <h2 className="mt-6 text-[length:var(--text-display)]">
              {CHATBOT.precios.titulo[idioma]}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {CHATBOT.precios.entradilla[idioma]}
            </p>
          </Reveal>

          {/* Así suena, con las palabras exactas. Trae escalonado propio; no va
              dentro de otro Reveal. */}
          <HiloWhatsApp
            idioma={idioma}
            className="mx-auto mt-10 max-w-md"
            negocio={CHATBOT.hilo.negocio[idioma]}
            iniciales={CHATBOT.hilo.iniciales}
            mensajes={hilo}
          />

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TIPOS.map((t, i) => {
              const Glifo = GLIFOS[t.key];
              return (
                <Reveal key={t.key} delay={i * 70}>
                  <article className="jv-card jv-card-int flex h-full flex-col p-7">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-quiet text-brand">
                      <Glifo className="h-6 w-6" strokeWidth={2} />
                    </span>
                    <h3 className="jv-titulo mt-5">{t.titulo[idioma]}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                      {t.cuerpo[idioma]}
                    </p>
                    <p className="jv-rule mt-5 pt-4 font-mono text-lg text-brand">
                      {CHATBOT.precios.desde[idioma]} {money(A_PRICES.base[t.key], idioma)}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <div className="jv-card mt-6 p-7">
              <p className="leading-relaxed text-ink-soft">
                <strong className="text-ink">{CHATBOT.precios.aclaracionTitulo[idioma]}</strong>
                {CHATBOT.precios.aclaracion1[idioma]}
              </p>
              <p className="mt-4 leading-relaxed text-ink-soft">
                {CHATBOT.precios.aclaracion2Antes[idioma]}
                <strong className="text-ink">
                  {money(A_PRICES.mantenimiento.basico, idioma)}
                  {CHATBOT.precios.alMes[idioma]}
                </strong>
                {CHATBOT.precios.aclaracion2Despues[idioma]}
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── Qué incluye · cómo se hace ─────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{CHATBOT.incluyeTitulo[idioma]}</h2>
            <ul className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-x-8">
              {CHATBOT.incluye[idioma].map((x) => (
                <li key={x} className="flex items-start gap-3 text-ink-soft">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-brand" strokeWidth={2} aria-hidden />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="mt-14 text-[length:var(--text-display)]">
              {CHATBOT.procesoTitulo[idioma]}
            </h2>
            {/* El tramo punteado dice lo que nadie pregunta y todo el mundo
                asume: el reloj no arranca al aceptar la propuesta. */}
            <RailPlazo
              className="mt-8"
              previo={{
                etiqueta: CHATBOT.previo.etiqueta[idioma],
                texto: CHATBOT.previo.texto[idioma],
              }}
              hitos={CHATBOT.proceso.map((p) => ({
                etiqueta: p.etiqueta[idioma],
                texto: p.texto[idioma],
              }))}
            />
            <p className="jv-chip jv-chip-off mt-8 gap-2 text-sm">
              <Clock className="h-4 w-4 text-brand" strokeWidth={2} aria-hidden />
              {CHATBOT.plazo[idioma]}
            </p>
          </Reveal>
        </section>

        {/* ── Preguntas ──────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{CHATBOT.faqTitulo[idioma]}</h2>
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <Faqs items={faqs} />
          </Reveal>
        </section>

        {/* ── Cierre ─────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-6 py-16 text-center md:px-12 md:py-24">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{CHATBOT.cierre.titulo[idioma]}</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              {CHATBOT.cierre.cuerpo[idioma]}
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href={enlaceReal(idioma === "es" ? "/#agenda" : "/en#agenda")}>
                  {CHATBOT.ctaPrincipal[idioma]} <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={enlaceReal(idioma === "es" ? "/#servicios" : "/en#servicios")}>
                  {CHATBOT.cierre.otros[idioma]}
                </Link>
              </Button>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer idioma={idioma} />
      <WhatsAppButton idioma={idioma} />
      <BarraMovil idioma={idioma} />
    </>
  );
}
