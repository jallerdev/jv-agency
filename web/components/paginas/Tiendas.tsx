import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Boxes, CreditCard, Smartphone, Truck } from "lucide-react";

import { TIENDAS, TIENDAS_FAQ, TIENDAS_FAQ_GRUPOS } from "@/content/paginas/tiendas";
import type { Idioma } from "@/content/types";
import { enlaceReal } from "@/lib/rutas";
import { SITE_URL } from "@/lib/site";
import { PRICES, money, PISOS } from "@/lib/quote";
import { cn } from "@/lib/utils";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BarraMovil } from "@/components/BarraMovil";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { BotonCuentame } from "@/components/Cuentame";
import { PageHero } from "@/components/kit/PageHero";
import { ContrastBlock } from "@/components/kit/ContrastBlock";
import { PainGrid } from "@/components/kit/PainGrid";
import { InOutLedger } from "@/components/kit/InOutLedger";
import { ProofCard } from "@/components/kit/ProofCard";
import { PriceCard } from "@/components/kit/Precio";
import { AddOnCalculator } from "@/components/kit/AddOnCalculator";
import { FaqAccordion } from "@/components/kit/FaqAccordion";
import { FinalCTA, NextStep } from "@/components/kit/FinalCTA";
import { SectionIndex } from "@/components/kit/SectionIndex";
import { AsiCompra } from "@/components/visuales/AsiCompra";
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
 *
 * QUÉ CAMBIÓ EN LA FASE 2, Y POR QUÉ
 * ----------------------------------
 * Esta página tiene el mejor material demostrativo del sitio —las tres
 * pantallas de compra, el panel, la comparación con Shopify y WooCommerce— y
 * lo presentaba como documento: todo del mismo peso, de arriba abajo. Ahora:
 *
 * · La pieza firma es UN SOLO TELÉFONO que va cambiando con los tres pasos.
 *   Tres tarjetas en fila no son una compra: son tres capturas.
 * · El panel de autonomía dejó de ser un dibujo y se puede tocar: el precio se
 *   guarda, la foto sube con su barra y el pedido dispara el aviso. El
 *   argumento era «esto lo haces tú» y un botón dibujado no lo demuestra.
 * · Los cinco extras dejaron de ser cinco tarjetas con su precio al pie y
 *   pasaron a una calculadora que suma. El que hacía la cuenta a ojo se pasaba.
 * · El veredicto de Shopify se pinta como cita: «te lo digo aunque no me
 *   convenga» es el argumento de la página, no el pie de una tarjeta.
 * · Las catorce preguntas van agrupadas en cuatro temas y en `<details>`.
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

/** Las tres tallas del ejemplo. La M agotada es el argumento del paso 1. */
const TALLAS = [
  { t: "S", agotada: false },
  { t: "M", agotada: true },
  { t: "L", agotada: false },
];

/**
 * La captura de Bloomrose en un teléfono, para el hero.
 *
 * Es una captura REAL del sitio en producción tomada a 390 px, no un montaje:
 * la tienda de una clienta, abierta desde el mismo ancho en el que la abre su
 * cliente. Por eso el marco es un teléfono y no una ventana de navegador —y
 * por eso valía la pena tomar la captura móvil en vez de meter el pantallazo
 * de escritorio dentro de un teléfono, que es la clase de trampa que este
 * sitio no hace.
 */
function TelefonoBloomrose({ idioma }: { idioma: Idioma }) {
  return (
    <figure className="mx-auto w-full max-w-[16rem]">
      <div className="rounded-[2rem] border border-line bg-surface p-2.5">
        {/* La pantalla no lleva borde propio: el marco ya es una caja con
            borde, y dos bordes concéntricos son una tarjeta dentro de otra
            —el detector lo marca y tiene razón—. El bisel se lee igual con
            el relleno del marco y el fondo más oscuro de la pantalla. */}
        <div className="relative overflow-hidden rounded-[1.5rem] bg-canvas">
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-2 z-10 h-1.5 w-14 -translate-x-1/2 rounded-full bg-line-strong"
          />
          <div className="relative aspect-[390/780]">
            <Image
              src="/work/bloomrose-movil.webp"
              alt={TIENDAS.caso.alt[idioma]}
              fill
              sizes="256px"
              priority
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-center font-mono text-xs text-ink-soft">
        bloomroseaccesorios.com
      </figcaption>
    </figure>
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

  /* Las catorce preguntas, repartidas en sus cuatro bloques por el propio
     contenido. Un grupo que se quede sin preguntas no se pinta. */
  const faqs = TIENDAS_FAQ.map((f) => ({
    q: f.q[idioma],
    a: conPrecios(f.a[idioma]),
    grupo: f.grupo,
  }));
  const gruposFaq = TIENDAS_FAQ_GRUPOS.map((g) => ({
    titulo: g.titulo[idioma],
    items: faqs.filter((f) => f.grupo === g.clave),
  })).filter((g) => g.items.length > 0);

  const indice = [
    { id: "diferencia", texto: es ? "Por qué a la medida" : "Why custom" },
    { id: "problemas", texto: es ? "Para quién es" : "Who it's for" },
    { id: "asi-compra", texto: es ? "Así compra tu cliente" : "How your customer buys" },
    { id: "plataformas", texto: es ? "Shopify o a la medida" : "Shopify or custom" },
    { id: "precio", texto: es ? "Precio" : "Price" },
    { id: "panel", texto: es ? "Tu panel" : "Your panel" },
    { id: "incluye", texto: es ? "Qué entra" : "What's included" },
    { id: "arranque", texto: es ? "Para arrancar" : "To get started" },
    { id: "caso", texto: es ? "Una tienda vendiendo" : "A store selling" },
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
          variante="servicio"
          idioma={idioma}
          migas={[{ texto: TIENDAS.badge[idioma] }]}
          titulo={
            <>
              {TIENDAS.titulo[idioma]}{" "}
              <span className="block text-brand">{TIENDAS.tituloAcento[idioma]}</span>
            </>
          }
          entradilla={TIENDAS.entradilla[idioma]}
          precio="tienda"
          indice={<SectionIndex entradas={indice} idioma={idioma} variante="chip" />}
          aparte={<TelefonoBloomrose idioma={idioma} />}
          acciones={
            <>
              <Button size="lg" variant="primary" asChild>
                <Link href={enlaceReal(es ? "/agendar" : "/en/book-a-call")}>
                  {TIENDAS.ctaPrincipal[idioma]} <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#precio">{TIENDAS.ctaSecundario[idioma]}</a>
              </Button>
            </>
          }
        />

        {/* ── El diferenciador ───────────────────────────────────────── */}
        <section
          id="diferencia"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <ContrastBlock
            etiquetaComun={es ? "Lo que te van a ofrecer" : "What you'll be offered"}
            comun={TIENDAS.diferenciador.parrafo1[idioma]}
            etiquetaPropio={TIENDAS.badge[idioma]}
            propio={`${TIENDAS.diferenciador.titulo[idioma]} ${TIENDAS.diferenciador.acento[idioma]}`}
            como="h2"
          >
            <p className="max-w-[52ch] leading-relaxed text-ink-soft">
              <strong className="text-ink">{TIENDAS.diferenciador.fuerte[idioma]}</strong>
              {TIENDAS.diferenciador.parrafo2[idioma]}
            </p>
          </ContrastBlock>
        </section>

        {/* ── Para quién es ──────────────────────────────────────────── */}
        <section
          id="problemas"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {TIENDAS.paraQuienTitulo[idioma]}
            </h2>
          </Reveal>

          <PainGrid
            className="mt-12"
            dolores={TIENDAS.paraQuien.map((p) => ({
              titulo: p.titulo[idioma],
              cuerpo: p.cuerpo[idioma],
            }))}
          />
        </section>

        {/* ── Pieza firma: así compra tu cliente ─────────────────────── */}
        <section id="asi-compra" className="border-y border-line bg-tint">
          <div className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-28">
            <Reveal>
              <h2 className="text-balance text-[length:var(--text-display)]">
                {TIENDAS.pasosTitulo[idioma]}
              </h2>
              <p className="mt-4 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
                {TIENDAS.pasosEntradilla[idioma]}
              </p>
            </Reveal>

            <AsiCompra
              className="mt-14"
              idioma={idioma}
              nota={TIENDAS.pasosNota[idioma]}
              pasos={[
                {
                  rotulo: TIENDAS.pasos.ficha.rotulo[idioma],
                  titulo: TIENDAS.pasos.ficha.titulo[idioma],
                  cuerpo: TIENDAS.pasos.ficha.cuerpo[idioma],
                  pantalla: TIENDAS.firma.pantallas[idioma][0],
                },
                {
                  rotulo: TIENDAS.pasos.carrito.rotulo[idioma],
                  titulo: TIENDAS.pasos.carrito.titulo[idioma],
                  cuerpo: TIENDAS.pasos.carrito.cuerpo[idioma],
                  pantalla: TIENDAS.firma.pantallas[idioma][1],
                },
                {
                  rotulo: TIENDAS.pasos.pago.rotulo[idioma],
                  titulo: TIENDAS.pasos.pago.titulo[idioma],
                  cuerpo: TIENDAS.pasos.pago.cuerpo[idioma],
                  pantalla: TIENDAS.firma.pantallas[idioma][2],
                },
              ]}
              datos={{
                foto: TIENDAS.pasos.ficha.foto[idioma],
                producto: TIENDAS.pasos.ficha.producto[idioma],
                /* Precios de ejemplo, y el pie lo dice. No son los de
                   Bloomrose: inventar cifras sobre el catálogo de una clienta
                   real sería inventar datos sobre un tercero. */
                precio: es ? "$ 89.000" : "$89,000 COP",
                tallas: TALLAS,
                agotada: TIENDAS.pasos.ficha.agotada[idioma],
                botonFicha: TIENDAS.pasos.ficha.boton[idioma],
                subtotalEtiqueta: TIENDAS.pasos.carrito.subtotal[idioma],
                subtotal: es ? "$ 178.000" : "$178,000",
                envioEtiqueta: TIENDAS.pasos.carrito.envio[idioma],
                envio: es ? "$ 12.000" : "$12,000",
                calculando: TIENDAS.firma.calculando[idioma],
                totalEtiqueta: TIENDAS.pasos.carrito.total[idioma],
                total: es ? "$ 190.000" : "$190,000",
                botonCarrito: TIENDAS.pasos.carrito.boton[idioma],
                medios: TIENDAS.pasos.pago.medios[idioma],
                botonPago: TIENDAS.pasos.pago.boton[idioma],
                procesando: TIENDAS.firma.procesando[idioma],
                pagado: TIENDAS.firma.pagado[idioma],
                hora: TIENDAS.firma.hora[idioma],
              }}
            />
          </div>
        </section>

        {/* ── Shopify vs WooCommerce vs a la medida ───────────────────── */}
        <section
          id="plataformas"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {TIENDAS.plataformasTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
              {TIENDAS.plataformasEntradilla[idioma]}
            </p>
          </Reveal>

          {/* Tres tarjetas con las MISMAS tres filas en el mismo orden. Es una
              matriz que se lee en paralelo en escritorio y en secuencia a 390,
              sin tabla que desborde ni transposición que mantener. */}
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {TIENDAS.plataformas.map((p, i) => (
              <Reveal key={p.titulo.es} delay={i * 70} className="h-full">
                <article
                  className={cn(
                    "jv-card flex h-full flex-col p-6",
                    p.destacada && "border-brand/30 bg-raised",
                  )}
                >
                  <h3 className="jv-titulo leading-tight">{p.titulo[idioma]}</h3>
                  <p className="mt-2 text-sm leading-snug text-ink-soft">{p.cuerpo[idioma]}</p>

                  <dl className="mt-5 divide-y divide-line border-y border-line">
                    {TIENDAS.filas.map((f) => (
                      <div
                        key={f.clave}
                        className="grid grid-cols-[5.5rem_1fr] items-baseline gap-3 py-3"
                      >
                        <dt className="jv-eyebrow text-accent-ink">{f.etiqueta[idioma]}</dt>
                        <dd className="min-w-0 text-sm leading-snug text-ink">
                          {conPrecios(p.filas[f.clave][idioma])}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {p.cita ? (
                    /* La honestidad es el argumento, así que se lee como cita
                       y no como pie de tarjeta. */
                    <blockquote className="mt-5 flex-1 border-l-2 border-brand pl-4 text-[length:var(--text-h4)] leading-snug text-ink">
                      {p.veredicto[idioma]}
                    </blockquote>
                  ) : (
                    <p className="mt-5 flex-1 text-sm leading-relaxed text-ink">
                      {p.veredicto[idioma]}
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Precio y extras ────────────────────────────────────────── */}
        <section
          id="precio"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <p className="jv-eyebrow text-brand">{TIENDAS.precios.badge[idioma]}</p>
            <h2 className="mt-4 text-balance text-[length:var(--text-display)]">
              {TIENDAS.precios.titulo[idioma]}
            </h2>
            <p className="mt-4 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
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

          <Reveal delay={80} className="mt-12">
            <PriceCard
              id="tienda"
              idioma={idioma}
              tam="lg"
              descripcion={TIENDAS.precios.tarjetaCuerpo[idioma]}
              conEnlace={false}
            />
          </Reveal>

          <Reveal delay={120} className="mt-10">
            <h3 className="jv-titulo">{TIENDAS.precios.extrasTitulo[idioma]}</h3>
            <p className="mt-2 max-w-[52ch] leading-relaxed text-ink-soft">
              {TIENDAS.precios.extrasCuerpo[idioma]}
            </p>
          </Reveal>

          <AddOnCalculator
            className="mt-8"
            idioma={idioma}
            base={PISO_TIENDA}
            baseEtiqueta={TIENDAS.calculadora.base[idioma]}
            titulo={TIENDAS.calculadora.titulo[idioma]}
            totalEtiqueta={TIENDAS.calculadora.total[idioma]}
            aviso={TIENDAS.calculadora.aviso[idioma]}
            desde={TIENDAS.precios.desde[idioma]}
            extras={TIENDAS.extras.map((e) => ({
              clave: e.clave,
              titulo: e.titulo[idioma],
              cuerpo: e.cuerpo[idioma],
              precio: PRECIO_EXTRA[e.clave],
            }))}
            /* Las dos notas fijas: lo que se paga igual y no lo cobro yo. Se
               componen de los mismos fragmentos que ya decía la página, para
               que no haya dos versiones de la misma aclaración. */
            notas={[
              `${TIENDAS.precios.aclaracion1Antes[idioma].trim()} ${TIENDAS.precios.aclaracion1Fuerte[idioma]}${TIENDAS.precios.aclaracion1Despues[idioma]}`,
              conPrecios(
                `${TIENDAS.precios.aclaracion2Antes[idioma].trim()} ${TIENDAS.precios.aclaracion2Fuerte[idioma]}${TIENDAS.precios.aclaracion2Despues[idioma]}`,
              ),
            ]}
          />
        </section>

        {/* ── Y esto lo haces tú ─────────────────────────────────────── */}
        <section
          id="panel"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-center lg:gap-16">
            <Reveal>
              <h2 className="text-balance text-[length:var(--text-display)]">
                {TIENDAS.panelTitulo[idioma]}
              </h2>
            </Reveal>

            {/* Sin título dentro de la tarjeta: el h2 de al lado ya lo dice, y
                repetirlo palabra por palabra a treinta píxeles se lee como un
                error de copiar y pegar. */}
            <Reveal delay={100}>
              <PanelAutonomia idioma={idioma} titulo={null} />
            </Reveal>
          </div>
        </section>

        {/* ── Qué entra y qué no ─────────────────────────────────────── */}
        <section
          id="incluye"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {TIENDAS.comparador.incluye[idioma]}
            </h2>
          </Reveal>

          <InOutLedger
            className="mt-12"
            idioma={idioma}
            titulos={{
              dentro: TIENDAS.comparador.incluye[idioma],
              fuera: `${TIENDAS.comparador.noIncluyeAntes[idioma]}${TIENDAS.comparador.noIncluyeAcento[idioma]}${TIENDAS.comparador.noIncluyeDespues[idioma]}`,
            }}
            dentro={TIENDAS.incluye[idioma].map((texto) => ({ texto }))}
            fuera={TIENDAS.noIncluye.map((n) => ({
              texto: n.texto[idioma],
              sello: n.quien[idioma],
            }))}
            remate={TIENDAS.comparador.nota[idioma]}
          />
        </section>

        {/* ── Cómo se hace ───────────────────────────────────────────── */}
        <section
          id="arranque"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {TIENDAS.procesoTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
              {TIENDAS.procesoEntradilla[idioma]}
            </p>
          </Reveal>

          {/* El tramo punteado es la condición que más discusiones ahorra
              después: el reloj arranca con el catálogo, no con la firma. */}
          <Reveal delay={80}>
            <RailPlazo
              className="mt-12"
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
              className="mt-14 max-w-2xl"
              titulo={TIENDAS.acopio.titulo[idioma]}
              nota={TIENDAS.acopio.nota[idioma]}
              almacen={`acopio-tienda-virtual-${idioma}`}
              items={[...TIENDAS.acopio.items[idioma]]}
              contador={es ? "{listos} de {total} listos" : "{listos} of {total} ready"}
            />
          </Reveal>
        </section>

        {/* ── El trabajo real que respalda la página ──────────────────── */}
        <section
          id="caso"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {TIENDAS.casoTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
              {TIENDAS.casoEntradilla[idioma]}
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start">
            <Reveal className="h-full">
              <ProofCard
                idioma={idioma}
                nombre="Bloomrose"
                categoria={TIENDAS.caso.rotulo[idioma]}
                cuerpo={TIENDAS.caso.cuerpo[idioma]}
                dominio="bloomroseaccesorios.com"
                url="https://www.bloomroseaccesorios.com"
                estado="produccion"
                destacada
              >
                {/* La proporción es la del archivo (2000×1160): con una
                    inventada, `object-cover` se come un lado de la captura. */}
                <div className="relative border-b border-line bg-surface" style={{ aspectRatio: "2000 / 1160" }}>
                  <Image
                    src="/work/bloomrose.webp"
                    alt={TIENDAS.caso.alt[idioma]}
                    fill
                    sizes="(min-width: 1024px) 740px, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              </ProofCard>
            </Reveal>

            <Reveal delay={100}>
              <ul className="flex flex-col divide-y divide-line border-y border-line">
                {TIENDAS.caso.puntos[idioma].map((t, i) => {
                  const Glifo = PUNTOS_CASO[i];
                  return (
                    <li key={t} className="flex items-start gap-3 py-4 leading-relaxed text-ink-soft">
                      <Glifo
                        className="mt-1 h-5 w-5 shrink-0 text-brand"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      <span>{t}</span>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ── Preguntas, por tema ────────────────────────────────────── */}
        <section
          id="preguntas"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <h2 className="text-balance text-[length:var(--text-h2)]">
                  {TIENDAS.faqTitulo[idioma]}
                </h2>
              </div>
            </Reveal>

            <FaqAccordion grupos={gruposFaq} />
          </div>
        </section>

        <FinalCTA
          idioma={idioma}
          titulo={TIENDAS.cierre.titulo[idioma]}
          cuerpo={TIENDAS.cierre.cuerpo[idioma]}
          siguiente={<NextStep id="chatbot" idioma={idioma} />}
        />

        <div className="mx-auto max-w-[1280px] px-6 pb-20 md:px-12">
          <BotonCuentame />
        </div>
      </main>
      <Footer idioma={idioma} />
      <WhatsAppButton idioma={idioma} />
      <BarraMovil idioma={idioma} />
    </>
  );
}
