import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  CalendarClock,
  Check,
  Clock,
  LayoutDashboard,
  Puzzle,
  Rocket,
  Users,
  X,
} from "lucide-react";

import { SOFTWARE, SOFTWARE_FAQ } from "@/content/paginas/software";
import type { Idioma } from "@/content/types";
import { enlaceReal } from "@/lib/rutas";
import { SITE_URL } from "@/lib/site";
import { money, PISOS} from "@/lib/quote";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BarraMovil } from "@/components/BarraMovil";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Faqs } from "@/components/Faqs";
import { Pendiente, sinPendientes } from "@/components/Pendiente";
import { BotonCuentame } from "@/components/Cuentame";
import { RailPlazo } from "@/components/visuales/RailPlazo";
import { PanelRolesCrm } from "@/components/visuales/PanelRolesCrm";

/**
 * SOFTWARE A LA MEDIDA, EN LOS DOS IDIOMAS
 * ──────────────────────────────────────────────────────────────────────────
 * NO HAY PRECIO PUBLICADO, y eso es una decisión, no un olvido: `lib/quote.ts`
 * no cotiza esta línea y el precio autorizado es «según alcance». Tampoco hay
 * `offers` con precio en el JSON-LD —un número inventado ahí es tan falso como
 * uno inventado en la página—.
 *
 * Los dos únicos números que aparecen son los de la página web y la tienda, y
 * salen de las mismas constantes que publican esas dos páginas.
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
            <Badge>{SOFTWARE.badge[idioma]}</Badge>
            <h1 className="mt-6 text-[length:var(--text-hero)]">
              {SOFTWARE.titulo[idioma]}{" "}
              <span className="block text-brand">{SOFTWARE.tituloAcento[idioma]}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft">
              {SOFTWARE.entradilla[idioma]}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href={enlaceReal(es ? "/#agenda" : "/en#agenda")}>
                  {SOFTWARE.ctaPrincipal[idioma]} <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#precio">{SOFTWARE.ctaSecundario[idioma]}</a>
              </Button>
            </div>
          </Reveal>
        </section>

        {/* ── Calificar: ¿software o página web? ─────────────────────── */}
        {/* Va arriba a propósito. Es la confusión que más plata cuesta de los
            dos lados: el que quería una web y le venden un sistema, y el que
            necesitaba un sistema y se conforma con una web. */}
        <section className="mx-auto max-w-4xl px-6 py-12 md:px-12">
          <Reveal>
            <div className="jv-card p-8 md:p-10">
              <h2 className="text-[length:var(--text-display)]">
                {SOFTWARE.calificar.tituloAntes[idioma]}{" "}
                <span className="text-brand">{SOFTWARE.calificar.tituloAcento[idioma]}</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                {SOFTWARE.calificar.entradilla[idioma]}
              </p>
              <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="jv-card bg-raised p-6">
                  <h3 className="jv-titulo">{SOFTWARE.calificar.afueraTitulo[idioma]}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">
                    {SOFTWARE.calificar.afueraAntes[idioma]}
                    <strong className="text-ink">{SOFTWARE.calificar.afueraFuerte[idioma]}</strong>
                    {conPrecios(SOFTWARE.calificar.afueraDespues[idioma])}
                  </p>
                  <Link
                    href={enlaceReal(es ? "/precios" : "/en/pricing")}
                    className="jv-enlace mt-2 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-brand"
                  >
                    {SOFTWARE.calificar.afueraEnlace[idioma]} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="jv-card bg-raised p-6">
                  <h3 className="jv-titulo">{SOFTWARE.calificar.adentroTitulo[idioma]}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">
                    {SOFTWARE.calificar.adentroAntes[idioma]}
                    <strong className="text-ink">{SOFTWARE.calificar.adentroFuerte[idioma]}</strong>
                    {SOFTWARE.calificar.adentroDespues[idioma]}
                  </p>
                </div>
              </div>
              <p className="mt-6 leading-relaxed text-ink-soft">
                {SOFTWARE.calificar.cierreAntes[idioma]}
                <Link
                  href={enlaceReal(
                    es ? "/servicios/chatbot-whatsapp" : "/en/services/whatsapp-chatbot"
                  )}
                  className="jv-enlace font-semibold text-brand"
                >
                  {SOFTWARE.calificar.cierreEnlace[idioma]}
                </Link>
                {SOFTWARE.calificar.cierreDespues[idioma]}
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── Para quién es ──────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">
              {SOFTWARE.paraQuienTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {SOFTWARE.paraQuienEntradilla[idioma]}
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SOFTWARE.paraQuien.map((p, i) => (
              <Reveal key={p.titulo.es} index={i}>
                <article className="jv-card jv-card-int h-full p-7">
                  <h3 className="jv-titulo">{p.titulo[idioma]}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{p.cuerpo[idioma]}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Qué se construye ───────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{SOFTWARE.construyoTitulo[idioma]}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {SOFTWARE.construyoEntradilla[idioma]}
            </p>
          </Reveal>

          {/* «Cada vendedor ve sus clientes, no los del resto» era una
              subordinada dentro de un párrafo. Conmutado, se demuestra. */}
          <Reveal delay={90} className="mt-10 block">
            <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
              {SOFTWARE.panelTitulo[idioma]}
            </h3>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">
              {SOFTWARE.panelEntradilla[idioma]}
            </p>
            <PanelRolesCrm idioma={idioma} className="mt-6" />
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SOFTWARE.construyo.map((q, i) => {
              const Glifo = GLIFOS[q.icono as keyof typeof GLIFOS];
              return (
                <Reveal key={q.titulo.es} index={i}>
                  <article className="jv-card jv-card-int flex h-full flex-col p-7">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-quiet text-brand">
                      <Glifo className="h-6 w-6" strokeWidth={2} aria-hidden />
                    </span>
                    <h3 className="jv-titulo mt-5">{q.titulo[idioma]}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                      {q.cuerpo[idioma]}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <p className="mt-6 max-w-3xl leading-relaxed text-ink-soft">
              <strong className="text-ink">{SOFTWARE.saludAntes[idioma]}</strong>
              {SOFTWARE.saludDespues[idioma]}
              <Link
                href={enlaceReal(
                  es ? "/sectores/clinicas-y-consultorios" : "/en/industries/clinics"
                )}
                className="jv-enlace font-semibold text-brand"
              >
                {SOFTWARE.saludEnlace[idioma]}
              </Link>
              .
            </p>
          </Reveal>
        </section>

        {/* ── Cuánto cuesta y cómo se cotiza ─────────────────────────── */}
        <section id="precio" className="mx-auto max-w-6xl scroll-mt-32 px-6 py-12 md:px-12">
          <Reveal>
            <Badge>{SOFTWARE.precio.badge[idioma]}</Badge>
            <h2 className="mt-6 text-[length:var(--text-display)]">
              {SOFTWARE.precio.titulo[idioma]}
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-soft">
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

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {[
              { titulo: SOFTWARE.precio.subeTitulo, items: SOFTWARE.precio.sube },
              { titulo: SOFTWARE.precio.bajaTitulo, items: SOFTWARE.precio.baja },
            ].map((bloque, i) => (
              <Reveal key={bloque.titulo.es} delay={i * 100}>
                <article className="jv-card h-full p-7">
                  <h3 className="jv-titulo">{bloque.titulo[idioma]}</h3>
                  <ul className="mt-4 grid gap-3">
                    {bloque.items[idioma].map((x) => (
                      <li key={x} className="flex items-start gap-3 text-ink-soft">
                        <Check className="mt-1 h-5 w-5 shrink-0 text-brand" strokeWidth={2} />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="jv-card mt-6 grid gap-4 p-7 leading-relaxed text-ink-soft">
              <p>
                <strong className="text-ink">{SOFTWARE.precio.pagoFuerte[idioma]}</strong>
                {SOFTWARE.precio.pagoAntes[idioma]}
                <Link href="/terminos" className="jv-enlace font-semibold text-brand">
                  {SOFTWARE.precio.pagoEnlace[idioma]}
                </Link>
                {SOFTWARE.precio.pagoDespues[idioma]}
              </p>
              {/* Dato que falta, a la vista. No se inventa un piso: se pide. */}
              <Pendiente>{SOFTWARE.precio.pendientePiso}</Pendiente>
            </div>
          </Reveal>
        </section>

        {/* ── Qué incluye / qué no ───────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <h2 className="text-[length:var(--text-display)]">{SOFTWARE.incluyeTitulo[idioma]}</h2>
              <ul className="mt-8 grid gap-3">
                {SOFTWARE.incluye[idioma].map((x) => (
                  <li key={x} className="flex items-start gap-3 text-ink-soft">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-brand" strokeWidth={2} />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="text-[length:var(--text-display)]">
                {SOFTWARE.noHagoAntes[idioma]}
                <span className="text-brand">{SOFTWARE.noHagoAcento[idioma]}</span>
                {SOFTWARE.noHagoDespues[idioma]}
              </h2>
              <p className="mt-4 leading-relaxed text-ink-soft">
                {SOFTWARE.noHagoEntradilla[idioma]}
              </p>
              <ul className="mt-8 grid gap-5">
                {SOFTWARE.noHago.map((x) => (
                  <li key={x.titulo.es} className="flex items-start gap-3">
                    <X className="mt-1 h-5 w-5 shrink-0 text-danger" strokeWidth={2} />
                    <span>
                      <strong className="block font-semibold text-ink">{x.titulo[idioma]}</strong>
                      <span className="mt-1 block text-sm leading-relaxed text-ink-soft">
                        {x.cuerpo[idioma]}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ── Cómo se hace ───────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{SOFTWARE.procesoTitulo[idioma]}</h2>
          </Reveal>
          <Reveal delay={80}>
            <RailPlazo
              className="mt-10"
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
          <Reveal delay={140}>
            <p className="jv-chip jv-chip-off mt-8 gap-2 text-sm">
              <Clock className="h-4 w-4 text-brand" strokeWidth={2} aria-hidden />
              {SOFTWARE.plazoNota[idioma]}
            </p>
            {/* El plazo típico de la primera etapa es el dato que más preguntan
                y el único que no está confirmado. Queda a la vista. */}
            <Pendiente>{SOFTWARE.pendientePlazo}</Pendiente>
          </Reveal>
        </section>

        {/* ── La prueba ──────────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{SOFTWARE.pruebaTitulo[idioma]}</h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-soft">
              {SOFTWARE.pruebaP1Antes[idioma]}
              <em>{SOFTWARE.pruebaP1Cursiva[idioma]}</em>
              {SOFTWARE.pruebaP1Despues[idioma]}
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-soft">
              {SOFTWARE.pruebaP2Antes[idioma]}
              <strong className="text-ink">{SOFTWARE.pruebaP2Fuerte[idioma]}</strong>
              {SOFTWARE.pruebaP2Despues[idioma]}
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {SOFTWARE.prueba.map((p, i) => (
              <Reveal key={p.nombre} index={i}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jv-card jv-card-int group flex h-full flex-col p-7"
                >
                  <span className="jv-chip jv-chip-off w-fit text-xs">
                    {SOFTWARE.pruebaEtiqueta[idioma]}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.02em] text-ink">
                    {p.nombre}
                  </h3>
                  <p className="mt-2 flex-1 leading-relaxed text-ink-soft">{p.cuerpo[idioma]}</p>
                  <span className="jv-rule mt-5 inline-flex items-center gap-1.5 pt-4 font-mono text-sm text-brand">
                    {p.dominio}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-base ease-ps group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Con qué está construido ────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{SOFTWARE.stackTitulo[idioma]}</h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-soft">
              {SOFTWARE.stackEntradilla[idioma]}
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SOFTWARE.stack.map((s, i) => (
              <Reveal key={s.grupo.es} index={i}>
                <div className="jv-card h-full p-6">
                  <h3 className="jv-eyebrow text-ink">{s.grupo[idioma]}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {s.items.map((it) => (
                      <li key={it} className="jv-chip jv-chip-off text-xs">
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Preguntas ──────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{SOFTWARE.faqTitulo[idioma]}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              {SOFTWARE.faqEntradilla[idioma]}
            </p>
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <Faqs
              items={sinPendientes(
                SOFTWARE_FAQ.map((f) => ({ q: f.q[idioma], a: conPrecios(f.a[idioma]) }))
              )}
            />
          </Reveal>
        </section>

        {/* ── Cierre ─────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-6 py-16 text-center md:px-12 md:py-24">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{SOFTWARE.cierre.titulo[idioma]}</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              {SOFTWARE.cierre.cuerpo[idioma]}
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href={enlaceReal(es ? "/#agenda" : "/en#agenda")}>
                  {SOFTWARE.ctaPrincipal[idioma]} <ArrowRight className="h-5 w-5" />
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
