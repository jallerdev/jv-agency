import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Camera,
  ShieldCheck,
  Sparkles,
  Tags,
  Users,
} from "lucide-react";

import { SALONES, SALONES_FAQ } from "@/content/paginas/salones";
import type { Idioma } from "@/content/types";
import { enlaceReal } from "@/lib/rutas";
import { SITE_URL } from "@/lib/site";
import { A_PRICES, money, PISOS } from "@/lib/quote";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BarraMovil } from "@/components/BarraMovil";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/kit/PageHero";
import { SectionIndex } from "@/components/kit/SectionIndex";
import { PainGrid } from "@/components/kit/PainGrid";
import { ProofCard } from "@/components/kit/ProofCard";
import { FaqAccordion } from "@/components/kit/FaqAccordion";
import { FinalCTA, NextStep } from "@/components/kit/FinalCTA";
import { CartaServicios } from "@/components/visuales/CartaServicios";
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
 * lenguas. No son clientes que pagaron y la etiqueta es lo que lo sostiene;
 * ahora además lo dice la FORMA de la tarjeta —filete discontinuo, sin punto
 * de «en línea» y sin enlace—, que es lo que ve quien no lee las etiquetas.
 *
 * QUÉ CAMBIÓ EN LA FASE 4, Y POR QUÉ
 * ----------------------------------
 * Esta página defendía dos cosas —publica tus precios y deja de contestar
 * veinte mensajes para agendar— en dos bloques separados: una rejilla de seis
 * razones y un hilo de WhatsApp fijo. El visitante tenía que juntarlas de
 * cabeza.
 *
 * · La pieza firma las une: **la carta de servicios**. Se toca un servicio y la
 *   conversación de al lado arranca con ese servicio, su duración y su precio
 *   dentro de la respuesta. Precio publicado y reserva sin fricción, en un
 *   solo objeto que se toca.
 * · El hero deja de estar centrado a 896 px y pasa a la composición asimétrica
 *   del kit, con la captura de Marcopolo —trabajo real de este sector— a la
 *   derecha.
 * · Las quince preguntas pasan a `<details>`: nada sale del HTML del servidor y
 *   la página deja de medir una pantalla y media de más.
 */
const PISO_WEB = PISOS.landing;
const PISO_SEO_MES = PISOS.seoMes;
const PISO_AUDITORIA = PISOS.auditoria;
const PISO_TIENDA = PISOS.tienda;
const RENOVACION = PISOS.renovacion;

const GLIFOS = {
  precios: Tags,
  cita: CalendarCheck,
  foto: Camera,
  equipo: Users,
  reglas: ShieldCheck,
  spa: Sparkles,
} as const;

/** El piso de cada línea de precio, por la misma clave que usa el contenido. */
const PISO_POR_SERVICIO: Record<string, number> = {
  web: PISO_WEB,
  citas: A_PRICES.base.citas,
  seoMes: PISO_SEO_MES,
  auditoria: PISO_AUDITORIA,
  tienda: PISO_TIENDA,
};

export function PaginaSalones({ idioma, ruta }: { idioma: Idioma; ruta: string }) {
  const url = `${SITE_URL}${ruta}`;
  const es = idioma === "es";

  const conPrecios = (t: string) =>
    t
      .replaceAll("{citas}", money(A_PRICES.base.citas, idioma))
      .replaceAll("{renovacion}", money(RENOVACION, idioma));

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
        minPrice: PISO_POR_SERVICIO[p.clave],
      },
      availability: "https://schema.org/InStock",
    })),
  };

  const indice = [
    { id: "necesita", texto: es ? "Qué resuelve" : "What it solves" },
    { id: "carta", texto: es ? "Tu carta" : "Your menu" },
    { id: "trabajo", texto: es ? "El trabajo" : "The work" },
    { id: "precios", texto: es ? "Precios" : "Pricing" },
    { id: "arranque", texto: es ? "Cómo arranca" : "How it starts" },
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
          variante="sector"
          idioma={idioma}
          migas={[{ texto: SALONES.badge[idioma] }]}
          eyebrow={SALONES.badge[idioma]}
          titulo={
            <>
              {SALONES.titulo[idioma]}{" "}
              <span className="block text-brand">{SALONES.tituloAcento[idioma]}</span>
            </>
          }
          entradilla={SALONES.entradilla1[idioma]}
          precio="landing"
          indice={<SectionIndex entradas={indice} idioma={idioma} variante="chip" />}
          /* La captura de Marcopolo: trabajo real de ESTE sector, y rotulada
             como proyecto de estudio dentro del propio pie. Un salón que llega
             aquí quiere ver un salón, no un icono de tijeras. */
          aparte={
            <figure>
              <div className="jv-card overflow-hidden border-dashed">
                <div
                  className="relative border-b border-line bg-canvas"
                  style={{ aspectRatio: "1600 / 1000" }}
                >
                  <Image
                    src={SALONES.trabajo[0].imagen}
                    alt={SALONES.trabajo[0].alt[idioma]}
                    fill
                    sizes="(min-width: 1024px) 420px, 100vw"
                    priority
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <figcaption className="mt-3 text-center font-mono text-xs text-ink-soft">
                {SALONES.trabajo[0].etiqueta[idioma]}
              </figcaption>
            </figure>
          }
          acciones={
            <>
              <Button size="lg" variant="primary" asChild>
                <Link href={enlaceReal(es ? "/agendar" : "/en/book-a-call")}>
                  {SALONES.ctaPrincipal[idioma]} <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#precios">{SALONES.ctaSecundario[idioma]}</a>
              </Button>
            </>
          }
        />

        {/* ── Qué tiene que resolver la página ────────────────────────── */}
        <section
          id="necesita"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {SALONES.necesitaTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
              {SALONES.entradilla2Antes[idioma]}
              <strong className="text-ink">{money(PISO_WEB, idioma)}</strong>
              {SALONES.entradilla2Medio[idioma]}
              <strong className="text-ink">{SALONES.entradilla2Dias[idioma]}</strong>
              {SALONES.entradilla2Fin[idioma]}
            </p>
          </Reveal>

          <PainGrid
            className="mt-12"
            dolores={SALONES.necesita.map((n) => ({
              titulo: n.titulo[idioma],
              cuerpo: n.cuerpo[idioma],
              icono: GLIFOS[n.icono as keyof typeof GLIFOS],
              enlace: n.enlace
                ? { texto: n.enlace.texto[idioma], href: enlaceReal(n.enlace.href[idioma]) }
                : undefined,
            }))}
          />

          {/* La que NO se escribe. Va sola y con filete: es la única promesa
              que esta página hace por omisión, y enterrada entre seis tarjetas
              no se leía como la línea que es. */}
          <Reveal>
            <p className="jv-rule mt-12 max-w-[62ch] pt-8 text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
              <strong className="text-ink">{SALONES.noPrometo.fuerte[idioma]}</strong>
              {SALONES.noPrometo.resto[idioma]}
            </p>
          </Reveal>
        </section>

        {/* ── Pieza firma: la carta de servicios ──────────────────────── */}
        <section id="carta" className="border-y border-line bg-tint">
          <div className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-28">
            <Reveal>
              <h2 className="text-balance text-[length:var(--text-display)]">
                {SALONES.carta.titulo[idioma]}
              </h2>
              <p className="mt-4 max-w-[62ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
                {SALONES.carta.entradilla[idioma]}
              </p>
              <p className="mt-4 max-w-[62ch] leading-relaxed text-ink-soft">
                {SALONES.hiloEntradilla[idioma]}
              </p>
            </Reveal>

            <Reveal delay={100}>
              <CartaServicios
                className="mt-12"
                idioma={idioma}
                rotulo={SALONES.carta.rotulo[idioma]}
                ayuda={SALONES.carta.ayuda[idioma]}
                nota={SALONES.carta.nota[idioma]}
                servicios={SALONES.carta.servicios.map((s) => ({
                  clave: s.clave,
                  nombre: s.nombre[idioma],
                  duracion: s.duracion[idioma],
                  precio: s.precio[idioma],
                }))}
                guion={SALONES.carta.guion[idioma]}
                horas={SALONES.carta.horas[idioma]}
              />
            </Reveal>

            <Reveal delay={140}>
              <Link
                href={enlaceReal(
                  es ? "/servicios/chatbot-whatsapp" : "/en/services/whatsapp-chatbot",
                )}
                className="jv-enlace mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand"
              >
                {SALONES.hiloEnlace[idioma]} <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ── El trabajo real de este sector ──────────────────────────── */}
        <section
          id="trabajo"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <p className="jv-eyebrow text-brand">{SALONES.trabajoBadge[idioma]}</p>
            <h2 className="mt-4 text-balance text-[length:var(--text-display)]">
              {SALONES.trabajoTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-[62ch] leading-relaxed text-ink-soft">
              {SALONES.trabajoEntradilla[idioma]}
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {SALONES.trabajo.map((t, i) => (
              <Reveal key={t.nombre} delay={i * 80} className="h-full">
                <ProofCard
                  idioma={idioma}
                  nombre={t.nombre}
                  categoria={t.etiqueta[idioma]}
                  cuerpo={t.cuerpo[idioma]}
                  dominio={t.dominio}
                  url={t.url}
                  estado={t.url ? "produccion" : "estudio"}
                >
                  <Image
                    src={t.imagen}
                    alt={t.alt[idioma]}
                    width={1600}
                    height={1000}
                    quality={82}
                    sizes="(min-width:1024px) 22rem, (min-width:768px) 45vw, 92vw"
                    className="h-auto w-full"
                  />
                </ProofCard>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-8 max-w-[62ch] leading-relaxed text-ink-soft">
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
        <section
          id="precios"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <p className="jv-eyebrow text-brand">{SALONES.preciosBadge[idioma]}</p>
            <h2 className="mt-4 text-balance text-[length:var(--text-display)]">
              {SALONES.preciosTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-[62ch] leading-relaxed text-ink-soft">
              {SALONES.preciosEntradilla[idioma]}
            </p>
          </Reveal>

          {/* Filas y no tarjetas: cinco líneas con el mismo mueble de
              /precios, para que el precio de un sector y el de la página de
              precios se lean como el mismo dato y no como dos ofertas. */}
          <ul className="mt-12 flex flex-col divide-y divide-line border-y border-line">
            {SALONES.precios.map((p) => (
              <li key={p.clave} className="max-w-none">
                <Link
                  href={enlaceReal(p.href[idioma])}
                  className="focus-ring flex flex-col gap-3 py-5 transition-colors duration-base ease-ps hover:text-brand sm:flex-row sm:items-start sm:justify-between sm:gap-8"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[length:var(--text-h4)] font-semibold text-ink">
                      {p.titulo[idioma]}
                    </span>
                    <span className="mt-1.5 block max-w-[62ch] text-sm leading-relaxed text-ink-soft">
                      {p.cuerpo[idioma]}
                    </span>
                    <span className="mt-2 block font-mono text-xs text-ink-muted">
                      {p.plazo[idioma]}
                    </span>
                  </span>

                  <span className="flex items-baseline gap-2 font-mono tabular-nums sm:shrink-0">
                    <span className="w-11 text-right text-xs text-ink-muted">
                      {SALONES.desde[idioma]}
                    </span>
                    <span className="w-[7.5rem] text-right text-[length:var(--text-h4)] text-brand">
                      {money(PISO_POR_SERVICIO[p.clave], idioma)}
                    </span>
                    <span className="w-9 whitespace-nowrap text-xs text-ink-muted">
                      {p.clave === "seoMes" ? (es ? "/mes" : "/mo") : ""}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Reveal>
            <p className="mt-8 max-w-[62ch] leading-relaxed text-ink-soft">
              <strong className="text-ink">{conPrecios(SALONES.renovacionFuerte[idioma])}</strong>
              {SALONES.renovacionResto[idioma]}
            </p>
          </Reveal>
        </section>

        {/* ── Arranque: la lista y el plazo ──────────────────────────── */}
        <section
          id="arranque"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <h2 className="text-balance text-[length:var(--text-h2)]">
                  {SALONES.arranqueTitulo[idioma]}
                </h2>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <ListaAcopio
                titulo={SALONES.acopio.titulo[idioma]}
                nota={SALONES.acopio.nota[idioma]}
                almacen={`acopio-salones-${idioma}`}
                items={[...SALONES.acopio.items[idioma]]}
                contador={es ? "{listos} de {total} listos" : "{listos} of {total} ready"}
              />
            </Reveal>
          </div>

          <Reveal>
            <h2 className="mt-20 text-balance text-[length:var(--text-h2)]">
              {SALONES.procesoTitulo[idioma]}
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <RailPlazo
              className="mt-10"
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
            <p className="mt-8 font-mono text-sm text-ink-soft">{SALONES.plazoNota[idioma]}</p>
          </Reveal>
        </section>

        {/* ── Preguntas del oficio ───────────────────────────────────── */}
        <section
          id="preguntas"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <h2 className="text-balance text-[length:var(--text-h2)]">
                  {SALONES.faqTitulo[idioma]}
                </h2>
              </div>
            </Reveal>

            <FaqAccordion
              grupos={[
                {
                  titulo: SALONES.faqTitulo[idioma],
                  items: SALONES_FAQ.map((f) => ({
                    q: f.q[idioma],
                    a: conPrecios(f.a[idioma]),
                  })),
                },
              ]}
            />
          </div>
        </section>

        <FinalCTA
          idioma={idioma}
          titulo={SALONES.cierre.titulo[idioma]}
          cuerpo={SALONES.cierre.cuerpo[idioma]}
          siguiente={<NextStep id="chatbot" idioma={idioma} />}
        />
      </main>
      <Footer idioma={idioma} />
      <WhatsAppButton idioma={idioma} />
      <BarraMovil idioma={idioma} />
    </>
  );
}
