import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  KeyRound,
  LayoutTemplate,
  MapPin,
  RefreshCw,
  Search,
  Smartphone,
} from "lucide-react";

import { WEB, WEB_CERCA, WEB_FAQ, WEB_FAQ_GRUPOS, WEB_PRUEBAS } from "@/content/paginas/web";
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
import { sinPendientes } from "@/components/Pendiente";
import { BotonCuentame } from "@/components/Cuentame";
import { PageHero } from "@/components/kit/PageHero";
import { ContrastBlock } from "@/components/kit/ContrastBlock";
import { PainGrid } from "@/components/kit/PainGrid";
import { InOutLedger } from "@/components/kit/InOutLedger";
import { ProofCard } from "@/components/kit/ProofCard";
import { FaqAccordion } from "@/components/kit/FaqAccordion";
import { FinalCTA, NextStep } from "@/components/kit/FinalCTA";
import { SectionIndex } from "@/components/kit/SectionIndex";
import { type NodoArbol } from "@/components/visuales/ArbolDecision";
import { SelectorFormato } from "@/components/visuales/SelectorFormato";
import { CincoDias } from "@/components/visuales/CincoDias";
import { ListaAcopio } from "@/components/visuales/ListaAcopio";
import { RailDistancia } from "@/components/visuales/RailDistancia";

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
 *
 * QUÉ CAMBIÓ EN LA FASE 2, Y POR QUÉ
 * ----------------------------------
 * Era la página más larga del sitio con catorce bloques del mismo peso: el
 * selector de formato, la lista de acopio, el riel de plazo y el de distancia
 * se leían como cuatro párrafos más. Ahora:
 *
 * · El argumento —precio, plazo y nombre publicados— abre la página en el
 *   ticket del hero y se demuestra en una tabla de tres filas, en vez de
 *   contarse en dos párrafos que hay que reconstruir leyendo.
 * · Los seis problemas dejaron de ser seis tarjetas con azulejo de icono y
 *   pasaron al bento asimétrico del kit: los dos primeros pesan el doble
 *   porque son los dos que más pasan.
 * · El árbol y las tres tarjetas de formato ya se hablan: el árbol destaca la
 *   que te salió y atenúa las otras dos.
 * · El riel de plazo se cambió por la pieza firma, que cuenta lo mismo pero
 *   enseñándolo. Es UNA sola pieza firma, y por eso todo lo demás es sobrio.
 * · Las quince preguntas van agrupadas por tema y en `<details>`: servidas en
 *   el HTML, abiertas o cerradas.
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
 *
 * Cada resultado lleva su `clave`: es lo que permite que la rejilla de abajo
 * señale la tarjeta que salió en vez de dejar al visitante buscándola.
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
          clave: "tienda",
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
                clave: "rediseno",
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
                      clave: "landing",
                      titulo: a.landing.titulo[idioma],
                      detalle: a.landing.detalle[idioma],
                      pie: `${WEB.desde[idioma]} ${money(PISO_LANDING, idioma)} · ${a.landing.dias[idioma]}`,
                    },
                  },
                  {
                    etiqueta: a.p3todo[idioma],
                    siguiente: {
                      tipo: "resultado",
                      clave: "corporativa",
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

/** El orden de las tarjetas de formato, con la clave que el árbol devuelve. */
const CLAVES_FORMATO = ["landing", "corporativa", "rediseno"] as const;

/** Las capturas de los proyectos que ya están en el portafolio del home. */
const CAPTURAS: Record<string, string> = {
  Bloomrose: "/work/bloomrose.webp",
  "HalcónOS y Hummik": "/work/halconos.webp",
  "HalcónOS and Hummik": "/work/halconos.webp",
};

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

  /* Las quince preguntas, repartidas en sus cinco bloques. El reparto lo lleva
     el propio contenido (`grupo`), así que añadir una pregunta es escribirla
     con su grupo y nada más. Un grupo que se quede sin preguntas no se pinta. */
  const faqs = sinPendientes(
    WEB_FAQ.map((f) => ({
      q: f.q[idioma],
      a: conPrecios(f.a[idioma], idioma),
      grupo: f.grupo,
      verify: f.verify,
    })),
  );
  const gruposFaq = WEB_FAQ_GRUPOS.map((g) => ({
    titulo: g.titulo[idioma],
    items: faqs.filter((f) => f.grupo === g.clave),
  })).filter((g) => g.items.length > 0);

  /* Los cinco pasos de la pieza firma son el previo y los cuatro hitos: los
     mismos que ya estaban escritos, no una lista nueva. */
  const pasosFirma = [WEB.previo, ...WEB.hitos].map((p, i) => ({
    etiqueta: p.etiqueta[idioma],
    texto: p.texto[idioma],
    pantalla: WEB.firma.pantallas[idioma][i],
  }));

  const indice = [
    { id: "diferencia", texto: es ? "Por qué yo" : "Why me" },
    { id: "problemas", texto: es ? "Para quién es" : "Who it's for" },
    { id: "precio", texto: es ? "Precio y plazo" : "Price and timeline" },
    { id: "incluye", texto: es ? "Qué entra" : "What's included" },
    { id: "arranque", texto: es ? "Para arrancar" : "To get started" },
    { id: "cinco-dias", texto: es ? "Los cinco días" : "The five days" },
    { id: "trabajo", texto: es ? "El trabajo" : "The work" },
    { id: "cerca", texto: es ? "Dónde estoy" : "Where I am" },
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
          migas={[{ texto: WEB.badge[idioma] }]}
          /* Sin antetítulo: diría «Diseño de páginas web» tres centímetros
             encima de un H1 que dice «Diseño de páginas web». La miga ya lo
             sitúa. */
          titulo={
            <>
              {/* El espacio explícito importa: sin él, el textContent del h1
                  que lee un rastreador queda «páginas webpara». */}
              {WEB.titulo[idioma]}{" "}
              <span className="block text-brand">{WEB.tituloAcento[idioma]}</span>
            </>
          }
          entradilla={WEB.entradilla[idioma]}
          precio="landing"
          acciones={
            <>
              <Button size="lg" variant="primary" asChild>
                <Link href={enlaceReal(es ? "/agendar" : "/en/book-a-call")}>
                  {WEB.ctaPrincipal[idioma]} <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#precio">{WEB.ctaSecundario[idioma]}</a>
              </Button>
            </>
          }
        />

        {/* El índice, como chip plegable: esta página es de secciones a ancho
            completo —la pieza firma y el cierre van a sangre— y no tiene una
            columna lateral donde el riel pueda quedarse pegado. */}
        <div className="mx-auto max-w-[1280px] px-6 pt-10 md:px-12">
          <SectionIndex entradas={indice} idioma={idioma} variante="chip" />
        </div>

        {/* ── El diferenciador, con su tabla ──────────────────────────── */}
        <section id="diferencia" className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24">
          <ContrastBlock
            etiquetaComun={es ? "Lo que te vas a encontrar" : "What you'll run into"}
            comun={WEB.diferenciador.parrafo1[idioma]}
            etiquetaPropio={WEB.tabla.titulo[idioma]}
            propio={`${WEB.diferenciador.titulo[idioma]} ${WEB.diferenciador.acento[idioma]}`}
            /* Esta frase ERA el h2 de su sección antes de la Fase 2 y lo sigue
               siendo: pintarla como párrafo le quitaba un nivel al esquema de
               títulos de una página que vive de aparecer en Google. */
            como="h2"
          >
            <TablaQuienPublica idioma={idioma} />
            <p className="mt-8 max-w-[52ch] leading-relaxed text-ink-soft">
              <strong className="text-ink">{WEB.diferenciador.fuerte[idioma]}</strong>
              {WEB.diferenciador.parrafo2[idioma]}
            </p>
          </ContrastBlock>
        </section>

        {/* ── Para quién es: los seis problemas ───────────────────────── */}
        <section id="problemas" className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24">
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {WEB.paraQuienTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
              {WEB.paraQuienEntradilla[idioma]}
            </p>
          </Reveal>

          <PainGrid
            className="mt-12"
            dolores={WEB.paraQuien.map((p) => ({
              titulo: p.titulo[idioma],
              cuerpo: p.cuerpo[idioma],
              icono: GLIFOS[p.icono as keyof typeof GLIFOS],
              enlace: p.enlace
                ? {
                    texto: p.enlace.texto[idioma],
                    href: enlaceReal(p.enlace.href[idioma]),
                  }
                : undefined,
            }))}
          />
        </section>

        {/* ── Precio y plazo ─────────────────────────────────────────── */}
        <section id="precio" className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24">
          <Reveal>
            <p className="jv-eyebrow text-brand">{WEB.badgePrecio[idioma]}</p>
            <h2 className="mt-4 text-balance text-[length:var(--text-display)]">
              {WEB.formatosTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
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

          <SelectorFormato
            className="mt-12"
            idioma={idioma}
            raiz={arbolDe(idioma)}
            formatos={WEB.formatos.map((f, i) => ({
              clave: CLAVES_FORMATO[i],
              nombre: f.nombre[idioma],
              tambien: `${WEB.tambien[idioma]} ${f.tambien[idioma]}`,
              paginas: f.paginas[idioma],
              incluye: f.incluye[idioma],
              pie: pisos[i]
                ? `${WEB.desde[idioma]} ${money(pisos[i]!, idioma)}`
                : WEB.segunLoQueHaya[idioma],
            }))}
            tienda={{
              clave: "tienda",
              nombre: WEB.arbol.tienda.titulo[idioma],
              cuerpo: WEB.arbol.tienda.detalle[idioma],
              pie: `${WEB.desde[idioma]} ${money(PISO_ECOM, idioma)} · ${WEB.arbol.tienda.semanas[idioma]}`,
              enlace: {
                texto: WEB.arbol.tienda.enlace[idioma],
                href: enlaceReal(WEB.arbol.tienda.href[idioma]),
              },
            }}
          />
        </section>

        {/* ── Qué entra y qué no ─────────────────────────────────────── */}
        <section id="incluye" className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24">
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {WEB.comparador.incluye[idioma]}
            </h2>
          </Reveal>

          <InOutLedger
            className="mt-12"
            idioma={idioma}
            titulos={{
              dentro: WEB.comparador.incluye[idioma],
              fuera: `${WEB.comparador.noIncluyeAntes[idioma]}${WEB.comparador.noIncluyeAcento[idioma]}${WEB.comparador.noIncluyeDespues[idioma]}`,
            }}
            dentro={WEB.incluyeSiempre[idioma].map((texto) => ({ texto }))}
            fuera={WEB.noIncluye.map((n) => ({
              texto: conPrecios(n.texto[idioma], idioma),
              sello: n.quien[idioma],
            }))}
            remate={WEB.comparador.nota[idioma]}
          />
        </section>

        {/* ── Qué necesito para arrancar ─────────────────────────────── */}
        <section id="arranque" className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24">
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {WEB.procesoTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
              {WEB.procesoEntradilla[idioma]}
            </p>
          </Reveal>

          <ListaAcopio
            className="mt-12 max-w-2xl"
            almacen={`acopio-paginas-web-${idioma}`}
            titulo={WEB.acopio.titulo[idioma]}
            nota={WEB.acopio.nota[idioma]}
            items={[...WEB.acopio.items[idioma]]}
            contador={es ? "{listos} de {total} listos" : "{listos} of {total} ready"}
          />
        </section>

        {/* ── La pieza firma ─────────────────────────────────────────── */}
        <section
          id="cinco-dias"
          className="border-y border-line bg-tint"
        >
          <div className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-28">
            <Reveal>
              <h2 className="text-balance text-[length:var(--text-display)]">
                {WEB.firma.titulo[idioma]}
              </h2>
              <p className="mt-4 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
                {WEB.firma.entradilla[idioma]}
              </p>
            </Reveal>

            <CincoDias
              className="mt-14"
              idioma={idioma}
              pasos={pasosFirma}
              dominio={WEB.firma.dominioEjemplo[idioma]}
              enLinea={WEB.firma.enLinea[idioma]}
            />
          </div>
        </section>

        {/* ── El trabajo que respalda esto ───────────────────────────── */}
        <section id="trabajo" className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24">
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {WEB_PRUEBAS.titulo[idioma]}
            </h2>
            <p className="mt-4 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
              {WEB_PRUEBAS.entradilla[idioma]}
            </p>
          </Reveal>

          {/* La jerarquía la dice la rejilla: el que está en producción y se
              puede abrir ocupa el doble; el de estudio, la mitad y con el
              borde punteado que ya distingue a los dos grupos en el home. */}
          <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {WEB_PRUEBAS.fichas.map((f, i) => {
              const captura = CAPTURAS[f.nombre[idioma]];
              /* La etiqueta del contenido dice «En producción · Cartagena», y
                 la tarjeta ya pinta «En producción» con su punto. Se queda la
                 mitad que añade algo; si no la hay, no va segunda pastilla. */
              const matiz = f.etiqueta[idioma].split("·")[1]?.trim();
              return (
                <Reveal
                  key={f.nombre.es}
                  delay={i * 80}
                  className={cn(i === 0 && "lg:col-span-2")}
                >
                  <ProofCard
                    idioma={idioma}
                    nombre={f.nombre[idioma]}
                    categoria={matiz}
                    cuerpo={f.cuerpo[idioma]}
                    dominio={f.dominio}
                    url={f.url}
                    estado={f.url ? "produccion" : "estudio"}
                    destacada={i === 0}
                  >
                    {captura && (
                      <div className="relative aspect-[16/10] border-b border-line bg-surface">
                        <Image
                          src={captura}
                          alt={
                            es
                              ? `Captura del sitio de ${f.nombre.es}`
                              : `Screenshot of the ${f.nombre.en} site`
                          }
                          fill
                          sizes="(min-width: 1024px) 800px, 100vw"
                          className="object-cover object-top"
                        />
                      </div>
                    )}
                  </ProofCard>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ── Dónde estoy y a dónde llego ────────────────────────────── */}
        <section id="cerca" className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24">
          <Reveal>
            <div className="jv-card p-7 md:p-10">
              <h2 className="text-balance text-[length:var(--text-h2)]">
                {WEB_CERCA.titulo[idioma]}
              </h2>
              <p className="mt-5 max-w-[52ch] leading-relaxed text-ink-soft">
                {WEB_CERCA.cuerpoAntes[idioma]}
                <strong className="text-ink">{WEB_CERCA.lugar[idioma]}</strong>
                {WEB_CERCA.cuerpoDespues[idioma]}
              </p>

              {/* La ventaja y lo que la distancia cambia, en el mismo dibujo.
                  No es un mapa a propósito: el riel termina diciendo que se
                  trabaja con todo el país y que lo que la distancia decide es
                  si nos vemos, no si tomo el proyecto. */}
              <RailDistancia idioma={idioma} className="mt-8" />

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

        {/* ── Preguntas, por tema ────────────────────────────────────── */}
        <section id="preguntas" className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              {/* El encabezado se queda a la vista mientras se recorren las
                  quince: en una lista tan larga, saber dónde estás vale más
                  que recuperar treinta píxeles de aire. */}
              <div className="lg:sticky lg:top-28">
                {/* En su columna de 22rem, el tamaño `display` partía el
                    titular en tres renglones de una palabra. */}
                <h2 className="text-balance text-[length:var(--text-h2)]">
                  {WEB.faqTitulo[idioma]}
                </h2>
                <p className="mt-4 leading-relaxed text-ink-soft">{WEB.faqEntradilla[idioma]}</p>
              </div>
            </Reveal>

            <FaqAccordion grupos={gruposFaq} />
          </div>
        </section>

        <FinalCTA
          idioma={idioma}
          titulo={WEB.cierre.titulo[idioma]}
          cuerpo={WEB.cierre.cuerpo[idioma]}
          siguiente={<NextStep id="tienda" idioma={idioma} />}
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

/**
 * LA TABLA DE «QUIÉN PUBLICA QUÉ»
 *
 * Tres filas por tres columnas, y ni un dato que no esté ya en el párrafo de
 * al lado. Las dos primeras filas solo pueden decir sí, no o «no lo dice»:
 * cualquier otra cosa sería una afirmación sobre terceros que nadie puede
 * sostener. La tercera fila sí lleva el número y el plazo, porque son los de
 * `lib/quote.ts` y se publican en todo el sitio.
 *
 * En móvil no se vuelve tarjetas: se deja rodar en horizontal dentro de su
 * propio contenedor. Una tabla de tres columnas cortas cabe casi siempre, y
 * partirla en tres bloques verticales destruye justo la comparación que es su
 * único motivo de existir.
 */
function TablaQuienPublica({ idioma }: { idioma: Idioma }) {
  const t = WEB.tabla;
  const plazo = WEB.arbol.landing.dias[idioma];
  const piso = money(PISO_LANDING, idioma);

  const celda = (clave: string, fila: (typeof t.filas)[number]) => {
    if (clave === "si") return t.si[idioma];
    if (clave === "no") return t.no[idioma];
    if (clave === "calla") return t.calla[idioma];
    if (clave === "cita") return fila.cita?.[idioma] ?? t.si[idioma];
    if (clave === "piso") return piso;
    if (clave === "plazo") return plazo;
    return "Luis Jaller";
  };

  return (
    <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <caption className="sr-only">{t.titulo[idioma]}</caption>
        <thead>
          <tr className="border-b border-line">
            <th scope="col" className="py-3 pr-4 jv-eyebrow text-ink-muted">
              <span className="sr-only">{idioma === "es" ? "Quién" : "Who"}</span>
            </th>
            {t.columnas[idioma].map((c) => (
              <th key={c} scope="col" className="py-3 pr-4 jv-eyebrow text-ink-muted">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {t.filas.map((f) => (
            <tr
              key={f.quien.es}
              className={cn("border-b border-line last:border-b-0", f.propia && "text-ink")}
            >
              <th
                scope="row"
                className={cn(
                  "py-4 pr-4 text-sm font-semibold",
                  f.propia ? "text-brand" : "text-ink-soft",
                )}
              >
                {f.quien[idioma]}
              </th>
              {f.celdas.map((c, i) => (
                <td
                  key={i}
                  className={cn(
                    "py-4 pr-4 text-sm",
                    f.propia ? "font-semibold text-ink" : "text-ink-muted",
                  )}
                >
                  {celda(c, f)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
