import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  Check,
  ClipboardList,
  Lock,
  MapPin,
  UserRound,
  X,
} from "lucide-react";

import { CLINICAS, CLINICAS_FAQ } from "@/content/paginas/clinicas";
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
import { BloqueLocalGoogle } from "@/components/visuales/BloqueLocalGoogle";
import { CasillaVacia } from "@/components/visuales/CasillaVacia";
import { Censura } from "@/components/visuales/Censura";
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
 * autorizado. Por eso su fila imprime «según el alcance» y su oferta no entra
 * en el JSON-LD.
 *
 * QUÉ CAMBIÓ EN LA FASE 4, Y POR QUÉ
 * ----------------------------------
 * Lo mejor de esta página —las cuatro cosas que este estudio se niega a
 * escribir en un sitio de salud— eran cuatro párrafos de normativa con una
 * equis roja delante. Correctos, y nadie los leía.
 *
 * · La pieza firma los convierte en las FRASES concretas que esas reglas
 *   prohíben, tachadas con una barra de censura que se desliza al entrar en
 *   vista. El visitante las reconoce porque las ha visto —o las ha escrito— en
 *   su propia publicidad. Las reglas siguen debajo, que es donde ahora sí se
 *   leen: como la explicación de algo que ya entendió.
 * · El hueco declarado —«lo que no tengo»— sube a la altura del hero, junto a
 *   las tarjetas del trabajo, en vez de quedar como la cuarta casilla de una
 *   rejilla de cuatro.
 * · Hero asimétrico, filas de precio con el mueble de /precios y las preguntas
 *   en `<details>`, como el resto del sitio.
 */
const PISO_WEB = PISOS.landing;
const PISO_SEO_MES = PISOS.seoMes;
const PISO_AUDITORIA = PISOS.auditoria;
const RENOVACION = PISOS.renovacion;

const GLIFOS = {
  persona: UserRound,
  lista: ClipboardList,
  cita: CalendarClock,
  check: Check,
  mapa: MapPin,
  candado: Lock,
} as const;

/** El piso de cada línea. `software` va sin número a propósito. */
const PISO_POR_SERVICIO: Record<string, number | null> = {
  web: PISO_WEB,
  citas: A_PRICES.base.citas,
  seoMes: PISO_SEO_MES,
  auditoria: PISO_AUDITORIA,
  software: null,
};

export function PaginaClinicas({ idioma, ruta }: { idioma: Idioma; ruta: string }) {
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
      ? "Diseño de páginas web para clínicas y consultorios"
      : "Web design for clinics and medical practices",
    alternateName: es
      ? [
          "Página web para consultorio médico",
          "Página web para odontólogo",
          "Página web para clínica",
          "Diseño web para profesionales de la salud",
        ]
      : ["Medical practice website", "Dentist website", "Clinic website"],
    serviceType: es
      ? "Diseño y desarrollo de páginas web para prestadores de servicios de salud"
      : "Web design and development for healthcare providers",
    description: CLINICAS.necesitaEntradilla[idioma],
    inLanguage: idioma,
    provider: { "@id": `${SITE_URL}/#organization` },
    url,
    audience: {
      "@type": "BusinessAudience",
      name: es
        ? "Clínicas, consultorios médicos, odontológicos y de terapias"
        : "Clinics, medical, dental and therapy practices",
    },
    areaServed: [
      { "@type": "Country", name: "Colombia" },
      { "@type": "AdministrativeArea", name: "Bolívar, Colombia" },
      { "@type": "AdministrativeArea", name: "Atlántico, Colombia" },
    ],
    offers: CLINICAS.precios
      .filter((p) => PISO_POR_SERVICIO[p.clave] !== null)
      .map((p) => ({
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
    { id: "no-escribo", texto: es ? "Lo que no escribo" : "What I won't write" },
    { id: "trabajo", texto: es ? "El trabajo" : "The work" },
    { id: "precios", texto: es ? "Precios" : "Pricing" },
    { id: "ficha", texto: es ? "Tu ficha de Google" : "Your Google listing" },
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
          migas={[{ texto: CLINICAS.badge[idioma] }]}
          eyebrow={CLINICAS.badge[idioma]}
          titulo={
            <>
              {CLINICAS.titulo[idioma]}{" "}
              <span className="block text-brand">{CLINICAS.tituloAcento[idioma]}</span>
            </>
          }
          entradilla={CLINICAS.necesitaEntradilla[idioma]}
          precio="landing"
          indice={<SectionIndex entradas={indice} idioma={idioma} variante="chip" />}
          /* Animal Expert: una clínica con todos los problemas de página que
             tiene una clínica, con pacientes de cuatro patas. Va rotulada como
             proyecto de estudio en su propio pie y con filete discontinuo. */
          aparte={
            <figure>
              <div className="jv-card overflow-hidden border-dashed">
                <div
                  className="relative border-b border-line bg-canvas"
                  style={{ aspectRatio: "1600 / 1000" }}
                >
                  <Image
                    src={CLINICAS.trabajo[0].imagen}
                    alt={CLINICAS.trabajo[0].alt[idioma]}
                    fill
                    sizes="(min-width: 1024px) 420px, 100vw"
                    priority
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <figcaption className="mt-3 text-center font-mono text-xs text-ink-soft">
                {CLINICAS.trabajo[0].etiqueta[idioma]}
              </figcaption>
            </figure>
          }
          acciones={
            <>
              <Button size="lg" variant="primary" asChild>
                <Link href={enlaceReal(es ? "/agendar" : "/en/book-a-call")}>
                  {CLINICAS.ctaPrincipal[idioma]} <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#precios">{CLINICAS.ctaSecundario[idioma]}</a>
              </Button>
            </>
          }
        />

        {/* ── Qué necesita ───────────────────────────────────────────── */}
        <section
          id="necesita"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {CLINICAS.necesitaTitulo[idioma]}
            </h2>
          </Reveal>

          <PainGrid
            className="mt-12"
            dolores={CLINICAS.necesita.map((n) => ({
              titulo: n.titulo[idioma],
              cuerpo: n.cuerpo[idioma],
              icono: GLIFOS[n.icono as keyof typeof GLIFOS],
              enlace: n.enlace
                ? { texto: n.enlace.texto[idioma], href: enlaceReal(n.enlace.href[idioma]) }
                : undefined,
            }))}
          />
        </section>

        {/* ── Pieza firma: lo que no voy a escribir ───────────────────── */}
        <section id="no-escribo" className="border-y border-line bg-tint">
          <div className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-28">
            <Reveal>
              <h2 className="max-w-[24ch] text-balance text-[length:var(--text-display)]">
                {CLINICAS.noEscriboTitulo[idioma]}{" "}
                <span className="text-brand">{CLINICAS.noEscriboAcento[idioma]}</span>
              </h2>
            </Reveal>

            <Censura
              className="mt-12"
              rotulo={CLINICAS.noEscriboRotulo[idioma]}
              frases={CLINICAS.noEscriboFrases.map((f) => ({
                frase: f.frase[idioma],
                motivo: f.motivo[idioma],
              }))}
            />

            {/* Las cuatro reglas, ahora como la explicación de algo que ya se
                entendió. Arriba eran cuatro párrafos de normativa que nadie
                leía; aquí llegan cuando el visitante ya tiene la pregunta. */}
            <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
              <Reveal>
                <h3 className="jv-eyebrow text-ink-muted">{CLINICAS.noEscriboReglas[idioma]}</h3>
              </Reveal>

              <Reveal delay={80}>
                <ul className="flex flex-col divide-y divide-line border-y border-line">
                  {CLINICAS.noEscribo[idioma].map((x) => (
                    <li key={x} className="flex items-start gap-3 py-4 leading-relaxed text-ink-soft">
                      <X aria-hidden className="mt-1 h-4 w-4 shrink-0 text-brand" strokeWidth={2.5} />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-8 max-w-[62ch] leading-relaxed text-ink-soft">
                  {CLINICAS.noEscriboCierreAntes[idioma]}
                  <strong className="text-ink">{CLINICAS.noEscriboCierreFuerte[idioma]}</strong>
                  {CLINICAS.noEscriboCierreDespues[idioma]}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── El trabajo real de este sector ──────────────────────────── */}
        <section
          id="trabajo"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <p className="jv-eyebrow text-brand">{CLINICAS.trabajoBadge[idioma]}</p>
            <h2 className="mt-4 text-balance text-[length:var(--text-display)]">
              {CLINICAS.trabajoTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-[62ch] leading-relaxed text-ink-soft">
              {CLINICAS.trabajoEntradilla[idioma]}
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {CLINICAS.trabajo.map((t, i) => (
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
                    sizes="(min-width:1024px) 18rem, (min-width:768px) 45vw, 92vw"
                    className="h-auto w-full"
                  />
                </ProofCard>
              </Reveal>
            ))}

            {/* El hueco declarado, del mismo alto que las otras tres: es lo más
                creíble de la sección y no se quita. */}
            <Reveal delay={240} className="h-full">
              <CasillaVacia className="h-full" rotulo={CLINICAS.casilla.rotulo[idioma]}>
                {CLINICAS.casilla.cuerpo[idioma]}
              </CasillaVacia>
            </Reveal>
          </div>

          <Reveal>
            <p className="mt-8 max-w-[62ch] leading-relaxed text-ink-soft">
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
        <section
          id="precios"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <p className="jv-eyebrow text-brand">{CLINICAS.preciosBadge[idioma]}</p>
            <h2 className="mt-4 text-balance text-[length:var(--text-display)]">
              {CLINICAS.preciosTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-[62ch] leading-relaxed text-ink-soft">
              {CLINICAS.preciosEntradilla[idioma]}
            </p>
          </Reveal>

          <ul className="mt-12 flex flex-col divide-y divide-line border-y border-line">
            {CLINICAS.precios.map((p) => {
              const piso = PISO_POR_SERVICIO[p.clave];
              return (
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

                    {piso === null ? (
                      /* Sin número que dar, la fila lo dice con palabras y no
                         finge una cifra. La ranura es la misma, así que la
                         columna no se descuadra. */
                      <span className="font-mono text-sm text-ink-muted sm:w-[10.75rem] sm:shrink-0 sm:text-right">
                        {CLINICAS.segunAlcance[idioma]}
                      </span>
                    ) : (
                      <span className="flex items-baseline gap-2 font-mono tabular-nums sm:shrink-0">
                        <span className="w-11 text-right text-xs text-ink-muted">
                          {CLINICAS.desde[idioma]}
                        </span>
                        <span className="w-[7.5rem] text-right text-[length:var(--text-h4)] text-brand">
                          {money(piso, idioma)}
                        </span>
                        <span className="w-9 whitespace-nowrap text-xs text-ink-muted">
                          {p.clave === "seoMes" ? (es ? "/mes" : "/mo") : ""}
                        </span>
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Reveal>
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              <p className="max-w-[62ch] leading-relaxed text-ink-soft">
                <strong className="text-ink">{conPrecios(CLINICAS.renovacionFuerte[idioma])}</strong>
                {CLINICAS.renovacionResto[idioma]}
              </p>
              <p className="max-w-[62ch] leading-relaxed text-ink-soft">
                {CLINICAS.posicionamientoAntes[idioma]}
                <strong className="text-ink">{CLINICAS.posicionamientoFuerte[idioma]}</strong>
                {CLINICAS.posicionamientoDespues[idioma]}
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── La ficha y el bloque local ─────────────────────────────── */}
        <section
          id="ficha"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {CLINICAS.fichaTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-[62ch] leading-relaxed text-ink-soft">
              {CLINICAS.fichaEntradilla[idioma]}
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
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
        <section
          id="arranque"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <h2 className="text-balance text-[length:var(--text-h2)]">
                  {CLINICAS.arranqueTitulo[idioma]}
                </h2>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <ListaAcopio
                titulo={CLINICAS.acopio.titulo[idioma]}
                nota={CLINICAS.acopio.nota[idioma]}
                almacen={`acopio-clinicas-${idioma}`}
                items={[...CLINICAS.acopio.items[idioma]]}
                contador={es ? "{listos} de {total} listos" : "{listos} of {total} ready"}
              />
            </Reveal>
          </div>

          <Reveal>
            <h2 className="mt-20 text-balance text-[length:var(--text-h2)]">
              {CLINICAS.procesoTitulo[idioma]}
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <RailPlazo
              className="mt-10"
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
            <p className="mt-8 font-mono text-sm text-ink-soft">{CLINICAS.plazoNota[idioma]}</p>
          </Reveal>
        </section>

        {/* ── Preguntas del sector ───────────────────────────────────── */}
        <section
          id="preguntas"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <h2 className="text-balance text-[length:var(--text-h2)]">
                  {CLINICAS.faqTitulo[idioma]}
                </h2>
              </div>
            </Reveal>

            <FaqAccordion
              grupos={[
                {
                  titulo: CLINICAS.faqTitulo[idioma],
                  items: CLINICAS_FAQ.map((f) => ({
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
          titulo={CLINICAS.cierre.titulo[idioma]}
          cuerpo={CLINICAS.cierre.cuerpo[idioma]}
          siguiente={<NextStep id="landing" idioma={idioma} />}
        />
      </main>
      <Footer idioma={idioma} />
      <WhatsAppButton idioma={idioma} />
      <BarraMovil idioma={idioma} />
    </>
  );
}
