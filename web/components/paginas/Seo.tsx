import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock,
  FileSearch,
  LineChart,
  MapPin,
  Search,
  Sparkles,
  Wrench,
} from "lucide-react";

import { SEO, SEO_FAQ } from "@/content/paginas/seo";
import type { Idioma } from "@/content/types";
import { enlaceReal } from "@/lib/rutas";
import { SITE_URL } from "@/lib/site";
import { SEO_HONESTY_NOTE, SEO_PRICES, money, PISOS} from "@/lib/quote";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BarraMovil } from "@/components/BarraMovil";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Faqs } from "@/components/Faqs";
import { Pendiente } from "@/components/Pendiente";
import { BotonCuentame } from "@/components/Cuentame";
import { Comparador } from "@/components/visuales/Comparador";
import { SumadorSeo } from "@/components/visuales/SumadorSeo";
import { FichaGoogle } from "@/components/visuales/FichaGoogle";
import { BloqueLocalGoogle } from "@/components/visuales/BloqueLocalGoogle";
import { RailPlazo } from "@/components/visuales/RailPlazo";

/**
 * POSICIONAMIENTO SEO, EN LOS DOS IDIOMAS
 * ──────────────────────────────────────────────────────────────────────────
 * NO SE PROMETE UNA POSICIÓN, ni en la página ni en el dato estructurado. La
 * frase de honestidad sale de `SEO_HONESTY_NOTE` en `lib/quote.ts`, que es su
 * fuente única en todo el sitio; en inglés va su traducción en el archivo de
 * contenido, junto a la original.
 *
 * Las respuestas de la FAQ eran fragmentos de JSX con enlaces dentro. Ahora
 * son texto con marcadores de precio, y las tres que llevan enlace lo traen
 * aparte: así se pueden traducir sin duplicar marcado.
 */
const PISO_AUDITORIA = PISOS.auditoria;
const PISO_PLAN = PISOS.seoMes;

const GLIFOS = {
  buscar: Search,
  mapa: MapPin,
  grafica: LineChart,
  llave: Wrench,
} as const;

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header idioma={idioma} />
      <main id="contenido">
        {/* ── Encabezado ─────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-6 pb-8 pt-32 text-center md:px-12 md:pt-40">
          <Reveal>
            <Badge>{SEO.badge[idioma]}</Badge>
            <h1 className="mt-6 text-[length:var(--text-hero)]">
              {SEO.titulo[idioma]}{" "}
              <span className="block text-brand">{SEO.tituloAcento[idioma]}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft">
              {SEO.entradilla[idioma]}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href={enlaceReal(es ? "/agendar" : "/en/book-a-call")}>
                  {SEO.ctaPrincipal[idioma]} <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#precios">{SEO.ctaSecundario[idioma]}</a>
              </Button>
            </div>
          </Reveal>
        </section>

        {/* ── Lo que nadie pone en la portada ─────────────────────────── */}
        <section className="mx-auto max-w-4xl px-6 py-12 md:px-12">
          <Reveal>
            <div className="jv-card p-8 md:p-10">
              <h2 className="text-[length:var(--text-display)]">
                {SEO.honestidadTitulo[idioma]}{" "}
                <span className="text-brand">{SEO.honestidadAcento[idioma]}</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                {es ? SEO_HONESTY_NOTE : SEO.honestidadNota.en}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                {SEO.honestidadP2[idioma]}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                <strong className="text-ink">{SEO.honestidadFuerte[idioma]}</strong>
                {SEO.honestidadP3[idioma]}
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── El eje: SEO técnico ≠ posicionamiento ───────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{SEO.ejeTitulo[idioma]}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {SEO.ejeEntradilla[idioma]}
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {[
              { bloque: SEO.tecnico, Glifo: Wrench, destacada: false },
              { bloque: SEO.posicionamiento, Glifo: LineChart, destacada: true },
            ].map(({ bloque, Glifo, destacada }, i) => (
              <Reveal key={bloque.titulo.es} delay={i * 90}>
                <article
                  className={
                    destacada
                      ? "jv-card h-full border-brand/30 bg-raised p-7"
                      : "jv-card h-full p-7"
                  }
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-quiet text-brand">
                    <Glifo className="h-6 w-6" strokeWidth={2} aria-hidden />
                  </span>
                  <h3 className="jv-titulo mt-5">{bloque.titulo[idioma]}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {bloque.cuerpo[idioma]}
                  </p>
                  <ul className="jv-rule mt-5 grid gap-2.5 pt-5">
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
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-6 max-w-3xl leading-relaxed text-ink-soft">
              <strong className="text-ink">{SEO.ejeCierreFuerte[idioma]}</strong>
              {SEO.ejeCierreResto[idioma]}
            </p>
          </Reveal>
        </section>

        {/* ── Para quién es ──────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{SEO.paraQuienTitulo[idioma]}</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {SEO.paraQuien.map((p, i) => {
              const Glifo = GLIFOS[p.icono as keyof typeof GLIFOS];
              return (
                <Reveal key={p.titulo.es} delay={i * 80}>
                  <article className="jv-card jv-card-int h-full p-7">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-raised text-brand">
                      <Glifo className="h-5 w-5" strokeWidth={2} aria-hidden />
                    </span>
                    <h3 className="jv-titulo mt-5">{p.titulo[idioma]}</h3>
                    <p className="mt-2 leading-relaxed text-ink-soft">{p.cuerpo[idioma]}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ── Qué se hace y cuánto cuesta ─────────────────────────────── */}
        <section id="precios" className="mx-auto max-w-6xl scroll-mt-32 px-6 py-12 md:px-12">
          <Reveal>
            <Badge>{SEO.preciosBadge[idioma]}</Badge>
            <h2 className="mt-6 text-[length:var(--text-display)]">{SEO.preciosTitulo[idioma]}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {SEO.preciosEntradilla[idioma]}
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            <Reveal>
              <article className="jv-card flex h-full flex-col p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-quiet text-brand">
                  <FileSearch className="h-6 w-6" strokeWidth={2} aria-hidden />
                </span>
                <h3 className="jv-titulo mt-5">{SEO.auditoria.titulo[idioma]}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                  {SEO.auditoria.cuerpo[idioma]}
                </p>
                <p className="jv-rule mt-5 pt-4 font-mono text-lg text-brand">
                  {SEO.desde[idioma]} {money(PISO_AUDITORIA, idioma)}
                </p>
                <p className="mt-2 inline-flex items-center gap-2 text-sm text-ink-soft">
                  <Clock className="h-4 w-4 shrink-0 text-brand" strokeWidth={2} aria-hidden />
                  {SEO.auditoria.plazo[idioma]}
                </p>
              </article>
            </Reveal>

            <Reveal delay={90}>
              <article className="jv-card flex h-full flex-col border-brand/30 bg-raised p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-quiet text-brand">
                  <LineChart className="h-6 w-6" strokeWidth={2} aria-hidden />
                </span>
                <h3 className="jv-titulo mt-5">{SEO.plan.titulo[idioma]}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                  {SEO.plan.cuerpo[idioma]}
                </p>
                <p className="jv-rule mt-5 pt-4 font-mono text-lg text-brand">
                  {SEO.desde[idioma]} {money(PISO_PLAN, idioma)}
                  {SEO.plan.alMes[idioma]}
                </p>
                <p className="mt-2 inline-flex items-center gap-2 text-sm text-ink-soft">
                  <Clock className="h-4 w-4 shrink-0 text-brand" strokeWidth={2} aria-hidden />
                  {SEO.plan.plazo[idioma]}
                </p>
              </article>
            </Reveal>
          </div>

          <Reveal className="mt-10 block">
            <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
              {SEO.sumadorTitulo[idioma]}
            </h3>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">
              {SEO.sumadorEntradilla[idioma]}
            </p>
            <SumadorSeo idioma={idioma} className="mt-6 max-w-2xl" />
          </Reveal>

          <Reveal>
            <div className="mt-6 grid gap-4 leading-relaxed text-ink-soft">
              <p className="max-w-3xl">{SEO.sectoresCaros[idioma]}</p>
              <p className="max-w-3xl">
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
            </div>
          </Reveal>
        </section>

        {/* ── Qué incluye · qué no ───────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-12">
          <Reveal>
            <Comparador
              tituloComo="h2"
              tituloIncluye={SEO.comparador.incluye[idioma]}
              tituloNoIncluye={
                <>
                  {SEO.comparador.noIncluyeAntes[idioma]}
                  <span className="text-brand">{SEO.comparador.noIncluyeAcento[idioma]}</span>
                  {SEO.comparador.noIncluyeDespues[idioma]}
                </>
              }
              nota={SEO.comparador.nota[idioma]}
              incluye={[...SEO.incluye[idioma]]}
              noIncluye={SEO.noIncluye.map((n) => ({
                texto: n.texto[idioma],
                quien: n.quien[idioma],
              }))}
            />
          </Reveal>
        </section>

        {/* ── Cómo se hace ───────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{SEO.procesoTitulo[idioma]}</h2>
          </Reveal>
          <ol className="mt-10 grid gap-6">
            {SEO.proceso.map((p, i) => (
              <Reveal key={p.n} as="li" index={i} className="flex gap-4">
                <span className="font-mono text-sm tabular-nums text-brand">{p.n}</span>
                <span>
                  <strong className="block font-semibold text-ink">{p.titulo[idioma]}</strong>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-soft">
                    {p.cuerpo[idioma]}
                  </span>
                </span>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-12 block">
            <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
              {SEO.cuandoTitulo[idioma]}
            </h3>
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
          </Reveal>
        </section>

        {/* ── SEO local, que es lo que de verdad se vende ─────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-12">
          <Reveal>
            <Badge>{SEO.localBadge[idioma]}</Badge>
            <h2 className="mt-6 max-w-3xl text-[length:var(--text-display)]">
              {SEO.localTitulo[idioma]}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {SEO.localEntradilla[idioma]}
            </p>
          </Reveal>

          {/* Insumo → resultado. A 390 se apilan en ese orden, que además es el
              orden en que se cuenta. */}
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <FichaGoogle
                titulo={SEO.fichaTitulo[idioma]}
                rotulo={SEO.fichaRotulo[idioma]}
                porLlenar={SEO.fichaPorLlenar[idioma]}
                campos={SEO.fichaCampos.map((c) => ({
                  etiqueta: c.etiqueta[idioma],
                  valor: c.valor?.[idioma],
                }))}
              />
            </Reveal>
            <Reveal delay={90}>
              <BloqueLocalGoogle idioma={idioma} consulta={SEO.consultaEjemplo[idioma]} />
            </Reveal>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
                {SEO.ciudadesTitulo[idioma]}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-soft">
                {SEO.ciudadesEntradilla[idioma]}
              </p>
              <ul className="mt-7 flex flex-wrap gap-3">
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
            </Reveal>

            <Reveal delay={120}>
              <div className="jv-card p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-quiet text-brand">
                  <Sparkles className="h-6 w-6" strokeWidth={2} aria-hidden />
                </span>
                <h3 className="jv-titulo mt-5">{SEO.iaTitulo[idioma]}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{SEO.iaP1[idioma]}</p>
                <p className="mt-4 leading-relaxed text-ink-soft">{SEO.iaP2[idioma]}</p>
                <p className="jv-rule mt-5 pt-5 text-sm leading-relaxed text-ink-soft">
                  {SEO.iaSectorAntes[idioma]}
                  <Link
                    href={enlaceReal(
                      es ? "/sectores/clinicas-y-consultorios" : "/en/industries/clinics"
                    )}
                    className="jv-enlace font-semibold text-brand"
                  >
                    {SEO.iaSectorClinica[idioma]}
                  </Link>
                  {SEO.iaSectorMedio[idioma]}
                  <Link
                    href={enlaceReal(
                      es ? "/sectores/salones-y-spas" : "/en/industries/salons-and-spas"
                    )}
                    className="jv-enlace font-semibold text-brand"
                  >
                    {SEO.iaSectorSalon[idioma]}
                  </Link>
                  {SEO.iaSectorDespues[idioma]}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── El trabajo que respalda esto ────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{SEO.verificarTitulo[idioma]}</h2>
            <div className="mt-8 grid gap-4 leading-relaxed text-ink-soft">
              {SEO.verificar.map((v) => (
                <p key={v.fuerte.es}>
                  <strong className="text-ink">{v.fuerte[idioma]}</strong>{" "}
                  {v.enlace && (
                    <Link href={v.enlace.href} className="jv-enlace font-semibold text-brand">
                      {v.enlace.texto[idioma]}
                    </Link>
                  )}
                  {v.resto[idioma]}
                </p>
              ))}
            </div>
          </Reveal>

          {/* Dato por comprobar, a la vista: todavía no hay un caso de
              posicionamiento mensual con seis meses cumplidos, y ese es el dato
              que más pesa en esta página. No se inventa. */}
          <Reveal>
            <Pendiente>{SEO.pendienteCaso}</Pendiente>
          </Reveal>
        </section>

        {/* ── Preguntas ──────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{SEO.faqTitulo[idioma]}</h2>
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <Faqs
              items={SEO_FAQ.map((f) => ({
                q: f.q[idioma],
                a: (
                  <>
                    {conPrecios(f.a[idioma])}
                    {f.enlace && (
                      <>
                        {" "}
                        <Link
                          href={f.enlace.href}
                          className="jv-enlace font-semibold text-brand"
                        >
                          {f.enlace.texto[idioma]}
                        </Link>
                        .
                      </>
                    )}
                  </>
                ),
              }))}
            />
          </Reveal>
        </section>

        {/* ── Cierre ─────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-6 py-16 text-center md:px-12 md:py-24">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{SEO.cierre.titulo[idioma]}</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              {SEO.cierre.cuerpo[idioma]}
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href={enlaceReal(es ? "/agendar" : "/en/book-a-call")}>
                  {SEO.ctaPrincipal[idioma]} <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <BotonCuentame />
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
