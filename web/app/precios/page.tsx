import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/site";
import { WHATSAPP_LINK } from "@/lib/business";

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
  /** Dato por comprobar. Se pinta a la vista, no se esconde. */
  verify?: string;
};

const LINEAS: Linea[] = [
  {
    servicio: "Página web",
    precio: "desde $850.000",
    plazo: "lista en 5 días",
    montoCop: 850000,
    esDesde: true,
    schemaDesc: "Página web a la medida, con dominio y correo propio.",
    verify:
      "[VERIFICAR: plazo real de una página web — el FAQ dice 1 a 4 semanas]",
  },
  {
    servicio: "Tienda online",
    precio: "desde $2.500.000",
    plazo: "3 semanas",
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
    precio: "desde $450.000 al mes",
    montoCop: 450000,
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
        <section className="mx-auto max-w-4xl px-5 pb-10 pt-32 text-center md:px-8 md:pt-40">
          <Reveal>
            <Badge>Precios</Badge>
            <h1 className="mt-6 font-display text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
              Los precios,
              <span className="text-metal text-metal-block"> publicados.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Casi nadie los pone. Yo sí: así sabes desde el primer minuto si te
              sirvo o no, sin gastar una llamada para averiguar un número.
            </p>
          </Reveal>
        </section>

        {/* ── La tabla ───────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 py-10 md:px-8">
          {/* Encabezado solo para lectores de pantalla: la sección necesita
              nombre en el árbol de accesibilidad, pero el copy no le puso
              título visible y no se inventa uno. */}
          <h2 className="sr-only">Precios y plazos</h2>

          <Reveal>
            <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface/70 shadow-soft">
              {LINEAS.map((l) => (
                <li key={l.servicio} className="px-6 py-6 md:px-8">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <span className="font-display text-xl text-ink">
                      {l.servicio}
                    </span>
                    <span className="flex flex-col gap-1 sm:items-end">
                      <span className="font-mono text-lg text-primary-dark">
                        {l.precio}
                      </span>
                      {l.plazo && (
                        <span className="inline-flex items-center gap-2 font-body text-sm text-ink-soft">
                          <Clock
                            className="h-4 w-4 shrink-0 text-accent"
                            aria-hidden="true"
                          />
                          {l.plazo}
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Dato por comprobar, a la vista y pegado al plazo que
                      contradice. Si molesta verlo aquí, esa es justamente la
                      idea: se va cuando se resuelve. El FAQ no se toca. */}
                  {l.verify && (
                    <p className="mt-4 max-w-[52ch] rounded-xl border border-dashed border-accent/60 bg-accent/[0.07] px-4 py-3 font-mono text-xs leading-relaxed text-accent-ink">
                      {l.verify}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Nota bajo la tabla */}
          <Reveal>
            <p className="mt-6 rounded-2xl border border-line bg-background/40 p-7 font-body leading-relaxed text-ink-soft">
              Son precios de arranque, no tarifas cerradas: el número final
              depende del alcance, y te lo doy por escrito antes de que pagues
              nada. Lo que no va a pasar es que el precio aparezca al final de
              un embudo de tres reuniones.
            </p>
          </Reveal>
        </section>

        {/* ── Dónde ver el detalle ───────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Dónde ver el detalle
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DETALLE.map((d, i) => (
              <Reveal key={d.href} index={i}>
                <Link
                  href={d.href}
                  className="flex h-full items-center justify-between gap-3 rounded-2xl border border-line bg-surface/60 px-6 py-5 font-body text-sm font-semibold text-primary-dark transition-surface duration-quick ease-state hover:border-primary/40 hover:bg-surface"
                >
                  {d.label}
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Cierre ─────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-3xl px-5 py-20 text-center md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              ¿Tu proyecto no encaja en ninguna línea?
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-ink-soft">
              Cuéntame qué necesitas y te digo en qué rango cae. Si no te puedo
              ayudar, te lo digo también.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <a href="/#contacto">Agenda una llamada</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  Escríbeme por WhatsApp
                </a>
              </Button>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
