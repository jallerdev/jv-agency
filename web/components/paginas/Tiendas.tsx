import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Clock,
  CreditCard,
  ExternalLink,
  Smartphone,
  Truck,
} from "lucide-react";

import { TIENDAS, TIENDAS_FAQ } from "@/content/paginas/tiendas";
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
import { BotonCuentame } from "@/components/Cuentame";
import { Comparador } from "@/components/visuales/Comparador";
import { ListaAcopio } from "@/components/visuales/ListaAcopio";
import { PanelAutonomia } from "@/components/visuales/PanelAutonomia";
import { RailPlazo } from "@/components/visuales/RailPlazo";

/**
 * TIENDAS VIRTUALES, EN LOS DOS IDIOMAS
 * ──────────────────────────────────────────────────────────────────────────
 * Los dos números publicados de esta página NO salen de `PRICES.base.ecom`:
 * esa es la base del cotizador antes de sumar pasarela, catálogo y envíos, y
 * no coincide con el piso que anuncia el sitio. Estaban escritos a mano en
 * cuatro sitios distintos del archivo original.
 */
const PISO_TIENDA = PISOS.tienda;
const RENOVACION_ANUAL = PISOS.renovacion;

/** Precios de los extras, por la misma clave que usa el contenido. */
const PRECIO_EXTRA: Record<string, number> = {
  variants: PRICES.toggles.variants,
  coupons: PRICES.toggles.coupons,
  cartrecovery: PRICES.toggles.cartrecovery,
  invoicing: PRICES.toggles.invoicing,
  migrar: PRICES.migracion.migrar,
};

const TALLAS = [
  { t: "S", agotada: false },
  { t: "M", agotada: true },
  { t: "L", agotada: false },
];

/**
 * LOS TRES PASOS DE LA COMPRA
 * ──────────────────────────────────────────────────────────────────────────
 * Cuatro de los renglones de «qué incluye» eran la descripción de estas tres
 * pantallas. Enseñar la casilla «M · agotada» dice más sobre control de
 * inventario que cualquier viñeta, y la duda que frena una tienda de dos
 * millones y medio no es qué trae: es si de verdad va a cobrar sola.
 *
 * REGLAS QUE SE RESPETAN AQUÍ:
 *  · Es DECORADO: los controles son <span>/<div> con aria-hidden. Un botón de
 *    verdad que no hace nada es una trampa para quien navega con teclado.
 *    Este bloque no aporta ni un enfocable a la página.
 *  · Los nombres de las pasarelas van como TEXTO, nunca su logotipo.
 *  · Producto y precios son de ejemplo y lo dice el rótulo. No se usan los de
 *    Bloomrose: inventar precios sobre el catálogo de una clienta real sería
 *    inventar datos sobre un tercero.
 *  · A 390 es un carril con arrastre y anclaje —asoma el borde del siguiente,
 *    así el gesto se entiende sin instrucciones—; scrollea la caja, nunca el
 *    documento. De sm en adelante, el MISMO DOM es una rejilla de tres.
 */
function PasosCompra({ idioma }: { idioma: Idioma }) {
  const p = TIENDAS.pasos;

  return (
    <div className="no-scrollbar -mx-6 flex w-[calc(100%+3rem)] snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-1 sm:mx-0 sm:grid sm:w-full sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0">
      {/* 1 · Ficha con variantes */}
      <article className="jv-card flex w-[86%] shrink-0 snap-center flex-col p-5 sm:w-auto">
        <p className="jv-eyebrow text-accent-ink">{p.ficha.rotulo[idioma]}</p>
        <h3 className="mt-2 text-lg font-semibold text-ink">{p.ficha.titulo[idioma]}</h3>
        <p className="mt-1.5 text-[13px] leading-snug text-ink-soft">{p.ficha.cuerpo[idioma]}</p>

        <div aria-hidden className="mt-4 flex flex-1 flex-col">
          <div className="grid aspect-[5/3] shrink-0 place-items-center rounded-lg bg-gradient-to-br from-band to-line">
            <span className="jv-eyebrow text-ink-soft">{p.ficha.foto[idioma]}</span>
          </div>
          <p className="mt-3 text-sm font-semibold text-ink">{p.ficha.producto[idioma]}</p>
          <p className="font-mono text-[15px] tabular-nums text-brand">$ 89.000</p>
          <div className="mb-4 mt-3 flex flex-wrap items-center gap-2">
            {TALLAS.map((x) => (
              <span
                key={x.t}
                className={
                  x.agotada
                    ? "rounded-md border border-dashed border-line px-3 py-1.5 font-mono text-[13px] text-ink-soft line-through"
                    : "rounded-md border border-line px-3 py-1.5 font-mono text-[13px] text-ink"
                }
              >
                {x.t}
              </span>
            ))}
            {/* `basis-full` la baja a su propio renglón: pegada a la L se leía
                como una cuarta talla. */}
            <span className="jv-eyebrow basis-full text-ink-soft">{p.ficha.agotada[idioma]}</span>
          </div>
          <span className="mt-auto flex min-h-11 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-on-accent">
            {p.ficha.boton[idioma]}
          </span>
        </div>
      </article>

      {/* 2 · Carrito y envío */}
      <article className="jv-card flex w-[86%] shrink-0 snap-center flex-col p-5 sm:w-auto">
        <p className="jv-eyebrow text-accent-ink">{p.carrito.rotulo[idioma]}</p>
        <h3 className="mt-2 text-lg font-semibold text-ink">{p.carrito.titulo[idioma]}</h3>
        <p className="mt-1.5 text-[13px] leading-snug text-ink-soft">{p.carrito.cuerpo[idioma]}</p>

        <dl aria-hidden className="mb-4 mt-4 divide-y divide-line">
          {[
            [p.carrito.subtotal[idioma], "$ 178.000"],
            [p.carrito.envio[idioma], "$ 12.000"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 py-2.5">
              <dt className="text-[13px] text-ink-soft">{k}</dt>
              <dd className="shrink-0 font-mono text-[13px] tabular-nums text-ink">{v}</dd>
            </div>
          ))}
          <div className="flex items-baseline justify-between gap-3 py-2.5">
            <dt className="text-sm font-semibold text-ink">{p.carrito.total[idioma]}</dt>
            <dd className="shrink-0 font-mono text-[15px] tabular-nums text-brand">$ 190.000</dd>
          </div>
        </dl>
        <span
          aria-hidden
          className="mt-auto flex min-h-11 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-on-accent"
        >
          {p.carrito.boton[idioma]}
        </span>
      </article>

      {/* 3 · Pago */}
      <article className="jv-card flex w-[86%] shrink-0 snap-center flex-col p-5 sm:w-auto">
        <p className="jv-eyebrow text-accent-ink">{p.pago.rotulo[idioma]}</p>
        <h3 className="mt-2 text-lg font-semibold text-ink">{p.pago.titulo[idioma]}</h3>
        <p className="mt-1.5 text-[13px] leading-snug text-ink-soft">{p.pago.cuerpo[idioma]}</p>

        <ul aria-hidden className="mb-4 mt-4 grid gap-2">
          {p.pago.medios[idioma].map((m, i) => (
            <li
              key={m}
              className={
                i === 0
                  ? "flex min-h-11 items-center gap-3 rounded-lg border border-brand/40 bg-brand/5 px-3"
                  : "flex min-h-11 items-center gap-3 rounded-lg border border-line px-3"
              }
            >
              <span
                className={
                  i === 0
                    ? "h-3 w-3 shrink-0 rounded-full border-[3px] border-brand"
                    : "h-3 w-3 shrink-0 rounded-full border border-line"
                }
              />
              <span className="min-w-0 text-[13px] text-ink">{m}</span>
            </li>
          ))}
        </ul>
        <span
          aria-hidden
          className="mt-auto flex min-h-11 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-on-accent"
        >
          {p.pago.boton[idioma]}
        </span>
      </article>
    </div>
  );
}

export function PaginaTiendas({ idioma, ruta }: { idioma: Idioma; ruta: string }) {
  const url = `${SITE_URL}${ruta}`;
  const es = idioma === "es";

  const franjas = PRICES.productsTier
    .map((t) => (es ? `${t.label} suma ${money(t.add, idioma)}` : `${t.label} adds ${money(t.add, idioma)}`))
    .join("; ");

  const conPrecios = (texto: string) =>
    texto
      .replaceAll("{renovacion}", money(RENOVACION_ANUAL, idioma))
      .replaceAll("{facturacion}", money(PRICES.toggles.invoicing, idioma))
      .replaceAll("{carrito}", money(PRICES.toggles.cartrecovery, idioma))
      .replaceAll("{franjas}", franjas);

  /* Datos estructurados de Service. Sin FAQPage a propósito: desde 2023 Google
     lo restringió a sitios de gobierno y salud, y aquí no daría resultado
     enriquecido — solo peso muerto en el HTML. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#servicio`,
    name: es ? "Creación de tiendas virtuales" : "Online store development",
    alternateName: es
      ? ["Tienda online", "Tienda en línea", "Desarrollo de e-commerce", "Comercio electrónico"]
      : ["Online store", "E-commerce development", "Custom e-commerce"],
    serviceType: es
      ? "Diseño y desarrollo de tiendas virtuales"
      : "Online store design and development",
    description: TIENDAS.entradilla[idioma],
    inLanguage: idioma,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "Country", name: "Colombia" },
      { "@type": "Place", name: es ? "Latinoamérica" : "Latin America" },
    ],
    url,
    offers: {
      "@type": "Offer",
      name: es ? "Tienda online" : "Online store",
      description: TIENDAS.precios.tarjetaCuerpo[idioma],
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "COP",
        /* «desde» es un piso, no una tarifa cerrada: minPrice, no price. */
        minPrice: PISO_TIENDA,
      },
      availability: "https://schema.org/InStock",
      seller: { "@id": `${SITE_URL}/#organization` },
    },
  };

  const PUNTOS_CASO = [Boxes, CreditCard, Truck, Smartphone];

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
            <Badge>{TIENDAS.badge[idioma]}</Badge>
            <h1 className="mt-6 text-[length:var(--text-hero)]">
              {TIENDAS.titulo[idioma]}{" "}
              <span className="block text-brand">{TIENDAS.tituloAcento[idioma]}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft">
              {TIENDAS.entradilla[idioma]}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href={enlaceReal(es ? "/agendar" : "/en/book-a-call")}>
                  {TIENDAS.ctaPrincipal[idioma]} <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#precios">{TIENDAS.ctaSecundario[idioma]}</a>
              </Button>
            </div>
          </Reveal>
        </section>

        {/* ── El diferenciador, arriba y no enterrado ─────────────────── */}
        <section className="mx-auto max-w-4xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">
              {TIENDAS.diferenciador.titulo[idioma]}{" "}
              <span className="text-brand">{TIENDAS.diferenciador.acento[idioma]}</span>
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {TIENDAS.diferenciador.parrafo1[idioma]}
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
              <strong className="text-ink">{TIENDAS.diferenciador.fuerte[idioma]}</strong>
              {TIENDAS.diferenciador.parrafo2[idioma]}
            </p>
          </Reveal>
        </section>

        {/* ── Para quién es ──────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{TIENDAS.paraQuienTitulo[idioma]}</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {TIENDAS.paraQuien.map((p, i) => (
              <Reveal key={p.titulo.es} delay={i * 80}>
                <article className="jv-card jv-card-int h-full p-7">
                  <h3 className="jv-titulo">{p.titulo[idioma]}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{p.cuerpo[idioma]}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Shopify vs WooCommerce vs a la medida ───────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">
              {TIENDAS.plataformasTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {TIENDAS.plataformasEntradilla[idioma]}
            </p>
          </Reveal>

          {/* Tres tarjetas con las MISMAS tres filas en el mismo orden. Es una
              matriz que se lee en paralelo en escritorio y en secuencia a 390,
              sin tabla que desborde ni transposición que mantener. */}
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {TIENDAS.plataformas.map((p, i) => (
              <Reveal key={p.titulo.es} delay={i * 70}>
                <article
                  className={
                    p.destacada
                      ? "jv-card flex h-full flex-col border-brand/30 bg-raised p-6"
                      : "jv-card flex h-full flex-col p-6"
                  }
                >
                  <h3 className="jv-titulo leading-tight">{p.titulo[idioma]}</h3>
                  <p className="mt-2 text-[13px] leading-snug text-ink-soft">{p.cuerpo[idioma]}</p>

                  <dl className="mt-5 divide-y divide-line border-y border-line">
                    {TIENDAS.filas.map((f) => (
                      <div
                        key={f.clave}
                        className="grid grid-cols-[5.5rem_1fr] items-baseline gap-3 py-3"
                      >
                        <dt className="jv-eyebrow text-accent-ink">{f.etiqueta[idioma]}</dt>
                        <dd className="min-w-0 text-[13px] leading-snug text-ink">
                          {conPrecios(p.filas[f.clave][idioma])}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <p className="mt-5 flex-1 text-sm leading-relaxed text-ink">
                    {p.veredicto[idioma]}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Precios ────────────────────────────────────────────────── */}
        <section id="precios" className="mx-auto max-w-6xl scroll-mt-32 px-6 py-12 md:px-12">
          <Reveal>
            <Badge>{TIENDAS.precios.badge[idioma]}</Badge>
            <h2 className="mt-6 text-[length:var(--text-display)]">
              {TIENDAS.precios.titulo[idioma]}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {TIENDAS.precios.entradillaAntes[idioma]}
              <Link
                href={enlaceReal(es ? "/precios" : "/en/pricing")}
                className="jv-enlace font-semibold text-brand"
              >
                {TIENDAS.precios.entradillaEnlace[idioma]}
              </Link>
              {TIENDAS.precios.entradillaDespues[idioma]}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="jv-card mt-10 p-8 md:p-10">
              <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
                <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
                  {TIENDAS.precios.tarjetaTitulo[idioma]}
                </h3>
                <p className="font-mono text-2xl text-brand">
                  {TIENDAS.precios.desde[idioma]} {money(PISO_TIENDA, idioma)}
                </p>
              </div>
              <p className="jv-chip jv-chip-off mt-3 gap-2 text-sm">
                <Clock className="h-4 w-4 text-brand" strokeWidth={2} aria-hidden />
                {TIENDAS.precios.plazo[idioma]}
              </p>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
                {TIENDAS.precios.tarjetaCuerpo[idioma]}
              </p>
            </div>
          </Reveal>

          <div className="mt-10">
            <Reveal>
              <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink">
                {TIENDAS.precios.extrasTitulo[idioma]}
              </h3>
              <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">
                {TIENDAS.precios.extrasCuerpo[idioma]}
              </p>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {TIENDAS.extras.map((e, i) => (
                <Reveal key={e.clave} delay={i * 60}>
                  <article className="jv-card jv-card-int flex h-full flex-col p-7">
                    <h4 className="jv-titulo text-lg">{e.titulo[idioma]}</h4>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                      {e.cuerpo[idioma]}
                    </p>
                    <p className="jv-rule mt-5 pt-4 font-mono text-base text-brand">
                      {TIENDAS.precios.desde[idioma]} {money(PRECIO_EXTRA[e.clave], idioma)}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal>
            <div className="jv-card mt-6 p-7">
              <p className="leading-relaxed text-ink-soft">
                <strong className="text-ink">{TIENDAS.precios.aclaracionTitulo[idioma]}</strong>
                {TIENDAS.precios.aclaracion1Antes[idioma]}
                <strong className="text-ink">{TIENDAS.precios.aclaracion1Fuerte[idioma]}</strong>
                {TIENDAS.precios.aclaracion1Despues[idioma]}
              </p>
              <p className="mt-4 leading-relaxed text-ink-soft">
                {TIENDAS.precios.aclaracion2Antes[idioma]}
                <strong className="text-ink">
                  {conPrecios(TIENDAS.precios.aclaracion2Fuerte[idioma])}
                </strong>
                {TIENDAS.precios.aclaracion2Despues[idioma]}
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── Qué incluye y qué no ───────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-12">
          <Reveal>
            <Comparador
              tituloComo="h2"
              tituloIncluye={TIENDAS.comparador.incluye[idioma]}
              tituloNoIncluye={
                <>
                  {TIENDAS.comparador.noIncluyeAntes[idioma]}
                  <span className="text-brand">{TIENDAS.comparador.noIncluyeAcento[idioma]}</span>
                  {TIENDAS.comparador.noIncluyeDespues[idioma]}
                </>
              }
              nota={TIENDAS.comparador.nota[idioma]}
              incluye={[...TIENDAS.incluye[idioma]]}
              noIncluye={TIENDAS.noIncluye.map((n) => ({
                texto: n.texto[idioma],
                quien: n.quien[idioma],
              }))}
            />
          </Reveal>
        </section>

        {/* ── Así compra tu cliente, así lo manejas tú ────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{TIENDAS.pasosTitulo[idioma]}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {TIENDAS.pasosEntradilla[idioma]}
            </p>
          </Reveal>

          <Reveal delay={80} className="mt-10">
            <PasosCompra idioma={idioma} />
          </Reveal>

          <Reveal delay={140}>
            <p className="jv-eyebrow-frase mt-4 text-ink-soft">{TIENDAS.pasosNota[idioma]}</p>
          </Reveal>

          <Reveal delay={200}>
            <PanelAutonomia
              idioma={idioma}
              className="mx-auto mt-12 max-w-md"
              titulo={TIENDAS.panelTitulo[idioma]}
            />
          </Reveal>
        </section>

        {/* ── Cómo se hace ───────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{TIENDAS.procesoTitulo[idioma]}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {TIENDAS.procesoEntradilla[idioma]}
            </p>
          </Reveal>

          {/* El tramo punteado es la condición que más discusiones ahorra
              después: el reloj arranca con el catálogo, no con la firma. */}
          <Reveal delay={80}>
            <RailPlazo
              className="mt-10"
              previo={{
                etiqueta: TIENDAS.previo.etiqueta[idioma],
                texto: TIENDAS.previo.texto[idioma],
              }}
              hitos={TIENDAS.hitos.map((h) => ({
                etiqueta: h.etiqueta[idioma],
                texto: h.texto[idioma],
              }))}
            />
          </Reveal>

          <Reveal delay={140}>
            <ListaAcopio
              className="mt-12 max-w-2xl"
              titulo={TIENDAS.acopio.titulo[idioma]}
              nota={TIENDAS.acopio.nota[idioma]}
              almacen={`acopio-tienda-virtual-${idioma}`}
              items={[...TIENDAS.acopio.items[idioma]]}
              contador={es ? "{listos} de {total} listos" : "{listos} of {total} ready"}
            />
          </Reveal>
        </section>

        {/* ── El trabajo real que respalda la página ──────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{TIENDAS.casoTitulo[idioma]}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {TIENDAS.casoEntradilla[idioma]}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <article className="jv-card mt-10 grid grid-cols-1 overflow-hidden lg:grid-cols-2">
              {/* Proporción fija (16/9) en las dos anchuras. El archivo mide
                  2000x1160, así que con 16/10 la ventana quedaba más angosta
                  que la captura y `object-cover` se comía el lado izquierdo;
                  el `scale-[1.04]` anclado arriba tapa la canaleta blanca que
                  el archivo trae por la derecha, sin tocar el asset. */}
              <div className="relative aspect-[16/9] self-start overflow-hidden bg-canvas">
                <Image
                  src="/work/bloomrose.webp"
                  alt={TIENDAS.caso.alt[idioma]}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="origin-top scale-[1.04] object-cover object-top"
                />
              </div>
              <div className="p-8 md:p-10">
                <p className="jv-eyebrow text-accent-ink">{TIENDAS.caso.rotulo[idioma]}</p>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
                  Bloomrose
                </h3>
                <p className="mt-4 leading-relaxed text-ink-soft">{TIENDAS.caso.cuerpo[idioma]}</p>
                <ul className="mt-6 grid gap-2.5">
                  {TIENDAS.caso.puntos[idioma].map((t, i) => {
                    const Glifo = PUNTOS_CASO[i];
                    return (
                      <li key={t} className="flex items-start gap-3 text-sm text-ink-soft">
                        <Glifo className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2} />
                        <span>{t}</span>
                      </li>
                    );
                  })}
                </ul>
                <a
                  href="https://www.bloomroseaccesorios.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jv-enlace mt-6 inline-flex min-h-11 items-center gap-2 self-start font-semibold text-brand"
                >
                  bloomroseaccesorios.com
                  <ExternalLink className="h-4 w-4" strokeWidth={2} />
                </a>
              </div>
            </article>
          </Reveal>
        </section>

        {/* ── Preguntas ──────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-6 py-12 md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{TIENDAS.faqTitulo[idioma]}</h2>
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <Faqs
              items={TIENDAS_FAQ.map((f) => ({
                q: f.q[idioma],
                a: conPrecios(f.a[idioma]),
              }))}
            />
          </Reveal>
        </section>

        {/* ── Cierre ─────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-6 py-16 text-center md:px-12 md:py-24">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{TIENDAS.cierre.titulo[idioma]}</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              {TIENDAS.cierre.cuerpo[idioma]}
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href={enlaceReal(es ? "/agendar" : "/en/book-a-call")}>
                  {TIENDAS.ctaPrincipal[idioma]} <ArrowRight className="h-5 w-5" />
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
