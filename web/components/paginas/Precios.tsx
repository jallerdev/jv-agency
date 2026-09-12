import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import {
  DETALLE,
  LINEAS,
  PRECIOS,
  type LineaPrecio,
  precioImpreso,
  precioPartes,
} from "@/content/paginas/precios";
import type { Idioma } from "@/content/types";
import { enlaceReal } from "@/lib/rutas";
import { SITE_URL } from "@/lib/site";
import { CATALOGO, catalogo, money } from "@/lib/quote";
import { POSTS } from "@/lib/blog";
import { SLUGS } from "@/lib/blog-slugs";
import { cn } from "@/lib/utils";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BarraMovil } from "@/components/BarraMovil";
import { Reveal } from "@/components/Reveal";
import { Breadcrumbs } from "@/components/kit/Breadcrumbs";
import { FinalCTA } from "@/components/kit/FinalCTA";
import { FilaPrecio } from "@/components/kit/FilaPrecio";
import { Recibo } from "@/components/visuales/Recibo";

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
 *
 * QUÉ CAMBIÓ EN LA FASE 3, Y POR QUÉ
 * ----------------------------------
 * · LA TABLA ES EL HERO. Era una página con un titular, una entradilla de tres
 *   líneas y, después de todo eso, los números. El que entra aquí viene a ver
 *   cifras: ahora se ven en el primer pantallazo.
 * · «Tu propuesta» dejó de ser un documento de ejemplo con las ranuras en
 *   «$ —» y pasó a armarse: escoges, marcas y el recibo se imprime con el
 *   total sumado. Y se lleva a la llamada con un botón.
 * · Lo que cobra un tercero —la pasarela, el consumo de Meta— sale del propio
 *   catálogo, así que no puede decir aquí una cosa y otra en su página.
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

/** Los tres artículos de «¿cuánto cuesta…?», que son los que comparan mercado. */
const COMPARAR = [SLUGS.cuestaWeb, SLUGS.cuestaChatbot, SLUGS.cuestaSeo];

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
  const es = idioma === "es";

  /* Las líneas del recibo salen del catálogo: lo que se paga una vez puede ser
     la base, lo que se paga cada mes o cada año se suma aparte. Nada de esto
     se escribe aquí. */
  /* Con qué servicio de la agenda abre cada base. `lib/services.ts` tiene su
     propia lista de ids y el formulario descarta cualquier otro, así que la
     correspondencia se escribe aquí una vez en vez de adivinarse allá. */
  const SERVICIO_AGENDA: Record<string, string> = {
    landing: "web",
    tienda: "web",
    chatbot: "chatbot",
    auditoria: "seo",
    software: "software",
  };

  const bases = CATALOGO.filter((s) => s.unidad === "unico").map((s) => ({
    clave: s.id,
    nombre: s.nombre[idioma],
    monto: s.desde,
    unidad: "unico" as const,
    plazo: s.plazo?.[idioma],
    servicio: SERVICIO_AGENDA[s.id],
    /* Lo que cobra un tercero viaja PEGADO a la línea que lo arrastra, no en
       una lista aparte: así el recibo solo advierte de la comisión de la
       pasarela cuando de verdad hay tienda. */
    ajeno: s.notas[0]?.[idioma],
  }));
  const extras = CATALOGO.filter((s) => s.unidad !== "unico").map((s) => ({
    clave: s.id,
    nombre: s.nombre[idioma],
    monto: s.desde,
    unidad: (s.unidad === "mes" ? "mes" : "anio") as "mes" | "anio",
    paraBases: s.paraBases,
    ajeno: s.notas[0]?.[idioma],
  }));

  const articulos = COMPARAR.map((slug) =>
    POSTS.find((p) => p.slug.es === slug.es),
  ).filter(Boolean);

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
        {/* ── La tabla ES el hero ─────────────────────────────────────── */}
        <header className="border-b border-line">
          <div className="mx-auto max-w-[1280px] px-6 pb-16 pt-[calc(var(--header-h)+2rem)] md:px-12 md:pb-20 md:pt-[calc(var(--header-h)+3rem)]">
            <Breadcrumbs migas={[{ texto: PRECIOS.badge[idioma] }]} idioma={idioma} />

            <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
              <div>
                {/* Sin Reveal: este es el LCP. */}
                <h1 className="text-balance text-[length:var(--text-hero)]">
                  {PRECIOS.titulo[idioma]}{" "}
                  <span className="text-brand">{PRECIOS.tituloAcento[idioma]}</span>
                </h1>
                <p className="mt-6 max-w-[46ch] text-pretty text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
                  {PRECIOS.entradilla[idioma]}
                </p>
              </div>

              {/* La tabla, en el primer pantallazo. Cada fila es un enlace a
                  la página donde ese número se explica: el precio sin el
                  alcance al lado es la mitad del dato. */}
              <div>
                <h2 className="sr-only">{PRECIOS.tablaTitulo[idioma]}</h2>
                <ul className="flex flex-col divide-y divide-line border-y border-line">
                  {LINEAS.map((l, indiceFila) => {
                    const servicio = CATALOGO.find((s) => s.nombre.es === l.servicio.es);
                    const partes = precioPartes(l, idioma);
                    return (
                      <FilaPrecio
                        key={l.servicio.es}
                        idioma={idioma}
                        indice={indiceFila}
                        /* La tabla ES el hero de esta página: aquí la cuenta
                           se ve, y es lo único del sitio que cuenta al cargar
                           en vez de al entrar en vista. */
                        cuenta
                        nombre={l.servicio[idioma]}
                        plazo={l.plazo?.[idioma]}
                        monto={l.montoCop ?? partes.monto}
                        desde={Boolean(l.esDesde)}
                        unidad={partes.unidad}
                        href={servicio ? enlaceReal(servicio.href[idioma]) : undefined}
                      />
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </header>

        {/* ── Pieza firma: tu propuesta ───────────────────────────────── */}
        <section id="propuesta" className="border-b border-line bg-tint">
          <div className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-28">
            <Reveal>
              <h2 className="text-balance text-[length:var(--text-display)]">
                {PRECIOS.documento.eyebrow[idioma]}
              </h2>
              <p className="mt-4 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
                {PRECIOS.documento.pie[idioma]}
              </p>
            </Reveal>

            <Recibo
              className="mt-14"
              idioma={idioma}
              bases={bases}
              extras={extras}
              hrefAgenda={enlaceReal(es ? "/agendar" : "/en/book-a-call")}
              /* Respaldo por si una base nueva del catálogo entra sin
                 correspondencia. El formulario valida contra su propia lista
                 y descarta cualquier id que no conozca. */
              servicioAgenda="web"
            />
          </div>
        </section>

        {/* ── Dónde ver el detalle ────────────────────────────────────── */}
        <section className="mx-auto max-w-[1280px] px-6 py-20 md:px-12 md:py-24">
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-h2)]">
              {PRECIOS.detalleTitulo[idioma]}
            </h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* ── Comparar con el mercado ─────────────────────────────────── */}
        <section className="mx-auto max-w-[1280px] px-6 pb-20 md:px-12 md:pb-24">
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-h2)]">
              {es ? "Y si quieres comparar con el mercado" : "And if you want to compare with the market"}
            </h2>
            <p className="mt-3 max-w-[52ch] leading-relaxed text-ink-soft">
              {es
                ? "Los tres artículos llevan los rangos de las agencias y los precios de lista, con su fuente y su fecha."
                : "The three articles carry agency ranges and list prices, with source and date."}
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {articulos.map((p, i) =>
              p ? (
                <Reveal key={p.slug.es} delay={i * 70} className="h-full">
                  <Link
                    href={es ? `/blog/${p.slug.es}` : `/en/blog/${p.slug.en}`}
                    className={cn(
                      "jv-card jv-card-int flex h-full flex-col p-6",
                      "transition-colors duration-base ease-ps hover:border-brand",
                    )}
                  >
                    <span className="jv-titulo">{p.title[idioma]}</span>
                    <span className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                      {p.excerpt[idioma]}
                    </span>
                    <span className="jv-rule mt-5 flex items-center gap-2 pt-4 font-mono text-xs text-ink-muted">
                      {p.readingMinutes} min
                    </span>
                  </Link>
                </Reveal>
              ) : null,
            )}
          </div>
        </section>

        <FinalCTA
          idioma={idioma}
          titulo={PRECIOS.cierre.titulo[idioma]}
          cuerpo={PRECIOS.cierre.cuerpo[idioma]}
        />
      </main>
      <Footer idioma={idioma} />
      <WhatsAppButton idioma={idioma} />
      <BarraMovil idioma={idioma} />
    </>
  );
}
