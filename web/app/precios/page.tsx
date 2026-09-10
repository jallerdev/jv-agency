import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BotonCuentame } from "@/components/Cuentame";
import { Pendiente } from "@/components/Pendiente";
import { SITE_URL } from "@/lib/site";

/**
 * Página de precios. La enlazan el Header, el chip del Hero, el pie y el
 * cierre de cada artículo del blog: los cuatro apuntaban a /precios desde
 * antes de que el archivo existiera, así que esto cierra un 404.
 *
 * POR QUÉ SE PUBLICAN LOS NÚMEROS
 * -------------------------------
 * Porque quita una fricción real: sin un número a la vista, el visitante tiene
 * que gastar una llamada para saber si le alcanza. Publicarlos es la decisión
 * comercial; el argumento se para solo, sin necesidad de compararse con nadie.
 *
 * LO QUE ESTA PÁGINA NO DICE, A PROPÓSITO: «ninguna agencia publica precios».
 * La investigación lo verificó en Cartagena, pero en Barranquilla varias sí
 * los publican —así lo deja escrito el comentario de cabecera de
 * `app/diseno-de-paginas-web-en-barranquilla/page.tsx`— y en Bogotá también.
 * Una afirmación que es falsa en dos de las tres ciudades del mapa no se
 * escribe. Acá se dice lo único que es verdad en todas: que yo los publico.
 *
 * LOS NÚMEROS SON LOS AUTORIZADOS Y NO SE INVENTAN OTROS. Van como cadenas
 * literales, igual que en el chip del Hero, para que coincidan carácter por
 * carácter con COPY-PRIMERA-PERSONA.md. El valor numérico limpio vive abajo,
 * en `montoCop`, y de ahí sale el JSON-LD: el dato estructurado no repite el
 * string formateado, lee el número.
 *
 * ── RONDA DE MÓVIL Y RECORTE ──────────────────────────────────────────────
 * Esta es la página que más se comparte por WhatsApp, así que se rehízo
 * empezando por 390 px. Tres cosas cambiaron:
 *
 *   1. La tabla es el héroe y se le quitó todo lo que la empujaba hacia
 *      abajo. La entradilla pasó de cinco líneas a tres.
 *   2. La nota de cuatro líneas bajo la tabla —que explicaba en prosa cómo
 *      llega el número— se convirtió en un objeto: `PropuestaPorEscrito`.
 *      Lo que se puede mostrar no se cuenta.
 *   3. Las dos condiciones honestas de esa nota NO se perdieron: siguen
 *      escritas, en el pie del visual. Son lo que hace creíble lo de arriba.
 */

export const metadata: Metadata = {
  title: "Precios de páginas web en Colombia | JV Agencia",
  description:
    "Cuánto cuesta una página web, una tienda online o el SEO de tu negocio. Precios desde $850.000 y plazos reales, publicados. Sin cotización a puerta cerrada.",
  alternates: { canonical: "/precios" },
  openGraph: {
    title: "Precios de páginas web en Colombia | JV Agencia",
    description:
      "Precios y plazos publicados: página web desde $850.000, lista en 5 días.",
    url: `${SITE_URL}/precios`,
    type: "website",
  },
};

type Linea = {
  /** Nombre del servicio, como se nombra en `lib/services.ts`. */
  servicio: string;
  /** Precio tal cual va impreso. Cadena literal a propósito (ver cabecera). */
  precio: string;
  /** Plazo de entrega, si la línea tiene uno. */
  plazo?: string;
  /** Monto en pesos para el JSON-LD. Ausente cuando no hay número que dar. */
  montoCop?: number;
  /** Si el monto es un piso («desde») o una tarifa cerrada. */
  esDesde?: boolean;
  /** Precio por mes: cambia el tipo de especificación en el JSON-LD. */
  mensual?: boolean;
  /** Descripción para el dato estructurado, no para la página. */
  schemaDesc: string;
  /** Dato por comprobar. Se pinta a la vista EN DESARROLLO, nunca en producción. */
  verify?: string;
};

const LINEAS: Linea[] = [
  {
    servicio: "Página web",
    precio: "desde $850.000",
    plazo: "5 días la landing · 1 a 2 semanas la corporativa",
    montoCop: 850000,
    esDesde: true,
    schemaDesc: "Página web a la medida, con dominio y correo propio.",
  },
  {
    servicio: "Tienda online",
    precio: "desde $2.500.000",
    plazo: "3 a 5 semanas",
    montoCop: 2500000,
    esDesde: true,
    schemaDesc:
      "Tienda en línea con catálogo, carrito, cuentas, pagos y envíos.",
  },
  {
    servicio: "Auditoría SEO",
    precio: "desde $390.000",
    plazo: "5 días",
    montoCop: 390000,
    esDesde: true,
    schemaDesc:
      "Diagnóstico de por qué un sitio no aparece cuando lo buscan, y qué se arregla primero.",
  },
  {
    servicio: "SEO local mensual",
    precio: "desde $650.000 al mes",
    montoCop: 650000,
    esDesde: true,
    mensual: true,
    schemaDesc: "Trabajo continuo de posicionamiento en búsquedas con ciudad.",
  },
  {
    servicio: "Renovación anual",
    precio: "$290.000",
    montoCop: 290000,
    schemaDesc:
      "Renovación anual del dominio, el alojamiento y el mantenimiento del sitio en pie.",
  },
  {
    servicio: "Software a la medida",
    precio: "según alcance",
    schemaDesc:
      "Apps web, sistemas internos y plataformas hechas a la medida. El precio va según el alcance.",
  },
];

/* Los tres renglones del documento. Son CONCEPTOS, no importes: describen de
   qué se compone cualquier propuesta mía y son verdaderos por construcción
   —ninguno afirma un número, un plazo ni un cliente. */
const RENGLONES = [
  { concepto: "El formato", detalle: "Landing, corporativa, tienda o software." },
  { concepto: "Lo que le sumes", detalle: "Páginas, idiomas, pasarela, reservas." },
  { concepto: "Puesta en marcha", detalle: "Dominio, correo y salida al aire." },
];

/* Enlaces internos. No son relleno: son los destinos a los que se va alguien
   que ya vio un número —el detalle del servicio o la página de su ciudad.
   NO se enlaza /cotizador: es la herramienta interna de venta, va detrás de
   contraseña (el middleware manda a /acceso) y con robots noindex. Enlazarla
   desde una página pública deja al visitante en una pantalla de contraseña. */
const DETALLE = [
  { label: "Todos los servicios", href: "/#servicios" },
  { label: "Diseño de páginas web", href: "/servicios/diseno-de-paginas-web" },
  { label: "Chatbot de WhatsApp", href: "/servicios/chatbot-whatsapp" },
  { label: "Tiendas virtuales", href: "/servicios/tiendas-virtuales" },
  { label: "Posicionamiento SEO", href: "/servicios/posicionamiento-seo" },
  { label: "Software a la medida", href: "/servicios/software-a-la-medida" },
  {
    label: "Páginas web en Cartagena",
    href: "/diseno-de-paginas-web-en-cartagena",
  },
  {
    label: "Páginas web en Barranquilla",
    href: "/diseno-de-paginas-web-en-barranquilla",
  },
  { label: "Páginas web en Bogotá", href: "/diseno-de-paginas-web-en-bogota" },
];

/**
 * LA PROPUESTA POR ESCRITO
 * ------------------------
 * Esta página sostiene la promesa más grande del sitio —«el número te llega
 * por escrito antes de que pagues nada»— y hasta hoy la sostenía en prosa,
 * dentro de una nota de cuatro líneas bajo la tabla. Una promesa contada es
 * una promesa que hay que creer; una promesa que se ve es un objeto.
 *
 * Se compone con el lenguaje de credencial que `MetaTechProvider` ya inventó
 * para esta marca: lomo de bronce encuadernado, guilloché grabado en la
 * esquina y pie con regla. Extender un estilo propio vale más que estrenar
 * otro, y aquí encaja solo: una cotización y un certificado son el mismo
 * género de papel.
 *
 * NO LLEVA UN SOLO NÚMERO, Y ESA ES LA PIEZA.
 * Los importes son ranuras con «$ —». Un total verosímil dentro de algo que
 * parece una cotización sería exactamente el dato inventado que este proyecto
 * se prohíbe; y además la ranura vacía dice mejor lo que se quiere decir: ese
 * renglón se llena contigo, no antes de conocerte.
 *
 * DECISIONES DE 390 px
 *   · Sin relación de aspecto de hoja carta. Una tarjeta de TEXTO con
 *     `aspect-ratio` fija o se corta el contenido o deja un hueco enorme en
 *     móvil. Crece con lo que tiene dentro.
 *   · El concepto y su ranura van en la MISMA línea (flex, con la guía de
 *     puntos en medio) y el detalle debajo, a ancho completo. Si el concepto y
 *     el detalle compartieran línea, a 390 la guía de puntos quedaría partida
 *     y el importe huérfano al fondo.
 *   · `p-6` en móvil y `p-8` de sm en adelante, como el resto de las tarjetas
 *     grandes del sitio.
 *   · Las guías de puntos y las ranuras «$ —» van `aria-hidden`: son dibujo.
 *     Un lector de pantalla oye los conceptos y luego el pie, que es donde
 *     está la frase entera.
 */
function PropuestaPorEscrito() {
  return (
    <figure className="mx-auto mt-8 max-w-2xl">
      <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-surface via-surface to-secondary/12 shadow-soft">
        {/* Lomo: el canto encuadernado de un documento, no un borde de tarjeta. */}
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-accent via-primary to-primary-dark"
        />
        {/* Guilloché: el grabado concéntrico de los títulos impresos. */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[repeating-radial-gradient(circle_at_50%_50%,rgba(152,92,62,0.075)_0_1px,transparent_1px_10px)] sm:-right-20 sm:-top-20 sm:h-64 sm:w-64 [-webkit-mask-image:radial-gradient(circle_at_50%_50%,#000_38%,transparent_72%)] [mask-image:radial-gradient(circle_at_50%_50%,#000_38%,transparent_72%)]"
        />

        <div className="relative p-6 pl-7 sm:p-8 sm:pl-10">
          {/* Cabecera del documento */}
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line pb-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-ink">
              Tu propuesta
            </p>
            {/* Pastilla y no texto suelto: a 390 este rótulo quedaba pegado
                al de la izquierda y los dos se leían como una sola línea. */}
            <p className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
              Ejemplo
            </p>
          </div>

          {/* Renglones de concepto */}
          <ul>
            {RENGLONES.map((r) => (
              <li
                key={r.concepto}
                className="border-b border-dashed border-line py-4"
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-body text-[15px] font-semibold text-ink">
                    {r.concepto}
                  </span>
                  <span
                    aria-hidden
                    className="min-w-4 flex-1 border-b border-dotted border-line"
                  />
                  <span
                    aria-hidden
                    className="shrink-0 font-mono text-sm tabular-nums text-ink-soft"
                  >
                    $ —
                  </span>
                </span>
                <span className="mt-1 block max-w-[42ch] font-body text-[13px] leading-relaxed text-ink-soft">
                  {r.detalle}
                </span>
              </li>
            ))}
          </ul>

          {/* Línea de total. La ranura es más marcada que las de arriba: es
              el renglón que el visitante vino a buscar, y sigue vacío. */}
          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-body text-xl font-semibold text-ink">Total</span>
            <span
              aria-hidden
              className="min-w-4 flex-1 border-b border-dotted border-line"
            />
            <span
              aria-hidden
              className="shrink-0 rounded-lg border border-dashed border-primary/45 bg-primary/[0.05] px-3 py-1.5 font-mono text-sm text-primary-dark"
            >
              $ —
            </span>
          </div>

          {/* Pie con regla: la firma y el compromiso. */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-line pt-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
              Luis Jaller · Turbaco, Bolívar
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary-dark">
              Por escrito, antes de pagar nada
            </span>
          </div>
        </div>
      </div>

      {/* Las dos condiciones honestas de la nota vieja, íntegras. No se
          recortan: son lo que hace creíble la tabla de arriba. */}
      <figcaption className="mt-5 max-w-[62ch] text-pretty font-body leading-relaxed text-ink-soft">
        Son precios de arranque: el final depende del alcance. El tuyo sale así
        —no al final de un embudo de tres reuniones.
      </figcaption>
    </figure>
  );
}

/** Especificación de precio de una línea, o nada si no hay número. */
function priceSpec(l: Linea) {
  if (!l.montoCop) return undefined;

  if (l.mensual) {
    return {
      "@type": "UnitPriceSpecification",
      priceCurrency: "COP",
      minPrice: l.montoCop,
      unitCode: "MON",
      unitText: "mes",
      billingDuration: 1,
    };
  }

  return {
    "@type": "PriceSpecification",
    priceCurrency: "COP",
    // «desde» es un piso (minPrice); una tarifa cerrada es un precio (price).
    ...(l.esDesde ? { minPrice: l.montoCop } : { price: l.montoCop }),
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/precios#webpage`,
      url: `${SITE_URL}/precios`,
      name: "Precios de páginas web en Colombia | JV Agencia",
      description:
        "Cuánto cuesta una página web, una tienda online o el SEO de tu negocio. Precios desde $850.000 y plazos reales, publicados.",
      inLanguage: "es",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#service` },
      // El catálogo cuelga de la página y el proveedor apunta al mismo @id del
      // grafo global: un solo negocio, no uno nuevo por página.
      mainEntity: { "@id": `${SITE_URL}/precios#catalogo` },
    },
    {
      "@type": "OfferCatalog",
      "@id": `${SITE_URL}/precios#catalogo`,
      name: "Precios de JV Agencia",
      url: `${SITE_URL}/precios`,
      inLanguage: "es",
      provider: { "@id": `${SITE_URL}/#organization` },
      itemListElement: LINEAS.map((l, i) => {
        const spec = priceSpec(l);
        return {
          "@type": "Offer",
          position: i + 1,
          name: l.servicio,
          ...(spec ? { priceSpecification: spec } : {}),
          availability: "https://schema.org/InStock",
          seller: { "@id": `${SITE_URL}/#organization` },
          itemOffered: {
            "@type": "Service",
            name: l.servicio,
            description: l.schemaDesc,
            provider: { "@id": `${SITE_URL}/#organization` },
            areaServed: { "@type": "Country", name: "Colombia" },
          },
        };
      }),
    },
  ],
};

export default function PreciosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        {/* ── Encabezado ─────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 pb-8 pt-32 text-center md:px-8 md:pt-40">
          <Reveal>
            <Badge>Precios</Badge>
            <h1 className="mt-6 font-display text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
              Los precios,
              <span className="text-metal text-metal-block"> publicados.</span>
            </h1>
            {/* Tres líneas a 390, no cinco: la tabla es la respuesta de esta
                página y cada línea de entradilla la empuja hacia abajo. */}
            <p className="mx-auto mt-6 max-w-2xl text-pretty font-body text-lg leading-relaxed text-ink-soft">
              Casi nadie los pone. Yo sí: miras el número y sabes si te sirvo,
              sin gastar una llamada.
            </p>
          </Reveal>
        </section>

        {/* ── La tabla y cómo llega tu número ────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 pb-14 pt-6 md:px-8 md:pb-16">
          {/* Encabezado solo para lectores de pantalla: la sección necesita
              nombre en el árbol de accesibilidad, pero el copy no le puso
              título visible y no se inventa uno. */}
          <h2 className="sr-only">Precios y plazos</h2>

          <Reveal>
            {/* `bg-surface` a plena opacidad, no /70: sobre el canvas la
                tarjeta apenas se despegaba (1,08:1) y esta es LA pieza de la
                página. */}
            <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface shadow-soft">
              {LINEAS.map((l) => (
                <li key={l.servicio} className="px-5 py-5 sm:px-6 sm:py-6 md:px-8">
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <span className="font-body text-xl font-semibold text-ink">
                      {l.servicio}
                    </span>
                    <span className="flex flex-col gap-1 sm:items-end">
                      <span className="font-mono text-lg tabular-nums text-primary-dark">
                        {l.precio}
                      </span>
                      {l.plazo && (
                        // `items-start` y no `items-center`: el plazo de la
                        // primera línea ocupa dos renglones a 390 y con el
                        // reloj centrado la segunda línea quedaba colgada.
                        <span className="inline-flex items-start gap-2 font-body text-sm leading-relaxed text-ink-soft">
                          <Clock
                            className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                            aria-hidden="true"
                          />
                          {l.plazo}
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Dato por comprobar. Va envuelto en <Pendiente>: se ve
                      mientras se trabaja y no existe en producción. Un cliente
                      no tiene por qué leer un marcador debajo de un precio. */}
                  {l.verify && <Pendiente>{l.verify}</Pendiente>}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* El documento sustituye a la nota de cuatro líneas que explicaba
              en prosa cómo llega el número. */}
          <Reveal>
            <PropuestaPorEscrito />
          </Reveal>
        </section>

        {/* ── Dónde ver el detalle ───────────────────────────────────── */}
        <section className="banda mx-auto max-w-4xl px-5 py-12 md:px-8 md:py-14">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Dónde ver el detalle
            </h2>
          </Reveal>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {DETALLE.map((d, i) => (
              <Reveal key={d.href} index={i}>
                <Link
                  href={d.href}
                  className="flex h-full min-h-11 items-center justify-between gap-3 rounded-2xl border border-line bg-surface/60 px-5 py-4 font-body text-sm font-semibold text-primary-dark transition-surface duration-quick ease-state hover:border-primary/40 hover:bg-surface sm:px-6"
                >
                  {d.label}
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Cierre ─────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-3xl px-5 py-16 text-center md:px-8 md:py-20">
          <Reveal>
            <h2 className="text-balance font-display text-3xl text-ink sm:text-4xl">
              ¿Tu proyecto no encaja en ninguna línea?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty font-body text-ink-soft">
              Cuéntame qué necesitas y te digo en qué rango cae. Si no te puedo
              ayudar, te lo digo también.
            </p>
            {/* En móvil los dos botones se apilan y se igualan a 280 px: antes
                medían 245 y 272 y centrados se veían desalineados.
                EL TOPE NO ES ESTÉTICO. A 390 el botón flotante de WhatsApp
                ocupa x=318..374; un botón a ancho completo (350 px, x=20..370)
                se le mete 52 px debajo en cuanto el scroll lo deja abajo a la
                derecha. Con 280 px centrados el borde queda en 335 y el solape
                cae a 17 px —el mismo que ya tenía el botón ancho de antes—,
                sin sacrificar objetivo táctil: 280x56. */}
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              <Button asChild size="lg" className="w-full max-w-[17.5rem] sm:w-auto sm:max-w-none">
                <a href="/#contacto">Agenda una llamada</a>
              </Button>
              <BotonCuentame className="w-full max-w-[17.5rem] sm:w-auto sm:max-w-none" />
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
