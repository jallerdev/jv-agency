import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  ExternalLink,
  KeyRound,
  LayoutTemplate,
  MapPin,
  RefreshCw,
  Search,
  Smartphone,
} from "lucide-react";

import { WEB, WEB_CERCA, WEB_FAQ, WEB_PRUEBAS } from "@/content/paginas/web";
import type { Idioma } from "@/content/types";
import { enlaceReal } from "@/lib/rutas";
import { SITE_URL } from "@/lib/site";
import { PRICES, money, PISOS} from "@/lib/quote";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BarraMovil } from "@/components/BarraMovil";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Faqs } from "@/components/Faqs";
import { sinPendientes } from "@/components/Pendiente";
import { BotonCuentame } from "@/components/Cuentame";
import { ArbolDecision, type NodoArbol } from "@/components/visuales/ArbolDecision";
import { Comparador } from "@/components/visuales/Comparador";
import { ListaAcopio } from "@/components/visuales/ListaAcopio";
import { RailDistancia } from "@/components/visuales/RailDistancia";
import { RailPlazo } from "@/components/visuales/RailPlazo";

/**
 * DISEÑO DE PÁGINAS WEB, EN LOS DOS IDIOMAS
 * ──────────────────────────────────────────────────────────────────────────
 * Un componente para `/servicios/diseno-de-paginas-web` y
 * `/en/services/web-design`.
 *
 * LOS NÚMEROS NO SE ESCRIBEN A MANO EN NINGÚN SITIO. Salen de `lib/quote.ts`,
 * que es la fuente de verdad del cotizador interno, y el contenido los pide
 * con marcadores —`{piso}`, `{ecom}`, `{marca}`— que se sustituyen aquí. Antes
 * el 2.500.000 estaba escrito a mano en dos sitios de esta misma página.
 */

/** Alias locales de los pisos publicados, para no repetir `PISOS.` doce veces. */
const PISO_LANDING = PISOS.landing;
const PISO_ECOM = PISOS.tienda;
const PISO_AUDITORIA = PISOS.auditoria;
const PISO_SEO_MES = PISOS.seoMes;
const RENOVACION = PISOS.renovacion;

const GLIFOS = {
  movil: Smartphone,
  rehacer: RefreshCw,
  llave: KeyRound,
  landing: LayoutTemplate,
  empresa: Building2,
  buscar: Search,
} as const;

/** Sustituye los marcadores de precio del contenido por el número de verdad. */
function conPrecios(texto: string, idioma: Idioma) {
  return texto
    .replaceAll("{piso}", money(PISO_LANDING, idioma))
    .replaceAll("{ecom}", money(PISO_ECOM, idioma))
    .replaceAll("{auditoria}", money(PISO_AUDITORIA, idioma))
    .replaceAll("{seoMes}", money(PISO_SEO_MES, idioma))
    .replaceAll("{marca}", money(PRICES.marca.nada, idioma))
    .replaceAll("{mantenimiento}", money(PRICES.mantenimiento.basico, idioma))
    .replaceAll("{renovacion}", money(RENOVACION, idioma));
}

/**
 * El árbol que encabeza los precios. Contesta la pregunta que de verdad trae
 * el visitante —«¿cuál de los tres pido?»— y su primera rama lo saca honesto
 * hacia tiendas virtuales, que era un párrafo entero de desvío.
 */
function arbolDe(idioma: Idioma): NodoArbol {
  const a = WEB.arbol;
  return {
    tipo: "pregunta",
    pregunta: a.p1[idioma],
    opciones: [
      {
        etiqueta: a.p1si[idioma],
        siguiente: {
          tipo: "resultado",
          titulo: a.tienda.titulo[idioma],
          detalle: a.tienda.detalle[idioma],
          pie: `${WEB.desde[idioma]} ${money(PISO_ECOM, idioma)} · ${a.tienda.semanas[idioma]}`,
          enlace: {
            texto: a.tienda.enlace[idioma],
            href: enlaceReal(a.tienda.href[idioma]),
          },
        },
      },
      {
        etiqueta: a.p1no[idioma],
        siguiente: {
          tipo: "pregunta",
          pregunta: a.p2[idioma],
          opciones: [
            {
              etiqueta: a.p2si[idioma],
              siguiente: {
                tipo: "resultado",
                titulo: a.rediseno.titulo[idioma],
                detalle: a.rediseno.detalle[idioma],
                pie: a.rediseno.pie[idioma],
              },
            },
            {
              etiqueta: a.p2no[idioma],
              siguiente: {
                tipo: "pregunta",
                pregunta: a.p3[idioma],
                opciones: [
                  {
                    etiqueta: a.p3uno[idioma],
                    siguiente: {
                      tipo: "resultado",
                      titulo: a.landing.titulo[idioma],
                      detalle: a.landing.detalle[idioma],
                      pie: `${WEB.desde[idioma]} ${money(PISO_LANDING, idioma)} · ${a.landing.dias[idioma]}`,
                    },
                  },
                  {
                    etiqueta: a.p3todo[idioma],
                    siguiente: {
                      tipo: "resultado",
                      titulo: a.corporativa.titulo[idioma],
                      detalle: a.corporativa.detalle[idioma],
                      pie: `${WEB.desde[idioma]} ${money(PRICES.base.corp, idioma)} · ${a.corporativa.semanas[idioma]}`,
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  };
}

export function PaginaWeb({ idioma, ruta }: { idioma: Idioma; ruta: string }) {
  const url = `${SITE_URL}${ruta}`;
  const es = idioma === "es";
  /* El piso de cada formato: landing y corporativa lo publican; el rediseño
     no tiene piso publicable —cuesta lo que cueste el sitio que queda debajo—
     y poner una cifra ahí sería inventarla. */
  const pisos = [PISO_LANDING, PRICES.base.corp, null];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#servicio`,
    name: WEB.badge[idioma],
    serviceType: es ? "Diseño y desarrollo de páginas web" : "Web design and development",
    description: WEB.entradilla[idioma],
    inLanguage: idioma,
    provider: { "@id": `${SITE_URL}/#organization` },
    url,
    areaServed: [
      { "@type": "Country", name: "Colombia" },
      {
        "@type": "City",
        name: "Cartagena de Indias",
        containedInPlace: { "@type": "AdministrativeArea", name: "Bolívar" },
      },
      { "@type": "AdministrativeArea", name: "Bolívar, Colombia" },
    ],
    offers: [
      {
        "@type": "Offer",
        name: es ? "Página web" : "Website",
        description: es
          ? "Página web a la medida, con diseño propio, dominio y correo corporativo. Entrega en 5 días."
          : "A custom website, with original design, domain and business email. Delivered in 5 days.",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "COP",
          minPrice: PISO_LANDING,
        },
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: es ? "Renovación anual" : "Yearly renewal",
        description: es
          ? "Renovación anual del dominio, el alojamiento y el mantenimiento del sitio en pie."
          : "Yearly renewal of the domain, the hosting and keeping the site standing.",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "COP",
          price: RENOVACION,
        },
        availability: "https://schema.org/InStock",
      },
    ],
  };

  const faqs = WEB_FAQ.map((f) => ({
    q: f.q[idioma],
    a: conPrecios(f.a[idioma], idioma),
    verify: f.verify,
  }));

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
            <Badge>{WEB.badge[idioma]}</Badge>
            <h1 className="mt-6 text-[length:var(--text-hero)]">
              {/* El espacio explícito importa: sin él, el textContent del h1
                  que lee un rastreador queda «páginas webpara». */}
              {WEB.titulo[idioma]}{" "}
              <span className="block text-brand">{WEB.tituloAcento[idioma]}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft">
              {WEB.entradilla[idioma]}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href={enlaceReal(es ? "/#agenda" : "/en#agenda")}>
                  {WEB.ctaPrincipal[idioma]} <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#precio">{WEB.ctaSecundario[idioma]}</a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="jv-chip jv-chip-off mx-auto mt-8 gap-2 text-sm">
              <MapPin className="h-4 w-4 shrink-0 text-brand" strokeWidth={2} aria-hidden />
              {WEB.ubicacion[idioma]}
            </p>
          </Reveal>
        </section>

        {/* ── El diferenciador, arriba y no enterrado ─────────────────── */}
        <section className="mx-auto max-w-4xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">
              {WEB.diferenciador.titulo[idioma]}{" "}
              <span className="text-brand">{WEB.diferenciador.acento[idioma]}</span>
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {WEB.diferenciador.parrafo1[idioma]}
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
              <strong className="text-ink">{WEB.diferenciador.fuerte[idioma]}</strong>
              {WEB.diferenciador.parrafo2[idioma]}
            </p>
          </Reveal>
        </section>

        {/* ── Para quién es ──────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{WEB.paraQuienTitulo[idioma]}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {WEB.paraQuienEntradilla[idioma]}
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {WEB.paraQuien.map((p, i) => {
              const Glifo = GLIFOS[p.icono as keyof typeof GLIFOS];
              return (
                <Reveal key={p.titulo.es} delay={i * 70}>
                  <article className="jv-card jv-card-int flex h-full flex-col p-7">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-quiet text-brand">
                      <Glifo className="h-6 w-6" strokeWidth={2} aria-hidden />
                    </span>
                    <h3 className="jv-titulo mt-5">{p.titulo[idioma]}</h3>
                    <p className="mt-2 flex-1 leading-relaxed text-ink-soft">{p.cuerpo[idioma]}</p>
                    {p.enlace && (
                      <Link
                        href={enlaceReal(p.enlace.href[idioma])}
                        className="jv-enlace mt-4 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-brand"
                      >
                        {p.enlace.texto[idioma]}{" "}
                        <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                      </Link>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ── Qué se hace y cuánto cuesta ────────────────────────────── */}
        <section id="precio" className="mx-auto max-w-6xl scroll-mt-32 px-6 py-12 md:px-12">
          <Reveal>
            <Badge>{WEB.badgePrecio[idioma]}</Badge>
            <h2 className="mt-6 text-[length:var(--text-display)]">
              {WEB.formatosTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {WEB.formatosEntradillaAntes[idioma]}
              <Link
                href={enlaceReal(es ? "/precios" : "/en/pricing")}
                className="jv-enlace font-semibold text-brand"
              >
                {WEB.formatosEntradillaEnlace[idioma]}
              </Link>
              .
            </p>
          </Reveal>

          {/* Antes de las tres tarjetas, la pregunta que trae el visitante:
              cuál de los tres pedir. La primera rama lo manda a tiendas. */}
          <Reveal delay={80}>
            <ArbolDecision raiz={arbolDe(idioma)} idioma={idioma} className="mt-10" />
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {WEB.formatos.map((f, i) => {
              const Glifo = GLIFOS[f.icono as keyof typeof GLIFOS];
              const piso = pisos[i];
              return (
                <Reveal key={f.nombre.es} delay={i * 80}>
                  <article className="jv-card jv-card-int flex h-full flex-col p-7">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-quiet text-brand">
                      <Glifo className="h-6 w-6" strokeWidth={2} aria-hidden />
                    </span>
                    <h3 className="jv-titulo mt-5">{f.nombre[idioma]}</h3>
                    <p className="jv-eyebrow mt-1 text-ink-soft">
                      {WEB.tambien[idioma]} {f.tambien[idioma]}
                    </p>

                    <p className="mt-5 text-sm font-semibold text-ink">
                      {WEB.quePaginas[idioma]}
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {f.paginas[idioma].map((p) => (
                        <li key={p} className="jv-chip jv-chip-off text-xs">
                          {p}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-5 text-sm font-semibold text-ink">{WEB.ademasDe[idioma]}</p>
                    <ul className="mt-2 grid flex-1 gap-2">
                      {f.incluye[idioma].map((x) => (
                        <li key={x} className="flex items-start gap-2 text-sm text-ink-soft">
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                            strokeWidth={2}
                            aria-hidden
                          />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="jv-rule mt-5 pt-4 font-mono text-lg text-brand">
                      {piso
                        ? `${WEB.desde[idioma]} ${money(piso, idioma)}`
                        : WEB.segunLoQueHaya[idioma]}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ── Qué incluye y qué NO ───────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-12">
          <Reveal>
            <Comparador
              tituloComo="h2"
              tituloIncluye={WEB.comparador.incluye[idioma]}
              tituloNoIncluye={
                <>
                  {WEB.comparador.noIncluyeAntes[idioma]}
                  <span className="text-brand">{WEB.comparador.noIncluyeAcento[idioma]}</span>
                  {WEB.comparador.noIncluyeDespues[idioma]}
                </>
              }
              nota={WEB.comparador.nota[idioma]}
              incluye={[...WEB.incluyeSiempre[idioma]]}
              noIncluye={WEB.noIncluye.map((n) => ({
                texto: conPrecios(n.texto[idioma], idioma),
                quien: n.quien[idioma],
              }))}
            />
          </Reveal>
        </section>

        {/* ── Cómo se hace ───────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{WEB.procesoTitulo[idioma]}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {WEB.procesoEntradilla[idioma]}
            </p>
          </Reveal>

          {/* El tramo punteado es el argumento: el reloj arranca con el
              material, no con la firma. Dicho como dibujo y no como excusa. */}
          <Reveal delay={80}>
            <RailPlazo
              className="mt-10"
              previo={{
                etiqueta: WEB.previo.etiqueta[idioma],
                texto: WEB.previo.texto[idioma],
              }}
              hitos={WEB.hitos.map((h) => ({
                etiqueta: h.etiqueta[idioma],
                texto: h.texto[idioma],
              }))}
            />
          </Reveal>

          <Reveal delay={140}>
            <ListaAcopio
              className="mt-12 max-w-2xl"
              almacen={`acopio-paginas-web-${idioma}`}
              titulo={WEB.acopio.titulo[idioma]}
              nota={WEB.acopio.nota[idioma]}
              items={[...WEB.acopio.items[idioma]]}
              contador={es ? "{listos} de {total} listos" : "{listos} of {total} ready"}
            />
          </Reveal>
        </section>

        {/* ── El trabajo que respalda esto ───────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{WEB_PRUEBAS.titulo[idioma]}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {WEB_PRUEBAS.entradilla[idioma]}
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {WEB_PRUEBAS.fichas.map((f, i) => (
              <Reveal key={f.nombre.es} delay={i * 80}>
                <article className="jv-card jv-card-int flex h-full flex-col p-7">
                  <span className="jv-chip jv-chip-off w-fit text-xs">{f.etiqueta[idioma]}</span>
                  <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.02em] text-ink">
                    {f.nombre[idioma]}
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{f.cuerpo[idioma]}</p>
                  {f.url && (
                    <a
                      href={f.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="jv-enlace mt-4 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-brand"
                    >
                      {f.dominio} <ExternalLink className="h-4 w-4" strokeWidth={2} aria-hidden />
                    </a>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Dónde estoy y a dónde llego ────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-6 py-12 md:px-12">
          <Reveal>
            <div className="jv-card p-7 md:p-10">
              <h2 className="text-[length:var(--text-display)]">{WEB_CERCA.titulo[idioma]}</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                {WEB_CERCA.cuerpoAntes[idioma]}
                <strong className="text-ink">{WEB_CERCA.lugar[idioma]}</strong>
                {WEB_CERCA.cuerpoDespues[idioma]}
              </p>

              {/* La ventaja y la limitación en el mismo dibujo. No es un mapa a
                  propósito: un mapa insinúa cobertura que no existe. */}
              <RailDistancia className="mt-8" />

              <ul className="mt-8 flex flex-wrap gap-3">
                {WEB_CERCA.ciudades.map((c) => (
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
          </Reveal>
        </section>

        {/* ── Preguntas ──────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{WEB.faqTitulo[idioma]}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              {WEB.faqEntradilla[idioma]}
            </p>
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <Faqs items={sinPendientes(faqs)} />
          </Reveal>
        </section>

        {/* ── Cierre ─────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-6 py-16 text-center md:px-12 md:py-24">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{WEB.cierre.titulo[idioma]}</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              {WEB.cierre.cuerpo[idioma]}
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href={enlaceReal(es ? "/#agenda" : "/en#agenda")}>
                  {WEB.ctaPrincipal[idioma]} <ArrowRight className="h-5 w-5" />
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
