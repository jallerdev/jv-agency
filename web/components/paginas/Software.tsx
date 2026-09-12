import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  CalendarClock,
  LayoutDashboard,
  Puzzle,
  Rocket,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

import { SOFTWARE, SOFTWARE_FAQ, SOFTWARE_FAQ_GRUPOS } from "@/content/paginas/software";
import type { Idioma } from "@/content/types";
import { enlaceReal } from "@/lib/rutas";
import { SITE_URL } from "@/lib/site";
import { catalogo, money, PISOS } from "@/lib/quote";
import { cn } from "@/lib/utils";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BarraMovil } from "@/components/BarraMovil";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/kit/PageHero";
import { PainGrid } from "@/components/kit/PainGrid";
import { ProofCard } from "@/components/kit/ProofCard";
import { FaqAccordion } from "@/components/kit/FaqAccordion";
import { FinalCTA, NextStep } from "@/components/kit/FinalCTA";
import { SectionIndex } from "@/components/kit/SectionIndex";
import { SelectorProblema } from "@/components/visuales/SelectorProblema";
import { RailPlazo } from "@/components/visuales/RailPlazo";
import { PanelRolesCrm } from "@/components/visuales/PanelRolesCrm";

/**
 * SOFTWARE A LA MEDIDA, EN LOS DOS IDIOMAS
 * ──────────────────────────────────────────────────────────────────────────
 * NO HAY PRECIO PUBLICADO, y eso es una decisión, no un olvido: `lib/quote.ts`
 * no cotiza esta línea y el precio autorizado sigue siendo «según alcance».
 * Tampoco hay `offers` con precio en el JSON-LD —un número inventado ahí es tan
 * falso como uno inventado en la página—.
 *
 * SÍ HAY PISO, que es otra cosa: `PISOS.software`, autorizado por Luis. No dice
 * cuánto cuesta el encargo, dice por debajo de qué cifra no da.
 *
 * QUÉ CAMBIÓ EN LA FASE 2, Y POR QUÉ
 * ----------------------------------
 * Tenía el mejor activo interactivo del estudio —el panel con roles— enseñado
 * al mismo nivel que una lista, y cinco párrafos a 86 caracteres por línea.
 * Ahora:
 *
 * · La pregunta más cara de la página —«¿software o página web?»— se contesta
 *   en un clic y, cuando la respuesta es la web, la página lo dice y enlaza.
 *   Mandar a otro servicio cuando toca es el argumento, no una fuga.
 * · El panel con roles es la pieza firma: las tarjetas que no son tuyas se
 *   PLIEGAN en vez de desaparecer, las columnas se reacomodan y el contador se
 *   interpola. Ver encogerse lo que no te toca es lo que explica el filtro.
 * · El precio se lee como lo que es: dos columnas con dirección —lo que sube y
 *   lo que baja— y el pago como una barra por etapas, sin montos.
 * · «Qué no hago» pasa a filas plegables: siete títulos a la vista y el detalle
 *   a un clic, sin sacar una palabra del HTML.
 */
const PISO_WEB = PISOS.landing;
const PISO_ECOM = PISOS.tienda;

const GLIFOS = {
  inventario: Boxes,
  agenda: CalendarClock,
  panel: LayoutDashboard,
  crm: Users,
  integra: Puzzle,
  cohete: Rocket,
} as const;

export function PaginaSoftware({ idioma, ruta }: { idioma: Idioma; ruta: string }) {
  const url = `${SITE_URL}${ruta}`;
  const es = idioma === "es";
  const conPrecios = (t: string) =>
    t.replaceAll("{piso}", money(PISO_WEB, idioma)).replaceAll("{ecom}", money(PISO_ECOM, idioma));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#servicio`,
    name: es ? "Desarrollo de software a la medida" : "Custom software development",
    alternateName: es
      ? [
          "Software a medida",
          "Software personalizado",
          "Desarrollo de software",
          "Aplicaciones a la medida",
          "Sistema a la medida",
          "Plataforma web a la medida",
        ]
      : ["Bespoke software", "Custom development", "Internal systems", "Web applications"],
    serviceType: es ? "Desarrollo de software a la medida" : "Custom software development",
    description: SOFTWARE.entradilla[idioma],
    inLanguage: idioma,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "Country", name: "Colombia" },
      { "@type": "Place", name: es ? "Latinoamérica" : "Latin America" },
    ],
    url,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: SOFTWARE.construyoTitulo[idioma],
      itemListElement: SOFTWARE.construyo.map((q, i) => ({
        "@type": "Offer",
        position: i + 1,
        name: q.titulo[idioma],
        description: q.cuerpo[idioma],
        availability: "https://schema.org/InStock",
        seller: { "@id": `${SITE_URL}/#organization` },
      })),
    },
  };

  const faqs = SOFTWARE_FAQ.map((f) => ({
    q: f.q[idioma],
    a: conPrecios(f.a[idioma]),
    grupo: f.grupo,
  }));
  const gruposFaq = SOFTWARE_FAQ_GRUPOS.map((g) => ({
    titulo: g.titulo[idioma],
    items: faqs.filter((f) => f.grupo === g.clave),
  })).filter((g) => g.items.length > 0);

  const indice = [
    { id: "calificar", texto: es ? "¿Software o web?" : "Software or a site?" },
    { id: "problemas", texto: es ? "Para quién es" : "Who it's for" },
    { id: "panel", texto: es ? "El panel con roles" : "The panel with roles" },
    { id: "construyo", texto: es ? "Qué construyo" : "What I build" },
    { id: "precio", texto: es ? "Precio y pago" : "Price and payment" },
    { id: "incluye", texto: es ? "Qué incluye" : "What's included" },
    { id: "no-hago", texto: es ? "Qué no hago" : "What I don't do" },
    { id: "proceso", texto: es ? "Cómo se hace" : "How it's done" },
    { id: "prueba", texto: es ? "Ábrelo ahora" : "Open it now" },
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
          migas={[{ texto: SOFTWARE.badge[idioma] }]}
          titulo={
            <>
              {SOFTWARE.titulo[idioma]}{" "}
              <span className="block text-brand">{SOFTWARE.tituloAcento[idioma]}</span>
            </>
          }
          entradilla={SOFTWARE.entradilla[idioma]}
          precio="software"
          indice={<SectionIndex entradas={indice} idioma={idioma} variante="chip" />}
          /* La captura de HalcónOS: un sistema propio, en producción y con
             dominio. Es la respuesta a «enséñeme algo suyo que siga
             funcionando», que la propia página dice que hay que exigir. */
          aparte={
            <figure>
              <div className="jv-card overflow-hidden">
                <div
                  className="relative border-b border-line bg-surface"
                  style={{ aspectRatio: "1600 / 1000" }}
                >
                  <Image
                    src="/work/halconos.webp"
                    alt={
                      es
                        ? "Panel de HalcónOS: pipeline de ventas con los negocios por estado"
                        : "HalcónOS panel: sales pipeline with deals by stage"
                    }
                    fill
                    sizes="(min-width: 1024px) 420px, 100vw"
                    priority
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <figcaption className="mt-3 text-center font-mono text-xs text-ink-soft">
                halcon.jvagencia.com
              </figcaption>
            </figure>
          }
          acciones={
            <>
              <Button size="lg" variant="primary" asChild>
                <Link href={enlaceReal(es ? "/agendar" : "/en/book-a-call")}>
                  {SOFTWARE.ctaPrincipal[idioma]} <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#precio">{SOFTWARE.ctaSecundario[idioma]}</a>
              </Button>
            </>
          }
        />

        {/* ── ¿Software o página web? ────────────────────────────────── */}
        <section
          id="calificar"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="max-w-[24ch] text-balance text-[length:var(--text-display)]">
              {SOFTWARE.calificar.tituloAntes[idioma]}{" "}
              <span className="text-brand">{SOFTWARE.calificar.tituloAcento[idioma]}</span>
            </h2>
            <p className="mt-4 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
              {SOFTWARE.calificar.entradilla[idioma]}
            </p>
          </Reveal>

          <SelectorProblema
            className="mt-12"
            idioma={idioma}
            lados={[
              {
                clave: "afuera",
                titulo: SOFTWARE.calificar.afueraTitulo[idioma],
                cuerpo: (
                  <>
                    {SOFTWARE.calificar.afueraAntes[idioma]}
                    <strong className="text-ink">{SOFTWARE.calificar.afueraFuerte[idioma]}</strong>
                    {conPrecios(SOFTWARE.calificar.afueraDespues[idioma])}
                  </>
                ),
                enlace: {
                  texto: SOFTWARE.calificar.afueraEnlace[idioma],
                  href: enlaceReal(es ? "/servicios/diseno-de-paginas-web" : "/en/services/web-design"),
                },
              },
              {
                clave: "adentro",
                titulo: SOFTWARE.calificar.adentroTitulo[idioma],
                cuerpo: (
                  <>
                    {SOFTWARE.calificar.adentroAntes[idioma]}
                    <strong className="text-ink">{SOFTWARE.calificar.adentroFuerte[idioma]}</strong>
                    {SOFTWARE.calificar.adentroDespues[idioma]}
                  </>
                ),
              },
            ]}
            /* Los tres peldaños son el orden que el propio copy recomienda al
               final de esta misma sección. Aquí se dibuja en vez de decirse. */
            peldanos={[
              {
                rotulo: es ? "Página web" : "Website",
                texto: es
                  ? "Que te encuentren y que lo que vean esté a la altura."
                  : "So they find you and what they see is up to standard.",
                href: enlaceReal(es ? "/servicios/diseno-de-paginas-web" : "/en/services/web-design"),
              },
              {
                rotulo: es ? "Chatbot de WhatsApp" : "WhatsApp chatbot",
                texto: es
                  ? "Que conteste y agende solo, que es más barato que un sistema."
                  : "So it answers and books on its own, which is cheaper than a system.",
                href: enlaceReal(es ? "/servicios/chatbot-whatsapp" : "/en/services/whatsapp-chatbot"),
              },
              {
                rotulo: es ? "Software a la medida" : "Custom software",
                texto: es
                  ? "Solo cuando el proceso de adentro ya no da abasto."
                  : "Only when the process inside can't keep up any more.",
              },
            ]}
          />
        </section>

        {/* ── Para quién es ──────────────────────────────────────────── */}
        <section
          id="problemas"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {SOFTWARE.paraQuienTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
              {SOFTWARE.paraQuienEntradilla[idioma]}
            </p>
          </Reveal>

          <PainGrid
            className="mt-12"
            dolores={SOFTWARE.paraQuien.map((p) => ({
              titulo: p.titulo[idioma],
              cuerpo: p.cuerpo[idioma],
            }))}
          />
        </section>

        {/* ── Pieza firma: el panel con roles ─────────────────────────── */}
        <section id="panel" className="border-y border-line bg-tint">
          <div className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-28">
            <Reveal>
              <h2 className="text-balance text-[length:var(--text-display)]">
                {SOFTWARE.panelTitulo[idioma]}
              </h2>
              <p className="mt-4 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
                {SOFTWARE.panelEntradilla[idioma]}
              </p>
            </Reveal>

            <Reveal delay={100}>
              <PanelRolesCrm idioma={idioma} className="mt-12" />
            </Reveal>
          </div>
        </section>

        {/* ── Qué construyo ──────────────────────────────────────────── */}
        <section
          id="construyo"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {SOFTWARE.construyoTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
              {SOFTWARE.construyoEntradilla[idioma]}
            </p>
          </Reveal>

          {/* Los seis tipos en bento, con el icono en línea con el titular:
              aquí mueren los seis azulejos que marcaba el detector. */}
          <PainGrid
            className="mt-12"
            dolores={SOFTWARE.construyo.map((c) => ({
              titulo: c.titulo[idioma],
              cuerpo: c.cuerpo[idioma],
              icono: GLIFOS[c.icono as keyof typeof GLIFOS],
            }))}
          />

          <Reveal>
            <p className="mt-8 max-w-[62ch] leading-relaxed text-ink-soft">
              {SOFTWARE.saludAntes[idioma]}
              <Link
                href={enlaceReal(es ? "/sectores/clinicas-y-consultorios" : "/en/industries/clinics")}
                className="jv-enlace font-semibold text-brand"
              >
                {SOFTWARE.saludEnlace[idioma]}
              </Link>
              {SOFTWARE.saludDespues[idioma]}
            </p>
          </Reveal>
        </section>

        {/* ── Precio: lo que sube, lo que baja, cómo se paga ──────────── */}
        <section
          id="precio"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <p className="jv-eyebrow text-brand">{SOFTWARE.precio.badge[idioma]}</p>
            <h2 className="mt-4 max-w-[24ch] text-balance text-[length:var(--text-display)]">
              {SOFTWARE.precio.titulo[idioma]}
            </h2>
            <p className="mt-4 max-w-[62ch] leading-relaxed text-ink-soft">
              {SOFTWARE.precio.entradillaAntes[idioma]}
              <Link
                href={enlaceReal(es ? "/precios" : "/en/pricing")}
                className="jv-enlace font-semibold text-brand"
              >
                {conPrecios(SOFTWARE.precio.entradillaEnlace[idioma])}
              </Link>
              {SOFTWARE.precio.entradillaDespues[idioma]}
            </p>
          </Reveal>

          {/* El piso, que es la pregunta que trae el visitante. No es tarifa:
              es la línea por debajo de la cual el encargo no da. */}
          <Reveal delay={80}>
            {/* Dos columnas: la cifra a la izquierda y la condición a la
                derecha. En una sola fila, el párrafo de seis renglones dejaba
                el precio flotando con medio bloque en blanco debajo. */}
            <div className="jv-card mt-10 grid grid-cols-1 gap-6 p-6 sm:p-8 md:grid-cols-[minmax(0,auto)_minmax(0,1fr)] md:gap-10">
              <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 md:block">
                <span className="jv-eyebrow block text-brand">{SOFTWARE.precio.pisoFuerte[idioma]}</span>
                <span className="font-display text-[length:var(--text-h2)] font-semibold leading-none tabular-nums tracking-[-0.03em] text-ink">
                  {money(PISOS.software, idioma)}
                </span>
                <span className="block font-mono text-sm text-ink-soft md:mt-2">
                  {catalogo("software").plazo?.[idioma]}
                </span>
              </p>
              <p className="max-w-[62ch] text-sm leading-relaxed text-ink-soft">
                {SOFTWARE.precio.pisoTexto[idioma]}
              </p>
            </div>
          </Reveal>

          {/* Sube y baja, con la flecha diciendo hacia dónde. Dos listas sin
              dirección obligan a leer el titular para saber cuál es cuál. */}
          <div className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-[--radius-lg] border border-line bg-line md:grid-cols-2">
            {[
              {
                titulo: SOFTWARE.precio.subeTitulo[idioma],
                items: SOFTWARE.precio.sube[idioma],
                Icono: TrendingUp,
                fondo: "bg-surface",
              },
              {
                titulo: SOFTWARE.precio.bajaTitulo[idioma],
                items: SOFTWARE.precio.baja[idioma],
                Icono: TrendingDown,
                fondo: "bg-canvas",
              },
            ].map(({ titulo, items, Icono, fondo }) => (
              <Reveal key={titulo} className={cn("p-6 sm:p-8", fondo)}>
                <h3 className="flex items-center gap-3">
                  <Icono aria-hidden="true" strokeWidth={2} className="h-5 w-5 shrink-0 text-brand" />
                  <span className="jv-eyebrow text-ink-muted">{titulo}</span>
                </h3>
                <ul className="mt-5 space-y-3">
                  {items.map((x) => (
                    <li key={x} className="flex gap-3 leading-relaxed text-ink-soft">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-brand"
                      />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          {/* Cómo se paga: una barra por etapas y sin montos. El reparto
              exacto va en la propuesta —ponerlo aquí sería inventarlo—, pero
              la FORMA del pago sí se puede enseñar, y es lo que tranquiliza. */}
          <Reveal delay={120}>
            <div className="jv-card mt-5 p-6 sm:p-8">
              <p className="jv-eyebrow text-ink-muted">{SOFTWARE.precio.pagoFuerte[idioma]}</p>
              <div
                aria-hidden="true"
                className="mt-4 flex gap-1.5 overflow-hidden rounded-full"
              >
                <span className="h-2 flex-[2] rounded-full bg-brand" />
                <span className="h-2 flex-[5] rounded-full bg-brand/55" />
                <span className="h-2 flex-[3] rounded-full bg-line-strong" />
              </div>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs text-ink-soft">
                <li>{es ? "Anticipo" : "Deposit"}</li>
                <li>{es ? "Hitos contra entregables" : "Milestones against deliverables"}</li>
                <li>{es ? "Saldo" : "Balance"}</li>
              </ul>
              <p className="mt-5 max-w-[62ch] leading-relaxed text-ink-soft">
                {SOFTWARE.precio.pagoAntes[idioma]}
                <Link
                  href={enlaceReal(es ? "/terminos" : "/terminos")}
                  className="jv-enlace font-semibold text-brand"
                >
                  {SOFTWARE.precio.pagoEnlace[idioma]}
                </Link>
                {SOFTWARE.precio.pagoDespues[idioma]}
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── Qué incluye siempre ────────────────────────────────────── */}
        <section
          id="incluye"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {SOFTWARE.incluyeTitulo[idioma]}
            </h2>
            <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2">
              {SOFTWARE.incluye[idioma].map((x) => (
                <li key={x} className="flex gap-3 leading-relaxed text-ink-soft">
                  <span
                    aria-hidden="true"
                    className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-brand"
                  />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* ── Qué no hago ────────────────────────────────────────────── */}
        <section
          id="no-hago"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <h2 className="text-balance text-[length:var(--text-h2)]">
                  {SOFTWARE.noHagoAntes[idioma]}
                  <span className="text-brand">{SOFTWARE.noHagoAcento[idioma]}</span>
                  {SOFTWARE.noHagoDespues[idioma]}
                </h2>
                <p className="mt-4 leading-relaxed text-ink-soft">
                  {SOFTWARE.noHagoEntradilla[idioma]}
                </p>
              </div>
            </Reveal>

            {/* Siete títulos a la vista y el detalle a un clic. Son siete
                párrafos largos: en abierto empujan el resto de la página una
                pantalla y media, y en `<details>` no sale nada del HTML. */}
            <FaqAccordion
              grupos={[
                {
                  titulo: `${SOFTWARE.noHagoAntes[idioma]}${SOFTWARE.noHagoAcento[idioma]}${SOFTWARE.noHagoDespues[idioma]}`,
                  items: SOFTWARE.noHago.map((n) => ({
                    q: n.titulo[idioma],
                    a: n.cuerpo[idioma],
                  })),
                },
              ]}
            />
          </div>
        </section>

        {/* ── Cómo se hace ───────────────────────────────────────────── */}
        <section
          id="proceso"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {SOFTWARE.procesoTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-[62ch] leading-relaxed text-ink-soft">
              {SOFTWARE.plazoPrimera[idioma]}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <RailPlazo
              className="mt-12"
              previo={{
                etiqueta: SOFTWARE.previo.etiqueta[idioma],
                texto: SOFTWARE.previo.texto[idioma],
              }}
              hitos={SOFTWARE.proceso.map((p) => ({
                etiqueta: p.etiqueta[idioma],
                texto: p.texto[idioma],
              }))}
            />
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-8 font-mono text-sm text-ink-soft">{SOFTWARE.plazoNota[idioma]}</p>
          </Reveal>
        </section>

        {/* ── Lo que puedes abrir ahora mismo ─────────────────────────── */}
        <section
          id="prueba"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {SOFTWARE.pruebaTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-[62ch] leading-relaxed text-ink-soft">
              {SOFTWARE.pruebaP1Antes[idioma]}
              <em className="text-ink">{SOFTWARE.pruebaP1Cursiva[idioma]}</em>
              {SOFTWARE.pruebaP1Despues[idioma]}
            </p>
            {/* El aviso de que son producto propio va ANTES de las tarjetas,
                no debajo: leerlo después de haberlas visto se parece a una
                aclaración incómoda; leerlo antes es honestidad. */}
            <p className="mt-4 max-w-[62ch] leading-relaxed text-ink-soft">
              {SOFTWARE.pruebaP2Antes[idioma]}
              <strong className="text-ink">{SOFTWARE.pruebaP2Fuerte[idioma]}</strong>
              {SOFTWARE.pruebaP2Despues[idioma]}
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {SOFTWARE.prueba.map((p, i) => (
              <Reveal key={p.nombre} delay={i * 90} className="h-full">
                <ProofCard
                  idioma={idioma}
                  nombre={p.nombre}
                  categoria={SOFTWARE.pruebaEtiqueta[idioma].split("·")[0].trim()}
                  cuerpo={p.cuerpo[idioma]}
                  dominio={p.dominio}
                  url={p.url}
                  estado="produccion"
                />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Con qué lo construyo ───────────────────────────────────── */}
        <section className="mx-auto max-w-[1280px] px-6 py-20 md:px-12 md:py-24">
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-h2)]">
              {SOFTWARE.stackTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-[62ch] leading-relaxed text-ink-soft">
              {SOFTWARE.stackEntradilla[idioma]}
            </p>
          </Reveal>

          {/* Nombres en texto, no logotipos: usar las marcas de terceros pide
              permiso de cada una y aquí no aportan nada que el nombre no diga. */}
          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[--radius-lg] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {SOFTWARE.stack.map((g) => (
              <Reveal key={g.grupo.es} className="bg-canvas p-6">
                <h3 className="jv-eyebrow text-ink-muted">{g.grupo[idioma]}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((x) => (
                    <li key={x} className="jv-chip jv-chip-off text-xs">
                      {x}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
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
                  {SOFTWARE.faqTitulo[idioma]}
                </h2>
                <p className="mt-4 leading-relaxed text-ink-soft">
                  {SOFTWARE.faqEntradilla[idioma]}
                </p>
              </div>
            </Reveal>

            <FaqAccordion grupos={gruposFaq} />
          </div>
        </section>

        <FinalCTA
          idioma={idioma}
          titulo={SOFTWARE.cierre.titulo[idioma]}
          cuerpo={SOFTWARE.cierre.cuerpo[idioma]}
          siguiente={<NextStep id="chatbot" idioma={idioma} />}
        />

        <div className="mx-auto max-w-[1280px] px-6 pb-20 md:px-12">
          <a
            href="https://halcon.jvagencia.com"
            target="_blank"
            rel="noopener noreferrer"
            className="jv-enlace inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand"
          >
            halcon.jvagencia.com
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden />
          </a>
        </div>
      </main>
      <Footer idioma={idioma} />
      <WhatsAppButton idioma={idioma} />
      <BarraMovil idioma={idioma} />
    </>
  );
}
