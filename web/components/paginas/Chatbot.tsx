import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { CHATBOT, TIPOS, type TipoAutomatizacion } from "@/content/paginas/chatbot";
import type { Idioma } from "@/content/types";
import { enlaceReal } from "@/lib/rutas";
import { SITE_URL } from "@/lib/site";
import { A_PRICES, catalogo, money } from "@/lib/quote";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BarraMovil } from "@/components/BarraMovil";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Pendiente, MOSTRAR_PENDIENTES } from "@/components/Pendiente";
import { MetaTechProvider } from "@/components/MetaTechProvider";
import { PageHero } from "@/components/kit/PageHero";
import { ContrastBlock } from "@/components/kit/ContrastBlock";
import { PainGrid } from "@/components/kit/PainGrid";
import { PriceCard } from "@/components/kit/Precio";
import { FaqAccordion } from "@/components/kit/FaqAccordion";
import { FinalCTA, NextStep } from "@/components/kit/FinalCTA";
import { SectionIndex } from "@/components/kit/SectionIndex";
import { ConexionDirecta } from "@/components/visuales/ConexionDirecta";
import { Reloj24 } from "@/components/visuales/Reloj24";
import { SimuladorChat, type Automatizacion } from "@/components/visuales/SimuladorChat";
import type { MensajeHilo } from "@/components/visuales/HiloWhatsApp";
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
 *
 * QUÉ CAMBIÓ EN LA FASE 2, Y POR QUÉ
 * ----------------------------------
 * Era la página con más `nested-cards` del sitio —seis: tarjeta dentro de
 * tarjeta— y el sello de Meta, que es la única credencial verificable que
 * tiene el negocio, era un bloque más en mitad del texto. Ahora:
 *
 * · El sello abre la página, en la columna derecha del hero.
 * · El diferenciador se DIBUJA: tu número → un tercero → Meta, frente a tu
 *   número → Meta. El eslabón del medio se tacha al entrar en vista.
 * · Las dos donas del reloj pasaron a una sola esfera de 24 horas, con el
 *   marcador a las 9:41 p. m. —la hora de la conversación de ejemplo—.
 * · Pieza firma: las cinco automatizaciones a la izquierda y el teléfono a la
 *   derecha reproduciendo el guion de la que se esté mirando.
 * · Las notas de costo dejaron de ser un párrafo y son dos estados: con plan y
 *   sin plan.
 */
/** El horario de mostrador del ejemplo, y la hora del marcador del reloj. */
const ABRE = 8;
const CIERRA = 18;
const MARCADOR = 21 + 41 / 60;

export function PaginaChatbot({ idioma, ruta }: { idioma: Idioma; ruta: string }) {
  const url = `${SITE_URL}${ruta}`;
  const es = idioma === "es";
  const mensajes = CHATBOT.hilo.mensajes[idioma];
  const horas = CHATBOT.hilo.horas[idioma];

  /* El guion de citas: pregunta de noche, «escribiendo…», disponibilidad, el
     cliente escoge, confirmación y el traspaso a una persona. La última
     burbuja es la que quita el miedo a comprar —«¿va a sonar como un robot y
     espantarme al cliente?»—, así que va marcada aparte. */
  const hiloCitas: MensajeHilo[] = [
    { de: "cliente", texto: mensajes[0], hora: horas[0] },
    { de: "bot", escribiendo: true },
    { de: "bot", texto: mensajes[1], hora: horas[1] },
    { de: "cliente", texto: mensajes[2], hora: horas[2] },
    { de: "bot", texto: mensajes[3], hora: horas[3] },
    { de: "bot", traspaso: true, texto: mensajes[4], hora: horas[4] },
  ];

  /**
   * Los otros cuatro guiones. Alternan cliente y bot empezando por quien abre
   * la conversación: en «avisos» abre el negocio —es un aviso, no una
   * pregunta—, y en los otros tres abre el cliente.
   *
   * Las horas son las mismas de la conversación de ejemplo: todas las
   * conversaciones de esta página pasan la misma noche, a la hora en la que
   * nadie contesta. Es el argumento de la sección de arriba.
   */
  const guionDe = (clave: Exclude<TipoAutomatizacion, "citas">): MensajeHilo[] => {
    const g = CHATBOT.guiones[clave];
    const textos = g.mensajes[idioma];
    const abreElNegocio = clave === "avisos";

    return textos.map((texto, i) => {
      const delBot = abreElNegocio ? i % 2 === 0 : i % 2 === 1;
      return {
        de: delBot ? ("bot" as const) : ("cliente" as const),
        texto,
        hora: horas[Math.min(i, horas.length - 1)],
        /* La última del guion de interesados es un traspaso a una persona, y
           esa es la promesa honesta de la página: filtra, no reemplaza. */
        traspaso: clave === "leads" && i === textos.length - 1,
      };
    });
  };

  const automatizaciones: Automatizacion[] = TIPOS.map((t) => {
    const esCitas = t.key === "citas";
    const g = CHATBOT.guiones[t.key];
    return {
      clave: t.key,
      titulo: t.titulo[idioma],
      cuerpo: t.cuerpo[idioma],
      precio: `${CHATBOT.precios.desde[idioma]} ${money(A_PRICES.base[t.key], idioma)}`,
      hilo: esCitas ? hiloCitas : guionDe(t.key as Exclude<TipoAutomatizacion, "citas">),
      negocio: g.negocio[idioma],
      iniciales: g.iniciales,
      aprobado: g.aprobado,
    };
  });

  const sinAprobar = automatizaciones.filter((a) => !a.aprobado).map((a) => a.titulo);

  const faqs = CHATBOT.faq.map((f) => ({
    q: f.q[idioma],
    a: f.a[idioma].replace("{precio}", money(A_PRICES.mantenimiento.basico, idioma)),
    grupo: f.grupo,
  }));
  const gruposFaq = CHATBOT.faqGrupos.map((g) => ({
    titulo: g.titulo[idioma],
    items: faqs.filter((f) => f.grupo === g.clave),
  })).filter((g) => g.items.length > 0);

  /* Datos estructurados de servicio. Sin FAQPage aquí a propósito: desde 2023
     Google lo restringió a sitios de gobierno y salud. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#servicio`,
    name: CHATBOT.badge[idioma],
    serviceType: es
      ? "Automatización de atención por WhatsApp"
      : "WhatsApp customer service automation",
    description: CHATBOT.entradilla[idioma],
    inLanguage: idioma,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "Country", name: "Colombia" },
      { "@type": "Place", name: es ? "Latinoamérica" : "Latin America" },
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

  const indice = [
    { id: "conexion", texto: es ? "Conexión directa" : "Direct connection" },
    { id: "problemas", texto: es ? "Para quién es" : "Who it's for" },
    { id: "automatizar", texto: es ? "Qué se automatiza" : "What gets automated" },
    { id: "precio", texto: es ? "Precio y plan" : "Price and plan" },
    { id: "incluye", texto: es ? "Qué incluye" : "What's included" },
    { id: "proceso", texto: es ? "Cómo se hace" : "How it's done" },
    { id: "preguntas", texto: es ? "Preguntas" : "Questions" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header idioma={idioma} />
      <main id="contenido">
        <PageHero
          variante="servicio"
          idioma={idioma}
          migas={[{ texto: CHATBOT.badge[idioma] }]}
          titulo={
            <>
              {/* El espacio explícito importa: sin él, el textContent que lee un
                  rastreador queda «contesta solo:responde». */}
              {CHATBOT.titulo[idioma]}{" "}
              <span className="block text-brand">{CHATBOT.tituloAcento[idioma]}</span>
            </>
          }
          entradilla={CHATBOT.entradilla[idioma]}
          precio="chatbot"
          indice={<SectionIndex entradas={indice} idioma={idioma} variante="chip" />}
          /* El sello abre la página: es la única credencial verificable del
             negocio y estaba enterrada a media altura como un bloque más. */
          aparte={<MetaTechProvider variant="rail" idioma={idioma} />}
          acciones={
            <>
              <Button size="lg" variant="primary" asChild>
                <Link href={enlaceReal(es ? "/agendar" : "/en/book-a-call")}>
                  {CHATBOT.ctaPrincipal[idioma]} <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#precio">{CHATBOT.ctaSecundario[idioma]}</a>
              </Button>
            </>
          }
        />

        {/* ── El diferenciador, dibujado ──────────────────────────────── */}
        <section
          id="conexion"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <ContrastBlock
            etiquetaComun={es ? "Lo que hace casi todo el mundo" : "What almost everyone does"}
            comun={CHATBOT.diferenciador.parrafo1[idioma]}
            etiquetaPropio={CHATBOT.badge[idioma]}
            propio={`${CHATBOT.diferenciador.titulo[idioma]} ${CHATBOT.diferenciador.acento[idioma]}`}
            como="h2"
          >
            <p className="max-w-[52ch] leading-relaxed text-ink-soft">
              <strong className="text-ink">{CHATBOT.diferenciador.fuerte[idioma]}</strong>
              {CHATBOT.diferenciador.parrafo2[idioma]}
            </p>

            <ConexionDirecta
              className="mt-8"
              titulo={CHATBOT.conexion.titulo[idioma]}
              tuNumero={CHATBOT.conexion.tuNumero[idioma]}
              tercero={CHATBOT.conexion.tercero[idioma]}
              meta={CHATBOT.conexion.meta[idioma]}
              comun={CHATBOT.conexion.comun[idioma]}
              propio={CHATBOT.conexion.propio[idioma]}
              corte={CHATBOT.conexion.corte[idioma]}
              directo={CHATBOT.conexion.directo[idioma]}
            />
          </ContrastBlock>
        </section>

        {/* ── Para quién es, con el reloj ─────────────────────────────── */}
        <section
          id="problemas"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {CHATBOT.paraQuienTitulo[idioma]}
            </h2>
          </Reveal>

          <PainGrid
            className="mt-12"
            dolores={CHATBOT.paraQuien.map((p) => ({
              titulo: p.titulo[idioma],
              cuerpo: p.cuerpo[idioma],
            }))}
          />

          <Reveal delay={120}>
            <Reloj24
              className="mt-8"
              idioma={idioma}
              titulo={CHATBOT.reloj.titulo[idioma]}
              abre={ABRE}
              cierra={CIERRA}
              marcador={MARCADOR}
              etiquetaHoy={CHATBOT.reloj.hoy[idioma]}
              etiquetaBot={CHATBOT.reloj.conBot[idioma]}
              nota={CHATBOT.reloj.nota[idioma]}
              horas={horas[0]}
            />
          </Reveal>
        </section>

        {/* ── Pieza firma: qué se puede automatizar ───────────────────── */}
        <section id="automatizar" className="border-y border-line bg-tint">
          <div className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-28">
            <Reveal>
              <h2 className="text-balance text-[length:var(--text-display)]">
                {CHATBOT.firma.titulo[idioma]}
              </h2>
              <p className="mt-4 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
                {CHATBOT.firma.entradilla[idioma]}
              </p>
            </Reveal>

            <SimuladorChat
              className="mt-14"
              idioma={idioma}
              automatizaciones={automatizaciones}
              rotulo={CHATBOT.firma.rotulo[idioma]}
              mostrarPendientes={MOSTRAR_PENDIENTES}
            />

            {sinAprobar.length > 0 && (
              <Pendiente>
                [PENDIENTE: aprobar guion] {sinAprobar.join(" · ")}. Son borradores escritos para
                esta pieza; el de agendamiento es el que ya estaba publicado.
              </Pendiente>
            )}
          </div>
        </section>

        {/* ── Precio y plan ──────────────────────────────────────────── */}
        <section
          id="precio"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <p className="jv-eyebrow text-brand">{CHATBOT.precios.badge[idioma]}</p>
            <h2 className="mt-4 text-balance text-[length:var(--text-display)]">
              {CHATBOT.precios.titulo[idioma]}
            </h2>
            <p className="mt-4 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
              {CHATBOT.precios.entradilla[idioma]}
            </p>
          </Reveal>

          {/* Las dos líneas publicadas del catálogo: construirlo y mantenerlo.
              La segunda se creó en la fase 0 y ahora también está en /precios,
              así que las dos salen del mismo sitio. */}
          <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Reveal className="h-full">
              <PriceCard id="chatbot" idioma={idioma} tam="lg" conEnlace={false} />
            </Reveal>
            <Reveal delay={80} className="h-full">
              <PriceCard id="chatbotMes" idioma={idioma} tam="lg" conEnlace={false} />
            </Reveal>
          </div>

          {/* Los dos estados. El de abajo no es una amenaza comercial: es lo
              que pasa de verdad cuando Meta rechaza una plantilla y nadie
              está mirando, y lleva años dicho en la FAQ de mantenimiento. */}
          <div className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-[--radius-lg] border border-line bg-line md:grid-cols-2">
            <Reveal className="bg-canvas p-6 sm:p-7">
              <p className="flex items-center gap-2.5 jv-eyebrow text-brand">
                <span aria-hidden="true" className="jv-latido h-2 w-2 rounded-full bg-brand" />
                {CHATBOT.estado.conPlan.etiqueta[idioma]}
              </p>
              <p className="mt-3 leading-relaxed text-ink">
                {CHATBOT.estado.conPlan.texto[idioma]}
              </p>
            </Reveal>

            <Reveal delay={80} className="bg-surface p-6 sm:p-7">
              <p className="flex items-center gap-2.5 jv-eyebrow text-ink-muted">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-line-strong" />
                {CHATBOT.estado.sinPlan.etiqueta[idioma]}
              </p>
              <p className="mt-3 leading-relaxed text-ink-soft">
                {CHATBOT.estado.sinPlan.texto[idioma]}
              </p>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <p className="mt-6 max-w-[62ch] leading-relaxed text-ink-soft">
              <strong className="text-ink">{CHATBOT.precios.aclaracionTitulo[idioma]}</strong>
              {CHATBOT.precios.aclaracion1[idioma]}
            </p>
          </Reveal>
        </section>

        {/* ── Qué incluye ────────────────────────────────────────────── */}
        <section
          id="incluye"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {CHATBOT.incluyeTitulo[idioma]}
            </h2>
            <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2">
              {CHATBOT.incluye[idioma].map((x) => (
                <li key={x} className="flex items-start gap-3 leading-relaxed text-ink-soft">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-brand" strokeWidth={2} aria-hidden />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* ── Cómo se hace ───────────────────────────────────────────── */}
        <section
          id="proceso"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {CHATBOT.procesoTitulo[idioma]}
            </h2>
            <p className="mt-4 font-mono text-sm text-ink-soft">
              {catalogo("chatbot").plazo?.[idioma]}
            </p>
          </Reveal>

          {/* El tramo punteado dice lo que nadie pregunta y todo el mundo
              asume: el reloj no arranca al aceptar la propuesta. */}
          <Reveal delay={80}>
            <RailPlazo
              className="mt-12"
              previo={{
                etiqueta: CHATBOT.previo.etiqueta[idioma],
                texto: CHATBOT.previo.texto[idioma],
              }}
              hitos={CHATBOT.proceso.map((p) => ({
                etiqueta: p.etiqueta[idioma],
                texto: p.texto[idioma],
              }))}
            />
          </Reveal>
        </section>

        {/* ── Preguntas, por tema ────────────────────────────────────── */}
        <section
          id="preguntas"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <h2 className="text-balance text-[length:var(--text-h2)]">
                  {CHATBOT.faqTitulo[idioma]}
                </h2>
              </div>
            </Reveal>

            <FaqAccordion grupos={gruposFaq} />
          </div>
        </section>

        <FinalCTA
          idioma={idioma}
          titulo={CHATBOT.cierre.titulo[idioma]}
          cuerpo={CHATBOT.cierre.cuerpo[idioma]}
          siguiente={<NextStep id="software" idioma={idioma} />}
        />
      </main>
      <Footer idioma={idioma} />
      <WhatsAppButton idioma={idioma} />
      <BarraMovil idioma={idioma} />
    </>
  );
}
