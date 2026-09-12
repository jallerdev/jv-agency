import Link from "next/link";
import { ArrowRight, Check, MapPin, RefreshCw, Sparkles } from "lucide-react";

import { SEO, SEO_FAQ } from "@/content/paginas/seo";
import type { Idioma } from "@/content/types";
import { enlaceReal } from "@/lib/rutas";
import { SITE_URL } from "@/lib/site";
import { SEO_HONESTY_NOTE, SEO_PRICES, money, PISOS } from "@/lib/quote";
import { cn } from "@/lib/utils";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BarraMovil } from "@/components/BarraMovil";
import { Reveal } from "@/components/Reveal";
import { AlEntrar } from "@/components/AlEntrar";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/kit/PageHero";
import { PainGrid } from "@/components/kit/PainGrid";
import { InOutLedger } from "@/components/kit/InOutLedger";
import { PriceCard } from "@/components/kit/Precio";
import { AddOnCalculator } from "@/components/kit/AddOnCalculator";
import { FaqAccordion } from "@/components/kit/FaqAccordion";
import { FinalCTA, NextStep } from "@/components/kit/FinalCTA";
import { SectionIndex } from "@/components/kit/SectionIndex";
import { BarraBusqueda } from "@/components/visuales/BarraBusqueda";
import { FichaAlMapa } from "@/components/visuales/FichaAlMapa";
import { RailPlazo } from "@/components/visuales/RailPlazo";

/**
 * POSICIONAMIENTO SEO, EN LOS DOS IDIOMAS
 * ──────────────────────────────────────────────────────────────────────────
 * NO SE PROMETE UNA POSICIÓN, ni en la página ni en el dato estructurado. La
 * frase de honestidad sale de `SEO_HONESTY_NOTE` en `lib/quote.ts`, que es su
 * fuente única en todo el sitio; en inglés va su traducción en el archivo de
 * contenido, junto a la original.
 *
 * QUÉ CAMBIÓ EN LA FASE 2, Y POR QUÉ
 * ----------------------------------
 * Era la página con más hallazgos del sitio —veintitrés, nueve de ellos
 * azulejos de icono— y tenía sus dos mejores visuales separados y mudos: el
 * medidor de la ficha por un lado y el paquete del mapa por el otro, sin nada
 * que dijera que el primero causa el segundo. Ahora:
 *
 * · La pieza firma los junta y los hace tocables: marcas los tres campos que
 *   faltan y el negocio entra al paquete.
 * · La declaración de honestidad abre la página a todo el ancho, que es donde
 *   tiene que estar: el cliente que llega quemado llega por eso.
 * · Los dos productos se distinguen por su ritmo, no por un icono en una caja:
 *   un visto que se dibuja una vez y un ciclo que no para.
 * · La sección de «lo que puedes verificar» enseña el JSON-LD REAL de esta
 *   misma página, leído del mismo objeto que se sirve. Es la prueba más
 *   honesta que puede dar una página de SEO.
 *
 * LO QUE ESTA PÁGINA NO PUEDE HACER, y por eso no lo hace: no hay caso de SEO
 * con seis meses cumplidos. Ninguna pieza insinúa una posición ganada, un
 * tráfico ni un plazo de resultado.
 */
const PISO_AUDITORIA = PISOS.auditoria;
const PISO_PLAN = PISOS.seoMes;

/** Los competidores del mapa de ejemplo. Sin nombre: no son nadie. */
const COMPETIDORES = [
  { distancia: "0,8 km", estrellas: 4 },
  { distancia: "1,4 km", estrellas: 4 },
  { distancia: "2,1 km", estrellas: 3 },
];

export function PaginaSeo({ idioma, ruta }: { idioma: Idioma; ruta: string }) {
  const url = `${SITE_URL}${ruta}`;
  const es = idioma === "es";

  const conPrecios = (t: string) =>
    t
      .replaceAll("{auditoria}", money(PISO_AUDITORIA, idioma))
      .replaceAll("{puestaApunto}", money(SEO_PRICES.extras.puestaApunto, idioma))
      .replaceAll("{ficha}", money(SEO_PRICES.extras.ficha, idioma))
      .replaceAll("{ciudadExtra}", money(SEO_PRICES.ciudadExtra, idioma))
      .replaceAll("{contenido}", money(SEO_PRICES.contenidoExtraUnidad, idioma))
      .replaceAll("{meses}", String(SEO_PRICES.mesesParaResultados));

  /* Datos estructurados de servicio. Sin FAQPage a propósito: desde 2023
     Google lo restringió a sitios de gobierno y salud. El proveedor apunta al
     @id del grafo global: un solo negocio, no uno nuevo por página. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#servicio`,
    name: es ? "Posicionamiento SEO" : "Search engine optimisation",
    alternateName: es
      ? [
          "Posicionamiento web",
          "SEO local",
          "Servicio de posicionamiento en buscadores",
          "Optimización de motores de búsqueda",
        ]
      : ["SEO", "Local SEO", "Search engine optimisation service"],
    serviceType: es ? "Posicionamiento en buscadores (SEO)" : "Search engine optimisation (SEO)",
    description: SEO.entradilla[idioma],
    inLanguage: idioma,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "Country", name: "Colombia" },
      { "@type": "City", name: "Cartagena" },
      { "@type": "City", name: "Barranquilla" },
      { "@type": "City", name: "Bogotá" },
    ],
    url,
    offers: [
      {
        "@type": "Offer",
        name: SEO.auditoria.titulo[idioma],
        description: SEO.auditoria.cuerpo[idioma],
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "COP",
          minPrice: PISO_AUDITORIA,
        },
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: SEO.plan.titulo[idioma],
        description: SEO.plan.cuerpo[idioma],
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          priceCurrency: "COP",
          minPrice: PISO_PLAN,
          unitCode: "MON",
          unitText: es ? "mes" : "month",
          billingDuration: 1,
        },
        availability: "https://schema.org/InStock",
      },
    ],
  };

  const faqs = SEO_FAQ.map((f) => ({
    q: f.q[idioma],
    a: (
      <>
        {conPrecios(f.a[idioma])}
        {f.enlace && (
          <>
            {" "}
            <Link href={f.enlace.href} className="jv-enlace font-semibold text-brand">
              {f.enlace.texto[idioma]}
            </Link>
            .
          </>
        )}
      </>
    ),
    grupo: f.grupo,
  }));
  const gruposFaq = SEO.faqGrupos
    .map((g) => ({ titulo: g.titulo[idioma], items: faqs.filter((f) => f.grupo === g.clave) }))
    .filter((g) => g.items.length > 0);

  const indice = [
    { id: "honestidad", texto: es ? "Lo que no prometo" : "What I don't promise" },
    { id: "eje", texto: es ? "Técnico o mensual" : "Technical or monthly" },
    { id: "problemas", texto: es ? "Para quién es" : "Who it's for" },
    { id: "ficha", texto: es ? "La ficha y el mapa" : "The profile and the map" },
    { id: "precio", texto: es ? "Precio" : "Price" },
    { id: "incluye", texto: es ? "Qué entra" : "What's included" },
    { id: "proceso", texto: es ? "Cómo y cuándo" : "How and when" },
    { id: "verificar", texto: es ? "Qué puedes verificar" : "What you can verify" },
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
          titular="compacto"
          variante="servicio"
          idioma={idioma}
          migas={[{ texto: SEO.badge[idioma] }]}
          titulo={
            <>
              {SEO.titulo[idioma]}{" "}
              <span className="block text-brand">{SEO.tituloAcento[idioma]}</span>
            </>
          }
          entradilla={SEO.entradilla[idioma]}
          indice={<SectionIndex entradas={indice} idioma={idioma} variante="chip" />}
          /* La consulta del propio copy, escribiéndose. La página habla de
             aparecer cuando alguien te busca y hasta ahora lo decía solo con
             palabras. */
          aparte={
            <BarraBusqueda
              consulta={SEO.consultaEjemplo[idioma]}
              rotulo={es ? "Lo que escribe tu cliente" : "What your customer types"}
              enlace={{
                texto: es ? "Qué pasa con esa búsqueda" : "What happens with that search",
                href: "#ficha",
              }}
            />
          }
          acciones={
            <>
              <Button size="lg" variant="primary" asChild>
                <Link href={enlaceReal(es ? "/agendar" : "/en/book-a-call")}>
                  {SEO.ctaPrincipal[idioma]} <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#precio">{SEO.ctaSecundario[idioma]}</a>
              </Button>
            </>
          }
        />

        {/* ── Lo que nadie pone en la portada ─────────────────────────── */}
        <section
          id="honestidad"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            {/* A todo el ancho y en tamaño de titular: es la frase por la que
                el cliente quemado decide si sigue leyendo. Enterrada en una
                tarjeta pesaba lo mismo que cualquier otro párrafo. */}
            <h2 className="max-w-[20ch] text-balance text-[length:var(--text-display)]">
              {SEO.honestidadTitulo[idioma]}{" "}
              <span className="text-brand">{SEO.honestidadAcento[idioma]}</span>
            </h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            <Reveal delay={80}>
              <p className="leading-relaxed text-ink-soft">
                {es ? SEO_HONESTY_NOTE : SEO.honestidadNota.en}
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p className="leading-relaxed text-ink-soft">{SEO.honestidadP2[idioma]}</p>
              <p className="mt-4 leading-relaxed text-ink-soft">
                <strong className="text-ink">{SEO.honestidadFuerte[idioma]}</strong>
                {SEO.honestidadP3[idioma]}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── El eje: SEO técnico ≠ posicionamiento ───────────────────── */}
        <section
          id="eje"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {SEO.ejeTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
              {SEO.ejeEntradilla[idioma]}
            </p>
          </Reveal>

          {/* Los dos productos se distinguen por su RITMO: uno se hace una vez
              y el otro no para. El icono lo dice; el texto lo confirma. */}
          <AlEntrar className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[--radius-lg] border border-line bg-line md:grid-cols-2">
            {[
              { bloque: SEO.tecnico, unaVez: true },
              { bloque: SEO.posicionamiento, unaVez: false },
            ].map(({ bloque, unaVez }) => (
              <div
                key={bloque.titulo.es}
                className={cn("flex flex-col p-6 sm:p-8", unaVez ? "bg-canvas" : "bg-surface")}
              >
                <span className="flex items-center gap-3">
                  {unaVez ? (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="jv-visto h-6 w-6 shrink-0 text-brand"
                      fill="none"
                    >
                      <path
                        d="M4 12.5L9.5 18L20 6.5"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <RefreshCw
                      aria-hidden="true"
                      strokeWidth={2}
                      className="jv-ciclo h-6 w-6 shrink-0 text-brand"
                    />
                  )}
                  <span className="jv-eyebrow text-ink-muted">
                    {unaVez
                      ? es
                        ? "Una vez"
                        : "Once"
                      : es
                        ? "Cada mes"
                        : "Every month"}
                  </span>
                </span>

                <h3 className="jv-titulo mt-4">{bloque.titulo[idioma]}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{bloque.cuerpo[idioma]}</p>

                <ul className="jv-rule mt-6 grid flex-1 gap-2.5 pt-5">
                  {bloque.items[idioma].map((x) => (
                    <li key={x} className="flex items-start gap-3 text-sm text-ink-soft">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                        strokeWidth={2}
                        aria-hidden
                      />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </AlEntrar>

          <Reveal>
            <p className="mt-8 max-w-[62ch] leading-relaxed text-ink-soft">
              <strong className="text-ink">{SEO.ejeCierreFuerte[idioma]}</strong>
              {SEO.ejeCierreResto[idioma]}
            </p>
          </Reveal>
        </section>

        {/* ── Para quién es ──────────────────────────────────────────── */}
        <section
          id="problemas"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {SEO.paraQuienTitulo[idioma]}
            </h2>
          </Reveal>

          <PainGrid
            className="mt-12"
            dolores={SEO.paraQuien.map((p) => ({
              titulo: p.titulo[idioma],
              cuerpo: p.cuerpo[idioma],
            }))}
          />
        </section>

        {/* ── Pieza firma: la ficha y el mapa ─────────────────────────── */}
        <section id="ficha" className="border-y border-line bg-tint">
          <div className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-28">
            <Reveal>
              <p className="jv-eyebrow text-brand">{SEO.localBadge[idioma]}</p>
              <h2 className="mt-4 max-w-[24ch] text-balance text-[length:var(--text-display)]">
                {SEO.localTitulo[idioma]}
              </h2>
              <p className="mt-4 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
                {SEO.localEntradilla[idioma]}
              </p>
            </Reveal>

            <FichaAlMapa
              className="mt-14"
              idioma={idioma}
              consulta={SEO.consultaEjemplo[idioma]}
              tituloFicha={SEO.fichaTitulo[idioma]}
              rotuloFicha={SEO.fichaRotulo[idioma]}
              porLlenar={SEO.fichaPorLlenar[idioma]}
              campos={SEO.fichaCampos.map((c) => ({
                etiqueta: c.etiqueta[idioma],
                valor: c.valor?.[idioma],
              }))}
              tuCategoria={es ? "Tu servicio principal" : "Your main service"}
              competidores={COMPETIDORES.map((c) => ({
                ...c,
                nombre: es ? "Competidor" : "Competitor",
                categoria: es ? "Mismo servicio" : "Same service",
              }))}
              /* Literal y sin tocar: es la frase que impide que esta pieza se
                 lea como una promesa de posición. */
              pie={
                es
                  ? "Ejemplo · no es un resultado real. El trabajo es entrar en la lista, no prometer el primer puesto."
                  : "Example · not a real result. The work is getting into the list, not promising first place."
              }
            />

            <Reveal delay={120}>
              <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
                <div>
                  <h3 className="jv-titulo">{SEO.ciudadesTitulo[idioma]}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">
                    {SEO.ciudadesEntradilla[idioma]}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-3">
                    {SEO.ciudades.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          className="jv-chip jv-chip-off min-h-11 gap-2 text-sm hover:border-brand hover:text-brand"
                        >
                          <MapPin className="h-4 w-4" strokeWidth={2} aria-hidden />
                          {c.texto[idioma]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Precio ─────────────────────────────────────────────────── */}
        <section
          id="precio"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <p className="jv-eyebrow text-brand">{SEO.preciosBadge[idioma]}</p>
            <h2 className="mt-4 text-balance text-[length:var(--text-display)]">
              {SEO.preciosTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
              {SEO.preciosEntradilla[idioma]}
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Reveal className="h-full">
              <PriceCard
                id="auditoria"
                idioma={idioma}
                tam="lg"
                descripcion={SEO.auditoria.cuerpo[idioma]}
                conEnlace={false}
              />
            </Reveal>
            <Reveal delay={90} className="h-full">
              <PriceCard
                id="seoMes"
                idioma={idioma}
                tam="lg"
                descripcion={SEO.plan.cuerpo[idioma]}
                conEnlace={false}
              />
            </Reveal>
          </div>

          <Reveal delay={120} className="mt-12 block">
            <h3 className="jv-titulo">{SEO.sumadorTitulo[idioma]}</h3>
            <p className="mt-2 max-w-[52ch] leading-relaxed text-ink-soft">
              {SEO.sumadorEntradilla[idioma]}
            </p>
          </Reveal>

          {/* Lo que sube la mensualidad y lo que se paga una vez, separados:
              sumarlos daría un número que no es ni lo uno ni lo otro. */}
          <AddOnCalculator
            className="mt-8"
            idioma={idioma}
            base={PISO_PLAN}
            baseEtiqueta={SEO.plan.titulo[idioma]}
            titulo={SEO.sumadorTitulo[idioma]}
            totalEtiqueta={es ? "Al mes" : "Per month"}
            totalUnicoEtiqueta={es ? "Pago único de arranque" : "One-off start-up payment"}
            aviso={SEO.sectoresCaros[idioma]}
            desde={SEO.desde[idioma]}
            extras={[
              {
                clave: "ciudad",
                titulo: es ? "Una ciudad más" : "One more city",
                precio: SEO_PRICES.ciudadExtra,
              },
              {
                clave: "contenido",
                titulo: es ? "Un contenido más al mes" : "One more piece of content a month",
                precio: SEO_PRICES.contenidoExtraUnidad,
              },
              {
                clave: "puestaApunto",
                titulo: es ? "Puesta a punto del sitio" : "Site tune-up",
                precio: SEO_PRICES.extras.puestaApunto,
                unidad: "unico",
              },
              {
                clave: "ficha",
                titulo: es ? "Creación de la ficha de Google" : "Google profile setup",
                precio: SEO_PRICES.extras.ficha,
                unidad: "unico",
              },
            ]}
          />

          <Reveal>
            <p className="mt-8 max-w-[62ch] leading-relaxed text-ink-soft">
              {SEO.restoPreciosAntes[idioma]}
              <Link
                href={enlaceReal(es ? "/precios" : "/en/pricing")}
                className="jv-enlace font-semibold text-brand"
              >
                {SEO.restoPreciosEnlace[idioma]}
              </Link>
              {SEO.restoPreciosMedio[idioma]}
              <Link
                href="/blog/cuanto-cuesta-el-seo-en-colombia"
                className="jv-enlace font-semibold text-brand"
              >
                {SEO.restoPreciosBlog[idioma]}
              </Link>
              {SEO.restoPreciosDespues[idioma]}
            </p>
          </Reveal>
        </section>

        {/* ── Qué entra y qué no ─────────────────────────────────────── */}
        <section
          id="incluye"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {SEO.comparador.incluye[idioma]}
            </h2>
          </Reveal>

          <InOutLedger
            className="mt-12"
            idioma={idioma}
            titulos={{
              dentro: SEO.comparador.incluye[idioma],
              fuera: `${SEO.comparador.noIncluyeAntes[idioma]}${SEO.comparador.noIncluyeAcento[idioma]}${SEO.comparador.noIncluyeDespues[idioma]}`,
            }}
            dentro={SEO.incluye[idioma].map((texto) => ({ texto: conPrecios(texto) }))}
            fuera={SEO.noIncluye.map((n) => ({
              texto: conPrecios(n.texto[idioma]),
              sello: n.quien[idioma],
            }))}
            remate={SEO.comparador.nota[idioma]}
          />
        </section>

        {/* ── Cómo se hace y cuándo se ve algo ───────────────────────── */}
        <section
          id="proceso"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <h2 className="text-balance text-[length:var(--text-display)]">
                {SEO.procesoTitulo[idioma]}
              </h2>
              <ol className="mt-10 flex flex-col divide-y divide-line border-y border-line">
                {SEO.proceso.map((p) => (
                  <li key={p.n} className="flex gap-4 py-4">
                    <span className="font-mono text-sm tabular-nums text-brand">{p.n}</span>
                    <span className="min-w-0">
                      <strong className="block font-semibold text-ink">{p.titulo[idioma]}</strong>
                      <span className="mt-1 block text-sm leading-relaxed text-ink-soft">
                        {p.cuerpo[idioma]}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={100}>
              <h3 className="jv-titulo">{SEO.cuandoTitulo[idioma]}</h3>
              {/* El riel se dibuja al entrar en vista: dice «esto va en este
                  orden y toma su tiempo» sin poner una cifra de resultado, que
                  es justo lo que esta página no puede insinuar. */}
              <AlEntrar className="jv-dibuja">
                <RailPlazo
                  className="mt-8"
                  previo={{
                    etiqueta: SEO.previo.etiqueta[idioma],
                    texto: SEO.previo.texto[idioma],
                  }}
                  hitos={SEO.hitos.map((h) => ({
                    etiqueta: conPrecios(h.etiqueta[idioma]),
                    texto: h.texto[idioma],
                  }))}
                />
              </AlEntrar>
            </Reveal>
          </div>
        </section>

        {/* ── Lo que puedes verificar hoy ─────────────────────────────── */}
        <section
          id="verificar"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {SEO.verificarTitulo[idioma]}
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <Reveal>
              <ul className="flex flex-col divide-y divide-line border-y border-line">
                {SEO.verificar.map((v) => (
                  <li key={v.fuerte.es} className="py-5 leading-relaxed text-ink-soft">
                    <strong className="text-ink">{v.fuerte[idioma]}</strong>{" "}
                    {v.enlace && (
                      <Link href={v.enlace.href} className="jv-enlace font-semibold text-brand">
                        {v.enlace.texto[idioma]}
                      </Link>
                    )}
                    {v.resto[idioma]}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* EL DATO ESTRUCTURADO DE ESTA MISMA PÁGINA, servido desde el
                mismo objeto que va en el <script> de arriba. No es un ejemplo
                ni una captura: si mañana cambia el esquema, cambia esto. Es la
                prueba más honesta que puede dar una página que vende SEO —y la
                única que no depende de creerme nada. */}
            <Reveal delay={120}>
              <figure className="jv-card overflow-hidden">
                <figcaption className="jv-rule bg-raised px-5 py-3 jv-eyebrow text-ink-muted sm:px-6">
                  {es
                    ? "Datos estructurados de esta página, ahora mismo"
                    : "This page's structured data, right now"}
                </figcaption>
                <pre className="max-h-[22rem] overflow-auto px-5 py-4 font-mono text-xs leading-relaxed text-ink-soft sm:px-6">
                  <code>{JSON.stringify(jsonLd, null, 2)}</code>
                </pre>
              </figure>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <div className="jv-card mt-8 p-7 md:p-8">
              <span className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 shrink-0 text-brand" strokeWidth={2} aria-hidden />
                <h3 className="jv-titulo">{SEO.iaTitulo[idioma]}</h3>
              </span>
              <p className="mt-4 max-w-[62ch] leading-relaxed text-ink-soft">{SEO.iaP1[idioma]}</p>
              <p className="mt-4 max-w-[62ch] leading-relaxed text-ink-soft">{SEO.iaP2[idioma]}</p>
              <p className="jv-rule mt-6 max-w-[62ch] pt-5 text-sm leading-relaxed text-ink-soft">
                {SEO.iaSectorAntes[idioma]}
                <Link
                  href={enlaceReal(
                    es ? "/sectores/clinicas-y-consultorios" : "/en/industries/clinics",
                  )}
                  className="jv-enlace font-semibold text-brand"
                >
                  {SEO.iaSectorClinica[idioma]}
                </Link>
                {SEO.iaSectorMedio[idioma]}
                <Link
                  href={enlaceReal(es ? "/sectores/salones-y-spas" : "/en/industries/salons-and-spas")}
                  className="jv-enlace font-semibold text-brand"
                >
                  {SEO.iaSectorSalon[idioma]}
                </Link>
                {SEO.iaSectorDespues[idioma]}
              </p>
            </div>
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
                  {SEO.faqTitulo[idioma]}
                </h2>
              </div>
            </Reveal>

            <FaqAccordion grupos={gruposFaq} />
          </div>
        </section>

        <FinalCTA
          idioma={idioma}
          titulo={SEO.cierre.titulo[idioma]}
          cuerpo={SEO.cierre.cuerpo[idioma]}
          siguiente={<NextStep id="landing" idioma={idioma} />}
        />
      </main>
      <Footer idioma={idioma} />
      <WhatsAppButton idioma={idioma} />
      <BarraMovil idioma={idioma} />
    </>
  );
}
