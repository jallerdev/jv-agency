import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import { DETALLE, LINEAS, PRECIOS, RENGLONES, type LineaPrecio } from "@/content/paginas/precios";
import type { Idioma } from "@/content/types";
import { enlaceReal } from "@/lib/rutas";
import { SITE_URL } from "@/lib/site";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BarraMovil } from "@/components/BarraMovil";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BotonCuentame } from "@/components/Cuentame";

/**
 * LA PÁGINA DE PRECIOS, EN LOS DOS IDIOMAS
 * ──────────────────────────────────────────────────────────────────────────
 * Un solo componente sirve `/precios` y `/en/pricing`. La alternativa —copiar
 * el archivo y traducir la copia— es la que garantiza que dentro de tres meses
 * los dos digan cosas distintas: alguien cambia un precio en uno y no en el
 * otro, y el que queda mal es justamente el número.
 *
 * POR QUÉ SE PUBLICAN LOS NÚMEROS
 * Porque quita una fricción real: sin un número a la vista, el visitante tiene
 * que gastar una llamada para saber si le alcanza.
 *
 * LO QUE ESTA PÁGINA NO DICE, A PROPÓSITO: «ninguna agencia publica precios».
 * En Cartagena se verificó, pero en Barranquilla y en Bogotá varias sí los
 * publican. Una afirmación falsa en dos de las tres ciudades del mapa no se
 * escribe. Aquí se dice lo único cierto en todas: que yo los publico.
 */

/** Especificación de precio de una línea, o nada si no hay número. */
function especificacion(l: LineaPrecio) {
  if (!l.montoCop) return undefined;

  if (l.mensual) {
    return {
      "@type": "UnitPriceSpecification",
      priceCurrency: "COP",
      minPrice: l.montoCop,
      unitCode: "MON",
      unitText: "month",
      billingDuration: 1,
    };
  }

  return {
    "@type": "PriceSpecification",
    priceCurrency: "COP",
    /* «desde» es un piso (minPrice); una tarifa cerrada es un precio (price). */
    ...(l.esDesde ? { minPrice: l.montoCop } : { price: l.montoCop }),
  };
}

function datosEstructurados(idioma: Idioma, ruta: string, titulo: string, descripcion: string) {
  const url = `${SITE_URL}${ruta}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: titulo,
        description: descripcion,
        inLanguage: idioma,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#service` },
        /* El catálogo cuelga de la página y el proveedor apunta al mismo @id
           del grafo global: un solo negocio, no uno nuevo por página. */
        mainEntity: { "@id": `${url}#catalogo` },
      },
      {
        "@type": "OfferCatalog",
        "@id": `${url}#catalogo`,
        name: titulo,
        url,
        inLanguage: idioma,
        provider: { "@id": `${SITE_URL}/#organization` },
        itemListElement: LINEAS.map((l, i) => {
          const spec = especificacion(l);
          return {
            "@type": "Offer",
            position: i + 1,
            name: l.servicio[idioma],
            ...(spec ? { priceSpecification: spec } : {}),
            availability: "https://schema.org/InStock",
            seller: { "@id": `${SITE_URL}/#organization` },
            itemOffered: {
              "@type": "Service",
              name: l.servicio[idioma],
              description: l.schemaDesc[idioma],
              provider: { "@id": `${SITE_URL}/#organization` },
              areaServed: { "@type": "Country", name: "Colombia" },
            },
          };
        }),
      },
    ],
  };
}

/**
 * LA PROPUESTA POR ESCRITO
 * ──────────────────────────────────────────────────────────────────────────
 * Esta página sostiene la promesa más grande del sitio —«el número te llega
 * por escrito antes de que pagues nada»— y la sostenía en prosa, dentro de una
 * nota de cuatro líneas bajo la tabla. Una promesa contada hay que creerla;
 * una promesa que se ve es un objeto.
 *
 * NO LLEVA UN SOLO NÚMERO, Y ESA ES LA PIEZA. Los importes son ranuras con
 * «$ —». Un total verosímil dentro de algo que parece una cotización sería
 * exactamente el dato inventado que este proyecto se prohíbe; y la ranura
 * vacía dice mejor lo que se quiere decir: ese renglón se llena contigo.
 *
 * Las guías de puntos y las ranuras van `aria-hidden`: son dibujo. Un lector
 * de pantalla oye los conceptos y luego el pie, que es donde está la frase.
 */
function PropuestaPorEscrito({ idioma }: { idioma: Idioma }) {
  const d = PRECIOS.documento;

  return (
    <figure className="mx-auto mt-8 max-w-2xl">
      <div className="jv-card relative overflow-hidden">
        {/* Lomo: el canto encuadernado de un documento, no un borde de tarjeta. */}
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-brand-300 via-brand to-brand-700"
        />

        <div className="relative p-6 pl-7 sm:p-8 sm:pl-10">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line pb-4">
            <p className="jv-eyebrow text-accent-ink">{d.eyebrow[idioma]}</p>
            {/* Pastilla y no texto suelto: a 390 este rótulo quedaba pegado al
                de la izquierda y los dos se leían como una sola línea. */}
            <p className="jv-eyebrow rounded-full border border-line px-2.5 py-1 text-ink-soft">
              {d.ejemplo[idioma]}
            </p>
          </div>

          <ul>
            {RENGLONES.map((r) => (
              <li key={r.concepto.es} className="border-b border-dashed border-line py-4">
                {/* El concepto y su ranura en la MISMA línea, con la guía de
                    puntos en medio, y el detalle debajo a ancho completo. Si
                    compartieran línea, a 390 la guía quedaría partida y el
                    importe huérfano al fondo. */}
                <span className="flex items-baseline gap-3">
                  <span className="text-[15px] font-semibold text-ink">
                    {r.concepto[idioma]}
                  </span>
                  <span aria-hidden className="min-w-4 flex-1 border-b border-dotted border-line" />
                  <span aria-hidden className="shrink-0 font-mono text-sm tabular-nums text-ink-soft">
                    $ —
                  </span>
                </span>
                <span className="mt-1 block max-w-[42ch] text-[13px] leading-relaxed text-ink-soft">
                  {r.detalle[idioma]}
                </span>
              </li>
            ))}
          </ul>

          {/* La ranura del total es más marcada que las de arriba: es el
              renglón que el visitante vino a buscar, y sigue vacío. */}
          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-xl font-semibold text-ink">{d.total[idioma]}</span>
            <span aria-hidden className="min-w-4 flex-1 border-b border-dotted border-line" />
            <span
              aria-hidden
              className="shrink-0 rounded-lg border border-dashed border-brand/45 bg-brand/5 px-3 py-1.5 font-mono text-sm text-brand"
            >
              $ —
            </span>
          </div>

          <div className="jv-rule mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-4">
            <span className="jv-eyebrow text-ink-soft">{d.firma[idioma]}</span>
            <span className="jv-eyebrow text-accent-ink">{d.compromiso[idioma]}</span>
          </div>
        </div>
      </div>

      {/* Las dos condiciones honestas, íntegras. No se recortan: son lo que
          hace creíble la tabla de arriba. */}
      <figcaption className="mt-5 max-w-[62ch] text-pretty leading-relaxed text-ink-soft">
        {d.pie[idioma]}
      </figcaption>
    </figure>
  );
}

export function PaginaPrecios({
  idioma,
  ruta,
  titulo,
  descripcion,
}: {
  idioma: Idioma;
  /** La ruta canónica de esta versión, para el dato estructurado. */
  ruta: string;
  titulo: string;
  descripcion: string;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(datosEstructurados(idioma, ruta, titulo, descripcion)),
        }}
      />
      <Header idioma={idioma} />
      <main id="contenido">
        {/* ── Encabezado ──────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-6 pb-8 pt-32 text-center md:px-12 md:pt-40">
          <Reveal>
            <Badge>{PRECIOS.badge[idioma]}</Badge>
            <h1 className="mt-6 text-[length:var(--text-hero)]">
              {PRECIOS.titulo[idioma]}{" "}
              <span className="text-brand">{PRECIOS.tituloAcento[idioma]}</span>
            </h1>
            {/* Tres líneas a 390, no cinco: la tabla es la respuesta de esta
                página y cada línea de entradilla la empuja hacia abajo. */}
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft">
              {PRECIOS.entradilla[idioma]}
            </p>
          </Reveal>
        </section>

        {/* ── La tabla y cómo llega tu número ─────────────────────────── */}
        <section className="mx-auto max-w-4xl px-6 pb-14 pt-6 md:px-12 md:pb-16">
          {/* Encabezado solo para lectores de pantalla: la sección necesita
              nombre en el árbol de accesibilidad, pero el copy no le puso
              título visible y no se inventa uno. */}
          <h2 className="sr-only">{PRECIOS.tablaTitulo[idioma]}</h2>

          <Reveal>
            <ul className="jv-card divide-y divide-line overflow-hidden">
              {LINEAS.map((l) => (
                <li key={l.servicio.es} className="px-5 py-5 sm:px-6 sm:py-6 md:px-8">
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <span className="text-xl font-semibold text-ink">{l.servicio[idioma]}</span>
                    <span className="flex flex-col gap-1 sm:items-end">
                      <span className="font-mono text-lg tabular-nums text-brand">
                        {l.precio[idioma]}
                      </span>
                      {l.plazo && (
                        /* `items-start` y no `items-center`: el plazo de la
                           primera línea ocupa dos renglones a 390 y con el
                           reloj centrado la segunda quedaba colgando. */
                        <span className="inline-flex items-start gap-2 text-sm leading-relaxed text-ink-soft">
                          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                          {l.plazo[idioma]}
                        </span>
                      )}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <PropuestaPorEscrito idioma={idioma} />
          </Reveal>
        </section>

        {/* ── Dónde ver el detalle ────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-6 py-12 md:px-12 md:py-14">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">
              {PRECIOS.detalleTitulo[idioma]}
            </h2>
          </Reveal>
          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {DETALLE.map((d, i) => (
              <Reveal key={d.href.es} index={i}>
                <Link
                  href={enlaceReal(d.href[idioma])}
                  className="jv-card jv-card-int flex h-full min-h-11 items-center justify-between gap-3 px-5 py-4 text-sm font-semibold text-ink transition-colors duration-base ease-ps hover:text-brand sm:px-6"
                >
                  {d.texto[idioma]}
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Cierre ──────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-3xl px-6 py-16 text-center md:px-12 md:py-20">
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {PRECIOS.cierre.titulo[idioma]}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-ink-soft">
              {PRECIOS.cierre.cuerpo[idioma]}
            </p>
            {/* A 390 los dos botones se apilan y se igualan a 280 px. El tope
                no es estético: el botón flotante de WhatsApp ocupa x=318..374,
                y uno a ancho completo se le mete 52 px debajo en cuanto el
                scroll lo deja abajo a la derecha. */}
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              <Button asChild size="lg" className="w-full max-w-[17.5rem] sm:w-auto sm:max-w-none">
                <a href={enlaceReal(PRECIOS.cierre.href[idioma])}>{PRECIOS.cierre.cta[idioma]}</a>
              </Button>
              <BotonCuentame className="w-full max-w-[17.5rem] sm:w-auto sm:max-w-none" />
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
