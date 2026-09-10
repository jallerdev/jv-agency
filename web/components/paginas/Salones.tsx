import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Camera,
  ExternalLink,
  Scissors,
  ShieldCheck,
  Sparkles,
  Tags,
  Users,
} from "lucide-react";

import { SALONES, SALONES_FAQ } from "@/content/paginas/salones";
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
import { HiloWhatsApp } from "@/components/visuales/HiloWhatsApp";
import { ListaAcopio } from "@/components/visuales/ListaAcopio";
import { RailPlazo } from "@/components/visuales/RailPlazo";

/**
 * SALONES Y SPAS, EN LOS DOS IDIOMAS
 * ──────────────────────────────────────────────────────────────────────────
 * `Service`, no `LocalBusiness`: el negocio es de área de servicio y no hay
 * local en las ciudades que se nombran. Sin `FAQPage` a propósito —desde 2023
 * Google lo restringió a gobierno y salud—.
 *
 * Marcopolo y Elka Gómez van rotulados como PROYECTO DE ESTUDIO en las dos
 * lenguas. No son clientes que pagaron y la etiqueta es lo que lo sostiene.
 */
const PISO_WEB = 850000;
const PISO_SEO_MES = 650000;
const PISO_AUDITORIA = 390000;
const PISO_TIENDA = 2500000;
const RENOVACION = 290000;

const GLIFOS = {
  precios: Tags,
  cita: CalendarCheck,
  foto: Camera,
  equipo: Users,
  reglas: ShieldCheck,
  spa: Sparkles,
} as const;

/** El piso de cada línea de precio, por la misma clave que usa el contenido. */
const PISOS: Record<string, number> = {
  web: PISO_WEB,
  citas: A_PRICES.base.citas,
  seoMes: PISO_SEO_MES,
  auditoria: PISO_AUDITORIA,
  tienda: PISO_TIENDA,
};

export function PaginaSalones({ idioma, ruta }: { idioma: Idioma; ruta: string }) {
  const url = `${SITE_URL}${ruta}`;
  const es = idioma === "es";
  const mensajes = SALONES.hilo.mensajes[idioma];
  const horas = SALONES.hilo.horas[idioma];

  /* El hilo: reserva de color un sábado, de noche y con el salón cerrado. Sin
     cifras —aquí no se inventa el precio de un color ajeno— y la última
     burbuja no es del bot: es el traspaso a una persona, que es el argumento
     entero de la sección. */
  const hilo = [
    { de: "cliente" as const, texto: mensajes[0], hora: horas[0] },
    { de: "bot" as const, escribiendo: true },
    { de: "bot" as const, texto: mensajes[1], hora: horas[1] },
    { de: "cliente" as const, texto: mensajes[2], hora: horas[2] },
    { de: "bot" as const, texto: mensajes[3], hora: horas[3] },
    { de: "bot" as const, traspaso: true, texto: mensajes[4], hora: horas[4] },
  ];

  const conPrecios = (t: string) =>
    t.replaceAll("{citas}", money(A_PRICES.base.citas, idioma)).replaceAll("{renovacion}", money(RENOVACION, idioma));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#servicio`,
    name: es
      ? "Diseño de páginas web para salones de belleza y spas"
      : "Web design for beauty salons and spas",
    alternateName: es
      ? [
          "Página web para salón de belleza",
          "Página web para peluquería",
          "Página web para barbería",
          "Página web para spa",
          "Diseño web para centros de estética",
        ]
      : ["Salon website", "Hairdresser website", "Barbershop website", "Spa website"],
    serviceType: es
      ? "Diseño y desarrollo de páginas web para el sector de belleza y bienestar"
      : "Web design and development for the beauty and wellness sector",
    description: SALONES.entradilla1[idioma],
    inLanguage: idioma,
    provider: { "@id": `${SITE_URL}/#organization` },
    url,
    audience: {
      "@type": "BusinessAudience",
      name: es
        ? "Salones de belleza, peluquerías, barberías, centros de estética y spas"
        : "Beauty salons, hairdressers, barbershops, aesthetic centres and spas",
    },
    areaServed: [
      { "@type": "Country", name: "Colombia" },
      { "@type": "AdministrativeArea", name: "Bolívar, Colombia" },
      { "@type": "AdministrativeArea", name: "Atlántico, Colombia" },
    ],
    offers: SALONES.precios.map((p) => ({
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
              <Scissors className="h-3.5 w-3.5" strokeWidth={2} />
              {SALONES.badge[idioma]}
            </Badge>
            <h1 className="mt-6 text-[length:var(--text-hero)]">
              {SALONES.titulo[idioma]}{" "}
              <span className="block text-brand">{SALONES.tituloAcento[idioma]}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft">
              {SALONES.entradilla1[idioma]}
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft">
              {SALONES.entradilla2Antes[idioma]}
              <strong className="text-ink">{money(PISO_WEB, idioma)}</strong>
              {SALONES.entradilla2Medio[idioma]}
              <strong className="text-ink">{SALONES.entradilla2Dias[idioma]}</strong>
              {SALONES.entradilla2Fin[idioma]}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href={enlaceReal(es ? "/#agenda" : "/en#agenda")}>
                  {SALONES.ctaPrincipal[idioma]} <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#precios">{SALONES.ctaSecundario[idioma]}</a>
              </Button>
            </div>
          </Reveal>
        </section>

        {/* ── Qué necesita la página de un salón ─────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{SALONES.necesitaTitulo[idioma]}</h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {SALONES.necesita.map((n, i) => {
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

          <Reveal>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              <strong className="text-ink">{SALONES.noPrometo.fuerte[idioma]}</strong>
              {SALONES.noPrometo.resto[idioma]}
            </p>
          </Reveal>
        </section>

        {/* ── La reserva, mostrada ───────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <h2 className="text-[length:var(--text-display)]">{SALONES.hiloTitulo[idioma]}</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                {SALONES.hiloEntradilla[idioma]}
              </p>
              <Link
                href={enlaceReal(
                  es ? "/servicios/chatbot-whatsapp" : "/en/services/whatsapp-chatbot"
                )}
                className="jv-enlace mt-6 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-brand"
              >
                {SALONES.hiloEnlace[idioma]} <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>

            {/* HiloWhatsApp trae escalonado propio: no se envuelve en Reveal. */}
            <HiloWhatsApp
              idioma={idioma}
              className="mx-auto w-full max-w-md"
              negocio={SALONES.hilo.negocio[idioma]}
              iniciales={SALONES.hilo.iniciales}
              mensajes={hilo}
            />
          </div>
        </section>

        {/* ── El trabajo real de este sector ──────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-12">
          <Reveal>
            <Badge>{SALONES.trabajoBadge[idioma]}</Badge>
            <h2 className="mt-6 text-[length:var(--text-display)]">
              {SALONES.trabajoTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-soft">
              {SALONES.trabajoEntradilla[idioma]}
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SALONES.trabajo.map((t, i) => (
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
                      sizes="(min-width:1024px) 22rem, (min-width:768px) 45vw, 92vw"
                      className="h-auto w-full"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="jv-chip jv-chip-off w-fit text-xs">{t.etiqueta[idioma]}</span>
                    <h3 className="jv-titulo mt-3">{t.nombre}</h3>
                    <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">
                      {t.cuerpo[idioma]}
                    </p>
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
          </div>

          <Reveal>
            <p className="mt-8 leading-relaxed text-ink-soft">
              {SALONES.portafolioAntes[idioma]}
              <Link
                href={enlaceReal(es ? "/#portafolio" : "/en#portafolio")}
                className="jv-enlace font-semibold text-brand"
              >
                {SALONES.portafolioEnlace[idioma]}
              </Link>
              {SALONES.portafolioDespues[idioma]}
            </p>
          </Reveal>
        </section>

        {/* ── Precios ────────────────────────────────────────────────── */}
        <section id="precios" className="mx-auto max-w-6xl scroll-mt-32 px-6 py-12 md:px-12">
          <Reveal>
            <Badge>{SALONES.preciosBadge[idioma]}</Badge>
            <h2 className="mt-6 text-[length:var(--text-display)]">
              {SALONES.preciosTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-soft">
              {SALONES.preciosEntradilla[idioma]}
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SALONES.precios.map((p, i) => (
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
                    {SALONES.verDetalle[idioma]} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <div className="jv-rule mt-4 pt-4">
                    <p className="font-mono text-lg text-brand">
                      {SALONES.desde[idioma]} {money(PISOS[p.clave], idioma)}
                      {p.clave === "seoMes" && (es ? "/mes" : "/month")}
                    </p>
                    <p className="mt-1 text-sm text-ink-soft">{p.plazo[idioma]}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="jv-card mt-6 p-6 leading-relaxed text-ink-soft md:p-7">
              <p>
                <strong className="text-ink">
                  {conPrecios(SALONES.renovacionFuerte[idioma])}
                </strong>
                {SALONES.renovacionResto[idioma]}
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── Arranque: la lista y el plazo ──────────────────────────── */}
        <section className="mx-auto max-w-5xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{SALONES.arranqueTitulo[idioma]}</h2>
          </Reveal>

          <Reveal delay={80}>
            <ListaAcopio
              className="mt-8"
              titulo={SALONES.acopio.titulo[idioma]}
              nota={SALONES.acopio.nota[idioma]}
              almacen={`acopio-salones-${idioma}`}
              items={[...SALONES.acopio.items[idioma]]}
              contador={es ? "{listos} de {total} listos" : "{listos} of {total} ready"}
            />
          </Reveal>

          <Reveal>
            <h2 className="mt-14 text-[length:var(--text-display)]">
              {SALONES.procesoTitulo[idioma]}
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <RailPlazo
              className="mt-8"
              previo={{
                etiqueta: SALONES.previo.etiqueta[idioma],
                texto: SALONES.previo.texto[idioma],
              }}
              hitos={SALONES.proceso.map((p) => ({
                etiqueta: p.etiqueta[idioma],
                texto: p.texto[idioma],
              }))}
            />
          </Reveal>

          <Reveal>
            <p className="jv-chip jv-chip-off mt-8 min-h-11 text-sm">
              {SALONES.plazoNota[idioma]}
            </p>
          </Reveal>
        </section>

        {/* ── Preguntas del oficio ───────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{SALONES.faqTitulo[idioma]}</h2>
          </Reveal>
          <div className="mt-10 grid gap-4">
            {SALONES_FAQ.map((f, i) => (
              <Reveal key={f.q.es} index={i}>
                <article className="jv-card p-6 md:p-7">
                  <h3 className="jv-titulo">{f.q[idioma]}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{conPrecios(f.a[idioma])}</p>
                  {f.enlace && (
                    <Link
                      href={enlaceReal(f.enlace.href[idioma])}
                      className="jv-enlace mt-4 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-brand"
                    >
                      {f.enlace.texto[idioma]} <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Cierre ─────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-6 py-16 text-center md:px-12 md:py-24">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{SALONES.cierre.titulo[idioma]}</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              {SALONES.cierre.cuerpo[idioma]}
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href={enlaceReal(es ? "/#agenda" : "/en#agenda")}>
                  {SALONES.ctaPrincipal[idioma]} <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link
                  href={enlaceReal(
                    es ? "/servicios/chatbot-whatsapp" : "/en/services/whatsapp-chatbot"
                  )}
                >
                  {SALONES.cierre.otro[idioma]}
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
