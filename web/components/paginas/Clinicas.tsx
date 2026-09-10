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

import { CLINICAS, CLINICAS_FAQ } from "@/content/paginas/clinicas";
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
import { BloqueLocalGoogle } from "@/components/visuales/BloqueLocalGoogle";
import { CasillaVacia } from "@/components/visuales/CasillaVacia";
import { FichaGoogle } from "@/components/visuales/FichaGoogle";
import { ListaAcopio } from "@/components/visuales/ListaAcopio";
import { RailPlazo } from "@/components/visuales/RailPlazo";

/**
 * CLÍNICAS Y CONSULTORIOS, EN LOS DOS IDIOMAS
 * ──────────────────────────────────────────────────────────────────────────
 * `Service`, no `LocalBusiness` ni `MedicalBusiness`: el prestador de salud es
 * el cliente, no el estudio. Lo que se ofrece aquí es diseño de páginas web, y
 * marcarlo como negocio médico sería declarar algo que no se es.
 *
 * `software` no lleva precio: esa línea se cotiza por alcance y no hay número
 * autorizado. Por eso su tarjeta imprime «según el alcance» y su oferta no
 * entra en el JSON-LD.
 */
const PISO_WEB = 850000;
const PISO_SEO_MES = 650000;
const PISO_AUDITORIA = 390000;
const RENOVACION = 290000;

const GLIFOS = {
  persona: UserRound,
  lista: ClipboardList,
  cita: CalendarClock,
  check: Check,
  mapa: MapPin,
  candado: Lock,
} as const;

/** El piso de cada línea. `software` va sin número a propósito. */
const PISOS: Record<string, number | null> = {
  web: PISO_WEB,
  citas: A_PRICES.base.citas,
  software: null,
  auditoria: PISO_AUDITORIA,
  seoMes: PISO_SEO_MES,
};

export function PaginaClinicas({ idioma, ruta }: { idioma: Idioma; ruta: string }) {
  const url = `${SITE_URL}${ruta}`;
  const es = idioma === "es";

  const conPrecios = (t: string) =>
    t
      .replaceAll("{citas}", money(A_PRICES.base.citas))
      .replaceAll("{web}", money(PISO_WEB))
      .replaceAll("{auditoria}", money(PISO_AUDITORIA))
      .replaceAll("{renovacion}", money(RENOVACION));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#servicio`,
    name: es
      ? "Diseño de páginas web para clínicas y consultorios"
      : "Web design for clinics and medical practices",
    alternateName: es
      ? [
          "Página web para consultorio médico",
          "Página web para clínica",
          "Diseño web para centros médicos",
          "Página web para odontología",
          "Página web para veterinaria",
        ]
      : ["Medical practice website", "Clinic website", "Dental website", "Veterinary website"],
    serviceType: es
      ? "Diseño y desarrollo de páginas web para prestadores de servicios de salud"
      : "Web design and development for healthcare providers",
    description: CLINICAS.entradilla1[idioma],
    inLanguage: idioma,
    provider: { "@id": `${SITE_URL}/#organization` },
    url,
    audience: {
      "@type": "BusinessAudience",
      name: es
        ? "Consultorios, clínicas, centros médicos, odontología, fisioterapia y veterinarias"
        : "Practices, clinics, medical centres, dentistry, physiotherapy and veterinary clinics",
    },
    areaServed: [
      { "@type": "Country", name: "Colombia" },
      { "@type": "AdministrativeArea", name: "Bolívar, Colombia" },
      { "@type": "AdministrativeArea", name: "Atlántico, Colombia" },
    ],
    /* Solo las líneas con precio autorizado. Software se cotiza por alcance y
       un número inventado en el dato estructurado es tan falso como uno
       inventado en la página. */
    offers: CLINICAS.precios
      .filter((p) => PISOS[p.clave] !== null)
      .map((p) => ({
        "@type": "Offer",
        name: p.titulo[idioma],
        description: p.cuerpo[idioma],
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "COP",
          minPrice: PISOS[p.clave],
        },
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
        {/* ── Encabezado ─────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-6 pb-8 pt-32 text-center md:px-12 md:pt-40">
          <Reveal>
            <Badge>
              <Stethoscope className="h-3.5 w-3.5" strokeWidth={2} />
              {CLINICAS.badge[idioma]}
            </Badge>
            <h1 className="mt-6 text-[length:var(--text-hero)]">
              {CLINICAS.titulo[idioma]}{" "}
              <span className="block text-brand">{CLINICAS.tituloAcento[idioma]}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft">
              {CLINICAS.entradilla1[idioma]}
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft">
              {CLINICAS.entradilla2Antes[idioma]}
              <strong className="text-ink">{money(PISO_WEB)}</strong>
              {CLINICAS.entradilla2Medio[idioma]}
              <strong className="text-ink">{CLINICAS.entradilla2Dias[idioma]}</strong>.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href={enlaceReal(es ? "/#agenda" : "/en#agenda")}>
                  {CLINICAS.ctaPrincipal[idioma]} <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#precios">{CLINICAS.ctaSecundario[idioma]}</a>
              </Button>
            </div>
          </Reveal>
        </section>

        {/* ── Qué necesita ───────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{CLINICAS.necesitaTitulo[idioma]}</h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-soft">
              {CLINICAS.necesitaEntradilla[idioma]}
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {CLINICAS.necesita.map((n, i) => {
              const Glifo = GLIFOS[n.icono as keyof typeof GLIFOS];
              return (
                <Reveal key={n.titulo.es} index={i}>
                  <article className="jv-card jv-card-int flex h-full flex-col p-6 md:p-7">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-quiet text-brand">
                      <Glifo className="h-6 w-6" strokeWidth={2} aria-hidden />
                    </span>
                    <h3 className="jv-titulo mt-5">{n.titulo[idioma]}</h3>
                    <p className="mt-2 flex-1 leading-relaxed text-ink-soft">{n.cuerpo[idioma]}</p>
                    {n.enlace && (
                      <Link
                        href={enlaceReal(n.enlace.href[idioma])}
                        className="jv-enlace mt-5 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-brand"
                      >
                        {n.enlace.texto[idioma]} <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ── Lo que no escribo en una página de salud ────────────────── */}
        <section className="mx-auto max-w-4xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">
              {CLINICAS.noEscriboTitulo[idioma]}{" "}
              <span className="text-brand">{CLINICAS.noEscriboAcento[idioma]}</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <ul className="mt-8 grid gap-4">
              {CLINICAS.noEscribo[idioma].map((x) => (
                <li key={x} className="flex items-start gap-3 text-lg leading-relaxed text-ink-soft">
                  <X aria-hidden className="mt-1.5 h-5 w-5 shrink-0 text-danger" strokeWidth={2} />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
            <p className="mt-7 leading-relaxed text-ink-soft">
              {CLINICAS.noEscriboCierreAntes[idioma]}
              <strong className="text-ink">{CLINICAS.noEscriboCierreFuerte[idioma]}</strong>
              {CLINICAS.noEscriboCierreDespues[idioma]}
            </p>
          </Reveal>
        </section>

        {/* ── El trabajo real de este sector ──────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-12">
          <Reveal>
            <Badge>{CLINICAS.trabajoBadge[idioma]}</Badge>
            <h2 className="mt-6 text-[length:var(--text-display)]">
              {CLINICAS.trabajoTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-soft">
              {CLINICAS.trabajoEntradilla[idioma]}
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {CLINICAS.trabajo.map((t, i) => (
              <Reveal key={t.nombre} delay={i * 80}>
                <article
                  className={
                    t.destacada
                      ? "jv-card flex h-full flex-col overflow-hidden border-brand/30"
                      : "jv-card flex h-full flex-col overflow-hidden"
                  }
                >
                  <div className="aspect-[16/10] overflow-hidden border-b border-line bg-canvas">
                    <Image
                      src={t.imagen}
                      alt={t.alt[idioma]}
                      width={1600}
                      height={1000}
                      quality={82}
                      sizes="(min-width:768px) 34rem, 92vw"
                      className="h-auto w-full"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <span className="jv-chip jv-chip-off w-fit text-xs">{t.etiqueta[idioma]}</span>
                    <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] text-ink">
                      {t.nombre}
                    </h3>
                    <p className="mt-2 flex-1 leading-relaxed text-ink-soft">{t.cuerpo[idioma]}</p>
                    {t.enlace && (
                      <Link
                        href={enlaceReal(t.enlace.href[idioma])}
                        className="jv-enlace mt-4 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-brand"
                      >
                        {t.enlace.texto[idioma]} <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                    {t.url && (
                      <a
                        href={t.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="jv-enlace mt-4 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-brand"
                      >
                        {t.dominio} <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}

            {/* El hueco declarado. Va aquí, del mismo alto que las otras tres:
                es lo más creíble de la sección y no se quita. */}
            <Reveal delay={240}>
              <CasillaVacia className="h-full" rotulo={CLINICAS.casilla.rotulo[idioma]}>
                {CLINICAS.casilla.cuerpo[idioma]}
              </CasillaVacia>
            </Reveal>
          </div>

          <Reveal>
            <p className="mt-8 leading-relaxed text-ink-soft">
              {CLINICAS.portafolioAntes[idioma]}
              <Link
                href={enlaceReal(es ? "/#portafolio" : "/en#portafolio")}
                className="jv-enlace font-semibold text-brand"
              >
                {CLINICAS.portafolioEnlace[idioma]}
              </Link>
              {CLINICAS.portafolioDespues[idioma]}
            </p>
          </Reveal>
        </section>

        {/* ── Precios ────────────────────────────────────────────────── */}
        <section id="precios" className="mx-auto max-w-6xl scroll-mt-32 px-6 py-12 md:px-12">
          <Reveal>
            <Badge>{CLINICAS.preciosBadge[idioma]}</Badge>
            <h2 className="mt-6 text-[length:var(--text-display)]">
              {CLINICAS.preciosTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-soft">
              {CLINICAS.preciosEntradilla[idioma]}
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CLINICAS.precios.map((p, i) => {
              const piso = PISOS[p.clave];
              return (
                <Reveal key={p.clave} index={i}>
                  <article className="jv-card jv-card-int flex h-full flex-col p-6 md:p-7">
                    <h3 className="jv-titulo">{p.titulo[idioma]}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                      {p.cuerpo[idioma]}
                    </p>
                    <Link
                      href={enlaceReal(p.href[idioma])}
                      className="jv-enlace mt-4 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-brand"
                    >
                      {CLINICAS.verDetalle[idioma]} <ArrowRight className="h-4 w-4" />
                    </Link>
                    <div className="jv-rule mt-4 pt-4">
                      <p className="font-mono text-lg text-brand">
                        {piso === null
                          ? CLINICAS.segunAlcance[idioma]
                          : `${CLINICAS.desde[idioma]} ${money(piso)}${
                              p.clave === "seoMes" ? (es ? "/mes" : "/month") : ""
                            }`}
                      </p>
                      <p className="mt-1 text-sm text-ink-soft">{p.plazo[idioma]}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <div className="jv-card mt-6 p-6 leading-relaxed text-ink-soft md:p-7">
              <p>
                <strong className="text-ink">
                  {conPrecios(CLINICAS.renovacionFuerte[idioma])}
                </strong>
                {CLINICAS.renovacionResto[idioma]}
              </p>
              <p className="mt-4">
                {CLINICAS.posicionamientoAntes[idioma]}
                <strong className="text-ink">{CLINICAS.posicionamientoFuerte[idioma]}</strong>
                {CLINICAS.posicionamientoDespues[idioma]}
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── La ficha y el bloque local ─────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{CLINICAS.fichaTitulo[idioma]}</h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-soft">
              {CLINICAS.fichaEntradilla[idioma]}
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <FichaGoogle
                titulo={CLINICAS.fichaTituloCaja[idioma]}
                rotulo={CLINICAS.fichaRotulo[idioma]}
                porLlenar={CLINICAS.fichaPorLlenar[idioma]}
                campos={CLINICAS.fichaCampos.map((c) => ({
                  etiqueta: c.etiqueta[idioma],
                  valor: c.valor?.[idioma],
                }))}
              />
            </Reveal>
            <Reveal delay={80}>
              <BloqueLocalGoogle
                idioma={idioma}
                consulta={CLINICAS.consultaEjemplo[idioma]}
                tuNegocio={CLINICAS.tuNegocio[idioma]}
              />
            </Reveal>
          </div>
        </section>

        {/* ── Arranque: la lista y el plazo ──────────────────────────── */}
        <section className="mx-auto max-w-5xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{CLINICAS.arranqueTitulo[idioma]}</h2>
          </Reveal>

          <Reveal delay={80}>
            <ListaAcopio
              className="mt-8"
              titulo={CLINICAS.acopio.titulo[idioma]}
              nota={CLINICAS.acopio.nota[idioma]}
              almacen={`acopio-clinicas-${idioma}`}
              items={[...CLINICAS.acopio.items[idioma]]}
              contador={es ? "{listos} de {total} listos" : "{listos} of {total} ready"}
            />
          </Reveal>

          <Reveal>
            <h2 className="mt-14 text-[length:var(--text-display)]">
              {CLINICAS.procesoTitulo[idioma]}
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <RailPlazo
              className="mt-8"
              previo={{
                etiqueta: CLINICAS.previo.etiqueta[idioma],
                texto: CLINICAS.previo.texto[idioma],
              }}
              hitos={CLINICAS.proceso.map((p) => ({
                etiqueta: p.etiqueta[idioma],
                texto: p.texto[idioma],
              }))}
            />
          </Reveal>

          <Reveal>
            <p className="jv-chip jv-chip-off mt-8 min-h-11 text-sm">
              {CLINICAS.plazoNota[idioma]}
            </p>
          </Reveal>
        </section>

        {/* ── Preguntas del sector ───────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{CLINICAS.faqTitulo[idioma]}</h2>
          </Reveal>
          <div className="mt-10 grid gap-4">
            {CLINICAS_FAQ.map((f, i) => (
              <Reveal key={f.q.es} index={i}>
                <article className="jv-card p-6 md:p-7">
                  <h3 className="jv-titulo">{f.q[idioma]}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{conPrecios(f.a[idioma])}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Cierre ─────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-6 py-16 text-center md:px-12 md:py-24">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{CLINICAS.cierre.titulo[idioma]}</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              {CLINICAS.cierre.cuerpo[idioma]}
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href={enlaceReal(es ? "/#agenda" : "/en#agenda")}>
                  {CLINICAS.ctaPrincipal[idioma]} <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link
                  href={enlaceReal(
                    es ? "/servicios/chatbot-whatsapp" : "/en/services/whatsapp-chatbot"
                  )}
                >
                  {CLINICAS.cierre.otro[idioma]}
                </Link>
              </Button>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer idioma={idioma} />
      <WhatsAppButton />
      <BarraMovil idioma={idioma} />
    </>
  );
}
